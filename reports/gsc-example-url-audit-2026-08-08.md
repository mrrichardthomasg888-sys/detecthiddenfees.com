# Search Console Example URL Audit — 2026-08-08

## Scope

This audit checks the 40 example URLs supplied from the Search Console coverage report. It verifies live HTTP behavior and the canonical link exposed by successful responses. It does not replace Search Console URL Inspection or authenticated coverage data.

## Result

| Check | Result |
|---|---:|
| URLs checked | 40 |
| URLs returning 200 | 38 |
| Duplicate aliases returning 301 | 2 |
| Successful pages with a non-self canonical | 0 |

The two aliases that previously represented alternate pages now redirect to the canonical resource:

| Reported URL | Live result | Canonical destination |
|---|---:|---|
| `/ai-document-intelligence-center` | 301 | `/ai-analysis-hub` |
| `/before-signing-a-contract` | 301 | `/before-signing-contract-checklist` |

The other 38 supplied examples return HTTP 200 and expose a self-referencing canonical URL. This means the live site no longer presents those examples as 200-status alternate pages with a different canonical.

## Interpretation

The Search Console reason “Alternate page with proper canonical tag” is intentional when Google encounters a duplicate URL that points to a preferred canonical. The two duplicate aliases are now handled more explicitly with redirects, while canonical pages remain available for crawling and indexing.

This live HTTP audit cannot confirm whether Google has reprocessed every URL or whether a specific URL is indexed. Search Console URL Inspection and the coverage report remain the source of truth for that state.

## Follow-up

1. Request validation or inspection for the two redirected aliases only if they continue to appear in the report after Google recrawls them.
2. Request indexing for canonical pages that remain important and are not indexed after the redirect/canonical cleanup.
3. Keep the sitemap limited to canonical, indexable URLs.
4. Continue collecting authenticated Search Console data before publishing ranking or traffic conclusions.

## Verification context

- Production origin: `https://detecthiddenfees.com`
- Checked: 2026-08-08
- Method: live HTTP requests with redirects disabled, followed by canonical-link inspection for HTTP 200 responses
- Repository rule: do not infer Google indexing solely from a successful HTTP response
