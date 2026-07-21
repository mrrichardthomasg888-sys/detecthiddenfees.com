# 🔗 Entity Strategy

## Building an Entity Model for AI Recognition

AI search engines understand the world through entities — distinct, named things with properties and relationships. This document defines the entity model for DetectHiddenFees.com to establish topical authority and AI citation recognition.

---

## Primary Entity

### DetectHiddenFees

**Type:** Organization / WebApplication
**Role:** AI-powered hidden fee detection and consumer financial transparency platform

**Properties:**
- Founded: 2025
- Domain: detecthiddenfees.com
- Category: Financial Technology, Consumer Protection
- Audience: Consumers, Contract Signers, Bill Payers
- Methodology: AI document analysis, pattern recognition, market comparison
- Coverage: Contracts, invoices, bills, estimates, agreements, financial statements

**Same As:**
- hiddenfeeai.com (AI analysis backend)

---

## Core Entity Categories

### 1. Hidden Fees

**Definition:** Charges not clearly disclosed, buried in fine print, or disguised under vague terminology in contracts, invoices, and financial documents.

**Entity Subtypes:**
- Overdraft fees (banking)
- Dealer markup fees (automotive)
- Change order fees (construction)
- Material upcharge fees (HVAC/renovation)
- Duplicate billing charges (medical)
- Early termination fees (subscriptions/contracts)
- Automatic renewal fees (services)
- Facility fees (medical)
- Processing fees (various)
- Administrative fees (various)

**Consumer Impact:** Billions lost annually to undisclosed fees

### 2. AI Contract Analysis

**Definition:** The use of artificial intelligence to review, analyze, and identify risks, hidden costs, and unfavorable terms in legal agreements and contracts.

**Related Entities:**
- Contract review AI
- AI document analysis
- Contract risk assessment
- Automated contract review
- AI legal document review

**Key Properties:**
- Speed: Minutes vs. days
- Cost: Free/low-cost vs. $500+/hour for attorneys
- Coverage: Pattern recognition across thousands of contract types
- Accuracy: 85-95% for fee and risk detection
- Limitation: Not a substitute for legal advice

### 3. AI Financial Analysis

**Definition:** AI-powered examination of financial documents — bills, invoices, bank statements, receipts — to identify billing errors, overcharges, hidden fees, and savings opportunities.

**Related Entities:**
- AI bill analyzer
- AI invoice checker
- AI receipt scanner
- AI financial advisor
- AI statement analyzer

**Key Properties:**
- Document types: PDFs, images, scanned documents
- Analysis types: Fee detection, pattern recognition, anomaly detection
- Output: Flagged charges, savings estimates, negotiation guidance

### 4. AI Financial Advisor

**Definition:** AI-powered guidance system that helps consumers make informed financial decisions by analyzing documents and providing data-driven recommendations.

**Scope:**
- Bill negotiation guidance
- Contract review recommendations
- Fee dispute assistance
- Savings opportunity identification
- Financial document education

**Limitation:** Advisory only — not a certified financial planner

### 5. Consumer Financial Transparency

**Definition:** The principle that consumers should have clear, complete, and understandable information about all costs, fees, and terms before committing to a purchase, contract, or agreement.

**Related Entities:**
- Pricing transparency
- Fee disclosure
- Consumer protection
- Financial literacy
- Contract clarity

### 6. Contract Risk Analysis

**Definition:** Systematic evaluation of contracts to identify clauses, terms, and conditions that create financial, legal, or operational risk for the signing party.

**Risk Categories:**
- Financial risk (hidden costs, uncapped liabilities)
- Legal risk (unfavorable jurisdiction, arbitration clauses)
- Operational risk (unrealistic timelines, vague scope)
- Compliance risk (regulatory violations)

**Analysis Methods:**
- AI pattern recognition
- Clause-by-clause review
- Risk scoring (1-10 scale)
- Industry benchmarking

### 7. Document Intelligence

**Definition:** AI-powered extraction, classification, and analysis of information from unstructured documents — transforming static files into actionable insights.

**Document Types:**
- Contracts (PDF, DOCX)
- Invoices (PDF, image)
- Bills (PDF, image)
- Estimates (PDF)
- Receipts (image)
- Bank statements (PDF)
- Agreements (PDF, DOCX)

