const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const checks = {
  'ai-contract-review.html': [
    '85-95%',
    '40-50%',
    '90-98%',
    'actual HiddenFeeAI users',
    '$1,200 saved',
    '$1,100+ saved',
    '$1.2 billion annually'
  ],
  'ai-analysis-hub.html': [
    'trained on thousands of documents',
    'industry experience indicates that that up to some medical bills'
  ],
  'ai-financial-advisor.html': [
    'more than double the standard industry markup'
  ],
  'hidden-fee-dictionary.html': [
    'class="cost">$'
  ]
};
const errors = [];
for (const [filename, forbidden] of Object.entries(checks)) {
  const source = fs.readFileSync(path.join(root, filename), 'utf8').toLowerCase();
  for (const phrase of forbidden) {
    if (source.includes(phrase.toLowerCase())) errors.push(`${filename} retains: ${phrase}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('High-risk claim remediation checks passed for four priority pages.');
