const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\lynns\\Downloads\\detecthiddenfees.com';

const pages = [
  'hidden-fees-resource-center', 'consumer-negotiation-resource-center', 'hidden-fee-database',
  'ai-invoice-analyzer', 'ai-bill-analyzer', 'ai-estimate-review', 'ai-quote-review', 'ai-receipt-analyzer', 'ai-contract-risk-score',
  'hidden-plumbing-fees', 'hidden-electrician-fees', 'hidden-roofing-contractor-fees', 'hidden-moving-company-fees', 'hidden-landscaping-fees',
  'hidden-credit-card-fees', 'hidden-loan-fees', 'hidden-mortgage-fees', 'hidden-investment-fees',
  'hidden-internet-fees', 'hidden-phone-bill-fees', 'hidden-subscription-fees', 'hidden-streaming-fees',
  'hiddenfeeai-vs-bill-negotiation-services', 'ai-contract-review-vs-lawyer-review', 'free-vs-paid-contract-review', 'best-ai-bill-analyzer-tools',
  'about-detect-hidden-fees', 'how-detect-hidden-fees-works', 'research-methodology', 'ai-analysis-methodology', 'editorial-policy',
  'hidden-fee-calculator', 'bill-savings-calculator', 'medical-bill-error-checklist', 'contract-risk-score', 'fee-negotiation-checklist',
  'bill-negotiation-resource-center', 'ai-bill-negotiation', 'medical-bill-audit', 'hospital-bill-negotiation-guide',
  'how-to-negotiate-medical-bills', 'reduce-monthly-bills', 'hidden-billing-fees', 'bill-negotiation-letter', 'medical-debt-relief-options'
];

let total = 0;
for (const n of pages) {
  const fp = path.join(dir, n + '.html');
  if (!fs.existsSync(fp)) { console.log('MISSING: ' + n); continue; }
  const c = fs.readFileSync(fp, 'utf8');
  const start = c.indexOf('class="container long-content"');
  if (start === -1) { console.log('NO CONTENT: ' + n); continue; }
  const h2 = c.indexOf('<h2>', start);
  const se = c.indexOf('</section>', h2);
  if (h2 === -1 || se === -1) { console.log('NO END: ' + n); continue; }
  let body = c.substring(h2, se);
  body = body.replace(/<[^>]+>/g, ' ').replace(/\\s+/g, ' ').trim();
  const wc = body.split(' ').length;
  total += wc;
  console.log(n + ': ' + wc + ' words' + (wc < 100 ? ' - TOO SHORT' : ''));
}
console.log('\\nTotal: ' + total);
