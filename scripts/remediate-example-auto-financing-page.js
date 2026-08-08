const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'example-auto-financing.html');
let source = fs.readFileSync(file, 'utf8');

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const scriptStart = source.indexOf('<script', stickyStart);
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate the end of the document after the sticky CTA bar');
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

function normalizeIllustrativeInputs() {
  source = source.replace(/<p>A fictional buyer receives a retail installment contract[\s\S]*?<\/p>/, '<p>A fictional buyer receives a retail installment contract from a dealership. To keep the example from looking like a market benchmark, the inputs are represented as variables: vehicle price <strong>V</strong>, down payment <strong>D</strong>, amount financed <strong>A = V - D + included fees or products</strong>, APR <strong>r</strong>, and term <strong>n</strong> payments. These symbols demonstrate the reconciliation method; they are not a typical offer or a statement about any lender or dealer.</p>');
}

if (source.includes('This fictional scenario demonstrates how to reconcile an auto-financing agreement')) {
  removeStickyProductBar();
  normalizeResearchFooter();
  normalizeIllustrativeInputs();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The auto-financing example is already remediated; normalized the sticky product bar and research footer links.');
  process.exit(0);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

const title = 'Auto Financing Example: How to Review APR, Add-Ons, and Total Cost | DetectHiddenFees';
const displayTitle = 'Auto Financing Example: How to Review APR, Add-Ons, and Total Cost';
const description = 'An illustrative auto-financing example showing how to compare APR, amount financed, add-ons, documentation fees, and total cost without treating a hypothetical scenario as a real finding.';
const updated = '2026-08-08';

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
replaceOnce('description metadata', /<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
replaceOnce('Twitter title', /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
replaceOnce('Twitter description', /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const faq = [
  ['Is this auto-financing example a real customer document?', 'No. It is a fictional educational scenario. Every number and document detail is illustrative and should not be treated as a market benchmark, legal conclusion, customer result, or prediction.'],
  ['What should a buyer compare in an auto-financing agreement?', 'Compare the vehicle price, out-the-door total, APR, loan term, amount financed, finance charge, total of payments, down payment, trade-in or payoff amounts, taxes, fees, and every optional product.'],
  ['Are the add-ons in this example required?', 'No conclusion can be drawn from a hypothetical example. In a real transaction, ask whether each product is optional, what it costs, what it covers, and whether the final contract matches what you agreed to.'],
  ['How can a buyer compare dealer-arranged financing?', 'Get the written dealer offer and compare it with a preapproval or quote from a bank, credit union, or other lender using the same APR, term, amount financed, and product assumptions.'],
  ['Does a difference between two APRs prove an improper markup?', 'No. A difference may have multiple explanations, including lender terms, credit factors, products, or negotiation. Compare the written disclosures and ask the lender or dealer to explain the terms.'],
  ['Can AI determine whether an auto-financing charge is illegal?', 'No. AI-assisted review may organize documents and flag a mismatch or unclear add-on, but it cannot establish legality, fair value, or a successful negotiation from a hypothetical or real document alone.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-22',
    dateModified: updated,
    '@id': 'https://detecthiddenfees.com/example-auto-financing#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/example-auto-financing#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Research Center', item: 'https://detecthiddenfees.com/research-center' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/example-auto-financing' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/example-auto-financing',
    inLanguage: 'en-US',
    datePublished: '2026-07-22',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Illustrative auto-financing document review' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/example-auto-financing#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/research-center">Research Center</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">EDUCATIONAL EXAMPLE</div><h1>${displayTitle}</h1><p class="hero-sub">This fictional scenario demonstrates how to reconcile an auto-financing agreement. It is a teaching example—not a real customer document, market benchmark, legal conclusion, or promised savings result.</p><div class="hero-buttons"><a href="#scenario-review" class="primary-btn">Review the Example &darr;</a><a href="/hidden-dealership-financing-fees" class="secondary-btn">Read the Dealer-Financing Guide</a></div><div class="hero-trust"><span>Fictional inputs are labeled</span><span>Questions replace conclusions</span><span>Primary sources linked</span><span>Human verification required</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h3>Direct answer: what does this example teach?</h3><p>It shows how a buyer can compare the written vehicle price, financing terms, add-ons, and total cost line by line. It does not show what a typical dealership charges, prove that a fee is improper, or predict what an AI review will find in a real contract.</p><p><strong>Scenario boundary:</strong> every number and document detail below is invented for education. Use the workflow and questions, not the values, when reviewing your own paperwork.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2 id="scenario-review">Illustrative scenario</h2><p>A fictional buyer receives a retail installment contract from a dealership. The example uses a vehicle price of <strong>$28,000</strong>, a <strong>$5,000</strong> down payment, an illustrative amount financed of <strong>$23,000</strong>, a hypothetical APR of <strong>8.9%</strong>, and a <strong>60-month</strong> term. These inputs are intentionally invented to demonstrate reconciliation; they are not a typical offer or a statement about any lender or dealer.</p><div class="leverage-section"><h3>What to reconcile in the paperwork</h3><ul><li>Vehicle price and written out-the-door total</li><li>APR, number of payments, amount financed, finance charge, and total of payments</li><li>Down payment, trade-in value, payoff balance, and any amount carried into the loan</li><li>Documentation, processing, tax, registration, and other disclosed charges</li><li>Every optional product, its price, coverage, exclusions, and cancellation terms</li></ul></div><div class="leverage-section"><h3>Questions raised by the example</h3><p>Does the APR match the written offer? Did the buyer agree to each add-on? Is the documentation fee disclosed and explained? Does the amount financed reconcile with the price, down payment, trade, fees, and products? Does the total of payments match the disclosed finance terms?</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>How to review a real auto-financing agreement</h2><div class="leverage-section"><h3>1. Get all pages before signing</h3><p>Request the buyer’s order, financing agreement, disclosures, add-on contracts, and any written quote. Keep the version that shows the prices and products you actually discussed.</p></div><div class="leverage-section"><h3>2. Establish a comparison point</h3><p>Compare the dealer offer with a written preapproval or quote from a bank, credit union, or other lender when possible. Use the same term, amount financed, and product assumptions.</p></div><div class="leverage-section"><h3>3. Match every number</h3><p>Reconcile vehicle price, fees, taxes, down payment, trade-in, payoff, add-ons, APR, term, amount financed, finance charge, and total of payments. Mark any unexplained difference.</p></div><div class="leverage-section"><h3>4. Ask for written answers</h3><p>Ask whether each product is optional, what it costs, what it covers, whether it can be canceled, and why any rate or fee differs from the earlier quote. Do not rely on a payment-only explanation.</p></div><div class="leverage-section"><h3>5. Keep the final records</h3><p>Save the signed agreement, itemized price, disclosures, product terms, and correspondence. These records are the evidence for any later question or dispute.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Official guidance</h2><p>The <a href="https://consumer.ftc.gov/consumer-alerts/2024/08/car-dealerships-cant-charge-you-add-ons-you-dont-want" rel="noopener noreferrer">FTC guidance on unwanted dealer add-ons</a> advises buyers to read the sales and financing contracts, confirm the terms match what they agreed to, and shop around for financing. The FTC’s <a href="https://consumer.ftc.gov/articles/financing-or-leasing-car" rel="noopener noreferrer">financing and leasing guide</a> recommends comparing written offers and total cost.</p><p>The <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-dealer-arranged-and-bank-financing-en-759/" rel="noopener noreferrer">CFPB explanation of dealer-arranged and bank financing</a> describes the financing paths, and its <a href="https://www.consumerfinance.gov/ask-cfpb/what-things-can-i-negotiate-when-shopping-for-a-car-or-auto-loan-en-2132/" rel="noopener noreferrer">auto-loan negotiation guidance</a> recommends comparing lenders and considering which terms may be negotiable. These sources provide context; they do not validate this fictional scenario or decide a real contract.</p><p>AI-assisted review may help organize a real document and surface mismatches for verification. It cannot turn a hypothetical example into evidence, determine legality, or guarantee a negotiation result.</p><h2>Frequently Asked Questions</h2><div class="leverage-section"><h3>Is this auto-financing example a real customer document?</h3><p>No. It is a fictional educational scenario. Every number and document detail is illustrative and should not be treated as a market benchmark, legal conclusion, customer result, or prediction.</p></div><div class="leverage-section"><h3>What should a buyer compare in an auto-financing agreement?</h3><p>Compare the vehicle price, out-the-door total, APR, loan term, amount financed, finance charge, total of payments, down payment, trade-in or payoff amounts, taxes, fees, and every optional product.</p></div><div class="leverage-section"><h3>Are the add-ons in this example required?</h3><p>No conclusion can be drawn from a hypothetical example. In a real transaction, ask whether each product is optional, what it costs, what it covers, and whether the final contract matches what you agreed to.</p></div><div class="leverage-section"><h3>How can a buyer compare dealer-arranged financing?</h3><p>Get the written dealer offer and compare it with a preapproval or quote from a bank, credit union, or other lender using the same APR, term, amount financed, and product assumptions.</p></div><div class="leverage-section"><h3>Does a difference between two APRs prove an improper markup?</h3><p>No. A difference may have multiple explanations, including lender terms, credit factors, products, or negotiation. Compare the written disclosures and ask the lender or dealer to explain the terms.</p></div><div class="leverage-section"><h3>Can AI determine whether an auto-financing charge is illegal?</h3><p>No. AI-assisted review may organize documents and flag a mismatch or unclear add-on, but it cannot establish legality, fair value, or a successful negotiation from a hypothetical or real document alone.</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource is a fictional educational example and general document-review information. It is not legal, financial, accounting, tax, or automotive advice.</div></div></section><section class="section"><div class="container"><h2>Need help organizing a real financing review?</h2><p>HiddenFeeAI is the related document-analysis product. Check its current first-party product, privacy, and retention details before uploading vehicle paperwork.</p><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="auto_financing_review" data-cta-position="end" data-cta-variant="contextual">Review My Financing Agreement</a></div></section><section class="section"><div class="container"><h2>Continue the research</h2><div class="related-grid"><a class="related-link" href="/hidden-dealership-financing-fees">Hidden Dealership Financing Fees</a><a class="related-link" href="/car-dealer-fees">Car Dealer Fees Hub</a><a class="related-link" href="/car-buying-checklist-before-signing">Car Buying Checklist</a><a class="related-link" href="/research-center">Research Center</a><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/editorial-policy">Editorial Policy</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
normalizeIllustrativeInputs();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated auto-financing example with fictional-scenario labeling, official sources, contextual CTA, and FAQs.');
