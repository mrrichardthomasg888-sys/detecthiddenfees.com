const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  const r = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (full.includes('node_modules')) continue;
    if (e.isDirectory()) r.push(...getHtmlFiles(full));
    else if (e.name.endsWith('.html')) r.push(e.name.replace(/\.html$/, ''));
  }
  return r.filter(f => f !== 'indexnow-submit' && f !== 'header');
}

function classifyPage(u) {
  const a = u.toLowerCase();
  if (a.match(/(hidden-fee-(intelligence|statistics|reports|database|index|glossary|examples|risk-score)|consumer-fee-trends|hidden-fee-prevention-guide|hidden-fee-knowledge-center|hidden-fees-guides|consumer-financial-intelligence|fee-negotiation-checklist|types-of-hidden-fees)/)) return 'HIDDEN_FEE_INTELLIGENCE';
  if (a.match(/(ai-contract-review|ai-contract-analysis|contract-review-ai|contract-analysis-ai|ai-contract-risk|contract-risk-(assessment|analysis|score)|contract-red-flags|service-agreement-red-flags|how-to-review-a-contract|how-we-analyze-contracts|ai-construction-contract|ai-lease-review|ai-purchase-agreement|ai-service-contract|free-ai-contract-review|free-vs-paid-contract-review|contract-review-checklist|ai-contract-resource|contract-terms-glossary|ai-contract-review-(software|tool)|contract-fee-analysis|business-contract-review|ai-contract-review-vs-)/)) return 'AI_CONTRACT_INTELLIGENCE';
  if (a.match(/(ai-bill-analyzer|ai-invoice-analyzer|ai-receipt-analyzer|ai-estimate-review|ai-quote-review|ai-document-analysis|analyze-my-(bill|invoice|contract|estimate)|ai-analysis|ai-bill-analysis|ai-accuracy|ai-transparency|best-ai-(bill-analyzer|contract-analysis)|check-my-fees|hidden-fee-calculator|bill-savings-calculator)/)) return 'AI_DOCUMENT_ANALYSIS';
  if (a.match(/(bill-negotiation|negotiate-bills|negotiate-hospital|hospital-bill-negotiation|medical-bill-(negotiation|audit|error)|medical-debt-(negotiation|relief)|how-to-(negotiate-medical|reduce-medical)|negotiation-scripts|fee-removal-request|reduce-monthly-bills|consumer-negotiation|hiddenfeeai-vs-(bill|traditional)|duplicate-medical|contract-negotiation|change-order-fees)/)) return 'BILL_NEGOTIATION';
  if (a.match(/(about-|privacy|security|editorial-|research-methodology|data-handling|our-evaluation|how-detect-hidden-fees-works)/)) return 'TRUST_AUTHORITY';
  const cats = ['hidden-bank','hidden-billing','hidden-contract','hidden-credit-card','hidden-dealership','hidden-electrician','hidden-home-renovation','hidden-hvac','hidden-internet','hidden-investment','hidden-landscaping','hidden-loan','hidden-mortgage','hidden-moving','hidden-phone','hidden-plumbing','hidden-roofing','hidden-streaming','hidden-subscription'];
  for (const x of cats) { if (a.includes(x)) return 'HIDDEN_FEE_INTELLIGENCE'; }
  return 'TOOLS_RESOURCES';
}

function extractInfo(c, url) {
  const hm = c.match(/<h1[^>]*>([<s\s\S]*?)<\/h1>/i);
  const h1 = hm ? hm[1].replace(/<[^>]+>/g, '').trim() : '';
  const bm = c.match(/class="breadcrumb[^"]*"[^>]*>([<s\s\S]*?)<\//i);
  let bc = '';
  if (bm) bc = bm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const lr = /href="([^"]+\.html|[^"]+\/)"/gi;
  const links = [];
  let m;
  while ((m = lr.exec(c)) !== null) {
    let l = m[1].replace(/\/\//g, '/');
    if (l.endsWith('/')) l += 'index.html';
    l = l.replace(/\.html$/, '').replace(/^\//, '');
    if (l.startsWith('../')) { const p = l.split('/'); l = p.filter(q => q !== '..').join('/'); }
    if (l && l !== url && !l.includes('://') && !l.startsWith('#') && !l.startsWith('?')) links.push(l);
  }
  return { h1, breadcrumb: bc, links };
}

function execute() {
  const files = getHtmlFiles('.');
  const pages = {};
  for (const f of files) {
    const fp = f === 'index' ? 'index.html' : f + '.html';
    let c;
    try { c = fs.readFileSync(fp, 'utf8'); } catch (e) { console.error('Cannot read:', f); continue; }
    const info = extractInfo(c, f);
    pages[f] = { url: f, h1: info.h1, breadcrumb: info.breadcrumb, cluster: classifyPage(f), outboundLinks: info.links };
  }
  const inbound = {};
  for (const u of Object.keys(pages)) inbound[u] = 0;
  for (const [u, d] of Object.entries(pages)) {
    for (const l of d.outboundLinks) {
      if (pages[l]) inbound[l] = (inbound[l] || 0) + 1;
    }
  }
  const orphans = Object.entries(inbound).filter(x => x[1] === 0 && x[0] !== 'index').map(x => x[0]);
  const clusters = {};
  for (const [u, d] of Object.entries(pages)) {
    if (!clusters[d.cluster]) clusters[d.cluster] = { pages: [] };
    clusters[d.cluster].pages.push(u);
  }
  const cnames = {
    'HIDDEN_FEE_INTELLIGENCE': 'Hidden Fee Intelligence & Education',
    'AI_CONTRACT_INTELLIGENCE': 'AI Contract Intelligence',
    'AI_DOCUMENT_ANALYSIS': 'AI Document Analysis Tools',
    'BILL_NEGOTIATION': 'Bill Negotiation & Savings',
    'TRUST_AUTHORITY': 'Trust & Authority',
    'TOOLS_RESOURCES': 'Tools & Resources'
  };
  for (const cn of Object.keys(clusters)) {
    let bu = '', bc = 0;
    const cu = new Set(clusters[cn].pages);
    for (const [u, d] of Object.entries(pages)) {
      if (d.cluster !== cn) continue;
      const ic = d.outboundLinks.filter(l => cu.has(l)).length;
      if (ic > bc) { bc = ic; bu = u; }
    }
    clusters[cn].hub = bu;
  }
  const hs = Object.entries(pages).map(([u, d]) => ({ url: u, total: d.outboundLinks.length })).sort((a, b) => b.total - a.total).filter(h => h.total >= 10).map(h => h.url);
  const report = { totalPages: Object.keys(pages).length, clusters: {}, orphans, hubs: hs };
  for (const [cn, d] of Object.entries(clusters)) {
    report.clusters[cn] = { label: cnames[cn], hub: d.hub, pages: d.pages.sort() };
  }
  fs.writeFileSync('site_architecture_map.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
execute();
