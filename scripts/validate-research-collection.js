const fs = require('fs');
const path = require('path');

const file = process.argv[2] || 'seo/research-collection.json';
const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
if (!['collecting', 'verifying', 'analyzing', 'review'].includes(data.status)) throw new Error('Invalid collection status');
if (data.publication_status !== 'not_published') throw new Error('Private collection must not be marked published');
if (!Array.isArray(data.records)) throw new Error('records must be an array');
const ids = new Set();
const fingerprints = new Set();
const sensitiveMarkers = [/ssn/i, /social security/i, /account number/i, /routing number/i, /password/i, /document contents/i, /patient name/i, /customer name/i];
for (const [index, record] of data.records.entries()) {
  for (const field of ['record_id', 'source', 'source_url', 'source_type', 'organization', 'industry', 'document_type', 'date_collected', 'fee_category', 'evidence', 'verification_status', 'notes']) {
    if (typeof record[field] !== 'string' || !record[field].trim()) throw new Error(`Missing ${field} on record ${index}`);
  }
  if (!/^R-[0-9]{4}-[0-9]{3}$/.test(record.record_id)) throw new Error(`Invalid record_id on record ${index}`);
  if (ids.has(record.record_id)) throw new Error(`Duplicate record_id ${record.record_id}`);
  ids.add(record.record_id);
  const url = new URL(record.source_url);
  if (url.protocol !== 'https:') throw new Error(`Source URL must use HTTPS on record ${index}`);
  const fingerprint = `${url.origin}${url.pathname}`.toLowerCase() + '|' + record.fee_category.toLowerCase() + '|' + record.evidence.trim().toLowerCase();
  if (fingerprints.has(fingerprint)) throw new Error(`Duplicate source/evidence fingerprint on record ${index}`);
  fingerprints.add(fingerprint);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(record.date_collected)) throw new Error(`Invalid date_collected on record ${index}`);
  if (record.source_date !== null && record.source_date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(record.source_date)) throw new Error(`Invalid source_date on record ${index}`);
  if (record.fee_amount !== null && record.fee_amount !== undefined && (!Number.isFinite(record.fee_amount) || record.fee_amount < 0)) throw new Error(`Invalid fee_amount on record ${index}`);
  if (record.verification_status === 'verified') {
    if (!record.verification || !record.verification.reviewer || !record.verification.reviewed_at || !record.evidence_reference) throw new Error(`Verified record ${record.record_id} needs reviewer, reviewed_at, and evidence_reference`);
  }
  const serialized = JSON.stringify(record);
  if (sensitiveMarkers.some(marker => marker.test(serialized))) throw new Error(`Potential sensitive document data on record ${record.record_id}`);
}
console.log(`Research collection valid: status=${data.status}, records=${data.records.length}, verified=${data.records.filter(record => record.verification_status === 'verified').length}.`);
