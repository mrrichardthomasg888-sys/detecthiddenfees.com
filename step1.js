const fs = require('fs');
const orig = fs.readFileSync('hidden-contract-fees.html','utf8');
// Find content section boundaries
const marker = '<section class="section" style="padding-top:10px;"><div class="container long-content">';
const start = orig.indexOf(marker);
const end = orig.indexOf('</div></section>', start) + 16;
const oldContent = orig.substring(start, end);
console.log('Found content at ' + start + ' to ' + end);
fs.writeFileSync('_old_content.txt', oldContent);
console.log('Old content length: ' + oldContent.length);
