const fs = require('fs');
const path = require('path');

const SITE = 'https://detecthiddenfees.com';
const TODAY = '2026-07-30';
const redirectSources = new Set([
  'free-vs-paid-contract-review.html', 'scan-my-invoice.html', 'contract-risk-score.html',
  'contract-risk-analysis.html', 'negotiate-bills.html', 'hidden-fee-intelligence-center.html',
  'hidden-fee-intelligence-engine.html', 'hidden-fee-knowledge-center.html',
  'hidden-fees-resource-center.html', 'hidden-fee-glossary.html', 'editorial-methodology.html',
  'consumer-negotiation-academy.html', 'consumer-financial-intelligence-center.html',
  'ai-document-intelligence-center.html', 'before-signing-a-contract.html',
  'what-should-i-check-before-signing-a-contract.html', 'contract-review-ai-software.html',
  'ai-contract-review-software.html', 'ai-contract-review-tool.html', 'contract-analysis-ai.html',
  'contract-fee-analysis.html', 'ai-testing-results.html', 'how-ai-detects-fees.html',
  'sample-analysis-report.html', 'indexnow-submit.html'
]);

const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const text = (value) => String(value || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const trimWords = (value, max) => {
  let result = text(value);
  if (result.length <= max) return result;
  result = result.slice(0, max - 1).replace(/\s+\S*$/, '').trim();
  return `${result}…`;
};
const titleFromFile = (file) => file.replace(/\.html$/, '').split('-').map((part) => {
  const upper = part.toUpperCase();
  return ['ai', 'hvac', 'pdf', 'faq', 'url'].includes(part.toLowerCase()) ? upper : part.charAt(0).toUpperCase() + part.slice(1);
}).join(' ');
const get = (html, pattern) => (html.match(pattern) || [])[1] || '';

const files = fs.readdirSync('.').filter((file) => file.endsWith('.html'));
const pages = [];

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let h1Seen = 0;
  html = html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi, (match) => (++h1Seen === 1 ? match : ''));
  const h1 = text(get(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i));
  const firstParagraph = text(get(html, /<p\b[^>]*>([\s\S]*?)<\/p>/i));
  const currentTitle = text(get(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const currentDescription = get(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i);
  const pageTitle = trimWords(currentTitle.split('|')[0] || h1 || titleFromFile(file), 54);
  const title = pageTitle.endsWith('DetectHiddenFees') ? pageTitle : `${pageTitle} | DetectHiddenFees`;
  const description = trimWords(currentDescription || firstParagraph || `${pageTitle}. Learn how DetectHiddenFees helps consumers identify hidden fees, pricing risks, and unclear terms.`, 158);
  const canonical = file === 'index.html' ? `${SITE}/` : `${SITE}/${file}`;

  if (/<title[^>]*>/i.test(html)) html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  else html = html.replace(/<head[^>]*>/i, `$&<title>${esc(title)}</title>`);
  if (/<meta[^>]+name=["']description["']/i.test(html)) html = html.replace(/<meta[^>]+name=["']description["'][^>]*>/i, `<meta name="description" content="${esc(description)}" />`);
  else html = html.replace(/<head[^>]*>/i, `$&<meta name="description" content="${esc(description)}" />`);
  if (/<link[^>]+rel=["']canonical["']/i.test(html)) html = html.replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  else html = html.replace(/<head[^>]*>/i, `$&<link rel="canonical" href="${canonical}" />`);
  if (!/<meta[^>]+name=["']robots["']/i.test(html)) html = html.replace(/<head[^>]*>/i, `$&<meta name="robots" content="index,follow" />`);
  if (!/<link[^>]+type=["']application\/rss\+xml["']/i.test(html)) html = html.replace(/<head[^>]*>/i, `$&<link rel="alternate" type="application/rss+xml" title="DetectHiddenFees updates" href="/rss.xml" />`);
  if (!/<meta[^>]+name=["']author["']/i.test(html)) html = html.replace(/<head[^>]*>/i, `$&<meta name="author" content="DetectHiddenFees Research Team" />`);
  if (!/<script[^>]+type=["']application\/ld\+json["']/i.test(html)) {
    const schema = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description, url: canonical, inLanguage: 'en-US', isPartOf: { '@type': 'WebSite', name: 'DetectHiddenFees', url: `${SITE}/` } })}</script>`;
    html = html.replace(/<\/head>/i, `${schema}</head>`);
  }
  html = html.replace(/href=["']\/ai-document-analyzer\.html(["'])/g, 'href="/ai-document-checker.html$1');
  html = html.replace(/href=["']\/resort-fees\.html(["'])/g, 'href="/hidden-travel-fees.html$1');
  html = html.replace(/href=["']\/knowledge-graph\.html(["'])/g, 'href="/knowledge-center.html$1');
  html = html.replace(/<img\b([^>]*?)(?<!\/)\s*>/gi, (match, attrs) => {
    if (!/\bwidth\s*=/.test(attrs)) attrs += ' width="1200"';
    if (!/\bheight\s*=/.test(attrs)) attrs += ' height="630"';
    return `<img${attrs}>`;
  });
  html = html.replace(/src="https:\/\/www\.listbulb\.com\/featured-on-listbulb-dark\.svg"([^>]*)/i, 'src="https://www.listbulb.com/featured-on-listbulb-dark.svg" width="160" height="28"$1');
  html = html.replace(/src="https:\/\/www\.stork\.ai\/badge\/verified-dark\.svg"([^>]*)/i, 'src="https://www.stork.ai/badge/verified-dark.svg" width="160" height="28"$1');
  if (file === 'indexnow-submit.html') html = html.replace(/<meta name="robots" content="[^"]*"\s*\/>/i, '<meta name="robots" content="noindex,follow" />');
  fs.writeFileSync(file, html, 'utf8');
  pages.push({ file, title, description, canonical, indexable: !redirectSources.has(file) });
}

const url = (file) => file === 'index.html' ? `${SITE}/` : `${SITE}/${file}`;
const indexable = pages.filter((page) => page.indexable && page.file !== 'index.html');
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE}/</loc><lastmod>${TODAY}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
for (const page of indexable.sort((a, b) => a.file.localeCompare(b.file))) sitemap += `  <url><loc>${url(page.file)}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
sitemap += '</urlset>\n';
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');

let rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>DetectHiddenFees</title><link>${SITE}/</link><description>New guides and updates about hidden fee detection, document analysis, and pricing transparency.</description><language>en-us</language><lastBuildDate>${new Date(`${TODAY}T12:00:00Z`).toUTCString()}</lastBuildDate>\n`;
for (const page of indexable) rss += `<item><title>${esc(page.title)}</title><link>${url(page.file)}</link><guid>${url(page.file)}</guid><description>${esc(page.description)}</description><pubDate>${new Date(`${TODAY}T12:00:00Z`).toUTCString()}</pubDate></item>\n`;
rss += '</channel></rss>\n';
fs.writeFileSync('rss.xml', rss, 'utf8');

const hubLinks = ['ai-bill-analyzer-vs-chatgpt.html', 'ai-contract-review-before-signing.html', 'ai-document-reviewer.html', 'ai-document-risk-analysis.html', 'ai-estimate-checker.html', 'ai-fee-detector.html', 'ai-invoice-checker.html', 'ai-proposal-review.html', 'ai-purchase-contract-review.html', 'ai-quote-analyzer.html', 'ai-software-license-review.html', 'analyze-contract-online.html', 'best-hidden-fee-detector-tools.html', 'cancellation-fee-clauses.html', 'contract-clause-checker.html', 'contract-terms-analyzer-ai.html', 'detect-hidden-contract-fees.html', 'hidden-fee-analysis-tool.html', 'hiddenfeeai-vs-lawyer-review.html', 'identify-contract-risks.html', 'indemnification-clauses-explained.html', 'review-contract-online.html', 'upload-bill-for-analysis.html', 'upload-contract-for-review.html'];
const hub = 'knowledge-center.html';
if (fs.existsSync(hub)) {
  let html = fs.readFileSync(hub, 'utf8');
  if (!html.includes('id="additional-seo-resources"')) {
    const links = hubLinks.filter((file) => fs.existsSync(file)).map((file) => `<li><a href="/${file}">${text(pages.find((page) => page.file === file)?.title || titleFromFile(file))}</a></li>`).join('');
    html = html.replace(/<\/body>/i, `<section id="additional-seo-resources" aria-labelledby="additional-seo-resources-heading"><h2 id="additional-seo-resources-heading">More document and fee resources</h2><p>Explore related guides for contract review, bill analysis, and hidden fee detection.</p><ul>${links}</ul></section></body>`);
    fs.writeFileSync(hub, html, 'utf8');
  }
}

console.log(`Normalized ${pages.length} HTML pages; generated sitemap.xml (${indexable.length + 1} URLs) and rss.xml.`);
