# 🔍 DetectHiddenFees — SEO Dashboard

> **Last Updated:** 2026-07-22
> **Version:** 1.0
> **Owner:** DetectHiddenFees Research Team
> **Status:** Baseline audit — first comprehensive site health measurement

---

## 1. TOTAL INDEXED PAGES

| Metric | Value |
|--------|:-----:|
| Pages in sitemap.xml | 226 |
| HTML pages on server | 226 |
| Estimated Google indexed | Unknown (not yet verified in GSC) |
| Pages submitted vs indexed delta | TBD after GSC setup |

**Note:** Google Search Console verification and index coverage analysis is a high-priority action item. Without GSC data, indexation status is estimated based on sitemap completeness.

### Index Quality Assessment
| Status | Count | % of Total |
|--------|:-----:|:----------:|
| ✅ High-quality pages (flagship + pillar + KA) | ~45 | 20% |
| ⚠️ Medium-quality pages (tool pages, guides) | ~120 | 53% |
| 🔴 Thin/consolidation-risk pages | ~35 | 15% |
| ❌ Legacy pages needing redirect/merge | ~26 | 12% |

---

## 2. TOTAL PAGES IN SITEMAP

**226 URLs** across all sitemap entries.

### Sitemap Composition

| Content Type | Count | Examples |
|-------------|:-----:|----------|
| Homepage | 1 | `/index.html` |
| Pillar/Flagship Pages | 8 | `/ai-financial-advisor.html`, `/ai-contract-review.html`, `/ai-bill-analyzer.html`, `/hidden-fee-detector.html`, `/ai-agreement-analyzer.html`, `/ai-construction-contract-review.html`, `/ai-invoice-analyzer.html`, `/ai-document-intelligence-center.html` |
| Knowledge Articles (question-based) | 11 | `/can-ai-find-hidden-fees-in-a-contract.html`, `/how-do-i-find-hidden-fees-in-an-invoice.html`, etc. |
| Industry Investigation Guides | 18 | `/hidden-home-renovation-fees.html`, `/hidden-hvac-contractor-fees.html`, `/duplicate-medical-billing-charges.html`, etc. |
| AI Tool Pages | ~50 | `/ai-estimate-review.html`, `/ai-contract-checker.html`, `/ai-bill-checker.html`, etc. |
| Resource Pages | 15 | `/contract-terms-glossary.html`, `/hidden-fee-dictionary.html`, `/hidden-fee-examples.html`, etc. |
| Comparison Pages | 8 | `/ai-contract-review-vs-chatgpt.html`, `/free-vs-paid-contract-review.html`, etc. |
| Hub/Center Pages | 8 | `/knowledge-center.html`, `/bill-negotiation-resource-center.html`, `/consumer-financial-intelligence-center.html`, etc. |
| Legal/E-E-A-T Pages | 8 | `/editorial-methodology.html`, `/editorial-policy.html`, `/data-handling-policy.html`, `/ai-accuracy-and-limitations.html`, `/ai-transparency-report.html`, `/ai-testing-results.html`, `/privacy-and-ai-security.html`, `/terms-of-service.html` |
| Utility Pages | ~15 | `/contact.html`, `/alphabet-links.html`, `/indexnow-submit.html`, `/term-items.html`, etc. |
| Legacy/Consolidation Candidates | ~26 | `/before-signing-a-contract.html`, `/contract-review-ai-software.html`, `/contract-analysis-ai.html`, etc. |

---

## 3. PILLAR PAGES

The site has **8 primary pillar pages** organized by topical cluster:

### Flagship Pillars (Gold Standard Quality)

