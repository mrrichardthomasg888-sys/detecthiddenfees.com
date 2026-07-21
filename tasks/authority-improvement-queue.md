# 📋 Authority Improvement Queue

**Created:** 2026-07-21
**Based on:** Full site audit (inventory, content quality, entity authority, internal linking)
**Status:** READY FOR EXECUTION

---

## Priority Legend

| Priority | Definition | Execute When |
|----------|-----------|-------------|
| **P0** | Critical — site authority fundamentally broken without this | Immediately |
| **P1** | High — major authority improvement, significant ROI | This month |
| **P2** | Medium — meaningful improvement, moderate effort | This quarter |

---

## P0 — Critical Priority (Execute Immediately)

### Task P0-1: Add Primary Navigation Menu to All Pages
- **Goal:** Implement a consistent 6-item navigation menu in the header of every v2 page
- **Reason:** Currently every page except the homepage is an orphan. No navigation = no PageRank flow, no user navigation, no crawler discovery of topic clusters. This is the single biggest authority blocker.
- **Files Affected:** All ~175 v2 HTML pages
- **Approach:** Design menu once, apply via template update or script to all pages
- **Expected Authority Improvement:** +15-20 points across all entity scores (navigation unlocks internal linking)
- **Acceptance Criteria:**
  - [ ] Navigation menu visible on every page
  - [ ] Links to: Home, Contract Review, Financial Analysis, Hidden Fees, Resources, Tools
  - [ ] Active state shown on current section
  - [ ] Mobile: simplified layout (hamburger or stacked)
  - [ ] CSS for `.nav-links` actually used (currently dead CSS)

### Task P0-2: Standardize Brand Name to "DetectHiddenFees"
- **Goal:** Eliminate the "Detect Hidden Fees" (with spaces) brand variant across all pages and schema
- **Reason:** AI engines see two different organization names. Schema.org has conflicting Organization data. This prevents Knowledge Graph entry.
- **Files Affected:** ~25-35 v1 legacy pages, all schema blocks using old name
- **Expected Authority Improvement:** +10-15 points entity recognition
- **Acceptance Criteria:**
  - [ ] 100% of pages use "DetectHiddenFees" (no spaces)
  - [ ] 100% of Organization schema uses "DetectHiddenFees"
  - [ ] Logo text consistent across all pages

### Task P0-3: Remove or Convert v1 Legacy Pages
- **Goal:** Eliminate the light-theme legacy design system entirely
- **Reason:** Two competing design systems (v1 light/navy, v2 dark/blue) create visual brand split, duplicate content risk, and maintanance burden
- **Files Affected:** ~25-35 v1 pages
- **Action:** For each v1 page, either:
  - **Convert** to v2 design system (if content is unique and valuable)
  - **301 redirect** to equivalent v2 page (if v2 version already covers the topic)
  - **Delete** (if content is thin and covered elsewhere)
- **Expected Authority Improvement:** +5-10 points design consistency + elimination of duplicate content risk
- **Acceptance Criteria:**
  - [ ] Zero pages using the v1 light theme design
  - [ ] Brand name "DetectHiddenFees" consistent everywhere
  - [ ] All pages use dark `#020617` background + Inter font + glow orbs
  - [ ] No external `style.css` dependency (v1 artifact)

---

## P1 — High Priority (Execute This Month)

### Task P1-1: Consolidate AI Contract Review Entity
- **Goal:** Merge 3 competing pages into 1 definitive pillar
- **Reason:** `ai-contract-review.html`, `ai-contract-analysis.html`, `contract-analysis-ai.html` all target the same entity. This is the biggest entity dilution problem on the site. AI engines won't cite any of them because authority is split three ways.
- **Files Affected:**
  - KEEP and strengthen: `ai-contract-review.html`
  - MERGE content into above: `ai-contract-analysis.html`, `contract-analysis-ai.html`
  - ADD 301 redirects: `ai-contract-analysis.html` → `ai-contract-review.html`, `contract-analysis-ai.html` → `ai-contract-review.html`
