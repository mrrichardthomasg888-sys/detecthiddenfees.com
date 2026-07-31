# Phase 2 Internal-Link Report

This report compares the read-only Phase 2 baseline with the local Phase 2 navigation, footer-deduplication, breadcrumb, and targeted contextual-link changes. It does not represent deployed production behavior.

## Graph summary

| Metric | Before | After | Change |
|---|---:|---:|---:|
| Canonical nodes | 225 | 225 | +0 |
| Distinct directed edges | 7689 | 8743 | +1054 |
| Link occurrences | 10072 | 10373 | +301 |
| Orphan pages | 11 | 0 | -11 |
| Pages with exactly one inbound link | 61 | 66 | +5 |
| Excessive sitewide targets flagged | 24 | 28 | +4 |

The raw link-occurrence total is not expected to fall because the approved global navigation adds consistent access to six topical destinations and the product CTA. Footer deduplication removed 1,473 duplicate same-destination anchors within individual footers; the remaining sitewide repetition is documented for later template-level review.

## Orphan-page results

Pages no longer orphaned after targeted contextual links:
- `/ai-testing-results`
- `/before-signing-a-contract`
- `/contract-review-ai-software`
- `/hidden-auto-fees`
- `/hidden-insurance-fees`
- `/hidden-telecom-fees`
- `/hidden-utility-fees`
- `/resource-library`
- `/sample-analysis-report`
- `/scan-my-invoice`
- `/what-should-i-check-before-signing-a-contract`

Remaining orphan pages:
- None

## Targeted contextual links added

The following six parent pages received 15 contextual links. The links were limited to semantically related child pages that were orphaned or had only one inbound link in the baseline.

- `/ai-contract-review` → `/before-signing-a-contract`, `/what-should-i-check-before-signing-a-contract`, `/ai-contract-review-before-signing`
- `/ai-contract-review-software` → `/contract-review-ai-software`
- `/hidden-fee-industry-guide` → `/hidden-auto-fees`, `/hidden-insurance-fees`, `/hidden-telecom-fees`, `/hidden-utility-fees`
- `/research-center` → `/ai-testing-results`, `/sample-analysis-report`
- `/ai-invoice-analyzer` → `/scan-my-invoice`, `/ai-invoice-checker`, `/analyze-my-invoice`
- `/ai-bill-analyzer` → `/ai-bill-analysis-vs-manual-review`, `/ai-bill-analyzer-vs-chatgpt`

## Pages still underlinked

These pages have exactly one inbound link in the after graph. They should be reviewed in the next approved linking pass, prioritizing distinct search intent and user value rather than raw link counts.
- `/ai-bill-negotiation`
- `/ai-consulting-agreement-review`
- `/ai-contract-review-vs-chatgpt`
- `/ai-contractor-agreement-review`
- `/ai-document-reviewer`
- `/ai-document-risk-analysis`
- `/ai-estimate-checker`
- `/ai-fee-detector`
- `/ai-pricing-analysis`
- `/ai-proposal-review`
- `/ai-purchase-contract-review`
- `/ai-quote-analyzer`
- `/ai-software-license-review`
- `/ai-testing-results`
- `/analyze-contract-online`
- `/analyze-my-estimate`
- `/before-signing-a-contract`
- `/best-ai-bill-analyzer-tools`
- `/best-ai-contract-analysis-tools`
- `/best-hidden-fee-detector-tools`
- `/can-ai-analyze-financial-documents`
- `/cancellation-fee-clauses`
- `/contract-clause-checker`
- `/contract-fee-checker`
- `/contract-negotiation-assistant`
- `/contract-review-ai-software`
- `/contract-terms-analyzer-ai`
- `/detect-hidden-contract-fees`
- `/example-auto-financing`
- `/example-cell-phone-bill`
- `/example-home-renovation-proposal`
- `/example-hvac-estimate`
- `/example-internet-service-agreement`
- `/example-medical-bill`
- `/find-hidden-fees-in-contract`
- `/free-ai-contract-review-vs-paid-review`
- `/free-hidden-fee-scanner`
- `/free-vs-paid-contract-review`
- `/hidden-auto-fees`
- `/hidden-fee-analysis-tool`
- `/hidden-fee-intelligence-engine`
- `/hidden-insurance-fees`
- `/hidden-telecom-fees`
- `/hidden-utility-fees`
- `/hiddenfeeai-vs-bill-negotiation-services`
- `/hiddenfeeai-vs-lawyer-review`
- `/hiddenfeeai-vs-traditional-negotiation`
- `/how-ai-detects-fees`
- `/how-can-i-check-if-a-bill-is-incorrect`
- `/how-to-read-an-invoice`
- `/identify-contract-risks`
- `/indemnification-clauses-explained`
- `/invoice-red-flags`
- `/medical-debt-relief-options`
- `/negotiate-hospital-bill`
- `/our-evaluation-process`
- `/reduce-monthly-bills`
- `/review-contract-online`
- `/sample-analysis-report`
- `/scan-my-invoice`
- `/service-agreement-red-flags`
- `/upload-bill-for-analysis`
- `/upload-contract-for-review`
- `/what-are-common-hidden-fees-in-service-agreements`
- `/what-questions-should-i-ask-before-signing-a-contract`
- `/what-should-i-check-before-signing-a-contract`

## Most-linked destinations after implementation

- `/ai-contract-review` — 533 link occurrences
- `/` — 436 link occurrences
- `/ai-document-intelligence-center` — 419 link occurrences
- `/hidden-fee-encyclopedia` — 279 link occurrences
- `/ai-bill-analyzer` — 261 link occurrences
- `/hidden-fee-detector` — 246 link occurrences
- `/research-center` — 242 link occurrences
- `/consumer-negotiation-resource-center` — 240 link occurrences
- `/ai-analysis-methodology` — 230 link occurrences
- `/about-detect-hidden-fees` — 225 link occurrences
- `/resource-library` — 224 link occurrences
- `/ai-financial-advisor` — 218 link occurrences
- `/privacy-and-ai-security` — 215 link occurrences
- `/bill-negotiation-service` — 214 link occurrences
- `/contact` — 214 link occurrences
- `/editorial-policy` — 197 link occurrences
- `/terms-of-service` — 196 link occurrences
- `/hidden-fees-guides` — 191 link occurrences
- `/data-handling-policy` — 185 link occurrences
- `/ai-document-checker` — 184 link occurrences
- `/ai-agreement-analyzer` — 181 link occurrences
- `/contract-terms-glossary` — 176 link occurrences
- `/hidden-fee-examples` — 174 link occurrences
- `/ai-document-scanner` — 171 link occurrences
- `/analyze-my-document` — 166 link occurrences
- `/contract-red-flags` — 166 link occurrences
- `/before-signing-contract-checklist` — 162 link occurrences
- `/hidden-fee-prevention-guide` — 158 link occurrences
- `/contract-risk-assessment-ai-tool` — 153 link occurrences
- `/hidden-fee-industry-guide` — 153 link occurrences

## Sitewide repetition observations

The largest after-graph destinations are the primary contract, document, hidden-fee, research, and negotiation pillars, plus legal/trust destinations and the product analysis CTA. This is expected for global navigation, footer access, and trust links. No footer links were removed solely because they had a high aggregate count; the implemented reduction removed only duplicate same-destination anchors within the same footer.

## Measurement limitations

- The graph counts HTML anchor occurrences, not weighted PageRank.
- It does not distinguish all reusable components perfectly across legacy templates.
- The baseline and after graph include local HTML only; they do not include JavaScript-generated links or external discovery.
- One-inbound status is a triage signal, not a recommendation to add links to every page.
