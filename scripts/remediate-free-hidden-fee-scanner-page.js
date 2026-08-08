const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'free-hidden-fee-scanner.html');
const source = fs.readFileSync(file, 'utf8');

if (source.includes('id="free-hidden-fee-scanner-remediation"')) {
  const normalized = source.replace(/<div class="sticky-cta-bar">[\s\S]*?<\/div>(?=<script|<\/body>)/i, '');
  if (normalized !== source) {
    fs.writeFileSync(file, normalized);
    console.log('Removed the retired sticky product bar from the remediated scanner page.');
  } else {
    console.log('Free hidden fee scanner page already remediated.');
  }
  process.exit(0);
}

const displayTitle = 'Free Hidden Fee Scanner: A Source-Aware Review Checklist';
const description = 'Use this free checklist to review bills, invoices, contracts, and account records for fee language, recurring charges, and mismatched totals. It is not a promise of automatic detection or savings.';
const updated = '2026-08-08';

const faqItems = [
  ['Is this a free automated hidden-fee scanner?', 'This page is a free educational checklist. It does not independently verify a free automated scanning service, guaranteed detection, or a particular product result. Use the checklist with the original record.'],
  ['What should I check on a bill or invoice?', 'Compare descriptions, dates, quantities, rates, taxes, credits, prior payments, recurring lines, optional products, and the stated total with the quote, order, contract, or account terms.'],
  ['What should I check in a contract?', 'Look for one-time and recurring charges, payment triggers, renewal and cancellation terms, termination charges, definitions, addenda, schedules, change provisions, and pass-through costs.'],
  ['Can a separate or unexpected charge prove an overcharge?', 'No. It may be worth questioning, but the line alone does not establish that the amount is improper, unlawful, deceptive, excessive, or recoverable. Reconcile the records first.'],
  ['Can AI find every hidden fee?', 'No. Document quality, layout, missing pages, context, definitions, and information outside the record can affect an AI-assisted review. Verify every material finding against the source.'],
  ['What should I confirm before uploading a document?', 'HiddenFeeAI.com is the separate product. Confirm its current first-party capabilities, supported formats, privacy, retention, deletion, access, payment, and support terms before uploading a sensitive record.']
];