| Page | Quality Score | Internal Links In | Internal Links Out | FAQ Schema | Breadcrumb Schema |
|------|:------------:|:-----------------:|:------------------:|:----------:|:----------------:|
| `/ai-financial-advisor.html` | ⭐⭐⭐⭐⭐ | ~15 | 60+ | ✅ (8 Q&A) | ✅ |
| `/ai-contract-review.html` | ⭐⭐⭐⭐ | ~20 | 37 | ✅ | ✅ |
| `/hidden-fees-guides.html` | ⭐⭐⭐⭐ | ~10 | 33 | ✅ (8 Q&A) | TBD |
| `/ai-bill-analyzer.html` | ⭐⭐⭐ | ~12 | 31 | ❌ (no FAQPage) | TBD |
| `/ai-agreement-analyzer.html` | ⭐⭐⭐ | ~8 | 25+ | TBD | TBD |
| `/hidden-fee-detector.html` | ⭐⭐⭐ | ~10 | 20+ | TBD | TBD |
| `/ai-construction-contract-review.html` | ⭐⭐⭐⭐ | ~8 | 30+ | TBD | TBD |
| `/ai-document-intelligence-center.html` | ⭐⭐⭐ | ~6 | 20+ | TBD | TBD |

### Quality Issues
| Pillar | Issue | Severity |
|--------|-------|:--------:|
| `/ai-bill-analyzer.html` | Only 4 H2 headings — thin structure for a pillar | 🔴 High |
| `/ai-bill-analyzer.html` | No FAQPage schema — missing key GEO/AEO signal | 🔴 High |
| `/hidden-fee-detector.html` | Needs audit against gold standard | ⚠️ Medium |
| `/ai-agreement-analyzer.html` | Needs audit against gold standard | ⚠️ Medium |

---

## 4. KNOWLEDGE ARTICLES

**11 knowledge articles** currently live, answering real user questions:

| Article | Category | Primary CTA | Internal Links | Quality Assessment |
|---------|:--------:|-------------|:--------------:|:------------------:|
| `/can-ai-find-hidden-fees-in-a-contract.html` | Hidden Fees | Upload Contract | ~8 | ✅ Good |
| `/can-ai-review-a-contract-before-signing.html` | Contracts | Upload Contract | ~8 | ✅ Good |
| `/how-do-i-find-hidden-fees-in-an-invoice.html` | Invoices | Upload Invoice | ~6 | ✅ Good |
| `/can-ai-detect-duplicate-billing-charges.html` | Invoices | Check Invoice | ~6 | ✅ Good |
| `/what-fees-should-i-look-for-in-a-contractor-estimate.html` | Contractors | Review Estimate | ~6 | ✅ Good |
| `/how-do-companies-hide-fees-in-contracts.html` | Hidden Fees | Upload Contract | ~6 | ⚠️ Missing /hidden-fee-detector.html link |
| `/what-are-common-hidden-fees-in-service-agreements.html` | Hidden Fees | Analyze Agreement | ~6 | ⚠️ Missing /ai-agreement-analyzer.html link |
| `/can-ai-analyze-financial-documents.html` | Financial | Upload Document | ~6 | ✅ Good |
| `/what-questions-should-i-ask-before-signing-a-contract.html` | Contracts | Review Contract | ~6 | ✅ Good |
| `/how-can-i-check-if-a-bill-is-incorrect.html` | Bills | Analyze Bill | ~6 | ✅ Good |
| `/what-should-i-check-before-signing-a-contract.html` | Contracts | — | ~4 | ⚠️ Possible duplicate of checklist page |

**Knowledge Article Coverage Gap:** 4 articles identified as needed (per question database):
1. `/what-hidden-fees-are-in-insurance-policies.html` — Insurance fees
2. `/how-to-avoid-contractor-overcharging.html` — Contractor overcharging
3. `/what-is-a-price-escalation-clause.html` — Price escalation clauses
4. `/what-is-a-unilateral-modification-clause.html` — Unilateral modification clauses

---

## 5. RESEARCH ARTICLES

The site has **minimal original research content**. This is a critical gap for E-E-A-T authority.

### Existing Research Signals
| Asset | Type | Quality |
|-------|------|:-------:|
| `/ai-testing-results.html` | AI accuracy testing | ⭐⭐⭐ |
| `/consumer-fee-trends-report.html` | Trend report | ⭐⭐⭐ |
| `/ai-transparency-report.html` | Transparency | ⭐⭐⭐ |
| `/ai-analysis-methodology.html` | Methodology | ⭐⭐⭐ |
| `/ai-hidden-fee-questions.html` | Question research | ⭐⭐⭐⭐ |
| `/research-methodology.html` | Research method | ⭐⭐⭐ |

