const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// Replacement 1: Add hero:before/after display:none inside @media(max-width queries
// Replacement 2: Add -webkit-transform to .orb-accent

let fixed = [];

files.forEach(f => {
  let h = fs.readFileSync(f, 'utf-8');
  const orig = h;
  
  // 1. Inside every @media(max-width:900px) block, add hero:before/after: display:none
  // Look for the end of the media query block (the closing }) and add the rule before it
  const mediaMatch = h.match(/@media\s*\(max-width:\s*900\s*px\)\s*\{([\s\S]*?)\}/g);
  if (mediaMatch) {
    mediaMatch.forEach(block => {
      const hasHeroRule = block.indexOf('.hero:before') > -1 || block.indexOf('.hero:after') > -1;
      if (!hasHeroRule) {
        // Add the hero hide rule before the closing }
        const newBlock = block.replace(/\}\s*$/, '}\n            .hero:before, .hero:after { display: none !important; }\n        }');
        h = h.replace(block, newBlock);
      } else {
        // Make sure display:none is set
        const rule = '.hero:before, .hero:after { display: none !important; }';
        if (block.indexOf('display: none') === -1) {
          const newBlock = block.replace(/\}\s*$/, '}\n            .hero:before, .hero:after { display: none !important; }\n        }');
          h = h.replace(block, newBlock);
        }
      }
    });
  }
  
  // 2. Add -webkit-transform to .orb-accent if it exists
  if (h.indexOf('.orb-accent') > -1) {
    // Check if -webkit-transform already exists
    if (h.indexOf('-webkit-transform') === -1) {
      // Replace the opening of .orb-accent to include transform
      h = h.replace(
        /\.orb-accent\s*\{([\s\S]*?)\}/,
        (match, inner) => {
          if (inner.indexOf('pointer-events') === -1) {
            inner = 'pointer-events: none !important;\n            z-index: -1 !important;\n            -webkit-transform: translate3d(0,0,0);' + inner;
          } else if (inner.indexOf('-webkit-transform') === -1) {
            inner = inner.replace(/}\s*$/, '');
            inner = inner.trim() + ';\n            -webkit-transform: translate3d(0,0,0);\n        ';
          }
          return '.orb-accent {\n            ' + inner.trim() + '\n        }';
        }
      );
    }
  }
  
  if (h !== orig) {
    fs.writeFileSync(f, h, 'utf-8');
    fixed.push(f);
    console.log('FIXED: ' + f);
  } else {
    console.log('OK: ' + f);
  }
});

console.log('\n=== SUMMARY ===');
console.log('Fixed: ' + fixed.length + ' files');
if (fixed.length) console.log('Files: ' + fixed.join(', '));