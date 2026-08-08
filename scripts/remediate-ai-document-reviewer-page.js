const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-document-reviewer.html');
let source = fs.readFileSync(file, 'utf8');
const alreadyRemediated = source.includes('Direct answer: what can an AI document reviewer verify?');

const updated = '2026-08-08';
const pageUrl = 'https://detecthiddenfees.com/ai-document-reviewer';
const title = 'AI Document Reviewer: A Verification-First Workflow | DetectHiddenFees';
const displayTitle = 'AI Document Reviewer: A Verification-First Workflow';
const description = 'A verification-first workflow for using AI-assisted document review to organize questions about contracts, invoices, bills, estimates, and other financial records.';

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace('</head>', `${replacement}</head>`);
}

function removeStickyProductBar() {
  const start = source.indexOf('<div class="sticky-cta-bar">');
  if (start < 0) return;
  const bodyEnd = source.indexOf('</body>', start);
  if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
  source = source.slice(0, start) + source.slice(bodyEnd);
}

function normalizeFooter() {
  source = source.replaceAll('AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers', 'Financial Transparency Resources');
  source = source.replaceAll('AI-Powered Hidden Fee Detection for Consumers', 'Financial Transparency Resources');
  source = source.replaceAll('Financial Intelligence Center', 'AI Analysis Hub');
  source = source.replaceAll('Last updated July 2026', 'Last updated August 8, 2026');
  source = source.replaceAll('July 2026', 'August 8, 2026');
  source = source.replaceAll('DetectHiddenFees AI Analysis Team', 'Source, scope, and clarity checks');
  source = source.replaceAll('Written by</span><span style="color:#cbd5e1;font-weight:500;">DetectHiddenFees Research Team', 'Editorial owner</span><span style="color:#cbd5e1;font-weight:500;">DetectHiddenFees.com');
}

function addMobileOverflowFix() {
  if (source.includes('document-reviewer-mobile-fix')) return;
  source = source.replace('</head>', '<style id="document-reviewer-mobile-fix">.leverage-grid,.leverage-section,.review-grid,.review-card{min-width:0;max-width:100%}.leverage-section h3,.review-card h3{overflow-wrap:anywhere;word-break:break-word}.cta-block p{overflow-wrap:anywhere}</style></head>');
}

const faqItems = [
  ['What can an AI document reviewer verify?', 'It can help organize questions about extractable text, fee language, recurring charges, totals, renewal, payment, scope, and related terms when the original record is available. Material findings still require source verification.'],
  ['Can one review workflow work equally well for every document?', 'No. Contracts, invoices, bills, estimates, statements, leases, and subscriptions use different structures and evidence. Document quality, context, system configuration, and the task being asked affect the result.'],
  ['What should I review in a contract?', 'Check pricing, recurring charges, renewal and cancellation, definitions, exceptions, scope, change orders, payment triggers, liability, insurance, dispute terms, notices, and related addenda.'],
  ['What should I review in an invoice or bill?', 'Reconcile dates, quantities, rates, taxes, credits, payments, duplicate lines, recurring charges, service descriptions, and the quote, order, agreement, or Explanation of Benefits that supplies context.'],
  ['Does an AI finding prove an overcharge or error?', 'No. A flag is a lead for investigation. It does not prove illegality, fraud, excessive pricing, duplicate billing, coverage, medical necessity, or the amount ultimately owed.'],
  ['Does a clean review prove that a document has no problem?', 'No. A system can miss text, context, a defined term, an attachment, a table relationship, or a document-specific issue. Review the original record even when no concern is returned.'],
  ['How should I handle a serious finding?', 'Preserve the original document and related records, ask focused questions of the other party, check authoritative context, and consult a qualified professional when the consequences are material.'],
  ['What are the current HiddenFeeAI privacy and pricing terms?', 'This page does not independently verify current HiddenFeeAI pricing, retention, deletion, training-use, security, supported formats, or access practices. Review current first-party product materials before uploading a sensitive record.']
];

const faq = faqItems.map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DetectHiddenFees',
    url: 'https://detecthiddenfees.com/',
    logo: 'https://detecthiddenfees.com/logo.png',
    description: 'DetectHiddenFees provides research and educational resources about hidden fees, contract charges, and document review. HiddenFeeAI is its separate AI-powered document-analysis product.',
    sameAs: ['https://hiddenfeeai.com'],
    '@id': 'https://detecthiddenfees.com/#organization'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DetectHiddenFees',
    url: 'https://detecthiddenfees.com/',
    '@id': 'https://detecthiddenfees.com/#website'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    dateModified: updated,
    articleSection: 'AI document review',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Analysis Hub', item: 'https://detecthiddenfees.com/ai-analysis-hub' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: pageUrl }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: pageUrl,
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Verification-first AI-assisted document review' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': `${pageUrl}#webpage`
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq }
];

