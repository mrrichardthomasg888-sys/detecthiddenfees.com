# 🤖 AI Agent Operating Rules

## Mandatory Procedures for All AI Coding Agents

Every AI agent working on DetectHiddenFees.com must follow these rules without exception. This document is the constitution of the project.

---

## Rule 1: Read Before You Write

**Never start coding without reading the Brain.**

Before making any change, you must read (in order):
1. `brain/README.md` — Entry point and overview
2. `brain/current-state.json` — Current project status and active tasks
3. `brain/architecture.md` — Technical architecture and constraints
4. `brain/design-system.md` — UI/UX design rules
5. `brain/quality-gates.md` — Completion requirements

**Failure to read these files before coding will result in rejected work.**

---

## Rule 2: Know Your Boundaries

### You May:
- Create new HTML pages following the existing template pattern
- Edit existing pages per task requirements
- Create or update brain/knowledge system files
- Run build scripts for page generation
- Commit and push to GitHub

### You May NOT (without explicit instruction):
- Delete existing pages
- Change the design system (colors, fonts, theme)
- Introduce frameworks (React, Vue, Bootstrap, etc.)
- Modify the navigation structure
- Change the deployment configuration
- Add tracking scripts or analytics
- Convert pages to a different architecture (SPA, CMS, etc.)

---

## Rule 3: Task-Driven Development

### All work must be tracked as a task.

1. Check `brain/current-state.json` for active tasks
2. If the work you're doing has no task, create one in `/tasks/TASK-XXX.md`
3. Update task status as you work (Planned → In Progress → Review → Complete)
4. Tasks must follow the format defined in `/tasks/README.md`

### If a task is too large:
- **Break it into smaller tasks.** Each task should be completable in a single session.
- A task is "too large" if it affects more than 5 files or has more than 10 requirements.
- Create sub-tasks with clear dependencies.

---

## Rule 4: Quality Gates Are Not Optional

**Every task must pass ALL quality gates before completion.**

See `brain/quality-gates.md` for the full checklist.

At minimum:
- [ ] No console errors
- [ ] Mobile responsive (320px)
- [ ] Schema valid
- [ ] Canonical URL set
- [ ] Internal links work
- [ ] Design consistent

**If a single gate fails, the task is NOT complete.**

---

## Rule 5: After Completing Work

### Update the System

1. **Update `current-state.json`**:
   - Move completed task from `activeTasks` to `completedTasks`
   - Update `lastUpdated` date
   - Update `stats` if page count changed

2. **Update changelog** (create `CHANGELOG.md` in root if missing):
   ```markdown
   ## [YYYY-MM-DD]
   ### Added
   - [Description of what was added]
   ### Changed
   - [Description of what was changed]
   ```

3. **Update task file**: Change status to Complete, fill completion notes.

4. **Commit changes**:
   ```bash
   git add .
   git commit -m "[TASK-XXX] Description of changes"
   ```

5. **Push to GitHub**:
   ```bash
   git push origin main
   ```

---

## Rule 6: Page Creation Standards

### Every new HTML page must include:

**In `<head>`:**
- [ ] `<!DOCTYPE html>` and `<html lang="en">`
- [ ] `<meta charset="UTF-8">` and responsive viewport meta
- [ ] Font preloads (Inter from Google Fonts)
- [ ] DNS prefetch and preconnect
- [ ] Unique `<title>` (50-65 characters)
- [ ] `<meta name="description">` (120-158 characters)
- [ ] `<meta name="keywords">`
- [ ] `<meta name="robots" content="index,follow">`
- [ ] `<link rel="canonical">`
- [ ] Open Graph meta tags (og:title, og:description, og:url, og:type, og:image)
- [ ] Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
- [ ] Google Fonts Inter link
- [ ] Favicon link
- [ ] Theme color meta
- [ ] Schema.org JSON-LD: Organization, WebSite, WebPage, BreadcrumbList
- [ ] Schema.org JSON-LD: page-specific (FAQPage, HowTo, Article, etc.)
- [ ] Inline CSS matching design system

**In `<body>`:**
- [ ] Floating glow orb accent div (`class="orb-accent"`)
- [ ] Navigation (sticky, glass-morphism, with logo, links, CTA)
- [ ] Content sections following AEO structure
- [ ] Footer
- [ ] Sticky mobile CTA (if applicable)

---

