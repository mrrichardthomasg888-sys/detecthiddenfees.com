const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'terms-of-service.html');
let source = fs.readFileSync(file, 'utf8');
const alreadyRemediated = source.includes('Terms of Use for DetectHiddenFees.com');

const updated = '2026-08-08';
const pageUrl = 'https://detecthiddenfees.com/terms-of-service';
const title = 'Terms of Use for DetectHiddenFees.com | DetectHiddenFees';
const description = 'General terms for using DetectHiddenFees.com educational content and resources. HiddenFeeAI product use is governed by current first-party product terms.';

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

function addStyles() {
  const footerFix = '.footer-column{min-width:0;max-width:100%;width:100%;overflow-wrap:anywhere;word-break:break-word}.footer-column a{overflow-wrap:anywhere;word-break:break-word}.footer-links{max-width:100%;width:100%;overflow-x:hidden}';
  if (source.includes('terms-of-service-remediation')) {
    if (!source.includes('footer-column{min-width:0')) source = source.replace(/(<style id="terms-of-service-remediation">[\s\S]*?)(<\/style>)/i, `$1${footerFix}$2`);
    return;
  }
  source = source.replace('</head>', `<style id="terms-of-service-remediation">#terms-content ul{margin:0 0 24px 24px;color:#e2e8f0;line-height:2}#terms-content li{padding-left:6px}#terms-content .scope-note{margin:24px 0 34px;padding:24px;border:1px solid rgba(59,130,246,.3);border-radius:16px;background:rgba(37,99,235,.1)}#terms-content .scope-note h2{margin-top:0}#terms-content .last-updated{color:#94a3b8;font-size:.9rem}#terms-content .disclaimer{margin-top:32px;padding:18px;border:1px solid rgba(255,255,255,.1);border-radius:14px;color:#cbd5e1;font-size:.95rem;line-height:1.8}${footerFix}</style></head>`);
}

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
    '@type': 'WebPage',
    name: title,
    description,
    url: pageUrl,
    inLanguage: 'en-US',
    dateModified: updated,
    about: { '@type': 'Thing', name: 'Terms for using DetectHiddenFees.com' },
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    '@id': `${pageUrl}#webpage`
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'About DetectHiddenFees', item: 'https://detecthiddenfees.com/about-detect-hidden-fees' },
      { '@type': 'ListItem', position: 3, name: 'Terms of Use for DetectHiddenFees.com', item: pageUrl }
    ]
  }
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

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/about-detect-hidden-fees">About DetectHiddenFees</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">Terms of Use for DetectHiddenFees.com</span></nav><section class="hero"><div class="container"><h1>Terms of Use for DetectHiddenFees.com</h1><p class="hero-sub">These general terms describe use of DetectHiddenFees.com educational content and resources. They do not replace current first-party terms for the separate HiddenFeeAI product.</p><p class="last-updated">Last updated: <time datetime="${updated}">August 8, 2026</time></p></div></section><section class="content-section"><div id="terms-content" class="container"><div class="scope-note"><h2>Scope and product boundary</h2><p>DetectHiddenFees.com provides research, educational explanations, examples, and source-aware resources about hidden fees, contracts, invoices, estimates, and document-related financial risks. HiddenFeeAI.com is the separate AI-powered document-analysis product. If you use HiddenFeeAI, review the product's current first-party terms, privacy materials, pricing, and support information; this website page does not create or guarantee those product terms.</p></div><h2>1. Accepting these terms</h2><p>By accessing or using DetectHiddenFees.com, you agree to use the site lawfully and responsibly. If you do not agree with these website terms, do not use the site. These terms apply to the public DetectHiddenFees.com website and do not by themselves govern a separate product, account, payment, upload, or analysis service.</p><h2>2. Educational content and limitations</h2><p>Site content is provided for general educational and informational purposes. It is not legal, financial, accounting, tax, medical, employment, construction, or other professional advice. We do not promise that content is complete, current for every jurisdiction, or suitable for a particular decision. Verify important facts against the original document and applicable primary sources, and seek qualified advice when the consequences matter.</p><p>Examples, checklists, research statuses, and AI-assisted review workflows identify questions to investigate. They do not prove that a charge is unlawful, excessive, fraudulent, recoverable, or likely to produce savings.</p><h2>3. Acceptable use</h2><p>You agree not to misuse the site, interfere with its operation, attempt unauthorized access, scrape or reproduce substantial content without permission, submit malicious material, impersonate another person, or use the site to violate applicable law or another person's rights.</p><h2>4. Documents and separate product interactions</h2><p>Do not treat DetectHiddenFees.com educational pages as a secure upload channel or as a promise about document processing. If you choose to submit a document to HiddenFeeAI, the current first-party product terms and privacy materials govern that interaction. Confirm retention, deletion, training-use, access, vendor, security, and payment terms directly with the product before uploading sensitive information.</p><h2>5. Intellectual property</h2><p>Unless otherwise stated, DetectHiddenFees.com text, graphics, logos, page structure, and original research materials belong to DetectHiddenFees or their respective rights holders. You may use links and brief quotations for lawful reference with attribution, but do not copy, republish, sell, or create a competing database from substantial site content without permission.</p><h2>6. External links</h2><p>The site may link to government, regulator, academic, company, product, or other third-party resources. A link is provided for context or convenience and does not mean DetectHiddenFees endorses every statement, product, service, or current policy on the linked page. Check the linked source directly.</p><h2>7. Availability and changes</h2><p>We may update, correct, move, suspend, or remove site content and links. We do not promise uninterrupted availability, a particular publication schedule, or that every historical page will remain unchanged. The date shown on a page indicates when that page was last reviewed or updated, not a guarantee that every external source or product term remains current.</p><h2>8. Disclaimers and responsibility</h2><p>To the extent permitted by applicable law, use of the site is at your own judgment and risk. DetectHiddenFees does not guarantee that an AI-assisted workflow, article, example, calculator, or research status will produce a particular legal, financial, negotiation, medical, business, or other outcome. Do not rely on a possibility or review signal as a final decision without checking the underlying evidence.</p><h2>9. Questions and corrections</h2><p>Use the <a href="/contact">Contact page</a> to report an inaccurate, outdated, or unsupported statement on DetectHiddenFees.com. Include the page URL and passage at issue when possible. Product-specific questions should be directed to current first-party HiddenFeeAI support or policy materials.</p><h2>10. Review before relying on these terms</h2><p>These are general website terms, not jurisdiction-specific legal advice or a substitute for counsel. Site owners should have qualified counsel review them for the business entity, jurisdictions, products, payment arrangements, privacy obligations, intellectual-property practices, and limitation language that actually apply.</p><div class="disclaimer"><strong>Important:</strong> These terms describe use of DetectHiddenFees.com. They do not independently establish HiddenFeeAI pricing, privacy, security, retention, deletion, training-use, access, payment, refund, or service-level terms.</div></div></section></main>`;

upsertMeta(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
upsertMeta(/<meta name="description" content="[^"]*"\s*\/?>(?=\s*)/i, `<meta name="description" content="${description}">`);
upsertMeta(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}"/>`);
upsertMeta(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}"/>`);
upsertMeta(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${pageUrl}"/>`);
upsertMeta(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`);
upsertMeta(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`);
upsertMeta(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`);
replaceJsonLd();

const mainStart = source.indexOf('<main id="main-content">');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
if (!alreadyRemediated) source = source.slice(0, mainStart) + main + source.slice(mainEnd + '</main>'.length);
addStyles();
normalizeFooter();
source = source.replace(/[ \t]+(?=\r?\n|$)/g, '');
fs.writeFileSync(file, source, 'utf8');
console.log(alreadyRemediated ? 'The terms page is already remediated; normalized metadata and schema.' : 'Remediated terms page with a site/product boundary and evidence-safe website terms.');
