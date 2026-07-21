const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('_') && f !== 'build-sitemap.js' && f !== 'gold_standard_upgrade.js');
const now = new Date().toISOString().split('T')[0];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Homepage first
xml += '  <url>\n';
xml += '    <loc>https://detecthiddenfees.com/</loc>\n';
xml += '    <lastmod>' + now + '</lastmod>\n';
xml += '    <changefreq>daily</changefreq>\n';
xml += '    <priority>1.0</priority>\n';
xml += '  </url>\n';

// All other pages
files.forEach(f => {
  xml += '  <url>\n';
  xml += '    <loc>https://detecthiddenfees.com/' + f + '</loc>\n';
  xml += '    <lastmod>' + now + '</lastmod>\n';
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.8</priority>\n';
  xml += '  </url>\n';
});

xml += '</urlset>';

fs.writeFileSync('sitemap.xml', xml, 'utf-8');
console.log('Sitemap updated with ' + (files.length + 1) + ' properly formatted XML URLs');
