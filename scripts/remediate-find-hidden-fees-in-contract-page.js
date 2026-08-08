const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'find-hidden-fees-in-contract.html');
const source = fs.readFileSync(file, 'utf8');

if (source.includes('id="find-hidden-fees-in-contract-remediation"')) {
  const normalized = source
    .replace(/<div class="sticky-cta-bar">[\s\S]*?<\/div>(?=<script|<\/body>)/i, '')
    .replace(/AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers/gi, 'Research and educational resources about hidden fees and document-related financial risks');
  if (normalized !== source) {
    fs.writeFileSync(file, normalized);
    console.log('Removed retired product-bar and footer copy from the remediated contract-fee page.');
  } else {
    console.log('Find hidden fees in contract page already remediated.');
  }
  process.exit(0);
}

const displayTitle = 'Find Hidden Fees in a Contract: Verification-First Review Guide';
const description = 'Learn how to review a contract for one-time, recurring, optional, conditional, renewal, cancellation, and termination charges without treating an AI flag as a legal conclusion.';
const updated = '2026-08-08';

const faqItems = [
  ['What should I look for when reviewing a contract for fees?', 'Check the stated total, one-time and recurring charges, payment triggers, definitions, optional products, taxes, credits, renewal terms, cancellation windows, termination charges, change provisions, and incorporated schedules.'],
  ['Can an AI review prove that a contract fee is hidden or illegal?', 'No. An AI-assisted review may locate language and organize questions, but a document signal does not establish illegality, deception, excessive pricing, enforceability, or a successful dispute. Verify the source text and applicable rules.'],
  ['How do I verify a fee found in a contract?', 'Record the page, section, defined term, amount, trigger, exception, and notice requirement. Compare the language with the quote, order, invoice, disclosure, and related correspondence, then request a written explanation when the records do not agree.'],
  ['What contract terms can change the final amount?', 'Look for recurring billing, automatic renewal, escalation formulas, late charges, minimum commitments, cancellation or termination payments, allowances, change orders, pass-through costs, and optional add-ons.'],
  ['Should I rely on an AI contract review before signing?', 'Use it as a question-organizing aid, preserve the original document and output, and seek qualified legal or financial advice when the decision has material consequences. Do not treat a summary as a substitute for reading the agreement.'],
  ['What should I confirm before uploading a contract?', 'HiddenFeeAI.com is the separate product. Confirm its current first-party capabilities, supported formats, privacy, retention, deletion, access, payment, and support terms before uploading a sensitive agreement.']
];

