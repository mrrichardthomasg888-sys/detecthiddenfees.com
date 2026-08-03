# Sitewide CRO and CTA Audit

Date: 2026-08-02  
Repository: `mrrichardthomasg888-sys/detecthiddenfees.com`  
Branch audited: `main`  

## Scope

- 245 canonical URLs in the repository sitemap were audited. This is the original 229-page inventory plus the 16-page automotive hub/guide expansion.
- All 245 sitemap URLs map to an existing HTML file and returned HTTP 200 from the local production-style static server.
- Every audited page has a title, meta description, exactly one H1, a self-referencing canonical, and at least one direct HiddenFeeAI conversion path.
- The existing metadata, schema, URL, internal-link, and article-content payloads were preserved. A normalized HEAD comparison found no unexpected page-body differences outside the documented CTA changes.

## Before and after

| Check | Before | After |
|---|---:|---:|
| Sitemap pages audited | 245 | 245 |
| Pages without a direct HiddenFeeAI CTA | 1 | 0 |
| Pages without a sticky CTA | 12 baseline | 18 intentional exceptions |
| Duplicate sticky bars | 0 | 0 |
| Canonical/file mismatches | 0 | 0 |
| Missing title, description, or H1 | 0 | 0 |
| Broken HiddenFeeAI CTA URLs | Not established | 0; `https://hiddenfeeai.com` returned HTTP 200 |
| Unexpected content/metadata/schema differences | Not established | 0 after normalized comparison |

## Implemented CRO improvements

1. Added intent-specific sticky labels and button labels across the existing sitewide sticky component. Bills now lead with bill language, contracts with contract language, leases with lease language, construction documents with estimate/contract language, invoices with invoice language, medical pages with medical-bill language, and research/utility pages with document-analysis language.
2. Added one shared `.phase1-conversion-cta` component to `phase1-foundation.css` for utility pages that previously had no meaningful in-content conversion opportunity.
3. Added contextual, non-sticky inline CTAs to:
   - `ai-testing-results.html` — “Put the published benchmarks to work on your document”
   - `how-ai-detects-fees.html` — “See these hidden-fee signals in your own document”
   - `sample-analysis-report.html` — “Generate a report for the document in front of you”
   - `automatic-renewal-date-calculator.html` — “Check the agreement behind the reminder date”
   - `how-to-dispute-a-hidden-fee.html` — “Document the charge before you dispute it”
   - `mandatory-vs-optional-fees.html` — “Separate required charges from optional add-ons”
   - `price-escalation-clauses.html` — “Check how your agreement handles price increases”
4. Removed persistent sticky CTAs from trust, legal, and contact pages where a sticky conversion bar would compete with the user’s primary intent:
   - `contact.html`
   - `data-handling-policy.html`
   - `editorial-methodology.html`
   - `editorial-policy.html`
   - `research-methodology.html`
   - `terms-of-service.html`
5. Kept sticky CTAs on the other 227 pages, including all 16 new automotive hub/guide pages, because those pages have an active document-review or research-to-tool journey.

## Duplicate and competition audit

- No page contains more than one `.sticky-cta-bar`.
- 114 pages repeat one or more exact HiddenFeeAI button labels in separate conversion contexts. These are separated hero, body, related-resource, or end-of-page actions rather than duplicate sticky widgets.
- Only one close repeated-label pair was found within 800 source characters: `ai-financial-analysis.html`. It is a recurring analysis action separated by explanatory/related content, not two adjacent sticky controls; it remains flagged for future content-template cleanup rather than being removed from this scoped audit.
- No repeated CTA text was found among the seven newly added contextual CTA blocks.
- No popup, modal, or intrusive banner was added.

## CTA intent policy

| Page intent | Primary action language |
|---|---|
| Construction contract or estimate | Review/analyze my construction contract or estimate |
| Lease | Review/analyze my lease |
| Medical | Review/analyze my medical bill |
| Invoice or receipt | Review/analyze my invoice |
| Consumer bill | Review/analyze my bill |
| Financial, loan, mortgage, or investment | Review my financial document / analyze my document |
| Contract or agreement | Review/analyze my contract |
| Research, methodology, or general education | Try HiddenFeeAI / analyze my document |
| Automotive | Page-specific buyer’s order, financing, GAP, warranty, contract, or negotiation language |
| Trust/legal/contact | No persistent sticky bar; retain normal site navigation and appropriate page-level links |

