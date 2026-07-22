/**
 * Build Educational Examples Library
 * 
 * Generates:
 * - /hidden-fee-examples.html (hub - overwrite existing thin page)
 * - /example-hvac-estimate.html
 * - /example-home-renovation-proposal.html
 * - /example-medical-bill.html
 * - /example-auto-financing.html
 * - /example-cell-phone-bill.html
 * - /example-internet-service-agreement.html
 * 
 * Run: node build-examples-library.js
 */

const fs = require('fs');

// ===== SHARED CSS =====
const sharedCSS = `*{margin:0;padding:0;box-sizing:border-box}html,body{overflow-x:hidden;scroll-behavior:smooth}body{font-family:'Inter',sans-serif;background:#020617;color:#e2e8f0;-webkit-font-smoothing:antialiased;padding-bottom:80px}a{text-decoration:none}.container{max-width:1240px;margin:auto;padding:0 20px}body::before,body::after{content:'';position:fixed;pointer-events:none;z-index:-1;border-radius:50%;filter:blur(150px);opacity:0.25;animation:floatOrb 25s infinite alternate ease-in-out}body::before{width:800px;height:800px;background:radial-gradient(circle,#2563eb,transparent 70%);top:-200px;left:-250px}body::after{width:700px;height:700px;background:radial-gradient(circle,#7c3aed,transparent 70%);bottom:-150px;right:-200px;animation-delay:-8s}.orb-accent{position:fixed;pointer-events:none;z-index:-1;border-radius:50%;filter:blur(180px);opacity:0.15;width:600px;height:600px;background:radial-gradient(circle,#06b6d4,transparent 70%);top:40%;left:40%;animation:floatOrb2 30s infinite alternate ease-in-out}@keyframes floatOrb{0%{transform:translate(0,0)scale(1)}100%{transform:translate(100px,50px)scale(1.25)}}@keyframes floatOrb2{0%{transform:translate(0,0)scale(1);opacity:0.1}50%{transform:translate(-60px,80px)scale(1.3);opacity:0.2}100%{transform:translate(40px,-60px)scale(0.9);opacity:0.15}}@keyframes fadeUp{0%{opacity:0;transform:translateY(40px)}100%{opacity:1;transform:translateY(0)}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}nav{position:sticky;top:0;z-index:999;background:rgba(2,6,23,.85);backdrop-filter:blur(24px)saturate(1.5);border-bottom:1px solid rgba(59,130,246,0.15)}.nav-wrap{display:flex;align-items:center;padding:14px 0;gap:18px;flex-wrap:wrap}.logo{font-size:1.7rem;font-weight:900;letter-spacing:-2px;color:white;white-space:nowrap;flex-shrink:0;text-shadow:0 0 30px rgba(37,99,235,0.3)}.logo span{color:#3b82f6}.nav-links{display:flex;gap:4px;align-items:center;flex-wrap:wrap}.nav-links a{color:#cbd5e1;font-weight:600;font-size:.95rem;padding:8px 14px;white-space:nowrap;transition:color 0.2s;border-radius:8px}.nav-links a:hover{color:#fff}.hero{padding:60px 0 70px;position:relative;overflow:hidden}.badge{display:inline-block;padding:14px 22px;border-radius:999px;border:2px solid rgba(59,130,246,.7);background:rgba(37,99,235,.08);font-size:.82rem;font-weight:800;letter-spacing:.22em;color:#bfdbfe;margin-bottom:30px}.hero h1{font-size:clamp(42px,6vw,82px);line-height:.95;font-weight:900;letter-spacing:-.06em;max-width:1050px;margin-bottom:28px;background:linear-gradient(135deg,#fff 0%,#93c5fd 30%,#c084fc 60%,#fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200% 200%;animation:gradientShift 8s ease infinite;filter:drop-shadow(0 0 40px rgba(37,99,235,0.3))}.hero-sub{font-size:1.2rem;line-height:2;color:#e2e8f0;max-width:960px;margin-bottom:24px}.primary-btn{display:inline-block;padding:18px 32px;border-radius:16px;background:linear-gradient(135deg,#2563eb,#9333ea);color:white;font-weight:800;font-size:1rem;box-shadow:0 16px 50px rgba(37,99,235,.35);transition:transform 0.25s,box-shadow 0.3s}.primary-btn:hover{transform:translateY(-3px)}.secondary-btn{display:inline-block;padding:18px 32px;border-radius:16px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:#e2e8f0;font-weight:800;font-size:1rem;transition:background 0.2s}.secondary-btn:hover{background:rgba(255,255,255,.08)}.section{padding:70px 0}.section h2{font-size:clamp(32px,4vw,56px);line-height:1.05;letter-spacing:-.04em;font-weight:900;margin-bottom:24px;background:linear-gradient(135deg,#fff 0%,#93c5fd 40%,#c084fc 70%,#fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.section h3{font-size:1.6rem;font-weight:800;color:white;margin-bottom:16px;letter-spacing:-.02em}.section p{font-size:1.08rem;line-height:2;color:#cbd5e1;margin-bottom:20px;max-width:900px}.card{background:linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.95));border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:30px 28px;margin-bottom:20px;transition:transform 0.3s,border-color 0.3s}.card:hover{transform:translateY(-4px);border-color:rgba(37,99,235,.3)}.card h3{font-size:1.3rem;margin-bottom:12px;font-weight:800;color:white}.card p{color:#94a3b8;font-size:.95rem;line-height:1.8;margin-bottom:12px}.card ul{list-style:none;padding:0}.card ul li{padding:6px 0;color:#cbd5e1;font-size:.95rem;border-bottom:1px solid rgba(255,255,255,.04)}.card ul li:last-child{border-bottom:none}.card ul li strong{color:white}.card ul li::before{content:"• ";color:#3b82f6;font-weight:900}.topic-box{background:linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.98));border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:30px 32px;margin-top:24px}.topic-box h3{font-size:1.4rem;margin-bottom:14px;font-weight:800;color:white}.topic-box p{color:#cbd5e1;font-size:1.05rem;line-height:1.9}.topic-box ul{list-style:none;padding:0;margin-top:12px}.topic-box ul li{padding:10px 0;color:#cbd5e1;font-size:1rem;border-bottom:1px solid rgba(255,255,255,.04)}.topic-box ul li:last-child{border-bottom:none}.topic-box ul li strong{color:white}.topic-box ul li::before{content:"\\2713 ";color:#3b82f6;font-weight:900}.guide-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:32px}.guide-card{background:linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.95));border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:30px 28px;transition:transform 0.3s,border-color 0.3s}.guide-card:hover{transform:translateY(-4px);border-color:rgba(37,99,235,.3)}.guide-card h3{font-size:1.3rem;margin-bottom:12px;font-weight:800;color:white}.guide-card p{color:#94a3b8;font-size:.95rem;line-height:1.8;margin-bottom:18px}.guide-link{display:inline-block;padding:12px 20px;background:rgba(59,130,246,.15);border-radius:12px;color:#93c5fd;font-weight:700;transition:background 0.2s,color 0.2s}.guide-link:hover{background:rgba(59,130,246,.25);color:white}.highlight-box{margin:32px 0;padding:28px 32px;border-radius:24px;background:rgba(37,99,235,.08);border:1px solid rgba(59,130,246,.2)}.highlight-box h3{color:white;font-size:1.3rem;margin-bottom:12px;font-weight:800}.highlight-box p{color:#cbd5e1;font-size:1rem;line-height:1.9}.warning-box{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-left:5px solid #ef4444;padding:24px 28px;border-radius:18px;margin:32px 0}.warning-box h3{color:#fca5a5;margin-bottom:12px;font-size:1.2rem}.warning-box p{color:#cbd5e1;font-size:1rem;line-height:1.9}.disclaimer{font-size:.85rem;color:#64748b;line-height:1.8;margin-top:24px;padding:14px 20px;border-radius:14px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);max-width:900px}.disclaimer strong{color:#94a3b8}.trust-bar{display:flex;flex-wrap:wrap;gap:8px 20px;margin:16px 0 22px 0;padding:12px 18px;background:rgba(255,255,255,.04);border-radius:14px;border:1px solid rgba(255,255,255,.06)}.trust-bar span{display:flex;align-items:center;gap:6px;font-size:.85rem;font-weight:500;color:#94a3b8}.trust-bar span::before{content:"\\2713";color:#3b82f6;font-weight:900}.cta-block{margin:50px 0;padding:60px 40px;border-radius:34px;text-align:center;background:linear-gradient(135deg,#2563eb,#7c3aed);box-shadow:0 30px 100px rgba(37,99,235,.3)}.cta-block h2{font-size:clamp(32px,4vw,56px);font-weight:900;line-height:1.05;letter-spacing:-.04em;margin-bottom:16px;color:white}.cta-block p{font-size:1.1rem;color:#dbeafe;margin-bottom:30px;max-width:800px;margin-left:auto;margin-right:auto}.cta-btn{display:inline-block;padding:20px 42px;background:white;color:#0f172a;font-weight:900;border-radius:16px;font-size:1rem;transition:transform 0.25s,box-shadow 0.3s}.cta-btn:hover{transform:translateY(-3px)}.cta-reassurance{margin-top:14px;font-size:.85rem;color:rgba(255,255,255,.7)}footer{padding:70px 0;margin-top:80px;border-top:1px solid rgba(255,255,255,.08)}.footer-links{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:14px}.footer-links a{color:#94a3b8;font-weight:600;font-size:.85rem;transition:color 0.2s}.footer-links a:hover{color:white}.footer-column{min-width:200px}.footer-column a{display:block;padding:5px 0;color:#94a3b8;font-weight:600;font-size:.85rem;transition:color 0.2s}.footer-column a:hover{color:#fff}.footer-column strong{color:#94a3b8;display:block;margin-bottom:14px;font-size:1.05rem;letter-spacing:0.5px}.sticky-cta-bar{display:none;position:fixed;bottom:0;left:0;right:0;z-index:1000;background:rgba(2,8,23,.95);backdrop-filter:blur(18px);padding:12px 20px;border-top:1px solid rgba(255,255,255,.08);align-items:center;justify-content:space-between;gap:16px;box-shadow:0 -10px 40px rgba(0,0,0,0.6)}.sticky-cta-bar .sticky-text{font-weight:700;font-size:.95rem;color:#e2e8f0;white-space:nowrap;display:flex;align-items:center;gap:12px}.sticky-cta-bar .sticky-text .price{color:#3b82f6;background:rgba(59,130,246,.12);padding:2px 12px;border-radius:100px;font-size:.85rem}.sticky-cta-bar .sticky-btn{display:inline-block;padding:12px 28px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#9333ea);color:white;font-weight:800;font-size:.95rem;box-shadow:0 8px 30px rgba(59,130,246,.35);text-align:center;min-height:48px;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;transition:transform 0.2s;flex-shrink:0}.sticky-cta-bar .sticky-btn:hover{transform:scale(1.03)}@media(min-width:901px){.sticky-cta-bar{display:flex}}@media(max-width:900px){.nav-wrap{flex-direction:column;align-items:flex-start}.nav-links{width:100%;justify-content:flex-start;gap:4px 8px}.hero h1{font-size:2.8rem}.section{padding:50px 0}.guide-grid{grid-template-columns:1fr 1fr}.cta-block{padding:40px 20px}.sticky-cta-bar{display:flex;padding:10px 14px;gap:10px}}@media(max-width:600px){.hero h1{font-size:2rem}.guide-grid{grid-template-columns:1fr}.card{padding:22px 18px}}`;

