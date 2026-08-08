# DetectHiddenFees Research Lab Architecture

**Status:** Infrastructure design; no research findings are published by this document.

## Canonical URL policy

The current site uses flat extensionless URLs. Preserve the existing stable public resources while the lab is being built:

- `/research-center` — Research Lab landing page
- `/research-methodology` — methods and limitations
- `/hidden-fee-index` — planned 2026 index landing page; findings remain unpublished until evidence gates pass
- `/hidden-fee-statistics` — candidate statistics resource; publish only when a real dataset supports it
- `/hidden-fee-database` — candidate terminology/database resource; publish only with lawful, reviewable records

Do not create `/research/` directory routes or redirect existing pages until a complete page set, navigation model, canonical policy, and production QA pass exist. A future nested architecture may map to `/research/`, `/research/hidden-fee-index/`, `/research/methodology/`, and `/research/datasets/`, but it is not required for the first infrastructure batch.

## Hidden Fee Index 2026 state machine

1. `proposed` — question, scope, owner, and conflict disclosure drafted.
2. `collecting` — public-source records collected under documented terms.
3. `verifying` — records checked against the source and taxonomy.
4. `analyzing` — versioned analysis run; missingness and uncertainty recorded.
5. `review` — methodology, privacy, legal, and editorial review complete.
6. `published` — findings, limitations, source list, dataset metadata, and citation are public.
7. `corrected` — a correction record links the prior version to the corrected version.

The initial status must be `collecting` or `proposed`, not `published`, unless the underlying records and analysis are present in the repository or an approved connected data store.

## Research record fields

Each record should support:

| Field | Requirement |
|---|---|
| `record_id` | Stable non-sensitive identifier |
| `source` / `source_url` | Public source and direct URL |
| `organization` | Publisher or entity named in the source |
| `document_type` | Contract, invoice, estimate, bill, statement, policy, or other defined type |
| `industry` | Controlled vocabulary value |
| `collection_date` | ISO date |
| `fee_terminology` | Exact source wording; short excerpt only when lawful |
| `fee_category` | Controlled taxonomy value |
| `fee_amount` / `currency` | Null when not stated; do not infer |
| `recurring` | `true`, `false`, or `unknown` |
| `contract_clause` | Clause label or null |
| `cancellation_requirements` | Source-supported terms or null |
| `renewal_terms` | Source-supported terms or null |
| `notes` | Neutral analyst note |
| `evidence_reference` | Page/section/line locator or source excerpt reference |
| `verification_status` | `unverified`, `verified`, `disputed`, or `excluded` |

## Publication gates

- No customer document enters a public dataset without documented consent, lawful handling, de-identification, access control, and owner approval.
- No percentage, count, average, ranking, precision, recall, OCR, or accuracy result is published without reproducible source records and a versioned analysis.
- Methodology states population, eligibility, exclusions, jurisdiction, period, sampling, taxonomy, missing values, uncertainty, limitations, conflicts, and correction path.
- A public dataset includes metadata, field definitions, license, privacy review, changelog, citation, and correction contact.
- A chart includes an accessible text summary and labels that can be reproduced from the released data.

## Machine-readable deliverables

When gates pass, publish a versioned CSV and JSON distribution with stable URLs. Until then, keep templates and empty schemas in the repository; do not publish empty files as if they contain findings.
