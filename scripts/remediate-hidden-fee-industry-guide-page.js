const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-fee-industry-guide.html');
const source = fs.readFileSync(file, 'utf8');

if (source.includes('id="hidden-fee-industry-guide-remediation"')) {
  const normalized = source.replace(/<div class="sticky-cta-bar">[\s\S]*?<\/div><style>[\s\S]*?<\/style><\/body>/i, '</body>');
  if (normalized !== source) {
    fs.writeFileSync(file, normalized);
    console.log('Removed the retired sticky product bar from the remediated hidden fee industry guide.');
  } else {
    console.log('Hidden fee industry guide already remediated.');
  }
  process.exit(0);
}

const displayTitle = 'Hidden Fees by Industry: Source-Aware Guides and Review Paths';
const description = 'Browse source-aware guides for banking, automotive, medical, construction, subscriptions, telecom, and contract fees. Compare documents, terms, and official guidance without assuming a fee is unlawful.';
const updated = '2026-08-08';

const faqItems = [
  ['Why do hidden-fee questions differ by industry?', 'A fee label has different meaning depending on the transaction, document, account, provider, and applicable rules. Start with the record and the industry-specific guidance rather than applying one universal checklist.'],
  ['Does this hub publish typical hidden-fee amounts?', 'No. The DetectHiddenFees research manifest is collecting and verifying records, not publishing unsupported national averages, fee ranges, or industry-wide totals. A charge must be evaluated against the source terms and transaction facts.'],
  ['What documents should I compare with a quoted total?', 'Depending on the topic, compare the advertisement, estimate, contract, addendum, invoice, account disclosure, financing agreement, Explanation of Benefits, renewal notice, receipt, and written explanations. Preserve the complete record.'],
  ['Can a separate charge prove that a fee is unlawful?', 'No. A separate, vague, repeated, or unexpected line may be worth questioning, but it does not by itself establish illegality, deception, excessive pricing, or a successful dispute.'],
  ['How can AI-assisted review help with an industry fee?', 'It may help organize a document, locate fee language, compare amounts within related records, and generate questions. Verify every material finding against the original record and current source guidance.'],
  ['What should I do before uploading a financial document?', 'Confirm the separate HiddenFeeAI product’s current first-party capabilities, supported formats, privacy, retention, deletion, access, and payment terms. Remove unnecessary personal information when practical.']
];

const cards = [
  ['Bank overdraft fees', 'Review transaction type, available balance, account disclosures, opt-in records, NSF labels, and the fee explanation.', '/hidden-bank-overdraft-fees', 'Review bank fees'],
  ['Dealership financing fees', 'Compare the sales contract, financing agreement, total cost, add-ons, and items you accepted or declined.', '/hidden-dealership-financing-fees', 'Review auto financing'],
  ['Medical billing fees', 'Reconcile the bill with the Explanation of Benefits, service record, codes, dates, and provider explanations.', '/duplicate-medical-billing-charges', 'Review medical billing'],
  ['Construction and contractor fees', 'Check scope, allowances, permits, subcontractors, change orders, delivery, disposal, and payment milestones.', '/hidden-home-renovation-fees', 'Review construction costs'],
  ['HVAC contractor fees', 'Use the estimate, service record, parts, labor, dispatch, emergency, warranty, and approval terms as the evidence.', '/hidden-hvac-contractor-fees', 'Review an HVAC estimate'],
  ['Rental and lease fees', 'Compare the lease, move-in record, notices, renewal terms, deposits, utilities, and itemized charges.', '/hidden-rental-fees', 'Review lease fees'],
  ['Subscription and renewal fees', 'Record the accepted offer, recurring price, renewal date, notice window, cancellation method, and confirmation.', '/hidden-subscription-fees', 'Review subscription terms'],
  ['Telecom and utility fees', 'Separate recurring service, equipment, activation, regulatory, usage, late, and termination amounts before questioning a bill.', '/hidden-telecom-fees', 'Review a service bill'],
  ['Contract and agreement fees', 'Locate definitions, payment triggers, recurring obligations, cancellation terms, change provisions, and incorporated schedules.', '/hidden-contract-fees', 'Review a contract'],
  ['Fee terminology', 'Use the dictionary to identify labels, then confirm what the term means in the specific document and jurisdiction.', '/hidden-fee-dictionary', 'Check a fee term'],
  ['Hidden-fee guide hub', 'Continue to source-aware checklists for bills, estimates, agreements, subscriptions, and other records.', '/hidden-fees-guides', 'Browse fee guides'],
  ['Research status', 'Inspect the collecting-only manifest and methodology before treating a category or example as evidence.', '/research-center', 'Read research status']
];

