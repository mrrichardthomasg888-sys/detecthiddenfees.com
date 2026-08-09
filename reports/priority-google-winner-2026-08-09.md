# Priority Google winner baseline - 2026-08-09

## Source and scope

Source: owner-provided `detecthiddenfees.com-Performance-on-Search-2026-08-09-2.zip` (Google Search Console, Web search type, last 24 hours). The export contains separate aggregate `Queries.csv` and `Pages.csv` tables plus aggregate device, country, and hourly chart tables. It does not contain query + page + date rows or query/page/device rows.

## Winning query baseline

| Query | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| `what questions to ask before signing contract` | 2 | 7 | 28.57% | 8.86 |

The strongest matching page row is:

`https://detecthiddenfees.com/what-questions-should-i-ask-before-signing-a-contract`

It also reports 2 clicks, 7 impressions, 28.57% CTR, and average position 8.86. Because the export is aggregate-only, this is the evidence-based winning page candidate for this test, not a direct row-level query-to-page join. Future measurement should use Search Console API dimensions `query`, `page`, and `date` together to prove ownership.

## Related query evidence

The query table contains these closely related contract-analysis signals, but cannot assign them to the winning URL:

- `ai construction contract review` — 5 impressions, position 16.80.
- `construction contract review` — 2 impressions, position 36.50.
- `what to know about hidden fees` — 1 impression, position 44.
- `contract analysis ai` — 4 impressions, position 84.50.

The exact query-family terms requested by the owner were not all present in this export. They remain a content-cluster audit list, not measured Search Console results.

## Device evidence

Device data is aggregate across all queries and pages: Desktop 2 clicks / 106 impressions / 1.89% CTR / position 41.46; Mobile 0 clicks / 38 impressions / 0% CTR / position 21.16. No device-specific result can be assigned to the winning query/page.

## Pre-change page audit

- Canonical URL is stable and matches the target URL.
- Existing title: `Questions to Ask Before Signing a Contract | DetectHiddenFees`.
- Existing H1: `What Questions Should I Ask Before Signing A Contract?`.
- Existing direct-answer section, pricing/fees questions, renewal/cancellation questions, change-term questions, checklist, FAQ, and HiddenFeeAI CTA are retained.
- Existing FAQPage markup is present alongside visible FAQ content.
- The direct answer used an unsupported savings-style phrase (`save you thousands of dollars`); this test replaces it with a neutral, evidence-safe answer.

## Measurement checkpoints

Compare the same query and winning URL at approximately:

- 24 hours: 2026-08-10
- 3 days: 2026-08-12
- 7 days: 2026-08-16
- 14 days: 2026-08-23
- 28 days: 2026-09-06

Do not declare success from this 7-impression baseline alone.
