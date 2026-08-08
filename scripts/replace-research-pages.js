const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const LAST_UPDATED = '2026-08-08';
const LAST_UPDATED_LABEL = 'August 8, 2026';

const researchRecordPanel = `<div class="insight-block" aria-labelledby="research-record-heading"><h3 id="research-record-heading">Research record</h3><p><strong>Who:</strong> DetectHiddenFees Research Lab.</p><p><strong>What:</strong> A collection framework for public-source fee terminology, contract clauses, cancellation terms, renewal language, and unexpected charges; this is not a completed prevalence study.</p><p><strong>When:</strong> Source-level collection dates will be recorded per record. The public manifest was last updated ${LAST_UPDATED_LABEL}.</p><p><strong>How:</strong> A record must retain its source URL, scope, evidence reference, classification, and verification status before it can support a finding.</p><p><strong>Data size:</strong> The collecting manifest currently lists 0 public records and no calculated statistics.</p><p><strong>Limitations:</strong> A category or example does not establish that a fee is common, unlawful, deceptive, or representative. Inspect the <a href="/research-data.json">manifest</a> and <a href="/research-methodology">methodology</a> before citing the status.</p></div>`;
const researchButtonStyles = `.hero-buttons{display:flex;gap:18px;flex-wrap:wrap;margin:20px 0 16px}.hero-buttons a{display:inline-block;padding:16px 24px;border-radius:16px;font-weight:800;text-align:center;text-decoration:none}.hero-buttons .primary-btn{background:linear-gradient(135deg,#2563eb,#9333ea);color:#fff;box-shadow:0 12px 36px rgba(37,99,235,.35)}.hero-buttons .secondary-btn{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:#e2e8f0}@media(max-width:600px){.hero-buttons{flex-direction:column;align-items:stretch}.hero-buttons a{width:100%;text-align:center}}`;

const commonLinks = `
<p><a href="/research-data.json">Download the machine-readable research manifest</a> · <a href="/research-methodology">Read the methodology</a> · <a href="/editorial-policy">Read the editorial policy</a></p>`;

