const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const replacements = {
  'ai-contract-review.html': [
    [
      '"text": "AI contract review catches 85-95% of known hidden fee patterns and risky clauses when compared against professional legal review. It outperforms non-expert human review (40-50% catch rate) and approaches lawyer-level detection (90-98%) for standard contract issues. It is not a substitute for legal advice on complex or jurisdiction-specific matters."',
      '"text": "DetectHiddenFees does not publish a verified detection percentage for AI contract review. Results depend on document quality, term complexity, and the evaluation protocol. Potential issues should be reviewed with appropriate professional guidance and are not legal advice."'
    ],
    [
      'This single clause costs consumers an estimated $1.2 billion annually.',
      'The cost of missing a renewal deadline can be significant; the actual impact depends on the contract, price, and renewal term.'
    ],
    [
      '<h2>Real Examples of AI Contract Review in Action</h2><p class="section-intro">These anonymized cases from actual HiddenFeeAI users show what AI contract review catches and how it saves money.</p>',
      '<h2>Illustrative Examples of AI Contract Review</h2><p class="section-intro">These scenarios are educational illustrations of issues a document review may surface. They are not customer cases, verified savings claims, or predictions of a specific result.</p>'
    ],
    ['The Hidden Auto-Renewal That Would Have Cost $1,200', 'Illustrative Auto-Renewal Language in a Service Contract'],
    ['<div class="savings">$1,200 saved</div>', '<div class="savings">Potential cost identified for review</div>'],
    ['<div class="savings">Business protected from unlimited liability</div>', '<div class="savings">Liability risk identified for review</div>'],
    ['<div class="savings">$1,100+ saved by choosing fixed-rate pricing</div>', '<div class="savings">Potential escalation cost illustrated</div>']
  ],
  'ai-analysis-hub.html': [
    [
      'These systems are trained on thousands of documents containing known fee types, pricing manipulation strategies, and deceptive language patterns.',
      'The public materials do not document a HiddenFeeAI training-data count. This page describes common document-analysis techniques, not a verified training-corpus size.'
    ],
    [
      'This comparative analysis is one of the most powerful features of AI document analysis because it leverages the system\'s training data to identify pricing that deviates from expected ranges. A contract with an "administrative fee" of $500 may be reasonable in some contexts but excessive in others, and the AI uses industry-specific benchmarks to make this determination.',
      'This comparison can help surface pricing that deviates from a stated reference range when such a reference is available. An "administrative fee" may be reasonable in one context and questionable in another; any benchmark depends on the source, jurisdiction, date, and document context.'
    ],
    [
      'industry experience indicates that that up to some medical bills may contain errors, many of which result in patients being overcharged.',
      'Medical bills can be complex and may contain duplicate, miscoded, or otherwise questionable line items. A billing charge should be treated as an issue for review only after the source document and billing context are checked.'
    ]
  ],
  'ai-financial-advisor.html': [
    [
      'The AI identifies that the contractor has applied a 32 percent markup on all materials — more than double the standard industry markup of 12-15 percent. The AI also flags a "project coordination fee" of $2,800 that was not mentioned during the initial consultation and a "permit processing charge" of $950 that exceeds the actual permit cost in that jurisdiction. The homeowner uses these specific findings to negotiate, ultimately reducing the total project cost.',
      'In this illustrative scenario, the example uses a 32 percent materials markup, a $2,800 coordination fee, and a $950 permit-processing charge. Those figures are fictional examples for explaining the workflow; they are not market benchmarks, a legal conclusion, or a promised negotiation outcome.'
    ]
  ]
};

for (const [filename, pairs] of Object.entries(replacements)) {
  const file = path.join(root, filename);
  let source = fs.readFileSync(file, 'utf8');
  for (const [before, after] of pairs) {
    if (!source.includes(before)) {
      if (source.includes(after)) continue;
      throw new Error(`Expected claim not found in ${filename}: ${before.slice(0, 90)}`);
    }
    source = source.replaceAll(before, after);
  }
  fs.writeFileSync(file, source, 'utf8');
  console.log(`Remediated high-risk claims in ${filename}`);
}

const dictionaryFile = path.join(root, 'hidden-fee-dictionary.html');
let dictionary = fs.readFileSync(dictionaryFile, 'utf8');
const costPattern = /<div class="cost">[\s\S]*?<\/div>/g;
const beforeCount = [...dictionary.matchAll(costPattern)].length;
dictionary = dictionary.replace(costPattern, '<div class="cost">Amount varies; verify the source document</div>');
for (const [before, after] of [
  ['Actual cost under $50. Negotiate removal.', 'Actual cost varies by provider and jurisdiction; verify the source document.'],
  ['Buy from insurer ($20-40/yr) not dealer.', 'Compare the source document with available provider options; pricing varies.'],
  ['DIY kit costs $20. Decline at dealer.', 'Compare the offered charge with an independently sourced alternative before accepting it.']
]) {
  dictionary = dictionary.replaceAll(before, after);
}
fs.writeFileSync(dictionaryFile, dictionary, 'utf8');
console.log(`Removed ${beforeCount} unsourced fee-range labels from hidden-fee-dictionary.html.`);
