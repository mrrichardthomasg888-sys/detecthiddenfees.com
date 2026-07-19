const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\lynns\\Downloads\\detecthiddenfees.com';

const pages = [
  'ai-contract-review-vs-chatgpt',
  'ai-bill-analysis-vs-manual-review',
  'hiddenfeeai-vs-traditional-negotiation',
  'free-ai-contract-review-vs-paid-review',
  'ai-document-analysis-benefits',
  'privacy-and-ai-security',
  'ai-accuracy-and-limitations',
  'data-handling-policy'
];

console.log('=== DUPLICATE & FOOTER CHECK ===\n');

for (const n of pages) {
  const fp = path.join(dir, n + '.html');
  if (!fs.existsSync(fp)) { console.log('MISSING: ' + n); continue; }
  
  const c = fs.readFileSync(fp, 'utf8');
  
  // Check if still has template body content
  const hasTemplateContent = c.includes('Negotiating bills is a skill');
  
  // Count body words
  const start = c.indexOf('class="container long-content"');
  let wc = 0;
  if (start !== -1) {
    const h2 = c.indexOf('<h2>', start);
    const se = c.indexOf('</section>', h2);
    if (h2 !== -1 && se !== -1) {
      let b = c.substring(h2, se).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      wc = b.split(' ').length;
    }
  }
  
  // Check footer for the page link
  const footer = c.substring(c.indexOf('<footer'), c.indexOf('</footer>'));
  const inFooter = footer.includes(n + '.html');
  
  const status = hasTemplateContent ? 'TEMPLATE CONTENT - NEEDS UNIQUE CONTENT!' : 'OK - unique content';
  console.log(n + ':');
  console.log('  Words: ' + wc);
  console.log('  Content: ' + status);
  console.log('  Footer link: ' + (inFooter ? 'YES' : 'MISSING!'));
  console.log('');
}

console.log('=== DONE ===');
