const fs = require('fs');

const pages = [
  'ai-financial-assistant.html',
  'ai-financial-advisor.html',
  'ai-financial-analysis.html',
  'financial-analysis-software.html',
  'financial-analysis-tools.html'
];

// The old hero h1 CSS (no gradient)
const oldHeroH1 = `.hero h1 { font-size: clamp(2.6rem, 5.5vw, 4.2rem); line-height: 1.05; font-weight: 900; letter-spacing: -.04em; max-width: 760px; margin-bottom: 16px; text-shadow: 0 0 40px rgba(37,99,235,0.12); }`;

// New hero h1 CSS matching existing authority pages
const newHeroH1 = `.hero h1 { font-size: clamp(2.6rem, 5.5vw, 4.2rem); line-height: 1.05; font-weight: 900; letter-spacing: -.04em; max-width: 760px; margin-bottom: 16px; background: linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #c084fc 70%, #ffffff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; background-size: 200% 200%; animation: gradientShift 8s ease infinite; text-shadow: none; filter: drop-shadow(0 0 40px rgba(37,99,235,0.3)); }`;

pages.forEach(filename => {
  let content = fs.readFileSync(filename, 'utf8');
  
  // Check for old style
  if (content.includes(oldHeroH1)) {
    content = content.replace(oldHeroH1, newHeroH1);
    fs.writeFileSync(filename, content, 'utf8');
    console.log(`✓ ${filename} - hero h1 gradient added`);
  } 
  // Check if already has gradient
  else if (content.includes('-webkit-background-clip: text') && content.includes('background: linear-gradient(135deg, #ffffff 0%, #93c5fd')) {
    console.log(`✓ ${filename} - already has gradient`);
  }
  else {
    console.log(`✗ ${filename} - could not find match`);
    // Try to find the inline version
    const inlineOld = '.hero h1{font-size:clamp(2.6rem,5.5vw,4.2rem);line-height:1.05;font-weight:900;letter-spacing:-.04em;max-width:760px;margin-bottom:16px;text-shadow:0 0 40px rgba(37,99,235,0.12)}';
    if (content.includes(inlineOld)) {
      const inlineNew = '.hero h1{font-size:clamp(2.6rem,5.5vw,4.2rem);line-height:1.05;font-weight:900;letter-spacing:-.04em;max-width:760px;margin-bottom:16px;background:linear-gradient(135deg,#ffffff 0%,#93c5fd 40%,#c084fc 70%,#ffffff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200% 200%;animation:gradientShift 8s ease infinite;text-shadow:none;filter:drop-shadow(0 0 40px rgba(37,99,235,0.3))}';
      content = content.replace(inlineOld, inlineNew);
      fs.writeFileSync(filename, content, 'utf8');
      console.log(`✓ ${filename} - inline hero h1 gradient added`);
    }
  }
});