#!/usr/bin/env python3
"""
DetectHiddenFees.com — Massive Site Authority Upgrade Pipeline
Audits and upgrades ALL pages to match the AI Financial Advisor authority standard.
Phase 1: Audit (identify gaps)
Phase 2: Upgrade (fix all pages)
Phase 3: Verify + Report
"""

import os
import re
import json
import time
from datetime import datetime

ROOT = r"c:\Users\lynns\Downloads\detecthiddenfees.com"
REPORT_FILE = os.path.join(ROOT, "site_authority_upgrade_report.md")

SKIP_PAGES = {
    '_source_copy.html', '_test123.html', 'test_check.html', 'test_long.html',
    'test_mini.html', 'test_out.html', 'out0.html', 'out1.html', 'part1.html',
    'header.html', 'headpart.html', 'indexnow-submit.html', 'hdr.html',
    'final.html', 'term-items.html', 'alphabet-links.html'
}

ALREADY_DONE = {
    'ai-financial-advisor.html',
    'ai-contract-review.html',
    'ai-construction-contract-review.html'
}


def has_org_schema(html):
    return '"Organization"' in html and '"name"' in html and '"DetectHiddenFees"' in html

def has_webpage_schema(html):
    return '"WebPage"' in html

def has_breadcrumb_schema(html):
    return '"BreadcrumbList"' in html

def has_faq_schema(html):
    return '"FAQPage"' in html

def has_article_schema(html):
    return '"Article"' in html and '"headline"' in html

def has_software_schema(html):
    return '"SoftwareApplication"' in html

def has_canonical(html, page):
    url_pattern = rf'href="https://detecthiddenfees\.com/{re.escape(page)}"'
    return bool(re.search(url_pattern, html))

def has_og_tags(html):
    return all(x in html for x in ['og:title', 'og:description', 'og:url'])

def has_twitter_card(html):
    return all(x in html for x in ['twitter:card', 'twitter:title'])

def has_faq_content(html):
    return bool(re.search(r'<h[23][^>]*>.*FAQ|Frequently Asked|Common Questions', html, re.IGNORECASE))

def has_quick_answers(html):
    patterns = [
        r'What\s+is\s+(an\s+)?',
        r'How\s+(does|can|to)\s+',
        r'Can\s+AI\s+',
        r'Why\s+(does|would|should)'
    ]
    matches = 0
    for p in patterns:
        if re.search(p, html, re.IGNORECASE):
            matches += 1
    return matches >= 2

def has_real_examples(html):
    return bool(re.search(r'\$\d[\d,]*', html)) and \
           bool(re.search(r'(example|scenario|case\s+study|real-?world)', html, re.IGNORECASE))

def has_methodology(html):
    return bool(re.search(r'(methodology|how\s+we\s+analyz|our\s+process|detecthiddenfees\s+(framework|method))', html, re.IGNORECASE))

def has_internal_links(html):
    return len(re.findall(r'href="/[\w-]+\.html"', html))

def has_cta_upload(html):
    return bool(re.search(r'(Upload|Analyze|Review)\s+(My|Your)\s+(Document|Bill|Contract|Invoice|File)', html, re.IGNORECASE))

def has_sticky_cta(html):
    return 'sticky-cta-bar' in html

def has_disclaimer(html):
    return bool(re.search(r'(Disclaimer|not\s+(a\s+)?(lawyer|attorney|legal|financial|professional))', html, re.IGNORECASE))

def has_preloads(html):
    return all(x in html for x in ['rel="preload"', 'fonts.googleapis.com', 'Inter'])

def estimate_word_count(html):
    body = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL)
    if not body:
        return 0
    text = re.sub(r'<[^>]+>', ' ', body.group(1))
    text = re.sub(r'\s+', ' ', text)
    return len(text.split())


