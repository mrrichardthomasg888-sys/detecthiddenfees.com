# Verification Report — 2026-08-08

## Source deployment

- Changes were pushed directly to GitHub `main`.
- Latest verified deployed code commit: `c7f1441` (`Make estimate review evidence based`). Earlier verified page code is `68ddd68`; documentation handoff commits are `95f1fb5`, `a8845b4`, and `6c57ade`. This follows the discovery governance, deployment handoff, canonical opportunity, attribution, contextual CTA, Research Lab, navigation, cache-bust, embed-route, hub, safe dashboard, evidence-governance, redirect, exact GSC audit, and contractor-estimate authority fixes.
- The pre-existing user-owned change to `calculator-authority.css` remains unstaged and untouched.

## Local verification

- 238 sitemap pages pass title, description, canonical, H1, JSON-LD, indexability, internal-link, and redirect-link checks.
- Sitemap contains 238 canonical URLs; `llms.txt` contains 238 canonical URLs; RSS contains 178 editorial items.
- Attribution runtime is present on all 238 canonical pages and does not process document contents.
- Research manifest remains collecting-only with zero records and no published statistics.
- High-risk and prioritized unverified product-claim checks pass for 22 pages, including `hidden-fees-guides.html`, `what-fees-should-i-look-for-in-a-contractor-estimate.html`, and `ai-construction-contract-review.html`; the construction-page remediation script was run twice successfully.
- High-risk and prioritized unverified product-claim checks pass for 23 pages, including `ai-estimate-review.html`; the estimate-page remediation script was run repeatedly and its JSON-LD replacement remains at exactly four blocks.
- The unsupported-claim inventory was refreshed after the hub remediation: 2,175 quantitative-amount candidates, 533 percentage candidates, 1,604 absolute/superlative candidates, 144 performance/outcome candidates, and 172 population/scale candidates. These remain review candidates, not findings that every match is unsupported.
- The shared stylesheet cache-bust is consistent across 234 HTML files; no `sticky6` references remain and all current references use `sticky7`.
- All known `.html` redirect aliases now have matching extensionless 301 rules.
- Search Console import remains explicitly `not_connected` with zero records; no fabricated query, click, position, or revenue data was added.
- Current discovery alignment is canonical-only: sitemap 238 URLs, `llms.txt` 238 URLs, and RSS 178 editorial items; no non-sitemap or redirect-source URLs are present in those assets.
- The raw `embed-code-template.html` fragment is excluded from the sitemap and its `.html` redirect and extensionless final route are protected with `X-Robots-Tag: noindex, nofollow, noarchive`; the final route is no-store.
- The five public Research Lab status pages now expose a crawlable research-record summary covering author, scope, collection timing, publication method, current manifest size, and limitations. Their visible “Last updated” date and `dateModified` values are aligned to the manifest’s `2026-08-08` update date.
- `validate-research-data.js` now fails if a Research Lab status page drifts from the manifest update date or loses the citation-engineering summary. The research manifest remains collecting-only with zero records and null statistics.
- Four existing high-intent pages now use context-specific CTA labels and explicit attribution actions: `contract_review`, `subscription_fee_review`, and `estimate_review`. The repeatable annotator and validator preserve the existing URLs and do not change HiddenFeeAI behavior.
- A generated CTA-path audit now reads the canonical sitemap and local HTML directly: 238 canonical pages, 752 HiddenFeeAI links inside main content, 117 explicitly annotated main links, 8 pages with an existing internal funnel path, and 9 pages with no direct product or recognized internal funnel path. Performance fields remain explicitly disconnected; the older manual conversion audit is marked historical.
- The attribution runtime now emits a separate `dhf_funnel_path_click` event for the 14 existing internal analysis/upload links, while outbound HiddenFeeAI links continue to emit `dhf_cta_click`. The events carry sanitized path, landing, referrer, session, action, and placement context only; no document content is handled.
- Discovery governance now derives `llms.txt` and RSS candidates from indexable self-canonical HTML rather than trusting a possibly stale sitemap input. The validator confirms 238 canonical HTML candidates exactly match the 238 sitemap URLs and rejects future drift; the refreshed RSS contains 178 editorial items with the verified August 8 Research Lab update dates.
- The static-site dashboard layer now generates `reports/seo-dashboard-current.md` with real structural counts and explicit `DATA SOURCE NOT CONNECTED`, `INTEGRATION REQUIRED`, and `NOT POPULATED` states. Its validator rejects placeholder zero performance metrics; no `/admin/seo` route or credentials were published.
- The evidence register is present as an intentionally empty `collecting` manifest with a JSON Schema and validator. No claim is marked verified without a source URL, traceable evidence reference, review date, and reviewer; the current dashboard reports zero evidence-register records.