## Responsive validation

Browser checks covered the homepage, contract, bill, construction, automotive hub, renewal calculator, and contact page at all requested widths:

`320`, `375`, `390`, `414`, `430`, `768`, `1024`, `1280`, and `1440` pixels.

Results:

- 63 responsive page/viewport combinations checked.
- 0 page-level horizontal-scroll failures.
- 0 clipped sticky buttons.
- 0 overlapping sticky CTA results.
- 0 duplicate IDs.
- 0 duplicate sticky bars.
- Sticky buttons remained within the viewport on every page where sticky CTA was retained.
- Inline utility CTAs remained visible and full-width where appropriate on mobile.
- No console errors or warnings were captured in the representative browser pass.

## Link and route validation

- Local sitemap crawl: 245/245 HTTP 200.
- Local nonexistent URL: HTTP 404.
- HiddenFeeAI CTA destination: HTTP 200, final URL `https://hiddenfeeai.com/`, HTML response.
- No homepage-fallback behavior was found in the local static crawl.

## Lighthouse evidence

These are representative local Lighthouse runs collected after the scoped CTA changes. They are not a claim that every page has an individual Lighthouse run.

| Page | Performance | Accessibility | Best Practices | SEO | CLS |
|---|---:|---:|---:|---:|---:|
| Homepage | 83 | 98 | 100 | 100 | 0.000 |
| AI Contract Review | 58 | 98 | 100 | 100 | 0.000 |
| AI Bill Analyzer | 88 | 93 | 100 | 100 | 0.000 |
| AI Construction Contract Review | 51 | 98 | 100 | 100 | 0.003 |
| Automotive hub | 73 | 100 | 100 | 100 | 0.000 |
| Renewal calculator | 98 | 100 | 96 | 100 | 0.000 |

The sub-100 accessibility scores on the representative legacy pages are attributable to pre-existing heading-order/target-size findings; the automotive hub’s 100 accessibility score confirms the page-specific CTA template is not introducing an accessibility regression. The Lighthouse CLI also hit a Windows temporary-profile cleanup permission error during the multi-page rerun, so representative values above should be treated as run evidence rather than a full 245-page Lighthouse census.

## Files changed

- `phase1-foundation.css` — shared contextual CTA component.
- Existing HTML page templates/content files — intent-specific sticky CTA label alignment, with the seven inline CTA additions and six trust/legal sticky removals listed above.
- `reports/sitewide-cro-cta-audit.md` — this audit evidence.

No URLs, title tags, meta descriptions, canonicals, schemas, internal-link strategy, or article content were intentionally changed.

## Production deployment validation

- Production commit pushed to `main`: `625b3f7d1aeb709bdc52b0bb6fbb24622dc625cf`.
- Live hosting: Cloudflare edge headers (`server: cloudflare`, `cf-cache-status: DYNAMIC`) confirmed the deployed site is being served through Cloudflare.
- Live sitemap crawl: 245/245 URLs returned HTTP 200.
- Live pages: no homepage fallback, no blank pages, no missing titles, no missing H1s, no canonical mismatches, and no duplicate sticky bars.
- Live internal-link audit: 12,067 root-relative links checked; 0 broken targets.
- Live CTA destination: `https://hiddenfeeai.com/` returned HTTP 200.
- Live asset checks: `/phase1-foundation.css?v=sticky6` returned HTTP 200 and `/favicon.svg` returned HTTP 200.
- Live nonexistent URL `/this-page-does-not-exist-cro-audit` returned HTTP 404 with the site’s Page Not Found title.
- Live automotive resources: `/sitemap.xml`, `/sitemap-car-dealer-fees.xml`, `/rss.xml`, `/rss-car-dealer-fees.xml`, `/llms.txt`, and `/llms-car-dealer-fees.txt` each contained all 16 automotive references and returned HTTP 200. `robots.txt` returned HTTP 200.

The scoped CRO changes are deployed and live. The Lighthouse limitation above remains open as a separate legacy accessibility/performance remediation item; it was not silently presented as a full-site 100 score.
