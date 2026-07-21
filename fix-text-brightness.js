const fs = require('fs');

const pages = [
  'ai-financial-assistant.html',
  'ai-financial-advisor.html',
  'ai-financial-analysis.html',
  'financial-analysis-software.html',
  'financial-analysis-tools.html'
];

// Section p text: #cbd5e1 → #e2e8f0 (matches existing pages)
// Card p text: #cbd5e1 → #e2e8f0
// FAQ answer text: #94a3b8 → #cbd5e1 (brighter for readability)
// Hero p text: #cbd5e1 → #e2e8f0
// Card h3: white (already correct)
// Body default: white (already correct)
// Section intro: #e2e8f0 (already correct)

const replacements = [
  // Section paragraph text - main body content
  ['.section p { font-size: 1.05rem; line-height: 2; color: #cbd5e1; margin-bottom: 22px; }',
   '.section p { font-size: 1.05rem; line-height: 2; color: #e2e8f0; margin-bottom: 22px; }'],
  // Card paragraph text
  ['.card p { font-size: 1.05rem; margin-bottom: 0; }',
   '.card p { font-size: 1.05rem; margin-bottom: 0; color: #e2e8f0; }'],
  // FAQ item answer text
  ['.faq-item p { color: #94a3b8; font-size: .95rem; line-height: 1.9; margin-bottom: 0; }',
   '.faq-item p { color: #cbd5e1; font-size: .95rem; line-height: 1.9; margin-bottom: 0; }'],
  // Checklist section span text
  ['.checklist-grid span { display: flex; align-items: center; gap: 10px; font-size: .95rem; color: #cbd5e1; padding: 5px 0; }',
   '.checklist-grid span { display: flex; align-items: center; gap: 10px; font-size: .95rem; color: #e2e8f0; padding: 5px 0; }'],
  // Leverage section p text
  ['.leverage-section p { color: #cbd5e1; font-size: 1.05rem; line-height: 2; max-width: 800px; margin-bottom: 16px; }',
   '.leverage-section p { color: #e2e8f0; font-size: 1.05rem; line-height: 2; max-width: 800px; margin-bottom: 16px; }'],
  // Leverage grid span text
  ['.leverage-grid span { display: flex; align-items: center; gap: 8px; font-size: .95rem; color: #cbd5e1; }',
   '.leverage-grid span { display: flex; align-items: center; gap: 8px; font-size: .95rem; color: #e2e8f0; }'],
  // Mid-CTA p text
  ['.mid-cta p { color: #cbd5e1; font-size: 1rem; max-width: 700px; margin: 0 auto 16px; }',
   '.mid-cta p { color: #e2e8f0; font-size: 1rem; max-width: 700px; margin: 0 auto 16px; }'],
  // Privacy-bullets span text
  // ['.privacy-bullets span { font-size: .85rem; color: #94a3b8; display: flex; align-items: center; gap: 6px; }',
  //  '.privacy-bullets span { font-size: .85rem; color: #cbd5e1; display: flex; align-items: center; gap: 6px; }'],
  // Footer link text
  // Footer already matches, skip
  // Card feature list text - inline li
  // Hero p text - session hero
];

pages.forEach(filename => {
  let content = fs.readFileSync(filename, 'utf8');
  let changes = 0;
  
  replacements.forEach(([oldText, newText]) => {
    if (content.includes(oldText)) {
      content = content.replace(oldText, newText);
      changes++;
    }
  });
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`✓ ${filename} - ${changes} text brightness fixes applied`);
});