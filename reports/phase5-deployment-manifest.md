# Phase 5 Controlled Deployment Manifest

Status: **Not ready to deploy**.

This manifest is prepared for owner review only. It is not a deployment instruction and no deployment was performed.

## Included scope, subject to approval

- Phase 1 technical foundation, metadata, assets, schema, sitemap/RSS/llms, accessibility foundations, and safe headers.
- Phase 2 inventory, architecture, navigation, breadcrumbs, and contextual internal linking.
- Phase 3 evidence governance, cautious claim handling, citations, trust policies, taxonomies, and research frameworks.
- Phase 4 public taxonomy resource, downloadable taxonomy data, automatic-renewal calculator, embed prototype, and authority-asset planning.
- Phase 5 administrative-page hardening: noindex/nofollow/noarchive, canonical removal, schema removal, credential and submission-code removal.

## Explicitly excluded

- HiddenFeeAI claims awaiting owner confirmation.
- State-law pages awaiting legal review.
- Hidden Fee Transparency Index findings awaiting methodology review.
- Public research findings, customer-document research, outreach, paid promotion, backlink acquisition, and Phase 6 work.
- Server-side protection, credential rotation, production headers, and production-only configuration not present in this static repository.

## Release gates

1. Owner confirms the product/ownership claim table and approves exact wording.
2. The exposed IndexNow credential is rotated or revoked, and the route is protected or removed server-side.
3. Real Chromium keyboard/mobile testing passes on a staging preview.
4. Lighthouse/Web Vitals and production MIME/security/header checks pass.
5. All 225 sitemap URLs and all generated discovery assets pass final validation.
6. Legal review approves any state-law content before publication.
7. Methodology review approves the Transparency Index before any findings are published.

## Rollback

Record the deployment commit SHA and hosting release ID. Roll back to the immediately preceding approved release using the host’s atomic release rollback. If the administrative correction is reverted for troubleshooting, do not restore the credential to a public file; use a secured server-side process and rotate the old credential first. Re-run sitemap, schema, metadata, link, browser, and conversion smoke tests after rollback.
