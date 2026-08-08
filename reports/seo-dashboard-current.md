# DetectHiddenFees SEO Dashboard — Current Status

> Generated: 2026-08-08
>
> This is a public-safe status report generated from repository metadata. It is not an authenticated admin dashboard and contains no Search Console query data, customer data, document contents, conversion records, or revenue figures.

## Connection status

| Area | Status | Source or required connection |
|---|---|---|
| Search performance | **DATA SOURCE NOT CONNECTED** | Google Search Console API or reviewed private export |
| Index coverage | **DATA SOURCE NOT CONNECTED** | Google Search Console URL Inspection/coverage export |
| CTA analytics | **DATA SOURCE NOT CONNECTED** | Analytics property receiving the documented CTA events |
| HiddenFeeAI referrals | **INTEGRATION REQUIRED** | HiddenFeeAI handoff and referral-received event |
| Uploads and analyses | **INTEGRATION REQUIRED** | HiddenFeeAI server-side lifecycle events |
| Checkout and revenue | **INTEGRATION REQUIRED** | Product/processor events with privacy-safe attribution |
| Backlinks and mentions | **NOT POPULATED** | Reviewed outreach/link dataset |

Null is not zero. No unavailable metric is represented as a performance value.

## Verified structural indicators

| Indicator | Current value | Evidence |
|---|---:|---|
| Canonical sitemap pages | 238 | `sitemap.xml` |
| Indexable self-canonical HTML parity | 238 / 238 | Discovery validator |
| Pages with a main HiddenFeeAI link | 223 | CTA path audit |
| Pages with an internal funnel path | 8 | CTA path audit |
| Main-content HiddenFeeAI links | 752 | CTA path audit |
| Annotated main-content CTA links | 117 | CTA path audit |
| Research records published | 0 | `research-data.json` |
| Research manifest status | collecting | `research-data.json` |
| Evidence-register records | 0 | `seo/evidence-register.json` |
| Evidence-register status | collecting | `seo/evidence-register.json` |
| Claim-review candidates | 4232 | Unsupported-claim inventory; review candidates, not findings |

## Research and evidence status

- Hidden Fee Index status: **collecting**.
- Published records: **0**.
- Published statistics: **none** until the source, scope, evidence reference, and verification status pass the publication gate.
- Customer documents and confidential text are excluded from the public research manifest.

## Required connections before performance reporting

1. Connect a reviewed Google Search Console export or API with a reporting period and source timestamp.
2. Connect the analytics property that receives `dhf_cta_click` and `dhf_funnel_path_click` without document data.
3. Implement the HiddenFeeAI referral, upload, analysis, checkout, purchase, and revenue event contract.
4. Keep connected exports outside the public repository unless privacy review explicitly approves a redacted artifact.

## Source contracts

- [Dashboard data contract](../seo/dashboard-data-contract.md)
- [Attribution contract](../seo/attribution-contract.md)
- [Current CTA path audit](./cta-path-audit-2026-08-08.md)
- [Search Console template](../seo/search-console-data.template.json)

Generated from local canonical/discovery and audit artifacts on 2026-08-08.
