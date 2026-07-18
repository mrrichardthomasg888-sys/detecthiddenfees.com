const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let h = fs.readFileSync(f, 'utf-8');
  const orig = h;
  
  // 1. REMOVE EVA POPUP (only in index.html - CSS, HTML, and Brevo script)
  // Remove the Eva-specific styles (everything from #evaW to .eva-pulse.sh)
  h = h.replace(/\/\* ===== EVA ASSISTANT CHAT.*?\.eva-pulse\.sh\{opacity:1\}\s*\n?\s*/s, '');
  
  // Remove the pulse div
  h = h.replace(/<div class="eva-pulse" id="ePulse"><\/div>\s*\n?\s*/s, '');
  
  // Remove the entire evaW widget
  h = h.replace(/<div id="evaW">[\s\S]*?<\/div>\s*\n?\s*/s, '');
  
  // Remove the Eva/Brevo script
  h = h.replace(/<script>[\s\S]*?sendinblue[\s\S]*?<\/script>/i, '');
  h = h.replace(/<script>\s*setTimeout\(function\(\)\{document\.getElementById\('evaW'\)[\s\S]*?<\/script>/s, '');
  h = h.replace(/<script>[\s\S]*?sE\(\)[\s\S]*?<\/script>/s, '');
  h = h.replace(/<script>[\s\S]*?xkeysib[\s\S]*?<\/script>/i, '');
  
  // 2. CLEAN NAV: Remove all nav-links except the two buttons
  // Find the nav block and replace its link content
  const navMatch = h.match(/<div class="nav-links">[\s\S]*?<\/div>/);
  if (navMatch) {
    // Extract only the nav-btn links (PDF and Analyze)
    const btns = [];
    const btnRegex = /<a[^>]*class="nav-btn[^>]*>[\s\S]*?<\/a>/g;
    let btnMatch;
    while ((btnMatch = btnRegex.exec(navMatch[0])) !== null) {
      btns.push(btnMatch[0]);
    }
    
    if (btns.length > 0) {
      const newNavLinks = '<div class="nav-links">\n                ' + btns.join('\n                ') + '\n            </div>';
      h = h.replace(navMatch[0], newNavLinks);
    }
  }
  
  // 3. ADD NAV-BTN SPACING CSS for clean horizontal layout if not already present
  if (h.indexOf('.nav-btn {') > -1 && h.indexOf('white-space: nowrap') === -1) {
    h = h.replace(
      '.nav-btn {',
      '.nav-btn {\n            white-space: nowrap;\n            margin-left: 12px;'
    );
  }
  
  // 4. Remove empty style patterns from eva removal
  h = h.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  if (h !== orig) {
    fs.writeFileSync(f, h, 'utf-8');
    console.log('FIXED: ' + f + ' (size: ' + h.length + ')');
  } else {
    console.log('UNCHANGED: ' + f);
  }
});

console.log('\n=== DONE ===');