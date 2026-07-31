# DetectHiddenFees.com Phase 3 Implementation Report

**Date:** July 31, 2026  
**Branch:** `codex/phase3-evidence-authority`  
**Status:** Completed locally for review; not deployed; Phase 4 not started.

## 1. Executive summary

Phase 3 converted the prior audit into an evidence and governance foundation. All 225 canonical pages were machine-audited for material claims. The audit identified 4,390 claim instances: 103 Critical, 1,880 High, 1,630 Medium, and 777 Low. Product/AI claims numbered 1,183. The repository did not contain a verifiable HiddenFeeAI runtime or authoritative product-policy source sufficient to validate accuracy, model, security, privacy, retention, deletion, or capability claims. Those items remain owner-confirmation requirements.

The implementation added source, authorship, review, date, research, taxonomy, dataset, and outreach-readiness standards. Tier 1 source sections were added to the AI limitations/methodology, editorial policy, overdraft-fee, healthcare-fee, and research-methodology pages. Unsupported AI benchmark and product-handling language was narrowed where exact text was verifiable. No pages were deleted, merged, redirected, canonicalized, noindexed, or deployed.

## 2. Working-tree cleanup and restore point

- Removed the untracked `scripts/__pycache__/` directory.
- Added `__pycache__/` and `*.py[cod]` to `.gitignore`.
- Confirmed no Python cache files are tracked or pending.
- Created restore branch `codex/phase3-evidence-authority` before implementation.
- Remaining changes are intentional Phase 3 audit, governance, source, CSS, and targeted HTML changes.

## 3. Claim and evidence audit

Files: `phase3-claim-inventory.json`, `phase3-claim-inventory.csv`, and `phase3-claim-risk-report.md`.

The inventory records URL, exact wording, claim categories, claim type, visible sources, support status, source quality, date/scope, time sensitivity, review need, risk, and recommended action. Categories include financial outcomes, pricing, legal/regulatory, product capability, market/prevalence, AI performance, security/privacy, and absolute/superlative language.

High-risk examples include unsupported accuracy percentages, broad prevalence and savings claims, and unverified encryption, deletion, training-use, retention, and third-party-processing statements. Original wording is preserved in the inventory; no high-risk claim was silently removed.

## 4. Product-claim audit

Files: `phase3-product-claim-audit.json` and `phase3-product-claim-report.md`.

The audit classifies claims as requiring owner confirmation or not verified in the repository when runtime or first-party policy evidence is absent. Confirmation is required for file types, limits, OCR, extraction, speed, model/provider, accuracy, false positives/negatives, scoring, storage, deletion, encryption, human access, processors, privacy, pricing, refunds, report features, negotiation scripts, and savings calculations.

## 5. Policies and governance created

- `editorial-source-policy.md`
- `editorial-authorship-policy.md`
- `editorial-review-policy.md`
- `phase3-review-requirements.json`
- `content-date-governance.md`
- `research-methodology-framework.md`
- `dataset-statistics-standards.md`
- `outreach-readiness-checklist.md`

These documents define acceptable source hierarchy, citation requirements, author and reviewer verification, specialist review triggers, correction handling, date rules, research controls, dataset publication requirements, and the boundary between planning and publishable evidence.

## 6. Tier 1 pages improved

Targeted changes were made to:

- `ai-accuracy-and-limitations.html` — removed the verified-looking accuracy percentage and narrowed dataset language; added an NIST risk reference and limitations/source section.
- `ai-analysis-methodology.html` — narrowed unverified training, accuracy, security, retention, and “all types” language; added an NIST methodology/risk reference.
- `editorial-policy.html` — added a visible source/claim standard using FTC advertising-substantiation guidance and a practical corrections/transparency section.
- `hidden-bank-overdraft-fees.html` — added CFPB sources and a U.S. scope/qualification note.
- `hidden-healthcare-fees.html` — added CMS Medical Bill Rights and No Surprises sources with scope limitations.
- `research-methodology.html` — added a methodology framework and NIST risk-management reference.
- `phase1-foundation.css` — added reusable responsive styling for source sections and future disclosures.

