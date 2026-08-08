const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'privacy-and-ai-security.html');
const templateFile = path.join(root, 'editorial-policy.html');
const existing = fs.readFileSync(file, 'utf8');
const alreadyRemediated = existing.includes('Direct answer: what can this page verify?');
let source = alreadyRemediated ? existing : fs.readFileSync(templateFile, 'utf8');

const updated = '2026-08-08';
const title = 'Privacy & AI Security: What DetectHiddenFees Can Verify | DetectHiddenFees';
const displayTitle = 'Privacy & AI Security: What DetectHiddenFees Can Verify';
const description = 'What DetectHiddenFees.com can and cannot verify about document privacy, AI processing, retention, security, and HiddenFeeAI product terms.';
const pageUrl = 'https://detecthiddenfees.com/privacy-and-ai-security';

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

function addMobileOverflowFix() {
  if (source.includes('privacy-mobile-overflow-fix')) return;
  source = source.replace('</head>', '<style id="privacy-mobile-overflow-fix">.leverage-grid,.leverage-section{min-width:0}.leverage-section h3{overflow-wrap:anywhere;word-break:break-word}</style></head>');
}

const faqItems = [
  ['What does this privacy and AI security page cover?', 'It explains what DetectHiddenFees.com can responsibly say about the relationship between its public research and education content and the separate HiddenFeeAI product. It is not a substitute for current first-party product terms.'],
  ['Does this page guarantee encryption, deletion, or no AI training?', 'No. This page does not independently verify or guarantee current HiddenFeeAI encryption, retention, deletion, training-use, access, backup, or third-party-processing practices. Confirm those terms from current first-party product materials before uploading sensitive documents.'],
  ['What is the relationship between DetectHiddenFees and HiddenFeeAI?', 'DetectHiddenFees.com is the research, education, and hidden-fee intelligence resource. HiddenFeeAI.com is the related AI-powered document-analysis product. Product privacy and security terms belong to the product and may change separately from this site.'],
  ['What should I confirm before uploading a sensitive document?', 'Confirm how the product protects transmission and storage, how long files and results are retained, how deletion and backups work, whether data is used for training, which service providers process it, who can access it, and how to make privacy or deletion requests.'],
  ['How can I report an inaccurate statement on this page?', 'Use the Contact page to report an unclear, outdated, or unsupported statement. Include the page URL and the passage that needs review when possible.'],
  ['Is this page legal, financial, or privacy advice?', 'No. It is an educational disclosure about the limits of this site’s public claims. For a high-consequence decision, review the applicable product terms and consult an appropriately qualified professional.']
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
    articleSection: 'Privacy and AI security',
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
    about: { '@type': 'Thing', name: 'Privacy considerations for AI document analysis' },
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/about-detect-hidden-fees">About DetectHiddenFees</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">PRIVACY &amp; AI SECURITY</div><h1>${displayTitle}</h1><p class="hero-sub">This page explains the boundary between DetectHiddenFees.com’s public research and education content and the separate HiddenFeeAI document-analysis product. It does not turn unverified product claims into privacy or security promises.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="hero-trust"><span>Product boundary stated</span><span>No unsupported security promises</span><span>Current terms required</span><span>Questions before upload</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h2>Direct answer: what can this page verify?</h2><p>It can explain what DetectHiddenFees.com is: a research, education, and hidden-fee intelligence resource. It cannot independently verify the current encryption, retention, deletion, training-use, access-control, backup, or third-party-processing practices of HiddenFeeAI. Before sending a sensitive document, review the current first-party product materials available from <a href="https://hiddenfeeai.com" rel="noopener noreferrer">HiddenFeeAI</a> and do not rely on this page as a product privacy contract.</p></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Which service does what?</h2><div class="leverage-grid"><div class="leverage-section"><h3>DetectHiddenFees.com</h3><p>DetectHiddenFees.com publishes educational explanations, research plans, examples, source-aware review workflows, and information about hidden fees, contract charges, invoices, estimates, and related document risks.</p></div><div class="leverage-section"><h3>HiddenFeeAI.com</h3><p>HiddenFeeAI.com is the related AI-powered document-analysis product. Uploading a document, creating an account, paying for a report, or requesting deletion is a product interaction governed by the product’s current first-party terms and operating practices.</p></div></div></div></section><section class="section" style="padding-top:10px;"><div class="container"><h2>What this page does not promise</h2><div class="leverage-grid"><div class="leverage-section"><h3>Technical controls</h3><p>This page does not assert a particular transport or storage encryption version, hosting configuration, access-control design, audit program, or security certification.</p></div><div class="leverage-section"><h3>Retention and deletion</h3><p>This page does not promise a specific deletion deadline, result-retention period, backup behavior, recovery process, or account-history policy.</p></div><div class="leverage-section"><h3>Training and sharing</h3><p>This page does not promise that product-submitted documents are or are not used for model training, improvement, abuse monitoring, support, analytics, or third-party processing. Confirm the current product terms.</p></div><div class="leverage-section"><h3>Human access or outcomes</h3><p>This page does not promise that no person can access a document, that every access is logged, or that an analysis will be private, accurate, complete, lawful, or useful for a particular outcome.</p></div></div></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Questions to confirm before uploading a sensitive document</h2><p>Use the current first-party product materials—not an old article, search snippet, or general security statement—to confirm:</p><ul><li>how files and results are protected during transmission and storage;</li><li>how long uploads, reports, logs, and backups are retained;</li><li>how deletion requests work and what deletion does not cover;</li><li>whether documents or derived content may be used for model training, product improvement, support, abuse prevention, or analytics;</li><li>which vendors, processors, or integrations may receive document data;</li><li>who may access content and under what operational or legal circumstances; and</li><li>which rights, contact channels, account controls, and jurisdictional terms apply.</li></ul><p>If the current terms are unclear or unavailable, treat that uncertainty as a reason to ask questions or avoid uploading sensitive material until you understand the applicable conditions.</p></div></section><section class="section" style="padding-top:10px;"><div class="container long-content"><h2>Corrections and product questions</h2><p>Use the <a href="/contact">Contact page</a> to report an inaccurate, outdated, or unsupported statement on DetectHiddenFees.com. Include the page URL and the passage at issue when possible.</p><p>Questions about a HiddenFeeAI account, upload, report, payment, deletion request, or current product policy should be directed through the product’s current first-party support or policy materials. DetectHiddenFees editorial content cannot change or guarantee those product terms.</p><p>For legal, financial, medical, employment, or other high-consequence decisions, verify the original document and consult an appropriately qualified professional.</p><h2>Frequently asked questions</h2><div class="faq"><div class="faq-item"><h3>What does this privacy and AI security page cover?</h3><p>It explains what DetectHiddenFees.com can responsibly say about the relationship between its public research and education content and the separate HiddenFeeAI product. It is not a substitute for current first-party product terms.</p></div><div class="faq-item"><h3>Does this page guarantee encryption, deletion, or no AI training?</h3><p>No. This page does not independently verify or guarantee current HiddenFeeAI encryption, retention, deletion, training-use, access, backup, or third-party-processing practices. Confirm those terms from current first-party product materials before uploading sensitive documents.</p></div><div class="faq-item"><h3>What is the relationship between DetectHiddenFees and HiddenFeeAI?</h3><p>DetectHiddenFees.com is the research, education, and hidden-fee intelligence resource. HiddenFeeAI.com is the related AI-powered document-analysis product. Product privacy and security terms belong to the product and may change separately from this site.</p></div><div class="faq-item"><h3>What should I confirm before uploading a sensitive document?</h3><p>Confirm how the product protects transmission and storage, how long files and results are retained, how deletion and backups work, whether data is used for training, which service providers process it, who can access it, and how to make privacy or deletion requests.</p></div><div class="faq-item"><h3>How can I report an inaccurate statement on this page?</h3><p>Use the Contact page to report an unclear, outdated, or unsupported statement. Include the page URL and the passage that needs review when possible.</p></div><div class="faq-item"><h3>Is this page legal, financial, or privacy advice?</h3><p>No. It is an educational disclosure about the limits of this site’s public claims. For a high-consequence decision, review the applicable product terms and consult an appropriately qualified professional.</p></div></div><div class="disclaimer"><strong>Disclaimer:</strong> This page describes the limits of DetectHiddenFees editorial claims. It is not a privacy contract, security certification, legal opinion, financial recommendation, or guarantee of HiddenFeeAI product behavior.</div></div></section><section class="section" style="padding-top:10px;"><div class="container"><h2>Related resources</h2><div class="leverage-grid"><a class="related-link" href="/about-detect-hidden-fees">About DetectHiddenFees</a><a class="related-link" href="/editorial-policy">Editorial Policy</a><a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/ai-accuracy-and-limitations">AI Accuracy and Limitations</a><a class="related-link" href="/contact">Contact</a><a class="related-link" href="https://hiddenfeeai.com" rel="noopener noreferrer">HiddenFeeAI product</a></div></div></section></main>`;

if (alreadyRemediated) {
  upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?>(?=\s*<meta)/i, `<link rel="canonical" href="${pageUrl}" />`);
  upsertMeta(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${pageUrl}"/>`);
  upsertMeta(/<meta name="keywords" content="[^"]*"\s*\/?>/i, '<meta name="keywords" content="privacy and AI security, document privacy questions, AI document processing, HiddenFeeAI product terms">');
  addMobileOverflowFix();
  normalizeFooter();
  removeStickyProductBar();
  fs.writeFileSync(file, source, 'utf8');
  console.log('The privacy page is already remediated; normalized footer and sticky bar.');
  process.exit(0);
}

upsertMeta(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}">`);
upsertMeta(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}">`);
upsertMeta(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}">`);
upsertMeta(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${pageUrl}"/>`);
upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?>(?=\s*<meta)/i, `<link rel="canonical" href="${pageUrl}" />`);
upsertMeta(/<meta name="keywords" content="[^"]*"\s*\/?>/i, '<meta name="keywords" content="privacy and AI security, document privacy questions, AI document processing, HiddenFeeAI product terms">');
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}">`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}">`);

replaceJsonLd();

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
addMobileOverflowFix();
normalizeFooter();
removeStickyProductBar();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');

fs.writeFileSync(file, source, 'utf8');
console.log('Remediated privacy page with an explicit product-policy boundary, evidence-safe security language, questions-before-upload guidance, and FAQs.');
