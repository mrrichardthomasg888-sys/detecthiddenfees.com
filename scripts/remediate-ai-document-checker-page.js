const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-document-checker.html');
let source = fs.readFileSync(file, 'utf8');

const title = 'AI Document Checker: What It Can and Cannot Flag | DetectHiddenFees';
const displayTitle = 'AI Document Checker: What It Can and Cannot Flag';
const description = 'Understand how an AI document checker can surface fee language, recurring charges, and follow-up questions before signing or paying—without treating its output as a final legal or financial conclusion.';
const updated = '2026-08-08';

if (source.includes('A checker output is a review queue') && source.includes('data-cta-action="document_analysis"')) {
  source = source.replace(/(<link rel="canonical"[^>]*>)>/g, '$1');
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart >= 0) {
    const bodyEnd = source.indexOf('</body>', stickyStart);
    if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
    source = source.slice(0, stickyStart) + source.slice(bodyEnd);
  }
  fs.writeFileSync(file, source, 'utf8');
  console.log('The AI document checker page is already remediated; normalized the sticky CTA state.');
  process.exit(0);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace('</head>', `${replacement}</head>`);
}

const faqEntries = [
  ['What is an AI document checker?', 'An AI document checker is software that may help surface text, amounts, clauses, and questions for review. It does not turn an uploaded document into a legal, financial, medical, insurance, tax, or accounting conclusion, and the original record remains the controlling source.'],
  ['What can an AI document checker flag for review?', 'Depending on the product and source document, it may help organize one-time or recurring charges, renewal and cancellation terms, conditional amounts, unclear descriptions, totals that need reconciliation, and exceptions that deserve a closer read. Capabilities vary and findings require verification.'],
  ['Should I use an AI document checker before signing or paying?', 'Reviewing a document before a commitment can help you identify questions while you still have the opportunity to request clarification. It does not guarantee that every issue will be found or tell you whether signing, paying, or disputing is the right decision.'],
  ['Can a checker determine whether a fee is illegal or unfair?', 'No. Whether a charge is lawful, enforceable, excessive, covered, or properly disclosed depends on the document, transaction, jurisdiction, facts, and applicable guidance. Treat a flagged term as a question to investigate.'],
  ['What documents can an AI checker review?', 'The answer depends on the product’s current supported formats and processing limits. Common use cases include contracts, estimates, invoices, bills, leases, subscription terms, and account statements, but do not assume that every file type or document length is supported.'],
  ['How should I handle private documents?', 'Check the product’s current first-party privacy, retention, processing, and security terms before uploading. Remove unnecessary identifiers when practical, keep the original record, and never place private document contents in public communications or analytics.']
].map(([name, text]) => ({
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
    sameAs: ['https://hiddenfeeai.com'],
    '@id': 'https://detecthiddenfees.com/#organization'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DetectHiddenFees',
    url: 'https://detecthiddenfees.com/',
    description: 'Educational research and document-review guidance about hidden fees and financial documents.',
    inLanguage: 'en-US',
    '@id': 'https://detecthiddenfees.com/#website'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: 'https://detecthiddenfees.com/ai-document-checker',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://detecthiddenfees.com/ai-document-checker#page' },
    author: { '@type': 'Organization', name: 'DetectHiddenFees Research Team', url: 'https://detecthiddenfees.com/about-detect-hidden-fees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-20',
    dateModified: updated,
    inLanguage: 'en-US',
    '@id': 'https://detecthiddenfees.com/ai-document-checker#article'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Analysis Hub', item: 'https://detecthiddenfees.com/ai-analysis-hub' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/ai-document-checker' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/ai-document-checker',
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'AI-assisted document checking for fee and term questions' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/ai-document-checker#page'
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntries }
];

const faqHtml = faqEntries.map((entry) => `<details><summary>${entry.name}</summary><div class="faq-answer"><p>${entry.acceptedAnswer.text}</p></div></details>`).join('');

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-analysis-hub">AI Analysis Hub</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">AI DOCUMENT CHECKER</div><h1>${displayTitle}</h1><p class="hero-sub">Use an AI document checker as a pre-signing or pre-payment question list: surface fee language, recurring charges, renewal terms, and totals that deserve a closer read, then verify each item against the original record.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-buttons"><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="document_analysis" data-cta-position="top" data-cta-variant="contextual">Review My Document</a><a href="/before-signing-contract-checklist" class="secondary-btn">Use the Before-Signing Checklist</a></div><div class="hero-trust"><span>Question list, not a legal conclusion</span><span>Verify against the source record</span><span>Document type changes the review</span><span>Check current product terms</span></div></div></section><section class="section" style="padding-top:10px"><div class="container"><div class="long-content"><div class="answer-panel"><h2>Direct answer: what should an AI document checker do?</h2><p>A checker should help you organize a document and identify passages or amounts worth verifying. A useful review starts with the source record, defines the question, separates one-time, recurring, optional, variable, and conditional charges, and then reconciles each finding with the surrounding language. A checker output is a review queue—not proof that a fee is hidden, illegal, excessive, or worth disputing.</p></div><h2>Four steps for a safer document check</h2><div class="check-grid"><div class="check-card"><span class="check-number">1</span><h3>Preserve the source</h3><p>Keep the complete contract, quote, bill, statement, addendum, notice, or estimate. Record the date, source, and version before asking for a summary.</p></div><div class="check-card"><span class="check-number">2</span><h3>Define the question</h3><p>Choose the issue that matters: total price, recurring charge, renewal, cancellation, scope, payment trigger, or another specific term.</p></div><div class="check-card"><span class="check-number">3</span><h3>Check the fee surfaces</h3><p>Review labels, definitions, footnotes, exceptions, schedules, addenda, and conditional language—not only the headline total or monthly amount.</p></div><div class="check-card"><span class="check-number">4</span><h3>Verify before acting</h3><p>Open the cited passage, compare it with the controlling record, ask the counterparty for clarification, and seek qualified advice when the decision is material.</p></div></div><h2>Checklist: what to ask the document</h2><div class="checklist-panel"><div class="checklist-item"><strong>Pricing and fees</strong><span>Which amounts are one-time, recurring, optional, variable, refundable, nonrefundable, or conditional?</span></div><div class="checklist-item"><strong>Timing and renewal</strong><span>When does a charge begin, change, renew, or stop? What notice and cancellation steps are stated?</span></div><div class="checklist-item"><strong>Scope and exclusions</strong><span>What is included in the written total, and what materials, services, taxes, supplies, or add-ons are excluded?</span></div><div class="checklist-item"><strong>Payment and reconciliation</strong><span>Do the line items, quantities, adjustments, credits, payments, and stated balance agree with the supporting records?</span></div><div class="checklist-item"><strong>Change and termination</strong><span>What triggers a change order, price adjustment, early-termination amount, late charge, or other conditional payment?</span></div><div class="checklist-item"><strong>Disclosure and exceptions</strong><span>Are definitions, footnotes, exhibits, consent notices, and exceptions incorporated into the amount or obligation?</span></div></div><h2>How the review changes by document type</h2><div class="check-grid"><div class="check-card"><h3>Contracts and leases</h3><p>Focus on definitions, renewal, notice, cancellation, termination, indemnity, addenda, and incorporated schedules. A flagged clause still needs legal and factual context.</p></div><div class="check-card"><h3>Invoices and statements</h3><p>Compare dates, descriptions, quantities, rates, taxes, adjustments, credits, prior payments, and the balance with the order, agreement, or related statement.</p></div><div class="check-card"><h3>Estimates and proposals</h3><p>Separate scope, allowances, labor, materials, permits, delivery, disposal, deposits, payment timing, and change-order terms. An estimate alone does not establish fair value.</p></div><div class="check-card"><h3>Subscriptions and accounts</h3><p>Record trial terms, renewal dates, price changes, recurring debits, cancellation method, confirmation records, and any conditions attached to the offer.</p></div></div><div class="warning-box"><h3>A flag is not a finding</h3><p>AI can miss text, misunderstand context, or surface a false positive. It cannot determine legality, enforceability, coverage, medical necessity, tax treatment, fair market value, workmanship, fraud, or the final amount owed. Treat each flag as a question to verify.</p></div><h2>Privacy and responsible use</h2><p>Review the product’s current first-party privacy, retention, processing, security, supported-format, and document-limit terms before uploading a sensitive record. Remove unnecessary account numbers, health details, signatures, and other identifiers when practical. Never put private document contents in public communications or analytics.</p><p>The <a href="https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-faqs" rel="noopener noreferrer">NIST AI Risk Management Framework FAQ</a> describes voluntary trustworthiness context for AI systems. It does not evaluate or certify DetectHiddenFees or HiddenFeeAI.</p><div class="cta-block"><h2>Ready to review a document’s fee language?</h2><p>HiddenFeeAI is the related AI document-analysis product. Confirm its current first-party capabilities and terms before uploading a sensitive document.</p><a href="https://hiddenfeeai.com" class="cta-btn" data-cta-action="document_analysis" data-cta-position="middle" data-cta-variant="contextual">Review My Document</a></div><h2>Frequently asked questions</h2><div class="faq-section">${faqHtml}</div><h2>Sources and limitations</h2><p class="source-note">This page uses the <a href="https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-faqs" rel="noopener noreferrer">NIST AI Risk Management Framework FAQ</a> for general trustworthiness context and DetectHiddenFees editorial guidance for the review workflow. NIST guidance is voluntary and does not evaluate this site or product. Product capabilities, pricing, privacy, retention, processing, and supported documents must be confirmed from current first-party information.</p><div class="disclaimer"><strong>Disclaimer:</strong> An AI document checker can help organize questions, but it cannot guarantee that every issue will be found or decide what you should do. Keep the original record and seek qualified advice when the consequences matter.</div><div class="related-articles"><h3>Continue learning</h3><div class="check-grid"><a href="/ai-document-review-tool" class="check-link">AI Document Review Tool</a><a href="/hidden-fee-detector" class="check-link">Hidden Fee Detector</a><a href="/hidden-fee-prevention-guide" class="check-link">Hidden Fee Prevention Guide</a><a href="/ai-analysis-methodology" class="check-link">AI Analysis Methodology</a><a href="/ai-accuracy-and-limitations" class="check-link">AI Accuracy and Limitations</a><a href="/contact" class="check-link">Contact DetectHiddenFees</a></div></div><div class="cta-block"><h2>Review a document for fee language</h2><p>Use the related product only after checking its current terms and deciding that the document is appropriate to upload.</p><a href="https://hiddenfeeai.com" class="cta-btn" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document</a></div></div></div></section></main>`;

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);
upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?\s*>/, '<link rel="canonical" href="https://detecthiddenfees.com/ai-document-checker">');
source = source.replace(/(<link rel="canonical"[^>]*>)>/g, '$1');