### Research Gaps
- No original consumer survey data (e.g., "What percentage of consumers found hidden fees in 2026?")
- No original fee tracking index (e.g., quarterly pricing transparency index)
- No original analysis of contract clause frequency (e.g., "How common are auto-renewal clauses?")
- No original comparative analysis with dollar amounts from real document analysis
- No published case studies (anonymized) showing real findings

---

## 6. INDUSTRY INVESTIGATIONS

**18 industry-specific investigation pages** covering specific fee types:

| Investigation Page | Industry | Quality | Internal Links | CTA |
|-------------------|----------|:-------:|:--------------:|:---:|
| `/hidden-dealership-financing-fees.html` | Auto | ⭐⭐⭐ | 20+ | ✅ |
| `/duplicate-medical-billing-charges.html` | Medical | ⭐⭐⭐ | 28 | ✅ |
| `/hidden-bank-overdraft-fees.html` | Banking | ⭐⭐⭐ | 20+ | ✅ |
| `/hidden-home-renovation-fees.html` | Construction | ⭐⭐⭐ | 20+ | ✅ |
| `/hidden-hvac-contractor-fees.html` | HVAC | ⭐⭐⭐ | 20+ | ✅ |
| `/hidden-credit-card-fees.html` | Finance | ⭐⭐⭐ | 15+ | ✅ |
| `/hidden-streaming-fees.html` | Entertainment | ⭐⭐ | 10+ | ⚠️ Weak |
| `/hidden-mortgage-fees.html` | Real Estate | ⭐⭐ | 10+ | ⚠️ Weak |
| `/hidden-phone-bill-fees.html` | Telecom | ⭐⭐⭐ | 15+ | ✅ |
| `/hidden-internet-fees.html` | ISP | ⭐⭐⭐ | 15+ | ✅ |
| `/hidden-loan-fees.html` | Finance | ⭐⭐⭐ | 15+ | ✅ |
| `/hidden-investment-fees.html` | Finance | ⭐⭐ | 10+ | ⚠️ Weak |
| `/hidden-subscription-fees.html` | SaaS | ⭐⭐ | 10+ | ⚠️ Weak |
| `/hidden-moving-company-fees.html` | Moving | ⭐⭐ | 10+ | ⚠️ Weak |
| `/hidden-roofing-contractor-fees.html` | Construction | ⭐⭐ | 10+ | ⚠️ Weak |
| `/hidden-plumbing-fees.html` | Construction | ⭐⭐ | 10+ | ✅ |
| `/hidden-electrician-fees.html` | Construction | ⭐⭐ | 10+ | ✅ |
| `/hidden-landscaping-fees.html` | Construction | ⭐⭐ | 10+ | ⚠️ Weak |

### Industry Investigation Issues
| Issue | Count | Examples |
|-------|:-----:|----------|
| Weak internal linking (<12 links out) | 8 | Streaming, mortgage, investment, subscription, moving, roofing, landscaping |
| Missing or weak CTA | 6 | Streaming, mortgage, investment, subscription, moving, landscaping |
| No FAQPage schema | ~12 | Majority lacking structured FAQ data |
| Content may be thin | ~6 | Streaming, subscription, moving, roofing, landscaping, electrician |

---

## 7. CONTENT CLUSTERS

### Cluster 1: Hidden Fee Detection (Core Entity)
**Pillar:** `/hidden-fee-detector.html` (needs gold standard upgrade)
**Supporting Pages:** `/find-hidden-fees-in-contract.html`, `/check-my-fees.html`, `/free-hidden-fee-scanner.html`, `/hidden-fee-calculator.html`, `/hidden-fee-risk-score.html`, `/hidden-fee-analysis-tool.html`
**Knowledge Articles:** `/can-ai-find-hidden-fees-in-a-contract.html`, `/how-ai-detects-fees.html`, `/how-do-companies-hide-fees-in-contracts.html`
**Industry Guides:** All 18 industry investigation pages
**Strength:** ✅ Largest cluster. Broad coverage across industries.
**Weakness:** ⚠️ Pillar page needs gold standard upgrade. Internal linking from articles back to pillar is inconsistent.

