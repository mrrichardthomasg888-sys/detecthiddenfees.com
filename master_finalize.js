const fs = require('fs');

// ============================================================
// PHASE 9: Fix sitemap priorities
// ============================================================

const PRIORITY = {
  // Homepage
  'index.html': '1.0',
  
  // Authority pillar pages
  'hidden-fees-guides.html': '0.9',
  'ai-bill-analyzer.html': '0.9',
  'ai-contract-review.html': '0.9',
  'bill-negotiation-resource-center.html': '0.9',
  
  // E-E-A-T / trust pages
  'about-detect-hidden-fees.html': '0.7',
  'how-detect-hidden-fees-works.html': '0.7',
  'ai-accuracy-and-limitations.html': '0.7',
  'ai-analysis-methodology.html': '0.7',
  'research-methodology.html': '0.7',
  'editorial-policy.html': '0.7',
  'editorial-methodology.html': '0.7',
  'privacy-and-ai-security.html': '0.7',
  'security-overview.html': '0.7',
  'data-handling-policy.html': '0.7',
  'ai-transparency-report.html': '0.7',
  'our-evaluation-process.html': '0.7',
  'ai-testing-results.html': '0.7',
  'how-ai-detects-fees.html': '0.7',
  'sample-analysis-report.html': '0.7',
  
  // Supporting hidden fees pages
  'hidden-fee-database.html': '0.8',
  'hidden-fee-examples.html': '0.8',
  'hidden-fee-dictionary.html': '0.8',
  'hidden-fee-glossary.html': '0.8',
  'hidden-fee-index.html': '0.8',
  'hidden-fee-statistics.html': '0.8',
  'hidden-fee-reports.html': '0.8',
  'hidden-fee-risk-score.html': '0.8',
  'hidden-fee-prevention-guide.html': '0.8',
  'hidden-fee-calculator.html': '0.8',
  'hidden-fee-scanner.html': '0.8',
  'hidden-fee-intelligence-center.html': '0.8',
  'hidden-fee-intelligence-engine.html': '0.8',
  'hidden-fee-knowledge-center.html': '0.8',
  'hidden-fees-resource-center.html': '0.8',
  'hidden-fee-detector.html': '0.8',
  'hidden-fee-industry-guide.html': '0.8',
  
  // Conversion / high-intent
  'ai-fee-detector.html': '0.8',
  'free-hidden-fee-scanner.html': '0.8',
  'scan-my-invoice.html': '0.8',
  'analyze-my-document.html': '0.8',
  'hidden-fee-analysis-tool.html': '0.8',
  'analyze-my-bill.html': '0.8',
  'analyze-my-contract.html': '0.8',
  'analyze-my-invoice.html': '0.8',
  'analyze-my-estimate.html': '0.8',
  'check-my-fees.html': '0.8',
};

// All other pages get 0.8
const DEFAULT_PRIORITY = '0.8';

// Read sitemap
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

// Update priorities
for (const [page, priority] of Object.entries(PRIORITY)) {
  const url = `https://detecthiddenfees.com/${page}`;
  const oldEntry = `<url><loc>${url}</loc><priority>0.8</priority></url>`;
  const newEntry = `<url><loc>${url}</loc><priority>${priority}</priority></url>`;
  
  if (sitemap.includes(oldEntry)) {
    sitemap = sitemap.replace(oldEntry, newEntry);
    console.log(`  Priority ${priority}: ${page}`);
  }
}

// Ensure homepage is 1.0
const homeEntry = `<url><loc>https://detecthiddenfees.com/</loc><priority>1.0</priority></url>`;
if (sitemap.includes('<url><loc>https://detecthiddenfees.com/</loc><priority>0.8</priority></url>')) {
  sitemap = sitemap.replace('<url><loc>https://detecthiddenfees.com/</loc><priority>0.8</priority></url>', homeEntry);
  console.log('  Priority 1.0: index.html (/)');
}

fs.writeFileSync('sitemap.xml', sitemap, 'utf8');

// ============================================================
// PHASE 3: Add purpose differentiation to resource pages
// ============================================================

