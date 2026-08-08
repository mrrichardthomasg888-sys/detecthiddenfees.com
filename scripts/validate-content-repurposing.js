const fs = require('fs');
const path = require('path');

const file = process.argv[2] || 'seo/content-repurposing.json';
const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
if (!['template_only', 'collecting', 'review', 'ready'].includes(data.status)) throw new Error('Invalid repurposing status');
if (!Array.isArray(data.records)) throw new Error('Repurposing records must be an array');
const ids = new Set();
for (const [index, record] of data.records.entries()) {
  for (const field of ['repurpose_id', 'source_asset', 'source_version', 'format', 'audience', 'angle', 'claims_used', 'primary_sources', 'review_status', 'canonical_link']) {
    if (record[field] === undefined || record[field] === null || (typeof record[field] === 'string' && !record[field].trim())) throw new Error(`Missing ${field} on record ${index}`);
  }
  if (ids.has(record.repurpose_id)) throw new Error(`Duplicate repurpose_id ${record.repurpose_id}`);
  ids.add(record.repurpose_id);
  if (!Array.isArray(record.claims_used) || !Array.isArray(record.primary_sources)) throw new Error(`Claims and primary_sources must be arrays on record ${index}`);
  if (record.review_status === 'approved' || record.review_status === 'published') {
    if (!record.primary_sources.length) throw new Error(`Approved repurposing record ${record.repurpose_id} needs primary sources`);
  }
}
console.log(`Repurposing queue valid: status=${data.status}, records=${data.records.length}.`);
