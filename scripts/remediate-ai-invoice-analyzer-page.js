const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-invoice-analyzer.html');
let source = fs.readFileSync(file, 'utf8');

function removeSoftwareApplicationSchema() {
  const blocks = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const match of blocks) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (parsed && parsed['@type'] === 'SoftwareApplication') source = source.replace(match[0], '');
    } catch {
      // The page validators report malformed JSON-LD separately.
    }
  }
}

function normalizeVisibleFaqs() {
  source = source.replace('Can it tell me whether a price is fair?', 'Can an AI invoice analyzer tell me whether a price is fair?');
  source = source.replace('What should I do with an unfamiliar charge?', 'What should I do when an invoice contains an unfamiliar charge?');
  if (!source.includes('<h3>What should I compare an invoice with?</h3>')) {
    const marker = '<div class="leverage-section"><h3>Is an AI invoice analyzer accurate for every invoice?</h3>';
    const compareFaq = '<div class="leverage-section"><h3>What should I compare an invoice with?</h3><p>When available, compare it with the quote, purchase order, contract, receipt, delivery record, prior statement, payment history, and any approved change order. Keep the original files and note the exact line or fee that needs clarification.</p></div>';
    source = source.replace(marker, compareFaq + marker);
  }
}

if (source.includes('An AI invoice analyzer can help organize an invoice')) {
  removeSoftwareApplicationSchema();
  normalizeVisibleFaqs();
  source = source.replaceAll('Document Intelligence Center', 'AI Analysis Hub');
  source = source.replaceAll('/before-signing-a-contract', '/before-signing-contract-checklist');
  source = source.replaceAll('"datePublished":"2026-08-08"', '"datePublished":"2026-07-19"');
  source = source.replace(/<span class="price">\$15<\/span>/g, '');
  source = source.replace(/<a href="https:\/\/hiddenfeeai\.com" class="sticky-btn"(?![^>]*data-cta-action)/, '<a href="https://hiddenfeeai.com" class="sticky-btn" data-cta-action="bill_analysis" data-cta-position="sticky" data-cta-variant="sticky"');
  fs.writeFileSync(file, source, 'utf8');
  console.log('The invoice analyzer page is already remediated; normalized schema, hub label, and sticky CTA metadata.');
  process.exit(0);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

const title = 'AI Invoice Analyzer: Review Fees, Charges, and Billing Errors | DetectHiddenFees';
const displayTitle = 'AI Invoice Analyzer: Review Fees, Charges, and Billing Errors';
const description = 'Learn how AI invoice analysis can organize line items, compare an invoice with related records, and surface charges or questions that need verification.';
const updated = '2026-08-08';

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
replaceOnce('description metadata', /<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
replaceOnce('Open Graph type', /<meta property="og:type" content="[^"]*"\s*\/?\s*>/, '<meta property="og:type" content="article">');
replaceOnce('Twitter title', /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
replaceOnce('Twitter description', /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const faq = [
  ['What is an AI invoice analyzer?', 'It is an AI-assisted workflow that may extract and organize invoice details, group line items, and surface possible discrepancies or questions for review. The exact output depends on the document and product.'],
  ['Can AI find duplicate invoice charges?', 'It may identify repeated descriptions, quantities, dates, or amounts that look duplicated. The apparent duplicate should be compared with the purchase order, delivery record, contract, or issuer explanation before you request a correction.'],
  ['Can an AI invoice analyzer tell me whether a price is fair?', 'Not from an invoice alone. A fair-price assessment may require the scope of work, quantity, location, market conditions, contract terms, taxes, and other records that may not appear on the invoice.'],
  ['What should I compare an invoice with?', 'When available, compare it with the quote, purchase order, contract, receipt, delivery record, prior statement, payment history, and any approved change order. Keep the original files and note the exact line or fee that needs clarification.'],
  ['Is an AI invoice analyzer accurate for every invoice?', 'No universal accuracy rate applies to every document or use case. Scan quality, layout, handwriting, context, ambiguous descriptions, and information outside the invoice can affect results. Verify important findings against the source.'],
  ['What should I do when an invoice contains an unfamiliar charge?', 'Pause before paying the disputed amount when appropriate, preserve the supporting records, ask the issuer for an itemized explanation, and use the relevant account or dispute process. Rules differ by transaction type and jurisdiction.']
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
    datePublished: '2026-07-19',
    dateModified: updated,
    '@id': 'https://detecthiddenfees.com/ai-invoice-analyzer#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/ai-invoice-analyzer#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bills & Documents', item: 'https://detecthiddenfees.com/ai-analysis-hub' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/ai-invoice-analyzer' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/ai-invoice-analyzer',
    inLanguage: 'en-US',
    datePublished: '2026-07-19',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'AI-assisted invoice analysis' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/ai-invoice-analyzer#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-analysis-hub">Bills &amp; Documents</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">AI INVOICE ANALYZER</div><h1>${displayTitle}</h1><p class="hero-sub">An AI invoice analyzer can help organize an invoice, extract line items, and surface possible duplicates, unexplained fees, or differences from a quote or contract. A flagged item is a prompt to verify—not proof that a charge is wrong.</p><div class="hero-buttons"><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="bill_analysis" data-cta-position="hero" data-cta-variant="primary">Analyze My Invoice →</a><a href="/ai-analysis-hub" class="secondary-btn">Explore Bills &amp; Documents</a></div><div class="hero-trust"><span>Organize invoice details</span><span>Compare related records</span><span>Flag questions for review</span><span>Human verification remains necessary</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h3>What should an AI invoice analyzer check?</h3><p>Start with the information an invoice actually contains: dates, vendors, descriptions, quantities, subtotals, taxes, fees, credits, payments, and the final amount. Then compare those details with the agreement or record that authorized the work.</p><p><strong>Useful questions include:</strong> Does the invoice match the approved scope? Is a fee clearly described? Does a line appear repeated? Was the product or service delivered? Do the total, credits, and payments reconcile?</p><a href="https://hiddenfeeai.com" class="primary-btn" style="padding:18px 36px;font-size:1rem;" data-cta-action="bill_analysis" data-cta-position="content" data-cta-variant="content-primary">Analyze My Invoice</a></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>How to review an invoice with AI</h2><p>An invoice review should connect the billed amount to the underlying transaction. An AI tool may extract text and amounts, group related entries, and surface language that deserves attention. It cannot see an agreement, delivery record, or conversation that was not provided.</p><p>For a useful first pass, preserve the original invoice and gather the related quote, contract, purchase order, receipt, delivery record, prior statement, or approved change order. Compare the invoice line by line, then record the exact description, amount, date, or clause that needs an explanation.</p><p>Potential review questions include duplicate-looking entries, charges for items not ordered or delivered, unexplained administrative or processing fees, changes from an agreed amount, missing credits, and totals that do not reconcile. A potential discrepancy is not the same as proof of an error; the issuer or relevant account records must confirm what happened.</p><p>Do not use an invoice-only review to declare that a price is fair, a fee is unlawful, or a dispute will succeed. Those conclusions can depend on contract language, jurisdiction, account type, taxes, market conditions, and facts outside the document.</p></div></section><section class="section" style="padding-top:10px;"><div class="container"><div class="leverage-section"><h3>What to do with a flagged charge</h3><p>Keep the original invoice and related records. Ask the issuer for an itemized explanation, cite the exact line or fee, and request a corrected invoice or credit when the records support it. If the charge involves a card, phone account, medical bill, or another regulated context, follow the applicable dispute instructions and deadlines.</p><p>For a structured first pass, review current HiddenFeeAI product terms before uploading a document. Verify important results against the source and obtain qualified advice when the financial, legal, tax, medical, or business consequences are significant.</p><a href="https://hiddenfeeai.com" class="primary-btn" style="padding:18px 36px;font-size:1rem;" data-cta-action="bill_analysis" data-cta-position="content" data-cta-variant="content-secondary">Review This Invoice</a></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Sources and review boundaries</h2><p>The <a href="https://consumer.ftc.gov/consumer-alerts/2026/05/run-small-business-pay-your-bills-not-scammers" rel="noopener noreferrer">Federal Trade Commission guidance for small businesses</a> recommends checking unfamiliar invoices against the vendors and purchases a business actually recognizes. The <a href="https://www.consumerfinance.gov/consumer-tools/credit-cards/how-to-fix-mistakes-in-your-credit-card-bill/" rel="noopener noreferrer">Consumer Financial Protection Bureau guidance</a> explains a credit-card billing-error review process; that process is specific to covered credit-card disputes and is not a universal invoice rule.</p><p>The <a href="https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions" rel="noopener noreferrer">FTC fee-disclosure guidance</a> addresses particular consumer transactions and required or unavoidable fees. The <a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10" rel="noopener noreferrer">NIST AI Risk Management Framework</a> provides voluntary guidance for managing AI risks and documenting human oversight. These sources inform the review framework; they do not certify a product, determine whether a specific invoice is correct, or provide legal advice.</p><h2>Frequently Asked Questions</h2><div class="leverage-section"><h3>What is an AI invoice analyzer?</h3><p>It is an AI-assisted workflow that may extract and organize invoice details, group line items, and surface possible discrepancies or questions for review. The exact output depends on the document and product.</p></div><div class="leverage-section"><h3>Can AI find duplicate invoice charges?</h3><p>It may identify repeated descriptions, quantities, dates, or amounts that look duplicated. Compare the apparent duplicate with the purchase order, delivery record, contract, or issuer explanation before requesting a correction.</p></div><div class="leverage-section"><h3>Can it tell me whether a price is fair?</h3><p>Not from an invoice alone. A fair-price assessment may require scope, quantity, location, market conditions, contract terms, taxes, and other records that may not appear on the invoice.</p></div><div class="leverage-section"><h3>Is an AI invoice analyzer accurate for every invoice?</h3><p>No universal accuracy rate applies to every document or use case. Scan quality, layout, handwriting, context, ambiguous descriptions, and information outside the invoice can affect results. Verify important findings against the source.</p></div><div class="leverage-section"><h3>What should I do with an unfamiliar charge?</h3><p>Preserve the supporting records, ask the issuer for an itemized explanation, and use the relevant account or dispute process. Rules differ by transaction type and jurisdiction.</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource provides educational information about AI-assisted invoice review. It is not accounting, legal, tax, financial, medical, or business advice.</div></div></section><section class="section"><div class="container"><h2>Related invoice and fee resources</h2><div class="related-grid"><a class="related-link" href="/ai-bill-analyzer">AI Bill Analyzer</a><a class="related-link" href="/ai-invoice-checker">AI Invoice Checker</a><a class="related-link" href="/hidden-fee-examples">Hidden Fee Examples</a><a class="related-link" href="/before-signing-a-contract">Before Signing a Contract</a><a class="related-link" href="/ai-analysis-hub">AI Analysis Hub</a></div></div></section><section class="section"><div class="container"><div class="cta-block"><h2>Review Your Invoice</h2><p>Use a structured first pass to identify invoice details and questions that deserve closer attention. Verify important findings against the original records.</p><a href="https://hiddenfeeai.com" class="cta-btn" data-cta-action="bill_analysis" data-cta-position="end" data-cta-variant="end">Analyze My Invoice →</a><div class="cta-reassurance">Review current pricing, privacy, and product limitations before upload.</div></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
source = source.replace(/>July 2026</g, '>August 8, 2026<');
source = source.replaceAll('Document Intelligence Center', 'AI Analysis Hub');
source = source.replaceAll('/before-signing-a-contract', '/before-signing-contract-checklist');
source = source.replace(/<a href="https:\/\/hiddenfeeai\.com" class="sticky-btn">Analyze My Invoice<\/a>/, '<a href="https://hiddenfeeai.com" class="sticky-btn" data-cta-action="bill_analysis" data-cta-position="sticky" data-cta-variant="sticky">Analyze My Invoice</a>');
source = source.replace(/<span class="price">\$15<\/span>/g, '');
normalizeVisibleFaqs();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated AI invoice analyzer page with evidence-safe guidance, sources, FAQs, and contextual CTAs.');
