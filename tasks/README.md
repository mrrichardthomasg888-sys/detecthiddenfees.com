# 📋 Task Management System

## How Tasks Work

Every development task on DetectHiddenFees.com must be documented as a task file in this directory. This ensures continuity between AI agents and human developers.

---

## Task File Format

Each task is a Markdown file named `TASK-XXX.md` (e.g., `TASK-001.md`) with this structure:

```markdown
# Task [ID]: [Title]

## Metadata
- **Task ID:** TASK-XXX
- **Created:** YYYY-MM-DD
- **Status:** [Planned | In Progress | Review | Complete | Blocked]
- **Priority:** [P0 (Critical) | P1 (High) | P2 (Medium) | P3 (Low)]
- **Assigned To:** [Agent Name or "Unassigned"]
- **Category:** [Content | Design | SEO | Infrastructure | Bug Fix | Audit]

## Goal
[One sentence describing what this task accomplishes]

## Context
[Why this task exists. What problem does it solve? Link to related brain docs.]

## Files Affected
- [List of files to create, modify, or delete]
- [Use absolute paths from project root]

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Acceptance Criteria
- [ ] Criterion 1 (specific, testable)
- [ ] Criterion 2
- [ ] Criterion 3

## Testing Requirements
- [ ] Build passes (if applicable)
- [ ] No console errors
- [ ] Mobile responsive at 320px
- [ ] Schema.org valid
- [ ] Canonical URL set
- [ ] Internal links checked
- [ ] Accessibility checked

## Dependencies
- [ ] Task XXX must be completed first
- [ ] Requires [specific file/knowledge]

## Completion Notes
[Filled in after task is done]

## Related Tasks
- TASK-XXX: [Related task title]
```

---

## Task Status Lifecycle

```
Planned → In Progress → Review → Complete
                  ↓
              Blocked (dependency or issue)
```

### Status Definitions

| Status | Meaning |
|--------|---------|
| **Planned** | Task defined but not started |
| **In Progress** | Currently being worked on |
| **Review** | Work complete, awaiting validation |
| **Complete** | All acceptance criteria met, quality gates passed |
| **Blocked** | Cannot proceed due to dependency or issue |

---

## Task Completion Rules

**No task is complete unless:**

1. ✅ All acceptance criteria verified
2. ✅ Build passes (if build step exists)
3. ✅ No console errors in browser
4. ✅ Mobile responsive at 320px width
5. ✅ Schema.org structured data valid
6. ✅ Canonical URL set correctly
7. ✅ Internal links functional
8. ✅ Sitemap updated (if new pages added)
9. ✅ Accessibility basics checked (contrast, headings, alt text)
10. ✅ `current-state.json` updated with completed task

---

## Priority Definitions

| Priority | When to Use |
|----------|-------------|
| **P0 (Critical)** | Site broken, security issue, deployment failing |
| **P1 (High)** | Core feature, major content gap, SEO regression |
| **P2 (Medium)** | New page, enhancement, optimization |
| **P3 (Low)** | Nice-to-have, cosmetic, future planning |

---

## Task ID Convention

Format: `TASK-XXX` where XXX is a sequential number.

Reserve ranges:
- **001-099:** Infrastructure and brain system
- **100-199:** Content creation
- **200-299:** SEO optimization
- **300-399:** Design and UX
- **400-499:** Bug fixes
- **500-599:** Audits and quality
- **600-699:** Tools and interactive features
- **700-799:** Research and reports
- **800-899:** Documentation
- **900-999:** Miscellaneous

---

## Active Task Tracking

Current active tasks are listed in `brain/current-state.json`. Completed tasks are moved to the `completedTasks` array.

---

## Example Task

```markdown
# Task TASK-101: Create Hidden Credit Card Fees Guide

## Metadata
- **Task ID:** TASK-101
- **Created:** 2026-07-21
- **Status:** Planned
- **Priority:** P1
- **Assigned To:** Unassigned
- **Category:** Content

## Goal
Create a comprehensive guide on hidden credit card fees for consumers.

## Context
The hidden fees content cluster is missing credit card fee coverage. This is a major consumer pain point with high search volume. See `brain/entity-strategy.md` for entity definitions and `brain/aeo-rules.md` for content structure.

## Files Affected
- Create: `/hidden-credit-card-fees.html`
- Update: `/hidden-fees-guides.html` (add link)
- Update: `/knowledge/topic-map.json` (add to hidden-fees cluster)
- Update: `/knowledge/entities.json` (add credit card fee subtype)

## Requirements
- [ ] Cover: Annual fees, late fees, foreign transaction fees, cash advance fees, balance transfer fees
- [ ] Include 3+ real-world examples
- [ ] FAQ section with 8+ questions
- [ ] Action steps for consumers
- [ ] Follow AEO structure: Question → Answer → Explanation → Examples → Action → FAQ

## Acceptance Criteria
- [ ] Page renders correctly on desktop and mobile (320px)
- [ ] FAQPage schema implemented
- [ ] OG and Twitter Card metadata present
- [ ] Canonical URL set
- [ ] Internal links to 3+ related pages
- [ ] External citation from CFPB or similar authority

## Testing Requirements
- [ ] Build passes
- [ ] No console errors
- [ ] Mobile responsive at 320px
- [ ] Schema validated
- [ ] Canonical URL set
- [ ] Internal links checked
- [ ] Accessibility checked
```

---

> **Remember:** A well-defined task is half-completed. If a task is too large to define clearly, break it into smaller tasks.