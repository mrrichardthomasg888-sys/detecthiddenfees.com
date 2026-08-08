const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pipeline = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-pipeline.json'), 'utf8'));
const logPath = path.join(root, 'seo', 'earned-mention-log.json');
const log = JSON.parse(fs.readFileSync(logPath, 'utf8'));

async function fetchPage(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'DetectHiddenFees-MentionMonitor/1.0' }, redirect: 'follow' });
  return { status: response.status, body: await response.text() };
}

function urlsFrom(body) {
  return [...body.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)]
    .map(match => match[1])
    .filter(url => /detecthiddenfees\.com/i.test(url));
}

async function main() {
  const targets = pipeline.records.filter(record => record.status === 'approved');
  const byId = new Map(log.records.map(record => [record.opportunity_id, record]));
  const detections = [];
  for (const target of targets) {
    const page = await fetchPage(target.relevant_url);
    if (page.status < 200 || page.status >= 400) continue;
    const mention = /detecthiddenfees|detecthiddenfees\.com|2026 hidden fee evidence review/i.test(page.body);
    if (!mention) continue;
    const linked = [...new Set(urlsFrom(page.body))];
    const entry = byId.get(target.opportunity_id) || { opportunity_id: target.opportunity_id, outreach_target: target.publication };
    const next = {
      ...entry,
      mention: true,
      backlink: linked.length > 0,
      link_url: linked[0] || null,
      date_detected: new Date().toISOString().slice(0, 10),
      destination_url: linked[0] || null,
      anchor_context: linked.length ? 'Public page contains a DetectHiddenFees link.' : 'Public page contains a DetectHiddenFees text mention without a detected link.',
      referral_traffic: null
    };
    const changed = JSON.stringify(entry) !== JSON.stringify(next);
    if (changed) { const index = log.records.findIndex(record => record.opportunity_id === target.opportunity_id); if (index >= 0) log.records[index] = next; else log.records.push(next); detections.push({ opportunity_id: target.opportunity_id, publication: target.publication, linked_urls: linked }); }
  }
  if (detections.length) fs.writeFileSync(logPath, JSON.stringify(log, null, 2) + '\n');
  console.log(JSON.stringify({ policy: 'approved targets only; one read per target per scheduled run; no contact or publishing actions', detections }, null, 2));
}

main().catch(error => { console.error(`MENTION MONITOR ERROR: ${error.message}`); process.exit(1); });
