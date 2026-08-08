const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'example-home-renovation-proposal.html');
let source = fs.readFileSync(file, 'utf8');

const updated = '2026-08-08';
const title = 'Home Renovation Proposal Example: How to Reconcile Scope, Allowances, and Change Orders | DetectHiddenFees';
const displayTitle = 'Home Renovation Proposal Example: How to Reconcile Scope, Allowances, and Change Orders';
const description = 'A fictional home-renovation proposal example showing how to reconcile scope, allowances, permits, subcontractors, change orders, and total cost without treating an illustration as a real finding or market benchmark.';

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate the document end after the sticky CTA bar');
  source = source.slice(0, stickyStart) + source.slice(bodyEnd);
}

function normalizeFooter() {
  source = source.replaceAll('Financial Intelligence Center', 'AI Analysis Hub');
  source = source.replace('AI-Powered Hidden Fee Detection for Consumers', 'Financial Transparency Resources');
  source = source.replace('AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers', 'Financial Transparency Resources');
}

function ensureVisibleUpdateDate() {
  if (source.includes(`<time datetime="${updated}">`)) return;
  const marker = '</p><div class="trust-bar">';
  const replacement = `</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="trust-bar">`;
  const next = source.replace(marker, replacement);
  if (next === source) throw new Error('Could not find the renovation-example trust bar for the visible update date');
  source = next;
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
  ['Is this home-renovation proposal a real customer document?', 'No. It is a fictional educational scenario. The variables and questions demonstrate a review method; they do not describe a real contractor, project, market price, customer result, or legal finding.'],
  ['What should a renovation proposal identify?', 'Ask for a measurable scope, materials and finishes, allowances, exclusions, permits, design or coordination work, subcontractor responsibilities, schedule, payment milestones, change-order terms, cleanup, warranties, and the quoted total.'],
  ['Does an allowance prove that a contractor is overcharging?', 'No. An allowance is a contract term that needs context. Ask what it covers, how selections affect the price, whether unused amounts are credited, and how changes are documented.'],
  ['Can a subcontractor markup be improper?', 'Not from an illustrative example or a document line alone. Ask what coordination or deliverable the amount covers, whether it is disclosed, and whether the contract assigns responsibility for subcontractors and changes.'],
  ['How should I review a change-order fee?', 'Check what triggers the fee, whether written approval is required, how the amount is calculated, what work it covers, and whether it changes the schedule or total. Confirm the answer in the signed documents.'],
  ['What should I ask about permits and disposal?', 'Ask which authority, permit, inspection, disposal, or delivery requirement applies, who performs it, what is included, and how the quoted amount was determined. Local requirements and charges vary.'],
  ['Can AI determine whether a renovation charge is excessive or deceptive?', 'No. AI-assisted review may organize a proposal and surface unclear or inconsistent terms for questions. It cannot establish fair value, workmanship, legality, or a successful dispute from the document alone.'],
  ['What should I do before signing a renovation proposal?', 'Preserve the complete proposal, compare like-for-like written estimates when practical, verify licensing and insurance requirements, get unclear terms in writing, and seek qualified legal or construction advice for consequential decisions.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

if (source.includes('This fictional home-renovation scenario demonstrates how to reconcile a proposal')) {
  normalizeFooter();
  removeStickyProductBar();
  ensureVisibleUpdateDate();
  annotateCtas();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The home-renovation example is already remediated; normalized the footer, update date, sticky bar, and CTA metadata.');
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
    datePublished: '2026-07-22',
    dateModified: updated,
    articleSection: 'Educational examples',
    '@id': 'https://detecthiddenfees.com/example-home-renovation-proposal#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/example-home-renovation-proposal#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Research Center', item: 'https://detecthiddenfees.com/research-center' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: 'https://detecthiddenfees.com/example-home-renovation-proposal' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/example-home-renovation-proposal',
    inLanguage: 'en-US',
    datePublished: '2026-07-22',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Illustrative home-renovation proposal review' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/example-home-renovation-proposal#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/research-center">Research Center</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">EDUCATIONAL EXAMPLE</div><h1>${displayTitle}</h1><p class="hero-sub">This fictional home-renovation scenario demonstrates how to reconcile a proposal's scope, allowances, permits, subcontractors, change orders, and total cost. It is a teaching example - not a real customer document, market benchmark, legal conclusion, or promised savings result.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="trust-bar"><span>Fictional variables are labeled</span><span>Questions replace conclusions</span><span>Local rules matter</span><span>Human verification required</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="topic-box"><h3>Direct answer: what does this example teach?</h3><p>It shows how to compare a renovation proposal with its scope, allowances, exclusions, related estimates, change-order terms, and promised total. It does not prove that a charge is hidden, excessive, deceptive, unlawful, or unnecessary from an illustration or proposal line alone.</p><p><strong>Scenario boundary:</strong> the example uses variables instead of invented market prices or overcharge findings. Use the reconciliation method and questions, not fictional values, when reviewing your own proposal.</p></div></div></section><section class="section"><div class="container"><h2>The fictional scenario</h2><p>A homeowner receives a written kitchen-renovation proposal. To keep the illustration evidence-safe, the inputs are represented as variables: cabinets and surfaces <strong>C</strong>, labor and installation <strong>L</strong>, plumbing and electrical work <strong>S</strong>, materials and tile <strong>M</strong>, permits and design <strong>P</strong>, allowances <strong>A</strong>, other disclosed charges <strong>O</strong>, and quoted total <strong>Q = C + L + S + M + P + A + O</strong>.</p><div class="card"><h3>What to reconcile</h3><ul><li><strong>Scope:</strong> demolition, preparation, installation, finishes, cleanup, testing, and the work excluded from the proposal.</li><li><strong>Materials and allowances:</strong> brands, models, quantities, finish selections, allowance amounts, substitutions, credits, and change effects.</li><li><strong>Subcontractors:</strong> who performs plumbing, electrical, design, permits, or other work and what coordination or markup terms are disclosed.</li><li><strong>Other charges:</strong> delivery, disposal, protection, project management, permits, inspections, financing, service plans, and optional products.</li><li><strong>Total:</strong> whether every line reconciles to the quoted total, payment schedule, and any stated contingency.</li></ul></div></div></section><section class="section"><div class="container"><h2>Questions to ask about a real renovation proposal</h2><p>A line item can be worth questioning without proving that it is improper. Ask for written answers and preserve the source documents.</p><div class="guide-grid"><div class="guide-card"><h3>Scope and exclusions</h3><p>What work, materials, protection, disposal, cleanup, permits, and finishes are included? Which items are expressly excluded or dependent on site conditions?</p></div><div class="guide-card"><h3>Allowances and selections</h3><p>What does each allowance cover, how are selections priced, are unused amounts credited, and what written process applies if the selected item costs more or less?</p></div><div class="guide-card"><h3>Subcontractors and coordination</h3><p>Which trades or suppliers are involved, who contracts with them, what work does each amount cover, and where are coordination or markup terms disclosed?</p></div><div class="guide-card"><h3>Change orders</h3><p>What triggers a change, who approves it, how the price is calculated, and how does the change affect the schedule, payment milestones, and final total?</p></div><div class="guide-card"><h3>Permits, delivery, and disposal</h3><p>Which authority or provider sets the requirement, who performs the work, what is included, and how can the quoted amount be verified?</p></div><div class="guide-card"><h3>Payment and cancellation</h3><p>What deposit, milestones, final-payment, cancellation, warranty, and dispute terms apply? Are blank spaces and contingencies completed?</p></div></div></div></section><section class="section"><div class="container"><h2>How to review a real renovation proposal</h2><div class="card"><h3>1. Preserve the complete record</h3><p>Keep every proposal page, plan, specification, allowance schedule, addendum, change order, warranty, financing document, and message that affects scope or price.</p></div><div class="card"><h3>2. Separate included, optional, and unknown items</h3><p>Mark what the contractor says is included, what you selected, and what is not explained. Do not assume that a label such as administrative, coordination, or miscellaneous identifies the underlying work.</p></div><div class="card"><h3>3. Reconcile related documents</h3><p>Compare the proposal with drawings, selections, allowances, invoices, permits, and change orders. Note any item that appears both included and extra or whose description changes between documents.</p></div><div class="card"><h3>4. Compare like with like</h3><p>When practical, obtain more than one written estimate using the same scope, materials, timing, taxes, permits, allowances, and optional products. A lower total may omit work or use different assumptions.</p></div><div class="card"><h3>5. Get explanations in writing</h3><p>Ask the contractor to identify each amount, the work it covers, and any event that can change it. Keep the written response with the proposal before approving work.</p></div></div></section><section class="section"><div class="container"><h2>Official guidance and limitations</h2><p>The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam" rel="noopener noreferrer">FTC home-improvement guidance</a> recommends checking licensing and insurance, getting multiple written estimates, reading the contract, and asking for an explanation when estimates differ. It notes that contract requirements and down-payment rules can vary by state or locality.</p><p>The FTC's <a href="https://consumer.ftc.gov/features/pass-it-on/home-repair-scams" rel="noopener noreferrer">home-repair scam guidance</a> also recommends written estimates and a signed contract before work begins. These sources provide consumer context; they do not validate this fictional scenario or decide whether a real charge is fair, deceptive, or lawful.</p><p>AI-assisted review may organize a proposal, compare related text, and surface missing or inconsistent terms for questions. It cannot inspect workmanship, verify local requirements, establish fair value, determine legality, or guarantee a negotiation or project result from the document alone.</p><h2>Frequently asked questions</h2><div class="card"><h3>Is this home-renovation proposal a real customer document?</h3><p>No. It is a fictional educational scenario. The variables and questions demonstrate a review method; they do not describe a real contractor, project, market price, customer result, or legal finding.</p></div><div class="card"><h3>What should a renovation proposal identify?</h3><p>Ask for a measurable scope, materials and finishes, allowances, exclusions, permits, design or coordination work, subcontractor responsibilities, schedule, payment milestones, change-order terms, cleanup, warranties, and the quoted total.</p></div><div class="card"><h3>Does an allowance prove that a contractor is overcharging?</h3><p>No. An allowance is a contract term that needs context. Ask what it covers, how selections affect the price, whether unused amounts are credited, and how changes are documented.</p></div><div class="card"><h3>Can a subcontractor markup be improper?</h3><p>Not from an illustrative example or a document line alone. Ask what coordination or deliverable the amount covers, whether it is disclosed, and whether the contract assigns responsibility for subcontractors and changes.</p></div><div class="card"><h3>How should I review a change-order fee?</h3><p>Check what triggers the fee, whether written approval is required, how the amount is calculated, what work it covers, and whether it changes the schedule or total. Confirm the answer in the signed documents.</p></div><div class="card"><h3>What should I ask about permits and disposal?</h3><p>Ask which authority, permit, inspection, disposal, or delivery requirement applies, who performs it, what is included, and how the quoted amount was determined. Local requirements and charges vary.</p></div><div class="card"><h3>Can AI determine whether a renovation charge is excessive or deceptive?</h3><p>No. AI-assisted review may organize a proposal and surface unclear or inconsistent terms for questions. It cannot establish fair value, workmanship, legality, or a successful dispute from the document alone.</p></div><div class="card"><h3>What should I do before signing a renovation proposal?</h3><p>Preserve the complete proposal, compare like-for-like written estimates when practical, verify licensing and insurance requirements, get unclear terms in writing, and seek qualified legal or construction advice for consequential decisions.</p></div><div class="disclaimer"><strong>Disclaimer:</strong> This resource is a fictional educational example and general document-review information. It is not legal, financial, accounting, tax, engineering, construction, or professional advice.</div></div></section><section class="section"><div class="container"><h2>Need help organizing a real renovation proposal?</h2><p>HiddenFeeAI is the related document-analysis product. Confirm its current first-party product, privacy, and retention details before uploading a proposal.</p><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="estimate_review" data-cta-position="end" data-cta-variant="contextual">Review My Renovation Proposal</a></div></section><section class="section"><div class="container"><h2>Continue the research</h2><div class="guide-grid"><a href="/hidden-home-renovation-fees" class="guide-card">Hidden Renovation Fees</a><a href="/ai-estimate-review" class="guide-card">AI Estimate Review</a><a href="/ai-construction-contract-review" class="guide-card">Construction Contract Review</a><a href="/hidden-fee-examples" class="guide-card">Hidden Fee Examples</a><a href="/research-center" class="guide-card">Research Center</a><a href="/editorial-policy" class="guide-card">Editorial Policy</a></div></div></section></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
normalizeFooter();
removeStickyProductBar();
annotateCtas();
ensureVisibleUpdateDate();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated home-renovation proposal example with fictional variables, official guidance, contextual CTA, and FAQs.');
