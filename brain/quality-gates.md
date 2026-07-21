# 🛡️ Quality Gates

## Completion Validation Checklist

Before any task is marked complete, every AI agent must verify ALL of the following quality gates. No exceptions.

---

## Gate 1: Build & Deployment

- [ ] **Build Success** — If the project has a build step, it completes without errors
- [ ] **No broken pages** — All HTML pages load without 404 errors
- [ ] **Cloudflare Pages deploy** — Changes deploy successfully (verify in Cloudflare dashboard)

## Gate 2: Browser Validation

- [ ] **No console errors** — Open browser DevTools console. Must be clean.
- [ ] **No 404 resources** — Check Network tab for missing fonts, images, or scripts
- [ ] **No layout shifts** — Page content should not jump during load (CLS < 0.1)
- [ ] **Page load time** — First Contentful Paint under 2 seconds

## Gate 3: Mobile Responsiveness

- [ ] **320px width** — Page is fully readable and functional at 320px
- [ ] **480px width** — Layout adapts appropriately for larger phones
- [ ] **768px width** — Tablet layout is clean and usable
- [ ] **1025px+ width** — Desktop layout uses full width appropriately
- [ ] **No horizontal scroll** — Page does not overflow horizontally at any breakpoint
- [ ] **Touch targets** — Interactive elements are at least 44x44px
- [ ] **Readable text** — No text truncation or overlap on mobile

## Gate 4: Schema.org Validation

- [ ] **Organization schema** — Present on every page
- [ ] **WebSite schema** — Present on every page
- [ ] **WebPage schema** — Present on every page with correct URL
- [ ] **BreadcrumbList schema** — Present with correct positions
- [ ] **Page-specific schema** — FAQPage, HowTo, Article, etc. if applicable
- [ ] **Schema validates** — Test with Google Rich Results Test or Schema.org validator
- [ ] **No duplicate schemas** — Each schema type appears only once per page

## Gate 5: SEO Health

- [ ] **Unique title tag** — Each page has a unique, descriptive title (50-65 characters)
- [ ] **Meta description** — Present and unique per page (120-158 characters)
- [ ] **Canonical URL** — Set correctly, no trailing slash inconsistency
- [ ] **H1 tag** — Exactly one H1 per page, matching the page topic
- [ ] **Heading hierarchy** — H1 → H2 → H3 in logical order, no skipped levels
- [ ] **robots meta** — Set to "index,follow" for public pages
- [ ] **No duplicate content** — Page content does not substantially duplicate another page
- [ ] **Sitemap updated** — If new pages added, sitemap.xml includes them

## Gate 6: Internal Linking

- [ ] **Navigation links** — All nav links point to correct, existing pages
- [ ] **Internal links** — At least 3 internal links to related pages
- [ ] **No broken links** — All `<a href>` point to existing files or valid URLs
- [ ] **Breadcrumb consistency** — Breadcrumb links match actual URL structure

## Gate 7: Accessibility (Basic)

- [ ] **Color contrast** — Text meets WCAG AA contrast ratio (4.5:1 for normal text)
- [ ] **Alt text** — All meaningful images have alt attributes
- [ ] **Heading structure** — Logical heading order for screen readers
- [ ] **Keyboard navigation** — All interactive elements reachable via Tab key
- [ ] **Focus indicators** — Visible focus styles on interactive elements
- [ ] **prefers-reduced-motion** — Animations disabled when user prefers reduced motion
- [ ] **Lang attribute** — `<html lang="en">` present

## Gate 8: Content Quality

- [ ] **Spelling and grammar** — No spelling or grammatical errors
- [ ] **Factual accuracy** — Claims are supported by citations or verifiable facts
- [ ] **Freshness** — "Last updated" date is current and visible
- [ ] **Readability** — Content is understandable at 8th-10th grade reading level
- [ ] **No placeholder text** — No lorem ipsum or TODO content in production
- [ ] **Consistent voice** — Tone matches existing content (authoritative, helpful, consumer-focused)

## Gate 9: Design Consistency

- [ ] **Color values match** — Uses exact hex values from `design-system.md`
- [ ] **Font matches** — Inter font used exclusively
- [ ] **Navigation present** — Standard nav bar with logo, links, and CTA
- [ ] **Glow orbs present** — Floating glow orbs included on the page
- [ ] **Container width** — Content constrained to 1240px max-width
- [ ] **Dark theme** — Background is `#020617`, text is `#e2e8f0`

## Gate 10: Open Graph & Social

- [ ] **og:title** — Present and matching page title
- [ ] **og:description** — Present and matching meta description
- [ ] **og:url** — Present with correct canonical URL
- [ ] **og:type** — Correct type (website or article)
- [ ] **og:image** — Present with correct dimensions (1200x630 recommended)
- [ ] **twitter:card** — Set to "summary_large_image"
- [ ] **twitter:title** — Present
- [ ] **twitter:description** — Present
- [ ] **twitter:image** — Present

## Gate 11: File Integrity

- [ ] **Valid HTML** — No unclosed tags, no invalid nesting
- [ ] **Inline CSS/JS** — No external stylesheet or script dependencies broken
- [ ] **No console.log** — Debug logging removed from production
- [ ] **File encoding** — UTF-8 encoding, no byte order mark issues

## Gate 12: Project State Update

- [ ] **current-state.json updated** — Task moved to completedTasks
- [ ] **CHANGELOG.md updated** — Change recorded with date and description
- [ ] **Task file updated** — Status changed to Complete, completion notes filled
- [ ] **Git committed** — Changes committed with descriptive message
- [ ] **Git pushed** — Changes pushed to GitHub

---

## Quick Gate Checklist (For Small Changes)

For minor edits (typo fixes, metadata updates, single-line changes):

- [ ] No console errors introduced
- [ ] Mobile layout unaffected
- [ ] Schema remains valid
- [ ] No broken links introduced
- [ ] Design consistency maintained
- [ ] current-state.json updated

---

## Failing a Gate

If any gate fails:
1. **Do not mark the task complete**
2. **Fix the issue** before proceeding
3. **Re-run all gates** after the fix (fixing one thing can break another)
4. **Document the issue** in the task's Completion Notes for future reference

---

> **Quality is not negotiable.** Every page represents the DetectHiddenFees brand. A single broken page damages consumer trust and AI citation authority.