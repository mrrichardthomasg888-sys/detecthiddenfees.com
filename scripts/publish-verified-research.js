const fs = require('fs');
const path = require('path');

if (process.argv[2] !== '--publish') {
  console.error('Publication is gated. Use: node scripts/publish-verified-research.js --publish');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const collection = JSON.parse(fs.readFileSync(path.join(root, 'seo/research-collection.json'), 'utf8'));
const records = collection.records || [];
if (collection.publication_status !== 'not_published') throw new Error('Expected the private collection to be unpublished before this explicit promotion.');
if (!records.length || records.some(record => record.verification_status !== 'verified')) throw new Error('Every promoted research record must be verified.');

const countBy = field => records.reduce((counts, record) => {
  const value = record[field] || 'not_stated';
  counts[value] = (counts[value] || 0) + 1;
  return counts;
}, {});
const publicRecords = records.map(record => ({
  record_id: record.record_id,
  source: record.source,
  source_url: record.source_url,
  organization: record.organization,
  industry: record.industry,
  document_type: record.document_type,
  collection_date: record.date_collected,
  source_date: record.source_date,
  fee_terminology: record.fee_terminology,
  fee_category: record.fee_category,
  fee_amount: record.fee_amount,
  currency: record.currency,
  recurring_status: record.recurring_status,
  contract_clause: record.contract_clause,
  cancellation_requirements: record.cancellation_requirements,
  renewal_terms: record.renewal_terms,
  evidence: record.evidence,
  evidence_reference: record.evidence_reference,
  verification_status: record.verification_status,
  notes: record.notes
}));
const manifest = {
  title: 'DetectHiddenFees 2026 Hidden Fee Evidence Review',
  version: '0.2.0',
  status: 'published',
  asset_type: 'verified public-source database and evidence review',
  creator: 'DetectHiddenFees Research Lab',
  published_at: collection.last_updated,
  updated_at: collection.last_updated,
  methodology_url: 'https://detecthiddenfees.com/research-methodology',
  landing_page: 'https://detecthiddenfees.com/hidden-fee-database',
  data_downloads: {
    json: 'https://detecthiddenfees.com/research-data.json',
    csv: 'https://detecthiddenfees.com/research-data.csv'
  },
  scope: {
    geography: 'United States-focused public government and regulatory guidance; scope is recorded per source.',
    industries: Object.keys(countBy('industry')),
    document_types: ['consumer guidance', 'consumer alert', 'policy resource', 'rights guide', 'consumer tool']
  },
  statistics: {
    verified_record_count: records.length,
    record_count_by_industry: countBy('industry'),
    record_count_by_fee_category: countBy('fee_category'),
    interpretation: 'These are counts in this reviewed source sample. They are not market shares, prevalence rates, or estimates of how often companies charge a fee.'
  },
  records: publicRecords,
  field_definitions: {
    source: 'Exact title of the public source page.',
    source_url: 'Canonical public URL supporting the record.',
    organization: 'Publisher or agency responsible for the source.',
    document_type: 'Source format or guidance type.',
    industry: 'Industry context assigned to the source record.',
    collection_date: 'UTC date on which DetectHiddenFees collected the source.',
    source_date: 'Publication or last-modified date when available; otherwise null.',
    fee_terminology: 'Fee or clause wording supported by the source.',
    fee_category: 'Controlled category assigned by the methodology.',
    fee_amount: 'Amount only when explicitly stated for the record; otherwise null.',
    recurring_status: 'Recurring status only when explicit; otherwise not_stated.',
    contract_clause: 'Relevant agreement or disclosure context when stated.',
    cancellation_requirements: 'Cancellation conditions stated by the source when applicable.',
    renewal_terms: 'Renewal language stated by the source when applicable.',
    evidence: 'Factual paraphrase limited to what the source supports.',
    evidence_reference: 'Section or page location used for source review.',
    verification_status: 'Verified means the source, title, URL, date metadata, and evidence statement were checked on the collection date.'
  },
  methodology: {
    sample_definition: 'Public US government, regulator, and official consumer-guidance pages selected for direct relevance to fees, billing, contracts, renewals, cancellations, and document review.',
    collection_period: '2026-08-08 source review in this release.',
    inclusion_rule: 'A source must be publicly accessible, have a traceable canonical URL, and contain a relevant factual statement that can be cited without inference.',
    exclusion_rule: 'No customer documents, personal information, confidential terms, unsupported statistics, or claims not stated by the source are included.',
    analysis_rule: 'Counts describe this reviewed source sample only. No market-wide prevalence, average fee, savings, legality, or representativeness claim is calculated.'
  },
  limitations: [
    'This is a curated source sample, not a representative survey of companies, contracts, bills, or transactions.',
    'Most records are government consumer guidance or policy resources rather than underlying customer documents or company fee schedules.',
    'Record counts describe the published sample and must not be read as industry prevalence or market share.',
    'A source can describe a fee, clause, allegation, or consumer-protection process without proving that an individual charge is unlawful or improper.',
    'Source content and applicable law can change; review the linked original source and its date before relying on a record.',
    'The dataset contains no customer-uploaded documents, personal information, confidential contract text, or private Search Console data.'
  ],
  citation_guidance: 'Cite the asset as: DetectHiddenFees Research Lab, DetectHiddenFees 2026 Hidden Fee Evidence Review, version 0.2.0, accessed 2026-08-08. Link the specific record source URL when making a source-level claim.',
  sources: publicRecords.map(record => ({ source: record.source, source_url: record.source_url, organization: record.organization, source_date: record.source_date })),
  corrections_contact: 'https://detecthiddenfees.com/contact',
  changelog: [
    { version: '0.2.0', date: collection.last_updated, change: 'Published 25 verified public-source records with sample-only counts, methodology, limitations, and JSON/CSV downloads.' },
    { version: '0.1.0', date: '2026-08-08', change: 'Created the public research manifest and collection schema.' }
  ]
};

function csvCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}
const csvFields = ['record_id', 'source', 'source_url', 'organization', 'industry', 'document_type', 'collection_date', 'source_date', 'fee_terminology', 'fee_category', 'fee_amount', 'currency', 'recurring_status', 'contract_clause', 'cancellation_requirements', 'renewal_terms', 'evidence', 'evidence_reference', 'verification_status', 'notes'];
const csv = [csvFields.join(','), ...publicRecords.map(record => csvFields.map(field => csvCell(record[field])).join(','))].join('\n') + '\n';
fs.writeFileSync(path.join(root, 'research-data.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(root, 'research-data.csv'), csv, 'utf8');
console.log(`Published ${records.length} verified research records to research-data.json and research-data.csv.`);
