const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'consumer-fee-trends-report.html');
let source = fs.readFileSync(file, 'utf8');

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const scriptStart = source.indexOf('<script', stickyStart);
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate the document end after the sticky CTA bar');
  source = scriptStart >= 0 && scriptStart < bodyEnd
    ? source.slice(0, stickyStart) + source.slice(scriptStart)
    : source.slice(0, stickyStart) + source.slice(bodyEnd);
}

function normalizeResearchFooter() {
  source = source.replaceAll('Document Intelligence Center', 'AI Analysis Hub');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*hidden fees in agreements<\/span>/, '<a href="/hidden-contract-fees" style="color:#93c5fd;font-weight:600;">Hidden fees in agreements</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*detect billing errors<\/span>/, '<a href="/ai-bill-analyzer" style="color:#93c5fd;font-weight:600;">Detect billing errors</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*find hidden costs<\/span>/, '<a href="/hidden-fee-examples" style="color:#93c5fd;font-weight:600;">Find hidden costs</a>');
  source = source.replace(/>July 2026</g, '>August 8, 2026<');
}

function ensureResponsiveFooter() {
  const marker = '<style id="consumer-fee-trends-responsive">';
  if (source.includes(marker)) return;
  source = source.replace('</head>', `${marker}footer .footer-column a{display:block;overflow-wrap:anywhere;}@media (max-width:600px){.content-wrap table{font-size:.92rem;}}</style></head>`);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) {
    source = source.replace(pattern, replacement);
  } else {
    source = source.replace('</head>', `${replacement}</head>`);
  }
}

const title = 'Consumer Fee Trends Report 2026: Evidence Status | DetectHiddenFees';
const displayTitle = 'Consumer Fee Trends Report 2026: Evidence Status';
const description = 'A collecting-only consumer fee trends report. See the study scope, methodology, primary sources, limitations, and why no national fee estimates are published yet.';
const updated = '2026-08-08';
const updatedLabel = 'August 8, 2026';

const faq = [
  ['Has DetectHiddenFees published a national hidden-fee total?', 'No. The public Hidden Fee Index manifest is still marked collecting, has no published records, and does not publish statistics. A national total would require a defined, reviewable dataset and reproducible analysis.'],
  ['What does this report measure?', 'The planned study records fee terminology, category, amount when stated, recurring status, relevant clauses, cancellation or renewal terms, source details, and a traceable evidence reference across public documents and authoritative sources.'],
  ['Why are there no percentages or rankings?', 'Percentages, averages, rankings, and trend claims can mislead when the collection frame, denominator, dates, and source records are not available for inspection. They will remain unpublished until the research publication gate is met.'],
  ['Which sources does the study prioritize?', 'The study prioritizes government agencies, regulators, statutes, court or government documents, official disclosures, public pricing documents, academic research, and other high-quality institutional sources before secondary sources.'],
  ['Are regulatory developments the same as a consumer fee trend?', 'No. A rule, enforcement action, or public guidance describes a legal or policy development. It does not by itself establish how often a fee appears, how much consumers pay, or whether a category is increasing overall.'],
  ['How can I review a fee in my own document?', 'Preserve the original document, locate the fee definition and amount, compare it with the quoted or advertised total, check renewal or cancellation language, and ask the provider for a written explanation. For material disputes, consider qualified professional or regulator assistance.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

if (source.includes('This page reports the public status of the DetectHiddenFees consumer-fee study')) {
  removeStickyProductBar();
  normalizeResearchFooter();
  ensureResponsiveFooter();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The consumer fee trends report is already remediated; normalized the research footer and sticky bar.');
  process.exit(0);
}

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees Research Lab' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-01',
    dateModified: updated,
    articleSection: 'Research',
    '@id': 'https://detecthiddenfees.com/consumer-fee-trends-report#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/consumer-fee-trends-report#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Research Center', item: 'https://detecthiddenfees.com/research-center' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/consumer-fee-trends-report' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/consumer-fee-trends-report',
    inLanguage: 'en-US',
    datePublished: '2026-07-01',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Consumer fee research methodology and evidence status' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/consumer-fee-trends-report#webpage'
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq }
];

