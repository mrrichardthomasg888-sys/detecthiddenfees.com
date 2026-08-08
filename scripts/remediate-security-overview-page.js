const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'security-overview.html');
let source = fs.readFileSync(file, 'utf8');
const alreadyRemediated = source.includes('Direct answer: what can this security overview verify?');

const updated = '2026-08-08';
const pageUrl = 'https://detecthiddenfees.com/security-overview';
const title = 'Security Overview: What DetectHiddenFees Can Verify | DetectHiddenFees';
const description = 'What DetectHiddenFees.com can responsibly say about public security information and what to confirm in current HiddenFeeAI product terms before uploading a document.';

function upsert(pattern, replacement, fallback) {
  if (pattern.test(source)) source = source.replace(pattern, replacement);
  else source = source.replace(fallback, `${replacement}${fallback}`);
}

function addStyles() {
  if (source.includes('security-overview-remediation')) return;
  const styles = '<style id="security-overview-remediation">#security-overview-content{padding-bottom:24px}#security-overview-content .answer{margin:24px 0 36px;padding:24px;border:1px solid rgba(59,130,246,.3);border-radius:16px;background:rgba(37,99,235,.1)}#security-overview-content .answer h2{margin-top:0}#security-overview-content ul{margin:0 0 24px 24px;color:#e2e8f0;line-height:2}#security-overview-content li{padding-left:6px}#security-overview-content .faq-item{padding:18px 0;border-top:1px solid rgba(255,255,255,.1)}#security-overview-content .faq-item h3{font-size:1.15rem;color:#fff;margin:0 0 8px}#security-overview-content .faq-item p{margin-bottom:0}#security-overview-content .updated{font-size:.9rem;color:#94a3b8}#security-overview-content .disclaimer{margin-top:32px;padding:18px;border:1px solid rgba(255,255,255,.1);border-radius:14px;color:#cbd5e1;font-size:.95rem;line-height:1.8}</style>';
  source = source.replace('</style>', `</style>${styles}`);
}

