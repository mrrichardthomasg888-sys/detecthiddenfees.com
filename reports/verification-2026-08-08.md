# Verification Report — 2026-08-08

## Source deployment

- Changes were pushed directly to GitHub `main`.
- Latest verified commit: `2639bd2` (`Redirect extensionless legacy aliases`).
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

The live host continued to return HTTP 200 for the three extensionless aliases after six checks over approximately 21 seconds. The expected 301 redirects were therefore not observed in production, and the redirect fix is not being represented as live until the host publishes the current GitHub `main` commit.

The repository contains no deployment workflow that publishes the site from `main`. Production publication requires the existing hosting connection or an authorized deployment action outside this repository. No host credentials, API keys, or Cloudflare changes were made.