## Rule 7: Design System Compliance

### Every page must use:

- **Background:** `#020617`
- **Text color:** `#e2e8f0`
- **Font:** Inter (400, 500, 600, 700, 800, 900 weights)
- **Container:** `max-width: 1240px; margin: auto; padding: 0 20px;`
- **Navigation:** Glass-morphism with `backdrop-filter: blur(24px)`
- **Glow orbs:** Three decorative orbs (blue, purple, cyan)
- **Buttons:** Blue `#2563eb` with glow shadow, 12px border-radius
- **Cards:** Semi-transparent with blue-tinted borders
- **Dark theme:** No light mode variants
- See `brain/design-system.md` for full specifications

---

## Rule 8: Content Standards

### Every informational page must follow AEO structure:
1. **H1:** The question or topic
2. **First 150 words:** Direct, concise answer
3. **Body:** Detailed explanation with H2 sections
4. **Examples:** Real-world scenarios
5. **Action steps:** What the reader should do
6. **FAQ section:** 5-10 questions with FAQPage schema
7. **Related entities:** Internal links to relevant pages
8. **References:** External authoritative citations

See `brain/aeo-rules.md` and `brain/geo-rules.md` for full standards.

---

## Rule 9: Git Workflow

### Commit Messages

Format: `[TASK-XXX] Brief description of changes`

Examples:
- `[TASK-001] Add Authority Brain system files`
- `[TASK-101] Create hidden credit card fees guide`
- `[TASK-401] Fix mobile navigation overflow on homepage`

### Branch Strategy
- **main:** Production branch. Always deployable.
- For major changes, create feature branches: `feature/task-XXX-description`
- Merge to main via PR (if working with others) or direct push (solo)

### What to Commit
- ✅ HTML pages
- ✅ Brain system files
- ✅ Knowledge graph files
- ✅ Task files
- ✅ Configuration files
- ❌ `node_modules/` (gitignored)
- ❌ `package-lock.json` (gitignored)
- ❌ Build artifacts not meant for production

---

## Rule 10: Never Claim Completion Without Validation

**"It should work" is not acceptable.**

Before marking any task complete:
1. Open the affected pages in a browser
2. Check console for errors
3. Resize to 320px and verify functionality
4. Validate schema (Google Rich Results Test)
5. Check all internal links
6. Verify design consistency
7. Update `current-state.json`
8. Commit and push

**If you cannot verify a requirement, the task is NOT complete.**

---

## Rule 11: Error Recovery

### If something goes wrong:
1. **Don't panic.** The project is version-controlled.
2. **Identify** what broke and when.
3. **Check git log** for recent changes: `git log --oneline -10`
4. **Revert** if necessary: `git revert <commit-hash>`
5. **Document** what happened in the task's Completion Notes.
6. **Learn** and update these rules if needed.

### If the site is broken in production:
1. This is a P0 priority.
2. Immediately revert the breaking commit.
3. Debug locally before pushing a fix.
4. Run ALL quality gates on the fix.

---

## Rule 12: Communication

### When Resuming Work:
- Read `brain/current-state.json` first
- Check for any in-progress tasks
- Review recent git commits
- Pick up the highest-priority incomplete task

### When Blocked:
- Document the blocker in the task file
- Set status to Blocked
- Note what dependency is needed
- Move to the next available task

### When Complete:
- Update `current-state.json`
- Update task file
- Commit with descriptive message
- Push to GitHub
- Report what was accomplished

---

## Quick Reference: File to Read by Task Type

| Task Type | Must Read |
|-----------|-----------|
| Any task | `brain/README.md`, `brain/current-state.json` |
| Creating a page | + `brain/architecture.md`, `brain/design-system.md`, `brain/aeo-rules.md` |
| Editing CSS | + `brain/design-system.md` |
| SEO work | + `brain/geo-rules.md`, `brain/aeo-rules.md` |
| Content writing | + `brain/aeo-rules.md`, `brain/entity-strategy.md` |
| Bug fix | + `brain/architecture.md`, `brain/quality-gates.md` |
| Audit | + `brain/quality-gates.md` |
| Adding entities | + `brain/entity-strategy.md`, `knowledge/entities.json` |

---

> **These rules exist to maintain quality, consistency, and continuity across all AI agents. They are not optional. Following them ensures that every agent's work builds upon the last — rather than undermining it.**