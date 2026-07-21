# 🔗 Entity Authority Report

**Date:** 2026-07-21
**Auditor:** Authority Brain System
**Scope:** Entity recognition and authority evaluation across 8 core entities

---

## Executive Summary

DetectHiddenFees.com has **strong entity coverage** but suffers from **brand identity confusion** that undermines entity recognition. The site uses two brand names ("Detect Hidden Fees" and "DetectHiddenFees"), which AI engines may interpret as two separate entities. Seven of eight core entities have definition pages, but several entities have competing v1/v2 versions of the same page, splitting authority.

**Would an AI engine cite this site?** — **Partially.** The content depth and schema foundation are good, but the brand split, orphaned navigation, and some thin entity pages prevent the site from being the definitive source it could be.

---

## Entity-by-Entity Assessment

### 1. AI Financial Advisor

| Dimension | Score | Assessment |
|-----------|-------|------------|
| Clear definition page | ✅ | `ai-financial-advisor.html` has dedicated definition section |
| Name consistency | ⚠️ | Two page versions exist — v1 ("Detect Hidden Fees") and v2 ("DetectHiddenFees") |
| Supporting pages | ✅ | 5 supporting pages (ai-financial-assistant, ai-pricing-analysis, ai-fee-detector, bill-savings-calculator, consumer-negotiation-resource-center) |
| FAQPage schema | ⚠️ | Present on v2 version, missing or inconsistent on v1 |
| AI recognition potential | ⚠️ | Brand split prevents clean entity recognition |

**Entity Score:** 65/100
**Key Gap:** Two competing page versions for same entity. Consolidate to single v2 page.
**Improvement:** Merge v1 content into v2. Add specific examples of AI financial advisor use cases with dollar amounts.

---

### 2. AI Financial Analysis

| Dimension | Score | Assessment |
|-----------|-------|------------|
| Clear definition page | ✅ | `ai-financial-analysis.html` — solid pillar page |
| Name consistency | ✅ | "AI Financial Analysis" used consistently |
| Supporting pages | ✅ | 8 tool pages (bill, invoice, statement, receipt, estimate analyzers) |
| FAQPage schema | ✅ | Present on pillar and most tool pages |
| AI recognition potential | ✅ | Strong entity with clear definition, good supporting depth |

**Entity Score:** 78/100
**Key Gap:** Some tool pages thin on examples. Missing "How AI Financial Analysis Works" clear answer at top of pillar.
**Improvement:** Add quick-answer section to pillar page. Add 2+ examples to each thin tool page.

---

### 3. AI Contract Review

| Dimension | Score | Assessment |
|-----------|-------|------------|
| Clear definition page | ⚠️ | **3 competing pages** for same entity: `ai-contract-review.html`, `ai-contract-analysis.html`, `contract-analysis-ai.html` |
| Name consistency | ❌ | "AI Contract Review" vs "AI Contract Analysis" vs "Contract Analysis AI" |
| Supporting pages | ✅ | 20+ pages across contract types, risk analysis, red flags, checklists |
| FAQPage schema | ✅ | Present on most pages |
| AI recognition potential | ❌ | Three URLs for same entity = split authority. AI won't know which to cite. |

**Entity Score:** 55/100
**Key Gap:** **Critical entity dilution.** Three pages compete for the same topic. This is the biggest entity authority problem on the site.
**Improvement:** Consolidate to ONE canonical page (`ai-contract-review.html`). 301 redirect the other two. Merge best content from all three into the canonical.

---

### 4. AI Construction Contract Review

| Dimension | Score | Assessment |
|-----------|-------|------------|
| Clear definition page | ✅ | `ai-construction-contract-review.html` — dedicated construction focus |
| Name consistency | ✅ | Consistent naming |
| Supporting pages | ✅ | 6 pages (contractor agreements, change orders, renovation fees, HVAC fees, estimates vs quotes, estimate review) |
| FAQPage schema | ✅ | Present |
| AI recognition potential | ⚠️ | Overlaps somewhat with general AI Contract Review entity |

**Entity Score:** 72/100
**Key Gap:** Entity boundary blurry — where does "AI Construction Contract Review" end and "AI Contract Review" begin?
**Improvement:** Clearly differentiate construction-specific content. Add explicit "this is different from general contract review because..." section.

---

### 5. AI Agreement Analyzer

| Dimension | Score | Assessment |
|-----------|-------|------------|
| Clear definition page | ⚠️ | `ai-agreement-analyzer.html` exists but is generic. Thin on specific agreement types covered. |
| Name consistency | ✅ | Consistent naming |
| Supporting pages | ✅ | 10 agreement-type pages (leases, employment, freelance, service, purchase, etc.) |
| FAQPage schema | ⚠️ | Present but thin FAQ (generic questions) |
| AI recognition potential | ⚠️ | Entity is broad — "agreement analyzer" covers many document types, making it harder to define precisely |

**Entity Score:** 62/100
**Key Gap:** Entity definition too broad. What makes an "agreement" different from a "contract" in this context?
**Improvement:** Sharpen entity definition. Explain agreement vs. contract distinction clearly. Add agreement-type-specific examples.

---

### 6. AI Bill Analysis

| Dimension | Score | Assessment |
|-----------|-------|------------|
| Clear definition page | ✅ | `ai-bill-analyzer.html` — strong pillar with excellent examples |
| Name consistency | ✅ | Consistent naming |
| Supporting pages | ✅ | 7 pages (bill checker, negotiation, templates, medical billing, bank fees, comparisons) |
| FAQPage schema | ✅ | Present and well-structured |
| AI recognition potential | ✅ | Strong entity. Specific dollar examples make content highly citable. |