def audit_page(page_path, page_name):
    try:
        with open(page_path, 'r', encoding='utf-8') as f:
            html = f.read()
    except:
        return None
    
    results = {
        'page': page_name,
        'size_kb': round(len(html) / 1024, 1),
        'word_count': estimate_word_count(html),
        'issues': [],
        'passed': [],
        'schema': {},
        'score': 0,
        'max_score': 20
    }
    
    schema_checks = {
        'org_schema': ('Organization schema', has_org_schema(html)),
        'webpage_schema': ('WebPage schema', has_webpage_schema(html)),
        'breadcrumb_schema': ('BreadcrumbList schema', has_breadcrumb_schema(html)),
        'faq_schema': ('FAQ schema', has_faq_schema(html)),
        'article_schema': ('Article schema', has_article_schema(html)),
        'software_schema': ('SoftwareApplication schema', has_software_schema(html)),
    }
    
    for key, (name, passed) in schema_checks.items():
        results['schema'][key] = passed
        if passed:
            results['passed'].append(name)
            results['score'] += 1
        else:
            results['issues'].append(f"Missing: {name}")
    
    content_checks = {
        'canonical': ('Canonical URL', has_canonical(html, page_name)),
        'og_tags': ('Open Graph tags', has_og_tags(html)),
        'twitter_card': ('Twitter Card tags', has_twitter_card(html)),
        'faq_content': ('FAQ section', has_faq_content(html)),
        'quick_answers': ('Quick answer blocks (AI retrieval optimized)', has_quick_answers(html)),
        'real_examples': ('Real-world examples with dollar amounts', has_real_examples(html)),
        'methodology': ('Methodology/framework section', has_methodology(html)),
        'internal_links': (f'Internal links ({has_internal_links(html)})', has_internal_links(html) >= 3),
        'cta_upload': ('Upload/Analyze CTA', has_cta_upload(html)),
        'sticky_cta': ('Sticky CTA bar', has_sticky_cta(html)),
        'disclaimer': ('Legal/financial disclaimer', has_disclaimer(html)),
        'preloads': ('Font preloading', has_preloads(html)),
    }
    
    for key, (name, passed) in content_checks.items():
        if passed:
            results['passed'].append(name)
            results['score'] += 1
        else:
            results['issues'].append(f"Missing: {name}")
    
    results['internal_link_count'] = has_internal_links(html)
    results['has_navigation'] = '<nav' in html or 'nav-wrap' in html or 'nav-links' in html
    results['has_footer'] = '<footer' in html or 'footer-links' in html
    
    return results


def get_priority_pages():
    priority_1 = [
        'ai-financial-analysis.html',
        'ai-agreement-analyzer.html',
        'ai-bill-analyzer.html',
        'ai-invoice-analyzer.html',
        'hidden-fee-detector.html',
        'ai-document-intelligence-center.html',
        'ai-analysis-hub.html',
    ]
    priority_2 = [
        'index.html',
        'hidden-fees-guides.html',
        'hidden-fees-resource-center.html',
        'ai-contract-review-tool.html',
        'ai-contract-review-software.html',
        'ai-bill-checker.html',
        'ai-invoice-checker.html',
        'ai-document-checker.html',
        'ai-document-reviewer.html',
        'ai-document-scanner.html',
        'ai-fee-detector.html',
        'contract-analysis-ai.html',
        'ai-contract-analysis.html',
        'bill-negotiation-service.html',
        'bill-negotiation-resource-center.html',
        'consumer-financial-intelligence-center.html',
        'ai-pricing-analysis.html',
        'ai-financial-assistant.html',
    ]
    priority_3 = [
        'hidden-bank-overdraft-fees.html',
        'hidden-dealership-financing-fees.html',
        'duplicate-medical-billing-charges.html',
        'hidden-home-renovation-fees.html',
        'hidden-hvac-contractor-fees.html',
        'hidden-mortgage-fees.html',
        'hidden-credit-card-fees.html',
        'hidden-subscription-fees.html',
        'hidden-phone-bill-fees.html',
        'hidden-streaming-fees.html',
        'hidden-loan-fees.html',
        'hidden-investment-fees.html',
        'hidden-internet-fees.html',
        'hidden-roofing-contractor-fees.html',
        'hidden-plumbing-fees.html',
        'hidden-electrician-fees.html',
        'hidden-landscaping-fees.html',
        'hidden-moving-company-fees.html',
        'hidden-billing-fees.html',
        'hidden-contract-fees.html',
    ]
    return priority_1 + priority_2 + priority_3


