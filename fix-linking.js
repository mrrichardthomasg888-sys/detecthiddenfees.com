const fs = require('fs');
const files = fs.readdirSync('.').filter(e => e.endsWith('.html') && !e.startsWith('_') && !e.startsWith('test') && e !== 'final.html' && e !== 'hdr.html' && e !== 'header.html' && e !== 'headpart.html' && e !== 'indexnow-submit.html' && !e.startsWith('out') && e !== 'part1.html' && e !== 'term-items.html');

const HUB_PAGES = {
  contract: { page: 'ai-contract-review.html', center: 'ai-contract-resource-center.html', label: 'AI Contract Review' },
  bill: { page: 'ai-bill-analyzer.html', center: 'bill-negotiation-resource-center.html', label: 'AI Bill Analyzer' },
  hidden: { page: 'hidden-fee-detector.html', center: 'hidden-fees-guides.html', label: 'Hidden Fee Detector' }
};

function classify(fn) {
  const n = fn.toLowerCase();
  if (n.includes('contract')||n.includes('agreement')||n.includes('clause')||n.includes('red-flag')||n.includes('risk-score')||n.includes('risk-assessment')||n.includes('fee-checker')||n.includes('review-contract')||n.includes('signing')||n.includes('terms-analyzer')||n.includes('terms-glossary')||n.includes('fee-analysis')||n.includes('analysis-ai')||n.includes('negotiator')||n.includes('how-to-review')) return 'contract';
  if (n.includes('bill')||n.includes('invoice')||n.includes('receipt')||n.includes('statement')||n.includes('negotiat')||n.includes('estimate')||n.includes('quote')||n.includes('medical')||n.includes('hospital')||n.includes('debt')||n.includes('saving')||n.includes('reduce-monthly')||n.includes('best-ai-bill')||n.includes('hiddenfeeai-vs')) return 'bill';
  if (n.includes('hidden')||n.includes('fee-')||n.includes('scanner')||n.includes('calculator')||n.includes('check-my')||n.includes('bank')||n.includes('credit')||n.includes('mortgage')||n.includes('loan')||n.includes('invest')||n.includes('phone')||n.includes('internet')||n.includes('stream')||n.includes('subscription')||n.includes('electrician')||n.includes('plumbing')||n.includes('roofing')||n.includes('landscap')||n.includes('moving')||n.includes('renovation')||n.includes('hvac')||n.includes('dealership')||n.includes('change-order')||n.includes('types-of-hidden')||n.includes('about-detect')) return 'hidden';
  return 'contract';
}

console.log('Files:', files.length);
let stats = { breadHtml: 0, tools: 0, guides: 0, hubLink: 0 };

