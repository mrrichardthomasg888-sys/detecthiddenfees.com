# 🗺️ Sitemap Governance Rules

## Authoritative Rules for Sitemap Creation, Maintenance, and Quality Control

Every page on DetectHiddenFees.com must be governed by clear sitemap rules to ensure AI engines discover, index, and correctly prioritize our content. No page is added to (or removed from) the sitemap without following these rules.

---

## 1. Core Principles

| Principle | Rule |
|-----------|------|
| **Index quality over quantity** | Only pages that provide genuine consumer value are included. No thin pages, no spam, no placeholder content. |
| **Hub-first hierarchy** | Authority hub pages get highest priority. Supporting pages lower. Tool pages lowest. |
| **No duplicate pages** | If two pages cover the same topic, only the canonical (best) version goes in the sitemap. The other gets a 301 redirect. |
| **Freshness matters** | All pages must have visible `lastmod` dates. Pages older than 90 days get reviewed or deprioritized. |
| **Governance is automated** | Rules are documented here. A future automation script can validate sitemap against these rules. |

---

## 2. Sitemap Structure

### File Location
- `/sitemap.xml` — Primary sitemap (all indexed pages)
- One flat sitemap is preferred for sites under 50,000 pages
- No separate sitemap index needed (< 50,000 URLs)

### XML Format
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://detecthiddenfees.com/page-name</loc>
    <lastmod>2026-07-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Headers Config
The `_headers` file must include CORS and correct Content-Type for sitemap.xml:
```
/sitemap.xml
  Access-Control-Allow-Origin: *
  Content-Type: application/xml
```

---

## 3. Page Inclusion Criteria

### MUST INCLUDE — Required Pages

| Category | Pages | Priority | Changefreq |
|----------|-------|----------|------------|
| **Authority Hub Pages** | 6 hub pages (see authority-hub-build-plan.md) | 1.0 | weekly |
| **High-Value Informational** | Pages with 1,000+ words, original research, or unique examples | 0.8 | monthly |
| **Tool/Utility Pages** | Interactive tools, calculators, checkers | 0.7 | monthly |
| **Supporting Guide Pages** | Guides with 800+ words, FAQ sections, entity coverage | 0.6 | monthly |
| **Policy/Trust Pages** | Editorial policy, methodology, transparency, contact, about | 0.5 | monthly |

### MAY INCLUDE — Conditional Pages

| Category | Criteria |
|----------|----------|
| **Comparison Pages** | Must have unique angle, 1,000+ words, and at least one table |
| **Glossary/List Pages** | Must have 10+ unique terms with definitions (not just links) |
| **Checklist Pages** | Must have 5+ actionable items with explanation |
| **Template Pages** | Must include usage instructions and at least one example |

### MUST EXCLUDE — Never in Sitemap

| Category | Reason |
|----------|--------|
| **301 Redirect Pages** | Only the target page goes in the sitemap. The source is excluded. |
| **V1 Legacy Pages** | Pages with outdated design system, no schema, or thin content. Either upgrade or 301 redirect. |
| **Duplicate/Cannibal Pages** | Only the canonical version is included. All others are excluded and redirected. |
| **Build Script Pages** | `.js` files, build outputs, intermediate page variants are non-consumer facing. |
| **Thin Content Pages** | Under 300 words of body content. No schema. No original value. Must be redirected. |
| **Error/Maintenance Pages** | 404 pages, maintenance pages, confirmation pages (unless content-rich). |

---

## 4. Priority Assignment Rules

Priority is assigned based on page type and authority hierarchy:

### Priority 1.0 — Authority Hubs (6 pages)
The most important pages. Entity-defining. Main entry point for each knowledge domain.
- `hidden-fees-guides.html` (highest — core domain)
- `ai-contract-review.html`
- `ai-agreement-analyzer.html`
- `ai-financial-analysis.html`
- `ai-construction-contract-review.html`
- `ai-financial-advisor.html`
- `index.html` (homepage — always 1.0)

### Priority 0.9 — Pillar/Sub-Hub Pages
Deep-dive entity pages that serve as secondary entry points.
- `ai-bill-analyzer.html`
- `ai-financial-advisor.html`
- `contract-risk-analysis.html`
- `ai-fee-detector.html`
- `consumer-negotiation-resource-center.html`

### Priority 0.8 — High-Value Informational Pages
Pages with substantial original content and high consumer value.
- Industry-specific hidden fee guides (hidden-bank-overdraft-fees.html, etc.)
- Comparison pages (ai-contract-review-vs-lawyer-review.html)
- Methodology pages (ai-analysis-methodology.html)

### Priority 0.7 — Tool/Action Pages
Utility-focused pages that enable consumer action.
- Tool pages (ai-contract-review-tool.html, ai-contract-review-software.html)
- Calculator pages (bill-savings-calculator.html)
- Action pages (analyze-my-contract.html, check-my-fees.html)
- Template pages (bill-negotiation-templates.html)

### Priority 0.6 — Supporting Guides
Deep-dive guides and educational content.
- Contract terms glossary, checklists, clause explainers
- Educational content (ai-accuracy-and-limitations.html)
- Report pages (consumer-fee-trends-report.html)

### Priority 0.5 — Trust & Policy Pages
Consumer trust and transparency pages.
- `about-detect-hidden-fees.html`
- `editorial-policy.html`
- `data-handling-policy.html`
- `contact.html`
- `ai-transparency-report.html`

