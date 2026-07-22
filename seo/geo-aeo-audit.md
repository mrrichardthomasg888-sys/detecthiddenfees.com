# 🤖 DetectHiddenFees — GEO/AEO Audit

> **Last Updated:** 2026-07-22
> **Version:** 1.0
> **Purpose:** Audit every page for Generative Engine Optimization (Google AI Overviews) and Answer Engine Optimization (ChatGPT, Gemini, Claude, Perplexity, Bing AI) readiness.

---

## AUDIT CRITERIA

Each page is evaluated against 5 GEO/AEO criteria:

| Criterion | Description | Why It Matters |
|-----------|-------------|----------------|
| 1. Answers immediately | First paragraph is a direct, quotable answer to the user's search query | AI systems truncate previews — put the answer first |
| 2. Conversational language | Uses "you", "your", natural phrasing, avoids passive voice | AI systems rank conversational content higher |
| 3. Concise summaries | Quick Answer blocks (50-100 words) that AIs can directly cite | LLMs extract these for featured snippets and AI answers |
| 4. Structured headings | Clear H1 → H2 → H3 hierarchy that AI systems can parse | AI uses heading structure to understand content organization |
| 5. Easy for AI to summarize | Self-contained sections, clear topic boundaries, FAQPage schema | Structured data helps AI extract and attribute information |

### Scoring
- ✅ Pass — Meets criterion
- ⚠️ Partial — Partially meets, room for improvement
- ❌ Fail — Does not meet criterion

---

## FLAGSHIP / PILLAR PAGES

| Page | Answers Immediately | Conversational Language | Concise Summaries | Structured Headings | Easy for AI to Summarize | Overall | Notes |
|------|:------------------:|:----------------------:|:-----------------:|:-------------------:|:------------------------:|:-------:|-------|
| `/ai-financial-advisor.html` | ✅ | ✅ | ✅ (Quick Answer blocks) | ✅ (14 H2s, clear hierarchy) | ✅ (FAQPage, Article schema, breadcrumbs) | ⭐⭐⭐⭐⭐ | **GOLD STANDARD** — All criteria met |
| `/ai-contract-review.html` | ✅ | ✅ | ⚠️ (Has quick answers but fewer than gold standard) | ✅ (10 H2s) | ✅ (FAQPage, breadcrumbs) | ⭐⭐⭐⭐ | Strong — add more Quick Answer blocks |
| `/hidden-fees-guides.html` | ✅ | ✅ | ⚠️ (Some sections lack concise AI-ready summaries) | ✅ (13 H2s) | ✅ (FAQPage with 8 Q&A) | ⭐⭐⭐⭐ | Add Quick Answer blocks for each major section |
| `/ai-bill-analyzer.html` | ✅ | ✅ | ❌ (No Quick Answer blocks found) | ⚠️ (Only 4 H2s — thin) | ❌ (No FAQPage schema) | ⭐⭐ | 🔴 Needs major GEO/AEO upgrade |
| `/ai-agreement-analyzer.html` | ✅ | ✅ | ❌ (No Quick Answer blocks) | ⚠️ (Limited H2 depth) | ❌ (No FAQPage confirmed) | ⭐⭐ | 🔴 Needs GEO/AEO upgrade |
| `/hidden-fee-detector.html` | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | Needs audit against gold standard |
| `/ai-construction-contract-review.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good foundation, add schema |
| `/ai-document-intelligence-center.html` | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | Needs GEO/AEO upgrade |

---

## KNOWLEDGE ARTICLES

| Page | Answers Immediately | Conversational Language | Concise Summaries | Structured Headings | Easy for AI to Summarize | Overall | Notes |
|------|:------------------:|:----------------------:|:-----------------:|:-------------------:|:------------------------:|:-------:|-------|
| `/can-ai-find-hidden-fees-in-a-contract.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/can-ai-review-a-contract-before-signing.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/how-do-i-find-hidden-fees-in-an-invoice.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/can-ai-detect-duplicate-billing-charges.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/what-fees-should-i-look-for-in-a-contractor-estimate.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/how-do-companies-hide-fees-in-contracts.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/what-are-common-hidden-fees-in-service-agreements.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/can-ai-analyze-financial-documents.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/what-questions-should-i-ask-before-signing-a-contract.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/how-can-i-check-if-a-bill-is-incorrect.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage schema? |
| `/what-should-i-check-before-signing-a-contract.html` | ✅ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | Thin content, no FAQPage |

