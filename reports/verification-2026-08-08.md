# Verification Report — 2026-08-08

## Source deployment

- Changes were pushed directly to GitHub `main`.
- Latest verified deployed code commit: `d769831` (`Make financial analysis evidence based`). Earlier verified page code is `d52f5c2`, `c7f1441`, and `68ddd68`; documentation handoff commits are `95f1fb5`, `a8845b4`, `6c57ade`, and `6ec3f11`. This follows the discovery governance, deployment handoff, canonical opportunity, attribution, contextual CTA, Research Lab, navigation, cache-bust, embed-route, hub, safe dashboard, evidence-governance, redirect, exact GSC audit, contractor-estimate authority, construction-contract, estimate-review, and bill-analyzer fixes.
- The pre-existing user-owned change to `calculator-authority.css` remains unstaged and untouched.

## Local verification

- 238 sitemap pages pass title, description, canonical, H1, JSON-LD, indexability, internal-link, and redirect-link checks.
- Sitemap contains 238 canonical URLs; `llms.txt` contains 238 canonical URLs; RSS contains 178 editorial items.
- Attribution runtime is present on all 238 canonical pages and does not process document contents.
- Research manifest remains collecting-only with zero records and no published statistics.
- High-risk and prioritized unverified product-claim checks pass for 22 pages, including `hidden-fees-guides.html`, `what-fees-should-i-look-for-in-a-contractor-estimate.html`, and `ai-construction-contract-review.html`; the construction-page remediation script was run twice successfully.
- High-risk and prioritized unverified product-claim checks pass for 23 pages, including `ai-estimate-review.html`; the estimate-page remediation script was run repeatedly and its JSON-LD replacement remains at exactly four blocks.
- High-risk and prioritized unverified product-claim checks pass for 24 pages, including `ai-bill-analyzer.html`; the bill-page remediation script was run repeatedly and its JSON-LD replacement remains at exactly four blocks.
- High-risk and prioritized unverified product-claim checks pass for 24 pages, including `ai-financial-analysis.html`; the financial-analysis remediation script was run repeatedly, its original inline CSS was preserved/restored, and its JSON-LD remains at exactly four blocks.
- Contextual CTA validation passes on 7 pages, including five `document_analysis` annotations on `ai-financial-analysis.html`; the attribution runtime continues to avoid document-content handling.
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

## Retired hub alias cleanup

- The cleanup was pushed directly to GitHub `main` in `f1d8c38` and `a4c152b`. The first commit corrected stale BreadcrumbList schema entries on 27 pages; the second removed the exact retired URL/name from all remaining canonical HTML references while preserving the legacy redirect source.
- The final local master validation covers 238 canonical pages and reports `staleRetiredAliasReferences=0`, with all existing metadata, canonical, H1, JSON-LD, indexability, internal-link, redirect-link, and legacy-link checks also at zero failures. The full validation suite passed, and the pre-existing `calculator-authority.css` modification was not staged.

## Evidence-based document-analysis tools guide

- Commit `451525c` remediated `ai-document-analysis-tools.html`, replacing bill-specific sales copy and unsupported accuracy, speed, universal-format, savings, and protection claims with an answer-first comparison guide for contracts, bills, invoices, and estimates.
- The page now links to the official NIST AI Risk Management Framework, explains limitations and human review, uses three contextual `document_analysis` CTA annotations, corrects the stale hub label, and links to canonical related resources. The incorrect `SoftwareApplication` JSON-LD was removed; Article, BreadcrumbList, and WebPage JSON-LD remain.
- Local checks passed with the master validator at 238 canonical pages, the claim gate at 25 priority pages, contextual CTA validation at 8 pages, discovery assets aligned at sitemap 238 / `llms.txt` 238 / RSS 179 total with 178 editorial items, and no `git diff --check` errors. The calculator CSS remained unstaged.

## Evidence-based invoice analyzer guide

- Commit `eae5423` remediated `ai-invoice-analyzer.html`, replacing bill-specific sales copy and unsupported invoice-error percentages, savings, “every line item,” and “in minutes” claims with an answer-first guide to invoice review and verification.
- The page now cites official FTC, CFPB, FTC fee-disclosure, and NIST guidance; uses four `bill_analysis` CTA annotations; links to canonical related resources; removes the incorrect `SoftwareApplication` schema; and exposes Article, BreadcrumbList, WebPage, and FAQPage JSON-LD with six visible/schema-aligned questions.
- Local checks passed with the master validator at 238 canonical pages, the claim gate at 26 priority pages, contextual CTA validation at 9 pages, discovery assets aligned at sitemap 238 / `llms.txt` 238 / RSS 179 total with 178 editorial items, and no `git diff --check` errors. The calculator CSS remained unstaged.

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

The bill-analyzer page was verified after commit `d52f5c2`. Production returned HTTP 200 with the self-canonical URL, updated `dateModified`, four official source links, eight FAQ schema questions, five bill-analysis CTA annotations, the updated title/content, and no old overclaiming or retired breadcrumb claims. A fresh live browser tab at 375px and 1440px reported one H1, no horizontal overflow, and empty console error/warning logs; visible FAQ questions and answers exactly match the FAQPage schema.

