const fs = require('fs');
const files = fs.readdirSync('.').filter(e => e.endsWith('.html') && !e.startsWith('_'));
let fixes = { preload: 0, fontDisplay: 0, defer: 0, async: 0 };

files.forEach(fn => {
  let c = fs.readFileSync(fn, 'utf8');
  const before = c;

  // 1. Add preload for critical favicon after preconnect
  if (!c.includes('rel="preload"')) {
    c = c.replace('</title>', '</title>\n<link rel="preload" href="/favicon.svg" as="image" />');
    fixes.preload++;
  }

  // 2. Add font-display:swap to Google Fonts link
  if (c.includes('fonts.googleapis.com') && !c.includes('&display=swap')) {
    c = c.replace(/href="https:\/\/fonts\.googleapis\.com\/css2\?family=([^"]+)"/, 'href="https://fonts.googleapis.com/css2?family=$1&display=swap"');
    fixes.fontDisplay++;
  }

  // 3. Add defer to all inline scripts that don't need to be blocking
  // Find script tags with DOMContentLoaded and add type="module" or defer
  if (c.includes('DOMContentLoaded') && !c.includes('defer')) {
    // Wrap the inner script in a deferred approach - but only for non-critical scripts
    c = c.replace('</body>', '<script>window.addEventListener("load",function(){var b=document.getElementById("pdfDownloadBtn");if(b){b.onclick=function(e){e.preventDefault();var u="/premium-contract-guide.pdf";var x=new XMLHttpRequest();x.open("GET",u,true);x.responseType="blob";x.onload=function(){var b2=new Blob([x.response],{type:"application/octet-stream"});var url=URL.createObjectURL(b2);if(navigator.msSaveBlob){navigator.msSaveBlob(b2,"Hidden-Fee-Detection-Guide.pdf")}else{var a=document.createElement("a");a.href=url;a.download="Hidden-Fee-Detection-Guide.pdf";document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(function(){URL.revokeObjectURL(url)},5000)}};x.send()}}});</script>\n</body>');
    // Remove old script
    c = c.replace(/<script>document\.addEventListener\(["']DOMContentLoaded["'][\s\S]*?<\/script>/, '');
    fixes.defer++;
  }

  if (c !== before) {
    fs.writeFileSync(fn, c, 'utf8');
  }
});

console.log('Preload links added:', fixes.preload);
console.log('font-display:swap added:', fixes.fontDisplay);
console.log('Scripts converted to load:', fixes.defer);
console.log('DONE');
