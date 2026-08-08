# Phase 2 Search Console data boundary

Status: not connected. No Search Console export, OAuth token, service-account key, or API response is present in this repository.

## Safest supported connection path

Use a manual export first. It provides real data without placing a Google credential in the repository:

1. Open the verified `detecthiddenfees.com` property in [Google Search Console](https://search.google.com/search-console).
2. Open Performance → Search results and choose the date range to analyze.
3. Export a CSV with query, page, clicks, impressions, CTR, and average position. Add date, device, or country only when the analysis requires those dimensions.
4. Save the export outside the repository, for example `C:\Users\lynns\Private\detecthiddenfees-gsc-2026-08-08.csv`.
5. Write the imported JSON outside the repository as well:

```text
node scripts/import-search-console.js C:\Users\lynns\Private\detecthiddenfees-gsc-2026-08-08.csv C:\Users\lynns\Private\detecthiddenfees-gsc-2026-08-08.json "2026-08-08"
node scripts/validate-search-console-data.js C:\Users\lynns\Private\detecthiddenfees-gsc-2026-08-08.json
node scripts/score-search-console-opportunities.js C:\Users\lynns\Private\detecthiddenfees-gsc-2026-08-08.json C:\Users\lynns\Private\detecthiddenfees-gsc-opportunities-2026-08-08.json
```

The scorer refuses disconnected or empty imports. High-impression/low-CTR scoring also stays disabled until an owner supplies thresholds in `seo/search-console-scoring-config.json`; no threshold is presented as a Google fact.

## API path, if automation is required

An owner must create or select a Google Cloud project, enable the Search Console API, and authorize a service identity or OAuth client for the exact Search Console property. The service identity must be granted the appropriate property permission in Search Console. Store the credential in an approved local secret store or environment secret outside this repository. Do not paste it into JSON, commit it, put it in a browser bundle, or add it to GitHub Actions without a deliberate secret review.

The API connection also needs an explicit refresh schedule, date range, dimensions, retention period, and privacy review because query/page rows are private performance data. This repository currently provides the normalized import and scorer, but does not invent an API key or silently create an external credential.

## Required combined query/page/date extract

The August 8, 2026 ZIP export contains separate query and page tables. Those tables are useful for aggregate opportunity review, but they cannot prove which page received a particular query. Do not join them by row order or by matching totals.

For the next export, use the Search Console Search Analytics API with the exact verified property. For a Domain property, the property value is typically `sc-domain:detecthiddenfees.com`; for a URL-prefix property, use the exact property URL shown in Search Console. Request these dimensions together:

```json
{
  "startDate": "2026-05-01",
  "endDate": "2026-08-07",
  "dimensions": ["query", "page", "date"],
  "type": "web",
  "aggregationType": "auto",
  "dataState": "final",
  "rowLimit": 25000
}
```

The response rows contain `keys` in the same order—query, page, date—plus clicks, impressions, CTR, and average position. Keep the response outside the repository and feed a sanitized/private CSV or JSON export into the existing importer only after reviewing the fields. Use multiple narrower date-range requests if the API row limit truncates the result; the API returns top rows and does not guarantee every row.

Minimum owner setup:

1. In Google Cloud, enable the Search Console API for an approved project.
2. Create OAuth/service-account authorization with the read-only Search Console scope.
3. Add that identity to the exact Search Console property with permission to view data.
4. Store the credential outside this repository, such as a local secret store or protected environment variable.
5. Run the authenticated request from a private machine or approved server, save the combined export outside the repository, and then run the existing import, validation, and scoring scripts.

The browser UI can still be used for a quick manual check by filtering a query and opening the Pages tab, but it is not a substitute for a complete query/page/date dataset. Google also notes that Search Console data is subject to aggregation, anonymized queries, and row limits, so trends and cannibalization findings must be labeled according to the returned data.

## Data fields and safeguards

The normalized private import supports query, page, clicks, impressions, CTR, average position, date, device, and country. Connected rows must remain private. The public `seo/opportunity-engine.json` remains a qualitative seed inventory with null Search Console fields until a sanitized, owner-approved aggregate is intentionally prepared.

## Current evidence status

The private August 8, 2026 Desktop ZIP was reviewed outside the repository. It contains 268 aggregate query rows and 213 aggregate page rows for Web search over the last three months, but no query/page/date relationship. It supports the Phase 4 aggregate baseline only; the opportunity engine remains disconnected until a combined private extract is supplied.
