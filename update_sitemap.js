const fs = require('fs');

// Read current sitemap
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

// New pages to add
const newPages = [
  'ai-fee-detector.html',
  'free-hidden-fee-scanner.html',
  'scan-my-invoice.html',
  'analyze-my-document.html',
  'hidden-fee-analysis-tool.html'
];

// Only add if not already present
for (const page of newPages) {
  if (!sitemap.includes(page)) {
    const url = `<url><loc>https://detecthiddenfees.com/${page}</loc><priority>0.8</priority></url>\n`;
    // Insert before closing </urlset>
    sitemap = sitemap.replace('</urlset>', `  ${url}</urlset>`);
    console.log(`Added ${page} to sitemap`);
  }
}

fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log('Sitemap updated');

// Verify simple_test is gone
if (sitemap.includes('simple_test')) {
  console.log('WARNING: simple_test still in sitemap!');
  sitemap = sitemap.replace(/.*simple_test.*\n?/g, '');
  fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
  console.log('Removed simple_test from sitemap');
}