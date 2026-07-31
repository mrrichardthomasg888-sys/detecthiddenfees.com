from __future__ import annotations

import csv
import html
import json
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from difflib import SequenceMatcher
from html.parser import HTMLParser
from itertools import combinations
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://detecthiddenfees.com"
SITEMAP = ROOT / "sitemap.xml"
REPORTS = ROOT / "reports"
REPORTS.mkdir(exist_ok=True)

STOPWORDS = {
    "about", "after", "again", "also", "before", "being", "between", "could", "does", "for", "from",
    "have", "help", "into", "just", "more", "most", "other", "over", "should", "that", "their", "there",
    "these", "this", "through", "using", "what", "when", "where", "which", "with", "your", "how", "and",
    "the", "are", "can", "our", "you", "any", "all", "not", "into", "than", "why", "who", "get", "find",
}


def sitemap_urls() -> list[str]:
    text = SITEMAP.read_text(encoding="utf-8", errors="replace")
    return [x.strip() for x in re.findall(r"<loc>(.*?)</loc>", text, re.I | re.S)]


def slug_from_url(url: str) -> str:
    path = urlparse(url).path.strip("/")
    return path or "index"


def file_for_slug(slug: str) -> Path:
    return ROOT / ("index.html" if slug == "index" else f"{slug}.html")


def clean_text(value: str) -> str:
    value = html.unescape(value or "")
    return re.sub(r"\s+", " ", value).strip()


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.skip_depth = 0
        self.skip_tags = {"script", "style", "noscript", "template"}
        self.text_parts: list[str] = []
        self.headings: list[tuple[int, str]] = []
        self.h1: list[str] = []
        self.links: list[str] = []
        self.images: list[str] = []
        self._heading_level: int | None = None
        self._heading_text: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_map = dict(attrs)
        if tag in self.skip_tags:
            self.skip_depth += 1
        if tag == "a" and attrs_map.get("href"):
            self.links.append(attrs_map["href"] or "")
        if tag == "img" and attrs_map.get("src"):
            self.images.append(attrs_map["src"] or "")
        if re.fullmatch(r"h[1-6]", tag):
            self._heading_level = int(tag[1])
            self._heading_text = []

    def handle_endtag(self, tag: str) -> None:
        if re.fullmatch(r"h[1-6]", tag) and self._heading_level is not None:
            text = clean_text(" ".join(self._heading_text))
            self.headings.append((self._heading_level, text))
            if self._heading_level == 1:
                self.h1.append(text)
            self._heading_level = None
            self._heading_text = []
        if tag in self.skip_tags and self.skip_depth:
            self.skip_depth -= 1

    def handle_data(self, data: str) -> None:
        if self._heading_level is not None:
            self._heading_text.append(data)
        if not self.skip_depth:
            self.text_parts.append(data)


def meta_value(source: str, name: str, attribute: str = "name") -> str:
    for tag in re.findall(r"<meta\b[^>]*>", source, re.I):
        if re.search(rf"\b{attribute}\s*=\s*[\"']{re.escape(name)}[\"']", tag, re.I):
            match = re.search(r"\bcontent\s*=\s*[\"']([^\"']*)", tag, re.I)
            return clean_text(match.group(1)) if match else ""
    return ""


def canonical_value(source: str) -> str:
    match = re.search(r"<link\b[^>]*rel=[\"']canonical[\"'][^>]*href=[\"']([^\"']+)", source, re.I)
    return match.group(1) if match else ""


def schema_types(source: str) -> list[str]:
    found: list[str] = []
    for raw in re.findall(r"<script\b[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>", source, re.I | re.S):
        try:
            value = json.loads(html.unescape(raw.strip()))
        except Exception:
            continue
        values = value if isinstance(value, list) else [value]
        for item in values:
            if isinstance(item, dict):
                typ = item.get("@type", [])
                found.extend(typ if isinstance(typ, list) else [typ])
    return sorted({x for x in found if isinstance(x, str)})


def internal_path(href: str) -> str | None:
    parsed = urlparse(href)
    if parsed.scheme or parsed.netloc or href.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
        return None
    path = parsed.path or "/"
    if path in {"/", ""}:
        return "/"
    path = path.rstrip("/")
    if path.endswith(".html"):
        path = path[:-5]
    if path.endswith((".css", ".js", ".png", ".svg", ".xml", ".txt", ".pdf")):
        return None
    return path