- **Expected Authority Improvement:** Entity score 55/100 → 80/100
- **Acceptance Criteria:**
  - [ ] Only one canonical page for AI Contract Review entity
  - [ ] Best content from all 3 pages merged into the canonical
  - [ ] 301 redirects working for the two retired URLs
  - [ ] Updated `_headers` with redirect rules
  - [ ] Updated `topic-map.json` and `topic-clusters.json`

### Task P1-2: Add Quick-Answer Sections to Top 20 Pages
- **Goal:** Restructure top pages so a direct answer appears in the first 150 words
- **Reason:** Most pages bury the answer behind 200+ words of introduction. AI engines extract featured snippets from the first paragraph. No quick answer = no featured snippet = no AI citation.
- **Files Affected:** 20 most important informational pages
- **Expected Authority Improvement:** +10-15 points AEO/citation potential
- **Acceptance Criteria:**
  - [ ] Each page has a clear answer in first 150 words
  - [ ] Answer is extractable as standalone featured snippet
  - [ ] Answer includes key facts (numbers, timeframes, comparisons)
  - [ ] No marketing fluff in quick-answer section

### Task P1-3: Strengthen Pillar-to-Supporting Internal Links
- **Goal:** Every pillar page links to ALL supporting pages in its cluster with descriptive link text
- **Reason:** Current pillar pages list only a few related tools. Supporting pages are orphaned from their own pillar. This breaks topic cluster architecture.
- **Files Affected:** 9 pillar pages + ~60 supporting pages
- **Expected Authority Improvement:** +10 points internal linking + cluster authority
- **Acceptance Criteria:**
  - [ ] Each pillar page has a "Explore [Entity] Tools & Guides" section
  - [ ] Every supporting page in the cluster is linked from the pillar
  - [ ] Link text includes value proposition, not just page title
  - [ ] Each supporting page links back to its pillar

### Task P1-4: Merge Remaining Duplicate Page Pairs
- **Goal:** Eliminate all duplicate content clusters identified in the inventory
- **Reason:** 8+ duplicate page pairs dilute authority and confuse both users and AI crawlers
- **Files Affected:** 12-16 pages → consolidate to 6-8 pages
- **Duplicate pairs to resolve:**
  - `ai-contract-review-software.html` ↔ `contract-review-ai-software.html`
  - `ai-purchase-agreement-review.html` ↔ `ai-purchase-contract-review.html`
  - `ai-lease-review.html` ↔ `ai-rental-lease-analyzer.html`
  - `find-hidden-fees-in-contract.html` ↔ `detect-hidden-contract-fees.html`
  - `financial-analysis-software.html` ↔ `financial-analysis-tools.html`
  - `free-ai-contract-review-vs-paid-review.html` ↔ `free-vs-paid-contract-review.html` (redirect exists)
- **Expected Authority Improvement:** +5-10 points originality + eliminate cannibalization
- **Acceptance Criteria:**
  - [ ] One canonical page per intent
  - [ ] 301 redirects from retired URLs
  - [ ] Updated `_headers`, `topic-map.json`, `topic-clusters.json`
  - [ ] `ai-contract-risk-score.html` and `contract-risk-score.html` (redirect already in `_headers`)

### Task P1-5: Build Canonical "What Is Hidden Fee Detection?" Entity Page
- **Goal:** Create a clear definition page for the Hidden Fee Detection entity
- **Reason:** `hidden-fees-guides.html` is a hub/directory, not a definition. No single page clearly defines "Hidden Fee Detection" as an entity. This is a gap for AI recognition.
- **Files Affected:**
  - ENHANCE: `hidden-fees-guides.html` — add strong entity definition section at top, OR
  - CREATE: `what-is-hidden-fee-detection.html` — dedicated entity definition page
