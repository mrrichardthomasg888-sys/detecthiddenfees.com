/**
 * Bing Webmaster API URL Submission Script
 * 
 * Submits URLs to Bing Webmaster API for indexing.
 * Daily limit: 100 URLs. Uses priority queue to maximize impact.
 * 
 * Usage: node bing_submit.js [day]
 *   day 0 = Day 1 queue, day 1 = Day 2 queue, etc.
 *   If no day specified, shows available queues.
 * 
 * Requires: BING_API_KEY environment variable or edit below
 */

const BING_API_KEY = process.env.BING_API_KEY || 'YOUR_BING_API_KEY_HERE';
const SITE_URL = 'https://detecthiddenfees.com';
const LOG_FILE = './bing-submit-log.json';

// === PRIORITY QUEUE ===
// Organized by day. Each day submits up to 10 URLs.
// Do NOT submit redirected pages (they're handled by _headers).

const QUEUE = [
  // Day 1: Core Authority Pages
  [
    'https://detecthiddenfees.com/',
    'https://detecthiddenfees.com/ai-contract-review.html',
    'https://detecthiddenfees.com/ai-contract-review-tool.html',
    'https://detecthiddenfees.com/ai-bill-analyzer.html',
    'https://detecthiddenfees.com/hidden-fees-guides.html',
    'https://detecthiddenfees.com/hidden-fee-detector.html',
    'https://detecthiddenfees.com/bill-negotiation-resource-center.html',
    'https://detecthiddenfees.com/about-detect-hidden-fees.html',
    'https://detecthiddenfees.com/ai-contract-review-vs-lawyer-review.html',
    'https://detecthiddenfees.com/medical-bill-audit.html'
  ],
  // Day 2: High-Value Tool & Service Pages
  [
    'https://detecthiddenfees.com/ai-invoice-analyzer.html',
    'https://detecthiddenfees.com/analyze-my-bill.html',
    'https://detecthiddenfees.com/analyze-my-contract.html',
    'https://detecthiddenfees.com/ai-contract-risk-score.html',
    'https://detecthiddenfees.com/hidden-fee-scanner.html',
    'https://detecthiddenfees.com/check-my-fees.html',
    'https://detecthiddenfees.com/hidden-fee-examples.html',
    'https://detecthiddenfees.com/types-of-hidden-fees.html',
    'https://detecthiddenfees.com/hidden-fee-database.html',
    'https://detecthiddenfees.com/contract-red-flags.html'
  ],
  // Day 3: Comparison & High-Intent Pages
  [
    'https://detecthiddenfees.com/ai-contract-review-vs-chatgpt.html',
    'https://detecthiddenfees.com/ai-contract-review-vs-manual-review.html',
    'https://detecthiddenfees.com/ai-bill-analyzer-vs-chatgpt.html',
    'https://detecthiddenfees.com/ai-bill-analysis-vs-manual-review.html',
    'https://detecthiddenfees.com/hiddenfeeai-vs-lawyer-review.html',
    'https://detecthiddenfees.com/hiddenfeeai-vs-bill-negotiation-services.html',
    'https://detecthiddenfees.com/hiddenfeeai-vs-traditional-negotiation.html',
    'https://detecthiddenfees.com/free-ai-contract-review-vs-paid-review.html',
    'https://detecthiddenfees.com/best-ai-contract-analysis-tools.html',
    'https://detecthiddenfees.com/best-ai-bill-analyzer-tools.html'
  ],
  // Day 4: Industry-Specific Hidden Fee Pages
  [
    'https://detecthiddenfees.com/hidden-hvac-contractor-fees.html',
    'https://detecthiddenfees.com/hidden-dealership-financing-fees.html',
    'https://detecthiddenfees.com/hidden-home-renovation-fees.html',
    'https://detecthiddenfees.com/hidden-bank-overdraft-fees.html',
    'https://detecthiddenfees.com/hidden-mortgage-fees.html',
    'https://detecthiddenfees.com/hidden-subscription-fees.html',
    'https://detecthiddenfees.com/hidden-credit-card-fees.html',
    'https://detecthiddenfees.com/duplicate-medical-billing-charges.html',
    'https://detecthiddenfees.com/hidden-streaming-fees.html',
    'https://detecthiddenfees.com/hidden-phone-bill-fees.html'
  ],
  // Day 5: Guides & Educational
  [
    'https://detecthiddenfees.com/how-detect-hidden-fees-works.html',
    'https://detecthiddenfees.com/how-ai-detects-fees.html',
    'https://detecthiddenfees.com/how-to-review-a-contract.html',
    'https://detecthiddenfees.com/before-signing-contract-checklist.html',
    'https://detecthiddenfees.com/contract-review-checklist.html',
    'https://detecthiddenfees.com/hidden-fee-prevention-guide.html',
    'https://detecthiddenfees.com/fee-negotiation-checklist.html',
    'https://detecthiddenfees.com/negotiation-scripts.html',
    'https://detecthiddenfees.com/how-to-negotiate-medical-bills.html',
    'https://detecthiddenfees.com/hospital-bill-negotiation-guide.html'
  ],
  // Day 6: More Industry + Education
  [
    'https://detecthiddenfees.com/hidden-electrician-fees.html',
    'https://detecthiddenfees.com/hidden-plumbing-fees.html',
    'https://detecthiddenfees.com/hidden-roofing-contractor-fees.html',
    'https://detecthiddenfees.com/hidden-landscaping-fees.html',
    'https://detecthiddenfees.com/hidden-moving-company-fees.html',
    'https://detecthiddenfees.com/hidden-internet-fees.html',
    'https://detecthiddenfees.com/hidden-loan-fees.html',
    'https://detecthiddenfees.com/hidden-investment-fees.html',
    'https://detecthiddenfees.com/hidden-billing-fees.html',
    'https://detecthiddenfees.com/hidden-contract-fees.html'
  ],
  // Day 7: Contract Review Deep
  [
    'https://detecthiddenfees.com/ai-construction-contract-review.html',
    'https://detecthiddenfees.com/ai-contract-analysis.html',
    'https://detecthiddenfees.com/ai-contract-review-software.html',
    'https://detecthiddenfees.com/ai-contract-resource-center.html',
    'https://detecthiddenfees.com/contract-review-checklist.html',
    'https://detecthiddenfees.com/contract-risk-assessment-guide.html',
    'https://detecthiddenfees.com/contract-terms-glossary.html',
    'https://detecthiddenfees.com/contract-negotiation-assistant.html',
    'https://detecthiddenfees.com/contract-fee-analysis.html',
    'https://detecthiddenfees.com/how-we-analyze-contracts.html'
  ],
  // Day 8: More Remaining Paths
  [
    'https://detecthiddenfees.com/ai-fee-detector.html',
    'https://detecthiddenfees.com/ai-receipt-analyzer.html',
    'https://detecthiddenfees.com/ai-estimate-review.html',
    'https://detecthiddenfees.com/ai-quote-review.html',
    'https://detecthiddenfees.com/ai-lease-review.html',
    'https://detecthiddenfees.com/ai-purchase-agreement-review.html',
    'https://detecthiddenfees.com/ai-service-contract-review.html',
    'https://detecthiddenfees.com/analyze-my-document.html',
    'https://detecthiddenfees.com/analyze-my-estimate.html',
    'https://detecthiddenfees.com/free-hidden-fee-scanner.html'
  ],
  // Day 9: Legal/Trust + Negotiation
  [
    'https://detecthiddenfees.com/privacy-and-ai-security.html',
    'https://detecthiddenfees.com/ai-accuracy-and-limitations.html',
    'https://detecthiddenfees.com/editorial-policy.html',
    'https://detecthiddenfees.com/research-methodology.html',
    'https://detecthiddenfees.com/terms-of-service.html',
    'https://detecthiddenfees.com/contact.html',
    'https://detecthiddenfees.com/ai-analysis-hub.html',
    'https://detecthiddenfees.com/bill-negotiation-templates.html',
    'https://detecthiddenfees.com/fee-removal-request-template.html',
    'https://detecthiddenfees.com/reduce-monthly-bills.html'
  ],
  // Day 10: Remaining pages
  [
    'https://detecthiddenfees.com/ai-analysis-methodology.html',
    'https://detecthiddenfees.com/ai-document-analysis-benefits.html',
    'https://detecthiddenfees.com/ai-document-analysis-tools.html',
    'https://detecthiddenfees.com/ai-bill-negotiation.html',
    'https://detecthiddenfees.com/estimate-vs-quote.html',
    'https://detecthiddenfees.com/hidden-fee-analysis-tool.html',
    'https://detecthiddenfees.com/hidden-fee-calclator.html',
    'https://detecthiddenfees.com/hidden-fee-industry-guide.html',
    'https://detecthiddenfees.com/hidden-fee-reports.html',
    'https://detecthiddenfees.com/security-overview.html'
  ]
];