def tokens(value: str) -> set[str]:
    return {x for x in re.findall(r"[a-z0-9]{3,}", value.lower()) if x not in STOPWORDS}


def topic_scores(slug: str, text: str) -> dict[str, int]:
    haystack = f"{slug.replace('-', ' ')} {text}".lower()
    patterns = {
        "hidden_fee_detection": ["hidden fee", "hidden charge", "fee detector", "fee scanner", "fee database", "fee index"],
        "contract_review": ["contract review", "contract analysis", "agreement analyzer", "contract checker", "agreement review"],
        "bill_document_analysis": ["bill analyzer", "invoice", "statement", "document analysis", "estimate", "receipt", "medical bill"],
        "consumer_negotiation": ["negotiate", "negotiation", "consumer protection", "billing dispute", "request template"],
        "contract_clauses_risk": ["clause", "contract risk", "red flag", "renewal", "termination", "indemnification"],
        "research_methodology": ["research", "methodology", "accuracy", "transparency", "evaluation", "testing results", "statistics"],
        "consumer_trust": ["privacy", "security", "editorial policy", "about detecthiddenfees", "terms of service", "data handling"],
    }
    return {topic: sum(haystack.count(pattern) for pattern in patterns_list) for topic, patterns_list in patterns.items()}


def assign_silo(slug: str, text: str) -> tuple[str, str]:
    s = slug.lower()
    if re.search(r"^(about|contact|privacy|security|terms|data-handling|editorial-policy)", s):
        return "research_trust", "Research, Methodology, Trust, and Transparency"
    if re.search(r"(negotiat|medical-debt|reduce-monthly|bill-savings|fee-removal|fee-negotiation)", s):
        return "consumer_negotiation", "Consumer Negotiation and Protection"
    if re.search(r"(contract|agreement|clause|arbitration|indemnification|before-signing|unfair-contract|service-agreement|lease-review)", s):
        return "ai_contract_review", "AI Contract Review"
    if re.search(r"(bill|invoice|statement|document|estimate|quote|receipt|financial|medical-bill|upload-bill|analyze-my-bill)", s):
        return "bills_documents", "Bills, Invoices, and Document Analysis"
    if re.search(r"(hidden-fee|hidden-|fee-detector|fee-scanner|fee-calculator|fee-risk|types-of-hidden-fees|free-hidden)", s):
        return "hidden_fee_detection", "Hidden Fee Detection"
    if re.search(r"(research|methodology|knowledge|resource|center|report|accuracy|testing|statistics|example|best-)", s):
        return "research_trust", "Research, Methodology, Trust, and Transparency"
    scores = topic_scores(s, text)
    best = max(scores, key=scores.get)
    if best == "contract_review" or best == "contract_clauses_risk":
        return "ai_contract_review", "AI Contract Review"
    if best == "bill_document_analysis":
        return "bills_documents", "Bills, Invoices, and Document Analysis"
    if best == "consumer_negotiation":
        return "consumer_negotiation", "Consumer Negotiation and Protection"
    if best == "hidden_fee_detection":
        return "hidden_fee_detection", "Hidden Fee Detection"
    return "research_trust", "Research, Methodology, Trust, and Transparency"


def page_type(slug: str, title: str, text: str, schemas: list[str]) -> str:
    s = f"{slug} {title}".lower()
    if slug == "index":
        return "homepage"
    if re.search(r"^(about|contact|privacy|security|terms|data-handling|editorial-policy)", slug):
        return "trust_or_legal"
    if "research" in s or "methodology" in s or "transparency" in s or "accuracy" in s or "testing" in s:
        return "research"
    if "vs" in s or s.startswith("best-") or "comparison" in text.lower():
        return "comparison"
    if re.search(r"(center|resource|library|encyclopedia|database|dictionary|glossary|index|guides)$", slug) or re.search(r"(center|resource center|knowledge center|encyclopedia|database|glossary)", title, re.I):
        return "hub"
    if re.search(r"(analy|checker|scanner|detector|calculator|risk-score|tool|upload|review-online|review-contract)", slug):
        return "tool_or_service"
    if re.search(r"(example|template|checklist|scripts)", slug):
        return "template_example"
    if "Article" in schemas or len(text.split()) >= 700:
        return "editorial_guide"
    return "editorial_resource"


