const fs = require('fs');
const orig = fs.readFileSync('hidden-contract-fees.html','utf8');
const start = orig.indexOf('<section class="section" style="padding-top:10px;"><div class="container long-content">');
const end = orig.indexOf('</div></section>', start) + 16;
const before = orig.substring(0, start);
const after = orig.substring(end);
const newContent = [];
