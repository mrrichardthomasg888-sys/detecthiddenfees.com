const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\lynns\\Downloads\\detecthiddenfees.com';

function findHtmlFiles(dir) {
    const results = [];
    try {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            if (item.name.startsWith('.') || item.name === 'node_modules') continue;
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                results.push(...findHtmlFiles(fullPath));
            } else if (item.name.endsWith('.html')) {
                results.push(fullPath);
            }
        }
    } catch (e) {}
    return results;
}

const htmlFiles = findHtmlFiles(root);
console.log('Total HTML files: ' + htmlFiles.length);

const newNav = '<nav><div class="container nav-wrap"><a href="/" style="text-decoration:none;color:inherit"><div class="logo">Detect<span>HiddenFees</span></div></a><div class="nav-links"><a href="/ai-analysis-hub.html">AI Tools</a><a href="/hidden-fees-guides.html">Guides</a><a href="/ai-contract-review.html">Contract Review</a><a href="/ai-bill-analyzer.html">Bill Analyzer</a><a href="/ai-financial-advisor.html">AI Financial Advisor</a></div><a href="https://hiddenfeeai.com" rel="noopener noreferrer" class="nav-btn">Analyze My Document →</a></div></nav>';

// The exact old header pattern from the investigation pages
const oldHeader = '<header style="position:sticky;top:0;z-index:999;background:rgba(2,6,23,.85);backdrop-filter:blur(24px);border-bottom:1px solid rgba(59,130,246,0.15);padding:14px 20px"><a href="/" style="text-decoration:none;color:inherit"><div class="logo"> DetectHiddenFees </div></a></header>';

let navFixed = 0;
let logoFixed = 0;
let alreadyGood = 0;

for (const f of htmlFiles) {
    try {
        let c = fs.readFileSync(f, 'utf8');
        const o = c;
        
        // Skip index.html
        if (f.endsWith('index.html') || f.endsWith('index.html')) continue;
        
        // Check if already has the full nav with AI Financial Advisor
        if (c.includes('nav-wrap') && c.includes('ai-financial-advisor')) {
            alreadyGood++;
            continue;
        }
        
        // Replace old bare header with full nav
        if (c.includes(oldHeader)) {
            c = c.replace(oldHeader, newNav);
            navFixed++;
            console.log('NAV: ' + path.relative(root, f));
        }
        
        // Fix bare logo text
        if (c.includes('>DetectHiddenFees</div>') && !c.includes('Detect<span>HiddenFees</span>')) {
            c = c.replace(/>DetectHiddenFees<\/div>/g, '>Detect<span>HiddenFees</span></div>');
            logoFixed++;
            if (!c.includes(oldHeader)) {
                console.log('LOGO: ' + path.relative(root, f));
            }
        }
        
        if (c !== o) {
            fs.writeFileSync(f, c, 'utf8');
        }
    } catch (e) {
        if (!e.message.includes('EISDIR')) {
            console.log('ERR: ' + path.relative(root, f) + ' - ' + e.message.substring(0, 60));
        }
    }
}

console.log('\nNavs replaced: ' + navFixed);
console.log('Logos fixed: ' + logoFixed);
console.log('Already had full nav: ' + alreadyGood);
console.log('Done!');
