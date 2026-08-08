# Verification Report — 2026-08-08

## Source deployment

- Changes were pushed directly to GitHub `main`.
- Latest verified commit: `0d2fd21` (`Govern canonical discovery asset generation`), following the deployment handoff, canonical opportunity, attribution, contextual CTA, Research Lab, navigation, cache-bust, embed-route, and hub fixes.
- The pre-existing user-owned change to `calculator-authority.css` remains unstaged and untouched.

## Local verification

- 238 sitemap pages pass title, description, canonical, H1, JSON-LD, indexability, internal-link, and redirect-link checks.
- Sitemap contains 238 canonical URLs; `llms.txt` contains 238 canonical URLs; RSS contains 178 editorial items.
- Attribution runtime is present on all 238 canonical pages and does not process document contents.
- Research manifest remains collecting-only with zero records and no published statistics.
- High-risk and prioritized unverified product-claim checks pass for nineteen pages, including `hidden-fees-guides.html`; the reusable remediation script is idempotent on a second run.
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

## Production verification

After propagation, the live host verified the three extensionless aliases as HTTP 301 responses to their canonical destinations. The 40 Search Console example URLs were rechecked: 38 return HTTP 200 with self-referencing canonicals and 2 duplicate aliases return HTTP 301. The updated `hidden-fees-guides` page returns HTTP 200 with the new source/limitations section, source links, updated description, one canonical, one H1, five JSON-LD blocks, and the refreshed date.

Fresh browser checks at 320px, 390px, and 1440px verified no document-level horizontal overflow. At 320px and 390px the shared navigation wraps with `overflow-x: visible` and `flex-wrap: wrap`; at 1440px the desktop layout remains unchanged. Console error/warning logs were empty during the checks.

The live embed-template redirect chain was checked with headers disabled from caching: the `.html` source returns a permanent redirect with noindex, and the extensionless final response also returns noindex/no-follow/no-archive and no-store caching.

The five Research Lab status pages return HTTP 200 in production and serve the August 8, 2026 research-record summary. At 390px, the Research Center hero actions are full-width stacked buttons with no document overflow; at 1440px they remain inline in the established blue/purple and glass-button styles. The browser console log was empty during the final check.

The four contextual CTA pages return HTTP 200 in production. Browser checks at 390px and 1440px confirmed the expected action metadata on navigation, hero, content, end, and sticky links, with no horizontal overflow or console logs.

After commit `ca945fc` propagated, six production funnel pages were checked with a cache-busting deployment query. All returned HTTP 200, retained their existing destinations, exposed the new internal action metadata, decorated outbound HiddenFeeAI links with sanitized attribution parameters, and produced no browser error/warning logs. A 390px check on three representative pages confirmed no horizontal overflow and preserved the existing responsive design.

The repository contains no deployment workflow that publishes the site from `main`, but the existing hosting connection published the pushed GitHub commits after propagation. No host credentials, API keys, or Cloudflare changes were made.
