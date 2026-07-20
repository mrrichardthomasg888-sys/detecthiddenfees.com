const fs = require('fs');

const newFooter = `<footer>
<div class="container">
<div class="footer-links" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;text-align:left;">

<div style="min-width:180px;">
<strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">HIDDEN FEES</strong>
<a href="/hidden-fees-guides.html">Hidden Fees Guides</a>
<a href="/hidden-fee-examples.html">Hidden Fee Examples</a>
<a href="/hidden-fee-dictionary.html">Hidden Fee Dictionary</a>
<a href="/hidden-fee-database.html">Hidden Fee Database</a>
<a href="/hidden-fee-statistics.html">Hidden Fee Statistics</a>
<a href="/hidden-fee-prevention-guide.html">Hidden Fee Prevention Guide</a>
<a href="/hidden-fees-resource-center.html">Hidden Fees Resource Center</a>
</div>

<div style="min-width:180px;">
<strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">AI ANALYSIS TOOLS</strong>
<a href="/ai-bill-analyzer.html">AI Bill Analyzer</a>
<a href="/ai-invoice-analyzer.html">AI Invoice Analyzer</a>
<a href="/ai-contract-review.html">AI Contract Review</a>
<a href="/ai-document-analysis-tools.html">AI Document Analysis</a>
<a href="/ai-estimate-review.html">AI Estimate Review</a>
<a href="/ai-receipt-analyzer.html">AI Receipt Analyzer</a>
<a href="/ai-fee-detector.html">AI Fee Detector</a>
</div>

<div style="min-width:180px;">
<strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">NEGOTIATION</strong>
<a href="/bill-negotiation-resource-center.html">Bill Negotiation Center</a>
<a href="/negotiation-scripts.html">Negotiation Scripts</a>
<a href="/bill-negotiation-templates.html">Negotiation Templates</a>
<a href="/hospital-bill-negotiation-guide.html">Hospital Bill Guide</a>
<a href="/fee-removal-request-template.html">Fee Removal Template</a>
<a href="/negotiate-bills.html">How to Negotiate Bills</a>
</div>

<div style="min-width:180px;">
<strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">CONSUMER PROTECTION</strong>
<a href="/consumer-financial-intelligence-center.html">Financial Intelligence Center</a>
<a href="/contract-red-flags.html">Contract Red Flags</a>
<a href="/before-signing-contract-checklist.html">Contract Checklist</a>
<a href="/how-to-read-an-invoice.html">How to Read an Invoice</a>
<a href="/invoice-red-flags.html">Invoice Red Flags</a>
<a href="/service-agreement-red-flags.html">Service Agreement Red Flags</a>
</div>

<div style="min-width:180px;">
<strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">COMPANY</strong>
<a href="/about-detect-hidden-fees.html">About Us</a>
<a href="/how-detect-hidden-fees-works.html">How It Works</a>
<a href="/editorial-policy.html">Editorial Policy</a>
<a href="/research-methodology.html">Research Methodology</a>
<a href="/ai-accuracy-and-limitations.html">AI Accuracy & Limitations</a>
<a href="/privacy-and-ai-security.html">Privacy & AI Security</a>
</div>

<div style="min-width:180px;">
<strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">ANALYZE NOW</strong>
<a href="/analyze-my-bill.html" style="font-weight:bold;color:#38bdf8;">Analyze My Bill</a>
<a href="/analyze-my-contract.html" style="font-weight:bold;color:#38bdf8;">Analyze My Contract</a>
<a href="/analyze-my-invoice.html" style="font-weight:bold;color:#38bdf8;">Analyze My Invoice</a>
<a href="/check-my-fees.html" style="font-weight:bold;color:#38bdf8;">Check My Fees</a>
<a href="/hidden-fee-scanner.html" style="font-weight:bold;color:#38bdf8;">Free Fee Scanner</a>
</div>

</div>
<p style="margin-top:24px;color:#64748b;">&copy; 2026 DetectHiddenFees.com &mdash; AI Hidden Fee Intelligence Platform</p>
</div>
</footer>`;

// Find all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('simple_test'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace old footer with new one
  const footerRegex = /<footer>[\s\S]*?<\/footer>/;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, newFooter);
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
}

console.log(`Updated ${count} pages with new footer`);

// Verify
console.log('Files processed:', files.length);