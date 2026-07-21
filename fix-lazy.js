const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('_'));
let fixed = 0;
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf-8');
  if (c.includes('loading="lazy"loading="lazy"')) {
    c = c.split('loading="lazy"loading="lazy"').join('loading="lazy"');
    fs.writeFileSync(f, c);
    fixed++;
    console.log('FIXED: ' + f);
  }
});
console.log('Fixed ' + fixed + ' files with duplicate loading attributes');
