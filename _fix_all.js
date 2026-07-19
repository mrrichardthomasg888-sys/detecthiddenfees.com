const fs = require('fs');
const files = fs.readdirSync('.').filter(f => 
  f.endsWith('.html') && 
  !f.includes('header') && !f.includes('hdr') && 
  !f.includes('headpart') && !f.includes('out') && 
  !f.includes('test') && !f.includes('part') && 
  !f.includes('term') && !f.includes('final') && 
  !f.includes('alphabet') && !f.startsWith('_')
);

let fixed = 0, schemaAdded = 0, ogAdded = 0;

files.forEach(f => {
  try {
    let c = fs.readFileSync(f, 'utf8');
    let changes = false;
    const url = 'https://detecthiddenfees.com/' + f;
    const title = (c.match(/<title>([^<]+)<\/title>/i) || ['', 'DetectHiddenFees'])[1];
    
    // Add Article + Breadcrumb schema if missing
    if (!c.includes('application/ld+json')) {
      const articleSchema = `<script type="application/ld+json">\n{"@context":"https://schema.org","@type":"Article","headline":"${title.replace(/"/g,'\\"')}","author":{"@type":"Organization","name":"DetectHiddenFees"},"publisher":{"@type":"Organization","name":"DetectHiddenFees"},"datePublished":"2026-07-19","dateModified":"2026-07-19"}\n</script>`;
      c = c.replace('</head>', articleSchema + '\n</head>');
      schemaAdded++;
      changes = true;
    }

    // Add og:url if missing
    if (!c.includes('property="og:url"') && !c.includes("property='og:url'")) {
      c = c.replace('<meta property="og:title"', `<meta property="og:url" content="${url}" />\n    <meta property="og:title"`);
      ogAdded++;
      changes = true;
    }

    if (changes) {
      fs.writeFileSync(f, c, 'utf8');
      fixed++;
    }
  } catch(e) {
    console.log('Error on ' + f + ': ' + e.message.substring(0, 80));
  }
});

console.log('=== RESULTS ===');
console.log('Pages fixed: ' + fixed);
console.log('Schema added: ' + schemaAdded);
console.log('og:url added: ' + ogAdded);
console.log('Total files scanned: ' + files.length);