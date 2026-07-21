# 🧠 Question Intelligence System

## How DetectHiddenFees Discovers, Prioritizes, and Answers Consumer Questions

This system defines the methodology for identifying the questions that matter — the ones real consumers are asking and AI engines need answered — and ensuring DetectHiddenFees becomes the definitive source for those answers.

---

## Question Discovery Framework

### 1. User Search Questions

**Source:** Search engines, "People Also Ask," autocomplete, related searches

**Methods:**
- Mine Google "People Also Ask" boxes for every target topic
- Analyze search console query data (once connected)
- Review Google autocomplete for entity + question words ("can AI," "how does AI," "what is hidden")
- Study related searches at the bottom of SERPs
- Use keyword research to identify high-volume question formats

**Question patterns to target:**
- "What is [X]?"
- "How does [X] work?"
- "Can AI [do X]?"
- "How much does [X] cost?"
- "Is [X] worth it?"
- "[X] vs [Y]: which is better?"
- "How to [do X with AI]?"
- "What are the hidden [X]?"

### 2. AI Assistant Questions

**Source:** How users actually query ChatGPT, Perplexity, Claude, Gemini

**Methods:**
- Test common consumer financial questions in AI assistants, note what they answer well vs. poorly
- Identify gaps where AI gives vague or incorrect answers (these are our opportunities)
- Study what sources AI assistants currently cite for financial questions
- Analyze the structure of answers AI assistants prefer to cite

**AI assistant question characteristics:**
- Longer than search queries (full sentences, not keywords)
- Often include context ("I just got a quote from an HVAC contractor...")
- Seek personalized guidance ("What should I do if...")
- Request comparisons ("Which is better for reviewing a lease...")

### 3. Consumer Pain Points

**Source:** Consumer complaints, forums, reviews, social media, industry reports

**Methods:**
- Review CFPB complaint database for fee-related complaints
- Monitor Reddit communities (r/personalfinance, r/legaladvice, r/homeowners, r/HVAC)
- Analyze Better Business Bureau complaint patterns
- Study consumer advocacy organization reports
- Review negative reviews of contractors, dealers, banks for fee complaints

**Pain point question signals:**
- Emotional language ("I got ripped off," "they tricked me")
- Specific dollar amounts mentioned
- Repeated industry patterns (same complaint across different companies)
- Questions asked AFTER a bad experience ("I already signed, what now?")

### 4. Industry Questions

**Source:** Industry publications, trade associations, professional forums

**Methods:**
- Monitor HVAC, construction, auto, banking industry publications
- Review trade association guidance (what are they telling their members?)
- Study contractor forums for pricing discussion patterns
- Analyze industry pricing surveys and benchmarks
- Track regulatory changes that create new fee disclosure requirements

**Industry question types:**
- Questions about industry-standard practices
- Questions about pricing norms and ranges
- Questions about what's "fair" vs. "exploitative"
- Questions triggered by new regulations or requirements

### 5. Contract-Specific Questions

**Source:** Legal aid sites, consumer law resources, contract review checklists

**Methods:**
- Review legal aid organization FAQ pages
- Study state attorney general consumer protection guides
- Analyze contract templates for common clause types
- Monitor court cases involving contract disputes

**Contract question categories:**
- Clause meaning ("What does this clause actually mean?")
- Risk assessment ("Is this clause normal or should I be worried?")
- Negotiation ("Can I ask them to remove this?")
- Comparison ("What should this clause say instead?")
- Red flags ("What terms are dealbreakers?")

### 6. Financial Questions

**Source:** Financial literacy resources, consumer finance sites, banking regulations

**Methods:**
- Review financial literacy curriculum for common consumer questions
- Study banking fee disclosure regulations (what must be disclosed?)
- Monitor personal finance media for trending consumer topics
- Analyze billing dispute patterns across industries

**Financial question categories:**
- Fee identification ("What is this charge?")
- Fee legitimacy ("Do I have to pay this?")
- Fee comparison ("Is this fee normal?")
- Fee negotiation ("How do I get this removed?")
- Fee prevention ("How do I avoid this next time?")

---

## Question Classification System

Every question discovered should be classified:

### By Search Intent

