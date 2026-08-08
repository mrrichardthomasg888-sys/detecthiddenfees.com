const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-rental-fees.html');
let source = fs.readFileSync(file, 'utf8');

const title = 'Hidden Rental Fees: Lease Charges to Review Before You Sign | DetectHiddenFees';
const displayTitle = 'Hidden Rental Fees: Lease Charges to Review Before You Sign';
const description = 'A source-backed guide to rental and lease charges, including application, deposit, pet, utility, parking, renewal, late, move-out, and early-termination fees.';
const updated = '2026-08-08';

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace('</head>', `${replacement}</head>`);
}

function removeStickyCtaBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
  source = source.slice(0, stickyStart) + source.slice(bodyEnd);
}

function ensureResponsiveFooter() {
  const marker = '<style id="hidden-rental-fees-responsive">';
  if (source.includes(marker)) return;
  source = source.replace('</head>', `${marker}footer .footer-column a{display:block;overflow-wrap:anywhere;}@media (max-width:600px){.rental-fee-page{min-width:0;}.rental-fee-page ul,.rental-fee-page ol{padding-left:1.25rem;}.rental-fee-page .fee-card{overflow-wrap:anywhere;}}</style></head>`);
}

if (source.includes('A rental advertisement may show base rent without showing every amount') && source.includes('Review My Lease for Fees')) {
  removeStickyCtaBar();
  ensureResponsiveFooter();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The hidden rental fees page is already remediated; normalized the responsive footer and sticky bar.');
  process.exit(0);
}

const faqEntries = [
  ['What are hidden rental fees?', 'They are charges that are not obvious from the advertised base rent or that appear later in an application, lease, addendum, fee schedule, renewal notice, or statement. A charge is not automatically unlawful because it is separate; review its disclosure, trigger, amount, and applicable jurisdiction.'],
  ['What should I include when comparing rental costs?', 'Compare base rent with recurring charges, expected variable charges, one-time move-in costs, deposits, parking or storage, utilities, pet or animal terms, payment charges, renewal terms, and any conditional charges described in the written documents.'],
  ['Can a landlord charge any fee?', 'There is no single nationwide answer for every rental charge. Permitted fees, notice rules, deposits, late charges, screening practices, and refund requirements can depend on the state, city, lease, and transaction. Ask for the written basis and consult the relevant housing authority or qualified professional when needed.'],
  ['What if a tenant-screening report affects my application?', 'The CFPB explains that when a screening or credit report contributes to a denial or a higher deposit or fee, federal adverse-action notice rights can include the reporting company’s contact information and a right to request and dispute the report. Follow the current CFPB instructions and applicable law.'],
  ['Are pet fees always allowed?', 'Pet charges and deposit rules vary. An assistance animal is not a pet under HUD guidance, and a reasonable-accommodation request may include waiving a pet deposit, fee, or rule when the Fair Housing Act conditions apply.'],
  ['Should I upload a lease for AI review?', 'An AI-assisted review may help organize fee language, recurring charges, and questions, but it cannot determine legality or replace the original lease and qualified advice. Confirm current product privacy, retention, and supported-document details before uploading sensitive records.']
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
    '@id': 'https://detecthiddenfees.com/#organization',
    logo: 'https://detecthiddenfees.com/logo.png',
    sameAs: ['https://hiddenfeeai.com']
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    dateModified: updated,
    articleSection: 'Rental and lease fees',
    about: { '@type': 'Thing', name: 'Rental and lease fees' },
    '@id': 'https://detecthiddenfees.com/hidden-rental-fees#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/hidden-rental-fees#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hidden Fee Encyclopedia', item: 'https://detecthiddenfees.com/hidden-fee-encyclopedia' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-rental-fees' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-rental-fees',
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Rental and lease fee review' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-rental-fees#webpage'
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntries }
];

const headEnd = source.indexOf('<body>');
const head = source.slice(0, headEnd);
const ldBlocks = [...head.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)];
const ldStart = ldBlocks[0]?.index ?? -1;
const ldEnd = ldBlocks.length ? ldBlocks[ldBlocks.length - 1].index + ldBlocks[ldBlocks.length - 1][0].length : -1;
if (headEnd < 0 || ldStart < 0 || ldEnd < 0) throw new Error('Could not locate existing JSON-LD blocks');
const ldHtml = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
source = source.slice(0, ldStart) + ldHtml + source.slice(ldEnd);

