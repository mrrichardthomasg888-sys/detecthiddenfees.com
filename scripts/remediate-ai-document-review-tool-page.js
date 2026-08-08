const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-document-review-tool.html');
let source = fs.readFileSync(file, 'utf8');

const title = 'AI Document Review Tool: A Human-Verified Review Workflow | DetectHiddenFees';
const displayTitle = 'AI Document Review Tool: A Human-Verified Review Workflow';
const description = 'Learn how to use an AI document review tool to organize fee language, recurring charges, and follow-up questions while checking every finding against the original document.';
const updated = '2026-08-08';

if (source.includes('What the tool cannot establish') && source.includes('data-cta-action="document_analysis"')) {
  source = source.replace(/(<link rel="canonical"[^>]*>)>/g, '$1');
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart >= 0) {
    const bodyEnd = source.indexOf('</body>', stickyStart);
    if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
    source = source.slice(0, stickyStart) + source.slice(bodyEnd);
  }
  fs.writeFileSync(file, source, 'utf8');
  console.log('The AI document review tool page is already remediated; normalized the sticky CTA state.');
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
  ['What is an AI document review tool?', 'An AI document review tool is software that may help organize text, clauses, amounts, and questions in a document. Its output is a review aid. The original document, applicable agreement, and qualified human judgment remain necessary for conclusions about a fee, obligation, coverage, or legal effect.'],
  ['What can an AI document review tool look for?', 'Depending on the product and document, it may help surface one-time or recurring charges, renewal and cancellation language, conditional amounts, unclear line items, totals that need reconciliation, and clauses that deserve a closer human read. Capabilities vary and no tool should be treated as guaranteed complete.'],
  ['Can AI decide whether a fee is illegal or unfair?', 'No. A model can help identify language to investigate, but legality, enforceability, fairness, coverage, and contract meaning depend on the document, transaction, jurisdiction, facts, and applicable professional or regulatory guidance.'],
  ['Can AI document review replace a lawyer, accountant, or other professional?', 'No. AI-assisted review can help prepare questions and organize records, but it is not a substitute for legal, accounting, financial, medical, insurance, or other professional advice when the issue requires specialized judgment.'],
  ['Should I upload a document with sensitive information?', 'Review the product’s current first-party privacy, retention, processing, and security terms before uploading. Remove unnecessary account numbers, health details, signatures, and other identifiers when practical, and do not place private document contents in public communications or analytics.'],
  ['How can I make an AI document review more reliable?', 'Use the complete and readable source document, state the question you want answered, ask for exact page or clause references, compare each output with the original, preserve the evidence, and obtain qualified review when the decision has legal, medical, financial, or material consequences.']
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
    url: 'https://detecthiddenfees.com/ai-document-review-tool',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://detecthiddenfees.com/ai-document-review-tool#page' },
    author: { '@type': 'Organization', name: 'DetectHiddenFees Research Team', url: 'https://detecthiddenfees.com/about-detect-hidden-fees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-01',
    dateModified: updated,
    inLanguage: 'en-US',
    '@id': 'https://detecthiddenfees.com/ai-document-review-tool#article'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Analysis Hub', item: 'https://detecthiddenfees.com/ai-analysis-hub' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/ai-document-review-tool' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/ai-document-review-tool',
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'AI-assisted financial document review' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/ai-document-review-tool#page'
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntries }
];

