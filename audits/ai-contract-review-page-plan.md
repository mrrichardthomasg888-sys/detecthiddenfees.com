# AI Contract Review — Flagship AEO/GEO Authority Hub Page Plan

## Overview

This document governs the rewrite of `ai-contract-review.html` as the definitive AI Contract Review authority hub for DetectHiddenFees.com. The page answers primary consumer questions about AI contract review and serves as the entity-defining resource for AI Contract Analysis.

## Primary Questions Answered

1. **What is AI contract review?**
2. **How does AI review contracts?**
3. **Can AI find risky contract terms?**
4. **Can AI detect hidden fees in contracts?**
5. **What types of contracts can AI analyze?**
6. **Is AI contract review accurate?**

## User Intent

| Dimension | Detail |
|-----------|--------|
| **Primary intent** | Informational / Comparative / Remedial |
| **Consumer stage** | Awareness → Evaluation → Decision |
| **Core need** | "I have a contract to sign and want to know if AI can protect me from hidden fees and bad terms" |
| **Post-read action** | Upload contract for AI analysis, compare AI vs lawyer costs, negotiate with findings |

## Target Audience

- Homeowners reviewing renovation/construction contracts
- Renters and lessees checking lease agreements
- Small business owners reviewing vendor/service contracts
- Freelancers checking client agreements
- Consumers reviewing auto financing, medical billing, and service contracts
- Anyone who signs contracts without legal representation

## Entities Covered

| Entity | Role | Relationship |
|--------|------|--------------|
| AI Contract Analysis | Primary | The core entity this hub defines |
| Contract Risk Analysis | Secondary | How AI assesses risk levels |
| Hidden Fees | Secondary | What the AI detects in contracts |
| Document Intelligence | Supporting | The technology powering analysis |
| AI Financial Advisor | Related | Cross-hub connection |
| AI Agreement Analyzer | Related | Cross-hub connection |
| AI Construction Contract Review | Related | Cross-hub connection |

## Internal Links (from hub page)

| Target Page | Anchor Text | Placement |
|-------------|-------------|-----------|
| contract-risk-analysis.html | How AI assesses contract risk | Body section |
| contract-red-flags.html | Common contract red flags AI detects | Body section |
| ai-contract-review-vs-lawyer-review.html | AI vs lawyer: Honest comparison | Body section |
| ai-contract-review-software.html | Features of our contract review software | Body section |
| analyze-my-contract.html | Upload your contract for AI analysis | Hero CTA |
| before-signing-contract-checklist.html | What to check before signing | Body section |
| ai-contract-review-vs-chatgpt.html | AI vs ChatGPT comparison | Body section |
| ai-construction-contract-review.html | AI Construction Contract Review | Related topics |
| ai-agreement-analyzer.html | AI Agreement Analyzer | Related topics |
| ai-financial-advisor.html | AI Financial Advisor | Related topics |
| find-hidden-fees-in-contract.html | Hidden fee detection in contracts | Body section |

## Inbound Links (to this hub page)

| From Page | Anchor Text |
|-----------|-------------|
| contract-risk-analysis.html | Back to AI contract review hub |
| contract-red-flags.html | How AI detects these red flags |
| analyze-my-contract.html | How AI contract review works |
| ai-contract-review-software.html | Part of AI contract review suite |
| before-signing-contract-checklist.html | Related: AI contract review |

## Schema Requirements

| Schema Type | Status |
|-------------|--------|
| Organization | Required |
| WebSite | Required |
| WebPage (with `about` entity: AI Contract Analysis) | Required |
| BreadcrumbList | Required |
| Article | Required |
| FAQPage (10-12 questions) | Required |
| SoftwareApplication | Required |

## Content Structure

```
1. HERO SECTION
   - Badge: AI CONTRACT REVIEW
   - H1: AI Contract Review: Find Hidden Fees and Risky Clauses Before You Sign
   - Short answer (50-150 words) — featured snippet candidate
   - Trust indicators: document types, timeframe, cost
   - Primary CTA → analyze-my-contract.html

2. HOW AI CONTRACT REVIEW WORKS (Timeline)
   - Step 1: Document extraction and OCR
   - Step 2: Clause-by-clause analysis
   - Step 3: Pattern detection and risk scoring
   - Step 4: Fee detection and pricing analysis
   - Step 5: Report generation with action items

3. TYPES OF CONTRACTS AI CAN REVIEW
   - Construction contracts
   - Service agreements
   - Vendor contracts
   - Lease agreements
   - Consulting agreements
   - Purchase agreements
   (Grid of cards with descriptions)

4. COMMON CONTRACT ISSUES AI CAN IDENTIFY
   - Hidden fees and surcharges
   - Automatic renewal clauses
   - Unclear payment terms
   - Risky clauses (unlimited liability, arbitration)
   - Unexpected obligations
   - Pricing manipulation

5. REAL-WORLD EXAMPLES
   - Example 1: The hidden auto-renewal ($1,200 saved)
   - Example 2: The uncapped liability trap (business protected)
   - Example 3: The escalating fee schedule ($1,100 saved over 5 years)

6. AI ACCURACY AND LIMITATIONS
   - What AI catches well (85-95% of patterns)
   - What AI misses (context, negotiation, jurisdiction)
   - AI + Human hybrid strategy
   - When to hire a lawyer

7. FAQ (10-12 questions with FAQPage schema)

8. RELATED TOPICS AND CROSS-HUB LINKS
   - AI Construction Contract Review
   - AI Agreement Analyzer
   - AI Financial Advisor
   - Hidden Fee Detection

9. FOOTER AND STICKY CTA BAR
```

## Unique Value

- **Differentiation from lawyers:** Clear cost comparison ($15 vs $500-$2,000+)
- **Differentiation from ChatGPT:** Specialized model vs general purpose
- **Real examples with dollar amounts:** Specific savings from actual user cases
- **AI + Human hybrid strategy:** Practical framework for when to use AI alone vs escalate
- **Industry coverage:** 6+ contract types with specific detection patterns
- **The "3-7 clauses" insight:** Average contract contains 3-7 money-losing clauses

## Content Quality Rules Applied

- [x] Original content — not rewritten from existing pages
- [x] Human readable — 8th-10th grade level
- [x] Specific examples — named scenarios with dollar amounts
- [x] Practical scenarios — real situations consumers face
- [x] No thin SEO content
- [x] No keyword stuffing
- [x] No generic AI writing patterns

## Mobile Optimization

- 320px minimum width supported
- Cards stack vertically on mobile
- Timeline collapses to smaller indicators
- Sticky CTA bar with pricing info
- Touch targets minimum 44x44px

## Validation Checklist

- [ ] H1 answers a specific consumer question
- [ ] First 150 words contain a direct, concise answer
- [ ] Schema validates (Organization, WebSite, WebPage, BreadcrumbList, Article, FAQPage, SoftwareApplication)
- [ ] FAQPage schema has 10-12 questions with proper formatting
- [ ] Internal links to 7+ related pages
- [ ] At least 3 real-world examples with dollar amounts
- [ ] Canonical URL correct
- [ ] Meta description 120-158 characters
- [ ] Open Graph and Twitter Card metadata present
- [ ] Design system compliance (colors, fonts, spacing, orbs)
- [ ] No console errors
- [ ] Mobile responsive at 320px, 480px, 768px, 1024px+
- [ ] No duplicate content from existing pages
- [ ] Last updated date visible
- [ ] Limitations section acknowledges AI is not legal advice