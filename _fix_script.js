const fs = require('fs');
const files = fs.readdirSync('.').filter(f => /\.html$/.test(f));
const results = [];
files.forEach(f => {
  const h = fs.readFileSync(f, 'utf-8');
  const pattern = '<script id="pdfScript">';
  const has = h.indexOf(pattern);
  results.push(f + ': ' + (has > -1 ? 'BROKEN at ' + has : 'OK'));
});
results.forEach(r => console.log(r));