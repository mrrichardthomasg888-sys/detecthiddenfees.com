const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'editorial-policy.html');
let source = fs.readFileSync(file, 'utf8');

const updated = '2026-08-08';
const title = 'Editorial Policy: Sources, Corrections, and Content Standards | DetectHiddenFees';
const displayTitle = 'Editorial Policy: Sources, Corrections, and Content Standards';
const description = 'How DetectHiddenFees selects sources, qualifies claims, handles research data, separates editorial guidance from product terms, and records corrections and updates.';
const pageUrl = 'https://detecthiddenfees.com/editorial-policy';

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace('</head>', `${replacement}</head>`);
}

function removeStickyProductBar() {
  const stickyStart = source.indexOf('<div class="sticky-cta-bar">');
  if (stickyStart < 0) return;
  const bodyEnd = source.indexOf('</body>', stickyStart);
  if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
  source = source.slice(0, stickyStart) + source.slice(bodyEnd);
}

function normalizeFooter() {
  source = source.replaceAll('AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers', 'Financial Transparency Resources');
  source = source.replaceAll('AI-Powered Hidden Fee Detection for Consumers', 'Financial Transparency Resources');
  source = source.replaceAll('Financial Intelligence Center', 'AI Analysis Hub');
  source = source.replaceAll('Last updated July 2026', 'Last updated August 8, 2026');
  source = source.replaceAll('July 2026', 'August 8, 2026');
  source = source.replaceAll('DetectHiddenFees AI Analysis Team', 'Source, scope, and clarity checks');
  source = source.replaceAll('Written by</span><span style="color:#cbd5e1;font-weight:500;">DetectHiddenFees Research Team', 'Editorial owner</span><span style="color:#cbd5e1;font-weight:500;">DetectHiddenFees.com');
}

const faqItems = [
  ['What is the purpose of this editorial policy?', 'It explains the standards DetectHiddenFees uses for sources, claims, examples, research data, product references, corrections, and update dates. It is a public standard, not a guarantee that no page will ever contain an error.'],
  ['How does DetectHiddenFees choose sources?', 'We prefer primary sources such as government agencies, regulators, statutes, official pricing or policy documents, academic research, and original research with traceable records. Secondary sources are used when they add necessary context and are identified appropriately.'],
  ['Does DetectHiddenFees publish unsupported statistics?', 'No. Counts, percentages, accuracy figures, market comparisons, and other objective claims should be traceable to an identified source or an inspectable research record. If evidence is not sufficient, the page should qualify the statement or omit it.'],
  ['Does this policy guarantee that an article is error-free?', 'No. A policy describes the intended standard and review process. Readers should still check the linked source, date, jurisdiction, definitions, and limitations, especially for legal, financial, medical, or product decisions.'],
  ['How can I report an error or outdated source?', 'Use the Contact page to report a factual error, broken citation, outdated source, unclear scope, or correction request. Include the page URL and the passage or source that needs review when possible.'],
  ['Does this editorial policy govern HiddenFeeAI product terms?', 'No. DetectHiddenFees is the research and education resource, while HiddenFeeAI is the related AI document-analysis product. Product capabilities, pricing, privacy, retention, and support terms must be confirmed in current first-party product materials.']
];

const faq = faqItems.map(([name, text]) => ({
  '@type': 'Question',
  name,
  acceptedAnswer: { '@type': 'Answer', text }
}));

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
    datePublished: '2026-07-19',
    dateModified: updated,
    articleSection: 'Editorial standards',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'About DetectHiddenFees', item: 'https://detecthiddenfees.com/about-detect-hidden-fees' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: pageUrl }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: pageUrl,
    inLanguage: 'en-US',
    datePublished: '2026-07-19',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Editorial standards for consumer research and education' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': `${pageUrl}#webpage`
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq }
];

