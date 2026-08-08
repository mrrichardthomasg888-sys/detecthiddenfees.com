const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-bank-overdraft-fees.html');
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

if (source.includes('The exact fee depends on the transaction, account agreement, and applicable rules')) {
  removeStickyProductBar();
  normalizeResearchFooter();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The overdraft-fees page is already remediated; normalized the sticky product bar and research footer links.');
  process.exit(0);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

const title = 'Hidden Bank Overdraft Fees: How to Review Charges and Account Rules | DetectHiddenFees';
const displayTitle = 'Hidden Bank Overdraft Fees: How to Review Charges and Account Rules';
const description = 'Learn how to review overdraft, NSF, ATM, maintenance, and account fees using your statements, account disclosures, and official consumer guidance.';
const updated = '2026-08-08';

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
replaceOnce('description metadata', /<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
replaceOnce('Twitter title', /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
replaceOnce('Twitter description', /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const faq = [
  ['What is an overdraft fee?', 'An overdraft fee is a charge associated with a financial institution paying a transaction when the account has insufficient or unavailable funds. The fee, covered transactions, and available options depend on the account agreement and applicable rules.'],
  ['Can a bank charge an overdraft fee for an ATM or one-time debit transaction without opt-in?', 'For covered ATM and one-time debit card transactions, Regulation E generally requires affirmative opt-in before an institution can assess an overdraft fee. The rule does not apply the same way to checks, recurring electronic payments, or every account service, so check the transaction type and account disclosures.'],
  ['What is the difference between an overdraft fee and an NSF fee?', 'An overdraft commonly refers to a transaction the institution pays despite insufficient funds. An NSF or returned-item fee may be charged when a check or electronic payment is returned or declined. Exact labels and consequences vary by institution and transaction.'],
  ['Why can a statement show an unexpected overdraft charge?', 'Balances, deposits, withdrawals, holds, and scheduled payments may not update or become available at the time a consumer expects. Review the account ledger, funds-availability information, transaction dates, and the agreement instead of assuming the posting order proves an improper charge.'],
  ['How should I review a bank statement for hidden fees?', 'List each fee, identify the transaction that preceded it, compare the charge with the account disclosure, check whether an opt-in or other authorization applies, and ask the institution for an explanation or correction when the record does not match the agreement.'],
  ['Can AI determine whether an overdraft fee is illegal?', 'No. AI-assisted review may help organize statements and flag repeated labels or unexplained amounts, but it cannot establish authorization, legal liability, or a successful dispute from a statement alone. Verify the original records and seek qualified advice when appropriate.']
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
    '@id': 'https://detecthiddenfees.com/hidden-bank-overdraft-fees#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/hidden-bank-overdraft-fees#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Hidden Fee Industry Guide', item: 'https://detecthiddenfees.com/hidden-fee-industry-guide' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-bank-overdraft-fees' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-bank-overdraft-fees',
    inLanguage: 'en-US',
    datePublished: '2026-07-21',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Bank overdraft and account fees' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-bank-overdraft-fees#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/hidden-fee-industry-guide">Hidden Fee Industry Guide</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">BANKING FEE ANALYSIS</div><h1>${displayTitle}</h1><p class="hero-sub">An overdraft or account fee should be checked against the transaction, account disclosure, and applicable rules. This guide shows how to review the record without assuming that every charge is unlawful or unexpected.</p><div class="hero-buttons"><a href="#review-workflow" class="primary-btn">Review a Statement &darr;</a><a href="/hidden-fee-industry-guide" class="secondary-btn">Explore Banking Fees</a></div><div class="hero-trust"><span>Transaction-specific rules</span><span>Account disclosures matter</span><span>Source-aware review</span><span>Human verification required</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h3>Direct answer: what makes an overdraft fee worth reviewing?</h3><p>An overdraft fee is worth reviewing when the statement, transaction history, account disclosure, and the institution's explanation do not clearly agree. The exact fee depends on the transaction, account agreement, and applicable rules. For covered ATM and one-time debit card transactions, Regulation E generally requires affirmative opt-in before an overdraft fee can be assessed; checks, recurring electronic payments, transfers, and other account fees can follow different rules.</p><p><strong>Important boundary:</strong> a statement can show that a fee was posted, but it cannot by itself establish authorization, a legal violation, or a successful dispute. Preserve the original records and verify the transaction type before drawing a conclusion.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2 id="review-workflow">A practical bank-fee review workflow</h2><div class="leverage-section"><h3>1. Rebuild the timeline</h3><p>List the transaction date, posting date, amount, available balance, pending items, deposit availability, and fee date. Timing can explain a discrepancy, but the institution's records and disclosures should be checked rather than guessed at.</p></div><div class="leverage-section"><h3>2. Classify the transaction</h3><p>Separate an ATM withdrawal, one-time debit purchase, check, recurring electronic payment, ACH item, transfer, returned item, ATM surcharge, monthly maintenance fee, paper-statement fee, or another account charge. The category affects which disclosure and rule may apply.</p></div><div class="leverage-section"><h3>3. Compare the fee with the disclosure</h3><p>Find the account agreement, fee schedule, overdraft-election record, funds-availability information, and any notice supplied by the institution. Record the exact label, amount, conditions, and any daily or repeated-charge language.</p></div><div class="leverage-section"><h3>4. Ask a focused question</h3><p>Ask the bank to identify the transaction that triggered the fee, the disclosure or authorization it relied on, whether the item was paid or returned, and how it calculated the amount. Keep the response with the statement and account records.</p></div><div class="leverage-section"><h3>5. Escalate only with the records</h3><p>If the response does not resolve the discrepancy, follow the institution's complaint process and consult the appropriate regulator or qualified adviser. Do not describe a charge as illegal or deceptive until the facts and applicable rule have been evaluated.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Fees and patterns to distinguish</h2><p>Common labels include overdraft fees, NSF or returned-item fees, ATM surcharges, monthly maintenance fees, transfer fees, paper-statement fees, and charges associated with optional overdraft coverage. These labels are not interchangeable, and a fee may be permitted, waived, disclosed, or disputed depending on the account and transaction.</p><p>Transaction timing can also be confusing. Deposits may not be available immediately, pending items may change the available balance, and transactions may not appear in the order a consumer expects. The statement and account agreement are stronger evidence than a general claim that a bank always reorders transactions.</p><div class="leverage-section"><h3>A simple impact calculation</h3><p>To measure the documented cost for a review period, add the posted fee amounts and separate one-time, recurring, and daily charges. Then compare the total with the fee schedule and the underlying transactions. This calculation describes the records you have; it does not predict future fees or prove that a charge was improper.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Official guidance and source hierarchy</h2><p>The <a href="https://www.consumerfinance.gov/consumer-tools/bank-accounts/know-your-overdraft-options/" rel="noopener noreferrer">Consumer Financial Protection Bureau's overdraft-options guidance</a> explains opt-out and linked-account choices and notes that fees vary by institution. The <a href="https://www.consumerfinance.gov/ask-cfpb/what-can-i-do-if-my-bank-charged-me-a-fee-for-overdrawing-my-account-en-1037/" rel="noopener noreferrer">CFPB fee-dispute guidance</a> distinguishes one-time debit and ATM transactions from checks and recurring electronic payments.</p><p>The current <a href="https://www.consumerfinance.gov/rules-policy/regulations/1005/17/" rel="noopener noreferrer">Regulation E overdraft-services rule</a> contains the federal requirements for covered transactions. The <a href="https://www.fdic.gov/consumer-resource-center/2021-12/overdraft-and-account-fees" rel="noopener noreferrer">FDIC consumer resource on overdraft and account fees</a> provides additional general education. These sources do not decide whether a particular fee on your statement was correct; account documents and transaction facts still matter.</p><p>For AI-assisted review, treat any flagged fee or pattern as a question to verify against the original statement, account agreement, and applicable source. The public product and privacy details should be checked separately before uploading any sensitive financial document.</p><h2>Frequently Asked Questions</h2><div class="leverage-section"><h3>What is an overdraft fee?</h3><p>An overdraft fee is a charge associated with a financial institution paying a transaction when the account has insufficient or unavailable funds. The fee, covered transactions, and available options depend on the account agreement and applicable rules.</p></div><div class="leverage-section"><h3>Can a bank charge an overdraft fee for an ATM or one-time debit transaction without opt-in?</h3><p>For covered ATM and one-time debit card transactions, Regulation E generally requires affirmative opt-in before an institution can assess an overdraft fee. The rule does not apply the same way to checks, recurring electronic payments, or every account service, so check the transaction type and account disclosures.</p></div><div class="leverage-section"><h3>What is the difference between an overdraft fee and an NSF fee?</h3><p>An overdraft commonly refers to a transaction the institution pays despite insufficient funds. An NSF or returned-item fee may be charged when a check or electronic payment is returned or declined. Exact labels and consequences vary by institution and transaction.</p></div><div class="leverage-section"><h3>Why can a statement show an unexpected overdraft charge?</h3><p>Balances, deposits, withdrawals, holds, and scheduled payments may not update or become available at the time a consumer expects. Review the account ledger, funds-availability information, transaction dates, and the agreement instead of assuming the posting order proves an improper charge.</p></div><div class="leverage-section"><h3>How should I review a bank statement for hidden fees?</h3><p>List each fee, identify the transaction that preceded it, compare the charge with the account disclosure, check whether an opt-in or other authorization applies, and ask the institution for an explanation or correction when the record does not match the agreement.</p></div><div class="leverage-section"><h3>Can AI determine whether an overdraft fee is illegal?</h3><p>No. AI-assisted review may help organize statements and flag repeated labels or unexplained amounts, but it cannot establish authorization, legal liability, or a successful dispute from a statement alone. Verify the original records and seek qualified advice when appropriate.</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource is educational information about bank-account fees and document review. It is not legal, financial, accounting, tax, or banking advice.</div></div></section><section class="section"><div class="container"><h2>Need help organizing a bank-statement review?</h2><p>HiddenFeeAI is the related document-analysis product. Check its current first-party product, privacy, and retention details before uploading a financial record.</p><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="bank_statement_review" data-cta-position="end" data-cta-variant="contextual">Review My Bank Statement</a></div></section><section class="section"><div class="container"><h2>Continue the research</h2><div class="related-grid"><a class="related-link" href="/hidden-fee-industry-guide">Banking Fee Guide</a><a class="related-link" href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a><a class="related-link" href="/ai-bill-analyzer">AI Bill Analyzer</a><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/privacy-and-ai-security">Privacy and AI Security</a><a class="related-link" href="/editorial-policy">Editorial Policy</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated hidden bank overdraft fees with official guidance, a verification workflow, contextual CTA, and FAQs.');
