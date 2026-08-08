const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const slugs = [...sitemap.matchAll(/<loc>https:\/\/detecthiddenfees\.com\/([^<]*)<\/loc>/g)]
  .map(match => match[1] || 'index')
  .map(slug => slug === '' ? 'index.html' : `${slug}.html`);
const tag = '<script src="/attribution.js" defer></script>';
let changed = 0;
let missing = 0;

for (const filename of [...new Set(slugs)]) {
  const file = path.join(root, filename);
  if (!fs.existsSync(file)) {
    missing += 1;
    continue;
  }
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes(tag)) continue;
  if (!source.includes('</head>')) {
    console.warn(`Skipped without </head>: ${filename}`);
    missing += 1;
    continue;
  }
  fs.writeFileSync(file, source.replace('</head>', `${tag}</head>`), 'utf8');
  changed += 1;
}

console.log(`Added attribution runtime to ${changed} canonical pages; missing/skipped=${missing}.`);
