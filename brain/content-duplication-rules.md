# 🚫 Content Duplication Protection

## Preventing Content Cannibalization on DetectHiddenFees.com

Duplicate and near-duplicate content is the #1 threat to AI citation authority. AI engines penalize sites with overlapping pages by refusing to cite any of them. This document defines the mandatory process for preventing duplication.

---

## The Golden Rule

> **Improve existing content instead of creating duplicates. One great page beats three mediocre ones every time.**

---

## Pre-Creation Duplication Check (MANDATORY)

Before creating ANY new page, you must complete these checks:

### Step 1: Title Check

Search existing page titles for overlap:

- [ ] Does any existing page have the same or similar H1?
- [ ] Does any existing page target the same primary keyword?
- [ ] Does any existing page answer the same primary question?

**Check against:** `knowledge/topic-map.json` — every existing page is listed by cluster.

### Step 2: Heading Check

Compare planned H2 headings against existing pages:

- [ ] Do 3+ planned H2s match existing page H2s?
- [ ] Is the content structure (section order) substantially identical?
- [ ] Would a reader skim both pages and think "I already read this"?

### Step 3: Explanation Check

The most important check:

- [ ] Read the 3 most similar existing pages in full
- [ ] Would your planned page's core explanation be recognizable as "the same answer with different words"?
- [ ] Is the primary unique value of your page a different ANGLE, or just different WORDING?

### Step 4: Similar Pages Check

Check for pages that cover the same topic at different granularity:

- [ ] Is there already a broad overview page that covers this subtopic?
- [ ] Is there already a detailed deep-dive that your page would compete with?
- [ ] Could your planned content be a SECTION within an existing page?

### Step 5: Topic Overlap Assessment

Map your planned page against the topic cluster in `topic-map.json`:

- [ ] What specific sub-niche does this page fill?
- [ ] Is that sub-niche already filled by an existing page?
- [ ] If filled, is the existing page satisfactory? (If yes, don't create. If no, improve it.)

---

## Overlap Thresholds

Use these quantitative guidelines:

| Overlap Level | % Content Overlap | Action |
|---------------|-------------------|--------|
| **Unique** | 0-20% | Safe to create (verify with checklist) |
| **Complementary** | 20-40% | Create, but ensure heavy cross-linking and distinct angle |
| **Concerning** | 40-60% | **STOP.** Can this be a section in an existing page? Can you take a different angle? |
| **Duplicate Territory** | 60%+ | **DO NOT CREATE.** Improve the existing page instead. |

---

## What "Content Overlap" Means

Overlap is measured across these dimensions:

1. **Topic overlap** — Same subject matter? (30% weight)
2. **Question overlap** — Same user question being answered? (25% weight)
3. **Explanation overlap** — Same core answer/explanation? (25% weight)
4. **Example overlap** — Same or very similar examples? (10% weight)
5. **Structure overlap** — Same section headings and order? (10% weight)

---

## The "Improve Don't Duplicate" Protocol

When you identify overlap, follow this protocol:

### 1. Identify the Best Existing Page

Which existing page most closely matches the topic? This becomes your "target page."

### 2. Audit the Target Page

What's missing from the existing page?
- [ ] Missing subtopics?
- [ ] Outdated information?
- [ ] Weak or no examples?
- [ ] No FAQ section?
- [ ] Poor structure or readability?
- [ ] Missing schema?
- [ ] Thin content (under 800 words)?

### 3. Plan Improvements

Document exactly what you'll add/change:
- New sections to add
- Examples to include
- Data to update
- Structure to reorganize
- Schema to add

### 4. Improve, Don't Replace

- Preserve existing content that's good
- Add new sections for missing coverage
- Update outdated claims
- Restructure for better readability
- Enhance with examples and data

### 5. Update Metadata

After improving:
- Update `dateModified` in schema
- Update "Last updated" date on page
- Update `knowledge/topic-map.json` if sections changed
- Update `current-state.json` with the improvement task

---

## Common Duplication Scenarios (And What to Do Instead)

### Scenario 1: "I want to target a synonym keyword"

**Problem:** "AI contract review" and "AI contract analysis" — two pages for the same concept.

**Wrong approach:** Create `ai-contract-analysis.html` as a near-duplicate of `ai-contract-review.html`.

**Right approach:** 
- Pick ONE canonical page for the primary entity
- Use the synonym naturally within that page
- Set up a 301 redirect from the synonym URL to the canonical
- Don't create a separate page

### Scenario 2: "I want to cover the same topic for a different industry"

**Problem:** You have "hidden HVAC fees" and want to create "hidden plumbing fees."

**Right approach:** 
- Only if plumbing has GENUINELY different fee types and patterns
- If HVAC and plumbing have the same 80% of hidden fee types, create ONE "hidden home service contractor fees" page instead
- If fees are truly industry-specific, create distinct pages with unique examples

### Scenario 3: "I want a shorter/easier version of an existing guide"

**Problem:** You have a comprehensive 2,500-word guide and want a 500-word "quick guide."

**Wrong approach:** Create a separate thin page.

**Right approach:**
- Add a "Quick Summary" or "TL;DR" section at the TOP of the existing comprehensive guide
- Use the existing page — one URL serves both skimmers and deep readers
- This is better for SEO (one strong page vs. two weak ones)

### Scenario 4: "I want to target 'best X tools' and 'X tools comparison'"

**Problem:** Two pages comparing the same tools with slightly different framing.

**Right approach:** ONE comparison page that covers both angles:
- "Best X tools" as the H1
- Comparison table as the core content
- Individual tool reviews as sections
- "How to choose" as the decision guide

---

## Self-Audit Questions

Before finalizing any new page, answer these honestly:

1. "If a consumer searches for [topic], would they be satisfied by an existing page we already have?"

2. "What specific information will this new page provide that NO existing page provides?"

3. "Could I achieve the same user value by adding 500 words to an existing page instead of creating a new 1,500-word page?"

4. "Am I creating this page because users need it, or because I think search engines want more pages?"

5. "If every site in our niche followed this same page-creation logic, would the internet be better or worse?"

---

## Documentation Requirement

For every new page created, document in the task file:

```markdown
## Duplication Check Results

### Existing pages checked:
- [ ] `page-1.html` — [X]% overlap — [Reason it's different enough]
- [ ] `page-2.html` — [X]% overlap — [Reason it's different enough]
- [ ] `page-3.html` — [X]% overlap — [Reason it's different enough]

### Estimated overlap: [X]%
### Justification for new page: [One paragraph explaining why this can't be a section in an existing page]
```

---

> **Every duplicate page dilutes our authority. Every consolidated page strengthens it. Choose consolidation.**