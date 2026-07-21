# 🔗 Entity Content Rules

## How to Write Content That Builds Entity Authority

Every page on DetectHiddenFees.com must connect to, define, and reinforce the entities in our knowledge graph. These rules ensure consistent entity representation across all content.

---

## Rule 1: Clearly Define the Topic Entity

**Every page must explicitly define its primary entity within the first 200 words.**

### Required Format
```html
<h1>[Question or Topic]</h1>
<p><strong>[Entity Name]</strong> is [clear definition in 1-2 sentences].</p>
```

### Example
❌ "In this guide, we'll explore how to review contracts with AI technology."

✅ "**AI Contract Review** uses machine learning to scan legal agreements for hidden fees, risky clauses, and unfavorable terms — returning results in under 5 minutes."

### Why
AI engines extract entity definitions from the first paragraph. A missing or vague definition means the AI cannot classify what the page is about, and therefore cannot cite it.

---

## Rule 2: Connect to Related Entities

**Every page must link its primary entity to at least 2-3 related entities.**

### Required Pattern
Within the body content, explicitly state the entity relationships:

```html
<p>[Entity A] is part of our broader <a href="/entity-b.html">[Entity B]</a> capability. 
It works alongside <a href="/entity-c.html">[Entity C]</a> to provide complete 
consumer protection.</p>
```

### Example
> "AI Contract Review is one of the core services provided by **DetectHiddenFees**. It uses **Document Intelligence** technology to extract and analyze contract text, and feeds findings into our **Contract Risk Analysis** framework to score each clause for potential danger."

### Required Entity Connections Per Page Type

| Page Type | Minimum Entity Connections |
|-----------|---------------------------|
| Pillar Page | 3+ related entities |
| Supporting Page | 2+ related entities (including pillar) |
| Knowledge Page | 3+ related entities |
| Tool Page | 2+ (methodology entity + pillar entity) |
| Glossary Page | All entities referenced by defined terms |

---

## Rule 3: Link to Supporting Concepts

**Every page must link to deeper or broader content that reinforces understanding.**

### Required Link Pattern
- **1 link to the pillar page** — The entity's home page (unless this IS the pillar)
- **1 link to a practical tool or template** — "Do something with this knowledge"
- **1 link to a deeper explainer** — "Learn more about how this works"
- **1 link to a related topic in a different cluster** — Cross-pollination

### Example (for a supporting page about HVAC hidden fees)
```html
<p>This is part of our <a href="/hidden-fees-guides.html">Hidden Fee Detection guides</a>. 
Before signing any HVAC contract, run it through our 
<a href="/ai-contract-review.html">AI Contract Review tool</a> to automatically 
flag these exact fee patterns. Learn more about how contractors use 
<a href="/change-order-fees.html">change orders</a> to add hidden costs 
after work begins.</p>
```

---

## Rule 4: Use Consistent Terminology

**Entity names must be identical across all pages. No exceptions.**

### Canonical Entity Names (From `knowledge/glossary.json`)

| Canonical Name | Never Use These Variants |
|---------------|--------------------------|
| **DetectHiddenFees** | "Detect Hidden Fees", "Detect Hidden Fees.com", "DHF" |
| **AI Contract Review** | "AI Contract Analysis", "Contract Review AI", "automated contract checking" (as primary term) |
| **AI Financial Analysis** | "AI Financial Review", "Financial AI Analysis" |
| **Hidden Fees** | "Hidden Costs" (use only as supporting language, not entity name) |
| **Contract Risk Analysis** | "Contract Risk Assessment" (redirect exists), "contract danger checking" |
| **Document Intelligence** | "AI Document Analysis", "Document AI" |
| **AI Bill Analysis** | "AI Bill Checking", "automated bill review" |
| **Consumer Financial Transparency** | "Financial Transparency", "Consumer Transparency" |

### Implementation Check
Before publishing, search the page for:
- Any variant of the entity name not matching the canonical name
- Any schema.org `about` field not using the canonical name
- Any heading that introduces the entity using a different name

---

## Rule 5: Avoid Confusing Duplicate Definitions

**The same entity must be defined the same way on every page that defines it.**

### The Problem
If page A says "AI Contract Review costs $0-50" and page B says "AI Contract Review costs $20-100," AI engines detect the inconsistency and trust neither page.

### The Solution
- **Single source of truth:** `knowledge/glossary.json` contains the definitive entity definitions
- **Reference, don't redefine:** Instead of redefining an entity on every page, reference the canonical definition
- **Update globally:** If an entity's definition must change, update `glossary.json` AND all pages that define it

### Acceptable Patterns
```html
<!-- On the pillar page (full definition) -->
<p><strong>AI Contract Review</strong> is [full definition from glossary].</p>

<!-- On a supporting page (reference + context) -->
<p><strong>AI Contract Review</strong> — our AI-powered system for analyzing legal agreements — 
flagged three issues in this HVAC contract. 
<a href="/ai-contract-review.html">Learn how AI contract review works →</a></p>
```

---

## Entity Content Checklist

Before publishing any page, verify:

- [ ] Primary entity defined in first 200 words
- [ ] Entity name matches canonical name exactly
- [ ] Entity definition consistent with `glossary.json`
- [ ] Links to 2+ related entities in body content (not just footer/see also)
- [ ] Link to pillar page present
- [ ] Link to a practical tool or template present
- [ ] Link to deeper explainer or methodology page present
- [ ] Cross-cluster link to related topic present
- [ ] Schema.org `about` field uses canonical entity name
- [ ] No variant entity names used anywhere on the page

---

## Entity Authority Signal Strength

Pages contribute to entity authority in this order:

1. **Pillar pages** — The strongest signal. Defines the entity definitively. Links to everything.
2. **Supporting pages** — Medium signal. References the entity and links to pillar. Adds depth.
3. **Knowledge pages** — Medium signal. Explains methodology, builds E-E-A-T for related entities.
4. **Tool pages** — Lower signal. Demonstrates entity in action. Links to educational content.
5. **Glossary pages** — Reference signal. Provides consistent definitions AI can extract.

**A page that doesn't connect to any entity does not contribute to authority.**

---

> **Entities are how AI engines understand the world. Every page must clearly say: "This is about [Entity X], which relates to [Entity Y] and [Entity Z]." Pages that don't do this are invisible to AI.**