The financial-analysis page was verified after commit `d769831` propagated to the live host. Production returned HTTP 200 with the updated title, self-canonical URL, `dateModified` `2026-08-08`, four official source links (NIST, FTC, FCC, and CFPB), eight FAQ schema questions, five `document_analysis` CTA annotations, and no removed unsupported claims or retired `ai-document-intelligence-center` reference. A fresh live browser tab at 375px reported one H1, eight visible FAQs, four visible source links, five document-analysis CTAs, no horizontal overflow, and empty console error/warning logs; visible FAQ questions and answers exactly match the FAQPage schema.

The retired hub alias cleanup was verified after propagation with cache-busting HTTP checks covering all 32 changed extensionless page URLs. Every response was HTTP 200 and none contained `ai-document-intelligence-center` or `AI Document Intelligence Center`; a representative propagation check was clean on attempt three. The in-app browser still displayed the old breadcrumb label for `/ai-analysis-hub` despite unique query strings, while direct HTTP responses were clean and browser console logs were empty. This is recorded as a browser-surface cache discrepancy, not successful browser-DOM verification; confirm with a fresh browser session before treating the visual/browser check as resolved.

The document-analysis tools guide was verified after commit `451525c` propagated. A cache-busting production HTTP check was clean on attempt five. Fresh live browser checks at desktop and mobile widths found no horizontal overflow, one H1, the evidence-safe hero, three `document_analysis` CTAs, the NIST source link, no old bill-specific CTA, no stale hub label, no `SoftwareApplication` schema, and empty console error/warning logs.

The invoice analyzer guide was verified after commit `eae5423` propagated. A cache-busting production HTTP check was clean on attempt five. Fresh live browser checks at desktop and mobile widths found no horizontal overflow, one H1, four `bill_analysis` CTAs, four official source links, six visible FAQ questions, no old bill-specific wording, no stale hub or redirect reference, no `SoftwareApplication` schema, and empty console error/warning logs.

## Evidence-based AI analysis methodology

- Commit `6e76436` remediated `ai-analysis-methodology.html`, replacing unverified product-internal claims about training data, benchmark comparisons, accuracy-oriented processing, security audits, and negotiation outcomes with a public evidence-review framework and explicit limitations.
- The page preserves the existing design and URL, removes the research-page product sticky bar, keeps only Article/BreadcrumbList/WebPage/FAQPage JSON-LD, and exposes six visible FAQ questions matching the FAQPage schema. The public research manifest remains collecting-only with zero records.
- The page cites NIST, FTC fee-disclosure, CFPB billing, and FTC small-business invoice guidance as context-specific sources. The claim gate now guards the removed methodology promises, and the regenerated `llms.txt`, RSS, dashboard, and unsupported-claim inventory remain aligned with the canonical page set.
- Full local validation passed: 238 canonical pages, zero master structural/link/indexability failures, 15 opportunity records, 26 claim-gate pages, 9 contextual-CTA pages, discovery assets at sitemap/`llms.txt` 238 and RSS 179 total with 178 editorial items, 50 redirect rules, collecting-only evidence systems, disconnected dashboard, 15 calculator pages, and clean `git diff --check`.

## Evidence-based AI accuracy guide

- Commit `21ce9df` remediated `ai-accuracy-and-limitations.html`, replacing unsupported product-performance, training-data, “most effective,” pricing, speed, and negotiation framing with a public explanation of evaluation scope, false positives, false negatives, document context, and human verification.
- The page preserves the existing design and URL, removes the research-page sticky product bar, keeps Article/BreadcrumbList/WebPage/FAQPage JSON-LD, and exposes six visible FAQ questions matching the FAQPage schema. The public research manifest remains collecting-only with zero records.
- The page cites the NIST AI Risk Management Framework as general risk-management guidance, not product certification. The claim gate now covers 27 priority pages, and regenerated `llms.txt`, RSS, dashboard, and unsupported-claim inventory remain aligned with the canonical page set.
- Full local validation passed: 238 canonical pages, zero master structural/link/indexability failures, 15 opportunity records, 27 claim-gate pages, 9 contextual-CTA pages, discovery assets at sitemap/`llms.txt` 238 and RSS 179 total with 178 editorial items, 50 redirect rules, collecting-only evidence systems, disconnected dashboard, 15 calculator pages, and clean `git diff --check`.
- Production HTTP propagation was clean on cache-busting attempt 5. Fresh live browser checks at desktop and 390px mobile widths found no horizontal overflow, one H1, six schema-aligned FAQs, no old product claims, no `SoftwareApplication` schema, no stale footer label, no sticky product bar, and no HiddenFeeAI link in the accuracy-guide body.

## Evidence-based bank overdraft-fee guide

