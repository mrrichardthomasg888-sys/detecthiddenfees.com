const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'example-hvac-estimate.html');
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

function normalizeResearchFooter() {
  source = source.replaceAll('Document Intelligence Center', 'AI Analysis Hub');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*hidden fees in agreements<\/span>/, '<a href="/hidden-contract-fees" style="color:#93c5fd;font-weight:600;">Hidden fees in agreements</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*detect billing errors<\/span>/, '<a href="/ai-bill-analyzer" style="color:#93c5fd;font-weight:600;">Detect billing errors</a>');
  source = source.replace(/<span style="color:#94a3b8;font-size:.85rem;">[^<]*find hidden costs<\/span>/, '<a href="/hidden-fee-examples" style="color:#93c5fd;font-weight:600;">Find hidden costs</a>');
  source = source.replace(/>July 2026</g, '>August 8, 2026<');
}

function ensureVisibleUpdateDate() {
  if (source.includes(`<time datetime="${updated}">`)) return;
  const marker = '</p><div class="trust-bar">';
  const replacement = `</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="trust-bar">`;
  const next = source.replace(marker, replacement);
  if (next === source) throw new Error('Could not find the HVAC hero trust bar for the visible update date');
  source = next;
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace('</head>', `${replacement}</head>`);
}

const title = 'HVAC Estimate Example: How to Review Equipment, Labor, Permits, and Fees | DetectHiddenFees';
const displayTitle = 'HVAC Estimate Example: How to Review Equipment, Labor, Permits, and Fees';
const description = 'A fictional HVAC estimate example showing how to reconcile equipment, labor, permits, materials, optional products, and total cost without treating an illustration as a market benchmark.';
const updated = '2026-08-08';

