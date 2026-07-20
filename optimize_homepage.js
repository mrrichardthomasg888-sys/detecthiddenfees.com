const fs = require('fs');
const path = require('path');

console.log('=== OPTIMIZING INDEX.HTML FOR PERFORMANCE + SEO ===\n');

let html = fs.readFileSync('index.html', 'utf8');
let changes = [];

// --- 1. Add dns-prefetch + preconnect for hiddenfeeai.com ---
if (!html.includes('dns-prefetch')) {
  // Insert before first <style> tag
  const insertPoint = html.indexOf('</title>') + 9;
  html = html.slice(0, insertPoint) + 
    '\n    <link rel="dns-prefetch" href="https://hiddenfeeai.com" />\n' +
    '    <link rel="preconnect" href="https://hiddenfeeai.com" crossorigin />\n' +
    '    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />\n' +
    '    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />' +
    html.slice(insertPoint);
  changes.push('Added dns-prefetch + preconnect for hiddenfeeai.com');
}

// --- 2. Add rel="noopener noreferrer" to external CTA links ---
html = html.replace(/href="https:\/\/hiddenfeeai\.com"/g, 'href="https://hiddenfeeai.com" rel="noopener noreferrer"');
changes.push('Added rel=noopener noreferrer to hiddenfeeai.com links');

// --- 3. Remove duplicate Organization schema (keep only first) ---
const schemaRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/g;
let schemas = [];
let match;
let fixedHtml = html;
while ((match = schemaRegex.exec(html)) !== null) {
  schemas.push({ index: match.index, content: match[0] });
}

// Count Organization schemas
let orgSchemas = schemas.filter(s => s.content.includes('"Organization"'));
if (orgSchemas.length > 1) {
  // Keep only the first Organization schema (typically in the structured section)
  const toRemove = orgSchemas.slice(1);
  for (const s of toRemove) {
    fixedHtml = fixedHtml.replace(s.content, '');
  }
  changes.push(`Removed ${toRemove.length} duplicate Organization schema(s)`);
}

// Count WebSite schemas
let webSchemas = schemas.filter(s => s.content.includes('"WebSite"'));
if (webSchemas.length > 1) {
  const toRemove = webSchemas.slice(1);
  for (const s of toRemove) {
    fixedHtml = fixedHtml.replace(s.content, '');
  }
  changes.push(`Removed ${toRemove.length} duplicate WebSite schema(s)`);
}

html = fixedHtml;

// --- 4. Lazy-load badge images ---
html = html.replace(/<img src="https:\/\/buildlist\.io\/badge\.svg"/g, '<img loading="lazy" src="https://buildlist.io/badge.svg"');
html = html.replace(/<img src="https:\/\/www\.listbulb\.com\/featured-on-listbulb-dark\.svg"/g, '<img loading="lazy" src="https://www.listbulb.com/featured-on-listbulb-dark.svg"');
html = html.replace(/<img src="https:\/\/www\.stork\.ai\/badge\/verified-dark\.svg"/g, '<img loading="lazy" src="https://www.stork.ai/badge/verified-dark.svg"');
changes.push('Added loading=lazy to badge images');

// --- 5. Remove hover gradient animation from primary-btn (expensive) ---
html = html.replace(/\.primary-btn::before \{[\s\S]*?\}/, 
  '.primary-btn::before { content:\'\';position:absolute;inset:-4px;border-radius:22px;background:linear-gradient(135deg,#2563eb,#a855f7,#2563eb);z-index:-1;opacity:0;transition:opacity 0.3s}');
changes.push('Simplified primary-btn::before (removed shimmer animation)');

// --- 6. Reduce expensive blur/backdrop-filter values slightly ---
html = html.replace(/filter: blur\(150px\)/g, 'filter: blur(100px)');
html = html.replace(/filter: blur\(180px\)/g, 'filter: blur(120px)');
html = html.replace(/filter: blur\(140px\)/g, 'filter: blur(90px)');
changes.push('Reduced blur filter intensity for performance');

// --- 7. Remove duplicate .hero h1 animation: line ---
// The hero h1 had duplicate animation properties
html = html.replace(
  `            animation: fadeUp 1s ease 0.15s forwards, gradientShift 8s ease infinite;`, 
  `            animation: fadeUp 1s ease 0.15s forwards, gradientShift 8s ease infinite;`
);
// Actually there was a duplicate - remove second animation declaration
html = html.replace(
  `            opacity: 1;\n            animation: fadeUp 1s ease 0.15s forwards;\n            text-shadow:`,
  `            opacity: 1;\n            text-shadow:`
);
changes.push('Removed duplicate animation property on h1');

// --- 8. Optimize Google Fonts loading ---
html = html.replace(
  '    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />',
  '    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />'
);
changes.push('Removed unused font weight 500 from Google Fonts');

// --- 9. Remove Review schema from SoftwareApplication (self-review) ---
const reviewSchemaRegex = /"review":\s*\{[^}]*"ratingValue":\s*"[^"]*"[^}]*\}/;
html = html.replace(reviewSchemaRegex, '');
changes.push('Removed self-review schema from SoftwareApplication');

// --- 10. Verify About page has no fictional people ---
const aboutContent = fs.readFileSync('about-detect-hidden-fees.html', 'utf8');
if (aboutContent.includes('Michael Torres') || aboutContent.includes('Richard Thomas') || aboutContent.includes('Dr. Sarah Chen')) {
  console.log('WARNING: About page still contains fictional people!');
} else {
  changes.push('About page verified: no fictional people found');
}

if (changes.length > 0) {
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Changes made:');
  changes.forEach(c => console.log('  ✓ ' + c));
  console.log('\nIndex.html optimized successfully');
} else {
  console.log('No changes needed');
}

// --- Verify results ---
let verify = fs.readFileSync('index.html', 'utf8');
console.log('\n=== VERIFICATION ===');
console.log('hiddenfeeai.com dns-prefetch:', verify.includes('dns-prefetch') && verify.includes('hiddenfeeai'));
console.log('rel=noopener:', (verify.match(/noopener/g) || []).length + ' instances');
console.log('loading=lazy on badges:', (verify.match(/loading="lazy"/g) || []).length + ' instances');
console.log('Schema Organization count:', (verify.match(/"Organization"/g) || []).length);
console.log('Schema WebSite count:', (verify.match(/"WebSite"/g) || []).length);