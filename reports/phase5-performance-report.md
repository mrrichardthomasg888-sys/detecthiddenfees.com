# Phase 5 Performance and Production-Readiness Baseline

Lighthouse is not installed in the repository or environment, so no Lighthouse scores are fabricated. This is an equivalent static/browser baseline; a real Lighthouse or Web Vitals run must be completed against the deployment preview.

## Local static baseline

| Page | HTML | Estimated HTML + referenced CSS/JS | CSS refs | JS refs | Images |
|---|---:|---:|---:|---:|---:|
| Homepage | 73.1 KB | 77.6 KB | 1 | 0 | 4 |
| Hidden-fee pillar | 73.6 KB | 78.1 KB | 1 | 0 | 0 |
| AI contract review | 66.4 KB | 70.8 KB | 1 | 0 | 0 |
| Automatic-renewal calculator | 5.5 KB | 10.0 KB | 1 | 0 | 0 |
| Research methodology | 33.3 KB | 37.8 KB | 1 | 0 | 0 |
| Privacy/security | 6.4 KB | 10.9 KB | 1 | 0 | 0 |

The repository’s representative pages have no external JavaScript references in this static scan. LCP, CLS, INP/TBT, font requests, image requests, third-party requests, and Lighthouse category scores require a browser performance run on a preview/production-like host with real headers and network behavior.

## HTTP smoke checks

Local HTTP 200 was observed for the representatives and for `sitemap.xml`, `rss.xml`, `robots.txt`, `llms.txt`, the public taxonomy JSON, and the public taxonomy CSV. The Python static server did not provide production MIME/security headers; those remain hosting validation items.

## Low-risk changes made in Phase 5

The public IndexNow page was reduced to an inert administrative notice, removing its embedded credential and submission code. No design, framework, ranking page, URL, or product functionality was changed. No performance fix was justified without real Web Vitals evidence.

## Hosting blockers

Configure correct MIME types and security headers at the actual host; protect or remove the administrative route; rotate the exposed IndexNow credential; run Lighthouse/Web Vitals on preview; and confirm analytics, conversion events, redirects, caching, compression, HTTPS, and environment-specific asset behavior.
