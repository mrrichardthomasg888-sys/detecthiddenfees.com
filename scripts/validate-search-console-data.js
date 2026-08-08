const fs = require('fs');
const path = require('path');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/validate-search-console-data.js <json-file>');
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
if (!['not_connected', 'connected'].includes(data.source_status)) throw new Error('Invalid source_status');
if (!Array.isArray(data.records)) throw new Error('records must be an array');
for (const [index, record] of data.records.entries()) {
  if (!record.query || !/^https:\/\/detecthiddenfees\.com\//i.test(record.page)) throw new Error(`Invalid query/page on record ${index}`);
  for (const field of ['clicks', 'impressions', 'ctr', 'position']) {
    if (!Number.isFinite(record[field]) || record[field] < 0) throw new Error(`Invalid ${field} on record ${index}`);
  }
  if (record.ctr > 1) throw new Error(`CTR exceeds 1 on record ${index}`);
  if (record.date !== null && record.date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(record.date)) throw new Error(`Invalid date on record ${index}`);
  if (record.device !== null && record.device !== undefined && !String(record.device).trim()) throw new Error(`Invalid device on record ${index}`);
  if (record.country !== null && record.country !== undefined && !/^[A-Z]{2,3}$/.test(String(record.country))) throw new Error(`Invalid country on record ${index}`);
}
console.log(`Search Console data valid: status=${data.source_status}, records=${data.records.length}.`);