def upgrade_page(page_name, dry_run=True):
    fpath = os.path.join(ROOT, page_name)
    with open(fpath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    changes = []
    
    if page_name in ALREADY_DONE:
        return "ALREADY_DONE"
    
    # 1. Fix canonical URL
    canonical_pattern = re.compile(r'<link\s+rel="canonical"\s+href="https://detecthiddenfees\.com/[^"]*\.html/?"')
    if canonical_pattern.search(html):
        old = canonical_pattern.search(html).group()
        if old.endswith('/"'):
            new = old.rstrip('/')
            html = html.replace(old, new)
            changes.append("Fixed canonical URL (removed trailing slash)")
    else:
        new_link = f'<link rel="canonical" href="https://detecthiddenfees.com/{page_name}"/>'
        html = re.sub(r'(<link rel="canonical".*?>)', new_link, html, count=1)
        if 'canonical' not in html:
            html = re.sub(r'(<meta name="robots".*?/>)', r'\1\n' + new_link, html, count=1)
        changes.append("Added canonical URL")
    
    # 2. Organization schema
    if not has_org_schema(html):
        org_schema = '''<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DetectHiddenFees",
    "url": "https://detecthiddenfees.com",
    "logo": "https://detecthiddenfees.com/logo.png",
    "description": "AI-powered hidden fee detection platform that analyzes contracts, invoices, and financial documents for hidden costs and deceptive billing practices.",
    "foundingDate": "2025",
    "knowsAbout": ["AI Financial Advisor","Hidden Fee Detection","Financial Document Intelligence","AI Contract Analysis","AI Bill Analysis","Consumer Financial Transparency"],
    "sameAs": ["https://hiddenfeeai.com"],
    "brand": { "@type": "Brand", "name": "DetectHiddenFees" }
}
</script>'''
        html = html.replace('</head>', f'{org_schema}\n</head>')
        changes.append("Added Organization schema")
    
    # 3. WebPage schema
    if not has_webpage_schema(html):
        title_match = re.search(r'<title>(.*?)</title>', html)
        title = title_match.group(1) if title_match else page_name
        desc_match = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html)
        desc = desc_match.group(1) if desc_match else title
        webpage_schema = f'''<script type="application/ld+json">
{{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "{title}",
    "description": "{desc}",
    "url": "https://detecthiddenfees.com/{page_name}",
    "inLanguage": "en-US",
    "datePublished": "2026-07-21",
    "dateModified": "{datetime.now().strftime('%Y-%m-%d')}",
    "about": {{ "@type": "Thing", "name": "{title}" }},
    "isPartOf": {{ "@type": "WebSite", "name": "DetectHiddenFees", "url": "https://detecthiddenfees.com" }}
}}
</script>'''
        html = html.replace('</head>', f'{webpage_schema}\n</head>')
        changes.append("Added WebPage schema")
    
    # 4. BreadcrumbList schema
    if not has_breadcrumb_schema(html):
        bc_name = page_name.replace('.html', '').replace('-', ' ').title()
        bc_schema = f'''<script type="application/ld+json">
{{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://detecthiddenfees.com/" }},
        {{ "@type": "ListItem", "position": 2, "name": "{bc_name}", "item": "https://detecthiddenfees.com/{page_name}" }}
    ]
}}
</script>'''
        html = html.replace('</head>', f'{bc_schema}\n</head>')
        changes.append("Added BreadcrumbList schema")
    
    # 5. Open Graph & Twitter Card
    if not has_og_tags(html):
        title_match = re.search(r'<title>(.*?)</title>', html)
        title = title_match.group(1) if title_match else page_name
        desc_match = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html)
        desc = desc_match.group(1) if desc_match else title
        og_tags = f'''
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="https://detecthiddenfees.com/{page_name}">
<meta property="og:type" content="website">
<meta property="og:image" content="https://detecthiddenfees.com/og-image.png">
<meta property="og:site_name" content="DetectHiddenFees">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="https://detecthiddenfees.com/og-image.png">
'''
        html = html.replace('</head>', f'{og_tags}\n</head>')
        changes.append("Added Open Graph and Twitter Card tags")
    
    # 6. Font preloads
    if 'rel="preload"' not in html:
        preloads = '''<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" />
<link rel="preload" href="/favicon.svg" as="image" />'''
        html = html.replace('<title>', f'{preloads}\n<title>', 1)
        changes.append("Added font preloads")
    
    # 7. Favicon
    if 'favicon.svg' not in html:
        favicon = '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n<link rel="alternate icon" href="/favicon.svg" />\n<link rel="apple-touch-icon" href="/favicon.svg" />'
        html = html.replace('</head>', f'{favicon}\n</head>')
        changes.append("Added favicon links")
    
    # 8. Preconnect fonts
    if 'fonts.gstatic.com' not in html:
        preconnect = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'''
        html = html.replace('</head>', f'{preconnect}\n</head>')
        changes.append("Added font preconnect links")
    
    # 9. dns-prefetch
    if 'dns-prefetch' not in html and 'hiddenfeeai' not in html:
        dns = '<link rel="dns-prefetch" href="https://hiddenfeeai.com" />'
        html = html.replace('</head>', f'{dns}\n</head>')
        changes.append("Added dns-prefetch for hiddenfeeai.com")
    
    # 10. theme-color
    if 'theme-color' not in html:
        html = html.replace('</head>', '<meta name="theme-color" content="#2563eb" />\n</head>')
        changes.append("Added theme-color")
    
    # 11. Sticky CTA bar
    if 'sticky-cta-bar' not in html and '<body' in html:
        if 'bill' in page_name.lower():
            item = 'Bill'
        elif 'invoice' in page_name.lower():
            item = 'Invoice'
        elif 'contract' in page_name.lower():
            item = 'Contract'
        elif 'fee' in page_name.lower():
            item = 'Document'
        else:
            item = 'Document'
        
        sticky_cta = f'''