// ===== FOOTER =====
const footer = `<footer><div class="container"><div class="footer-links"><div class="footer-column"><strong>AI Tools</strong><a href="/ai-financial-advisor.html">AI Financial Advisor</a><a href="/ai-contract-review.html">AI Contract Review</a><a href="/ai-bill-analyzer.html">AI Bill Analyzer</a><a href="/ai-agreement-analyzer.html">AI Agreement Analyzer</a><a href="/hidden-fee-detector.html">Hidden Fee Detector</a><a href="/analyze-my-document.html">Upload Document</a></div><div class="footer-column"><strong>Educational Resources</strong><a href="/hidden-fee-examples.html">Examples Library</a><a href="/hidden-fees-guides.html">Hidden Fee Guides</a><a href="/knowledge-center.html">Knowledge Center</a><a href="/consumer-financial-intelligence-center.html">Financial Intelligence Center</a><a href="/contract-terms-glossary.html">Contract Terms Glossary</a></div><div class="footer-column"><strong>Industry Guides</strong><a href="/hidden-hvac-contractor-fees.html">HVAC Fees</a><a href="/hidden-home-renovation-fees.html">Renovation Fees</a><a href="/hidden-dealership-financing-fees.html">Dealership Fees</a><a href="/duplicate-medical-billing-charges.html">Medical Billing</a><a href="/hidden-bank-overdraft-fees.html">Banking Fees</a></div><div class="footer-column"><strong>Company</strong><a href="/about-detect-hidden-fees.html">About</a><a href="/ai-analysis-methodology.html">Methodology</a><a href="/editorial-policy.html">Editorial Policy</a><a href="/privacy-and-ai-security.html">Privacy</a><a href="/contact.html">Contact</a></div></div><p style="margin-top:24px;color:#64748b;">&copy; 2026 DetectHiddenFees.com — AI-Powered Hidden Fee Detection for Consumers</p></div></footer><div class="sticky-cta-bar"><div class="sticky-text"><span>\\ud83d\\udd0d Review Your Documents</span><span class="price">$15</span></div><a href="https://hiddenfeeai.com" class="sticky-btn">Upload & Analyze</a></div><script>document.addEventListener('DOMContentLoaded',function(){var btn=document.getElementById('pdfDownloadBtn');if(btn){btn.onclick=function(e){e.preventDefault();var u='/premium-contract-guide.pdf';var x=new XMLHttpRequest();x.open('GET',u,true);x.responseType='blob';x.onload=function(){var b=new Blob([x.response],{type:'application/octet-stream'});var url=URL.createObjectURL(b);if(navigator.msSaveBlob){navigator.msSaveBlob(b,'Hidden-Fee-Detection-Guide.pdf')}else{var a=document.createElement('a');a.href=url;a.download='Hidden-Fee-Detection-Guide.pdf';document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(function(){URL.revokeObjectURL(url)},5000)}};x.send()}}});</script></body></html>`;

