const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const register = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'evidence-register.json'), 'utf8'));
const errors = [];
const allowedStatuses = new Set(['needs_source_review', 'source_found', 'owner_confirmation', 'qualified', 'replaced', 'verified', 'rejected']);
const allowedSources = new Set(['none', 'government', 'regulator', 'statute', 'court', 'official_disclosure', 'public_pricing', 'academic', 'institutional', 'secondary', 'owner_confirmation']);
const ids = new Set();

if (!['collecting', 'review', 'published'].includes(register.status)) errors.push(`invalid register status: ${register.status}`);
if (!Array.isArray(register.source_priority) || !register.source_priority.length) errors.push('source_priority must be a non-empty array');
if (!Array.isArray(register.records)) errors.push('records must be an array');

for (const [index, record] of (register.records || []).entries()) {
  const label = `record ${index + 1}`;
  for (const key of ['record_id', 'page_url', 'claim_type', 'risk_level', 'claim_text', 'status', 'source_url', 'source_type', 'evidence_reference', 'reviewed_at', 'reviewer', 'notes']) {
    if (!(key in record)) errors.push(`${label}: missing ${key}`);
  }
  if (ids.has(record.record_id)) errors.push(`${label}: duplicate record_id ${record.record_id}`);
  ids.add(record.record_id);
  if (!/^EV-[0-9]{4,}$/.test(record.record_id || '')) errors.push(`${label}: invalid record_id`);
  if (!/^\/[^?#]*$/.test(record.page_url || '')) errors.push(`${label}: page_url must be an extensionless local path`);
  if (!allowedStatuses.has(record.status)) errors.push(`${label}: invalid status`);
  if (!allowedSources.has(record.source_type)) errors.push(`${label}: invalid source_type`);
  if (record.source_url !== null && !/^https:\/\//.test(record.source_url || '')) errors.push(`${label}: source_url must be HTTPS or null`);
  if (record.status === 'verified') {
    if (!record.source_url) errors.push(`${label}: verified record requires source_url`);
    if (!record.evidence_reference) errors.push(`${label}: verified record requires evidence_reference`);
    if (!record.reviewed_at) errors.push(`${label}: verified record requires reviewed_at`);
    if (!record.reviewer) errors.push(`${label}: verified record requires reviewer`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Evidence register valid: status=${register.status}, records=${register.records.length}; verified records require traceable source fields.`);
