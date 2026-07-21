# 🧠 DetectHiddenFees Authority Brain

> **FIRST READ** — Every AI agent must read this file before making any changes to this project.

---

## Project Mission

DetectHiddenFees.com is an AI-powered financial transparency platform that helps consumers identify hidden fees, deceptive pricing, and contract risks in financial documents. The platform provides free educational resources, AI document analysis tools, and consumer advocacy content.

**Primary Goal:** Become the most trusted AI financial transparency authority on the web.

---

## How AI Agents Must Operate

### Before Writing Any Code

1. **Read the Brain** — Start with this README, then `mission.md`, `architecture.md`, and `current-state.json`
2. **Understand the stack** — Static HTML/CSS/JS on Cloudflare Pages. No framework. No build step in production.
3. **Check active tasks** — Read `/tasks/` directory for any in-progress work
4. **Review design system** — Read `design-system.md` before touching any CSS or HTML
5. **Check quality gates** — Read `quality-gates.md` for completion requirements

### While Working

- Never overwrite existing pages without explicit instruction
- Preserve the dark theme, Inter font, and glass-morphism design language
- All pages are static HTML with inline CSS and JS (Cloudflare Pages deployment)
- Schema.org structured data is required on every page
- Mobile-responsive design is mandatory (320px minimum)
- Every page must have canonical URL, Open Graph, and Twitter Card metadata

### After Completing Work

1. Run through all quality gates (see `quality-gates.md`)
2. Update `current-state.json` with new status
3. Update `CHANGELOG.md` in root
4. Commit with descriptive message
5. Push to GitHub (`origin: https://github.com/mrrichardthomasg888-sys/detecthiddenfees.com.git`)

---

## Critical Rules

| Rule | Description |
|------|-------------|
| **No framework drift** | Do not introduce React, Vue, or any framework. This is a static site. |
| **Design consistency** | Match existing colors, fonts, spacing exactly. Read `design-system.md`. |
| **Schema required** | Every page needs Organization, WebPage, BreadcrumbList, and page-specific schema |
| **Mobile first** | Test at 320px. Every page must be fully functional on mobile. |
| **No build step** | Pages are served as-is from Cloudflare Pages. Build scripts in root are for page generation only. |
| **Preserve SEO** | Canonical URLs, meta descriptions, OG tags, and structured data on every page |

---

## File Structure Quick Reference

```
/
├── brain/              ← AI agent operating system (YOU ARE HERE)
│   ├── README.md       ← Entry point for all AI agents
│   ├── mission.md      ← Project mission statement
│   ├── vision.md       ← Long-term vision
│   ├── architecture.md ← Technical architecture
│   ├── design-system.md← UI/UX design rules
│   ├── current-state.json← Project state tracking
│   ├── geo-rules.md    ← GEO content optimization rules
│   ├── aeo-rules.md    ← Answer Engine Optimization rules
│   ├── entity-strategy.md← Entity modeling strategy
│   ├── quality-gates.md← Completion validation checklist
│   ├── authority-roadmap.md← Phased authority-building plan
│   └── agent-rules.md  ← AI agent operating procedures
├── knowledge/          ← Knowledge graph and entity data
│   ├── entities.json   ← Entity definitions and relationships
│   └── topic-map.json  ← Topic clustering and content mapping
├── tasks/              ← Task management system
│   └── README.md       ← Task lifecycle and format rules
├── audits/             ← Completed audit reports
├── reports/            ← Generated reports and analysis
├── templates/          ← Reusable page templates
├── config/             ← Configuration files
├── index.html          ← Homepage
├── *.html              ← Content pages (100+)
├── build-*.js          ← Page generation scripts
├── _headers            ← Cloudflare redirects/rules
└── .github/            ← GitHub workflows
```

---

## Resuming Work

When resuming after a break:

1. Read `brain/current-state.json` for active task context
2. Read any in-progress task files in `/tasks/`
3. Check `git log` for recent commits
4. Review `CHANGELOG.md` for recent changes
5. Pick up from the highest-priority incomplete task

---

## Key External Dependencies

| Service | Purpose |
|---------|---------|
| Cloudflare Pages | Hosting and deployment |
| hiddenfeeai.com | AI analysis API backend |
| Google Fonts (Inter) | Typography |
| Schema.org | Structured data vocabulary |
| GitHub | Version control |

---

> **Remember:** You are not just writing code. You are building a trusted financial transparency authority. Every decision must serve the mission of helping consumers understand and avoid hidden fees.