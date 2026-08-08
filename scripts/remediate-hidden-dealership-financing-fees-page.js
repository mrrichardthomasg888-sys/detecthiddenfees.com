const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-dealership-financing-fees.html');
let source = fs.readFileSync(file, 'utf8');

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const scriptStart = source.indexOf('<script>', stickyStart);
  if (scriptStart < 0) throw new Error('Could not locate the script after the sticky CTA bar');
  source = source.slice(0, stickyStart) + source.slice(scriptStart);
}

function normalizeResearchFooter() {
  source = source.replaceAll('Document Intelligence Center', 'AI Analysis Hub');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*hidden fees in agreements<\/span>/, '<a href="/hidden-contract-fees" style="color:#93c5fd;font-weight:600;">Hidden fees in agreements</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*detect billing errors<\/span>/, '<a href="/ai-bill-analyzer" style="color:#93c5fd;font-weight:600;">Detect billing errors</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*find hidden costs<\/span>/, '<a href="/hidden-fee-examples" style="color:#93c5fd;font-weight:600;">Find hidden costs</a>');
  source = source.replace(/>July 2026</g, '>August 8, 2026<');
}

if (source.includes('Dealer-arranged financing can combine vehicle price, finance charge, optional products, and other fees')) {
  removeStickyProductBar();
  normalizeResearchFooter();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The dealership-financing page is already remediated; normalized the sticky product bar and research footer links.');
  process.exit(0);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

const title = 'Hidden Dealership Financing Fees: APR, Add-Ons, and Total Cost | DetectHiddenFees';
const displayTitle = 'Hidden Dealership Financing Fees: APR, Add-Ons, and Total Cost';
const description = 'Learn how to review dealer financing for APR, add-ons, documentation charges, amount financed, and total cost before signing vehicle paperwork.';
const updated = '2026-08-08';

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
replaceOnce('description metadata', /<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
replaceOnce('Twitter title', /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
replaceOnce('Twitter description', /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const faq = [
  ['What are hidden dealership financing fees?', 'They are charges, financing terms, or optional products that are unclear, omitted from an earlier quote, presented as required without a valid basis, or different from what the buyer agreed to. A charge is not automatically improper just because it appears on a vehicle contract.'],
  ['Are dealership add-ons required?', 'Products such as service contracts, GAP coverage, VIN etching, and protection products are generally optional products, but the agreement and applicable law control the transaction. Ask for each product, price, and cancellation term in writing and remove anything you did not agree to.'],
  ['How should I compare dealer financing with a bank or credit union?', 'Compare the APR, loan term, amount financed, finance charge, total of payments, required down payment, and add-ons. A written preapproval can give you a comparison point before you discuss dealer-arranged financing.'],
  ['Can a dealer charge a documentation fee?', 'A documentation or processing fee may be permitted or regulated differently depending on the jurisdiction and transaction. Ask what it covers, whether it is disclosed consistently, and how it affects the out-the-door price. This page does not determine whether a particular fee is lawful.'],
  ['What is GAP coverage in an auto loan?', 'GAP coverage is an optional product intended to address a difference between an amount owed and a vehicle’s value after a covered total loss. Compare its price, exclusions, cancellation terms, and alternatives before financing it.'],
  ['Can AI determine whether a dealer fee is illegal or overpriced?', 'No. AI-assisted review may organize the buyer’s order and financing documents and flag mismatches or unclear charges, but it cannot establish legality, fair market value, or a successful negotiation from the paperwork alone. Verify the source documents and seek qualified advice when appropriate.']
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
    datePublished: '2026-07-17',
    dateModified: updated,
    '@id': 'https://detecthiddenfees.com/hidden-dealership-financing-fees#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/hidden-dealership-financing-fees#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hidden Fee Industry Guide', item: 'https://detecthiddenfees.com/hidden-fee-industry-guide' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-dealership-financing-fees' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-dealership-financing-fees',
    inLanguage: 'en-US',
    datePublished: '2026-07-21',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Dealership financing fees, auto-loan add-ons, and total cost' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-dealership-financing-fees#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/hidden-fee-industry-guide">Hidden Fee Industry Guide</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">AUTO FINANCING ANALYSIS</div><h1>${displayTitle}</h1><p class="hero-sub">Dealer-arranged financing can combine vehicle price, finance charge, optional products, and other fees. Review the written terms and compare total cost rather than relying on the monthly payment alone.</p><div class="hero-buttons"><a href="#financing-review" class="primary-btn">Review Financing Terms &darr;</a><a href="/hidden-fee-industry-guide" class="secondary-btn">Explore Auto Fee Guides</a></div><div class="hero-trust"><span>Total cost over monthly payment</span><span>Add-ons listed separately</span><span>Preapproval is a comparison point</span><span>Human verification required</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h3>Direct answer: what should buyers check for hidden financing fees?</h3><p>Check every amount and term that changes what you pay: the out-the-door price, APR, loan term, amount financed, finance charge, total of payments, documentation or processing fees, optional add-ons, trade-in or negative-equity amounts, and taxes or registration charges. Compare those terms with the written quote and any outside financing offer.</p><p><strong>Important boundary:</strong> a charge is not automatically hidden or improper because it appears on a vehicle contract. The buyer’s written agreement, disclosures, jurisdiction, and facts determine what the charge means and what remedies may exist.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Financing terms to compare</h2><div class="leverage-section"><h3>Out-the-door price</h3><p>Ask for the total price in writing, including vehicle price, dealer charges, taxes, registration, and agreed add-ons. Comparing only a monthly payment can hide a longer term, a larger amount financed, or products added to the contract.</p></div><div class="leverage-section"><h3>APR, term, and amount financed</h3><p>Compare the annual percentage rate, number of payments, amount financed, finance charge, and total of payments. A lower monthly payment is not necessarily a lower total cost if the term or amount financed changes.</p></div><div class="leverage-section"><h3>Add-ons and optional products</h3><p>Common examples include GAP coverage, service contracts, warranties, VIN etching, rustproofing, paint or fabric protection, and prepaid maintenance. Ask what each product covers, its price, exclusions, cancellation terms, and whether you agreed to it.</p></div><div class="leverage-section"><h3>Trade-in and negative equity</h3><p>Separate the vehicle price, trade value, payoff amount, and any balance carried into the new loan. Ask the dealer to show how each number affects the amount financed instead of relying on a payment quote.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2 id="financing-review">A step-by-step dealership financing review</h2><div class="leverage-section"><h3>1. Get the written offer</h3><p>Request the buyer’s order, financing offer, and every disclosure before signing. Keep the version that shows the prices and products you actually discussed.</p></div><div class="leverage-section"><h3>2. Establish a comparison point</h3><p>Shop a bank, credit union, or other lender before visiting the finance office when possible. Record the APR, term, amount available, and conditions so the dealer offer can be compared on the same terms.</p></div><div class="leverage-section"><h3>3. Reconcile every line</h3><p>Match the vehicle price, fees, taxes, down payment, trade-in, payoff, add-ons, APR, term, amount financed, finance charge, and total of payments across the documents. Mark any unexplained change.</p></div><div class="leverage-section"><h3>4. Ask whether each add-on is wanted</h3><p>Do not assume an optional product is required. Ask for its standalone price and terms, and have unwanted products removed before signing. Confirm that the final contract matches the price you agreed to.</p></div><div class="leverage-section"><h3>5. Save the final records</h3><p>Keep the signed contract, disclosures, itemized price, product terms, and correspondence. Those records are more useful than a verbal promise if a later question arises.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Official guidance and source hierarchy</h2><p>The <a href="https://consumer.ftc.gov/consumer-alerts/2024/08/car-dealerships-cant-charge-you-add-ons-you-dont-want" rel="noopener noreferrer">FTC consumer alert about unwanted dealer add-ons</a> advises buyers to read the sales and financing contracts, confirm that terms match what they agreed to, and shop around for financing. The FTC’s <a href="https://consumer.ftc.gov/articles/financing-or-leasing-car" rel="noopener noreferrer">financing or leasing guidance</a> recommends comparing written offers, APR, term, and total cost rather than focusing only on payment size.</p><p>The <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-dealer-arranged-and-bank-financing-en-759/" rel="noopener noreferrer">CFPB explanation of dealer-arranged and bank financing</a> describes the different financing paths, while its <a href="https://www.consumerfinance.gov/ask-cfpb/what-things-can-i-negotiate-when-shopping-for-a-car-or-auto-loan-en-2132/" rel="noopener noreferrer">auto-loan negotiation guidance</a> recommends comparing lenders and considering which terms may be negotiable. These sources are educational context, not a determination about a particular contract or dealer.</p><p>For AI-assisted review, treat a flagged fee, add-on, or mismatch as a question to verify against the original buyer’s order and financing agreement. Product privacy, retention, and current capabilities should be confirmed through current first-party materials before uploading any financial document.</p><h2>Frequently Asked Questions</h2><div class="leverage-section"><h3>What are hidden dealership financing fees?</h3><p>They are charges, financing terms, or optional products that are unclear, omitted from an earlier quote, presented as required without a valid basis, or different from what the buyer agreed to. A charge is not automatically improper just because it appears on a vehicle contract.</p></div><div class="leverage-section"><h3>Are dealership add-ons required?</h3><p>Products such as service contracts, GAP coverage, VIN etching, and protection products are generally optional products, but the agreement and applicable law control the transaction. Ask for each product, price, and cancellation term in writing and remove anything you did not agree to.</p></div><div class="leverage-section"><h3>How should I compare dealer financing with a bank or credit union?</h3><p>Compare the APR, loan term, amount financed, finance charge, total of payments, required down payment, and add-ons. A written preapproval can give you a comparison point before you discuss dealer-arranged financing.</p></div><div class="leverage-section"><h3>Can a dealer charge a documentation fee?</h3><p>A documentation or processing fee may be permitted or regulated differently depending on the jurisdiction and transaction. Ask what it covers, whether it is disclosed consistently, and how it affects the out-the-door price. This page does not determine whether a particular fee is lawful.</p></div><div class="leverage-section"><h3>What is GAP coverage in an auto loan?</h3><p>GAP coverage is an optional product intended to address a difference between an amount owed and a vehicle’s value after a covered total loss. Compare its price, exclusions, cancellation terms, and alternatives before financing it.</p></div><div class="leverage-section"><h3>Can AI determine whether a dealer fee is illegal or overpriced?</h3><p>No. AI-assisted review may organize the buyer’s order and financing documents and flag mismatches or unclear charges, but it cannot establish legality, fair market value, or a successful negotiation from the paperwork alone. Verify the source documents and seek qualified advice when appropriate.</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource is educational information about vehicle financing, dealer add-ons, and document review. It is not legal, financial, accounting, tax, or automotive advice.</div></div></section><section class="section"><div class="container"><h2>Need help organizing a financing review?</h2><p>HiddenFeeAI is the related document-analysis product. Check its current first-party product, privacy, and retention details before uploading vehicle financing documents.</p><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="auto_financing_review" data-cta-position="end" data-cta-variant="contextual">Review My Financing Agreement</a></div></section><section class="section"><div class="container"><h2>Continue the research</h2><div class="related-grid"><a class="related-link" href="/hidden-fee-industry-guide">Auto Financing Guide</a><a class="related-link" href="/example-auto-financing">Illustrative Auto Financing Example</a><a class="related-link" href="/car-dealer-fees">Car Dealer Fees Hub</a><a class="related-link" href="/car-buying-checklist-before-signing">Car Buying Checklist</a><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/editorial-policy">Editorial Policy</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated dealership-financing fees with official FTC/CFPB guidance, a comparison workflow, contextual CTA, and FAQs.');
