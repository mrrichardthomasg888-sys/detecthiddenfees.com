# Phase 3 research review — 2026-08-08

## Publication decision

The first public asset is a **2026 Hidden Fee Evidence Review**, not a market-wide Hidden Fee Index. The available evidence is a curated review of 25 authoritative public-source records. It supports source-level definitions, examples, document-review questions, and disclosure context. It does not support prevalence, average-fee, market-share, or consumer-harm estimates.

## Evidence accounting

- **Fact:** 25 records passed direct-source review on August 8, 2026.
- **Fact:** The records link to live public FTC, CFPB, CMS, and related government pages and preserve source titles, publishers, URLs, dates where available, evidence references, and limitations.
- **Calculation:** The reviewed sample contains 25 verified records and 25 distinct fee/clause categories in the current release.
- **Observation:** The sample spans fee disclosure, banking and payment fees, medical billing and financing, automotive add-ons and transaction fees, subscriptions, home-improvement guidance, and consumer billing disputes.
- **Interpretation:** The source set is useful for explaining what a reader can look for in a bill, estimate, contract, financing packet, or subscription disclosure. It is not a representative sample of companies, contracts, bills, or charges.
- **Limitation:** Some government pages provide general consumer guidance rather than a specific fee schedule or enforcement finding. A record therefore does not, by itself, establish that a fee is unlawful, deceptive, common, negotiable, or refundable in every situation.

## Public outputs

- `/hidden-fee-database` — crawlable evidence summary, representative primary-source links, methodology links, and downloads.
- `/research-data.json` — machine-readable public records and sample-only statistics.
- `/research-data.csv` — flat-file version of the same public records.
- `/research-methodology` — collection, verification, analysis, correction, and limitations rules.
- `/hidden-fee-statistics` — sample-only statistics explanation; no market-wide percentages.

## Source groups reviewed

The initial five records were individually verified against FTC fee-disclosure guidance, CFPB junk-fee guidance, CMS medical-bill error guidance, CFPB F&I guidance, and CFPB auto-fee negotiation guidance. Twenty additional records extend the source set across banking, recurring payments, subscriptions, home improvement, automotive add-ons/enforcement, credit-card billing, medical billing, medical financing, and unwanted-product billing. The complete provenance is in `seo/research-collection.json`; the public release omits internal verification workflow fields.

## Search Console status

No real Search Console export or API connection is present in this repository. No query, click, impression, CTR, or position numbers are reported. The existing import template and validators remain the safe path until the user supplies a Search Console CSV export or authorizes a secure API connection.

## Authority opportunity decision

- **BuildingAdvisor:** retain as a medium-confidence, not-yet-contacted opportunity. The current evidence review includes one authoritative home-improvement source, but the pitch must offer source context rather than claim a construction prevalence study.
- **CarEdge:** retain as a medium-confidence, not-yet-contacted opportunity. The current review contains multiple CFPB/FTC automotive records about add-ons, F&I, and transaction fees that can complement dealer-fee education.
- **Axios:** decline for now. The present review does not contain independent automotive-subscription pricing evidence sufficient to add value to the cited article.
- **TIME:** decline for now. The present sample does not add a sufficiently specific, original dataset for the cited above-MSRP article.

No outreach has been sent. Drafts are stored separately and require explicit approval.