### Cluster 2: AI Contract Review
**Pillar:** `/ai-contract-review.html`
**Supporting Pages:** `/ai-agreement-analyzer.html`, `/ai-contract-checker.html`, `/ai-contract-risk-score.html`, `/contract-clause-checker.html`, `/contract-red-flag-checker.html`, `/contract-terms-analyzer-ai.html`
**Tool Pages:** `/ai-employment-contract-review.html`, `/ai-service-contract-review.html`, `/ai-vendor-contract-review.html`, `/ai-software-license-review.html`, `/ai-freelance-contract-review.html`, `/ai-commercial-lease-review.html`, `/ai-rental-lease-analyzer.html`, `/ai-purchase-agreement-review.html`, `/ai-consulting-agreement-review.html`, `/ai-contractor-agreement-review.html`, `/ai-construction-contract-review.html`
**Comparison Pages:** `/ai-contract-review-vs-chatgpt.html`, `/ai-contract-review-vs-lawyer-review.html`, `/ai-contract-review-vs-manual-review.html`
**Strength:** ✅ Largest cluster with most supporting pages. Strong pillar.
**Weakness:** ⚠️ Cannibalization between /ai-contract-review-software.html, /ai-contract-review-tool.html, /contract-review-ai-software.html. 26+ tool pages may dilute authority.

### Cluster 3: AI Bill & Invoice Analysis
**Pillar:** `/ai-bill-analyzer.html`
**Supporting Pages:** `/ai-invoice-analyzer.html`, `/ai-bill-checker.html`, `/ai-invoice-checker.html`, `/scan-my-invoice.html`, `/analyze-my-bill.html`, `/upload-bill-for-analysis.html`
**Knowledge Articles:** `/how-can-i-check-if-a-bill-is-incorrect.html`, `/how-do-i-find-hidden-fees-in-an-invoice.html`, `/can-ai-detect-duplicate-billing-charges.html`, `/invoice-red-flags.html`, `/how-to-read-an-invoice.html`
**Strength:** ✅ Good coverage of knowledge articles.
**Weakness:** ⚠️ Pillar page is structurally thin (only 4 H2s). No FAQPage schema.

### Cluster 4: Financial Intelligence
**Pillar:** `/ai-financial-advisor.html` (Gold Standard)
**Supporting Pages:** `/consumer-financial-intelligence-center.html`, `/ai-financial-analysis.html`, `/financial-analysis-software.html`, `/financial-analysis-tools.html`, `/ai-pricing-analysis.html`, `/ai-financial-assistant.html`
**Knowledge Articles:** `/can-ai-analyze-financial-documents.html`, `/ai-document-analysis-benefits.html`
**Strength:** ✅ Strongest pillar page on the site. Gold standard quality.
**Weakness:** ⚠️ Fewer knowledge articles supporting this cluster. Missed cross-linking opportunities.

### Cluster 5: Bill Negotiation & Savings
**Pillar:** `/bill-negotiation-resource-center.html`
**Supporting Pages:** `/bill-negotiation-service.html`, `/negotiate-bills.html`, `/bill-negotiation-templates.html`, `/bill-savings-calculator.html`, `/ai-bill-negotiation.html`, `/consumer-negotiation-academy.html`, `/consumer-negotiation-resource-center.html`
**Knowledge Articles:** `/how-to-negotiate-medical-bills.html`, `/negotiate-hospital-bill.html`, `/medical-bill-negotiation-template.html`, `/medical-debt-negotiation.html`, `/reduce-monthly-bills.html`, `/fee-negotiation-checklist.html`, `/negotiation-scripts.html`
**Strength:** ✅ Strong knowledge article coverage. Multiple template/action pages.
**Weakness:** ⚠️ Hub page quality inconsistent with gold standard.

