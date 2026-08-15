const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-automation.json'), 'utf8'));
const messages = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-messages.json'), 'utf8'));
const pipeline = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-pipeline.json'), 'utf8'));
const statePath = path.join(root, 'private', 'outreach-runtime.json');
const publicStatusPath = path.join(root, 'seo', 'outreach-status.json');
const researchUrl = config.email ? 'https://detecthiddenfees.com/research-media-kit' : 'https://detecthiddenfees.com/research-media-kit';
const initialIds = new Set(['O-2026-002', 'O-2026-006', 'O-2026-007', 'O-2026-009']);
const activeSendIds = new Set(config.email.authorized_opportunity_ids || initialIds);

function now() { return new Date().toISOString(); }
function loadState() {
  try { return JSON.parse(fs.readFileSync(statePath, 'utf8')); }
  catch { return { version: '2026-08-08.1', records: {}, monitoring: {} }; }
}
function saveState(state) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n');
}
function loadPublicStatus() {
  try { return JSON.parse(fs.readFileSync(publicStatusPath, 'utf8')); }
  catch { return { version: '2026-08-08.1', privacy: 'status-only', records: {} }; }
}
function savePublicStatus(status) { fs.writeFileSync(publicStatusPath, JSON.stringify(status, null, 2) + '\n'); }
function recordFor(id) { return pipeline.records.find(record => record.opportunity_id === id); }
function messageFor(id) { return messages.messages.find(message => message.opportunity_id === id); }
function extractEmail(channel) {
  return (channel || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]?.toLowerCase() || null;
}
function publicChannelUrl(channel) {
  return (channel || '').match(/https:\/\/[^\s)]+/i)?.[0] || null;
}
function checkNoShortener(text) {
  return !/bit\.ly|tinyurl|t\.co|ow\.ly|goo\.gl|shorturl/i.test(text || '');
}
async function get(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'DetectHiddenFees-EditorialResearch/1.0' }, redirect: 'follow' });
  return { status: response.status, body: await response.text(), finalUrl: response.url };
}
function resultSummary(result) {
  return {
    opportunity_id: result.opportunity_id,
    publication: result.publication,
    article_status: result.article.status,
    research_status: result.research.status,
    channel: result.channel,
    sendable: result.sendable,
    reason: result.reason
  };
}
async function verifyTargets() {
  const results = [];
  for (const id of activeSendIds) {
    const record = recordFor(id);
    const message = messageFor(id);
    if (!record || !message) {
      results.push({ opportunity_id: id, sendable: false, reason: 'missing pipeline record or message' });
      continue;
    }
    const article = await get(record.relevant_url);
    const research = await get(researchUrl);
    const recipient = extractEmail(record.public_contact_method);
    const manualArticleVerified = article.status === 403 && record.article_verification?.mode === 'manual_external_verified';
    const articleLive = (article.status >= 200 && article.status < 400 && article.body.length > 500) || manualArticleVerified;
    const researchLive = research.status >= 200 && research.status < 400 && /25 verified public-source records|25-record/i.test(research.body) && /methodology/i.test(research.body);
    const policyOk = record.status === 'approved' && record.confidence === 'high' && checkNoShortener(message.body) && checkNoShortener(researchUrl);
    const sendable = articleLive && researchLive && policyOk && message.sendable_by_automation === true && Boolean(recipient);
    let reason = sendable ? 'verified and ready when authenticated sender is connected' : 'not sendable';
    if (!articleLive) reason = 'referenced article did not pass live check';
    else if (!researchLive) reason = 'research URL did not pass provenance/content check';
    else if (!policyOk) reason = 'target or message failed approval/safety policy';
    else if (!recipient || !message.sendable_by_automation) reason = 'public channel is not an automated email endpoint';
    results.push({ opportunity_id: id, publication: record.publication, article: { url: record.relevant_url, status: article.status, verification: manualArticleVerified ? 'manual_external_verified' : 'automated' }, research: { url: researchUrl, status: research.status }, channel: record.public_contact_method, recipient, sendable, reason });
  }
  return results;
}
function print(data) { console.log(JSON.stringify(data, null, 2)); }
function requireSendCredentials({ external = true } = {}) {
  const missing = [];
  if (process.env.OUTREACH_SEND_ENABLED !== '1') missing.push('OUTREACH_SEND_ENABLED=1');
  if (!process.env.BREVO_API_KEY) missing.push('BREVO_API_KEY');
  if (!process.env.OUTREACH_FROM_EMAIL) missing.push('OUTREACH_FROM_EMAIL');
  if (!process.env.OUTREACH_REPLY_TO) missing.push('OUTREACH_REPLY_TO');
  if (process.env.OUTREACH_FROM_EMAIL?.toLowerCase() !== config.email.required_sender_address) missing.push(`OUTREACH_FROM_EMAIL=${config.email.required_sender_address}`);
  if (process.env.OUTREACH_REPLY_TO?.toLowerCase() !== config.email.required_reply_to_address) missing.push(`OUTREACH_REPLY_TO=${config.email.required_reply_to_address}`);
  if (external && config.email.enabled !== true) missing.push('config.email.enabled=true');
  return missing;
}
function htmlEscape(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
async function send() {
  const missing = requireSendCredentials({ external: true });
  if (missing.length) { console.error(`SEND BLOCKED: missing secure connection values: ${missing.join(', ')}`); process.exitCode = 2; return; }
  const checks = await verifyTargets();
  const ready = checks.filter(item => item.sendable);
  const state = loadState();
  const publicStatus = loadPublicStatus();
  const results = [];
  for (const check of ready.slice(0, config.email.initial_batch_max)) {
    const message = messageFor(check.opportunity_id);
    const previous = state.records[check.opportunity_id] || {};
    if (previous.sent_at || previous.suppressed || publicStatus.records[check.opportunity_id]?.sent_at || publicStatus.records[check.opportunity_id]?.suppressed) { results.push({ opportunity_id: check.opportunity_id, status: 'suppressed_or_already_sent' }); continue; }
    const payload = {
      sender: { email: process.env.OUTREACH_FROM_EMAIL, name: process.env.OUTREACH_FROM_NAME || 'DetectHiddenFees Research Team' },
      replyTo: { email: process.env.OUTREACH_REPLY_TO },
      to: [{ email: check.recipient }],
      subject: message.subject,
      textContent: message.body,
      tags: ['dhf-editorial-outreach', 'hidden-fee-evidence-review']
    };
    const response = await fetch(config.email.api_endpoint, { method: 'POST', headers: { 'api-key': process.env.BREVO_API_KEY, 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    const responseText = await response.text();
    if (!response.ok) { results.push({ opportunity_id: check.opportunity_id, status: 'send_failed', http_status: response.status }); continue; }
    const sentAt = now();
    state.records[check.opportunity_id] = { status: 'sent', sent_at: sentAt, delivery_status: 'unknown', response_status: 'unknown', follow_up_count: 0, provider_message_id: (() => { try { return JSON.parse(responseText).messageId || null; } catch { return null; } })() };
    publicStatus.records[check.opportunity_id] = { opportunity_id: check.opportunity_id, status: 'SENT', sent_at: sentAt, follow_up_count: 0, follow_up_cancelled: false, suppressed: false };
    results.push({ opportunity_id: check.opportunity_id, status: 'sent' });
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
  saveState(state);
  savePublicStatus(publicStatus);
  print({ mode: 'low_volume_separate_sends', results });
}
async function dryRun() {
  const checks = await verifyTargets();
  const ready = checks.filter(item => item.sendable);
  const state = loadState();
  const publicStatus = loadPublicStatus();
  const eligible = [];
  const skipped = [];
  for (const check of ready) {
    const previous = state.records[check.opportunity_id] || {};
    const recorded = publicStatus.records[check.opportunity_id] || {};
    if (previous.sent_at || previous.suppressed || recorded.sent_at || recorded.suppressed) {
      skipped.push({ opportunity_id: check.opportunity_id, status: 'suppressed_or_already_sent' });
      continue;
    }
    eligible.push({ opportunity_id: check.opportunity_id, publication: check.publication, status: 'eligible' });
  }
  print({
    mode: 'dry_run_no_email',
    configured_daily_cap: config.email.initial_batch_max,
    eligible_count: eligible.length,
    will_send: eligible.slice(0, config.email.initial_batch_max),
    skipped
  });
}
async function internalTest() {
  const missing = requireSendCredentials({ external: false }).filter(item => item !== 'OUTREACH_SEND_ENABLED=1');
  if (process.env.OUTREACH_TEST_ENABLED !== '1') missing.push('OUTREACH_TEST_ENABLED=1');
  if (!process.env.OUTREACH_TEST_RECIPIENT) missing.push('OUTREACH_TEST_RECIPIENT');
  if (missing.length) { console.error(`TEST BLOCKED: missing secure connection values: ${missing.join(', ')}`); process.exitCode = 2; return; }
  const recipient = process.env.OUTREACH_TEST_RECIPIENT;
  const payload = {
    sender: { email: config.email.required_sender_address, name: 'DetectHiddenFees Research' },
    replyTo: { email: config.email.required_reply_to_address },
    to: [{ email: recipient }],
    subject: 'DetectHiddenFees outbound authentication test',
    textContent: 'This is the authorized internal delivery test for DetectHiddenFees. Please reply to this message to verify the Cloudflare Email Routing reply path.',
    tags: ['dhf-internal-authentication-test']
  };
  const response = await fetch(config.email.api_endpoint, { method: 'POST', headers: { 'api-key': process.env.BREVO_API_KEY, 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  if (!response.ok) { console.error(`TEST FAILED: Brevo returned HTTP ${response.status}`); process.exitCode = 1; return; }
  print({ status: 'test_sent', recipient, sender: payload.sender.email, reply_to: payload.replyTo.email });
}
async function monitor() {
  const state = loadState();
  const results = [];
  for (const [id, item] of Object.entries(state.records)) {
    if (!item.sent_at || item.suppressed) continue;
    const previous = state.monitoring[id] || {};
    if (previous.checked_at && !process.argv.includes('--force') && Date.now() - Date.parse(previous.checked_at) < 7 * 86400000) continue;
    const record = recordFor(id);
    if (!record) continue;
    const page = await get(record.relevant_url);
    const mentionsBrand = /detecthiddenfees|detecthiddenfees\.com|2026 hidden fee evidence review/i.test(page.body);
    const links = [...page.body.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)].map(match => match[1]).filter(url => /detecthiddenfees\.com/i.test(url));
    state.monitoring[id] = { checked_at: now(), page_status: page.status, mention_found: mentionsBrand, linked_urls: [...new Set(links)] };
    results.push({ opportunity_id: id, publication: record.publication, page_status: page.status, mention_found: mentionsBrand, linked_urls: [...new Set(links)] });
  }
  saveState(state);
  print({ crawl_policy: 'at most once per target per 7 days unless --force', results });
}
async function followUp() {
  const missing = requireSendCredentials({ external: true });
  if (missing.length) { console.error(`FOLLOW-UP BLOCKED: missing secure connection values: ${missing.join(', ')}`); process.exitCode = 2; return; }
  const publicStatus = loadPublicStatus();
  const mentionLog = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'earned-mention-log.json'), 'utf8'));
  const checks = await verifyTargets();
  const readyById = new Map(checks.filter(item => item.sendable).map(item => [item.opportunity_id, item]));
  const state = loadState();
  const results = [];
  for (const [id, item] of Object.entries(publicStatus.records)) {
    if (item.status !== 'SENT' || item.follow_up_cancelled || item.suppressed || item.follow_up_count >= config.email.max_follow_ups) continue;
    if (!item.sent_at || Date.now() - Date.parse(item.sent_at) < config.email.follow_up_days * 86400000) continue;
    const mention = mentionLog.records.find(record => record.opportunity_id === id);
    if (mention?.mention || mention?.backlink) { results.push({ opportunity_id: id, status: 'follow_up_cancelled_mention_found' }); continue; }
    const check = readyById.get(id);
    const message = messageFor(id);
    if (!check || !message) { results.push({ opportunity_id: id, status: 'follow_up_blocked_target_verification' }); continue; }
    const payload = {
      sender: { email: config.email.required_sender_address, name: 'DetectHiddenFees Research' },
      replyTo: { email: config.email.required_reply_to_address },
      to: [{ email: check.recipient }],
      subject: message.follow_up_subject || `Following up: ${message.subject}`,
      textContent: message.follow_up_body || `Hello,\n\nI wanted to follow up once on my earlier note about the DetectHiddenFees Evidence Review. If this is not relevant to your current coverage, no response is needed.\n\nBest,\nDetectHiddenFees Research`,
      tags: ['dhf-editorial-outreach-follow-up', 'hidden-fee-evidence-review']
    };
    const response = await fetch(config.email.api_endpoint, { method: 'POST', headers: { 'api-key': process.env.BREVO_API_KEY, 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) { results.push({ opportunity_id: id, status: 'follow_up_failed', http_status: response.status }); continue; }
    const sentAt = now();
    publicStatus.records[id] = { ...item, status: 'FOLLOW_UP_SENT', follow_up_sent_at: sentAt, follow_up_count: 1, follow_up_cancelled: false };
    state.records[id] = { ...(state.records[id] || {}), follow_up_sent_at: sentAt, follow_up_count: 1 };
    results.push({ opportunity_id: id, status: 'follow_up_sent' });
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
  saveState(state);
  savePublicStatus(publicStatus);
  print({ mode: 'one_follow_up_maximum', results });
}
async function main() {
  const command = process.argv[2] || 'status';
  if (command === 'verify') print((await verifyTargets()).map(resultSummary));
  else if (command === 'preview') print({ sender_required: ['OUTREACH_FROM_EMAIL', 'OUTREACH_REPLY_TO'], research_url: researchUrl, targets: messages.messages.map(message => ({ opportunity_id: message.opportunity_id, subject: message.subject, sendable_by_automation: message.sendable_by_automation, recipient: extractEmail(recordFor(message.opportunity_id)?.public_contact_method), reason: message.reason })) });
  else if (command === 'dry-run') await dryRun();
  else if (command === 'send') await send();
  else if (command === 'test') await internalTest();
  else if (command === 'monitor') await monitor();
  else if (command === 'follow-up') await followUp();
  else if (command === 'status') print({ mode: config.mode, email_provider: config.email.provider, send_enabled: config.email.enabled, dns: config.dns_observed, social: config.social, search_console: config.search_console, runtime_state: fs.existsSync(statePath) ? 'present_private' : 'not_created' });
  else { console.error('Usage: node scripts/outreach-automation.js <status|verify|preview|dry-run|test|send|monitor|follow-up>'); process.exitCode = 1; }
}
main().catch(error => { console.error(`OUTREACH AUTOMATION ERROR: ${error.message}`); process.exitCode = 1; });