def search_intent(slug: str, ptype: str, text: str) -> str:
    s = slug.lower()
    if ptype == "homepage":
        return "brand_and_category_discovery"
    if ptype == "trust_or_legal":
        return "trust_or_compliance"
    if ptype == "comparison":
        return "commercial_comparison"
    if ptype == "tool_or_service":
        if re.search(r"(analy|upload|check|scan|detect|calculator|score)", s):
            return "transactional_tool"
        return "commercial_solution"
    if ptype == "hub":
        return "topic_navigation_and_learning"
    if ptype == "template_example":
        return "practical_action"
    if "how " in text.lower() or s.startswith("how-") or s.startswith("can-ai"):
        return "informational_question"
    return "informational_guide"


PILLARS = {
    "hidden_fee_detection": ["/hidden-fee-encyclopedia", "/hidden-fee-detector"],
    "ai_contract_review": ["/ai-contract-review", "/ai-contract-analysis"],
    "bills_documents": ["/ai-document-intelligence-center", "/ai-bill-analyzer", "/ai-invoice-analyzer"],
    "consumer_negotiation": ["/consumer-negotiation-resource-center", "/bill-negotiation-resource-center"],
    "research_trust": ["/research-center", "/research-methodology"],
}


def parent_for(page: dict) -> str | None:
    route = "/" if page["slug"] == "index" else f"/{page['slug']}"
    if route in {x for values in PILLARS.values() for x in values}:
        return None
    silo = page["silo_id"]
    slug = page["slug"]
    ptype = page["page_type"]
    if silo == "research_trust":
        if slug == "about-detect-hidden-fees":
            return None
        if slug in {"about-detect-hidden-fees", "contact", "privacy-and-ai-security", "security-overview", "terms-of-service", "data-handling-policy", "editorial-policy"}:
            return "/about-detect-hidden-fees"
        return "/research-center"
    if silo == "hidden_fee_detection":
        if ptype == "tool_or_service":
            return "/hidden-fee-detector"
        if "glossary" in slug or "dictionary" in slug:
            return "/hidden-fee-glossary"
        if "example" in slug:
            return "/hidden-fee-examples"
        if "industry" in slug or re.match(r"hidden-(auto|bank|billing|contractor|credit|dealership|electrician|healthcare|home|hvac|insurance|internet|investment|landscaping|loan|mortgage|moving|phone|plumbing|rental|roofing|streaming|subscription|telecom|travel|utility)", slug):
            return "/hidden-fee-industry-guide"
        return "/hidden-fee-encyclopedia"
    if silo == "ai_contract_review":
        if "clause" in slug or "red-flag" in slug or slug in {"contract-terms-glossary", "contract-review-checklist"}:
            return "/contract-terms-glossary"
        if ptype == "comparison" or "software" in slug:
            return "/ai-contract-review-software"
        if ptype == "tool_or_service":
            return "/ai-contract-review"
        return "/ai-contract-review"
    if silo == "bills_documents":
        if "invoice" in slug:
            return "/ai-invoice-analyzer"
        if "bill" in slug or "medical" in slug:
            return "/ai-bill-analyzer"
        return "/ai-document-intelligence-center"
    if silo == "consumer_negotiation":
        if "medical" in slug or "hospital" in slug:
            return "/bill-negotiation-resource-center"
        return "/consumer-negotiation-resource-center"
    return None