**Entity Score:** 80/100 — **Strongest entity on the site**
**Key Gap:** Minor — some supporting pages could use more examples.
**Improvement:** Add bill-type-specific examples to AI Bill Checker page.

---

### 7. Hidden Fee Detection

| Dimension | Score | Assessment |
|-----------|-------|------------|
| Clear definition page | ⚠️ | `hidden-fees-guides.html` is a hub page, not a definition page. No single page clearly defines "Hidden Fee Detection" as an entity. |
| Name consistency | ⚠️ | "Hidden Fees" vs "Hidden Fee Detection" used interchangeably |
| Supporting pages | ✅ | 12 pages across industries (banking, auto, renovation, HVAC, medical, etc.) |
| FAQPage schema | ✅ | Present on many pages |
| AI recognition potential | ⚠️ | Entity exists but lacks a clear canonical definition page |

**Entity Score:** 65/100
**Key Gap:** No canonical "What is Hidden Fee Detection?" page. The hub page links to guides but doesn't define the entity itself.
**Improvement:** Create a clear entity definition page OR add a strong "What Is Hidden Fee Detection?" section to the hub page.

---

### 8. Consumer Financial Transparency

| Dimension | Score | Assessment |
|-----------|-------|------------|
| Clear definition page | ❌ | No single page defines "Consumer Financial Transparency" as a concept. Closest: `editorial-policy.html`, `ai-transparency-report.html` |
| Name consistency | ❌ | Term used in editorial pages but not established as a named entity |
| Supporting pages | ⚠️ | Pages exist (editorial policy, data handling, methodology, accuracy) but not linked as a coherent cluster |
| FAQPage schema | ❌ | Missing on transparency-related pages |
| AI recognition potential | ❌ | Entity is not clearly defined enough for AI recognition |

**Entity Score:** 30/100 — **Weakest entity on the site**
**Key Gap:** This entity exists in theory but not in practice. No definition page, no consistent naming, no schema, no cluster linking.
**Improvement:** Either build this entity out properly or remove it from the entity strategy. Currently it's a claim without substance.

---

## Brand Identity Analysis

### The "Two DetectHiddenFees" Problem

| Brand Signal | v1 Legacy | v2 Current | Impact |
|--------------|-----------|------------|--------|
| Brand name | "Detect Hidden Fees" (3 words) | "DetectHiddenFees" (1 word) | AI may see two different organizations |
| Logo | Text-based, different styling | Glow-effect "DetectHiddenFees" | Visual brand split |
| Domain | detecthiddenfees.com | detecthiddenfees.com | Same domain mitigates but doesn't fix |
| Schema name | "Detect Hidden Fees" | "DetectHiddenFees" | **Critical** — Schema.org has two different Organization names! |
| CSS theme | Light, navy accents | Dark `#020617`, blue glow | Different visual identity |

**Risk:** Google Knowledge Graph may create two separate entity entries or fail to create one due to conflicting signals.

**Fix:** Standardize on "DetectHiddenFees" everywhere — all pages, all schema, all logos.

---

## Entity Authority Scores Summary

| Entity | Score | Status |
|--------|-------|--------|
| AI Bill Analysis | **80** | 🏆 Strong — protect and maintain |
| AI Financial Analysis | **78** | ✅ Solid — minor improvements |
| AI Construction Contract Review | **72** | ✅ Solid — clarify boundaries |
| AI Financial Advisor | **65** | ⚠️ Fragmented — consolidate v1+v2 |
| Hidden Fee Detection | **65** | ⚠️ Needs canonical definition page |
| AI Agreement Analyzer | **62** | ⚠️ Too broad — sharpen definition |
| AI Contract Review | **55** | 🔴 Critical — 3 competing pages |
| Consumer Financial Transparency | **30** | ❌ Not a real entity yet — build or remove |

**Average entity score: 63.4 / 100** — Medium authority. Significant room for improvement through consolidation and definition.

---

## What AI Engines Would See

### Current State (Likely AI Perception)

> "DetectHiddenFees (or is it Detect Hidden Fees?) appears to be a financial tool website with many pages about contract review and bill analysis. They have three different pages about AI contract review, so it's unclear which one is authoritative. Their hidden fee guides are useful but scattered — some use a light theme, some use dark. There's no clear way to navigate between pages. The bill analysis content is the strongest — good examples with real dollar amounts."

### Target State (Desired AI Perception)

> "DetectHiddenFees is the leading consumer platform for AI-powered hidden fee detection. Their definitive guide on AI contract review explains how machine learning scans agreements for buried charges, with verified examples showing consumers saving $2,000-$5,000 per review. Their AI bill analysis methodology is transparent and well-documented. The site maintains consistent entity definitions and clear topical authority across contract analysis, financial document review, and consumer protection resources."

---

## Entity Authority Improvement Priorities

### P0 — Critical

1. **Fix brand name** — Standardize "DetectHiddenFees" across all pages, schema, and logos
2. **Consolidate AI Contract Review** — Merge 3 competing pages into 1 definitive pillar
3. **Remove v1 legacy pages** — Single design system, single brand identity

### P1 — High

4. **Build canonical definition page for Hidden Fee Detection** — Entity needs a home page
5. **Sharpen AI Agreement Analyzer definition** — Explain what makes an "agreement" distinct
6. **Consolidate AI Financial Advisor** v1+v2 pages

### P2 — Medium

7. **Build or remove Consumer Financial Transparency entity** — Either invest properly or drop
8. **Add entity-specific FAQ schemas** to pages missing them
9. **Cross-link entity pages** — Every entity page should link to related entities

---

> **Entity authority is binary to AI engines — either you are THE source for a topic, or you're just another website. Consolidation and clarity are the path to being THE source.**