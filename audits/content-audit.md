# 🔍 Content Audit Process

## Systematic Content Quality Audit for DetectHiddenFees.com

This document defines the audit process for evaluating existing and new content pages. Every page on the site should be audited when created and re-audited quarterly.

---

## Audit Purpose

The content audit answers one question:

> **"Does this page deserve to exist on a site that claims to be the authority on AI financial transparency?"**

If the answer is no, the page must be improved or consolidated.

---

## Audit Frequency

| Audit Type | Frequency | Scope |
|------------|-----------|-------|
| **New Page Audit** | Before every page publish | Single page — full audit |
| **Quarterly Review** | Every 90 days | All pages published 90+ days ago |
| **Cluster Audit** | When a cluster reaches 10+ pages | All pages in the cluster — duplication check |
| **Emergency Audit** | When quality issues are flagged | Targeted pages |

---

## The 8-Question Audit Framework

For every page, answer these 8 questions:

### Question 1: Is This Page Answering a Real Question?

**Check:**
- Can you state the exact question this page answers in one sentence?
- Would a real consumer actually search for this question?
- Does the H1 reflect the actual question?

**Red Flags:**
- H1 is a keyword string, not a question or clear topic
- Page covers "everything about X" without a specific focus
- Content reads like it was written for search engines, not humans

**Verdict:**
- ✅ **Pass:** Clear, specific question that real consumers ask
- ⚠️ **Needs Work:** Question is vague or unfocused
- ❌ **Fail:** Page doesn't answer any identifiable consumer question

---

### Question 2: Is This Page Unique?

**Check:**
- Read the 3 most similar existing pages
- Is at least 60% of the content substantively different?
- Do the examples differ from every other page?
- Is there a distinct angle, not just different wording?

**Red Flags:**
- Same core explanation as another page, reworded
- Same or extremely similar examples
- Same section structure and headings
- Page could be a section in an existing page

**Verdict:**
- ✅ **Pass:** Genuinely unique angle, examples, or coverage
- ⚠️ **Needs Work:** Some overlap but distinct enough with improvement
- ❌ **Fail:** Near-duplicate — consolidate into existing page

---

### Question 3: Is This Page Thin?

**Check:**
- Word count of substantive content (not counting nav, footer, schema)
- Does each section contribute meaningful value?
- Are there "filler" paragraphs that could be removed without losing value?

**Thin Content Indicators:**
- Under 800 words for an informational page
- Multiple sections with fewer than 100 words each
- Lists without explanations
- "Definition-only" content with no examples
- FAQ that repeats information already in the body

**Verdict:**
- ✅ **Pass:** 800+ words of substantive, valuable content
- ⚠️ **Needs Work:** 500-800 words — expand the thinnest sections
- ❌ **Fail:** Under 500 words — substantial expansion needed or consolidate

---

### Question 4: Does This Page Sound Generic?

**Check for AI-generated filler patterns:**
- [ ] "In today's rapidly evolving landscape..."
- [ ] "It is important to note that..."
- [ ] "In conclusion..."
- [ ] "Furthermore, it is worth mentioning..."
- [ ] "Studies have shown..." (without citing specific studies)
- [ ] "Many experts agree..." (without naming anyone)
- [ ] "A comprehensive solution..."
- [ ] "Leveraging cutting-edge technology..."
- [ ] Three-paragraph introductions before getting to the point
- [ ] Conclusion paragraphs that just restate the introduction
- [ ] "Whether you're a [X] or a [Y], this [Z] is for you"

**The Reading Aloud Test:**
Read a paragraph out loud. Would you say this to a friend explaining the topic? If it sounds unnatural, robotic, or corporate, it's generic.

**Verdict:**
- ✅ **Pass:** Natural, conversational, human-written tone
- ⚠️ **Needs Work:** 1-2 generic phrases found — can be edited
- ❌ **Fail:** Heavy AI-generated feel — needs human rewrite

---

### Question 5: Does This Page Provide Examples?

**Check:**
- Count of concrete examples
- Quality of examples (specific dollar amounts, industries, scenarios?)
- Are examples unique to this page?

**Example Quality Scale:**
- **Excellent:** 2+ examples with specific dollar amounts, real industry context, before/after
- **Good:** 2+ examples with specifics but could be more detailed
- **Adequate:** 1-2 examples but generic (no dollar amounts, vague scenarios)
- **Poor:** Generic mention of "for example" with no specifics
- **None:** No examples at all

**Verdict:**
- ✅ **Pass:** 2+ specific, realistic examples
- ⚠️ **Needs Work:** Examples exist but are too generic
- ❌ **Fail:** No examples or only vague references

---

### Question 6: Does This Page Help Users?

**The "Better Off" Test:**
> If this were the only page on our site that a consumer ever saw, would they be better off for having read it?

**Check for actionable value:**
- [ ] Can the reader DO something after reading that they couldn't before?
- [ ] Are there specific action steps?
- [ ] Is there practical advice, not just information?
- [ ] Would a consumer bookmark this page? Share it? Recommend it?

**Verdict:**
- ✅ **Pass:** Clear actionable value — consumer can immediately apply the information
- ⚠️ **Needs Work:** Informative but not actionable — needs action steps
- ❌ **Fail:** No practical value — pure information with no "so what"