const pages = {
  'research-center.html': {
    title: 'DetectHiddenFees Research Center: Methods, Sources, and Data Status',
    description: 'Explore the DetectHiddenFees Research Center, its evidence standards, source requirements, and current Hidden Fee Index data-collection status.',
    body: `<nav class="phase3-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase3-separator" aria-hidden="true">/</span><span aria-current="page">Research Center</span></nav>
<section class="hero"><div class="container"><div class="badge">DETECTHIDDENFEES RESEARCH CENTER</div><h1>Research Center: Evidence Before Statistics</h1><p class="hero-sub">A transparent home for hidden-fee research, source review, and the public status of the 2026 Hidden Fee Index.</p><div class="hero-buttons"><a href="/hidden-fee-index" class="primary-btn">View the Hidden Fee Index</a><a href="/research-methodology" class="secondary-btn">Read the Methodology</a></div><div class="hero-trust"><span>Source-traceable records</span><span>No unpublished statistics presented as findings</span><span>Public collection status</span></div></div></section>
<section class="section" style="padding-top:20px;"><div class="container long-content"><p class="phase3-direct-answer"><strong>Direct answer:</strong> The DetectHiddenFees Research Center is building a source-traceable dataset about fee terminology, contract clauses, cancellation terms, and unexpected charges. The 2026 Hidden Fee Index is currently collecting and verifying records; it does not yet publish prevalence or dollar-impact statistics.</p><div class="leverage-section"><h3>Current status: collecting data</h3><p>The public manifest is intentionally empty until each record has a source URL, scope, evidence reference, collection date, and verification status. This prevents an empty evidence base from being presented as original research.</p>${commonLinks}</div><h2>What the Research Lab will publish</h2><ul><li>Definitions and normalized fee terminology.</li><li>Traceable examples from legitimate public documents and public research sources.</li><li>Industry, document-type, recurrence, renewal, and cancellation fields where the source supports them.</li><li>Statistics only after the dataset and methodology pass review.</li></ul><h2>Research topics</h2><p>The initial collection scope covers automotive, banking, construction, healthcare, invoices, subscriptions, and telecommunications. Each record will retain its source and jurisdictional limits rather than implying that one example represents an entire industry.</p><h2>How to interpret this page</h2><p>Planned categories, examples, and research questions are not findings. A blank statistic means “not yet calculated,” not zero. A source record may describe a fee without proving that the fee is unlawful, unreasonable, or common.</p><h2>Related resources</h2>${commonLinks}</div></section>`
  },
  'research-methodology.html': {
    title: 'Research Methodology: How DetectHiddenFees Collects and Verifies Evidence',
    description: 'Read the DetectHiddenFees research methodology for source collection, fee classification, verification, limitations, and publication gates.',
    body: `<nav class="phase3-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase3-separator" aria-hidden="true">/</span><span aria-current="page">Research Methodology</span></nav>
<section class="hero"><div class="container"><div class="badge">RESEARCH METHODOLOGY</div><h1>How We Collect and Verify Hidden-Fee Evidence</h1><p class="hero-sub">A publication standard for traceable records—not a claim that the Hidden Fee Index already has results.</p><div class="hero-buttons"><a href="/research-data.json" class="primary-btn">View the Data Manifest</a><a href="/hidden-fee-index" class="secondary-btn">View Index Status</a></div></div></section>
<section class="section" style="padding-top:20px;"><div class="container long-content"><p class="phase3-direct-answer"><strong>Direct answer:</strong> A research record is publishable only when its source, scope, collection date, evidence reference, classification, and verification status are documented. The current public dataset is still collecting records, so no prevalence, accuracy, or financial-impact result is asserted.</p><h2>Collection rules</h2><ol><li>Prefer laws, regulations, official guidance, public filings, peer-reviewed research, and clearly attributable public documents.</li><li>Record the publisher, organization, document type, industry, geography, and collection date.</li><li>Capture fee wording and relevant clauses faithfully; distinguish an exact excerpt from a normalized category.</li><li>Exclude customer documents, personal information, confidential terms, and material without publication rights.</li></ol><h2>Verification rules</h2><p>Each record receives a verification status such as pending, verified, disputed, excluded, or corrected. A source can document that a fee or clause exists without proving that it is illegal, unfair, typical, or negotiable. Those conclusions require separate evidence and a stated jurisdiction.</p><h2>Analysis rules</h2><p>Counts, percentages, ranges, and comparisons will be calculated only from records that passed the publication gate. Missing values remain missing. The dataset will disclose its denominator, date range, inclusion rules, exclusions, and limitations before any chart or summary is published.</p><h2>Correction policy</h2><p>Records can be corrected, disputed, or withdrawn when a source changes, a classification is wrong, or publication rights are unclear. The manifest changelog will record material changes. Contact the editorial team through the <a href="/contact">contact page</a>.</p><h2>Current public files</h2>${commonLinks}</div></section>`
  },
  'hidden-fee-index.html': {
    title: 'Hidden Fee Index 2026: Collection and Verification Status',
    description: 'See the current collection and verification status of the DetectHiddenFees Hidden Fee Index 2026. No unsupported statistics are presented as findings.',
    body: `<nav class="phase3-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase3-separator" aria-hidden="true">/</span><a href="/research-center">Research Center</a><span class="phase3-separator" aria-hidden="true">/</span><span aria-current="page">Hidden Fee Index</span></nav>
<section class="hero"><div class="container"><div class="badge">2026 HIDDEN FEE INDEX</div><h1>Hidden Fee Index 2026: Collection in Progress</h1><p class="hero-sub">The index is being built from source-traceable records. Published findings will appear only after evidence and methodology review.</p><div class="hero-buttons"><a href="/research-data.json" class="primary-btn">View the Public Manifest</a><a href="/research-methodology" class="secondary-btn">Read the Methodology</a></div><div class="hero-trust"><span>Status: collecting</span><span>Records: not yet published</span><span>Statistics: not yet calculated</span></div></div></section>
<section class="section" style="padding-top:20px;"><div class="container long-content"><p class="phase3-direct-answer"><strong>What this means:</strong> The 2026 Hidden Fee Index is a research project and collection framework, not a completed statistical study. The public manifest currently contains no records and no findings. This is intentional.</p><div class="leverage-section"><h3>Publication gate</h3><p>Before a record can support a summary or statistic, the Research Lab must document its source, scope, terminology, fee category, evidence reference, and verification status.</p>${commonLinks}</div><h2>Planned record fields</h2><p>The manifest is designed to support source, organization, document type, industry, collection date, fee terminology, fee category, amount, recurring status, contract clause, cancellation requirements, renewal terms, evidence reference, and verification status.</p><h2>Planned outputs</h2><ul><li>Fee terminology and clause index.</li><li>Industry and document-type comparisons where the dataset supports them.</li><li>Renewal and cancellation-pattern summaries where denominators are disclosed.</li><li>Downloadable JSON or CSV releases with methodology and changelog.</li></ul><h2>What is not being claimed</h2><p>This page does not claim that a fee is common, unlawful, deceptive, overpriced, or financially harmful merely because it is listed as a research category. It also does not publish document counts, percentages, model accuracy, or household-impact estimates.</p><h2>Use the related tool</h2><p>If you have a document to review, <a href="https://hiddenfeeai.com">HiddenFeeAI can analyze it as a separate product experience</a>. Product analysis is not automatically research evidence and is not added to this public dataset without the documented research process.</p></div></section>`
  },
  'hidden-fee-statistics.html': {
    title: 'Hidden Fee Statistics: Data Collection Status | DetectHiddenFees',
    description: 'Transparent status page for DetectHiddenFees hidden-fee statistics. Statistics remain unpublished until source data, denominators, and verification are documented.',
    body: `<nav class="phase3-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase3-separator" aria-hidden="true">/</span><a href="/research-center">Research Center</a><span class="phase3-separator" aria-hidden="true">/</span><span aria-current="page">Hidden Fee Statistics</span></nav>
<section class="hero"><div class="container"><div class="badge">ORIGINAL RESEARCH DATA</div><h1>Hidden Fee Statistics: Data Collection Status</h1><p class="hero-sub">A transparent placeholder for future statistics, with no unsupported totals, percentages, or accuracy claims.</p><div class="hero-buttons"><a href="/research-data.json" class="primary-btn">View the Empty Manifest</a><a href="/research-methodology" class="secondary-btn">Read the Methodology</a></div></div></section>
<section class="section" style="padding-top:20px;"><div class="container long-content"><p class="phase3-direct-answer"><strong>Current result:</strong> No hidden-fee statistics are published on this page because the public research dataset has not yet passed its evidence and verification gates. “Not calculated” is different from zero.</p><div class="leverage-section"><h3>Why the numbers are withheld</h3><p>A defensible statistic needs a defined population, source set, date range, inclusion rule, denominator, calculation, and limitations. Those inputs are not yet available in a public, verified dataset.</p>${commonLinks}</div><h2>Future statistics may include</h2><p>If the evidence supports them, future releases may summarize fee terminology, fee categories, recurring charges, renewal structures, cancellation windows, or industry comparisons. Each result will identify exactly which records support it.</p><h2>Not a product-performance report</h2><p>This research page will not publish model precision, recall, OCR performance, savings rates, or customer-outcome claims without a documented test protocol and reviewable evidence. A product page and a research result are different kinds of information.</p><h2>How to cite this status page</h2><p>Cite this page as a collection-status statement, not as evidence of a hidden-fee prevalence rate. Check the manifest and changelog before relying on a future release.</p></div></section>`
  },
  'hidden-fee-database.html': {
    title: 'Hidden Fee Database: Collection Framework and Public Status | DetectHiddenFees',
    description: 'Review the DetectHiddenFees hidden-fee database framework, field definitions, source requirements, and current public collection status.',
    body: `<nav class="phase3-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase3-separator" aria-hidden="true">/</span><a href="/research-center">Research Center</a><span class="phase3-separator" aria-hidden="true">/</span><span aria-current="page">Hidden Fee Database</span></nav>
<section class="hero"><div class="container"><div class="badge">HIDDEN FEE DATABASE</div><h1>Hidden Fee Database: Collection Framework</h1><p class="hero-sub">A transparent data structure for source-traceable fee records. Public entries will be added only after verification.</p><div class="hero-buttons"><a href="/research-data.json" class="primary-btn">View the Data Manifest</a><a href="/research-methodology" class="secondary-btn">Read the Methodology</a></div></div></section>
<section class="section" style="padding-top:20px;"><div class="container long-content"><p class="phase3-direct-answer"><strong>Current status:</strong> The public database is not populated yet. The manifest contains the field definitions and publication rules needed to add legitimate public records without exposing customer documents or inventing typical amounts.</p><div class="leverage-section"><h3>Empty by design</h3><p>An empty database is more useful than a directory of unsupported “typical” prices. Amounts, ranges, legal characterizations, and prevalence summaries will remain blank until a source and scope support them.</p>${commonLinks}</div><h2>Record structure</h2><p>Each future record can identify its source, organization, document type, industry, collection date, fee wording, category, amount when stated, recurrence, clause, cancellation or renewal terms, evidence reference, and verification status.</p><h2>What a database entry will not mean</h2><p>A listed fee will not automatically be unlawful, unreasonable, hidden, negotiable, or representative of an industry. Those descriptions require separate evidence and appropriate jurisdictional context.</p><h2>Privacy and rights</h2><p>The public dataset will not contain personal information, customer-uploaded documents, confidential contract text, or material without a publication basis. The research team will retain source and correction notes for published records.</p></div></section>`
  }
};

