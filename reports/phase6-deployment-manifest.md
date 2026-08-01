# Phase 6 Final Deployment Manifest

Final status: **NOT READY TO DEPLOY**

## Candidate files changed in Phase 6

- `.github/workflows/indexnow-submit.yml` — requires server-side secrets.
- `_headers` — removes stale public IndexNow key-file rule.
- `robots.txt` — removes stale public key-file reference.
- `scripts/indexnow.js` — removes embedded credential and key logging; requires environment variables.
- `indexnow-key.txt` — removed.
- `bing-submit.js`, `bing_submit.js`, `submit_indexnow.js`, `try_indexnow.js`, `scripts/indexnow_fix.js` — removed obsolete credential-bearing or unsafe helper utilities.
- `reports/phase6-*.md` — Phase 6 evidence and approval reports.

## Cumulative package scope

The candidate deployment package is the cumulative branch history, not only the Phase 6 files above. The reviewed Phase 1–5 foundation is preserved in these intentional commits:

- Phase 1: `10dd3c4`, `31875be`
- Phase 2: `84ba06d`, `599f552`, `51112ae`
- Phase 3: `0cec1f1`, `032a174`, `710d054`
- Phase 4: `39cf35b`, `5e61594`, `a5d4e4f`
- Phase 5: `6d0fed3`
- Phase 6: the review commit created with this handoff

No generated cache files, staging credentials, production secrets, or untracked test assets are part of the candidate package. The package remains withheld from deployment until the blockers in this report are resolved and a final diff review is approved.

## Conditions before shipping

1. Owner resolves the final owner-confirmation matrix.
2. Old credentials are revoked/rotated externally; new secrets are configured server-side and never committed.
3. A non-public staging host is available and passes browser, accessibility, performance, and hosting tests.
4. Legal approval exists for any state-law content.
5. Methodology approval exists for any Transparency Index findings.
6. Final diff scan confirms no staging URLs, secrets, deleted ranking pages, unintended canonicals/noindex, unsupported schema, broken links, or analytics regressions.

## Rollback

Record the approved commit SHA and hosting release ID. Use the host’s atomic rollback to the prior approved release. Re-run sitemap, robots, RSS, llms, metadata, schema, link, browser, analytics, and conversion smoke tests after rollback. Never restore credentials to source control or a public HTML file.
