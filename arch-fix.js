const fs = require('fs');

const APPROVED_FOOTER = '<footer><div class="container"><div class="footer-links"><div class="footer-column"><strong>TOOLS</strong><a href="/ai-contract-review.html">AI Contract Review</a><a href="/ai-bill-analyzer.html">AI Bill Analyzer</a><a href="/ai-document-checker.html">AI Document Checker</a><a href="/hidden-fee-detector.html">Hidden Fee Detector</a><a href="/analyze-my-document.html">Upload Document</a></div><div class="footer-column"><strong>DOCUMENT ANALYSIS RESOURCES</strong><a href="/ai-document-checker.html">AI Document Checker</a><a href="/ai-document-review-tool.html">AI Document Review Tool</a><a href="/ai-document-scanner.html">AI Document Scanner</a><a href="/analyze-my-document.html">Analyze My Document</a><a href="/upload-document-for-ai-analysis.html">Upload Document For AI Analysis</a></div><div class="footer-column"><strong>CONTRACT RESOURCES</strong><a href="/ai-contract-resource-center.html">AI Contract Resource Center</a><a href="/ai-contract-review.html">AI Contract Review</a><a href="/contract-red-flags.html">Contract Red Flags</a><a href="/before-signing-contract-checklist.html">Before Signing Contract</a><a href="/contract-risk-assessment-ai-tool.html">Contract Risk Assessment</a><a href="/contract-terms-glossary.html">Contract Terms Glossary</a><a href="/ai-agreement-analyzer.html">Agreement Analyzer</a></div><div class="footer-column"><strong>BILL NEGOTIATION RESOURCES</strong><a href="/bill-negotiation-resource-center.html">Bill Negotiation Resource Center</a><a href="/bill-negotiation-service.html">Bill Negotiation Service</a><a href="/bill-negotiation-letter.html">Bill Negotiation Letter</a><a href="/bill-negotiation-templates.html">Bill Negotiation Templates</a><a href="/hospital-bill-negotiation-guide.html">Hospital Bill Negotiation Guide</a><a href="/medical-bill-negotiation-template.html">Medical Bill Negotiation</a><a href="/medical-debt-negotiation.html">Medical Debt Negotiation</a><a href="/bill-savings-calculator.html">Bill Savings Calculator</a></div><div class="footer-column"><strong>HIDDEN FEE RESOURCES</strong><a href="/hidden-fee-detector.html">Hidden Fee Detector</a><a href="/hidden-fees-guides.html">Hidden Fee Guides</a><a href="/hidden-fee-examples.html">Hidden Fee Examples</a><a href="/hidden-fee-calculator.html">Fee Calculator</a><a href="/hidden-fee-prevention-guide.html">Fee Prevention Guide</a><a href="/hidden-fee-industry-guide.html">Industry Fee Guides</a></div><div class="footer-column"><strong>COMPANY &amp; TRUST</strong><a href="/about-detect-hidden-fees.html">About</a><a href="/research-methodology.html">Methodology</a><a href="/security-overview.html">Security</a><a href="/privacy-and-ai-security.html">Privacy</a><a href="/terms-of-service.html">Terms</a><a href="/contact.html">Contact</a></div></div><p style="margin-top:24px;color:#64748b;">&copy; 2026 DetectHiddenFees.com</p></div></footer>';

const files = fs.readdirSync('.').filter(e => e.endsWith('.html') && !e.startsWith('_'));
let navRemoved = 0, footerSet = 0;

files.forEach(fn => {
  let c = fs.readFileSync(fn, 'utf8');
  
  // 1. Remove entire <nav> element (but keep the logo by wrapping it outside the nav)
  if (c.includes('<nav')) {
    // Extract the nav section
    const navStart = c.indexOf('<nav');
    const navEnd = c.indexOf('</nav>', navStart) + 6;
    const navHtml = c.substring(navStart, navEnd);
    
    // Try to extract the logo from nav
    const logoMatch = navHtml.match(/<div class="logo"[^>]*>[\s\S]*?<\/div>/);
    const logoHtml = logoMatch ? logoMatch[0] : '';
    
    // Wrap logo in a clean header with link to home
    let replacement = '';
    if (logoHtml) {
      replacement = '<header style="position:sticky;top:0;z-index:999;background:rgba(2,6,23,.85);backdrop-filter:blur(24px);border-bottom:1px solid rgba(59,130,246,0.15);padding:14px 20px"><a href="/" style="text-decoration:none;color:inherit">' + logoHtml + '</a></header>';
    }
    
    c = c.substring(0, navStart) + replacement + c.substring(navEnd);
    navRemoved++;
  }
  
  // 2. Replace footer with approved version
  if (c.includes('<footer')) {
    const fStart = c.indexOf('<footer');
    const fEnd = c.indexOf('</footer>', fStart) + 9;
    c = c.substring(0, fStart) + APPROVED_FOOTER + c.substring(fEnd);
    footerSet++;
  }
  
  fs.writeFileSync(fn, c, 'utf8');
});

console.log('Navs removed:', navRemoved);
console.log('Footers set:', footerSet);