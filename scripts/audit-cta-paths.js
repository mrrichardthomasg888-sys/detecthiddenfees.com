const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const auditDate = process.env.DHF_AUDIT_DATE || '2026-08-08';
const sitemapSource = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const pages = [...sitemapSource.matchAll(/<loc>https:\/\/detecthiddenfees\.com\/([^<]*)<\/loc>/g)]
  .map(match => ({
    path: match[1] ? `/${match[1]}` : '/',
    file: match[1] ? `${match[1]}.html` : 'index.html'
  }));

function cleanText(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&mdash;|&#8212;/gi, '—')
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'));
  return match ? match[1] : null;
}

function productLinks(source) {
  return [...source.matchAll(/<a\b([^>]*\bhref=["']https:\/\/(?:www\.)?hiddenfeeai\.com(?:[^"']*)["'][^>]*)>([\s\S]*?)<\/a>/gi)]
    .map(match => {
      const tag = `<a${match[1]}>`;
      return {
        action: attribute(tag, 'data-cta-action') || 'unspecified',
        position: attribute(tag, 'data-cta-position') || 'unspecified',
        variant: attribute(tag, 'data-cta-variant') || 'unspecified',
        text: cleanText(match[2])
      };
    });
}

function localFunnelLinks(source) {
  return [...source.matchAll(/<a\b[^>]+href=["'](\/[^"']+)["'][^>]*>/gi)]
    .map(match => match[1])
    .filter(href => /^\/analyze-my-(?:bill|document)(?:[?#].*)?$|^\/upload-[^?#]+$/i.test(href));
}

const pageRows = pages.map(page => {
  const source = fs.readFileSync(path.join(root, page.file), 'utf8');
  const main = source.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || '';
  const allLinks = productLinks(source);
  const mainLinks = productLinks(main);
  const mainLocalFunnelLinks = localFunnelLinks(main);
  const actionCounts = {};
  for (const link of mainLinks) actionCounts[link.action] = (actionCounts[link.action] || 0) + 1;
  return {
    path: page.path,
    file: page.file,
    product_links_total: allLinks.length,
    product_links_in_main: mainLinks.length,
    main_annotated_links: mainLinks.filter(link => link.action !== 'unspecified').length,
    main_unannotated_links: mainLinks.filter(link => link.action === 'unspecified').length,
    has_main_product_link: mainLinks.length > 0,
    local_funnel_links_in_main: [...new Set(mainLocalFunnelLinks)],
    has_main_funnel_path: mainLinks.length > 0 || mainLocalFunnelLinks.length > 0,
    has_annotated_hero_product_link: mainLinks.some(link => link.position === 'hero'),
    has_annotated_sticky_product_link: allLinks.some(link => link.position === 'sticky'),
    action_counts: actionCounts,
    cta_texts: [...new Set(mainLinks.map(link => link.text).filter(Boolean))]
  };
});

const sum = key => pageRows.reduce((total, row) => total + row[key], 0);
const actionCounts = {};
for (const row of pageRows) for (const [action, count] of Object.entries(row.action_counts)) actionCounts[action] = (actionCounts[action] || 0) + count;

const report = {
  audit_date: auditDate,
  source: 'canonical sitemap and local HTML attributes; no analytics or Search Console performance data connected',
  performance_data: {
    status: 'DATA SOURCE NOT CONNECTED',
    impressions: null,
    clicks: null,
    conversions: null,
    revenue: null
  },
  summary: {
    canonical_pages: pageRows.length,
    pages_with_main_product_link: pageRows.filter(row => row.has_main_product_link).length,
    pages_with_explicit_hero_metadata: pageRows.filter(row => row.has_annotated_hero_product_link).length,
    pages_with_explicit_sticky_metadata: pageRows.filter(row => row.has_annotated_sticky_product_link).length,
    pages_without_main_direct_product_link: pageRows.filter(row => !row.has_main_product_link).map(row => row.path),
    pages_with_internal_funnel_path: pageRows.filter(row => row.local_funnel_links_in_main.length > 0).length,
    pages_without_main_funnel_path: pageRows.filter(row => !row.has_main_funnel_path).map(row => row.path),
    total_product_links: sum('product_links_total'),
    total_main_product_links: sum('product_links_in_main'),
    annotated_main_links: sum('main_annotated_links'),
    unannotated_main_links: sum('main_unannotated_links'),
    action_counts: actionCounts
  },
  pages: pageRows
};

const jsonPath = path.join(root, 'reports', `cta-path-audit-${auditDate}.json`);
fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

const summaryRows = [
  ['Canonical sitemap pages', report.summary.canonical_pages],
  ['Pages with a main HiddenFeeAI link', report.summary.pages_with_main_product_link],
  ['Pages with explicit hero metadata', report.summary.pages_with_explicit_hero_metadata],
  ['Pages with explicit sticky metadata', report.summary.pages_with_explicit_sticky_metadata],
  ['Pages with an internal funnel path', report.summary.pages_with_internal_funnel_path],
  ['Pages without a main funnel path', report.summary.pages_without_main_funnel_path.length],
  ['Product links in main content', report.summary.total_main_product_links],
  ['Annotated main links', report.summary.annotated_main_links],
  ['Unannotated main links', report.summary.unannotated_main_links]
];
const md = [
  `# CTA Path Audit — ${auditDate}`,
  '',
  '> This is a structural audit of canonical HTML and attribution metadata. It does not claim impressions, clicks, conversions, revenue, or product-side completion events.',
  '',
  '## Current source status',
  '',
  '- Performance data: **DATA SOURCE NOT CONNECTED**',
  '- Search Console data: **DATA SOURCE NOT CONNECTED**',
  '- Product-side upload, analysis, checkout, and revenue events: **INTEGRATION REQUIRED**',
  '',
  '## Structural summary',
  '',
  '| Metric | Value |',
  '|---|---:|',
  ...summaryRows.map(row => `| ${row[0]} | ${row[1]} |`),
  '',
  '## Main-content action taxonomy',
  '',
  '| Action | Link count |',
  '|---|---:|',
  ...Object.entries(actionCounts).sort(([a], [b]) => a.localeCompare(b)).map(([action, count]) => `| ${action} | ${count} |`),
  '',
  '## Current structural quick wins',
  '',
  'These canonical pages have neither a direct HiddenFeeAI link nor a recognized internal funnel link inside their main content. This is a structural finding only; it is not a claim about traffic or conversion priority.',
  '',
  ...report.summary.pages_without_main_funnel_path.map(pagePath => `- ${pagePath}`),
  '',
  'The detailed page-level JSON report is generated from `sitemap.xml` and the current local HTML. Null performance values are intentional and must not be interpreted as zero.',
  ''
].join('\n');
fs.writeFileSync(path.join(root, 'reports', `cta-path-audit-${auditDate}.md`), md, 'utf8');
console.log(JSON.stringify(report.summary, null, 2));
