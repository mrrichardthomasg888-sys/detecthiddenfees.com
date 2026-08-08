const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-fee-detector.html');
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

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace('</head>', `${replacement}</head>`);
}

const title = 'Hidden Fee Detector: How AI-Assisted Document Review Works | DetectHiddenFees';
const displayTitle = 'Hidden Fee Detector: How AI-Assisted Document Review Works';
const description = 'Learn what an AI-assisted hidden fee detector can flag in contracts, bills, invoices, and estimates, what evidence it needs, and what still requires human verification.';
const updated = '2026-08-08';

const faq = [
  ['What is a hidden fee detector?', 'A hidden fee detector is a document-review workflow that helps locate fee-related language, recurring charges, optional products, renewal terms, and other amounts that deserve verification. AI may assist with organization and flagging; it does not establish a legal violation or fair price by itself.'],
  ['How can AI-assisted review help with fees?', 'It can help extract relevant passages, group fee terminology, compare amounts within the same document, and generate questions for a human to check against the quote, contract, bill, or account disclosures.'],
  ['Can an AI detector find every hidden fee?', 'No. Results depend on document quality, context, scope, and the review system. A detector may miss text, misunderstand an exception, or flag a legitimate charge, so the original document and surrounding terms must be checked.'],
  ['What documents can I review?', 'Contracts, bills, invoices, estimates, leases, and subscription terms can contain fee language. The right review method depends on the document type, and sensitive records should only be uploaded after checking the product’s current privacy and retention terms.'],
  ['Can a detector prove that a fee is illegal or excessive?', 'No. A document can show what a fee says, when it applies, and how it affects the stated total. Legality, fair value, and dispute outcomes may require jurisdiction-specific rules, additional records, and qualified professional review.'],
  ['What should I do after a fee is flagged?', 'Locate the exact passage, compare it with the advertised or agreed total, check whether it is required or optional, ask the provider for a written explanation, and preserve the supporting documents before deciding how to respond.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

if (source.includes('An AI-assisted hidden fee detector can help locate fee-related language')) {
  removeStickyProductBar();
  normalizeResearchFooter();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The hidden fee detector guide is already remediated; normalized the research footer and sticky bar.');
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
    datePublished: '2026-07-20',
    dateModified: updated,
    articleSection: 'AI document analysis',
    about: { '@type': 'Thing', name: 'AI-assisted hidden fee document review' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-detector#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/hidden-fee-detector#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-fee-detector' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-fee-detector',
    inLanguage: 'en-US',
    datePublished: '2026-07-20',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'AI-assisted hidden fee document review' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-fee-detector#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">HIDDEN FEE DETECTOR</div><h1>${displayTitle}</h1><p class="hero-sub">An AI-assisted hidden fee detector can help locate fee-related language in contracts, bills, invoices, estimates, leases, and subscription terms. It can organize a review and surface questions; it cannot prove that a charge is hidden, unlawful, excessive, or missing from a document.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-trust"><span>Evidence-first review</span><span>Document context matters</span><span>Human verification required</span><span>Product details can change</span></div></div></section><section class="section" style="padding-top:10px"><div class="container"><h2>Direct answer: what can a hidden fee detector do?</h2><p>It can help a reader find fee names, recurring charges, renewal language, optional products, termination terms, vague line items, and mismatches within a document. The useful output is a set of passages and questions to verify against the source records.</p><p><strong>It cannot</strong> guarantee that every fee was found, determine fair market value from text alone, decide whether a charge violates a law, inspect workmanship, or guarantee a dispute or negotiation result.</p><div class="hero-trust"><span>Flagged text is not a legal conclusion</span><span>Amounts need source verification</span><span>Original documents remain important</span></div></div></section><section class="section"><div class="container"><h2>What to look for in a document</h2><div class="faq-section"><details open><summary>Fee terminology and definitions</summary><div class="faq-answer"><p>Search for processing, administrative, service, documentation, compliance, recovery, maintenance, convenience, delivery, disposal, or other charges. Read the definition and nearby exceptions rather than treating a label as proof of wrongdoing.</p></div></details><details><summary>Recurring charges and renewal terms</summary><div class="faq-answer"><p>Record how often a charge applies, when it begins, how the price can change, what notice is required, and how cancellation or non-renewal works.</p></div></details><details><summary>Required, optional, and conditional amounts</summary><div class="faq-answer"><p>Separate amounts that apply to everyone from optional products and charges triggered by a choice, late payment, damage, service use, or another later event.</p></div></details><details><summary>Totals and reconciliation</summary><div class="faq-answer"><p>Compare the advertised, quoted, invoiced, and final amounts. Check whether taxes, delivery, permits, financing, add-ons, credits, and prior balances are included or excluded.</p></div></details></div></div></section><section class="section"><div class="container"><h2>How to use AI-assisted review responsibly</h2><div class="faq-section"><details open><summary>1. Preserve the original document</summary><div class="faq-answer"><p>Keep the complete contract, bill, invoice, estimate, statement, or terms page, including attachments and later notices. A cropped excerpt can hide an exception or definition.</p></div></details><details><summary>2. Ask for passages, not just labels</summary><div class="faq-answer"><p>For every flagged fee, locate the exact page or line, the amount, the trigger, the affected service, and any definition or cross-reference.</p></div></details><details><summary>3. Compare the same transaction</summary><div class="faq-answer"><p>Use the quote, order, disclosure, invoice, account terms, or other records that describe the same transaction. Do not use an unrelated market example as proof of fair value.</p></div></details><details><summary>4. Get written clarification</summary><div class="faq-answer"><p>Ask the provider what the charge covers, whether it is required or optional, when it applies, and how it can be canceled or disputed. Save the response.</p></div></details><details><summary>5. Escalate when the stakes require it</summary><div class="faq-answer"><p>Consider the relevant regulator, consumer-protection office, attorney, accountant, medical-billing advocate, or other qualified professional for material or disputed matters.</p></div></details></div></div></section><section class="section"><div class="container"><h2>Evidence and limitations</h2><p>The <a href="https://www.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions" rel="noopener noreferrer">FTC fee-rule FAQ</a> distinguishes mandatory, optional, government, shipping, and later-incurred charges within the rule's scope. The <a href="https://www.consumerfinance.gov/rules-policy/junk-fees/" rel="noopener noreferrer">CFPB junk-fee resource</a> provides agency context about fees charged by banks and financial companies. The <a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10" rel="noopener noreferrer">NIST AI Risk Management Framework</a> provides general voluntary guidance for managing AI risks; it is not certification of HiddenFeeAI or any detector.</p><p>These sources do not establish that a specific charge is illegal or that an AI system will produce a particular result. Product capabilities, pricing, privacy, retention, supported formats, and processing behavior must be confirmed from the current first-party product information before uploading sensitive records.</p><h2 id="faq">Frequently asked questions</h2><div class="faq-section"><details><summary>What is a hidden fee detector?</summary><div class="faq-answer"><p>A hidden fee detector is a document-review workflow that helps locate fee-related language, recurring charges, optional products, renewal terms, and other amounts that deserve verification. AI may assist with organization and flagging; it does not establish a legal violation or fair price by itself.</p></div></details><details><summary>How can AI-assisted review help with fees?</summary><div class="faq-answer"><p>It can help extract relevant passages, group fee terminology, compare amounts within the same document, and generate questions for a human to check against the quote, contract, bill, or account disclosures.</p></div></details><details><summary>Can an AI detector find every hidden fee?</summary><div class="faq-answer"><p>No. Results depend on document quality, context, scope, and the review system. A detector may miss text, misunderstand an exception, or flag a legitimate charge, so the original document and surrounding terms must be checked.</p></div></details><details><summary>What documents can I review?</summary><div class="faq-answer"><p>Contracts, bills, invoices, estimates, leases, and subscription terms can contain fee language. The right review method depends on the document type, and sensitive records should only be uploaded after checking the product's current privacy and retention terms.</p></div></details><details><summary>Can a detector prove that a fee is illegal or excessive?</summary><div class="faq-answer"><p>No. A document can show what a fee says, when it applies, and how it affects the stated total. Legality, fair value, and dispute outcomes may require jurisdiction-specific rules, additional records, and qualified professional review.</p></div></details><details><summary>What should I do after a fee is flagged?</summary><div class="faq-answer"><p>Locate the exact passage, compare it with the advertised or agreed total, check whether it is required or optional, ask the provider for a written explanation, and preserve the supporting documents before deciding how to respond.</p></div></details></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource is educational information, not legal, financial, medical, accounting, or professional advice.</div></div></section><section class="section"><div class="container"><h2>Ready to review a document?</h2><p>HiddenFeeAI is the related document-analysis product. Confirm its current first-party product, privacy, and retention details before uploading a document.</p><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Document for Fees</a></div></section><section class="section" style="padding-top:0"><div class="container"><h2>Continue learning</h2><div class="hero-trust"><a href="/ai-document-analysis-tools">Compare AI Document Analysis Tools</a><a href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a><a href="/hidden-fee-examples">Hidden Fee Examples</a><a href="/ai-analysis-methodology">AI Analysis Methodology</a><a href="/research-center">Research Center</a><a href="/editorial-policy">Editorial Policy</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated hidden fee detector guide with evidence-safe product framing, official sources, contextual CTA, and FAQs.');
