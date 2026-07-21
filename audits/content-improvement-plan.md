# 📈 Content Improvement Plan

**Date:** 2026-07-21
**Based on:** 8-page representative content audit + full site inventory

---

## Overall Content Quality Assessment

Based on a representative sample of 8 pages scored using the content-audit 8-question framework (40-point scale):

| Page | Score/40 | Tier |
|------|----------|------|
| `ai-contract-review.html` | **37** | 🏆 Authority-grade |
| `ai-bill-analyzer.html` | **35** | 🏆 Authority-grade |
| `ai-financial-analysis.html` | **31** | ✅ Solid |
| `ai-contract-review-vs-lawyer-review.html` | **31** | ✅ Solid |
| `contract-analysis-ai.html` | **27** | ⚠️ Needs work |
| `ai-financial-advisor.html` | **26** | ⚠️ Needs work |
| `hidden-fees-guides.html` | **24** | ⚠️ Needs work |
| `consumer-negotiation-resource-center.html` | **22** | ⚠️ Needs work |

**Average score: 29.1 / 40** — Borderline acceptable. Significant room for improvement.

---

## Tier Classification

### 🏆 KEEP — Authority-Grade Pages (35-40)
**No changes needed. Protect and maintain.**

| Page | Score | Strengths |
|------|-------|-----------|
| `ai-contract-review.html` | 37 | Excellent examples ($3,200 HVAC savings, $2,400 auto savings), 3 real cases, actionable steps, strong schema, 2,800+ words |
| `ai-bill-analyzer.html` | 35 | Good structure, strong examples, actionable advice, well-linked |

### ✅ IMPROVE — Solid Pages (28-34)
**Minor improvements needed. Add examples or schema.**

| Page | Score | Key Issue | Fix |
|------|-------|-----------|-----|
| `ai-financial-analysis.html` | 31 | Some sections thin on examples | Add 2+ concrete bill analysis walkthroughs |
| `ai-contract-review-vs-lawyer-review.html` | 31 | Good comparison but dated examples | Update example dollar amounts, add 2026 data |

### ⚠️ IMPROVE — Needs Work (21-27)
**Significant improvements required.**

| Page | Score | Key Issues | Priority Fixes |
|------|-------|------------|----------------|
| `contract-analysis-ai.html` | 27 | Near-duplicate of ai-contract-review.html, fewer examples | **Merge into ai-contract-review.html** or substantially differentiate |
| `ai-financial-advisor.html` | 26 | Two versions exist (v1 legacy + v2), generic structure | Consolidate to single v2 page, add specific examples |
| `hidden-fees-guides.html` | 24 | Hub page thin on content, lacks answer to primary question | Add "Where are hidden fees hiding?" answer + expand hub descriptions |
| `consumer-negotiation-resource-center.html` | 22 | Hub page, generic language, few actionable elements | Add specific negotiation script examples, calculator integration |

### 🔴 MERGE — Pages With Overlapping Intent

These page pairs serve the same user intent and should be consolidated:

| Keep | Merge Into It | Overlap % | Action |
|------|---------------|-----------|--------|
| `ai-contract-review.html` | `ai-contract-analysis.html` + `contract-analysis-ai.html` | ~70% | Merge best content from both into pillar, 301 redirect variants |
| `ai-contract-review-software.html` | `contract-review-ai-software.html` | ~60% | Keep one canonical, merge unique sections, 301 redirect |
| `ai-purchase-agreement-review.html` | `ai-purchase-contract-review.html` | ~55% | Consolidate to single page, cover both angles |
| `ai-lease-review.html` | `ai-rental-lease-analyzer.html` | ~55% | Merge into comprehensive lease review page |
| `find-hidden-fees-in-contract.html` | `detect-hidden-contract-fees.html` | ~60% | Consolidate, 301 redirect |
| `financial-analysis-software.html` | `financial-analysis-tools.html` | ~50% | Merge into single tools comparison page |

### ❌ REMOVE — Legacy v1 Pages

~25-35 pages using the old design system with "Detect Hidden Fees" branding should be either:
1. **301 redirected** to their v2 equivalents (if content is merged)
2. **Converted to v2** design system (if content is unique and valuable)
3. **Deleted** (if content is thin and already covered by v2 pages)

