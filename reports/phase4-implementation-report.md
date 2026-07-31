# DetectHiddenFees.com Phase 4 Implementation Report

**Branch:** `codex/phase4-authority-assets`  
**Status:** Completed locally for review; not deployed; Phase 5 not started.

## Executive summary

Phase 4 established the authority-building operating system and implemented only low-risk public assets. The work does not claim original research findings, product performance, legal conclusions, security behavior, privacy behavior, or partnerships. The selected flagship is the **Hidden Fee Transparency Index**, currently a reviewed project specification only. The public taxonomy was expanded into downloadable JSON/CSV reference data and linked from the existing Hidden Fee Encyclopedia. One date-arithmetic calculator was built without uploads, accounts, AI claims, or legal interpretation. An accessible noindex embed prototype demonstrates attribution and text-equivalent requirements.

## Owner-confirmation gate

Created `phase4-owner-confirmation-questionnaire.md` and `.json`. It covers ownership, commercial benefit, document support, OCR, AI models, analysis, performance, risk scores, savings, privacy, storage, deletion, encryption, third parties, pricing, refunds, reports, and output behavior. Unknown answers remain withheld.

## Research prioritization and flagship

Created `phase4-research-priority-model.json` and `phase4-research-priority-report.md`. The three initial flagship candidates are:

1. Hidden Fee Transparency Index — specification only.
2. Public Hidden-Fee Taxonomy — public reference framework.
3. Public Contract Clause Library — architecture and entry template only.

Created `phase4-flagship-project-specification.md` and `.json`. It defines public-data scope, sampling, a pre-registered 0–2 scoring rubric, two-person review, limitations, legal/privacy gates, outputs, embed requirements, and suggested citation. No findings were created.

## Public taxonomy

Created `hidden-fee-taxonomy-public.json` and `.csv`, and added a visible download/methodology section to `hidden-fee-encyclopedia.html`. Categories distinguish disclosed mandatory, poorly disclosed mandatory, optional, automatically selected, recurring, contract-triggered, and duplicate/unclear charges. The resource expressly avoids declaring fees illegal or deceptive by category.

## Contract-clause library

Created the public architecture, entry template, and machine-readable schema. The initial set is intentionally small: automatic renewal, price escalation, unilateral modification, termination/cancellation, auto-billing authorization, and limitation of liability. No mass clause pages were generated and no copied contract text was published.

## State-law tracker

Created schema, template, source policy, and review checklist. No state pilot entry was published because verified official-source and qualified legal review were not completed. The 50-state rollout remains deferred.

## Tools

Created `phase4-tool-priority-report.md`, `phase4-tool-specifications.json`, and the structural audit in `reports/phase4-tool-audit.*`. The audit covered 49 tool-like canonical pages and treated landing-page signals as unverified. Built one low-risk tool:

- `automatic-renewal-date-calculator.html` — date arithmetic only; no uploads, accounts, AI, legal interpretation, or savings claim.

It was added to the sitemap and llms.txt. Higher-risk scoring, savings, AI, medical, and benchmark tools remain deferred.

## Embeddable asset

Created `embed-policy.md`, `embed-code-template.html`, and `asset-licensing-policy.md`. Added `embed-prototype-hidden-fee-taxonomy.html` as a noindex/nofollow prototype with accessible table markup, visible attribution, canonical source link, version, and text-equivalent content.

## PR, backlink, and partnership systems

Created digital PR playbook/templates/checklist, white-hat backlink strategy, qualification rubric, prospect schema/template/process, outreach templates, resource-page strategy, university strategy, nonprofit strategy, expert-contributor program, and verification checklist. No outreach was sent, no prospect list of private contacts was built, and no link was purchased.

## Research and data standards

Created research-page schema/checklist, dataset publication standard, metadata template, changelog template, content-gap map/report, and Phase 4 measurement framework/KPI schema. These documents prevent fabricated data, undocumented samples, privacy leakage, unsupported expert authority, and unreviewed claims.

## Files changed

The complete file list is represented by the Phase 4 commits. Major groups include owner and research specifications, taxonomy data, state-law safeguards, tool and embed assets, PR/backlink/partnership governance, research/data standards, `automatic-renewal-date-calculator.html`, `hidden-fee-encyclopedia.html`, `sitemap.xml`, `llms.txt`, and validation scripts/reports.

## Validation

- Phase 4 validator: 227 canonical HTML files detected, 226 sitemap URLs, 226 llms.txt URLs, no missing files, no canonical errors, no broken internal links, no HTTP source links.
- New calculator, taxonomy JSON/CSV, and embed prototype present.
- Existing Phase 2 validation retained zero schema, navigation, breadcrumb, and legacy-link issues; its simplistic asset resolver reports two asset-path false positives for JSON/CSV/PDF links, while the Phase 4 validator resolves file assets correctly.
- Pre-existing `indexnow-submit.html` remains a canonical file outside the sitemap and requires deployment review.
- Python cache was removed after validation and remains ignored.

## Remaining risks and approvals

- Owner confirmation is required before product, privacy, security, ownership, pricing, or commercial claims are published.
- Legal review is required before state-law entries or legal conclusions.
- Methodology review is required before the flagship index publishes findings.
- Browser/mobile review and production MIME/header/analytics checks remain conditions before deployment.
- No Phase 5 work, public outreach, or deployment occurred.

## Rollback

Revert the Phase 4 commits on `codex/phase4-authority-assets`, or restore the pre-Phase 4 branch point. The calculator, taxonomy downloads, embed prototype, frameworks, and reports are separable.

## Recommended Phase 5 roadmap

1. Obtain owner confirmations and qualified reviewers.
2. Pilot and review the Hidden Fee Transparency Index methodology.
3. Publish one verified dataset and accessible chart set.
4. Complete the journalist center with confirmed ownership and spokesperson information.
5. Obtain approval for a small, personalized outreach campaign.
6. Measure editorial citations and corrections before expanding assets.
