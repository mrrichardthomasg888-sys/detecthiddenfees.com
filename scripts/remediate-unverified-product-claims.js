const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

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
