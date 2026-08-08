const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://detecthiddenfees.com';
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const normalize = (url) => url.replace(/\/$/, '') || SITE;
const extract = (text, pattern) => [...text.matchAll(pattern)].map((match) => normalize(match[1].trim()));
const errors = [];
const redirects = new Set();
for (const line of read('_redirects').split(/\r?\n/)) {
  const match = line.match(/^\s*\/(\S+)\s+\S+\s+(?:301|302|307|308)\b/);
  if (match) redirects.add(normalize(`${SITE}/${match[1].replace(/\.html$/i, '')}`));
}

const sitemap = extract(read('sitemap.xml'), /<loc>([^<]+)<\/loc>/g);
const sitemapSet = new Set(sitemap);
if (new Set(sitemap).size !== sitemap.length) errors.push('sitemap contains duplicate URLs');
for (const url of sitemap) {
  if (url.endsWith('.html')) errors.push(`sitemap contains .html URL: ${url}`);
  if (redirects.has(url)) errors.push(`sitemap contains redirect source: ${url}`);
  const slug = new URL(url).pathname.replace(/^\//, '').replace(/\/$/, '') || 'index';
  const file = path.join(ROOT, `${slug}.html`);
  if (!fs.existsSync(file)) errors.push(`sitemap URL has no local HTML: ${url}`);
  else {
    const canonical = (read(`${slug}.html`).match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)/i) || [])[1];
    if (normalize(canonical || '') !== url) errors.push(`sitemap URL/canonical mismatch: ${url}`);
  }
}

const llms = [...new Set(extract(read('llms.txt'), /(https:\/\/detecthiddenfees\.com[^\s)]+)/g))];
const rss = [...new Set(extract(read('rss.xml'), /<link>(https:\/\/detecthiddenfees\.com[^<]+)<\/link>/g))];
for (const [name, urls] of [['llms.txt', llms], ['rss.xml', rss]]) {
  for (const url of urls) {
    if (!sitemapSet.has(url)) errors.push(`${name} contains non-sitemap URL: ${url}`);
    if (redirects.has(url)) errors.push(`${name} contains redirect source: ${url}`);
  }
}
if (!read('robots.txt').includes('Sitemap: https://detecthiddenfees.com/sitemap.xml')) errors.push('robots.txt does not reference the canonical sitemap');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Discovery assets valid: sitemap=${sitemap.length}, llms=${llms.length}, rss=${rss.length}.`);