const faqHtml = faqItems.map(([question, answer]) => `<div class="scanner-faq"><h3>${question}</h3><p>${answer}</p></div>`).join('');
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
    '@id': 'https://detecthiddenfees.com/free-hidden-fee-scanner#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/free-hidden-fee-scanner#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hidden Fee Detector', item: 'https://detecthiddenfees.com/hidden-fee-detector' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/free-hidden-fee-scanner' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: displayTitle,
    description,
    url: 'https://detecthiddenfees.com/free-hidden-fee-scanner',
    inLanguage: 'en-US',
    datePublished: '2026-07-19',
    dateModified: updated,
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    about: { '@type': 'Thing', name: 'Hidden-fee review checklist' },
    '@id': 'https://detecthiddenfees.com/free-hidden-fee-scanner#webpage'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }))
  }
];

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/hidden-fee-detector">Hidden Fee Detector</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">FREE REVIEW CHECKLIST</div><h1>${displayTitle}</h1><p class="hero-sub">Use this free resource to organize a review of a bill, invoice, contract, lease, estimate, or account record. It helps you locate questions; it does not promise automatic detection, a free product scan, or savings.</p><div class="hero-buttons"><a href="/hidden-fee-detector" class="primary-btn">Open the Hidden Fee Detector Guide</a><a href="/hidden-fee-examples" class="secondary-btn">See Illustrative Examples</a></div><div class="hero-trust"><span>Free educational checklist</span><span>Original records matter</span><span>No universal savings claim</span><span>Human verification required</span></div><p class="last-updated">Last updated: <time datetime="${updated}">August 8, 2026</time></p></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="scanner-answer"><h2>Direct answer: what does this free scanner resource do?</h2><p>It gives you a structured way to identify fee-related language, recurring charges, optional products, renewal terms, and mismatched totals in the records you already have. You still need to compare each item with the source agreement, disclosure, quote, bill, notice, or transaction history.</p><p><strong>Important boundary:</strong> a checklist or AI-assisted flag does not prove that a charge is hidden, excessive, deceptive, unlawful, unauthorized, or recoverable.</p></div></div></section><section class="section"><div class="container"><h2>Free checklist: review the record in four passes</h2><div class="features-grid"><article class="feature-card"><h3>1. Identify the record</h3><p>Note the document type, parties, dates, stated total, account or order number, payment schedule, definitions, addenda, and missing pages.</p></article><article class="feature-card"><h3>2. List every amount</h3><p>Separate one-time, recurring, optional, conditional, refundable, tax, credit, late, cancellation, termination, and pass-through amounts.</p></article><article class="feature-card"><h3>3. Reconcile the source</h3><p>Compare descriptions, dates, quantities, rates, payments, notices, and totals with the related contract, quote, disclosure, or account record.</p></article><article class="feature-card"><h3>4. Preserve the question</h3><p>Record the exact page or line item, ask for a written explanation, and obtain qualified advice when the consequences are material.</p></article></div></div></section><section class="section"><div class="container"><h2>Fee patterns worth checking</h2><ul class="benefits-list"><li>Administrative, processing, activation, service, delivery, disposal, or convenience labels whose purpose is unclear</li><li>Recurring charges, automatic renewals, trial conversions, price changes, or cancellation windows</li><li>Duplicate lines, changed quantities, mismatched rates, unexplained credits, or payments not reflected in the total</li><li>Optional add-ons, warranties, coverage, service plans, or products that appear without clear acceptance</li><li>Contractual escalators, minimum commitments, early-termination charges, or change-order amounts</li><li>Taxes, government charges, shipping, and other amounts that require separate source and scope analysis</li><li>Medical-bill lines that should be compared with the Explanation of Benefits and service record</li><li>Bank, telecom, utility, vehicle, rental, and subscription charges that must be checked against their own disclosures</li></ul></div></section><section class="section"><div class="container long-content"><h2>Official source context and limitations</h2><p>The <a href="https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions" rel="noopener noreferrer">FTC fee-rule FAQ</a> provides specific total-price and fee-disclosure guidance for live-event tickets and short-term lodging; it is not a universal rule for every bill or contract. The <a href="https://www.cms.gov/medical-bill-rights/help/guides/bill-errors" rel="noopener noreferrer">CMS medical-bill guide</a> provides a source for checking billing errors. The <a href="https://www.consumerfinance.gov/rules-policy/junk-fees/" rel="noopener noreferrer">CFPB junk-fee resource</a> provides agency context for fees charged by banks and financial companies.</p><p>These sources do not prove that a fee on your record is improper, and the DetectHiddenFees research manifest remains collecting-only. Product capabilities, pricing, privacy, retention, and supported documents must be confirmed from current first-party information.</p><h2>Frequently asked questions</h2><div class="scanner-faqs">${faqHtml}</div><div class="disclaimer"><strong>Disclaimer:</strong> This free resource provides general educational information. It is not legal, financial, medical, accounting, tax, or professional advice.</div></div></section><section class="section"><div class="container"><div class="cta-section"><h2>Need help organizing a document review?</h2><p>HiddenFeeAI.com is the separate AI-powered document-analysis product. Confirm its current first-party terms before uploading a sensitive record.</p><a href="https://hiddenfeeai.com" class="cta-btn-white" rel="noopener noreferrer" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document for Fees</a></div><h2>Continue learning</h2><p class="related-links"><a href="/hidden-fee-detector">Hidden Fee Detector</a> · <a href="/hidden-fee-examples">Illustrative Examples</a> · <a href="/hidden-fees-guides">Hidden Fee Guides</a> · <a href="/research-center">Research Center</a> · <a href="/contact">Contact</a></p></div></section></main>`;

const style = '<style id="free-hidden-fee-scanner-remediation">.last-updated{color:#94a3b8;font-size:.9rem;margin-top:16px}.scanner-answer{max-width:940px;margin:0 auto;padding:30px 34px;border-radius:24px;background:rgba(37,99,235,.10);border:1px solid rgba(59,130,246,.25)}.scanner-answer h2{margin-top:0}.scanner-faqs{max-width:940px;margin:30px auto}.scanner-faq{padding:24px 26px;margin-bottom:14px;border:1px solid rgba(255,255,255,.08);border-radius:20px;background:rgba(15,23,42,.72)}.scanner-faq h3{font-size:1.1rem;color:#fff;margin-bottom:8px}.scanner-faq p{color:#cbd5e1;margin-bottom:0}.related-links{line-height:2.2;text-align:center}.related-links a{color:#93c5fd;font-weight:700}@media(max-width:700px){.scanner-answer{padding:24px 20px}.scanner-faq{padding:20px}}</style>';
const headSchema = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
let next = source.replace(/<title>[\s\S]*?<\/title>/i, `<title>${displayTitle} | DetectHiddenFees</title>`);
next = next.replace(/<meta name="description" content="[^"]*"\s*\/?>(?=[\s\S]*?<\/head>)/i, `<meta name="description" content="${description}" />`);
next = next.replace(/<meta property="og:title" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:title" content="${displayTitle} | DetectHiddenFees" />`);
next = next.replace(/<meta property="og:description" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:description" content="${description}" />`);
next = next.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:title" content="${displayTitle} | DetectHiddenFees" />`);
next = next.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:description" content="${description}" />`);
next = next.replace(/<link rel="canonical" href="[^"]+"\s*\/?\s*>/i, '<link rel="canonical" href="https://detecthiddenfees.com/free-hidden-fee-scanner" />');
next = next.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
next = next.replace(/<\/head>/i, `${headSchema}${style}</head>`);
next = next.replace(/<main\b[\s\S]*?<\/main>/i, main);
next = next.replace(/<div class="sticky-cta-bar">[\s\S]*?<\/div>(?=<script|<\/body>)/i, '');
fs.writeFileSync(file, next);
console.log('Remediated free scanner page as an evidence-safe checklist with official sources, FAQs, and a contextual document-review CTA.');
