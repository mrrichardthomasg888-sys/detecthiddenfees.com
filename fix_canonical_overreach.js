const fs = require('fs');

console.log('=== FIXING OVER-AGGRESSIVE CANONICALS ===\n');

// These pages should point to THEIR OWN page as canonical, not to the pillar
// Each has unique content that should be indexed separately
const pagesToFix = [
  'negotiate-bills.html',
  'negotiation-scripts.html', 
  'bill-negotiation-letter.html',
  'bill-negotiation-templates.html',
  'bill-negotiation-service.html',
  'fee-removal-request-template.html',
  'fee-negotiation-checklist.html',
  'hospital-bill-negotiation-guide.html',
  'negotiate-hospital-bill.html',
  'how-to-negotiate-medical-bills.html',
  'medical-bill-negotiation-template.html',
  'medical-debt-negotiation.html',
  'reduce-monthly-bills.html',
  'ai-bill-negotiation.html',
  'hiddenfeeai-vs-bill-negotiation-services.html',
  'hiddenfeeai-vs-lawyer-review.html',
  'hiddenfeeai-vs-traditional-negotiation.html',
  'ai-contract-review-tool.html',
  'ai-contract-review-software.html',
  'ai-contract-review-vs-chatgpt.html',
  'ai-contract-review-vs-lawyer-review.html',
  'ai-contract-review-vs-manual-review.html',
  'contract-review-ai-software.html',
  'contract-analysis-ai.html',
  'hidden-bank-overdraft-fees.html',
  'hidden-credit-card-fees.html',
  'hidden-mortgage-fees.html',
  'hidden-internet-fees.html',
  'hidden-streaming-fees.html',
  'hidden-subscription-fees.html',
  'hidden-hvac-contractor-fees.html',
  'hidden-home-renovation-fees.html',
  'hidden-electrician-fees.html',
  'hidden-plumbing-fees.html',
  'hidden-roofing-contractor-fees.html',
  'hidden-moving-company-fees.html',
  'hidden-landscaping-fees.html',
  'hidden-loan-fees.html',
  'hidden-investment-fees.html',
  'hidden-dealership-financing-fees.html',
  'hidden-phone-bill-fees.html',
  'ai-invoice-analyzer.html',
  'analyze-my-bill.html',
  'analyze-my-invoice.html',
  'medical-bill-audit.html',
  'duplicate-medical-billing-charges.html',
  'ai-estimate-review.html',
  'ai-receipt-analyzer.html',
  'ai-quote-review.html',
  'hiddenfeeai-vs-lawyer-review.html',
  'negotiate-bills.html',
  'medical-bill-negotiation-template.html',
  'medical-debt-negotiation.html'
];

let fixed = 0;
for (const page of [...new Set(pagesToFix)]) {
  if (!fs.existsSync(page)) {
    console.log(`  SKIP: ${page} not found`);
    continue;
  }
  let content = fs.readFileSync(page, 'utf8');
  
  // Find current canonical
  const canMatch = content.match(/<link rel="canonical" href="https:\/\/detecthiddenfees\.com\/([^"]+)"/);
  if (canMatch) {
    const currentCanon = canMatch[1];
    // If canonical doesn't match the page's own URL, fix it
    if (currentCanon !== page) {
      const correctCanon = `<link rel="canonical" href="https://detecthiddenfees.com/${page}"/>`;
      content = content.replace(canMatch[0], correctCanon);
      fs.writeFileSync(page, content, 'utf8');
      fixed++;
      console.log(`  FIXED: ${page} (was pointing to ${currentCanon})`);
    }
  }
}

// Fix alphabet-links.html - add footer
console.log('\n=== FIXING ALPHABET-LINKS FOOTER ===');
if (fs.existsSync('alphabet-links.html')) {
  let content = fs.readFileSync('alphabet-links.html', 'utf8');
  // Get the footer from another page
  const footerFrom = fs.readFileSync('index.html', 'utf8');
  const footerMatch = footerFrom.match(/<footer>[\s\S]*?<\/footer>/);
  if (footerMatch && !content.includes('footer-column')) {
    // Check if page has </body> tag
    if (content.includes('</body>')) {
      content = content.replace('</body>', footerMatch[0] + '\n</body>');
      fs.writeFileSync('alphabet-links.html', content, 'utf8');
      console.log('  FIXED: alphabet-links.html - added footer');
    } else {
      content += '\n' + footerMatch[0] + '\n</body></html>';
      fs.writeFileSync('alphabet-links.html', content, 'utf8');
      console.log('  FIXED: alphabet-links.html - added footer (no closing body)');
    }
  }
}

console.log(`\n=== COMPLETE: ${fixed} canonical URLs fixed ===`);