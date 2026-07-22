const fs = require('fs');
const path = require('path');
const base = 'C:\\Users\\lynns\\Downloads\\detecthiddenfees.com';

// Pages with "Resources" column in footer
const resPages = ['ai-financial-advisor.html', 'ai-analysis-hub.html', 'index.html'];

resPages.forEach(f => {
  const fp = path.join(base, f);
  if (!fs.existsSync(fp)) return;
  let c = fs.readFileSync(fp, 'utf8');
  if (!c.includes('knowledge-center')) {
    const m = c.match(/<div class="footer-column"><strong>Resources<\/strong>[\s\S]*?<\/div>/);
    if (m) {
      const r = m[0].replace('</div>', '<a href="/knowledge-center.html">Knowledge Center</a></div>');
      c = c.replace(m[0], r);
      fs.writeFileSync(fp, c, 'utf8');
      console.log('Added KC to Resources column: ' + f);
    }
  } else {
    console.log('Already has KC: ' + f);
  }
});

// Pages with "Contract Resources" column  
const contractResPages = ['ai-contract-review.html', 'contract-analysis-ai.html', 'contract-review-ai-software.html', 'ai-construction-contract-review.html'];

contractResPages.forEach(f => {
  const fp = path.join(base, f);
  if (!fs.existsSync(fp)) return;
  let c = fs.readFileSync(fp, 'utf8');
  if (!c.includes('knowledge-center')) {
    const m = c.match(/<div class="footer-column"><strong>Contract Resources<\/strong>[\s\S]*?<\/div>/);
    if (m) {
      const r = m[0].replace('</div>', '<a href="/knowledge-center.html">Knowledge Center</a></div>');
      c = c.replace(m[0], r);
      // Also try "Hidden Fee Resources" 
      const m2 = c.match(/<div class="footer-column"><strong>Hidden Fee Resources<\/strong>[\s\S]*?<\/div>/);
      if (m2) {
        const r2 = m2[0].replace('</div>', '<a href="/knowledge-center.html">Knowledge Center</a></div>');
        c = c.replace(m2[0], r2);
      }
      fs.writeFileSync(fp, c, 'utf8');
      console.log('Added KC to Contract Resources: ' + f);
    }
  } else {
    console.log('Already has KC: ' + f);
  }
});

// General approach for any footer column
const otherPages = ['ai-agreement-analyzer.html', 'ai-bill-analyzer.html', 'hidden-fee-detector.html', 'ai-document-checker.html', 'ai-invoice-analyzer.html', 'ai-financial-analysis.html', 'ai-document-intelligence-center.html'];

otherPages.forEach(f => {
  const fp = path.join(base, f);
  if (!fs.existsSync(fp)) return;
  let c = fs.readFileSync(fp, 'utf8');
  if (!c.includes('knowledge-center')) {
    // Find any footer column that has "Resources" or "Guides" in the strong tag
    const m = c.match(/<strong>(?:.*Resources|.*Guides|.*Education)<\/strong>[\s\S]*?<\/div>/);
    if (m) {
      const r = m[0].replace('</div>', '<a href="/knowledge-center.html">Knowledge Center</a></div>');
      c = c.replace(m[0], r);
      fs.writeFileSync(fp, c, 'utf8');
      console.log('Added KC to generic footer: ' + f);
    } else {
      // Fallback: find any footer-column after the third one
      const cols = [...c.matchAll(/<div class="footer-column">[\s\S]*?<\/div>/g)];
      if (cols.length >= 2) {
        const target = cols[Math.min(cols.length - 3, 1)];
        const r = target[0].replace('</div>', '<a href="/knowledge-center.html">Knowledge Center</a></div>');
        c = c.replace(target[0], r);
        fs.writeFileSync(fp, c, 'utf8');
        console.log('Added KC to fallback column: ' + f);
      } else {
        console.log('Could not find footer in: ' + f);
      }
    }
  } else {
    console.log('Already has KC: ' + f);
  }
});

console.log('Done');