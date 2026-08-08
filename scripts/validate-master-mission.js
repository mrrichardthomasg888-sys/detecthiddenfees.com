const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://detecthiddenfees.com';
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const sitemapUrls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const redirects = new Set();
for (const line of read('_redirects').split(/\r?\n/)) {
  const match = line.match(/^\s*\/(\S+)\s+\S+\s+(?:301|302|307|308)\b/);
  if (match) redirects.add(`/${match[1].replace(/\.html$/i, '')}`);
}
const issues = [];
const stats = { pages: sitemapUrls.length, missingTitle: 0, missingDescription: 0, badCanonicalCount: 0, badH1Count: 0, missingJsonLd: 0, noindex: 0, brokenInternalLinks: 0, internalRedirectLinks: 0, legacyHtmlLinks: 0 };
const localHref = /(?:href|src)=["'](\/[^"'#?\s>]+)/gi;

for (const url of sitemapUrls) {
  const slug = new URL(url).pathname.replace(/^\//, '').replace(/\/$/, '') || 'index';
  const file = `${slug}.html`;
  if (!fs.existsSync(path.join(ROOT, file))) {
    issues.push(`${url}: missing local page file`);
    continue;
  }
  const html = read(file);
  const title = (html.match(/<title\b[^>]*>[\s\S]*?<\/title>/i) || [])[0];
  const description = (html.match(/<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["'][^"']*/i) || [])[0];
  const canonicals = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi) || [];
  const canonical = (canonicals[0]?.match(/\bhref=["']([^"']+)/i) || [])[1];
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const jsonLdCount = (html.match(/application\/ld\+json/gi) || []).length;
  const isNoindex = /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html);
  if (!title) { stats.missingTitle++; issues.push(`${file}: missing title`); }
  if (!description) { stats.missingDescription++; issues.push(`${file}: missing description`); }
  if (canonicals.length !== 1 || (canonical !== url && !(slug === 'index' && canonical === `${SITE}/`))) { stats.badCanonicalCount++; issues.push(`${file}: canonical count/value invalid`); }
  if (h1Count !== 1) { stats.badH1Count++; issues.push(`${file}: expected one H1, found ${h1Count}`); }
  if (!jsonLdCount) { stats.missingJsonLd++; issues.push(`${file}: missing JSON-LD`); }
  if (isNoindex) { stats.noindex++; issues.push(`${file}: sitemap page is noindex`); }
  let match;
  while ((match = localHref.exec(html))) {
    const href = match[1];
    if (/\.html$/i.test(href)) stats.legacyHtmlLinks++;
    if (/\.(css|js|png|jpg|jpeg|gif|svg|webp|woff2|json|csv|xml|txt)$/i.test(href) || href.startsWith('/assets/')) continue;
    if (redirects.has(href.replace(/\/$/, ''))) { stats.internalRedirectLinks++; issues.push(`${file}: links to redirect source ${href}`); continue; }
    const targetSlug = href.replace(/^\//, '').replace(/\/$/, '') || 'index';
    if (!fs.existsSync(path.join(ROOT, `${targetSlug}.html`))) { stats.brokenInternalLinks++; issues.push(`${file}: broken internal link ${href}`); }
  }
}

if (!/calculator-scan-trigger/.test(read('calculator-authority.js')) || !/scan-doc-trigger/.test(read('calculator-authority.js')) || !/action === "scan"/.test(read('calculator-authority.js'))) {
  issues.push('calculator-authority.js: scan selector/data-action compatibility contract missing');
}
if (issues.length) {
  console.error(JSON.stringify({stats, issues}, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({stats, result: 'pass'}, null, 2));