- **Expected Authority Improvement:** Entity score 65/100 → 80/100
- **Acceptance Criteria:**
  - [ ] Clear entity definition visible on canonical page
  - [ ] FAQPage schema with entity-specific questions
  - [ ] Links to all supporting industry guides
  - [ ] Entity name consistently "Hidden Fee Detection" or defined canonical name

### Task P1-6: Expand Thin Hub Pages
- **Goal:** Transform hub/resource center pages from bare link directories into rich navigation hubs
- **Reason:** Hub pages currently function as link lists with minimal context. They should be comprehensive entry points that demonstrate entity authority.
- **Files Affected:** 6 hub pages:
  - `hidden-fees-guides.html`
  - `consumer-negotiation-resource-center.html`
  - `bill-negotiation-resource-center.html`
  - `ai-analysis-hub.html`
  - `ai-contract-resource-center.html`
  - `ai-document-intelligence-center.html`
- **Expected Authority Improvement:** +5-10 points hub authority + user navigation
- **Acceptance Criteria:**
  - [ ] Each hub page has a clear entity definition at top
  - [ ] All links include descriptive one-sentence value propositions
  - [ ] Minimum 800 words of substantive content (not just links)
  - [ ] FAQ section on each hub page
  - [ ] Clear call-to-action for the primary tool/action

---

## P2 — Medium Priority (Execute This Quarter)

### Task P2-1: Add 2+ Concrete Examples to Thin Pages
- **Goal:** Ensure every informational page has at least 2 specific, realistic examples
- **Reason:** ~40% of pages lack concrete examples with dollar amounts. Examples are what make content citable by AI engines.
- **Files Affected:** ~15-20 informational pages currently thin on examples
- **Expected Authority Improvement:** +5 points originality + user value
- **Acceptance Criteria:**
  - [ ] Every informational page has 2+ examples
  - [ ] Examples include specific dollar amounts, industries, scenarios
  - [ ] Examples are unique (not copy-pasted across pages)

### Task P2-2: Submit Sitemap to Search Engines
- **Goal:** Get all 179+ URLs indexed by Google and Bing
- **Reason:** Sitemap exists but has not been submitted. Faster indexing = faster authority building.
- **Files Affected:** `sitemap.xml` (exists), need `robots.txt`
- **Expected Authority Improvement:** Indirect — faster indexing of all content
- **Acceptance Criteria:**
  - [ ] `robots.txt` created pointing to sitemap
  - [ ] Sitemap submitted to Google Search Console
  - [ ] Sitemap submitted to Bing Webmaster Tools
  - [ ] Verified: all important pages indexed

### Task P2-3: Add Cross-Cluster Contextual Links
- **Goal:** Connect related content across topic clusters
- **Reason:** Pages in different clusters that cover related topics (e.g., hidden HVAC fees and AI construction contract review) don't link to each other. Cross-cluster links strengthen topical authority signals.
- **Files Affected:** ~40 pages — add 1-2 cross-cluster links per page
- **Expected Authority Improvement:** +3-5 points topical authority
- **Acceptance Criteria:**
  - [ ] Each page links to 1-2 pages in adjacent clusters
  - [ ] Links are contextual (in body text, not just "see also")
  - [ ] Link text describes why the linked page is relevant

### Task P2-4: Update "Last Updated" Dates Site-Wide
- **Goal:** Ensure every page displays a current "last updated" date
- **Reason:** Freshness is a key AI citation signal. Pages without dates appear abandoned.
- **Files Affected:** All ~175 v2 pages
- **Expected Authority Improvement:** +3-5 points freshness signal
- **Acceptance Criteria:**
  - [ ] Every page shows "Last updated: [recent date]"
  - [ ] `dateModified` in WebPage schema updated
  - [ ] Pages actually reviewed/verified, not just date-stamped

