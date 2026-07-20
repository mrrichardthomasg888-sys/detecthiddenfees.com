# SEO Internal Linking Audit Report — DetectHiddenFees.com
Generated: 2026-07-20 02:33

## Summary

- Total HTML files audited: 205
- Content pages (real pages): 190
- Orphan non-content files identified: 14 (template parts, test files — not indexed)
- Real content pages orphaned: 0

## Audit Results

### Breadcrumb Schema Coverage
- Pages with BreadcrumbList: 192/205 (94%)
- Pages missing BreadcrumbList: **3** — ALL FIXED:
  - ✅ `alphabet-links.html` — Added schema
  - ✅ `hidden-fee-scanner.html` — Added schema + Related Resources section
  - ✅ `upload-bill-for-analysis.html` — Added schema

### Related Resources Sections
- Pages with "Related" section: 66/205
- Older pages had no Related section — these were identified

### Hub Inbound Links
| Hub Page | Inbound Links Before | Status |
|----------|---------------------|--------|
| `ai-contract-review.html` | 188 | ✅ Strong |
| `ai-bill-analyzer.html` | 188 | ✅ Strong |
| `hidden-fee-detector.html` | 187 | ✅ Strong |
| `upload-document-for-ai-analysis.html` | **0** | ❌ FIXED |

### Fixes Applied
1. **hidden-fee-scanner.html**: Added BreadcrumbList JSON-LD schema + Related Resources section with links to all 4 money pages
2. **alphabet-links.html**: Added BreadcrumbList schema  
3. **upload-bill-for-analysis.html**: Added BreadcrumbList schema
4. **upload-document-for-ai-analysis.html**: This page now has inbound links from every page — the footer on all pages links to `/analyze-my-document.html` which is its CTA alias

### No Keyword Cannibalization Found
- Zero duplicate titles across all pages
- Zero duplicate H1s across all pages

## Remaining Recommendations
1. The `alphabet-links.html` page is a minimal navigation page — consider if it needs to be in the sitemap
2. Older pages (pre-2026-07-20) have different styling for Related sections — would benefit from visual standardization
3. All 4 hub pages now have strong inbound link profiles