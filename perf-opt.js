const fs = require('fs');
const files = fs.readdirSync('.').filter(e => e.endsWith('.html') && !e.startsWith('_'));
let stats = { preconnect:0, preload:0, prefetch:0, displaySwap:0 };

files.forEach(fn => {
  let c = fs.readFileSync(fn, 'utf8');
  let before = c;

  // 1. Add preconnect for fonts.gstatic.com (Google Fonts CDN)
  if (c.includes('fonts.googleapis.com') && !c.includes('fonts.gstatic.com') && !c.includes('fonts.gstatic.com')) {
    c = c.replace('<link rel="preconnect" href="https://fonts.googleapis.com"/>', 
      '<link rel="preconnect" href="https://fonts.googleapis.com"/>\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />');
    stats.preconnect++;
  }

  // 2. Add preload for Inter font if Google Fonts link exists
  if (c.includes('fonts.googleapis.com/css2') && !c.includes('preload" href="https://fonts.gstatic.com/s/inter/')) {
    c = c.replace('</title>', '</title>\n<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />\n<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" />');
    stats.preload++;
  }

  // 3. Add dns-prefetch for hiddenfeeai.com
  if (c.includes('hiddenfeeai.com') && !c.includes('dns-prefetch hiddenfeeai')) {
    c = c.replace('<meta name="theme-color"', '<link rel="dns-prefetch" href="https://hiddenfeeai.com" />\n    <meta name="theme-color"');
    stats.prefetch++;
  }

  // 4. Add font-display:swap if missing
  if (c.includes('fonts.googleapis.com') && !c.includes('display=swap')) {
    c = c.replace(/href="https:\/\/fonts\.googleapis\.com\/css2\?family=([^"]+)"/, 'href="https://fonts.googleapis.com/css2?family=$1&display=swap"');
    stats.displaySwap++;
  }

  if (c !== before) {
    fs.writeFileSync(fn, c, 'utf8');
  }
});

console.log('Fixes applied:');
console.log('  preconnect for fonts.gstatic.com:', stats.preconnect);
console.log('  preload Inter font:', stats.preload);
console.log('  dns-prefetch hiddenfeeai:', stats.prefetch);
console.log('  font-display:swap added:', stats.displaySwap);
console.log('DONE');
