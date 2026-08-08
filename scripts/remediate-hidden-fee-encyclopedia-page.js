const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-fee-encyclopedia.html');
let source = fs.readFileSync(file, 'utf8');

const title = 'Hidden Fee Encyclopedia: Terms, Charges, and Review Questions | DetectHiddenFees';
const displayTitle = 'Hidden Fee Encyclopedia: Terms, Charges, and Review Questions';
const description = 'A practical hidden-fee reference organized by banking, medical billing, construction, auto, subscriptions, telecom, travel, rental, and document-review topics.';
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
  const marker = '<style id="hidden-fee-encyclopedia-responsive">';
  if (source.includes(marker)) return;
  source = source.replace('</head>', `${marker}footer .footer-column a{display:block;overflow-wrap:anywhere;}.ency-link{overflow-wrap:anywhere;}@media (max-width:600px){.encyclopedia-page{min-width:0;}.encyclopedia-page .cat-grid,.encyclopedia-page .featured-grid{grid-template-columns:1fr;}}</style></head>`);
}

source = source.replaceAll('/automatic-renewal-fees', '/hidden-subscription-fees');

if (source.includes('This encyclopedia is a navigable reference map') && source.includes('Review My Document for Fees')) {
  removeStickyCtaBar();
  ensureResponsiveFooter();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The hidden fee encyclopedia is already remediated; normalized the responsive footer and sticky bar.');
  process.exit(0);
}

