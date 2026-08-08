const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const changed = [];

function updateFile(file, callback) {
  const filePath = path.join(root, file);
  let source = fs.readFileSync(filePath, 'utf8');
  const original = source;
  callback({
    replace(oldText, newText) {
      if (source.includes(newText)) return;
      if (!source.includes(oldText)) throw new Error(`${file}: expected text not found: ${oldText.slice(0, 120)}`);
      source = source.replace(oldText, newText);
    },
    replaceAll(oldText, newText) {
      if (source.includes(oldText)) source = source.replaceAll(oldText, newText);
    },
    regex(pattern, newText) {
      if (source.includes(newText)) return;
      const next = source.replace(pattern, newText);
      if (next === source) throw new Error(`${file}: expected pattern not found: ${pattern}`);
      source = next;
    },
    replaceFirstAnswer(newText) {
      if (source.includes(newText)) return;
      const pattern = /<div class="answer-block"><div class="a">[\s\S]*?<\/div><\/div>/;
      const next = source.replace(pattern, newText);
      if (next === source) throw new Error(`${file}: first answer block not found`);
      source = next;
    },
    removeStickyBar() {
      if (!source.includes('<div class="sticky-cta-bar">')) return;
      const pattern = /<div class="sticky-cta-bar">[\s\S]*?<\/div><\/body>/;
      const next = source.replace(pattern, '</body>');
      if (next === source) throw new Error(`${file}: sticky CTA block not found`);
      source = next;
    }
  });
  if (source !== original) {
    fs.writeFileSync(filePath, source, 'utf8');
    changed.push(file);
  }
}

updateFile('mandatory-vs-optional-fees.html', ({ replace }) => {
  replace(
    '</p><p class="note"><strong>Important:</strong>',
    '</p><p>For source-linked examples of fee disclosure, billing, and optional-charge context, see the <a href="/hidden-fee-database">2026 Hidden Fee Evidence Review</a>. It is a documented sample, not a market-wide prevalence study.</p><p class="note"><strong>Important:</strong>'
  );
});

updateFile('ai-bill-analyzer.html', ({ replaceAll }) => {
  replaceAll(
    'AI-powered bill analyzer that scans medical bills, utility bills, phone bills, and service invoices for hidden fees, errors, and overcharges. Save money on.',
    'AI-assisted bill review for duplicate-looking charges, unclear fees, recurring billing, credits, and questions that require verification.'
  );
});

updateFile('hidden-fee-detector.html', ({ replaceAll, replace }) => {
  replaceAll(
    'Hidden Fee Detector: How AI-Assisted Document Review Works | DetectHiddenFees',
    'AI Hidden Fee Detector: Review Contracts, Bills & Invoices | DetectHiddenFees'
  );
  replace(
    '<a href="/research-center">Research Center</a>',
    '<a href="/research-center">Research Center</a><a href="/hidden-fee-database">Evidence Review</a>'
  );
});

