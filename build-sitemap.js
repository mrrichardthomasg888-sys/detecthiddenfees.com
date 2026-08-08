const fs = require('fs');

const excludePatterns = [
  /^test/i, /^temp/i, /^draft/i, /^header/i, /^footer/i, /^partial/i, /^include/i,
  /^out/i, /^final/i, /^hdr/i, /^headpart/i, /^_/i, /^0/i, /^1/i, /^2/i, /^3/i, /^4/i,
  /^5/i, /^6/i, /^7/i, /^8/i, /^9/i
];

const excludeExact = [
  'index.html', 'final.html', 'hdr.html', 'header.html', 'headpart.html',
  'out0.html', 'out1.html', 'part1.html', 'test_check.html', 'test_long.html',
  'test_mini.html', 'test_out.html', '_source_copy.html', '_test123.html',
  'build-pages.js', 'build-sitemap.js', 'gold_standard_upgrade.js', 'al.txt', 'alinks.txt'
];

// Redirect aliases must never be advertised as indexable sitemap URLs.
// Normalize .html redirect sources to the extensionless URL form used by the site.
const redirectSources = new Set();
if (fs.existsSync('_redirects')) {
  for (const line of fs.readFileSync('_redirects', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*(\/\S+)\s+\S+\s+(?:301|302|307|308)\b/);
    if (match) redirectSources.add(match[1].replace(/\.html$/i, ''));
  }
}

function pagePath(file) {
  return '/' + file.replace(/\.html$/i, '');
}

function canonicalFor(file) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i);
  const href = match && match[0].match(/\bhref=["']([^"']+)/i);
  return href ? href[1] : null;
}

const files = fs.readdirSync('.').filter(f => {
  if (!f.endsWith('.html')) return false;
  if (excludeExact.includes(f)) return false;
  if (excludePatterns.some(p => p.test(f))) return false;
  if (redirectSources.has(pagePath(f))) return false;
  if (canonicalFor(f) !== 'https://detecthiddenfees.com' + pagePath(f)) return false;
  return true;
});

const now = new Date().toISOString().split('T')[0];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Only homepage at / not /index.html
xml += '  <url>\n';
xml += '    <loc>https://detecthiddenfees.com/</loc>\n';
xml += '    <lastmod>' + now + '</lastmod>\n';
xml += '    <changefreq>daily</changefreq>\n';
xml += '    <priority>1.0</priority>\n';
xml += '  </url>\n';

// All production pages sorted alphabetically
files.sort().forEach(f => {
  xml += '  <url>\n';
  xml += '    <loc>https://detecthiddenfees.com' + pagePath(f) + '</loc>\n';
  xml += '    <lastmod>' + now + '</lastmod>\n';
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.8</priority>\n';
  xml += '  </url>\n';
});

xml += '</urlset>';

fs.writeFileSync('sitemap.xml', xml, 'utf-8');
console.log('Sitemap updated with ' + (files.length + 1) + ' production URLs');
console.log('Filtered out template/test files');
