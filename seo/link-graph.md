# 🔗 DetectHiddenFees — Internal Link Graph Audit

> **Last Updated:** 2026-07-22
> **Version:** 1.0
> **Purpose:** Verify every pillar page receives links from multiple supporting pages. Identify broken link paths and recommend improvements.

---

## PILLAR PAGE INCOMING LINK ANALYSIS

### How to Read This Section
- **Incoming Links:** Number of unique pages on the site that link TO this pillar
- **Outgoing Links:** Number of unique pages this pillar links TO
- **Supporting-to-Pillar Ratio:** How many supporting pages link back to this pillar (should be 3+ per cluster)

| Pillar Page | Estimated Incoming Links | Estimated Outgoing Links | Supporting Pages in Cluster | Pages Linking to Pillar | Ratio | Verdict |
|-------------|:-----------------------:|:------------------------:|:--------------------------:|:-----------------------:|:-----:|:-------:|
| `/ai-financial-advisor.html` | ~15 | 60+ | 8+ | ~12 | ✅ Strong | ✅ All cluster pages link back |
| `/ai-contract-review.html` | ~20 | 37 | 25+ | ~18 | ✅ Strong | ✅ Highest incoming links of any page |
| `/hidden-fees-guides.html` | ~10 | 33 | 18+ | ~8 | ⚠️ Moderate | 🔴 Missing links from 10+ industry guides |
| `/ai-bill-analyzer.html` | ~12 | 31 | 10+ | ~8 | ⚠️ Moderate | ⚠️ Needs more supporting page links |
| `/ai-agreement-analyzer.html` | ~8 | 25+ | 6+ | ~5 | ⚠️ Weak | 🔴 Missing link from `/what-are-common-hidden-fees-in-service-agreements.html` |
| `/hidden-fee-detector.html` | ~10 | 20+ | 12+ | ~6 | 🔴 Weak | 🔴 Missing links from `/how-do-companies-hide-fees-in-contracts.html` and 5+ industry guides |
| `/ai-construction-contract-review.html` | ~8 | 30+ | 8+ | ~7 | ⚠️ Moderate | ✅ Most construction guides link here |
| `/ai-document-intelligence-center.html` | ~6 | 20+ | 6+ | ~4 | 🔴 Weak | ⚠️ Least-linked pillar page |

---

## CLUSTER LINK GRAPH

### Cluster 1: Hidden Fee Detection (Core Entity)
```
PILLAR: /hidden-fee-detector.html
├── ← /how-ai-detects-fees.html ✅
├── ← /find-hidden-fees-in-contract.html ✅
├── ← /free-hidden-fee-scanner.html ✅
├── ← /hidden-fee-analysis-tool.html ✅
├── ← /hidden-fee-risk-score.html ✅
├── ← /check-my-fees.html ✅
├── ← /can-ai-find-hidden-fees-in-a-contract.html ✅
├── ← /hidden-fee-calculator.html ✅
├── ← /how-do-companies-hide-fees-in-contracts.html ❌ MISSING ← CRITICAL
├── ← /what-are-common-hidden-fees-in-service-agreements.html ❌ MISSING
├── ← /types-of-hidden-fees.html ❌ MISSING
├── ← /hidden-fee-examples.html ❌ MISSING
├── ← /hidden-contract-fees.html ❌ MISSING
├── ← 10+ industry investigation guides ❌ MISSING (only /hidden-dealership-financing-fees.html etc.)
│
RECOMMENDATION: Add /hidden-fee-detector.html link to HOW DO COMPANIES HIDE FEES, WHAT ARE COMMON HIDDEN FEES, all 18 industry guides.
```

### Cluster 2: AI Contract Review
```
PILLAR: /ai-contract-review.html
├── ← /ai-agreement-analyzer.html ✅
├── ← /ai-contract-checker.html ✅
├── ← /ai-contract-risk-score.html ✅
├── ← /contract-clause-checker.html ✅
├── ← /contract-red-flag-checker.html ✅
├── ← /contract-terms-analyzer-ai.html ✅
├── ← /ai-employment-contract-review.html ✅
├── ← /ai-service-contract-review.html ✅
├── ← /ai-vendor-contract-review.html ✅
├── ← /ai-software-license-review.html ✅
├── ← /ai-freelance-contract-review.html ✅
├── ← /ai-commercial-lease-review.html ✅
├── ← /ai-rental-lease-analyzer.html ✅
├── ← /ai-purchase-agreement-review.html ✅
├── ← /ai-consulting-agreement-review.html ✅
├── ← /ai-contractor-agreement-review.html ✅
├── ← /ai-construction-contract-review.html ✅
├── ← /ai-contract-review-vs-chatgpt.html ✅
├── ← /ai-contract-review-vs-lawyer-review.html ✅
├── ← /ai-contract-review-vs-manual-review.html ✅
├── ← /can-ai-find-hidden-fees-in-a-contract.html ✅
├── ← /can-ai-review-a-contract-before-signing.html ✅
├── ← /before-signing-contract-checklist.html ✅
├── ← /contract-red-flags.html ✅
├── ← /automatic-renewal-clauses.html ✅
├── ← /early-termination-fees.html ✅
├── ← /cancellation-fee-clauses.html ✅
├── ← /unfair-contract-terms.html ✅
├── ← /hidden-clauses-in-contracts.html ✅
│
RECOMMENDATION: ✅ Strongest cluster. All supporting pages link to pillar. Maintain this.
```