const faqEntries = [
  ['What is a hidden fee?', 'A hidden fee is a charge whose amount, purpose, trigger, or required-versus-optional status is not clear from the information a person received before deciding. A separate fee is not automatically unlawful; the document, transaction, jurisdiction, and disclosure determine what it means.'],
  ['What is the difference between a hidden fee and a junk fee?', 'Hidden fee describes a disclosure or visibility problem. Junk fee is an informal consumer-protection term often used for an unexpected, unnecessary, or poorly explained charge. Neither label alone decides whether a charge violates a law or contract.'],
  ['How can I find hidden fees in a document?', 'Request the complete written total, identify one-time, recurring, optional, variable, and conditional amounts, read definitions and exceptions, compare the document with the advertisement or quote, and preserve receipts and notices.'],
  ['What fee categories does this encyclopedia cover?', 'The reference map connects banking and lending, medical billing, construction and home services, auto financing, subscriptions, utilities and telecommunications, insurance and investment, travel, rental and lease, and general contract topics. Coverage is an editorial topic map, not a prevalence ranking.'],
  ['Can AI detect hidden fees?', 'AI-assisted document review may help organize fee terminology, recurring charges, totals, and questions for human verification. It cannot guarantee completeness, establish a fair price, or decide whether a charge is legal. Confirm current product capabilities and privacy terms before uploading sensitive records.'],
  ['What evidence should I keep when reviewing a fee?', 'Keep the advertisement, quote, contract, addenda, account disclosures, fee schedule, invoice or statement, receipts, payment records, photographs when relevant, notices, and written responses. The exact records depend on the transaction.']
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
    url: 'https://detecthiddenfees.com/hidden-fee-encyclopedia',
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Hidden fees and document-related charges' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-encyclopedia#webpage'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-fee-encyclopedia' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-fee-encyclopedia',
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Hidden fee reference and review questions' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-encyclopedia#page'
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

const topicGroups = [
  {
    id: 'banking-fees',
    heading: 'Banking and lending fees',
    summary: 'Review account, credit, loan, mortgage, and payment terms for charges, triggers, timing, and disclosures. A fee label is only a starting point; account agreements and applicable rules control the analysis.',
    links: [
      ['/hidden-bank-overdraft-fees', 'Overdraft and bank-account fees'],
      ['/hidden-loan-fees', 'Loan origination and lending fees'],
      ['/hidden-mortgage-fees', 'Mortgage and closing-cost topics'],
      ['/hidden-credit-card-fees', 'Credit-card fee topics']
    ]
  },
  {
    id: 'healthcare-fees',
    heading: 'Medical billing and healthcare charges',
    summary: 'Compare the itemized bill, Explanation of Benefits, authorizations, provider details, and patient responsibility. Coding, coverage, and surprise-billing questions can require records from more than one party.',
    links: [
      ['/duplicate-medical-billing-charges', 'Duplicate medical billing charges'],
      ['/hospital-bill-negotiation-guide', 'Hospital bill review and negotiation'],
      ['/medical-bill-error-checklist', 'Medical-bill error checklist'],
      ['/medical-bill-negotiation-template', 'Medical-bill negotiation template']
    ]
  },
  {
    id: 'contractor-fees',
    heading: 'Construction and home-service fees',
    summary: 'Review written scope, allowances, materials, labor, permits, change orders, emergency charges, payment terms, and cancellation language. A quote or contract alone does not establish fair value or workmanship.',
    links: [
      ['/hidden-hvac-contractor-fees', 'HVAC contractor fee topics'],
      ['/hidden-home-renovation-fees', 'Home-renovation fee topics'],
      ['/hidden-plumbing-fees', 'Plumbing service fees'],
      ['/ai-construction-contract-review', 'Construction contract review']
    ]
  },
  {
    id: 'auto-fees',
    heading: 'Auto financing and dealership fees',
    summary: 'Separate vehicle price, taxes, government charges, dealer fees, add-ons, amount financed, APR, and total of payments. Compare the written out-the-door price and financing terms rather than only the monthly payment.',
    links: [
      ['/hidden-dealership-financing-fees', 'Dealership financing fee topics'],
      ['/example-auto-financing', 'Illustrative auto-financing review'],
      ['/before-signing-contract-checklist', 'Before-signing checklist'],
      ['/contract-red-flags', 'Contract red flags']
    ]
  },
  {
    id: 'subscription-fees',
    heading: 'Subscription and membership charges',
    summary: 'Record trial periods, renewal dates, price changes, required disclosures, cancellation steps, add-ons, and confirmation records. Recurring-charge rules can depend on the offer, channel, and applicable law.',
    links: [
      ['/hidden-subscription-fees', 'Subscription fee topics'],
      ['/hidden-streaming-fees', 'Streaming-service fee topics'],
      ['/automatic-renewal-fees', 'Automatic-renewal fee topics'],
      ['/early-termination-fees', 'Early-termination fee topics']
    ]
  },
  {
    id: 'utility-fees',
    heading: 'Utilities and telecommunications',
    summary: 'Compare the advertised plan with the service agreement, equipment terms, recurring surcharges, usage charges, promotional end date, and cancellation conditions. Labels such as regulatory or recovery require source-specific verification.',
    links: [
      ['/hidden-phone-bill-fees', 'Phone-bill fee topics'],
      ['/hidden-internet-fees', 'Internet-service fee topics'],
      ['/ai-bill-analyzer', 'Bill-review guidance'],
      ['/how-to-read-an-invoice', 'How to read an invoice']
    ]
  },
  {
    id: 'insurance-fees',
    heading: 'Insurance and investment charges',
    summary: 'Read the policy, account agreement, prospectus, fee table, or statement for administrative, installment, management, transaction, surrender, or other charges. Product-specific disclosures and professional advice may be necessary.',
    links: [
      ['/hidden-investment-fees', 'Investment-fee topics'],
      ['/ai-financial-advisor', 'AI financial-document guidance'],
      ['/ai-financial-analysis', 'Financial-document analysis guidance'],
      ['/security-overview', 'Security overview']
    ]
  },
  {
    id: 'travel-fees',
    heading: 'Travel and hospitality fees',
    summary: 'Compare the advertised rate with required taxes, resort or destination charges, baggage or seat selections, parking, cancellation terms, and optional protections. Ask for the final amount before payment.',
    links: [
      ['/hidden-travel-fees', 'Travel and hospitality fee topics'],
      ['/hidden-fee-prevention-guide', 'General prevention checklist'],
      ['/hidden-fees-guides', 'Hidden-fee guides']
    ]
  },
  {
    id: 'rental-fees',
    heading: 'Rental and lease fees',
    summary: 'Collect the listing, application, lease, addenda, fee schedule, utility terms, renewal notices, and statements. Separate refundable deposits, nonrefundable fees, recurring charges, optional services, and conditional amounts.',
    links: [
      ['/hidden-rental-fees', 'Rental fee checklist'],
      ['/ai-rental-lease-analyzer', 'AI rental-lease analyzer'],
      ['/ai-lease-review', 'AI lease review'],
      ['/duplicate-medical-billing-charges', 'Compare document-review workflows']
    ]
  },
  {
    id: 'ai-tools',
    heading: 'Document-review and AI analysis resources',
    summary: 'AI-assisted review can help organize fee language, recurring charges, totals, and questions for human verification. It cannot guarantee completeness, determine legality or fair value, or replace the original document and qualified advice.',
    links: [
      ['/hidden-fee-detector', 'Hidden fee detector guide'],
      ['/ai-document-checker', 'AI document checker'],
      ['/ai-document-review-tool', 'AI document review tool'],
      ['/ai-analysis-methodology', 'AI analysis methodology'],
      ['/ai-accuracy-and-limitations', 'AI accuracy and limitations']
    ]
  }
];

const topicCards = topicGroups.map((group) => `<section class="section" id="${group.id}"><div class="container"><h2>${group.heading}</h2><p>${group.summary}</p><div class="cat-card"><h3>Start with a focused resource</h3><div class="cat-grid">${group.links.map(([href, label]) => `<a href="${href}" class="ency-link">${label} →</a>`).join('')}</div></div></div></section>`).join('');
const faqHtml = faqEntries.map((entry) => `<div class="faq-item"><h3>${entry.name}</h3><p>${entry.acceptedAnswer.text}</p></div>`).join('');

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="hero-label">DETECTHIDDENFEES REFERENCE MAP</div><h1>${displayTitle}</h1><p>This encyclopedia is a navigable reference map for understanding fee terms, unexpected charges, recurring billing, contract triggers, and document-review questions. It connects topic hubs and source-aware guidance without claiming that a fee is illegal, excessive, or common merely because it has a separate label.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="trust-bar"><span>Definitions before conclusions</span><span>Source context where available</span><span>Document and jurisdiction matter</span><span>No unpublished prevalence rankings</span></div><div class="breadcrumb"><a href="/">Home</a><span class="separator">›</span><a href="/knowledge-center">Knowledge Center</a><span class="separator">›</span><span class="current">Hidden Fee Encyclopedia</span></div></div></section><section class="section" style="padding-top:20px;border-top:none"><div class="container encyclopedia-page"><div class="cat-card"><h2>Direct answer: what is a hidden fee?</h2><p>A hidden fee is a charge whose amount, purpose, trigger, or required-versus-optional status is not clear from the information a person received before deciding. The useful review question is not simply “Is this fee hidden?” but “What does the document say, when does the charge apply, what is included in the stated total, and what rule or agreement governs it?”</p><p><strong>A fee label is not a legal conclusion.</strong> This reference explains terms and questions to ask; it does not publish a universal fee schedule or a prevalence ranking.</p></div><h2>How to use this reference</h2><div class="ency-grid"><div class="ency-card"><span class="ency-icon">①</span><h3>Find the topic</h3><p>Choose the industry or document type that matches the charge you are reviewing.</p></div><div class="ency-card"><span class="ency-icon">②</span><h3>Read the source document</h3><p>Compare the advertisement, quote, contract, addenda, disclosure, bill, or statement with the amount requested.</p></div><div class="ency-card"><span class="ency-icon">③</span><h3>Separate the charge types</h3><p>Mark amounts as one-time, recurring, optional, variable, conditional, refundable, or nonrefundable.</p></div><div class="ency-card"><span class="ency-icon">④</span><h3>Preserve the evidence</h3><p>Keep receipts, notices, payment records, screenshots, and written explanations before deciding how to respond.</p></div></div><div class="featured-highlight"><h3>Fee terms that need context</h3><div class="featured-grid"><div class="featured-item"><div class="fee-name">Administrative or processing fee</div><div class="fee-category">Ask what service it covers</div></div><div class="featured-item"><div class="fee-name">Convenience or service charge</div><div class="fee-category">Check payment method and alternatives</div></div><div class="featured-item"><div class="fee-name">Documentation or preparation fee</div><div class="fee-category">Compare with the written total</div></div><div class="featured-item"><div class="fee-name">Renewal or escalation charge</div><div class="fee-category">Record notice and change terms</div></div><div class="featured-item"><div class="fee-name">Termination or cancellation fee</div><div class="fee-category">Find the trigger and notice rule</div></div><div class="featured-item"><div class="fee-name">Markup or surcharge</div><div class="fee-category">Identify the underlying item or service</div></div><div class="featured-item"><div class="fee-name">Duplicate or unclear charge</div><div class="fee-category">Reconcile against the source record</div></div><div class="featured-item"><div class="fee-name">Recurring or auto-renewal charge</div><div class="fee-category">Record renewal and cancellation evidence</div></div></div></div><div class="toc" id="table-of-contents"><h3>Topic map</h3><ul>${topicGroups.map((group) => `<li><a href="#${group.id}">${group.heading}</a></li>`).join('')}</ul></div><div class="eeat-links"><a href="/hidden-fees-guides">Hidden Fee Guides</a><a href="/hidden-fee-prevention-guide">Prevention Checklist</a><a href="/research-center">Research Center</a><a href="/research-methodology">Research Methodology</a><a href="/hidden-fee-taxonomy-public.json">Public Taxonomy JSON</a><a href="/editorial-policy">Editorial Policy</a></div></div></section>${topicCards}<section class="section" style="border-top:none;padding-top:10px"><div class="container encyclopedia-page"><h2>Source context and research status</h2><p>The <a href="https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions" rel="noopener noreferrer">FTC fee-rule FAQ</a> explains how final payment amounts, mandatory ancillary charges, and optional add-ons are treated within the rule’s scope. The <a href="https://www.consumerfinance.gov/rules-policy/junk-fees/" rel="noopener noreferrer">CFPB junk-fee resource</a> provides agency context for fees charged by banks and financial companies. The <a href="https://consumer.ftc.gov/articles/financing-or-leasing-car" rel="noopener noreferrer">FTC car-financing guidance</a> recommends written out-the-door pricing and comparison of financing terms. The <a href="https://www.ftc.gov/business-guidance/blog/2024/10/click-cancel-ftcs-amended-negative-option-rule-what-it-means-your-business" rel="noopener noreferrer">FTC recurring-subscription guidance</a> discusses disclosures and cancellation for negative-option programs.</p><p>These sources provide context for particular transactions; they do not establish that every fee listed here is unlawful or that every category has the same rule. The public DetectHiddenFees research manifest is currently collecting-only, with no published prevalence statistics. Inspect the <a href="/research-data.json">machine-readable research manifest</a> and <a href="/research-methodology">methodology</a> for the publication gate.</p><div class="disclaimer"><strong>Limitations:</strong> This encyclopedia is editorial educational material. It is not legal, financial, medical, tax, accounting, or professional advice. Product capabilities, pricing, privacy, retention, and supported documents must be confirmed from current first-party product information.</div><h2 id="faq">Frequently asked questions</h2><div class="faq-section">${faqHtml}</div><div class="cta-section"><h2>Review a document for fee language</h2><p>HiddenFeeAI is the related document-analysis product. Confirm its current first-party product, privacy, retention, and supported-document details before uploading a record.</p><a href="https://hiddenfeeai.com" class="cta-white-btn" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document for Fees</a></div><p style="margin-top:30px;font-size:.9rem;color:#94a3b8;"><strong>Continue:</strong> <a href="/hidden-fee-detector" style="color:#94a3b8;">Hidden Fee Detector</a> · <a href="/hidden-fee-prevention-guide" style="color:#94a3b8;">Prevention Guide</a> · <a href="/ai-document-review-tool" style="color:#94a3b8;">AI Document Review Tool</a> · <a href="/contact" style="color:#94a3b8;">Contact</a></p></div></section></main>`;

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
console.log('Remediated hidden fee encyclopedia with citation-first topic mapping, source context, contextual CTA, and FAQs.');
