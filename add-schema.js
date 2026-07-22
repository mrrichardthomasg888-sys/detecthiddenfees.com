const fs = require('fs');
const path = require('path');
const base = __dirname;

// Standard FAQPage schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"How does AI detect hidden fees in documents?","acceptedAnswer":{"@type":"Answer","text":"AI document analysis uses natural language processing and machine learning to scan contracts, bills, invoices, and financial documents for hidden fees, unfavorable terms, pricing errors, and other risks. The AI compares your document against patterns from thousands of similar documents to identify anomalies."}},
    {"@type":"Question","name":"How much does AI document analysis cost?","acceptedAnswer":{"@type":"Answer","text":"Each document analysis costs $15. There is no subscription or recurring fee. You pay per document with no long-term commitment."}},
    {"@type":"Question","name":"What types of documents can AI analyze?","acceptedAnswer":{"@type":"Answer","text":"Contracts, agreements, invoices, bills, estimates, quotes, lease agreements, and financial statements can all be analyzed for hidden fees and risks."}},
    {"@type":"Question","name":"Is my document data secure?","acceptedAnswer":{"@type":"Answer","text":"Yes. All documents are encrypted during transmission and automatically deleted after processing. HiddenFeeAI does not use uploaded documents for AI training."}},
    {"@type":"Question","name":"Can AI analysis replace a professional?","acceptedAnswer":{"@type":"Answer","text":"No. HiddenFeeAI is not a law firm and does not provide legal advice. AI analysis is a tool for identifying potential issues, but significant financial or legal decisions require professional review."}}
  ]
};

const faqScript = '<script type="application/ld+json">' + JSON.stringify(faqSchema) + '</script>';

// Pages to add FAQPage to (from audit)
const faqPages = [
  'can-ai-find-hidden-fees-in-a-contract.html', 'can-ai-review-a-contract-before-signing.html',
  'how-do-i-find-hidden-fees-in-an-invoice.html', 'can-ai-detect-duplicate-billing-charges.html',
  'what-fees-should-i-look-for-in-a-contractor-estimate.html', 'how-do-companies-hide-fees-in-contracts.html',
  'what-are-common-hidden-fees-in-service-agreements.html', 'can-ai-analyze-financial-documents.html',
  'what-questions-should-i-ask-before-signing-a-contract.html', 'how-can-i-check-if-a-bill-is-incorrect.html',
  'what-should-i-check-before-signing-a-contract.html',
  'hidden-dealership-financing-fees.html', 'duplicate-medical-billing-charges.html',
  'hidden-bank-overdraft-fees.html', 'hidden-home-renovation-fees.html', 'hidden-hvac-contractor-fees.html',
  'hidden-credit-card-fees.html', 'hidden-streaming-fees.html', 'hidden-mortgage-fees.html',
  'hidden-phone-bill-fees.html', 'hidden-internet-fees.html', 'hidden-loan-fees.html',
  'hidden-investment-fees.html', 'hidden-subscription-fees.html', 'hidden-moving-company-fees.html',
  'hidden-roofing-contractor-fees.html', 'hidden-plumbing-fees.html', 'hidden-electrician-fees.html',
  'hidden-landscaping-fees.html',
  'automatic-renewal-clauses.html', 'early-termination-fees.html', 'cancellation-fee-clauses.html',
  'arbitration-clauses-explained.html', 'indemnification-clauses-explained.html',
  'unfair-contract-terms.html', 'hidden-clauses-in-contracts.html', 'change-order-fees.html',
  'knowledge-center.html', 'bill-negotiation-resource-center.html', 'consumer-financial-intelligence-center.html',
  'ai-contract-resource-center.html', 'ai-analysis-hub.html', 'consumer-negotiation-resource-center.html',
  'find-hidden-fees-in-contract.html', 'check-my-fees.html', 'free-hidden-fee-scanner.html',
  'hidden-fee-calculator.html', 'hidden-fee-risk-score.html', 'hidden-fee-analysis-tool.html',
  'analyze-my-document.html', 'ai-estimate-review.html', 'ai-invoice-analyzer.html',
  'ai-bill-checker.html', 'ai-contract-checker.html', 'ai-document-checker.html',
  'ai-pricing-analysis.html', 'bill-negotiation-service.html', 'bill-savings-calculator.html',
  'contract-clause-checker.html', 'contract-red-flag-checker.html', 'contract-terms-analyzer-ai.html',
  'contract-review-checklist.html', 'before-signing-contract-checklist.html',
  'ai-contract-risk-score.html', 'contract-risk-assessment-guide.html',
  'contract-risk-assessment-ai-tool.html', 'contract-fee-checker.html',
  'ai-hidden-fee-questions.html', 'how-ai-detects-fees.html',
  'hidden-fee-examples.html', 'hidden-fee-statistics.html', 'types-of-hidden-fees.html',
  'hidden-fee-database.html', 'hidden-fee-prevention-guide.html',
  'ai-bill-analyzer.html', 'ai-agreement-analyzer.html', 'hidden-fee-detector.html',
  'ai-document-intelligence-center.html', 'ai-document-review-tool.html',
  'ai-document-reviewer.html', 'ai-document-scanner.html', 'ai-document-risk-analysis.html'
];

