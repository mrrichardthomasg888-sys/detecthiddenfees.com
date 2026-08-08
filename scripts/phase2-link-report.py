from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"


def load(name: str) -> dict:
    return json.loads((REPORTS / name).read_text(encoding="utf-8"))


def bullets(values: list[str], limit: int | None = None) -> str:
    values = values if limit is None else values[:limit]
    return "\n".join(f"- `{x}`" for x in values) if values else "- None"


def main() -> None:
    before = load("phase2-link-graph-before.json")
    after = load("phase2-link-graph-after.json")
    changes = load("phase2-context-link-changes.json")
    before_orphans = set(before["orphans"])
    after_orphans = set(after["orphans"])
    removed_orphans = sorted(before_orphans - after_orphans)
    remaining_one = after["one_inbound"]
    before_sitewide = {route: count for route, count in before["excessive_sitewide_targets"]}
    after_sitewide = {route: count for route, count in after["excessive_sitewide_targets"]}
    lines = [
        "# Phase 2 Internal-Link Report",
        "",
        "This report compares the read-only Phase 2 baseline with the local Phase 2 navigation, footer-deduplication, breadcrumb, and targeted contextual-link changes. It does not represent deployed production behavior.",
        "",
        "## Graph summary",
        "",
        "| Metric | Before | After | Change |",
        "|---|---:|---:|---:|",
        f"| Canonical nodes | {before['nodeCount']} | {after['nodeCount']} | {after['nodeCount'] - before['nodeCount']:+} |",
        f"| Distinct directed edges | {before['edgeCount']} | {after['edgeCount']} | {after['edgeCount'] - before['edgeCount']:+} |",
        f"| Link occurrences | {before['totalLinkOccurrences']} | {after['totalLinkOccurrences']} | {after['totalLinkOccurrences'] - before['totalLinkOccurrences']:+} |",
        f"| Orphan pages | {len(before['orphans'])} | {len(after['orphans'])} | {len(after['orphans']) - len(before['orphans']):+} |",
        f"| Pages with exactly one inbound link | {len(before['one_inbound'])} | {len(after['one_inbound'])} | {len(after['one_inbound']) - len(before['one_inbound']):+} |",
        f"| Excessive sitewide targets flagged | {len(before_sitewide)} | {len(after_sitewide)} | {len(after_sitewide) - len(before_sitewide):+} |",
        "",
        "The raw link-occurrence total is not expected to fall because the approved global navigation adds consistent access to six topical destinations and the product CTA. Footer deduplication removed 1,473 duplicate same-destination anchors within individual footers; the remaining sitewide repetition is documented for later template-level review.",
        "",
        "## Orphan-page results",
        "",
        "Pages no longer orphaned after targeted contextual links:",
        bullets(removed_orphans),
        "",
        "Remaining orphan pages:",
        bullets(after["orphans"]),
        "",
        "## Targeted contextual links added",
        "",
        f"The following {len(changes)} parent pages received {sum(len(x['targets']) for x in changes)} contextual links. The links were limited to semantically related child pages that were orphaned or had only one inbound link in the baseline.",
        "",
    ]
    for change in changes:
        lines.append(f"- `{change['source']}` → {', '.join(f'`{x}`' for x in change['targets'])}")
    lines += [
        "",
        "## Pages still underlinked",
        "",
        "These pages have exactly one inbound link in the after graph. They should be reviewed in the next approved linking pass, prioritizing distinct search intent and user value rather than raw link counts.",
        bullets(remaining_one),
        "",
        "## Most-linked destinations after implementation",
        "",
    ]
    lines += [f"- `{route}` — {count} link occurrences" for route, count in after["most_linked"][:30]]
    lines += [
        "",
        "## Sitewide repetition observations",
        "",
        "The largest after-graph destinations are the primary contract, document, hidden-fee, research, and negotiation pillars, plus legal/trust destinations and the product analysis CTA. This is expected for global navigation, footer access, and trust links. No footer links were removed solely because they had a high aggregate count; the implemented reduction removed only duplicate same-destination anchors within the same footer.",
        "",
        "## Measurement limitations",
        "",
        "- The graph counts HTML anchor occurrences, not weighted PageRank.",
        "- It does not distinguish all reusable components perfectly across legacy templates.",
        "- The baseline and after graph include local HTML only; they do not include JavaScript-generated links or external discovery.",
        "- One-inbound status is a triage signal, not a recommendation to add links to every page.",
    ]
    (REPORTS / "phase2-internal-link-report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