### Cluster 6: Contract Risk & Education
**Pillar:** `/contract-risk-assessment-guide.html`
**Supporting Pages:** `/contract-red-flags.html`, `/contract-risk-analysis.html`, `/contract-risk-score.html`, `/contract-risk-assessment-ai-tool.html`
**Knowledge Articles:** `/automatic-renewal-clauses.html`, `/early-termination-fees.html`, `/cancellation-fee-clauses.html`, `/arbitration-clauses-explained.html`, `/indemnification-clauses-explained.html`, `/unfair-contract-terms.html`, `/hidden-clauses-in-contracts.html`, `/change-order-fees.html`, `/contract-review-checklist.html`, `/before-signing-contract-checklist.html`, `/contract-terms-glossary.html`
**Strength:** ✅ Deep knowledge article coverage on specific clause types.
**Weakness:** ⚠️ No single strong pillar page — authority is distributed across multiple pages.

---

## 8. INTERNAL LINKING STATUS

### Overall Health
| Metric | Value | Status |
|--------|:-----:|:------:|
| Average internal links per page | ~8-12 | ✅ Good |
| Pages with <3 internal links | ~15-20 | ⚠️ Needs attention |
| Pillar pages with strong backlink support | 4/8 | ⚠️ 50% |
| Broken internal links (estimated) | 0 | ✅ Clean |
| Self-referencing canonical issues | Minimal | ✅ Clean |

### Known Linking Gaps
| Source Page | Missing Link To | Impact |
|-------------|---------------|--------|
| `/how-do-companies-hide-fees-in-contracts.html` | `/hidden-fee-detector.html` | Knowledge article not supporting pillar |
| `/what-are-common-hidden-fees-in-service-agreements.html` | `/ai-agreement-analyzer.html` | Knowledge article not supporting pillar |
| `/can-ai-analyze-financial-documents.html` | `/ai-financial-advisor.html` | Weak pillar link |
| `/hidden-bank-overdraft-fees.html` | `/ai-statement-analyzer.html` | Missed tool conversion opp |
| `/duplicate-medical-billing-charges.html` | `/ai-invoice-analyzer.html` | Missed conversion path |
| Industry investigation pages (8) | Pillar pages | Weak pillar backlink support |

### Navigation Status
| Element | Status | Notes |
|---------|:------:|-------|
| Sticky navigation bar | ⚠️ Inconsistent | Present on some pages, missing on others |
| Breadcrumb navigation | ⚠️ Partial | Present on flagship pages, missing on most others |
| Footer links | ✅ Good | Consistent footer with categorized links |
| Related resources section | ⚠️ Inconsistent | Present on flagship pages, missing on many tool pages |

---

## SUMMARY OF CRITICAL FINDINGS

| Priority | Finding | Impact | Action |
|:--------:|---------|:------:|--------|
| 🔴 1 | No Google Search Console verification | Cannot measure indexation, impressions, clicks | Set up GSC immediately |
| 🔴 2 | `/ai-bill-analyzer.html` is structurally thin for a pillar | Weak cluster authority | Expand to gold standard |
| 🔴 3 | 26+ legacy/consolidation candidate pages | Dilutes crawl budget, risks cannibalization | Consolidate via redirects |
| 🔴 4 | Internal linking gaps from KAs to pillars | Weakens topical authority signal | Fix all priority linking gaps |
| 🔴 5 | No original research data | Weakens E-E-A-T authority | Commission fee index/consumer survey |
| ⚠️ 6 | Missing FAQPage schema on majority of pages | Missed GEO/AEO ranking signals | Add FAQPage schema to all major pages |
| ⚠️ 7 | 8 industry investigation pages with weak links/CTAs | Missed conversion opportunities | Strengthen links and CTAs |
| ⚠️ 8 | Navigation/breadcrumb inconsistencies | Poor user experience, weaker AI signals | Standardize navigation across all pages |
| ⚠️ 9 | 4 content gap articles not created | Missed organic traffic | Create 4 high-priority knowledge articles |
| ⚠️ 10 | `/hidden-fees-guides.html` flagship rewrite pending | Core entity page not at gold standard | Complete flagship rewrite |
| ✅ | Schema markup (Organization, Article, FAQPage) present on flagship pages | Strong E-E-A-T foundation | Expand to all pages |

---

> **Next audit due:** 2026-08-22 (30 days)
> **Note:** This is the baseline audit. Future audits should track changes against these metrics.