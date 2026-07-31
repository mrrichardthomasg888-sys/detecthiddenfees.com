from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"


def read(name: str) -> dict:
    return json.loads((REPORTS / name).read_text(encoding="utf-8"))


def route(page: dict) -> str:
    return "/" if page["slug"] == "index" else f"/{page['slug']}"


def bullets(values: list[str]) -> str:
    return "\n".join(f"- `{value}`" for value in values) if values else "- None"


def main() -> None:
    inventory = read("phase2-content-inventory.json")["pages"]
    architecture = read("phase2-topical-architecture.json")
    cannibalization = read("phase2-cannibalization-audit.json")
    before = read("phase2-link-graph-before.json")
    after = read("phase2-link-graph-after.json")
    validation = read("phase2-validation.json")
    html = validation["html"]
    discovery = validation["discovery"]
    context = read("phase2-context-link-changes.json")
    silos = Counter(p["silo"] for p in inventory)
    types = Counter(p["page_type"] for p in inventory)
    intents = Counter(p["primary_search_intent"] for p in inventory)
    pillars = Counter(p["primary_pillar"] for p in inventory)
    overlap = [route(p) for p in inventory if p["overlap_flag"]]
    report = f"""# DetectHiddenFees.com Phase 2 Implementation Report

## 1. Executive summary

Phase 2 was completed locally on `codex/phase2-information-architecture`. Nothing was deployed. The work converted the existing 225-page canonical inventory into a documented five-silo topical model, added restrained global navigation, standardized visible breadcrumbs and matching BreadcrumbList data, reduced duplicate footer links, and added a small set of parent-to-child contextual links.

No pages were deleted, merged, redirected, canonicalized to another page, noindexed, substantially rewritten, or newly created. HiddenFeeAI pricing, functionality, branding relationship, homepage layout, report experience, and analytics configuration were not changed.

Key outcomes:

- 225 canonical sitemap pages inventoried with purpose, intent, parent, pillar, link counts, schema, word count, conversion target, and overlap flag.
- Five topical silos established; every page received one primary pillar assignment.
- Seven global navigation choices implemented, including a restrained Analyze a Document path.
- Visible breadcrumbs added or normalized on 224 non-home pages; BreadcrumbList data aligned across all 225 pages.
- 1,473 duplicate same-destination footer anchors removed within individual footers.
- 15 targeted contextual links added across six parent pages; baseline orphans reduced from {len(before['orphans'])} to {len(after['orphans'])}.
- All high-risk consolidation, redirect, noindex, canonical-reassignment, deletion, mass-content, and new-hub work was withheld.

## 2. Complete content inventory

- [phase2-content-inventory.json](./phase2-content-inventory.json)
- [phase2-content-inventory.csv](./phase2-content-inventory.csv)

The inventory uses actual titles, H1s, headings, visible text, schema, and link structure; URL keywords were not the sole classification signal.

### Silo distribution

| Silo | Pages |
|---|---:|
{chr(10).join(f"| {name} | {count} |" for name, count in silos.most_common())}

### Page-type distribution

| Page type | Pages |
|---|---:|
{chr(10).join(f"| `{name}` | {count} |" for name, count in types.most_common())}

## 3. Final proposed topical architecture

- [phase2-topical-architecture.json](./phase2-topical-architecture.json)
- [phase2-topical-map.md](./phase2-topical-map.md)

Flat URLs were preserved. The hierarchy is conceptual and reinforced through navigation, breadcrumbs, parent links, and pillar assignments.

| Silo | Authority pillars | Assigned pages |
|---|---|---:|
{chr(10).join(f"| {s['name']} | {', '.join(f'`{x}`' for x in s['authority_pillars'])} | {len(s['pages'])} |" for s in architecture['silos'].values())}

## 4. Pillar-page map

| Canonical pillar | Assigned pages |
|---|---:|
{chr(10).join(f"| `{pillar}` | {count} |" for pillar, count in pillars.most_common())}

Primary existing pillars:

- Hidden fees: `/hidden-fee-encyclopedia`; detection action: `/hidden-fee-detector`.
- AI contract review: `/ai-contract-review`; analysis methodology: `/ai-contract-analysis`.
- Bills and documents: `/ai-document-intelligence-center`; specialists: `/ai-bill-analyzer`, `/ai-invoice-analyzer`.
- Consumer negotiation: `/consumer-negotiation-resource-center`; bill negotiation: `/bill-negotiation-resource-center`.
- Research and trust: `/research-center`; methodology: `/research-methodology`.

## 5. Search-intent map

| Dominant intent | Pages |
|---|---:|
{chr(10).join(f"| `{name}` | {count} |" for name, count in intents.most_common())}

Each page has one dominant intent and funnel stage. Secondary topics do not replace the primary page purpose.

## 6. Cannibalization decision matrix

- [phase2-cannibalization-audit.json](./phase2-cannibalization-audit.json)
- [phase2-cannibalization-decisions.md](./phase2-cannibalization-decisions.md)

The audit contains {cannibalization['candidateCount']} candidate comparisons across the requested contract-review, hidden-fee-tool, negotiation, risk-scoring, and research-hub groups. {len(overlap)} pages participate in explicit overlap groups. Similarity scoring is triage evidence, not a merge instruction.

High-risk actions were withheld. No merge, redirect, noindex, canonical reassignment, or deletion was implemented. Local changes only reinforced intent distinctions through page parentage, navigation, breadcrumbs, and contextual discovery.

## 7. Changes implemented

### Global navigation

One labeled primary navigation is present per canonical page:

- Hidden Fees → `/hidden-fee-encyclopedia`
- Contract Review → `/ai-contract-review`
- Bills & Documents → `/ai-document-intelligence-center`
- Negotiation → `/consumer-negotiation-resource-center`
- Research → `/research-center`
- Resources → `/resource-library`
- Analyze a Document → `https://hiddenfeeai.com`

It uses semantic list markup, visible focus styles, keyboard-reachable links, and contained horizontal scrolling at narrow widths. It is not a mega menu.

### Breadcrumbs

Breadcrumbs are present on 224 non-home pages and omitted from the homepage. BreadcrumbList JSON-LD uses the same conceptual parent and current-page structure. Flat URLs remain unchanged.

### Internal linking

- [phase2-link-graph-before.json](./phase2-link-graph-before.json)
- [phase2-link-graph-after.json](./phase2-link-graph-after.json)
- [phase2-internal-link-report.md](./phase2-internal-link-report.md)
- [phase2-context-link-changes.json](./phase2-context-link-changes.json)

The after graph contains {after['nodeCount']} nodes, {after['edgeCount']} directed edges, and {after['totalLinkOccurrences']} link occurrences. The six parent pages receiving targeted contextual links were:

{chr(10).join(f"- `{c['source']}` → {', '.join(f'`{x}`' for x in c['targets'])}" for c in context)}

### Footer repetition

Duplicate same-destination anchors were removed only when repeated within the same footer. Legal, trust, navigation, and conversion access was retained. Remaining high aggregate counts are documented for later template-level review.

## 8. Changes recommended but withheld

- Merge, redirect, noindex, deletion, or canonical reassignment among overlapping pages.
- New hubs where an existing page may already serve the role.
- Broad copy rewrites, large-scale metadata changes, state-law expansion, original research, datasets, calculators, and new tools.
- Evidence-based authorship, citations, expert review, and authority work for Phase 3.
- Further underlinked-page expansion beyond the targeted high-confidence pass.

## 9. HiddenFeeAI conversion paths

The DetectHiddenFees-to-HiddenFeeAI relationship was preserved. The common Analyze a Document link provides a consistent product path, while existing page-level CTAs remain intact. No pricing, product claims, functionality, analytics, or product-domain architecture changed.

## 10. Sitemap, llms.txt, and RSS alignment

- Sitemap: {discovery['sitemapCount']} URLs; no noncanonical sitemap URLs detected.
- llms.txt: {discovery['llmsCount']} canonical URLs; no noncanonical URLs detected.
- RSS: XML parsed successfully; the feed remains editorial and distinct from the sitemap, with 162 editorial items.
- robots.txt continues to reference the sitemap.
- No new page URLs were created, so discovery assets did not require expansion.

## 11. Accessibility and mobile validation

- One `main` landmark and one labeled primary navigation per canonical page.
- One visible breadcrumb per eligible non-home page.
- Skip-link and visible `:focus-visible` styles remain present.
- No document-level horizontal overflow at 320, 375, 430, 768, or 1280 CSS-pixel widths.
- Representative homepage, pillar, tool, research, and orphan pages rendered without browser console errors.

The in-app keyboard harness did not reliably move `activeElement` from `BODY` on its first Tab event, so manual keyboard confirmation of skip-link activation should be repeated before deployment. The CSS focus treatment is present, and no new keyboard trap or hover-only interaction was introduced.

Evidence:

- [phase2-homepage-mobile.png](./phase2-homepage-mobile.png)
- [phase2-navigation-mobile.png](./phase2-navigation-mobile.png)

## 12. Schema validation

Zero JSON-LD parsing issues and zero BreadcrumbList-count issues were detected. Four duplicate canonical tags remain on legacy duplicated full-document pages; these were pre-existing and intentionally not changed in Phase 2.

## 13. Files changed

- 225 canonical HTML pages: navigation, breadcrumbs, BreadcrumbList alignment, and/or footer duplicate-link cleanup.
- `phase1-foundation.css`: navigation, breadcrumb, contextual-link, responsive, and focus styling.
- Phase 2 analysis and validation scripts under `scripts/`.
- Phase 2 reports and QA evidence under `reports/`.

## 14. Commits created

The commits are recorded in Git history after the local review commits are created. The work is separated into architecture/reporting and implementation/validation groups.

## 15. Test results

- [phase2-validation.json](./phase2-validation.json)

| Test | Result |
|---|---|
| Canonical sitemap files | {len(inventory)}/{len(inventory)} present |
| Canonical URL mismatches | {len(html['badCanonicals'])} |
| Duplicate canonical-tag pages (pre-existing) | {len(html['duplicateCanonicalTags'])} |
| Broken internal links | {len(html['brokenInternalLinks'])} |
| Legacy `.html` internal links | {len(html['legacyHtmlInternalLinks'])} |
| Navigation issues | {len(html['navigationIssues'])} |
| Breadcrumb issues | {len(html['breadcrumbIssues'])} |
| Schema issues | {len(html['schemaIssues'])} |
| New HTML parser errors | {sum(not e.get('preExisting') for e in html['htmlParseErrors'])} |
| Sitemap URLs | {discovery['sitemapCount']} |
| llms.txt URLs | {discovery['llmsCount']} |
| RSS XML | {'valid' if not discovery['rssError'] else discovery['rssError']} |
| robots sitemap reference | {'present' if discovery['robotsReferencesSitemap'] else 'missing'} |

## 16. Remaining known risks

- Four pages contain duplicate canonical tags inherited from duplicated full-document markup.
- All 225 pages still trigger the same inherited HTML parser warning, with zero new parser errors introduced by Phase 2.
- {len(after['one_inbound'])} pages still have exactly one inbound link; they are candidates for future contextual linking, not automatic injection targets.
- Sitewide counts remain high for major pillars, legal/trust pages, and product CTAs. The local pass removed duplicate same-destination footer anchors but did not redesign every legacy footer template.
- Search performance, query-level cannibalization, Core Web Vitals, and external authority cannot be proven from local HTML alone.

## 17. Rollback instructions

- For review-only rollback, switch back to `codex/phase1-technical-foundation`.
- If Phase 2 commits have been shared, use `git revert` on them in reverse order rather than rewriting history.
- No production deployment or external system change occurred.

## 18. Recommended Phase 3 roadmap

1. Establish verifiable authorship, reviewer, sourcing, and editorial governance.
2. Build original research methodology and publish evidence-backed statistics only when underlying data is accessible.
3. Add citation-ready research assets, datasets, examples, and update histories.
4. Use Search Console and analytics query data to resolve high-confidence overlap decisions.
5. Build authority through genuine expert collaboration and white-hat editorial outreach.
6. Reassess underlinked pages and template repetition after observing crawl and engagement data.

Phase 2 is complete locally. Phase 3 was not started and nothing was deployed.
"""
    (REPORTS / "phase2-implementation-report.md").write_text(report, encoding="utf-8")


if __name__ == "__main__":
    main()
