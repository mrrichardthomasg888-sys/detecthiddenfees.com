# Phase 2 Internal-Link Report

This report compares the read-only Phase 2 baseline with the local Phase 2 navigation, footer-deduplication, breadcrumb, and targeted contextual-link changes. It does not represent deployed production behavior.

## Graph summary

| Metric | Before | After | Change |
|---|---:|---:|---:|
| Canonical nodes | 225 | 238 | +13 |
| Distinct directed edges | 7689 | 9160 | +1471 |
| Link occurrences | 10072 | 10813 | +741 |
| Orphan pages | 11 | 3 | -8 |
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
- `/ai-consulting-agreement-review`
- `/automatic-renewal-date-calculator`
- `/free-hidden-fee-scanner`

## Targeted contextual links added

The following 8 parent pages received 19 contextual links. The links were limited to semantically related child pages that were orphaned or had only one inbound link in the baseline.

- `/ai-contract-review` → `/before-signing-a-contract`, `/what-should-i-check-before-signing-a-contract`, `/ai-contract-review-before-signing`
- `/ai-contract-review-software` → `/contract-review-ai-software`
- `/hidden-fee-industry-guide` → `/hidden-auto-fees`, `/hidden-insurance-fees`, `/hidden-telecom-fees`, `/hidden-utility-fees`
- `/research-center` → `/ai-testing-results`, `/sample-analysis-report`
- `/ai-invoice-analyzer` → `/scan-my-invoice`, `/ai-invoice-checker`, `/analyze-my-invoice`
- `/ai-bill-analyzer` → `/ai-bill-analysis-vs-manual-review`, `/ai-bill-analyzer-vs-chatgpt`
- `/hidden-fee-industry-guide` → `/hidden-auto-fees`, `/hidden-insurance-fees`, `/hidden-utility-fees`
- `/ai-contract-review` → `/find-hidden-fees-in-contract`

## Pages still underlinked

These pages have exactly one inbound link in the after graph. They should be reviewed in the next approved linking pass, prioritizing distinct search intent and user value rather than raw link counts.
- `/ai-bill-analysis-vs-manual-review`
- `/ai-bill-analyzer-vs-chatgpt`
- `/ai-bill-negotiation`
- `/ai-contract-review-before-signing`
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
- `/analyze-contract-online`
- `/analyze-my-contract`
- `/analyze-my-estimate`
- `/best-ai-bill-analyzer-tools`
- `/best-ai-contract-analysis-tools`
- `/best-hidden-fee-detector-tools`
- `/business-contract-review`
- `/can-ai-analyze-financial-documents`
- `/check-my-fees`
- `/consumer-savings-calculator`
- `/contract-fee-checker`
- `/contract-negotiation-assistant`
- `/contract-risk-calculator`
- `/contract-terms-analyzer-ai`
- `/detect-hidden-contract-fees`
- `/example-cell-phone-bill`
- `/example-internet-service-agreement`
- `/example-medical-bill`
- `/find-hidden-fees-in-contract`
- `/hidden-auto-fees`
- `/hidden-fee-analysis-tool`
- `/hidden-fee-reports`
- `/hidden-fee-scanner`
- `/hidden-insurance-fees`
- `/hidden-landscaping-fees`
- `/hidden-moving-company-fees`
- `/hidden-roofing-contractor-fees`
- `/hidden-telecom-fees`
- `/hidden-travel-fees`
- `/hidden-utility-fees`
- `/hiddenfeeai-vs-bill-negotiation-services`
- `/hiddenfeeai-vs-lawyer-review`
- `/hiddenfeeai-vs-traditional-negotiation`
- `/how-can-i-check-if-a-bill-is-incorrect`
- `/how-to-dispute-a-hidden-fee`
- `/how-to-negotiate-medical-bills`
- `/identify-contract-risks`
- `/indemnification-clauses-explained`
- `/medical-debt-relief-options`
- `/negotiate-hospital-bill`
- `/negotiation-savings-calculator`
- `/our-evaluation-process`
- `/reduce-monthly-bills`
- `/review-contract-online`
- `/service-agreement-red-flags`
- `/service-fee-calculator`
- `/subscription-cost-calculator`
- `/termination-fee-calculator`
- `/upload-bill-for-analysis`
- `/upload-contract-for-review`
- `/what-are-common-hidden-fees-in-service-agreements`
- `/what-questions-should-i-ask-before-signing-a-contract`

## Most-linked destinations after implementation

- `/ai-contract-review` — 685 link occurrences
- `/` — 461 link occurrences
- `/ai-analysis-hub` — 432 link occurrences
- `/hidden-fee-encyclopedia` — 297 link occurrences
- `/research-center` — 287 link occurrences
- `/ai-bill-analyzer` — 271 link occurrences
- `/ai-analysis-methodology` — 253 link occurrences
- `/consumer-negotiation-resource-center` — 252 link occurrences
- `/hidden-fee-detector` — 251 link occurrences
- `/contact` — 244 link occurrences
- `/about-detect-hidden-fees` — 235 link occurrences
- `/resource-library` — 233 link occurrences
- `/privacy-and-ai-security` — 230 link occurrences
- `/ai-financial-advisor` — 225 link occurrences
- `/hidden-fees-guides` — 219 link occurrences
- `/editorial-policy` — 216 link occurrences
- `/terms-of-service` — 206 link occurrences
- `/contract-terms-glossary` — 203 link occurrences
- `/ai-document-checker` — 196 link occurrences
- `/hidden-fee-examples` — 191 link occurrences
- `/ai-agreement-analyzer` — 188 link occurrences
- `/bill-negotiation-service` — 187 link occurrences
- `/contract-red-flags` — 184 link occurrences
- `/ai-document-scanner` — 181 link occurrences
- `/hidden-fee-prevention-guide` — 179 link occurrences
- `/analyze-my-document` — 178 link occurrences
- `/data-handling-policy` — 172 link occurrences
- `/hidden-fee-industry-guide` — 172 link occurrences
- `/before-signing-contract-checklist` — 163 link occurrences
- `/ai-document-review-tool` — 154 link occurrences

## Sitewide repetition observations

The largest after-graph destinations are the primary contract, document, hidden-fee, research, and negotiation pillars, plus legal/trust destinations and the product analysis CTA. This is expected for global navigation, footer access, and trust links. No footer links were removed solely because they had a high aggregate count; the implemented reduction removed only duplicate same-destination anchors within the same footer.

## Measurement limitations

- The graph counts HTML anchor occurrences, not weighted PageRank.
- It does not distinguish all reusable components perfectly across legacy templates.
- The baseline and after graph include local HTML only; they do not include JavaScript-generated links or external discovery.
- One-inbound status is a triage signal, not a recommendation to add links to every page.
