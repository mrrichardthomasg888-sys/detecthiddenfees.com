# 🏗️ Architecture

## DetectHiddenFees.com Technical Architecture

---

## Overview

DetectHiddenFees.com is a **static HTML website** deployed to **Cloudflare Pages**. There is no backend framework, no CMS, and no build step in production. Pages are served as pre-built static HTML files with inline CSS and JavaScript.

---

## Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, Vanilla JS | Inline styles and scripts in each page |
| **Fonts** | Google Fonts (Inter) | Preloaded with font-display: swap |
| **Hosting** | Cloudflare Pages | Global CDN, automatic HTTPS |
| **AI Backend** | hiddenfeeai.com | External API for document analysis |
| **Version Control** | Git + GitHub | Main repo for all source files |
| **DNS** | Cloudflare | Managed DNS with proxying |
| **Schema** | Schema.org (JSON-LD) | Organization, WebSite, WebPage, BreadcrumbList, FAQ, HowTo |
| **Analytics** | None currently | No tracking scripts in pages |

---

## File Structure

```
/
├── index.html                          ← Homepage
├── *.html                              ← 100+ content pages (flat structure)
├── build-*.js / build*.js              ← Page generation scripts (Node.js)
├── fix-*.js / audit*.js               ← Maintenance/audit scripts (Node.js)
├── _headers                            ← Cloudflare Pages routing rules
├── favicon.svg                         ← Site favicon
├── .gitignore                          ← Git ignore rules
├── brain/                              ← AI Agent Operating System
│   ├── README.md                       ← Agent entry point
│   ├── mission.md                      ← Project mission
│   ├── vision.md                       ← Long-term vision
│   ├── architecture.md                 ← This file
│   ├── design-system.md               ← UI/UX rules
│   ├── current-state.json             ← Project state tracker
│   ├── geo-rules.md                    ← GEO optimization rules
│   ├── aeo-rules.md                    ← AEO optimization rules
│   ├── entity-strategy.md             ← Entity modeling strategy
│   ├── quality-gates.md               ← Validation checklist
│   ├── authority-roadmap.md           ← Phased roadmap
│   └── agent-rules.md                 ← Agent operating rules
├── knowledge/                          ← Knowledge graph
│   ├── entities.json                   ← Entity definitions
│   └── topic-map.json                  ← Topic/content mapping
├── tasks/                              ← Task management
│   └── README.md                       ← Task lifecycle rules
├── audits/                             ← Audit reports
├── reports/                            ← Generated reports
├── templates/                          ← Page templates
├── config/                             ← Configuration files
├── functions/                          ← Cloudflare Functions (if any)
├── .github/                            ← GitHub workflows
│   └── workflows/                      ← CI/CD (if configured)
└── .git/                               ← Git repository
```

---

## Page Architecture

Every HTML page follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta: charset, viewport -->
    <!-- Preloads: fonts, favicon -->
    <!-- DNS prefetch, preconnect -->
    <!-- SEO: title, description, keywords, canonical, robots -->
    <!-- Open Graph: og:title, og:description, og:url, og:image -->
    <!-- Twitter Card: twitter:title, twitter:description, twitter:image -->
    <!-- Fonts: Google Fonts Inter -->
    <!-- Schema.org JSON-LD: Organization, WebSite, BreadcrumbList, WebPage -->
    <!-- Inline CSS -->
</head>
<body>
    <!-- Floating glow orb accent div -->
    <!-- Navigation: sticky, glass-morphism, logo, nav links, CTA button -->
    <!-- Page-specific content sections -->
    <!-- Footer: links, copyright -->
    <!-- Sticky mobile CTA (if applicable) -->
    <!-- Inline JavaScript (if needed) -->
</body>
</html>
```

---

## CSS Architecture

- **All CSS is inline** in `<style>` tags (no external stylesheets)
- Dark theme base: `background: #020617` (slate-950), `color: #e2e8f0` (slate-200)
- Glass-morphism navigation: `backdrop-filter: blur(24px)` with semi-transparent background
- Floating glow orbs: fixed-position pseudo-elements and accent divs with radial gradients and blur
- CSS animations: fadeUp, fadeIn, glowPulse, borderGlow, gradientShift, shimmer
- `prefers-reduced-motion` respected globally
- Container: `max-width: 1240px` with 20px padding
- Responsive breakpoints via media queries (mobile-first compatible)

---

## JavaScript Architecture

- **All JS is inline** in `<script>` tags (no external scripts except schema JSON-LD)
- Vanilla JavaScript only — no frameworks, no libraries
- Build scripts in root (`build-*.js`) are Node.js scripts for page generation, not runtime
- No client-side routing — every page is a separate HTML file
- Minimal JavaScript usage — mostly for interactive elements on tool pages

---

## Deployment Architecture

```
Developer → Git Push → GitHub → Cloudflare Pages (auto-deploy) → Global CDN
```

- **Cloudflare Pages** automatically deploys on push to main branch
- Static file serving with global CDN edge caching
- `_headers` file configures custom headers and 301 redirects
- Custom domain: detecthiddenfees.com
- SSL/TLS: Automatic via Cloudflare

---

## External Integrations

| Integration | Purpose | Configuration |
|-------------|---------|---------------|
| **hiddenfeeai.com** | AI document analysis API | Referenced in tool pages for file upload/analysis |
| **Google Fonts** | Inter font family | Preloaded, with font-display: swap |
| **Schema.org** | Structured data vocabulary | JSON-LD in every page head |
| **Bing Webmaster** | Search engine verification | msvalidate.01 meta tag |

---

## Content Clusters

The site organizes content into these interconnected topic clusters:

1. **AI Contract Review** (35+ pages) — Tools and guides for AI-powered contract analysis
2. **Hidden Fees** (25+ pages) — Industry-specific hidden fee detection guides
3. **Financial Analysis** (20+ pages) — AI document analysis tools for bills, invoices, statements
4. **Consumer Resources** (25+ pages) — Templates, checklists, negotiation tools
5. **AI Education** (15+ pages) — Methodology, accuracy, comparisons, transparency

---

## Key Design Decisions

1. **No framework** — Static HTML ensures maximum performance, zero JavaScript overhead, and simple deployment
2. **Flat file structure** — All HTML pages in root for simple URL structure (no subdirectories for content)
3. **Inline CSS/JS** — Each page is self-contained; no build step needed for production
4. **Schema-first** — Every page has comprehensive structured data for search engine understanding
5. **Cloudflare-native** — Leveraging Cloudflare Pages, CDN, and routing for performance and simplicity

---

## Constraints

- No server-side rendering or dynamic content
- No database — all content is static
- No user accounts or authentication
- No CMS — content changes require file edits and git push
- AI analysis happens on external domain (hiddenfeeai.com), not on-site
- Must maintain 100% static HTML compatibility