const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const statusPath = path.join(root, 'seo', 'outreach-status.json');
const pipeline = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-pipeline.json'), 'utf8'));
const messages = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-messages.json'), 'utf8'));
const required = ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'];

for (const name of required) if (!process.env[name]) throw new Error(`Missing secure connection value: ${name}`);

const apiRoot = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(process.env.CLOUDFLARE_ACCOUNT_ID)}`;
const headers = { authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, 'content-type': 'application/json' };
const namespaceTitle = process.env.REPLY_EVENT_NAMESPACE_TITLE || 'detecthiddenfees-business-reply';
let apiBase;

function loadStatus() {
  try { return JSON.parse(fs.readFileSync(statusPath, 'utf8')); }
  catch { return { version: '2026-08-08.1', privacy: 'status-only', records: {} }; }
}
function saveStatus(status) { fs.writeFileSync(statusPath, JSON.stringify(status, null, 2) + '\n'); }
function emailFrom(value) { return String(value || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]?.toLowerCase() || null; }
function subject(value) { return String(value || '').replace(/^\s*((re|fw|fwd)\s*:\s*)+/ig, '').replace(/\s+/g, ' ').trim().toLowerCase(); }
function recordForEvent(event) {
  const eventSubject = subject(event.subject);
  const candidates = pipeline.records.map(record => {
    const message = messages.messages.find(item => item.opportunity_id === record.opportunity_id);
    const target = emailFrom(record.public_contact_method);
    if (!message || !target) return null;
    const subjectMatch = eventSubject.includes(subject(message.subject)) || subject(message.subject).includes(eventSubject);
    const senderMatch = event.sender_email === target || event.candidate_recipient === target;
    return senderMatch && (subjectMatch || event.classification === 'BOUNCE') ? record : null;
  }).filter(Boolean);
  return candidates.length === 1 ? candidates[0] : null;
}
function nextStatus(classification) {
  if (classification === 'BOUNCE') return 'BOUNCED';
  if (classification === 'DECLINED') return 'DECLINED';
  if (classification === 'UNSUBSCRIBE') return 'REMOVE';
  if (classification === 'INTERESTED') return 'POSITIVE';
  if (classification === 'QUESTION') return 'QUESTION';
  if (classification === 'OUT_OF_OFFICE') return 'OUT_OF_OFFICE';
  return 'REPLIED';
}
async function cf(pathname, options = {}) {
  const response = await fetch(`${apiBase}${pathname}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
  const body = await response.text();
  if (!response.ok) throw new Error(`Cloudflare KV request failed: HTTP ${response.status}`);
  try { return JSON.parse(body); } catch { return null; }
}
async function resolveNamespace() {
  if (process.env.REPLY_EVENT_NAMESPACE_ID) return process.env.REPLY_EVENT_NAMESPACE_ID;
  const response = await fetch(`${apiRoot}/storage/kv/namespaces?per_page=1000`, { headers });
  const body = await response.json();
  if (!response.ok || body?.success === false) throw new Error(`Cloudflare namespace lookup failed: HTTP ${response.status}`);
  const namespace = (body.result || []).find(item => item.title === namespaceTitle);
  if (!namespace?.id) throw new Error(`Cloudflare KV namespace not found: ${namespaceTitle}`);
  return namespace.id;
}
async function main() {
  apiBase = `${apiRoot}/storage/kv/namespaces/${encodeURIComponent(await resolveNamespace())}`;
  const listed = await cf('/keys?prefix=event%3A&limit=100');
  const keys = Array.isArray(listed?.result) ? listed.result.map(item => item.name).filter(Boolean) : [];
  const status = loadStatus();
  let matched = 0;
  let discarded = 0;
  for (const key of keys) {
    const eventResult = await cf(`/values/${encodeURIComponent(key)}`);
    const event = eventResult?.result || eventResult;
    const record = recordForEvent(event || {});
    if (record) {
      const classification = event.classification || 'UNCERTAIN';
      const existing = status.records[record.opportunity_id] || {};
      status.records[record.opportunity_id] = {
        ...existing,
        opportunity_id: record.opportunity_id,
        status: nextStatus(classification),
        response_classification: classification,
        reply_received_at: event.received_at || new Date().toISOString(),
        follow_up_cancelled: true,
        suppressed: Boolean(event.suppress),
        human_review_required: ['QUESTION', 'OTHER', 'UNCERTAIN'].includes(classification),
        last_event_id: event.event_id || null
      };
      matched++;
    } else {
      discarded++;
    }
    await cf(`/values/${encodeURIComponent(key)}`, { method: 'DELETE' });
  }
  if (matched) saveStatus(status);
  console.log(JSON.stringify({ processed: keys.length, matched, discarded, bodies_stored: false, personal_gmail_access: 'none' }));
}
main().catch(error => { console.error(`BUSINESS REPLY PROCESSOR ERROR: ${error.message}`); process.exit(1); });
