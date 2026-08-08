# Search Console, Cannibalization, and Conversion Quick Wins — 2026-08-08

## Evidence boundary

Search Console performance data is not connected in this workspace. Therefore this report does not assert impressions, clicks, CTR, average position, rankings, traffic, conversions, or revenue. The priority scores below are based only on current repository evidence, supplied indexing categories, page intent, and validated structural relationships.

The user-supplied Search Console export lists:

- 146 `Page with redirect` rows
- 4 `Not found (404)` rows
- 2 `Discovered - currently not indexed` rows
- 4 `Crawled - currently not indexed` rows
- 9 `Alternate page with proper canonical tag` rows

The audited `.html` examples are intentional legacy aliases that redirect to extensionless canonical URLs. They should not be submitted for indexing as independent pages. Search Console URL Inspection remains the authority for deciding whether any particular alternate should be independently indexable.

## Completed high-confidence quick win

The public Research Lab pages were carrying stale product surfaces that were inconsistent with the collecting-only research status:

- `research-center.html`
- `research-methodology.html`
- `hidden-fee-index.html`
- `hidden-fee-statistics.html`
- `hidden-fee-database.html`

This slice removed the rendered `$15` sticky offer from the affected pages, corrected stale Twitter and JSON-LD titles/descriptions, removed the unsupported FAQ schema block from `hidden-fee-statistics.html`, and retained only visible, evidence-matched research schemas. The pages still link to the public manifest and methodology, but do not present product pricing, security, retention, training-use, prevalence, or performance claims as research findings.

## Current structural conversion queue

The regenerated CTA-path audit finds 238 canonical pages, 223 with a direct main-content HiddenFeeAI link, and 10 without either a direct product link or a recognized internal funnel path:

`/ai-accuracy-and-limitations`, `/ai-analysis-methodology`, `/consumer-fee-trends-report`, `/contact`, `/editorial-policy`, `/hidden-fee-database`, `/hidden-fee-statistics`, `/research-center`, `/research-methodology`, and `/terms-of-service`.

This is a structural queue, not a conversion ranking. Contact, editorial, and terms pages should remain low-promotion trust resources. Research pages should receive a product CTA only if it improves the reader's next step without overwhelming the evidence. The regenerated audit is in `reports/cta-path-audit-2026-08-08.md` and its JSON companion.

## Cannibalization decisions

The Phase 2 similarity audit contains 120 candidate comparisons. No merge, redirect, canonical reassignment, deletion, or noindex action is authorized from similarity alone.

- `/contract-cost-calculator` and `/contract-risk-calculator` remain separate: cost modeling versus risk screening. Their intent boundaries can be clarified later without changing calculator logic or the user-owned `calculator-authority.css` file.
- High-similarity calculator and contract-tool groups remain approval-gated until real Search Console page/query data is connected.
- Supporting informational pages and commercial tool pages should keep distinct headings, examples, CTAs, and internal-link anchors even when their language overlaps.

## Next evidence-required actions

1. Connect a private Search Console export or API so query/page performance can be joined to canonical URLs.
2. Re-run the quick-win report using real impressions, clicks, CTR, and position; leave unavailable fields null.
3. Review the 4 reported 404 rows against production URL Inspection and redirect history.
4. Compare the highest-overlap calculator and contract-tool pairs using page/query data before changing canonicals.
5. Define the HiddenFeeAI referral/upload/analysis/checkout/purchase attribution contract before claiming end-to-end conversion measurement.
