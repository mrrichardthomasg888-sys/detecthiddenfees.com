const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const sharedUnverifiedClaimPairs = [
  [
    'AI reads every word so you do not have to.',
    'AI analyzes extractable document content, subject to document quality and product limitations.'
  ],
  [
    'The few minutes it takes to upload a document for AI analysis can save you hundreds or thousands of dollars.',
    'Uploading a document for analysis may help identify questions, but it does not guarantee savings or a particular financial outcome.'
  ],
  [
    'A single hidden fee identified before signing can save more than the cost of hundreds of AI analyses.',
    'A hidden fee identified before signing may help inform a decision, but savings depend on the document, negotiation, and outcome.'
  ],
  [
    'AI review before signing dramatically reduces the risk of future disputes by ensuring both parties understand what the contract actually says.',
    'AI review before signing may help surface questions, but it cannot ensure that both parties understand a contract or prevent future disputes.'
  ]
];

const exactReplacements = {
  'about-detect-hidden-fees.html': [
    [
      'Hidden fees cost Americans billions of dollars each year across healthcare, banking, telecommunications, insurance, automotive, home services, and subscription industries.',
      'Hidden fees are a recurring consumer-pricing concern across healthcare, banking, telecommunications, insurance, automotive, home services, and subscription industries. DetectHiddenFees does not assert a single total without a documented, reviewable dataset.'
    ],
    [
      'Our AI is trained on thousands of documents to recognize common hidden fee patterns, pricing anomalies, and potentially unfavorable contract language.',
      'Public materials do not document a HiddenFeeAI training-data count. This site describes potential analysis patterns, not a verified training-corpus size.'
    ],
    [
      'Privacy is fundamental to how we operate. Documents uploaded for analysis are encrypted during transmission and automatically deleted after processing is complete. We do not use uploaded documents for AI training. We do not share document contents with third parties. Our full <a href="/privacy-and-ai-security">Privacy & AI Security</a> policy explains our data handling practices in detail.',
      'Privacy is important when reviewing financial documents. Current encryption, retention, training-use, and third-party processing details are governed by HiddenFeeAI\'s first-party policies; this repository does not independently verify the product implementation. Review the current <a href="/privacy-and-ai-security">Privacy & AI Security</a> information before uploading sensitive material.'
    ],
    [
      'Upload any bill, contract, invoice, or estimate for AI-assisted fee detection. Get a detailed analysis in minutes.',
      'Upload a bill, contract, invoice, or estimate through HiddenFeeAI if its current product terms and supported-document details fit your needs. Turnaround and findings depend on the product and document.'
    ],
    [
      'Upload your bill to HiddenFeeAI and get a detailed analysis of what you should challenge. Know exactly what to say and save money.',
      'Upload your bill to HiddenFeeAI to review potential issues and questions to raise. Findings are informational and do not guarantee savings or a particular outcome.'
    ]
  ],
  'ai-analysis-methodology.html': [
    [
      'Welcome to the most detailed explanation available of how artificial intelligence analyzes documents to detect hidden fees, pricing manipulation, duplicate charges, and unfavorable contract terms. This methodology page provides complete transparency into how HiddenFeeAI works, what it looks for, how accurate it is, and how you can use its findings to save money on every document you upload.',
      'This page provides a high-level description of document-analysis concepts and a review framework. It is not a verified implementation specification, accuracy benchmark, or promise of savings for every uploaded document.'
    ],
    [
      'The entire process takes approximately three to five minutes and results in a comprehensive report that highlights exactly what you need to know before paying a bill or signing a contract.',
      'Turnaround and report contents are product-dependent and are not independently verified by this repository. Treat any output as potential issues for review, not a complete determination.'
    ],
    [
      'HiddenFeeAI was built specifically for this purpose and has been refined through thousands of real-world analyses.',
      'The public repository does not verify HiddenFeeAI training history, analysis volume, or refinement claims. Product capability and history should be confirmed through current first-party materials.'
    ],
    [
      'The AI accepts documents in multiple formats including PDF, Word, image files, and plain text.',
      'Supported file formats are product-dependent and should be confirmed on HiddenFeeAI before upload.'
    ],
    [
      'identifies every individual charge, fee, term, and condition in the document',
      'attempts to identify charges, fees, terms, and conditions that it can extract from the document'
    ],
    [
      'These recommendations are based on analysis of thousands of successful negotiations and legal challenges to similar issues.',
      'These recommendations are educational prompts for questions to consider; no count of successful negotiations or legal challenges is published here.'
    ]
  ],
  'ai-contract-analysis.html': [
    [
      '<div class="lbl">Risk Pattern Detection</div>',
      '<div class="lbl">Risk Pattern Review</div>'
    ],
    [
      '<div class="lbl">Minutes to Full Report</div>',
      '<div class="lbl">Product-dependent turnaround</div>'
    ],
    [
      '<div class="lbl">Risk Categories</div>',
      '<div class="lbl">Common risk categories</div>'
    ],
    [
      'Each line item is compared against industry averages, regional benchmarks, and historical data from similar contracts.',
      'Where comparison data is available, pricing context can be reviewed against stated benchmarks; this repository does not verify a universal benchmark dataset.'
    ],
    [
      'The AI has been trained on thousands of contracts, learning patterns associated with both fair and unfair terms.',
      'The public repository does not document a HiddenFeeAI training-data count. Any pattern coverage depends on the current product implementation and document context.'
    ],
    [
      'The report is delivered within minutes of uploading your document.',
      'Report timing and contents are product-dependent and are not independently verified by this repository.'
    ],
    [
      'The $15 investment provides protection that would otherwise cost hundreds of dollars in legal fees.',
      'A document-analysis purchase may help organize review questions, but it does not replace legal advice or guarantee protection or savings.'
    ]
  ],
  'ai-contract-review.html': [
    [
      'Scans every clause, every page',
      'Reviews extracted document content'
    ],
    [
      'Results in 3-5 minutes',
      'Product-dependent turnaround'
    ],
    [
      'Each clause is compared against a database of thousands of contract types to determine if it matches standard language or deviates in ways that could disadvantage the signer.',
      'A document-analysis system may compare extracted clauses with configured patterns; this repository does not verify the size or contents of any such database.'
    ],
    [
      'AI benchmarks these against industry averages and flags fees 2-10x the market norm.',
      'Potentially unusual fees can be flagged for review; any benchmark comparison depends on documented source data and context.'
    ],
    [
      'AI reads every page with equal attention.',
      'Automated review can help surface items, but extraction and interpretation depend on the document.'
    ],
    [
      'The entire process takes 3-5 minutes compared to hours for manual review.',
      'Turnaround is product-dependent and has not been independently verified by this repository; manual and professional review times vary.'
    ],
    [
      'is specifically trained to detect hidden fees',
      'A document-analysis system may be configured to review potential hidden fees'
    ],
    [
      'It catches fee types across industries',
      'Coverage across industries is product-dependent and is not independently verified here'
    ],
    [
      'Files are not used for AI training, not sold to third parties, and are deleted promptly after analysis.',
      'Current training-use, sharing, retention, and deletion practices are governed by HiddenFeeAI\'s first-party policies and are not independently verified by this repository.'
    ],
    [
      'Most AI contract reviews are completed within 3-5 minutes from upload to final report.',
      'Analysis timing varies by product and document; no verified turnaround benchmark is asserted here.'
    ],
    [
      'Short documents (1-10 pages) can be analyzed in under 2 minutes. Longer documents (50+ pages) may take 5-10 minutes.',
      'Document length, quality, and product conditions can affect turnaround; these page-count benchmarks are not independently verified here.'
    ]
  ],
  'ai-document-reviewer.html': [
    ...sharedUnverifiedClaimPairs,
    [
      'AI analysis changes this by reading every word, comparing every clause against known patterns, and flagging anything that deserves your attention.',
      'AI-assisted review can analyze extractable text and flag patterns for attention; document quality and product coverage affect results.'
    ],
    [
      'AI reads every word and flags unbalanced liability language.',
      'AI-assisted review may flag unbalanced liability language in content it can extract.'
    ],
    [
      'AI detects these issues across all document types you upload.',
      'AI-assisted review may flag these issues in supported documents; confirm current file support and coverage with HiddenFeeAI.'
    ],
    [
      'The AI examines every element of your document, comparing findings against known patterns from thousands of similar documents.',
      'The reviewer may compare extractable content with configured patterns; this repository does not verify a dataset size or complete document coverage.'
    ],
    [
      'Documents are encrypted during transmission and automatically deleted after processing.',
      'Current encryption and retention practices are governed by HiddenFeeAI first-party policies and are not independently verified by this repository.'
    ],
    [
      'Service agreements, contractor contracts, purchase agreements, lease agreements, subscription terms, and financing documents are all supported.',
      'Supported document types are product-dependent; confirm current support before uploading.'
    ]
  ],
  'ai-statement-analyzer.html': [
    ...sharedUnverifiedClaimPairs,
    [
      'Our AI statement analyzer scans every line item, identifying hidden fees, unexpected charges, and billing errors.',
      'An AI statement analyzer may review line items for potential hidden fees, unexpected charges, and billing errors; findings require verification.'
    ],
    [
      'AI identifies every fee on your statement and explains whether it is avoidable.',
      'AI-assisted review may flag fees and explain possible questions; it cannot determine that every fee is avoidable.'
    ],
    [
      'Financial errors on statements cost consumers billions of dollars each year.',
      'Statement errors can create meaningful costs; this page does not assert a dollar total without a documented, reviewable dataset.'
    ],
    [
      'The AI statement analyzer reads every line item, comparing each charge against expected patterns.',
      'A statement analyzer may compare extractable line items with configured patterns; review results against the original statement.'
    ],
    [
      'Statements are encrypted during transmission and automatically deleted after processing.',
      'Current statement-handling, encryption, and retention practices are governed by HiddenFeeAI first-party policies and are not independently verified by this repository.'
    ]
  ],
  'ai-proposal-review.html': [
    ...sharedUnverifiedClaimPairs,
    [
      'An AI proposal review reads between the lines, identifying hidden fees, inflated pricing, vague deliverables, and unfavorable terms that standard proposal language often conceals.',
      'An AI proposal review may flag potential hidden fees, pricing anomalies, vague deliverables, and terms for human review; results depend on extracted content and product coverage.'
    ],
    [
      'That habit will save you more money than almost any other financial practice.',
      'That habit may help reduce surprises, but no savings ranking is asserted here.'
    ],
    [
      'An AI proposal review reads the entire document systematically.',
      'A proposal review system may analyze extractable document content; completeness depends on document quality and product behavior.'
    ],
    [
      'AI reads the entire document systematically, comparing language against known risk patterns from thousands of similar proposals. Humans often miss subtle pricing language or buried terms that AI catches consistently.',
      'A proposal review system may compare extractable language with configured patterns; this repository does not verify a proposal dataset size or claim that automated review consistently catches what humans miss.'
    ],
    [
      'The AI completes the same analysis in minutes, freeing you to focus on the strategic decisions rather than the detailed review work.',
      'Turnaround and report contents are product-dependent; this repository does not verify a minutes-based benchmark.'
    ],
    [
      'For $15 per analysis, AI proposal review is one of the most cost-effective business decisions you can make.',
      'Check current HiddenFeeAI pricing before purchase; cost-effectiveness depends on the proposal and business context.'
    ],
    [
      'The platform accepts proposals in PDF format, which is the most common format for business proposals.',
      'Supported proposal formats are product-dependent; confirm current requirements before upload.'
    ],
    [
      'The HiddenFeeAI engine reads every page of your proposal, extracting pricing information, scope descriptions, terms and conditions, assumptions, exclusions, timelines, and guarantees.',
      'HiddenFeeAI may analyze extractable proposal content, including pricing, scope, terms, assumptions, exclusions, timelines, and guarantees; coverage depends on the product and document.'
    ],
    [
      'The analysis typically completes within minutes.',
      'Analysis timing is product-dependent and not independently verified here.'
    ],
    [
      'For complex proposals with hundreds of pages, the analysis may take slightly longer, but it is always measured in minutes rather than hours.',
      'Longer or complex proposals may affect timing; no universal minutes-based benchmark is asserted here.'
    ],
    [
      'HiddenFeeAI can analyze all three document types.',
      'Whether HiddenFeeAI supports all three document types should be confirmed in current first-party materials.'
    ],
    [
      'For most businesses, the return on investment from AI proposal review is among the highest available from any business tool or service.',
      'Return on investment depends on the proposal, business context, and outcome; no comparative ranking is asserted here.'
    ],
    [
      'At $15 per analysis, the cost of building this practice is minimal compared to the potential savings.',
      'Review current pricing and weigh it against the proposal context; savings are not guaranteed.'
    ]
  ],
  'contract-risk-assessment-ai-tool.html': [
    ...sharedUnverifiedClaimPairs,
    [
      'AI analysis changes this by reading every word, comparing every clause against known patterns, and flagging anything that deserves your attention.',
      'AI-assisted review can analyze extractable text and flag patterns for attention; document quality and product coverage affect results.'
    ],
    [
      'AI reads every word and flags unbalanced liability language.',
      'AI-assisted review may flag unbalanced liability language in content it can extract.'
    ],
    [
      'AI makes thorough review fast and affordable for every document.',
      'AI-assisted review may make some document checks more convenient; timing, price, and coverage depend on the current product.'
    ],
    [
      'That habit saves more money than almost any other financial practice.',
      'That habit may help reduce surprises, but no savings ranking is asserted here.'
    ]
  ],
  'contract-terms-analyzer-ai.html': [
    ...sharedUnverifiedClaimPairs,
    [
      'AI analysis changes this by reading every word, comparing every clause against known patterns, and flagging anything that deserves your attention.',
      'AI-assisted review can analyze extractable text and flag patterns for attention; document quality and product coverage affect results.'
    ],
    [
      'AI reads every word and flags unbalanced liability language.',
      'AI-assisted review may flag unbalanced liability language in content it can extract.'
    ],
    [
      'AI makes thorough review fast and affordable for every document.',
      'AI-assisted review may make some document checks more convenient; timing, price, and coverage depend on the current product.'
    ],
    [
      'AI provides clause-by-clause analysis of every provision.',
      'AI may provide clause-level findings for content it can extract; completeness depends on document quality and product behavior.'
    ],
    [
      'That habit saves more money than almost any other financial practice.',
      'That habit may help reduce surprises, but no savings ranking is asserted here.'
    ]
  ],
  'contract-red-flag-checker.html': [
    ...sharedUnverifiedClaimPairs,
    [
      'AI analysis changes this by reading every word, comparing every clause against known patterns, and flagging anything that deserves your attention.',
      'AI-assisted review can analyze extractable text and flag patterns for attention; document quality and product coverage affect results.'
    ],
    [
      'AI reads every word and flags unbalanced liability language.',
      'AI-assisted review may flag unbalanced liability language in content it can extract.'
    ],
    [
      'AI makes thorough review fast and affordable for every document.',
      'AI-assisted review may make some document checks more convenient; timing, price, and coverage depend on the current product.'
    ],
    [
      'That habit saves more money than almost any other financial practice.',
      'That habit may help reduce surprises, but no savings ranking is asserted here.'
    ],
    [
      'Unlike reading the contract yourself, the AI examines every clause systematically, comparing language against known risk indicators from thousands of similar agreements.',
      'A checker may compare extractable clauses with configured risk indicators; this repository does not verify a dataset size or claim complete clause coverage.'
    ],
    [
      'For a one-time fee of $15, you get a comprehensive red flag analysis that would take a professional reviewer hours to complete manually.',
      'Review current product pricing and scope before purchase; this repository does not verify a professional-review time comparison or guarantee a comprehensive result.'
    ],
    [
      'The AI completes the same analysis in minutes.',
      'Analysis timing is product-dependent and is not independently verified here.'
    ]
  ],
  'ai-financial-assistant.html': [
    [
      'Every year, consumers lose thousands of dollars to hidden fees, pricing manipulation, and deceptive billing practices embedded inside contracts, invoices, and financial agreements.',
      'Consumers can face meaningful costs from hidden fees, pricing manipulation, and deceptive billing practices in contracts, invoices, and financial agreements; this page does not assert an annual per-consumer total.'
    ],
    [
      'Industry research suggests that hidden fees cost American consumers over $200 billion annually across banking, lending, contracting, medical billing, and insurance sectors. The average household may encounter hidden fees in 15 to 20 different service categories each year without realizing it.',
      'This page does not publish a national hidden-fee total or household category count without a documented, reviewable dataset. Actual exposure depends on the document, provider, product, and consumer context.'
    ],
    [
      'Machine learning models trained on thousands of financial documents help the system recognize patterns associated with hidden fees.',
      'The public repository does not document a HiddenFeeAI training-data count. Any pattern coverage depends on the current product implementation and document context.'
    ],
    [
      'Modern AI financial assistants can process contracts, invoices, estimates, bills, financing agreements, insurance policies, and banking statements.',
      'Supported document types and extraction behavior vary by product; confirm current HiddenFeeAI requirements before uploading.'
    ],
    [
      'An AI financial assistant can review documents in seconds, apply consistent criteria across every analysis, and identify patterns that human reviewers commonly miss.',
      'Analysis timing, consistency, and coverage are product-dependent; automated review may surface patterns for human verification but is not asserted to find everything a human misses.'
    ],
    [
      'The AI compares the document against thousands of previously analyzed financial documents to identify patterns associated with hidden fees.',
      'A financial-analysis system may compare extractable content with configured patterns; this repository does not verify a dataset size or complete coverage.'
    ],
    [
      'This score reflects the likelihood that the document contains hidden fees or pricing manipulation.',
      'If a product provides a risk score, its meaning and calibration should be confirmed in current first-party documentation; this repository does not establish score semantics.'
    ],
    [
      'AI financial assistants achieve high accuracy for common fee patterns but have limitations.',
      'No verified accuracy percentage or benchmark is asserted here. Results may vary with document quality, context, and the fee pattern involved.'
    ],
    [
      'Accuracy rates vary by platform and document type. For common hidden fee patterns in standard documents, AI financial assistants typically achieve high detection rates. Accuracy is lower for unusual documents or creative pricing structures that do not match known patterns. AI analysis should always be combined with human judgment.',
      'Accuracy varies by platform, document type, document quality, and fee pattern. This repository does not publish a verified detection-rate benchmark; unusual or creatively structured documents may require additional human review.'
    ],
    [
      'Consumers who use these tools report significant improvements in their ability to identify hidden costs, negotiate better terms, and make informed financial decisions.',
      'This repository does not publish a verified user-outcome study. A tool may help organize questions, but negotiation and financial outcomes are not guaranteed.'
    ],
    [
      'An AI financial assistant can review a 50-page contract in under 60 seconds.',
      'Turnaround varies by product, document length, and document quality; no page-count benchmark is independently verified here.'
    ],
    [
      'This precision dramatically improves negotiation outcomes.',
      'Specific findings may help structure negotiation questions, but outcomes depend on the document, counterparty, and circumstances.'
    ],
    [
      '<h2>Real-World Examples of AI Financial Assistant Success</h2><p>Real-world case studies demonstrate the practical value of AI financial assistants across different situations and industries.',
      '<h2>Illustrative Scenarios (Not Verified Case Studies)</h2><p>The following examples are fictional illustrations of how document review might surface questions. They are not reported customer results, research findings, or guarantees of savings.'
    ],
    [
      '<strong>HVAC Proposal Analysis.</strong> A family received',
      '<strong>Illustrative HVAC proposal scenario.</strong> Suppose a family received'
    ],
    [
      '<strong>Medical Bill Discrepancy.</strong> A patient received',
      '<strong>Illustrative medical bill scenario.</strong> Suppose a patient received'
    ],
    [
      '<strong>Dealership Financing Review.</strong> A car buyer was offered',
      '<strong>Illustrative dealership financing scenario.</strong> Suppose a car buyer was offered'
    ],
    [
      'Very high detection rate',
      'Coverage not independently verified'
    ],
    [
      'High detection rate',
      'Coverage not independently verified'
    ],
    [
      'Moderate detection rate',
      'Coverage not independently verified'
    ]
  ],
  'contract-fee-analysis.html': [
    [
      'The financial impact is substantial. A study by the American Bar Association found that nearly 60% of consumers who sign contracts without legal review later discover terms they didn’t understand or agree with. In many cases, those terms cost them thousands of dollars. HiddenFeeAI was built specifically to address this problem. By combining pattern recognition across thousands of contracts with plain-English reporting, the platform turns complex legal language into clear, actionable insights.',
      'The financial impact of a contract depends on its price, duration, language, and context. This page does not publish an independent population statistic or typical savings amount. A document-analysis tool may help organize questions, but its findings should be checked against the contract and current product information.'
    ],
    [
      'The entire process takes about three to five minutes from upload to final report.',
      'Product turnaround is not independently verified by this repository and may vary by document and service conditions.'
    ]
  ],
  'ai-agreement-analyzer.html': [
    [
      'The few minutes it takes to upload a document for AI analysis can save you hundreds or thousands of dollars. Hidden fees, automatic renewals, and unbalanced terms are expensive mistakes that are completely avoidable with proper review before signing.',
      'Uploading a document for analysis may help identify questions about hidden fees, automatic renewals, and unbalanced terms. It does not guarantee savings, and a careful review cannot make every contract risk avoidable.'
    ],
    [
      'AI reads every word so you do not have to.',
      'AI analyzes document content that it can extract, subject to document quality and product limitations.'
    ]
  ]
};

for (const [filename, pairs] of Object.entries(exactReplacements)) {
  const file = path.join(root, filename);
  let source = fs.readFileSync(file, 'utf8');
  for (const [before, after] of pairs) {
    if (source.includes(before)) source = source.replaceAll(before, after);
    else if (!source.includes(after)) throw new Error(`Expected product claim not found in ${filename}: ${before.slice(0, 100)}`);
  }
  fs.writeFileSync(file, source, 'utf8');
  console.log(`Remediated unverified product claims in ${filename}`);
}