function replaceJsonLd() {
  const headEnd = source.indexOf('<body>');
  if (headEnd < 0) throw new Error('Could not locate body');
  const head = source.slice(0, headEnd);
  const matches = [...head.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)];
  if (!matches.length) throw new Error('Could not locate existing JSON-LD blocks');
  const start = matches[0].index;
  const last = matches[matches.length - 1];
  const end = last.index + last[0].length;
  const html = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
  source = source.slice(0, start) + html + source.slice(end);
}

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-analysis-hub">AI Analysis Hub</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">AI DOCUMENT REVIEW</div><h1>${displayTitle}</h1><p class="hero-sub">AI-assisted document review can help organize questions about contracts, invoices, bills, estimates, statements, leases, and other records. Use the output as a starting point and verify every material finding against the original document and related evidence.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-buttons"><a href="https://hiddenfeeai.com" class="primary-btn" rel="noopener noreferrer" data-cta-action="document_analysis" data-cta-position="top" data-cta-variant="contextual">Review My Document</a><a href="/ai-accuracy-and-limitations" class="secondary-btn">Read AI Limitations</a></div><div class="hero-trust"><span>Document type matters</span><span>Source verification required</span><span>Product terms may change</span><span>No outcome guarantee</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h2>Direct answer: what can an AI document reviewer verify?</h2><p>It can help organize questions about extractable text, fee language, recurring charges, totals, renewal, payment, scope, and related terms when the original record is available. It cannot prove that a charge is hidden, unlawful, excessive, fraudulent, recoverable, or likely to produce savings. Check every material finding against the original record.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Use the workflow by document type</h2><div class="leverage-grid"><div class="leverage-section"><h3>Contracts and agreements</h3><p>Check payment triggers, recurring charges, renewal and cancellation, definitions, exceptions, scope, change orders, liability, notices, and addenda. A flag is a question to reconcile with the agreement.</p></div><div class="leverage-section"><h3>Invoices and bills</h3><p>Compare dates, quantities, rates, taxes, credits, payments, duplicate lines, recurring charges, and service descriptions with the quote, order, contract, or applicable statement.</p></div><div class="leverage-section"><h3>Estimates and proposals</h3><p>Separate scope, allowances, materials, labor, permits, delivery, disposal, deposits, payment timing, exclusions, and change-order terms. A quote alone does not establish fair value.</p></div><div class="leverage-section"><h3>Statements and subscriptions</h3><p>Trace transaction dates, account fees, interest, adjustments, reversals, recurring debits, renewal dates, cancellation windows, and the controlling account or subscription terms.</p></div></div><h2>A verification-first review workflow</h2><div class="leverage-section"><h3>1. Preserve the complete record</h3><p>Keep the original file, pages, addenda, exhibits, receipts, notices, and related correspondence. Missing context can change the meaning of a line or clause.</p></div><div class="leverage-section"><h3>2. Ask a focused question</h3><p>State whether you are checking a fee, renewal, cancellation, total, scope, payment condition, or another defined issue. Focused questions are easier to verify than broad verdict requests.</p></div><div class="leverage-section"><h3>3. Locate the source evidence</h3><p>Record the page, section, line item, term, amount, date, trigger, exception, or notice requirement that supports each review signal. If it cannot be located, label it unverified.</p></div><div class="leverage-section"><h3>4. Reconcile related records</h3><p>Compare the source with the quote, invoice, order, payment history, explanation of benefits, renewal notice, or other record that supplies context.</p></div><div class="leverage-section"><h3>5. Decide with appropriate judgment</h3><p>Separate what the document shows from what you infer. Consult a qualified professional when legal, financial, medical, tax, construction, employment, or business consequences are material.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>What the reviewer cannot establish</h2><p>A flag, summary, extraction, comparison, or suggested question is not proof of illegality, fraud, excessive pricing, duplicate billing, coverage, medical necessity, fair market value, liability, or a successful dispute. Document quality, layout, handwriting, tables, missing pages, attachments, jurisdiction, system configuration, and information outside the record can affect the result.</p><p>A review that finds nothing is not proof that the document contains no hidden fee or unfavorable term. A review that finds something is not proof that another party must remove it.</p><h2>Privacy and product boundary</h2><p>HiddenFeeAI.com is the separate AI-powered document-analysis product. This page does not independently verify current pricing, supported formats, encryption, retention, deletion, training-use, access, vendor, or security practices. Review current first-party product materials before uploading a sensitive record, and remove unnecessary personal information when practical. See <a href="/privacy-and-ai-security">Privacy and AI Security</a> and <a href="/terms-of-service">Terms of Use</a> for the boundaries of this site’s public claims.</p></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Frequently asked questions</h2><div class="faq-section">${faqItems.map(([name, text]) => `<div class="leverage-section"><h3>${name}</h3><p>${text}</p></div>`).join('')}</div><div class="disclaimer"><strong>Disclaimer:</strong> AI-assisted document review is educational information and a question-organizing aid. It is not legal, financial, accounting, tax, medical, or other professional advice.</div></div></section><section class="section" style="padding-top:10px;"><div class="container"><div class="cta-block"><h2>Want to organize a document review?</h2><p>HiddenFeeAI is the related AI document-analysis product. Confirm its current first-party capabilities, pricing, privacy, retention, and supported-document terms before uploading a sensitive record.</p><a href="https://hiddenfeeai.com" class="cta-btn" rel="noopener noreferrer" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document</a></div><h2>Continue exploring document resources</h2><div class="leverage-grid"><a class="related-link" href="/ai-document-checker">AI Document Checker</a><a class="related-link" href="/ai-document-review-tool">AI Document Review Tool</a><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/ai-accuracy-and-limitations">AI Accuracy and Limitations</a><a class="related-link" href="/hidden-fee-detector">Hidden Fee Detector</a><a class="related-link" href="/contact">Contact</a></div></div></section></main>`;

upsertMeta(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?>(?=\s*)/i, `<meta name="description" content="${description}">`);
upsertMeta(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}">`);
upsertMeta(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${pageUrl}"/>`);
upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`);
replaceJsonLd();

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
if (!alreadyRemediated) source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
addMobileOverflowFix();
normalizeFooter();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');
fs.writeFileSync(file, source, 'utf8');
console.log(alreadyRemediated ? 'The AI document reviewer page is already remediated; normalized metadata, footer, and CTA state.' : 'Remediated AI document reviewer with a document-type workflow and evidence-safe product boundary.');
