const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-contract-review.html');
let source = fs.readFileSync(file, 'utf8');
const alreadyRemediated = source.includes('Direct answer: what can an AI contract review workflow verify?');

const updated = '2026-08-08';
const pageUrl = 'https://detecthiddenfees.com/ai-contract-review';
const title = 'AI Contract Review: A Verification-First Workflow | DetectHiddenFees';
const displayTitle = 'AI Contract Review: A Verification-First Workflow';
const description = 'A verification-first workflow for using AI-assisted contract review to locate fee language, renewal terms, cancellation conditions, and questions to check against the original agreement.';

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
  if (source.includes('contract-review-mobile-fix')) return;
  source = source.replace('</head>', '<style id="contract-review-mobile-fix">.leverage-grid,.leverage-section,.review-grid,.review-card{min-width:0;max-width:100%}.leverage-section h3,.review-card h3{overflow-wrap:anywhere;word-break:break-word}.cta-block p{overflow-wrap:anywhere}</style></head>');
}

const faqItems = [
  ['What can an AI contract review workflow verify?', 'It can help organize questions about fee language, recurring charges, renewal, cancellation, payment, scope, change orders, and related clauses when the original text is available. Every material finding should be checked against the agreement and related records.'],
  ['Can AI contract review determine whether a clause is legal?', 'No. AI-assisted review can surface language for investigation, but it cannot determine enforceability, fairness, fraud, liability, or the outcome of a dispute without the governing facts, law, jurisdiction, and qualified judgment.'],
  ['What fees should I look for in a contract?', 'Look for administrative, processing, documentation, convenience, delivery, cancellation, renewal, escalation, change-order, late-payment, pass-through, and other charges whose amount, trigger, timing, or definition should be reconciled with the agreement and any quote.'],
  ['How should I verify an AI finding?', 'Locate the exact clause or page, compare the agreement with the quote or invoice, check definitions and exceptions, confirm dates and notice requirements, consult applicable authoritative sources, and record what remains uncertain.'],
  ['Can AI review every type of contract equally well?', 'No. Results depend on document quality, layout, language, definitions, attachments, transaction context, jurisdiction, system configuration, and the task being asked. Do not generalize one review result to every contract type.'],
  ['Does an unflagged contract contain no hidden fee?', 'No. A missed issue is possible, and a clean-looking result is not proof that every fee, obligation, exception, or unfavorable term was found. Review the original agreement and related records.'],
  ['What should I do with a serious contract concern?', 'Preserve the original agreement and related records, ask the other party focused questions, and consult a qualified attorney or other professional when the financial, legal, or operational consequences are material.'],
  ['What are the current HiddenFeeAI privacy and pricing terms?', 'This page does not independently verify current HiddenFeeAI pricing, retention, deletion, training-use, security, supported formats, or access practices. Review current first-party product materials before uploading a sensitive contract.']
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
    articleSection: 'AI contract review',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Contract Review', item: pageUrl }
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
    about: { '@type': 'Thing', name: 'Verification-first AI-assisted contract review' },
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">AI CONTRACT REVIEW</div><h1>${displayTitle}</h1><p class="hero-sub">AI-assisted contract review can help organize fee language, renewal terms, cancellation conditions, and follow-up questions. Use the output as a starting point and verify every material finding against the original agreement.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-buttons"><a href="https://hiddenfeeai.com" class="primary-btn" rel="noopener noreferrer" data-cta-action="contract_review" data-cta-position="top" data-cta-variant="contextual">Review My Contract</a><a href="/ai-accuracy-and-limitations" class="secondary-btn">Read AI Limitations</a></div><div class="hero-trust"><span>Source passages matter</span><span>Human verification required</span><span>Product terms may change</span><span>No legal conclusion</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h2>Direct answer: what can an AI contract review workflow verify?</h2><p>It can help organize questions about fee language, recurring charges, renewal, cancellation, payment, scope, change orders, and related clauses when the original text is available. It cannot prove that a charge is hidden, unlawful, excessive, fraudulent, recoverable, or likely to produce savings. Locate and verify every material finding in the agreement and related records.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>A verification-first review workflow</h2><div class="leverage-section"><h3>1. Preserve the complete record</h3><p>Keep the signed or proposed agreement, addenda, exhibits, schedules, quote, invoice, notices, and related correspondence. Missing attachments, definitions, or pages can change the meaning of a clause.</p></div><div class="leverage-section"><h3>2. Define the question</h3><p>State whether you are checking an administrative fee, recurring charge, renewal window, cancellation penalty, payment trigger, change-order term, allowance, escalation formula, or another specific issue.</p></div><div class="leverage-section"><h3>3. Locate the source passage</h3><p>For each review signal, record the page, section, line item, defined term, amount, date, trigger, exception, and notice requirement. If the source passage cannot be found, treat the finding as unverified.</p></div><div class="leverage-section"><h3>4. Reconcile related records</h3><p>Compare the agreement with the quote, order, invoice, payment history, renewal notice, or other record that supplies context. Record differences instead of assuming which document controls.</p></div><div class="leverage-section"><h3>5. Escalate when the stakes require it</h3><p>For material legal, financial, construction, employment, medical, tax, or business consequences, use the review as a question list for a qualified professional rather than as a final conclusion.</p></div><h2>Contract areas worth checking</h2><div class="leverage-grid"><div class="leverage-section"><h3>Pricing and payment</h3><p>Check one-time charges, recurring amounts, taxes, credits, deposits, late fees, payment milestones, interest, pass-through costs, and conditions that change the stated total.</p></div><div class="leverage-section"><h3>Renewal and cancellation</h3><p>Check renewal dates, notice windows, delivery methods, cancellation triggers, termination charges, remaining-payment provisions, and exceptions that affect the right or cost to exit.</p></div><div class="leverage-section"><h3>Scope and changes</h3><p>Check definitions, exclusions, allowances, change-order procedures, approval requirements, material substitutions, delivery or disposal charges, and unilateral price-change language.</p></div><div class="leverage-section"><h3>Risk allocation</h3><p>Check indemnity, insurance, warranties, liability limits, dispute procedures, governing terms, confidentiality, data obligations, and clauses that shift responsibility to one party.</p></div></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>What an AI finding cannot establish</h2><p>A flag, summary, extraction, comparison, or suggested question is not proof of illegality, fraud, unfairness, breach, medical necessity, tax treatment, fair market value, liability, or a successful dispute. Document quality, layout, handwriting, tables, missing pages, definitions, attachments, jurisdiction, system configuration, and information outside the record can affect the result.</p><p>A review that finds nothing is not proof that the agreement contains no hidden fee or unfavorable term. A review that finds something is not proof that the other party must remove it. Preserve the original language and seek the right professional advice.</p><h2>Privacy and product boundary</h2><p>HiddenFeeAI.com is the separate AI-powered document-analysis product. This page does not independently verify its current pricing, supported formats, encryption, retention, deletion, training-use, access, vendor, or security practices. Review current first-party product materials before uploading a sensitive contract, and remove unnecessary personal information when practical. See <a href="/privacy-and-ai-security">Privacy and AI Security</a> and <a href="/terms-of-service">Terms of Use</a> for the boundaries of this site’s public claims.</p></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Frequently asked questions</h2><div class="faq-section">${faqItems.map(([name, text]) => `<div class="leverage-section"><h3>${name}</h3><p>${text}</p></div>`).join('')}</div><div class="disclaimer"><strong>Disclaimer:</strong> AI-assisted contract review is educational information and a question-organizing aid. It is not legal, financial, accounting, tax, construction, or other professional advice, and it does not create an attorney-client relationship.</div></div></section><section class="section" style="padding-top:10px;"><div class="container"><div class="cta-block"><h2>Want to organize a contract review?</h2><p>HiddenFeeAI is the related AI document-analysis product. Confirm its current first-party capabilities, pricing, privacy, retention, and supported-document terms before uploading a sensitive agreement.</p><a href="https://hiddenfeeai.com" class="cta-btn" rel="noopener noreferrer" data-cta-action="contract_review" data-cta-position="end" data-cta-variant="contextual">Review My Contract</a></div><h2>Continue exploring contract resources</h2><div class="leverage-grid"><a class="related-link" href="/before-signing-contract-checklist">Before Signing a Contract Checklist</a><a class="related-link" href="/contract-red-flags">Contract Red Flags</a><a class="related-link" href="/ai-contract-review-vs-chatgpt">AI Contract Review vs ChatGPT</a><a class="related-link" href="/ai-accuracy-and-limitations">AI Accuracy and Limitations</a><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/contact">Contact</a></div></div></section></main>`;

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
console.log(alreadyRemediated ? 'The AI contract review page is already remediated; normalized metadata, footer, and CTA state.' : 'Remediated AI contract review with a verification-first workflow and evidence-safe product boundary.');
