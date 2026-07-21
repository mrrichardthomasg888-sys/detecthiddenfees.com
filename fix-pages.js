const fs = require('fs');

const pages = [
  'ai-financial-assistant.html',
  'ai-financial-advisor.html',
  'ai-financial-analysis.html',
  'financial-analysis-software.html',
  'financial-analysis-tools.html'
];

// The updated footer with new links added
const oldFooterEnd = '<a href="/hidden-fee-industry-guide.html">Industry Fee Guides</a></div>';
const newFooterEnd = '<a href="/hidden-fee-industry-guide.html">Industry Fee Guides</a><a href="/ai-financial-assistant.html">AI Financial Assistant</a><a href="/ai-financial-advisor.html">AI Financial Advisor</a><a href="/ai-financial-analysis.html">AI for Financial Analysis</a><a href="/financial-analysis-software.html">Financial Analysis Software</a><a href="/financial-analysis-tools.html">Financial Analysis Tools</a></div>';

// Gradient style for section h2 matching index.html
const oldH2Style = '.section h2 { font-size: clamp(2rem, 4.5vw, 2.8rem); line-height: 1.08; margin-bottom: 18px; font-weight: 900; letter-spacing: -.04em; max-width: 760px; text-shadow: 0 0 30px rgba(37,99,235,0.08); }';
const newH2Style = '.section h2 { font-size: clamp(2rem, 4.5vw, 2.8rem); line-height: 1.08; margin-bottom: 18px; font-weight: 900; letter-spacing: -.04em; max-width: 760px; background: linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #c084fc 70%, #ffffff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; background-size: 200% 200%; animation: gradientShift 10s ease infinite; text-shadow: none; filter: drop-shadow(0 0 30px rgba(37,99,235,0.15)); }';

// Table responsive CSS
const tableCSS = '\n        /* ===== RESPONSIVE TABLES ===== */\n        .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0 0 1px 0; }\n        .table-responsive table { min-width: 500px; }\n        @media(max-width:600px) { .table-responsive table { font-size: .8rem; } .table-responsive td, .table-responsive th { padding: 8px 4px !important; } }';

// CTA replacements for consistency
const ctaReplacements = [
  // Hero CTAs - standardize to match existing pages
  ['>Try HiddenFeeAI — $15 Analysis<', '>Analyze My Documents With AI — $15<'],
  ['>Try Our AI Analysis Tool — $15<', '>Analyze My Documents With AI — $15<'],
  ['>Analyze Your Financial Documents — $15<', '>Analyze My Documents With AI — $15<'],
  ['>Analyze Your Financial Documents With AI — $15<', '>Analyze My Documents With AI — $15<'],
  // Mid-page CTAs 
  ['>Get Your Document Analysis — $15<', '>Analyze My Documents With AI — $15<'],
  ['>Get Your Financial Document Analysis — $15<', '>Analyze My Documents With AI — $15<'],
  ['>Get Your Financial Analysis — $15<', '>Analyze My Documents With AI — $15<'],
  ['>Start Your Financial Analysis — $15<', '>Analyze My Documents With AI — $15<'],
  ['>Start Analyzing Your Documents — $15<', '>Analyze My Documents With AI — $15<'],
  ['>Start Building Your Toolkit — $15<', '>Analyze My Documents With AI — $15<'],
  ['>Start Your Analysis — $15<', '>Find Hidden Fees Before You Sign →<'],
  // Final CTAs
  ['>Analyze My Documents Now — $15<', '>Find Hidden Fees Before You Sign →<'],
  ['>Start Your Financial Analysis — $15<', '>Find Hidden Fees Before You Sign →<'],
];

// Final CTA section title fixes (don't change the title text)
// Keep final CTA title as-is for each page

const tableOpen = '<table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:.95rem;">';

pages.forEach(filename => {
  console.log(`\n=== Processing ${filename} ===`);
  let content = fs.readFileSync(filename, 'utf8');
  const fileChanges = [];

  // 1. FOOTER - Add new links
  if (content.includes(oldFooterEnd)) {
    content = content.replace(oldFooterEnd, newFooterEnd);
    fileChanges.push('FOOTER: Added 5 new financial analysis page links');
  } else {
    console.log('  WARNING: Footer target not found');
  }

  // 2. TEXT - Add gradient heading style
  if (content.includes(oldH2Style)) {
    content = content.replace(oldH2Style, newH2Style);
    fileChanges.push('TEXT: Added gradient heading style');
  } else {
    console.log('  WARNING: .section h2 style not found');
  }

  // 3. CTA - Fix button texts
  ctaReplacements.forEach(([oldText, newText]) => {
    if (content.includes(oldText)) {
      content = content.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
      fileChanges.push(`CTA: Standardized button text`);
    }
  });

  // 4. TABLE - Add responsive CSS
  if (!content.includes('.table-responsive')) {
    const faqMarker = '.faq { margin-top: 48px; }';
    if (content.includes(faqMarker)) {
      content = content.replace(faqMarker, tableCSS + '\n        ' + faqMarker);
      fileChanges.push('TABLE: Added responsive table CSS');
    }
  }

  // 5. TABLE - Wrap tables
  let tableIdx = 0;
  while ((tableIdx = content.indexOf(tableOpen)) !== -1) {
    const before = content.substring(Math.max(0, tableIdx - 100), tableIdx);
    if (before.includes('table-responsive')) {
      // Already wrapped
      break;
    }
    
    // Wrap opening
    content = content.substring(0, tableIdx) + 
      '<div class="table-responsive">\n                ' + 
      content.substring(tableIdx);
    
    // Find closing table
    const closeIdx = content.indexOf('</table>', tableIdx + tableOpen.length + 30);
    if (closeIdx !== -1) {
      content = content.substring(0, closeIdx + 8) + '\n            </div>' + content.substring(closeIdx + 8);
      fileChanges.push('TABLE: Wrapped table in responsive container');
    }
    
    // Only do one table per page - break after first
    break;
  }

  fs.writeFileSync(filename, content, 'utf8');
  fileChanges.forEach(c => console.log(`  ✓ ${c}`));
  if (fileChanges.length === 0) console.log('  No changes needed');
});

// Fix index.html footer
console.log('\n=== Processing index.html ===');
let indexContent = fs.readFileSync('index.html', 'utf8');
if (indexContent.includes(oldFooterEnd)) {
  indexContent = indexContent.replace(oldFooterEnd, newFooterEnd);
  fs.writeFileSync('index.html', indexContent, 'utf8');
  console.log('  ✓ FOOTER: Added 5 new links to index.html');
} else {
  console.log('  WARNING: Footer target not found in index.html');
}

console.log('\n=== All fixes complete ===');