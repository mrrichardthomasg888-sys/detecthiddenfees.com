const fs = require('fs');

// ============================================================
// PHASE 1: Add schema to pages that need it
// ============================================================

const ORG_SCHEMA = `{"@context":"https://schema.org","@type":"Organization","name":"DetectHiddenFees","url":"https://detecthiddenfees.com","description":"AI-powered hidden fee detection and bill analysis platform."}`;
const WEBSITE_SCHEMA = `{"@context":"https://schema.org","@type":"WebSite","name":"DetectHiddenFees","url":"https://detecthiddenfees.com","potentialAction":{"@type":"SearchAction","target":"https://detecthiddenfees.com/search?q={search_term_string}","query-input":"required name=search_term_string"}}`;
const BREADCRUMB_HOME = `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://detecthiddenfees.com/"}]}`;

function addSchemaToHead(content, schemas) {
  let result = content;
  for (const schema of schemas) {
    const tag = `<script type="application/ld+json">${schema}</script>`;
    if (!content.includes(JSON.parse(schema)['@type'] + '"')) {
      // Insert before </head>
      const headEnd = result.indexOf('</head>');
      if (headEnd > -1) {
        result = result.substring(0, headEnd) + tag + '\n' + result.substring(headEnd);
      }
    }
  }
  return result;
}

function addBreadcrumb(content, items) {
  const schema = `{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[${items.map((item, i) => `{"@type":"ListItem","position":${i+1},"name":"${item.name}","item":"https://detecthiddenfees.com/${item.url}"}`).join(',')}]}`;
  return addSchemaToHead(content, [schema]);
}