async function submitToBing(url) {
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${BING_API_KEY}`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        siteUrl: SITE_URL, 
        url: url 
      })
    });
    
    const result = await response.json();
    return { url, success: result.d === true || result.d?.Url === url, result };
  } catch (error) {
    return { url, success: false, error: error.message };
  }
}

function getLog() {
  try {
    return JSON.parse(require('fs').readFileSync(LOG_FILE, 'utf8'));
  } catch {
    return { submittedUrls: [], lastRunDay: -1, lastRunDate: null };
  }
}

function saveLog(log) {
  require('fs').writeFileSync(LOG_FILE, JSON.stringify(log, null, 2), 'utf8');
}

async function main() {
  const dayIndex = parseInt(process.argv[2]);
  
  if (isNaN(dayIndex)) {
    console.log('Bing URL Submission Script');
    console.log(`Total queues: ${QUEUE.length} days`);
    console.log(`Total URLs in queue: ${QUEUE.flat().length}`);
    console.log('\nUsage: node bing_submit.js <day>');
    console.log('  day 0-9 = which queue to submit');
    console.log('\nDay Queues:');
    QUEUE.forEach((queue, i) => {
      console.log(`  Day ${i}: ${queue.length} URLs - ${queue[0]?.split('/').pop() || 'empty'}`);
    });
    console.log('\nSet BING_API_KEY environment variable before running.');
    return;
  }
  
  if (dayIndex < 0 || dayIndex >= QUEUE.length) {
    console.error(`Invalid day. Must be 0-${QUEUE.length - 1}`);
    process.exit(1);
  }
  
  if (BING_API_KEY === 'YOUR_BING_API_KEY_HERE') {
    console.error('ERROR: Please set your Bing API Key.');
    console.error('  Windows: set BING_API_KEY=your_key_here');
    console.error('  Or edit bing_submit.js directly.');
    process.exit(1);
  }
  
  const log = getLog();
  const urlsToSubmit = QUEUE[dayIndex];
  
  console.log(`Day ${dayIndex}: Submitting ${urlsToSubmit.length} URLs to Bing`);
  console.log('----------------------------------------');
  
  for (const url of urlsToSubmit) {
    if (log.submittedUrls.includes(url)) {
      console.log(`⏭ SKIP (already submitted): ${url}`);
      continue;
    }
    
    const result = await submitToBing(url);
    
    if (result.success) {
      console.log(`✅ SUBMITTED: ${url}`);
      log.submittedUrls.push(url);
    } else {
      console.log(`❌ FAILED: ${url} - ${result.error || JSON.stringify(result.result)}`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }
  
  log.lastRunDay = dayIndex;
  log.lastRunDate = new Date().toISOString();
  saveLog(log);
  
  console.log('\n----------------------------------------');
  console.log(`Done. Total submitted: ${log.submittedUrls.length}/${QUEUE.flat().length}`);
}

main().catch(console.error);