### Priority 0.4 — Lower-Value Static Pages
- `alphabet-links.html`
- Navigation/utility pages with minimal body content

---

## 5. Changefreq Rules

| Changefreq | When to Use | Examples |
|------------|-------------|----------|
| **daily** | Pages updated frequently with news or data | `consumer-fee-trends-report.html` (if actively updated) |
| **weekly** | Authority hubs and pillar pages | All 6 hub pages, homepage |
| **monthly** | Standard content pages | Guides, tools, comparison pages |
| **yearly** | Static, rarely-changing pages | Policy pages, about page, glossary |

---

## 6. Lastmod Rules

- Every sitemap entry MUST include a `<lastmod>` tag
- The date must match the visible "Last Updated" date on the page
- Format: `YYYY-MM-DD` (ISO 8601)
- When a page is updated, BOTH the visible date AND the sitemap `<lastmod>` MUST be updated
- For pages without visible dates: add one. Every page must display "Last updated: YYYY-MM-DD"

---

## 7. Exclusion Protocol

When a page is removed from the sitemap:

1. **Determine fate:** Should it be deleted, redirected, or just deindexed?
2. **Redirect cononical:** If content exists elsewhere, set up 301 redirect in `_headers`
3. **Leave redirect in place:** Do not add redirect source to sitemap
4. **If deleted entirely:** Remove from sitemap on next update. Return 410 Gone if possible.
5. **Document in current-state.json:** Record the exclusion and reason

### Exclusion Checklist
- [ ] Page identified for removal
- [ ] Reason documented (duplicate, thin, outdated, redirect)
- [ ] 301 redirect set up in `_headers` (if applicable)
- [ ] Sitemap entry removed on next update
- [ ] current-state.json updated with note

---

## 8. Authority Hub Sitemap Integration

The 6 flagship authority hubs must be prominently featured in the sitemap:

```xml
<!-- HIDDEN FEE DETECTION HUB (Core Domain - Highest Priority) -->
<url>
  <loc>https://detecthiddenfees.com/hidden-fees-guides</loc>
  <lastmod>2026-07-21</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>

<!-- AI CONTRACT REVIEW HUB -->
<url>
  <loc>https://detecthiddenfees.com/ai-contract-review</loc>
  <lastmod>2026-07-21</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>

<!-- AI AGREEMENT ANALYZER HUB -->
<url>
  <loc>https://detecthiddenfees.com/ai-agreement-analyzer</loc>
  <lastmod>2026-07-21</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>

<!-- AI FINANCIAL ANALYSIS HUB -->
<url>
  <loc>https://detecthiddenfees.com/ai-financial-analysis</loc>
  <lastmod>2026-07-21</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>

<!-- AI CONSTRUCTION CONTRACT REVIEW HUB -->
<url>
  <loc>https://detecthiddenfees.com/ai-construction-contract-review</loc>
  <lastmod>2026-07-21</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>

<!-- AI FINANCIAL ADVISOR HUB -->
<url>
  <loc>https://detecthiddenfees.com/ai-financial-advisor</loc>
  <lastmod>2026-07-21</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
```

---

## 9. Sitemap Generation Process

### Manual Generation (Current)
1. Use `build-pages.js` or a dedicated sitemap build script
2. Script must scan root `.html` files
3. Must filter against exclusion rules
4. Must assign correct priority, changefreq, lastmod
5. Output must validate against sitemaps.org schema

### Automated Generation (Future — Phase 3)
1. GitHub Action triggered on push to `main`
2. Script auto-generates sitemap.xml
3. Validates all rules in this document
4. Fails CI if rules are violated (e.g., duplicate in sitemap, missing lastmod)
5. Deploys sitemap alongside site changes

### Validation Script (Ideal)
```bash
# Validate sitemap against governance rules:
# 1. Every URL resolves (200, not 301/404)
# 2. No duplicate URLs
# 3. All hubs have priority 1.0
# 4. All pages have lastmod dates
# 5. No excluded page types present
```

---

## 10. Quality Gates for Sitemap

| Gate | Rule |
|------|------|
| **No broken URLs** | Every URL in sitemap must return HTTP 200 |
| **No redirects in sitemap** | If a URL 301-redirects, it does not belong in the sitemap |
| **Canonical consistency** | Sitemap URLs must match canonical URLs on pages exactly |
| **No duplicate entries** | Each URL appears exactly once in the sitemap |
| **Freshness compliance** | No page has a lastmod date > 90 days old (triggers review) |
| **Hub priority** | All 6 authority hubs + homepage at priority 1.0 |
| **Exclusion compliance** | No excluded page types present in sitemap |
| **Header configured** | `_headers` has correct CORS and Content-Type for sitemap.xml |
| **Size limit** | Sitemap under 50,000 URLs and 50MB uncompressed |

---

## 11. Robots.txt Integration

```txt
User-agent: *
Allow: /
Disallow: /404.html
Disallow: /*.js$
Disallow: /*.json$

Sitemap: https://detecthiddenfees.com/sitemap.xml
```

The robots.txt must always reference the sitemap.xml URL.

---

## 12. Revision Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-07-21 | 1.0 | Initial sitemap governance rules — priorities, inclusion/exclusion criteria, hub integration, quality gates |