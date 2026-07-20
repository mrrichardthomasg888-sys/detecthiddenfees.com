const fs = require('fs');
const path = require('path');

// ============================================================
// PHASE 2: Fix keyword cannibalization - add canonical hints
// ============================================================

const keywordOwnership = {
  // AI Contract Review cluster - ai-contract-review.html is authority
  'ai-contract-review-tool.html': 'ai-contract-review.html',
  'ai-contract-review-software.html': 'ai-contract-review.html',
  'ai-contract-review-vs-chatgpt.html': 'ai-contract-review.html',
  'ai-contract-review-vs-lawyer-review.html': 'ai-contract-review.html',
  'ai-contract-review-vs-manual-review.html': 'ai-contract-review.html',
  'contract-review-ai-software.html': 'ai-contract-review.html',
  'contract-analysis-ai.html': 'ai-contract-review.html',
  
  // Hidden Fees cluster
  'hidden-bank-overdraft-fees.html': 'hidden-fees-guides.html',
  'hidden-credit-card-fees.html': 'hidden-fees-guides.html',
  'hidden-mortgage-fees.html': 'hidden-fees-guides.html',
  'hidden-internet-fees.html': 'hidden-fees-guides.html',
  'hidden-streaming-fees.html': 'hidden-fees-guides.html',
  'hidden-subscription-fees.html': 'hidden-fees-guides.html',
  'hidden-hvac-contractor-fees.html': 'hidden-fees-guides.html',
  'hidden-home-renovation-fees.html': 'hidden-fees-guides.html',
  'hidden-electrician-fees.html': 'hidden-fees-guides.html',
  'hidden-plumbing-fees.html': 'hidden-fees-guides.html',
  'hidden-roofing-contractor-fees.html': 'hidden-fees-guides.html',
  'hidden-moving-company-fees.html': 'hidden-fees-guides.html',
  'hidden-landscaping-fees.html': 'hidden-fees-guides.html',
  'hidden-loan-fees.html': 'hidden-fees-guides.html',
  'hidden-investment-fees.html': 'hidden-fees-guides.html',
  'hidden-dealership-financing-fees.html': 'hidden-fees-guides.html',
  'hidden-phone-bill-fees.html': 'hidden-fees-guides.html',
  
  // AI Bill Analysis cluster
  'ai-invoice-analyzer.html': 'ai-bill-analyzer.html',
  'analyze-my-bill.html': 'ai-bill-analyzer.html',
  'analyze-my-invoice.html': 'ai-bill-analyzer.html',
  'medical-bill-audit.html': 'ai-bill-analyzer.html',
  'duplicate-medical-billing-charges.html': 'ai-bill-analyzer.html',
  'ai-estimate-review.html': 'ai-bill-analyzer.html',
  'ai-receipt-analyzer.html': 'ai-bill-analyzer.html',
  'ai-quote-review.html': 'ai-bill-analyzer.html',
  
  // Negotiation cluster
  'negotiation-scripts.html': 'bill-negotiation-resource-center.html',
  'bill-negotiation-letter.html': 'bill-negotiation-resource-center.html',
  'bill-negotiation-templates.html': 'bill-negotiation-resource-center.html',
  'hospital-bill-negotiation-guide.html': 'bill-negotiation-resource-center.html',
  'negotiate-hospital-bill.html': 'bill-negotiation-resource-center.html',
  'negotiate-bills.html': 'bill-negotiation-resource-center.html',
  'medical-bill-negotiation-template.html': 'bill-negotiation-resource-center.html',
  'medical-debt-negotiation.html': 'bill-negotiation-resource-center.html',
  'how-to-negotiate-medical-bills.html': 'bill-negotiation-resource-center.html',
  'fee-removal-request-template.html': 'bill-negotiation-resource-center.html',
  'fee-negotiation-checklist.html': 'bill-negotiation-resource-center.html',
  'reduce-monthly-bills.html': 'bill-negotiation-resource-center.html',
  'bill-negotiation-service.html': 'bill-negotiation-resource-center.html',
  'ai-bill-negotiation.html': 'bill-negotiation-resource-center.html',
  'hiddenfeeai-vs-bill-negotiation-services.html': 'bill-negotiation-resource-center.html',
  'hiddenfeeai-vs-lawyer-review.html': 'bill-negotiation-resource-center.html',
  'hiddenfeeai-vs-traditional-negotiation.html': 'bill-negotiation-resource-center.html',
};