const headEnd = source.indexOf('<body>');
const head = source.slice(0, headEnd);
const ldBlocks = [...head.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)];
const ldStart = ldBlocks[0]?.index ?? -1;
const ldEnd = ldBlocks.length ? ldBlocks[ldBlocks.length - 1].index + ldBlocks[ldBlocks.length - 1][0].length : -1;
if (headEnd < 0 || ldStart < 0 || ldEnd < 0) throw new Error('Could not locate existing JSON-LD blocks');
const ldHtml = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
source = source.slice(0, ldStart) + ldHtml + source.slice(ldEnd);

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/research-center">Research Center</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="page-header"><div class="container"><div class="badge">RESEARCH STATUS &bull; DATA COLLECTION</div><h1>${displayTitle}</h1><p class="page-sub">This page reports the public status of the DetectHiddenFees consumer-fee study. It publishes the scope, evidence rules, and primary-source context without presenting an unsupported national total, percentage, ranking, or prediction as a research finding.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">${updatedLabel}</time> &bull; Status: collecting</p></div></section><section class="content-section"><div class="container content-wrap"><div class="toc"><strong>Research contents</strong><a href="#answer">Direct answer</a><a href="#verified">What is verified now</a><a href="#scope">Study scope</a><a href="#methodology">Methodology and publication gate</a><a href="#sources">Primary sources</a><a href="#limitations">Limitations</a><a href="#faq">Frequently asked questions</a></div><section id="answer"><h2>Direct answer: are hidden fees increasing overall?</h2><p><strong>There is not yet a verified DetectHiddenFees estimate for that question.</strong> The public <a href="/research-data.json">Hidden Fee Index manifest</a> is marked <strong>collecting</strong>, its records array is empty, and its statistics field is null. This report therefore describes the study and its source context rather than claiming a national trend.</p><div class="stat-card"><div class="stat-num">Collecting</div><div class="stat-label">Public research status</div></div><div class="stat-card"><div class="stat-num">0</div><div class="stat-label">Publicly published research records</div></div></section><section id="verified"><h2>What is verified now</h2><p>Primary sources show that fee transparency and unexpected charges are active regulatory and consumer-protection topics. Those sources are useful context, but they are not a substitute for a representative DetectHiddenFees dataset.</p><ul><li>The <a href="https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions" rel="noopener noreferrer">FTC fee-rule FAQ</a> explains how covered businesses must present mandatory fees and distinguishes mandatory, optional, government, shipping, and later-incurred charges within the rule's scope.</li><li>The <a href="https://www.consumerfinance.gov/rules-policy/junk-fees/" rel="noopener noreferrer">CFPB junk-fee resource</a> collects agency material about fees charged by banks and financial companies, including overdraft and nonsufficient-funds fee practices.</li><li><a href="https://www.consumerfinance.gov/rules-policy/regulations/1005/17/" rel="noopener noreferrer">Regulation E section 1005.17</a> describes disclosure and affirmative-consent requirements for covered overdraft services; the transaction and account details matter.</li><li>The <a href="https://www.cms.gov/newsroom/fact-sheets/no-surprises-understand-your-rights-against-surprise-medical-bills" rel="noopener noreferrer">CMS No Surprises overview</a> explains protections and good-faith-estimate rights in specified medical-billing situations, along with important coverage limits.</li><li>The <a href="https://www.ftc.gov/legal-library/browse/rules/negative-option-rule" rel="noopener noreferrer">FTC Negative Option Rule page</a> tracks federal material about recurring payments and cancellation practices. A rulemaking or enforcement development should not be turned into a prevalence estimate without separate evidence.</li></ul></section><section id="scope"><h2>Study scope</h2><p>The planned Hidden Fee Index covers public, reviewable records from the United States, with scope recorded per source. Initial industries include automotive, banking, construction, healthcare, invoices, subscriptions, and telecommunications.</p><p>Candidate source materials include public contracts, public estimates, public invoice examples, regulatory documents, official pricing disclosures, and high-quality institutional or academic research. Customer documents, personal information, and confidential contract text are excluded from the public dataset.</p><div style="overflow-x:auto;margin:24px 0;"><table style="width:100%;border-collapse:collapse;color:#e2e8f0;"><thead><tr><th scope="col" style="text-align:left;padding:14px;border-bottom:1px solid rgba(148,163,184,.25);color:#bfdbfe;">Research field</th><th scope="col" style="text-align:left;padding:14px;border-bottom:1px solid rgba(148,163,184,.25);color:#bfdbfe;">What will be recorded</th></tr></thead><tbody><tr><td style="padding:14px;border-bottom:1px solid rgba(148,163,184,.12);">Source and scope</td><td style="padding:14px;border-bottom:1px solid rgba(148,163,184,.12);">Publisher, stable URL, organization, document type, geography, and collection date.</td></tr><tr><td style="padding:14px;border-bottom:1px solid rgba(148,163,184,.12);">Fee description</td><td style="padding:14px;border-bottom:1px solid rgba(148,163,184,.12);">Exact terminology or faithful normalized wording, category, amount when stated, and recurring status.</td></tr><tr><td style="padding:14px;border-bottom:1px solid rgba(148,163,184,.12);">Contract context</td><td style="padding:14px;border-bottom:1px solid rgba(148,163,184,.12);">Clause, cancellation requirement, renewal term, and a page, section, line, or other evidence reference.</td></tr><tr><td style="padding:14px;">Verification</td><td style="padding:14px;">Pending, verified, disputed, excluded, or corrected status with notes.</td></tr></tbody></table></div></section><section id="methodology"><h2>Methodology and publication gate</h2><p>The collection workflow is designed so another reviewer can trace a published record back to the underlying source:</p><ol><li>Define the source, industry, geography, document type, and collection date.</li><li>Capture the fee wording and surrounding context without removing qualifiers.</li><li>Record amounts, recurring status, cancellation or renewal language only when the source states them.</li><li>Attach a stable URL and precise evidence reference.</li><li>Review the classification and mark the record pending, verified, disputed, excluded, or corrected.</li><li>Run quality checks for duplicates, scope mismatches, unsupported normalization, and personal or confidential information.</li><li>Publish aggregate findings only after the records, denominator, date range, analysis version, and limitations are inspectable.</li></ol><p>The current <a href="/research-methodology">research methodology</a> and <a href="/research-data.json">machine-readable manifest</a> are the authoritative public status documents. No aggregate finding is implied by the headings below or by a source being listed.</p></section><section id="sources"><h2>Primary sources and source hierarchy</h2><p>Sources are ranked by authority and inspectability: government and regulators first; statutes and regulations; court or government documents; official disclosures and public pricing; academic and institutional research; then reputable secondary sources where necessary. A source is not treated as proof of a DetectHiddenFees trend merely because it discusses fees.</p><p>Source links on this page are provided for context and reader verification. They do not endorse DetectHiddenFees or HiddenFeeAI, and they do not establish a product performance claim.</p></section><section id="limitations"><h2>Limitations</h2><p>The study is not a survey of all consumer transactions, a legal index, a price-comparison database, or a measurement of total consumer harm. A fee can be disclosed and still require contract-specific review; a fee can also be unexpected without the available evidence establishing that it is unlawful.</p><p>Until the public records and analysis pass the publication gate, this page will not state prevalence, average amounts, total costs, growth rates, savings, model accuracy, or industry rankings. Future updates must identify what changed and link the supporting evidence.</p></section><section id="faq"><h2>Frequently asked questions</h2><div class="leverage-section"><h3>Has DetectHiddenFees published a national hidden-fee total?</h3><p>No. The public Hidden Fee Index manifest is still marked collecting, has no published records, and does not publish statistics. A national total would require a defined, reviewable dataset and reproducible analysis.</p></div><div class="leverage-section"><h3>What does this report measure?</h3><p>The planned study records fee terminology, category, amount when stated, recurring status, relevant clauses, cancellation or renewal terms, source details, and a traceable evidence reference across public documents and authoritative sources.</p></div><div class="leverage-section"><h3>Why are there no percentages or rankings?</h3><p>Percentages, averages, rankings, and trend claims can mislead when the collection frame, denominator, dates, and source records are not available for inspection. They will remain unpublished until the research publication gate is met.</p></div><div class="leverage-section"><h3>Which sources does the study prioritize?</h3><p>The study prioritizes government agencies, regulators, statutes, court or government documents, official disclosures, public pricing documents, academic research, and other high-quality institutional sources before secondary sources.</p></div><div class="leverage-section"><h3>Are regulatory developments the same as a consumer fee trend?</h3><p>No. A rule, enforcement action, or public guidance describes a legal or policy development. It does not by itself establish how often a fee appears, how much consumers pay, or whether a category is increasing overall.</p></div><div class="leverage-section"><h3>How can I review a fee in my own document?</h3><p>Preserve the original document, locate the fee definition and amount, compare it with the quoted or advertised total, check renewal or cancellation language, and ask the provider for a written explanation. For material disputes, consider qualified professional or regulator assistance.</p></div><div class="disclaimer"><strong>Research disclaimer:</strong> This page reports the status and design of an evidence-collection project. It is not legal, financial, medical, or accounting advice.</div></section><section><h2>Continue with the research</h2><div class="related-grid"><a href="/research-center">Research Center</a><a href="/hidden-fee-index">Hidden Fee Index</a><a href="/research-methodology">Research Methodology</a><a href="/hidden-fee-statistics">Hidden Fee Statistics</a><a href="/hidden-fee-database">Hidden Fee Database</a><a href="/editorial-policy">Editorial Policy</a></div></section></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
removeStickyProductBar();
ensureResponsiveFooter();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated consumer fee trends report as a collecting-only, primary-source research status page.');