## Production verification

After propagation, the live host verified the three extensionless aliases as HTTP 301 responses to their canonical destinations. The 40 Search Console example URLs were rechecked: 38 return HTTP 200 with self-referencing canonicals and 2 duplicate aliases return HTTP 301. The updated `hidden-fees-guides` page returns HTTP 200 with the new source/limitations section, source links, updated description, one canonical, one H1, five JSON-LD blocks, and the refreshed date.

Fresh browser checks at 320px, 390px, and 1440px verified no document-level horizontal overflow. At 320px and 390px the shared navigation wraps with `overflow-x: visible` and `flex-wrap: wrap`; at 1440px the desktop layout remains unchanged. Console error/warning logs were empty during the checks.

The live embed-template redirect chain was checked with headers disabled from caching: the `.html` source returns a permanent redirect with noindex, and the extensionless final response also returns noindex/no-follow/no-archive and no-store caching.

The five Research Lab status pages return HTTP 200 in production and serve the August 8, 2026 research-record summary. At 390px, the Research Center hero actions are full-width stacked buttons with no document overflow; at 1440px they remain inline in the established blue/purple and glass-button styles. The browser console log was empty during the final check.

The four contextual CTA pages return HTTP 200 in production. Browser checks at 390px and 1440px confirmed the expected action metadata on navigation, hero, content, end, and sticky links, with no horizontal overflow or console logs.

After commit `ca945fc` propagated, six production funnel pages were checked with a cache-busting deployment query. All returned HTTP 200, retained their existing destinations, exposed the new internal action metadata, decorated outbound HiddenFeeAI links with sanitized attribution parameters, and produced no browser error/warning logs. A 390px check on three representative pages confirmed no horizontal overflow and preserved the existing responsive design.

The repository contains no deployment workflow that publishes the site from `main`, but the existing hosting connection published the pushed GitHub commits after propagation. No host credentials, API keys, or Cloudflare changes were made.

After commit `3215db2` propagated, `/seo/evidence-register.json` returned HTTP 200 with `status=collecting` and zero records. The generated `/reports/seo-dashboard-current.md` returned HTTP 200 as a public-safe structural status report; it contains no Search Console, customer, document, conversion, or revenue data and explicitly reports disconnected integrations. `/admin/seo` returned HTTP 404, while the canonical `/ai-analysis-hub` page returned HTTP 200. This confirms that no unauthenticated connected-data dashboard was exposed.

After commit `ad534c5` propagated, the exact stale coverage URL `/alphabet-links.html` and its extensionless counterpart `/alphabet-links` returned HTTP 301 to `/hidden-fee-dictionary`; the target returned HTTP 200. This repaired the only 404 found while auditing all 146 rows in the supplied “Page with redirect” export. The other 145 rows are intentional legacy redirects, documented in `reports/gsc-page-with-redirect-audit-2026-08-08.md`.

The exact 40 user-supplied `.html` examples were re-audited and the report was corrected: 38 first return HTTP 308 normalization and 2 first return explicit HTTP 301; all 40 extensionless destinations return HTTP 200 with self-referencing canonicals. This corrected the audit wording without changing any page, sitemap entry, or canonical URL.

The contractor-estimate authority page was verified after commit `9a6159a`. Production returned HTTP 200 and exposed the FTC and California CSLB source links, the updated 2026-08-08 date, eight FAQ items, and the self-canonical URL. The removed unsupported range and invented case-study markers were absent. At the browser’s mobile and desktop test widths, document width matched the viewport content width with no horizontal overflow; console error and warning logs were empty.

The construction-contract review page was verified after commit `68ddd68`. Production returned HTTP 200 with the self-canonical URL, updated `dateModified`, both official source links, ten FAQ schema questions, the evidence-safe hero and CTA, and no removed unsupported claims. Local and live browser checks at 375px and 1440px reported one H1, ten visible FAQs, no horizontal overflow, and empty console error/warning logs. The visible FAQ questions and answers exactly match the FAQPage schema.

The estimate-review page was verified after commit `c7f1441`. Production returned HTTP 200 with the self-canonical URL, updated `dateModified`, both official source links, eight FAQ schema questions, five estimate-review CTA annotations, the updated title/content, and no old bill-analysis or retired breadcrumb claims. A fresh live browser tab at 375px and 1440px reported one H1, no horizontal overflow, and empty console error/warning logs; visible FAQ questions and answers exactly match the FAQPage schema.
