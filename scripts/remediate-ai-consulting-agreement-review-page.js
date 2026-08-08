const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'ai-consulting-agreement-review.html');
const source = fs.readFileSync(file, 'utf8');

if (source.includes('id="ai-consulting-agreement-remediation"')) {
  const normalized = source.replace(/<div class="sticky-cta-bar">[\s\S]*?<\/div>(?=<script|<\/body>)/i, '');
  if (normalized !== source) {
    fs.writeFileSync(file, normalized);
    console.log('Removed the retired consulting-agreement sticky product bar.');
  } else {
    console.log('AI consulting agreement review page already remediated.');
  }
  process.exit(0);
}

const pageUrl = 'https://detecthiddenfees.com/ai-consulting-agreement-review';
const displayTitle = 'AI Consulting Agreement Review: What to Check Before Signing';
const description = 'A verification-first guide to reviewing consulting agreements for scope, payment, expenses, IP, confidentiality, classification questions, renewal, termination, and fee language.';
const updated = '2026-08-08';

const faqItems = [
  ['What can AI-assisted consulting agreement review help with?', 'It can help organize fee language, scope, payment, expense, renewal, termination, confidentiality, and other passages for a human to verify against the complete agreement and related records.'],
  ['Which clauses should a consultant review?', 'Review the parties and services, deliverables and acceptance, payment timing, expenses, taxes, changes, intellectual property, confidentiality, data handling, insurance, indemnity, liability limits, renewal, termination, and post-termination obligations.'],
  ['Can this page determine whether someone is an employee or independent contractor?', 'No. Worker classification is fact-specific and can depend on the relationship, control, financial factors, applicable law, and the agency or jurisdiction involved. An agreement review can identify language to discuss, but it cannot make that determination.'],
  ['Can AI tell me whether a consulting fee is fair?', 'No. A review can locate the amount, trigger, scope, and payment conditions stated in the documents. It does not establish fair market value, legality, enforceability, or whether a dispute will succeed.'],
  ['What records should I preserve before reviewing an agreement?', 'Keep the complete agreement, exhibits, statement of work, rate sheet, proposal, invoices, payment records, change orders, renewal notices, emails, and any written acceptance or cancellation confirmation.'],
  ['What should I confirm before uploading a consulting agreement?', 'HiddenFeeAI.com is the separate AI document-analysis product. Confirm its current first-party capabilities, supported formats, privacy, retention, deletion, access, payment, and support terms before uploading a sensitive agreement.']
];

const faqHtml = faqItems.map(([question, answer]) => `<div class="consulting-faq"><h3>${question}</h3><p>${answer}</p></div>`).join('');
const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DetectHiddenFees',
    url: 'https://detecthiddenfees.com/',
    logo: 'https://detecthiddenfees.com/logo.png',
    description: 'DetectHiddenFees provides research and educational resources about hidden fees, contract charges, and document review. HiddenFeeAI is its separate AI-powered document-analysis product.',
    sameAs: ['https://hiddenfeeai.com'],
    '@id': 'https://detecthiddenfees.com/#organization'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DetectHiddenFees',
    url: 'https://detecthiddenfees.com/',
    '@id': 'https://detecthiddenfees.com/#website'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: displayTitle,
    description,
    author: { '@type': 'Organization', name: 'DetectHiddenFees' },
    publisher: { '@id': 'https://detecthiddenfees.com/#organization' },
    datePublished: '2026-07-20',
    dateModified: updated,
    articleSection: 'Contract review',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://detecthiddenfees.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Contract Review', item: 'https://detecthiddenfees.com/ai-contract-review' },
      { '@type': 'ListItem', position: 3, name: displayTitle, item: pageUrl }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: displayTitle,
    description,
    url: pageUrl,
    inLanguage: 'en-US',
    datePublished: '2026-07-20',
    dateModified: updated,
    isPartOf: { '@id': 'https://detecthiddenfees.com/#website' },
    about: { '@type': 'Thing', name: 'Consulting agreement review' },
    '@id': `${pageUrl}#webpage`
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }))
  }
];