---

### Question 7: Does This Page Support Its Entity/Topic Cluster?

**Check:**
- Is the page mapped to a topic cluster in `knowledge/topic-clusters.json`?
- Does it link to its pillar page?
- Does it link to 3+ related pages in the cluster?
- Is the entity clearly named and consistent?

**Red Flags:**
- Orphan page with no cluster affiliation
- Uses different entity names than the canonical names in `entity-strategy.md`
- No internal links to related content
- Duplicates another page's role in the cluster

**Verdict:**
- ✅ **Pass:** Clearly part of a cluster, proper linking, consistent entity naming
- ⚠️ **Needs Work:** In cluster but missing some links or entity consistency
- ❌ **Fail:** Orphan page — needs cluster assignment and linking

---

### Question 8: Does This Page Deserve to Be Cited by AI Systems?

**The ultimate authority test.**

**Check:**
- [ ] Is the answer extractable as a standalone featured snippet?
- [ ] Is the information accurate and verifiable?
- [ ] Are sources cited?
- [ ] Is the page structured for AI extraction (FAQ schema, clear headings)?
- [ ] Is there a visible "last updated" date?
- [ ] Would an AI answer engine consider this the BEST answer available?

**Verdict:**
- ✅ **Pass:** AI-citation-ready — clear answer, proper schema, verifiable, fresh
- ⚠️ **Needs Work:** Good content but needs schema or structure improvements
- ❌ **Fail:** Not citation-worthy — thin, outdated, or poorly structured

---

## Audit Scoring

Score each question on a 1-5 scale:

| Score | Rating |
|-------|--------|
| 5 | Excellent — exceeds expectations |
| 4 | Good — meets all requirements |
| 3 | Adequate — meets minimum, room for improvement |
| 2 | Poor — significant issues |
| 1 | Failing — page should not exist in current form |

### Overall Audit Result:

```
Total Score: [Sum of 8 scores] / 40

35-40: 🏆 Authority-grade — maintain and protect
28-34: ✅ Solid — minor improvements only
21-27: ⚠️ Needs work — schedule improvements
14-20: 🔴 Significant issues — prioritize rewrite
8-13:  ❌ Failing — rewrite or consolidate immediately
```

---

## Audit Report Template

Every audit should produce a report in this format:

```markdown
# Content Audit: [Page Title]
**Date:** YYYY-MM-DD
**Auditor:** [Name/Role]
**Page URL:** [URL]

## Audit Results

| Question | Score (1-5) | Notes |
|----------|-------------|-------|
| 1. Answers a real question? | [ ] | |
| 2. Is unique? | [ ] | |
| 3. Is not thin? | [ ] | |
| 4. Doesn't sound generic? | [ ] | |
| 5. Provides examples? | [ ] | |
| 6. Helps users? | [ ] | |
| 7. Supports entity/cluster? | [ ] | |
| 8. Deserves AI citation? | [ ] | |

**Total:** [X] / 40

## Overall Verdict
[Pass / Needs Work / Fail]

## Content Scoring (from content-score.md)
- Authority: [0-100]
- Originality: [0-100]
- Answer Quality: [0-100]
- Depth: [0-100]
- AI Citation Potential: [0-100]
- User Value: [0-100]
- **Composite:** [0-100]

## Issues Found
1. [Issue]
2. [Issue]

## Recommended Actions
1. [Action] — Priority: [High/Medium/Low]
2. [Action] — Priority: [High/Medium/Low]

## Duplication Check
- Most similar page: [URL] — [X]% overlap
- Second most similar: [URL] — [X]% overlap
- Third most similar: [URL] — [X]% overlap

## Cluster Fit
- Cluster: [Name]
- Role in cluster: [Description]
- Properly linked: [Y/N]

## Sign-off
- [ ] Actions assigned
- [ ] current-state.json updated
- [ ] Task file created for fixes
```

---

## Post-Audit Workflow

### If Page Passes (35-40):
- Document audit results
- Schedule next audit in 90 days
- No immediate action needed

### If Page Needs Work (21-34):
1. Create a task file for improvements
2. Prioritize by score (lower scores first)
3. Implement improvements
4. Re-audit after changes
5. Update `current-state.json`

### If Page Fails (8-20):
1. **Immediately flag** — do not let failing content remain live
2. Decide: rewrite or consolidate?
3. If rewriting: create task, rewrite, re-audit
4. If consolidating: identify target page, merge content, set up 301 redirect
5. Update `current-state.json` and `topic-map.json`

---

## Quarterly Cluster Audit

Every 90 days, audit an entire topic cluster:

1. **List all pages** in the cluster from `topic-clusters.json`
2. **Check for orphans** — pages that should be in the cluster but aren't
3. **Check for duplicates** — pages with >60% overlap
4. **Check for gaps** — questions in the cluster with no answering page
5. **Score each page** using the 8-question framework
6. **Prioritize fixes** — worst pages first
7. **Document findings** in a cluster audit report

---

> **Auditing is not about finding fault — it's about maintaining the standard that earns AI citation authority. Every page that doesn't meet the standard dilutes every page that does.**