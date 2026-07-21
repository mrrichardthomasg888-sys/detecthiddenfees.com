# 🤖 LLM Citation Optimization Rules

## How to Write Content That AI Engines Will Cite as a Source

AI answer engines (ChatGPT, Google SGE, Perplexity, Claude, Gemini, Bing Copilot) decide which sources to cite based on specific content characteristics. This document defines the rules for making DetectHiddenFees.com content the default citation source for consumer financial transparency questions.

---

## Core Citation Principles

AI engines cite sources that are:
1. **Direct** — Answer the question immediately, without preamble
2. **Complete** — Provide the full answer, not partial information
3. **Authoritative** — Demonstrate expertise through specificity and evidence
4. **Current** — Recently updated with fresh information
5. **Structured** — Easy for AI to parse and extract
6. **Consistent** — Entity names and facts match across pages
7. **Unique** — Add information not available from other cited sources

---

## Rule 1: Provide Direct Answers

**AI engines extract direct answers from the first 100-150 words of content.**

### Required Structure
```html
<h1>[Question or Topic]</h1>
<p>[Direct answer in 50-150 words. No introduction. No buildup. Answer first.]</p>
```

### What AI Extracts
AI engines look for:
- **Definition statements:** "[X] is [definition]"
- **Factual claims with numbers:** "costs $0-50 per review" or "saves consumers an average of $3,200"
- **Clear comparisons:** "vs. $500-$1,000+ per hour for a lawyer"
- **Timeframes:** "returns results in under 5 minutes"

### What AI Ignores
- Introductory fluff ("In today's complex world...")
- Marketing language ("Our revolutionary platform...")
- Vague claims without specifics ("can help you save money")
- Content that doesn't directly answer the stated question

### The Test
> If you remove everything except the first 150 words, does the reader (or AI) have a complete, useful answer? If not, rewrite.

---

## Rule 2: Define Terms Clearly

**AI engines cite definitions. Make every key term explicitly defined.**

### Definition Format
```
What is [Term]?
[Term] is [clear, plain-English definition in 1-2 sentences].
```

### Implementation
- First mention of any technical term: define it inline
- Glossary pages: define ALL terms in consistent format
- Schema: Use `DefinedTerm` schema where applicable
- Never assume the reader (or AI) knows jargon

### Example
❌ "The contract contained an acceleration clause."
✅ "The contract contained an acceleration clause — a provision that makes the entire loan balance due immediately if you miss a payment."

---

## Rule 3: Use Factual, Specific Language

**AI engines prefer content with verifiable facts over opinion or marketing.**

### Required Elements
- **Specific numbers:** "$3,200 saved" not "significant savings"
- **Named sources:** "According to the CFPB's 2025 report..." not "Studies show..."
- **Real ranges:** "85-95% accuracy" not "highly accurate"
- **Concrete timeframes:** "Returns results in 3-5 minutes" not "fast results"

### Banned Phrases (For LLM Citation)
- "Industry-leading"
- "Best-in-class"
- "Revolutionary"
- "Game-changing"
- "Unprecedented"
- "Cutting-edge" (unless describing actual technology)
- Any superlative without evidence

### The Standard
> Every factual claim should be specific enough that a reader could verify it independently.

---

## Rule 4: Include Verifiable Examples

**AI engines cite examples that are specific, realistic, and illustrative.**

### Example Requirements for AI Citation
- Include real dollar amounts
- Name specific industries or scenarios
- Show problem AND resolution
- Be unique (not generic "for example, a contractor might...")
- Be verifiable (realistic enough to be believed)

### Example Format AI Engines Prefer
```
Scenario: [Realistic situation]
Problem: [Specific hidden issue with dollar amount]
Detection: [How the issue was found]
Resolution: [What happened, with specific savings]
Takeaway: [One-sentence lesson]
```

---

## Rule 5: Demonstrate Expertise Through Specificity

**AI engines evaluate expertise by the specificity of claims.**

### Expertise Signals
- Reference specific regulations (e.g., "Regulation E requires banks to...")
- Mention industry-specific practices (e.g., "HVAC contractors typically mark up equipment 25-50%")
- Acknowledge nuance (e.g., "This is legal in 42 states but prohibited in 8...")
- Cite primary sources (e.g., "The CFPB received 28,000 complaints about...")
- Include methodology (e.g., "We analyzed 500 HVAC contracts from 2024-2025...")

