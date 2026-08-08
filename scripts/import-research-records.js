const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function usage() {
  console.error('Usage: node scripts/import-research-records.js <records.json> <private-collection.json>');
  process.exit(1);
}
const [, , inputArg, outputArg] = process.argv;
if (!inputArg || !outputArg) usage();
const resolve = value => path.resolve(process.cwd(), value);
const input = JSON.parse(fs.readFileSync(resolve(inputArg), 'utf8'));
const outputPath = resolve(outputArg);
const existing = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, 'utf8')) : { status: 'collecting', publication_status: 'not_published', records: [] };
const incoming = Array.isArray(input) ? input : input.records;
if (!Array.isArray(incoming)) throw new Error('Input must be an array or an object with records');
if (existing.publication_status !== 'not_published') throw new Error('Refusing to append to a published collection');
const keyFor = record => {
  const url = new URL(record.source_url);
  const normalizedUrl = `${url.origin}${url.pathname}`.toLowerCase();
  const fingerprint = JSON.stringify({ normalizedUrl, fee_category: record.fee_category, evidence: record.evidence });
  return crypto.createHash('sha256').update(fingerprint).digest('hex');
};
const keys = new Set((existing.records || []).map(keyFor));
const records = [...(existing.records || [])];
let skipped = 0;
for (const record of incoming) {
  const key = keyFor(record);
  if (keys.has(key)) { skipped += 1; continue; }
  keys.add(key);
  records.push(record);
}
const output = { ...existing, last_updated: new Date().toISOString().slice(0, 10), records, import_summary: { imported: incoming.length - skipped, skipped_duplicates: skipped } };
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log(`Imported ${incoming.length - skipped} new research records; skipped ${skipped} duplicates.`);
