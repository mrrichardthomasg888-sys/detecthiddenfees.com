const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://detecthiddenfees.com';
const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'phase1-metadata.json'), 'utf8'));

const decodeEntities = (value) => {
  let result = String(value || '');
  const entities = {
    '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>',
    '&nbsp;': ' ', '&mdash;': '—', '&ndash;': '–', '&middot;': '·', '&hellip;': '…'
  };
  for (let pass = 0; pass < 5; pass += 1) {
    const previous = result;
    result = result.replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (_, code) => {
      const number = code.toLowerCase().startsWith('x') ? parseInt(code.slice(1), 16) : parseInt(code, 10);
      return Number.isFinite(number) ? String.fromCodePoint(number) : _;
    });
    result = result.replace(/&[a-z]+;/gi, (match) => entities[match.toLowerCase()] || match);
    if (result === previous) break;
  }
  return result.replace(/\s+/g, ' ').trim();
};

const escapeHtml = (value) => decodeEntities(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const completeTruncatedDescription = (value) => {
  const marker = String.fromCharCode(0x2026);
  if (!String(value).includes(marker)) return String(value).trim();
  const base = String(value).split(marker)[0].trim().replace(/[,:;—-]\s*$/, '').trim();
  const lower = base.toLowerCase();
  let suffix = '.';
  if (/\b(and|or)$/.test(lower)) suffix = ' related risks.';
  else if (/\bbefore$/.test(lower)) suffix = ' before you sign or pay.';
  else if (/\bso you can$/.test(lower)) suffix = ' so you can make a more informed decision.';
  else if (/\bgives you$/.test(lower)) suffix = ' gives you a clearer path forward.';
  else if (/\bto$/.test(lower)) suffix = ' to support better decisions.';
  else if (/\bfor$/.test(lower)) suffix = ' for clearer pricing decisions.';
  else if (/\bin$/.test(lower)) suffix = ' in more detail.';
  else if (/\bwith$/.test(lower)) suffix = ' with clear explanations.';
  else if (/\bof$/.test(lower)) suffix = ' of common hidden-fee patterns.';
  else if (/\bthat$/.test(lower)) suffix = ' that consumers should understand.';
  else if (/\bto identify$/.test(lower)) suffix = ' to identify potential issues.';
  else if (/\blearn$/.test(lower)) suffix = ' how to evaluate these issues.';
  return `${base}${suffix}`;
};

const stripTags = (value) => decodeEntities(String(value || '').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' '));
const slugFromUrl = (url) => decodeURIComponent(new URL(url).pathname).replace(/^\//, '').replace(/\/$/, '') || 'index';
const fileForSlug = (slug) => path.join(ROOT, slug === 'index' ? 'index.html' : `${slug}.html`);
const readHtml = (slug) => fs.readFileSync(fileForSlug(slug), 'utf8');
const writeHtml = (slug, html) => fs.writeFileSync(fileForSlug(slug), html, 'utf8');
const canonicalForSlug = (slug) => slug === 'index' ? `${SITE}/` : `${SITE}/${slug}`;
const getTagText = (html, tag) => stripTags((html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')) || [])[1] || '');

const getMeta = (html, attribute, value) => {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) => new RegExp(`\\b${attribute}\\s*=\\s*["']${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(candidate));
  return tag ? (tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i) || [])[1] || '' : '';
};

const setMeta = (html, attribute, key, value) => {
  let found = false;
  const escaped = escapeHtml(value);
  const result = html.replace(/<meta\b[^>]*>/gi, (tag) => {
    if (!new RegExp(`\\b${attribute}\\s*=\\s*["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(tag)) return tag;
    if (found) return '';
    found = true;
    if (/\bcontent\s*=\s*["'][^"']*["']/i.test(tag)) return tag.replace(/\bcontent\s*=\s*["'][^"']*["']/i, `content="${escaped}"`);
    return tag.replace(/\s*\/?\s*>$/, ` content="${escaped}" />`);
  });
  if (found) return result;
  return result.replace(/<\/head>/i, `<meta ${attribute}="${key}" content="${escaped}" />\n</head>`);
};

const parseJsonLd = (html) => [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => {
  try { return { raw: match[0], data: JSON.parse(match[1]) }; } catch { return { raw: match[0], data: null }; }
});

const isType = (data, type) => Array.isArray(data?.['@type']) ? data['@type'].includes(type) : data?.['@type'] === type;
const visibleContent = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
const hasVisibleFaq = (html) => /<details\b|<summary\b|faq-section|frequently asked questions|\bfaq\b/i.test(visibleContent(html));

const normalizeSchema = (html, slug, canonical) => {
  const blocks = parseJsonLd(html);
  let organizationSeen = false;
  let removedSearchAction = 0;
  let removedUnsupportedFaq = 0;
  let changed = false;
  let result = html;
  for (const block of blocks) {
    if (!block.data) continue;
    let data = block.data;
    if (Array.isArray(data)) data = data[0];
    if (!data || typeof data !== 'object') continue;
    if (isType(data, 'Organization')) {
      if (organizationSeen) {
        result = result.replace(block.raw, '');
        changed = true;
        continue;
      }
      organizationSeen = true;
      data['@id'] = ORG_ID;
      data.name = 'DetectHiddenFees';
      data.url = `${SITE}/`;
      data.logo = config.site.logo;
      const sameAs = Array.isArray(data.sameAs) ? data.sameAs.filter((url) => typeof url === 'string' && /^https:\/\//i.test(url)) : [];
      if (!sameAs.includes(config.site.hiddenFeeAI)) sameAs.push(config.site.hiddenFeeAI);
      data.sameAs = [...new Set(sameAs)];
      changed = true;
    }
    if (isType(data, 'WebSite')) {
      data['@id'] = WEBSITE_ID;
      data.name = 'DetectHiddenFees';
      data.url = `${SITE}/`;
      if (Array.isArray(data.potentialAction)) {
        const filtered = data.potentialAction.filter((action) => action?.['@type'] !== 'SearchAction');
        removedSearchAction += data.potentialAction.length - filtered.length;
        if (filtered.length) data.potentialAction = filtered; else delete data.potentialAction;
      } else if (data.potentialAction?.['@type'] === 'SearchAction') {
        delete data.potentialAction;
        removedSearchAction += 1;
      }
      changed = true;
    }
    if (isType(data, 'WebPage')) {
      data['@id'] = `${canonical}#webpage`;
      data.url = canonical;
      data.isPartOf = { '@id': WEBSITE_ID };
      changed = true;
    }
    if (isType(data, 'Article')) {
      data['@id'] = `${canonical}#article`;
      data.mainEntityOfPage = { '@id': `${canonical}#webpage` };
      data.publisher = { '@id': ORG_ID };
      changed = true;
    }
    if (isType(data, 'FAQPage') && !hasVisibleFaq(html)) {
      result = result.replace(block.raw, '');
      removedUnsupportedFaq += 1;
      changed = true;
      continue;
    }
    if (changed && result.includes(block.raw)) {
      result = result.replace(block.raw, `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`);
    }
  }
  return { html: result, changed, removedSearchAction, removedUnsupportedFaq };
};

const editorialSlug = (slug, schemaTypes) => {
  if (slug === 'index') return false;
  if (/^(about|contact|privacy|security|terms|data-handling|editorial-policy)/.test(slug)) return false;
  if (/^(analyze-|upload-|check-my-|hidden-fee-(detector|scanner|calculator|analysis-tool|risk-score))/.test(slug)) return false;
  if (/-(service|assistant|software|tool|checker|analyzer)$/.test(slug)) return false;
  return schemaTypes.includes('Article') || /^(how-|what-|types-|best-|example-|research|consumer-fee-trends|hidden-fee-(encyclopedia|dictionary|database|statistics|reports|guides)|contract-(terms|red-flags|review-checklist)|automatic-renewal|early-termination|cancellation|arbitration|indemnification|unfair-contract|change-order|medical-bill|hospital-bill|negotiation|reduce-monthly)/.test(slug);
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

const xmlEscape = (value) => String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const sitemapUrls = [...fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
const sitemapSlugs = sitemapUrls.map(slugFromUrl);
const extraCanonicalSlugs = fs.readdirSync(ROOT)
  .filter((file) => file.endsWith('.html'))
  .map((file) => file.replace(/\.html$/, ''))
  .filter((slug) => slug !== 'indexnow-submit' && !sitemapSlugs.includes(slug))
  .filter((slug) => {
    const html = readHtml(slug);
    const canonical = (html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i) || [])[1];
    return canonical === canonicalForSlug(slug);
  });
const canonicalSlugs = [...new Set([...sitemapSlugs, ...extraCanonicalSlugs])];
const pages = [];
const metadataChanges = [];
let totalSearchActionsRemoved = 0;
let totalFaqSchemasRemoved = 0;

for (const slug of canonicalSlugs) {
  let html = readHtml(slug);
  const original = html;
  const canonical = canonicalForSlug(slug);
  const oldTitle = decodeEntities((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
  const oldDescription = decodeEntities(getMeta(html, 'name', 'description'));
  const h1 = getTagText(html, 'h1');
  const rawBaseTitle = oldTitle.split('|')[0].trim();
  const useH1Title = /…|â€¦|&amp;amp|&amp;#/.test(oldTitle) || /&amp;amp|&amp;#/.test((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
  const hasActualTruncation = oldTitle.includes(String.fromCharCode(0x2026));
  let title = config.overrides[`/${slug === 'index' ? '' : slug}`]?.title || ((useH1Title || hasActualTruncation) && h1 ? `${h1} | DetectHiddenFees` : oldTitle);
  title = decodeEntities(title).replace(/\s*…+\s*/g, ' ').replace(/\s+/g, ' ').trim();
  title = title.replace(new RegExp(`\\s*${String.fromCharCode(0x2026)}+\\s*`, 'g'), ' ').replace(/\s+/g, ' ').trim();
  if (!title.endsWith('| DetectHiddenFees')) title = `${title.replace(/\s*\|\s*DetectHiddenFees\s*$/i, '').trim()} | DetectHiddenFees`;
  const description = completeTruncatedDescription(config.overrides[`/${slug === 'index' ? '' : slug}`]?.description || decodeEntities(oldDescription));
  const titleBefore = html.match(/<title\b[^>]*>[\s\S]*?<\/title>/i);
  if (titleBefore) html = html.replace(titleBefore[0], `<title>${escapeHtml(title)}</title>`);
  else html = html.replace(/<head\b[^>]*>/i, `$&\n<title>${escapeHtml(title)}</title>`);
  html = setMeta(html, 'name', 'description', description);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:site_name', 'DetectHiddenFees');
  const schemaBlocks = parseJsonLd(html);
  const schemaTypes = schemaBlocks.flatMap((block) => {
    const type = block.data?.['@type'];
    return Array.isArray(type) ? type : type ? [type] : [];
  });
  const ogType = editorialSlug(slug, schemaTypes) ? 'article' : 'website';
  html = setMeta(html, 'property', 'og:type', ogType);
  html = setMeta(html, 'property', 'og:image', config.site.image);
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', description);
  html = setMeta(html, 'name', 'twitter:image', config.site.image);
  if (!/<link\b[^>]+href=["']\/phase1-foundation\.css(?:\?[^"']*)?["']/i.test(html)) html = html.replace(/<\/head>/i, '<link rel="stylesheet" href="/phase1-foundation.css?v=sticky6" />\n</head>');
  if (!/<a\b[^>]+class=["'][^"']*phase1-skip-link/i.test(html)) html = html.replace(/(<body\b[^>]*>)/i, `$1<a class="phase1-skip-link" href="#main-content">Skip to main content</a>`);
  html = html.replace(/<nav\b(?![^>]*aria-label=)/i, '<nav aria-label="Primary navigation"');
  html = html.replace(/<div class="footer-column"><strong>COMPANY<a /g, '<div class="footer-column"><strong>COMPANY</strong><a ');
  html = html.replace(/<div class="footer-column"><\/strong><\/div>/g, '<div class="footer-column"></div>');
  html = html.replace(/href=["']\/brand-icon\.svg["']/g, 'href="/favicon.svg"');
  if (!/<link\b[^>]*\brel=["']icon["']/i.test(html)) html = html.replace(/<\/head>/i, '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n</head>');
  const seenIconLinks = new Set();
  html = html.replace(/<link\b[^>]*\brel=["'](?:icon|alternate icon|apple-touch-icon)["'][^>]*>/gi, (tag) => {
    const rel = (tag.match(/\brel=["']([^"']+)/i) || [])[1]?.toLowerCase();
    if (!rel || seenIconLinks.has(rel)) return '';
    seenIconLinks.add(rel);
    return tag;
  });
  const normalizedSchema = normalizeSchema(html, slug, canonical);
  html = normalizedSchema.html;
  totalSearchActionsRemoved += normalizedSchema.removedSearchAction;
  totalFaqSchemasRemoved += normalizedSchema.removedUnsupportedFaq;
  if (!/<main\b[^>]+id=["']main-content["']/i.test(html)) {
    const bodyStart = html.match(/<body\b[^>]*>/i);
    const bodyOffset = bodyStart ? bodyStart.index + bodyStart[0].length : 0;
    const candidates = ['</header>', '</nav>', '<section', '<h1'];
    let insertAt = -1;
    for (const candidate of candidates) {
      const found = html.toLowerCase().indexOf(candidate.toLowerCase(), bodyOffset);
      if (found !== -1 && (insertAt === -1 || found < insertAt)) insertAt = candidate.startsWith('</') ? found + candidate.length : found;
    }
    const footerAt = html.toLowerCase().indexOf('<footer', bodyOffset);
    if (insertAt === -1 || (footerAt !== -1 && insertAt > footerAt)) insertAt = bodyOffset;
    html = `${html.slice(0, insertAt)}<main id="main-content">${html.slice(insertAt)}`;
    const newFooterAt = html.toLowerCase().indexOf('<footer', insertAt + 20);
    if (newFooterAt !== -1) html = `${html.slice(0, newFooterAt)}</main>${html.slice(newFooterAt)}`;
  }
  writeHtml(slug, html);
  pages.push({ slug, file: path.basename(fileForSlug(slug)), url: canonical, title, description, schemaTypes, editorial: editorialSlug(slug, schemaTypes) });
  if (oldTitle !== title || oldDescription !== description) metadataChanges.push({ url: canonical, oldTitle, newTitle: title, oldDescription, newDescription: description, reason: oldTitle !== title ? 'Removed literal truncation or entity encoding and preserved page intent.' : 'Repaired homepage or entity-encoded description.' });
}

const orphanBreadcrumbs = {
  'analyze-my-contract': { parent: '/ai-contract-review', label: 'AI Contract Review' },
  'check-my-fees': { parent: '/hidden-fee-detector', label: 'Hidden Fee Detector' },
  'free-ai-contract-review-vs-paid-review': { parent: '/ai-contract-review', label: 'AI Contract Review' },
  'hidden-fee-index': { parent: '/hidden-fee-encyclopedia', label: 'Hidden Fee Encyclopedia' }
};
for (const [slug, breadcrumb] of Object.entries(orphanBreadcrumbs)) {
  let html = readHtml(slug);
  if (!/class=["'][^"']*phase1-breadcrumb/i.test(html)) {
    const crumb = `<nav class="phase1-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase1-separator">/</span><a href="${breadcrumb.parent}">${breadcrumb.label}</a><span class="phase1-separator">/</span><span aria-current="page">${escapeHtml(getTagText(html, 'h1') || slug)}</span></nav>`;
    html = html.replace(/<main\b[^>]*id=["']main-content["'][^>]*>/i, `$&${crumb}`);
    writeHtml(slug, html);
  }
}

const contextLinks = {
  'ai-contract-review': [
    ['Analyze a contract with AI', '/analyze-my-contract'],
    ['Compare free and paid contract review', '/free-ai-contract-review-vs-paid-review']
  ],
  'hidden-fee-detector': [
    ['Check a bill or document for hidden fees', '/check-my-fees']
  ],
  'hidden-fee-encyclopedia': [
    ['Browse the hidden-fee index', '/hidden-fee-index']
  ]
};
for (const [slug, links] of Object.entries(contextLinks)) {
  let html = readHtml(slug);
  if (/id=["']phase1-context-links["']/i.test(html)) continue;
  const list = links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('');
  const section = `<section id="phase1-context-links" class="phase1-context-links" aria-labelledby="phase1-context-links-heading"><h2 id="phase1-context-links-heading">Related next steps</h2><ul>${list}</ul></section>`;
  const footerAt = html.toLowerCase().indexOf('<footer');
  if (footerAt !== -1) html = `${html.slice(0, footerAt)}${section}${html.slice(footerAt)}`;
  writeHtml(slug, html);
}

const updatedPages = canonicalSlugs.map((slug) => {
  const html = readHtml(slug);
  const canonical = canonicalForSlug(slug);
  const schemaTypes = parseJsonLd(html).flatMap((block) => {
    const type = block.data?.['@type'];
    return Array.isArray(type) ? type : type ? [type] : [];
  });
  const datePublished = parseJsonLd(html).flatMap((block) => block.data?.datePublished || []).find((value) => /^\d{4}-\d{2}-\d{2}/.test(value || '')) || '';
  const dateModified = parseJsonLd(html).flatMap((block) => block.data?.dateModified || []).find((value) => /^\d{4}-\d{2}-\d{2}/.test(value || '')) || '';
  return { slug, canonical, html, schemaTypes, datePublished, dateModified, title: decodeEntities((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '') };
});

let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const page of updatedPages.sort((a, b) => a.slug.localeCompare(b.slug))) {
  sitemap += `  <url><loc>${xmlEscape(page.canonical)}</loc>`;
  if (page.dateModified) sitemap += `<lastmod>${page.dateModified.slice(0, 10)}</lastmod>`;
  sitemap += '</url>\n';
}
sitemap += '</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

const feedPages = updatedPages.filter((page) => editorialSlug(page.slug, page.schemaTypes));
const feedDate = feedPages.flatMap((page) => [page.dateModified, page.datePublished]).filter(Boolean).sort().pop() || '';
let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>';
rss += `<title>DetectHiddenFees</title><link>${SITE}/</link><atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>`;
rss += '<description>Editorial guides and research about hidden fees, contracts, document analysis, and consumer pricing transparency.</description><language>en-us</language>';
if (feedDate) rss += `<lastBuildDate>${new Date(`${feedDate.slice(0, 10)}T12:00:00Z`).toUTCString()}</lastBuildDate>`;
for (const page of feedPages.sort((a, b) => (b.dateModified || b.datePublished || '').localeCompare(a.dateModified || a.datePublished || ''))) {
  const description = `Canonical editorial resource: ${page.title.replace(/\s*\|\s*DetectHiddenFees\s*$/i, '')}.`;
  rss += `<item><title>${xmlEscape(page.title)}</title><link>${xmlEscape(page.canonical)}</link><guid isPermaLink="true">${xmlEscape(page.canonical)}</guid><description>${xmlEscape(description)}</description>`;
  if (page.datePublished) rss += `<pubDate>${new Date(`${page.datePublished.slice(0, 10)}T12:00:00Z`).toUTCString()}</pubDate>`;
  if (page.dateModified) rss += `<updated>${xmlEscape(page.dateModified.slice(0, 10))}</updated>`;
  rss += '</item>';
}
rss += '</channel></rss>\n';
fs.writeFileSync(path.join(ROOT, 'rss.xml'), rss, 'utf8');

const grouped = {};
for (const page of pages) {
  const category = categoryFor(page.slug);
  if (!grouped[category]) grouped[category] = [];
  grouped[category].push(page);
}
const categoryOrder = ['About and trust', 'Hidden fee detection', 'AI contract review and clauses', 'Bills and document analysis', 'Consumer negotiation', 'Research and educational resources', 'Tools and other canonical resources'];
let llms = '# DetectHiddenFees\n\n';
llms += '> DetectHiddenFees is an AI-powered consumer information and document-analysis website focused on hidden fees, contract terms, bills, invoices, estimates, pricing transparency, and negotiation preparation.\n\n';
llms += `- Website: DetectHiddenFees.com\n- Canonical content URLs: ${pages.length}\n- Related product: ${config.site.hiddenFeeAI}\n- Relationship: DetectHiddenFees provides education, research, and product information; HiddenFeeAI is the related document-analysis product.\n- This file lists canonical clean URLs only. Redirect sources and administrative routes are excluded.\n\n`;
for (const category of categoryOrder) {
  if (!grouped[category]) continue;
  llms += `## ${category}\n\n`;
  for (const page of grouped[category].sort((a, b) => a.slug.localeCompare(b.slug))) {
    const label = page.title.replace(/\s*\|\s*DetectHiddenFees\s*$/i, '').trim();
    llms += `- [${label}](${page.url}) ${String.fromCharCode(0x2014)} Canonical page for this topic.\n`;
  }
  llms += '\n';
}
fs.writeFileSync(path.join(ROOT, 'llms.txt'), llms, 'utf8');

fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true });
const metadataReport = {
  generatedAt: new Date().toISOString(),
  pagesScanned: canonicalSlugs.length,
  pagesChanged: metadataChanges.length,
  pagesWithSharedMetadataUpdated: canonicalSlugs.length,
  searchActionsRemoved: totalSearchActionsRemoved,
  unsupportedFaqSchemasRemoved: totalFaqSchemasRemoved,
  changes: metadataChanges,
  validation: {
    allCanonicalPagesHaveTitle: pages.every((page) => Boolean(page.title)),
    allCanonicalPagesHaveDescription: pages.every((page) => Boolean(page.description)),
    allCanonicalPagesUseHttpsCanonical: pages.every((page) => /^https:\/\//.test(page.url)),
    llmsCanonicalUrlCount: pages.length,
    rssEditorialItemCount: feedPages.length
  }
};
fs.writeFileSync(path.join(ROOT, 'reports', 'phase1-metadata-qa.json'), JSON.stringify(metadataReport, null, 2));

console.log(JSON.stringify({ pages: pages.length, metadataChanges: metadataChanges.length, searchActionsRemoved: totalSearchActionsRemoved, unsupportedFaqSchemasRemoved: totalFaqSchemasRemoved, rssItems: feedPages.length, llmsUrls: pages.length }, null, 2));
