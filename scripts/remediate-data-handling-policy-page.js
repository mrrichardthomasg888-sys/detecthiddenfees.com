const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data-handling-policy.html');
let source = fs.readFileSync(file, 'utf8');
const alreadyRemediated = source.includes('Direct answer: what can this data-handling page verify?');

const updated = '2026-08-08';
const pageUrl = 'https://detecthiddenfees.com/data-handling-policy';
const title = 'Data Handling Policy: What DetectHiddenFees Can Verify | DetectHiddenFees';
const displayTitle = 'Data Handling Policy: What DetectHiddenFees Can Verify';
const description = 'What DetectHiddenFees.com can responsibly say about public document-handling information and what to confirm in current HiddenFeeAI product terms before uploading a document.';

function upsertMeta(pattern, replacement) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace('</head>', `${replacement}</head>`);
}

function normalizeFooter() {
  source = source.replaceAll('Written by</span><span style="color:#cbd5e1;font-weight:500;">DetectHiddenFees Research Team', 'Editorial owner</span><span style="color:#cbd5e1;font-weight:500;">DetectHiddenFees.com');
  source = source.replaceAll('Reviewed by</span><span style="color:#cbd5e1;font-weight:500;">DetectHiddenFees AI Analysis Team', 'Reviewed by</span><span style="color:#cbd5e1;font-weight:500;">Source, scope, and clarity checks');
  source = source.replaceAll('Last updated July 2026', 'Last updated August 8, 2026');
  source = source.replaceAll('July 2026', 'August 8, 2026');
  source = source.replaceAll('AI-Powered Hidden Fee Detection & Legal Artificial Intelligence for Consumers', 'Financial Transparency Resources');
  source = source.replaceAll('AI-Powered Hidden Fee Detection for Consumers', 'Financial Transparency Resources');
  source = source.replaceAll('Financial Intelligence Center', 'AI Analysis Hub');
}

function removeStickyProductBar() {
  const start = source.indexOf('<div class="sticky-cta-bar">');
  if (start < 0) return;
  const bodyEnd = source.indexOf('</body>', start);
  if (bodyEnd < 0) throw new Error('Could not locate document end after sticky CTA bar');
  source = source.slice(0, start) + source.slice(bodyEnd);
}

function addMobileOverflowFix() {
  if (source.includes('data-handling-mobile-overflow-fix')) return;
  source = source.replace('</head>', '<style id="data-handling-mobile-overflow-fix">.leverage-grid,.leverage-section{min-width:0}.leverage-section h3{overflow-wrap:anywhere;word-break:break-word}</style></head>');
}

