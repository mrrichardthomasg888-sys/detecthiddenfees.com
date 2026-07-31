from __future__ import annotations

import html
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"
INVENTORY_PATH = REPORTS / "phase2-content-inventory.json"


NAV_HTML = """<nav class="phase2-global-nav" aria-label="Primary navigation">
  <div class="phase2-nav-inner">
    <ul class="phase2-nav-list">
      <li><a class="phase2-nav-link" href="/hidden-fee-encyclopedia">Hidden Fees</a></li>
      <li><a class="phase2-nav-link" href="/ai-contract-review">Contract Review</a></li>
      <li><a class="phase2-nav-link" href="/ai-document-intelligence-center">Bills &amp; Documents</a></li>
      <li><a class="phase2-nav-link" href="/consumer-negotiation-resource-center">Negotiation</a></li>
      <li><a class="phase2-nav-link" href="/research-center">Research</a></li>
      <li><a class="phase2-nav-link" href="/resource-library">Resources</a></li>
      <li><a class="phase2-nav-cta" href="https://hiddenfeeai.com">Analyze a Document</a></li>
    </ul>
  </div>
</nav>"""


PARENT_LABELS = {
    "/hidden-fee-encyclopedia": "Hidden Fee Encyclopedia",
    "/hidden-fee-detector": "Hidden Fee Detector",
    "/hidden-fee-glossary": "Hidden Fee Glossary",
    "/hidden-fee-examples": "Hidden Fee Examples",
    "/hidden-fee-industry-guide": "Hidden Fee Industry Guide",
    "/ai-contract-review": "AI Contract Review",
    "/ai-contract-analysis": "AI Contract Analysis",
    "/ai-contract-review-software": "AI Contract Review Software",
    "/contract-terms-glossary": "Contract Terms Glossary",
    "/ai-document-intelligence-center": "AI Document Intelligence Center",
    "/ai-bill-analyzer": "AI Bill Analyzer",
    "/ai-invoice-analyzer": "AI Invoice Analyzer",
    "/consumer-negotiation-resource-center": "Consumer Negotiation Resource Center",
    "/bill-negotiation-resource-center": "Bill Negotiation Resource Center",
    "/research-center": "Research Center",
    "/about-detect-hidden-fees": "About DetectHiddenFees",
}


def clean(value: str) -> str:
    return html.unescape(re.sub(r"\s+", " ", value or "")).strip()


def route_for(page: dict) -> str:
    return "/" if page["slug"] == "index" else f"/{page['slug']}"


def short_label(value: str, fallback: str) -> str:
    value = clean(value) or fallback
    if len(value) <= 92:
        return value
    return value[:89].rstrip(" ,:;-") + "..."


def breadcrumb_items(page: dict) -> list[dict]:
    route = route_for(page)
    current = short_label(page.get("h1") or page.get("title"), page["slug"].replace("-", " ").title())
    items = [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://detecthiddenfees.com/"}]
    parent = page.get("parent_topic")
    if parent and parent != route:
        label = PARENT_LABELS.get(parent, parent.strip("/").replace("-", " ").title())
        items.append({"@type": "ListItem", "position": len(items) + 1, "name": label, "item": f"https://detecthiddenfees.com{parent}"})
    items.append({"@type": "ListItem", "position": len(items) + 1, "name": current, "item": f"https://detecthiddenfees.com{route}"})
    return items


def breadcrumb_html(page: dict) -> str:
    route = route_for(page)
    current = short_label(page.get("h1") or page.get("title"), page["slug"].replace("-", " ").title())
    bits = ['<nav class="phase2-breadcrumb" aria-label="Breadcrumb">', '<a href="/">Home</a>']
    parent = page.get("parent_topic")
    if parent and parent != route:
        label = html.escape(PARENT_LABELS.get(parent, parent.strip("/").replace("-", " ").title()))
        bits += ["<span class=\"phase2-separator\" aria-hidden=\"true\">/</span>", f'<a href="{parent}">{label}</a>']
    bits += ['<span class="phase2-separator" aria-hidden="true">/</span>', f'<span aria-current="page">{html.escape(current)}</span>', "</nav>"]
    return "".join(bits)


def replace_or_insert_nav(source: str) -> str:
    phase2_pattern = re.compile(r"<nav\b[^>]*class=[\"'][^\"']*phase2-global-nav[^\"']*[\"'][^>]*>.*?</nav>", re.I | re.S)
    if phase2_pattern.search(source):
        source = phase2_pattern.sub("", source, count=1)
    primary_pattern = re.compile(r"<nav\b[^>]*aria-label=[\"']Primary navigation[\"'][^>]*>.*?</nav>", re.I | re.S)
    if primary_pattern.search(source):
        return primary_pattern.sub(NAV_HTML, source, count=1)
    header_close = re.search(r"</header>", source, re.I)
    if header_close:
        return source[: header_close.end()] + NAV_HTML + source[header_close.end() :]
    body_open = re.search(r"<body\b[^>]*>", source, re.I)
    if body_open:
        return source[: body_open.end()] + NAV_HTML + source[body_open.end() :]
    return source


def replace_or_insert_breadcrumb(source: str, page: dict) -> str:
    if page["slug"] == "index":
        return source
    block_pattern = re.compile(
        r"<(nav|div)\b[^>]*class=[\"'][^\"']*(?:phase1-breadcrumb|phase2-breadcrumb|(?:^|\s)breadcrumb(?:\s|$))[^\"']*[\"'][^>]*>.*?</\1>",
        re.I | re.S,
    )
    breadcrumb = breadcrumb_html(page)
    if block_pattern.search(source):
        return block_pattern.sub(breadcrumb, source, count=1)
    main_open = re.search(r"<main\b[^>]*>", source, re.I)
    if main_open:
        return source[: main_open.end()] + breadcrumb + source[main_open.end() :]
    return source


def update_breadcrumb_schema(source: str, page: dict) -> str:
    items = breadcrumb_items(page)
    replacement = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items}
    pattern = re.compile(r"(<script\b[^>]*type=[\"']application/ld\+json[\"'][^>]*>)(.*?)(</script>)", re.I | re.S)

    def replace(match: re.Match[str]) -> str:
        raw = match.group(2).strip()
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            return match.group(0)
        changed = False
        if isinstance(data, dict) and data.get("@type") == "BreadcrumbList":
            data = replacement
            changed = True
        elif isinstance(data, dict) and isinstance(data.get("@graph"), list):
            for node in data["@graph"]:
                if isinstance(node, dict) and node.get("@type") == "BreadcrumbList":
                    node.clear()
                    node.update(replacement)
                    changed = True
        elif isinstance(data, list):
            for node in data:
                if isinstance(node, dict) and node.get("@type") == "BreadcrumbList":
                    node.clear()
                    node.update(replacement)
                    changed = True
        if not changed:
            return match.group(0)
        return match.group(1) + json.dumps(data, ensure_ascii=False, separators=(",", ": ")) + match.group(3)

    return pattern.sub(replace, source)


def main() -> None:
    inventory = json.loads(INVENTORY_PATH.read_text(encoding="utf-8"))["pages"]
    changed = []
    for page in inventory:
        path = ROOT / page["file"]
        source = path.read_text(encoding="utf-8", errors="replace")
        updated = replace_or_insert_nav(source)
        updated = replace_or_insert_breadcrumb(updated, page)
        updated = update_breadcrumb_schema(updated, page)
        if updated != source:
            path.write_text(updated, encoding="utf-8")
            changed.append(page["file"])
    print(json.dumps({"filesChanged": len(changed), "files": changed}, indent=2))


if __name__ == "__main__":
    main()
