const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-fee-examples.html');
let source = fs.readFileSync(file, 'utf8');

const title = 'Hidden Fee Examples: Illustrative Document Review Walkthroughs | DetectHiddenFees';
const displayTitle = 'Hidden Fee Examples: Illustrative Document Review Walkthroughs';
const description = 'Illustrative walkthroughs for reviewing fees in HVAC estimates, renovation proposals, medical bills, auto financing, phone bills, and internet agreements without treating examples as market or legal findings.';
const updated = '2026-08-08';

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
  source = source.slice(0, stickyStart) + source.slice(bodyEnd);
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
  ['Are these hidden-fee examples real customer documents?', 'No. The walkthroughs are illustrative educational scenarios. They do not describe a real customer, provider, project, bill, market price, or case outcome.'],
  ['What should I compare when reviewing a document for fees?', 'Keep the complete source record and compare the stated total with line items, definitions, footnotes, addenda, schedules, recurring terms, payment records, and any related estimate, agreement, or Explanation of Benefits.'],
  ['Can a separate charge be called a hidden fee automatically?', 'No. A separate or unfamiliar charge may be disclosed, optional, conditional, required, or incorrect depending on the transaction and applicable rules. Treat it as a question to verify rather than a legal conclusion.'],
  ['Why does the review method change by document type?', 'An HVAC estimate, medical bill, auto-financing agreement, and subscription statement use different terminology and supporting records. The relevant authority, contract terms, dates, and reconciliation steps can differ.'],
  ['Can AI decide whether a charge is excessive or unlawful?', 'No. AI-assisted review may help organize text, amounts, and follow-up questions, but it cannot determine legality, enforceability, fair value, medical necessity, workmanship, fraud, or the final amount owed.'],
  ['What should I do before uploading a document for review?', 'Keep the original, remove unnecessary identifiers when practical, and check the related product’s current first-party privacy, retention, processing, security, supported-format, and document-limit terms before uploading a sensitive record.']
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
    url: 'https://detecthiddenfees.com/hidden-fee-examples',
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Illustrative hidden-fee document review examples' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-examples#collection'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hidden Fee Encyclopedia', item: 'https://detecthiddenfees.com/hidden-fee-encyclopedia' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-fee-examples' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-fee-examples',
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Illustrative document fee review walkthroughs' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-examples#page'
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntries }
];

if (source.includes('Use these illustrative walkthroughs') && source.includes('data-cta-action="document_analysis"')) {
  removeStickyProductBar();
  source = source.replaceAll('/example-phone-bill', '/example-cell-phone-bill');
  source = source.replace(/AI-Powered Hidden Fee Detection for Consumers/g, 'Financial Transparency Resources');
  source = source.replace(/<style id="hidden-fee-examples-responsive">[\s\S]*?<\/style>/g, '');
  source = source.replace('</head>', '<style id="hidden-fee-examples-responsive">body{padding-bottom:0;}footer .footer-column a{display:block;overflow-wrap:anywhere;}</style></head>');
  fs.writeFileSync(file, source, 'utf8');
  console.log('The hidden-fee examples library is already remediated; normalized the sticky bar and responsive footer state.');
  process.exit(0);
}

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);
upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?\s*>/, '<link rel="canonical" href="https://detecthiddenfees.com/hidden-fee-examples">');
source = source.replace(/(<link rel="canonical"[^>]*>)>/g, '$1');

const schemaHtml = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
source = source.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
source = source.replace('</head>', `${schemaHtml}<style id="hidden-fee-examples-responsive">body{padding-bottom:0;}footer .footer-column a{display:block;overflow-wrap:anywhere;}.example-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin:30px 0 46px;}.example-card{display:flex;flex-direction:column;padding:28px;border-radius:24px;background:linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.95));border:1px solid rgba(255,255,255,.08);}.example-card h3{margin:0 0 12px;color:white;font-size:1.3rem;}.example-card p{color:#cbd5e1;line-height:1.85;}.example-card .example-label{font-size:.82rem;color:#93c5fd;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px;}.example-card a{margin-top:auto;padding-top:18px;color:#bfdbfe;font-weight:800;overflow-wrap:anywhere;}.source-note{font-size:.95rem;color:#cbd5e1;line-height:1.9;}@media(max-width:600px){.example-grid{grid-template-columns:1fr;}.example-card{padding:22px 18px;}}</style></head>`);

const examples = [
  ['/example-hvac-estimate', 'HVAC estimate', 'Fictional estimate', 'Reconcile equipment, labor, permits, materials, optional products, payment timing, and the quoted total.'],
  ['/example-home-renovation-proposal', 'Home renovation proposal', 'Fictional proposal', 'Separate scope, allowances, subcontractors, permits, disposal, change orders, deposits, and exclusions before comparing totals.'],
  ['/example-medical-bill', 'Medical bill', 'Fictional bill', 'Compare the itemized bill with the Explanation of Benefits, provider records, payments, credits, and patient responsibility.'],
  ['/example-auto-financing', 'Auto financing agreement', 'Fictional agreement', 'Review the vehicle price, dealer charges, optional add-ons, APR, amount financed, and total of payments.'],
  ['/example-cell-phone-bill', 'Phone bill', 'Illustrative statement', 'Check recurring plan charges, equipment, usage, taxes, regulatory fees, promotional expiration, and cancellation records.'],
  ['/example-internet-service-agreement', 'Internet service agreement', 'Illustrative agreement', 'Locate promotional pricing, equipment charges, renewal, price-change, early-termination, and cancellation terms.']
];

