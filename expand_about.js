const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\lynns\\Downloads\\detecthiddenfees.com';

const content = fs.readFileSync(path.join(dir, 'content_about.txt'), 'utf8');
const fp = path.join(dir, 'about-detect-hidden-fees.html');
let c = fs.readFileSync(fp, 'utf8');
const start = c.indexOf('class="container long-content"');
const h2 = c.indexOf('<h2>', start);
const se = c.indexOf('</section>', h2);
c = c.substring(0, h2) + '\n' + content + '\n' + c.substring(se);
fs.writeFileSync(fp, c, 'utf8');
console.log('Done');
