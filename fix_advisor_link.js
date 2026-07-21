const fs = require('fs');
let c = fs.readFileSync('ai-fee-detector.html', 'utf8');

const oldText = 'HIDDEN FEE RESOURCES</strong><a href=\"/hidden-fee-detector.html\">Hidden Fee Detector</a><a href=\"/hidden-fees-guides.html\">Hidden Fee Guides</a><a href=\"/hidden-fee-examples.html\">Hidden Fee Examples</a><a href=\"/hidden-fee-calculator.html\">Fee Calculator</a><a href=\"/hidden-fee-prevention-guide.html\">Fee Prevention Guide</a><a href=\"/hidden-fee-industry-guide.html\">Industry Fee Guides</a></div>';

const newText = 'HIDDEN FEE RESOURCES</strong><a href=\"/hidden-fee-detector.html\">Hidden Fee Detector</a><a href=\"/hidden-fees-guides.html\">Hidden Fee Guides</a><a href=\"/hidden-fee-examples.html\">Hidden Fee Examples</a><a href=\"/hidden-fee-calculator.html\">Fee Calculator</a><a href=\"/hidden-fee-prevention-guide.html\">Fee Prevention Guide</a><a href=\"/hidden-fee-industry-guide.html\">Industry Fee Guides</a><a href=\"/ai-financial-advisor.html\">AI Financial Advisor</a></div>';

if (c.includes(oldText)) {
  c = c.replace(oldText, newText);
  fs.writeFileSync('ai-fee-detector.html', c, 'utf8');
  console.log('SUCCESS: Added AI Financial Advisor link to ai-fee-detector.html');
} else {
  console.log('FAILED: Exact string not found');
  // Debug
  const idx = c.indexOf('Industry Fee Guides');
  console.log('Context:', JSON.stringify(c.substring(Math.max(0, idx-150), idx + 50)));
}