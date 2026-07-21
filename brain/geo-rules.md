# 🌐 GEO Rules — Generative Engine Optimization

## Content Design for AI Retrieval

Every important page on DetectHiddenFees.com must be designed for AI search engine retrieval (ChatGPT, Google SGE, Perplexity, Claude, Bing Copilot). This document defines how to structure content so AI engines correctly surface, understand, and cite our content.

---

## Core GEO Principles

### 1. Entity-Rich Content
AI engines understand content through entities, not keywords. Every page must:
- Define its primary entity clearly in the first 100 words
- Link to related entities within our knowledge graph
- Use consistent entity naming across all pages
- Include Schema.org entity markup where applicable

### 2. Answer-First Structure
AI engines extract direct answers. Structure every page so the answer to the primary question appears within the first 150 words:
- **H1** = The question or topic being answered
- **First paragraph** = Direct, concise answer (50-150 words)
- **Following sections** = Supporting explanation, examples, evidence

### 3. Authority Signals
AI engines evaluate authority based on:
- **Citations** — Link to authoritative external sources
- **Freshness** — Display "Last Updated" date prominently
- **Depth** — Cover topics comprehensively, not superficially
- **Consensus** — Align with established knowledge while adding unique value
- **Transparency** — Clear authorship, methodology, and editorial policy

---

## Required Page Elements for GEO

Every important page must include these elements in this order:

### 1. Clear Definition (H1 or first H2)
```
What is [Entity/Topic]?
A clear, concise definition in plain language.
```

### 2. Direct Answer (Near Top)
```
The short answer: [1-3 sentence summary that could be a featured snippet]
```

### 3. Supporting Explanation
```
How it works, why it matters, key details.
Use subheadings for each major point.
```

### 4. Examples
```
Real-world examples that make the concept concrete.
Use tables, lists, or case studies.
```

### 5. FAQ Section
```
Common questions with concise answers.
Mark up with FAQPage schema.
```

### 6. Related Entities
```
Links to other relevant pages on our site.
"This relates to: [entity A], [entity B], [entity C]"
```

### 7. References
```
External authoritative sources cited.
Professional organizations, government agencies, academic research.
```

### 8. Updated Date
```
Last updated: [Date]
Visible on the page, not just in metadata.
```

---

## Content Formatting for AI Readability

### Headings
- Use a single H1 (the page title/question)
- Use H2 for major sections, H3 for subsections
- Write headings as complete thoughts AI can extract
- Example: ❌ "Overview" → ✅ "How AI Detects Hidden Fees in Contracts"

### Lists
- Use ordered lists for sequential steps
- Use unordered lists for related items
- Keep list items concise (under 30 words)
- AI engines extract list items as structured data

### Tables
- Use for comparisons, fee schedules, pricing breakdowns
- Include clear column headers
- Keep tables focused (under 8 columns, under 20 rows)

### Paragraphs
- Keep paragraphs under 150 words
- Lead with the main point (journalistic inverted pyramid)
- One idea per paragraph

---

## Schema.org Structured Data Requirements

Every page must include:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "[Page Title]",
  "description": "[Meta description — used by AI engines]",
  "url": "[Canonical URL]",
  "inLanguage": "en-US",
  "datePublished": "[Original publish date]",
  "dateModified": "[Last modified date]",
  "about": {
    "@type": "Thing",
    "name": "[Primary entity name]"
  }
}
```

For FAQ pages:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Concise answer — used for featured snippets]"
      }
    }
  ]
}
```

---

## Content Quality Standards for GEO

| Standard | Requirement |
|----------|-------------|
| **Originality** | No duplicated content across pages |
| **Depth** | Minimum 800 words for informational pages, 1500+ for pillar content |
| **Freshness** | Review and update every 90 days |
| **Citations** | Minimum 2 external authority sources per page |
| **Internal Links** | Minimum 3 links to related pages on our site |
| **Readability** | Grade 8-10 reading level (accessible to general consumers) |
| **Mobile** | Fully responsive, readable on all devices |

---

## GEO Optimization Checklist

Before publishing any new page:

- [ ] Primary entity defined in first 100 words
- [ ] Direct answer to main question in first 150 words
- [ ] H1 is a clear question or topic statement
- [ ] H2s are complete thoughts, not generic labels
- [ ] FAQ section with FAQPage schema
- [ ] Related entities section with internal links
- [ ] External citations from authoritative sources
- [ ] Last updated date visible on page
- [ ] WebPage schema with about.entity
- [ ] Clear, scannable structure (headings, lists, tables)
- [ ] No duplicate content from other pages
- [ ] Mobile-responsive layout