# 🧩 DetectHiddenFees — Content Gap Tracker

> **Last Updated:** 2026-07-22
> **Version:** 1.0
> **Source:** Question Intelligence Database (seo/question-database.md) + Site audit
> **Status:** 7 confirmed gaps + 4 optimization gaps

---

## GAP INVENTORY

Only REAL unanswered questions are listed. Each gap has been verified against existing content to ensure no duplicate or overlapping coverage.

| # | Question | Existing Page? | Priority | Conversion Potential | Status | Category | Notes |
|---|----------|:-------------:|:--------:|:--------------------:|:------:|:--------:|-------|
| 1 | What hidden fees are in my insurance? | ❌ No dedicated page | 🔴 High | 🟢 High — Insurance documents are high-frequency upload candidates | ❌ Missing | Hidden Fee (1.19) | Supports /ai-document-checker.html conversion. Insurance policies are dense, complex, high consumer pain point. |
| 2 | How do I avoid contractor overcharging? | ❌ No dedicated page | 🔴 High | 🟢 High — Directly leads to /ai-estimate-review.html | ❌ Missing | Contractor (4.19) | Highest conversion potential of all gaps. Consumers actively seeking this question are ready to upload an estimate. |
| 3 | What is a price escalation clause? | ❌ No dedicated page (partial coverage in /contract-red-flags.html) | 🔴 High | 🟡 Medium — Informational → Commercial funnel | ❌ Missing | Contract (2.21) | Common in multi-year agreements. Supports /ai-contract-review.html. |
| 4 | What is a unilateral modification clause? | ❌ No dedicated page | ⚠️ Medium | 🟡 Medium — Consumer rights education leads to contract upload | ❌ Missing | Contract (2.22) | Important consumer protection topic. Low competition. Strong E-E-A-T signal. |
| 5 | How much should a contractor charge? | ❌ No dedicated page | ⚠️ Medium | 🟡 Medium — Pricing guidance leads to estimate uploads | ⚠️ Planned | Contractor (4.14) | General pricing guidance. Could be combined with #2 or added as FAQ to existing page. |
| 6 | Are contractor markups reasonable? | ❌ No dedicated page | 🟢 Low | 🟢 Low — Niche informational query | ❌ Missing | Contractor (4.21) | Best covered within #2 (contractor overcharging article) as FAQ. |
| 7 | What is a reasonable material markup? | ❌ No dedicated page | 🟢 Low | 🟢 Low — Niche informational query | ❌ Missing | Contractor (4.22) | Best covered within #2 as FAQ or dedicated section. |

---

## OPTIMIZATION GAPS (Pages Needing Expansion, Not New Pages)

These are questions that are **partially answered** on existing pages but need stronger treatment:

| # | Question | Existing Page | Gap Type | Action | Priority |
|---|----------|---------------|----------|--------|:--------:|
| 8 | Are hidden fees legal? | `/hidden-fee-examples.html` | Missing FAQ entry | Add FAQPage schema entry addressing legality by jurisdiction | ⚠️ Medium |
| 9 | What hidden fees are in mortgage documents? | `/hidden-mortgage-fees.html` | Thin content | Expand fee types (origination, processing, underwriting, appraisal), add FAQ schema | ⚠️ Medium |
| 10 | Find hidden fees in contract (strengthen) | `/find-hidden-fees-in-contract.html` | Partial coverage | Add 3-5 more fee examples with dollar amounts, add comparison data | ⚠️ Medium |
| 11 | How do I find hidden fees in an estimate? | `/ai-estimate-review.html` | Strong tool page but weak educational content | Add knowledge article section linking to /how-to-avoid-contractor-overcharging.html when created | ⚠️ Medium |

---

## CONTENT REMOVAL / CONSOLIDATION GAPS

These are pages that should be **removed or consolidated** because they compete with stronger pages:

| # | Page | Problem | Action | Priority |
|---|------|---------|--------|:--------:|
| 12 | `/before-signing-a-contract.html` | Duplicates `/before-signing-contract-checklist.html` | 301 redirect to checklist | 🔴 High |
| 13 | `/what-should-i-check-before-signing-a-contract.html` | Duplicates `/before-signing-contract-checklist.html` | 301 redirect to checklist | 🔴 High |
| 14 | `/contract-review-ai-software.html` | Competes with pillar `/ai-contract-review.html` | 301 redirect to pillar OR add canonical | 🔴 High |
| 15 | `/ai-contract-review-software.html` | Competes with same pillar | Add canonical to `/ai-contract-review.html` | ⚠️ Medium |
| 16 | `/ai-contract-review-tool.html` | Competes with same pillar | Add canonical to `/ai-contract-review.html` | ⚠️ Medium |
| 17 | `/contract-fee-analysis.html` | Likely thin; evaluate against `/ai-contract-analysis.html` | Redirect if thin | ⚠️ Medium |
| 18 | `/hidden-fee-knowledge-center.html` | Duplicates `/knowledge-center.html` | 301 redirect to knowledge-center | ⚠️ Medium |

---

## QUESTION QUALITY AUDIT

Each gap question was evaluated against 5 criteria before inclusion:

| Criteria | How We Vetted |
|----------|---------------|
| Real user question? | ✅ All questions sourced from the question database which tracks real consumer queries to AI systems |
| Already covered elsewhere? | ✅ Duplicate-checked against all 11 existing KAs, 8 pillar pages, 18 industry guides, and all resource pages |
| Supports tool conversion? | ✅ Every high-priority gap leads directly to a tool page or pillar with a clear CTA path |
| 800+ words of unique content possible? | ✅ Yes, each gap topic supports detailed educational content with examples |
| Would quality suffer from creation? | ✅ No — each fills a genuine gap without diluting existing authority |

---

## PRIORITY SCORING METHODOLOGY

Each gap is scored on 4 dimensions (1-5 scale):

| Score | Conversion Potential | SEO Opportunity | User Intent | Content Feasibility |
|:----:|:-------------------:|:---------------:|:-----------:|:-------------------:|
| 5 | Direct upload intent | Low competition, high demand | Urgent consumer question | Rich examples available |
| 4 | Pre-upload research | Moderate competition | Common search | Good examples available |
| 3 | Indirect conversion | Competitive but achievable | Related need | Adequate examples |
| 2 | Low conversion path | High competition | Broad query | Limited examples |
| 1 | Minimal conversion | No opportunity | Niche | No examples |

**Priority Score = (Conversion × 0.35) + (SEO × 0.25) + (Intent × 0.25) + (Feasibility × 0.15)**

| Gap | Conversion | SEO | Intent | Feasibility | Priority Score | Rank |
|:---:|:----------:|:---:|:------:|:-----------:|:--------------:|:----:|
| 1 - Insurance hidden fees | 4 | 3 | 4 | 4 | 3.75 | #2 |
| 2 - Contractor overcharging | 5 | 3 | 4 | 5 | 4.25 | #1 |
| 3 - Price escalation clause | 3 | 3 | 3 | 4 | 3.20 | #3 |
| 4 - Unilateral modification clause | 3 | 2 | 3 | 4 | 2.95 | #4 |

---

## 90-DAY GAP CLOSURE PLAN

| Phase | Gaps to Close | Target Date | Est. Effort |
|-------|---------------|:-----------:|:-----------:|
| Phase 1 (Days 1-14) | #2 — Contractor overcharging | 2026-08-05 | 4 hours |
| Phase 1 (Days 1-14) | #1 — Insurance hidden fees | 2026-08-05 | 4 hours |
| Phase 2 (Days 15-30) | #3 — Price escalation clause | 2026-08-20 | 3 hours |
| Phase 2 (Days 15-30) | #4 — Unilateral modification clause | 2026-08-20 | 3 hours |
| Phase 2 (Days 15-30) | #8-11 — Optimization gaps | 2026-08-20 | 4 hours |
| Phase 3 (Days 31-60) | #12-18 — Consolidation/redirects | 2026-09-05 | 2 hours |
| Phase 4 (Days 61-90) | #5-7 — Low priority | 2026-10-01 | 2 hours |

---

> **Gap closure rate target:** 7 new articles created + 7 consolidations completed within 90 days.