def make_inventory() -> list[dict]:
    pages: list[dict] = []
    for url in sitemap_urls():
        slug = slug_from_url(url)
        source = file_for_slug(slug).read_text(encoding="utf-8", errors="replace")
        parser = PageParser()
        parser.feed(source)
        title_match = re.search(r"<title>(.*?)</title>", source, re.I | re.S)
        title = clean_text(title_match.group(1)) if title_match else ""
        h1 = parser.h1[0] if parser.h1 else ""
        visible = clean_text(" ".join(parser.text_parts))
        main_text = visible
        silo_id, silo_name = assign_silo(slug, f"{title} {h1} {visible[:5000]}")
        schemas = schema_types(source)
        ptype = page_type(slug, title, visible, schemas)
        page = {
            "url": url,
            "slug": slug,
            "file": file_for_slug(slug).name,
            "title": title,
            "meta_description": meta_value(source, "description"),
            "h1": h1,
            "headings": [{"level": level, "text": text} for level, text in parser.headings[:30]],
            "page_type": ptype,
            "primary_topic": max(topic_scores(slug, f"{title} {h1} {visible[:6000]}").items(), key=lambda x: x[1])[0],
            "secondary_topics": [x for x, score in sorted(topic_scores(slug, f"{title} {h1} {visible[:6000]}").items(), key=lambda x: (-x[1], x[0]))[1:4] if score > 0],
            "silo_id": silo_id,
            "silo": silo_name,
            "primary_pillar": PILLARS[silo_id][0],
            "primary_search_intent": search_intent(slug, ptype, f"{title} {h1} {visible[:2500]}"),
            "funnel_stage": "conversion" if ptype == "tool_or_service" else ("trust" if ptype == "trust_or_legal" else ("consideration" if ptype == "comparison" else "awareness_or_education")),
            "schema_types": schemas,
            "approx_visible_word_count": len(main_text.split()),
            "outbound_internal_link_count": sum(1 for link in parser.links if internal_path(link)),
            "outbound_external_link_count": sum(1 for link in parser.links if urlparse(link).scheme or urlparse(link).netloc),
            "links_hiddenfeeai": any("hiddenfeeai.com" in link for link in parser.links),
            "conversion_target": "https://hiddenfeeai.com" if any("hiddenfeeai.com" in link for link in parser.links) else ("internal tool" if ptype == "tool_or_service" else "educational next step"),
            "content_class": "legal" if ptype == "trust_or_legal" and slug in {"privacy-and-ai-security", "terms-of-service", "data-handling-policy"} else ("trust" if ptype == "trust_or_legal" else ("research" if ptype == "research" else ("commercial" if ptype in {"tool_or_service", "comparison"} else "editorial"))),
            "canonical": canonical_value(source),
            "has_unique_reason_to_exist": True,
            "overlap_flag": False,
            "content_excerpt": visible[:280],
        }
        pages.append(page)
    by_target = Counter()
    source_edges: dict[str, Counter] = defaultdict(Counter)
    for page in pages:
        source = file_for_slug(page["slug"]).read_text(encoding="utf-8", errors="replace")
        parser = PageParser()
        parser.feed(source)
        for link in parser.links:
            target = internal_path(link)
            if target:
                by_target[target] += 1
                source_edges[page["slug"]][target] += 1
    for page in pages:
        route = "/" if page["slug"] == "index" else f"/{page['slug']}"
        page["inbound_internal_link_count"] = by_target[route]
        page["parent_topic"] = parent_for(page)
        page["existing_breadcrumb_parent"] = None
        source = file_for_slug(page["slug"]).read_text(encoding="utf-8", errors="replace")
        breadcrumb = re.search(r"class=[\"'][^\"']*breadcrumb[^\"']*[\"'][^>]*>(.*?)</(?:div|nav)>", source, re.I | re.S)
        if breadcrumb:
            hrefs = re.findall(r"href=[\"']([^\"']+)", breadcrumb.group(1), re.I)
            page["existing_breadcrumb_parent"] = hrefs[-1] if hrefs else None
    return pages


