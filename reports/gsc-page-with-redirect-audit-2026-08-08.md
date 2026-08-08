# Search Console “Page with redirect” Audit — 2026-08-08

## Scope

This audit uses the supplied `detecthiddenfees.com-Coverage-Validation-2026-08-08.zip` export. The export metadata identifies the issue as **Page with redirect** and the source as **All known pages**. It contains 146 URL rows: 101 marked `Pending` and 45 marked `Failed` in the export.

The live check examined the first response for every exported URL with redirects disabled. It does not claim that Google has reprocessed the URLs; Search Console remains the source of truth for Google’s current coverage state.

## Result before the cleanup

| First live response | URLs | Interpretation |
|---|---:|---|
| HTTP 308 | 132 | Host-level `.html` to extensionless URL normalization |
| HTTP 301 | 13 | Explicit legacy alias to a canonical resource |
| HTTP 404 | 1 | Missing retired fragment route: `alphabet-links.html` |
| **Total** | **146** | |

The 145 redirecting URLs are not canonical content pages. They are old `.html` sources or legacy aliases that point toward the current extensionless URL architecture. They should remain out of the sitemap and should not receive canonical-page content.

## Fix applied

The missing `alphabet-links.html` route was restored as an explicit 301 redirect to `/hidden-fee-dictionary`, the existing crawlable A-to-Z glossary resource. The extensionless `/alphabet-links` alias is covered by the matching rule as well. No new content page was created and no existing canonical URL was changed.

## Validation policy

- Sitemap remains limited to canonical, indexable extensionless URLs.
- Internal links must point directly to canonical URLs, not redirect sources.
- Redirects are preserved only where they retain a meaningful legacy path or prevent a known stale URL from becoming a soft orphan.
- A successful live response does not prove Google indexing; reprocessing must be confirmed in Search Console.

## Follow-up

1. Allow Google to recrawl the repaired legacy path.
2. Recheck the exported rows in Search Console after propagation.
3. Request validation only for the repaired URL if it continues to appear as an unresolved error.

## Verification context

- Production origin: `https://detecthiddenfees.com`
- Export: `C:\Users\lynns\Downloads\detecthiddenfees.com-Coverage-Validation-2026-08-08.zip`
- Repository rule: preserve current design, canonical URLs, and working pages; make redirect changes only when the target is an existing relevant resource.