const cardHtml = cards.map(([name, summary, href, linkText]) => `<article class="industry-card"><h3>${name}</h3><p>${summary}</p><a href="${href}">${linkText} &rarr;</a></article>`).join('');
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
    '@type': 'CollectionPage',
    name: displayTitle,
    description,
    url: 'https://detecthiddenfees.com/hidden-fee-industry-guide',
    inLanguage: 'en-US',
    datePublished: '2026-07-19',
    dateModified: updated,
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    about: { '@type': 'Thing', name: 'Industry-specific hidden-fee review' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-industry-guide#collection'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-fee-industry-guide' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: displayTitle,
    description,
    url: 'https://detecthiddenfees.com/hidden-fee-industry-guide',
    inLanguage: 'en-US',
    datePublished: '2026-07-19',
    dateModified: updated,
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-industry-guide#webpage'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(([name, text]) => ({
      '@type': 'Question',
      name,
      acceptedAnswer: { '@type': 'Answer', text }
    }))
  }
];

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="page-header"><div class="container"><div class="badge">HIDDEN FEES BY INDUSTRY</div><h1>${displayTitle}</h1><p class="industry-hero-sub">Fee questions are transaction-specific. Use this hub to find a guide that matches the record you have, then compare the stated total with the contract, account disclosure, bill, estimate, or notice that controls the charge.</p><p class="last-updated">Last updated: <time datetime="${updated}">August 8, 2026</time></p></div></section><section class="section" style="padding-top:20px;"><div class="container long-content"><div class="industry-answer"><h2>Direct answer: how should you investigate an industry fee?</h2><p>Start with the complete written record and identify each one-time, recurring, optional, conditional, and disputed amount. Compare the charge with the industry-specific agreement, disclosure, estimate, bill, or notice; locate the event that triggered it; and ask for a written explanation when the documents do not agree.</p><p><strong>Important boundary:</strong> a fee label, price difference, or separate line does not by itself prove that a charge is hidden, excessive, deceptive, unlawful, or recoverable. The relevant facts, source terms, jurisdiction, and transaction type matter.</p></div><h2>How to use this hub</h2><div class="industry-steps"><div><h3>1. Choose the record</h3><p>Open the guide that matches your contract, estimate, statement, bill, lease, financing agreement, or subscription terms.</p></div><div><h3>2. Reconcile the amount</h3><p>Compare descriptions, dates, quantities, rates, credits, taxes, recurring terms, and payment history with the stated total.</p></div><div><h3>3. Preserve the question</h3><p>Save the source passage and ask the provider or a qualified professional for clarification when the issue has material consequences.</p></div></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><h2>Explore fee guides by industry and document type</h2><p class="section-intro">These links are starting points for source-aware review. They are not findings that a provider or industry uses an improper fee, and they do not publish unsupported typical amounts.</p><div class="industry-grid">${cardHtml}</div></div></section><section class="section" style="padding-top:20px;"><div class="container long-content"><h2>Official source context</h2><p>Official guidance is specific to the issue it addresses. The <a href="https://www.consumerfinance.gov/ask-cfpb/what-can-i-do-if-my-bank-charged-me-a-fee-for-overdrawing-my-account-en-1037/" rel="noopener noreferrer">CFPB overdraft guidance</a> distinguishes covered one-time debit and ATM transactions from checks and recurring electronic payments. The <a href="https://consumer.ftc.gov/consumer-alerts/2024/08/car-dealerships-cant-charge-you-add-ons-you-dont-want" rel="noopener noreferrer">FTC auto add-on guidance</a> recommends reading the sales and financing documents and checking the total cost. <a href="https://www.cms.gov/medical-bill-rights/help/guides/bill-errors" rel="noopener noreferrer">CMS medical-bill guidance</a> explains how to check for errors. The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam" rel="noopener noreferrer">FTC home-improvement guidance</a> recommends written estimates and contract review. FTC guidance on <a href="https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions" rel="noopener noreferrer">free trials and auto-renewals</a> provides subscription context.</p><p>The public DetectHiddenFees research manifest remains collecting-only. It currently does not support industry-wide prevalence, fee ranges, national totals, savings claims, or product-performance statistics. Review the <a href="/research-center">Research Center</a>, <a href="/research-methodology">methodology</a>, and <a href="/research-data.json">machine-readable manifest</a> before citing research status.</p><h2>Frequently asked questions</h2><div class="faq-section">${faqHtml}</div><div class="disclaimer"><strong>Disclaimer:</strong> This hub provides general educational information and links to source-aware resources. It is not legal, financial, medical, tax, accounting, construction, or other professional advice.</div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="industry-cta"><h2>Review a document for industry-specific fee language</h2><p>HiddenFeeAI.com is the separate AI-powered document-analysis product. Confirm its current first-party capabilities, supported formats, privacy, retention, and payment terms before uploading a sensitive record.</p><a href="https://hiddenfeeai.com" class="primary-btn" rel="noopener noreferrer" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document for Fees</a></div><h2>Continue exploring</h2><p class="related-links"><a href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a> · <a href="/hidden-fees-guides">Hidden Fee Guides</a> · <a href="/hidden-fee-examples">Illustrative Examples</a> · <a href="/research-center">Research Center</a> · <a href="/contact">Contact</a></p></div></section></main>`;