updateFile('consumer-fee-trends-report.html', ({ replaceAll, replace }) => {
  replaceAll(
    'Consumer Fee Trends Report 2026: Evidence Status | DetectHiddenFees',
    'Consumer Fee Trends Report 2026: What Verified Evidence Supports | DetectHiddenFees'
  );
  replaceAll(
    'A collecting-only consumer fee trends report. See the study scope, methodology, primary sources, limitations, and why no national fee estimates are published yet.',
    'A sample-based consumer fee evidence review explaining what 25 verified public-source records support—and what they do not establish.'
  );
  replaceAll('Status: collecting', 'Status: published sample');
  replaceAll('RESEARCH STATUS &bull; DATA COLLECTION', 'RESEARCH STATUS &bull; PUBLISHED SAMPLE');
  replaceAll(
    '<h1>Consumer Fee Trends Report 2026: Evidence Status</h1>',
    '<h1>Consumer Fee Trends Report 2026: What Verified Evidence Supports</h1>'
  );
  replaceAll(
    'Consumer Fee Trends Report 2026: Evidence Status</span>',
    'Consumer Fee Trends Report 2026: What Verified Evidence Supports</span>'
  );
  replaceAll(
    'Consumer Fee Trends Report 2026: Evidence Status',
    'Consumer Fee Trends Report 2026: What Verified Evidence Supports'
  );
  replaceAll(
    'There is not yet a verified DetectHiddenFees estimate for that question.',
    'The current 25-record public-source review does not estimate whether hidden fees are increasing overall.'
  );
  replaceAll(
    'The public <a href="/research-data.json">Hidden Fee Index manifest</a> is marked <strong>collecting</strong>, its records array is empty, and its statistics field is null.',
    'The public <a href="/hidden-fee-database">Hidden Fee Evidence Review</a> contains 25 verified records with source links and sample-only counts; it does not establish a national trend.'
  );
  replace(
    '<div class="stat-num">Collecting</div><div class="stat-label">Public research status</div>',
    '<div class="stat-num">Published</div><div class="stat-label">Sample research status</div>'
  );
  replace(
    '<div class="stat-num">0</div><div class="stat-label">Publicly published research records</div>',
    '<div class="stat-num">25</div><div class="stat-label">Verified public-source records</div>'
  );
  replaceAll(
    'No. The public Hidden Fee Index manifest is still marked collecting, has no published records, and does not publish statistics. A national total would require a defined, reviewable dataset and reproducible analysis.',
    'No. The public Evidence Review contains 25 verified public-source records, but the sample is curated and does not support a national total or prevalence estimate.'
  );
  replaceAll(
    'The planned study records fee terminology, category, amount when stated, recurring status, relevant clauses, cancellation or renewal terms, source details, and a traceable evidence reference across public documents and authoritative sources.',
    'The published review records fee terminology, category, amount when explicitly stated, recurring status, relevant clauses, cancellation or renewal terms, source details, and traceable evidence references.'
  );
});

updateFile('ai-contract-review.html', ({ replaceAll, replace }) => {
  replaceAll(
    'AI Contract Review: A Verification-First Workflow | DetectHiddenFees',
    'AI Contract Review & Analysis: A Verification-First Workflow | DetectHiddenFees'
  );
  replaceAll(
    'A verification-first workflow for using AI-assisted contract review to locate fee language, renewal terms, cancellation conditions, and questions to check against the original agreement.',
    'A verification-first workflow for AI-assisted contract review and analysis: locate fee language, renewal terms, cancellation conditions, and questions to check against the original agreement.'
  );
  replaceAll(
    '<h1>AI Contract Review: A Verification-First Workflow</h1>',
    '<h1>AI Contract Review &amp; Analysis: A Verification-First Workflow</h1>'
  );
  replace(
    '<a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a>',
    '<a class="related-link" href="/ai-analysis-methodology">AI Analysis Methodology</a><a class="related-link" href="/ai-construction-contract-review">AI Construction Contract Review</a><a class="related-link" href="/hidden-fee-database">2026 Hidden Fee Evidence Review</a>'
  );
});

updateFile('ai-construction-contract-review.html', ({ replaceAll, replace }) => {
  replaceAll(
    'Materials And Allowances</h3><p>Record brands, models, grades, quantities, allowances, substitutions, delivery, waste, and any clause that can pass a price increase to the owner.',
    'Materials, Markups, And Allowances</h3><p>Record brands, models, grades, quantities, allowances, substitutions, delivery, waste, material markups, and any clause that can pass a price increase to the owner.'
  );
  replaceAll(
    'List the contract price, deposits, milestones, retainage, reimbursable costs, taxes, permit responsibilities, late charges, and any formula that can change the total.',
    'List the contract price, deposits, milestones, retainage, reimbursable costs, taxes, permit responsibilities, administrative or coordination charges, delay charges, late charges, and any formula that can change the total.'
  );
  replace(
    'These are source examples, not nationwide legal rules; check the applicable state and local authority.</p>',
    'These are source examples, not nationwide legal rules; check the applicable state and local authority. The <a href="/hidden-fee-database">2026 Hidden Fee Evidence Review</a> provides additional source-linked context, but its reviewed sample is not a construction prevalence study.</p>'
  );
});

