# 🕸️ DetectHiddenFees Knowledge Graph

> **Version:** 3.0.0  
> **Last Updated:** 2026-07-22  
> **Status:** Active  
> **Purpose:** Define core entities, relationships, and semantic connections across the DetectHiddenFees platform. This document serves as the canonical reference for how concepts relate to one another.

---

## Table of Contents

1. [Core Entities & Definitions](#1-core-entities--definitions)
2. [Entity Hierarchy](#2-entity-hierarchy)
3. [Products & Services](#3-products--services)
4. [Document Types](#4-document-types)
5. [Industries](#5-industries)
6. [Fee Types](#6-fee-types)
7. [Entity Relationships Map](#7-entity-relationships-map)
8. [Relationship Types & Patterns](#8-relationship-types--patterns)
9. [Schema.org Implementation Guide](#9-schemaorg-implementation-guide)
10. [Internal Linking Strategy](#10-internal-linking-strategy)
11. [Knowledge Graph Maintenance](#11-knowledge-graph-maintenance)
12. [Long-Term Implementation Roadmap](#12-long-term-implementation-roadmap)

---

## 1. Core Entities & Definitions

### Brand Entity

| Property | Value |
|----------|-------|
| **Name** | DetectHiddenFees |
| **Type** | Organization / Brand |
| **Role** | AI-powered hidden fee detection and consumer financial transparency platform |
| **Founded** | 2025 |
| **Domain** | detecthiddenfees.com |
| **Analysis Backend** | hiddenfeeai.com |
| **Category** | Financial Technology, Consumer Protection |
| **Audience** | Consumers, Contract Signers, Bill Payers, Homeowners, Patients |
| **Methodology** | AI document analysis, pattern recognition, market comparison, fee classification taxonomy |
| **Coverage** | Contracts, invoices, bills, estimates, agreements, financial statements, receipts |

### Product Entities

| Product | Type | Purpose |
|---------|------|---------|
| **AI Contract Review** | SoftwareApplication | Analyzes contracts for hidden fees, risky clauses, pricing manipulation, and unfavorable terms |
| **AI Bill Analyzer** | SoftwareApplication | Scans bills for overcharges, duplicate charges, rate discrepancies, and unauthorized fees |
| **AI Financial Advisor** | SoftwareApplication | Provides AI-powered financial guidance, document analysis, and savings recommendations |
| **AI Agreement Analyzer** | SoftwareApplication | Evaluates terms and conditions, service agreements, and financing agreements for financial risk |
| **AI Invoice Analyzer** | SoftwareApplication | Reviews invoices for hidden charges, billing errors, and pricing inconsistencies |
| **Hidden Fee Detector** | SoftwareApplication | General-purpose hidden fee detection across any financial document |

### Service Entities

| Service | Type | Purpose |
|---------|------|---------|
| **HiddenFeeAI** | WebApplication | AI analysis backend powering all document analysis |
| **Bill Negotiation Service** | Service | Guided bill negotiation support based on AI analysis findings |
| **Contract Risk Assessment** | Service | AI-powered evaluation of contract terms and clauses |

---

## 2. Entity Hierarchy

```
Brand: DetectHiddenFees
├── Product Line: AI Document Analysis Suite
│   ├── AI Contract Review          → Analyzes legal agreements
│   ├── AI Bill Analyzer            → Analyzes billing statements
│   ├── AI Financial Advisor        → Provides financial guidance
│   ├── AI Invoice Analyzer         → Analyzes invoices
│   └── AI Agreement Analyzer       → Analyzes service/financing agreements
│
├── Platform: HiddenFeeAI           → AI analysis engine (backend)
│
├── Document Types (Input)
│   ├── Contract
│   ├── Invoice
│   ├── Bill
│   ├── Estimate
│   ├── Proposal
│   ├── Service Agreement
│   ├── Financing Agreement
│   └── Bank Statement
│
├── Industries (Context)
│   ├── HVAC
│   ├── Home Renovation
│   ├── Auto Financing
│   ├── Healthcare
│   ├── Banking
│   ├── Telecommunications
│   ├── Insurance
│   ├── Subscription Services
│   └── Real Estate
│
└── Fee Types (Detection Targets)
    ├── Administrative Fee
    ├── Processing Fee
    ├── Convenience Fee
    ├── Cancellation Fee
    ├── Late Fee
    ├── Renewal Fee
    ├── Change Order
    ├── Duplicate Charge
    ├── APR Markup
    ├── Documentation Fee
    ├── Facility Fee
    ├── Early Termination Fee
    ├── Dealer Reserve
    ├── Material Upcharge
    └── Service Charge
```

---

## 3. Products & Services

### AI Contract Review

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /ai-contract-review.html |
| **Schema Type** | SoftwareApplication |
| **Analysis Scope** | Legal agreements, service contracts, purchase agreements, leases |
| **Detection Capabilities** | Hidden fees, risky clauses, auto-renewal terms, arbitration clauses, unilateral change terms |
| **Related Products** | AI Agreement Analyzer, AI Contract Risk Assessment |
| **Related Industries** | All industries |
| **Pricing** | $15 per document analysis |

### AI Bill Analyzer

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /ai-bill-analyzer.html |
| **Schema Type** | SoftwareApplication |
| **Analysis Scope** | Medical bills, utility bills, phone bills, internet bills, insurance invoices, subscription charges |
| **Detection Capabilities** | Overcharges, duplicate charges, rate discrepancies, unauthorized fees, billing errors |
| **Related Products** | AI Invoice Analyzer, AI Financial Advisor |
| **Related Industries** | Healthcare, Telecom, Insurance, Utilities |
| **Pricing** | $15 per document analysis |

### AI Financial Advisor

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /ai-financial-advisor.html |
| **Schema Type** | SoftwareApplication |
| **Analysis Scope** | Financial documents, contracts, bills, invoices, statements, agreements |
| **Detection Capabilities** | Hidden fees, pricing risks, savings opportunities, financial intelligence |
| **Related Products** | AI Contract Review, AI Bill Analyzer, AI Agreement Analyzer |
| **Related Industries** | All industries |
| **Pricing** | $15 per document analysis |
| **Status** | ⭐ Gold Standard flagship page |

### AI Agreement Analyzer

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /ai-agreement-analyzer.html |
| **Schema Type** | SoftwareApplication |
| **Analysis Scope** | Service agreements, financing agreements, terms of service, membership agreements |
| **Detection Capabilities** | Unfavorable terms, hidden obligations, auto-renewal clauses, fee escalation clauses |
| **Related Products** | AI Contract Review, AI Financial Advisor |
| **Related Industries** | Healthcare, Banking, Telecom, Subscription Services |
| **Pricing** | $15 per document analysis |

### AI Invoice Analyzer

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /ai-invoice-analyzer.html |
| **Schema Type** | SoftwareApplication |
| **Analysis Scope** | Service invoices, contractor invoices, professional fees, material invoices |
| **Detection Capabilities** | Hidden markups, duplicate line items, unauthorized charges, pricing inconsistencies |
| **Related Products** | AI Bill Analyzer, AI Contract Review |
| **Related Industries** | HVAC, Home Renovation, Professional Services |
| **Pricing** | $15 per document analysis |

### Hidden Fee Detector

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /hidden-fee-detector.html |
| **Schema Type** | SoftwareApplication |
| **Analysis Scope** | Any financial document, contract, or agreement |
| **Detection Capabilities** | General-purpose hidden fee identification across all industries |
| **Related Products** | All products in suite |
| **Related Industries** | All industries |
| **Pricing** | $15 per document analysis |

---

## 4. Document Types

| Document Type | Description | Example Pages | Linked Products |
|---------------|-------------|---------------|-----------------|
| **Contract** | Legally binding agreement between parties | /ai-contract-review.html, /contract-red-flags.html | AI Contract Review, AI Agreement Analyzer |
| **Invoice** | Itemized bill for goods or services rendered | /ai-invoice-analyzer.html | AI Invoice Analyzer, AI Bill Analyzer |
| **Bill** | Statement of charges for ongoing services | /ai-bill-analyzer.html, /negotiate-bills.html | AI Bill Analyzer, AI Financial Advisor |
| **Estimate** | Projected cost before work begins | /ai-estimate-review.html | AI Contract Review, AI Invoice Analyzer |
| **Proposal** | Formal offer outlining scope and pricing | /ai-proposal-review.html | AI Agreement Analyzer |
| **Service Agreement** | Contract defining service terms and conditions | /ai-service-contract-review.html | AI Agreement Analyzer, AI Contract Review |
| **Financing Agreement** | Loan or credit terms and repayment structure | /hidden-dealership-financing-fees.html | AI Agreement Analyzer |
| **Bank Statement** | Record of account transactions | /hidden-bank-overdraft-fees.html | AI Bill Analyzer |
| **Receipt** | Proof of payment for a transaction | /ai-receipt-analyzer.html | AI Bill Analyzer |
| **Lease Agreement** | Rental or property lease terms | /ai-rental-lease-analyzer.html, /ai-commercial-lease-review.html | AI Contract Review |
| **Purchase Agreement** | Terms of a purchase transaction | /ai-purchase-agreement-review.html | AI Contract Review |

---

## 5. Industries

### HVAC

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /hidden-hvac-contractor-fees.html |
| **Schema Type** | Thing (Industry) |
| **Common Fee Types** | Service call markups, emergency surcharges, refrigerant overpricing, labor inflation, material upcharges, diagnostic fees |
| **Document Types Used** | Estimates, contracts, invoices, service agreements |
| **Relevant Products** | AI Invoice Analyzer, AI Contract Review, AI Agreement Analyzer |
| **Related Industries** | Home Renovation |

### Home Renovation

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /hidden-home-renovation-fees.html |
| **Schema Type** | Thing (Industry) |
| **Common Fee Types** | Change order fees, material allowance manipulation, subcontractor layering, permit processing fees, supervision surcharges |
| **Document Types Used** | Contracts, estimates, proposals, change orders, invoices |
| **Relevant Products** | AI Contract Review, AI Invoice Analyzer, AI Construction Contract Review |
| **Related Industries** | HVAC, Construction |

### Auto Financing

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /hidden-dealership-financing-fees.html |
| **Schema Type** | Thing (Industry) |
| **Common Fee Types** | APR markups, documentation fees, extended warranties, GAP insurance markups, VIN etching, paint protection, dealer reserve, loan packing |
| **Document Types Used** | Financing agreements, contracts, lease agreements |
| **Relevant Products** | AI Agreement Analyzer, AI Contract Review |
| **Related Industries** | Banking |

### Healthcare

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /duplicate-medical-billing-charges.html |
| **Schema Type** | Thing (Industry) |
| **Common Fee Types** | Duplicate charges, facility fees, unbundled procedures, incorrect billing codes, hidden hospital fees, insurance discrepancies |
| **Document Types Used** | Medical bills, insurance EOB statements, invoices |
| **Relevant Products** | AI Bill Analyzer, AI Invoice Analyzer |
| **Related Industries** | Insurance |

### Banking

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | /hidden-bank-overdraft-fees.html |
| **Schema Type** | Thing (Industry) |
| **Common Fee Types** | Overdraft fees, ATM surcharges, monthly maintenance fees, insufficient funds fees, transaction reordering penalties, foreign transaction fees |
| **Document Types Used** | Bank statements, account agreements, fee schedules |
| **Relevant Products** | AI Bill Analyzer, AI Financial Advisor |
| **Related Industries** | Auto Financing |

### Telecommunications

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | *Covered in hidden-fees-guides.html* |
| **Schema Type** | Thing (Industry) |
| **Common Fee Types** | Activation fees, early termination penalties, equipment rental charges, data overage fees, administrative charges, regulatory fees, line access costs |
| **Document Types Used** | Bills, contracts, service agreements |
| **Relevant Products** | AI Bill Analyzer, AI Agreement Analyzer |
| **Related Industries** | Subscription Services |

### Insurance

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | *Covered across multiple pages* |
| **Schema Type** | Thing (Industry) |
| **Common Fee Types** | Premium increases beyond allowable limits, deductible calculation errors, unauthorized coverage charges, processing fees, cancellation penalties |
| **Document Types Used** | Insurance statements, policies, invoices |
| **Relevant Products** | AI Bill Analyzer, AI Contract Review |
| **Related Industries** | Healthcare, Auto Financing |

### Subscription Services

| Attribute | Value |
|-----------|-------|
| **Canonical URL** | *Covered in hidden-fees-guides.html* |
| **Schema Type** | Thing (Industry) |
| **Common Fee Types** | Auto-renewal charges, processing fees, service fees, tier escalation without notice, hidden subscription billing |
| **Document Types Used** | Bills, service agreements, terms of service |
| **Relevant Products** | AI Bill Analyzer, AI Agreement Analyzer |
| **Related Industries** | Telecommunications |

---

## 6. Fee Types

### Administrative Fee

| Attribute | Value |
|-----------|-------|
| **Definition** | A charge for administrative or paperwork processing, often inflated beyond actual cost |
| **Appears In** | Invoices, contracts, service agreements |
| **Common Industries** | Healthcare, Telecom, Banking, Utilities |
| **Related Concepts** | Processing Fee, Documentation Fee |
| **Risk Level** | Medium — often legitimate but frequently overpriced |
| **Detection Pattern** | Vague description, no clear service provided, percentage-based rather than flat |

### Processing Fee

| Attribute | Value |
|-----------|-------|
| **Definition** | A fee charged for processing a transaction, application, or request |
| **Appears In** | Bills, invoices, contracts, financing agreements |
| **Common Industries** | Banking, Auto Financing, Telecom, Insurance |
| **Related Concepts** | Administrative Fee, Convenience Fee |
| **Risk Level** | Medium — often legitimate markup but rarely disclosed clearly |

### Convenience Fee

| Attribute | Value |
|-----------|-------|
| **Definition** | A fee charged for the "convenience" of paying electronically or by alternative method |
| **Appears In** | Bills, invoices, payment portals |
| **Common Industries** | Telecom, Utilities, Healthcare, Subscription Services |
| **Related Concepts** | Processing Fee, Service Charge |
| **Risk Level** | Low-Medium — often disclosed but sometimes added without consent |

### Cancellation Fee

| Attribute | Value |
|-----------|-------|
| **Definition** | A penalty for canceling a service or contract before the end of its term |
| **Appears In** | Contracts, service agreements, membership agreements |
| **Common Industries** | Telecom, Subscription Services, Insurance, Gym Memberships |
| **Related Concepts** | Early Termination Fee |
| **Risk Level** | High — can be excessive and buried in fine print |

### Late Fee

| Attribute | Value |
|-----------|-------|
| **Definition** | A penalty charged for payments made after the due date |
| **Appears In** | Contracts, bills, invoices, loan agreements |
| **Common Industries** | Banking, Telecom, Utilities, Healthcare, Insurance |
| **Related Concepts** | Renewal Fee, Service Charge |
| **Risk Level** | Medium — legitimate but often structured to trigger easily |

### Renewal Fee

| Attribute | Value |
|-----------|-------|
| **Definition** | A fee charged when a subscription or contract auto-renews |
| **Appears In** | Service agreements, subscription terms, membership agreements |
| **Common Industries** | Subscription Services, Telecom, Insurance |
| **Related Concepts** | Cancellation Fee, Auto-Renewal Clause |
| **Risk Level** | High — often automatic with unclear disclosure |

### Change Order

| Attribute | Value |
|-----------|-------|
| **Definition** | A modification to the original scope of work, often with additional charges |
| **Appears In** | Contracts, construction agreements, renovation proposals |
| **Common Industries** | Home Renovation, HVAC, Construction |
| **Related Concepts** | Material Upcharge, Administrative Fee |
| **Risk Level** | High — often inflated and difficult to compare to original scope |

### Duplicate Charge

| Attribute | Value |
|-----------|-------|
| **Definition** | A charge appearing more than once on a single bill or invoice |
| **Appears In** | Bills, invoices, medical billing statements |
| **Common Industries** | Healthcare, Telecom, Subscription Services |
| **Related Concepts** | Billing Error, Overcharge |
| **Risk Level** | High — pure error, no legitimate basis |

### APR Markup (Dealer Reserve)

| Attribute | Value |
|-----------|-------|
| **Definition** | The difference between the interest rate a lender approves and the rate the dealership offers the buyer |
| **Appears In** | Financing agreements, auto loan contracts |
| **Common Industries** | Auto Financing, Dealerships |
| **Related Concepts** | Documentation Fee, Dealer Reserve |
| **Risk Level** | High — can add thousands to loan cost |

### Documentation Fee

| Attribute | Value |
|-----------|-------|
| **Definition** | An administrative charge for processing paperwork, often inflated in auto financing |
| **Appears In** | Financing agreements, purchase contracts |
| **Common Industries** | Auto Financing, Real Estate |
| **Related Concepts** | Administrative Fee, Processing Fee |
| **Risk Level** | Medium-High — actual cost is a fraction of what's charged |

### Facility Fee

| Attribute | Value |
|-----------|-------|
| **Definition** | A charge for using a hospital or medical facility, often added without clear explanation |
| **Appears In** | Medical bills, hospital invoices |
| **Common Industries** | Healthcare |
| **Related Concepts** | Administrative Fee, Service Charge |
| **Risk Level** | High — frequently unexpected and unexplained |

### Early Termination Fee

| Attribute | Value |
|-----------|-------|
| **Definition** | A penalty for ending a contract or service before its scheduled end date |
| **Appears In** | Contracts, service agreements, lease agreements |
| **Common Industries** | Telecom, Auto Financing, Leasing, Subscription Services |
| **Related Concepts** | Cancellation Fee |
| **Risk Level** | High — can be disproportionate to actual cost |

### Material Upcharge

| Attribute | Value |
|-----------|-------|
| **Definition** | Inflated pricing on materials, often with hidden percentage markups |
| **Appears In** | Estimates, invoices, contractor proposals |
| **Common Industries** | HVAC, Home Renovation, Construction |
| **Related Concepts** | Change Order, Service Charge |
| **Risk Level** | Medium — common but requires market rate comparison to detect |

### Service Charge

| Attribute | Value |
|-----------|-------|
| **Definition** | A broad category of fees for services provided, often used as a catch-all charge |
| **Appears In** | Bills, invoices, contracts, service agreements |
| **Common Industries** | Telecom, Banking, Healthcare, Subscription Services |
| **Related Concepts** | Administrative Fee, Processing Fee |
| **Risk Level** | Medium — depends on disclosure and basis |

---

## 7. Entity Relationships Map

### Core Relationship Diagram

```
DetectHiddenFees (Brand)
├── owns → HiddenFeeAI (Platform)
├── builds → AI Document Analysis Suite
├── educates → Consumer Financial Transparency
├── protects → Consumers
│
├── AI Contract Review
│   ├── analyzes → Contracts
│   ├── detects → Hidden Fees (in contracts)
│   ├── detects → Risky Clauses
│   ├── detects → Auto-Renewal Terms
│   ├── detects → Arbitration Clauses
│   └── competes_with → Traditional Legal Review
│
├── AI Bill Analyzer
│   ├── analyzes → Bills
│   ├── analyzes → Invoices
│   ├── analyzes → Bank Statements
│   ├── detects → Duplicate Charges
│   ├── detects → Rate Discrepancies
│   ├── detects → Billing Errors
│   └── targets → Healthcare, Telecom, Banking
│
├── AI Financial Advisor
│   ├── analyzes → Financial Documents
│   ├── guides → Bill Negotiation
│   ├── identifies → Savings Opportunities
│   ├── assesses → Pricing Risks
│   └── supersedes → AI Financial Analysis
│
├── AI Agreement Analyzer
│   ├── analyzes → Service Agreements
│   ├── analyzes → Financing Agreements
│   ├── detects → Unfavorable Terms
│   ├── detects → Hidden Obligations
│   └── overlaps_with → AI Contract Review
│
└── Hidden Fee Detector
    ├── analyzes → Any Document
    ├── detects → All Fee Types
    └── unifies → All Products
```

### Industry-to-Fee Type Relationships

| Industry | Primary Fee Types | Secondary Fee Types |
|----------|------------------|---------------------|
| HVAC | Material Upcharge, Change Order, Service Charge | Administrative Fee, Processing Fee |
| Home Renovation | Change Order, Material Upcharge, Administrative Fee | Processing Fee, Service Charge |
| Auto Financing | APR Markup, Documentation Fee, Dealer Reserve | Processing Fee, Early Termination Fee |
| Healthcare | Duplicate Charge, Facility Fee | Administrative Fee, Processing Fee |
| Banking | Late Fee, Service Charge, Overdraft Fee | Processing Fee, Convenience Fee |
| Telecom | Cancellation Fee, Early Termination Fee, Administrative Fee | Processing Fee, Convenience Fee, Service Charge |
| Insurance | Processing Fee, Cancellation Fee, Service Charge | Late Fee, Renewal Fee |
| Subscription Services | Renewal Fee, Cancellation Fee, Service Charge | Convenience Fee, Processing Fee |

### Fee Type to Document Type Relationships

| Fee Type | Commonly Found In |
|----------|------------------|
| Administrative Fee | Contracts, Invoices, Service Agreements |
| Processing Fee | Bills, Invoices, Financing Agreements |
| Convenience Fee | Bills, Payment Portals |
| Cancellation Fee | Contracts, Service Agreements |
| Late Fee | Bills, Loan Agreements, Contracts |
| Renewal Fee | Service Agreements, Subscription Terms |
| Change Order | Contracts, Construction Agreements |
| Duplicate Charge | Bills, Invoices, Medical Billing |
| APR Markup | Financing Agreements |
| Documentation Fee | Financing Agreements, Purchase Contracts |
| Facility Fee | Medical Bills |
| Early Termination Fee | Contracts, Lease Agreements |
| Material Upcharge | Estimates, Contractor Proposals |

### Product-to-Document Type Relationships

| Product | Analyzes These Documents |
|---------|------------------------|
| AI Contract Review | Contracts, Purchase Agreements, Lease Agreements, Service Contracts |
| AI Bill Analyzer | Bills, Medical Bills, Utility Bills, Phone Bills, Insurance Statements |
| AI Financial Advisor | All document types |
| AI Agreement Analyzer | Service Agreements, Financing Agreements, Terms of Service, Membership Agreements |
| AI Invoice Analyzer | Invoices, Contractor Invoices, Professional Fees, Material Invoices |
| Hidden Fee Detector | All document types |

### Product-to-Industry Relationships

| Product | Primary Industries | Secondary Industries |
|---------|-------------------|---------------------|
| AI Contract Review | All industries | All industries |
| AI Bill Analyzer | Healthcare, Telecom, Banking | Insurance, Utilities, Subscriptions |
| AI Financial Advisor | All industries | All industries |
| AI Agreement Analyzer | Healthcare, Banking, Telecom | Subscription Services, Insurance |
| AI Invoice Analyzer | HVAC, Home Renovation | Professional Services, Construction |

---

## 8. Relationship Types & Patterns

### Relationship Verb Taxonomy

| Verb | Definition | Example |
|------|-----------|---------|
| **analyzes** | Product processes this document type | AI Contract Review → analyzes → Contract |
| **detects** | Product identifies this fee type | AI Bill Analyzer → detects → Duplicate Charge |
| **appears_in** | Fee type is commonly found in this document | Administrative Fee → appears_in → Invoice |
| **common_in** | Fee type is prevalent in this industry | Change Order → common_in → Home Renovation |
| **related_to** | General relationship between entities | Processing Fee → related_to → Administrative Fee |
| **targets** | Product is designed for this industry | AI Bill Analyzer → targets → Healthcare |
| **supersedes** | One entity replaces another | AI Financial Advisor → supersedes → AI Financial Analysis |
| **competes_with** | Product alternative | AI Contract Review → competes_with → Traditional Legal Review |
| **overlaps_with** | Products share capabilities | AI Agreement Analyzer → overlaps_with → AI Contract Review |
| **unifies** | Entity encompasses multiple | Hidden Fee Detector → unifies → All Products |

### Common Relationship Patterns

**Pattern 1: Product → Document → Fee Types**
```
AI Bill Analyzer → analyzes → Medical Bill → detects → Duplicate Charge
AI Bill Analyzer → analyzes → Medical Bill → detects → Facility Fee
AI Bill Analyzer → analyzes → Medical Bill → detects → Processing Fee
```

**Pattern 2: Industry → Fee Types → Products**
```
Healthcare → has_fee → Duplicate Charge → detected_by → AI Bill Analyzer
Healthcare → has_fee → Facility Fee → detected_by → AI Bill Analyzer
Healthcare → has_fee → Processing Fee → detected_by → AI Bill Analyzer
```

**Pattern 3: Fee Type → Appears In → Documents → Products**
```
Administrative Fee → appears_in → Invoice → analyzed_by → AI Invoice Analyzer
Administrative Fee → appears_in → Contract → analyzed_by → AI Contract Review
Administrative Fee → appears_in → Service Agreement → analyzed_by → AI Agreement Analyzer
```

---

## 9. Schema.org Implementation Guide

### Current Schema Status

| Schema Type | Current Coverage | Notes |
|-------------|-----------------|-------|
| Organization | ✅ Every page | Standardized across site |
| WebSite | ✅ Most pages | Present on major pages |
| WebPage | ✅ Most pages | Some need `about` entity refinement |
| BreadcrumbList | ✅ Most pages | Positions need verification |
| Article | ✅ Major guide pages | Present on flagship hubs |
| SoftwareApplication | ✅ Tool pages | Present on all product pages |
| FAQPage | ✅ Major pages | Present on guides and industry pages |
| Product | ⚠️ Some pages | Used on industry pages with Product schema for HiddenFeeAI |

### Schema Enhancement Opportunities

#### 1. Use `DefinedTermSet` and `DefinedTerm` for Fee Type Definitions

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Hidden Fee Classification Taxonomy",
  "description": "DetectHiddenFees proprietary classification system for hidden fee types across industries",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Administrative Fee",
      "description": "A charge for administrative or paperwork processing, often inflated beyond actual cost",
      "inCodeSet": "DetectHiddenFees Fee Classification v2.0",
      "termCode": "ADM-001"
    },
    {
      "@type": "DefinedTerm",
      "name": "Duplicate Charge",
      "description": "A charge appearing more than once on a single bill or invoice",
      "inCodeSet": "DetectHiddenFees Fee Classification v2.0",
      "termCode": "DUP-001"
    }
  ]
}
```

**Strongly recommended** for the knowledge graph page and fee definition pages. This is schema.org standard vocabulary, requires no unsupported claims — it's a taxonomy classification.

#### 2. Use `Service` Schema for Bill Negotiation Offerings

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI-Powered Bill Analysis",
  "serviceType": "Financial Document Analysis",
  "provider": {
    "@type": "Organization",
    "name": "DetectHiddenFees"
  },
  "areaServed": "US",
  "audience": {
    "@type": "Audience",
    "audienceType": "Consumers"
  }
}
```

**Use on:** ai-bill-analyzer.html, bill-negotiation-service.html, negotiate-bills.html

#### 3. Refine `WebPage > about` to Use Specific Entity References

Current pattern across many pages:
```json
"about": { "@type": "Thing", "name": "Page Title Here" }
```

**Recommended upgrade:**
```json
"about": {
  "@type": "Thing",
  "name": "Hidden Dealership Financing Fees",
  "description": "APR markups, documentation fees, GAP insurance add-ons, and other hidden costs in auto financing agreements"
}
```

This upgrade should be applied to all industry pages and fee-specific pages to improve entity understanding by search engines.

#### 4. Add `hasPart` / `isPartOf` Relationships Between Related Pages

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Hidden Fees Guides",
  "hasPart": [
    {"@type": "WebPage", "name": "Hidden Dealership Financing Fees", "url": "https://detecthiddenfees.com/hidden-dealership-financing-fees.html"},
    {"@type": "WebPage", "name": "Hidden Medical Billing Charges", "url": "https://detecthiddenfees.com/duplicate-medical-billing-charges.html"},
    {"@type": "WebPage", "name": "Hidden Bank Overdraft Fees", "url": "https://detecthiddenfees.com/hidden-bank-overdraft-fees.html"},
    {"@type": "WebPage", "name": "Hidden HVAC Contractor Fees", "url": "https://detecthiddenfees.com/hidden-hvac-contractor-fees.html"},
    {"@type": "WebPage", "name": "Hidden Home Renovation Fees", "url": "https://detecthiddenfees.com/hidden-home-renovation-fees.html"}
  ]
}
```

**Use on:** hidden-fees-guides.html, ai-analysis-hub.html, ai-document-intelligence-center.html

#### 5. `PotentialAction` on Analysis Pages

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AI Contract Review",
  "potentialAction": {
    "@type": "ViewAction",
    "target": "https://hiddenfeeai.com"
  }
}
```

### Schema Implementation Priority

| Priority | Enhancement | Impact | Effort |
|----------|-------------|--------|--------|
| P0 | Add `DefinedTermSet` to fee definition pages | High — establishes fee taxonomy for AI systems | Low |
| P1 | Refine `WebPage > about` entities on all pages | High — improves entity disambiguation | Medium |
| P2 | Add `hasPart`/`isPartOf` on hub pages | Medium — strengthens page relationships | Low |
| P3 | Add `Service` schema to service offering pages | Medium — clarifies service type | Low |
| P4 | Add `PotentialAction` to tool pages | Low — minor interaction enhancement | Low |

---

## 10. Internal Linking Strategy

### Current State

The site already has strong internal linking on major pages (footer links, related resource sections). However, entity-aware linking — where a page naturally links to related entities based on knowledge graph relationships — is inconsistent.

### Entity-Aware Linking Rules

#### Rule 1: Every Page Must Link to Its Primary Product

| Page Type | Must Link To |
|-----------|-------------|
| Industry investigation pages (HVAC, Auto, Medical, Banking) | AI Contract Review or AI Bill Analyzer (whichever is relevant) |
| Fee definition pages | The product that detects this fee type |
| Comparison pages | Both products being compared |
| Knowledge Center articles | Relevant pillar page + hub |

#### Rule 2: Every Product Page Must Link to Related Products

| Product Page | Links To |
|-------------|----------|
| AI Contract Review | AI Agreement Analyzer, Hidden Fee Detector |
| AI Bill Analyzer | AI Invoice Analyzer, AI Financial Advisor |
| AI Financial Advisor | AI Contract Review, AI Bill Analyzer, AI Agreement Analyzer |
| AI Agreement Analyzer | AI Contract Review, AI Financial Advisor |

#### Rule 3: Industry Pages Must Cross-Link Related Industries

| Industry Page | Links To |
|---------------|----------|
| Auto Financing | Banking (loan structures) |
| Healthcare | Insurance (billing overlap) |
| HVAC | Home Renovation (contractor overlap) |
| Banking | Auto Financing (lending overlap) |

#### Rule 4: Fee Type References Should Use Consistent Names

When mentioning a fee type on any page, use the canonical name defined in the knowledge graph. This creates entity consistency across the site.

Canonical Fee Type Names:
- ✅ "Administrative Fee" (not "admin fee" or "administration charge")
- ✅ "Processing Fee" (not "process fee" or "transaction charge")
- ✅ "Change Order" (not "scope change fee" or "modification charge")
- ✅ "Duplicate Charge" (not "double charge" or "repeated fee")
- ✅ "APR Markup" (not "rate markup" or "interest adjustment")
- ✅ "Documentation Fee" (not "doc fee" or "paperwork fee")

### Internal Linking Audit Checklist

- [ ] Each industry page links to the most relevant product page
- [ ] Each product page links to at least 2 related products
- [ ] Related resources sections use descriptive anchor text with entity names
- [ ] Fee types mentioned in content link to relevant definition/guide pages
- [ ] Knowledge Center articles link to both their category hub and primary pillar
- [ ] Footer navigation includes links to all major entity pages

---

## 11. Knowledge Graph Maintenance

### Entity Addition Process

When adding a new entity (fee type, industry, product, document type):

1. **Define** the entity with name, description, properties
2. **Classify** its type (FeeType, Industry, Product, DocumentType)
3. **Map** relationships to existing entities using relationship verb taxonomy
4. **Document** in knowledge-graph.md
5. **Schema** add appropriate schema.org markup
6. **Link** update relevant pages with entity-aware internal links

### Entity Update Process

When updating an existing entity:

1. Update entity definition in knowledge-graph.md
2. Review all relationship mappings for accuracy
3. Update schema.org markup on affected pages
4. Verify internal links still reference the correct entity

### Entity Removal Process

When removing or consolidating an entity:

1. Remove entity definition from knowledge-graph.md
2. Remove or reassign relationships
3. Update 301 redirects for any deprecated pages
4. Update internal links on all affected pages
5. Update schema.org markup on remaining pages

### Monthly Maintenance Tasks

- [ ] Review knowledge graph for new fee types or industries discovered through content gap analysis
- [ ] Verify internal links are not broken (run link checker)
- [ ] Check schema.org markup validity on all pages
- [ ] Cross-reference with content-inventory.md for any pages missing entity relationships
- [ ] Update relationship maps with any new pages added to the site

---

## 12. Long-Term Implementation Roadmap

### Phase 1: Foundation (Current — Q3 2026)

**Goal:** Document and stabilize the existing knowledge graph

| Task | Status | Priority |
|------|--------|----------|
| Create comprehensive knowledge-graph.md | 🔲 In Progress | P0 |
| Document all core entities with definitions | 🔲 In Progress | P0 |
| Map all existing entity relationships | 🔲 In Progress | P0 |
| Audit current schema.org markup for entity support | 🔲 Planned | P1 |
| Create fee type taxonomy with DefinedTermSet schema | 🔲 Planned | P1 |

### Phase 2: Schema Enhancement (Q3 2026)

**Goal:** Strengthen entity understanding through structured data

| Task | Priority | Effort |
|------|----------|--------|
| Add DefinedTermSet schema to fee type pages | P0 | Medium |
| Refine WebPage > about entities on all 100+ pages | P1 | High |
| Add hasPart/isPartOf on hub/collection pages | P1 | Medium |
| Add Service schema to negotiation and service pages | P2 | Low |
| Create entity-specific schema templates for new page generation | P1 | Medium |

### Phase 3: Internal Linking Overhaul (Q3-Q4 2026)

**Goal:** Every page links to related entities naturally

| Task | Priority | Effort |
|------|----------|--------|
| Audit current internal linking against knowledge graph | P0 | Medium |
| Add entity-aware "Related Fee Types" sections to industry pages | P1 | Medium |
| Add entity-aware "Related Products" sections to fee pages | P1 | Medium |
| Add cross-industry links on industry pages | P2 | Low |
| Verify all 100+ pages meet minimum internal linking requirements | P1 | High |

### Phase 4: Entity Authority Building (Q4 2026)

**Goal:** Search engines recognize DetectHiddenFees as authoritative for hidden fee entities

| Task | Priority | Effort |
|------|----------|--------|
| Create dedicated fee type definition pages for DefinedTermSchema | P1 | Medium |
| Expand industry investigation pages with richer fee type coverage | P1 | Medium |
| Create entity relationship visualization (diagram) | P2 | Low |
| Add knowledge graph section to major pillar pages | P2 | Medium |
| Ensure all flagship hubs include knowledge graph content blocks | P1 | Medium |

### Phase 5: Expansion & Scale (Q1 2027)

**Goal:** Scale the knowledge graph as the site grows

| Task | Priority | Effort |
|------|----------|--------|
| Add new fee types as discovered through content gap analysis | P1 | Ongoing |
| Add new industries as content expands | P1 | Ongoing |
| Create automated entity relationship checks for new pages | P2 | High |
| Integrate knowledge graph with content brief generation | P2 | Medium |
| Develop entity relationship scoring (strength of connection) | P3 | High |

### Phase 6: Advanced Entity Features (Q1-Q2 2027)

**Goal:** Maximize entity authority for AI search

| Task | Priority | Effort |
|------|----------|--------|
| Submit knowledge graph to Google via structured data | P1 | Low |
| Create entity-specific llms.txt entries for AI crawlers | P2 | Low |
| Add entity relationship data to sitemap governance | P2 | Low |
| Monitor Google Knowledge Panel eligibility | P1 | Ongoing |
| Develop entity-based content recommendation engine | P3 | High |

### Implementation Guidelines

- **Do not** mass-create pages. Each page must serve a real user need.
- **Do not** add schema markup that requires unsupported claims or guarantees.
- **Do** progressively enhance existing pages with entity relationships during normal content updates.
- **Do** use the knowledge graph to identify content gaps (e.g., missing fee type pages, cross-linking opportunities).
- **Do** prioritize pages that serve the highest user intent based on search console data.

---

## Appendix A: Entity Index

| Entity | Type | Canonical Page | Status |
|--------|------|----------------|--------|
| DetectHiddenFees | Brand | /index.html | ✅ Active |
| HiddenFeeAI | Platform | hiddenfeeai.com | ✅ Active |
| AI Contract Review | Product | /ai-contract-review.html | ✅ Active |
| AI Bill Analyzer | Product | /ai-bill-analyzer.html | ✅ Active |
| AI Financial Advisor | Product | /ai-financial-advisor.html | ✅ Active |
| AI Agreement Analyzer | Product | /ai-agreement-analyzer.html | ✅ Active |
| AI Invoice Analyzer | Product | /ai-invoice-analyzer.html | ✅ Active |
| Hidden Fee Detector | Product | /hidden-fee-detector.html | ✅ Active |
| Administrative Fee | Fee Type | *Covered across pages* | ⚠️ No dedicated page |
| Processing Fee | Fee Type | *Covered across pages* | ⚠️ No dedicated page |
| Convenience Fee | Fee Type | *Covered across pages* | ⚠️ No dedicated page |
| Cancellation Fee | Fee Type | *Covered across pages* | ⚠️ No dedicated page |
| Late Fee | Fee Type | *Covered across pages* | ⚠️ No dedicated page |
| Renewal Fee | Fee Type | *Covered across pages* | ⚠️ No dedicated page |
| Change Order | Fee Type | /change-order-fees.html | ✅ Active |
| Duplicate Charge | Fee Type | *Covered in medical billing page* | ⚠️ No dedicated page |
| HVAC | Industry | /hidden-hvac-contractor-fees.html | ✅ Active |
| Home Renovation | Industry | /hidden-home-renovation-fees.html | ✅ Active |
| Auto Financing | Industry | /hidden-dealership-financing-fees.html | ✅ Active |
| Healthcare | Industry | /duplicate-medical-billing-charges.html | ✅ Active |
| Banking | Industry | /hidden-bank-overdraft-fees.html | ✅ Active |
| Telecommunications | Industry | *Covered in hidden-fees-guides.html* | ⚠️ No dedicated page |
| Insurance | Industry | *Covered across pages* | ⚠️ No dedicated page |
| Subscription Services | Industry | *Covered across pages* | ⚠️ No dedicated page |
| Contract | Document Type | /contract-analysis-ai.html | ✅ Active |
| Invoice | Document Type | /ai-invoice-analyzer.html | ✅ Active |
| Bill | Document Type | /ai-bill-analyzer.html | ✅ Active |
| Estimate | Document Type | /ai-estimate-review.html | ✅ Active |
| Bank Statement | Document Type | /hidden-bank-overdraft-fees.html | ✅ Active |

---

## Appendix B: Glossary of Relationship Verbs

| Verb | Direction | Meaning |
|------|-----------|---------|
| analyzes | Product → Document Type | This product processes this type of document |
| detects | Product → Fee Type | This product can identify this fee type |
| appears_in | Fee Type → Document Type | This fee is commonly found in this document type |
| common_in | Fee Type → Industry | This fee type is prevalent in this industry |
| related_to | Entity → Entity | General semantic relationship |
| targets | Product → Industry | This product is designed for this industry |
| supersedes | Entity → Entity | This entity replaces the other |
| has_fee | Industry → Fee Type | This industry commonly has this fee type |
| overlaps_with | Product → Product | Products share capabilities |
| unifies | Entity → Entities | This entity encompasses multiple others |
| linked_to | Page → Page | Internal hyperlink exists between these pages |

---

> **Maintenance Note:** This knowledge graph is a living document. Update it whenever new entities are added to the site, new relationships are discovered, or existing relationships change. The goal is to maintain a complete, accurate map of how DetectHiddenFees concepts connect.