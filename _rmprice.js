const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let fixed = 0;
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const orig = content;
    // Remove " — $15" from footer link text only
    content = content.replace(/(Analyze My Bill|Analyze My Contract|Analyze My Invoice|Analyze My Estimate) — \$15/g, '$1');
    // Also try &mdash; version
    content = content.replace(/(Analyze My Bill|Analyze My Contract|Analyze My Invoice|Analyze My Estimate) &mdash; \$15/g, '$1');
    if (content !== orig) {
        fs.writeFileSync(file, content, 'utf8');
        fixed++;
        console.log('✓', file);
    }
}
console.log('\nFixed:', fixed);