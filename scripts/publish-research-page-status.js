const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dateLabel = 'August 8, 2026';
const files = ['research-center.html', 'research-methodology.html', 'hidden-fee-index.html', 'hidden-fee-statistics.html', 'hidden-fee-database.html'];

function update(file, replacements) {
  const filePath = path.join(root, file);
  let source = fs.readFileSync(filePath, 'utf8');
  for (const [oldText, newText] of replacements) {
    if (!source.includes(oldText)) {
      if (source.includes(newText)) continue;
      throw new Error(`${file}: expected text not found: ${oldText.slice(0, 100)}`);
    }
    source = source.replaceAll(oldText, newText);
  }
  fs.writeFileSync(filePath, source, 'utf8');
}

const common = [
  ['Source-level collection dates will be recorded per record. The public manifest was last updated August 8, 2026.', `The 25 sources were collected and reviewed on ${dateLabel}. The public manifest was last updated ${dateLabel}.`],
  ['The collecting manifest currently lists 0 public records and no calculated statistics.', 'The published sample contains 25 verified records. Its category counts describe this sample only; no market-wide prevalence statistic is calculated.'],
  ['A collection framework for public-source fee terminology, contract clauses, cancellation terms, renewal language, and unexpected charges; this is not a completed prevalence study.', 'A verified public-source review of fee terminology, contract clauses, cancellation terms, renewal language, and unexpected charges; this is a documented sample, not a representative prevalence study.']
];

update('research-center.html', [
  ['A transparent home for hidden-fee research, source review, and the public status of the 2026 Hidden Fee Index.', 'A transparent home for hidden-fee research, source review, and the 2026 Hidden Fee Evidence Review.'],
  ['View the Hidden Fee Index', 'View the Evidence Review'],
  ['href="/hidden-fee-index" class="primary-btn"', 'href="/hidden-fee-database" class="primary-btn"'],
  ['<span>No unpublished statistics presented as findings</span><span>Public collection status</span>', '<span>25 verified public sources</span><span>No market-wide prevalence claim</span>'],
  ['The DetectHiddenFees Research Center is building a source-traceable dataset about fee terminology, contract clauses, cancellation terms, and unexpected charges. The 2026 Hidden Fee Index is currently collecting and verifying records; it does not yet publish prevalence or dollar-impact statistics.', 'The DetectHiddenFees Research Center publishes a source-traceable review of 25 verified public records about fee terminology, contract clauses, cancellation terms, and unexpected charges. The sample supports source-level observations, not market-wide prevalence or dollar-impact statistics.'],
  ...common,
  ['<h3>Current status: collecting data</h3><p>The public manifest is intentionally empty until each record has a source URL, scope, evidence reference, collection date, and verification status. This prevents an empty evidence base from being presented as original research.</p>', '<h3>Current status: published sample</h3><p>The public manifest contains 25 verified source records. Each record retains its original URL, evidence reference, collection date, classification, and limitations; the sample does not claim market-wide prevalence.</p>']
]);

update('research-methodology.html', [
  ['A publication standard for traceable records—not a claim that the Hidden Fee Index already has results.', 'The publication standard behind the 25-record Hidden Fee Evidence Review.'],
  ['View Index Status', 'View the Evidence Review'],
  ['href="/hidden-fee-index" class="secondary-btn"', 'href="/hidden-fee-database" class="secondary-btn"'],
  ['A research record is publishable only when its source, scope, collection date, evidence reference, classification, and verification status are documented. The current public dataset is still collecting records, so no prevalence, accuracy, or financial-impact result is asserted.', 'A research record is publishable only when its source, scope, collection date, evidence reference, classification, and verification status are documented. The public dataset now contains 25 verified public-source records, but it does not support a representative prevalence, accuracy, or financial-impact result.'],
  ...common
]);

update('hidden-fee-index.html', [
  ['2026 HIDDEN FEE INDEX', '2026 HIDDEN FEE EVIDENCE REVIEW'],
  ['Hidden Fee Index 2026: Collection in Progress', 'Hidden Fee Evidence Review 2026'],
  ['The index is being built from source-traceable records. Published findings will appear only after evidence and methodology review.', 'A source-traceable review of 25 verified public records. It is a documented sample, not a market-wide index.'],
  ['View the Public Manifest', 'View the Source Database'],
  ['href="/research-data.json" class="primary-btn"', 'href="/hidden-fee-database" class="primary-btn"'],
  ['<span>Status: collecting</span><span>Records: not yet published</span><span>Statistics: not yet calculated</span>', '<span>Status: published sample</span><span>Verified records: 25</span><span>Market prevalence: not calculated</span>'],
  ['The 2026 Hidden Fee Index is a research project and collection framework, not a completed statistical study. The public manifest currently contains no records and no findings. This is intentional.', 'The 2026 Hidden Fee Evidence Review is a source database and documented sample, not a completed statistical index. The public manifest contains 25 verified records with source-level evidence and sample-only counts; it does not claim market prevalence.'],
  ...common,
  ['Before a record can support a summary or statistic, the Research Lab must document its source, scope, terminology, fee category, evidence reference, and verification status.', 'Before a record can support a summary or statistic, the Research Lab documents its source, scope, terminology, fee category, evidence reference, and verification status. The current release contains 25 records and only sample-level counts.']
]);

