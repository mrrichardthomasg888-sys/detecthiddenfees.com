const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-accuracy-and-limitations.html');
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

if (source.includes('There is no single accuracy percentage that applies to every AI document review')) {
  removeSoftwareApplicationSchema();
  removeStickyProductBar();
  normalizeResearchFooter();
  source = source.replaceAll('"datePublished":"2026-08-08"', '"datePublished":"2026-07-19"');
  source = source.replaceAll('"datePublished":"2026-08-08"', '"datePublished":"2026-07-21"');
  fs.writeFileSync(file, source, 'utf8');
  console.log('The accuracy page is already remediated; normalized schema, sticky product bar, and research footer links.');
  process.exit(0);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

const title = 'AI Accuracy and Limitations: A Practical Review Framework | DetectHiddenFees';
const displayTitle = 'AI Accuracy and Limitations: A Practical Review Framework';
const description = 'Learn why AI document-analysis accuracy varies, what creates false positives and false negatives, how to verify findings, and why no universal accuracy percentage applies.';
const updated = '2026-08-08';

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
replaceOnce('description metadata', /<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
replaceOnce('Twitter title', /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
replaceOnce('Twitter description', /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const faq = [
  ['Is there one accuracy percentage for every AI document review?', 'No. A meaningful accuracy result must define the task, dataset, labels, system version, test date, and error measures. A percentage without that context cannot be applied to every document or use case.'],
  ['What can make an AI document finding wrong or incomplete?', 'Poor scans, handwriting, tables, missing pages, ambiguous wording, missing attachments, unfamiliar fee structures, jurisdiction, and information outside the document can all affect an AI-assisted finding.'],
  ['What is a false positive in document review?', 'A false positive is a flagged charge, clause, or pattern that appears questionable but is legitimate or understandable in its full context. The original record should be checked before any dispute or decision.'],
  ['What is a false negative in document review?', 'A false negative is an issue that is present but not flagged. No review method should be treated as proof that an unflagged document contains no hidden fee or unfavorable term.'],
  ['Can AI accuracy replace human judgment?', 'No. AI output can help organize questions, but people must verify the original clause or line item and use qualified legal, financial, accounting, tax, medical, or business advice when appropriate.'],
  ['How should I verify an AI finding?', 'Locate the exact source passage, compare related records such as a quote or prior statement, check applicable first-party or regulator guidance, record uncertainty, and avoid treating a possibility as a proven violation or savings outcome.']
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
    '@id': 'https://detecthiddenfees.com/ai-accuracy-and-limitations#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/ai-accuracy-and-limitations#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Research Center', item: 'https://detecthiddenfees.com/research-center' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/ai-accuracy-and-limitations' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/ai-accuracy-and-limitations',
    inLanguage: 'en-US',
    datePublished: '2026-07-21',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'AI document-analysis accuracy and limitations' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/ai-accuracy-and-limitations#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/research-center">Research Center</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">AI ACCURACY &amp; LIMITATIONS</div><h1>${displayTitle}</h1><p class="hero-sub">AI-assisted document review can surface questions, but it cannot replace checking the original record or qualified judgment. Accuracy varies by document quality, context, system version, and evaluation design.</p><div class="hero-buttons"><a href="/ai-analysis-methodology" class="primary-btn">Read the Methodology &rarr;</a><a href="/research-center" class="secondary-btn">Explore Research Center</a></div><div class="hero-trust"><span>No universal accuracy rate</span><span>Source and scope matter</span><span>Human verification required</span><span>Research status: collecting</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h3>Direct answer: how accurate is AI document analysis?</h3><p>There is no single accuracy percentage that applies to every AI document review. A credible evaluation must define the task, dataset, labels, system version, test date, and separate false-positive and false-negative results. Without that context, a claimed percentage is not meaningful for a particular document or decision.</p><p><strong>Important boundary:</strong> public DetectHiddenFees materials do not verify HiddenFeeAI proprietary model metrics, training data, evaluation data, security controls, retention behavior, or current product output. A flagged issue is a lead for verification, not proof that a charge is unlawful, incorrect, or recoverable.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>What “accuracy” can mean</h2><p>Document review has several different tasks: extracting text, identifying a document type, classifying fee language, matching related records, interpreting a clause, and supporting a decision. A system may perform differently on each task, so a broad accuracy label can hide important differences.</p><p>Accuracy also depends on the record being reviewed. Scan quality, handwriting, tables, missing pages, ambiguous descriptions, missing attachments, jurisdiction, and information outside the document can change what a reviewer can reasonably conclude.</p></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Common failure modes</h2><div class="leverage-section"><h3>False positives</h3><p>A false positive is a flagged charge, term, or pattern that appears questionable but is legitimate or understandable in its full context. Unusual does not automatically mean improper.</p></div><div class="leverage-section"><h3>False negatives</h3><p>A false negative is an issue that is present but not flagged. An unflagged document should not be treated as proof that it contains no hidden fee, unfavorable renewal term, or pricing discrepancy.</p></div><div class="leverage-section"><h3>Context and extraction errors</h3><p>A missing page, unreadable character, table relationship, defined term, attachment, or jurisdiction-specific rule can change the meaning of a sentence or line item. Always inspect the original record.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>A verification workflow for AI findings</h2><div class="leverage-section"><h3>1. Locate the exact passage</h3><p>Find the original clause, line item, fee name, amount, date, or account entry that supports the finding. If the passage cannot be located, label the finding unverified.</p></div><div class="leverage-section"><h3>2. Compare related records</h3><p>Check the quote, agreement, receipt, prior statement, purchase order, payment history, or other record that supplies context. Record differences instead of assuming which document is correct.</p></div><div class="leverage-section"><h3>3. Check authoritative context</h3><p>Use the applicable agreement, official pricing disclosure, regulator material, statute, or other primary source. Rules and remedies can depend on the transaction, jurisdiction, and facts.</p></div><div class="leverage-section"><h3>4. Record uncertainty and seek advice</h3><p>Separate what the document shows from what you infer. Seek qualified legal, financial, accounting, tax, medical, or business advice when the consequence of an error is material.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>What a trustworthy accuracy claim should disclose</h2><p>A useful evaluation identifies the task being measured, the source and size of the dataset, selection criteria, labels or reference answers, system version, test date, positive and negative error measures, examples of failures, and known limitations. It should also say whether the evaluation was independent and whether the result applies to the same document types and conditions that users will encounter.</p><p>As of August 8, 2026, the public DetectHiddenFees research manifest is collecting and contains no verified records or published accuracy statistics. This page therefore explains how to interpret accuracy claims without inventing a benchmark for HiddenFeeAI.</p></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>External guidance</h2><p>The <a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10" rel="noopener noreferrer">NIST AI Risk Management Framework</a> is voluntary guidance for managing AI risks and documenting trustworthiness considerations. It is not a performance evaluation or certification of HiddenFeeAI.</p><p>For related evidence standards, see the public <a href="/ai-analysis-methodology">AI analysis methodology</a>, <a href="/research-center">Research Center</a>, and <a href="/hidden-fee-index">Hidden Fee Index</a>. None of these pages publishes an unsupported universal accuracy rate.</p><h2>Frequently Asked Questions</h2><div class="leverage-section"><h3>Is there one accuracy percentage for every AI document review?</h3><p>No. A meaningful accuracy result must define the task, dataset, labels, system version, test date, and error measures. A percentage without that context cannot be applied to every document or use case.</p></div><div class="leverage-section"><h3>What can make an AI document finding wrong or incomplete?</h3><p>Poor scans, handwriting, tables, missing pages, ambiguous wording, missing attachments, unfamiliar fee structures, jurisdiction, and information outside the document can all affect an AI-assisted finding.</p></div><div class="leverage-section"><h3>What is a false positive in document review?</h3><p>A false positive is a flagged charge, clause, or pattern that appears questionable but is legitimate or understandable in its full context. The original record should be checked before any dispute or decision.</p></div><div class="leverage-section"><h3>What is a false negative in document review?</h3><p>A false negative is an issue that is present but not flagged. No review method should be treated as proof that an unflagged document contains no hidden fee or unfavorable term.</p></div><div class="leverage-section"><h3>Can AI accuracy replace human judgment?</h3><p>No. AI output can help organize questions, but people must verify the original clause or line item and use qualified advice when appropriate.</p></div><div class="leverage-section"><h3>How should I verify an AI finding?</h3><p>Locate the exact source passage, compare related records, check applicable first-party or regulator guidance, record uncertainty, and avoid treating a possibility as a proven violation or savings outcome.</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource is educational information about AI-assisted document review and evidence standards. It is not legal, accounting, tax, financial, medical, or business advice.</div></div></section><section class="section"><div class="container"><h2>Continue the research</h2><div class="related-grid"><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/research-center">Research Center</a><a class="related-link" href="/hidden-fee-index">Hidden Fee Index</a><a class="related-link" href="/ai-document-analysis-tools">AI Document Analysis Tools</a><a class="related-link" href="/privacy-and-ai-security">Privacy and AI Security</a><a class="related-link" href="/editorial-policy">Editorial Policy</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
removeSoftwareApplicationSchema();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated AI accuracy page with evidence-safe scope, evaluation standards, limitations, and FAQs.');
