const fs = require('fs');
const path = require('path');

const file = process.argv[2] || 'seo/outreach-pipeline.json';
const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
if (!Array.isArray(data.statuses) || !Array.isArray(data.records)) throw new Error('Outreach pipeline needs statuses and records arrays');
const ids = new Set();
for (const [index, record] of data.records.entries()) {
  for (const field of ['opportunity_id', 'domain', 'publication', 'relevant_url', 'topic', 'detecthiddenfees_asset', 'why_relevant', 'status', 'date', 'source_evidence']) {
    if (typeof record[field] !== 'string' || !record[field].trim()) throw new Error(`Missing ${field} on opportunity ${index}`);
  }
  if (ids.has(record.opportunity_id)) throw new Error(`Duplicate opportunity_id ${record.opportunity_id}`);
  ids.add(record.opportunity_id);
  if (!data.statuses.includes(record.status)) throw new Error(`Invalid status on ${record.opportunity_id}`);
  for (const field of ['relevant_url', 'source_evidence']) if (!/^https:\/\//.test(record[field])) throw new Error(`${field} must use HTTPS on ${record.opportunity_id}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(record.date)) throw new Error(`Invalid date on ${record.opportunity_id}`);
  if (record.public_contact_method && /password|private|scrape/i.test(record.public_contact_method)) throw new Error(`Unsafe contact method on ${record.opportunity_id}`);
}
console.log(`Outreach pipeline valid: opportunities=${data.records.length}, contacted=${data.records.filter(record => ['contacted', 'linked'].includes(record.status)).length}.`);