<div class="sticky-cta-bar">
    <div class="sticky-text"><span>🔍 Analyze Your {item}</span><span class="price">$15</span></div>
    <a href="https://hiddenfeeai.com" class="sticky-btn">Analyze Now</a>
</div>

<style>
.sticky-cta-bar {{ display:none; position:fixed; bottom:0; left:0; right:0; z-index:1000; background:rgba(2,8,23,.95); backdrop-filter:blur(24px) saturate(1.4); padding:12px 20px; border-top:1px solid rgba(59,130,246,0.15); align-items:center; justify-content:space-between; gap:16px; box-shadow:0 -10px 40px rgba(0,0,0,0.6); }}
.sticky-cta-bar .sticky-text {{ font-weight:700; font-size:.95rem; color:#e2e8f0; white-space:nowrap; display:flex; align-items:center; gap:12px; }}
.sticky-cta-bar .sticky-text .price {{ color:#3b82f6; background:rgba(59,130,246,.15); padding:2px 12px; border-radius:100px; font-size:.85rem; }}
.sticky-cta-bar .sticky-btn {{ display:inline-block; padding:12px 28px; border-radius:14px; background:linear-gradient(135deg,#2563eb,#9333ea); color:white; font-weight:800; font-size:.95rem; box-shadow:0 8px 30px rgba(59,130,246,.35); text-align:center; border:none; cursor:pointer; transition:transform 0.2s; }}
.sticky-cta-bar .sticky-btn:hover {{ transform:scale(1.03); }}
@media(min-width:901px){{ .sticky-cta-bar {{ display:flex; }} body {{ padding-bottom:80px; }} }}
@media(max-width:900px){{ .sticky-cta-bar {{ display:flex; padding:6px 10px; gap:6px; }} .sticky-cta-bar .sticky-btn {{ padding:6px 12px; font-size:.75rem; min-height:34px; border-radius:10px; }} .sticky-cta-bar .sticky-text {{ font-size:.7rem; gap:4px; }} body {{ padding-bottom:52px; }} }}
</style>
'''
        html = html.replace('</body>', f'{sticky_cta}\n</body>')
        changes.append("Added sticky CTA bar")
    
    if not dry_run and changes:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(html)
        return f"UPGRADED: {len(changes)} changes — {', '.join(changes[:5])}{'...' if len(changes) > 5 else ''}"
    elif changes:
        return f"DRY_RUN: {len(changes)} changes needed — {', '.join(changes[:3])}{'...' if len(changes) > 3 else ''}"
    else:
        return "ALREADY_GOOD"


def run_audit():
    print("=" * 70)
    print("PHASE 1: COMPREHENSIVE SITE AUDIT")
    print(f"Scanning {ROOT} for HTML pages...")
    print("=" * 70)
    
    results = []
    priority_results = []
    priority_pages = get_priority_pages()
    
    for fname in os.listdir(ROOT):
        if not fname.endswith('.html'):
            continue
        if fname in SKIP_PAGES:
            continue
        fpath = os.path.join(ROOT, fname)
        audit = audit_page(fpath, fname)
        if audit is None:
            continue
        results.append(audit)
        if fname in priority_pages:
            priority_results.append(audit)
    
    total = len(results)
    avg_score = sum(r['score'] for r in results) / total if total > 0 else 0
    avg_words = sum(r['word_count'] for r in results) / total if total > 0 else 0
    
    needs_improvement_all = [r for r in results if r['score'] < 14]
    
    print(f"\nTotal audited: {total}")
    print(f"Average authority score: {avg_score:.1f}/20")
    print(f"Average word count: {int(avg_words)}")
    print(f"Total pages needing upgrade: {len(needs_improvement_all)}")
    
    return results, priority_results, needs_improvement_all


def main():
    start_time = time.time()
    
    all_results, priority_results, needs_upgrade = run_audit()
    
    print("\n" + "=" * 70)
    print("PHASE 2: UPGRADE PASS (DRY RUN)")
    print("=" * 70)
    
    upgrade_results = {}
    priority_pages = get_priority_pages()
    
    for page in priority_pages:
        if page in ALREADY_DONE:
            continue
        fpath = os.path.join(ROOT, page)
        if not os.path.exists(fpath):
            continue
        result = upgrade_page(page, dry_run=True)
        upgrade_results[page] = result
        print(f"  {page}: {result}")
    
    remaining = [r['page'] for r in needs_upgrade if r['page'] not in priority_pages and r['page'] not in ALREADY_DONE]
    for page in remaining:
        result = upgrade_page(page, dry_run=True)
        upgrade_results[page] = result
    
    print("\n" + "=" * 70)
    print("GENERATING REPORT")
    print("=" * 70)
    
    total = len(all_results)
    avg_score = sum(r['score'] for r in all_results) / total if total > 0 else 0
    pages_upgraded = len([v for v in upgrade_results.values() if v.startswith('DRY_RUN')])
    pages_already_good = len([v for v in upgrade_results.values() if v == 'ALREADY_GOOD'])
    pages_already_done = len([v for v in upgrade_results.values() if v == 'ALREADY_DONE'])
    
    pages_with_org = sum(1 for r in all_results if r['schema'].get('org_schema'))
    pages_with_breadcrumb = sum(1 for r in all_results if r['schema'].get('breadcrumb_schema'))
    pages_with_faq = sum(1 for r in all_results if r['schema'].get('faq_schema'))
    pages_with_article = sum(1 for r in all_results if r['schema'].get('article_schema'))
    pages_with_software = sum(1 for r in all_results if r['schema'].get('software_schema'))
    
    # Issue aggregation
    issue_counts = {}
    for r in all_results:
        for issue in r['issues']:
            issue_key = issue.replace('Missing: ', '')
            issue_counts[issue_key] = issue_counts.get(issue_key, 0) + 1
    
    sorted_issues = sorted(issue_counts.items(), key=lambda x: -x[1])
    
    # lowest scoring priority pages
    sorted_priority = sorted([r for r in priority_results if r['page'] not in ALREADY_DONE], key=lambda x: x['score'])
    
    report = f"""# DetectHiddenFees.com — Site Authority Upgrade Report

**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Pages Audited:** {total}
**Average Authority Score:** {avg_score:.1f}/20
**Average Word Count:** {int(sum(r['word_count'] for r in all_results) / total)} words

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total HTML Pages | {total} |
| Priority Pages | {len(priority_pages)} |
| Pages Already Authority-Grade | {len(ALREADY_DONE)} |
| Pages Upgraded (dry run) | {pages_upgraded} |
| Pages Already Compliant | {pages_already_good} |
| Average Authority Score | {avg_score:.1f}/20 |

### Schema Coverage

| Schema Type | Pages With | Coverage |
|-------------|-----------|----------|
| Organization | {pages_with_org}/{total} | {pages_with_org/total*100:.0f}% |
| WebPage | {pages_with_org}/{total} | {pages_with_org/total*100:.0f}% |
| BreadcrumbList | {pages_with_breadcrumb}/{total} | {pages_with_breadcrumb/total*100:.0f}% |
| FAQPage | {pages_with_faq}/{total} | {pages_with_faq/total*100:.0f}% |
| Article | {pages_with_article}/{total} | {pages_with_article/total*100:.0f}% |
| SoftwareApplication | {pages_with_software}/{total} | {pages_with_software/total*100:.0f}% |

---

## Upgrade Summary

### Tier 1: Core Topic Cluster Pages

| Page | Status |
|------|--------|
"""
    for page in priority_pages[:7]:
        status = upgrade_results.get(page, 'UNKNOWN')
        report += f"| {page} | {status[:40]} |\n"
    
    report += "\n### Tier 2: Secondary Authority Pages\n\n| Page | Status |\n|------|--------|\n"
    for page in priority_pages[7:25]:
        status = upgrade_results.get(page, 'UNKNOWN')
        report += f"| {page} | {status[:40]} |\n"
    
    report += "\n### Tier 3: Industry Fee Guides\n\n| Page | Status |\n|------|--------|\n"
    for page in priority_pages[25:45]:
        if page in upgrade_results:
            status = upgrade_results.get(page, 'UNKNOWN')
            report += f"| {page} | {status[:40]} |\n"
    
    report += "\n---\n\n## Authority Gaps Identified\n\n### Most Common Missing Elements\n"
    for issue, count in sorted_issues[:15]:
        pct = count / total * 100
        report += f"- **{issue}**: {count} pages ({pct:.0f}%)\n"
    
    report += "\n---\n\n## Priority Pages Needing Most Work\n\n"
    for r in sorted_priority[:20]:
        report += f"- **{r['page']}**: Score {r['score']}/20, {r['word_count']} words, {r['size_kb']}KB\n"
    
    report += "\n---\n\n## Recommended Next Steps\n\n"
    report += """1. Run `python upgrade_site.py --apply` to apply all dry-run changes to priority pages
2. Run `python upgrade_site.py --apply` again for remaining pages
3. Verify each upgraded page passes the quality gates (brain/quality-gates.md)
4. Update sitemap.xml
5. Push to GitHub: "Site authority upgrade — Phase 1: schema, meta, CTA standardization"

---

## Automated Upgrades Applied

Each page received where missing:

- Organization schema (JSON-LD)
- WebPage schema with dates + metadata
- BreadcrumbList schema (2-level minimum)
- Canonical URL (no trailing slash)
- Open Graph tags (title, desc, url, image, type, site_name)
- Twitter Card tags (summary_large_image)
- Font preloading (Inter from Google Fonts)
- Favicon as SVG
- Preconnect for fonts.googleapis.com + fonts.gstatic.com
- dns-prefetch for hiddenfeeai.com API
- theme-color meta tag (#2563eb)
- Sticky CTA bar with $15 pricing

*Content upgrades (FAQ, quick answer blocks, methodology sections, real-world examples) require manual editorial work per page.*
"""
    
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        f.write(report)
    
    elapsed = time.time() - start_time
    print(f"\nReport saved to: {REPORT_FILE}")
    print(f"Completed in {elapsed:.1f}s")
    print(f"\nTo apply changes: python upgrade_site.py --apply")


if __name__ == '__main__':
    import sys
    if '--apply' in sys.argv:
        print("LIVE MODE: Applying upgrades to files...")
        for page in get_priority_pages():
            if page in ALREADY_DONE:
                continue
            fpath = os.path.join(ROOT, page)
            if not os.path.exists(fpath):
                continue
            result = upgrade_page(page, dry_run=False)
            print(f"  {page}: {result}")
        print("Upgrade complete!")
    else:
        print("DRY RUN MODE. Use --apply to apply changes.")
        main()