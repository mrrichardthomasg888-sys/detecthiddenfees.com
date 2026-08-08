# Verification Report — 2026-08-08

## Source deployment

- Changes were pushed directly to GitHub `main`.
- Latest verified commit: `c647fd4` (`Qualify financial and contract risk claims`).
- The pre-existing user-owned change to `calculator-authority.css` remains unstaged and untouched.

## Local verification

- 238 sitemap pages pass title, description, canonical, H1, JSON-LD, indexability, internal-link, and redirect-link checks.
- Sitemap contains 238 canonical URLs; `llms.txt` contains 238 canonical URLs; RSS contains 178 editorial items.
- Attribution runtime is present on all 238 canonical pages and does not process document contents.
- Research manifest remains collecting-only with zero records and no published statistics.
- High-risk and prioritized unverified product-claim checks pass for six pages.
- All known `.html` redirect aliases now have matching extensionless 301 rules.
- Search Console import remains explicitly `not_connected` with zero records; no fabricated query, click, position, or revenue data was added.

## Production verification

After the normal propagation window, the live host verified the three extensionless aliases as HTTP 301 responses to their canonical destinations. The four pages in the latest claim-remediation batch returned HTTP 200, one canonical, and attribution enabled; the targeted unsupported phrases were absent from the served HTML.

The repository contains no deployment workflow that publishes the site from `main`, but the existing hosting connection did publish the pushed GitHub commit after propagation. No host credentials, API keys, or Cloudflare changes were made.
