const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-fees-guides.html');
let source = fs.readFileSync(file, 'utf8');

const title = 'Hidden Fee Guides: How to Review Charges by Document Type | DetectHiddenFees';
const displayTitle = 'Hidden Fee Guides: How to Review Charges by Document Type';
const description = 'A source-aware guide hub for reviewing unexpected charges in auto financing, medical bills, bank accounts, home services, subscriptions, and other documents.';
const updated = '2026-08-08';

if (source.includes('Find the right guide') && source.includes('data-cta-action="document_analysis"')) {
  source = source.replace(/(<link rel="canonical"[^>]*>)>/g, '$1');
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart >= 0) {
    const bodyEnd = source.indexOf('</body>', stickyStart);
    if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
    source = source.slice(0, stickyStart) + source.slice(bodyEnd);
  }
  fs.writeFileSync(file, source, 'utf8');
  console.log('The hidden-fee guides hub is already remediated; normalized the sticky CTA state.');
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
  ['What is a hidden fee?', 'A hidden fee is a charge whose amount, purpose, trigger, or required-versus-optional status is not clear from the information a person received before deciding. A separate charge is not automatically unlawful; the document, transaction, jurisdiction, and applicable rules matter.'],
  ['Where should I look for unexpected charges?', 'Start with the written total, itemized line items, definitions, footnotes, addenda, schedules, renewal terms, cancellation rules, payment instructions, and conditional charges. Compare the document with the advertisement, quote, statement, estimate, or Explanation of Benefits that explains the transaction.'],
  ['Which topics do these hidden-fee guides cover?', 'The hub connects guides for auto financing, medical bills, bank accounts, home services and construction, telecom and subscriptions, contracts, leases, invoices, and AI-assisted document review. The topic map is not a ranking of prevalence or risk.'],
  ['Can a fee be legitimate even if it is separate?', 'Yes. A separate fee may be disclosed and allowed under the agreement or applicable rules. Review what the charge covers, when it applies, whether it was optional or conditional, and whether the written total included it before deciding how to respond.'],
  ['Can AI help review a fee document?', 'AI-assisted review may help organize extractable amounts, recurring terms, renewal language, and questions for human verification. It cannot guarantee completeness, determine legality or fair value, or replace qualified advice. Confirm current product terms before uploading a sensitive document.'],
  ['What records should I preserve?', 'Keep the advertisement, quote, contract, addenda, fee schedule, bill or statement, estimate, receipts, payment records, notices, cancellation confirmations, screenshots, and written responses. The useful records depend on the transaction and issue.']
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
    '@type': 'CollectionPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-fees-guides',
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Hidden-fee review guides and document questions' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-fees-guides#collection'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hidden Fee Encyclopedia', item: 'https://detecthiddenfees.com/hidden-fee-encyclopedia' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-fees-guides' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-fees-guides',
    inLanguage: 'en-US',
    datePublished: '2026-07-21',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Hidden-fee guides by document and transaction type' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-fees-guides#page'
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntries }
];

const faqHtml = faqEntries.map((entry) => `<details><summary>${entry.name}</summary><div class="faq-answer"><p>${entry.acceptedAnswer.text}</p></div></details>`).join('');

