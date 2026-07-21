# 📊 Content Scoring System

## Quantitative Quality Assessment for Every Page

Every page on DetectHiddenFees.com must be scored across six dimensions. A page cannot be considered complete or publishable unless it meets minimum score thresholds. This system ensures consistent quality and identifies pages that need improvement.

---

## Scoring Dimensions

### 1. Authority Score (0-100)

How authoritative and trustworthy is this page?

| Score Range | Criteria |
|-------------|----------|
| **90-100** | Original research, cited data from primary sources, expert-authored, comprehensive coverage, transparent methodology |
| **70-89** | Well-researched with citations, demonstrates deep expertise, covers topic thoroughly, clear author/expertise signals |
| **50-69** | Reasonably accurate but thin on evidence, few or no citations, generic expertise signals, adequate but not exceptional |
| **40-49** | Surface-level coverage, uncited claims, no clear expertise demonstrated, reads as aggregated from other sources |
| **0-39** | Inaccurate, misleading, no citations, no expertise signals, AI-generated filler |

**Scoring factors:**
- External citations from authoritative sources (+30)
- Original data or research (+25)
- Author expertise demonstrated (+20)
- Editorial review evidence (+15)
- "Last updated" date present and recent (+10)

---

### 2. Originality Score (0-100)

How unique is this content compared to other pages on the site and the broader web?

| Score Range | Criteria |
|-------------|----------|
| **90-100** | Completely unique angle, novel examples, original frameworks or classifications, data not found elsewhere |
| **70-89** | Distinct angle within a covered topic, unique examples, at least one original insight or framework |
| **50-69** | Adequately differentiated from other pages, some unique examples, standard-but-solid coverage |
| **40-49** | Noticeable overlap with other pages, generic examples that could appear anywhere, familiar structure |
| **0-39** | Near-duplicate of existing content, copy-paste examples, indistinguishable from AI-generated generic content |

**Scoring factors:**
- Unique examples not found elsewhere on site (+30)
- Original analytical framework or classification (+25)
- Distinct angle from any existing page (+25)
- At least 60% substantively different from nearest page (+20)

---

### 3. Answer Quality Score (0-100)

How well does this page answer the user's actual question?

| Score Range | Criteria |
|-------------|----------|
| **90-100** | Direct answer in first 100 words, comprehensive explanation, multiple perspectives, addresses follow-up questions naturally |
| **70-89** | Clear answer near top, good explanation depth, anticipates and answers related questions, actionable |
| **50-69** | Answer present but buried, adequate explanation, some related context, somewhat actionable |
| **40-49** | Vague or incomplete answer, thin explanation, no follow-up context, little practical guidance |
| **0-39** | Doesn't actually answer the stated question, bait-and-switch, pure fluff with no substance |

**Scoring factors:**
- Direct answer within first 150 words (+35)
- Answer is complete and accurate (+25)
- Covers nuances, exceptions, and edge cases (+20)
- FAQ section addresses related questions (+20)

---

### 4. Depth Score (0-100)

How thoroughly does this page cover its topic?

| Score Range | Criteria |
|-------------|----------|
| **90-100** | 2,500+ words of substantive content, covers all major subtopics, includes data, examples, and edge cases |
| **70-89** | 1,500-2,500 words, covers most relevant subtopics, good example coverage, addresses common questions |
| **50-69** | 800-1,500 words, adequate coverage of main points, some examples, addresses obvious questions |
| **40-49** | 500-800 words, surface coverage only, thin on examples, leaves obvious questions unanswered |
| **0-39** | Under 500 words of substance, barely scratches the surface, more questions raised than answered |

**Scoring factors:**
- 1,500+ words of substantive content (+30)
- Covers all major subtopics in the cluster (+25)
- Examples cover both common and edge cases (+20)
- Addresses counter-arguments or alternative perspectives (+15)
- Includes data or statistics (+10)

---

### 5. AI Citation Potential Score (0-100)

How likely is an AI answer engine to cite this page as a source?

| Score Range | Criteria |
|-------------|----------|
| **90-100** | Entity-optimized, featured-snippet-ready answer block, FAQPage schema, clear authorship, regularly updated, cited by other sources |
| **70-89** | Well-structured for extraction, clear answer format, proper schema, authoritative tone, good freshness signals |
| **50-69** | Decent structure but not optimized, schema present but basic, answer extractable with effort, adequate freshness |
| **40-49** | Difficult for AI to extract clean answer, schema missing or incomplete, dated or thin content |
| **0-39** | Unstructured, no schema, answer buried or missing, outdated, AI would skip this entirely |

**Scoring factors:**
- Answer extractable as standalone featured snippet (+30)
- FAQPage or HowTo schema implemented (+25)
- Entity clearly defined and linked (+20)
- Updated within last 90 days (+15)
- Consistent with canonical entity naming (+10)