function replaceJsonLd() {
  const headEnd = source.indexOf('<body>');
  if (headEnd < 0) throw new Error('Could not locate body');
  const head = source.slice(0, headEnd);
  const matches = [...head.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)];
  if (!matches.length) throw new Error('Could not locate existing JSON-LD blocks');
  const start = matches[0].index;
  const last = matches[matches.length - 1];
  const end = last.index + last[0].length;
  const html = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
  source = source.slice(0, start) + html + source.slice(end);
}

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/about-detect-hidden-fees">About DetectHiddenFees</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">EDITORIAL POLICY</div><h1>${displayTitle}</h1><p class="hero-sub">This policy explains how DetectHiddenFees approaches sources, claims, research data, product references, corrections, and update dates. It describes the standard readers should expect from an authority resource about hidden fees and document-related financial risks.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-trust"><span>Primary sources preferred</span><span>Claims qualified to the evidence</span><span>Research status disclosed</span><span>Corrections can be reported</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h2>Direct answer: what does this policy cover?</h2><p>It sets a public standard for source selection, claim language, examples, research data, product disclosures, corrections, and material updates. It is a statement of editorial practice and a way for readers to evaluate the limits of a page; it is not proof that every historical statement is error-free or that a particular financial, legal, medical, or product outcome will occur.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Scope and organizational relationship</h2><p>DetectHiddenFees.com is the research, education, and hidden-fee intelligence resource. HiddenFeeAI.com is the related AI-powered document-analysis product. Editorial pages should explain that relationship when relevant and should not present product capabilities, pricing, privacy, retention, or performance as independent research findings.</p><p>This policy applies to editorial guides, examples, explainers, research pages, glossaries, and related educational resources published on DetectHiddenFees.com. Product terms, account settings, support commitments, and current capabilities belong on the applicable first-party product materials.</p></div></section><section class="section" style="padding-top:10px;"><div class="container"><h2>Source and claim standards</h2><div class="leverage-grid"><div class="leverage-section"><h3>Prefer primary evidence</h3><p>Use government agencies, regulators, statutes and regulations, official company disclosures, public pricing or policy documents, academic research, and original research records when they directly support the point being made.</p></div><div class="leverage-section"><h3>Show the source and scope</h3><p>Link to the source when practical and state its date, jurisdiction, population, document type, or other scope when those details affect interpretation. Do not turn a source about one transaction or jurisdiction into a universal rule.</p></div><div class="leverage-section"><h3>Separate fact from guidance</h3><p>Distinguish sourced facts, reasonable inferences, examples, review questions, and professional advice. A checklist or document signal is not automatically proof of an illegal, excessive, fraudulent, or disputable charge.</p></div><div class="leverage-section"><h3>Do not manufacture evidence</h3><p>Do not invent quotations, experts, document counts, percentages, accuracy figures, market benchmarks, case studies, savings results, or research findings. If evidence is not sufficient, qualify the statement or leave it out.</p></div></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>How claims are reviewed</h2><p>For a material claim, the working review should identify what is being asserted, locate the evidence, check the source date and scope, look for exceptions or conflicting information, and record a limitation when the evidence cannot support a broader conclusion. The depth of review should match the consequences of the claim.</p><div class="leverage-grid"><div class="leverage-section"><h3>Before publication</h3><p>Check that important objective statements have a reasonable basis before publication. The <a href="https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation" rel="noopener noreferrer">FTC advertising-substantiation policy statement</a> is a useful reference for objective advertising and product claims; it is not a certification of DetectHiddenFees.</p></div><div class="leverage-section"><h3>For high-consequence topics</h3><p>Legal, financial, medical, tax, safety, and product-performance claims need especially careful sourcing, clear limits, current dates, and a reminder that readers may need qualified professional advice.</p></div><div class="leverage-section"><h3>For examples and scenarios</h3><p>Label fictional or illustrative examples clearly. Use variables or traceable records rather than invented numbers that could be mistaken for a real bill, contract, market rate, or research result.</p></div></div></div></section><section class="section" style="padding-top:10px;"><div class="container"><h2>Research and data status</h2><div class="leverage-section"><h3>Collecting means collecting</h3><p>Research pages should identify whether a study is collecting, analyzing, or publishing verified results. Until traceable records exist, DetectHiddenFees should not publish a sample size, percentage, prevalence ranking, accuracy metric, or other result merely because it sounds plausible.</p></div><div class="leverage-section"><h3>Traceable records</h3><p>When original research is published, the methodology should explain what was analyzed, when it was collected, where it came from, how it was coded, what was excluded, and what limitations apply. Machine-readable data should only expose records that can be inspected and responsibly shared.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Corrections, complaints, and updates</h2><p>Readers can use the <a href="/contact">Contact page</a> to report a factual error, broken citation, outdated source, unclear scope, or unsupported claim. A useful report identifies the page URL and the passage or source at issue.</p><p>Correction requests are evaluated against the page text, source, jurisdiction, and date. Material corrections should be described on the affected page or in a revision note; minor grammar or styling changes may not receive a public notice. When a law, price, product policy, or source changes, a page should be reviewed and its visible update date should change when the content materially changes.</p><p>Disputed claims should be marked for review rather than presented as settled fact. A correction or update does not guarantee a particular legal, financial, medical, or product outcome.</p><h2>Frequently asked questions</h2><div class="faq"><div class="faq-item"><h3>What is the purpose of this editorial policy?</h3><p>It explains the standards DetectHiddenFees uses for sources, claims, examples, research data, product references, corrections, and update dates. It is a public standard, not a guarantee that no page will ever contain an error.</p></div><div class="faq-item"><h3>How does DetectHiddenFees choose sources?</h3><p>We prefer primary sources such as government agencies, regulators, statutes, official pricing or policy documents, academic research, and original research with traceable records. Secondary sources are used when they add necessary context and are identified appropriately.</p></div><div class="faq-item"><h3>Does DetectHiddenFees publish unsupported statistics?</h3><p>No. Counts, percentages, accuracy figures, market comparisons, and other objective claims should be traceable to an identified source or an inspectable research record. If evidence is not sufficient, the page should qualify the statement or omit it.</p></div><div class="faq-item"><h3>Does this policy guarantee that an article is error-free?</h3><p>No. A policy describes the intended standard and review process. Readers should still check the linked source, date, jurisdiction, definitions, and limitations, especially for legal, financial, medical, or product decisions.</p></div><div class="faq-item"><h3>How can I report an error or outdated source?</h3><p>Use the Contact page to report a factual error, broken citation, outdated source, unclear scope, or correction request. Include the page URL and the passage or source that needs review when possible.</p></div><div class="faq-item"><h3>Does this editorial policy govern HiddenFeeAI product terms?</h3><p>No. DetectHiddenFees is the research and education resource, while HiddenFeeAI is the related AI document-analysis product. Product capabilities, pricing, privacy, retention, and support terms must be confirmed in current first-party product materials.</p></div></div><div class="disclaimer"><strong>Disclaimer:</strong> This policy describes editorial standards and educational practices. It is not legal, financial, medical, tax, or professional advice.</div></div></section><section class="section" style="padding-top:10px;"><div class="container"><h2>Related resources</h2><div class="leverage-grid"><a class="related-link" href="/about-detect-hidden-fees">About DetectHiddenFees</a><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/research-methodology">Research Methodology</a><a class="related-link" href="/privacy-and-ai-security">Privacy and AI Security</a><a class="related-link" href="/contact">Contact</a><a class="related-link" href="/research-center">Research Center</a></div></div></section></main>`;

if (source.includes('Direct answer: what does this policy cover?')) {
  normalizeFooter();
  removeStickyProductBar();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The editorial policy is already remediated; normalized footer and sticky bar.');
  process.exit(0);
}

upsertMeta(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}">`);
upsertMeta(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}">`);
upsertMeta(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}">`);

replaceJsonLd();

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
source = source.replace(/<section class="section"><div class="container"><h2>Related Resources<\/h2>[\s\S]*?<\/section>/i, '');
normalizeFooter();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');
fs.writeFileSync(file, source, 'utf8');
console.log('Remediated editorial policy with evidence-based standards, correction guidance, official substantiation context, and FAQs.');
