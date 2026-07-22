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
    '<a href="https://facebook.com/1276218502236982" target="_blank" rel="noopener noreferrer" aria-label="Follow DetectHiddenFees on Facebook"><span style="display:inline-flex;align-items:center;gap:8px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M24 12.0733C24 5.40541 18.6274 0 12 0C5.37258 0 0 5.40541 0 12.0733C0 18.0995 4.38823 23.0943 10.125 24V15.5633H7.07812V12.0733H10.125V9.41343C10.125 6.38755 11.9165 4.71615 14.6576 4.71615C15.9705 4.71615 17.3438 4.95195 17.3438 4.95195V7.92313H15.8306C14.34 7.92313 13.875 8.85366 13.875 9.80899V12.0733H17.2031L16.6711 15.5633H13.875V24C19.6118 23.0943 24 18.0995 24 12.0733Z" fill="#3b82f6"/></svg>Facebook</span></a>' +
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
  
  // Check if this already has the new footer format with Facebook
  if (footerContent.indexOf('facebook.com') > -1) {
    console.log('ALREADY HAS FB: ' + file);
    return;
  }
  
  const afterFooter = c.substring(footerEnd + 9);
  
  const newFooter = '<footer><div class="container">' + FOOTER_COLS + FOOTER_BOTTOM + '</div></footer>';
  
  fs.writeFileSync(fp, beforeFooter + newFooter + afterFooter, 'utf8');
  fixed++;
  console.log('FIXED: ' + file);
});

console.log('\nTotal pages fixed: ' + fixed);