def write_inventory(pages: list[dict]) -> None:
    (REPORTS / "phase2-content-inventory.json").write_text(json.dumps({"generatedAt": datetime.now(timezone.utc).isoformat(), "pageCount": len(pages), "pages": pages}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    fields = [
        "url", "title", "meta_description", "h1", "page_type", "primary_topic", "secondary_topics", "primary_search_intent",
        "funnel_stage", "parent_topic", "primary_pillar", "inbound_internal_link_count", "outbound_internal_link_count", "existing_breadcrumb_parent",
        "schema_types", "approx_visible_word_count", "conversion_target", "links_hiddenfeeai", "content_class", "overlap_flag", "has_unique_reason_to_exist",
    ]
    with (REPORTS / "phase2-content-inventory.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for page in pages:
            row = {key: page.get(key, "") for key in fields}
            for key in {"secondary_topics", "schema_types"}:
                row[key] = "; ".join(row[key]) if isinstance(row[key], list) else row[key]
            writer.writerow(row)


def architecture(pages: list[dict]) -> dict:
    silos = {
        "hidden_fee_detection": {"name": "Hidden Fee Detection", "authority_pillars": PILLARS["hidden_fee_detection"], "conversion": "https://hiddenfeeai.com", "role": "Define hidden fees, detection, examples, industries, and practical detection tools."},
        "ai_contract_review": {"name": "AI Contract Review", "authority_pillars": PILLARS["ai_contract_review"], "conversion": "https://hiddenfeeai.com", "role": "Explain contract review, contract analysis, clauses, risk, software, and contract-specific tools."},
        "bills_documents": {"name": "Bills, Invoices, and Document Analysis", "authority_pillars": PILLARS["bills_documents"], "conversion": "https://hiddenfeeai.com", "role": "Organize bill, invoice, statement, estimate, receipt, and general document analysis."},
        "consumer_negotiation": {"name": "Consumer Negotiation and Protection", "authority_pillars": PILLARS["consumer_negotiation"], "conversion": "https://hiddenfeeai.com", "role": "Help users challenge questionable charges and prepare negotiations without unsupported legal claims."},
        "research_trust": {"name": "Research, Methodology, Trust, and Transparency", "authority_pillars": PILLARS["research_trust"], "conversion": "https://hiddenfeeai.com", "role": "Explain research, methodology, limitations, privacy, security, editorial standards, and product relationship."},
    }
    by_silo = defaultdict(list)
    for page in pages:
        by_silo[page["silo_id"]].append(page["slug"])
    for key, value in silos.items():
        value["pages"] = sorted(by_silo[key])
        value["recommended_hubs"] = sorted({f"/{p['slug']}" for p in pages if p["silo_id"] == key and p["page_type"] == "hub"})
    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "principle": "One primary home and one dominant intent per canonical page; secondary topic support is allowed without creating competing primary authorities.",
        "silos": silos,
        "page_assignments": [{"url": p["url"], "silo": p["silo_id"], "primary_pillar": PILLARS[p["silo_id"]][0], "parent": p["parent_topic"], "intent": p["primary_search_intent"]} for p in pages],
    }


EXPLICIT_GROUPS = {
    "ai_contract_review": ["ai-contract-review", "ai-contract-review-tool", "ai-contract-review-software", "contract-review-ai-software", "contract-analysis-ai", "ai-contract-analysis", "ai-contract-checker", "ai-agreement-analyzer"],
    "hidden_fee_tools": ["hidden-fee-detector", "hidden-fee-scanner", "hidden-fee-analysis-tool", "check-my-fees", "hidden-fee-risk-score", "hidden-fee-calculator", "upload-bill-for-analysis", "analyze-my-document"],
    "negotiation": ["bill-negotiation-resource-center", "consumer-negotiation-resource-center", "consumer-negotiation-academy", "negotiate-bills", "bill-negotiation-service", "bill-negotiation-templates"],
    "risk_scoring": ["ai-contract-risk-score", "hidden-fee-risk-score", "contract-risk-score", "contract-risk-analysis", "ai-document-risk-analysis"],
    "research_hubs": ["hidden-fee-index", "hidden-fee-encyclopedia", "hidden-fee-knowledge-center", "hidden-fee-intelligence-center", "hidden-fee-intelligence-engine", "research-center", "research-methodology", "resource-library", "knowledge-center"],
}


def cannibalization(pages: list[dict]) -> list[dict]:
    by_slug = {p["slug"]: p for p in pages}
    pairs: dict[tuple[str, str], dict] = {}
    for group, slugs in EXPLICIT_GROUPS.items():
        for left, right in combinations([x for x in slugs if x in by_slug], 2):
            a, b = by_slug[left], by_slug[right]
            pairs[tuple(sorted((left, right)))] = compare_pair(a, b, group)
    for a, b in combinations(pages, 2):
        if a["silo_id"] != b["silo_id"]:
            continue
        ta = tokens(f"{a['title']} {a['h1']} {' '.join(x['text'] for x in a['headings'][:10])}")
        tb = tokens(f"{b['title']} {b['h1']} {' '.join(x['text'] for x in b['headings'][:10])}")
        if not ta or not tb:
            continue
        jaccard = len(ta & tb) / len(ta | tb)
        sequence = SequenceMatcher(None, a["title"].lower(), b["title"].lower()).ratio()
        if jaccard >= 0.28 or sequence >= 0.62:
            key = tuple(sorted((a["slug"], b["slug"])))
            pairs.setdefault(key, compare_pair(a, b, "automated_similarity"))
    result = sorted(pairs.values(), key=lambda x: (-x["similarity_score"], x["pages"]))
    for item in result:
        item["potential_overlap"] = item["similarity_score"] >= 0.28 or item["group"] != "automated_similarity"
    return result[:120]


def compare_pair(a: dict, b: dict, group: str) -> dict:
    ta = tokens(f"{a['title']} {a['h1']} {' '.join(x['text'] for x in a['headings'][:10])}")
    tb = tokens(f"{b['title']} {b['h1']} {' '.join(x['text'] for x in b['headings'][:10])}")
    union = len(ta | tb) or 1
    jaccard = len(ta & tb) / union
    sequence = SequenceMatcher(None, a["title"].lower(), b["title"].lower()).ratio()
    score = round((jaccard * 0.7) + (sequence * 0.3), 3)
    different_intent = a["primary_search_intent"] != b["primary_search_intent"] or a["page_type"] != b["page_type"]
    if different_intent:
        action = "Keep separate; clarify intent, headings, examples, CTAs, and contextual links."
        confidence = "High confidence" if {a["page_type"], b["page_type"]} >= {"tool_or_service", "editorial_guide"} else "Medium confidence"
        risk = "Low"
        approval = False
    elif score >= 0.40:
        action = "Do not change automatically; approval required for any merge, redirect, canonical reassignment, or noindex. First preserve unique evidence and compare performance."
        confidence = "Medium confidence"
        risk = "High"
        approval = True
    else:
        action = "Leave separate for now; add clear parent/pillar links and monitor query overlap."
        confidence = "Low confidence"
        risk = "Medium"
        approval = False
    return {
        "group": group,
        "pages": [f"/{a['slug']}", f"/{b['slug']}"],
        "current_intents": {f"/{a['slug']}": a["primary_search_intent"], f"/{b['slug']}": b["primary_search_intent"]},
        "page_types": {f"/{a['slug']}": a["page_type"], f"/{b['slug']}": b["page_type"]},
        "silo": a["silo_id"],
        "similarity_score": score,
        "title_similarity": round(sequence, 3),
        "token_overlap": round(jaccard, 3),
        "user_value_difference": "Different task, funnel stage, audience, or level of explanation." if different_intent else "Not yet demonstrated by the current title, headings, and page purpose.",
        "recommended_action": action,
        "confidence": confidence,
        "risk": risk,
        "internal_linking_implication": "Link the narrower page to its pillar and sibling pages using intent-specific anchors; avoid reciprocal exact-match blocks.",
        "redirect_implication": "None implemented. Any redirect/canonical/noindex decision requires approval." if not approval else "Approval required before any redirect, canonical, noindex, merge, or deletion.",
        "content_to_preserve": "Unique examples, methodology, limitations, FAQs, templates, and conversion context on both pages.",
        "approval_required": approval,
    }


def write_architecture_and_cannibalization(pages: list[dict]) -> None:
    overlap_slugs = {slug for slugs in EXPLICIT_GROUPS.values() for slug in slugs}
    for page in pages:
        page["overlap_flag"] = page["slug"] in overlap_slugs
    arch = architecture(pages)
    (REPORTS / "phase2-topical-architecture.json").write_text(json.dumps(arch, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    lines = ["# Phase 2 Topical Map", "", "The architecture assigns every canonical page one primary silo, one dominant intent, one recommended parent, and one authority pillar. Flat URLs are preserved; the hierarchy is conceptual and reinforced by links and breadcrumbs.", ""]
    for key, silo in arch["silos"].items():
        lines += [f"## {silo['name']}", "", f"Role: {silo['role']}", "", "Authority pillars:"]
        lines += [f"- `{x}`" for x in silo["authority_pillars"]]
        lines += ["", "Recommended hubs:"]
        lines += [f"- `{x}`" for x in silo["recommended_hubs"][:12]] or ["- None beyond the existing pillars."]
        lines += ["", f"Assigned canonical pages: {len(silo['pages'])}", ""]
    lines += ["## Architecture rules", "", "- Pillars answer broad entity or category questions.", "- Hubs organize a topic but do not replace a useful guide or tool.", "- Tools target an action; guides target learning; comparisons target evaluation; research pages support claims and trust.", "- Any merge, redirect, noindex, canonical reassignment, or deletion is approval-gated.", ""]
    (REPORTS / "phase2-topical-map.md").write_text("\n".join(lines), encoding="utf-8")
    decisions = cannibalization(pages)
    (REPORTS / "phase2-cannibalization-audit.json").write_text(json.dumps({"generatedAt": datetime.now(timezone.utc).isoformat(), "candidateCount": len(decisions), "explicitGroups": EXPLICIT_GROUPS, "decisions": decisions}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    md = ["# Phase 2 Cannibalization Decisions", "", "This is a decision matrix, not an authorization to merge, redirect, noindex, delete, or reassign canonicals. High-risk actions remain approval-gated.", "", "| Group | Pages | Similarity | Current intents | Recommendation | Confidence | Risk | Approval |", "|---|---|---:|---|---|---|---|---|"]
    for item in decisions:
        intents = "; ".join(f"{k}: {v}" for k, v in item["current_intents"].items())
        md.append(f"| {item['group']} | {', '.join(item['pages'])} | {item['similarity_score']} | {intents} | {item['recommended_action']} | {item['confidence']} | {item['risk']} | {'Yes' if item['approval_required'] else 'No'} |")
    (REPORTS / "phase2-cannibalization-decisions.md").write_text("\n".join(md) + "\n", encoding="utf-8")


def graph(pages: list[dict], label: str) -> dict:
    edges = Counter()
    source_counts = Counter()
    target_counts = Counter()
    sitewide_pairs = Counter()
    routes = {"/" if p["slug"] == "index" else f"/{p['slug']}" for p in pages}
    for page in pages:
        source = file_for_slug(page["slug"]).read_text(encoding="utf-8", errors="replace")
        parser = PageParser()
        parser.feed(source)
        route = "/" if page["slug"] == "index" else f"/{page['slug']}"
        for href in parser.links:
            target = internal_path(href)
            if not target or target not in routes or target == route:
                continue
            edges[(route, target)] += 1
            source_counts[route] += 1
            target_counts[target] += 1
            if any(x in source[max(0, source.find("<footer")):].lower() for x in ["footer", "sticky-cta-bar"]):
                sitewide_pairs[target] += 1
    inbound = {route: target_counts[route] for route in routes}
    outbound = {route: source_counts[route] for route in routes}
    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "label": label,
        "nodeCount": len(routes),
        "edgeCount": len(edges),
        "totalLinkOccurrences": sum(edges.values()),
        "nodes": [{"url": route, "inbound": inbound[route], "outbound": outbound[route]} for route in sorted(routes)],
        "edges": [{"source": source, "target": target, "count": count} for (source, target), count in sorted(edges.items())],
        "orphans": sorted(route for route, count in inbound.items() if count == 0 and route != "/"),
        "one_inbound": sorted(route for route, count in inbound.items() if count == 1),
        "excessive_sitewide_targets": sorted([(target, count) for target, count in sitewide_pairs.items() if count >= max(10, len(pages) * 0.70)], key=lambda x: -x[1]),
        "most_linked": sorted(target_counts.items(), key=lambda x: (-x[1], x[0]))[:30],
        "link_depth_note": "Depth is approximated from inbound edges; a full click-depth crawl requires a rendered deployment route map.",
    }


def write_graph(pages: list[dict], label: str) -> None:
    output = REPORTS / ("phase2-link-graph-before.json" if label == "before" else "phase2-link-graph-after.json")
    output.write_text(json.dumps(graph(pages, label), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    inventory = make_inventory()
    write_inventory(inventory)
    write_architecture_and_cannibalization(inventory)
    write_inventory(inventory)
    write_graph(inventory, sys.argv[1] if len(sys.argv) > 1 else "before")
    print(json.dumps({"pages": len(inventory), "inventory": "reports/phase2-content-inventory.json", "architecture": "reports/phase2-topical-architecture.json", "graph": "reports/phase2-link-graph-before.json"}, indent=2))