// ===== SCHEMA HELPERS =====
function orgSchema() {
  return `{"@context":"https://schema.org","@type":"Organization","name":"DetectHiddenFees","url":"https://detecthiddenfees.com","logo":"https://detecthiddenfees.com/logo.png","description":"AI-powered hidden fee detection platform"}`;
}
function breadcrumb(items) {
  const list = items.map((item, i) => `{"@type":"ListItem","position":${i+1},"name":"${item.name}","item":"https://detecthiddenfees.com${item.url}"}`).join(',');
  return `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[${list}]}`;
}

// ===== EXAMPLE PAGES DATA =====
const examples = [
  {
    slug: 'example-hvac-estimate',
    title: 'HVAC Estimate Example: Hidden Fees in a Furnace Replacement Quote | DetectHiddenFees',
    metaDesc: 'See how hidden fees appear in a real HVAC estimate. Learn to spot material markups, permit padding, and labor inflation before you sign.',
    h1: 'HVAC Estimate Example: What Hidden Fees Look Like in a Furnace Replacement Quote',
    heroSub: 'This illustrative example shows how hidden fees commonly appear in HVAC estimates. Compare against your own proposals to identify potential markups.',
    docType: 'HVAC Estimate / Proposal',
    scenario: 'A homeowner receives a $8,450 quote for a new furnace installation. The estimate appears straightforward but contains several hidden markups that increase the total cost by over $1,200.',
    pricingBreakdown: `Total Quote: $8,450
Base Furnace Unit: $4,200
Labor & Installation: $2,800
Permits & Inspections: $450
Materials & Supplies: $350
Miscellaneous Fees: $650`,
    hiddenFees: [
      { name: 'Material Upcharge on Furnace Unit', detail: 'The furnace unit is marked up 35% above wholesale price. While some markup is standard, 35% exceeds typical 15-20% margins.', amount: '$525' },
      { name: 'Permit Fee Padding', detail: 'The actual permit cost in most jurisdictions is $150-200, but the estimate shows $450.', amount: '$250' },
      { name: 'Administrative / Dispatch Fee', detail: 'A $150 "administrative fee" is included with no clear explanation of what service it covers.', amount: '$150' },
      { name: 'Miscellaneous Category Bloat', detail: 'The $650 "Miscellaneous" line item is not itemized. This is a red flag for hidden markups.', amount: '$325' },
    ],
    questions: [
      'Can you provide the model number and MSRP for the furnace unit so I can verify the equipment cost?',
      'What is the exact permit fee from the local jurisdiction? Can you show the permit schedule?',
      'What does the "Administrative Fee" cover? Is it negotiable?',
      'Can you provide a fully itemized breakdown of the Miscellaneous category?',
      'How many labor hours are included, and what is the hourly rate?',
    ],
    aiAnalysis: 'DetectHiddenFees AI would scan this HVAC estimate and flag: (1) the material upcharge on the furnace unit by comparing the quoted price against industry wholesale data, (2) the permit fee discrepancy by cross-referencing local jurisdiction fee schedules, (3) the vague "Miscellaneous" category as a high-risk line item requiring itemization, and (4) the administrative fee as an uncategorized charge. The AI would generate a report highlighting each flagged item with its risk level (High/Medium/Low) and suggested negotiation language.',
    pillarUrl: '/hidden-hvac-contractor-fees.html',
    pillarName: 'Hidden HVAC Contractor Fees Guide',
    pillarLabel: 'HVAC Fee Guide',
    kcUrl: '/knowledge-center.html',
    kcName: 'Knowledge Center',
  },
  {
    slug: 'example-home-renovation-proposal',
    title: 'Home Renovation Proposal Example: Hidden Fees in a Kitchen Remodel | DetectHiddenFees',
    metaDesc: 'See how change-order fees, material allowance tricks, and subcontractor layering appear in a typical home renovation proposal.',
    h1: 'Home Renovation Proposal Example: Hidden Costs in a Kitchen Remodel',
    heroSub: 'This illustrative example shows how hidden fees typically appear in home renovation proposals. Use it as a reference when reviewing your own contracts.',
    docType: 'Home Renovation Proposal / Contract',
    scenario: 'A homeowner receives a $32,000 kitchen renovation proposal. The proposal appears comprehensive but contains several hidden fee structures common in the renovation industry.',
    pricingBreakdown: `Total Proposal: $32,000
Cabinetry & Countertops: $14,500
Labor & Installation: $9,800
Plumbing & Electrical: $3,200
Materials & Tile: $2,500
Permits & Design Fees: $1,200
Change Order Allowance: $800`,
    hiddenFees: [
      { name: 'Material Allowance Manipulation', detail: 'The $14,500 for cabinets and countertops includes a 25% "handling and procurement fee" on top of the material cost.', amount: '$2,900' },
      { name: 'Subcontractor Layering', detail: 'Plumbing and electrical work is subcontracted with a 20% markup passed to the homeowner without disclosure.', amount: '$640' },
      { name: 'Change Order Minimum Fee', detail: 'The contract requires a minimum $300 fee for any change order, regardless of scope or cost.', amount: '$300' },
      { name: 'Disposal & Cleanup Fee', detail: 'A $600 disposal fee is included, but standard dumpster rental in most areas is $250-350.', amount: '$300' },
    ],
    questions: [
      'What is the procurement/handling fee percentage on materials? Is it disclosed in the contract?',
      'Which portions of the work will be subcontracted? What markup is applied to subcontractor bids?',
      'Can you remove the change order minimum fee and only charge actual costs for changes?',
      'What is the actual dumpster rental cost? Can you provide the invoice?',
      'Is the $32,000 a firm fixed price, or are there allowances that could increase the final cost?',
    ],
    aiAnalysis: 'DetectHiddenFees AI would analyze this renovation proposal and flag: (1) the undisclosed 25% procurement fee on materials as a high-risk pricing practice, (2) the subcontractor markup as a potential cost inflation area, (3) the change order minimum fee as a restrictive clause, and (4) the inflated disposal fee against market benchmarks. The AI would provide a risk-scored report with specific questions to ask the contractor before signing.',
    pillarUrl: '/hidden-home-renovation-fees.html',
    pillarName: 'Hidden Home Renovation Fees Guide',
    pillarLabel: 'Renovation Fee Guide',
    kcUrl: '/knowledge-center.html',
    kcName: 'Knowledge Center',
  },
  {
    slug: 'example-medical-bill',
    title: 'Medical Bill Example: Duplicate Charges & Hidden Fees in a Hospital Bill | DetectHiddenFees',
    metaDesc: 'See how duplicate procedure charges, facility fees, and billing code errors appear on a typical medical bill.',
    h1: 'Medical Bill Example: How Duplicate Charges and Hidden Fees Appear in Hospital Billing',
    heroSub: 'This illustrative example shows common medical billing errors and hidden fees. Compare against your own medical bills to identify potential overcharges.',
    docType: 'Medical Bill / Hospital Statement',
    scenario: 'A patient receives a $12,500 hospital bill after a three-day stay for a routine procedure. The bill contains multiple line items that appear questionable upon review.',
    pricingBreakdown: `Total Bill: $12,500
Room & Board (3 days): $4,800
Surgery / Procedure: $3,900
Medications & Supplies: $1,850
Lab Work & Imaging: $1,200
Facility Fee: $450
Miscellaneous Charges: $300`,
    hiddenFees: [
      { name: 'Duplicate Lab Charge', detail: 'A "Complete Blood Count" lab test appears twice with the same date and amount. One should be removed.', amount: '$175' },
      { name: 'Facility Fee on Top of Room Charge', detail: 'A $450 facility fee is charged in addition to the daily room rate, which may be double-billing for the same facility use.', amount: '$450' },
      { name: 'Unbundled Procedure Codes', detail: 'The surgery charge includes individual line items for supplies and equipment that are typically bundled into the procedure cost.', amount: '$340' },
      { name: 'Medication Markup', detail: 'Medication charges exceed typical retail pharmacy prices by 300-400%.', amount: '$420' },
    ],
    questions: [
      'Can I get an itemized bill with CPT codes for every charge?',
      'Why does the Complete Blood Count appear twice with the same date?',
      'What does the Facility Fee cover separately from the daily room charge?',
      'Are the surgery supply charges typically bundled or unbundled for this procedure?',
      'Can you provide the NDC numbers for the medication charges?',
    ],
    aiAnalysis: 'DetectHiddenFees AI would scan this medical bill and identify: (1) the duplicate lab charge by matching identical line items, (2) the facility fee as a potentially duplicative charge by comparing against the room rate, (3) unbundled procedure codes that should be bundled per standard coding practices, and (4) medication pricing that exceeds typical ranges. The AI would generate a prioritized list of charges to dispute with the hospital billing department.',
    pillarUrl: '/duplicate-medical-billing-charges.html',
    pillarName: 'Duplicate Medical Billing Charges Guide',
    pillarLabel: 'Medical Billing Guide',
    kcUrl: '/knowledge-center.html',
    kcName: 'Knowledge Center',
  },
  {
    slug: 'example-auto-financing',
    title: 'Auto Financing Agreement Example: Hidden APR Markups & Fees | DetectHiddenFees',
    metaDesc: 'See how APR markups, documentation fees, and unnecessary add-ons appear in a typical dealership financing agreement.',
    h1: 'Auto Financing Example: Hidden Charges in a Dealership Financing Agreement',
    heroSub: 'This illustrative example shows how dealerships add hidden costs to financing agreements. Use it to spot similar tactics in your own auto loan documents.',
    docType: 'Auto Financing Agreement / Retail Installment Contract',
    scenario: 'A buyer finances a $28,000 vehicle at a dealership. The offered financing includes several hidden charges and markups that increase the total cost by over $3,500.',
    pricingBreakdown: `Vehicle Price: $28,000
Down Payment: $5,000
Amount Financed: $23,000
APR Offered: 8.9%
Loan Term: 60 months
Monthly Payment: $476.50
Total Finance Cost: $28,590`,
    hiddenFees: [
      { name: 'APR Markup (Dealer Reserve)', detail: 'The buyer qualifies for 6.5% APR from their credit union but the dealer offers 8.9%. The 2.4% markup adds $1,872 in additional interest over the loan term.', amount: '$1,872' },
      { name: 'Documentation Fee Inflation', detail: 'A $795 documentation fee is charged. Actual processing cost is typically under $100.', amount: '$695' },
      { name: 'Extended Warranty Bundled Without Disclosure', detail: 'A $2,400 extended warranty is included in the financed amount without clear disclosure. The buyer did not specifically request it.', amount: '$2,400' },
      { name: 'GAP Insurance Markup', detail: 'GAP insurance is offered at $995. The same coverage is available from third-party providers for $300-400.', amount: '$600' },
    ],
    questions: [
      'What is the base APR the lender approved before any dealer markup?',
      'Can you show me the itemized list of all fees and add-ons included in the financing?',
      'I did not request an extended warranty. Please remove it or provide written authorization.',
      'Can you match the APR from my pre-approved credit union offer?',
      'What is the total cost of the vehicle including all fees and interest over the full loan term?',
    ],
    aiAnalysis: 'DetectHiddenFees AI would analyze this financing agreement and flag: (1) the APR markup as a high-risk pricing tactic by comparing the offered rate against the buyer\'s pre-approved rate, (2) the excessive documentation fee against state limits and industry averages, (3) the undisclosed extended warranty as an unauthorized add-on, and (4) the inflated GAP insurance cost compared to third-party alternatives. The AI report would include negotiation leverage points and estimated savings if each item is addressed.',
    pillarUrl: '/hidden-dealership-financing-fees.html',
    pillarName: 'Hidden Dealership Financing Fees Guide',
    pillarLabel: 'Dealership Financing Guide',
    kcUrl: '/knowledge-center.html',
    kcName: 'Knowledge Center',
  },
  {
    slug: 'example-cell-phone-bill',
    title: 'Cell Phone Bill Example: Hidden Fees in a Wireless Service Statement | DetectHiddenFees',
    metaDesc: 'See how administrative charges, regulatory fees, and equipment rental overcharges appear on a typical cell phone bill.',
    h1: 'Cell Phone Bill Example: Hidden Charges on Your Wireless Service Statement',
    heroSub: 'This illustrative example shows how hidden fees appear on cell phone bills. Compare against your own wireless statement to identify potential overcharges.',
    docType: 'Cell Phone Bill / Wireless Service Statement',
    scenario: 'A customer receives a monthly cell phone bill for $143.72. The base plan is $85, but additional fees and surcharges add over $58 to the total.',
    pricingBreakdown: `Monthly Plan (2 lines, unlimited): $85.00
Device Payments (2 phones): $35.00
Taxes & Government Fees: $8.72
Administrative Charge: $4.50
Regulatory Cost Recovery Fee: $3.25
Line Access Fees: $7.25
Sticky-CTA Bar: $0.00`,
    hiddenFees: [
      { name: 'Administrative Charge', detail: 'A $4.50 "Administrative Charge" is listed with no breakdown of what it covers. These fees have increased 40% over two years.', amount: '$4.50/mo' },
      { name: 'Regulatory Cost Recovery Fee', detail: 'A $3.25 fee described as a government-mandated charge, but telecom companies are not required to pass these costs to consumers.', amount: '$3.25/mo' },
      { name: 'Line Access Fees on Top of Plan', detail: 'Two line access fees at $3.63 each are charged despite the unlimited plan supposedly including line access.', amount: '$7.25/mo' },
      { name: 'Equipment Insurance Add-On', detail: 'A $15/month device protection plan was added without explicit consent during checkout.', amount: '$15.00/mo' },
    ],
    questions: [
      'What specific administrative services does the Administrative Charge cover?',
      'Can you show me the government regulation that requires the Regulatory Cost Recovery Fee?',
      'Why are line access fees charged when the unlimited plan is advertised as including line access?',
      'When was the device protection plan added? I did not authorize this charge.',
      'Can you provide a complete list of all fees and surcharges with explanations of each?',
    ],
    aiAnalysis: 'DetectHiddenFees AI would scan this cell phone bill and identify: (1) the Administrative Charge as a vague fee that has been steadily increasing, (2) the Regulatory Cost Recovery Fee as an optional pass-through that carriers choose to charge, (3) line access fees that may duplicate the plan\'s included features, and (4) the unauthorized device protection plan as an add-on that should be removed and refunded. The AI would generate a report with estimated annual savings and a script for calling the carrier.',
    pillarUrl: '/ai-bill-analyzer.html',
    pillarName: 'AI Bill Analyzer',
    pillarLabel: 'Bill Analysis Tool',
    kcUrl: '/knowledge-center.html',
    kcName: 'Knowledge Center',
  },
  {
    slug: 'example-internet-service-agreement',
    title: 'Internet Service Agreement Example: Hidden Fees in Broadband Contracts | DetectHiddenFees',
    metaDesc: 'See how early termination fees, equipment rental costs, and price escalation clauses appear in internet service agreements.',
    h1: 'Internet Service Agreement Example: Hidden Fees in Broadband Contracts',
    heroSub: 'This illustrative example shows how hidden fees appear in internet service agreements. Use it as a reference when reviewing your own service contract.',
    docType: 'Internet Service Agreement / Broadband Contract',
    scenario: 'A customer signs up for a $59.99/month internet plan with a 2-year contract. The agreement contains several hidden fees and terms that increase the actual monthly cost to over $90.',
    pricingBreakdown: `Advertised Monthly Rate: $59.99
Equipment Rental (modem/router): $12.00
Installation Fee (amortized): $5.83
Administrative Fee: $3.50
Network Enhancement Fee: $4.00
Taxes & Surcharges: $6.50
Total Monthly: $91.82`,
    hiddenFees: [
      { name: 'Equipment Rental Overcharge', detail: 'The $12/month modem/router rental costs $288 over 2 years. An equivalent device can be purchased for $80-120.', amount: '$12.00/mo' },
      { name: 'Network Enhancement Fee', detail: 'A $4/month "Network Enhancement Fee" that the provider can increase at any time with 30 days notice.', amount: '$4.00/mo' },
      { name: 'Early Termination Fee (ETF)', detail: 'The contract imposes a $240 early termination fee that decreases by only $10/month, locking the customer in for nearly the full term.', amount: '$240 (potential)' },
      { name: 'Price Escalation Clause', detail: 'The contract allows the provider to increase the "base rate" by up to 5% annually. After 2 years, this adds $6.15/month to the advertised rate.', amount: '$6.15/mo (Year 2)' },
    ],
    questions: [
      'Can I purchase my own modem and router instead of renting? What models are compatible?',
      'What is the Network Enhancement Fee used for? Can this fee increase?',
      'What is the exact early termination fee schedule? Does it decrease each month?',
      'Is the price guaranteed for the full contract term, or can rates increase?',
      'Are there any other fees that could be added during the contract period?',
    ],
    aiAnalysis: 'DetectHiddenFees AI would analyze this internet service agreement and flag: (1) the equipment rental as costing more than purchasing outright within the first year, (2) the Network Enhancement Fee as a potentially unlimited variable charge, (3) the early termination fee structure that creates an effective lock-in period longer than the stated contract term, and (4) the price escalation clause that increases the advertised rate annually. The AI would provide a cost comparison showing the true cost over 2 years versus the advertised rate.',
    pillarUrl: '/ai-agreement-analyzer.html',
    pillarName: 'AI Agreement Analyzer',
    pillarLabel: 'Agreement Analysis Tool',
    kcUrl: '/knowledge-center.html',
    kcName: 'Knowledge Center',
  }
];

