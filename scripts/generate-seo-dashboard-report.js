const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORT_PATH = path.join(ROOT, 'reports', 'seo-dashboard-current.md');
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const readJson = (file) => JSON.parse(read(file));
const dateStamp = new Date().toISOString().slice(0, 10);

const sitemapUrls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const ctaAudit = readJson('reports/cta-path-audit-2026-08-08.json');
const research = readJson('research-data.json');
const claims = readJson('reports/unsupported-claims-audit-2026-08-08.json');

const redirectSources = new Set();
for (const line of read('_redirects').split(/\r?\n/)) {
  const parts = line.trim().split(/\s+/);
  if (parts.length >= 3 && /^30[1278]$/.test(parts[2])) redirectSources.add(parts[0].replace(/\.html$/i, '').replace(/\/$/, '') || '/');
}
const canonicalCandidates = new Set();
for (const file of fs.readdirSync(ROOT).filter((name) => name.endsWith('.html'))) {
  const html = read(file);
  const slug = file === 'index.html' ? '' : file.replace(/\.html$/i, '');
  const expected = `https://detecthiddenfees.com/${slug}`;
  const canonical = (html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)/i) || [])[1] || '';
  const robots = (html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["']([^"']+)/i) || [])[1] || '';
  if (canonical === expected && !/\bnoindex\b/i.test(robots) && !redirectSources.has(slug ? `/${slug}` : '/')) canonicalCandidates.add(canonical);
}
const sitemapSet = new Set(sitemapUrls);
if (canonicalCandidates.size !== sitemapSet.size || [...canonicalCandidates].some((url) => !sitemapSet.has(url))) {
  throw new Error('Cannot generate dashboard: canonical HTML candidates and sitemap URLs are out of sync.');
}

const structural = {
  canonicalPages: sitemapUrls.length,
  canonicalCandidateParity: canonicalCandidates.size,
  pagesWithMainProductLink: ctaAudit.summary.pages_with_main_product_link,
  pagesWithInternalFunnelPath: ctaAudit.summary.pages_with_internal_funnel_path,
  mainProductLinks: ctaAudit.summary.total_main_product_links,
  annotatedMainLinks: ctaAudit.summary.annotated_main_links,
  researchRecords: Array.isArray(research.records) ? research.records.length : null,
  researchStatus: research.status || 'unknown',
  claimCandidates: Object.values(claims.candidate_counts || {}).reduce((sum, value) => sum + Number(value || 0), 0)
};

const lines = [
  '# DetectHiddenFees SEO Dashboard — Current Status',
  '',
  `> Generated: ${dateStamp}`,
  '>',
  '> This is a public-safe status report generated from repository metadata. It is not an authenticated admin dashboard and contains no Search Console query data, customer data, document contents, conversion records, or revenue figures.',
  '',
  '## Connection status',
  '',
  '| Area | Status | Source or required connection |',
  '|---|---|---|',
  '| Search performance | **DATA SOURCE NOT CONNECTED** | Google Search Console API or reviewed private export |',
  '| Index coverage | **DATA SOURCE NOT CONNECTED** | Google Search Console URL Inspection/coverage export |',
  '| CTA analytics | **DATA SOURCE NOT CONNECTED** | Analytics property receiving the documented CTA events |',
  '| HiddenFeeAI referrals | **INTEGRATION REQUIRED** | HiddenFeeAI handoff and referral-received event |',
  '| Uploads and analyses | **INTEGRATION REQUIRED** | HiddenFeeAI server-side lifecycle events |',
  '| Checkout and revenue | **INTEGRATION REQUIRED** | Product/processor events with privacy-safe attribution |',
  '| Backlinks and mentions | **NOT POPULATED** | Reviewed outreach/link dataset |',
  '',
  'Null is not zero. No unavailable metric is represented as a performance value.',
  '',
  '## Verified structural indicators',
  '',
  '| Indicator | Current value | Evidence |',
  '|---|---:|---|',
  `| Canonical sitemap pages | ${structural.canonicalPages} | \`sitemap.xml\` |`,
  `| Indexable self-canonical HTML parity | ${structural.canonicalCandidateParity} / ${structural.canonicalPages} | Discovery validator |`,
  `| Pages with a main HiddenFeeAI link | ${structural.pagesWithMainProductLink} | CTA path audit |`,
  `| Pages with an internal funnel path | ${structural.pagesWithInternalFunnelPath} | CTA path audit |`,
  `| Main-content HiddenFeeAI links | ${structural.mainProductLinks} | CTA path audit |`,
  `| Annotated main-content CTA links | ${structural.annotatedMainLinks} | CTA path audit |`,
  `| Research records published | ${structural.researchRecords} | \`research-data.json\` |`,
  `| Research manifest status | ${structural.researchStatus} | \`research-data.json\` |`,
  `| Claim-review candidates | ${structural.claimCandidates} | Unsupported-claim inventory; review candidates, not findings |`,
  '',
  '## Research and evidence status',
  '',
  `- Hidden Fee Index status: **${research.status || 'unknown'}**.`,
  `- Published records: **${structural.researchRecords}**.`,
  '- Published statistics: **none** until the source, scope, evidence reference, and verification status pass the publication gate.',
  '- Customer documents and confidential text are excluded from the public research manifest.',
  '',
  '## Required connections before performance reporting',
  '',
  '1. Connect a reviewed Google Search Console export or API with a reporting period and source timestamp.',
  '2. Connect the analytics property that receives `dhf_cta_click` and `dhf_funnel_path_click` without document data.',
  '3. Implement the HiddenFeeAI referral, upload, analysis, checkout, purchase, and revenue event contract.',
  '4. Keep connected exports outside the public repository unless privacy review explicitly approves a redacted artifact.',
  '',
  '## Source contracts',
  '',
  '- [Dashboard data contract](../seo/dashboard-data-contract.md)',
  '- [Attribution contract](../seo/attribution-contract.md)',
  '- [Current CTA path audit](./cta-path-audit-2026-08-08.md)',
  '- [Search Console template](../seo/search-console-data.template.json)',
  '',
  `Generated from local canonical/discovery and audit artifacts on ${dateStamp}.`
];

fs.writeFileSync(REPORT_PATH, `${lines.join('\n')}\n`, 'utf8');
console.log(`Generated public-safe SEO dashboard report: ${path.relative(ROOT, REPORT_PATH)}`);
