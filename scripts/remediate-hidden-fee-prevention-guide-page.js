const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-fee-prevention-guide.html');
let source = fs.readFileSync(file, 'utf8');

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const scriptStart = source.indexOf('<script', stickyStart);
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate the document end after the sticky CTA bar');
  source = scriptStart >= 0 && scriptStart < bodyEnd
    ? source.slice(0, stickyStart) + source.slice(scriptStart)
    : source.slice(0, stickyStart) + source.slice(bodyEnd);
}

function normalizeResearchFooter() {
  source = source.replaceAll('Document Intelligence Center', 'AI Analysis Hub');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*hidden fees in agreements<\/span>/, '<a href="/hidden-contract-fees" style="color:#93c5fd;font-weight:600;">Hidden fees in agreements</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*detect billing errors<\/span>/, '<a href="/ai-bill-analyzer" style="color:#93c5fd;font-weight:600;">Detect billing errors</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*find hidden costs<\/span>/, '<a href="/hidden-fee-examples" style="color:#93c5fd;font-weight:600;">Find hidden costs</a>');
  source = source.replace(/>July 2026</g, '>August 8, 2026<');
}

function ensureResponsiveFooter() {
  const marker = '<style id="hidden-fee-prevention-responsive">';
  if (source.includes(marker)) return;
  source = source.replace('</head>', `${marker}footer .footer-column a{display:block;overflow-wrap:anywhere;}@media (max-width:600px){.content-wrap{min-width:0;}}</style></head>`);
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

const title = 'Hidden Fee Prevention Guide: 12 Evidence-Based Strategies | DetectHiddenFees';
const displayTitle = 'Hidden Fee Prevention Guide: 12 Evidence-Based Strategies';
const description = 'A practical, source-backed checklist for preventing unexpected fees before signing, paying, renewing, or accepting a contract, bill, estimate, or subscription.';
const updated = '2026-08-08';

const faq = [
  ['What is the best way to prevent a hidden fee?', 'Ask for a written, itemized total and identify which charges are required, optional, conditional, recurring, or subject to change. Then compare the final document with the quote or advertised price before committing.'],
  ['Can a provider charge a fee that was not in the first quote?', 'The answer depends on the document, transaction, applicable law, and whether the charge was disclosed or triggered later. Ask for the contractual basis and a written explanation; do not assume every difference is unlawful or every quote is binding.'],
  ['How can I prevent subscription renewal charges?', 'Record the renewal date, price-change terms, notice period, and cancellation method. Keep confirmation of cancellation and review recurring charges against the terms you accepted.'],
  ['How can I prevent bank or card fees?', 'Read the account or card disclosures, identify fee triggers and opt-in choices, use available alerts, and contact the institution promptly when a charge does not match the disclosed terms. Transaction type and account-specific rules matter.'],
  ['How can I prevent unexpected medical bills?', 'Ask which providers and services are included, preserve estimates and insurance communications, compare the bill with the Explanation of Benefits, and check the protections that may apply to your coverage and service.'],
  ['Should I upload a document for AI review before signing?', 'AI-assisted review may organize fee language and questions, but it is not a substitute for reading the original document or obtaining professional advice when stakes are material. Check current product privacy and retention terms before uploading sensitive records.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

if (source.includes('This guide is a prevention checklist, not a promise')) {
  removeStickyProductBar();
  normalizeResearchFooter();
  ensureResponsiveFooter();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The hidden fee prevention guide is already remediated; normalized the research footer and sticky bar.');
  process.exit(0);
}

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-24',
    dateModified: updated,
    articleSection: 'Hidden fee prevention',
    about: { '@type': 'Thing', name: 'Preventing unexpected fees' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-prevention-guide#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/hidden-fee-prevention-guide#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hidden Fee Encyclopedia', item: 'https://detecthiddenfees.com/hidden-fee-encyclopedia' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-fee-prevention-guide' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-fee-prevention-guide',
    inLanguage: 'en-US',
    datePublished: '2026-07-24',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Preventing unexpected fees across common documents and services' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-prevention-guide#webpage'
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

const strategies = [
  ['Strategy 1: Request an itemized total', 'Ask for the total price in writing and request a line-by-line explanation of required, optional, recurring, conditional, tax, shipping, and later-incurred charges. The FTC fee-rule FAQ explains that the treatment of a charge depends on its nature and the transaction covered; do not treat an all-in request as a universal legal guarantee.'],
  ['Strategy 2: Review before signing', 'Read every page, attachment, schedule, and referenced term before signing. Compare the final contract with the quote, advertisement, order, or estimate and mark every difference for written explanation.'],
  ['Strategy 3: Audit statements and bills', 'Review bank statements, card statements, utility bills, invoices, and receipts on a recurring schedule. Look for new fees, changed amounts, duplicate entries, unexplained balances, and charges that do not match the account terms.'],
  ['Strategy 4: Track subscriptions and renewals', 'Record the service, price, promotional period, renewal date, notice period, cancellation method, and confirmation number. Review recurring charges against the terms you accepted instead of relying on memory.'],
  ['Strategy 5: Ask questions before committing', 'Ask what each fee covers, whether it is optional, when it applies, whether the amount can change, and how cancellation works. Get any agreed waiver, credit, or limitation in the written document.'],
  ['Strategy 6: Compare like-for-like offers', 'Compare written offers using the same scope, equipment, service level, term, taxes, fees, credits, and optional products. A lower advertised price may omit a requirement or use different assumptions.'],
  ['Strategy 7: Review automatic payments', 'List recurring debits and keep confirmation when you cancel, downgrade, or change a payment method. Check the next statement for continued billing and use the provider’s documented dispute or cancellation channel when needed.'],
  ['Strategy 8: Read card-fee disclosures', 'Before using a credit or payment product, identify annual, transaction, foreign-use, late, balance-transfer, cash-advance, and other disclosed fees. Set alerts and compare the posted charge with the account agreement.'],
  ['Strategy 9: Check bank-account fee triggers', 'Read the account disclosures and identify overdraft, ATM, transfer, maintenance, returned-item, and other triggers. For covered debit-card and ATM overdraft services, the CFPB explains that affirmative opt-in and transaction type matter; account-specific terms still control.'],
  ['Strategy 10: Reconcile medical bills', 'Keep the estimate, itemized bill, Explanation of Benefits, authorizations, and correspondence. Compare dates, services, providers, insurance payments, patient responsibility, and protections that may apply to the coverage and service. CMS explains that No Surprises protections have defined coverage and exceptions.'],
  ['Strategy 11: Review telecom and service plans', 'Compare the advertised plan with the order confirmation, required equipment, recurring surcharges, promotional end date, taxes, and cancellation terms. Treat a label such as regulatory or recovery as a description to verify, not proof of a government charge.'],
  ['Strategy 12: Use written home-service contracts', 'For repair or improvement work, get a written scope, materials, schedule, total, payment terms, permit responsibility, warranty, cancellation rights, and change-order process. The FTC recommends checking licensing and insurance, getting written estimates, and reading the contract.']
];

const strategyHtml = strategies.map(([heading, text]) => `<h2>${heading}</h2><p>${text}</p>`).join('');
const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="page-header"><div class="container"><div class="badge">PREVENTION CHECKLIST</div><h1>${displayTitle}</h1><p class="page-sub">This guide helps you reduce surprises before signing, paying, renewing, or accepting a contract, bill, estimate, or subscription. It provides verification steps and source context, not a promise that a fee can always be prevented or removed.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p></div></section><section class="content-section"><div class="container content-wrap"><div class="topic-box" style="padding:24px 28px;border-radius:20px;background:rgba(15,23,42,.6);border:1px solid rgba(255,255,255,.06);"><h3>Direct answer: how do you prevent hidden fees?</h3><p>Ask for the written total and terms, separate required from optional and conditional charges, compare the final document with the original offer, track recurring payments, and preserve evidence. The exact legal remedy depends on the transaction, contract, jurisdiction, and records.</p><p><strong>This guide is a prevention checklist, not a promise</strong> that every fee is unlawful, undisclosed, negotiable, or removable.</p></div>${strategyHtml}<h2>Source context and limits</h2><p>The <a href="https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions" rel="noopener noreferrer">FTC fee-rule FAQ</a> explains covered total-price and fee-disclosure concepts. The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam" rel="noopener noreferrer">FTC home-improvement guidance</a> recommends written estimates, contract review, licensing and insurance checks, and caution around payment. The <a href="https://www.consumerfinance.gov/rules-policy/junk-fees/" rel="noopener noreferrer">CFPB junk-fee resource</a> and <a href="https://www.consumerfinance.gov/rules-policy/regulations/1005/17/" rel="noopener noreferrer">Regulation E overdraft provision</a> provide financial-fee context. The <a href="https://www.ftc.gov/legal-library/browse/rules/negative-option-rule" rel="noopener noreferrer">FTC Negative Option Rule page</a> tracks recurring-payment and cancellation material. The <a href="https://www.cms.gov/newsroom/fact-sheets/no-surprises-understand-your-rights-against-surprise-medical-bills" rel="noopener noreferrer">CMS No Surprises overview</a> describes defined medical-billing protections and limitations.</p><p>These sources do not create one nationwide fee rule for every industry. Read the contract, account disclosures, notices, and local requirements that apply to your situation. Use qualified professional or regulator assistance when the stakes are material.</p><h2 id="faq">Frequently asked questions</h2><div class="faq-section"><details><summary>What is the best way to prevent a hidden fee?</summary><div class="faq-answer"><p>Ask for a written, itemized total and identify which charges are required, optional, conditional, recurring, or subject to change. Then compare the final document with the quote or advertised price before committing.</p></div></details><details><summary>Can a provider charge a fee that was not in the first quote?</summary><div class="faq-answer"><p>The answer depends on the document, transaction, applicable law, and whether the charge was disclosed or triggered later. Ask for the contractual basis and a written explanation; do not assume every difference is unlawful or every quote is binding.</p></div></details><details><summary>How can I prevent subscription renewal charges?</summary><div class="faq-answer"><p>Record the renewal date, price-change terms, notice period, and cancellation method. Keep confirmation of cancellation and review recurring charges against the terms you accepted.</p></div></details><details><summary>How can I prevent bank or card fees?</summary><div class="faq-answer"><p>Read the account or card disclosures, identify fee triggers and opt-in choices, use available alerts, and contact the institution promptly when a charge does not match the disclosed terms. Transaction type and account-specific rules matter.</p></div></details><details><summary>How can I prevent unexpected medical bills?</summary><div class="faq-answer"><p>Ask which providers and services are included, preserve estimates and insurance communications, compare the bill with the Explanation of Benefits, and check the protections that may apply to your coverage and service.</p></div></details><details><summary>Should I upload a document for AI review before signing?</summary><div class="faq-answer"><p>AI-assisted review may organize fee language and questions, but it is not a substitute for reading the original document or obtaining professional advice when stakes are material. Check current product privacy and retention terms before uploading sensitive records.</p></div></details></div><div class="disclaimer"><strong>Disclaimer:</strong> This guide provides general educational information. It is not legal, financial, medical, tax, accounting, or professional advice.</div><section class="section" style="padding:20px 0 0"><h2>Review a document before you commit</h2><p>HiddenFeeAI is the related document-analysis product. Confirm its current first-party product, privacy, and retention details before uploading a document.</p><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document for Fees</a></section><section class="section" style="padding:20px 0 0"><h2>Continue learning</h2><div class="related-grid"><a href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a><a href="/hidden-fee-examples">Hidden Fee Examples</a><a href="/before-signing-contract-checklist">Before Signing Checklist</a><a href="/ai-document-analysis-tools">AI Document Analysis Tools</a><a href="/research-center">Research Center</a><a href="/editorial-policy">Editorial Policy</a></div></section></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
removeStickyProductBar();
ensureResponsiveFooter();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated hidden fee prevention guide with source-backed strategies, contextual CTA, and FAQs.');
