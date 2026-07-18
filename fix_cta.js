const fs = require('fs');

const oldScript = '<script id="pdfScript">';
const newScript = '<script>';
const newHandlerStart = 'document.addEventListener("DOMContentLoaded",function(){var btn=document.getElementById("pdfDownloadBtn");if(btn){btn.onclick=';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let fixed = [];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf-8');
  const idx = html.indexOf(oldScript);
  if (idx === -1) {
    console.log('SKIP (no pdfScript): ' + f);
    return;
  }
  
  // Find the closing </script> after pdfScript
  const scriptEnd = html.indexOf('</script>', idx);
  if (scriptEnd === -1) {
    console.log('SKIP (no closing script): ' + f);
    return;
  }
  
  // Extract the onclick handler content between <script> tags
  const onclickStart = html.indexOf('document.getElementById("pdfDownloadBtn")', idx);
  if (onclickStart === -1 || onclickStart > scriptEnd) {
    console.log('SKIP (no onclick found): ' + f);
    return;
  }
  
  // Find where the onclick assignment ends (the }; before </script>)
  const onclickEnd = html.lastIndexOf('};', scriptEnd);
  if (onclickEnd === -1 || onclickEnd < onclickStart) {
    console.log('SKIP (no onclick end found): ' + f);
    return;
  }
  
  const onclickCode = html.substring(onclickStart, onclickEnd + 2); // includes };
  
  // Build replacement
  const before = html.substring(0, idx);
  const after = html.substring(scriptEnd + 9); // after </script>
  
  const replacement = newScript + '\n' + newHandlerStart + onclickCode + '}});\n</script>';
  
  const newHtml = before + replacement + after;
  
  fs.writeFileSync(f, newHtml, 'utf-8');
  fixed.push(f);
  console.log('FIXED: ' + f);
});

console.log('\n=== SUMMARY ===');
console.log('Fixed: ' + fixed.join(', '));
console.log('Total fixed: ' + fixed.length + ' files');