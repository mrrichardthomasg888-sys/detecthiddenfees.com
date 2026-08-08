const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'early-termination-fees.html');
let source = fs.readFileSync(file, 'utf8');

const updated = '2026-08-08';
const title = 'Early Termination Fees: How to Read Cancellation and Exit Clauses | DetectHiddenFees';
const displayTitle = 'Early Termination Fees: How to Read Cancellation and Exit Clauses';
const description = 'Learn how to locate, reconcile, and question early-termination fees, acceleration clauses, notice periods, and cancellation terms without treating a document review as legal advice.';

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate the document end after the sticky CTA bar');
  source = source.slice(0, stickyStart) + source.slice(bodyEnd);
}

function normalizeFooter() {
  source = source.replaceAll('Document Intelligence Center', 'AI Analysis Hub');
  source = source.replace('Last updated July 2026', 'Last updated August 8, 2026');
  source = source.replace('AI-Powered Hidden Fee Detection for Consumers', 'Financial Transparency Resources');
  source = source.replace('AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers', 'Financial Transparency Resources');
}

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace('</head>', `${replacement}</head>`);
}

function annotateCtas() {
  source = source.replace(/<a\b[^>]*href="https:\/\/hiddenfeeai\.com"[^>]*>[\s\S]*?<\/a>/gi, (block) => {
    if (block.includes('data-cta-action=')) return block;
    return block.replace('<a ', '<a data-cta-action="contract_review" data-cta-position="end" data-cta-variant="contextual" ');
  });
}

