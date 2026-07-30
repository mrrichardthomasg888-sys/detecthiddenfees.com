# DetectHiddenFees.com Technical SEO, AEO & GEO Audit

Audit date: 2026-07-30  
Scope: repository-wide static audit of the 241-page site, crawl/indexation controls, structured data, internal links, sitemap/feed assets, redirect rules, and live homepage validation.

## Executive result

The site had a large amount of production content, but the repository also contained scratch fragments and inconsistent generated metadata. Those inconsistencies could create Search Console exclusions such as “Crawled – currently not indexed,” “Duplicate without user-selected canonical,” “Alternate page with proper canonical tag,” and “Soft 404” for fragment pages.

The repository is now normalized to 226 real HTML pages. Scratch fragments were removed, canonical conflicts were consolidated, metadata was completed, broken local links were fixed, and sitemap/RSS/robots/IndexNow assets were aligned.

## Findings and fixes

| Area | Before | Fix applied | Status |
| --- | ---: | --- | --- |
| HTML inventory | 241 files, including fragments and test outputs | Removed 15 scratch/fragment files that had no complete document head or meaningful page experience | Fixed |
| XML sitemap | 222 URLs, duplicated `<changefreq>`/`<priority>` entries, and non-production coverage | Regenerated from indexable, self-canonical production pages; 201 URLs including the homepage | Fixed |
| Page titles | 22 missing; 210 longer than 60 characters | Added missing titles and normalized titles to concise, branded titles | Fixed |
| Meta descriptions | 12 missing; 86 longer than 160 characters | Added missing descriptions and normalized all descriptions to search-snippet length | Fixed |
| Canonicals | 12 missing; 4 conflicting canonical groups | Added self-canonicals and redirected consolidated duplicates through `_headers` | Fixed |
| Robots meta | Utility page was indexable | Marked `indexnow-submit.html` `noindex,follow`; production pages remain indexable | Fixed |
| H1 structure | 12 pages had zero or multiple H1s | Removed the duplicate H1 and removed fragment pages; remaining production pages have one H1 | Fixed |
| Structured data | Several fragment pages had none | Added a valid WebPage JSON-LD fallback where absent; preserved existing page-specific schemas | Fixed |
| Internal links | 9 broken local `.html` targets; multiple orphaned tools | Repaired all broken targets and added a related-resource cluster to the Knowledge Center | Fixed |
| Images / CLS | Badge images lacked intrinsic dimensions | Added width/height attributes to external badges and normalized image dimensions | Fixed |
| RSS | No RSS feed | Added `rss.xml` with indexable page entries and linked it from every HTML page | Fixed |
| Robots | Overly long, duplicated crawler blocks plus unsupported directives | Simplified policy, retained AI/search access, added sitemap and IndexNow references | Fixed |
| Redirects | Consolidation existed but did not cover all duplicate content | Added redirects for testing-results, fee-detection methodology, and sample-report duplicates | Fixed |
| GEO/AEO discoverability | `llms.txt` existed but was not connected through page metadata | Retained the entity/resource map, connected RSS and sitemap discovery, and kept direct-answer/FAQ/schema content | Fixed |

## Verification after fixes

- 226 HTML pages audited.
- 0 missing titles.
- 0 missing meta descriptions.
- 0 missing canonicals.
- 0 duplicate canonical URLs among remaining HTML pages.
- 0 broken local HTML links after redirect exceptions.
- 0 pages without JSON-LD.
- 0 production pages with zero/multiple H1s.
- 1 intentional `noindex` utility page: `indexnow-submit.html`.
- 201 sitemap URLs; every sitemap URL resolves to a file in the repository.
- `rss.xml`, `robots.txt`, `llms.txt`, `indexnow-key.txt`, `_headers`, and `sitemap.xml` are present.
- No blocking external JavaScript tags were found in the HTML audit.

## AEO/GEO implementation notes

The site retains its direct-answer sections, FAQPage markup where present, WebPage/Breadcrumb/Organization/Product schemas, editorial-policy and methodology links, and the `llms.txt` entity/resource graph. Page-level metadata now gives answer engines a consistent title, description, canonical URL, author, language, and RSS discovery signal. Duplicate pages are no longer presented as separate canonical candidates.

## Remaining recommendations

1. In Google Search Console, submit `https://detecthiddenfees.com/sitemap.xml` and use URL Inspection to request indexing for the homepage, hubs, and any newly consolidated URLs. Code changes cannot submit Search Console validation without an authenticated property session.
2. In Search Console, click “Validate fix” for each existing exclusion reason after Google recrawls the deployment. This audit cannot see the property’s private GSC issue counts.
3. After deployment, run a Lighthouse/PageSpeed test on the homepage and the largest hub pages from a production region. Static analysis can confirm crawlability and obvious CLS risks but cannot replace field Core Web Vitals data.
4. Keep the sitemap limited to pages returning HTTP 200 with self-canonicals. If future redirects are added, update `scripts/normalize-seo.js` and rerun it before publishing.
5. Review IndexNow response logs after deployment. IndexNow accelerates Bing/Yandex discovery; it does not replace Google Search Console submission.

## Post-publish checks

- GitHub `main` contains the new sitemap and RSS feed after commit `9caa93b`.
- The public origin returned the existing sitemap and key successfully during the final check. The public `rss.xml` response was still served with the prior HTML content type at that moment, which indicates the hosting/CDN deployment had not fully propagated the new feed yet. Recheck after the hosting build completes.
- IndexNow verification reached the live key successfully, but Bing returned HTTP 403 `User is unauthorized to access the site`. Configure the IndexNow/Bing site ownership verification or a Cloudflare bypass for `/indexnow-key.txt`, then rerun `node submit_indexnow.js`.
