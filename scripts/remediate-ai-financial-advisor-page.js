const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-financial-advisor.html');
let source = fs.readFileSync(file, 'utf8');

function removeSoftwareApplicationSchema() {
  const blocks = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const match of blocks) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (parsed && (parsed['@type'] === 'SoftwareApplication' || parsed['@type'] === 'HowTo' || parsed['@type'] === 'DefinedTerm')) source = source.replace(match[0], '');
    } catch {
      // The page validators report malformed JSON-LD separately.
    }
  }
}

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

if (source.includes('This guide separates automated investment advice from AI-assisted review')) {
  removeSoftwareApplicationSchema();
  removeStickyProductBar();
  normalizeResearchFooter();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The AI financial advisor page is already remediated; normalized schema, sticky product bar, and research footer links.');
  process.exit(0);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

const title = 'AI Financial Advisor: Document Analysis, Investment Advice, and Limits | DetectHiddenFees';
const displayTitle = 'AI Financial Advisor: Document Analysis, Investment Advice, and Limits';
const description = 'Understand the difference between AI document analysis and automated investment advice, what financial documents can reveal, and where human review remains essential.';
const updated = '2026-08-08';

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
replaceOnce('description metadata', /<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
replaceOnce('Twitter title', /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
replaceOnce('Twitter description', /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const faq = [
  ['What is an AI financial advisor?', 'The phrase can describe either an automated investment-advice program or a tool that reviews financial documents. Investor.gov uses robo-adviser for automated digital investment advisory programs, while document-analysis tools focus on records such as contracts, bills, invoices, and statements.'],
  ['Is an AI financial advisor the same as a robo-adviser?', 'No. A robo-adviser generally uses information about goals, time horizon, income, assets, and risk tolerance to create or manage an investment portfolio. Document analysis examines records for terms, charges, or questions and does not by itself manage investments.'],
  ['What can AI-assisted financial document analysis examine?', 'It can organize visible information such as fee names, amounts, dates, recurring terms, renewal language, line items, and related records. It may help surface questions for verification, but the result depends on the document, context, system, and review method.'],
  ['Can AI determine that a fee is illegal or that a price is unfair?', 'No. A document review can identify a possible discrepancy or clause for investigation, but legality, fairness, fraud, tax treatment, and dispute outcomes require the applicable facts, rules, and qualified judgment.'],
  ['What should a trustworthy AI financial tool disclose?', 'It should clearly identify its purpose, document types, evidence or source references, limitations, evaluation scope, privacy and retention practices, pricing, update date, and the role of human verification. A broad accuracy or savings claim without that context is not enough.'],
  ['Can AI replace a financial, legal, tax, or investment professional?', 'No. AI output can help organize questions and records, but it should not replace qualified advice when a decision affects investments, contracts, taxes, legal rights, medical bills, or a material financial obligation.']
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
    datePublished: '2026-07-20',
    dateModified: updated,
    '@id': 'https://detecthiddenfees.com/ai-financial-advisor#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/ai-financial-advisor#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Analysis Hub', item: 'https://detecthiddenfees.com/ai-analysis-hub' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/ai-financial-advisor' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/ai-financial-advisor',
    inLanguage: 'en-US',
    datePublished: '2026-07-20',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'AI financial document analysis and automated investment-advice distinctions' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/ai-financial-advisor#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-analysis-hub">AI Analysis Hub</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">AI FINANCIAL DOCUMENT ANALYSIS</div><h1>${displayTitle}</h1><p class="hero-sub">“AI financial advisor” can describe different tools. This guide separates automated investment advice from AI-assisted review of contracts, bills, invoices, estimates, and statements, and explains what the evidence can and cannot establish.</p><div class="hero-buttons"><a href="/ai-analysis-methodology" class="primary-btn">Read the Methodology &rarr;</a><a href="/ai-document-analysis-tools" class="secondary-btn">Compare Document Tools</a></div><div class="hero-trust"><span>Intent is clearly separated</span><span>Source-aware document review</span><span>No universal performance claim</span><span>Human verification required</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h3>Direct answer: what is an AI financial advisor?</h3><p>The phrase can refer to an automated investment-advice program or to a tool that analyzes financial documents. Investor.gov describes a robo-adviser as an automated digital investment advisory program that typically uses information about goals, time horizon, income, assets, and risk tolerance to create or manage a portfolio. A document-analysis tool instead reviews records for terms, charges, dates, or questions.</p><p><strong>DetectHiddenFees scope:</strong> this resource focuses on education and document-level fee intelligence. It does not present the page as portfolio management, asset allocation, or individualized investment advice. Confirm current product, privacy, retention, and regulatory details through first-party materials before using any related product.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Two different meanings of “AI financial advisor”</h2><div class="leverage-section"><h3>Automated investment advice</h3><p>A robo-adviser or other automated investment tool may collect information about a person’s goals, time horizon, assets, income, and risk tolerance and use it to recommend or manage an investment portfolio. Investor.gov explains that these services vary in features and approach. Questions about registration, conflicts, fees, and suitability belong with the relevant provider and qualified investment professionals.</p></div><div class="leverage-section"><h3>Financial document analysis</h3><p>A document-analysis tool examines records such as an invoice, contract, estimate, bank statement, or bill. It may organize visible charges and terms, identify passages that need attention, and help create questions for a human review. It does not automatically establish that a price is fair, a fee is unlawful, or a dispute will succeed.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>What document analysis can examine</h2><p>A careful review can organize fee names, line-item amounts, dates, recurring charges, renewal and cancellation language, payment milestones, allowances, exclusions, add-ons, taxes, credits, and related records when those items are visible and the supporting documents are available.</p><div class="leverage-section"><h3>Contracts and estimates</h3><p>Look for administrative charges, escalation language, automatic renewal, termination terms, change-order provisions, allowances, exclusions, and unclear responsibility for materials or labor.</p></div><div class="leverage-section"><h3>Invoices and bills</h3><p>Compare line items, quantities, dates, credits, taxes, recurring charges, duplicate descriptions, and the underlying quote or agreement. Official dispute processes may have their own deadlines and required notices.</p></div><div class="leverage-section"><h3>Statements and account records</h3><p>Reconcile posted charges, available balance, transaction dates, fees, transfers, and account disclosures. A statement alone may not show authorization, context, or the rule that applies.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>A source-first AI document-review workflow</h2><div class="leverage-section"><h3>1. Define the question</h3><p>State whether the goal is to locate a fee, compare a quote, understand a renewal term, reconcile an invoice, or prepare questions about a statement. A clear question makes the review easier to evaluate.</p></div><div class="leverage-section"><h3>2. Preserve the original evidence</h3><p>Keep the original document, related records, page or line references, dates, and source URLs. Do not rely on a summary when the original clause or amount can be inspected.</p></div><div class="leverage-section"><h3>3. Separate observation from inference</h3><p>Record what the document actually says, what appears inconsistent, and what remains unknown. A highlighted phrase is not the same as a legal conclusion, a pricing benchmark, or a savings result.</p></div><div class="leverage-section"><h3>4. Corroborate with authoritative context</h3><p>Check the agreement, official disclosure, regulator guidance, statute, or other primary source that applies to the transaction. Rules can differ by product, jurisdiction, and document type.</p></div><div class="leverage-section"><h3>5. Verify before acting</h3><p>Check the source passage and related records, then seek qualified legal, financial, accounting, tax, medical, or business advice when the consequence of an error is material.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>What an AI document review cannot establish by itself</h2><p>It cannot prove that a charge is illegal, deceptive, fraudulent, medically unnecessary, tax-deductible, or above a fair market price from a document alone. It cannot guarantee that an unflagged document contains no problem, and it cannot replace an official billing-dispute process or professional advice.</p><p>Accuracy depends on document quality, extraction, context, system version, evaluation design, and information outside the record. The public DetectHiddenFees research manifest is collecting and contains no verified records or published universal performance statistics as of August 8, 2026.</p><div class="leverage-section"><h3>Privacy and data handling questions</h3><p>Before uploading a financial record, identify what the product collects, how long it retains it, whether it is used for training, who can access it, how deletion works, and where the current policy is published. Do not upload sensitive information until those answers are clear.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Official sources and further reading</h2><p>The <a href="https://www.investor.gov/introduction-investing/investing-basics/glossary/robo-adviser" rel="noopener noreferrer">Investor.gov robo-adviser definition</a> explains the investment-advice meaning of the term. Its <a href="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/investor-56" rel="noopener noreferrer">automated investment tools alert</a> provides additional investor-education context.</p><p>For document-related billing questions, the <a href="https://www.consumerfinance.gov/consumer-tools/credit-cards/how-to-fix-mistakes-in-your-credit-card-bill/" rel="noopener noreferrer">CFPB credit-card billing guidance</a> explains a specific review and dispute process. The <a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10" rel="noopener noreferrer">NIST AI Risk Management Framework</a> is general voluntary guidance for managing AI risks, not an evaluation of HiddenFeeAI.</p><p>Continue with the public <a href="/ai-analysis-methodology">AI analysis methodology</a>, <a href="/ai-accuracy-and-limitations">AI accuracy and limitations guide</a>, and <a href="/privacy-and-ai-security">privacy and AI security resource</a>. These pages separate evidence from inference and do not claim a universal model result.</p><h2>Frequently Asked Questions</h2><div class="leverage-section"><h3>What is an AI financial advisor?</h3><p>The phrase can describe either an automated investment-advice program or a tool that reviews financial documents. Investor.gov uses robo-adviser for automated digital investment advisory programs, while document-analysis tools focus on records such as contracts, bills, invoices, and statements.</p></div><div class="leverage-section"><h3>Is an AI financial advisor the same as a robo-adviser?</h3><p>No. A robo-adviser generally uses information about goals, time horizon, income, assets, and risk tolerance to create or manage an investment portfolio. Document analysis examines records for terms, charges, or questions and does not by itself manage investments.</p></div><div class="leverage-section"><h3>What can AI-assisted financial document analysis examine?</h3><p>It can organize visible information such as fee names, amounts, dates, recurring terms, renewal language, line items, and related records. It may help surface questions for verification, but the result depends on the document, context, system, and review method.</p></div><div class="leverage-section"><h3>Can AI determine that a fee is illegal or that a price is unfair?</h3><p>No. A document review can identify a possible discrepancy or clause for investigation, but legality, fairness, fraud, tax treatment, and dispute outcomes require the applicable facts, rules, and qualified judgment.</p></div><div class="leverage-section"><h3>What should a trustworthy AI financial tool disclose?</h3><p>It should clearly identify its purpose, document types, evidence or source references, limitations, evaluation scope, privacy and retention practices, pricing, update date, and the role of human verification. A broad accuracy or savings claim without that context is not enough.</p></div><div class="leverage-section"><h3>Can AI replace a financial, legal, tax, or investment professional?</h3><p>No. AI output can help organize questions and records, but it should not replace qualified advice when a decision affects investments, contracts, taxes, legal rights, medical bills, or a material financial obligation.</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource is educational information about AI-assisted financial document review. It is not investment, legal, financial, accounting, tax, medical, or business advice.</div></div></section><section class="section"><div class="container"><h2>Need help organizing a financial document?</h2><p>HiddenFeeAI is the related document-analysis product. Check its current first-party product, privacy, and retention details before uploading a financial record.</p><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="document_analysis" data-cta-position="end" data-cta-variant="contextual">Review My Financial Document</a></div></section><section class="section"><div class="container"><h2>Continue the research</h2><div class="related-grid"><a class="related-link" href="/ai-analysis-hub">AI Analysis Hub</a><a class="related-link" href="/ai-document-analysis-tools">AI Document Analysis Tools</a><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/ai-accuracy-and-limitations">AI Accuracy and Limitations</a><a class="related-link" href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a><a class="related-link" href="/editorial-policy">Editorial Policy</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
removeSoftwareApplicationSchema();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated AI financial advisor with intent separation, official sources, evidence standards, contextual CTA, and FAQs.');
