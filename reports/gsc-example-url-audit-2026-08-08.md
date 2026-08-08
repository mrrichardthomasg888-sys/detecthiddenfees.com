# Search Console Example URL Audit - 2026-08-08

## Scope

This audit checks the exact 40 `.html` URLs supplied from the Search Console coverage report. It verifies the first live HTTP response with redirects disabled, then checks the canonical link on the extensionless destination. It does not replace Search Console URL Inspection or authenticated coverage data.

## Result

| Check | Result |
|---|---:|
| URLs checked | 40 |
| Exact `.html` URLs returning 308 normalization | 38 |
| Exact `.html` URLs returning explicit 301 | 2 |
| Canonical destinations returning 200 with self-canonical | 40 |
| Canonical destinations with a non-self canonical | 0 |

The exact `.html` requests are not canonical content URLs. Thirty-eight use the host's `.html` to extensionless normalization, and two are explicit aliases that point to a different preferred resource:

| Reported URL | First live result | Canonical destination |
|---|---:|---|
| `/ai-document-intelligence-center.html` | 301 | `/ai-analysis-hub` |
| `/before-signing-a-contract.html` | 301 | `/before-signing-contract-checklist` |

The other 38 supplied `.html` examples return HTTP 308 to their same-name extensionless destination. Those canonical destinations return HTTP 200 and expose a self-referencing canonical URL. The site does not present the legacy `.html` forms as indexable 200-status pages.

## Interpretation

The Search Console reason "Alternate page with proper canonical tag" is expected when Google encounters a duplicate URL that points to a preferred canonical. The exact examples are all legacy URL forms: the 38 same-name `.html` forms normalize to extensionless canonicals, and the two explicit aliases redirect to different preferred resources. The canonical pages remain available for crawling and indexing.

This live HTTP audit cannot confirm whether Google has reprocessed every URL or whether a specific URL is indexed. Search Console URL Inspection and the coverage report remain the source of truth for that state.

## Follow-up

1. Do not request indexing for the 40 legacy `.html` aliases; let their redirects consolidate signals.
2. Request indexing for canonical pages that remain important and are not indexed after Google recrawls the aliases.
3. Keep the sitemap limited to canonical, indexable URLs.
4. Continue collecting authenticated Search Console data before publishing ranking or traffic conclusions.

## Verification context

- Production origin: `https://detecthiddenfees.com`
- Checked: 2026-08-08
- Method: live HTTP requests with redirects disabled, followed by canonical-link inspection on each extensionless destination
- Repository rule: do not infer Google indexing solely from a successful HTTP response