### Cluster 3: AI Bill & Invoice Analysis
```
PILLAR: /ai-bill-analyzer.html
├── ← /ai-invoice-analyzer.html ✅
├── ← /ai-bill-checker.html ✅
├── ← /ai-invoice-checker.html ✅
├── ← /scan-my-invoice.html ✅
├── ← /analyze-my-bill.html ✅
├── ← /upload-bill-for-analysis.html ✅
├── ← /how-can-i-check-if-a-bill-is-incorrect.html ✅
├── ← /how-do-i-find-hidden-fees-in-an-invoice.html ✅
├── ← /can-ai-detect-duplicate-billing-charges.html ✅
├── ← /invoice-red-flags.html ✅
├── ← /how-to-read-an-invoice.html ✅
├── ← /hidden-phone-bill-fees.html ✅
├── ← /hidden-internet-fees.html ✅
├── ← /duplicate-medical-billing-charges.html ❌ MISSING (links to hidden-fees-guides but not directly to ai-bill-analyzer)
│
RECOMMENDATION: Add /ai-bill-analyzer.html link to /duplicate-medical-billing-charges.html.
               Strengthen links from /hidden-subscription-fees.html, /hidden-streaming-fees.html.
```

### Cluster 4: Financial Intelligence
```
PILLAR: /ai-financial-advisor.html
├── ← /consumer-financial-intelligence-center.html ✅
├── ← /ai-financial-analysis.html ✅
├── ← /financial-analysis-software.html ✅
├── ← /financial-analysis-tools.html ✅
├── ← /ai-pricing-analysis.html ✅
├── ← /ai-financial-assistant.html ✅
├── ← /can-ai-analyze-financial-documents.html ⚠️ WEAK (link exists but not prominent)
├── ← /ai-analysis-methodology.html ✅
├── ← /ai-testing-results.html ✅
├── ← /consumer-fee-trends-report.html ✅
├── ← /hidden-fee-statistics.html ✅
├── ← /hidden-investment-fees.html ⚠️ WEAK or MISSING
├── ← /hidden-loan-fees.html ⚠️ WEAK or MISSING
├── ← /hidden-mortgage-fees.html ⚠️ WEAK or MISSING
│
RECOMMENDATION: Add /ai-financial-advisor.html links to hidden-investment-fees, hidden-loan-fees, hidden-mortgage-fees.
```

### Cluster 5: Contractor Pricing
```
PILLAR: /ai-construction-contract-review.html
├── ← /hidden-home-renovation-fees.html ✅
├── ← /hidden-hvac-contractor-fees.html ✅
├── ← /hidden-roofing-contractor-fees.html ✅
├── ← /hidden-plumbing-fees.html ✅
├── ← /hidden-electrician-fees.html ✅
├── ← /hidden-landscaping-fees.html ✅
├── ← /ai-estimate-review.html ✅
├── ← /ai-contractor-agreement-review.html ✅
├── ← /what-fees-should-i-look-for-in-a-contractor-estimate.html ✅
├── ← /change-order-fees.html ✅
├── ← /estimate-vs-quote.html ✅
├── ← /analyze-my-estimate.html ✅
│
RECOMMENDATION: ✅ Strong cluster. Maintain this.
                Consider adding link from /how-to-avoid-contractor-overcharging.html when created.
```

---

## MISSING BACKLINK MAP (Priority Order)

These are the most critical missing links that weaken topical authority:

| Priority | Source Page (should link to) | Target Pillar | Impact on Authority |
|:--------:|------------------------------|---------------|:-------------------:|
| 🔴 1 | `/how-do-companies-hide-fees-in-contracts.html` | `/hidden-fee-detector.html` | Core knowledge article not supporting core pillar |
| 🔴 2 | `/what-are-common-hidden-fees-in-service-agreements.html` | `/ai-agreement-analyzer.html` | Knowledge article not supporting its natural pillar |
| 🔴 3 | `/duplicate-medical-billing-charges.html` | `/ai-bill-analyzer.html` | High-traffic industry guide not linking to billing pillar |
| 🔴 4 | `/hidden-bank-overdraft-fees.html` | `/ai-statement-analyzer.html` | Missed conversion path and pillar link |
| 🔴 5 | All 18 industry guides | `/hidden-fee-detector.html` | Core entity missing backlinks from its own cluster |
| ⚠️ 6 | `/hidden-investment-fees.html` | `/ai-financial-advisor.html` | Finance guide not linking to finance pillar |
| ⚠️ 7 | `/hidden-mortgage-fees.html` | `/ai-financial-advisor.html` | Finance guide not linking to finance pillar |
| ⚠️ 8 | `/hidden-subscription-fees.html` | `/ai-bill-analyzer.html` | Bill-related guide not linking to bill pillar |
| ⚠️ 9 | `/hidden-streaming-fees.html` | `/ai-bill-analyzer.html` | Bill-related guide not linking to bill pillar |
| ⚠️ 10 | `/can-ai-analyze-financial-documents.html` | `/ai-financial-advisor.html` | Weak/insufficient pillar link |

---

## CROSS-CLUSTER LINK OPPORTUNITIES

Connecting different clusters strengthens the overall knowledge graph:

| From Cluster | To Cluster | Example Link Opportunity | Value |
|-------------|------------|-------------------------|:-----:|
| Contract (2) | Billing (3) | `/contract-red-flags.html` → `/ai-invoice-analyzer.html` | Shows contract risks extend to billing |
| Contractor (4) | Billing (3) | `/hidden-home-renovation-fees.html` → `/ai-bill-analyzer.html` | Renovation costs show up on bills |
| Financial (5) | Contract (2) | `/ai-financial-advisor.html` → `/contract-risk-assessment-guide.html` | Financial health includes contract risk |
| Billing (3) | Negotiation (6) | `/how-can-i-check-if-a-bill-is-incorrect.html` → `/bill-negotiation-service.html` | After detection → negotiation |
| Hidden Fee (1) | All clusters | `/hidden-fee-detector.html` → Contract/Billing/Financial/Contractor | Central hub linking to all clusters |
| Knowledge Center | All pages | `/knowledge-center.html` → each KA + pillar | Strong hub-and-spoke already exists |

---

## LINK GRAPH HEALTH METRICS

| Metric | Current | Target | Status |
|--------|:-------:|:------:|:------:|
| Average internal links per page | ~8-12 | 12-15 | ⚠️ Near target, room to grow |
| Pillar pages with 80%+ cluster backlinks | 3/8 (38%) | 8/8 (100%) | 🔴 Needs significant improvement |
| Knowledge articles linking to primary pillar | 9/11 (82%) | 11/11 (100%) | ⚠️ 2 missing — fixable |
| Industry guides linking to core pillar | ~5/18 (28%) | 18/18 (100%) | 🔴 Largest gap |
| Cross-cluster links per page | ~1-2 | 3-4 | ⚠️ Will naturally improve with more pages |
| Orphan pages (0 incoming internal links) | ~5-8 | 0 | ⚠️ Audit needed |
| Broken internal links | 0 | 0 | ✅ Good |

---

## LINK GRAPH RECOMMENDATIONS SUMMARY

| # | Action | Impact | Effort | Priority |
|---|--------|:------:|:------:|:--------:|
| 1 | Add `/hidden-fee-detector.html` link to `/how-do-companies-hide-fees-in-contracts.html` | High — fixes critical gap | 5 min | 🔴 ASAP |
| 2 | Add `/ai-agreement-analyzer.html` link to `/what-are-common-hidden-fees-in-service-agreements.html` | High — fixes critical gap | 5 min | 🔴 ASAP |
| 3 | Add `/hidden-fee-detector.html` link to all 18 industry guides | High — fixes cluster-wide gap | 30 min | 🔴 High |
| 4 | Add `/ai-bill-analyzer.html` link to `/duplicate-medical-billing-charges.html` | Medium — missed conversion | 5 min | ⚠️ Medium |
| 5 | Add `/ai-statement-analyzer.html` link to `/hidden-bank-overdraft-fees.html` | Medium — missed conversion | 5 min | ⚠️ Medium |
| 6 | Add `/ai-financial-advisor.html` links to investment, mortgage, loan fee pages | Medium — cluster strengthening | 15 min | ⚠️ Medium |
| 7 | Add `/ai-bill-analyzer.html` links to subscription and streaming fee pages | Medium — cluster strengthening | 10 min | ⚠️ Medium |
| 8 | Implement cross-cluster linking opportunities | Medium — knowledge graph | 30 min | ⚠️ Medium |
| 9 | Implement 10 consolidation redirects (see content-gap-tracker.md) | High — crawl budget | 30 min | 🔴 High |
| 10 | Add navigation bar to all pages | High — UX and linking | 2 hours | 🔴 High |

---

> **Note:** This audit examined internal link structure from page content only. Navigation bar links and footer links provide additional connectivity not fully captured here. A comprehensive navigation bar across all pages would significantly improve all link graph metrics.