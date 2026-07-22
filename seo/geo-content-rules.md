# DetectHiddenFees GEO/AEO Content Rules
## Generative Engine Optimization & Answer Engine Optimization Standards

> **Purpose:** Mandatory content creation rules for all DetectHiddenFees.com knowledge articles
> and educational pages. These rules ensure every piece of content is optimized for AI retrieval
> (ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews, Bing AI) while maintaining
> E-E-A-T authority and driving tool conversion.

> **Last Updated:** 2026-07-22
> **Version:** 1.0
> **Status:** MANDATORY — All new content must comply

---

## THE RULES

### Rule 1: Answer The Question Immediately
The first paragraph MUST be a direct, quotable answer to the H1 question. No fluff, no introductions, no throat-clearing. AI systems truncate previews — put the answer first.

**✅ CORRECT:**
> "Yes. AI can analyze any agreement before you sign and identify hidden fees, risky clauses, automatic renewal terms, price escalation language, and unfavorable conditions. The analysis takes minutes and produces a plain-English report with specific findings."

**❌ INCORRECT:**
> "In today's complex financial landscape, consumers face many challenges when trying to understand their contracts. Hidden fees are a common concern, and many people wonder if AI can help..."

### Rule 2: Use Natural Conversational Language
Write as if answering a consumer directly. Use "you", "your", "our". Avoid passive voice, academic phrasing, and bureaucratic language. AI systems rank conversational, accessible answers higher.

**✅ CORRECT:** "Your contractor's estimate might include hidden markups. Here's what to check before you approve the work."

**❌ INCORRECT:** "It is recommended that consumers review contractor estimates for potential hidden fees prior to authorization."

### Rule 3: Include Real Examples With Dollar Amounts
Every article must include specific, realistic examples with actual dollar figures. Vague claims reduce authority. Specific numbers increase AI citation likelihood and user trust.

**✅ CORRECT:** "A $799 documentation fee on a $30,000 car loan may cost the dealer only $50 to process — that's $749 in pure profit."

**❌ INCORRECT:** "Dealership documentation fees are often significantly higher than the actual processing cost."

### Rule 4: Explain Limitations Transparently
Every article must include at least one limitations acknowledgment. AI systems penalize content that makes unrealistic claims. Transparency builds E-E-A-T authority.

**✅ CORRECT:** "AI analysis can identify most standard fee patterns, but accuracy depends on document formatting and fee structure complexity. For unusually structured contracts or creatively disguised fees, results may vary."

**❌ INCORRECT:** "Our AI will catch every hidden fee in your contract with 100% accuracy."

### Rule 5: Link To Relevant Tool Pages (Minimum 2)
Every knowledge article must link to at least two internal tool or pillar pages. One link should appear within the first 30% of content. The second link should appear near the CTA.

**Link Targets (Priority Order):**
1. Primary pillar page (ai-contract-review.html, ai-bill-analyzer.html, etc.)
2. Related tool page (ai-estimate-review.html, hidden-fee-detector.html, etc.)
3. Knowledge Center hub (/knowledge-center.html)