const faq = [
  ['Is this HVAC estimate a real customer document?', 'No. It is a fictional educational scenario. Its variables and questions demonstrate a review method; they do not describe a real contractor, project, market price, or customer result.'],
  ['What should an HVAC estimate identify?', 'Ask for the equipment model and scope, labor and installation work, permits or inspections, materials, delivery or disposal, taxes, warranties or service plans, financing, and every other charge included in the total.'],
  ['Can an estimate alone prove that a fee is excessive?', 'No. A quote can identify an amount or vague description to question, but fair value and legal requirements depend on the work, location, contract, equipment, timing, and other evidence.'],
  ['How can I verify a permit charge?', 'Ask which local authority and permit type apply, then compare the quoted amount with the current official fee schedule or written confirmation. Permit rules and charges vary by jurisdiction.'],
  ['Can AI determine whether an HVAC installation will be done correctly?', 'No. AI-assisted review may organize the written estimate and flag missing or inconsistent terms, but it cannot inspect the equipment, verify workmanship, or guarantee performance from the document alone.'],
  ['What should I do before signing an HVAC proposal?', 'Get the scope and total in writing, compare more than one written estimate when practical, confirm licensing and insurance requirements, ask about payment and cancellation terms, and keep the proposal and contract.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

if (source.includes('This fictional HVAC estimate demonstrates how to reconcile')) {
  removeStickyProductBar();
  normalizeResearchFooter();
  ensureVisibleUpdateDate();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The HVAC estimate example is already remediated; normalized the research footer and sticky bar.');
  process.exit(0);
}

replaceOnce('title', /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${description}">`);
replaceOnce('Open Graph title', /<meta property="og:title" content="[^"]*"\s*\/?\s*>/, `<meta property="og:title" content="${title}">`);
replaceOnce('Open Graph description', /<meta property="og:description" content="[^"]*"\s*\/?\s*>/, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/, `<meta name="twitter:description" content="${description}">`);

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-22',
    dateModified: updated,
    articleSection: 'Educational examples',
    about: { '@type': 'Thing', name: 'Illustrative HVAC estimate review' },
    '@id': 'https://detecthiddenfees.com/example-hvac-estimate#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/example-hvac-estimate#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Analysis Hub', item: 'https://detecthiddenfees.com/ai-analysis-hub' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/example-hvac-estimate' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/example-hvac-estimate',
    inLanguage: 'en-US',
    datePublished: '2026-07-22',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Illustrative HVAC estimate document review' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/example-hvac-estimate#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-analysis-hub">AI Analysis Hub</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">EDUCATIONAL EXAMPLE</div><h1>${displayTitle}</h1><p class="hero-sub">This fictional HVAC estimate demonstrates how to reconcile equipment, labor, permits, materials, optional products, and the total amount. It is a teaching example - not a real customer document, market benchmark, legal conclusion, or promised savings result.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="trust-bar"><span>Fictional variables are labeled</span><span>Questions replace conclusions</span><span>Local rules matter</span><span>Human verification required</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="topic-box"><h3>Direct answer: what does this example teach?</h3><p>It shows how to compare every line in an HVAC proposal with the written scope, local requirements, and the promised total. It does not establish that a charge is hidden, excessive, deceptive, or unlawful from the estimate alone.</p><p><strong>Scenario boundary:</strong> the example uses variables instead of market prices. Use the reconciliation method and questions, not fictional values, when reviewing your own proposal.</p></div></div></section><section class="section"><div class="container"><h2 id="scenario">The fictional scenario</h2><p>A homeowner receives a written proposal for replacement heating or cooling work. To keep the illustration evidence-safe, the inputs are represented as variables: equipment price <strong>E</strong>, labor and installation <strong>L</strong>, permit or inspection charge <strong>P</strong>, materials <strong>M</strong>, delivery or disposal <strong>D</strong>, other disclosed charges <strong>O</strong>, and quoted total <strong>Q = E + L + P + M + D + O</strong>.</p><div class="card"><h3>What to reconcile</h3><ul><li><strong>Equipment:</strong> model, capacity, included components, warranty, and any manufacturer or supplier documentation.</li><li><strong>Work:</strong> labor, installation steps, testing, removal, cleanup, and the conditions that could trigger a change order.</li><li><strong>Permits and inspections:</strong> which authority and permit type apply, who obtains them, and how the amount was determined.</li><li><strong>Other charges:</strong> materials, delivery, disposal, diagnostic or dispatch charges, taxes, financing, service plans, and optional products.</li><li><strong>Total:</strong> whether every line reconciles to the written total and payment schedule.</li></ul></div></div></section><section class="section"><div class="container"><h2 id="questions">Questions to ask about a real estimate</h2><p>A line item can be worth questioning without proving that it is improper. Ask for written answers and preserve the source documents.</p><div class="guide-grid"><div class="guide-card"><h3>Equipment and materials</h3><p>What is the make, model, capacity, and included equipment? Which materials are included, and which are allowances or exclusions?</p></div><div class="guide-card"><h3>Labor and scope</h3><p>What work is included, how will testing and cleanup be handled, and what events could change the scope or price?</p></div><div class="guide-card"><h3>Permits and inspections</h3><p>Which local authority sets the requirement? Who applies for the permit, and can the current fee schedule or receipt be provided?</p></div><div class="guide-card"><h3>Optional products</h3><p>Are warranties, service plans, financing, maintenance, or accessories optional? What do they cost and how can they be canceled?</p></div><div class="guide-card"><h3>Payment and cancellation</h3><p>What deposit, milestone, final-payment, cancellation, and change-order terms apply? Are blank spaces and contingencies completed?</p></div><div class="guide-card"><h3>Comparison</h3><p>Can you compare another written estimate using the same equipment, scope, assumptions, taxes, permits, and optional products?</p></div></div></div></section><section class="section"><div class="container"><h2 id="workflow">How to review an HVAC proposal</h2><div class="card"><h3>1. Preserve the complete proposal</h3><p>Keep every page, attachment, equipment schedule, warranty, financing document, change-order provision, and message that affects the scope or price.</p></div><div class="card"><h3>2. Separate required, optional, and unknown items</h3><p>Mark what the contractor says is required, what you chose, and what is not explained. Do not assume a label such as administrative, service, or miscellaneous describes the underlying work.</p></div><div class="card"><h3>3. Verify local requirements</h3><p>Check the applicable building or permit authority and current official schedule. A general internet estimate cannot establish the fee for a particular jurisdiction.</p></div><div class="card"><h3>4. Compare like with like</h3><p>When practical, obtain more than one written estimate using the same equipment, scope, timing, and assumptions. A lower total may omit work or use different equipment.</p></div><div class="card"><h3>5. Get explanations in writing</h3><p>Ask the contractor to identify each amount, the work it covers, and any event that can change it. Keep the written response with the proposal.</p></div></div></section><section class="section"><div class="container"><h2 id="sources">Official guidance and limitations</h2><p>The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam" rel="noopener noreferrer">FTC home-improvement guidance</a> recommends checking licensing and insurance, getting multiple written estimates, reading the contract, and asking for an explanation when estimates differ. It also notes that contract requirements and down-payment rules can vary by state or locality.</p><p>The <a href="https://www.epa.gov/ods-phaseout/homeowners-and-consumers-frequently-asked-questions" rel="noopener noreferrer">EPA homeowner HVAC FAQ</a> explains questions to ask an HVAC contractor and points consumers toward qualified technicians for refrigerant-related work. The <a href="https://www.energy.gov/sites/default/files/2021-08/ES-HomeHeatingandCooling_081221.pdf" rel="noopener noreferrer">Department of Energy consumer heating-and-cooling guide</a> provides additional equipment and contractor context.</p><p>These sources do not set a universal equipment price, labor rate, permit amount, markup, or savings result. AI-assisted review may organize a proposal and flag missing or inconsistent text, but it cannot inspect workmanship, verify a local permit charge, determine fair value, or guarantee a project outcome from the document alone.</p><h2 id="faq">Frequently asked questions</h2><div class="card"><h3>Is this HVAC estimate a real customer document?</h3><p>No. It is a fictional educational scenario. Its variables and questions demonstrate a review method; they do not describe a real contractor, project, market price, or customer result.</p></div><div class="card"><h3>What should an HVAC estimate identify?</h3><p>Ask for the equipment model and scope, labor and installation work, permits or inspections, materials, delivery or disposal, taxes, warranties or service plans, financing, and every other charge included in the total.</p></div><div class="card"><h3>Can an estimate alone prove that a fee is excessive?</h3><p>No. A quote can identify an amount or vague description to question, but fair value and legal requirements depend on the work, location, contract, equipment, timing, and other evidence.</p></div><div class="card"><h3>How can I verify a permit charge?</h3><p>Ask which local authority and permit type apply, then compare the quoted amount with the current official fee schedule or written confirmation. Permit rules and charges vary by jurisdiction.</p></div><div class="card"><h3>Can AI determine whether an HVAC installation will be done correctly?</h3><p>No. AI-assisted review may organize the written estimate and flag missing or inconsistent terms, but it cannot inspect the equipment, verify workmanship, or guarantee performance from the document alone.</p></div><div class="card"><h3>What should I do before signing an HVAC proposal?</h3><p>Get the scope and total in writing, compare more than one written estimate when practical, confirm licensing and insurance requirements, ask about payment and cancellation terms, and keep the proposal and contract.</p></div><div class="warning-box"><h3>Disclaimer</h3><p>This is general educational information and a fictional example. It is not legal, financial, engineering, HVAC, tax, or professional advice.</p></div></div></section><section class="section"><div class="container"><h2>Need help organizing a real HVAC estimate?</h2><p>HiddenFeeAI is the related document-analysis product. Confirm its current first-party product, privacy, and retention details before uploading a proposal.</p><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="estimate_review" data-cta-position="end" data-cta-variant="contextual">Review My HVAC Estimate</a></div></section><section class="section"><div class="container"><h2>Continue the research</h2><div class="guide-grid"><a href="/hidden-hvac-contractor-fees" class="guide-card">HVAC Contractor Fee Guide</a><a href="/ai-estimate-review" class="guide-card">AI Estimate Review Guide</a><a href="/hidden-fee-examples" class="guide-card">Hidden Fee Examples</a><a href="/research-center" class="guide-card">Research Center</a><a href="/editorial-policy" class="guide-card">Editorial Policy</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeResearchFooter();
removeStickyProductBar();
ensureVisibleUpdateDate();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated HVAC estimate example with fictional variables, official guidance, contextual CTA, and FAQs.');
