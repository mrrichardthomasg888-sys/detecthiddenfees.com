const fs = require('fs');

const updates = {
  'ai-construction-contract-review.html': 'Review construction contracts with AI to spot change-order traps, price escalation clauses, vague scope, hidden fees, and costly terms before you build.',
  'consumer-fee-trends-report.html': 'See the latest consumer fee trends across banking, healthcare, automotive, telecom, and home services - and understand where hidden charges are increasing.',
  'ai-contract-review.html': 'Use AI contract review to find hidden fees, renewal terms, price escalation clauses, and risky language before you sign. Get a clear plain-English explanation.',
  'types-of-hidden-fees.html': 'Learn how hidden fees are classified across contracts, services, subscriptions, banking, billing, and transactions so you can recognize unexpected charges.',
  'how-do-companies-hide-fees-in-contracts.html': 'Learn how companies hide fees in contracts through fine print, vague language, buried charges, split pricing, and automatic renewal traps.',
  'hidden-bank-overdraft-fees.html': 'Learn how to spot hidden bank overdraft fees, transaction reordering, maintenance charges, and ATM surcharges before they drain your account.',
  'hidden-banking-fees.html': 'Learn how to spot hidden banking fees, overdraft charges, transaction reordering, maintenance fees, and ATM surcharges before they add up.',
  'hidden-hvac-contractor-fees.html': 'Learn how to spot hidden HVAC contractor fees, emergency service markups, refrigerant overpricing, labor padding, and estimate red flags.',
  'what-are-common-hidden-fees-in-service-agreements.html': 'Find hidden fees in service agreements, including administrative charges, automatic renewals, price escalations, cancellation costs, and vague surcharges.',
  'how-can-i-check-if-a-bill-is-incorrect.html': 'Learn how to check whether a bill is incorrect by comparing the agreement, checking duplicate charges, verifying prices, and finding unauthorized fees.',
  'hidden-fee-prevention-guide.html': 'Use this hidden fee prevention guide to stop unexpected charges before they happen across banking, medical bills, telecom, subscriptions, and service contracts.',
  'ai-contract-review-before-signing.html': 'Get an AI contract review before signing to identify hidden fees, pricing traps, renewal terms, and unfavorable clauses in plain English.',
  'cancellation-fee-clauses.html': 'Learn how cancellation fee clauses create exit costs and how to review termination penalties, notice requirements, and unfair contract language before signing.',
  'how-to-read-an-invoice.html': 'Learn how to read an invoice line by line and spot hidden fees, duplicate charges, inflated pricing, and billing errors before you pay.',
  'hidden-dealership-financing-fees.html': 'Learn how to spot hidden dealership financing fees, APR markups, GAP insurance inflation, loan packing, and costly add-ons in car paperwork.'
};

let changed = 0;
for (const [file, description] of Object.entries(updates)) {
  const html = fs.readFileSync(file, 'utf8');
  const pattern = /(<meta\s+name=["']description["']\s+content=["'])([^"']*)(["'][^>]*>)/i;
  if (!pattern.test(html)) throw new Error(`Missing description metadata: ${file}`);
  const next = html.replace(pattern, `$1${description}$3`);
  if (next !== html) {
    fs.writeFileSync(file, next, 'utf8');
    changed += 1;
  }
}

const aiContractFile = 'ai-contract-review.html';
const aiContractHtml = fs.readFileSync(aiContractFile, 'utf8');
const aiContractNext = aiContractHtml.replace(/AI contract review helps you understand agreements, identify potential hidden fees, uncover unfavorable terms, and generate a plain-English report with with clear explanations\./g, updates[aiContractFile]);
if (aiContractNext !== aiContractHtml) {
  fs.writeFileSync(aiContractFile, aiContractNext, 'utf8');
  changed += 1;
}

console.log(`Updated ${changed} evidence-backed CTR descriptions.`);