const schemaHtml = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
source = source.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
source = source.replace('</head>', `${schemaHtml}<style id="ai-document-checker-responsive">footer .footer-column a{display:block;overflow-wrap:anywhere;}.answer-panel{margin:36px 0;padding:28px 30px;border-radius:24px;background:rgba(255,255,255,.04);border:1px solid rgba(59,130,246,.14);}.answer-panel h2{margin-bottom:14px;}.check-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:28px 0 42px;}.check-card{display:block;padding:24px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);color:#dbeafe;}.check-card h3{margin:0 0 10px;color:white;font-size:1.2rem;}.check-card p{margin:0;color:#dbeafe;line-height:1.9;}.check-number{display:inline-flex;width:34px;height:34px;align-items:center;justify-content:center;margin-bottom:12px;border-radius:50%;background:rgba(59,130,246,.18);color:#bfdbfe;font-weight:900;}.checklist-panel{margin:30px 0 46px;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);}.checklist-item{display:grid;grid-template-columns:minmax(150px,.55fr) 1fr;gap:20px;padding:18px 22px;border-bottom:1px solid rgba(255,255,255,.08);}.checklist-item:last-child{border-bottom:0;}.checklist-item strong{color:white;}.checklist-item span{color:#dbeafe;line-height:1.8;}.check-link{display:block;padding:18px 20px;border-radius:16px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.15);color:#bfdbfe;font-weight:700;overflow-wrap:anywhere;}.source-note{font-size:.95rem;color:#cbd5e1;line-height:1.9;}@media(max-width:600px){.check-grid{grid-template-columns:1fr;}.answer-panel{padding:22px 18px;}.check-card{padding:20px 18px;}.checklist-item{grid-template-columns:1fr;gap:6px;padding:16px 18px;}}</style></head>`);

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);

const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
if (stickyStart >= 0) {
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
  source = source.slice(0, stickyStart) + source.slice(bodyEnd);
}

source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');
fs.writeFileSync(file, source, 'utf8');
console.log('Remediated AI document checker with a pre-signing, pre-payment review workflow and contextual CTAs.');