### Task P2-5: Build or Remove Consumer Financial Transparency Entity
- **Goal:** Either properly establish this entity with a definition page, schema, and supporting cluster — or remove it from the entity strategy
- **Reason:** Currently this entity exists in theory but has NO definition page, NO consistent naming, NO schema, and NO cluster linking. Entity score: 30/100.
- **Files Affected:**
  - If BUILD: Create `consumer-financial-transparency.html`, link editorial/transparency pages to it
  - If REMOVE: Update `entity-strategy.md` and `entities.json` to drop the entity
- **Expected Authority Improvement:** +5 points entity honesty (either way)
- **Acceptance Criteria (if build):**
  - [ ] Clear definition page for Consumer Financial Transparency
  - [ ] Editorial policy, data handling, methodology pages linked as supporting cluster
  - [ ] FAQPage schema on definition page
  - [ ] Entity score improves from 30 → 65+
- **Acceptance Criteria (if remove):**
  - [ ] Entity removed from `entity-strategy.md`
  - [ ] Entity removed from `entities.json`
  - [ ] Related pages re-mapped to nearest entity cluster

### Task P2-6: Sharpen AI Agreement Analyzer Entity Definition
- **Goal:** Make the "AI Agreement Analyzer" entity more distinct from "AI Contract Review"
- **Reason:** The agreement analyzer entity is too broad — covering leases, employment, freelance, service, purchase agreements. The distinction from "contract review" is unclear.
- **Files Affected:** `ai-agreement-analyzer.html` + 10 agreement-type pages
- **Expected Authority Improvement:** Entity score 62/100 → 75/100
- **Acceptance Criteria:**
  - [ ] Clear explanation of "agreement" vs "contract" for this entity's purposes
  - [ ] Entity page lists specific agreement types covered
  - [ ] Examples specific to agreement analysis (not just contract review)
  - [ ] Distinct from ai-contract-review.html

---

## Implementation Sequence

```
Week 1 (P0 — Critical):
├── P0-1: Navigation menu (highest impact, unlocks everything else)
├── P0-2: Brand name standardization
└── P0-3: v1 legacy page cleanup

Week 2-3 (P1 — High):
├── P1-1: Consolidate AI Contract Review entity
├── P1-2: Quick-answer sections on top 20 pages
├── P1-4: Merge duplicate page pairs
└── P1-5: Hidden Fee Detection entity definition

Week 4 (P1 continued):
├── P1-3: Pillar-to-supporting links
└── P1-6: Expand hub pages

Month 2-3 (P2 — Medium):
├── P2-1: Examples on thin pages
├── P2-2: Sitemap submission
├── P2-3: Cross-cluster links
├── P2-4: "Last updated" dates
├── P2-5: Consumer Financial Transparency decision
└── P2-6: AI Agreement Analyzer sharpening
```

---

## Expected Cumulative Impact

| Metric | Current | After P0 | After P1 | After P2 |
|--------|---------|----------|----------|----------|
| Average entity score | 63/100 | 73/100 | 80/100 | 85/100 |
| Pages with navigation | 0% | 100% | 100% | 100% |
| Duplicate page clusters | 8+ | 5+ | 0 | 0 |
| Design systems | 2 | 1 | 1 | 1 |
| Brand name variants | 2 | 1 | 1 | 1 |
| Content audit avg score | 29/40 | 29/40 | 33/40 | 35/40 |
| Hub page avg depth | ~500 words | ~500 words | 1,200+ words | 1,200+ words |
| Cross-cluster links/page | ~0-1 | ~0-1 | ~1-2 | 2-3 |
| Pages with quick-answer | ~30% | ~30% | 80%+ | 100% |

---

## Task Completion Rules

Each task must follow the rules in `/tasks/README.md`:
- Create `TASK-XXX.md` file with full task definition
- Complete all acceptance criteria
- Pass quality gates from `brain/quality-gates.md`
- Update `brain/current-state.json`
- Commit with `[TASK-XXX]` prefix
- Push to GitHub

---

> **This queue transforms the site from a collection of disconnected pages into a coherent authority platform. Execute in order — P0 first, P1 second, P2 third. Each phase builds on the previous.**