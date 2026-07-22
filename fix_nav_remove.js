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

// The replacement: logo-only header (no nav links)
const logoOnlyHeader = '<header style="position:sticky;top:0;z-index:999;background:rgba(2,6,23,.85);backdrop-filter:blur(24px);border-bottom:1px solid rgba(59,130,246,0.15);padding:14px 20px"><a href="/" style="text-decoration:none;color:inherit"><div class="logo">Detect<span>HiddenFees</span></div></a></header>';

// Patterns to replace (all nav variations)
const navPattern1 = /<nav><div class="container nav-wrap"><a href="\/" style="text-decoration:none;color:inherit"><div class="logo">Detect<span>HiddenFees<\/span><\/div><\/a><div class="nav-links">.*?<\/div><a href="https:\/\/hiddenfeeai.com" rel="noopener noreferrer" class="nav-btn">.*?<\/a><\/div><\/nav>/gs;

const navPattern2 = /<nav><div class="container nav-wrap"><a href="\/" style="text-decoration:none;color:inherit"><div class="logo">Detect<\/div><\/a><div class="nav-links">.*?<\/div><a href="https:\/\/hiddenfeeai.com" rel="noopener noreferrer" class="nav-btn">.*?<\/a><\/div><\/nav>/gs;

const navPattern3 = /<nav><div class="container nav-wrap"><div class="logo">.*?<\/div><div class="nav-links">.*?<\/div><a href="https:\/\/hiddenfeeai.com".*?class="nav-btn">.*?<\/a><\/div><\/nav>/gs;

const navPattern4 = /<nav><div class="container nav-wrap"><a href="\/" style="text-decoration:none;color:inherit"><div class="logo">.*?<\/div><\/a><div class="nav-links">.*?<\/div><a href="https:\/\/hiddenfeeai.com".*?class="nav-btn">.*?<\/a><\/div><\/nav>/gs;

// Also handle bare header with no span version
const bareHeader = /<header style="position:sticky;top:0;z-index:999;background:rgba\(2,6,23,\.85\);backdrop-filter:blur\(24px\);border-bottom:1px solid rgba\(59,130,246,0\.15\);padding:14px 20px"><a href="\/" style="text-decoration:none;color:inherit"><div class="logo">\s*DetectHiddenFees\s*<\/div><\/a><\/header>/g;

const bareHeaderNoLink = /<header style="position:sticky;top:0;z-index:999;background:rgba\(2,6,23,\.85\);backdrop-filter:blur\(24px\);border-bottom:1px solid rgba\(59,130,246,0\.15\);padding:14px 20px"><div class="logo">\s*DetectHiddenFees\s*<\/div><\/header>/g;

let navRemoved = 0;
let logoFixed = 0;

for (const f of htmlFiles) {
    try {
        let c = fs.readFileSync(f, 'utf8');
        const o = c;
        
        // Step 1: Remove any full navigation with links, replace with logo-only header
        let changed = false;
        
        // Try each nav pattern
        const patterns = [navPattern1, navPattern2, navPattern3, navPattern4];
        for (const pattern of patterns) {
            if (pattern.test(c)) {
                c = c.replace(pattern, logoOnlyHeader);
                changed = true;
                break;
            }
        }
        
        if (changed) {
            navRemoved++;
            console.log('NAV REMOVED: ' + path.relative(root, f));
        }
        
        // Step 2: Fix bare header with old logo
        if (bareHeader.test(c)) {
            c = c.replace(bareHeader, logoOnlyHeader);
            console.log('HEADER FIXED: ' + path.relative(root, f));
        }
        if (bareHeaderNoLink.test(c)) {
            c = c.replace(bareHeaderNoLink, logoOnlyHeader);
            console.log('HEADER FIXED 2: ' + path.relative(root, f));
        }
        
        // Step 3: Fix any remaining bare 'DetectHiddenFees' logo text to have span
        if (c.includes('DetectHiddenFees') && !c.includes('Detect<span>HiddenFees</span>')) {
            const logoPattern = /(<div\s+class="logo"[^>]*>)\s*DetectHiddenFees\s*(<\/div>)/g;
            if (logoPattern.test(c)) {
                c = c.replace(logoPattern, '$1Detect<span>HiddenFees</span>$2');
                logoFixed++;
                if (!changed) console.log('LOGO FIXED: ' + path.relative(root, f));
            }
        }
        
        // Step 4: Remove any leftover sticky CTA bar references that mention nav (just in case)
        
        if (c !== o) {
            fs.writeFileSync(f, c, 'utf8');
        }
    } catch (e) {
        if (!e.message.includes('EISDIR')) {
            console.log('ERR: ' + path.relative(root, f) + ' - ' + e.message.substring(0, 60));
        }
    }
}

console.log('\nNavs removed: ' + navRemoved);
console.log('Logos fixed: ' + logoFixed);
console.log('Done!');