const faq = [
  ['What is an early termination fee?', 'It is a charge or other financial consequence that a contract may apply when a party ends an agreement before a stated term. The amount, trigger, notice, and available exceptions depend on the contract, transaction, and applicable law.'],
  ['How is an early termination fee calculated?', 'A contract may state a flat amount, a prorated amount, remaining payments, an acceleration formula, unrecovered costs, or another method. Reconcile the stated formula with the dates, payments, credits, and other facts rather than assuming one method applies everywhere.'],
  ['Does an early termination fee prove that a contract is unfair or illegal?', 'No. A fee deserves review when its trigger, amount, formula, or disclosure is unclear, but enforceability and fairness are legal questions that depend on the agreement, facts, and jurisdiction.'],
  ['Can a contract make all remaining payments due immediately?', 'Some agreements contain acceleration language, but whether it applies and what amount is owed depends on the exact clause, related terms, payment history, and applicable law. Do not infer a balance from a headline or summary alone.'],
  ['Where should I look for cancellation or exit terms?', 'Search the term, termination, cancellation, renewal, default, notice, remedies, payment, and schedule sections. Also check addenda, service terms, order forms, lease disclosures, and any document incorporated by reference.'],
  ['Can I negotiate an early termination fee?', 'You can ask before signing whether the fee, notice period, waiver, trial period, transfer option, or prorating method can be changed. Get any agreement in the final written contract; negotiation is not a guarantee of acceptance.'],
  ['Do subscriptions and service contracts have early termination fees?', 'They may. Review the initial term, renewal, cancellation channel, notice deadline, billing cycle, device or equipment obligations, and any fee or remaining-balance language. Rules differ by product and jurisdiction.'],
  ['Can AI determine whether an early termination fee is enforceable?', 'No. AI-assisted review may organize clauses, dates, amounts, and questions for verification. It cannot determine enforceability, legal rights, or the correct dispute strategy from a document alone.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

if (source.includes('An early termination fee is a contractual charge or financial consequence')) {
  normalizeFooter();
  removeStickyProductBar();
  annotateCtas();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The early-termination page is already remediated; normalized the footer, sticky bar, and CTA metadata.');
  process.exit(0);
}

upsertMeta(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}">`);
upsertMeta(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}">`);
upsertMeta(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}">`);

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
    datePublished: '2026-07-20',
    dateModified: updated,
    articleSection: 'Contract clauses',
    '@id': 'https://detecthiddenfees.com/early-termination-fees#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/early-termination-fees#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Contract Review', item: 'https://detecthiddenfees.com/ai-contract-review' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/early-termination-fees' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/early-termination-fees',
    inLanguage: 'en-US',
    datePublished: '2026-07-20',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Early termination and cancellation clauses' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/early-termination-fees#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-contract-review">AI Contract Review</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">EARLY TERMINATION FEES</div><h1>${displayTitle}</h1><p class="hero-sub">An early termination fee is a contractual charge or financial consequence that may apply when an agreement ends before its stated term. Whether it applies, how it is calculated, and what rights or exceptions exist depend on the contract, transaction, facts, and jurisdiction.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-trust"><span>Read the trigger and formula</span><span>Reconcile dates and amounts</span><span>Check current cancellation terms</span><span>AI is not legal advice</span></div><div class="hero-buttons"><a href="#review" class="primary-btn">Review Exit Terms</a><a href="/ai-contract-review" class="secondary-btn">AI Contract Review Guide</a></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="pillar-links"><h3>Direct answer: what should you check first?</h3><p>Locate the clause that states when cancellation is allowed, what notice is required, how any charge or remaining balance is determined, and what related documents modify the term. A fee or acceleration clause is a review point, not by itself proof that the charge is unlawful or enforceable.</p><ul><li>Identify the initial term, renewal term, and earliest exit date.</li><li>Separate a stated fee from remaining payments, credits, equipment obligations, or other consequences.</li><li>Check notice method, deadline, trial or cooling-off terms, exceptions, and written-confirmation requirements.</li><li>Verify the calculation against the signed agreement and the facts of the cancellation.</li></ul></div></div></section><section class="section" id="review"><div class="container long-content"><h2>Early termination terms to review</h2><div class="pillar-links"><h3>Flat or scheduled charge</h3><p>The agreement may state a fixed amount or a schedule that changes over time. Record the trigger, effective date, and any prorating or waiver language.</p></div><div class="pillar-links"><h3>Remaining payments or acceleration</h3><p>Some agreements refer to unpaid installments, an accelerated balance, or an amount calculated from future payments. Do not assume the remaining balance equals the amount owed; reconcile the clause, credits, discounts, and applicable facts.</p></div><div class="pillar-links"><h3>Unrecovered costs or benefits</h3><p>A contract may describe equipment, installation, incentives, discounts, or other amounts that become payable after early exit. Ask what cost or benefit the term is intended to address and where it is disclosed.</p></div><div class="pillar-links"><h3>Notice, renewal, and cancellation channel</h3><p>Check the required notice period, accepted cancellation method, billing-cycle cutoff, renewal date, and whether the provider must confirm the request in writing.</p></div><div class="pillar-links"><h3>Transfer, pause, or alternative exit</h3><p>Some products offer transfer, suspension, buyout, return, or change-of-service options. These are contract-specific and should be documented before relying on them.</p></div></div></section><section class="section"><div class="container long-content"><h2>How to review a real agreement</h2><div class="pillar-links"><h3>1. Preserve the complete record</h3><p>Keep the signed agreement, order form, service terms, addenda, renewal notice, invoices, payment history, cancellation request, and any written response.</p></div><div class="pillar-links"><h3>2. Locate every related clause</h3><p>Search for term, renewal, cancellation, termination, default, remedies, notice, payment, equipment, return, and dispute language. Read incorporated documents too.</p></div><div class="pillar-links"><h3>3. Reconcile the calculation</h3><p>Write down the stated formula and substitute only facts supported by the record: start date, end date, notice date, payments, credits, discounts, taxes, equipment, and any stated cap or prorating method.</p></div><div class="pillar-links"><h3>4. Ask focused questions</h3><p>Ask the issuer to identify the exact clause, explain the calculation, confirm the cancellation date, and state what happens to future billing, equipment, deposits, or credits.</p></div><div class="pillar-links"><h3>5. Keep proof of cancellation</h3><p>Save the request, confirmation number, email, letter, chat transcript, delivery record, and later statement. Follow the agreement's stated process while checking applicable consumer protections.</p></div></div></section><section class="section"><div class="container long-content"><h2>Context differs by agreement type</h2><p>Early-exit consequences can appear in telecommunications, subscriptions, leases, vehicle agreements, equipment contracts, memberships, professional services, and business arrangements. The same label can describe different formulas and legal rules.</p><div class="pillar-links"><h3>Service and subscription agreements</h3><p>Check the initial term, renewal, cancellation channel, billing cycle, notice deadline, and whether the service continues until the next cycle.</p></div><div class="pillar-links"><h3>Leases and vehicle agreements</h3><p>Check return conditions, remaining payment or loss calculations, mileage or condition charges, disposition amounts, and the written method for early termination. Lease-specific disclosure rules may apply.</p></div><div class="pillar-links"><h3>Business and professional contracts</h3><p>Check minimum commitments, notice, transition work, reserved capacity, wind-down duties, data return, confidentiality, and dispute provisions. Commercial terms can differ from consumer protections.</p></div><p class="disclaimer"><strong>Important:</strong> A general guide cannot determine the rights or amount owed under a particular contract. Use the signed documents and the applicable regulator, dispute process, or qualified professional.</p></div></section><section class="section"><div class="container long-content"><h2>Official guidance and AI limitations</h2><p>The <a href="https://docs.fcc.gov/public/attachments/DOC-298416A1.pdf" rel="noopener noreferrer">FCC consumer tips on early termination fees</a> tell consumers to ask how much an ETF is, how it is prorated, and whether a trial period or alternative exists. That guidance is specific to the described communications context, not a universal rule for every contract.</p><p>The <a href="https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions" rel="noopener noreferrer">FTC subscription-cancellation guidance</a> recommends following the stated cancellation process and keeping records of the request. The <a href="https://consumer.ftc.gov/articles/buyers-remorse-ftcs-cooling-rule-may-help" rel="noopener noreferrer">FTC Cooling-Off Rule guidance</a> explains a specific cancellation right in certain covered sales; it does not create a general right to cancel every contract.</p><p>For certain consumer leases, the <a href="https://www.consumerfinance.gov/rules-policy/regulations/1013/4/" rel="noopener noreferrer">CFPB Regulation M disclosure rule</a> addresses disclosure of early-termination conditions and the method for determining a charge. It is context-specific and not a conclusion about this page's readers or contracts.</p><p>AI-assisted review may organize clauses, dates, amounts, and questions. It cannot determine enforceability, legal rights, fair value, the correct cancellation strategy, or the amount owed from a document alone.</p><h2>Frequently asked questions</h2><div class="faq-section"><h3>What is an early termination fee?</h3><div class="faq-answer">It is a charge or other financial consequence that a contract may apply when a party ends an agreement before a stated term. The amount, trigger, notice, and available exceptions depend on the contract, transaction, and applicable law.</div></div><div class="faq-section"><h3>How is an early termination fee calculated?</h3><div class="faq-answer">A contract may state a flat amount, a prorated amount, remaining payments, an acceleration formula, unrecovered costs, or another method. Reconcile the stated formula with the dates, payments, credits, and other facts rather than assuming one method applies everywhere.</div></div><div class="faq-section"><h3>Does an early termination fee prove that a contract is unfair or illegal?</h3><div class="faq-answer">No. A fee deserves review when its trigger, amount, formula, or disclosure is unclear, but enforceability and fairness are legal questions that depend on the agreement, facts, and jurisdiction.</div></div><div class="faq-section"><h3>Can a contract make all remaining payments due immediately?</h3><div class="faq-answer">Some agreements contain acceleration language, but whether it applies and what amount is owed depends on the exact clause, related terms, payment history, and applicable law. Do not infer a balance from a headline or summary alone.</div></div><div class="faq-section"><h3>Where should I look for cancellation or exit terms?</h3><div class="faq-answer">Search the term, termination, cancellation, renewal, default, notice, remedies, payment, and schedule sections. Also check addenda, service terms, order forms, lease disclosures, and any document incorporated by reference.</div></div><div class="faq-section"><h3>Can I negotiate an early termination fee?</h3><div class="faq-answer">You can ask before signing whether the fee, notice period, waiver, trial period, transfer option, or prorating method can be changed. Get any agreement in the final written contract; negotiation is not a guarantee of acceptance.</div></div><div class="faq-section"><h3>Do subscriptions and service contracts have early termination fees?</h3><div class="faq-answer">They may. Review the initial term, renewal, cancellation channel, notice deadline, billing cycle, device or equipment obligations, and any fee or remaining-balance language. Rules differ by product and jurisdiction.</div></div><div class="faq-section"><h3>Can AI determine whether an early termination fee is enforceable?</h3><div class="faq-answer">No. AI-assisted review may organize clauses, dates, amounts, and questions for verification. It cannot determine enforceability, legal rights, or the correct dispute strategy from a document alone.</div></div></div></section><section class="section"><div class="container"><h2>Need help organizing a contract review?</h2><p>HiddenFeeAI is the related document-analysis product. Confirm its current first-party product, privacy, and retention details before uploading a contract.</p><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="contract_review" data-cta-position="end" data-cta-variant="contextual">Review My Contract for Exit Terms</a></div></section><section class="section"><div class="container related-articles"><h2>Related resources</h2><a href="/cancellation-fee-clauses">Cancellation Fee Clauses</a><a href="/hidden-subscription-fees">Subscription Fee Guide</a><a href="/contract-red-flags">Contract Red Flags</a><a href="/contract-terms-glossary">Contract Terms Glossary</a><a href="/ai-contract-review">AI Contract Review</a><a href="/editorial-policy">Editorial Policy</a></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeFooter();
removeStickyProductBar();
annotateCtas();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated early-termination guide with jurisdiction-aware explanations, official sources, contextual CTA, and FAQs.');
