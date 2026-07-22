const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/lynns/Downloads/detecthiddenfees.com';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('_') && f !== 'test_long.html' && f !== 'test_mini.html' && f !== 'test_check.html' && f !== '_test123.html' && f !== 'test_out.html');

console.log('Scanning ' + files.length + ' files...');
let fixed = 0;

files.forEach(file => {
    const fp = path.join(dir, file);
    let c = fs.readFileSync(fp, 'utf8');
    let orig = c;
    
    // Fix 1: DetectHiddenFees<span>.</span> -> Detect<span>HiddenFees</span>
    c = c.replace(/DetectHiddenFees<span>\.<\/span>/g, 'Detect<span>HiddenFees</span>');
    
    // Fix 2: <a class="logo"> DetectHiddenFees <\/a> (with spaces)
    c = c.replace(/<a ([^>]*)class="logo"> DetechiddenFees <\/a>/g, '<a $1class="logo">Detect<span>HiddenFees</span></a>');
    
    // Fix 3: <a class="logo">DetectHiddenFees<\/a> (no spaces)
    c = c.replace(/<a ([^>]*)class="logo">DetectHiddenFees<\/a>/g, '<a $1class="logo">Detect<span>HiddenFees</span></a>');
    
    // Fix 4: <div class="logo">DetectHiddenFees<\/div>
    c = c.replace(/<div class="logo">DetectHiddenFees<\/div>/g, '<div class="logo">Detect<span>HiddenFees</span></div>');
    
    // Fix 5: <div class="logo">DetectHiddenFees followed by anything except <span>
    c = c.replace(/<div class="logo">DetectHiddenFees(?!<\/span>)/g, '<div class="logo">Detect<span>HiddenFees</span>');
    
    // Add .logo span CSS if missing
    if (c.indexOf('.logo {') > -1 && c.indexOf('.logo span') === -1) {
        c = c.replace('.logo {', '.logo span { color: #3b82f6; }\n        .logo {');
    }
    
    if (c !== orig) {
        fs.writeFileSync(fp, c, 'utf8');
        fixed++;
        console.log('FIXED: ' + file);
    }
});

console.log('\\nTotal pages fixed: ' + fixed);
