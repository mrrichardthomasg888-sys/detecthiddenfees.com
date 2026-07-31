from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "reports"
BASE = "https://detecthiddenfees.com"

CLAIM_PATTERNS = {
    "savings_or_financial_outcome": r"\b(save|savings|saving|overpay|costs? you|pay less|thousands|billions|high(?:est)?-return|potential savings)\b",
    "pricing_or_market_rate": r"\b(average|typical|standard|normal ranges?|industry benchmarks?|market benchmarks?|rates?|pricing|costs?|%|percent|\$\d)\b",
    "legal_or_regulatory": r"\b(law|legal|right|rights|regulation|regulatory|statute|court|arbitration|refund|cancel(?:lation)?|consumer protection|compliance|allowable)\b",
    "ai_performance": r"\b(accuracy|accurate|accuracy rate|catches|detection rate|false positives?|false negatives?|trained on|benchmark|testing|90%|95%|most accurate)\b",
    "security_privacy": r"\b(secure|security|encrypted|encryption|privacy|retention|stored|storage|deleted|deletion|never sold|AI training|confidential|third[- ]party|access)\b",
    "product_capability": r"\b(upload|file types?|PDF|DOCX|Word|spreadsheet|Excel|OCR|scanned|image|report|in minutes|instant|one[- ]time|subscription|maximum|size limit)\b",
    "market_or_prevalence": r"\b(percentage|prevalence|frequently|commonly|billions|millions|every household|most consumers|many consumers|widespread|major industr)\b",
    "absolute_or_superlative": r"\b(best|most|always|never|guaranteed|guarantee|complete|every|any|all|no subscription|no hidden charges|nothing|instantly|instant)\b",
}

HIGH_RISK_CATEGORIES = {"legal_or_regulatory", "security_privacy", "ai_performance"}


def canonical_pages() -> list[dict]:
    root = BeautifulSoup((ROOT / "sitemap.xml").read_text(encoding="utf-8"), "xml")
    pages = []
    for loc in root.find_all("loc"):
        url = loc.get_text(strip=True)
        slug = urlparse(url).path.strip("/") or "index"
        pages.append({"url": url, "slug": slug, "file": f"{slug}.html"})
    return pages


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def sentence_candidates(main_text: str) -> list[str]:
    chunks = re.split(r"(?<=[.!?])\s+|\n+", main_text)
    seen = set()
    result = []
    for chunk in chunks:
        text = clean(chunk)
        if len(text) < 35 or len(text) > 700 or text in seen:
            continue
        seen.add(text)
        result.append(text)
    return result


def categories_for(text: str) -> list[str]:
    return [name for name, pattern in CLAIM_PATTERNS.items() if re.search(pattern, text, re.I)]


def claim_kind(text: str) -> str:
    low = text.lower()
    if any(x in low for x in ["we analyze", "our ai", "hiddenfeeai", "our platform", "our system"]):
        return "promotional_or_product_statement"
    if any(x in low for x in ["should", "ask", "check", "review", "contact", "consult"]):
        return "instructional"
    if any(x in low for x in ["may", "could", "appears", "potential", "typically"]):
        return "estimated_or_qualified"
    return "factual_or_generalized"


def risk_for(categories: list[str], text: str, source_present: bool) -> str:
    low = text.lower()
    if "ai_performance" in categories and re.search(r"\b(90|95|99)%|accuracy|catches over|detection rate", low):
        return "Critical"
    if any(category in HIGH_RISK_CATEGORIES for category in categories):
        return "High"
    if "savings_or_financial_outcome" in categories or "legal_or_regulatory" in categories or "market_or_prevalence" in categories:
        return "High" if not source_present else "Medium"
    if "product_capability" in categories or "absolute_or_superlative" in categories:
        return "Medium"
    return "Low"


