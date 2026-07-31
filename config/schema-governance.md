# Phase 1 schema governance

## Canonical entities

- Organization `@id`: `https://detecthiddenfees.com/#organization`
- WebSite `@id`: `https://detecthiddenfees.com/#website`
- Organization name: `DetectHiddenFees`
- Organization URL: `https://detecthiddenfees.com/`
- Verified related product: `https://hiddenfeeai.com`
- Organization logo: `https://detecthiddenfees.com/logo.png`

## Allowed schema by page purpose

- Homepage: Organization, WebSite, WebPage, BreadcrumbList, and only directly supported product or FAQ schema.
- Editorial pages: Article, WebPage, BreadcrumbList, and FAQPage only when the same questions and answers are visible.
- Tools and product pages: WebPage, BreadcrumbList, and SoftwareApplication only when a real software product or tool is the page subject.
- Glossary pages: DefinedTerm or DefinedTermSet only when definitions are visible and maintained.
- Research pages: Article, Dataset, or CollectionPage only when the research resource is accessible and described.
- Instructions: HowTo only when visible sequential steps are present.

## Prohibited unsupported data

- Invented authors, reviewers, credentials, awards, reviews, ratings, or social profiles.
- FAQPage schema for hidden or absent visible FAQs.
- HowTo schema without visible ordered instructions.
- Dataset schema without an accessible dataset or structured research resource.
- Product or SoftwareApplication schema on pages that only mention a product.
- Manufactured publication, modification, citation, or expert-review dates.

## Validation process

1. Parse every JSON-LD block as JSON.
2. Confirm one canonical Organization entity per page at most.
3. Confirm stable `@id` values.
4. Confirm every image URL returns the expected image MIME type.
5. Confirm Article, FAQPage, HowTo, Dataset, and SoftwareApplication markup matches visible content.
6. Confirm canonical URL and `mainEntityOfPage` agree.
7. Confirm dates are sourced from existing reliable page data.
8. Run representative pages through structured-data validation before release.