// Add H1/H2 clarifications to resource pages that might have duplicate intent
const pagePurposeHeaders = {
  'hidden-fee-database.html': '<!-- Resource page: Searchable database of hidden fees across industries -->',
  'hidden-fee-index.html': '<!-- Resource page: A-Z directory of all hidden fee topics -->',
  'hidden-fee-glossary.html': '<!-- Resource page: Definitions of hidden fee terminology -->',
  'hidden-fee-dictionary.html': '<!-- Resource page: Simple explanations of fee-related terms -->',
  'hidden-fee-examples.html': '<!-- Resource page: Real-world examples of hidden fees in action -->',
  'hidden-fee-knowledge-center.html': '<!-- Resource page: Educational guides about fee types and avoidance -->',
  'hidden-fee-intelligence-center.html': '<!-- Resource page: Research, trends, and statistical analysis -->',
  'hidden-fee-intelligence-engine.html': '<!-- Resource page: AI-powered analysis platform information -->',
};

for (const [file, comment] of Object.entries(pagePurposeHeaders)) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if already has purpose comment
  if (content.includes(comment)) continue;
  
  // Add comment after <body>
  const bodyOpen = content.indexOf('<body');
  const bodyClose = content.indexOf('>', bodyOpen);
  if (bodyClose > -1) {
    const afterBody = bodyClose + 1;
    content = content.substring(0, afterBody) + '\n\n' + comment + '\n' + content.substring(afterBody);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`  Purpose tagged: ${file}`);
  }
}

// ============================================================
// PHASE 9: Add /analyze-my-bill link to nav on key pages if missing
// ============================================================

const navAnalyzers = [
  'hidden-fees-guides.html',
  'ai-bill-analyzer.html',
  'ai-contract-review.html',
  'bill-negotiation-resource-center.html'
];

for (const file of navAnalyzers) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if nav already has "Analyze Now" link
  if (content.includes('analyze-my-bill') && content.includes('class="nav-btn"')) continue;
  
  // Add analyze button to nav-links
  const navLinksEnd = content.indexOf('</div>', content.indexOf('nav-links'));
  if (navLinksEnd > -1) {
    const btn = `\n            <a href="/analyze-my-bill.html" class="nav-btn" style="background:linear-gradient(135deg,#2563eb,#9333ea);">Analyze Now</a>`;
    content = content.substring(0, navLinksEnd) + btn + content.substring(navLinksEnd);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`  Nav analyze button added: ${file}`);
  }
}

// ============================================================
// FINAL VERIFICATION
// ============================================================

console.log('\n=== VERIFICATION ===');
const finalSitemap = fs.readFileSync('sitemap.xml', 'utf8');

// Check priority counts
const p10 = (finalSitemap.match(/priority>1\.0</g) || []).length;
const p09 = (finalSitemap.match(/priority>0\.9</g) || []).length;
const p08 = (finalSitemap.match(/priority>0\.8</g) || []).length;
const p07 = (finalSitemap.match(/priority>0\.7</g) || []).length;

console.log(`  Priority 1.0: ${p10} pages`);
console.log(`  Priority 0.9: ${p09} pages (authority)`);
console.log(`  Priority 0.8: ${p08} pages (supporting)`);
console.log(`  Priority 0.7: ${p07} pages (trust/E-E-A-T)`);

// Check simple_test
if (finalSitemap.includes('simple_test')) {
  console.log('  WARNING: simple_test still in sitemap!');
} else {
  console.log('  simple_test: CLEAN');
}

// Check footer consistency - verify footer-column class exists
const samplePages = ['index.html', 'hidden-fees-guides.html', 'ai-bill-analyzer.html', 'ai-contract-review.html'];
for (const page of samplePages) {
  if (!fs.existsSync(page)) continue;
  const content = fs.readFileSync(page, 'utf8');
  const hasFooterClass = content.includes('footer-column');
  const hasFooter = content.includes('<footer');
  console.log(`  ${page}: footer=${hasFooter}, footer-class=${hasFooterClass}`);
}

console.log('\n=== MASTER FINALIZE COMPLETE ===');