### Knowledge Article GEO/AEO Pattern Assessment
All knowledge articles follow this pattern:
```
H1: [User Question as heading]
├── First paragraph: Direct answer ✅ (Rule 1 satisfied)
├── Why this matters ✅ (Rule 2: conversational)
├── What to check ✅
├── How AI helps ✅
│   └── CTA present ✅
├── Related resources section ✅
└── Standard disclaimer present ✅
```

**Missing from most knowledge articles:**
- Formal "Quick Answer" block with CSS class (answer-block)
- FAQPage schema with structured Q&A
- AI Retrieval / LLM Quick Answer label
- Risk indicators (High/Medium/Low)
- Breadcrumb navigation

---

## INDUSTRY INVESTIGATION GUIDES

| Page | Answers Immediately | Conversational Language | Concise Summaries | Structured Headings | Easy for AI to Summarize | Overall | Notes |
|------|:------------------:|:----------------------:|:-----------------:|:-------------------:|:------------------------:|:-------:|-------|
| `/hidden-dealership-financing-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/duplicate-medical-billing-charges.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-bank-overdraft-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-home-renovation-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-hvac-contractor-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-credit-card-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-streaming-fees.html` | ✅ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | No Quick Answer blocks |
| `/hidden-mortgage-fees.html` | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | Thin content risk |
| `/hidden-phone-bill-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-internet-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-loan-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-investment-fees.html` | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | Weak GEO/AEO |
| `/hidden-subscription-fees.html` | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | Weak GEO/AEO |
| `/hidden-moving-company-fees.html` | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | Weak GEO/AEO |
| `/hidden-roofing-contractor-fees.html` | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | Weak GEO/AEO |
| `/hidden-plumbing-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-electrician-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Good |
| `/hidden-landscaping-fees.html` | ⚠️ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | Weak GEO/AEO |

---

## CONTRACT CLAUSE PAGES

| Page | Answers Immediately | Conversational Language | Concise Summaries | Structured Headings | Easy for AI to Summarize | Overall | Notes |
|------|:------------------:|:----------------------:|:-----------------:|:-------------------:|:------------------------:|:-------:|-------|
| `/automatic-renewal-clauses.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage? |
| `/early-termination-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage? |
| `/cancellation-fee-clauses.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage? |
| `/arbitration-clauses-explained.html` | ✅ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | No FAQPage, no CTA |
| `/indemnification-clauses-explained.html` | ✅ | ✅ | ❌ | ⚠️ | ❌ | ⭐⭐ | No FAQPage, no CTA |
| `/unfair-contract-terms.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage? |
| `/hidden-clauses-in-contracts.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage? |
| `/change-order-fees.html` | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⭐⭐⭐ | Missing FAQPage? |

---

## GEO/AEO STRENGTHS (What's Working)

| Strength | Evidence |
|----------|----------|
| ✅ **Question-based H1s** | Knowledge articles use exact user questions as H1 — ideal for AI retrieval |
| ✅ **Direct answers first** | All knowledge articles start with a direct, quotable answer |
| ✅ **Conversational tone** | Site-wide use of "you", "your", natural language |
| ✅ **FAQPage on flagship pages** | ai-financial-advisor (8 Q&A), hidden-fees-guides (8 Q&A), ai-contract-review have FAQPage schema |
| ✅ **Organization schema on all pages** | Consistent brand identity for AI systems |
| ✅ **Article schema on knowledge pages** | Helps AI classify content as authoritative articles |
| ✅ **Breadcrumb on flagship pages** | Helps AI understand site structure |
| ✅ **Real examples with dollar amounts** | Industry guides use specific pricing — strong AI citation signal |
| ✅ **Conditional language** | Consistent use of "can help", "may", "consult a professional" — builds AI trust |
| ✅ **/ai-hidden-fee-questions.html resource** | Dedicated GEO/AEO resource page with 12 FAQPage Q&A + 30+ answer blocks |