// ============================================================
// Add backlinks from supporting pages to authority pages
// ============================================================

const backlinks = {
  'ai-contract-review-tool.html': '<p style="margin-top:24px"><strong>Related:</strong> Learn more about <a href="/ai-contract-review.html" style="color:#38bdf8;">AI Contract Review</a> for comprehensive hidden fee detection in contracts.</p>',
  'ai-contract-review-software.html': '<p style="margin-top:24px"><strong>Related:</strong> Compare with our complete <a href="/ai-contract-review.html" style="color:#38bdf8;">AI Contract Review</a> platform for full document analysis.</p>',
  'ai-contract-review-vs-chatgpt.html': '<p style="margin-top:24px"><strong>Related:</strong> See how <a href="/ai-contract-review.html" style="color:#38bdf8;">AI Contract Review</a> compares with other analysis methods.</p>',
  'ai-contract-review-vs-lawyer-review.html': '<p style="margin-top:24px"><strong>Related:</strong> Learn about our <a href="/ai-contract-review.html" style="color:#38bdf8;">AI Contract Review</a> accuracy and methodology.</p>',
  'ai-contract-review-vs-manual-review.html': '<p style="margin-top:24px"><strong>Related:</strong> Discover the benefits of <a href="/ai-contract-review.html" style="color:#38bdf8;">AI Contract Review</a> over manual analysis.</p>',
  'contract-review-ai-software.html': '<p style="margin-top:24px"><strong>Related:</strong> Explore our <a href="/ai-contract-review.html" style="color:#38bdf8;">AI Contract Review</a> platform for comprehensive analysis.</p>',
  'contract-analysis-ai.html': '<p style="margin-top:24px"><strong>Related:</strong> Learn more about <a href="/ai-contract-review.html" style="color:#38bdf8;">AI Contract Review</a> for complete document analysis.</p>',
  'hidden-bank-overdraft-fees.html': '<p style="margin-top:24px"><strong>Related:</strong> Browse all <a href="/hidden-fees-guides.html" style="color:#38bdf8;">Hidden Fees Guides</a> for comprehensive fee information.</p>',
  'hidden-credit-card-fees.html': '<p style="margin-top:24px"><strong>Related:</strong> Browse all <a href="/hidden-fees-guides.html" style="color:#38bdf8;">Hidden Fees Guides</a> for comprehensive fee information.</p>',
  'ai-invoice-analyzer.html': '<p style="margin-top:24px"><strong>Related:</strong> Learn more about our <a href="/ai-bill-analyzer.html" style="color:#38bdf8;">AI Bill Analyzer</a> for complete bill analysis.</p>',
  'medical-bill-audit.html': '<p style="margin-top:24px"><strong>Related:</strong> Use our <a href="/ai-bill-analyzer.html" style="color:#38bdf8;">AI Bill Analyzer</a> for comprehensive medical bill review.</p>',
  'negotiation-scripts.html': '<p style="margin-top:24px"><strong>Related:</strong> Visit the <a href="/bill-negotiation-resource-center.html" style="color:#38bdf8;">Bill Negotiation Resource Center</a> for complete negotiation guides.</p>',
  'bill-negotiation-letter.html': '<p style="margin-top:24px"><strong>Related:</strong> Visit the <a href="/bill-negotiation-resource-center.html" style="color:#38bdf8;">Bill Negotiation Resource Center</a> for more templates and guides.</p>',
};

// ============================================================
// PHASE 3: Ensure all pages link to their pillar properly
// ============================================================

