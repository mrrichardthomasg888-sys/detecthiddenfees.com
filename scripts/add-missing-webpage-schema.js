const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const changed = [];
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = match[1].trim();
  const slug = new URL(url).pathname.replace(/^\//, '').replace(/\/$/, '') || 'index';
  const file = path.join(ROOT, `${slug}.html`);
  if (!fs.existsSync(file)) continue;
  const original = fs.readFileSync(file, 'utf8');
  if (/application\/ld\+json/i.test(original)) continue;
  const title = ((original.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || slug).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const description = ((original.match(/<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["']([^"']*)/i) || [])[1] || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const schema = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description, url, inLanguage: 'en-US', isPartOf: { '@type': 'WebSite', name: 'DetectHiddenFees', url: 'https://detecthiddenfees.com/' } })}</script>`;
  const next = original.replace(/<\/head>/i, `${schema}</head>`);
  if (next === original) throw new Error(`Could not insert schema into ${slug}.html`);
  fs.writeFileSync(file, next, 'utf8');
  changed.push(`${slug}.html`);
}
console.log(`Added minimal WebPage JSON-LD to ${changed.length} pages: ${changed.join(', ') || 'none'}`);