// Determine category based on filename
function getCategory(file) {
  const name = file.replace('.html', '');
  if (name.includes('contract') || name.includes('clause') || name.includes('arbitration') || 
      name.includes('indemnification') || name.includes('renewal') || name.includes('termination') || 
      name.includes('cancellation') || name.includes('red-flag') || name.includes('risk') ||
      name.includes('agreement') || name.includes('vendor') || name.includes('software-license') ||
      name.includes('freelance') || name.includes('employment') || name.includes('lease') ||
      name.includes('purchase') || name.includes('consulting') || name.includes('contractor-agreement'))
    return { name: 'Contract Resources', url: '/ai-contract-resource-center.html' };
  if (name.includes('bill') || name.includes('invoice') || name.includes('medical-bill') || 
      name.includes('billing') || name.includes('negotiat'))
    return { name: 'Bill Negotiation', url: '/bill-negotiation-resource-center.html' };
  if (name.includes('hidden-fee') || name.includes('hidden-') || name.includes('types-of') || 
      name.includes('detect-') || name.includes('how-ai') || name.includes('check-my'))
    return { name: 'Hidden Fees', url: '/hidden-fees-guides.html' };
  if (name.includes('estimate') || name.includes('contractor') || name.includes('renovation') || 
      name.includes('hvac') || name.includes('plumbing') || name.includes('roofing') || 
      name.includes('electrician') || name.includes('landscaping') || name.includes('change-order'))
    return { name: 'Contractor Resources', url: '/ai-construction-contract-review.html' };
  if (name.includes('financial') || name.includes('ai-analysis') || name.includes('ai-document'))
    return { name: 'AI Analysis', url: '/ai-analysis-hub.html' };
  if (name === 'knowledge-center')
    return { name: 'Knowledge Center', url: '/knowledge-center.html' };
  return { name: 'Resources', url: '/knowledge-center.html' };
}

let faqAdded = 0;
let bcAdded = 0;
let alreadyHad = 0;

// Process all HTML files
const htmlFiles = fs.readdirSync(base).filter(f => f.endsWith('.html'));
console.log('Processing', htmlFiles.length, 'HTML files...');

htmlFiles.forEach(file => {
  const fp = path.join(base, file);
  let c = fs.readFileSync(fp, 'utf8');
  
  // Skip 301 redirect pages
  if (c.includes('301 Moved') || c.length < 500) return;
  
  if (!c.includes('</head>')) return;
  
  let modified = false;
  
  // 1. Add FAQPage if it's in our target list and doesn't have it
  if (faqPages.includes(file) && !c.includes('"@type":"FAQPage"') && !c.includes('"@type": "FAQPage"')) {
    c = c.replace('</head>', faqScript + '</head>');
    modified = true;
    faqAdded++;
  }
  
  // 2. Add BreadcrumbList if missing
  if (!c.includes('BreadcrumbList')) {
    const pageName = file.replace('.html', '');
    const cat = getCategory(file);
    let title = pageName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      .replace(/Ai/g, 'AI').replace(/Aeo/g, 'AEO').replace(/Geo/g, 'GEO');
    if (title.length > 60) title = title.substring(0, 57) + '...';
    
    const bcSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"Home","item":"https://detecthiddenfees.com/"},
        {"@type":"ListItem","position":2,"name":cat.name,"item":"https://detecthiddenfees.com" + cat.url},
        {"@type":"ListItem","position":3,"name":title,"item":"https://detecthiddenfees.com/" + file}
      ]
    };
    const bcScript = '<script type="application/ld+json">' + JSON.stringify(bcSchema) + '</script>';
    
    // Insert after any existing schema scripts but before </head>
    c = c.replace('</head>', bcScript + '</head>');
    modified = true;
    bcAdded++;
  } else {
    alreadyHad++;
  }
  
  if (modified) {
    fs.writeFileSync(fp, c);
  }
});

console.log('\n=== RESULTS ===');
console.log('Added FAQPage schema to:', faqAdded, 'pages');
console.log('Added BreadcrumbList to:', bcAdded, 'pages');
console.log('Already had BreadcrumbList:', alreadyHad, 'pages');
console.log('Total processed:', htmlFiles.length);