---

## Content Quality Patterns Identified

### What's Working Well

1. **Strong examples with dollar amounts** — Pages like `ai-contract-review.html` and `ai-bill-analyzer.html` use specific, realistic numbers ($3,200 saved, 8.9%→6.4% APR) that build credibility
2. **Comprehensive schema coverage** — Most pages have Organization, WebSite, WebPage, BreadcrumbList, and FAQPage schemas
3. **Dark theme design** — The v2 design system is consistent and professional
4. **Actionable advice** — Top pages include specific "do this now" steps

### What Needs Fixing

1. **No navigation menu** — All pages lack HTML nav links. Users and crawlers can't navigate between pages without the footer.
2. **Hub pages are thin** — Resource centers and guide hubs function as link directories with minimal explanation
3. **Duplicate content clusters** — 3 pages for "AI contract review" (different names, same topic)
4. **Legacy/v2 split** — Two competing design systems, two brand names
5. **Generic language on weaker pages** — Hub pages and some tool pages read as AI-generated filler
6. **Missing "quick answer" sections** — Most pages bury the answer behind 200+ words of introduction

---

## Priority Improvement Actions

### P0 — Critical (Fix immediately)

| # | Action | Pages Affected | Expected Impact |
|---|--------|---------------|-----------------|
| 1 | **Add navigation menu to all pages** | All 210 pages | Users can navigate, crawlers can discover, PageRank flows |
| 2 | **Consolidate brand name** | All pages | Single entity name "DetectHiddenFees" for AI recognition |
| 3 | **Convert/remove v1 legacy pages** | ~25-35 pages | Eliminate design/brand split |

### P1 — High Priority

| # | Action | Pages Affected | Expected Impact |
|---|--------|---------------|-----------------|
| 4 | **Merge duplicate content clusters** | 8-12 pages → 4-6 pages | Eliminate cannibalization, strengthen pillar pages |
| 5 | **Add quick-answer sections to top 20 pages** | 20 pages | Featured snippet eligibility, AEO optimization |
| 6 | **Expand hub pages** | 6 hub pages | Better user navigation, stronger topic authority signals |

### P2 — Medium Priority

| # | Action | Pages Affected | Expected Impact |
|---|--------|---------------|-----------------|
| 7 | **Add 2+ concrete examples to pages lacking them** | ~15 pages | Improved user value, originality scores |
| 8 | **Submit sitemap to Google/Bing** | 1 file | Faster indexing, discovery of all pages |
| 9 | **Update "last updated" dates** | All pages | Freshness signals for AI citation |

---

## Before/After Content Quality Targets

| Metric | Current Average | Target |
|--------|----------------|--------|
| Audit score (8-question) | 29 / 40 | 34+ / 40 |
| Pages with quick-answer section | ~30% | 80%+ |
| Pages with 2+ concrete examples | ~40% | 80%+ |
| Duplicate page clusters | 8+ pairs | 0 pairs |
| Hub page depth (avg words) | ~500 | 1,200+ |
| Design system consistency | ~85% v2 | 100% v2 |
| Navigation present | ~0% | 100% |

---

## Quick Wins (1-2 Hour Tasks)

These improvements can be implemented rapidly:

1. **Add `robots.txt` and submit sitemap** — 15 minutes, immediate indexing benefit
2. **Update "last updated" dates** to 2026-07-21 on top 30 pages — 1 hour, freshness signal
3. **Fix brand name to "DetectHiddenFees"** on any v1 pages not being removed — 30 minutes
4. **Add 301 redirects** for identified duplicate pairs — 30 minutes each pair
5. **Add FAQPage schema** to pages missing it — 15 minutes per page

---

## Long-Term Content Strategy

After P0/P1 fixes are complete:

1. **AEO optimization pass** — Restructure top 50 pages with the authority-page-template.md format
2. **Original research** — Create data-driven content that other sites will link to
3. **Interactive tools** — Build calculators and checkers that earn natural backlinks
4. **Content freshness program** — Every page reviewed every 90 days

---

> **The site has strong bones (good examples, solid schema, professional design) but needs structural fixes (navigation, duplication, brand consistency) to achieve AI citation authority.**