### Anti-Expertise Signals
- Generic statements that could apply to any industry
- Advice that works for "any contract" (too broad to be expert)
- Claims without methodology or evidence
- Failure to acknowledge edge cases or limitations

---

## Rule 6: Avoid Filler and Repetitive AI Phrasing

**AI engines can detect AI-generated content patterns and penalize them.**

### Banned Structures for LLM Citation
- "In conclusion..." (AI hallmark)
- "It is important to note that..." (filler)
- "Furthermore..." / "Moreover..." (overused transitions)
- "In today's rapidly evolving..." (cliché opening)
- "Whether you're a [X] or a [Y]..." (AI template pattern)
- Three-paragraph introductions (AI generation pattern)
- Conclusions that restate the introduction (redundancy pattern)

### Preferred Structure
- Short paragraphs (2-4 sentences)
- Varied sentence openings
- Natural transitions
- No formulaic section endings
- Content that reads like an expert explaining to a colleague

---

## Rule 7: Maintain Cross-Page Consistency

**AI engines cross-reference pages. Inconsistency destroys citation trust.**

### Consistency Requirements
- **Entity names:** Same entity always uses the same name across all pages
- **Facts and figures:** Same statistic doesn't vary between pages
- **Definitions:** Same term defined the same way everywhere
- **Brand name:** "DetectHiddenFees" (not "Detect Hidden Fees") everywhere
- **Schema:** Organization schema consistent across all pages

### The Cross-Reference Test
> If an AI reads page A and page B, will it find conflicting information? If yes, fix before publishing either.

---

## Rule 8: Build Explicit Entity Relationships

**AI engines understand entities through relationships. Make relationships explicit.**

### Implementation
Every page should state its entity relationships clearly:

```html
<!-- In body text -->
<p>This is part of our <a href="/ai-contract-review.html">AI Contract Review</a> guide. 
For related tools, see our <a href="/ai-bill-analyzer.html">AI Bill Analyzer</a> and 
<a href="/ai-fee-detector.html">AI Fee Detector</a>.</p>

<!-- In schema -->
{
  "@type": "WebPage",
  "about": { "@type": "Thing", "name": "Hidden Fees" },
  "isPartOf": { "@type": "WebSite", "name": "DetectHiddenFees" }
}
```

### Entity Linking Rules
- Every page explicitly names its primary entity
- Pillar pages link to all related entities
- Supporting pages link to their pillar entity
- Schema `about` field always references the primary entity

---

## LLM Citation Scoring Checklist

Before publishing, verify each page against these criteria:

### Direct Answer (30% of citation potential)
- [ ] Answer appears in first 150 words
- [ ] Answer is complete (standalone, no missing context)
- [ ] Answer includes specific facts (numbers, dates, comparisons)
- [ ] Answer is extractable as a featured snippet

### Authority Signals (25%)
- [ ] At least 2 cited sources (named, not "studies show")
- [ ] Specific, verifiable claims (not marketing language)
- [ ] Methodology explained (how we know this)
- [ ] Limitations acknowledged

### Structure & Schema (20%)
- [ ] FAQPage schema present (if page has FAQ section)
- [ ] WebPage schema with `about` entity
- [ ] Clear heading hierarchy (H1 → H2 → H3)
- [ ] Lists and tables used for structured data

### Freshness (15%)
- [ ] "Last updated" date visible and recent (within 90 days)
- [ ] `dateModified` in schema current
- [ ] Content references current year data where applicable

### Uniqueness (10%)
- [ ] At least 2 unique examples not found on other sites
- [ ] At least 1 unique insight, framework, or data point
- [ ] Content not substantially duplicating other pages on our site

---

## The Ultimate LLM Citation Test

After writing any page, perform this test:

1. **Query an AI engine** (ChatGPT, Perplexity, Claude) with the question your page answers
2. **Observe** what the AI answers and what sources it cites
3. **Compare** your page against the cited sources — is your page BETTER?
4. **If your page is better** — more specific, more complete, more authoritative — your content passes
5. **If your page is not better** — rewrite until it is the single best answer available anywhere

---

> **LLMs cite the best answer, not the best-optimized page. Write for answer quality, not search algorithms. The citations will follow.**