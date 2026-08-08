const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-estimate-review.html');
let source = fs.readFileSync(file, 'utf8');

const title = 'AI Estimate Review: Questions to Ask Before You Approve | DetectHiddenFees';
const displayTitle = 'AI Estimate Review: Questions to Ask Before You Approve';
const description = 'Review contractor estimates and service quotes for scope gaps, unclear line items, allowances, change-order terms, and charges that need verification.';
const updated = '2026-08-08';

function replaceOnce(regex, replacement, label) {
  if (!regex.test(source)) throw new Error(`Could not locate ${label}`);
  source = source.replace(regex, replacement);
}

replaceOnce(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, 'title');
replaceOnce(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}"/>`, 'description metadata');
replaceOnce(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}"/>`, 'Open Graph title');
replaceOnce(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}"/>`, 'Open Graph description');

const faq = [
  ['What is AI estimate review?', 'It is an AI-assisted workflow that may help organize an estimate or quote around scope, line items, materials, allowances, payment terms, exclusions, and potential fee questions. Results depend on the document and current product behavior.'],
  ['Can AI tell me if a contractor estimate is fair?', 'No tool can determine a universal fair price from a document alone. AI may help compare stated scope and identify questions, but market conditions, location, site conditions, workmanship, and professional judgment still matter.'],
  ['What should a home-improvement estimate include?', 'A useful written estimate should identify the work, materials, completion timing, and price. The applicable requirements vary by jurisdiction; ask the relevant authority or qualified professional what your contract must contain.'],
  ['What potential charges should I look for in an estimate?', 'Review scope exclusions, allowances, permits, inspections, disposal, delivery, coordination, administration, taxes, and change-order terms. These are review points, not proof that a charge is improper.'],
  ['Can AI compare multiple contractor quotes?', 'It may help place multiple documents into a comparison checklist for scope, materials, allowances, exclusions, payment terms, and schedule assumptions. Comparisons are meaningful only when the underlying scopes are aligned.'],
  ['Can AI find contractor overcharges?', 'It may flag arithmetic inconsistencies, overlapping descriptions, missing scope, or charges that warrant documentation. It does not independently verify market prices, workmanship, or legal responsibility.'],
  ['Is AI estimate review legal advice?', 'No. It is informational assistance. A construction attorney, licensing authority, architect, engineer, or other qualified professional may be needed for jurisdiction-specific or high-stakes decisions.'],
  ['What should I do after an AI review flags an estimate?', 'Check the finding against the original estimate and related documents, ask the provider to explain the scope and price, and record any agreed change in writing. Seek professional advice when the decision or dispute is significant.']
].map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-19',
    dateModified: updated,
    '@id': 'https://detecthiddenfees.com/ai-estimate-review#article',
    mainEntityOfPage: { '@id': 'https://detecthiddenfees.com/ai-estimate-review#webpage' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bills & Documents', item: 'https://detecthiddenfees.com/ai-analysis-hub' },
      { '@type': 'ListItem', position: 3, name: title, item: 'https://detecthiddenfees.com/ai-estimate-review' }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: 'https://detecthiddenfees.com/ai-estimate-review',
    inLanguage: 'en-US',
    datePublished: '2026-07-21',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Estimate and quote review' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': 'https://detecthiddenfees.com/ai-estimate-review#webpage'
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-analysis-hub">Bills &amp; Documents</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${title}</span></nav><section class="hero"><div class="container"><div class="badge">AI ESTIMATE REVIEW</div><h1>${title}</h1><p class="hero-sub">AI-assisted estimate review can help organize a contractor quote or service estimate around scope, line items, materials, allowances, payment terms, exclusions, and potential fee questions. It cannot determine a universal fair price or replace verification of the original documents.</p><div class="hero-buttons"><a href="https://hiddenfeeai.com" class="primary-btn" data-cta-action="estimate_review" data-cta-position="hero" data-cta-variant="hero-primary">Review My Estimate &amp; Quote</a><a href="/what-fees-should-i-look-for-in-a-contractor-estimate" class="secondary-btn">Estimate Review Checklist</a></div><div class="hero-trust"><span>Organize scope and pricing questions</span><span>Compare related documents</span><span>Verify findings with the source estimate</span><span>AI is not legal advice</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h3>Direct answer: what can an AI estimate review do?</h3><p>It may identify unclear scope, overlapping line items, missing assumptions, allowances, change-order language, and payment conditions that deserve a closer look. It does not prove that a provider overcharged you, establish a market price, or guarantee savings.</p><a href="https://hiddenfeeai.com" class="primary-btn" style="padding:18px 36px;font-size:1rem;" data-cta-action="estimate_review" data-cta-position="mid" data-cta-variant="content-primary">Review My Estimate</a><div class="cta-reassurance">Current pricing and product terms are shown by HiddenFeeAI before checkout.</div></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>What an Estimate Review Can Examine</h2><p>A structured review starts with what the estimate actually says. Look for terms that make the total, scope, timing, or responsibility difficult to determine.</p><h3>Scope and exclusions</h3><p>Check whether the estimate identifies the work, quantities, materials, finishes, site preparation, cleanup, permits, inspections, and exclusions. A vague or incomplete scope can make later changes difficult to evaluate.</p><h3>Line items and allowances</h3><p>Record what each line includes and whether an allowance is a placeholder rather than a final selection. Ask what happens when the selected material or service costs more or less than the allowance.</p><h3>Payment and change terms</h3><p>Review deposits, milestones, retainage, late charges, change-order approval, price adjustments, notice, and schedule effects. Confirm which event makes each payment due and what must be documented before extra work begins.</p><h3>Potentially overlapping charges</h3><p>Compare the estimate with the contract, plans, addenda, and prior proposals. A permit, delivery, disposal, coordination, or installation charge may need clarification if another line already appears to include the same deliverable.</p><h3>Materials and substitutions</h3><p>Check brands, models, grades, quantities, delivery, waste, substitutions, and any clause that passes price changes to the customer. Ask for measurable specifications where the estimate uses undefined terms such as “standard” or “or equal.”</p><a href="https://hiddenfeeai.com" class="primary-btn" style="padding:18px 36px;font-size:1rem;" data-cta-action="estimate_review" data-cta-position="mid" data-cta-variant="content-primary">Analyze My Estimate</a></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>A Practical Estimate Review Workflow</h2><ol><li><strong>Identify the document.</strong> Note the parties, project, location, date, attachments, and whether it is an estimate, quote, proposal, contract, or change order.</li><li><strong>Map the total.</strong> Separate base price, allowances, taxes, permits, delivery, disposal, labor, materials, fees, and optional work.</li><li><strong>Compare scope.</strong> Align the estimate with plans, specifications, exclusions, and other quotes before comparing totals.</li><li><strong>Mark questions.</strong> Flag vague language, missing quantities, overlapping descriptions, uncapped changes, and responsibilities that are not assigned clearly.</li><li><strong>Verify before acting.</strong> Ask the provider to explain the exact deliverable and record any agreed revision in writing. Use a qualified professional for legal, engineering, licensing, or high-stakes questions.</li></ol><h2>What an AI Review Cannot Determine</h2><p>Document analysis cannot inspect a job site, confirm workmanship, know every local requirement, independently verify a contractor’s cost basis, or decide whether a clause is enforceable. Location, project conditions, timing, and professional judgment can materially change the answer.</p></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Illustrative Review Questions</h2><p>These are teaching prompts, not customer cases, test results, or savings claims.</p><div class="leverage-section"><h3>“Is disposal included in the base scope?”</h3><p>Compare the disposal line with the scope, installation language, and exclusions. Ask the provider to identify the exact service covered by each charge.</p></div><div class="leverage-section"><h3>“What happens if the allowance is not enough?”</h3><p>Ask how selections, substitutions, approval, and price differences are handled before work or procurement begins.</p></div><div class="leverage-section"><h3>“Can the price change after approval?”</h3><p>Look for the trigger, calculation, notice, approval, cap, threshold, and expiration of any escalation or change-order language.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Sources and Jurisdiction Notes</h2><p>The <a href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam" rel="noopener noreferrer">Federal Trade Commission home-improvement guidance</a> recommends multiple written estimates and says an estimate should describe the work, materials, completion date, and price. California’s <a href="https://www2.cslb.ca.gov/Consumers/Hire_A_Contractor/Home_Improvement_Contracts/What_Is_A_Contract.aspx" rel="noopener noreferrer">Contractors State License Board guidance</a> describes California-specific written-contract and change-order requirements. These are source examples, not nationwide legal rules; check the applicable state and local authority.</p><h2>Frequently Asked Questions</h2><div class="leverage-section"><h3>What is AI estimate review?</h3><p>It is an AI-assisted workflow that may help organize an estimate or quote around scope, line items, materials, allowances, payment terms, exclusions, and potential fee questions. Results depend on the document and current product behavior.</p><h3>Can AI tell me if a contractor estimate is fair?</h3><p>No tool can determine a universal fair price from a document alone. AI may help compare stated scope and identify questions, but market conditions, location, site conditions, workmanship, and professional judgment still matter.</p><h3>What should a home-improvement estimate include?</h3><p>A useful written estimate should identify the work, materials, completion timing, and price. The applicable requirements vary by jurisdiction; ask the relevant authority or qualified professional what your contract must contain.</p><h3>What potential charges should I look for in an estimate?</h3><p>Review scope exclusions, allowances, permits, inspections, disposal, delivery, coordination, administration, taxes, and change-order terms. These are review points, not proof that a charge is improper.</p><h3>Can AI compare multiple contractor quotes?</h3><p>It may help place multiple documents into a comparison checklist for scope, materials, allowances, exclusions, payment terms, and schedule assumptions. Comparisons are meaningful only when the underlying scopes are aligned.</p><h3>Can AI find contractor overcharges?</h3><p>It may flag arithmetic inconsistencies, overlapping descriptions, missing scope, or charges that warrant documentation. It does not independently verify market prices, workmanship, or legal responsibility.</p><h3>Is AI estimate review legal advice?</h3><p>No. It is informational assistance. A construction attorney, licensing authority, architect, engineer, or other qualified professional may be needed for jurisdiction-specific or high-stakes decisions.</p><h3>What should I do after an AI review flags an estimate?</h3><p>Check the finding against the original estimate and related documents, ask the provider to explain the scope and price, and record any agreed change in writing. Seek professional advice when the decision or dispute is significant.</p></div></div></section><div class="container"><div class="cta-block"><h2>Review Your Estimate Before You Approve It</h2><p>Use HiddenFeeAI if its current terms fit your needs, then verify important findings against the original estimate and the right professional source.</p><a href="https://hiddenfeeai.com" class="cta-btn" data-cta-action="estimate_review" data-cta-position="end" data-cta-variant="end">Review My Estimate</a><div class="cta-reassurance">Current pricing and product terms are shown by HiddenFeeAI before checkout.</div></div></div></main>`;

source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
source = source.replaceAll(`<h1>${title}</h1>`, `<h1>${displayTitle}</h1>`);
source = source.replaceAll(`<span aria-current="page">${title}</span>`, `<span aria-current="page">${displayTitle}</span>`);
source = source.replace(/<div class="sticky-text"><span>Review Your Estimate<\/span><span class="price">\$15<\/span><\/div>/, '<div class="sticky-text"><span>Review Your Estimate</span></div>');
source = source.replace(/<a href="https:\/\/hiddenfeeai\.com" class="sticky-btn">Analyze My Estimate<\/a>/, '<a href="https://hiddenfeeai.com" class="sticky-btn" data-cta-action="estimate_review" data-cta-position="sticky" data-cta-variant="sticky">Review My Estimate</a>');
source = source.replace(/"dateModified": "2026-07-19"/g, `"dateModified": "${updated}"`);
source = source.replace(/"dateModified": "2026-07-21"/g, `"dateModified": "${updated}"`);
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated AI estimate review page with evidence-safe guidance, sources, FAQs, and contextual CTAs.');
