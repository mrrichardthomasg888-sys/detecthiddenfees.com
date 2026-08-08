const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'duplicate-medical-billing-charges.html');
let source = fs.readFileSync(file, 'utf8');

const title = 'Duplicate Medical Billing Charges: How to Review a Bill | DetectHiddenFees';
const displayTitle = 'Duplicate Medical Billing Charges: How to Review a Bill';
const description = 'A practical, source-based guide to comparing a medical bill with an Explanation of Benefits, spotting duplicate or unclear line items, and asking the right billing questions.';
const updated = '2026-08-08';

if (source.includes('Review the documents in a fixed order') && source.includes('data-cta-action="bill_analysis"')) {
  source = source.replace(/(<link rel="canonical"[^>]*>)>/g, '$1');
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart >= 0) {
    const bodyEnd = source.indexOf('</body>', stickyStart);
    if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
    source = source.slice(0, stickyStart) + source.slice(bodyEnd);
  }
  fs.writeFileSync(file, source, 'utf8');
  console.log('The duplicate medical billing page is already remediated; normalized the sticky CTA state.');
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
  ['What is a duplicate medical billing charge?', 'A duplicate charge is a line item that appears to describe the same service, supply, date, or quantity more than once. Similar-looking entries can also be separate services, so compare the itemized bill with the Explanation of Benefits and ask the provider or health plan to explain any apparent duplicate.'],
  ['Is an Explanation of Benefits the same as a medical bill?', 'No. The Centers for Medicare & Medicaid Services explains that an Explanation of Benefits, or EOB, is a notice from the health plan and is not a bill. It shows services, plan amounts, and patient responsibility; compare those details with the provider bill.'],
  ['What should I check first when a medical bill looks wrong?', 'Request or locate the itemized bill, confirm the patient and dates of service, match each service or supply to the care received, compare the patient responsibility with the EOB, and identify any amount already paid. Contact the provider or facility when a line or balance does not reconcile.'],
  ['Can an apparent duplicate charge be a legitimate separate charge?', 'Yes. Separate providers, dates, locations, units, supplies, or claim lines can produce similar descriptions. A repeated description is a question for reconciliation, not proof of an error, overcharge, fraud, or illegal billing.'],
  ['Can AI review a medical bill for duplicate charges?', 'AI-assisted document review may help organize repeated descriptions, dates, amounts, and questions for human follow-up. It cannot determine medical necessity, coverage, coding correctness, legality, or the final amount you owe, and it cannot guarantee that every issue will be found.'],
  ['What if a bill may be a surprise or out-of-network bill?', 'The applicable protections depend on the type of coverage, service, provider, facility, and state. CMS explains No Surprises Act rights and provides a Help Desk. Preserve the bill, EOB, estimate, notices, and consent forms, then use the official guidance or contact the Help Desk to determine the next step.']
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
    url: 'https://detecthiddenfees.com/duplicate-medical-billing-charges',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://detecthiddenfees.com/duplicate-medical-billing-charges#page' },
    author: { '@type': 'Organization', name: 'DetectHiddenFees Research Team', url: 'https://detecthiddenfees.com/about-detect-hidden-fees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-17',
    dateModified: updated,
    inLanguage: 'en-US',
    '@id': 'https://detecthiddenfees.com/duplicate-medical-billing-charges#article'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Bill Analyzer', item: 'https://detecthiddenfees.com/ai-bill-analyzer' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/duplicate-medical-billing-charges' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/duplicate-medical-billing-charges',
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Medical bill review and duplicate-charge questions' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/duplicate-medical-billing-charges#page'
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntries }
];