const guideGroups = [
  ['Auto financing and dealership charges', 'Separate vehicle price, taxes, dealer charges, add-ons, APR, amount financed, and total of payments. Compare the written out-the-door price and financing disclosures rather than relying only on a monthly payment.', [['/hidden-dealership-financing-fees', 'Dealership financing fee guide'], ['/example-auto-financing', 'Illustrative financing review'], ['/before-signing-contract-checklist', 'Before-signing checklist']]],
  ['Medical bills and insurance records', 'Compare the itemized provider bill with the Explanation of Benefits, dates, providers, services, patient responsibility, adjustments, and payments. A repeated line is a review question, not proof of an error.', [['/duplicate-medical-billing-charges', 'Duplicate medical billing charges'], ['/ai-bill-analyzer', 'AI bill analyzer guidance'], ['/hidden-fee-prevention-guide', 'Prevention checklist']]],
  ['Bank accounts and overdraft fees', 'Read the account agreement and current disclosures, then reconcile statement transactions, available balance, opt-in records, reversals, and fee descriptions. Rules can differ by transaction type and account.', [['/hidden-bank-overdraft-fees', 'Bank overdraft fee guide'], ['/ai-financial-analysis', 'Financial-document analysis'], ['/security-overview', 'Security overview']]],
  ['Construction and home-service estimates', 'Review the written scope, materials, allowances, labor, permits, delivery, disposal, change-order language, deposits, and payment timing. Ask for an explanation when the written estimate and requested amount do not align.', [['/hidden-home-renovation-fees', 'Home renovation fee guide'], ['/hidden-hvac-contractor-fees', 'HVAC contractor fee guide'], ['/ai-construction-contract-review', 'Construction contract review']]],
  ['Telecom, subscriptions, and renewals', 'Compare the advertised offer with the service terms, recurring charges, promotional end date, equipment or usage amounts, cancellation method, renewal notice, and post-cancellation statements.', [['/hidden-subscription-fees', 'Subscription fee guide'], ['/early-termination-fees', 'Early-termination fee guide'], ['/hidden-phone-bill-fees', 'Phone-bill fee topics']]],
  ['Contracts, leases, and document review', 'Locate definitions, one-time and recurring amounts, optional or conditional charges, renewal and termination clauses, incorporated schedules, exceptions, and the records needed to verify a finding.', [['/hidden-fee-encyclopedia', 'Hidden Fee Encyclopedia'], ['/ai-document-review-tool', 'AI document review tool'], ['/ai-document-checker', 'AI document checker'], ['/contract-red-flags', 'Contract red flags']]]
];