def action_for(categories: list[str], risk: str, source_present: bool) -> str:
    if risk == "Critical":
        return "Owner or specialist verification required; narrow or remove until supported"
    if "security_privacy" in categories:
        return "Verify against product code and policy; narrow wording if unverifiable"
    if "legal_or_regulatory" in categories:
        return "Add primary jurisdiction-specific source and legal qualifier or refer for review"
    if "ai_performance" in categories:
        return "Move performance claim to documented testing or remove unsupported number"
    if not source_present and any(x in categories for x in ["savings_or_financial_outcome", "pricing_or_market_rate", "market_or_prevalence"]):
        return "Add a directly supporting source or label as an example/estimate"
    if "product_capability" in categories:
        return "Verify in product implementation or policy before retaining as fact"
    if "absolute_or_superlative" in categories:
        return "Narrow absolute or promotional wording"
    return "Retain only after editorial source review"


def audit_claims() -> list[dict]:
    claims = []
    for page in canonical_pages():
        path = ROOT / page["file"]
        if not path.exists():
            continue
        soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="replace"), "html.parser")
        main = soup.find("main") or soup
        for node in main.select("script, style, nav, footer, header"):
            node.decompose()
        paragraphs = main.find_all(["p", "li", "td", "th"])
        for node in paragraphs:
            text = clean(node.get_text(" ", strip=True))
            categories = categories_for(text)
            if not categories:
                continue
            external = []
            for anchor in node.find_all("a", href=True):
                href = anchor["href"].strip()
                parsed = urlparse(href)
                if parsed.scheme in {"http", "https"} and parsed.netloc.lower() not in {"detecthiddenfees.com", "www.detecthiddenfees.com", "hiddenfeeai.com"}:
                    external.append({"label": clean(anchor.get_text(" ", strip=True)), "url": href})
            risk = risk_for(categories, text, bool(external))
            claims.append({
                "url": page["url"],
                "file": page["file"],
                "exact_claim_text": text,
                "claim_category": categories,
                "claim_type": claim_kind(text),
                "visible_source_present": bool(external),
                "visible_sources": external,
                "source_support_status": "requires_manual_verification" if external else "no_visible_source_found",
                "source_quality": "unassessed",
                "source_publication_date": None,
                "geographic_scope": "not stated",
                "time_sensitivity": "high" if any(x in categories for x in ["pricing_or_market_rate", "legal_or_regulatory", "security_privacy", "product_capability"]) else "medium",
                "expert_review_required": risk in {"Critical", "High"},
                "risk_level": risk,
                "recommended_action": action_for(categories, risk, bool(external)),
            })
    deduped = {}
    for claim in claims:
        key = (claim["url"], claim["exact_claim_text"])
        deduped[key] = claim
    return list(deduped.values())


