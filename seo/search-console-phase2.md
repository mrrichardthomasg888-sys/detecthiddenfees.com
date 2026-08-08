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

## Data fields and safeguards

The normalized private import supports query, page, clicks, impressions, CTR, average position, date, device, and country. Connected rows must remain private. The public `seo/opportunity-engine.json` remains a qualitative seed inventory with null Search Console fields until a sanitized, owner-approved aggregate is intentionally prepared.

## Current evidence status

Real Search Console impressions, clicks, positions, query trends, and cannibalization findings are not available in the repository. The Phase 2 opportunity engine therefore has no connected-data findings yet.
