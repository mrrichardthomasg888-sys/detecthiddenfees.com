# 🎯 AEO Rules — Answer Engine Optimization

## Optimizing for Consumer Question Answering

Answer Engine Optimization ensures DetectHiddenFees.com appears as the definitive answer source when consumers ask questions about hidden fees, contract review, and financial document analysis. AI answer engines (ChatGPT, Google SGE, Perplexity, Bing Copilot) prioritize content that directly answers real user questions.

---

## The AEO Question-Answer Framework

Every informational page on our site should follow this structure:

### Page Structure

```
┌─────────────────────────────────────┐
│ H1: The Question (what users ask)   │
├─────────────────────────────────────┤
│ SHORT ANSWER (50-150 words)         │
│ Featured snippet candidate           │
├─────────────────────────────────────┤
│ DETAILED EXPLANATION                 │
│ H2 sections breaking down the answer │
├─────────────────────────────────────┤
│ REAL EXAMPLES                        │
│ Concrete, relatable scenarios        │
├─────────────────────────────────────┤
│ ACTION STEPS                         │
│ What the consumer should DO          │
├─────────────────────────────────────┤
│ FAQ (FAQPage schema)                 │
│ Related questions with short answers │
└─────────────────────────────────────┘
```

---

## Question Types We Answer

### 1. Definition Questions
**Pattern:** "What is [X]?"
**Example:** "What is a hidden fee?"
**Structure:**
- H1: "What Is [X]?"
- First paragraph: Clear, encyclopedia-style definition
- Body: Types, examples, how to identify
- FAQ: Related definition questions

### 2. How-To Questions
**Pattern:** "How do I [X]?"
**Example:** "How do I find hidden fees in a contract?"
**Structure:**
- H1: "How to [X]: A Step-by-Step Guide"
- First paragraph: Overview of the process
- Body: Numbered steps with details
- FAQ: Related how-to questions
- Schema: HowTo if applicable

### 3. Comparison Questions
**Pattern:** "[X] vs [Y]"
**Example:** "AI contract review vs lawyer review"
**Structure:**
- H1: "[X] vs [Y]: Which Is Right for You?"
- First paragraph: Summary of key differences
- Body: Side-by-side comparison table, pros/cons
- FAQ: Related comparison questions

### 4. Evaluation Questions
**Pattern:** "Is [X] worth it?" or "Should I [X]?"
**Example:** "Is AI contract review accurate?"
**Structure:**
- H1: "Is [X] Worth It? An Honest Assessment"
- First paragraph: Balanced answer with caveats
- Body: Evidence, data, limitations, alternatives
- FAQ: Related evaluation questions

### 5. Problem Questions
**Pattern:** "Why [X]?" or "What causes [X]?"
**Example:** "Why do contractors hide fees?"
**Structure:**
- H1: "Why [X]? Understanding the Real Reasons"
- First paragraph: Root cause explanation
- Body: Industry practices, economics, incentives
- FAQ: Related problem questions

---

## Answer Writing Rules

### Short Answers (Featured Snippet Candidates)

Requirements:
- 50-150 words
- Complete sentences
- No marketing fluff — pure information
- Include key numbers/facts when available
- Written at 8th-10th grade reading level

Example:
> **Q: How does AI detect hidden fees in contracts?**
>
> AI detects hidden fees by scanning contract text for pricing patterns, unusual charges, vague language, and industry-specific fee types. It compares found charges against a database of known hidden fee patterns across industries like HVAC, construction, auto dealerships, and banking. The AI flags charges that are above market rates, duplicate, or described in ambiguous terms — then explains each finding in plain language so consumers can negotiate or dispute the charges.

### Detailed Explanations

Requirements:
- Break into H2 sections of 200-400 words each
- Use concrete examples in every section
- Include data and statistics where available
- Link to related pages for deeper dives
- Use tables for comparisons, lists for steps

### Action Steps

Every how-to and evaluation page should end with:
1. **Immediate action** (1 thing the reader can do right now)
2. **Short-term actions** (things to do this week)
3. **Long-term strategy** (ongoing practices)

---

## FAQ Section Requirements

### Structure
```html
<section>
    <h2>Frequently Asked Questions</h2>
    <details>
        <summary>Question text here?</summary>
        <p>Concise answer (40-80 words).</p>
    </details>
    <!-- Repeat for 5-10 questions -->
</section>
```

### FAQPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Exact question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Concise answer text (AI engines may use this verbatim)"
      }
    }
  ]
}
```

### FAQ Quality Rules
- Minimum 5 questions per page
- Maximum 15 questions (avoid bloat)
- Questions must be unique across all pages (no duplicate FAQs)
- Answers should be 40-80 words for Q&A, longer for complex topics
- Use natural question phrasing (how people actually ask)

---

## Consumer Intent Mapping

Map each page to one primary consumer intent:

| Intent | Signal | Content Focus |
|--------|--------|---------------|
| **Learn** | "What is", "How does", "Why" | Definitions, explanations, education |
| **Solve** | "How to", "Fix", "Get rid of" | Step-by-step guides, action plans |
| **Compare** | "vs", "Best", "Reviews" | Comparison tables, pros/cons |
| **Decide** | "Should I", "Is it worth" | Evidence, data, honest assessments |
| **Act** | "Upload", "Check", "Scan" | Tool pages, calculators, interactive |

---

## AEO Content Checklist

Before publishing any page:

- [ ] H1 answers a specific consumer question
- [ ] First 150 words contain a direct, concise answer
- [ ] Answer is suitable for featured snippet extraction
- [ ] Content organized as: Question → Answer → Explanation → Examples → Action → FAQ
- [ ] At least one real-world example included
- [ ] Action steps clearly outlined
- [ ] FAQ section with 5-10 questions and FAQPage schema
- [ ] Internal links to 3+ related pages
- [ ] External citations from 2+ authority sources
- [ ] Readable at 8th-10th grade level
- [ ] No duplicate content from other pages
- [ ] Mobile-optimized layout