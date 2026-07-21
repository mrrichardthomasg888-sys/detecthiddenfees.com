# AI Financial Advisor Authority Page — Build Plan

## Mission Rationale

This page serves as the **flagship authority hub** for the AI Financial Advisor entity at DetectHiddenFees. It answers the core question consumers ask: "Can AI really help me with my finances?" — with concrete mechanisms, real examples, clear limitations, and actionable next steps.

---

## Target Questions & Coverage

| Question | Where Answered | Intent |
|----------|---------------|--------|
| What is an AI financial advisor? | Hero + Direct Answer section | Definition (Learn) |
| How does AI financial analysis work? | Section: "How AI Financial Advisors Analyze Your Finances" | Process (Learn) |
| Can AI analyze financial documents? | Section: "What Types of Financial Documents Can AI Analyze?" | Capability (Learn/Decide) |
| Can AI find hidden fees? | Example 1: Banking Fee Discovery, Example 2: Subscription Drain | Application (Solve) |
| What are the limitations of AI financial advisors? | Section: "Limitations of AI Financial Advisors" | Evaluation (Decide) |

---

## User Intent Mapping

| Section | Primary Intent | Secondary Intent |
|---------|---------------|-----------------|
| Hero + Direct Answer | Learn (definition) | Decide (is this for me?) |
| How AI Financial Advisors Work | Learn (process) | — |
| Document Types | Learn (scope) | Act (what to upload) |
| Real Examples | Solve (application) | Act (what to do) |
| Limitations | Decide (risk assessment) | — |
| FAQ | Learn (clarification) | — |
| Related Topics | Act (next steps) | — |

---

## Covered Entities

| Entity | Relationship to Page | Schema Type |
|--------|---------------------|-------------|
| **AI Financial Advisor** | Primary — the page defines this entity | Service |
| AI Financial Analysis | Sub-entity — one capability of AI advisors | Service |
| Hidden Fees | Discovered by AI advisor analysis | Concept |
| Consumer Financial Transparency | Mission supported by AI advisor | Principle |
| AI Contract Review | Related capability | Service |
| Document Intelligence | Underlying technology | Technology |

---

## Internal Links Strategy

| Link Text | Target Page | Context in Page |
|-----------|-------------|-----------------|
| Hidden Fee Detector | ai-fee-detector.html | "see how our Hidden Fee Detector works" |
| AI Financial Analysis | ai-financial-analysis.html | "Visit our AI Financial Analysis hub" |
| AI Contract Review | ai-contract-review.html | "try our AI Contract Review tool" |
| Bill Negotiation Service | bill-negotiation-service.html | "our Bill Negotiation service" |
| AI Document Intelligence Center | ai-document-intelligence-center.html | "learn how Document Intelligence works" |
| Consumer Negotiation Academy | consumer-negotiation-academy.html | "join the Consumer Negotiation Academy" |
| Hidden Fee Guides | hidden-fees-guides.html | "explore our Hidden Fee Guides" |
| Data Handling Policy | data-handling-policy.html | "review our data handling policy" |

---

## Schema Required

- [x] **Organization** — DetectHiddenFees
- [x] **WebSite** — Site-wide
- [x] **WebPage** — With `about` entity pointing to AI Financial Advisor
- [x] **BreadcrumbList** — Home > AI Financial Advisor
- [x] **Article** — For the page content
- [x] **FAQPage** — 10+ Q&A pairs
- [x] **SoftwareApplication** — HiddenFeeAI platform linked

---

## Content Architecture (AEO Structure)

```
├── H1 Hero: "AI Financial Advisor: Can AI Really Help You Save Money?"
├── Direct Answer (150 words — featured snippet candidate)
├── Trust Bar (4 verification points)
├── How AI Financial Advisors Work (H2)
│   ├── Data Collection & OCR
│   ├── Pattern Recognition Against Fee Libraries
│   └── Comparative Market Analysis
├── What Documents AI Can Analyze (H2 + table)
├── Real-World Examples (H2)
│   ├── Example 1: Banking fee discovery ($180/year)
│   ├── Example 2: Unused subscription drain ($1,440/year)
│   ├── Example 3: Insurance overcharge ($600/year)
│   └── Example 4: Medical bill duplicate charge ($1,200 recovery)
├── Limitations (H2 — 5 key points)
├── FAQ Section (H2 + FAQPage schema, 10 questions)
├── Related Topics (H2 — link grid)
├── Final CTA
└── Sticky CTA Bar (mobile + desktop)
```

---

## Unique Value Positioning

**What makes this page different from existing content:**
1. **Unified framework** showing AI financial advisors as distinct from robo-advisors, budgeting apps, certified planners, and fee detection tools
2. **Concrete limitations section** — most AI financial advisor pages omit this
3. **Consumer-focused examples** — subscriptions, bank fees, insurance, medical bills (not just investments)
4. **Direct answer + featured snippet optimization** — answers the core question in the first 150 words
5. **Entity-rich schema** — multiple schema types for maximum AI engine extraction

---

## Content Quality Notes

- Avoid: "revolutionary," "game-changing," "cutting-edge," "transformative"
- Avoid: repeating the same fee categories across multiple examples
- Write naturally at 8th-10th grade reading level
- Each section must provide information the reader couldn't get from a generic source
- Examples must feel real and specific (names, amounts, situations)
- Data points where possible (average household hidden fee loss: $1,500-$3,000/year)

---

## Duplication Check

| Existing Page | Overlap | Differentiation Strategy |
|---------------|---------|------------------------|
| ai-financial-assistant.html | 20% | Assistant = specific tools; Advisor = strategic overview |
| ai-fee-detector.html | 25% | Fee detector = technical deep dive; Advisor = consumer guidance |
| ai-pricing-analysis.html | 15% | Pricing analysis = subset; Advisor = full scope |
| ai-bill-negotiation.html | 10% | Negotiation = one outcome; Advisor = full lifecycle |

---

## Post-Writing Validation Checklist

- [ ] Direct answer is 100-160 words, readable, extractable
- [ ] 4+ real-world examples with specific amounts
- [ ] Limitations section with 5+ clear points
- [ ] FAQ with 10+ questions and FAQPage schema
- [ ] All schema validates via schema.org
- [ ] Internal links point to existing pages
- [ ] No broken links
- [ ] Mobile responsive at 320px
- [ ] Design system colors and typography
- [ ] Sticky CTA bar functional
- [ ] current-state.json updated
- [ ] CHANGELOG updated
- [ ] Git commit + push