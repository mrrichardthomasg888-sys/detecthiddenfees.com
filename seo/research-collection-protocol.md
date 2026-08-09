# Verified research collection protocol

## Scope

Collect only legitimate public source material about fees, clauses, charges, renewals, cancellations, invoices, contracts, and document review. Prefer government, regulator, statutory, official company, public pricing, academic, and institutional sources. Do not collect customer documents or private data.

## Review states

`pending` means the URL and a provisional evidence note are in the private queue but a reviewer has not completed source verification.

`verified` requires a reviewer, review date, evidence reference, and confirmation that the evidence says what the record claims. It does not automatically justify a market-wide statistic.

`rejected` means the source is inaccessible, non-authoritative for the proposed use, duplicated, unsupported, or otherwise unsuitable.

The public `research-data.json` remains collecting-only, with zero records and null statistics, until a separate publication review approves a defined sample, methodology, limitations, and reproducible evidence.

## Required record fields

Every record in `seo/research-collection.json` retains source, source URL, source type, organization, industry, document type, collection date, source date when available, fee terminology/category, amount only when explicit, recurring status only when explicit, evidence, evidence reference, verification status, and notes.

## Deduplication and safety

Use `scripts/import-research-records.js` to append records to a private collection. It deduplicates normalized source URL + fee category + evidence, refuses to append to a published collection, and reports skipped duplicates. Run `scripts/validate-research-collection.js` after each import. Verified records cannot pass without reviewer metadata. Sensitive-document markers are rejected by the validator.

## Current candidate sources

The private collection currently contains 25 verified records that support the separately published Evidence Review. Collection remains open, but new sources are not public findings until they pass the review gate. Phase 7 added five additional FTC, CFPB, and CMS source candidates as `pending`; they are source candidates, not findings or statistics. No new candidate has been promoted to the public dataset.

## Publication gate

Before promoting any record to the public manifest, document the sample definition, collection period, inclusion/exclusion rules, source access date, extraction method, evidence references, limitations, and a human review. Publish only claims that can be reproduced from the retained evidence. Never infer prevalence, percentages, precision, recall, OCR performance, or market-wide conclusions from this queue alone.
