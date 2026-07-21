const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('_') && f !== 'build-sitemap.js' && f !== 'gold_standard_upgrade.js');
const now = new Date().toISOString().split('T')[0];
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
xml += '<url><loc>https://detecthiddenfees.com/</loc><lastmod>' + now + '</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n';
files.forEach(f => {
  xml += '<url><loc>https://detecthiddenfees.com/' + f + '</loc><lastmod>' + now + '</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n';
});
xml += '</urlset>';
fs.writeFileSync('sitemap.xml', xml, 'utf-8');
console.log('Sitemap updated with ' + (files.length + 1) + ' URLs');
