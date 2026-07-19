const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\lynns\\Downloads\\detecthiddenfees.com';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).map(f => path.join(dir, f));

const oldBtn = '.sticky-cta-bar .sticky-btn{display:inline-block;padding:12px 28px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#9333ea);color:white;font-weight:800;font-size:.95rem;box-shadow:0 8px 30px rgba(59,130,246,.35);text-align:center;min-height:48px;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;transition:transform 0.2s}';
const newBtn = '.sticky-cta-bar .sticky-btn{display:inline-block;padding:8px 18px;border-radius:10px;background:linear-gradient(135deg,#2563eb,#9333ea);color:white;font-weight:700;font-size:.85rem;box-shadow:0 8px 30px rgba(59,130,246,.35);text-align:center;min-height:34px;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;transition:transform 0.2s}';
const addLinks = '<a href="/negotiate-hospital-bill.html">Negotiate Hospital Bill</a>\n            <a href="/how-to-reduce-medical-bills.html">Reduce Medical Bills</a>\n            <a href="/medical-debt-negotiation.html">Medical Debt Negotiation</a>';

for (const fp of files) {
    let content = fs.readFileSync(fp, 'utf8');
    let changed = false;
    
    if (content.includes(oldBtn)) {
        content = content.replace(oldBtn, newBtn);
        changed = true;
        console.log('Fixed sticky btn: ' + path.basename(fp));
    }
    
    if (!content.includes('medical-debt-negotiation') && content.includes('footer-links') && content.includes('negotiate-bills.html')) {
        const search = '<a href="/negotiate-bills.html">Negotiate Bills</a>';
        const replacement = search + '\n            ' + addLinks;
        const newContent = content.replace(search, replacement);
        if (newContent !== content) {
            content = newContent;
            changed = true;
            console.log('ADDED footer links to: ' + path.basename(fp));
        }
    }
    
    if (changed) {
        fs.writeFileSync(fp, content, 'utf8');
        console.log('  -> Saved: ' + path.basename(fp));
    }
}
console.log('Done!');