const main = `<main id="main-content"><nav class="phase2-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="phase2-separator" aria-hidden="true">/</span><a href="/ai-contract-review">AI Contract Review</a><span class="phase2-separator" aria-hidden="true">/</span><span aria-current="page">${displayTitle}</span></nav><section class="hero"><div class="container"><div class="badge">CONSULTING AGREEMENT REVIEW</div><h1>${displayTitle}</h1><p class="hero-sub">Use this guide to organize a careful review of a consulting agreement. It helps locate questions about scope, payment, expenses, intellectual property, confidentiality, classification, renewal, termination, and fee language; it does not provide a legal conclusion.</p><div class="hero-buttons"><a href="https://hiddenfeeai.com" class="primary-btn" rel="noopener noreferrer" data-cta-action="contract_review" data-cta-position="hero" data-cta-variant="contextual">Review My Consulting Agreement</a><a href="/ai-contract-review" class="secondary-btn">Read the AI Contract Review Guide</a></div><div class="hero-trust"><span>Complete record matters</span><span>Source passages required</span><span>Worker status is fact-specific</span><span>Qualified review when needed</span><span>Last updated: ${updated}</span></div></div></section><section class="section" style="padding-top:20px;"><div class="container"><div class="consulting-answer"><h2>Direct answer: what should a consulting agreement review cover?</h2><p>Start with the parties, services, deliverables, acceptance criteria, payment, expenses, taxes, changes, intellectual property, confidentiality, data handling, insurance, indemnity, liability, renewal, and termination provisions. Then compare the agreement with the proposal, statement of work, invoices, payment records, and later notices.</p><p><strong>Important boundary:</strong> an AI-assisted review can help organize passages and questions, but it cannot decide whether a worker is an employee or independent contractor, whether a fee is fair or lawful, whether a clause is enforceable, or whether a dispute will succeed.</p></div></div></section><section class="section"><div class="container long-content"><h2>Consulting agreement review checklist</h2><div class="consulting-grid"><article class="consulting-card"><h3>Scope and acceptance</h3><p>Identify the services, deliverables, milestones, client responsibilities, acceptance process, revisions, assumptions, exclusions, and the process for approving work outside the original scope.</p></article><article class="consulting-card"><h3>Fees, payment, and expenses</h3><p>Record rates, retainers, milestones, deposits, invoices, due dates, late charges, taxes, reimbursable expenses, travel, minimum commitments, credits, and conditions that change the stated amount.</p></article><article class="consulting-card"><h3>Changes and records</h3><p>Check who may approve a change, whether it must be written, how additional work is priced, which document controls, and how the parties preserve written acceptance and payment records.</p></article><article class="consulting-card"><h3>IP, confidentiality, and data</h3><p>Locate ownership of work product, licenses, pre-existing materials, confidential information, security responsibilities, permitted disclosures, return or deletion duties, and any data-processing terms.</p></article><article class="consulting-card"><h3>Classification and risk allocation</h3><p>Identify language about independence, control, tools, insurance, taxes, benefits, indemnity, warranties, liability limits, and governing terms. These passages raise questions; they do not settle worker status or legal responsibility.</p></article><article class="consulting-card"><h3>Renewal and termination</h3><p>Check the term, automatic renewal, notice window, termination triggers, payment for work completed, transition duties, post-termination restrictions, and any continuing confidentiality or IP obligations.</p></article></div><h2>Verification-first workflow</h2><ol><li><strong>Preserve the complete record.</strong> Keep the signed or proposed agreement, exhibits, rate sheet, statement of work, proposal, invoices, notices, and related correspondence.</li><li><strong>Define the question.</strong> State whether you are checking a fee, payment trigger, scope gap, change process, IP term, confidentiality obligation, classification question, renewal, or exit provision.</li><li><strong>Locate the source passage.</strong> Record the page, section, defined term, amount, date, trigger, exception, and cross-reference for every review signal.</li><li><strong>Reconcile related records.</strong> Compare the agreement with the proposal, invoice, payment history, approval, renewal notice, or other record that supplies context.</li><li><strong>Ask for written clarification.</strong> Ask the counterparty to identify what an unclear charge, obligation, or change covers and preserve the response.</li><li><strong>Escalate when the stakes require it.</strong> Use qualified legal, tax, accounting, employment, or other professional advice for material decisions.</li></ol><h2>Official source context and limitations</h2><p>The <a href="https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" rel="noopener noreferrer">IRS independent-contractor guidance</a> explains that worker status depends on the facts of the relationship and the degree of control and independence; a contract label alone does not settle the question. The <a href="https://www.irs.gov/businesses/small-businesses-self-employed/completing-form-ss-8" rel="noopener noreferrer">IRS Form SS-8 guidance</a> describes a process for requesting an IRS determination when federal tax classification remains unclear. The <a href="https://www.dol.gov/newsroom/releases/whd/whd20240109-1?lang=en" rel="noopener noreferrer">Department of Labor classification guidance</a> addresses employee-versus-independent-contractor analysis under the Fair Labor Standards Act and should be read with current law and applicable jurisdiction.</p><p>These sources do not decide a particular consulting relationship, fee, contract, or dispute. State and federal rules can differ, facts change, and the appropriate agency or professional may depend on the issue. This page is educational information, not legal, tax, employment, accounting, or financial advice.</p><h2>Frequently asked questions</h2><div class="consulting-faqs">${faqHtml}</div></div></section><section class="section"><div class="container"><div class="cta-block"><h2>Need help organizing the agreement?</h2><p>HiddenFeeAI.com is the separate AI document-analysis product. Confirm its current first-party capabilities, privacy, retention, supported formats, and payment terms before uploading a sensitive agreement.</p><a href="https://hiddenfeeai.com" class="cta-btn" rel="noopener noreferrer" data-cta-action="contract_review" data-cta-position="end" data-cta-variant="contextual">Review My Consulting Agreement</a></div><h2>Continue learning</h2><p class="related-links"><a href="/ai-contract-review">AI Contract Review</a> · <a href="/contract-red-flags">Contract Red Flags</a> · <a href="/before-signing-contract-checklist">Before-Signing Checklist</a> · <a href="/hidden-fee-detector">Hidden Fee Detector</a> · <a href="/hidden-fee-encyclopedia">Hidden Fee Encyclopedia</a> · <a href="/contact">Contact</a></p></div></section></main>`;
const style = '<style id="ai-consulting-agreement-remediation">.consulting-answer{max-width:980px;margin:0 auto;padding:30px 34px;border-radius:24px;background:rgba(37,99,235,.10);border:1px solid rgba(59,130,246,.25)}.consulting-answer h2{margin-top:0}.consulting-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;margin:32px 0}.consulting-card{padding:24px;border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(15,23,42,.72)}.consulting-card h3{color:#fff;margin-top:0}.consulting-card p{color:#cbd5e1}.consulting-faqs{max-width:980px;margin:28px auto}.consulting-faq{padding:22px 24px;margin-bottom:14px;border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(15,23,42,.72)}.consulting-faq h3{color:#fff;margin:0 0 8px}.consulting-faq p{color:#cbd5e1;margin:0}.related-links{text-align:center;line-height:2.2}@media(max-width:700px){.consulting-answer{padding:24px 20px}.consulting-grid{grid-template-columns:1fr}.consulting-card{padding:20px}.cta-block{padding:40px 20px}.related-links{overflow-wrap:anywhere}}</style>';
const headSchema = schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
let next = source.replace(/<title>[\s\S]*?<\/title>/i, `<title>${displayTitle} | DetectHiddenFees</title>`);
next = next.replace(/<meta name="description" content="[^"]*"\s*\/?>(?=[\s\S]*?<\/head>)/i, `<meta name="description" content="${description}" />`);
next = next.replace(/<meta property="og:title" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:title" content="${displayTitle} | DetectHiddenFees" />`);
next = next.replace(/<meta property="og:description" content="[^"]*"\s*\/?\s*>/i, `<meta property="og:description" content="${description}" />`);
next = next.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:title" content="${displayTitle} | DetectHiddenFees" />`);
next = next.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/i, `<meta name="twitter:description" content="${description}" />`);
next = next.replace(/<link rel="canonical" href="[^"]+"\s*\/?\s*>/i, `<link rel="canonical" href="${pageUrl}" />`);
next = next.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
next = next.replace(/<\/head>/i, `${headSchema}${style}</head>`);
next = next.replace(/<main\b[\s\S]*?<\/main>/i, main);
next = next.replace(/<div class="sticky-cta-bar">[\s\S]*?<\/div>(?=<script|<\/body>)/i, '');
fs.writeFileSync(file, next);
console.log('Remediated AI consulting agreement review as an evidence-safe, source-aware checklist.');