// ===== GENERATE HUB PAGE =====
function generateHub() {
  const exampleCards = examples.map(ex => {
    return `<div class="guide-card"><h3>${ex.h1.split(':')[0]}</h3><p>${ex.metaDesc}</p><p style="font-size:.85rem;color:#64748b;margin-bottom:12px;"><strong>Document Type:</strong> ${ex.docType}</p><a href="/${ex.slug}.html" class="guide-link">View Example →</a></div>`;
  }).join('\n');

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Hidden Fee Examples Library: Real Document Walkthroughs | DetectHiddenFees</title><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" /><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"><link rel="icon" type="image/svg+xml" href="/favicon.svg" /><link rel="dns-prefetch" href="https://hiddenfeeai.com" /><meta name="theme-color" content="#2563eb" /><meta name="description" content="See how hidden fees appear in real-world documents. Walk through HVAC estimates, medical bills, auto financing agreements, and more with expert analysis from DetectHiddenFees."><meta name="robots" content="index,follow"><link rel="canonical" href="https://detecthiddenfees.com/hidden-fee-examples.html"/><meta property="og:title" content="Hidden Fee Examples Library: Real Document Walkthroughs | DetectHiddenFees"><meta property="og:description" content="See how hidden fees appear in real-world documents. Walk through HVAC estimates, medical bills, auto financing agreements, and more."><meta property="og:type" content="website"><meta property="og:url" content="https://detecthiddenfees.com/hidden-fee-examples.html"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Hidden Fee Examples Library | DetectHiddenFees"><style>${sharedCSS}</style><script type="application/ld+json">${orgSchema()}</script><script type="application/ld+json">{"@context":"https://schema.org","@type":"CollectionPage","name":"Hidden Fee Examples Library","description":"Educational examples showing how hidden fees appear in real-world documents across multiple industries.","url":"https://detecthiddenfees.com/hidden-fee-examples.html","inLanguage":"en-US","isPartOf":{"@type":"WebSite","name":"DetectHiddenFees","url":"https://detecthiddenfees.com"},"hasPart":[${examples.map(ex => `{"@type":"WebPage","name":"${ex.h1.split(':')[0]}","url":"https://detecthiddenfees.com/${ex.slug}.html"}`).join(',')}]}</script><script type="application/ld+json">${breadcrumb([{name:'Home',url:'/'},{name:'Hidden Fee Examples Library',url:'/hidden-fee-examples.html'}])}</script></head><body><div class="orb-accent"></div><header style="position:sticky;top:0;z-index:999;background:rgba(2,6,23,.85);backdrop-filter:blur(24px);border-bottom:1px solid rgba(59,130,246,0.15);padding:14px 20px"><a href="/" style="text-decoration:none;color:inherit"><div class="logo">Detect<span>HiddenFees</span></div></a></header><section class="hero"><div class="container"><div class="badge">EXAMPLES LIBRARY</div><h1>Hidden Fee Examples Library: Real Documents, Real Fees Exposed</h1><p class="hero-sub">Walk through real-world documents and see exactly where hidden fees hide. Each example includes a pricing breakdown, the fees to watch for, and how DetectHiddenFees AI would analyze the document. These examples are illustrative and designed for educational purposes.</p><a href="https://hiddenfeeai.com" class="primary-btn">Upload My Document for Analysis — $15</a><div class="trust-bar"><span>Educational walkthroughs</span><span>See exactly what to look for</span><span>Learn before you upload</span><span>No fabricated statistics</span></div></div></section><section class="section"><div class="container"><h2>Explore the Examples</h2><p>Each example walks through a realistic document scenario, identifies potential hidden fees, and shows how DetectHiddenFees AI would analyze the document. Select an example below to get started.</p><div class="guide-grid">${exampleCards}</div></div></section><section class="section"><div class="container"><div class="topic-box"><h3>How to Use This Library</h3><p>Each example follows the same structure:</p><ul><li><strong>Scenario</strong> — The context of the document and what happened</li><li><strong>Pricing Breakdown</strong> — The full cost breakdown as presented</li><li><strong>Potential Hidden Fees</strong> — Specific charges that may be inflated or unnecessary</li><li><strong>Questions to Ask</strong> — What a consumer should ask the provider</li><li><strong>AI Analysis</strong> — How DetectHiddenFees AI would analyze the document</li></ul><p style="margin-top:16px;">Review the examples that match documents you have, then upload your own documents to HiddenFeeAI for a personalized analysis.</p><a href="https://hiddenfeeai.com" class="guide-link" style="margin-top:12px;">Upload My Document — $15</a></div></div></section><section class="section"><div class="container"><h2>Related Resources</h2><div class="guide-grid"><div class="guide-card"><h3>Hidden Fee Guides</h3><p>In-depth guides covering hidden fees across multiple industries, with expert analysis and detection strategies.</p><a href="/hidden-fees-guides.html" class="guide-link">Read Guides →</a></div><div class="guide-card"><h3>Knowledge Center</h3><p>Educational articles answering common questions about hidden fees, contract review, and financial document analysis.</p><a href="/knowledge-center.html" class="guide-link">Visit Knowledge Center →</a></div><div class="guide-card"><h3>AI Bill Analyzer</h3><p>Upload your own bills, contracts, and invoices for AI-powered hidden fee detection and analysis.</p><a href="/ai-bill-analyzer.html" class="guide-link">Analyze My Bill →</a></div></div></div></section><div class="container"><div class="cta-block"><h2>Ready to Analyze Your Own Documents?</h2><p>Upload any contract, invoice, bill, or agreement to HiddenFeeAI. Our AI scans for hidden fees, markups, and pricing risks — giving you the information you need to negotiate with confidence.</p><a href="https://hiddenfeeai.com" class="cta-btn">Analyze My Document — $15</a><div class="cta-reassurance">No subscription. No long-term commitment. Secure analysis.</div></div></div><div class="disclaimer"><strong>Editorial Note:</strong> The examples shown in this library are illustrative scenarios created for educational purposes. They are not based on any specific real customer document or individual case. Any resemblance to actual documents is coincidental. Always consult qualified professionals for advice specific to your situation.</div>${footer}`;
}