function updateHead(source, title, description) {
  let result = source.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  result = result.replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/i, `$1${description}$2`);
  result = result.replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/i, `$1${title}$2`);
  result = result.replace(/(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/i, `$1${description}$2`);
  result = result.replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*("\s*\/?>)/i, `$1${title}$2`);
  result = result.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*("\s*\/?>)/i, `$1${description}$2`);
  result = result.replace(/("dateModified"\s*:\s*")[^"]*(")/gi, `$1${LAST_UPDATED}$2`);
  result = result.replace(/July 2026/g, LAST_UPDATED_LABEL);
  result = result.replace(/<\/style>/i, `${researchButtonStyles}</style>`);
  return result;
}

function removeLegacyResearchProductSurface(source, filename) {
  const stickyPattern = /<div\s+class=["']sticky-cta-bar["'][^>]*>\s*<div\s+class=["']sticky-text["'][\s\S]*?<\/div>\s*<a\b[\s\S]*?<\/a>\s*<\/div>/gi;
  let result = source.replace(stickyPattern, '');
  if (filename === 'hidden-fee-statistics.html') {
    const faqPattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>\s*\{\s*"@context"\s*:\s*"https:\/\/schema\.org"\s*,\s*"@type"\s*:\s*"FAQPage"[\s\S]*?<\/script>/gi;
    result = result.replace(faqPattern, '');
  }
  return result;
}

function rewriteResearchSchema(source, filename, title, description) {
  const entityDescription = 'DetectHiddenFees publishes research and educational resources about hidden fees, contracts, invoices, and document-related financial risks. HiddenFeeAI is a separate AI-powered document-analysis product.';
  const breadcrumbNames = {
    'research-center.html': 'Research Center',
    'research-methodology.html': 'Research Methodology',
    'hidden-fee-index.html': 'Hidden Fee Index',
    'hidden-fee-statistics.html': 'Hidden Fee Statistics',
    'hidden-fee-database.html': 'Hidden Fee Database'
  };
  const pattern = /(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi;
  return source.replace(pattern, (full, open, payload, close) => {
    let data;
    try {
      data = JSON.parse(payload);
    } catch {
      return full;
    }
    const type = data['@type'];
    if (type === 'Organization' || type === 'WebSite') data.description = entityDescription;
    if (type === 'CollectionPage' || type === 'Article' || type === 'WebPage') {
      if (type === 'Article') data.headline = title;
      data.name = title;
      data.description = description;
    }
    if (type === 'Dataset' && filename === 'hidden-fee-statistics.html') {
      data.name = 'Hidden Fee Statistics: Collection Status';
      data.description = description;
    }
    if (type === 'BreadcrumbList' && Array.isArray(data.itemListElement)) {
      const last = data.itemListElement[data.itemListElement.length - 1];
      if (last) last.name = breadcrumbNames[filename] || title;
    }
    return `${open}${JSON.stringify(data)}${close}`;
  });
}

for (const [filename, page] of Object.entries(pages)) {
  const file = path.join(root, filename);
  const source = fs.readFileSync(file, 'utf8');
  const mainStart = source.indexOf('<main');
  const mainOpenEnd = source.indexOf('>', mainStart);
  const mainEnd = source.indexOf('</main>', mainOpenEnd);
  if (mainStart < 0 || mainOpenEnd < 0 || mainEnd < 0) {
    throw new Error(`Could not locate main content in ${filename}`);
  }
  const body = page.body.replace(/(<p class="phase3-direct-answer">[\s\S]*?<\/p>)/i, `$1${researchRecordPanel}`);
  const updated = removeLegacyResearchProductSurface(
    rewriteResearchSchema(
      updateHead(source.slice(0, mainStart) + source.slice(mainStart, mainOpenEnd + 1) + body + source.slice(mainEnd), page.title, page.description),
      filename,
      page.title,
      page.description
    ),
    filename
  );
  fs.writeFileSync(file, updated, 'utf8');
  console.log(`Replaced research content in ${filename}`);
}