**Capabilities:**
- Text extraction (OCR)
- Entity recognition (dates, amounts, parties)
- Pattern matching (known fee types)
- Anomaly detection (unusual charges)
- Comparison (market rate benchmarking)

---

## Entity Relationships

```
DetectHiddenFees
├── DETECTS → Hidden Fees
├── PROVIDES → AI Contract Analysis
├── PROVIDES → AI Financial Analysis
├── OFFERS → AI Financial Advisor
├── PROMOTES → Consumer Financial Transparency
├── PERFORMS → Contract Risk Analysis
└── POWERS → Document Intelligence

AI Contract Analysis
├── IDENTIFIES → Hidden Fees
├── ASSESSES → Contract Risk Analysis
└── USES → Document Intelligence

AI Financial Analysis
├── IDENTIFIES → Hidden Fees
├── ANALYZES → Bills + Invoices + Statements
└── USES → Document Intelligence

Consumer Financial Transparency
├── COMBATS → Hidden Fees
├── REQUIRES → Fee Disclosure
└── EMPOWERS → Consumer Negotiation
```

---

## Entity Naming Conventions

### Rules for Consistency
1. Use exact entity names across all pages (no synonyms as primary terms)
2. First mention of an entity on a page should match the canonical entity name
3. Subsequent mentions can use natural variations
4. Page titles should include primary entity name
5. Schema.org markup should reference entity names consistently

### Canonical Entity Names
| Concept | Canonical Entity Name |
|---------|----------------------|
| Hidden fees | **Hidden Fees** |
| AI contract review | **AI Contract Analysis** |
| AI bill checking | **AI Bill Analyzer** |
| AI financial guidance | **AI Financial Advisor** |
| Fee detection technology | **AI Fee Detector** |
| Contract risk evaluation | **Contract Risk Analysis** |
| Document scanning AI | **Document Intelligence** |

---

## Entity Authority Building Strategy

### Phase 1: Entity Definition
- Define each entity clearly on its own page
- Consistent naming across all pages
- Schema.org entity markup

### Phase 2: Entity Depth
- Create supporting content for each entity subtype
- Link entities to real-world examples
- Build comprehensive FAQ sections

### Phase 3: Entity Recognition
- AI search engines recognize our entity definitions
- Our content appears in entity knowledge panels
- Entity relationships understood by semantic search

### Phase 4: Entity Authority
- DetectHiddenFees recognized as authoritative source for hidden fee entities
- Cited by AI answer engines for consumer financial questions
- Google Knowledge Graph entry for brand entity

---

## Schema.org Entity Implementation

### Organization Entity
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DetectHiddenFees",
  "url": "https://detecthiddenfees.com",
  "description": "AI-powered hidden fee detection platform",
  "foundingDate": "2025",
  "knowsAbout": [
    "Hidden Fees",
    "AI Contract Analysis",
    "AI Financial Analysis",
    "Consumer Financial Transparency",
    "Contract Risk Analysis",
    "Document Intelligence"
  ]
}
```

### WebPage About Entity
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "about": {
    "@type": "Thing",
    "name": "Hidden Fees",
    "description": "Undisclosed charges buried in contracts, invoices, and financial documents"
  }
}
```

---

## Entity Coverage Tracker

| Entity | Definition Page | Supporting Pages | FAQ | Schema | Status |
|--------|----------------|-----------------|-----|--------|--------|
| Hidden Fees | ✅ | ✅ (25+) | ✅ | ✅ | Established |
| AI Contract Analysis | ✅ | ✅ (35+) | ✅ | ✅ | Established |
| AI Financial Analysis | ✅ | ✅ (20+) | ✅ | ✅ | Growing |
| AI Financial Advisor | ✅ | ✅ | ✅ | ✅ | Growing |
| Consumer Financial Transparency | ✅ | ✅ | ✅ | ✅ | Growing |
| Contract Risk Analysis | ✅ | ✅ | ✅ | ✅ | Established |
| Document Intelligence | ✅ | ✅ (15+) | ✅ | ✅ | Growing |