const faqItems = [
  ['What does this data handling page verify?', 'It describes the limits of DetectHiddenFees.com public document-handling statements. It does not independently verify the current technical controls, retention, deletion, training-use, access, backup, or third-party-processing practices of HiddenFeeAI.'],
  ['Does this page guarantee how uploaded documents are stored?', 'No. It does not guarantee a particular encryption version, hosting configuration, storage location, access-control design, audit program, certification, or vendor arrangement. Confirm current product documentation before uploading sensitive material.'],
  ['How long are documents or reports retained?', 'This page does not promise a retention period, deletion deadline, backup behavior, recovery process, report history, logs, or account-history policy. Ask HiddenFeeAI for its current terms.'],
  ['Are uploaded documents used for AI training or product improvement?', 'This page does not make a current product claim about model training, improvement, abuse monitoring, support, analytics, or other uses of uploaded content. Review current first-party product and privacy materials.'],
  ['Who may access document data?', 'This page does not promise that access is limited to an automated system or that every access is logged. Ask how operational, support, security, legal, and vendor access is handled.'],
  ['How can I report an inaccurate policy statement?', 'Use the Contact page and include the page URL and the passage at issue. Product-specific questions should also be directed to current first-party HiddenFeeAI support or policy materials.']
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
    dateModified: updated,
    articleSection: 'Privacy and document handling',
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
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Document handling questions for AI analysis' },
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/about-detect-hidden-fees">About DetectHiddenFees</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">DATA HANDLING POLICY</div><h1>${displayTitle}</h1><p class="hero-sub">This page explains the boundary between DetectHiddenFees.com public research and education content and the separate HiddenFeeAI document-analysis product. It does not convert unverified product claims into a privacy or security policy.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-trust"><span>Product boundary stated</span><span>No unsupported handling promises</span><span>Current terms required</span><span>Questions before upload</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h2>Direct answer: what can this data-handling page verify?</h2><p>It can explain what DetectHiddenFees.com is: a research, education, and hidden-fee intelligence resource. It cannot independently verify the current storage, processing, retention, deletion, training-use, access-control, backup, vendor, or third-party-processing practices of HiddenFeeAI. Before sending a sensitive document, review current first-party product materials at <a href="https://hiddenfeeai.com" rel="noopener noreferrer">HiddenFeeAI</a> and do not rely on this page as a product privacy contract.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>What this page covers</h2><p>DetectHiddenFees.com publishes educational explanations, research plans, examples, source-aware review workflows, and information about hidden fees, contract charges, invoices, estimates, and related document risks. HiddenFeeAI.com is the separate AI-powered document-analysis product. Product terms may change separately from this editorial resource.</p><p>A public article should not be read as evidence that a particular technical control exists, is configured a particular way, applies to every account or document, or covers every vendor, backup, report, log, or processing path.</p><h2>What this page does not promise</h2><div class="leverage-grid"><div class="leverage-section"><h3>Storage and security</h3><p>This page does not assert a particular encryption version, hosting configuration, storage location, access-control design, audit program, penetration test, certification, or compliance status.</p></div><div class="leverage-section"><h3>Retention and deletion</h3><p>This page does not promise a retention period, deletion deadline, backup behavior, recovery process, report history, logs, or account-history policy.</p></div><div class="leverage-section"><h3>Training and sharing</h3><p>This page does not promise that uploaded documents or derived content are or are not used for model training, improvement, abuse monitoring, support, analytics, or third-party processing.</p></div><div class="leverage-section"><h3>Human and vendor access</h3><p>This page does not promise that no person can access content, that every access is logged, or that no vendor, processor, integration, or legal process can receive data.</p></div></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Questions to confirm before uploading a sensitive document</h2><p>Use current first-party HiddenFeeAI terms and support materials to confirm:</p><ul><li>how files, reports, logs, and backups are protected during transmission and storage;</li><li>how long uploads and derived results are retained;</li><li>how deletion requests work and what deletion does not cover;</li><li>whether content may be used for model training, improvement, support, abuse prevention, analytics, or other purposes;</li><li>which service providers, integrations, or subprocessors may receive document data;</li><li>who may access content for operations, support, security, legal, or other reasons; and</li><li>which account controls, rights, contact channels, and jurisdictional terms apply.</li></ul><p>If the current terms are unclear or unavailable, ask questions or avoid uploading sensitive material until you understand the applicable conditions.</p><h2>Corrections and product questions</h2><p>Use the <a href="/contact">Contact page</a> to report an inaccurate, outdated, or unsupported statement on DetectHiddenFees.com. Include the page URL and passage at issue when possible.</p><p>Questions about a HiddenFeeAI account, upload, report, payment, deletion request, or current product policy should be directed through current first-party product support or policy materials. DetectHiddenFees editorial content cannot change or guarantee those product terms.</p><h2>Frequently asked questions</h2><div class="faq">${faqItems.map(([name, text]) => `<div class="faq-item"><h3>${name}</h3><p>${text}</p></div>`).join('')}</div><div class="disclaimer"><strong>Disclaimer:</strong> This page describes the limits of DetectHiddenFees editorial claims. It is not a privacy contract, security certification, legal opinion, financial recommendation, or guarantee of HiddenFeeAI product behavior.</div></div></section><section class="section" style="padding-top:10px;"><div class="container"><h2>Related resources</h2><div class="leverage-grid"><a class="related-link" href="/privacy-and-ai-security">Privacy and AI Security</a><a class="related-link" href="/security-overview">Security Overview</a><a class="related-link" href="/editorial-policy">Editorial Policy</a><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/contact">Contact</a><a class="related-link" href="https://hiddenfeeai.com" rel="noopener noreferrer">HiddenFeeAI product</a></div></div></section></main>`;

upsertMeta(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?>(?=\s*)/i, `<meta name="description" content="${description}">`);
upsertMeta(/<meta property="og:title" content="[^"]*"\s*\/?>(?=\s*)/i, `<meta property="og:title" content="${title}">`);
upsertMeta(/<meta property="og:description" content="[^"]*"\s*\/?>(?=\s*)/i, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta property="og:url" content="[^"]*"\s*\/?>(?=\s*)/i, `<meta property="og:url" content="${pageUrl}">`);
upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?>(?=\s*<meta)/i, `<link rel="canonical" href="${pageUrl}" />`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?>(?=\s*)/i, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?>(?=\s*)/i, `<meta name="twitter:description" content="${description}">`);
replaceJsonLd();

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
if (!alreadyRemediated) source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
addMobileOverflowFix();
normalizeFooter();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');
fs.writeFileSync(file, source, 'utf8');
console.log(alreadyRemediated ? 'The data handling page is already remediated; normalized metadata, footer, and schema.' : 'Remediated data handling page with an explicit product-policy boundary, evidence-safe language, upload questions, and FAQs.');