files.forEach(fn => {
  let c = fs.readFileSync(fn, 'utf8');
  const hub = classify(fn);
  const hubInfo = HUB_PAGES[hub];
  const hubUrl = '/' + hubInfo.page;
  const hubLabel = hubInfo.label;

  // 1. Breadcrumb HTML nav
  if (!c.includes('class="breadcrumb"') && fn !== 'index.html') {
    const bcHtml = '<nav class="breadcrumb" aria-label="Breadcrumb" style="padding:16px 0 8px;font-size:0.85rem;color:#94a3b8"><a href="/" style="color:#3b82f6">Home</a> &rsaquo; <span style="color:#94a3b8">' + hubLabel + '</span></nav>';
    c = c.replace('<h1', bcHtml + '<h1');
    stats.breadHtml++;
  }

  // 2. Related Tools
  if (!c.includes('Related Tools') && !c.includes('class="related-tools"')) {
    let rt = '';
    if (hub === 'contract') {
      rt = '<div class="related-tools" style="margin:40px 0;padding:30px;border-radius:24px;background:rgba(255,255,255,0.04);border:1px solid rgba(59,130,246,0.12)"><h3 style="font-size:1.3rem;font-weight:800;color:white;margin-bottom:14px">Related Tools</h3><div style="display:flex;flex-wrap:wrap;gap:12px"><a href="/ai-contract-review-tool.html" style="color:#3b82f6;font-weight:600">AI Contract Review Tool</a><a href="/ai-contract-checker.html" style="color:#3b82f6;font-weight:600;margin-left:16px">AI Contract Checker</a><a href="/contract-red-flag-checker.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Contract Red Flag Checker</a></div></div>';
    } else if (hub === 'bill') {
      rt = '<div class="related-tools" style="margin:40px 0;padding:30px;border-radius:24px;background:rgba(255,255,255,0.04);border:1px solid rgba(59,130,246,0.12)"><h3 style="font-size:1.3rem;font-weight:800;color:white;margin-bottom:14px">Related Tools</h3><div style="display:flex;flex-wrap:wrap;gap:12px"><a href="/ai-bill-checker.html" style="color:#3b82f6;font-weight:600">AI Bill Checker</a><a href="/ai-invoice-checker.html" style="color:#3b82f6;font-weight:600;margin-left:16px">AI Invoice Checker</a><a href="/bill-negotiation-service.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Bill Negotiation Service</a></div></div>';
    } else {
      rt = '<div class="related-tools" style="margin:40px 0;padding:30px;border-radius:24px;background:rgba(255,255,255,0.04);border:1px solid rgba(59,130,246,0.12)"><h3 style="font-size:1.3rem;font-weight:800;color:white;margin-bottom:14px">Related Tools</h3><div style="display:flex;flex-wrap:wrap;gap:12px"><a href="/hidden-fee-scanner.html" style="color:#3b82f6;font-weight:600">Hidden Fee Scanner</a><a href="/hidden-fee-analysis-tool.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Hidden Fee Analysis Tool</a><a href="/free-hidden-fee-scanner.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Free Hidden Fee Scanner</a></div></div>';
    }
    c = c.replace('</footer>', rt + '\n</footer>');
    stats.tools++;
  }

  // 3. Related Guides
  if (!c.includes('Related Guides')) {
    let rg = '';
    if (hub === 'contract') {
      rg = '<div class="related-guides" style="margin:20px 0 40px;padding:30px;border-radius:24px;background:rgba(255,255,255,0.04);border:1px solid rgba(59,130,246,0.12)"><h3 style="font-size:1.3rem;font-weight:800;color:white;margin-bottom:14px">Related Guides</h3><div style="display:flex;flex-wrap:wrap;gap:12px"><a href="/how-to-review-a-contract.html" style="color:#3b82f6;font-weight:600">How to Review a Contract</a><a href="/before-signing-contract-checklist.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Before Signing Checklist</a><a href="/contract-red-flags.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Contract Red Flags</a></div></div>';
    } else if (hub === 'bill') {
      rg = '<div class="related-guides" style="margin:20px 0 40px;padding:30px;border-radius:24px;background:rgba(255,255,255,0.04);border:1px solid rgba(59,130,246,0.12)"><h3 style="font-size:1.3rem;font-weight:800;color:white;margin-bottom:14px">Related Guides</h3><div style="display:flex;flex-wrap:wrap;gap:12px"><a href="/how-to-read-an-invoice.html" style="color:#3b82f6;font-weight:600">How to Read an Invoice</a><a href="/invoice-red-flags.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Invoice Red Flags</a><a href="/medical-bill-audit.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Medical Bill Audit Guide</a></div></div>';
    } else {
      rg = '<div class="related-guides" style="margin:20px 0 40px;padding:30px;border-radius:24px;background:rgba(255,255,255,0.04);border:1px solid rgba(59,130,246,0.12)"><h3 style="font-size:1.3rem;font-weight:800;color:white;margin-bottom:14px">Related Guides</h3><div style="display:flex;flex-wrap:wrap;gap:12px"><a href="/hidden-fees-guides.html" style="color:#3b82f6;font-weight:600">Hidden Fee Guides</a><a href="/hidden-fee-examples.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Hidden Fee Examples</a><a href="/hidden-fee-prevention-guide.html" style="color:#3b82f6;font-weight:600;margin-left:16px">Hidden Fee Prevention Guide</a></div></div>';
    }
    c = c.replace('</footer>', rg + '\n</footer>');
    stats.guides++;
  }

  // 4. Hub backlink
  if (fn !== hubInfo.page && fn !== hubInfo.center && !c.includes(hubUrl)) {
    c = c.replace('</footer>', '<a href="' + hubUrl + '" style="display:none">' + hubLabel + '</a>\n</footer>');
    stats.hubLink++;
  }

  fs.writeFileSync(fn, c, 'utf8');
});

console.log('Breadcrumb nav:', stats.breadHtml);
console.log('Related Tools:', stats.tools);
console.log('Related Guides:', stats.guides);
console.log('Hub links:', stats.hubLink);
console.log('DONE');