const feeEntries = [
  {
    heading: '1. Application and tenant-screening charges',
    meta: 'Review in: application, screening authorization, receipt',
    what: 'A landlord or property manager may request a payment connected with processing an application or ordering a tenant-screening report. The amount, timing, refundability, and permitted use of the charge can depend on the jurisdiction and the provider’s written policy.',
    verify: 'Ask what the payment covers, which report or service will be obtained, whether each adult applicant is charged separately, when the application will be processed, and what happens if the unit is no longer available.',
    questions: 'What report will be used? When will the screening occur? Will I receive a receipt and the written criteria? What is the refund or cancellation policy?',
    documents: 'Application form, screening disclosure, receipt, written rental criteria, and any notice about an application decision.'
  },
  {
    heading: '2. Administrative, technology, or portal charges',
    meta: 'Review in: lease, fee schedule, resident portal terms',
    what: 'Labels such as administrative, management, technology, service, or portal fee may describe a one-time or recurring charge separate from base rent. The label alone does not explain the service, trigger, or legal treatment.',
    verify: 'Identify whether the charge is one-time or recurring, what service it covers, whether the amount can change, and whether it is included in the advertised total or a later statement.',
    questions: 'What specific service does this fee cover? Is it required? How often is it charged? Where is the amount and change process described?',
    documents: 'Lease, addenda, fee schedule, resident-portal terms, renewal notice, and monthly statement.'
  },
  {
    heading: '3. Holding, reservation, or move-in fees',
    meta: 'Review in: application, holding agreement, move-in ledger',
    what: 'A payment may be requested to reserve a unit or hold it while an application is reviewed. The written agreement should explain whether the payment is credited, refundable, forfeitable, or applied to another charge.',
    verify: 'Check the deadline, the event that changes the payment’s treatment, who must sign, what happens if the provider does not proceed, and whether the payment is separate from a security deposit or rent.',
    questions: 'Is this payment a deposit, fee, or credit? When is it returned or applied? What written event causes it to be kept?',
    documents: 'Holding agreement, receipt, application, lease, move-in cost sheet, and cancellation communications.'
  },
  {
    heading: '4. Security deposits and other move-in amounts',
    meta: 'Review in: lease, deposit receipt, move-in statement',
    what: 'The move-in total can include a security deposit, first or last month’s rent, prepaid amounts, nonrefundable fees, and prorated charges. Do not treat a refundable deposit and a nonrefundable fee as interchangeable.',
    verify: 'Separate refundable and nonrefundable amounts, record the stated purpose of each payment, and check the local rules and lease language for receipts, permitted deductions, notices, and return timing.',
    questions: 'Which amount is refundable? What may be deducted? What notice or itemization will be provided? Where is the payment recorded?',
    documents: 'Lease, deposit receipt, move-in cost sheet, condition report, and later deposit-disposition statement.'
  },
  {
    heading: '5. Pet rent, pet deposits, and animal-related charges',
    meta: 'Review in: pet addendum, lease, accommodation records',
    what: 'A lease may distinguish a one-time pet fee, a refundable pet deposit, recurring pet rent, and other animal-related terms. An assistance animal is treated differently from a pet under HUD’s Fair Housing Act guidance.',
    verify: 'Read the pet or animal addendum, identify each one-time and recurring amount, check what is refundable, and keep any reasonable-accommodation request and response with the lease records.',
    questions: 'Which terms apply to a pet versus an assistance animal? Is a charge refundable? What documentation and accommodation process does the provider use?',
    documents: 'Lease, pet addendum, animal policy, accommodation request, provider response, and payment ledger.'
  },
  {
    heading: '6. Utilities, utility billing, and service charges',
    meta: 'Review in: utility addendum, bill, allocation policy',
    what: 'A renter may pay utilities directly, reimburse the provider, or receive a bill calculated under an allocation or service arrangement. A separate billing, administration, or connection charge may also appear.',
    verify: 'Identify the service, meter or allocation method, billing period, provider, estimated versus actual amount, pass-through charges, and process for correcting a disputed bill.',
    questions: 'Is this based on my meter, an allocation formula, or an estimate? Which charges are usage and which are service or billing charges?',
    documents: 'Utility addendum, lease, utility bill, move-in and move-out readings, allocation policy, and provider correspondence.'
  },
  {
    heading: '7. Parking, storage, package, and amenity charges',
    meta: 'Review in: amenity schedule, parking addendum, statement',
    what: 'Parking, storage, package handling, access devices, internet, amenity, or other optional services may be priced outside the base rent or become conditional on a selected service.',
    verify: 'List each selected service, its recurring amount, start date, cancellation rules, access restrictions, replacement charges, and whether a service is required to rent the unit.',
    questions: 'Is this service optional? What happens if I cancel it? Are access, replacement, or usage charges separate from the recurring price?',
    documents: 'Lease, amenity or parking addendum, order confirmation, service terms, and monthly statement.'
  },
  {
    heading: '8. Late, payment-method, and returned-payment charges',
    meta: 'Review in: lease, account terms, payment receipt',
    what: 'A payment can create a separate charge based on timing, method, failed processing, or a returned payment. The trigger and amount should be compared with the lease, account disclosures, and applicable local rules.',
    verify: 'Record the due date, grace or notice language if any, accepted payment methods, posting time, receipt, and any fee that appeared after a payment attempt.',
    questions: 'When is payment considered received? Which payment methods are accepted? What notice and written rule support this charge?',
    documents: 'Lease, payment instructions, account terms, receipt, bank record, and notice of the charge.'
  },
  {
    heading: '9. Move-out, cleaning, repair, and damage deductions',
    meta: 'Review in: move-in report, lease, deposit statement',
    what: 'A move-out account may include cleaning, repair, replacement, painting, lock, or other deductions. A flat label is not enough to show what work was done or how the amount was calculated.',
    verify: 'Compare the move-in and move-out condition records, request an itemization when provided for by the lease or local rules, and keep photographs, inspection notes, receipts, and communications.',
    questions: 'What condition or contract term caused this amount? Is it an actual cost, a stated fee, or an estimate? What supporting record is available?',
    documents: 'Move-in and move-out reports, photographs, inspection notices, invoices, deposit statement, and correspondence.'
  },
  {
    heading: '10. Renewal, month-to-month, and early-termination charges',
    meta: 'Review in: renewal notice, lease, termination addendum',
    what: 'A renter may encounter a changed rent, notice requirement, month-to-month amount, re-letting charge, early-termination amount, or other condition when the initial term ends or the lease ends early.',
    verify: 'Record the term, notice date, renewal options, price-change language, termination triggers, mitigation or re-letting language, and any local notice rules that may apply.',
    questions: 'What date controls? What must be delivered in writing? Which amount is rent, which is a fee, and what event triggers it?',
    documents: 'Original lease, renewal offer, notices, early-termination addendum, payment ledger, and written communications.'
  }
];

