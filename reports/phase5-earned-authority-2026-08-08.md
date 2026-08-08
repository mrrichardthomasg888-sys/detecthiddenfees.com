# Phase 5 - Earned Authority, Discovery & Research Distribution

**Date:** 2026-08-08  
**Status:** Prepared for approval; no outreach sent and no third-party content published.

## Citation resource status

The existing `2026 Hidden Fee Evidence Review` at `/hidden-fee-database` already exposes the core citation information: producer, scope, collection date, verification method, sample size, source links, methodology, JSON, CSV, and limitations. No research conclusion was changed in this phase.

Added a lightweight `/research-media-kit` page using the existing DetectHiddenFees header, navigation, typography, colors, logo treatment, footer, responsive shell, and research linking pattern. It provides:

- a quick citation summary;
- links to the Evidence Review, Research Center, methodology, JSON, CSV, and Editorial Policy;
- suggested reference wording;
- the DetectHiddenFees.com / HiddenFeeAI.com relationship;
- source fact, observation, calculation, interpretation, and limitation rules; and
- the existing `/contact` path without inventing a person, address, phone number, or private email.

## Evidence Review improvements

The Evidence Review page was not rewritten because its visible provenance and limitation sections already satisfy the citation-readiness check. Discovery metadata was updated to point readers to the finished sample-based review rather than an outdated collecting-only status:

- RSS now describes the published 25-record review and links the media kit.
- `llms.txt` now includes the media kit and the 239 canonical URL count.
- `sitemap.xml` now contains the media kit as a canonical indexable URL.
- The report remains explicitly non-representative. Its counts are reviewed-sample counts, not market shares, prevalence estimates, or findings that a fee is unlawful.

## Qualified opportunities

The opportunity queue is `seo/outreach-pipeline.json`. It contains 11 records, including two previously declined targets. There are no imported private contacts and no contacted records.

| ID | Publication / article | Author | Asset | Editorial fit | Confidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| O-2026-001 | BuildingAdvisor - change orders | Not publicly recorded | `/hidden-fee-database` | Construction change orders, scope, price, timing, and source-linked home-improvement guidance | Medium | Approved for review |
| O-2026-002 | CarEdge - understanding car dealer fees | Not publicly recorded | `/hidden-fee-database` | Dealer fees, add-ons, and CFPB automotive fee records | Medium | Approved for review |
| O-2026-005 | Consumer Reports - car-buying fees | Jon Linkov | `/hidden-fee-database` | CFPB records distinguish possible dealer/loan charges and optional add-ons from government-set charges | High | Approved for draft |
| O-2026-006 | Edmunds - what fees should you pay? | Ronald Montoya; Peter Gareffa | `/hidden-fee-database` | Fee checklist, state differences, negotiability, and source-linked CFPB categories | High | Approved for draft |
| O-2026-007 | Procore - request for change orders | Chris Poché | `/hidden-fee-database` | Change-order cost/scope/schedule guidance paired with public home-services evidence | High | Approved for draft |
| O-2026-008 | Kiplinger - annoyance economy | Kim Clark | `/hidden-fee-database` | Junk fees, auto-renewals, subscriptions, and billing red flags across the reviewed source set | Medium | Approved for review |
| O-2026-009 | NerdWallet - average overdraft fee | Chanelle Bessette | `/hidden-fee-database` | Provider fee information complemented by CFPB terminology and account-disclosure records | High | Approved for draft |
| O-2026-010 | American Economic Association - Why Regulate Junk Fees? | Neale Mahoney | `/hidden-fee-database` | Academic junk-fee context and a separate practical source map; not a backlink pitch | Medium | Research only |
| O-2026-011 | Consumer Reports - avoid hidden fees | Lisa L. Gill | `/hidden-fee-database` | Possible source-linked update companion across banking, healthcare, automotive, subscriptions, and home services | Medium | Research only |