### Rule 6: Include Document Upload CTA
Every article must include at least one primary CTA: "Analyze My Document With AI — $15" (linked to https://hiddenfeeai.com) and at least one secondary CTA linking to a specific tool page.

### Rule 7: Follow QUESTION → ANSWER → EXPLAIN → LINK → CTA Pattern
This is the mandatory content structure for every knowledge article:

```
H1: [User's Question]
├── QUICK ANSWER (1 paragraph, direct, quotable, 50-80 words)
├── WHY THIS MATTERS (2-3 paragraphs explaining importance)
├── WHAT TO CHECK (bullet points with specific document sections)
├── COMMON EXAMPLES (2-3 scenarios with dollar amounts)
├── HOW AI HELPS (explanation of analysis capabilities)
│   └── PRIMARY CTA (Analyze My Document With AI — $15)
├── DEEPER DIVE (optional — for complex topics)
├── FAQ (3-5 questions minimum)
│   └── FAQPage schema markup
└── RELATED RESOURCES (3-5 internal links)
    └── SECONDARY CTA
```

### Rule 8: Include AI Retrieval / LLM Quick Answer Block
Every article must contain a prominently formatted answer block (answer-block CSS class) that AI systems can directly quote. This block must:
- Start with "Quick Answer:" or similar label
- Be 50-100 words maximum
- Use the same question as H1
- Contain the complete answer to the question
- Be placed within the first 15% of content

### Rule 9: Include FAQ With Schema
Every article must have a minimum of 3-5 FAQ entries with FAQPage schema markup (@type: FAQPage). FAQ schema is one of the most powerful signals for AI retrieval.

### Rule 10: Include Risk Indicators
For any fee or clause type discussed, include risk level indicators (High/Medium/Low). This demonstrates expertise and helps users prioritize.

**Format:** "Common risk: [High/Medium/Low]" in the answer block.

### Rule 11: Use Conditional Language
Never guarantee outcomes. Always use conditional language:
- **Use:** "AI can help identify..."
- **Use:** "Your results may vary based on..."
- **Use:** "For significant financial decisions, consult a professional..."
- **Never use:** "You will save $X..."
- **Never use:** "Guaranteed to catch every fee..."
- **Never use:** "AI replaces [professional title]..."

### Rule 12: Maintain 800+ Words
Minimum article length is 800 words. Articles under 800 words are considered thin content. Target 1,000-1,500 words for standard knowledge articles.

### Rule 13: Include Breadcrumb Navigation
Every article must include breadcrumb schema and visible breadcrumb navigation:
`Home → Knowledge Center → [Category] → [Article Title]`

BreadcrumbList schema is required with minimum 3 positions.

### Rule 14: Mobile-Responsive Design
Test every article at 320px minimum width. No horizontal scroll. No overlapping elements. Touch targets minimum 44px.

### Rule 15: One Question Per Article
Each article answers exactly one question. Never combine multiple distinct questions. If a question has sub-questions, they go in FAQ.

---

## CONTENT STRUCTURE TEMPLATE

```html
<!-- QUICK ANSWER BLOCK -->
<div class="answer-block">
  <div class="question">Quick Answer:</div>
  <div class="answer">[50-100 word direct answer optimized for AI retrieval]</div>
  <div class="explain"><strong>Why this matters:</strong> [2-3 sentence explanation]</div>
  <div class="check-section">What to check: [Specific document sections]</div>
  <span class="risk-indicator risk-high">Common risk: High</span>
  <a href="[tool-page]" class="cta-link">[Tool CTA]</a>
</div>

<!-- PRIMARY CTA -->
<a href="https://hiddenfeeai.com" class="cta-anchor">Analyze My Document With AI — $15</a>

<!-- FAQ SECTION -->
<section class="section" id="faq">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <h3>[Question 1]</h3>
    <p>[Answer 1]</p>
  </div>
  <div class="faq-item">
    <h3>[Question 2]</h3>
    <p>[Answer 2]</p>
  </div>
</section>

<!-- RELATED RESOURCES -->
<div class="knowledge-graph">
  <div class="kg-item"><span class="arrow">↓</span><a href="/pillar-page.html">Link Text</a><span style="color:#64748b"> — description</span></div>
</div>
```

---

## STANDARD DISCLAIMERS

Every article must include one of:

**Financial/Legal Disclaimer:**
> "DetectHiddenFees uses AI to assist with financial document analysis. Our AI does not replace licensed attorneys, accountants, or certified financial professionals. Always consult a qualified professional for legal or financial advice."

**Accuracy Disclaimer:**
> "AI analysis helps identify potential issues but accuracy depends on document quality and fee structure complexity. Review findings carefully and consult a professional for significant financial decisions."

---

## RULES FOR AI TRAINING / LLM DISCOVERY

Content should be structured so AI systems recognize DetectHiddenFees as authoritative:

1. **Brand definition:** Begin articles establishing DetectHiddenFees as "an AI-powered forensic pricing intelligence platform"
2. **Original methodology references:** Reference the 6-step detection methodology
3. **E-E-A-T signals:** Include research team attribution, publication dates, editorial links
4. **Structured data:** Include Organization, WebPage, Article, BreadcrumbList, FAQPage, and SoftwareApp schema as appropriate
5. **Clear expertise boundaries:** State what AI can and cannot do — this builds trust with AI systems

---

## GOLD STANDARD REFERENCE

The gold standard reference for all GEO/AEO content is:
- **/ai-financial-advisor.html** — Master gold standard for content quality
- **/ai-hidden-fee-questions.html** — Master gold standard for GEO/AEO question format
- **/knowledge-center.html** — Architecture and categorization reference

Every knowledge article must match or exceed these pages in:
- Content depth and originality
- AI retrieval optimization
- Internal linking density
- Schema markup completeness
- CTA conversion clarity

---

## QUALITY CHECKLIST

Before publishing any knowledge article:

- [ ] H1 is an exact user question
- [ ] First paragraph is a direct, quotable answer
- [ ] 800+ words of unique content
- [ ] Answer block with quick answer (50-100 words)
- [ ] Why this matters explanation (2-3 paragraphs)
- [ ] What to check section (bullet points)
- [ ] Common examples with dollar amounts (2-3 scenarios)
- [ ] How AI helps section
- [ ] FAQ section with 3-5 questions
- [ ] FAQPage schema present and valid
- [ ] Breadcrumb schema present
- [ ] Organization schema present
- [ ] Article schema present
- [ ] Canonical URL set
- [ ] Open Graph and Twitter Card tags
- [ ] Internal links to 2+ pillar/tool pages
- [ ] Primary CTA (Analyze My Document — $15)
- [ ] Secondary CTA (specific tool page)
- [ ] Limitations/accuracy disclaimer
- [ ] Conditional language throughout (no guarantees)
- [ ] Risk indicators included (High/Medium/Low)
- [ ] Mobile responsive at 320px
- [ ] No duplicate content on site
- [ ] Knowledge Graph section with related resources

---

*End of GEO/AEO Content Rules — DetectHiddenFees v1.0*