---

## GEO/AEO WEAKNESSES (Critical Fixes)

| # | Weakness | Pages Affected | Impact | Fix |
|---|----------|---------------|:------:|-----|
| 🔴 1 | **Missing Quick Answer blocks** | All non-flagship pages (200+) | AI systems cannot find a concise, quotable answer easily | Add answer-block div with quick answer (50-100 words) to every page |
| 🔴 2 | **Missing FAQPage schema** | ~200 pages without it | AI systems (especially Google AI Overviews) prioritize FAQPage for answers | Add FAQPage schema to every major page |
| 🔴 3 | **No risk indicators** | Most pages | AI systems cannot assess content authority level | Add High/Medium/Low risk labels |
| 🔴 4 | **Inconsistent breadcrumbs** | ~200 pages missing breadcrumbs | AI systems lose site hierarchy context | Add breadcrumb schema to every page |
| ⚠️ 5 | **No AI Retrieval / LLM Quick Answer labels** | All pages | AI systems don't see explicitly marked answer blocks | Add "Quick Answer:" or "AI Retrieval:" labels to answer blocks |
| ⚠️ 6 | **No "Answer The Question Immediately" enforcement on non-KA pages** | Industry guides, tool pages | First paragraphs sometimes have throat-clearing | Rewrite first paragraphs to be direct answers |
| ⚠️ 7 | **Thin H2 structure on pillar pages** | ai-bill-analyzer (4 H2s), ai-agreement-analyzer | AI systems use heading density as quality signal | Expand to 8+ H2s per pillar page |
| ⚠️ 8 | **Natural language variations missing** | Most pages | AI systems use semantic variation as authority signal | Add question variations throughout content |

---

## GEO/AEO SCORECARD BY PAGE TYPE

| Page Type | Avg Score | Count | Action Needed |
|-----------|:---------:|:-----:|---------------|
| Flagship pillars | ⭐⭐⭐⭐ | 8 | Upgrade bottom 4 to gold standard |
| Knowledge articles | ⭐⭐⭐ | 11 | Add FAQPage + Quick Answer blocks |
| Industry guides | ⭐⭐⭐ | 18 | Add Quick Answer blocks + risk indicators |
| Contract clause pages | ⭐⭐ | 8 | Add FAQPage + CTAs + breadcrumbs |
| Hub/center pages | ⭐⭐ | 8 | Add Quick Answer blocks + schema |
| Tool pages | ⭐⭐ | ~50 | Add Quick Answer blocks + FAQPage |
| Comparison pages | ⭐⭐ | 8 | Audit as needed |
| Legal/E-E-A-T pages | ⭐⭐⭐ | 8 | Good as-is (purpose is trust, not AI retrieval) |

---

## GOLD STANDARD GEO/AEO TEMPLATE

Based on the `/ai-financial-advisor.html` gold standard, every page should include:

```html
<!-- 1. QUICK ANSWER BLOCK (within first 15% of page) -->
<div class="answer-block">
  <div class="question">Quick Answer:</div>
  <div class="answer">[50-100 word direct answer optimized for AI retrieval]</div>
  <div class="explain">Why this matters: [2-3 sentence explanation]</div>
  <span class="risk-indicator">Common risk: [High/Medium/Low]</span>
  <a href="[tool-page]" class="cta-link">[Action] With AI — $15</a>
</div>

<!-- 2. FAQ PAGE SCHEMA (minimum 5 Q&A pairs in JSON-LD) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question 1]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer 1]"
      }
    }
  ]
}
</script>

<!-- 3. BREADCRUMB SCHEMA -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://detecthiddenfees.com/"},
    {"@type": "ListItem", "position": 2, "name": "[Category]", "item": "https://detecthiddenfees.com/[hub-page]"},
    {"@type": "ListItem", "position": 3, "name": "[Page Title]", "item": "https://detecthiddenfees.com/[current-page]"}
  ]
}
</script>

<!-- 4. DIRECT ANSWER FIRST PARAGRAPH (no throat-clearing) -->
<p>[50-80 word direct answer to the page's primary question]</p>

<!-- 5. NATURAL LANGUAGE VARIATIONS (throughout content) -->
<!-- Include variations like: "You might be wondering...", "Another way to ask this is...", "Here's what you need to know..." -->
```

---

## GEO/AEO IMPROVEMENT PLAN

### Phase 1: Schema & Structure (Week 1-2)
- Add FAQPage schema to all 11 knowledge articles
- Add FAQPage schema to all 18 industry guides
- Add FAQPage schema to all 8 contract clause pages
- Add breadcrumb schema to every page

### Phase 2: Quick Answer Blocks (Week 2-4)
- Add Quick Answer blocks to all 11 knowledge articles
- Add Quick Answer blocks to all 18 industry guides
- Add Quick Answer blocks to all 8 pillar pages
- Add Quick Answer blocks to top 20 tool pages

### Phase 3: Content Refinement (Week 3-6)
- Rewrite first paragraphs on non-KA pages to answer immediately
- Add risk indicators to all fee/contract pages
- Add conversational language variations
- Expand thin pillar pages (ai-bill-analyzer, ai-agreement-analyzer)

### Phase 4: AI System Verification (Week 4-8)
- Test pages in ChatGPT Search
- Test pages in Gemini
- Test pages in Perplexity
- Test pages in Google AI Overviews
- Adjust based on AI system responses

---

## GOOGLE AI OVERVIEWS READINESS

| Criteria | Status | Notes |
|----------|:------:|-------|
| Direct answer in first paragraph | ✅ On knowledge articles | ⚠️ Missing on many tool/guide pages |
| FAQPage schema present | ❌ On most pages | 🔴 Critical gap |
| HowTo schema for step-by-step | ❌ Not used | ⚠️ Opportunity for checklist pages |
| Table/structured data | ⚠️ Present on some | Could use more comparison tables |
| Author/reviewer markup | ✅ Present on gold standard | ⚠️ Missing on most pages |
| Clear publication dates | ✅ Most pages have dates | Good |
| E-E-A-T signals | ✅ On flagship | ⚠️ Missing on lower-tier pages |

---

## CHATGPT / GEMINI / CLAUDE READINESS

| Criteria | Status | Notes |
|----------|:------:|-------|
| Natural conversational question format | ✅ Strong | Knowledge articles excel here |
| Quick quotable answers | ⚠️ Partial | Only flagship pages have dedicated answer blocks |
| Clear brand identification | ✅ Strong | Organization schema on all pages |
| Authority signals (E-E-A-T) | ⚠️ Partial | Strong on flagship, weak on lower tiers |
| Conditional language | ✅ Strong | Site-wide best practice |
| Privacy/ethics transparency | ✅ Good | Dedicated pages + footer links |

---

## PERPLEXITY READINESS

| Criteria | Status | Notes |
|----------|:------:|-------|
| Cites sources clearly | ⚠️ Partial | Internal links are strong but attribution structure could be clearer |
| Authoritative claims | ✅ Good | Conditional language and methodology references |
| Recent/dated content | ✅ Good | All pages dated 2026-07-22 |
| Structured for extraction | ⚠️ Partial | Missing FAQPage schema on most pages |
| Answer-focused content | ✅ Strong | Question-answer format on KAs is ideal |

---

> **Next audit due:** 2026-08-22
> **Gold standard reference:** `/ai-financial-advisor.html`
> **GEO/AEO resource page:** `/ai-hidden-fee-questions.html`