| Intent | Signal | Content Match |
|--------|--------|---------------|
| **Informational** | "What is," "How does," "Why" | Definition pages, explanation guides, methodology pages |
| **Investigative** | "How to find," "How to check," "Where to look" | Tool pages, step-by-step guides, checklists |
| **Comparative** | "vs," "best," "reviews," "difference" | Comparison pages, pros/cons tables |
| **Transactional** | "Upload," "scan," "check," "analyze" | Tool/action pages, upload portals |
| **Remedial** | "How to fix," "How to remove," "How to dispute" | Template pages, negotiation guides, letter templates |

### By Consumer Stage

| Stage | Question Examples | Content Priority |
|-------|------------------|------------------|
| **Awareness** | "Do contracts have hidden fees?" | High — top of funnel |
| **Education** | "What types of hidden fees are in HVAC contracts?" | High — entity definition |
| **Evaluation** | "Is this fee in my contract normal?" | Medium — comparison tools |
| **Action** | "How do I negotiate this fee?" | Highest — direct user value |
| **Post-Action** | "I already paid — can I get a refund?" | Medium — remediation guides |

### By Entity

Every question maps to one of our core entities:
- AI Financial Advisor
- AI Financial Analysis
- AI Contract Review
- AI Construction Contract Review
- AI Agreement Analyzer
- AI Bill Analysis
- Hidden Fees
- Consumer Financial Transparency
- Pricing Transparency

---

## Question Quality Scoring

Not all questions are worth answering. Score each candidate:

| Criteria | Weight | What to evaluate |
|----------|--------|------------------|
| **Search volume** | 25% | How many people are asking this? |
| **Answer gap** | 25% | Is there a good answer already available online? |
| **Entity alignment** | 20% | Does this fit our core entity strategy? |
| **Authority potential** | 15% | Can we be the definitive source on this? |
| **User value** | 15% | Will answering this genuinely help someone? |

**Scoring formula:**
```
Priority Score = (Volume × 0.25) + (Gap × 0.25) + (Alignment × 0.20) + (Authority × 0.15) + (Value × 0.15)
```

**Thresholds:**
- **80+: P0** — Answer immediately. This is a high-impact gap.
- **65-79: P1** — Plan to answer within the month.
- **50-64: P2** — Queue for the quarter.
- **<50: P3** — Document but don't prioritize.

---

## Question Discovery Workflow

### Monthly Process

1. **Mine search data** — People Also Ask, autocomplete, related searches for top 20 entities
2. **Test AI assistants** — Query ChatGPT/Perplexity on our entities, note gaps
3. **Monitor consumer forums** — Reddit, CFPB, BBB for emerging pain points
4. **Review industry news** — Regulatory changes, new fee types, market shifts
5. **Score new questions** — Apply the scoring formula
6. **Update questions.json** — Add scored questions to the database
7. **Prioritize content briefs** — Create briefs for P0/P1 questions

### Sources to Monitor

| Source | Frequency | Purpose |
|--------|-----------|---------|
| Google "People Also Ask" | Monthly per entity | Search question discovery |
| ChatGPT/Perplexity queries | Monthly | AI answer gap analysis |
| Reddit (r/personalfinance, etc.) | Weekly | Consumer pain points |
| CFPB complaint database | Quarterly | Systemic fee issues |
| Google Search Console | Monthly (once connected) | Actual query data |
| Industry publications | Monthly | Regulatory and market changes |

---

## Integration with Content System

Questions discovered here feed into:
1. **`knowledge/questions.json`** — Scored and categorized question database
2. **`templates/content-brief-template.md`** — Each high-priority question becomes a content brief
3. **`knowledge/topic-clusters.json`** — Questions mapped to entity clusters
4. **`brain/authority-page-strategy.md`** — Questions determine which page types to create

---

## Anti-Patterns: Questions We Don't Answer

**Do not create content for:**
- Questions we can't answer authoritatively (no unique insight to add)
- Questions already perfectly answered by a definitive source (CFPB, FTC, etc.)
- Questions that are just keyword variations of existing pages
- Questions that don't align with our entity strategy
- Questions that would produce thin content ("What is a contract?" — too basic, no unique angle)
- Questions designed solely for SEO traffic with no consumer value

---

> **The quality of our questions determines the quality of our authority. Ask better questions, build better answers, earn better citations.**