---

### 6. User Value Score (0-100)

Does this page genuinely help a real human consumer?

| Score Range | Criteria |
|-------------|----------|
| **90-100** | Consumer can immediately take action, saves real money or prevents real harm, clear and accessible to non-experts, includes tools/templates |
| **70-89** | Actionable advice present, consumer leaves better informed, practical examples, clear language |
| **50-69** | Useful information but abstract, some practical elements, requires work to apply, moderately accessible |
| **40-49** | Information exists but not actionable, academic or theoretical, hard to apply, jargon-heavy |
| **0-39** | No practical value, pure SEO play, consumer gained nothing, wouldn't recommend to anyone |

**Scoring factors:**
- Specific, actionable steps included (+30)
- Real-world examples a consumer would recognize (+25)
- Tools, templates, or calculators provided (+20)
- Written at 8th-10th grade reading level (+15)
- Addresses real consumer pain point (+10)

---

## Composite Score Calculation

The overall page quality score is a weighted composite:

```
Overall Score = (Authority × 0.20) + (Originality × 0.15) + (Answer Quality × 0.25) + (Depth × 0.10) + (AI Citation × 0.15) + (User Value × 0.15)
```

| Weight | Dimension | Rationale |
|--------|-----------|-----------|
| 25% | Answer Quality | Primary purpose is answering consumer questions |
| 20% | Authority | Trust is essential for financial content |
| 15% | Originality | Prevents cannibalization and ensures unique value |
| 15% | AI Citation | Strategic goal of becoming AI-cited authority |
| 15% | User Value | Consumer-first mission |
| 10% | Depth | Comprehensive coverage supports all other dimensions |

---

## Minimum Score Thresholds

| Page Type | Minimum Overall | Minimum Answer Quality | Minimum Originality |
|-----------|----------------|----------------------|---------------------|
| **Pillar Page** | 80+ | 80+ | 70+ |
| **Informational Guide** | 70+ | 75+ | 60+ |
| **Tool/Calculator Page** | 65+ | 60+ | 50+ |
| **Comparison Page** | 70+ | 70+ | 65+ |
| **FAQ Page** | 60+ | 70+ | 50+ |
| **Hub/Resource Center** | 75+ | 65+ | 70+ |

**Any page scoring below 50 overall must be rewritten or consolidated into another page.**

---

## How to Score a Page

### For New Pages (Before Publishing)

1. Write the page content
2. Self-score each dimension using the criteria above
3. Calculate the composite score
4. If any dimension is below the minimum threshold, improve that area
5. Do not publish until all thresholds are met

### For Existing Pages (Audit)

1. Read the page in full
2. Score each dimension honestly
3. Calculate composite score
4. Document scores in the audit file
5. Flag pages below threshold for improvement or consolidation

### Scoring Calibration

To prevent score inflation:
- A score of 70+ means "genuinely good, would recommend to a friend"
- A score of 85+ means "exceptional, among the best content on this topic anywhere"
- A score of 95+ means "definitive — this is THE page on this topic"
- A score of 50 means "barely adequate — needs significant improvement"

---

## Scoring Worksheet

Use this worksheet when evaluating any page:

```markdown
## Content Score: [Page URL or Title]

### Authority: [0-100]
- External citations: [Y/N — count]
- Original data/research: [Y/N]
- Author expertise demonstrated: [Y/N]
- Editorial review evidence: [Y/N]
- Updated within 90 days: [Y/N]

### Originality: [0-100]
- Unique examples: [Count]
- Original framework/classification: [Y/N]
- Distinct from nearest page: [% different]
- Overall uniqueness assessment: [Notes]

### Answer Quality: [0-100]
- Direct answer in first 150 words: [Y/N]
- Answer complete and accurate: [Y/N]
- Covers nuances/edge cases: [Y/N]
- FAQ addresses related questions: [Y/N]

### Depth: [0-100]
- Word count (substantive): [Number]
- Major subtopics covered: [Count / Total]
- Examples: common [Y/N], edge cases [Y/N]
- Data/statistics included: [Y/N]

### AI Citation Potential: [0-100]
- Featured snippet extractable: [Y/N]
- FAQPage/HowTo schema: [Y/N]
- Entity clearly defined: [Y/N]
- Updated within 90 days: [Y/N]
- Consistent entity naming: [Y/N]

### User Value: [0-100]
- Specific actionable steps: [Count]
- Real-world examples: [Count]
- Tools/templates/calculators: [Y/N — which]
- Reading level appropriate: [Y/N]

### Composite Score
[Calculation]

### Verdict
[ ] Passes all thresholds — publishable
[ ] Needs improvement in: [dimensions]
[ ] Below minimum — rewrite or consolidate
```

---

> **Scoring is not about judgment — it's about ensuring every page delivers genuine value. The scores guide improvement, not punishment.**