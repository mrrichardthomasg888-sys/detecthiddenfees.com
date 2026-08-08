const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const forbiddenByFile = {
  'about-detect-hidden-fees.html': ['cost Americans billions', 'trained on thousands of documents', 'automatically deleted after processing is complete', 'Know exactly what to say and save money'],
  'ai-analysis-methodology.html': ['most detailed explanation available', 'three to five minutes and results in a comprehensive report', 'refined through thousands of real-world analyses', 'successful negotiations and legal challenges'],
  'contract-fee-analysis.html': ['American Bar Association found that nearly 60%', 'cost them thousands of dollars', 'takes about three to five minutes'],
  'ai-agreement-analyzer.html': ['save you hundreds or thousands of dollars', 'AI reads every word so you do not have to']
};
const issues = [];
for (const [filename, phrases] of Object.entries(forbiddenByFile)) {
  const source = fs.readFileSync(path.join(root, filename), 'utf8').toLowerCase();
  for (const phrase of phrases) if (source.includes(phrase.toLowerCase())) issues.push(`${filename} retains: ${phrase}`);
}
if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
console.log('Unverified product-claim remediation checks passed for four priority pages.');
