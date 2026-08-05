const fs = require('fs');

const pages = {
  'hidden-auto-fees.html': 'Explore the hidden fees guide for a broader consumer overview.',
  'hidden-banking-fees.html': 'Read the hidden fee guide for broader consumer protection context.',
  'hidden-contractor-fees.html': 'Use the hidden fee guide to compare construction charges with other consumer costs.',
  'hidden-healthcare-fees.html': 'Learn about hidden fees across industries in the consumer hidden fee guide.',
  'hidden-insurance-fees.html': 'Explore hidden fee resources before comparing the cost of coverage.',
  'hidden-rental-fees.html': 'Start with the hidden fee guide for a broader look at recurring consumer charges.',
  'hidden-telecom-fees.html': 'Learn about hidden fees and unexpected charges in the broader consumer guide.',
  'hidden-travel-fees.html': 'Review the hidden fee guide for more ways to identify unexpected charges.',
  'hidden-utility-fees.html': 'Explore hidden fee resources to compare recurring charges across industries.'
};

let changed = 0;
for (const [file, sentence] of Object.entries(pages)) {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('href="/hidden-fees-guides"')) continue;
  const paragraph = /(<h1\b[^>]*>[\s\S]*?<\/h1>\s*<p\b[^>]*>[\s\S]*?<\/p>)/i;
  if (!paragraph.test(html)) throw new Error(`Could not find the opening content block: ${file}`);
  const link = `<p class="hub-context-link">${sentence} <a href="/hidden-fees-guides">Read the hidden fee guide</a>.</p>`;
  const next = html.replace(paragraph, `$1${link}`);
  fs.writeFileSync(file, next, 'utf8');
  changed += 1;
}

console.log(`Added ${changed} contextual hub links.`);
