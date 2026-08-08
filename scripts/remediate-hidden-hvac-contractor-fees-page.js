const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'hidden-hvac-contractor-fees.html');
let source = fs.readFileSync(file, 'utf8');

const updated = '2026-08-08';
const title = 'Hidden HVAC Contractor Fees: How to Review an Estimate for Scope, Permits, and Add-Ons | DetectHiddenFees';
const displayTitle = 'Hidden HVAC Contractor Fees: How to Review an Estimate for Scope, Permits, and Add-Ons';
const description = 'A source-aware guide to reviewing HVAC estimates for equipment, labor, permits, materials, disposal, financing, service plans, and change-order terms without treating a document review as a price verdict.';

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate the document end after the sticky CTA bar');
  source = source.slice(0, stickyStart) + source.slice(bodyEnd);
}

function normalizeFooter() {
  source = source.replaceAll('Financial Intelligence Center', 'AI Analysis Hub');
  source = source.replace('Last updated July 2026', 'Last updated August 8, 2026');
  source = source.replace('AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers', 'Financial Transparency Resources');
  source = source.replace('AI-Powered Hidden Fee Detection for Consumers', 'Financial Transparency Resources');
}

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace('</head>', `${replacement}</head>`);
}

function annotateCtas() {
  source = source.replace(/<a\b[^>]*href="https:\/\/hiddenfeeai\.com"[^>]*>[\s\S]*?<\/a>/gi, (block) => {
    if (block.includes('data-cta-action=')) return block;
    return block.replace('<a ', '<a data-cta-action="estimate_review" data-cta-position="end" data-cta-variant="contextual" ');
  });
}