const faqHtml = faqEntries.map((entry) => `<details><summary>${entry.name}</summary><div class="faq-answer"><p>${entry.acceptedAnswer.text}</p></div></details>`).join('');

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-analysis-hub">AI Analysis Hub</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">AI DOCUMENT REVIEW</div><h1>${displayTitle}</h1><p class="hero-sub">An AI document review tool can help organize fee language, recurring charges, totals, and follow-up questions. Use the output as a starting point and verify every material finding against the original document.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-buttons"><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="document_analysis" data-cta-position="top" data-cta-variant="contextual">Review My Document</a><a href="/ai-analysis-methodology" class="secondary-btn">Read the Methodology</a></div><div class="hero-trust"><span>Human verification required</span><span>Compare with the original document</span><span>Ask document-specific questions</span><span>Product terms may change</span></div></div></section><section class="section" style="padding-top:10px"><div class="container"><div class="long-content"><div class="answer-panel"><h2>Direct answer: how should you use an AI document review tool?</h2><p>Use it as a triage and question-generation aid. Start with a complete, readable document and a specific question; ask the tool to locate fee language, recurring or conditional amounts, renewal terms, and totals that need reconciliation; then check each output against the source text and the surrounding clauses. AI output does not by itself prove that a charge is hidden, unlawful, excessive, covered, or enforceable.</p></div><div class="review-grid"><div class="review-card"><h3>Organize the document</h3><p>Identify the document type, parties, dates, stated total, payment schedule, definitions, addenda, and exhibits before relying on an extracted summary.</p></div><div class="review-card"><h3>Ask a focused question</h3><p>Phrase the review around the decision you face: recurring charges, renewal timing, cancellation terms, change orders, invoice reconciliation, or another defined issue.</p></div><div class="review-card"><h3>Locate the evidence</h3><p>Require page, section, line-item, or clause references when the product supports them. Open the original record and confirm that the quoted language has not been taken out of context.</p></div><div class="review-card"><h3>Decide with the records</h3><p>Preserve the document, output, notices, receipts, and written explanations. Ask a qualified professional when the stakes or subject matter require specialized judgment.</p></div></div><h2>What to review in common documents</h2><p class="section-intro">The useful questions change with the source record. A single generic score or checklist should not be treated as equally meaningful for every document type.</p><div class="review-grid"><div class="review-card"><h3>Contracts and agreements</h3><p>Look for one-time charges, recurring obligations, renewal windows, cancellation and termination triggers, defined terms, exceptions, notice rules, and incorporated addenda.</p></div><div class="review-card"><h3>Invoices and bills</h3><p>Compare descriptions, dates, quantities, rates, taxes, credits, prior payments, and the stated balance with the quote, order, contract, or Explanation of Benefits when applicable.</p></div><div class="review-card"><h3>Estimates and proposals</h3><p>Separate scope, allowances, materials, labor, permits, delivery, disposal, change-order rules, deposits, payment timing, and conditional charges. A quote alone does not establish fair value.</p></div><div class="review-card"><h3>Financial statements</h3><p>Trace transactions, account fees, interest, adjustments, reversals, recurring debits, and the statement period to the account agreement and supporting records.</p></div></div><div class="warning-box"><h3>What the tool cannot establish</h3><p>AI-assisted review cannot determine medical necessity, legal enforceability, insurance coverage, tax treatment, fair market value, workmanship, fraud, or the final amount owed. It can also miss text, misunderstand context, or surface a false positive. Treat every material finding as a question to verify.</p></div><h2>Privacy and responsible use</h2><p>Before uploading a sensitive record, read the related product’s current first-party privacy, retention, processing, and security terms. Remove unnecessary account numbers, health details, signatures, and other identifiers when practical. Do not place private document contents in public communications or analytics. The <a href="https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-faqs" rel="noopener noreferrer">NIST AI Risk Management Framework FAQ</a> describes trustworthiness characteristics and is voluntary guidance, not certification of DetectHiddenFees or HiddenFeeAI.</p><div class="methodology-panel"><h2>Our review standard</h2><p>DetectHiddenFees describes document analysis as an evidence-preserving workflow: define the question, identify the relevant source passage, compare the amount or obligation with the controlling record, state uncertainty, and preserve the next question. See the <a href="/ai-analysis-methodology">AI analysis methodology</a>, <a href="/ai-accuracy-and-limitations">AI accuracy and limitations</a>, and <a href="/editorial-policy">editorial policy</a> for the publishing and review standards used on this site.</p></div><div class="cta-block"><h2>Have a document you want to organize for review?</h2><p>HiddenFeeAI is the related AI document-analysis product. Confirm its current first-party capabilities, supported documents, pricing, privacy, and retention terms before uploading a sensitive record.</p><a href="https://hiddenfeeai.com" class="cta-btn" data-cta-action="document_analysis" data-cta-position="middle" data-cta-variant="contextual">Review My Document</a></div><h2>Frequently asked questions</h2><div class="faq-section">${faqHtml}</div><h2>Sources and limitations</h2><p class="source-note">This page uses the <a href="https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-faqs" rel="noopener noreferrer">NIST AI Risk Management Framework FAQ</a> for general trustworthiness context. NIST guidance is voluntary and does not evaluate this site or product. Product capabilities and handling of uploaded records must be confirmed from current first-party information. The guidance on this page is educational and should not replace legal, financial, medical, insurance, accounting, or other professional advice.</p><div class="disclaimer"><strong>Disclaimer:</strong> AI-assisted document review can help organize questions, but it cannot guarantee that every issue will be found or decide what you should do. Keep the original record and seek qualified advice when the consequences matter.</div><div class="related-articles"><h3>Continue learning</h3><div class="review-grid"><a href="/hidden-fee-detector" class="review-link">Hidden Fee Detector</a><a href="/ai-document-checker" class="review-link">AI Document Checker</a><a href="/ai-analysis-methodology" class="review-link">AI Analysis Methodology</a><a href="/ai-accuracy-and-limitations" class="review-link">AI Accuracy and Limitations</a><a href="/hidden-fee-encyclopedia" class="review-link">Hidden Fee Encyclopedia</a><a href="/contact" class="review-link">Contact DetectHiddenFees</a></div></div><div class="cta-block"><h2>Review a document for fee language</h2><p>Use the related product only after checking its current terms and deciding that the document is appropriate to upload.</p><a href="https://hiddenfeeai.com" class="cta-btn" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document</a></div></div></div></section></main>`;

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);
upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?\s*>/, '<link rel="canonical" href="https://detecthiddenfees.com/ai-document-review-tool">');
source = source.replace(/(<link rel="canonical"[^>]*>)>/g, '$1');

const schemaHtml = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
source = source.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
source = source.replace('</head>', `${schemaHtml}<style id="ai-document-review-tool-responsive">footer .footer-column a{display:block;overflow-wrap:anywhere;}.answer-panel,.methodology-panel{margin:36px 0;padding:28px 30px;border-radius:24px;background:rgba(255,255,255,.04);border:1px solid rgba(59,130,246,.14);}.answer-panel h2,.methodology-panel h2{margin-bottom:14px;}.review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:28px 0 42px;}.review-card{display:block;padding:24px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);color:#dbeafe;}.review-card h3{margin:0 0 10px;color:white;font-size:1.2rem;}.review-card p{margin:0;color:#dbeafe;line-height:1.9;}.review-link{display:block;padding:18px 20px;border-radius:16px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.15);color:#bfdbfe;font-weight:700;overflow-wrap:anywhere;} .source-note{font-size:.95rem;color:#cbd5e1;line-height:1.9;}@media(max-width:600px){.review-grid{grid-template-columns:1fr;}.answer-panel,.methodology-panel{padding:22px 18px;}.review-card{padding:20px 18px;}}</style></head>`);

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
console.log('Remediated AI document review tool with a human-verified workflow, qualified product language, and contextual CTAs.');
