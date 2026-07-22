const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/lynns/Downloads/detecthiddenfees.com';

const PAGES = [
  'ai-contract-review.html',
  'ai-construction-contract-review.html',
  'ai-agreement-analyzer.html',
  'ai-bill-analyzer.html',
  'hidden-fee-detector.html',
  'ai-document-checker.html',
  'contract-red-flags.html',
  'contract-risk-assessment-ai-tool.html',
  'contract-terms-glossary.html',
  'change-order-fees.html',
  'hidden-home-renovation-fees.html',
  'estimate-vs-quote.html',
  'ai-estimate-review.html',
  'before-signing-contract-checklist.html',
  'hidden-fees-guides.html',
  'duplicate-medical-billing-charges.html',
  'hidden-hvac-contractor-fees.html',
  'hidden-dealership-financing-fees.html',
  'hidden-bank-overdraft-fees.html',
  'find-hidden-fees-in-contract.html',
];

const FOOTER_COLS = '<div class="footer-links">' +
  '<div class="footer-column"><strong>AI Tools</strong>' +
    '<a href="/ai-financial-advisor.html">AI Financial Advisor</a>' +
    '<a href="/legal-artificial-intelligence.html">Legal Artificial Intelligence</a>' +
    '<a href="/ai-contract-review.html">AI Contract Review</a>' +
    '<a href="/ai-agreement-analyzer.html">AI Agreement Analyzer</a>' +
    '<a href="/ai-bill-analyzer.html">AI Bill Analyzer</a>' +
    '<a href="/hidden-fee-detector.html">Hidden Fee Detector</a>' +
    '<a href="/analyze-my-document.html">Upload Document</a>' +
  '</div>' +
  '<div class="footer-column"><strong>Contract Resources</strong>' +
    '<a href="/contract-red-flags.html">Contract Red Flags</a>' +
    '<a href="/before-signing-contract-checklist.html">Before Signing Contract</a>' +
    '<a href="/contract-risk-assessment-ai-tool.html">Contract Risk Assessment</a>' +
    '<a href="/contract-terms-glossary.html">Contract Terms Glossary</a>' +
  '</div>' +
  '<div class="footer-column"><strong>Hidden Fee Resources</strong>' +
    '<a href="/hidden-fees-guides.html">Hidden Fee Guides</a>' +
    '<a href="/hidden-fee-examples.html">Hidden Fee Examples</a>' +
    '<a href="/hidden-fee-prevention-guide.html">Fee Prevention Guide</a>' +
  '</div>' +
  '<div class="footer-column"><strong>Industry Investigations</strong>' +
    '<a href="/hidden-hvac-contractor-fees.html">HVAC Contractor Fees</a>' +
    '<a href="/hidden-home-renovation-fees.html">Home Renovation Fees</a>' +
    '<a href="/hidden-bank-overdraft-fees.html">Bank Overdraft Fees</a>' +
    '<a href="/hidden-dealership-financing-fees.html">Dealership Financing Fees</a>' +
    '<a href="/duplicate-medical-billing-charges.html">Medical Billing Charges</a>' +
  '</div>' +
  '<div class="footer-column"><strong>Company</strong>' +
    '<a href="/about-detect-hidden-fees.html">About</a>' +
    '<a href="/ai-analysis-methodology.html">Methodology</a>' +
    '<a href="/privacy-and-ai-security.html">Privacy</a>' +
    '<a href="/terms-of-service.html">Terms</a>' +
    '<a href="/contact.html">Contact</a>' +
  '</div>' +
'</div>';

const FOOTER_BOTTOM = '<p style="margin-top:24px;color:#64748b;">&copy; 2026 DetectHiddenFees.com — AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers</p>';

let fixed = 0;

PAGES.forEach(file => {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) {
    console.log('SKIP: ' + file);
    return;
  }
  
  let c = fs.readFileSync(fp, 'utf8');
  
  // Find old footer
  const footerStart = c.indexOf('<footer>');
  const footerEnd = c.indexOf('</footer>');
  
  if (footerStart === -1 || footerEnd === -1) {
    console.log('NO FOOTER: ' + file);
    return;
  }
  
  const beforeFooter = c.substring(0, footerStart);
  
  // Look for where the footer content ends - find the copyright line
  const footerContent = c.substring(footerStart, footerEnd + 9);
  
  // Check if this already has the new footer format
  if (footerContent.indexOf('Legal Artificial Intelligence') > -1 && footerContent.indexOf('Company</strong><a') > -1) {
    console.log('ALREADY OK: ' + file);
    return;
  }
  
  const afterFooter = c.substring(footerEnd + 9);
  
  const newFooter = '<footer><div class="container">' + FOOTER_COLS + FOOTER_BOTTOM + '</div></footer>';
  
  fs.writeFileSync(fp, beforeFooter + newFooter + afterFooter, 'utf8');
  fixed++;
  console.log('FIXED: ' + file);
});

console.log('\nTotal pages fixed: ' + fixed);