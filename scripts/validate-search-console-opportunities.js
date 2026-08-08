const fs = require('fs');
const path = require('path');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/validate-search-console-opportunities.js <private-opportunities.json>');
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
if (data.source_status !== 'connected') throw new Error('Opportunity output must be connected data');
if (!Number.isInteger(data.records) || data.records < 1) throw new Error('Opportunity output needs a positive input record count');
if (!Array.isArray(data.opportunities)) throw new Error('opportunities must be an array');
for (const [index, opportunity] of data.opportunities.entries()) {
  if (!opportunity.query || !/^https:\/\/detecthiddenfees\.com\//i.test(opportunity.page)) throw new Error(`Invalid query/page on opportunity ${index}`);
  if (!Number.isFinite(opportunity.score) || opportunity.score < 0) throw new Error(`Invalid score on opportunity ${index}`);
  if (!Array.isArray(opportunity.reason_codes) || opportunity.reason_codes.length < 1) throw new Error(`Missing reason_codes on opportunity ${index}`);
  if (!opportunity.evidence || !Number.isFinite(opportunity.evidence.impressions) || !Number.isFinite(opportunity.evidence.clicks)) throw new Error(`Missing evidence metrics on opportunity ${index}`);
  if (opportunity.evidence.high_impressions_low_ctr_thresholds && opportunity.evidence.high_impressions_low_ctr_thresholds.applied) {
    const threshold = opportunity.evidence.high_impressions_low_ctr_thresholds;
    if (threshold.high_impressions_min === null || threshold.low_ctr_max === null) throw new Error(`High-impression/low-CTR was applied without thresholds on opportunity ${index}`);
  }
}
console.log(`Search Console opportunities valid: source=connected, input_records=${data.records}, opportunities=${data.opportunities.length}.`);