const guideCards = guideGroups.map(([heading, summary, links]) => `<section class="guide-card"><h3>${heading}</h3><p>${summary}</p><div class="guide-links">${links.map(([href, label]) => `<a href="${href}">${label} →</a>`).join('')}</div></section>`).join('');

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">HIDDEN-FEE GUIDE HUB</div><h1>${displayTitle}</h1><p class="hero-sub">Use this guide hub to find the right source-aware checklist for the charge or document you are reviewing. Each topic points to the records, terms, and questions that matter; none is a universal fee schedule or legal conclusion.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-trust"><span>Document-specific questions</span><span>Primary-source context</span><span>No prevalence rankings</span><span>Human verification required</span></div></div></section><section class="section" style="padding-top:10px"><div class="container"><div class="quick-answer"><h2>Direct answer: how do I use these hidden-fee guides?</h2><p>Choose the guide that matches the document or transaction, collect the complete written record, separate one-time, recurring, optional, variable, and conditional amounts, and compare the requested total with the source terms. If a line remains unclear, ask the provider or counterparty to identify what it covers and preserve the response.</p></div><h2>Find the right guide</h2><p class="section-intro">Start with the document type, not the fee label. The same term can mean different things in a loan, medical bill, estimate, subscription, or account agreement.</p><div class="guide-grid">${guideCards}</div><div class="warning-box"><h3>Review signal, not a verdict</h3><p>A separate charge, vague label, repeated line, or price difference may have more than one explanation. These guides help organize questions; they do not determine that a provider acted unlawfully, that a fee is excessive, or that a dispute will succeed.</p></div><h2>Universal review checklist</h2><div class="checklist-section"><div class="checklist-grid"><span>Collect the advertisement, quote, contract, addenda, bill, statement, or estimate</span><span>Identify the stated total and every required or optional amount</span><span>Mark recurring, renewal, cancellation, termination, and conditional terms</span><span>Compare dates, descriptions, quantities, rates, adjustments, and payments</span><span>Read definitions, footnotes, schedules, exceptions, and consent notices</span><span>Ask for written explanations of unclear or mismatched line items</span><span>Preserve receipts, notices, confirmations, and written responses</span><span>Use qualified advice when the issue is legal, medical, financial, tax, or otherwise specialized</span></div></div><h2>Source context</h2><p class="source-note">Official guidance is transaction-specific. The <a href="https://consumer.ftc.gov/articles/financing-or-leasing-car" rel="noopener noreferrer">FTC car-financing guide</a> and <a href="https://consumer.ftc.gov/consumer-alerts/2024/08/car-dealerships-cant-charge-you-add-ons-you-dont-want" rel="noopener noreferrer">FTC auto add-on alert</a> provide auto-purchase context. CMS explains how to read a <a href="https://www.cms.gov/medical-bill-rights/help/guides/how-to-read-bill" rel="noopener noreferrer">medical bill</a> and an <a href="https://www.cms.gov/medical-bill-rights/help/guides/explanation-of-benefits" rel="noopener noreferrer">Explanation of Benefits</a>. The <a href="https://www.consumerfinance.gov/ask-cfpb/what-can-i-do-if-my-bank-charged-me-a-fee-for-overdrawing-my-account-en-1037/" rel="noopener noreferrer">CFPB bank-account guidance</a> addresses overdraft questions. FTC guidance on <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam" rel="noopener noreferrer">home-improvement work</a> and <a href="https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions" rel="noopener noreferrer">free trials and auto-renewals</a> provides additional context.</p><p class="source-note">These sources do not establish a universal hidden-fee rate, prove that an individual charge is illegal, or certify any product. The public DetectHiddenFees research manifest remains collecting-only; inspect the <a href="/research-data.json">research manifest</a> and <a href="/research-methodology">methodology</a> for the publication gate.</p><div class="disclaimer"><strong>Limitations:</strong> This guide hub is educational. Rules and remedies vary by document, transaction, provider, jurisdiction, and date. Product capabilities, pricing, privacy, retention, and supported documents must be confirmed from current first-party information.</div><h2>Frequently asked questions</h2><div class="faq-section">${faqHtml}</div><div class="cta-section"><h2>Review a document for fee language</h2><p>HiddenFeeAI is the related AI document-analysis product. Confirm its current first-party terms before uploading a sensitive record.</p><a href="https://hiddenfeeai.com" class="cta-white-btn" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document for Fees</a></div><p style="margin-top:30px;font-size:.9rem;color:#94a3b8;"><strong>Continue:</strong> <a href="/hidden-fee-encyclopedia" style="color:#94a3b8;">Hidden Fee Encyclopedia</a> · <a href="/hidden-fee-prevention-guide" style="color:#94a3b8;">Prevention Guide</a> · <a href="/research-center" style="color:#94a3b8;">Research Center</a> · <a href="/contact" style="color:#94a3b8;">Contact</a></p></div></section></main>`;

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);
upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?\s*>/, '<link rel="canonical" href="https://detecthiddenfees.com/hidden-fees-guides">');
source = source.replace(/(<link rel="canonical"[^>]*>)>/g, '$1');

const schemaHtml = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
source = source.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
source = source.replace('</head>', `${schemaHtml}<style id="hidden-fees-guides-responsive">footer .footer-column a{display:block;overflow-wrap:anywhere;}.guide-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin:30px 0 46px;}.guide-card{padding:26px 28px;border-radius:24px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);}.guide-card h3{margin:0 0 12px;color:white;font-size:1.3rem;}.guide-card p{color:#dbeafe;line-height:1.9;}.guide-links{display:grid;gap:8px;margin-top:18px;}.guide-links a{padding:10px 12px;border-radius:12px;background:rgba(59,130,246,.08);color:#bfdbfe;font-weight:700;overflow-wrap:anywhere;}.source-note{font-size:.95rem;color:#cbd5e1;line-height:1.9;}@media(max-width:600px){.guide-grid{grid-template-columns:1fr;}.guide-card{padding:22px 18px;}}</style></head>`);

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
console.log('Remediated hidden-fee guides hub with source-aware topic mapping, qualified claims, and contextual CTA.');