const faqItems = [
  ['What does this security overview verify?', 'It describes the limits of DetectHiddenFees.com public security statements. It does not independently verify the current technical controls, retention, deletion, training-use, access, backup, or third-party-processing practices of HiddenFeeAI.'],
  ['Does this page guarantee encryption or a security certification?', 'No. This page does not guarantee a particular encryption version, hosting configuration, access-control design, audit program, penetration test, certification, or compliance status. Confirm current product documentation before uploading sensitive material.'],
  ['Does this page guarantee that documents are deleted?', 'No. It does not promise a deletion deadline, backup behavior, recovery process, result-retention period, or account-history policy. Ask the product for its current retention and deletion terms.'],
  ['Are uploaded documents used for AI training?', 'This page does not make a current product claim about training, model improvement, abuse monitoring, support, analytics, or other uses of uploaded content. Review the current HiddenFeeAI terms and privacy materials.'],
  ['Who can access an uploaded document?', 'This page does not promise that access is limited to an automated system or that every access is logged. Ask the product how operational, support, legal, security, and vendor access is handled.'],
  ['Where should I report an inaccurate security statement?', 'Use the Contact page and include the page URL and the passage at issue. Product-specific questions should also be directed to current first-party HiddenFeeAI support or policy materials.']
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
    articleSection: 'Security and privacy',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'About DetectHiddenFees', item: 'https://detecthiddenfees.com/about-detect-hidden-fees' },
      { '@type': 'ListItem', position: 3, name: 'Security Overview', item: pageUrl }
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
    about: { '@type': 'Thing', name: 'Security questions for AI document analysis' },
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
  if (!matches.length) throw new Error('Could not locate existing JSON-LD');
  const start = matches[0].index;
  const last = matches[matches.length - 1];
  const end = last.index + last[0].length;
  const html = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
  source = source.slice(0, start) + html + source.slice(end);
}

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/about-detect-hidden-fees">About DetectHiddenFees</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">Security Overview</span></nav><article id="security-overview-content" class="container"><p style="color:#93c5fd;font-size:.8rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-top:36px;margin-bottom:12px;">SECURITY OVERVIEW</p><h1>Security Overview: What DetectHiddenFees Can Verify</h1><p class="updated">Last updated: <time datetime="${updated}">August 8, 2026</time></p><div class="answer"><h2>Direct answer: what can this security overview verify?</h2><p>It can explain the limits of DetectHiddenFees.com public statements. It cannot independently verify the current encryption, retention, deletion, training-use, access-control, backup, vendor, or third-party-processing practices of HiddenFeeAI. Before uploading a sensitive document, review the current first-party product materials at <a href="https://hiddenfeeai.com" rel="noopener noreferrer">HiddenFeeAI</a> and do not treat this page as a security certification or product privacy contract.</p></div><h2>What this page does and does not cover</h2><p>DetectHiddenFees.com is a research and education resource about hidden fees, contracts, invoices, estimates, and document-related financial risks. HiddenFeeAI.com is the separate AI-powered document-analysis product. A public educational page on this site should not be read as evidence that a product control exists, is configured a particular way, or applies to every account, document, vendor, backup, or processing path.</p><p>This page therefore does not promise a specific transport or storage encryption version, hosting arrangement, audit or penetration-testing program, certification, deletion deadline, retention period, backup behavior, training-use policy, employee-access rule, or vendor list.</p><h2>Questions to confirm before uploading a sensitive document</h2><p>Use current first-party HiddenFeeAI terms and support materials to confirm:</p><ul><li>how files, reports, logs, and backups are protected during transmission and storage;</li><li>how long uploads and derived results are retained;</li><li>how deletion requests work and what deletion does not cover;</li><li>whether content may be used for model training, improvement, support, abuse prevention, analytics, or other purposes;</li><li>which service providers, integrations, or subprocessors may receive document data;</li><li>who may access content for operations, support, security, legal, or other reasons; and</li><li>which account controls, rights, contact channels, and jurisdictional terms apply.</li></ul><p>If the current terms are unclear or unavailable, ask questions or avoid uploading sensitive material until you understand the applicable conditions.</p><h2>Corrections and product questions</h2><p>Use the <a href="/contact">Contact page</a> to report an inaccurate, outdated, or unsupported statement on DetectHiddenFees.com. Include the page URL and passage at issue when possible.</p><p>Questions about an account, upload, report, payment, deletion request, or current product policy should be directed through HiddenFeeAI current first-party support or policy materials. DetectHiddenFees editorial content cannot change or guarantee those product terms.</p><h2>Frequently asked questions</h2><div class="faq">${faqItems.map(([name, text]) => `<div class="faq-item"><h3>${name}</h3><p>${text}</p></div>`).join('')}</div><div class="disclaimer"><strong>Disclaimer:</strong> This page describes the limits of DetectHiddenFees editorial claims. It is not a security certification, privacy contract, legal opinion, financial recommendation, or guarantee of HiddenFeeAI product behavior.</div><h2>Related resources</h2><p><a href="/privacy-and-ai-security">Privacy and AI Security</a> · <a href="/editorial-policy">Editorial Policy</a> · <a href="/ai-analysis-methodology">AI Analysis Methodology</a> · <a href="/contact">Contact</a> · <a href="https://hiddenfeeai.com" rel="noopener noreferrer">HiddenFeeAI product</a></p></article></main>`;

upsert(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`, '</head>');
upsert(/<meta name="description" content="[^"]*"\s*\/?>(?=\s*)/i, `<meta name="description" content="${description}" />`, '</head>');
upsert(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}"/>`, '</head>');
upsert(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}"/>`, '</head>');
upsert(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${pageUrl}"/>`, '</head>');
upsert(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`, '</head>');
upsert(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`, '</head>');
upsert(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`, '</head>');
replaceJsonLd();

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
if (!alreadyRemediated) source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
addStyles();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');
fs.writeFileSync(file, source, 'utf8');
console.log(alreadyRemediated ? 'The security overview is already remediated; normalized metadata and schema.' : 'Remediated security overview with evidence-safe claims, upload questions, and FAQs.');