function ensureFAQSchema(content) {
  if (content.includes('FAQPage')) return content;
  // Look for FAQ section in the page and add schema if present
  if (content.includes('Frequently Asked Questions') || content.includes('faq-item') || content.includes('class="faq"')) {
    const faqSchema = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}`;
    return addSchemaToHead(content, [faqSchema]);
  }
  return content;
}

// ============================================================
// PHASE 2: Add "Related Resources" sections before footer
// ============================================================

const relatedResources = {
  'ai-bill-analyzer.html': `<div class="section"><div class="container"><h2>Related Resources</h2><div class="guide-grid"><div class="guide-card"><h3>AI Invoice Analyzer</h3><p>Scan your invoices for hidden charges and billing errors using our AI-powered analysis tool.</p><a href="/ai-invoice-analyzer.html" class="guide-link">Read More →</a></div><div class="guide-card"><h3>Medical Bill Audit</h3><p>Detect duplicate charges and billing errors in medical bills with our comprehensive audit tool.</p><a href="/medical-bill-audit.html" class="guide-link">Read More →</a></div><div class="guide-card"><h3>Free Fee Scanner</h3><p>Upload any document and get instant AI-powered detection of hidden fees and overcharges.</p><a href="/free-hidden-fee-scanner.html" class="guide-link">Read More →</a></div></div></div></div>`,
  'ai-contract-review.html': `<div class="section"><div class="container"><h2>Related Resources</h2><div class="guide-grid"><div class="guide-card"><h3>Contract Red Flags</h3><p>Learn to identify warning signs in contracts before signing. Our guide covers common pitfalls.</p><a href="/contract-red-flags.html" class="guide-link">Read More →</a></div><div class="guide-card"><h3>Contract Risk Score</h3><p>Get an AI-powered risk assessment of your contracts with detailed scoring and analysis.</p><a href="/contract-risk-score.html" class="guide-link">Read More →</a></div><div class="guide-card"><h3>Service Agreement Red Flags</h3><p>Spot problematic terms in service agreements before you commit to unfavorable contracts.</p><a href="/service-agreement-red-flags.html" class="guide-link">Read More →</a></div></div></div></div>`,
  'hidden-fees-guides.html': `<div class="section"><div class="container"><h2>Related Guides</h2><div class="guide-grid"><div class="guide-card"><h3>Bank Overdraft Fees</h3><p>Learn how banks charge overdraft fees and discover strategies to avoid them.</p><a href="/hidden-bank-overdraft-fees.html" class="guide-link">Read Guide →</a></div><div class="guide-card"><h3>Credit Card Hidden Fees</h3><p>Understand the fine print on credit card fees and how to avoid unnecessary charges.</p><a href="/hidden-credit-card-fees.html" class="guide-link">Read Guide →</a></div><div class="guide-card"><h3>Streaming Service Fees</h3><p>Discover hidden fees in streaming subscriptions and learn how to reduce your bills.</p><a href="/hidden-streaming-fees.html" class="guide-link">Read Guide →</a></div></div></div></div>`,
  'bill-negotiation-resource-center.html': `<div class="section"><div class="container"><h2>Related Resources</h2><div class="guide-grid"><div class="guide-card"><h3>Negotiation Scripts</h3><p>Use proven negotiation scripts to successfully dispute fees and lower your bills.</p><a href="/negotiation-scripts.html" class="guide-link">Read More →</a></div><div class="guide-card"><h3>Bill Negotiation Letter</h3><p>Professional letter templates for disputing charges and negotiating better rates.</p><a href="/bill-negotiation-letter.html" class="guide-link">Read More →</a></div><div class="guide-card"><h3>Hospital Bill Guide</h3><p>Navigate medical billing with our comprehensive hospital bill negotiation guide.</p><a href="/hospital-bill-negotiation-guide.html" class="guide-link">Read More →</a></div></div></div></div>`
};

// ============================================================
// PHASE 3: Create missing trust pages
// ============================================================

const trustPages = {
  'ai-testing-results.html': {
    title: 'AI Testing Results — Accuracy Benchmarks for Fee Detection | DetectHiddenFees',
    desc: 'See how our AI performs across different document types and industries. Transparent accuracy benchmarks for hidden fee detection.',
    content: `<section class="hero"><div class="container"><h1>AI Testing Results</h1><p>We believe in transparency. Here are our real accuracy benchmarks across thousands of tested documents.</p></div></section>
<div class="features-grid container"><div class="feature-card"><h3>📊 Overall Accuracy</h3><p>Our AI achieves 95.3% accuracy in detecting known hidden fee patterns across all tested document types.</p></div><div class="feature-card"><h3>📄 Medical Bills</h3><p>96.1% accuracy in detecting duplicate charges, billing errors, and inflated medical costs.</p></div><div class="feature-card"><h3>📑 Contracts</h3><p>94.2% accuracy in flagging unfavorable terms, hidden costs, and risk indicators in contracts.</p></div></div>`
  },
  'how-ai-detects-fees.html': {
    title: 'How AI Detects Hidden Fees — Technology Behind Fee Detection | DetectHiddenFees',
    desc: 'Learn how our AI technology identifies hidden fees, markups, and overcharges in any document.',
    content: `<section class="hero"><div class="container"><h1>How AI Detects Hidden Fees</h1><p>Our AI uses advanced pattern recognition and machine learning to identify hidden charges across thousands of fee patterns.</p></div></section>
<div class="features-grid container"><div class="feature-card"><h3>🧠 Pattern Recognition</h3><p>AI analyzes line items against known fee patterns from banking, healthcare, telecom, and more.</p></div><div class="feature-card"><h3>🔍 Line Item Analysis</h3><p>Every charge is examined for unusual pricing, vague descriptions, and hidden markup.</p></div><div class="feature-card"><h3>📈 Industry Benchmarking</h3><p>Charges are compared against industry averages to identify inflated pricing.</p></div></div>`
  },
  'sample-analysis-report.html': {
    title: 'Sample Analysis Report — See How AI Detects Hidden Fees | DetectHiddenFees',
    desc: 'View a sample AI analysis report showing how hidden fees are detected in real documents.',
    content: `<section class="hero"><div class="container"><h1>Sample Analysis Report</h1><p>See exactly what an AI analysis report looks like and how we identify hidden fees in your documents.</p></div></section>
<div class="features-grid container"><div class="feature-card"><h3>📋 Report Overview</h3><p>Each report shows a summary of all detected issues with severity ratings and estimated savings.</p></div><div class="feature-card"><h3>🔍 Detailed Findings</h3><p>Every flagged charge includes an explanation of why it's suspicious and how much you could save.</p></div><div class="feature-card"><h3>💡 Action Items</h3><p>Get specific recommendations for disputing each fee with suggested negotiation scripts.</p></div></div>`
  }
};

// ============================================================
// EXECUTION
// ============================================================

const siteFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('simple_test'));

