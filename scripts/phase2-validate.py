from __future__ import annotations

import json
import re
import subprocess
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

from lxml import etree


ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"
INVENTORY = json.loads((REPORTS / "phase2-content-inventory.json").read_text(encoding="utf-8"))["pages"]
ROUTES = {"/" if p["slug"] == "index" else f"/{p['slug']}" for p in INVENTORY}
HREF_PATTERN = re.compile(r"<a\b[^>]*\bhref=[\"']([^\"']+)[\"']", re.I)


def local_path(href: str) -> str | None:
    href = href.strip()
    parsed = urlparse(href)
    if parsed.scheme and parsed.netloc.lower() not in {"detecthiddenfees.com", "www.detecthiddenfees.com"}:
        return None
    if parsed.scheme and parsed.netloc:
        path = parsed.path or "/"
    elif href.startswith("/"):
        path = parsed.path or "/"
    else:
        return None
    if path != "/":
        path = path.rstrip("/")
    return path


def validate_html() -> dict:
    missing_files = []
    bad_canonicals = []
    broken_internal = []
    legacy_internal = []
    nav_issues = []
    breadcrumb_issues = []
    main_issues = []
    schema_issues = []
    duplicate_canonicals = []
    noindex = []
    parse_errors = []
    for page in INVENTORY:
        path = ROOT / page["file"]
        if not path.exists():
            missing_files.append(page["file"])
            continue
        source = path.read_text(encoding="utf-8", errors="replace")
        route = "/" if page["slug"] == "index" else f"/{page['slug']}"
        expected = f"https://detecthiddenfees.com{route}"
        canonicals = re.findall(r"<link\b[^>]*rel=[\"']canonical[\"'][^>]*href=[\"']([^\"']+)", source, re.I)
        if not canonicals or set(canonicals) != {expected}:
            bad_canonicals.append({"route": route, "values": canonicals, "expected": expected})
        elif len(canonicals) > 1:
            duplicate_canonicals.append({"route": route, "count": len(canonicals)})
        hrefs = HREF_PATTERN.findall(source)
        for href in hrefs:
            local = local_path(href)
            if not local:
                continue
            if local.endswith(".html"):
                legacy_internal.append({"source": route, "href": href})
            elif local not in ROUTES and not (local.lower().endswith(".pdf") and (ROOT / local.lstrip("/")).exists()):
                broken_internal.append({"source": route, "href": href})
        if len(re.findall(r"class=[\"'][^\"']*phase2-global-nav[^\"']*[\"']", source, re.I)) != 1:
            nav_issues.append(route)
        breadcrumb_count = len(re.findall(r"class=[\"']phase2-breadcrumb[\"']", source, re.I))
        if (page["slug"] == "index" and breadcrumb_count) or (page["slug"] != "index" and breadcrumb_count != 1):
            breadcrumb_issues.append({"route": route, "count": breadcrumb_count})
        if len(re.findall(r"<main\b", source, re.I)) != 1:
            main_issues.append(route)
        if re.search(r"<meta\b[^>]*(?:name|property)=[\"']robots[\"'][^>]*content=[\"'][^\"']*noindex", source, re.I):
            noindex.append(route)
        parser = etree.HTMLParser(recover=False)
        current_parse_error = None
        try:
            etree.fromstring(source.encode("utf-8", errors="replace"), parser)
        except Exception as exc:
            current_parse_error = str(exc)[:300]
            parse_errors.append({"route": route, "error": current_parse_error})
        schema_blocks = re.findall(r"<script\b[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>", source, re.I | re.S)
        breadcrumb_schema_count = 0
        for block in schema_blocks:
            try:
                data = json.loads(block.strip())
            except json.JSONDecodeError as exc:
                schema_issues.append({"route": route, "issue": f"Invalid JSON-LD: {exc}"})
                continue
            nodes = []
            if isinstance(data, dict) and data.get("@type") == "BreadcrumbList":
                nodes.append(data)
            if isinstance(data, dict) and isinstance(data.get("@graph"), list):
                nodes.extend(node for node in data["@graph"] if isinstance(node, dict) and node.get("@type") == "BreadcrumbList")
            if isinstance(data, list):
                nodes.extend(node for node in data if isinstance(node, dict) and node.get("@type") == "BreadcrumbList")
            for node in nodes:
                breadcrumb_schema_count += 1
                if not node.get("itemListElement"):
                    schema_issues.append({"route": route, "issue": "BreadcrumbList has no items"})
        if breadcrumb_schema_count != 1:
            schema_issues.append({"route": route, "issue": f"Expected one BreadcrumbList, found {breadcrumb_schema_count}"})
        if current_parse_error:
            try:
                baseline = subprocess.run(["git", "show", f"HEAD:{page['file']}"], cwd=ROOT, capture_output=True, check=True).stdout
                baseline_parser = etree.HTMLParser(recover=False)
                etree.fromstring(baseline, baseline_parser)
                parse_errors[-1]["preExisting"] = False
            except Exception:
                parse_errors[-1]["preExisting"] = True
    return {
        "canonicalPages": len(INVENTORY),
        "missingFiles": missing_files,
        "badCanonicals": bad_canonicals,
        "duplicateCanonicalTags": duplicate_canonicals,
        "brokenInternalLinks": broken_internal,
        "legacyHtmlInternalLinks": legacy_internal,
        "navigationIssues": nav_issues,
        "breadcrumbIssues": breadcrumb_issues,
        "mainLandmarkIssues": main_issues,
        "schemaIssues": schema_issues,
        "noindexPages": noindex,
        "htmlParseErrors": parse_errors,
    }