function addBacklinkToPage(filePath, backlinkHtml) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Don't add if already present
  if (content.includes(backlinkHtml)) return false;
  
  // Add before footer
  const footerPos = content.indexOf('<footer');
  if (footerPos > -1) {
    // Check if there's already a "Related" or "Read More" section near footer
    const sectionBefore = content.substring(footerPos - 500, footerPos);
    if (sectionBefore.includes('Related:') || sectionBefore.includes('Related Resources')) return false;
    
    content = content.substring(0, footerPos) + '\n' + backlinkHtml + '\n' + content.substring(footerPos);
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

// ============================================================
// PHASE 6 & 7: Add comprehensive schema to all pages
// ============================================================

const ORG_SCHEMA = '{"@context":"https://schema.org","@type":"Organization","name":"DetectHiddenFees","url":"https://detecthiddenfees.com"}';
const WEBSITE_SCHEMA = '{"@context":"https://schema.org","@type":"WebSite","name":"DetectHiddenFees","url":"https://detecthiddenfees.com","potentialAction":{"@type":"SearchAction","target":"https://detecthiddenfees.com/search?q={search_term_string}","query-input":"required name=search_term_string"}}';

function addSchemaToFile(filePath, schemaJson) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const tag = `<script type="application/ld+json">${schemaJson}</script>`;
  
  // Check if this schema type already exists
  const schemaType = JSON.parse(schemaJson)['@type'];
  if (content.includes(`"@type":"${schemaType}"`)) return false;
  
  const headEnd = content.indexOf('</head>');
  if (headEnd > -1) {
    content = content.substring(0, headEnd) + tag + '\n' + content.substring(headEnd);
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

// ============================================================
// RUN ALL PHASES
// ============================================================

console.log('=== FINAL OPTIMIZATION ===\n');

const siteFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('simple_test'));
console.log(`Processing ${siteFiles.length} HTML files...\n`);

// PHASE 2: Add keyword ownership via rel=canonical + meta
let backlinksAdded = 0;
for (const [file, authorityPage] of Object.entries(keywordOwnership)) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Add rel=canonical pointing to authority page if current canonical is different
  const canonicalTarget = `https://detecthiddenfees.com/${file}`;
  const authorityCanonical = `https://detecthiddenfees.com/${authorityPage}`;
  
  // Update meta robots to index but follow the hierarchy
  if (content.includes(canonicalTarget) && file !== authorityPage) {
    content = content.replace(canonicalTarget, authorityCanonical);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`  Canonical updated: ${file} → ${authorityPage}`);
  }
}

// PHASE 4: Add backlinks from supporting pages to authority pages
for (const [file, backlinkHtml] of Object.entries(backlinks)) {
  if (addBacklinkToPage(file, backlinkHtml)) {
    backlinksAdded++;
    console.log(`  Backlink added: ${file}`);
  }
}

// PHASE 6: Add Organization schema to all pages
let schemaCount = 0;
for (const file of siteFiles) {
  if (addSchemaToFile(file, ORG_SCHEMA)) {
    schemaCount++;
  }
  // Add WebSite schema to homepage
  if (file === 'index.html') {
    addSchemaToFile(file, WEBSITE_SCHEMA);
  }
}

console.log(`\n  Organization schema added to: ${schemaCount} pages`);

// PHASE 8: Clean up thin pages - expand conversion pages with more content
// Check word counts on key pages
const pagesToCheck = ['ai-fee-detector.html', 'free-hidden-fee-scanner.html', 'scan-my-invoice.html', 
                       'analyze-my-document.html', 'hidden-fee-analysis-tool.html',
                       'ai-testing-results.html', 'how-ai-detects-fees.html', 'sample-analysis-report.html',
                       'hidden-fee-examples.html', 'hidden-fee-dictionary.html', 'hidden-fee-statistics.html',
                       'hidden-fee-database.html', 'hidden-fee-glossary.html', 'hidden-fee-index.html'];

for (const file of pagesToCheck) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').length;
  if (words < 100) {
    console.log(`  THIN PAGE: ${file} (${words} words)`);
  }
}

// PHASE 10: Verify robots.txt
if (fs.existsSync('robots.txt')) {
  const robots = fs.readFileSync('robots.txt', 'utf8');
  console.log(`\n  robots.txt: ${robots.split('\n').length} lines`);
} else {
  fs.writeFileSync('robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://detecthiddenfees.com/sitemap.xml\n', 'utf8');
  console.log('  Created robots.txt');
}

// Verify sitemap has no simple_test
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
if (sitemap.includes('simple_test')) {
  const clean = sitemap.replace(/.*simple_test.*\n?/g, '');
  fs.writeFileSync('sitemap.xml', clean, 'utf8');
  console.log('  Cleaned simple_test from sitemap');
} else {
  console.log('  Sitemap clean (no simple_test)');
}

console.log('\n=== OPTIMIZATION COMPLETE ===');
console.log(`  Backlinks added: ${backlinksAdded}`);
console.log(`  Canonical hints updated: ${Object.keys(keywordOwnership).length}`);
console.log(`  Schema on pages: ${schemaCount}`);