const style = '<style id="hidden-fee-industry-guide-remediation">.industry-hero-sub{max-width:900px;margin:20px auto;color:#e2e8f0;font-size:1.1rem;line-height:1.9}.last-updated{color:#94a3b8;font-size:.9rem;margin-top:14px}.industry-answer{padding:30px 34px;border-radius:24px;background:rgba(37,99,235,.10);border:1px solid rgba(59,130,246,.25);margin-bottom:46px}.industry-answer h2{margin-top:0}.industry-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin:28px 0}.industry-steps>div{padding:26px;border-radius:20px;background:rgba(15,23,42,.72);border:1px solid rgba(255,255,255,.08)}.industry-steps h3{font-size:1.15rem}.industry-steps p{font-size:.96rem;margin-bottom:0}.industry-cta{padding:48px 34px;border-radius:28px;background:linear-gradient(135deg,rgba(37,99,235,.20),rgba(147,51,234,.18));border:1px solid rgba(59,130,246,.28);margin-bottom:48px}.industry-cta h2{margin-top:0}.related-links{line-height:2.2}.related-links a{color:#93c5fd;font-weight:700}@media(max-width:700px){.industry-steps{grid-template-columns:1fr}.industry-answer,.industry-cta{padding:28px 20px}.industry-hero-sub{font-size:1rem}}</style>';

let next = source.replace(/<title>[\s\S]*?<\/title>/i, `<title>${displayTitle} | DetectHiddenFees</title>`);
next = next.replace(/<meta name="description" content="[^"]*"\s*\/?>(?=[\s\S]*?<\/head>)/i, `<meta name="description" content="${description}" />`);
next = next.replace(/<meta property="og:title" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:title" content="${displayTitle} | DetectHiddenFees" />`);
next = next.replace(/<meta property="og:description" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:description" content="${description}" />`);
next = next.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:title" content="${displayTitle} | DetectHiddenFees" />`);
next = next.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:description" content="${description}" />`);
next = next.replace(/<link rel="canonical" href="[^"]+"\s*\/?\s*>/i, '<link rel="canonical" href="https://detecthiddenfees.com/hidden-fee-industry-guide" />');
const headSchema = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
next = next.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
next = next.replace(/<\/head>/i, `${headSchema}${style}</head>`);
next = next.replace(/<main\b[\s\S]*?<\/main>/i, main);
next = next.replace(/<div class="sticky-cta-bar">[\s\S]*?<\/div><style>[\s\S]*?<\/style><\/body>/i, '</body>');
fs.writeFileSync(file, next);
console.log('Remediated hidden fee industry guide with source-aware categories, official guidance, a contextual CTA, FAQs, and collecting-only research boundaries.');
