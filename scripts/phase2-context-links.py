from __future__ import annotations

import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"
INVENTORY = json.loads((REPORTS / "phase2-content-inventory.json").read_text(encoding="utf-8"))["pages"]
BY_ROUTE = {("/" if p["slug"] == "index" else "/" + p["slug"]): p for p in INVENTORY}


LINK_PLANS = {
    "/ai-contract-review": [
        "/before-signing-a-contract",
        "/what-should-i-check-before-signing-a-contract",
        "/ai-contract-review-before-signing",
    ],
    "/ai-contract-review-software": ["/contract-review-ai-software"],
    "/hidden-fee-industry-guide": [
        "/hidden-auto-fees",
        "/hidden-insurance-fees",
        "/hidden-telecom-fees",
        "/hidden-utility-fees",
    ],
    "/research-center": ["/ai-testing-results", "/sample-analysis-report"],
    "/ai-invoice-analyzer": ["/scan-my-invoice", "/ai-invoice-checker", "/analyze-my-invoice"],
    "/ai-bill-analyzer": ["/ai-bill-analysis-vs-manual-review", "/ai-bill-analyzer-vs-chatgpt"],
}


def label_for(route: str) -> str:
    page = BY_ROUTE.get(route, {})
    value = page.get("h1") or page.get("title") or route.strip("/").replace("-", " ").title()
    value = html.unescape(re.sub(r"\s+", " ", value)).strip()
    return value if len(value) <= 100 else value[:97].rstrip(" ,:;-") + "..."


def insert_block(source: str, source_route: str, targets: list[str]) -> tuple[str, list[str]]:
    eligible = []
    for target in targets:
        if target not in BY_ROUTE:
            continue
        if re.search(rf"href=[\"']{re.escape(target)}(?:[\"'#?])", source, re.I):
            continue
        eligible.append(target)
    if not eligible or "phase2-context-links" in source:
        return source, []
    heading = "Related resources"
    if source_route == "/hidden-fee-industry-guide":
        heading = "Explore fee examples by industry"
    elif source_route in {"/ai-contract-review", "/ai-contract-review-software"}:
        heading = "Continue exploring contract review"
    elif source_route == "/research-center":
        heading = "Review methodology and evaluation resources"
    elif source_route == "/ai-invoice-analyzer":
        heading = "Explore invoice analysis resources"
    elif source_route == "/ai-bill-analyzer":
        heading = "Compare bill-analysis approaches"
    block = '<section class="phase2-context-links" aria-labelledby="phase2-related-heading">'
    block += f'<h2 id="phase2-related-heading">{heading}</h2><ul>'
    for target in eligible:
        block += f'<li><a href="{target}">{html.escape(label_for(target))}</a></li>'
    block += "</ul></section>"
    main_close = re.search(r"</main>", source, re.I)
    if not main_close:
        return source, []
    return source[: main_close.start()] + block + source[main_close.start() :], eligible


def main() -> None:
    changes = []
    for source_route, targets in LINK_PLANS.items():
        page = BY_ROUTE.get(source_route)
        if not page:
            continue
        path = ROOT / page["file"]
        source = path.read_text(encoding="utf-8", errors="replace")
        updated, added = insert_block(source, source_route, targets)
        if added:
            path.write_text(updated, encoding="utf-8")
            changes.append({"source": source_route, "targets": added, "reason": "High-confidence parent-to-child contextual discovery links for orphan or underlinked pages."})
    (REPORTS / "phase2-context-link-changes.json").write_text(json.dumps(changes, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"sourcePagesChanged": len(changes), "linksAdded": sum(len(x["targets"]) for x in changes), "changes": changes}, indent=2))


if __name__ == "__main__":
    main()