No author or reviewer profile was created because no verified individual credentials were available in the repository. Existing organizational authorship remains subject to the new policy.

## 7. Taxonomy and research planning

Created:

- `hidden-fee-taxonomy.json` and `hidden-fee-taxonomy.md`
- `contract-clause-taxonomy.json` and `contract-clause-taxonomy.md`
- `original-research-roadmap.json` and `original-research-roadmap.md`

These are frameworks only. They contain no fabricated prevalence, savings, benchmark, or study results.

## 8. External-link audit

Files: `phase3-external-link-audit.json` and `phase3-external-link-report.md`.

The structural audit found 1,306 external references, 14 unique URLs, and 11 domains across canonical pages. It flags HTTP and tracking/affiliate candidates and documents the need for periodic status, redirect, destination, and claim-support checks. The audit does not treat a live link as proof that a source supports a claim.

## 9. Ownership and commercial disclosure

The relationship between DetectHiddenFees.com and HiddenFeeAI.com is visibly central to the site, but the repository did not provide a sufficiently authoritative ownership, financial-benefit, affiliate, or product-policy statement to publish new definitive disclosure language safely. A concise page-level disclosure is withheld pending owner confirmation of ownership, financial benefit, product placement, and external affiliate relationships.

## 10. Validation

The Phase 2/3 validation run reported:

- Canonical sitemap pages: **225**
- Missing canonical files: **0**
- Bad canonicals: **0**
- Broken internal links: **0**
- Legacy `.html` internal links: **0**
- Navigation issues: **0**
- Breadcrumb issues: **0**
- Schema issues: **0**
- Sitemap URLs: **225**
- llms.txt URLs: **225**
- RSS links: **163**
- Pre-existing HTML parser warnings: **225**; no new parser-error class was introduced by the Phase 3 edits.

The claim audit was regenerated after implementation. The added JSON frameworks parse successfully, and the external-link inventory was regenerated. Browser/mobile visual validation should be run in the existing Phase 2 browser workflow before any deployment; no deployment was performed.

## 11. Changes withheld for owner approval

- Any product accuracy, benchmark, model, file-support, speed, or scoring claim.
- Any security, encryption, retention, deletion, training-use, human-access, processor, privacy, or compliance claim.
- Any legal conclusion, jurisdiction-specific right, or professional credential.
- Any expert-review badge or Person schema.
- Any original research result, dataset, statistics page, or public benchmark.
- Definitive ownership, affiliate, or financial-benefit disclosure wording.
- Broad removal or rewrite of the remaining high-risk claim inventory.

## 12. Remaining risks

The claim inventory is a triage system, not a substitute for page-by-page legal, financial, privacy, security, product, or source review. Many existing claims remain flagged because evidence is absent or scope is broad. The 225 pre-existing parser warnings remain. External source availability and support should be checked before publication of any new evidence-heavy claim.

## 13. Rollback

Review the Phase 3 commits and revert only the approved Phase 3 commit groups, or restore the pre-Phase 3 state from the `codex/phase3-evidence-authority` branch point. Do not use destructive resets against unrelated work. The targeted HTML changes are limited to the files listed above; generated reports and governance files can be removed or retained independently.

## 14. Recommended Phase 4 roadmap

1. Obtain owner-confirmed HiddenFeeAI product, privacy, security, retention, and capability evidence.
2. Assign qualified reviewers for legal, finance, privacy/security, AI testing, and methodology topics.
3. Resolve Tier 1 Critical and High claims page by page with direct sources or narrower language.
4. Publish one real, permissioned research asset with a reproducible methodology and lawful data.
5. Build accessible charts, downloadable data where permitted, and a suggested citation.
6. Prepare digital-PR materials only after the evidence asset passes review.

Phase 4 itself was not started.