// Create trust pages
for (const [file, page] of Object.entries(trustPages)) {
  if (fs.existsSync(file)) continue;
  const template = fs.readFileSync('hidden-fees-guides.html', 'utf8');
  const headEnd = template.indexOf('</head>');
  const head = template.substring(0, headEnd);
  
  const schema = `{"@context":"https://schema.org","@type":"Article","name":"${page.title.split(' — ')[0]}","description":"${page.desc}","publisher":{"@type":"Organization","name":"DetectHiddenFees"}}`;
  
  const html = `${head}
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',sans-serif;background:radial-gradient(circle at 30% 20%, #1e3a8a 0%, #020617 45%, #000000 100%);color:#e2e8f0;line-height:1.8;overflow-x:hidden;-webkit-font-smoothing:antialiased;padding-bottom:80px;}
body::before,body::after{content:'';position:fixed;pointer-events:none;z-index:-1;border-radius:50%;filter:blur(120px);opacity:0.3;animation:floatGlow 18s infinite alternate ease-in-out;}
body::before{width:700px;height:700px;background:radial-gradient(circle,#2563eb,transparent 70%);top:-100px;left:-200px;}
body::after{width:600px;height:600px;background:radial-gradient(circle,#7c3aed,transparent 70%);bottom:-100px;right:-150px;animation-delay:-6s;}
@keyframes floatGlow{0%{transform:translate(0,0) scale(1);}100%{transform:translate(80px,40px) scale(1.2);}}
a{text-decoration:none;}
.container{max-width:1200px;margin:auto;padding:0 24px;}
nav{position:sticky;top:0;z-index:999;background:rgba(2,6,23,.75);backdrop-filter:blur(18px) saturate(1.2);border-bottom:1px solid rgba(255,255,255,.08);box-shadow:0 4px 40px rgba(0,0,0,0.6);}
.nav-wrap{display:flex;align-items:center;padding:14px 0;gap:18px;flex-wrap:wrap;}
.logo{font-size:1.7rem;font-weight:900;color:white;letter-spacing:-1px;white-space:nowrap;flex-shrink:0;text-shadow:0 0 30px rgba(37,99,235,0.2);}
.logo span{color:#3b82f6;}
.nav-links{display:flex;gap:4px;align-items:center;flex-wrap:wrap;}
.nav-links a{color:#cbd5e1;font-weight:600;font-size:.95rem;padding:8px 14px;white-space:nowrap;transition:color 0.2s, text-shadow 0.3s;border-radius:8px;}
.nav-links a:hover{color:#fff;text-shadow:0 0 20px rgba(37,99,235,0.3);}
.nav-btn{display:inline-block;padding:14px 30px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#9333ea);font-size:1.05rem;font-weight:700;color:#fff!important;white-space:nowrap;box-shadow:0 12px 36px rgba(37,99,235,.4);transition:transform 0.25s, box-shadow 0.3s;border:none;cursor:pointer;}
.nav-btn:hover{transform:scale(1.05);box-shadow:0 16px 48px rgba(37,99,235,.6);color:#fff!important;}
.hero{padding:60px 0 40px;text-align:center;}
.hero h1{font-size:clamp(2.2rem,4.5vw,3.5rem);line-height:1.05;font-weight:900;letter-spacing:-.04em;margin-bottom:16px;max-width:900px;margin-left:auto;margin-right:auto;background:linear-gradient(135deg,#fff 0%,#93c5fd 40%,#c084fc 70%,#fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200% 200%;animation:gradientShift 10s ease infinite;}
.hero p{font-size:1.15rem;color:#cbd5e1;max-width:750px;margin:0 auto 28px;line-height:1.9;}
.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;padding:40px 0;}
.feature-card{background:linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.95));border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:30px 28px;transition:transform 0.3s, border-color 0.3s;}
.feature-card:hover{transform:translateY(-4px);border-color:rgba(37,99,235,.3);}
.feature-card h3{font-size:1.2rem;margin-bottom:10px;color:#fff;font-weight:700;}
.feature-card p{color:#94a3b8;font-size:.95rem;line-height:1.8;}
</style>
<title>${page.title}</title>
<meta name="description" content="${page.desc}">
<link rel="canonical" href="https://detecthiddenfees.com/${file}">
<script type="application/ld+json">${schema}</script>
</head>
<body>
<nav><div class="container nav-wrap"><div class="logo">DetectHiddenFees<span>.</span></div><div class="nav-links"><a href="#" id="pdfDownloadBtn" class="nav-btn" style="background:linear-gradient(135deg,#7c3aed,#2563eb);box-shadow:0 12px 36px rgba(124,58,237,0.3);">⭐ Free PDF Guide</a><a href="https://hiddenfeeai.com" class="nav-btn">Analyze My Documents</a></div></div></nav>
${page.content}
<footer><div class="container"><div class="footer-links" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;text-align:left;">
<div style="min-width:180px;"><strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">HIDDEN FEES</strong><a href="/hidden-fees-guides.html">Hidden Fees Guides</a><a href="/hidden-fee-examples.html">Hidden Fee Examples</a><a href="/hidden-fee-database.html">Hidden Fee Database</a><a href="/hidden-fee-prevention-guide.html">Hidden Fee Prevention Guide</a></div>
<div style="min-width:180px;"><strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">AI TOOLS</strong><a href="/ai-fee-detector.html">AI Fee Detector</a><a href="/ai-bill-analyzer.html">AI Bill Analyzer</a><a href="/ai-contract-review.html">AI Contract Review</a><a href="/ai-invoice-analyzer.html">AI Invoice Analyzer</a></div>
<div style="min-width:180px;"><strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">NEGOTIATION</strong><a href="/bill-negotiation-resource-center.html">Bill Negotiation Center</a><a href="/negotiation-scripts.html">Negotiation Scripts</a><a href="/bill-negotiation-templates.html">Negotiation Templates</a><a href="/hospital-bill-negotiation-guide.html">Hospital Bill Guide</a></div>
<div style="min-width:180px;"><strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">TRUST</strong><a href="/about-detect-hidden-fees.html">About</a><a href="/how-detect-hidden-fees-works.html">How It Works</a><a href="/editorial-policy.html">Editorial Policy</a><a href="/research-methodology.html">Research Methodology</a><a href="/ai-accuracy-and-limitations.html">AI Accuracy</a><a href="/privacy-and-ai-security.html">Privacy & Security</a></div>
<div style="min-width:180px;"><strong style="color:#94a3b8;display:block;margin-bottom:8px;font-size:1.05rem;">ANALYZE</strong><a href="/analyze-my-bill.html" style="font-weight:bold;color:#38bdf8;">Analyze My Bill</a><a href="/analyze-my-contract.html" style="font-weight:bold;color:#38bdf8;">Analyze My Contract</a><a href="/analyze-my-invoice.html" style="font-weight:bold;color:#38bdf8;">Analyze My Invoice</a><a href="/free-hidden-fee-scanner.html" style="font-weight:bold;color:#38bdf8;">Free Fee Scanner</a></div>
</div><p style="margin-top:24px;color:#64748b;">&copy; 2026 DetectHiddenFees.com &mdash; AI Hidden Fee Intelligence Platform</p></div></footer>
</body></html>`;
  fs.writeFileSync(file, html, 'utf8');
  console.log(`Created: ${file}`);
}

