const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-automation.json'), 'utf8'));
const messages = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-messages.json'), 'utf8'));
const pipeline = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-pipeline.json'), 'utf8'));
const statePath = path.join(root, 'private', 'outreach-runtime.json');
const researchUrl = config.email ? 'https://detecthiddenfees.com/research-media-kit' : 'https://detecthiddenfees.com/research-media-kit';
const initialIds = new Set(['O-2026-005', 'O-2026-006', 'O-2026-007', 'O-2026-009']);

function now() { return new Date().toISOString(); }
function loadState() {
  try { return JSON.parse(fs.readFileSync(statePath, 'utf8')); }
  catch { return { version: '2026-08-08.1', records: {}, monitoring: {} }; }
}
function saveState(state) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n');
}
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
  for (const id of initialIds) {
    const record = recordFor(id);
    const message = messageFor(id);
    if (!record || !message) {
      results.push({ opportunity_id: id, sendable: false, reason: 'missing pipeline record or message' });
      continue;
    }
    const article = await get(record.relevant_url);
    const research = await get(researchUrl);
    const recipient = extractEmail(record.public_contact_method);
    const articleLive = article.status >= 200 && article.status < 400 && article.body.length > 500;
    const researchLive = research.status >= 200 && research.status < 400 && /25 verified public-source records|25-record/i.test(research.body) && /methodology/i.test(research.body);
    const policyOk = record.status === 'approved' && record.confidence === 'high' && checkNoShortener(message.body) && checkNoShortener(researchUrl);
    const sendable = articleLive && researchLive && policyOk && message.sendable_by_automation === true && Boolean(recipient);
    let reason = sendable ? 'verified and ready when authenticated sender is connected' : 'not sendable';
    if (!articleLive) reason = 'referenced article did not pass live check';
    else if (!researchLive) reason = 'research URL did not pass provenance/content check';
    else if (!policyOk) reason = 'target or message failed approval/safety policy';
    else if (!recipient || !message.sendable_by_automation) reason = 'public channel is not an automated email endpoint';
    results.push({ opportunity_id: id, publication: record.publication, article: { url: record.relevant_url, status: article.status }, research: { url: researchUrl, status: research.status }, channel: record.public_contact_method, recipient, sendable, reason });
  }
  return results;
}
function print(data) { console.log(JSON.stringify(data, null, 2)); }
function requireSendCredentials() {
  const missing = [];
  if (process.env.OUTREACH_SEND_ENABLED !== '1') missing.push('OUTREACH_SEND_ENABLED=1');
  if (!process.env.BREVO_API_KEY) missing.push('BREVO_API_KEY');
  if (!process.env.OUTREACH_FROM_EMAIL) missing.push('OUTREACH_FROM_EMAIL');
  if (!process.env.OUTREACH_REPLY_TO) missing.push('OUTREACH_REPLY_TO');
  return missing;
}
function htmlEscape(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
async function send() {
  const missing = requireSendCredentials();
  if (missing.length) { console.error(`SEND BLOCKED: missing secure connection values: ${missing.join(', ')}`); process.exitCode = 2; return; }
  const checks = await verifyTargets();
  const ready = checks.filter(item => item.sendable);
  const state = loadState();
  const results = [];
  for (const check of ready.slice(0, config.email.initial_batch_max)) {
    const message = messageFor(check.opportunity_id);
    const previous = state.records[check.opportunity_id] || {};
    if (previous.sent_at || previous.suppressed) { results.push({ opportunity_id: check.opportunity_id, status: 'suppressed_or_already_sent' }); continue; }
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
    state.records[check.opportunity_id] = { status: 'sent', sent_at: now(), delivery_status: 'unknown', response_status: 'unknown', follow_up_count: 0, provider_message_id: (() => { try { return JSON.parse(responseText).messageId || null; } catch { return null; } })() };
    results.push({ opportunity_id: check.opportunity_id, status: 'sent' });
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
  saveState(state);
  print({ mode: 'low_volume_separate_sends', results });
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
  console.error('FOLLOW-UP BLOCKED: reply/no-response monitoring requires a connected mailbox API. The system will not infer no response from an absent local record.');
  process.exitCode = 2;
}
async function main() {
  const command = process.argv[2] || 'status';
  if (command === 'verify') print((await verifyTargets()).map(resultSummary));
  else if (command === 'preview') print({ sender_required: ['OUTREACH_FROM_EMAIL', 'OUTREACH_REPLY_TO'], research_url: researchUrl, targets: messages.messages.map(message => ({ opportunity_id: message.opportunity_id, subject: message.subject, sendable_by_automation: message.sendable_by_automation, recipient: extractEmail(recordFor(message.opportunity_id)?.public_contact_method), reason: message.reason })) });
  else if (command === 'send') await send();
  else if (command === 'monitor') await monitor();
  else if (command === 'follow-up') await followUp();
  else if (command === 'status') print({ mode: config.mode, email_provider: config.email.provider, send_enabled: config.email.enabled, dns: config.dns_observed, social: config.social, search_console: config.search_console, runtime_state: fs.existsSync(statePath) ? 'present_private' : 'not_created' });
  else { console.error('Usage: node scripts/outreach-automation.js <status|verify|preview|send|monitor|follow-up>'); process.exitCode = 1; }
}
main().catch(error => { console.error(`OUTREACH AUTOMATION ERROR: ${error.message}`); process.exitCode = 1; });
