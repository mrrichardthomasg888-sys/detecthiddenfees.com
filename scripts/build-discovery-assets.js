const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://detecthiddenfees.com';
const sitemapFile = path.join(ROOT, 'sitemap.xml');

const escapeXml = (value) => String(value || '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');
const stripTags = (value) => String(value || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const first = (value, pattern) => (value.match(pattern) || [])[1] || '';
const slugFromUrl = (url) => new URL(url).pathname.replace(/^\//, '').replace(/\/$/, '') || 'index';
const htmlForSlug = (slug) => path.join(ROOT, `${slug}.html`);
const readRedirectSources = () => {
  const result = new Set();
  const file = path.join(ROOT, '_redirects');
  if (!fs.existsSync(file)) return result;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*\/(\S+)\s+\S+\s+(?:301|302|307|308)\b/);
    if (match) result.add(match[1].replace(/\.html$/i, '').replace(/\/$/, ''));
  }
  return result;
};
const canonicalFrom = (html) => first(html, /<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)/i);
const pageTitle = (html) => stripTags(first(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i)).replace(/\s*\|\s*DetectHiddenFees\s*$/i, '').trim();
const pageDescription = (html) => first(html, /<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["']([^"']*)/i);
const schemaTypes = (html) => [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap((match) => {
  try {
    const data = JSON.parse(match[1]);
    const type = data && data['@type'];
    return Array.isArray(type) ? type : type ? [type] : [];
  } catch { return []; }
});
const dateFromSchema = (html, field) => {
  const matches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of matches) {
    try {
      const data = JSON.parse(match[1]);
      if (data && typeof data[field] === 'string' && /^\d{4}-\d{2}-\d{2}/.test(data[field])) return data[field].slice(0, 10);
    } catch {}
  }
  return '';
};
const isEditorial = (slug, types) => {
  if (slug === 'index') return false;
  if (/^(about|contact|privacy|security|terms|data-handling|editorial-policy)/.test(slug)) return false;
  if (/^(analyze-|upload-|check-my-|hidden-fee-(detector|scanner|calculator|analysis-tool|risk-score))/.test(slug)) return false;
  if (/(service|assistant|software|tool|checker|analyzer)$/.test(slug)) return false;
  return types.includes('Article') || /^(how-|what-|types-|best-|example-|research|consumer-fee-trends|hidden-fee-(encyclopedia|dictionary|database|statistics|reports|guides)|contract-(terms|red-flags|review-checklist)|automatic-renewal|early-termination|cancellation|arbitration|indemnification|unfair-contract|change-order|medical-bill|hospital-bill|negotiation|reduce-monthly)/.test(slug);
};
const categoryFor = (slug) => {
  if (/^(about|contact|privacy|security|terms|data-handling|editorial-policy)/.test(slug)) return 'About and trust';
  if (/^(ai-contract|contract-|business-contract|before-signing|arbitration|automatic-renewal|cancellation|change-order|detect-hidden-contract|find-hidden-fees-in-contract|how-to-review-a-contract|how-we-analyze-contracts|identify-contract-risks|indemnification|unfair-contract|service-agreement)/.test(slug)) return 'AI contract review and clauses';
  if (/^(ai-bill|ai-invoice|ai-statement|ai-financial|ai-document|ai-estimate|ai-quote|ai-lease|ai-receipt|analyze-|upload-|review-contract|scan-my-invoice|check-my-fees)/.test(slug)) return 'Bills and document analysis';
  if (/^(bill-negotiation|consumer-|medical-bill|hospital-bill|negotiate-|negotiation|reduce-monthly|bill-savings|fee-negotiation|fee-removal)/.test(slug)) return 'Consumer negotiation';
  if (/^(hidden-|types-of-hidden-fees)/.test(slug)) return 'Hidden fee detection';
  if (/^(research|resource|knowledge|best-|example-|our-evaluation|ai-accuracy|ai-analysis-methodology|ai-transparency|hidden-fee-index)/.test(slug)) return 'Research and educational resources';
  return 'Tools and other canonical resources';
};

const redirectSources = readRedirectSources();
const sitemapUrls = [...fs.readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const pages = sitemapUrls.map((url) => {
  const slug = slugFromUrl(url);
  const file = htmlForSlug(slug);
  if (!fs.existsSync(file)) throw new Error(`Sitemap URL has no local HTML file: ${url}`);
  const html = fs.readFileSync(file, 'utf8');
  if (redirectSources.has(slug)) throw new Error(`Redirect source is present in sitemap: ${url}`);
  if (canonicalFrom(html) !== url) throw new Error(`Sitemap URL does not match page canonical: ${url}`);
  return {
    slug,
    url,
    html,
    title: pageTitle(html),
    description: pageDescription(html),
    types: schemaTypes(html),
    datePublished: dateFromSchema(html, 'datePublished'),
    dateModified: dateFromSchema(html, 'dateModified')
  };
});

const grouped = {};
for (const page of pages) {
  const category = categoryFor(page.slug);
  if (!grouped[category]) grouped[category] = [];
  grouped[category].push(page);
}
const categoryOrder = ['About and trust', 'Hidden fee detection', 'AI contract review and clauses', 'Bills and document analysis', 'Consumer negotiation', 'Research and educational resources', 'Tools and other canonical resources'];
let llms = '# DetectHiddenFees\n\n';
llms += '> DetectHiddenFees is an AI-powered consumer information and document-analysis website focused on hidden fees, contract terms, bills, invoices, estimates, pricing transparency, and negotiation preparation.\n\n';
llms += `- Website: DetectHiddenFees.com\n- Canonical content URLs: ${pages.length}\n- Related product: https://hiddenfeeai.com\n- Relationship: DetectHiddenFees provides education, research, and product information; HiddenFeeAI is the related document-analysis product.\n- This file is generated from the canonical sitemap. Redirect sources and administrative routes are excluded.\n\n`;
for (const category of categoryOrder) {
  if (!grouped[category]) continue;
  llms += `## ${category}\n\n`;
  for (const page of grouped[category].sort((a, b) => a.slug.localeCompare(b.slug))) {
    llms += `- [${page.title}](${page.url}) — Canonical page for this topic.\n`;
  }
  llms += '\n';
}
fs.writeFileSync(path.join(ROOT, 'llms.txt'), llms, 'utf8');

const editorial = pages.filter((page) => isEditorial(page.slug, page.types));
const dates = editorial.flatMap((page) => [page.dateModified, page.datePublished]).filter(Boolean).sort();
let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>';
rss += `<title>DetectHiddenFees</title><link>${SITE}/</link><atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>`;
rss += '<description>Editorial guides and research about hidden fees, contracts, document analysis, and consumer pricing transparency.</description><language>en-us</language>';
if (dates.length) rss += `<lastBuildDate>${new Date(`${dates[dates.length - 1]}T12:00:00Z`).toUTCString()}</lastBuildDate>`;
for (const page of editorial.sort((a, b) => (b.dateModified || b.datePublished || '').localeCompare(a.dateModified || a.datePublished || ''))) {
  rss += `<item><title>${escapeXml(page.title)}</title><link>${escapeXml(page.url)}</link><guid isPermaLink="true">${escapeXml(page.url)}</guid><description>${escapeXml(page.description || `Canonical editorial resource: ${page.title}.`)}</description>`;
  if (page.datePublished) rss += `<pubDate>${new Date(`${page.datePublished}T12:00:00Z`).toUTCString()}</pubDate>`;
  if (page.dateModified) rss += `<updated>${page.dateModified}</updated>`;
  rss += '</item>';
}
rss += '</channel></rss>\n';
fs.writeFileSync(path.join(ROOT, 'rss.xml'), rss, 'utf8');

console.log(`Built canonical discovery assets from ${pages.length} sitemap URLs; RSS contains ${editorial.length} editorial items.`);