const feeCards = feeEntries.map((entry) => `<div class="fee-card"><h3>${entry.heading}</h3><div class="fee-meta"><span>${entry.meta}</span></div><div class="fee-section"><h4>What it may be</h4><p>${entry.what}</p></div><div class="fee-section"><h4>What to verify</h4><p>${entry.verify}</p></div><div class="fee-section"><h4>Questions to ask</h4><p>${entry.questions}</p></div><div class="fee-section"><h4>Where to look</h4><p>${entry.documents}</p></div></div>`).join('');

const faqHtml = faqEntries.map((entry) => `<details><summary>${entry.name}</summary><div class="faq-answer"><p>${entry.acceptedAnswer.text}</p></div></details>`).join('');

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container hero-inner"><div class="hero-label">RENTAL FEE CHECKLIST</div><h1>${displayTitle}</h1><p>A rental advertisement may show base rent without showing every amount described in the application, lease, addenda, fee schedule, renewal notice, or statement. This guide helps you reconcile those records before you sign, pay, renew, or move out.</p><p class="hub-context-link">For broader recurring-charge guidance, <a href="/hidden-fees-guides">start with the hidden fee guide</a>.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="trust-bar"><span>Compare the full written total</span><span>Jurisdiction and lease terms matter</span><span>Keep records before paying</span></div></div></section><section class="section" style="padding-top:20px;border-top:none"><div class="container rental-fee-page"><div class="fee-card"><h2>Direct answer: how do I find hidden rental fees?</h2><p>Collect the advertisement, application, lease, addenda, fee schedule, utility terms, renewal notices, and statements. Separate base rent from one-time, recurring, optional, variable, and conditional charges; then compare the written total with what you were asked to pay.</p><p><strong>A separate fee is not automatically unlawful or excessive.</strong> Its treatment can depend on the document, transaction, state or local rules, and the facts. Ask for the written basis and preserve the records before disputing it.</p></div><h2>Start with a complete rental-cost comparison</h2><p>For a practical comparison, calculate the costs using the same period and assumptions:</p><div class="fee-card"><h3>Rental-cost worksheet</h3><p><strong>Estimated monthly housing cost</strong> = base rent + recurring required charges + expected variable charges + optional charges you choose.</p><p><strong>Move-in total</strong> = first payment(s) + refundable deposits + nonrefundable fees + prorated charges + selected services.</p><p>Keep one-time amounts separate from recurring amounts so a low advertised monthly rent does not hide a large upfront or conditional payment. Recalculate when a renewal notice, utility bill, or lease addendum changes the terms.</p></div><h2>Rental and lease charges to review</h2>${feeCards}<h2>What to verify before signing or paying</h2><div class="fee-card"><h3>Use the documents in order</h3><ol><li>Save the listing, price, contact information, and any advertised fee disclosure.</li><li>Request the application criteria, screening terms, fee schedule, lease, addenda, utility terms, and move-in ledger before paying when available.</li><li>Mark each charge as required, optional, recurring, variable, refundable, nonrefundable, or conditional.</li><li>Ask for a written explanation of anything that appears in the lease or statement but not in the earlier price information.</li><li>Keep receipts, payment confirmations, inspection photos, notices, and written responses in one folder.</li></ol></div><div class="fee-card"><h3>Screening reports and adverse-action notices</h3><p>The <a href="https://www.consumerfinance.gov/rules-policy/tenant-background-checks/review-your-rental-background-check/" rel="noopener noreferrer">CFPB explains how to review a rental background check</a>. If a screening or credit report contributed to a denial or a higher deposit or fee, the CFPB says federal notice and dispute rights may apply, including information about the reporting company. Follow the current instructions and applicable law rather than assuming the report is accurate.</p></div><div class="fee-card"><h3>Pet terms and assistance animals</h3><p>Read the pet addendum separately from the lease. The <a href="https://www.hud.gov/helping-americans/assistance-animals" rel="noopener noreferrer">HUD assistance-animal guidance</a> explains that an assistance animal is not a pet and that a reasonable-accommodation request may include waiving a pet deposit, fee, or rule when the Fair Housing Act conditions apply. This is not a blanket answer for every animal or housing situation.</p></div><h2>Rental-listing and payment red flags</h2><p>The <a href="https://consumer.ftc.gov/articles/rental-listing-scams" rel="noopener noreferrer">FTC rental-listing guidance</a> recommends checking the property and listing, being cautious about pressure to pay before seeing the rental, and protecting sensitive information. Treat requests for gift cards, cryptocurrency, or wire transfers as a reason to stop and verify the listing through an independent channel. A document review cannot establish that a person or listing is legitimate.</p><h2>Source context and limitations</h2><p>This guide uses the <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-tenant-screening-report-en-2102/" rel="noopener noreferrer">CFPB explanation of tenant screening reports</a>, the <a href="https://www.consumerfinance.gov/rules-policy/tenant-background-checks/review-your-rental-background-check/" rel="noopener noreferrer">CFPB review guide</a>, the <a href="https://consumer.ftc.gov/articles/rental-listing-scams" rel="noopener noreferrer">FTC rental-scam guidance</a>, and the <a href="https://www.hud.gov/helping-americans/assistance-animals" rel="noopener noreferrer">HUD assistance-animal guidance</a> for source context. These sources do not create a single nationwide schedule of permitted rental fees. State, city, lease, housing-provider, and transaction details can change the answer.</p><p>For material disputes, consult the relevant housing agency, consumer-protection office, legal-aid organization, or qualified professional. This page is general educational information, not legal advice.</p><h2 id="faq">Frequently asked questions</h2><div class="faq-section">${faqHtml}</div><div class="disclaimer"><strong>Disclaimer:</strong> This resource is educational information. It is not legal, financial, housing, tax, accounting, or professional advice.</div><div class="cta-section"><h2>Review your lease for fee language</h2><p>HiddenFeeAI is the related document-analysis product. Confirm its current first-party product, privacy, retention, and supported-document details before uploading a lease or application.</p><a href="https://hiddenfeeai.com" class="cta-white-btn" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Lease for Fees</a></div><p style="margin-top:30px;font-size:.9rem;color:#94a3b8;"><strong>Related resources:</strong> <a href="/hidden-fee-encyclopedia" style="color:#94a3b8;">Hidden Fee Encyclopedia</a> · <a href="/hidden-fee-prevention-guide" style="color:#94a3b8;">Fee Prevention Guide</a> · <a href="/ai-lease-review" style="color:#94a3b8;">AI Lease Review</a> · <a href="/ai-rental-lease-analyzer" style="color:#94a3b8;">AI Rental Lease Analyzer</a></p></div></section></main>`;

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);

removeStickyCtaBar();
ensureResponsiveFooter();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated hidden rental fees with jurisdiction-aware guidance, official sources, contextual CTA, and FAQs.');
