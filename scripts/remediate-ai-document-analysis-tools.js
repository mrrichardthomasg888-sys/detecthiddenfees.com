const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-document-analysis-tools.html');
let source = fs.readFileSync(file, 'utf8');

function removeSoftwareApplicationSchema() {
  const blocks = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const match of blocks) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (parsed && parsed['@type'] === 'SoftwareApplication') source = source.replace(match[0], '');
    } catch {
      // The existing page validators report malformed JSON-LD separately.
    }
  }
}

if (source.includes('AI document analysis tools can help organize a first-pass review')) {
  removeSoftwareApplicationSchema();
  source = source.replace('</div></div></div></main><footer>', '</div></div></main><footer>');
  fs.writeFileSync(file, source, 'utf8');
  console.log('The document-analysis guide is already remediated; normalized its CTA wrapper if needed.');
  process.exit(0);
}

function replaceOnce(label, pattern, replacement) {
  const next = source.replace(pattern, replacement);
  if (next === source) throw new Error(`Could not find ${label}`);
  source = next;
}

replaceOnce(
  'hero answer',
  /<p class="hero-sub">[\s\S]*?<\/p>/,
  '<p class="hero-sub">AI document analysis tools can help organize a first-pass review of contracts, bills, invoices, and estimates. Compare what a tool actually examines, what evidence it provides, and where human review is still necessary.</p>'
);

replaceOnce(
  'hero actions',
  /<div class="hero-buttons">[\s\S]*?<\/div>/,
  '<div class="hero-buttons"><a href="https://hiddenfeeai.com" class="primary-btn">Analyze My Document →</a><a href="/ai-analysis-hub" class="secondary-btn">Explore the AI Analysis Hub</a></div>'
);

replaceOnce(
  'hero trust row',
  /<div class="hero-trust">[\s\S]*?<\/div>/,
  '<div class="hero-trust"><span>Contracts, bills, invoices, and estimates</span><span>Review fee language, totals, and clause relationships</span><span>Human review still matters</span><span>Check current product terms</span></div>'
);

replaceOnce(
  'first evidence section',
  /<section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section">[\s\S]*?<\/section>/,
  '<section class="section" style="padding-top:20px;"><div class="container"><div class="leverage-section"><h3>What should you compare in an AI document-analysis tool?</h3><p>Start with the tool\'s document scope, extraction behavior, explanation of findings, treatment of uncertainty, privacy disclosures, and path for human review. A tool can organize potential issues, but it does not turn an automated output into legal, financial, or billing advice.</p><p><a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10" target="_blank" rel="noopener noreferrer" style="color:#bfdbfe;text-decoration:underline;">NIST\'s AI Risk Management Framework</a> is a useful primary source for thinking about trustworthy AI, including context, measurement, limitations, and risk management. It is guidance—not a certification of any particular product.</p></div></div></section>'
);

replaceOnce(
  'answer-first guide section',
  /<section class="section" style="padding-top:10px;"><div class="container long-content">[\s\S]*?<\/section>/,
  '<section class="section" style="padding-top:10px;"><div class="container long-content"><h2>How do AI document analysis tools work?</h2><p>AI document analysis tools generally extract text or other document content, identify relevant language and values, and organize potential findings for a person to review. The exact workflow, supported formats, retention practices, and output quality depend on the product and the document.</p><p>For a useful comparison, ask whether the tool can handle the document you actually have; whether it shows the source passage or line item behind each finding; whether it distinguishes an observation from a legal or financial conclusion; and whether it explains uncertainty or missing information. These details are more meaningful than an unsupported accuracy percentage.</p><div class="highlight-box"><h4>Document types and review boundaries</h4><p>Common use cases include contracts, invoices, estimates, statements, bills, and service agreements. A tool may help surface fee language, duplicate-looking charges, renewal terms, or unclear obligations, but it may not understand every scan, table, jurisdiction-specific rule, or unusual clause. Confirm important findings against the original document and consult a qualified professional when the stakes require it.</div><h3>What makes a tool useful?</h3><p>A useful report makes its reasoning inspectable: it identifies the relevant text or amount, describes why the item may deserve attention, and suggests a question or next step without promising a result. Look for clear privacy information, an understandable correction or escalation path, and pricing and retention terms that you can review before uploading a document.</p></div></section>'
);