const faq = [
  ['What should an HVAC estimate identify?', 'Ask for the equipment model and scope, labor and installation work, permits or inspections, materials, delivery or disposal, taxes, warranties or service plans, financing, and every other charge included in the total.'],
  ['Does a vague HVAC line item prove a hidden fee?', 'No. A vague description is a reason to ask for an explanation and written scope, not proof that a charge is improper, excessive, deceptive, or unlawful.'],
  ['How can I compare HVAC estimates?', 'Compare like-for-like equipment, capacity, installation steps, materials, permits, testing, cleanup, warranty, financing, timing, exclusions, and total assumptions. A lower total may omit work or use different equipment.'],
  ['How should I verify a permit or inspection charge?', 'Ask which local authority and permit type apply, who obtains the permit, what the charge covers, and whether the current official fee schedule or receipt can be provided. Requirements and amounts vary by jurisdiction.'],
  ['Why might emergency HVAC work cost more?', 'After-hours labor, dispatch, equipment availability, travel, and urgent site conditions can affect a price. Ask for the specific charge, the work it covers, and whether non-emergency scheduling changes the estimate.'],
  ['What should I ask about warranties and service plans?', 'Ask whether each warranty, maintenance plan, accessory, or service contract is optional, what it covers, exclusions, duration, cancellation terms, and how its price appears in the total.'],
  ['Can AI determine whether an HVAC estimate is fair?', 'No. AI-assisted review may organize written terms and flag missing or inconsistent text. It cannot inspect workmanship, verify local requirements, establish fair value, or guarantee a project result from the document alone.'],
  ['What should I do before signing an HVAC proposal?', 'Preserve the complete proposal, compare written estimates when practical, confirm licensing and insurance requirements, ask for unclear terms in writing, and seek qualified HVAC, construction, or legal advice when the decision is consequential.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

if (source.includes('A responsible HVAC estimate review starts with')) {
  normalizeFooter();
  removeStickyProductBar();
  annotateCtas();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The HVAC guide is already remediated; normalized the footer, sticky bar, and CTA metadata.');
  process.exit(0);
}

upsertMeta(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}">`);
upsertMeta(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}">`);
upsertMeta(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}">`);

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DetectHiddenFees',
    url: 'https://detecthiddenfees.com/',
    logo: 'https://detecthiddenfees.com/logo.png',
    description: 'DetectHiddenFees provides research and educational resources about hidden fees, contract charges, and document review. HiddenFeeAI is its separate AI-powered document-analysis product.',
    sameAs: ['https://hiddenfeeai.com'],
    '@id': 'https://detecthiddenfees.com/#organization'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DetectHiddenFees',
    url: 'https://detecthiddenfees.com/',
    '@id': 'https://detecthiddenfees.com/#website'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-17',
    dateModified: updated,
    articleSection: 'HVAC estimate review',
    '@id': 'https://detecthiddenfees.com/hidden-hvac-contractor-fees#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/hidden-hvac-contractor-fees#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Contract Review', item: 'https://detecthiddenfees.com/ai-contract-review' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/hidden-hvac-contractor-fees' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/hidden-hvac-contractor-fees',
    inLanguage: 'en-US',
    datePublished: '2026-07-17',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'HVAC estimate and contractor-fee review' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/hidden-hvac-contractor-fees#webpage'
  },
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-contract-review">AI Contract Review</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="hero-label">HVAC ESTIMATE REVIEW</div><h1>${displayTitle}</h1><p class="hero-sub">An HVAC estimate should make the equipment, scope, labor, permits, materials, options, payment terms, and total understandable. A vague line or unexpected amount is a question to verify, not proof of a hidden fee or improper pricing.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="trust-bar"><span>Reconcile scope and equipment</span><span>Check local permit terms</span><span>Compare like-for-like estimates</span><span>AI is not professional advice</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="checklist-section"><h2>Direct answer: what should an HVAC proposal show?</h2><p>Look for a measurable description of the work, equipment information, labor and installation steps, permits or inspections, materials, delivery or disposal, taxes, warranties or service plans, financing, exclusions, change-order terms, and a quoted total. Ask the provider to explain anything that cannot be reconciled with the written scope.</p><div class="checklist-grid"><span>Equipment model and capacity</span><span>Installation scope and testing</span><span>Materials, delivery, and disposal</span><span>Permits and inspections</span><span>Warranty and optional plans</span><span>Payment and change terms</span></div></div></div></section><section class="section"><div class="container"><h2>HVAC estimate areas to review</h2><div class="leverage-grid"><div class="leverage-section"><h3>Equipment and accessories</h3><p>Record the make, model, capacity, included components, efficiency information, warranty, controls, accessories, and any manufacturer or supplier documentation.</p></div><div class="leverage-section"><h3>Labor and installation</h3><p>Ask what removal, preparation, installation, testing, startup, cleanup, and follow-up work are included. Identify conditions that could trigger a written change order.</p></div><div class="leverage-section"><h3>Permits and inspections</h3><p>Ask which local authority and permit type apply, who obtains them, what inspections are required, and how the quoted amount was determined.</p></div><div class="leverage-section"><h3>Materials and refrigerant work</h3><p>Check line sets, wiring, ductwork, drains, pads, filters, refrigerant-related work, delivery, disposal, and other materials that may be included, excluded, or listed as allowances.</p></div><div class="leverage-section"><h3>Financing and service plans</h3><p>Separate the project price from financing charges, maintenance plans, warranties, accessories, and other optional products. Ask for coverage, exclusions, duration, and cancellation terms.</p></div><div class="leverage-section"><h3>Emergency or site-condition charges</h3><p>Ask what after-hours, dispatch, access, weather, concealed-condition, or additional-work charges cover and when they can be added to the proposal.</p></div></div></div></section><section class="section"><div class="container"><h2>A responsible HVAC estimate review workflow</h2><div class="leverage-section"><h3>1. Preserve the complete proposal</h3><p>Keep every page, equipment schedule, warranty, financing document, change-order provision, and message that affects scope or price.</p></div><div class="leverage-section"><h3>2. Separate included, optional, and unknown items</h3><p>Mark what the contractor says is included, what you selected, and what is not explained. Do not assume that “service,” “administrative,” or “miscellaneous” describes the underlying work.</p></div><div class="leverage-section"><h3>3. Reconcile the total</h3><p>Compare equipment, labor, materials, permits, taxes, options, credits, deposits, and payment milestones with the quoted total. Note each unexplained difference.</p></div><div class="leverage-section"><h3>4. Compare like with like</h3><p>When practical, obtain more than one written estimate using the same equipment, capacity, scope, timing, permits, options, and assumptions. A lower total may omit work or use different equipment.</p></div><div class="leverage-section"><h3>5. Get explanations in writing</h3><p>Ask the contractor to identify each amount, the work it covers, and any event that can change it. Keep the response with the proposal before approving work.</p></div></div></section><section class="section"><div class="container"><h2>Review signals are not findings</h2><p>These questions can help organize a conversation:</p><div class="leverage-grid"><div class="leverage-section"><h3>Unclear description</h3><p>Ask what work or material a line covers, who performs it, and where it appears in the scope or specifications.</p></div><div class="leverage-section"><h3>Different totals</h3><p>Reconcile the estimate with financing, deposit, taxes, credits, allowances, and any later change order before assuming an error.</p></div><div class="leverage-section"><h3>Permit or disposal amount</h3><p>Ask which authority or provider sets the requirement and whether a current fee schedule, receipt, or written basis is available.</p></div><div class="leverage-section"><h3>Optional product</h3><p>Ask whether a warranty, service plan, accessory, or financing product is optional and how its terms appear in the final agreement.</p></div></div><p class="disclaimer"><strong>Limit:</strong> A document review cannot inspect workmanship, verify a local fee, establish fair value, or determine legality from the estimate alone.</p></div></section><section class="section"><div class="container"><h2>Official guidance and AI limitations</h2><p>The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam" rel="noopener noreferrer">FTC home-improvement guidance</a> recommends checking licensing and insurance, getting multiple written estimates, reading the contract, and asking for an explanation when estimates differ. It notes that requirements and down-payment rules can vary by state or locality.</p><p>The <a href="https://www.epa.gov/ods-phaseout/homeowners-and-consumers-frequently-asked-questions" rel="noopener noreferrer">EPA homeowner HVAC FAQ</a> provides questions for choosing an HVAC technician and context for refrigerant-related work. The <a href="https://www.energy.gov/sites/default/files/2021-08/ES-HomeHeatingandCooling_081221.pdf" rel="noopener noreferrer">Department of Energy heating-and-cooling guide</a> provides additional equipment and contractor context.</p><p>These sources do not set a universal equipment price, labor rate, permit amount, markup, or savings result. AI-assisted review may organize an estimate and surface missing or inconsistent text, but it cannot inspect the installation, verify a local charge, determine fair value, or guarantee performance from the document alone.</p><h2>Frequently asked questions</h2><div class="faq"><div class="faq-item"><h3>What should an HVAC estimate identify?</h3><p>Ask for the equipment model and scope, labor and installation work, permits or inspections, materials, delivery or disposal, taxes, warranties or service plans, financing, and every other charge included in the total.</p></div><div class="faq-item"><h3>Does a vague HVAC line item prove a hidden fee?</h3><p>No. A vague description is a reason to ask for an explanation and written scope, not proof that a charge is improper, excessive, deceptive, or unlawful.</p></div><div class="faq-item"><h3>How can I compare HVAC estimates?</h3><p>Compare like-for-like equipment, capacity, installation steps, materials, permits, testing, cleanup, warranty, financing, timing, exclusions, and total assumptions. A lower total may omit work or use different equipment.</p></div><div class="faq-item"><h3>How should I verify a permit or inspection charge?</h3><p>Ask which local authority and permit type apply, who obtains the permit, what the charge covers, and whether the current official fee schedule or receipt can be provided. Requirements and amounts vary by jurisdiction.</p></div><div class="faq-item"><h3>Why might emergency HVAC work cost more?</h3><p>After-hours labor, dispatch, equipment availability, travel, and urgent site conditions can affect a price. Ask for the specific charge, the work it covers, and whether non-emergency scheduling changes the estimate.</p></div><div class="faq-item"><h3>What should I ask about warranties and service plans?</h3><p>Ask whether each warranty, maintenance plan, accessory, or service contract is optional, what it covers, exclusions, duration, cancellation terms, and how its price appears in the total.</p></div><div class="faq-item"><h3>Can AI determine whether an HVAC estimate is fair?</h3><p>No. AI-assisted review may organize written terms and flag missing or inconsistent text. It cannot inspect workmanship, verify local requirements, establish fair value, or guarantee a project result from the document alone.</p></div><div class="faq-item"><h3>What should I do before signing an HVAC proposal?</h3><p>Preserve the complete proposal, compare written estimates when practical, confirm licensing and insurance requirements, ask for unclear terms in writing, and seek qualified HVAC, construction, or legal advice when the decision is consequential.</p></div></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource provides general educational information about reviewing HVAC estimates. It is not legal, financial, engineering, HVAC, tax, or professional advice.</div></div></section><section class="section"><div class="container"><div class="cta"><h2>Need help organizing an HVAC estimate review?</h2><p>HiddenFeeAI is the related document-analysis product. Confirm its current first-party product, privacy, and retention details before uploading an estimate or proposal.</p><a href="https://hiddenfeeai.com" class="cta-button" data-cta-action="estimate_review" data-cta-position="end" data-cta-variant="contextual">Review My HVAC Estimate</a></div></div></section><section class="section"><div class="container"><h2>Related HVAC and contract resources</h2><div class="related-grid"><a class="related-link" href="/example-hvac-estimate">HVAC Estimate Example</a><a class="related-link" href="/ai-estimate-review">AI Estimate Review</a><a class="related-link" href="/example-home-renovation-proposal">Home Renovation Proposal Example</a><a class="related-link" href="/ai-construction-contract-review">Construction Contract Review</a><a class="related-link" href="/hidden-fee-examples">Hidden Fee Examples</a><a class="related-link" href="/editorial-policy">Editorial Policy</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeFooter();
removeStickyProductBar();
annotateCtas();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated HVAC contractor-fee guide with evidence-safe review signals, official sources, contextual CTA, and FAQs.');
