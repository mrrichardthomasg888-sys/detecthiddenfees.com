const fs = require('fs');

const pages = [
  ['hidden-fee-calculator', 'hidden fee calculator', ['calculate hidden fees', 'hidden costs calculator', 'fee estimator', 'unexpected fees', 'consumer fees']],
  ['contract-cost-calculator', 'contract cost calculator', ['contract cost estimator', 'contract pricing calculator', 'contract total cost', 'contract expense calculator']],
  ['automatic-renewal-calculator', 'automatic renewal calculator', ['auto renewal date', 'contract renewal calculator', 'renewal deadline', 'renewal notice calculator', 'cancel contract deadline']],
  ['price-escalation-calculator', 'price escalation calculator', ['escalation clause calculator', 'price increase calculator', 'contract escalation', 'inflation clause']],
  ['termination-fee-calculator', 'termination fee calculator', ['early termination fee', 'contract cancellation fee', 'termination penalty', 'exit fee calculator']],
  ['late-fee-calculator', 'late fee calculator', ['late payment calculator', 'late charge calculator', 'late fee estimate']],
  ['subscription-cost-calculator', 'subscription cost calculator', ['subscription fee calculator', 'subscription pricing', 'monthly subscription cost', 'annual subscription calculator']],
  ['service-fee-calculator', 'service fee calculator', ['service charge calculator', 'hidden service fees', 'extra service charges']],
  ['processing-fee-calculator', 'processing fee calculator', ['payment processing fees', 'credit card processing fee', 'merchant fees']],
  ['convenience-fee-calculator', 'convenience fee calculator', ['convenience charges', 'processing surcharge', 'payment surcharge']],
  ['contract-risk-calculator', 'contract risk calculator', ['contract risk score', 'agreement risk calculator', 'legal risk score', 'ai contract risk']],
  ['hidden-fee-risk-calculator', 'hidden fee risk calculator', ['hidden fee score', 'fee risk', 'contract hidden fee risk']],
  ['invoice-calculator', 'invoice calculator', ['invoice total calculator', 'invoice fee calculator', 'invoice review']],
  ['negotiation-savings-calculator', 'negotiation savings calculator', ['contract negotiation savings', 'cost reduction calculator', 'fee savings calculator']],
  ['consumer-savings-calculator', 'consumer savings calculator', ['money saved calculator', 'fee savings', 'contract savings']]
];
const requiredTopics = ['ai contract review', 'ai contract analysis', 'hidden fees', 'contract analysis', 'contract review', 'contract scanner', 'document analysis', 'bill analysis', 'invoice analysis', 'subscription fees', 'mandatory fees', 'optional fees', 'price escalation clause', 'automatic renewal clause', 'termination clause', 'fine print', 'unexpected charges', 'consumer protection', 'financial transparency', 'hiddenfeeai', 'detecthiddenfees'];
const requiredLinks = ['hidden-fee-transparency-index', 'contract-clause-library', 'research-center'];
const problems = [];
const seenTitles = new Set();
const seenPrimary = new Set();

function words(html) {
  const visible = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  return visible ? visible.split(' ').length : 0;
}

