const fs = require('fs');
const content = fs.readFileSync(__dirname + '/index.html', 'utf8');

// Replace the AI Tools column
const oldTools = '<div class="footer-column"><strong>AI Tools</strong><a href="/ai-contract-review.html">AI Contract Review</a><a href="/ai-bill-analyzer.html">AI Bill Analyzer</a><a href="/ai-document-checker.html">AI Document Checker</a><a href="/hidden-fee-detector.html">Hidden Fee Detector</a><a href="/ai-financial-advisor.html">AI Financial Advisor</a><a href="/ai-agreement-analyzer.html">AI Agreement Analyzer</a></div>';

const newTools = '<div class="footer-column"><strong>AI Tools</strong><a href="/ai-financial-advisor.html">AI Financial Advisor</a><a href="/legal-artificial-intelligence.html">Legal Artificial Intelligence</a><a href="/ai-contract-review.html">AI Contract Review</a><a href="/ai-agreement-analyzer.html">AI Agreement Analyzer</a><a href="/ai-bill-analyzer.html">AI Bill Analyzer</a><a href="/ai-invoice-analyzer.html">AI Invoice Analyzer</a><a href="/ai-document-checker.html">AI Document Checker</a><a href="/hidden-fee-detector.html">Hidden Fee Detector</a></div>';

if (content.includes(oldTools)) {
  let result = content.replace(oldTools, newTools);
  
  // Update the footer bottom text
  result = result.replace(
    '<p>&copy; 2026 DetectHiddenFees.com &mdash; AI-Powered Hidden Fee Detection & Forensic Pricing Intelligence</p>',
    '<p>&copy; 2026 DetectHiddenFees.com &mdash; AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers</p>'
  );
  
  // Add disclaimer section before footer columns
  const disclaimerBlock = '<div class="footer-column"><strong>Industry Investigations</strong><a href="/hidden-hvac-contractor-fees.html">HVAC Contractor Fees</a><a href="/hidden-home-renovation-fees.html">Home Renovation Fees</a><a href="/hidden-bank-overdraft-fees.html">Bank Overdraft Fees</a><a href="/hidden-dealership-financing-fees.html">Dealership Financing Fees</a><a href="/duplicate-medical-billing-charges.html">Medical Billing Charges</a><a href="/hidden-fee-industry-guide.html">Industry Fee Guides</a></div>';
  
  // Remove hidden-fee-industry-guide link
  const oldIndustry = '<a href="/hidden-fee-industry-guide.html">Industry Fee Guides</a>';
  const newIndustry = '';
  
  if (result.includes(oldIndustry)) {
    result = result.replace(oldIndustry, '');
  }
  
  fs.writeFileSync(__dirname + '/index.html', result, 'utf8');
  console.log('Footer updated successfully');
} else {
  console.log('Could not find AI Tools column in index.html');
}