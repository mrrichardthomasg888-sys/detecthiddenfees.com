const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'growth-loop.config.json'), 'utf8'));
const queuePath = path.join(root, config.action_queue_path);
const now = () => new Date().toISOString();
const text = value => String(value || '').trim();
const slug = value => text(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
const readJson = (file, fallback) => { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } };
const writeJson = (file, value) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', 'utf8'); };

function loadQueue() { return readJson(queuePath, { version: '2.0.0', generated_at: now(), actions: [], history: [] }); }
function actionId(type, target, source) { return `v2-${type.toLowerCase()}-${slug(target)}-${slug(source)}`; }
function priorityForSignal(signal) {
  const evidence = signal.evidence || signal;
  const combined = `${signal.query || ''} ${signal.page || ''}`.toLowerCase();
  const impressions = Number(evidence.impressions || 0);
  const position = Number(evidence.position || 100);
  let score = 20 + (/before signing|contract|construction|review|fee|invoice|bill|dealer|upload|scan|calculator/.test(combined) ? 25 : 0);
  score += impressions >= 10 ? 20 : impressions >= 5 ? 14 : impressions >= 2 ? 8 : 3;
  score += position <= 10 ? 25 : position <= 20 ? 18 : position <= 30 ? 10 : 2;
  if (/ai construction contract review|before signing contract/.test(combined)) score += 8;
  return Math.max(0, Math.min(100, score));
}
function makeAction({ type, target, targetUrl, asset, source, priority, expectedTraffic, expectedAuthority, expectedConversion, risk = 'low', ownerRequired = false, status = 'QUALIFIED', result = null }) {
  return { ACTION_ID: actionId(type, targetUrl || target, source), ACTION_TYPE: type, TARGET: target, TARGET_URL: targetUrl || null, ASSET: asset || null, SOURCE: source, PRIORITY: Math.max(0, Math.min(100, Math.round(priority))), EXPECTED_TRAFFIC: expectedTraffic, EXPECTED_AUTHORITY: expectedAuthority, EXPECTED_CONVERSION: expectedConversion, RISK: risk, OWNER_REQUIRED: Boolean(ownerRequired), ELIGIBLE_AT: now(), STATUS: status, ATTEMPTS: 0, RESULT: result };
}
function candidates(state, outreach) {
  const actions = [];
  const signals = Array.isArray(state.gsc?.manual_opportunities) && state.gsc.manual_opportunities.length ? state.gsc.manual_opportunities : (state.opportunities || []).slice(0, 20);
  const seenPages = new Set();
  for (const signal of signals) {
    const page = text(signal.page); const evidence = signal.evidence || signal; const impressions = Number(evidence.impressions || 0); const position = Number(evidence.position || 100);
    if (!page || seenPages.has(page) || impressions < 1 || (position > 20 && impressions < 2)) continue;
    seenPages.add(page);
    const combined = `${signal.query || ''} ${page}`.toLowerCase();
    const cluster = /construction/.test(combined) ? 'construction' : /before signing|contract/.test(combined) ? 'before-signing' : 'hidden-fees';
    const asset = cluster === 'construction' ? 'https://detecthiddenfees.com/ai-construction-contract-review' : cluster === 'before-signing' ? 'https://detecthiddenfees.com/before-signing-contract-checklist' : `https://detecthiddenfees.com${new URL(page).pathname}`;
    actions.push(makeAction({ type: 'AUTHORITY_DISTRIBUTION', target: `${cluster} authority campaign`, targetUrl: page, asset, source: `GSC:${signal.query || page}`, priority: priorityForSignal(signal), expectedTraffic: position <= 20 ? 'qualified search/referral visitors' : 'authority signal', expectedAuthority: 'relevant editorial/resource citation', expectedConversion: /construction|before signing|contract|review|fee/.test(combined) ? 'HiddenFeeAI arrival' : 'DHF visit' }));
  }
  const approved = (state.authority || []).filter(item => String(item.outreach_status || '').toLowerCase() === 'approved' && item.target_page && item.our_resource && item.contact);
  for (const prospect of approved.slice(0, 8)) {
    const cluster = /construction|change.order/i.test(`${prospect.target_page} ${prospect.our_resource}`) ? 'construction' : /sign|contract|renewal|cancellation/i.test(`${prospect.target_page} ${prospect.our_resource}`) ? 'before-signing' : 'fees';
    actions.push(makeAction({ type: 'EDITORIAL_PITCH', target: prospect.prospect || prospect.contact, targetUrl: prospect.target_page, asset: prospect.our_resource, source: `AUTHORITY:${cluster}`, priority: cluster === 'before-signing' ? 84 : cluster === 'construction' ? 82 : 76, expectedTraffic: 'qualified editorial referral', expectedAuthority: 'editorial citation', expectedConversion: 'DHF visit → HiddenFeeAI arrival', status: 'READY', result: 'Ready for the existing safeguarded outreach route.' }));
  }
  const eligible = outreach?.eligible_recipient_ids || [];
  if (eligible.length) actions.push(makeAction({ type: 'OUTREACH_HANDOFF', target: 'Existing controlled Brevo workflow', targetUrl: 'https://github.com/mrrichardthomasg888-sys/detecthiddenfees.com/actions/workflows/outreach-initial-campaign.yml', asset: 'Approved personalized outreach queue', source: 'OUTREACH_DRY_RUN', priority: 88, expectedTraffic: 'qualified editorial referral', expectedAuthority: 'earned mention opportunity', expectedConversion: 'DHF visit → HiddenFeeAI arrival', status: 'WAITING', result: `Eligible IDs delegated to the existing scheduler: ${eligible.join(', ')}. No duplicate or direct-send path used.` }));
  for (const item of state.distribution || []) if (item.status === 'pending') actions.push(makeAction({ type: 'DISTRIBUTION_SUBMISSION', target: item.name || item.platform, targetUrl: item.public_url || null, asset: item.asset || 'approved free resource', source: 'DISTRIBUTION_QUEUE', priority: 52, expectedTraffic: 'directory discovery', expectedAuthority: 'listing citation', expectedConversion: 'DHF visit', ownerRequired: true, status: 'WAITING', result: 'Pending route has no verified unattended-safe submission path.' }));
  return actions;
}
function mergeQueue(existing, newActions) {
  const byId = new Map((existing.actions || []).map(item => [item.ACTION_ID, item]));
  for (const candidate of newActions) {
    const old = byId.get(candidate.ACTION_ID);
    byId.set(candidate.ACTION_ID, old ? { ...candidate, STATUS: old.STATUS === 'QUALIFIED' && candidate.STATUS === 'READY' ? 'READY' : old.STATUS, ATTEMPTS: old.ATTEMPTS || 0, RESULT: old.RESULT || candidate.RESULT, ELIGIBLE_AT: old.ELIGIBLE_AT || candidate.ELIGIBLE_AT } : candidate);
  }
  return { ...existing, version: '2.0.0', generated_at: now(), actions: [...byId.values()].sort((a, b) => b.PRIORITY - a.PRIORITY || a.ACTION_ID.localeCompare(b.ACTION_ID)) };
}
function summarize(queue) { const actions = queue.actions || []; return { size: actions.length, ready: actions.filter(x => x.STATUS === 'READY').length, qualified: actions.filter(x => x.STATUS === 'QUALIFIED').length, waiting: actions.filter(x => x.STATUS === 'WAITING').length, executing: actions.filter(x => x.STATUS === 'EXECUTING').length, succeeded: actions.filter(x => x.STATUS === 'SUCCEEDED').length, failed: actions.filter(x => x.STATUS === 'FAILED').length }; }
function buildAndPersist(state, outreach) { const queue = mergeQueue(loadQueue(), candidates(state, outreach)); queue.summary = summarize(queue); queue.last_observer_run = now(); writeJson(queuePath, queue); return queue; }
module.exports = { queuePath, loadQueue, buildAndPersist, summarize, writeJson };