- Commit `75d9c8c` remediated `hidden-bank-overdraft-fees.html`, replacing unsupported fee ranges, annualized examples, universal transaction-reordering language, speed/coverage claims, and the sticky product bar with a source-backed review workflow.
- The page preserves the existing design and URL, cites CFPB overdraft and dispute guidance, Regulation E §1005.17, and FDIC consumer guidance, and explains that transaction type, account disclosures, and facts control the analysis.
- Article/BreadcrumbList/WebPage/FAQPage JSON-LD remain with six visible/schema-aligned questions. One contextual `bank_statement_review` CTA is annotated for attribution and tells users to confirm current product/privacy/retention details before uploading sensitive records.
- Full local validation passed: 238 canonical pages, zero master structural/link/indexability failures, 15 opportunity records, 28 claim-gate pages, 10 contextual-CTA pages, discovery assets at sitemap/`llms.txt` 238 and RSS 179 total with 178 editorial items, 50 redirect rules, collecting-only evidence systems, disconnected dashboard, 15 calculator pages, and clean `git diff --check`.
- Production HTTP and fresh live browser checks were clean after propagation: HTTP 200, four official source links, one H1, six schema-aligned FAQs, no horizontal overflow at desktop or 390px mobile, no old claims, no stale footer label, no `SoftwareApplication` schema, no sticky product bar, and empty console logs.

## Evidence-based dealership-financing guide

- Commit `0ba8f7e` remediated `hidden-dealership-financing-fees.html`, replacing unsupported dealer-profit, pricing-range, savings, speed, and negotiation-outcome claims with an answer-first comparison and document-review workflow.
- The page preserves the existing design and URL, cites FTC guidance on add-ons and financing plus CFPB guidance on dealer-arranged financing and auto-loan negotiation, and keeps jurisdiction and contract-specific limitations visible.
- Article/BreadcrumbList/WebPage/FAQPage JSON-LD remain with six visible/schema-aligned questions. The inappropriate Product schema and product sticky bar were removed. One contextual `auto_financing_review` CTA is annotated for attribution and tells users to confirm current product/privacy/retention details before uploading vehicle documents.
- Full local validation passed: 238 canonical pages, zero master structural/link/indexability failures, 15 opportunity records, 29 claim-gate pages, 11 contextual-CTA pages, discovery assets at sitemap/`llms.txt` 238 and RSS 179 total with 178 editorial items, 50 redirect rules, collecting-only evidence systems, disconnected dashboard, 15 calculator pages, and clean `git diff --check`.
- Production HTTP and fresh live browser checks were clean after propagation: HTTP 200, four official source links, one H1, six schema-aligned FAQs, no horizontal overflow at desktop or 390px mobile, no old claims, no stale footer label, no Product schema, no sticky product bar, and empty console logs.

## Evidence-based AI financial-advisor guide

- Commit `3497b54` remediated `ai-financial-advisor.html`, separating automated investment advice from AI-assisted document review and replacing unsupported OCR, benchmarking, proprietary-methodology, pricing, speed, and outcome claims with an evidence-first guide.
- The page preserves the existing design and URL, cites Investor.gov, CFPB, and NIST guidance, and explains that a document review does not establish legality, fairness, investment suitability, savings, or dispute success.
- The inappropriate SoftwareApplication/Product/HowTo/DefinedTerm schema and sticky product bar were removed. Article/BreadcrumbList/WebPage/FAQPage JSON-LD remain with six visible/schema-aligned questions. One contextual `document_analysis` CTA is annotated for attribution and tells users to confirm current product/privacy/retention details before uploading financial records.
- Full local validation passed: 238 canonical pages, zero master structural/link/indexability failures, 15 opportunity records, 30 claim-gate pages, 12 contextual-CTA pages, discovery assets at sitemap/`llms.txt` 238 and RSS 179 total with 178 editorial items, 50 redirect rules, collecting-only evidence systems, disconnected dashboard, 15 calculator pages, and clean `git diff --check`.
- Production HTTP and fresh live browser checks were clean after propagation: HTTP 200, four official source links, one H1, six schema-aligned FAQs, no horizontal overflow at desktop or 390px mobile, no old claims, no stale footer label, no product schema, no sticky product bar, and empty console logs.

## Evidence-safe auto-financing example

- Commit `1a8aaeb` remediated `example-auto-financing.html`, replacing precise fictional prices, APR, overcharge, market-cost, savings, and product-outcome claims with a clearly labeled variable-based scenario and verification questions.
- The page preserves the existing design and URL, cites FTC and CFPB auto-financing guidance, removes the sticky product bar, and keeps one annotated `auto_financing_review` CTA with current product/privacy/retention caveats.
- Article/BreadcrumbList/WebPage/FAQPage JSON-LD remain with six visible/schema-aligned questions. The guarded script was updated to normalize the variable inputs and ran twice successfully.
- Full local validation passed: 238 canonical pages, zero master structural/link/indexability failures, 15 opportunity records, 31 claim-gate pages, 13 contextual-CTA pages, discovery assets at sitemap/`llms.txt` 238 and RSS 179 total with 178 editorial items, 50 redirect rules, collecting-only evidence systems, disconnected dashboard, 15 calculator pages, and clean `git diff --check`.
- Production HTTP and fresh live browser checks were clean after propagation: HTTP 200, four official source links, one H1, six schema-aligned FAQs, no horizontal overflow at desktop or 390px mobile, no old fictional outcome claims, no stale footer label, no Product schema, no sticky product bar, and empty console logs.
