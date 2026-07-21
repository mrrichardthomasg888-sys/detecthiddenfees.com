const fs = require('fs');

const pages = [
  'ai-financial-assistant.html',
  'ai-financial-advisor.html',
  'ai-financial-analysis.html',
  'financial-analysis-software.html',
  'financial-analysis-tools.html'
];

pages.forEach(filename => {
  let content = fs.readFileSync(filename, 'utf8');
  let changes = [];
  
  // 1. Make hero paragraph text BRIGHTER & BOLDER - change #cbd5e1 to white with bigger font
  const oldHeroP = '.hero p { font-size: 1.15rem; line-height: 1.9; max-width: 850px; color: #cbd5e1; margin-top: 10px; margin-bottom: 20px; }';
  const newHeroP = '.hero p { font-size: 1.25rem; line-height: 2; max-width: 850px; color: #f1f5f9; margin-top: 10px; margin-bottom: 20px; font-weight: 500; text-shadow: 0 0 20px rgba(37,99,235,0.08); }';
  
  if (content.includes(oldHeroP)) {
    content = content.replace(oldHeroP, newHeroP);
    changes.push('Hero paragraph: bigger font, brighter color, added weight');
  }
  
  // 2. Make the hero CTA button BIGGER & BOLDER
  const oldCtaBtn = '.cta-button { display: inline-block; padding: 18px 32px; border-radius: 18px; background: linear-gradient(90deg, #2563eb, #9333ea); font-size: 1rem; font-weight: 800; color: white; text-decoration: none; box-shadow: 0 16px 50px rgba(37,99,235,.4); transition: transform 0.25s, box-shadow 0.3s; text-shadow: 0 2px 8px rgba(0,0,0,0.2); }';
  const newCtaBtn = '.cta-button { display: inline-block; padding: 22px 40px; border-radius: 20px; background: linear-gradient(90deg, #2563eb, #9333ea); font-size: 1.15rem; font-weight: 900; color: white; text-decoration: none; box-shadow: 0 20px 60px rgba(37,99,235,.5), 0 0 40px rgba(37,99,235,0.2); transition: transform 0.25s, box-shadow 0.3s; text-shadow: 0 2px 10px rgba(0,0,0,0.3); letter-spacing: 0.03em; }';
  
  if (content.includes(oldCtaBtn)) {
    content = content.replace(oldCtaBtn, newCtaBtn);
    changes.push('CTA button: bigger padding, larger font (1.15rem), bolder weight (900), enhanced glow shadow');
  }
  
  // 3. Make hover effect more dramatic
  const oldCtaHover = '.cta-button:hover { transform: translateY(-3px); box-shadow: 0 24px 70px rgba(37,99,235,.55); }';
  const newCtaHover = '.cta-button:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 30px 80px rgba(37,99,235,.65), 0 0 60px rgba(37,99,235,0.25); }';
  
  if (content.includes(oldCtaHover)) {
    content = content.replace(oldCtaHover, newCtaHover);
    changes.push('CTA hover: stronger lift, scale effect, enhanced glow');
  }
  
  // 4. Ensure the leverage-section CTA button also matches
  const oldLeverageCta = '.cta-button { display: inline-block; padding: 14px 28px; font-size:.95rem;';
  // Already handled by the global .cta-button rule
  
  // 5. Make .cta-btn (final CTA) consistent too
  const oldFinalCta = '.cta-btn { display: inline-block; padding: 20px 42px; background: white; color: #0f172a; font-weight: 900; border-radius: 16px; font-size: 1rem; transition: transform 0.25s, box-shadow 0.3s; box-shadow: 0 8px 30px rgba(0,0,0,0.15); }';
  const newFinalCta = '.cta-btn { display: inline-block; padding: 22px 48px; background: white; color: #0f172a; font-weight: 900; border-radius: 18px; font-size: 1.1rem; transition: transform 0.25s, box-shadow 0.3s; box-shadow: 0 12px 40px rgba(0,0,0,0.2); letter-spacing: 0.02em; }';
  
  if (content.includes(oldFinalCta)) {
    content = content.replace(oldFinalCta, newFinalCta);
    changes.push('Final CTA: larger padding, bigger font, enhanced shadow');
  }
  
  // 6. Make .cta-btn hover more dramatic
  const oldFinalCtaHover = '.cta-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.25); }';
  const newFinalCtaHover = '.cta-btn:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.1); }';
  
  if (content.includes(oldFinalCtaHover)) {
    content = content.replace(oldFinalCtaHover, newFinalCtaHover);
    changes.push('Final CTA hover: stronger lift, scale effect, white glow');
  }
  
  // Write changes
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`✓ ${filename}`);
  changes.forEach(c => console.log(`   ${c}`));
});