const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const file = path.join(ROOT, 'seo', 'opportunity-engine.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const required = [
  'topic', 'search_intent', 'funnel_stage', 'topic_cluster', 'existing_target_url',
  'recommended_url', 'commercial_relevance', 'estimated_competition', 'gsc',
  'content_gap', 'internal_link_opportunities', 'recommended_action', 'priority_score',
  'status', 'evidence_basis'
];
const validIntents = new Set(['informational', 'commercial_investigation', 'transactional', 'navigational']);
const validStages = new Set(['awareness', 'consideration', 'action']);
const validRelevance = new Set(['low', 'medium', 'high']);
const errors = [];
const seen = new Set();

for (const [index, row] of data.opportunities.entries()) {
  for (const key of required) if (!(key in row)) errors.push(`row ${index + 1}: missing ${key}`);
  if (seen.has(row.topic)) errors.push(`row ${index + 1}: duplicate topic ${row.topic}`);
  seen.add(row.topic);
  if (!validIntents.has(row.search_intent)) errors.push(`row ${index + 1}: invalid search_intent`);
  if (!validStages.has(row.funnel_stage)) errors.push(`row ${index + 1}: invalid funnel_stage`);
  if (!validRelevance.has(row.commercial_relevance)) errors.push(`row ${index + 1}: invalid commercial_relevance`);
  if (!Number.isInteger(row.priority_score) || row.priority_score < 1 || row.priority_score > 5) errors.push(`row ${index + 1}: priority_score must be 1-5`);
  if (!row.gsc || row.gsc.source !== 'not connected') errors.push(`row ${index + 1}: performance source must remain explicit`);
  for (const key of ['impressions', 'clicks', 'ctr', 'position']) {
    if (row.gsc[key] !== null) errors.push(`row ${index + 1}: ${key} must remain null until a source is connected`);
  }
  for (const url of [row.existing_target_url, row.recommended_url]) {
    if (url && !url.startsWith('/')) errors.push(`row ${index + 1}: local URL must start with /`);
    if (url && url.endsWith('.html')) errors.push(`row ${index + 1}: use extensionless canonical URL ${url}`);
    if (url && url !== '/' && !fs.existsSync(path.join(ROOT, `${url.slice(1)}.html`))) errors.push(`row ${index + 1}: local URL not found ${url}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${data.opportunities.length} opportunity records; no performance estimates were accepted.`);
