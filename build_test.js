const fs = require('fs');
const style = fs.readFileSync('_style.txt','utf8');
console.log('Style loaded: ' + style.length);