update('hidden-fee-statistics.html', [
  ['Hidden Fee Statistics: Data Collection Status', 'Hidden Fee Statistics: What the Sample Supports'],
  ['Transparent status page for DetectHiddenFees hidden-fee statistics. Statistics remain unpublished until source data, denominators, and verification are documented.', 'Transparent sample analysis of 25 verified public-source records. Counts describe the reviewed sample only; no market-wide prevalence is asserted.'],
  ['Hidden Fee Statistics: Collection Status', 'Hidden Fee Statistics: Sample Analysis'],
  ['A transparent placeholder for future statistics, with no unsupported totals, percentages, or accuracy claims.', 'The 25-record public-source sample is published with sample-only counts and explicit limits; no market-wide percentages are asserted.'],
  ['View the Empty Manifest', 'View the Data Manifest'],
  ['No hidden-fee statistics are published on this page because the public research dataset has not yet passed its evidence and verification gates. “Not calculated” is different from zero.', 'The public dataset now contains 25 verified source records. It publishes record counts by sample category, but no hidden-fee prevalence, average amount, or market-wide percentage because this reviewed guidance sample is not representative.'],
  ...common,
  ['A defensible statistic needs a defined population, source set, date range, inclusion rule, denominator, calculation, and limitations. Those inputs are not yet available in a public, verified dataset.', 'A defensible market statistic needs a defined population, source set, date range, inclusion rule, denominator, calculation, and limitations. This release therefore publishes sample counts only and does not present them as market estimates.'],
  ['Cite this page as a collection-status statement, not as evidence of a hidden-fee prevalence rate.', 'Cite this page as a sample-analysis statement, not as evidence of a hidden-fee prevalence rate.']
  ,['How to cite this status page', 'How to cite this sample analysis']
]);

update('hidden-fee-database.html', [
  ['Hidden Fee Database: Collection Framework and Public Status | DetectHiddenFees', 'Hidden Fee Database: 2026 Evidence Review | DetectHiddenFees'],
  ['Review the DetectHiddenFees hidden-fee database framework, field definitions, source requirements, and current public collection status.', 'Browse 25 verified public-source records about fees, billing, contracts, renewals, and unexpected charges, with source links and methodology.'],
  ['Hidden Fee Database: Collection Framework', 'Hidden Fee Database: 2026 Evidence Review'],
  ['A transparent data structure for source-traceable fee records. Public entries will be added only after verification.', 'A transparent machine-readable database of 25 verified public-source records about fees, billing, contracts, renewals, and unexpected charges.'],
  ['View the Data Manifest', 'View the JSON Manifest'],
  ['<a href="/research-data.json" class="primary-btn">', '<a href="/research-data.json" class="primary-btn">'],
  ['<a href="/research-methodology" class="secondary-btn">Read the Methodology</a>', '<a href="/research-data.csv" class="secondary-btn">Download CSV</a>'],
  ['The public database is not populated yet. The manifest contains the field definitions and publication rules needed to add legitimate public records without exposing customer documents or inventing typical amounts.', 'The public database contains 25 verified public-source records. Each record links to its original source and retains the evidence context, collection date, classification, and limitations needed for responsible citation.'],
  ['A collection framework for public-source fee terminology, contract clauses, cancellation terms, renewal language, and unexpected charges; this is not a completed prevalence study.', 'A verified public-source review of fee terminology, contract clauses, cancellation terms, renewal language, and unexpected charges; this is a documented sample, not a representative prevalence study.'],
  ...common,
  ['<h3>Empty by design</h3><p>An empty database is more useful than a directory of unsupported “typical” prices. Amounts, ranges, legal characterizations, and prevalence summaries will remain blank until a source and scope support them.</p>', '<h3>Sample, not market index</h3><p>The records document what authoritative public sources say about fees, billing, contracts, renewals, and consumer-protection context. Counts are descriptive of this reviewed sample; they are not estimates of how often companies charge a fee.</p>'],
  ['<p><a href="/research-data.json">Download the machine-readable research manifest</a> · <a href="/research-methodology">Read the methodology</a> · <a href="/editorial-policy">Read the editorial policy</a></p>', '<p><a href="/research-data.json">Download JSON</a> · <a href="/research-data.csv">Download CSV</a> · <a href="/research-methodology">Read the methodology</a> · <a href="/editorial-policy">Read the editorial policy</a></p>'],
  ['Each future record can identify its source, organization, document type, industry, collection date, fee wording, category, amount when stated, recurrence, clause, cancellation or renewal terms, evidence reference, and verification status.', 'Each record identifies its source, organization, document type, industry, collection date, fee wording, category, amount when stated, recurrence, clause, cancellation or renewal terms, evidence reference, and verification status.'],
  ['The public dataset will not contain personal information, customer-uploaded documents, confidential contract text, or material without a publication basis.', 'The public dataset does not contain personal information, customer-uploaded documents, confidential contract text, or material without a publication basis.']
]);

const databasePath = path.join(root, 'hidden-fee-database.html');
let database = fs.readFileSync(databasePath, 'utf8');
const datasetSchema = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Dataset","name":"DetectHiddenFees 2026 Hidden Fee Evidence Review","description":"A verified public-source database of 25 fee, billing, contract, renewal, and unexpected-charge records. Counts describe the reviewed sample only.","url":"https://detecthiddenfees.com/hidden-fee-database","distribution":[{"@type":"DataDownload","encodingFormat":"application/json","contentUrl":"https://detecthiddenfees.com/research-data.json"},{"@type":"DataDownload","encodingFormat":"text/csv","contentUrl":"https://detecthiddenfees.com/research-data.csv"}],"creator":{"@type":"Organization","name":"DetectHiddenFees Research Lab","url":"https://detecthiddenfees.com/"},"temporalCoverage":"2026-08-08","isAccessibleForFree":true}</script>';
if (!database.includes('"@type":"Dataset"')) {
  if (!database.includes('</head>')) throw new Error('hidden-fee-database.html has no head close marker');
  database = database.replace('</head>', `${datasetSchema}</head>`);
  fs.writeFileSync(databasePath, database, 'utf8');
}

console.log('Updated five existing Research Lab pages to the published evidence-review status.');
