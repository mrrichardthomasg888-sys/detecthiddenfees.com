const fs = require('fs');

const pages = [
  'ai-financial-assistant.html',
  'ai-financial-advisor.html',
  'ai-financial-analysis.html',
  'financial-analysis-software.html',
  'financial-analysis-tools.html'
];

const oldStickyMobileCSS = `@media(max-width:900px) { .sticky-cta-bar { display: flex; padding: 10px 14px; gap: 10px; } .hero:before, .hero:after { display: none !important; } .sticky-cta-bar .sticky-btn { padding: 10px 20px; font-size: .85rem; flex: 1; } .sticky-cta-bar .sticky-text { font-size: .8rem; gap: 6px; } }`;

const newStickyMobileCSS = `@media(max-width:900px) { .sticky-cta-bar { display: flex; padding: 8px 12px; gap: 8px; } .hero:before, .hero:after { display: none !important; } .sticky-cta-bar .sticky-btn { padding: 8px 14px; font-size: .8rem; flex: 1; min-height: 38px; border-radius: 12px; } .sticky-cta-bar .sticky-text { font-size: .75rem; gap: 4px; } body { padding-bottom: 60px; } }
        @media(max-width:600px) { .sticky-cta-bar { padding: 6px 10px; gap: 6px; } .sticky-cta-bar .sticky-btn { padding: 6px 12px; font-size: .75rem; min-height: 34px; border-radius: 10px; } .sticky-cta-bar .sticky-text { font-size: .7rem; gap: 3px; } .sticky-cta-bar .sticky-text .price { font-size: .7rem; padding: 1px 8px; } body { padding-bottom: 52px; } }`;

pages.forEach(filename => {
  const content = fs.readFileSync(filename, 'utf8');
  if (content.includes(oldStickyMobileCSS)) {
    const updated = content.replace(oldStickyMobileCSS, newStickyMobileCSS);
    fs.writeFileSync(filename, updated, 'utf8');
    console.log(`✓ ${filename} - fixed`);
  } else if (content.includes('padding: 8px 12px')) {
    console.log(`✓ ${filename} - already fixed`);
  } else {
    // Try finding partial match - look for the 900px media query for sticky
    const partialOld = `.sticky-cta-bar .sticky-btn { padding: 10px 20px; font-size: .85rem; flex: 1; }`;
    if (content.includes(partialOld)) {
      const updated = content.replace(partialOld, `.sticky-cta-bar .sticky-btn { padding: 8px 14px; font-size: .8rem; flex: 1; min-height: 38px; border-radius: 12px; }`);
      fs.writeFileSync(filename, updated, 'utf8');
      console.log(`✓ ${filename} - partial fix applied`);
    } else {
      console.log(`✗ ${filename} - could not find match`);
    }
  }
});