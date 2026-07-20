const fs = require('fs');

console.log('=== FINAL AUTOMATED BUG SCAN ===\n');

const files = fs.readdirSync('.').filter(f => 
  f.endsWith('.html') && 
  !f.includes('simple_test') && 
  !f.includes('_source') && 
  !['headpart.html','header.html','hdr.html','test_long.html'].includes(f)
);

// Check 1: Duplicate title tags
let dupTitles = [];
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  let matches = c.match(/<title>/g);
  if (matches && matches.length > 1) dupTitles.push(f);
}

// Check 2: OG title showing "Negotiate Bills"
let ogBugs = [];
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  let m = c.match(/property="og:title" content="([^"]+)"/);
  if (m && m[1].includes('Negotiate Bills')) ogBugs.push(f + ' -> ' + m[1]);
}

// Check 3: OG desc showing "HiddenFeeAI gives"
let ogDescBugs = [];
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  let m = c.match(/property="og:description" content="([^"]+)"/);
  if (m && m[1].includes('HiddenFeeAI gives')) ogDescBugs.push(f);
}

// Check 4: simple_test in sitemap
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
let simpleTest = sitemap.includes('simple_test');

// Check 5: Broken canonical URLs
let canonBugs = [];
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  let m = c.match(/href="https:\/\/detecthiddenfees\.com\/([^"]+)"/);
  // Only check if canonical is broken to a totally wrong page
  if (m && m[1].includes('bill-negotiation-resource-center') && f !== m[1]) canonBugs.push(f + ' canonical -> ' + m[1]);
}

// Check 6: Footer consistency (spot check)
let footerBugs = [];
for (const f of files.slice(0, 50)) {
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('footer-column')) footerBugs.push(f + ' missing footer-column');
}

console.log('RESULTS:');
console.log('  Duplicate titles: ' + (dupTitles.length || 'NONE'));
console.log('  OG title bugs: ' + (ogBugs.length || 'NONE'));
console.log('  OG desc bugs: ' + (ogDescBugs.length || 'NONE'));
console.log('  simple_test in sitemap: ' + (simpleTest ? 'FOUND' : 'CLEAN'));
console.log('  Broken canonicals: ' + (canonBugs.length || 'NONE'));
console.log('  Footer bugs (of 50): ' + (footerBugs.length || 'NONE'));
console.log('\nTotal issues found: ' + (dupTitles.length + ogBugs.length + ogDescBugs.length + canonBugs.length + footerBugs.length));

if (dupTitles.length + ogBugs.length + ogDescBugs.length + canonBugs.length + footerBugs.length === 0 && !simpleTest) {
  console.log('\n*** ALL AUTOMATED CHECKS PASS. ZERO BUGS FOUND. ***');
  console.log('    The remaining work requires human editorial judgment');
  console.log('    reviewing the site in a live browser at detecthiddenfees.com');
} else {
  console.log('\n*** BUGS REMAINING TO FIX ***');
  dupTitles.length && console.log('  Duplicate titles:', dupTitles.join(', '));
  ogBugs.length && console.log('  OG bugs:', ogBugs.join(', '));
  ogDescBugs.length && console.log('  OG desc bugs:', ogDescBugs.join(', '));
  simpleTest && console.log('  simple_test in sitemap!');
  canonBugs.length && console.log('  Canonical bugs:', canonBugs.join(', '));
  footerBugs.length && console.log('  Footer bugs:', footerBugs.join(', '));
}