The Consumer Reports automotive guide addresses legitimate versus contestable car-buying charges and dealer add-ons: [Consumer Reports car-buying fee guide](https://www.consumerreports.org/money/fees-billing/how-to-avoid-car-buying-fees-a7209896255/). Edmunds covers mandatory fees, document fees, state variation, and negotiability: [Edmunds fee guide](https://www.edmunds.com/car-buying/what-fees-should-you-pay.html). Procore covers the cost, scope, schedule, approval, and documentation implications of change orders: [Procore change-order guide](https://www.procore.com/library/request-for-change-orders). Kiplinger covers junk fees, subscriptions, and recurring charges: [Kiplinger article](https://www.kiplinger.com/investing/economy/how-to-fight-the-annoyance-economy). NerdWallet's overdraft article is a provider-data resource, so the pitch keeps its data distinct from the DetectHiddenFees reviewed sample: [NerdWallet overdraft-fee guide](https://www.nerdwallet.com/banking/learn/average-overdraft-fee). The academic context is [Mahoney, Why Regulate Junk Fees?](https://www.aeaweb.org/articles?id=10.1257%2Fjep.20241409).

BuildingAdvisor and CarEdge remain plausible but medium-confidence because the public article fit is clear while no public author or contact method was confirmed and the current dataset is not a construction or automotive prevalence study. Axios and TIME remain declined because the current evidence does not add a sufficiently specific original source set for their identified articles.

## High-confidence targets and outreach drafts

High-confidence draft targets are Consumer Reports automotive, Edmunds, Procore, and NerdWallet. Drafts are in `seo/outreach-drafts.md` and the earlier BuildingAdvisor and CarEdge drafts are preserved for approval. Every draft:

- names the recipient's existing subject;
- describes only supported evidence;
- links the public report/media kit;
- states that the review is not representative where relevant; and
- makes no request for a backlink.

No message has been sent. No contact information was invented.

## Distribution assets ready

`seo/content-repurposing.json` now contains seven draft-only, fact-checked-source concepts for:

- a LinkedIn methodology observation;
- a consumer automotive YouTube explainer;
- a medical-bill YouTube Short based on CMS guidance;
- a Reddit discussion about disclosed account-fee exceptions;
- GitHub dataset documentation;
- an infographic concept with claim labels; and
- a journalist pitch concept.

Each record names its source asset, version, audience, angle, claims used, primary sources, canonical link, and review status. The queue is `review`; no item is approved or published.

## Earned-mention log

`seo/earned-mention-log.json` records the nine prepared targets with null values for sent date, response, mention, backlink, link URL, and referral traffic. Null means no event has been recorded; it is not a performance estimate.

## Discovery status

Local discovery validation passed:

- Sitemap: 239 canonical production URLs, including `/research-media-kit`.
- `llms.txt`: 239 canonical URLs and media-kit discovery entry.
- RSS: 181 public items, including the Evidence Review and media kit.
- Canonical and robots/discovery checks: passed.
- JSON/CSV research downloads: already public and linked from HTML.

The Evidence Review remains discoverable through the Research Center, methodology, media kit, sitemap, RSS, `llms.txt`, and contextual HTML links. No indexing endpoint was spammed and no repeated Google request was made.

## AI citation readiness

The research surface is ready for cautious extraction because it distinguishes:

- **Source fact:** what the linked government or institutional source states;
- **DetectHiddenFees observation:** what appears in the reviewed sample;
- **Calculation:** an operation on published records;
- **Interpretation:** bounded explanation; and
- **Limitation:** what the source or sample cannot establish.

Primary-source examples include FTC fee-disclosure guidance, CFPB automotive and banking guidance, CMS medical-bill review guidance, and FTC subscription-renewal guidance. These are used as underlying sources, not as claimed endorsements or outreach targets. For example, CMS tells consumers to request a detailed bill, compare it with the explanation of benefits, and check for duplicate services: [CMS bill-error guide](https://www.cms.gov/medical-bill-rights/help/guides/bill-errors). The FTC explains covered upfront-fee disclosure and subscription/renewal consumer issues in its public guidance: [FTC fee guidance](https://consumer.ftc.gov/consumer-alerts/2025/05/what-rule-unfair-or-deceptive-fees-means-you) and [FTC auto-renewal guide](https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions).

## Phase 4 pages confirmed frozen

The following pages were not changed in Phase 5 and remain the SEO experiment:

`/mandatory-vs-optional-fees`, `/ai-bill-analyzer`, `/hidden-fee-detector`, `/consumer-fee-trends-report`, `/how-do-companies-hide-fees-in-contracts`, `/ai-contract-review`, `/ai-construction-contract-review`, and `/hidden-fee-encyclopedia`.

The only pre-existing unrelated worktree change remains the user-owned, untouched `calculator-authority.css` modification.

## Next Search Console measurement

Phase 4 deployment date: **2026-08-08**. The baseline is preserved in `reports/phase4-search-console-traffic-2026-08-08.md` and must be compared against a later comparable period for impressions, clicks, CTR, and average position. No Phase 5 success claim is made from one day's movement.

The next useful export must contain `query`, `page`, and `date` together. The repository's private Search Analytics API instructions remain in `seo/search-console-phase2.md`; query/page relationships must not be reconstructed from separate aggregate tables.

## Actions requiring owner approval

1. Approve or reject individual outreach drafts; nothing is sent automatically.
2. Approve any future third-party publication or social posting; nothing is published automatically.
3. Provide a later combined Search Console query/page/date export or securely authorize the documented API path.
4. Decide whether a public GitHub dataset repository should be created; the current repository only prepares documentation and does not publish externally.

