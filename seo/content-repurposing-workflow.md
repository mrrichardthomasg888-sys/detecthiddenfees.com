# Evidence-Controlled Content Repurposing Workflow

One verified research asset may produce several native formats, but each format must retain the same source record and must not copy the same article verbatim.

| Output | Native purpose | Required source link |
|---|---|---|
| Research report | Full method, results, limitations, and dataset | Canonical report and methodology |
| SEO guide | Answer one search intent using verified findings | Report plus primary sources |
| Video script | Explain one finding for a spoken audience | Report and source notes |
| Short-form post | One bounded takeaway and caveat | Canonical research asset |
| Journalist pitch | Why the finding is relevant to the journalist’s beat | Report, methodology, and contact-safe context |
| Dataset documentation | Field definitions, version, license, and reproducibility | Dataset metadata and changelog |

Every repurposed record should include: `source_asset`, `source_version`, `format`, `audience`, `angle`, `claims_used`, `primary_sources`, `review_status`, `canonical_link`, and `published_at`.

Do not create a downstream asset when the source research is still proposed, unverified, or missing its limitations review.
