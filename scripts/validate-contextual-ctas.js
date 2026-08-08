const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const expected = {
  'arbitration-clauses-explained.html': { action: 'contract_review', text: 'Review My Contract' },
  'indemnification-clauses-explained.html': { action: 'contract_review', text: 'Review My Contract' },
  'hidden-streaming-fees.html': { action: 'subscription_fee_review', text: 'Subscription' },
  'hidden-landscaping-fees.html': { action: 'estimate_review', text: 'Landscaping Estimate' },
  'ai-estimate-review.html': { action: 'estimate_review', text: 'Review My Estimate' },
  'ai-bill-analyzer.html': { action: 'bill_analysis', text: 'Review My Bill' },
  'ai-financial-analysis.html': { action: 'document_analysis', text: 'Review My Financial Document' },
  'ai-document-analysis-tools.html': { action: 'document_analysis', text: 'Analyze My Document' },
  'ai-invoice-analyzer.html': { action: 'bill_analysis', text: 'Analyze My Invoice' },
  'hidden-bank-overdraft-fees.html': { action: 'bank_statement_review', text: 'Review My Bank Statement' }
};
const errors = [];

for (const [filename, rule] of Object.entries(expected)) {
  const source = fs.readFileSync(path.join(root, filename), 'utf8');
  const mainStart = source.indexOf('<main');
  const mainEnd = source.indexOf('</main>', mainStart);
  if (mainStart < 0 || mainEnd < 0) {
    errors.push(`${filename}: could not locate main content`);
    continue;
  }
  const main = source.slice(mainStart, mainEnd);
  const links = [...main.matchAll(/<a\b[^>]+href=["']https:\/\/hiddenfeeai\.com[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi)];
  if (!links.length) errors.push(`${filename}: no HiddenFeeAI links found`);
  for (const match of links) {
    const tag = match[0];
    if (!tag.includes(`data-cta-action="${rule.action}"`)) errors.push(`${filename}: link missing ${rule.action}`);
    if (!/data-cta-position=|data-cta-variant=/i.test(tag)) errors.push(`${filename}: link missing position or variant metadata`);
  }
  const visibleText = source.replace(/<[^>]+>/g, ' ');
  if (!visibleText.includes(rule.text)) errors.push(`${filename}: contextual CTA text missing: ${rule.text}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated contextual CTA metadata on ${Object.keys(expected).length} pages.`);
