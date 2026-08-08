const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-analysis-methodology.html');
let source = fs.readFileSync(file, 'utf8');

function removeSoftwareApplicationSchema() {
  const blocks = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const match of blocks) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (parsed && parsed['@type'] === 'SoftwareApplication') source = source.replace(match[0], '');
    } catch {
      // The page validators report malformed JSON-LD separately.
    }
  }
}

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const scriptStart = source.indexOf('<script>', stickyStart);
  if (scriptStart < 0) throw new Error('Could not locate the script after the sticky CTA bar');
  source = source.slice(0, stickyStart) + source.slice(scriptStart);
}

function normalizeResearchFooter() {
  source = source.replaceAll('Document Intelligence Center', 'AI Analysis Hub');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*hidden fees in agreements<\/span>/, '<a href="/hidden-contract-fees" style="color:#93c5fd;font-weight:600;">Hidden fees in agreements</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*detect billing errors<\/span>/, '<a href="/ai-bill-analyzer" style="color:#93c5fd;font-weight:600;">Detect billing errors</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*find hidden costs<\/span>/, '<a href="/hidden-fee-examples" style="color:#93c5fd;font-weight:600;">Find hidden costs</a>');
  source = source.replace(/>July 2026</g, '>August 8, 2026<');
}

if (source.includes('This page describes a public review framework for understanding hidden fees')) {
  removeSoftwareApplicationSchema();
  removeStickyProductBar();
  normalizeResearchFooter();
  source = source.replaceAll('"datePublished":"2026-08-08"', '"datePublished":"2026-07-19"');
  fs.writeFileSync(file, source, 'utf8');
  console.log('The methodology page is already remediated; normalized schema, sticky product bar, and research footer links.');
  process.exit(0);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

const title = 'AI Analysis Methodology: Evidence, Limits, and Review Framework | DetectHiddenFees';
const displayTitle = 'AI Analysis Methodology: Evidence, Limits, and Review Framework';
const description = 'See the public methodology behind DetectHiddenFees guidance: source review, document signals, human verification, evidence standards, and current research limitations.';
const updated = '2026-08-08';

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
replaceOnce('description metadata', /<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
replaceOnce('Twitter title', /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
replaceOnce('Twitter description', /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const faq = [
  ['What does the DetectHiddenFees methodology cover?', 'It covers how public educational guidance can define a fee question, identify document signals, trace claims to sources, preserve context, and state limitations. It is a review framework, not a disclosure of HiddenFeeAI proprietary implementation.'],
  ['Does this page describe HiddenFeeAI private implementation?', 'No. The public repository does not verify HiddenFeeAI source code, model configuration, training data, benchmark data, security controls, retention behavior, or current product output. Confirm product-specific details through current first-party disclosures.'],
  ['How are research claims verified?', 'A claim should have a source URL, an evidence reference or excerpt, a review date, and a stated scope. The source hierarchy favors government and regulator materials, statutes or official documents, institutional research, and original records that can be inspected.'],
  ['How are Hidden Fee Index statistics published?', 'Statistics are published only after underlying records, collection scope, terminology, dates, evidence references, and verification status pass the research publication gate. The current manifest is collecting and publishes no statistics.'],
  ['Can this methodology guarantee AI accuracy?', 'No. Accuracy depends on the document, extraction quality, context, system version, evaluation design, and consequences of error. No universal accuracy percentage is asserted here.'],
  ['Should I rely on an AI finding without checking the source?', 'No. Treat an AI finding as a question or lead. Check the original clause, line item, agreement, or account record and seek qualified legal, financial, accounting, tax, medical, or business advice when appropriate.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-19',
    dateModified: updated,
    '@id': 'https://detecthiddenfees.com/ai-analysis-methodology#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/ai-analysis-methodology#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Research Center', item: 'https://detecthiddenfees.com/research-center' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/ai-analysis-methodology' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/ai-analysis-methodology',
    inLanguage: 'en-US',
    datePublished: '2026-07-19',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'AI document-analysis methodology and evidence standards' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/ai-analysis-methodology#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/research-center">Research Center</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">RESEARCH METHODOLOGY</div><h1>${displayTitle}</h1><p class="hero-sub">This page describes a public review framework for understanding hidden fees in contracts, invoices, bills, and estimates. It does not claim to disclose HiddenFeeAI's private implementation, training data, accuracy, or security controls.</p><div class="hero-buttons"><a href="/research-center" class="primary-btn">Explore Research Center →</a><a href="/ai-accuracy-and-limitations" class="secondary-btn">Read AI Limitations</a></div><div class="hero-trust"><span>Evidence before statistics</span><span>Sources and scope are labeled</span><span>Human verification required</span><span>Research status: collecting</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h3>Direct answer: what does this methodology describe?</h3><p>It describes how DetectHiddenFees organizes public education and research about hidden fees: define the question, identify the document evidence, preserve the surrounding context, prefer authoritative sources, and state what is not known. It is not a product-performance report or a guarantee that an AI system will detect a particular charge.</p><p><strong>Important boundary:</strong> the public repository does not verify HiddenFeeAI's proprietary model, training set, benchmark data, report-generation behavior, privacy controls, or current feature set. Product-specific claims belong in current first-party product and policy materials.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Methodology at a glance</h2><div class="leverage-section"><h3>1. Define the question and scope</h3><p>State whether the review concerns a contract clause, invoice line, recurring fee, renewal term, cancellation penalty, estimate, or another document feature. Record the industry, jurisdiction when relevant, document type, and collection date.</p></div><div class="leverage-section"><h3>2. Identify the underlying evidence</h3><p>Locate the original contract, public pricing document, regulator material, statute, official disclosure, academic source, or other inspectable record. Preserve the source URL and a traceable evidence reference rather than relying on an unsourced summary.</p></div><div class="leverage-section"><h3>3. Extract signals without removing context</h3><p>Record the exact fee terminology, amount, recurring status, clause language, renewal or cancellation requirement, and nearby definitions. A phrase or number should not be interpreted without the surrounding section and related records.</p></div><div class="leverage-section"><h3>4. Corroborate and classify</h3><p>Compare the record with the applicable agreement, official guidance, or documented source context. Classify what is observed, what is inferred, and what remains unknown. A potential issue is not proof of an unlawful or improper charge.</p></div><div class="leverage-section"><h3>5. Publish limitations and update dates</h3><p>Every research result should identify who produced it, what was analyzed, when and how it was analyzed, the dataset size when one exists, source limitations, and the last-updated date. If evidence is insufficient, keep the status collecting rather than filling the gap with an estimate.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>What a document review can examine</h2><p>A review framework may organize signals such as fee names, base amounts, taxes, credits, recurring charges, escalation language, automatic renewal, termination terms, payment milestones, allowances, exclusions, and change-order provisions. It may also compare a document with a related quote, receipt, prior statement, purchase order, or agreement when those records are available.</p><p>The review cannot establish facts that are absent from the provided records. It cannot determine enforceability, fairness, fraud, tax treatment, medical necessity, or dispute success without the relevant facts, rules, and qualified judgment.</p><p>For AI-assisted review, output should be treated as a lead for verification. Scan quality, document layout, ambiguous language, missing attachments, jurisdiction, product configuration, and information outside the document can change the result.</p></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Source hierarchy and citation practice</h2><p>When available, the preferred order is government and regulator materials; statutes, regulations, and official court or agency documents; official company disclosures and public pricing documents; original DetectHiddenFees records; academic research; and high-quality institutional sources. Reputable secondary sources may provide context when primary evidence is unavailable, but they should not replace it.</p><p>A citation-quality record should preserve the source URL, organization, document type, collection or publication date, fee terminology, fee category, amount, recurring status, clause or excerpt reference, notes, and verification status. The <a href="/research-methodology">research methodology resource</a> and <a href="/hidden-fee-index">Hidden Fee Index</a> describe the current public research status.</p><p>As of August 8, 2026, the public research manifest is collecting and contains no published records or statistics. This page therefore explains the method and evidence gate without presenting fabricated prevalence, accuracy, savings, document-count, or performance numbers.</p></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>External guidance and limitations</h2><p>The <a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10" rel="noopener noreferrer">NIST AI Risk Management Framework</a> is voluntary guidance for managing AI risks and documenting trustworthiness considerations; it is not an evaluation of HiddenFeeAI. The <a href="https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions" rel="noopener noreferrer">FTC fee-disclosure guidance</a> applies to particular consumer transactions and does not decide whether a specific charge is proper.</p><p>For billing contexts, the <a href="https://www.consumerfinance.gov/consumer-tools/credit-cards/how-to-fix-mistakes-in-your-credit-card-bill/" rel="noopener noreferrer">CFPB credit-card billing guidance</a> describes a specific dispute process, while the <a href="https://consumer.ftc.gov/consumer-alerts/2026/05/run-small-business-pay-your-bills-not-scammers" rel="noopener noreferrer">FTC small-business invoice guidance</a> recommends checking unfamiliar invoices against recognized vendors and purchases. These sources are context-specific and are not universal legal, accounting, or product rules.</p><h2>Frequently Asked Questions</h2><div class="leverage-section"><h3>What does the DetectHiddenFees methodology cover?</h3><p>It covers how public educational guidance can define a fee question, identify document signals, trace claims to sources, preserve context, and state limitations. It is a review framework, not a disclosure of HiddenFeeAI proprietary implementation.</p></div><div class="leverage-section"><h3>Does this page describe HiddenFeeAI private implementation?</h3><p>No. The public repository does not verify HiddenFeeAI source code, model configuration, training data, benchmark data, security controls, retention behavior, or current product output. Confirm product-specific details through current first-party disclosures.</p></div><div class="leverage-section"><h3>How are research claims verified?</h3><p>A claim should have a source URL, an evidence reference or excerpt, a review date, and a stated scope. The source hierarchy favors government and regulator materials, statutes or official documents, institutional research, and original records that can be inspected.</p></div><div class="leverage-section"><h3>How are Hidden Fee Index statistics published?</h3><p>Statistics are published only after underlying records, collection scope, terminology, dates, evidence references, and verification status pass the research publication gate. The current manifest is collecting and publishes no statistics.</p></div><div class="leverage-section"><h3>Can this methodology guarantee AI accuracy?</h3><p>No. Accuracy depends on the document, extraction quality, context, system version, evaluation design, and consequences of error. No universal accuracy percentage is asserted here.</p></div><div class="leverage-section"><h3>Should I rely on an AI finding without checking the source?</h3><p>No. Treat an AI finding as a question or lead. Check the original clause, line item, agreement, or account record and seek qualified advice when appropriate.</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource is educational information about evidence, document review, and AI limitations. It is not legal, accounting, tax, financial, medical, or business advice.</div></div></section><section class="section"><div class="container"><h2>Continue the research</h2><div class="related-grid"><a class="related-link" href="/research-center">Research Center</a><a class="related-link" href="/hidden-fee-index">Hidden Fee Index</a><a class="related-link" href="/ai-document-analysis-tools">AI Document Analysis Tools</a><a class="related-link" href="/ai-accuracy-and-limitations">AI Accuracy and Limitations</a><a class="related-link" href="/editorial-policy">Editorial Policy</a><a class="related-link" href="/privacy-and-ai-security">Privacy and AI Security</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
removeSoftwareApplicationSchema();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated AI analysis methodology with evidence-safe scope, research standards, sources, and FAQs.');
