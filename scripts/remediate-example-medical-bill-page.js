const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'example-medical-bill.html');
let source = fs.readFileSync(file, 'utf8');

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const scriptStart = source.indexOf('<script', stickyStart);
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate the document end after the sticky CTA bar');
  source = scriptStart >= 0 && scriptStart < bodyEnd
    ? source.slice(0, stickyStart) + source.slice(scriptStart)
    : source.slice(0, stickyStart) + source.slice(bodyEnd);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

function normalizeFooter() {
  source = source.replaceAll('Financial Intelligence Center', 'Hidden Fee Guides');
  source = source.replaceAll('AI-Powered Hidden Fee Detection for Consumers', 'Financial Transparency Resources');
  if (!source.includes('Updated August 8, 2026')) source = source.replace('CMS guidance linked</span>', 'CMS guidance linked</span><span>Updated August 8, 2026</span>');
}

const title = 'Medical Bill Example: How to Reconcile Charges with an EOB | DetectHiddenFees';
const displayTitle = 'Medical Bill Example: How to Reconcile Charges with an EOB';
const description = 'A fictional medical-bill example showing how to compare an itemized bill, Explanation of Benefits, and supporting records without treating an illustration as a real billing finding.';
const updated = '2026-08-08';

if (source.includes('This fictional scenario demonstrates how to reconcile an itemized medical bill')) {
  removeStickyProductBar();
  normalizeFooter();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The medical-bill example is already remediated; normalized the sticky product bar and footer label.');
  process.exit(0);
}

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
replaceOnce('description metadata', /<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
replaceOnce('Twitter title', /<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
replaceOnce('Twitter description', /<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const faq = [
  ['Is this medical-bill example a real patient bill?', 'No. It is a fictional educational scenario. The fields and review signals are illustrative and are not evidence about a provider, insurer, patient, or typical medical bill.'],
  ['What should I compare with a medical bill?', 'Compare the itemized bill with the Explanation of Benefits, provider or facility records, prior payments, estimates, and any other document that explains the service, adjustment, or patient responsibility.'],
  ['Does a repeated medical-bill line prove duplicate billing?', 'No. A repeated-looking line is a question to investigate. It may reflect separate units, dates, providers, services, corrections, or a display convention. Ask the billing office to explain it and compare the EOB.'],
  ['Is an Explanation of Benefits the same as a bill?', 'No. CMS describes an Explanation of Benefits as a notice from the health plan that helps explain what the plan covers and what the patient may owe; it is not itself a bill.'],
  ['Can AI determine whether a medical charge is correct?', 'AI-assisted review may organize documents and surface repeated descriptions, amount differences, or questions. It cannot determine medical necessity, coding correctness, coverage, legality, or the final amount owed from the documents alone.'],
  ['What should I do if my bill does not match my Explanation of Benefits?', 'Keep the bill and EOB, identify the exact service, date, amount, and patient-responsibility difference, then contact the provider or facility and health plan using their current instructions. Seek qualified help when the consequences are significant.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

const schemas = [
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'DetectHiddenFees', url: 'https://detecthiddenfees.com/', sameAs: ['https://hiddenfeeai.com'], '@id': 'https://detecthiddenfees.com/#organization' },
  { '@context': 'https://schema.org', '@type': 'Article', headline: title, description, author: { '@type': 'Organization', name: 'DetectHiddenFees' }, publisher: { '@id': 'https://detecthiddenfees.com/#organization' }, datePublished: '2026-07-22', dateModified: updated, '@id': 'https://detecthiddenfees.com/example-medical-bill#article', mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/example-medical-bill#webpage' } },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
    { '@type': 'ListItem', position: 2, name: 'Research Center', item: 'https://detecthiddenfees.com/research-center' },
    { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/example-medical-bill' }
  ] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: title, description, url: 'https://detecthiddenfees.com/example-medical-bill', inLanguage: 'en-US', datePublished: '2026-07-22', dateModified: updated, about: { '@type': 'Thing', name: 'Illustrative medical-bill reconciliation' }, isPartOf: { '@id': 'https://detecthiddenfees.com/#website' }, '@id': 'https://detecthiddenfees.com/example-medical-bill#webpage' },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq }
];

const headEnd = source.indexOf('<body>');
const head = source.slice(0, headEnd);
const ldBlocks = [...head.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)];
const ldStart = ldBlocks[0]?.index ?? -1;
const ldEnd = ldBlocks.length ? ldBlocks[ldBlocks.length - 1].index + ldBlocks[ldBlocks.length - 1][0].length : -1;
if (headEnd < 0 || ldStart < 0 || ldEnd < 0) throw new Error('Could not locate existing JSON-LD blocks');
const ldHtml = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
source = source.slice(0, ldStart) + ldHtml + source.slice(ldEnd);

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');


source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeFooter();
removeStickyProductBar();
source = source.replace(/"dateModified": "2026-07-22"/g, `"dateModified": "${updated}"`);
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated medical-bill example with fictional-scenario labeling, CMS sources, contextual CTA, and FAQs.');