const faqHtml = faqEntries.map((entry) => `<div class="faq-item"><h3>${entry.name}</h3><p>${entry.acceptedAnswer.text}</p></div>`).join('');

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-bill-analyzer">AI Bill Analyzer</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">MEDICAL BILL REVIEW</div><h1>${displayTitle}</h1><p class="hero-sub">A repeated line item, an unexpected balance, or a mismatch with an Explanation of Benefits deserves a careful reconciliation. This guide explains what to compare and what to ask; it does not label a charge erroneous without the underlying records.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><a href="https://hiddenfeeai.com" class="cta-button" data-cta-action="bill_analysis" data-cta-position="top" data-cta-variant="contextual">Review My Medical Bill</a><div class="trust-bar"><span>Compare the bill with the EOB</span><span>Check dates, descriptions, units, and amounts</span><span>Ask the provider or plan for explanations</span><span>AI review requires human verification</span></div><div class="quick-answer"><h2>Direct answer: how do you review a possible duplicate charge?</h2><p>Start with the itemized provider bill and the health plan's Explanation of Benefits. Match the patient, date of service, provider, service description, units, billed amount, allowed amount, insurance payment, patient responsibility, and payments already made. A repeated description is a review signal—not proof that the charge is wrong—because separate providers, dates, units, or claim lines can look similar.</p></div></div></section><section class="section"><div class="container medical-billing-page"><div class="cat-card"><h2>Key takeaways</h2><ul class="medical-list"><li>An EOB is not a bill; it helps explain what the plan processed and what patient responsibility may remain.</li><li>Compare the provider's itemized bill with the EOB before assuming the balance is correct or incorrect.</li><li>Check repeated dates, descriptions, quantities, provider names, and payments already made.</li><li>Ask for a written explanation of unclear facility, supply, administrative, or other line items.</li><li>Use official CMS guidance for surprise-billing or good-faith-estimate questions; coverage and state rules matter.</li></ul></div><h2>Review the documents in a fixed order</h2><div class="card-grid"><div class="card"><h3>1. Identify the records</h3><p>Collect the itemized provider bill, the matching EOB or claim detail, receipts, prior payments, authorization or estimate documents, and any notices about network status or consent.</p></div><div class="card"><h3>2. Match the service details</h3><p>Compare the patient name, dates, provider or facility, service description, procedure or claim reference when shown, units, and supplies. Similar wording may still describe separate services.</p></div><div class="card"><h3>3. Reconcile the money</h3><p>Check total charges, adjustments, allowed amounts, insurance payments, copay or coinsurance, deductible, patient responsibility, and payments already sent. The numbers should be explainable from the records you have.</p></div><div class="card"><h3>4. Ask before disputing</h3><p>Write down the exact line, date, amount, and question. Contact the provider or facility and, when the issue concerns claim processing or coverage, the health plan. Keep copies of responses.</p></div></div><div class="warning-box"><h3>Review signal, not a conclusion</h3><p>A duplicate-looking line, vague description, separate facility charge, or coding difference may have more than one explanation. Do not accuse a provider or stop payment solely because a line looks unusual. Ask for the record-level explanation and follow the applicable billing, insurance, and dispute process.</p></div><h2>Signals worth checking</h2><div class="checklist-section"><h3>Medical-bill reconciliation checklist</h3><div class="checklist-grid"><span>Patient and account identifiers</span><span>Dates of service</span><span>Provider and facility names</span><span>Repeated descriptions or claim references</span><span>Units, quantities, and supplies</span><span>Services you actually received</span><span>Itemized charges and adjustments</span><span>Allowed amount and insurance payment</span><span>Patient responsibility on the EOB</span><span>Payments or credits already made</span><span>Unclear facility or administrative labels</span><span>Estimate, notice, or consent records</span></div></div><p class="source-note">The CMS guides on <a href="https://www.cms.gov/medical-bill-rights/help/guides/how-to-read-bill" rel="noopener noreferrer">reading a medical bill</a> and <a href="https://www.cms.gov/medical-bill-rights/help/guides/explanation-of-benefits" rel="noopener noreferrer">reading an Explanation of Benefits</a> describe the fields and comparisons consumers should make. They are the source context for this checklist, not a finding about any particular provider or bill.</p><h2>Questions to send to the billing office</h2><div class="leverage-section"><p>Use precise, record-based questions rather than broad accusations:</p><div class="leverage-grid"><span>What service or supply does this line describe?</span><span>Why does this description appear more than once?</span><span>Are the dates, units, and provider details correct?</span><span>How does this amount relate to the EOB patient responsibility?</span><span>Was a payment, credit, or adjustment applied?</span><span>Which policy or agreement explains this fee?</span><span>Was an estimate or notice provided before care?</span><span>What is the formal correction or appeal process?</span></div><p style="font-size:.9rem;color:#cbd5e1;margin-top:16px;">Keep the request specific and save the response. A provider or plan may need additional records before it can answer.</p></div><h2>When surprise-billing protections may be relevant</h2><p>Unexpected out-of-network bills are a separate question from a duplicate line item. CMS explains that the No Surprises Act protects many people with private insurance from certain emergency and facility-related out-of-network bills, while uninsured or self-pay patients may have good-faith-estimate and dispute rights in qualifying situations. Exceptions and state rules apply.</p><p>See CMS <a href="https://www.cms.gov/medical-bill-rights/know-your-rights" rel="noopener noreferrer">Know your rights</a> and <a href="https://www.cms.gov/medical-bill-rights/help" rel="noopener noreferrer">Get help</a>. The CMS Help Desk can explain whether the federal process may apply; DetectHiddenFees does not determine eligibility.</p><h2>How AI-assisted review fits</h2><p>AI-assisted document review can help organize repeated descriptions, dates, amounts, and follow-up questions across a bill and related statement. Treat its output as a review aid. It cannot determine medical necessity, coverage, coding correctness, legality, or the final amount owed, and it cannot guarantee that every duplicate or billing issue will be found.</p><div class="scan-panel"><div class="scan-title">Illustrative review prompts</div><div class="scan-item"><div class="scan-name">Same service description and date appears twice</div><div class="scan-risk medium">Compare records</div></div><div class="scan-item"><div class="scan-name">Bill balance differs from EOB patient responsibility</div><div class="scan-risk medium">Ask why</div></div><div class="scan-item"><div class="scan-name">Unclear facility, supply, or administrative line</div><div class="scan-risk low">Request detail</div></div><div class="scan-item"><div class="scan-name">Service, date, or provider you do not recognize</div><div class="scan-risk high">Verify promptly</div></div></div><div class="mid-cta"><h3>Have a medical bill you want to organize for review?</h3><p>HiddenFeeAI is the related AI document-analysis product. Confirm its current product, privacy, retention, and supported-document details before uploading a sensitive record.</p><a href="https://hiddenfeeai.com" class="cta-button" data-cta-action="bill_analysis" data-cta-position="middle" data-cta-variant="contextual">Review My Medical Bill</a></div><h2 id="faq">Frequently asked questions</h2><div class="faq-section">${faqHtml}</div><h2>Sources and limitations</h2><p class="source-note">This guide uses official CMS consumer guidance for how to read a bill, how to read an EOB, No Surprises Act rights, and the CMS Help Desk: <a href="https://www.cms.gov/medical-bill-rights/help/guides/how-to-read-bill" rel="noopener noreferrer">medical bill guide</a>, <a href="https://www.cms.gov/medical-bill-rights/help/guides/explanation-of-benefits" rel="noopener noreferrer">EOB guide</a>, <a href="https://www.cms.gov/medical-bill-rights/know-your-rights" rel="noopener noreferrer">rights guide</a>, and <a href="https://www.cms.gov/medical-bill-rights/help" rel="noopener noreferrer">help page</a>. CMS guidance is not a finding about a particular bill. State law, plan terms, provider records, service details, and the date of care can change the analysis.</p><div class="disclaimer"><strong>Disclaimer:</strong> This page is educational and is not medical, legal, insurance, billing, or financial advice. Do not include diagnosis details or other sensitive health information in analytics or public communications. For a personal billing dispute, contact the provider, health plan, patient advocate, or an official consumer-protection resource.</div><div class="cta-section"><h2>Review a medical document for fee language</h2><p>HiddenFeeAI is the related product for AI-assisted document analysis. Confirm current first-party capabilities and privacy terms before uploading a medical record.</p><a href="https://hiddenfeeai.com" class="cta-white-btn" data-cta-action="bill_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Medical Bill</a></div><p style="margin-top:30px;font-size:.9rem;color:#94a3b8;"><strong>Continue:</strong> <a href="/ai-bill-analyzer" style="color:#94a3b8;">AI Bill Analyzer</a> · <a href="/hidden-fee-prevention-guide" style="color:#94a3b8;">Prevention Guide</a> · <a href="/hidden-fee-encyclopedia" style="color:#94a3b8;">Hidden Fee Encyclopedia</a> · <a href="/contact" style="color:#94a3b8;">Contact</a></p></div></section></main>`;

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);
upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?>/, '<link rel="canonical" href="https://detecthiddenfees.com/duplicate-medical-billing-charges">');
source = source.replace(/(<link rel="canonical"[^>]*>)>/g, '$1');

const schemaHtml = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
source = source.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
source = source.replace('</head>', `${schemaHtml}<style id="duplicate-medical-billing-responsive">footer .footer-column a{display:block;overflow-wrap:anywhere;}.medical-billing-page{min-width:0;}.medical-billing-page .medical-list{color:#cbd5e1;line-height:1.9;padding-left:24px;margin:0;}.medical-billing-page .medical-list li{margin:8px 0;}.medical-billing-page .source-note{font-size:.95rem;color:#cbd5e1;}.medical-billing-page a{overflow-wrap:anywhere;}@media(max-width:600px){.medical-billing-page .card-grid{grid-template-columns:1fr;}}</style></head>`);

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
console.log('Remediated duplicate medical billing page with CMS-sourced reconciliation guidance, qualified AI review language, and contextual bill-analysis CTAs.');
