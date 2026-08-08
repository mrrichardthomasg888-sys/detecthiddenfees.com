const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const files = [...sitemap.matchAll(/<loc>https:\/\/detecthiddenfees\.com\/([^<]*)<\/loc>/g)]
  .map(match => match[1] === '' ? 'index.html' : `${match[1]}.html`);
const tag = '<script src="/attribution.js" defer></script>';
const missing = files.filter(file => !fs.readFileSync(path.join(root, file), 'utf8').includes(tag));
const runtime = fs.readFileSync(path.join(root, 'attribution.js'), 'utf8');
const issues = [];
if (missing.length) issues.push(`missing runtime on ${missing.length} sitemap pages`);
for (const required of ['dhf_landing', 'dhf_referrer', 'dhf_session', 'dhf_cta_click', 'data-no-attribution']) {
  if (!runtime.includes(required)) issues.push(`runtime missing ${required}`);
}
if (runtime.includes('document.body') || runtime.includes('FileReader') || runtime.includes('localStorage.setItem(STORAGE_KEY, document')) {
  issues.push('runtime appears to handle document content');
}
if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
console.log(`Attribution runtime valid on ${files.length} sitemap pages; no document-content handling detected.`);