// ===== GENERATE INDIVIDUAL EXAMPLE PAGE =====
function generateExample(ex) {
  const feeRows = ex.hiddenFees.map(f => {
    return `<div class="card"><h3>${f.name}</h3><p>${f.detail}</p><p style="color:#ef4444;font-weight:700;font-size:1.2rem;">Potential Overcharge: ${f.amount}</p></div>`;
  }).join('\n');

  const questionItems = ex.questions.map(q => `<li style="padding:8px 0;color:#cbd5e1;font-size:1rem;border-bottom:1px solid rgba(255,255,255,.04);"><strong>•</strong> ${q}</li>`).join('\n');

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${ex.title}</title><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" /><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"><link rel="icon" type="image/svg+xml" href="/favicon.svg" /><link rel="dns-prefetch" href="https://hiddenfeeai.com" /><meta name="theme-color" content="#2563eb" /><meta name="description" content="${ex.metaDesc}"><meta name="robots" content="index,follow"><link rel="canonical" href="https://detecthiddenfees.com/${ex.slug}.html"/><meta property="og:title" content="${ex.title}"><meta property="og:description" content="${ex.metaDesc}"><meta property="og:type" content="article"><meta property="og:url" content="https://detecthiddenfees.com/${ex.slug}.html"><meta name="twitter:card" content="summary_large_image"><style>${sharedCSS}</style><script type="application/ld+json">${orgSchema()}</script><script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${ex.h1.split(':')[0]}","description":"${ex.metaDesc}","author":{"@type":"Organization","name":"DetectHiddenFees"},"publisher":{"@type":"Organization","name":"DetectHiddenFees"},"datePublished":"2026-07-22","dateModified":"2026-07-22","mainEntityOfPage":"https://detecthiddenfees.com/${ex.slug}.html","about":{"@type":"Thing","name":"Hidden Fee Example","description":"Illustrative educational example showing how hidden fees appear in documents"}}</script><script type="application/ld+json">${breadcrumb([{name:'Home',url:'/'},{name:'Hidden Fee Examples Library',url:'/hidden-fee-examples.html'},{name:ex.h1.split(':')[0],url:'/'+ex.slug+'.html'}])}</script></head><body><div class="orb-accent"></div><header style="position:sticky;top:0;z-index:999;background:rgba(2,6,23,.85);backdrop-filter:blur(24px);border-bottom:1px solid rgba(59,130,246,0.15);padding:14px 20px"><a href="/" style="text-decoration:none;color:inherit"><div class="logo">Detect<span>HiddenFees</span></div></a></header><section class="hero"><div class="container"><div class="badge">EDUCATIONAL EXAMPLE</div><h1>${ex.h1}</h1><p class="hero-sub">${ex.heroSub}</p><a href="https://hiddenfeeai.com" class="primary-btn">Upload & Analyze My Document — $15</a><div class="trust-bar"><span>${ex.docType}</span><span>Illustrative example</span><span>Not a real customer document</span><span>Educational purposes only</span></div></div></section><section class="section"><div class="container"><h2>The Scenario</h2><p>${ex.scenario}</p><div class="highlight-box"><h3>Document Type</h3><p>${ex.docType}</p></div><h2>Pricing Breakdown</h2><p style="white-space:pre-line;font-family:monospace;background:rgba(15,23,42,.8);padding:20px 24px;border-radius:16px;border:1px solid rgba(255,255,255,.08);">${ex.pricingBreakdown}</p></div></section><section class="section"><div class="container"><h2>Potential Hidden Fees Identified</h2><p>The following charges in this document may be inflated, unnecessary, or deceptive. Each item includes the potential overcharge amount.</p>${feeRows}<div class="disclaimer"><strong>Important:</strong> These potential hidden fees are identified for illustrative purposes. Actual document analysis results may vary. Always consult qualified professionals for advice specific to your situation.</div></div></section><section class="section"><div class="container"><h2>Questions a Consumer Should Ask</h2><p>If you encounter similar charges in your own document, here are questions to ask the provider or service company:</p><div class="topic-box"><h3>Key Questions</h3><ul>${questionItems}</ul></div></div></section><section class="section"><div class="container"><h2>How DetectHiddenFees AI Would Analyze This Document</h2><div class="highlight-box"><h3>AI Analysis Approach</h3><p>${ex.aiAnalysis}</p></div><div class="warning-box"><h3>Important Disclaimer</h3><p>This example is an illustrative educational scenario. It is not based on any specific real customer document or individual case. The analysis shown represents how DetectHiddenFees AI would approach this type of document, but actual results depend on the specific content of your document. HiddenFeeAI provides informational analysis and is not a substitute for legal, financial, or professional advice. Always consult qualified professionals for significant financial or legal decisions.</p></div></div></section><section class="section"><div class="container"><h2>Related Resources</h2><div class="guide-grid"><div class="guide-card"><h3>${ex.pillarLabel}</h3><p>Read the complete guide covering hidden fees in this industry, with more examples and detailed analysis.</p><a href="${ex.pillarUrl}" class="guide-link">Read Guide →</a></div><div class="guide-card"><h3>Back to Examples Library</h3><p>Browse all educational examples to learn how hidden fees appear across different document types and industries.</p><a href="/hidden-fee-examples.html" class="guide-link">All Examples →</a></div><div class="guide-card"><h3>Knowledge Center</h3><p>Educational articles answering common questions about hidden fees, contract review, and financial document analysis.</p><a href="/knowledge-center.html" class="guide-link">Visit Knowledge Center →</a></div></div></div></section><div class="container"><div class="cta-block"><h2>Upload Your Document for AI Analysis</h2><p>Have a similar document? Upload it to HiddenFeeAI for an AI-powered analysis that identifies hidden fees, pricing risks, and negotiation opportunities.</p><a href="https://hiddenfeeai.com" class="cta-btn">Analyze My Document — $15</a><div class="cta-reassurance">No subscription. No long-term commitment. Secure analysis.</div></div></div>${footer}`;
}

// ===== WRITE ALL FILES =====
function writeAll() {
  // Write hub page
  const hubContent = generateHub();
  fs.writeFileSync('hidden-fee-examples.html', hubContent, 'utf8');
  console.log('✓ Written: hidden-fee-examples.html (' + hubContent.length + ' bytes)');

  // Write individual example pages
  examples.forEach(ex => {
    const content = generateExample(ex);
    const filename = ex.slug + '.html';
    fs.writeFileSync(filename, content, 'utf8');
    console.log('✓ Written: ' + filename + ' (' + content.length + ' bytes)');
  });

  console.log('\nDone. Generated ' + (1 + examples.length) + ' pages.');
}

writeAll();