def validate_discovery() -> dict:
    sitemap_urls = []
    sitemap_error = None
    try:
        root = ET.parse(ROOT / "sitemap.xml").getroot()
        sitemap_urls = [node.text.strip() for node in root.iter() if node.tag.endswith("}loc") and node.text]
    except Exception as exc:
        sitemap_error = str(exc)
    llms_urls = re.findall(r"https://detecthiddenfees\.com[^\s)]+", (ROOT / "llms.txt").read_text(encoding="utf-8"))
    rss_links = []
    rss_error = None
    try:
        root = ET.parse(ROOT / "rss.xml").getroot()
        rss_links = []
        for node in root.iter():
            if node.tag.split("}")[-1] != "link":
                continue
            candidate = (node.attrib.get("href") or node.text or "").strip()
            if "detecthiddenfees.com" in candidate and not candidate.endswith("/rss.xml"):
                rss_links.append(candidate)
    except Exception as exc:
        rss_error = str(exc)
    expected_urls = {f"https://detecthiddenfees.com{route}" for route in ROUTES}
    return {
        "sitemapCount": len(sitemap_urls),
        "sitemapError": sitemap_error,
        "sitemapNonCanonicalUrls": sorted(set(sitemap_urls) - expected_urls),
        "llmsCount": len(llms_urls),
        "llmsNonCanonicalUrls": sorted(set(llms_urls) - expected_urls),
        "rssLinkCount": len(rss_links),
        "rssError": rss_error,
        "rssNonCanonicalUrls": sorted(set(rss_links) - expected_urls),
        "robotsReferencesSitemap": "sitemap.xml" in (ROOT / "robots.txt").read_text(encoding="utf-8").lower(),
    }


def main() -> None:
    result = {"html": validate_html(), "discovery": validate_discovery()}
    (REPORTS / "phase2-validation.json").write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({
        "canonicalPages": result["html"]["canonicalPages"],
        "missingFiles": len(result["html"]["missingFiles"]),
        "badCanonicals": len(result["html"]["badCanonicals"]),
        "duplicateCanonicalTags": len(result["html"]["duplicateCanonicalTags"]),
        "brokenInternalLinks": len(result["html"]["brokenInternalLinks"]),
        "legacyHtmlInternalLinks": len(result["html"]["legacyHtmlInternalLinks"]),
        "navigationIssues": len(result["html"]["navigationIssues"]),
        "breadcrumbIssues": len(result["html"]["breadcrumbIssues"]),
        "schemaIssues": len(result["html"]["schemaIssues"]),
        "htmlParseErrors": len(result["html"]["htmlParseErrors"]),
        "sitemapCount": result["discovery"]["sitemapCount"],
        "llmsCount": result["discovery"]["llmsCount"],
        "rssLinkCount": result["discovery"]["rssLinkCount"],
    }, indent=2))


if __name__ == "__main__":
    main()
