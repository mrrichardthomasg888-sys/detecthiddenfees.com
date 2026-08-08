# Phase 4 Search Console traffic work — August 8, 2026

## Scope and guardrails

This phase uses the real Search Console export placed on the Desktop. The ZIP contains separate aggregate query and page tables. It does not contain query + page pairs, so no query-to-page relationship, cannibalization finding, or query-level page trend is asserted from it. The export remains outside the repository.

The existing design, URLs, templates, logo, navigation, footer, responsive behavior, and `calculator-authority.css` were preserved. The calculator CSS remains user-owned and unstaged.

## Phase 4 baseline — preserve for future comparison

### Page baselines

| URL | Impressions | Clicks | Average position |
| --- | ---: | ---: | ---: |
| `/mandatory-vs-optional-fees` | 59 | 2 | 7.25 |
| `/ai-bill-analyzer` | 57 | 1 | 6.61 |
| `/hidden-fee-detector` | 38 | 1 | 9.95 |
| `/consumer-fee-trends-report` | 84 | 0 | 17.27 |
| `/how-do-companies-hide-fees-in-contracts` | 50 | 0 | 14.88 |
| `/ai-contract-review` | 44 | 0 | 15.30 |

### Query baselines

| Query | Impressions | Average position |
| --- | ---: | ---: |
| `hidden fees` | 184 | 41.84 |
| `no hidden fees` | 134 | 52.19 |
| `ai construction contract review` | 93 | 23.80 |
| `artificial intelligence contract analysis` | 78 | 60.26 |
| `ai contract analysis` | 41 | 83.32 |

These values are a fixed measurement baseline. They must not be overwritten with later estimates or invented data.

## Pages optimized

- `/mandatory-vs-optional-fees`: retained the strong title, direct answer, FAQ, and regulator sources; added one contextual link to the 2026 Evidence Review with a sample-only caveat.
- `/ai-bill-analyzer`: kept the page-one title and intent; corrected the stale Twitter description so it no longer promises savings or unsupported scanning capabilities.
- `/hidden-fee-detector`: improved the title for contracts, bills, and invoices; added a contextual Evidence Review link while preserving its limitations and verification language.
- `/consumer-fee-trends-report`: changed title, description, badge, breadcrumb, H1, visible status, direct answer, FAQ, and schema language from collecting-only to the published 25-record sample status. It now clearly says the sample does not establish a national trend or prevalence estimate.
- `/how-do-companies-hide-fees-in-contracts`: removed unsupported claims about thousands of contracts, “over 40” techniques, industry rankings, typical dollar amounts, household costs, automatic detection, proprietary databases, guaranteed coverage, and a hard-coded product price. Replaced them with a source-linked, verification-first checklist and the Evidence Review context.
- `/ai-contract-review`: refined title, H1, description, and related links for the distinct AI contract review and analysis intent; added relevant construction-review and Evidence Review links.
- `/ai-construction-contract-review`: retained the intended canonical target and strengthened existing sections for material markups, allowances, administrative/coordination charges, delay charges, payment terms, retainage, and construction-specific limitations.
- `/hidden-fee-encyclopedia`: selected as the canonical informational hidden-fees hub and clarified its hub role, topic navigation, and Evidence Review relationship.

## Before/after metadata record

- `mandatory-vs-optional-fees`: title and description retained; evidence link added.
- `ai-bill-analyzer`: title and description retained; Twitter description changed from an unsupported “AI-powered…Save money on” claim to a verification-first bill-review description.
- `hidden-fee-detector`: title changed from `Hidden Fee Detector: How AI-Assisted Document Review Works | DetectHiddenFees` to `AI Hidden Fee Detector: Review Contracts, Bills & Invoices | DetectHiddenFees`.
- `consumer-fee-trends-report`: title changed from `Consumer Fee Trends Report 2026: Evidence Status | DetectHiddenFees` to `Consumer Fee Trends Report 2026: What Verified Evidence Supports | DetectHiddenFees`; description now identifies the 25-record sample and its limits.
- `how-do-companies-hide-fees-in-contracts`: title retained; description, Open Graph text, FAQ/schema answers, visible answer, CTA wording, and unsupported research/product claims were corrected.
- `ai-contract-review`: title changed from `AI Contract Review: A Verification-First Workflow | DetectHiddenFees` to `AI Contract Review & Analysis: A Verification-First Workflow | DetectHiddenFees`; H1 and description aligned.
- `ai-construction-contract-review`: title, description, H1, and URL retained; body evidence coverage was expanded surgically.