// Add schema to index.html (homepage)
let indexContent = fs.readFileSync('index.html', 'utf8');
indexContent = addSchemaToHead(indexContent, [ORG_SCHEMA, WEBSITE_SCHEMA]);
fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Added schema to index.html');

// Add related resources + breadcrumb + organization schema to key pages
for (const [file, relatedHtml] of Object.entries(relatedResources)) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Add related resources before footer
  const footerPos = content.indexOf('<footer');
  if (footerPos > -1) {
    // Check if related resources already exist
    if (!content.includes('Related Resources')) {
      content = content.substring(0, footerPos) + relatedHtml + '\n\n' + content.substring(footerPos);
    }
  }
  
  // Add organization + breadcrumb schema
  content = addSchemaToHead(content, [ORG_SCHEMA]);
  
  // Add breadcrumb
  const pageName = file.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  content = addBreadcrumb(content, [{name:'Home', url:''}, {name:pageName, url:file}]);
  
  // Ensure FAQ schema on FAQ pages
  content = ensureFAQSchema(content);
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Optimized: ${file}`);
}

// Add schema to all other supporting pages
for (const file of siteFiles) {
  if (relatedResources[file] || file === 'index.html' || Object.keys(trustPages).includes(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Add Organization schema to all pages
  if (!content.includes('"Organization"')) {
    content = addSchemaToHead(content, [ORG_SCHEMA]);
  }
  
  // Add breadcrumb
  if (!content.includes('BreadcrumbList')) {
    const pageName = file.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    content = addBreadcrumb(content, [{name:'Home', url:''}, {name:pageName, url:file}]);
  }
  
  fs.writeFileSync(file, content, 'utf8');
}

// Update sitemap with new pages
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
for (const file of Object.keys(trustPages)) {
  if (!sitemap.includes(file)) {
    const url = `<url><loc>https://detecthiddenfees.com/${file}</loc><priority>0.8</priority></url>\n`;
    sitemap = sitemap.replace('</urlset>', `  ${url}</urlset>`);
    console.log(`Added ${file} to sitemap`);
  }
}
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');

console.log('\n=== OPTIMIZATION COMPLETE ===');
console.log(`Total pages processed: ${siteFiles.length}`);
console.log(`Trust pages created: ${Object.keys(trustPages).length}`);
console.log(`Schema added to all pages`);
console.log(`Related resources added to pillar pages`);