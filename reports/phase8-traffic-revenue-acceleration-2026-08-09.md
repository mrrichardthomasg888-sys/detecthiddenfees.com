# Phase 8 — Traffic and Revenue Acceleration

**Date:** 2026-08-09 UTC  
**Mode:** measurement, conversion, and distribution; no mass publishing

## Guardrails

- The eight Phase 4 experiment pages remain frozen.
- `calculator-authority.css` remains untouched and user-owned.
- The public research review remains a 25-record, source-traceable sample; no market-wide statistic is inferred.
- Batch 2 remains unsent.
- Personal Gmail access remains NONE.
- Brevo, Cloudflare Worker/KV, reply monitor, and follow-up controls were not rebuilt.

## Real Search Console traffic opportunities

Source: the owner-provided `Performance-on-Search-2026-08-08.zip` on the Desktop. It covers the last three months and contains separate aggregate query and page tables. Because it does not contain query + page + date rows, this report does **not** assert query-to-page ownership or cannibalization.

### Highest-value non-frozen page opportunities

| Page | Clicks | Impressions | CTR | Position | Action |
| --- | ---: | ---: | ---: | ---: | --- |
| `/duplicate-medical-billing-charges` | 1 | 164 | 0.61% | 26.55 | Largest non-frozen qualified-traffic opportunity; improve the path to bill analysis only after checking the existing page copy and CTA. |
| `/hidden-subscription-fees` | 1 | 34 | 2.94% | 10.26 | High-intent page-one opportunity for renewal/cancellation review. |
| `/what-questions-should-i-ask-before-signing-a-contract` | 1 | 24 | 4.17% | 10.21 | High-intent page-one contract-review opportunity. |
| `/hidden-fee-statistics` | 1 | 32 | 3.12% | 16.97 | Page-two research opportunity; keep claims sample-limited. |
| `/hidden-dealership-financing-fees` | 0 | 39 | 0% | 19.79 | Page-two automotive opportunity; commercial relevance is strong, but no title/content change was made in this cycle. |
| `/hidden-bank-overdraft-fees` | 0 | 27 | 0% | 21.63 | Page-two banking opportunity; use official CFPB evidence only. |
| `/ai-document-review-tool` | 0 | 26 | 0% | 48.50 | Commercially relevant but too far from page one for a near-term edit without more evidence. |

The broadest query demand in the export is `hidden fees` (184 impressions, position 41.84), followed by `no hidden fees` (134, position 52.19) and `ai construction contract review` (93, position 23.80). The aggregate query table does not identify the ranking URL for those queries. The intended construction target remains `/ai-construction-contract-review`, but that is an architecture decision rather than a query-to-page observation.

## Conversion and attribution action implemented

The existing `/attribution.js` runtime was extended without changing the site design or frozen page content:

1. Emits one privacy-conscious `dhf_landing_view` event per page load.
2. Adds a stable `cta_id` and `cta_type` to CTA/funnel events.
3. Infers CTA position (`nav`, `top`, `middle`, `end`, or `sticky`) when a page has not supplied explicit metadata.
4. Passes `dhf_cta_id` to HiddenFeeAI alongside the existing sanitized landing, referrer, session, source, and UTM fields.
5. Continues to exclude document contents, filenames, OCR text, analysis results, and sensitive customer fields.

This improves the join key for the next HiddenFeeAI integration. It does **not** claim that uploads, purchases, revenue, or even outbound clicks are currently stored in a connected analytics system. The runtime emits browser events to an existing `gtag`/`dataLayer` only when those integrations are present.

## Funnel status

| Stage | Current status | Gap |
| --- | --- | --- |
| DetectHiddenFees landing context | Implemented in browser storage and event payloads | Consent/retention policy must be aligned with HiddenFeeAI. |
| CTA click | Instrumented with page/action/position context | No connected reporting destination is confirmed in this repository. |
| HiddenFeeAI referral | Specification exists | HiddenFeeAI must accept and persist the handoff. |
| Upload/analysis | Not connected from this repository | Requires HiddenFeeAI-side events. |
| Checkout/purchase/revenue | Not connected from this repository | Must be emitted server-side by HiddenFeeAI/payment system. |

**Paid acquisition readiness: NOT READY.** Do not buy traffic until HiddenFeeAI can prove a synthetic first-touch → referral → upload → checkout → purchase/revenue join and the DetectHiddenFees event destination is connected.

## Distribution automation status

No social account or publishing API is connected. No content was published automatically.

| Channel | Official publishing path | Connected | Current decision |
| --- | --- | --- | --- |
| YouTube | YouTube Data API with OAuth; quota applies | No | Ready for one-time channel authorization; keep draft queue only. |
| LinkedIn | Posts API; OAuth and approved Community Management access | No | Possible after organization/member authorization and current API approval. |
| Instagram | Meta/Instagram Graph API for eligible professional accounts; Meta app review and permissions required | No | Not ready; do not use browser automation. |
| Facebook | Meta Graph API for eligible Pages; Page token/app permissions required | No | Not ready; do not use browser automation. |
| Reddit | Official Reddit API/Devvit user actions; app/user authorization and community rules apply | No | Draft only; no automated comments or submissions. |
| TikTok | Content Posting API; registered app, Direct Post configuration, domain verification, and review/limits | No | Not ready; no automated publishing. |

Official documentation: [YouTube Data API](https://developers.google.com/youtube/v3/getting-started), [LinkedIn Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api), [Reddit API](https://developers.reddit.com/docs/capabilities/server/reddit-api), and [TikTok Content Posting API](https://developers.tiktok.com/doc/content-posting-api-get-started/). Meta channel status is intentionally unconnected pending a legitimate account/app authorization; no Meta credentials are present in this repository.

## Partnership pipeline

The separate research-stage traffic partnership pipeline is in `seo/phase8-partnership-pipeline.json`. It contains six qualified, non-contacted organizations across consumer education, financial counseling, and construction education. The proposed value is a workshop, checklist, curriculum, or public-source map—not a backlink exchange or product endorsement.

Highest-fit starting targets are NEFE/AFCPE for financial education and NCCER/Construction Institute for construction-contract education. They are opportunities to qualify, not claimed partners, traffic sources, or endorsements.

## Taxonomy decision

The 33 private verified records are enough to maintain the internal taxonomy framework but not enough for a balanced public taxonomy. Coverage is strongest for total-price disclosure, payment-channel fees, overdraft/banking, automotive charges, and medical estimates/billing. Subscription renewal/termination, construction change orders, generic contract clauses, and invoice-specific disclosures remain thin. The taxonomy stays private.

## Next measurement events

- **2026-08-17 UTC:** reverify Batch 1 follow-up eligibility; at most one follow-up per eligible target, no third email, and any human reply cancels it.
- **Around 2026-08-20:** compare a fresh Search Console export against the preserved Phase 4 baseline. Use query + page + date data before making cannibalization claims.
- **After HiddenFeeAI integration:** run the synthetic attribution acceptance test before any paid acquisition.

## Outcome statement

Measured in this cycle: one durable attribution improvement and one 30-day native distribution queue. No real revenue, HiddenFeeAI upload, referral, backlink, AI citation, or post-Phase-4 ranking improvement is claimed yet.
