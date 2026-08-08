const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const reportPath = path.join(ROOT, 'reports', 'seo-dashboard-current.md');
const report = fs.readFileSync(reportPath, 'utf8');
const ctaAudit = JSON.parse(fs.readFileSync(path.join(ROOT, 'reports', 'cta-path-audit-2026-08-08.json'), 'utf8'));
const sitemapCount = (fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8').match(/<loc>[^<]+<\/loc>/g) || []).length;
const errors = [];

for (const required of ['DATA SOURCE NOT CONNECTED', 'INTEGRATION REQUIRED', 'NOT POPULATED', 'Null is not zero', 'no Search Console query data']) {
  if (!report.includes(required)) errors.push(`dashboard report is missing required safety/status text: ${required}`);
}
if (!report.includes(`| Canonical sitemap pages | ${sitemapCount} |`)) errors.push('dashboard sitemap count does not match sitemap.xml');
if (!report.includes(`| Pages with a main HiddenFeeAI link | ${ctaAudit.summary.pages_with_main_product_link} |`)) errors.push('dashboard CTA page count does not match CTA audit');
if (!report.includes(`| Main-content HiddenFeeAI links | ${ctaAudit.summary.total_main_product_links} |`)) errors.push('dashboard CTA link count does not match CTA audit');
if (/\| (Impressions|Clicks|CTR|Average position|Conversions|Revenue) \|[^\n]*\|\s*0(?:\.0+)?\s*\|/i.test(report)) errors.push('dashboard appears to render a disconnected performance metric as zero');
if (/customer document|document content|extracted text|payment details/i.test(report) && !/no Search Console query data, customer data, document contents, conversion records, or revenue figures/i.test(report)) errors.push('dashboard privacy boundary is incomplete');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`SEO dashboard report valid: sitemap=${sitemapCount}, source statuses explicit, no placeholder performance values.`);