def write_claim_outputs(claims: list[dict]) -> None:
    (REPORTS / "phase3-claim-inventory.json").write_text(json.dumps({"generatedAt": datetime.now(timezone.utc).isoformat(), "claimCount": len(claims), "claims": claims}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    fields = ["url", "file", "exact_claim_text", "claim_category", "claim_type", "visible_source_present", "visible_sources", "source_support_status", "source_quality", "source_publication_date", "geographic_scope", "time_sensitivity", "expert_review_required", "risk_level", "recommended_action"]
    with (REPORTS / "phase3-claim-inventory.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for claim in claims:
            row = {field: claim.get(field, "") for field in fields}
            for field in ["claim_category", "visible_sources"]:
                row[field] = json.dumps(row[field], ensure_ascii=False)
            writer.writerow(row)
    counts = Counter(claim["risk_level"] for claim in claims)
    category_counts = Counter(category for claim in claims for category in claim["claim_category"])
    high_examples = [claim for claim in claims if claim["risk_level"] in {"Critical", "High"}][:80]
    lines = ["# Phase 3 Claim Risk Report", "", f"The automated audit identified {len(claims)} material claim candidates across all 225 canonical pages. It is a triage inventory, not a final legal, privacy, security, or product verification. Each source relationship still requires human review.", "", "## Risk distribution", "", "| Risk | Claims |", "|---|---:|"]
    lines += [f"| {risk} | {counts.get(risk, 0)} |" for risk in ["Critical", "High", "Medium", "Low"]]
    lines += ["", "## Category distribution", "", "| Category | Claims |", "|---|---:|"]
    lines += [f"| `{category}` | {count} |" for category, count in category_counts.most_common()]
    lines += ["", "## Highest-risk examples", ""]
    for claim in high_examples:
        lines.append(f"- **{claim['risk_level']}** `{urlparse(claim['url']).path}` — {claim['exact_claim_text'][:300]}")
    lines += ["", "## Interpretation", "", "Claims with no visible source are not automatically false; they are unsupported until an appropriate source, product verification, owner confirmation, or narrower wording is available. Absolute product, security, privacy, savings, legal, and accuracy claims should not be published as settled facts without evidence."]
    (REPORTS / "phase3-claim-risk-report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def audit_product_claims(claims: list[dict]) -> None:
    product_terms = re.compile(r"\b(hiddenfeeai|our ai|the ai|ai-powered|upload|PDF|DOCX|Word|spreadsheet|OCR|encrypted|secure|stored|deleted|training|accuracy|in minutes|one-time|subscription|report|risk score)\b", re.I)
    selected = [claim for claim in claims if product_terms.search(claim["exact_claim_text"])]
    repo_files = [str(path.relative_to(ROOT)) for path in ROOT.rglob("*") if path.is_file() and any(token in path.name.lower() for token in ["app", "api", "server", "upload", "storage", "hiddenfeeai", "supabase", "vercel"])][:100]
    status_counts = Counter()
    records = []
    for claim in selected:
        text = claim["exact_claim_text"]
        low = text.lower()
        if any(word in low for word in ["secure", "encrypt", "stored", "deleted", "training", "privacy", "retention", "never"]):
            status = "Owner-confirmation required"
        elif any(word in low for word in ["pdf", "docx", "word", "spreadsheet", "ocr", "upload", "report"]):
            status = "Owner-confirmation required"
        else:
            status = "Not verified in repository"
        status_counts[status] += 1
        records.append({"url": claim["url"], "claim": text, "verification_status": status, "repository_evidence": "No HiddenFeeAI application/runtime source was identified in the site repository; verify against the product implementation, configuration, and policy before publishing as fact."})
    data = {"generatedAt": datetime.now(timezone.utc).isoformat(), "claimCount": len(records), "repositoryEvidenceFiles": repo_files, "claims": records}
    (REPORTS / "phase3-product-claim-audit.json").write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    lines = ["# Phase 3 Product-Claim Report", "", f"The audit identified {len(records)} product or AI capability statements. The repository contains the DetectHiddenFees static site and policies, but no verifiable HiddenFeeAI application/runtime source sufficient to confirm product behavior.", "", "| Verification status | Claims |", "|---|---:|"]
    lines += [f"| {status} | {count} |" for status, count in status_counts.items()]
    lines += ["", "## Owner confirmation required", "", "- Supported file types, maximum upload size, OCR, spreadsheet/DOCX handling, extraction completeness, analysis speed, model provider/model name, accuracy, false-positive/false-negative behavior, risk-score semantics, storage, deletion, encryption, human access, third-party processors, privacy, refunds, report features, negotiation scripts, and savings calculations.", "- Do not publish a product verification badge or quantitative benchmark until the owner provides implementation, configuration, policy, or documented-test evidence.", "- Do not expose secrets, prompts, keys, private documents, or sensitive infrastructure details while performing that verification."]
    (REPORTS / "phase3-product-claim-report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    claims = audit_claims()
    write_claim_outputs(claims)
    audit_product_claims(claims)
    print(json.dumps({"claims": len(claims), "risk": Counter(x["risk_level"] for x in claims), "productClaims": sum(1 for x in claims if "product_capability" in x["claim_category"])}, indent=2, default=dict))


if __name__ == "__main__":
    main()