replaceOnce(
  'second evidence section',
  /<section class="section" style="padding-top:10px;"><div class="container"><div class="leverage-section"><h3>Ready to start negotiating\?<\/h3>[\s\S]*?<\/section>/,
  '<section class="section" style="padding-top:10px;"><div class="container"><div class="leverage-section"><h3>Have a document you want to review?</h3><p>Use a document-specific analysis path when you want help organizing potential fees, billing issues, or contract terms. Check the product\'s current pricing, privacy terms, and limitations before uploading.</p><a href="https://hiddenfeeai.com" class="primary-btn" style="padding:18px 36px;font-size:1rem;">Analyze My Document →</a></div></div></section>'
);

replaceOnce(
  'final call to action',
  /<div class="container"><div class="cta-block">[\s\S]*?<\/div><\/div>/,
  '<div class="container"><div class="cta-block"><h2>Review a Fee Document With a Tool</h2><p>Use a structured first pass to identify passages, charges, and questions that deserve closer attention. Review the original document and obtain professional advice when appropriate.</p><a href="https://hiddenfeeai.com" class="cta-btn">Analyze My Document →</a><div class="cta-reassurance">Review current pricing, privacy, and product limitations before upload.</div>'
);

const oldDescription = 'Complete guide to AI document analysis tools for contracts, bills, invoices, and estimates. Compare features, accuracy, and benefits.';
const newDescription = 'Learn how to compare AI document analysis tools for contracts, bills, invoices, and estimates, including evidence, limitations, privacy, and human review.';
source = source.split(oldDescription).join(newDescription);
source = source.split('AI Document Analysis Tools: Complete Guide to AI Analysis | DetectHiddenFees').join('AI Document Analysis Tools: Complete Guide to Smarter Document Review | DetectHiddenFees');
source = source.replace(/("dateModified"\s*:\s*")2026-07-(?:19|21)(")/g, '$12026-08-08$2');
source = source.replace(/>July 2026</g, '>August 8, 2026<');
source = source.replace(/>Document Intelligence Center<\/a>/g, '>AI Analysis Hub</a>');

replaceOnce(
  'related contract resource',
  /<span style="color:#94a3b8;font-size:.85rem;"> — hidden fees in agreements<\/span>/,
  '<a href="/hidden-contract-fees" style="color:#93c5fd;font-weight:600;">Hidden fees in agreements</a>'
);
replaceOnce(
  'related billing resource',
  /<span style="color:#94a3b8;font-size:.85rem;"> — detect billing errors<\/span>/,
  '<a href="/ai-bill-analyzer" style="color:#93c5fd;font-weight:600;">Detect billing errors</a>'
);
replaceOnce(
  'related fee resource',
  /<span style="color:#94a3b8;font-size:.85rem;"> — find hidden costs<\/span>/,
  '<a href="/hidden-fee-examples" style="color:#93c5fd;font-weight:600;">Find hidden costs</a>'
);

const mainStart = source.indexOf('<main');
const mainEnd = source.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');
let main = source.slice(mainStart, mainEnd);
let ctaIndex = 0;
const positions = ['hero', 'content', 'content', 'end'];
main = main.replace(/<a\b[^>]*href=["']https:\/\/hiddenfeeai\.com[^"']*["'][^>]*>/gi, tag => {
  if (tag.includes('data-cta-action=')) return tag;
  const position = positions[ctaIndex++] || 'content';
  return tag.replace(/>$/, ` data-cta-action="document_analysis" data-cta-position="${position}" data-cta-variant="primary">`);
});
source = source.slice(0, mainStart) + main + source.slice(mainEnd);
removeSoftwareApplicationSchema();

fs.writeFileSync(file, source, 'utf8');
console.log(`Remediated ${path.basename(file)} with answer-first, evidence-safe document-analysis guidance.`);