pages.forEach(([slug, primary, secondary]) => {
  const file = `${slug}.html`;
  if (!fs.existsSync(file)) { problems.push(`${file}: missing`); return; }
  const html = fs.readFileSync(file, 'utf8');
  const lower = html.toLowerCase();
  const title = (html.match(/<title>([^<]+)/i) || [])[1] || '';
  if (!title.toLowerCase().includes(primary)) problems.push(`${file}: primary keyword missing from title`);
  if (seenTitles.has(title)) problems.push(`${file}: duplicate title`);
  seenTitles.add(title);
  if (seenPrimary.has(primary)) problems.push(`${file}: duplicate primary intent`);
  seenPrimary.add(primary);
  secondary.forEach(keyword => { if (!lower.includes(keyword)) problems.push(`${file}: missing secondary keyword “${keyword}”`); });
  const count = words(html);
  if (count < 1200 || count > 1800) problems.push(`${file}: word count ${count} outside 1,200–1,800`);
  if (!/<h1[\s\S]*?<\/h1>/i.test(html)) problems.push(`${file}: missing H1`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) problems.push(`${file}: expected exactly one H1`);
  if (!lower.includes('src="/logo.png"')) problems.push(`${file}: missing approved DetectHiddenFees logo asset`);
  if (!lower.includes('phase2-global-nav')) problems.push(`${file}: missing approved global navigation`);
  if (!lower.includes('phase2-breadcrumb')) problems.push(`${file}: missing approved breadcrumb component`);
  if (!lower.includes('<footer>') || !lower.includes('footer-grid')) problems.push(`${file}: missing approved global footer`);
  if (!lower.includes('calculator-page')) problems.push(`${file}: missing shared calculator-page template class`);
  if (!lower.includes('href="/calculator-authority.css"')) problems.push(`${file}: missing shared calculator stylesheet`);
  if (!lower.includes('src="/calculator-authority.js"')) problems.push(`${file}: missing shared calculator script`);
  if ((html.match(/class="sticky-cta-bar/g) || []).length !== 1) problems.push(`${file}: expected exactly one sticky CTA`);
  ['calculator_top', 'calculator_result', 'calculator_bottom', 'calculator_sticky'].forEach(position => { if (!lower.includes(`data-cta-position="${position}"`)) problems.push(`${file}: missing ${position} CTA`); });
  if ((html.match(/data-cta-action="upload"/g) || []).length < 4) problems.push(`${file}: missing upload CTA locations`);
  if ((html.match(/data-cta-action="scan"/g) || []).length < 4) problems.push(`${file}: missing scan CTA locations`);
  if (!lower.includes('href="https://hiddenfeeai.com"')) problems.push(`${file}: missing approved HiddenFeeAI destination`);
  if (lower.includes('class="mobile-sticky')) problems.push(`${file}: duplicate legacy mobile sticky CTA present`);
  if (lower.includes('authority-layout') || lower.includes('authority-shell') || lower.includes('hero-grid')) problems.push(`${file}: legacy calculator-only template classes remain`);
  ['Article', 'BreadcrumbList', 'FAQPage'].forEach(type => { if (!lower.includes(`"@type":"${type.toLowerCase()}"`)) problems.push(`${file}: missing ${type} schema`); });
  requiredTopics.forEach(topic => { if (!lower.includes(topic)) problems.push(`${file}: missing topic “${topic}”`); });
  requiredLinks.forEach(link => { if (!lower.includes(`/${link}`)) problems.push(`${file}: missing internal link /${link}`); });
  ['Upload Document', 'Scan Document'].forEach(cta => { if (!html.includes(cta)) problems.push(`${file}: missing CTA “${cta}”`); });
  if (!lower.includes('https://hiddenfeeai.com')) problems.push(`${file}: missing HiddenFeeAI destination`);
  if (!lower.includes('data-calculator=')) problems.push(`${file}: missing interactive calculator form`);
  const internalLinks = [...html.matchAll(/href="(\/[^"]+)"/gi)].map(match => match[1].split('#')[0].replace(/^\//, '').replace(/\.html$/, '')).filter(Boolean);
  internalLinks.forEach(target => { if (!/\.(png|svg|css|js|jpg|jpeg|webp|gif|woff2?|ico)(\?.*)?$/i.test(target) && !fs.existsSync(`${target}.html`)) problems.push(`${file}: broken internal target /${target}`); });
});

if (!fs.existsSync('calculator-authority-center.html')) problems.push('calculator-authority-center.html: missing hub');
if (!fs.existsSync('calculator-authority.css')) problems.push('calculator-authority.css: missing shared design system');
if (!fs.existsSync('calculator-authority.js')) problems.push('calculator-authority.js: missing calculator logic');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
['calculator-authority-center', ...pages.map(([slug]) => slug), 'hidden-fee-transparency-index', 'contract-clause-library'].forEach(slug => { if (!sitemap.includes(`https://detecthiddenfees.com/${slug}`)) problems.push(`sitemap.xml: missing ${slug}`); });

if (problems.length) { console.error('VALIDATION FAILED'); problems.forEach(problem => console.error(`- ${problem}`)); process.exit(1); }
console.log(`VALIDATION PASSED: ${pages.length} calculator pages, unique intent, 1,200–1,800 words each, required topics, links, CTAs, schema, scripts, and sitemap entries verified.`);