const exampleCards = examples.map(([href, heading, label, summary]) => `<article class="example-card"><div class="example-label">${label}</div><h3>${heading}</h3><p>${summary}</p><a href="${href}">Open the review walkthrough →</a></article>`).join('');
const faqHtml = faqEntries.map((entry) => `<details><summary>${entry.name}</summary><div class="faq-answer"><p>${entry.acceptedAnswer.text}</p></div></details>`).join('');

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">EXAMPLES LIBRARY</div><h1>${displayTitle}</h1><p class="hero-sub">Use these illustrative walkthroughs to learn how to reconcile fees, totals, recurring charges, and supporting records in common documents. They demonstrate review questions; they are not real customer documents, market benchmarks, legal findings, or promised product results.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="trust-bar"><span>Illustrative scenarios are labeled</span><span>Source records control</span><span>Document type matters</span><span>Human verification required</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="topic-box"><h3>Direct answer: what can these examples teach?</h3><p>They show where to look for amounts, definitions, footnotes, addenda, recurring terms, conditional charges, and mismatches that deserve a closer read. A charge that appears unfamiliar or separate is not automatically hidden, excessive, deceptive, or unlawful; preserve the source and verify the explanation.</p></div></div></section><section class="section"><div class="container"><h2>Choose a document walkthrough</h2><p>Start with the document type because the relevant terminology and supporting records change by transaction. Each walkthrough uses a fictional or explicitly illustrative scenario and avoids invented prices or customer outcomes.</p><div class="example-grid">${exampleCards}</div></div></section><section class="section"><div class="container"><h2>Review method used in every example</h2><div class="card"><h3>1. Preserve the complete record</h3><p>Keep every page, attachment, schedule, notice, receipt, payment record, and version that affects the amount or obligation.</p></div><div class="card"><h3>2. Define the question</h3><p>Identify whether you are checking a total, recurring charge, renewal, cancellation, scope, payment trigger, add-on, adjustment, or another specific term.</p></div><div class="card"><h3>3. Locate and reconcile the source</h3><p>Read the cited passage in context and compare descriptions, dates, quantities, rates, credits, payments, and exceptions with the related record.</p></div><div class="card"><h3>4. Ask for an explanation before acting</h3><p>Request a written explanation from the provider or counterparty and seek qualified legal, medical, financial, tax, or other specialized advice when the consequences matter.</p></div><div class="warning-box"><h3>A review signal is not a finding</h3><p>AI-assisted or manual review can surface questions, but it cannot determine legality, enforceability, fair value, medical necessity, workmanship, fraud, or the final amount owed from an example or document alone.</p></div></div></section><section class="section"><div class="container"><h2>Official source context</h2><p class="source-note">The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam" rel="noopener noreferrer">FTC home-improvement guidance</a> recommends written estimates, a written scope and price, careful contract review, and explanations for differences among estimates. CMS explains how to <a href="https://www.cms.gov/medical-bill-rights/help/guides/bill-errors" rel="noopener noreferrer">check a medical bill for errors</a> and how an <a href="https://www.cms.gov/medical-bill-rights/help/guides/explanation-of-benefits" rel="noopener noreferrer">Explanation of Benefits</a> relates to the amount a patient may owe. CFPB guidance describes the components of an <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-included-in-the-monthly-auto-loan-payment-en-819/" rel="noopener noreferrer">auto-loan payment</a> and questions to ask about <a href="https://www.consumerfinance.gov/ask-cfpb/what-things-can-i-negotiate-when-shopping-for-a-car-or-auto-loan-en-2132/" rel="noopener noreferrer">dealer charges and add-ons</a>. FTC guidance on <a href="https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions" rel="noopener noreferrer">free trials, auto-renewals, and negative options</a> provides subscription context.</p><p class="source-note">These sources are transaction-specific. They do not establish a universal hidden-fee rate, prove that an individual charge is illegal, or certify DetectHiddenFees or HiddenFeeAI. Check current first-party product terms before uploading a sensitive record.</p></div></section><section class="section"><div class="container"><h2>Frequently asked questions</h2><div class="faq-section">${faqHtml}</div><div class="disclaimer"><strong>Editorial boundary:</strong> This library is educational and illustrative. It does not provide legal, medical, financial, tax, engineering, billing, or other professional advice. The public DetectHiddenFees research manifest remains collecting-only; inspect the <a href="/research-data.json">research manifest</a> and <a href="/research-methodology">methodology</a> for data status.</div></div></section><section class="section"><div class="container"><div class="cta-block"><h2>Want to review your own document?</h2><p>HiddenFeeAI is the related AI document-analysis product. Confirm its current first-party capabilities, privacy, retention, processing, security, and supported-format terms before uploading a sensitive record.</p><a href="https://hiddenfeeai.com" class="cta-btn" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document for Fees</a></div><p style="margin-top:30px;font-size:.9rem;color:#94a3b8;"><strong>Continue:</strong> <a href="/hidden-fees-guides" style="color:#94a3b8;">Hidden Fee Guides</a> · <a href="/hidden-fee-encyclopedia" style="color:#94a3b8;">Hidden Fee Encyclopedia</a> · <a href="/hidden-fee-prevention-guide" style="color:#94a3b8;">Prevention Guide</a> · <a href="/research-center" style="color:#94a3b8;">Research Center</a></p></div></section></main>`;

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
removeStickyProductBar();
source = source.replace(/AI-Powered Hidden Fee Detection for Consumers/g, 'Financial Transparency Resources');
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated hidden-fee examples with illustrative scenarios, official source context, and a contextual document-analysis CTA.');