const faqHtml = faqItems.map(([question, answer]) => `<div class="faq-item"><h3>${question}</h3><p>${answer}</p></div>`).join('');
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
    headline: displayTitle,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-19',
    dateModified: updated,
    '@id': 'https://detecthiddenfees.com/find-hidden-fees-in-contract#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/find-hidden-fees-in-contract#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Contract Review', item: 'https://detecthiddenfees.com/ai-contract-review' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/find-hidden-fees-in-contract' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: displayTitle,
    description,
    url: 'https://detecthiddenfees.com/find-hidden-fees-in-contract',
    inLanguage: 'en-US',
    datePublished: '2026-07-19',
    dateModified: updated,
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    about: { '@type': 'Thing', name: 'Contract fee review' },
    '@id': 'https://detecthiddenfees.com/find-hidden-fees-in-contract#webpage'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }))
  }
];

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-contract-review">AI Contract Review</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">FIND HIDDEN FEES IN A CONTRACT</div><h1>${displayTitle}</h1><p class="hero-sub">An AI-assisted contract review can help locate fee language, recurring obligations, renewal terms, cancellation conditions, and follow-up questions. Verify every material finding against the original agreement and related records.</p><p class="last-updated">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-buttons"><a href="https://hiddenfeeai.com" class="primary-btn" rel="noopener noreferrer" data-cta-action="contract_review" data-cta-position="top" data-cta-variant="contextual">Review My Contract</a><a href="/ai-contract-review" class="secondary-btn">Read the contract-review guide</a></div><div class="hero-trust"><span>Source passages matter</span><span>Human verification required</span><span>Product terms may change</span><span>No legal conclusion</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h2>Direct answer: how do you find a fee in a contract?</h2><p>Start with the complete agreement and identify the stated total, one-time charges, recurring amounts, optional products, conditional costs, payment triggers, renewal terms, cancellation rules, termination charges, and incorporated schedules. Record the exact source passage and compare it with the quote, order, invoice, disclosure, and related correspondence.</p><p><strong>Important boundary:</strong> a fee label, price difference, or AI flag does not by itself prove that a charge is hidden, excessive, deceptive, unlawful, unenforceable, or recoverable.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>A verification-first contract-fee workflow</h2><div class="leverage-section"><h3>1. Preserve the complete record</h3><p>Keep the signed or proposed agreement, addenda, exhibits, schedules, quote, order, invoice, notices, and related messages. Missing pages or definitions can change the meaning of a fee clause.</p></div><div class="leverage-section"><h3>2. Define the question</h3><p>State whether you are checking an administrative fee, recurring charge, renewal window, cancellation penalty, payment trigger, escalation formula, change-order term, allowance, or another specific issue.</p></div><div class="leverage-section"><h3>3. Locate and record the source</h3><p>For each review signal, record the page, section, line item, defined term, amount, date, trigger, exception, and notice requirement. If the source passage cannot be found, treat the finding as unverified.</p></div><div class="leverage-section"><h3>4. Reconcile related records</h3><p>Compare the agreement with the quote, order, invoice, payment history, renewal notice, and written explanations. Record differences rather than assuming which document controls.</p></div><div class="leverage-section"><h3>5. Escalate when the stakes require it</h3><p>For material legal, financial, construction, employment, tax, or business consequences, use the review as a question list for a qualified professional.</p></div><h2>Contract areas worth checking</h2><div class="review-grid"><div class="review-card"><h3>Pricing and payment</h3><p>Check one-time charges, recurring amounts, taxes, credits, deposits, late fees, payment milestones, interest, pass-through costs, and conditions that change the stated total.</p></div><div class="review-card"><h3>Renewal and cancellation</h3><p>Check renewal dates, notice windows, delivery methods, cancellation triggers, termination charges, remaining-payment provisions, and exceptions that affect the cost of exit.</p></div><div class="review-card"><h3>Scope and changes</h3><p>Check definitions, exclusions, allowances, change-order procedures, approval requirements, material substitutions, delivery or disposal charges, and unilateral price-change language.</p></div><div class="review-card"><h3>Risk allocation</h3><p>Check indemnity, insurance, warranties, liability limits, dispute procedures, governing terms, confidentiality, and clauses that shift responsibility to one party.</p></div></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Official source context and limits</h2><p>The <a href="https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions" rel="noopener noreferrer">FTC fee-rule FAQ</a> describes a rule with specific coverage for live-event tickets and short-term lodging, including total-price and fee-disclosure requirements. It is not a universal rule for every contract or industry.</p><p>FTC guidance on <a href="https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions" rel="noopener noreferrer">free trials and auto-renewals</a> provides subscription context. The <a href="https://www.consumerfinance.gov/rules-policy/junk-fees/" rel="noopener noreferrer">CFPB junk-fee resource</a> provides agency context for fees charged by banks and financial companies. These sources do not decide whether a particular contract fee is valid, fair, or unlawful.</p><p>AI-assisted review may organize the text and surface questions, but document quality, missing attachments, definitions, jurisdiction, and information outside the agreement can affect the result. A review that finds nothing is not proof that no unfavorable term exists.</p><h2>Frequently asked questions</h2><div class="faq-section">${faqHtml}</div><div class="disclaimer"><strong>Disclaimer:</strong> This resource provides educational information and a question-organizing workflow. It is not legal, financial, accounting, tax, construction, or other professional advice.</div></div></section><section class="section" style="padding-top:10px;"><div class="container"><div class="cta-block"><h2>Want to organize a contract review?</h2><p>HiddenFeeAI.com is the separate AI-powered document-analysis product. Confirm its current first-party capabilities, pricing, privacy, retention, and supported-document terms before uploading a sensitive agreement.</p><a href="https://hiddenfeeai.com" class="cta-btn" rel="noopener noreferrer" data-cta-action="contract_review" data-cta-position="end" data-cta-variant="contextual">Review My Contract</a></div><h2>Continue exploring contract resources</h2><p class="related-links"><a href="/ai-contract-review">AI Contract Review</a> · <a href="/contract-red-flags">Contract Red Flags</a> · <a href="/before-signing-contract-checklist">Before Signing a Contract Checklist</a> · <a href="/ai-accuracy-and-limitations">AI Accuracy and Limitations</a> · <a href="/contact">Contact</a></p></div></section></main>`;

const style = '<style id="find-hidden-fees-in-contract-remediation">.last-updated{color:#94a3b8;font-size:.9rem}.review-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin:26px 0 46px}.review-card{padding:28px;border-radius:22px;background:rgba(15,23,42,.72);border:1px solid rgba(255,255,255,.08)}.review-card h3{font-size:1.2rem}.review-card p{margin-bottom:0}.related-links{line-height:2.2}.related-links a{color:#93c5fd;font-weight:700}@media(max-width:700px){.review-grid{grid-template-columns:1fr}.review-card{padding:22px}}</style>';
const headSchema = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
let next = source.replace(/<title>[\s\S]*?<\/title>/i, `<title>${displayTitle} | DetectHiddenFees</title>`);
next = next.replace(/<meta name="description" content="[^"]*"\s*\/?>(?=[\s\S]*?<\/head>)/i, `<meta name="description" content="${description}" />`);
next = next.replace(/<meta property="og:title" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:title" content="${displayTitle} | DetectHiddenFees" />`);
next = next.replace(/<meta property="og:description" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:description" content="${description}" />`);
next = next.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:title" content="${displayTitle} | DetectHiddenFees" />`);
next = next.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:description" content="${description}" />`);
next = next.replace(/<link rel="canonical" href="[^"]+"\s*\/?\s*>/i, '<link rel="canonical" href="https://detecthiddenfees.com/find-hidden-fees-in-contract" />');
next = next.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
next = next.replace(/<\/head>/i, `${headSchema}${style}</head>`);
next = next.replace(/<main\b[\s\S]*?<\/main>/i, main);
next = next.replace(/<div class="sticky-cta-bar">[\s\S]*?<\/div>(?=<script|<\/body>)/i, '');
next = next.replace(/AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers/gi, 'Research and educational resources about hidden fees and document-related financial risks');
fs.writeFileSync(file, next);
console.log('Remediated contract-fee page with verification-first review content, official source context, FAQs, and annotated CTAs.');
