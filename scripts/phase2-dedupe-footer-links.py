from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INVENTORY = ROOT / "reports" / "phase2-content-inventory.json"
FOOTER_PATTERN = re.compile(r"<footer\b[^>]*>.*?</footer>", re.I | re.S)
ANCHOR_PATTERN = re.compile(r"<a\b([^>]*?\bhref=[\"']([^\"']+)[\"'][^>]*)>.*?</a>", re.I | re.S)


def dedupe_footer(match: re.Match[str], counts: list[int]) -> str:
    footer = match.group(0)
    seen: set[str] = set()
    removals: list[tuple[int, int]] = []
    for anchor in ANCHOR_PATTERN.finditer(footer):
        href = anchor.group(2).strip()
        if href in seen:
            removals.append((anchor.start(), anchor.end()))
        else:
            seen.add(href)
    for start, end in reversed(removals):
        footer = footer[:start] + footer[end:]
    counts.append(len(removals))
    return footer


def main() -> None:
    pages = json.loads(INVENTORY.read_text(encoding="utf-8"))["pages"]
    changed = []
    removed = 0
    for page in pages:
        path = ROOT / page["file"]
        source = path.read_text(encoding="utf-8", errors="replace")
        counts: list[int] = []
        updated = FOOTER_PATTERN.sub(lambda m: dedupe_footer(m, counts), source)
        if updated != source:
            path.write_text(updated, encoding="utf-8")
            changed.append(page["file"])
            removed += sum(counts)
    print(json.dumps({"filesChanged": len(changed), "duplicateFooterLinksRemoved": removed, "files": changed}, indent=2))


if __name__ == "__main__":
    main()