No CTR improvement can be claimed yet. CTR is a future measurement after Google recrawls and a new comparable Search Console period is available.

## Search intent findings

- Page-one opportunities are the clearest near-term CTR targets because Google already gives them positions 6–10. Their content was strengthened without rewriting good evidence.
- The three page-two pages needed clearer evidence and intent alignment, not more generic copy. The contract-fee page also required removal of unsupported claims before further optimization.
- `ai construction contract review` is commercially relevant, but the aggregate export does not identify its ranking page. The site’s intended canonical target is `/ai-construction-contract-review`; this is an architectural decision, not a claimed query/page observation.
- `hidden fees` is the broad topic. `/hidden-fee-encyclopedia` is the canonical informational hub; specialized guides, contracts, bills, invoices, research, and tools should support it without competing for the same broad intent.
- `no hidden fees` is ambiguous and low-ranking. It may represent pricing-transparency, business-selection, or definition intent. Without query/page mapping, it is deliberately deprioritized rather than forced onto a product page.
- AI contract analysis has distinct but related intent. `/ai-contract-review` is the general verification-first review/analysis resource; `/ai-construction-contract-review` is the construction-specific resource; product and document-analysis pages remain separate when their purpose differs.

## Research evidence integrated

The 25-record 2026 Hidden Fee Evidence Review was linked only where it adds source context. Pages explicitly preserve its sample-only status and do not present it as a national prevalence study, market ranking, or trend estimate.

## Internal authority flow

Added or strengthened contextual links toward the page-one/page-two opportunities, the construction-review target, the hidden-fees hub, and the Evidence Review. No sitewide block or exact-match anchor campaign was added.

## Authority opportunities

BuildingAdvisor and CarEdge remain the only retained prepared opportunities. Both have a contextual reason to consider the source-linked Evidence Review; neither has been contacted. Axios and TIME remain declined because the current asset does not establish a strong enough editorial fit. Additional opportunities are deferred until the first outreach asset has demonstrated a credible fit; no generic backlink list is being created.

## Combined Search Console data required

The current ZIP cannot support query-to-page mapping. The next private extract should use the Search Console Search Analytics API with `dimensions: ["query", "page", "date"]`, `type: "web"`, `aggregationType: "auto"`, `dataState: "final"`, and a suitable `rowLimit`. Use the exact verified property (`sc-domain:detecthiddenfees.com` for a Domain property, or the exact URL-prefix property). Keep OAuth/service-account credentials and returned rows outside the repository. See `seo/search-console-phase2.md` for the owner setup and import sequence.

## Validation and deployment record

Local validation passed across the existing structural, indexability, link, discovery, redirect, research, claim, CTA, attribution, calculator, Search Console, outreach, syntax, and diff gates. Commit `a045462ace56994cd74d73414d4350a890e40682` was pushed directly to GitHub `main`; remote `refs/heads/main` matches that commit. Production verification returned HTTP 200 for the root, all eight audited routes, `sitemap.xml`, and `robots.txt`. Fresh desktop checks confirmed the intended titles, canonicals, one H1 per page, no retired claims, and no horizontal overflow. Fresh 390px mobile checks passed for all eight routes with one H1 and no horizontal overflow. The only remaining worktree change is the untouched user-owned `calculator-authority.css`.