updateFile('hidden-fee-encyclopedia.html', ({ replace }) => {
  replace(
    '<p>This encyclopedia is a navigable reference map for understanding fee terms, unexpected charges, recurring billing, contract triggers, and document-review questions.',
    '<p>This encyclopedia is the primary informational hub for understanding hidden-fee terms, unexpected charges, recurring billing, contract triggers, and document-review questions.'
  );
  replace(
    '</p><p style="color:#94a3b8;font-size:.92rem;">Last updated:',
    '</p><p>For source-linked evidence and methodology, see the <a href="/hidden-fee-database">2026 Hidden Fee Evidence Review</a>. Specialized guides below cover contracts, bills, invoices, industries, research, and tools.</p><p style="color:#94a3b8;font-size:.92rem;">Last updated:'
  );
  replace(
    'The public DetectHiddenFees research manifest is currently collecting-only, with no published prevalence statistics.',
    'The public DetectHiddenFees Evidence Review contains 25 verified public-source records and sample-only counts; it does not publish prevalence statistics.'
  );
});

updateFile('how-do-companies-hide-fees-in-contracts.html', ({ replaceAll, replace, replaceFirstAnswer, removeStickyBar }) => {
  replaceAll(
    'Companies use dozens of techniques to hide fees in contracts: fine print, vague language, buried charges, split pricing, automatic renewal traps, and related risks.',
    'Learn how fine print, vague language, split pricing, renewal terms, and undefined charges can make contract fees harder to spot—and what to verify before signing.'
  );
  replaceAll(
    'Companies use dozens of techniques to hide fees in contracts: fine print, vague language, buried charges, split pricing, automatic renewal traps, and deceptive terminology. Learn how to spot every tactic.',
    'Learn how fine print, vague language, split pricing, renewal terms, and undefined charges can make contract fees harder to spot—and what to verify before signing.'
  );
  replaceAll(
    'Learn how companies hide fees in contracts through fine print, vague language, buried charges, split pricing, and automatic renewal traps.',
    'Learn how fine print, vague language, split pricing, renewal terms, and undefined charges can make contract fees harder to spot—and what to verify before signing.'
  );
  replaceFirstAnswer('<div class="answer-block"><div class="a">Contract fees can be difficult to spot when important terms are buried in long agreements, defined elsewhere, split across line items, or triggered by renewal, cancellation, changes, or late payment. Review the exact clause, amount, trigger, timing, and related documents before treating a charge as unexpected or improper.</div></div>');
  replaceAll(
    'Companies hide fees in contracts using dozens of documented techniques ranging from fine print burying to deceptive terminology, split pricing, automatic renewal traps, and vague fee descriptions. The hidden fee playbook is surprisingly consistent across industries — banking, telecom, healthcare, construction, automotive, and subscription services all use variations of the same strategies. AI document analysis has identified over 40 distinct techniques companies use to obscure fees, and this knowledge base powers the detection algorithms that protect consumers.',
    'Contract fees can be difficult to spot when important terms are buried in long agreements, defined elsewhere, split across line items, or triggered by renewal, cancellation, changes, or late payment. Review the exact clause, amount, trigger, timing, and related documents before treating a charge as unexpected or improper.'
  );
  replaceAll(
    'Based on analysis of thousands of contracts, our research has identified the most frequently used methods companies employ to hide fees. Recognizing these tactics helps you read contracts more critically and know when to use AI analysis for deeper review.',
    'This guide organizes recurring contract-review questions around fee wording, document structure, totals, renewals, and changes. It is an educational checklist, not a prevalence study or a claim about every company or contract.'
  );
  replaceAll(
    'AI reads every page with equal attention, making burying ineffective against automated analysis.',
    'AI-assisted review may help locate relevant text, but extraction and interpretation depend on document quality, layout, context, and current product behavior.'
  );
  replaceAll(
    'This language gives companies unlimited ability to add charges later. AI flags all undefined fee language as high-risk.',
    'This language makes the amount, trigger, or scope harder to verify. Treat it as a question to investigate rather than proof that a provider can add any charge later.'
  );
  replaceAll(
    'AI automatically aggregates all charges to reveal the true total.',
    'A review may help organize line items for comparison, but reconcile the stated total against the original agreement, quote, invoice, and any applicable disclosures.'
  );
  replaceAll(
    'A common pattern is a first-year teaser rate followed by automatic 20-50% increases that consumers must actively opt out of. AI identifies these clauses and calculates the long-term cost impact.',
    'Review whether the renewal clause states a new price, escalation formula, notice period, cap, cancellation window, or other condition that can change the total. Do not infer a typical increase without source-specific evidence.'
  );
  replaceAll(
    'AI document analysis systematically counters every fee-hiding technique. Because the AI does not get fatigued, does not skip sections, and applies consistent detection criteria to every page, techniques that work against human reviewers are ineffective against automated analysis. HiddenFeeAI\'s detection algorithms are specifically trained on the documented hidden fee playbook, recognizing patterns that indicate deceptive pricing regardless of the specific language or placement used.',
    'AI-assisted document review may help organize fee terms, compare related passages, and surface questions for verification. It can miss text, misunderstand an exception, or flag a legitimate charge. Review the original documents and current product limitations before relying on an output.'
  );
  replaceAll(
    'The AI also cross-references fee language against its proprietary database of known hidden fee patterns, continuously updating as new techniques are identified. This creates a detection system that evolves as companies develop new methods of hiding charges.',
    'A useful workflow should keep the source passage, the amount, the trigger, and the surrounding definition together so a person can check the result against the transaction records.'
  );
  replaceAll(
    'Telecom, banking, healthcare, automotive, subscription services, and construction consistently show the highest rates of hidden fee practices based on our research.',
    'The current Evidence Review includes public sources about banking, medical billing, automotive, subscriptions, home improvement, and other fee contexts; it does not rank industries or estimate frequency.'
  );
  replaceAll('What industries hide fees most frequently?', 'Which industries appear in the public fee sources?');
  replaceAll(
    'Companies rely on consumers not reading full contracts, not understanding industry pricing, and the difficulty of challenging individual fee amounts. AI analysis removes this consumer disadvantage.',
    'Fees can be difficult to spot when terms are lengthy, definitions are cross-referenced, or totals are split across documents. AI-assisted review can organize questions, but human verification remains necessary.'
  );
  replaceAll('How do companies get away with hiding fees?', 'Why can contract fees be hard to spot?');
  replaceAll(
    'Yes, AI can identify hidden fee patterns across service agreements, product purchases, financing contracts, leases, memberships, and most standard consumer or business contracts.',
    'AI-assisted review may help identify fee-related language in supported documents, but coverage depends on document quality, context, and current product behavior; it cannot guarantee that every issue is found.'
  );
  replaceAll('Can AI find hidden fees in any contract type?', 'Can AI help review any contract type?');
  replaceAll(
    'Small fees between $5-$25 per month are most common because they are individually small enough to avoid attention but collectively significant over time.',
    'The current public evidence review does not establish a most-common fee amount. Amounts should be recorded only when a source states them and should not be generalized.'
  );
  replaceAll('What is the most common hidden fee amount?', 'Does the research show a most-common hidden-fee amount?');
  replaceAll(
    'Estimates suggest hidden fees cost the average American household $1,000-$2,000 per year across all service categories, according to consumer advocacy research.',
    'The current public evidence review does not publish an average household cost or market-wide estimate. Such a claim would require a defined, representative dataset and reproducible calculation.'
  );
  replaceAll('How much do hidden fees cost the average consumer?', 'Does the research show an average consumer cost?');
  replaceAll(
    'Yes, many hidden fees can be removed or reduced through negotiation, especially when you have specific evidence from AI analysis showing the fees were undisclosed or excessive.',
    'Some charges may be questioned or negotiated depending on the agreement, provider, and applicable rules. An AI finding is not proof that a charge was undisclosed, excessive, or refundable.'
  );
  replaceAll(
    'Upload any contract, invoice, estimate, bill, or financial agreement to HiddenFeeAI for comprehensive AI analysis. Our system scans every line item for hidden fees, pricing risks, and negotiation opportunities. One-time analysis for $15 with no subscription required. Your documents are processed securely and deleted after analysis.',
    'HiddenFeeAI is the related document-analysis product. If its current terms fit your needs, review the first-party privacy, retention, supported-format, and pricing information before uploading a sensitive document.'
  );
  replaceAll('Analyze My Document With AI — $15', 'Review My Document With HiddenFeeAI');
  replace(
    '<h2>The Most Common Hidden Fee Tactics</h2>',
    '<p class="source-note"><strong>Evidence context:</strong> The <a href="/hidden-fee-database">2026 Hidden Fee Evidence Review</a> links 25 verified public sources. It is a documented sample, not evidence that any tactic is common, unlawful, or used by every industry.</p><h2>The Most Common Hidden Fee Tactics</h2>'
  );
  removeStickyBar();
});

console.log(`Phase 4 surgical updates applied to ${changed.length} files: ${changed.join(', ') || 'none'}.`);
