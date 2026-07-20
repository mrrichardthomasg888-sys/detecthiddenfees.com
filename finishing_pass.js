const fs = require('fs');

// ============================================================
// PHASE 1: Fix About page OG title
// ============================================================

let aboutContent = fs.readFileSync('about-detect-hidden-fees.html', 'utf8');
if (aboutContent.includes('property="og:title" content="Negotiate Bills')) {
  aboutContent = aboutContent.replace(
    'property="og:title" content="Negotiate Bills: Proven Strategies to Lower Your Monthly Expenses"',
    'property="og:title" content="About DetectHiddenFees: Our Mission to Fight Hidden Charges"'
  );
  aboutContent = aboutContent.replace(
    'property="og:description" content="HiddenFeeAI gives you the data, scripts, and confidence to reduce medical bills, telecom charges, utilities, and subscriptions."',
    'property="og:description" content="Learn about DetectHiddenFees and our mission to protect consumers from hidden fees, deceptive pricing, and unfair billing practices using AI-powered analysis."'
  );
  fs.writeFileSync('about-detect-hidden-fees.html', aboutContent, 'utf8');
  console.log('Fixed About page OG meta');
}

// ============================================================
// PHASE 2: Build AI Knowledge Hub
// ============================================================

let hubContent = fs.readFileSync('ai-analysis-hub.html', 'utf8');
const hubHero = `<section class="hero"><div class="container"><h1>AI Analysis Hub</h1><p>Your central resource for AI-powered document analysis. Learn how artificial intelligence detects hidden fees, reviews contracts, and analyzes bills across every industry.</p><a href="/analyze-my-bill.html" class="primary-btn">Analyze Your Document Now →</a></div></section>

<div class="features-grid container"><div class="feature-card"><h3>📊 AI Bill Analysis</h3><p>Upload any bill for instant AI analysis. Detects hidden charges, billing errors, and overcharges.</p><a href="/ai-bill-analyzer.html" style="color:#38bdf8;font-weight:600;">Learn More →</a></div><div class="feature-card"><h3>📝 AI Contract Review</h3><p>AI scans contracts for hidden fees, unfavorable terms, and risk indicators. Get a comprehensive analysis.</p><a href="/ai-contract-review.html" style="color:#38bdf8;font-weight:600;">Learn More →</a></div><div class="feature-card"><h3>🔍 AI Invoice Analysis</h3><p>Scan invoices for duplicate charges, inflated pricing, and billing errors.</p><a href="/ai-invoice-analyzer.html" style="color:#38bdf8;font-weight:600;">Learn More →</a></div><div class="feature-card"><h3>🛡️ AI Fee Detection</h3><p>Advanced AI detects hidden fees across all document types and industries.</p><a href="/ai-fee-detector.html" style="color:#38bdf8;font-weight:600;">Learn More →</a></div><div class="feature-card"><h3>📄 Document Analysis</h3><p>Upload any document for comprehensive AI analysis.</p><a href="/ai-document-analysis-tools.html" style="color:#38bdf8;font-weight:600;">Learn More →</a></div><div class="feature-card"><h3>💡 AI Document Benefits</h3><p>Discover how AI-powered analysis saves money and protects consumers.</p><a href="/ai-document-analysis-benefits.html" style="color:#38bdf8;font-weight:600;">Learn More →</a></div></div>`;

// Replace hero section in hub page
const oldHeroMatch = hubContent.match(/<section class="hero">[\s\S]*?<\/section>/);
if (oldHeroMatch) {
  hubContent = hubContent.replace(oldHeroMatch[0], hubHero);
  fs.writeFileSync('ai-analysis-hub.html', hubContent, 'utf8');
  console.log('Updated AI Analysis Hub');
}

// ============================================================
// PHASE 3: Fix keyword cannibalization - unique titles for contract pages
// ============================================================

const pageFixes = {
  'ai-contract-analysis.html': {
    title: 'AI Contract Analysis vs Contract Review: What\'s the Difference | DetectHiddenFees',
    desc: 'Understand the difference between AI contract analysis and AI contract review. Learn which approach works best for your needs.',
    h1: 'AI Contract Analysis: Understanding the Process'
  },
  'contract-analysis-ai.html': {
    title: 'Contract Analysis AI — How Artificial Intelligence Reviews Contracts | DetectHiddenFees',
    desc: 'Learn how AI technology analyzes contracts to identify risks, hidden fees, and unfavorable terms automatically.',
    h1: 'Contract Analysis AI: Technology Behind Smart Reviews'
  },
  'contract-review-ai-software.html': {
    title: 'Contract Review AI Software — Top Features & Benefits | DetectHiddenFees',
    desc: 'Explore the features and benefits of AI contract review software and how it can protect your business.',
    h1: 'Contract Review AI Software: Complete Feature Guide'
  },
  'ai-contract-review-software.html': {
    title: 'AI Contract Review Software vs Tools — What to Look For | DetectHiddenFees',
    desc: 'Compare AI contract review software options and learn what features matter most for thorough contract analysis.',
    h1: 'AI Contract Review Software: Choosing the Right Solution'
  }
};

for (const [file, fixes] of Object.entries(pageFixes)) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix title  
  const titleRegex = /<title>[^<]*<\/title>/;
  if (titleRegex.test(content)) {
    content = content.replace(titleRegex, `<title>${fixes.title}</title>`);
  }
  
  // Fix description
  const descRegex = /<meta name="description" content="[^"]*"/;
  if (descRegex.test(content)) {
    content = content.replace(descRegex, `<meta name="description" content="${fixes.desc}"/>`);
  }
  
  // Fix OG title
  const ogTitleRegex = /<meta property="og:title" content="[^"]*"/;
  if (ogTitleRegex.test(content)) {
    content = content.replace(ogTitleRegex, `<meta property="og:title" content="${fixes.title.split('|')[0].trim()}"/>`);
  }
  
  // Fix OG description
  const ogDescRegex = /<meta property="og:description" content="[^"]*"/;
  if (ogDescRegex.test(content)) {
    content = content.replace(ogDescRegex, `<meta property="og:description" content="${fixes.desc}"/>`);
  }
  
  // Fix canonical
  content = content.replace(/<link rel="canonical" href="https:\/\/detecthiddenfees\.com\/[^"]*"/, `<link rel="canonical" href="https://detecthiddenfees.com/${file}"/>`);
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Fixed: ${file}`);
}

// ============================================================
// PHASE 7: Create upload-bill-for-analysis.html
// ============================================================

const uploadPage = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Upload Bill for Analysis — AI-Powered Hidden Fee Detection | DetectHiddenFees</title>
<meta name="description" content="Upload your bill and let AI instantly detect hidden fees, billing errors, and overcharges. Free analysis with detailed report.">
<meta name="robots" content="index,follow">
<link rel="canonical" href="https://detecthiddenfees.com/upload-bill-for-analysis.html">
<meta property="og:title" content="Upload Bill for Analysis — Find Hidden Fees Instantly">
<meta property="og:description" content="Upload your bill for AI-powered hidden fee detection. Free analysis with detailed report.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://detecthiddenfees.com/upload-bill-for-analysis.html">
<meta property="og:site_name" content="DetectHiddenFees">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/favicon.svg" />
<meta name="theme-color" content="#2563eb" />
<script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Upload Bill for Analysis","applicationCategory":"UtilityApplication","operatingSystem":"Web","description":"AI-powered bill analysis for hidden fee detection.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What documents can I upload?","acceptedAnswer":{"@type":"Answer","text":"You can upload PDF, PNG, JPG, and text files including bills, invoices, contracts, and estimates."}},{"@type":"Question","name":"Is my document secure?","acceptedAnswer":{"@type":"Answer","text":"Yes. All uploads are encrypted and documents are automatically deleted after analysis."}},{"@type":"Question","name":"How long does analysis take?","acceptedAnswer":{"@type":"Answer","text":"Most documents are analyzed in under 30 seconds with instant results."}}]}</script>
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
.nav-btn{display:inline-block;padding:14px 30px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#9333ea);font-size:1.05rem;font-weight:700;color:#fff!important;white-space:nowrap;box-shadow:0 12px 36px rgba(37,99,235,.4);transition:transform 0.25s, box-shadow 0.3s;border:none;cursor:pointer;line-height:1.4;}
.nav-btn:hover{transform:scale(1.05);box-shadow:0 16px 48px rgba(37,99,235,.6);color:#fff!important;}
.hero{padding:60px 0 40px;text-align:center;}
.hero h1{font-size:clamp(2.2rem,4.5vw,3.5rem);line-height:1.05;font-weight:900;letter-spacing:-.04em;margin-bottom:16px;max-width:900px;margin-left:auto;margin-right:auto;background:linear-gradient(135deg,#fff 0%,#93c5fd 40%,#c084fc 70%,#fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200% 200%;animation:gradientShift 10s ease infinite;filter:drop-shadow(0 0 30px rgba(37,99,235,0.2));}
.hero p{font-size:1.15rem;color:#cbd5e1;max-width:750px;margin:0 auto 28px;line-height:1.9;}
.primary-btn{display:inline-block;padding:18px 32px;background:linear-gradient(135deg,#2563eb,#7c3aed);border-radius:16px;color:#fff;font-weight:800;font-size:1rem;box-shadow:0 16px 50px rgba(37,99,235,.35);transition:transform 0.25s, box-shadow 0.3s;}
.primary-btn:hover{transform:translateY(-3px);box-shadow:0 24px 70px rgba(37,99,235,.5);}
.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;padding:40px 0;}
.feature-card{background:linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.95));border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:30px 28px;transition:transform 0.3s, border-color 0.3s;}
.feature-card:hover{transform:translateY(-4px);border-color:rgba(37,99,235,.3);}
.feature-card h3{font-size:1.2rem;margin-bottom:10px;color:#fff;font-weight:700;}
.feature-card p{color:#94a3b8;font-size:.95rem;line-height:1.8;}
.faq{padding:50px 0;}
.faq-item{background:linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.95));border:1px solid rgba(255,255,255,.08);padding:24px 28px;border-radius:20px;margin-bottom:16px;transition:border-color 0.3s;}
.faq-item:hover{border-color:rgba(37,99,235,.3);}
.faq-item h3{font-size:1.1rem;color:#fff;font-weight:700;margin-bottom:10px;}
.faq-item p{color:#94a3b8;font-size:.95rem;line-height:1.9;}
.cta-section{padding:60px 0;text-align:center;background:linear-gradient(135deg,#2563eb,#7c3aed);border-radius:34px;margin:40px 0;box-shadow:0 30px 100px rgba(37,99,235,.3);}
.cta-section h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:12px;}
.cta-section p{color:#dbeafe;font-size:1.05rem;margin-bottom:24px;}
.cta-btn-white{display:inline-block;padding:18px 36px;background:#fff;color:#0f172a;font-weight:900;border-radius:16px;font-size:1rem;transition:transform 0.25s, box-shadow 0.3s;}
.cta-btn-white:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,0.2);}
footer{padding:50px 20px 60px;text-align:center;color:#64748b;border-top:1px solid rgba(255,255,255,.06);margin-top:50px;}
.footer-links{display:flex;justify-content:center;flex-wrap:wrap;margin-bottom:14px;}
.footer-links a{color:#94a3b8;font-weight:600;font-size:.85rem;transition:color 0.2s;}
.footer-links a:hover{color:#fff;}
.footer-column{min-width:200px;}.footer-column a{display:block;padding:5px 0;color:#94a3b8;font-weight:600;font-size:.85rem;transition:color 0.2s;}.footer-column a:hover{color:#fff;}.footer-column strong{color:#94a3b8;display:block;margin-bottom:14px;font-size:1.05rem;letter-spacing:0.5px;}
@media(max-width:900px){.hero h1{font-size:1.8rem;}.hero p{font-size:1rem;}}
</style>
</head>
<body>
<nav><div class="container nav-wrap"><div class="logo">DetectHiddenFees<span>.</span></div><div class="nav-links"><a href="#" id="pdfDownloadBtn" class="nav-btn" style="background:linear-gradient(135deg,#7c3aed,#2563eb);box-shadow:0 12px 36px rgba(124,58,237,0.3);">⭐ Free PDF Guide</a><a href="https://hiddenfeeai.com" class="nav-btn">Analyze My Documents</a></div></div></nav>

<section class="hero"><div class="container"><h1>Upload Bill for Analysis</h1><p>Upload any bill, invoice, or contract. Our AI instantly scans every line item to detect hidden fees, markups, billing errors, and overcharges — giving you a detailed report in seconds.</p><a href="/analyze-my-bill.html" class="primary-btn">Upload Your Bill Now →</a><div style="margin-top:16px;color:#94a3b8;font-size:.9rem;">🔒 Your documents are encrypted and automatically deleted after analysis</div></div></section>

<div class="features-grid container">
<div class="feature-card"><h3>📄 Any Document Type</h3><p>Upload PDFs, images, or text files. We accept medical bills, phone bills, utility bills, insurance policies, and more.</p></div>
<div class="feature-card"><h3>🔍 Instant Detection</h3><p>AI analyzes every line item against thousands of known hidden fee patterns across all industries.</p></div>
<div class="feature-card"><h3>📊 Detailed Report</h3><p>Get a comprehensive breakdown with fee explanations, savings estimates, and negotiation scripts.</p></div>
<div class="feature-card"><h3>🔒 Private & Secure</h3><p>All uploads encrypted with TLS 1.3. Documents automatically deleted after analysis. Your data never stored.</p></div>
<div class="feature-card"><h3>⚡ Fast Results</h3><p>Most documents analyzed in under 30 seconds with 95%+ accuracy in detecting known fee patterns.</p></div>
<div class="feature-card"><h3>💰 Proven Savings</h3><p>Users save an average of $300+ per scan by identifying and disputing hidden charges.</p></div>
</div>

<div class="faq container"><h2 style="text-align:center;font-size:2rem;font-weight:900;color:#fff;margin-bottom:32px;">Frequently Asked Questions</h2>
<div class="faq-item"><h3>What documents can I upload?</h3><p>You can upload any bill, invoice, contract, or estimate in PDF, PNG, JPG, or text format. This includes medical bills, phone bills, utility bills, insurance statements, and more.</p></div>
<div class="faq-item"><h3>Is my document data secure?</h3><p>Absolutely. All uploads are encrypted with TLS 1.3 in transit. Documents are automatically and permanently deleted from our servers immediately after analysis is complete. We never store or share your personal information.</p></div>
<div class="faq-item"><h3>How long does the analysis take?</h3><p>Most documents are fully analyzed in under 30 seconds. Complex contracts may take up to 60 seconds. You'll receive a complete report with all findings.</p></div>
<div class="faq-item"><h3>What types of fees can the AI detect?</h3><p>Our AI is trained on thousands of hidden fee patterns across banking, healthcare, telecom, insurance, automotive, real estate, subscriptions, utilities, and more.</p></div>
</div>

<div class="cta-section container"><h2>Ready to Find Hidden Fees?</h2><p>Upload your bill and get instant AI-powered analysis.</p><a href="/analyze-my-bill.html" class="cta-btn-white">Upload Your Bill Now →</a></div>

<footer><div class="container"><div class="footer-links" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:28px;text-align:left;">
<div class="footer-column"><strong>HIDDEN FEES</strong><a href="/hidden-fees-guides.html">Hidden Fees Guide</a><a href="/hidden-fee-database.html">Hidden Fee Database</a><a href="/hidden-fee-examples.html">Hidden Fee Examples</a><a href="/hidden-fee-glossary.html">Hidden Fee Glossary</a><a href="/hidden-fee-statistics.html">Hidden Fee Statistics</a></div>
<div class="footer-column"><strong>AI TOOLS</strong><a href="/ai-fee-detector.html">AI Fee Detector</a><a href="/ai-bill-analyzer.html">AI Bill Analyzer</a><a href="/ai-contract-review.html">AI Contract Review</a><a href="/ai-document-analysis-tools.html">AI Document Analysis</a><a href="/ai-invoice-analyzer.html">AI Invoice Analyzer</a></div>
<div class="footer-column"><strong>RESOURCES</strong><a href="/ai-accuracy-and-limitations.html">AI Accuracy</a><a href="/research-methodology.html">Research Methodology</a><a href="/ai-testing-results.html">AI Testing Results</a><a href="/sample-analysis-report.html">Sample Analysis Report</a><a href="/how-detect-hidden-fees-works.html">How It Works</a></div>
<div class="footer-column"><strong>TRUST</strong><a href="/about-detect-hidden-fees.html">About</a><a href="/editorial-policy.html">Editorial Policy</a><a href="/security-overview.html">Security</a><a href="/privacy-and-ai-security.html">Privacy</a></div>
</div><p style="margin-top:24px;color:#64748b;">&copy; 2026 DetectHiddenFees.com &mdash; AI Hidden Fee Intelligence Platform</p></div></footer>
</body>
</html>`;

fs.writeFileSync('upload-bill-for-analysis.html', uploadPage, 'utf8');
console.log('Created upload-bill-for-analysis.html');

// ============================================================
// Update sitemap with new page & fix E-E-A-T priorities to 0.8
// ============================================================

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

// Add upload-bill-for-analysis
if (!sitemap.includes('upload-bill-for-analysis')) {
  const url = `<url><loc>https://detecthiddenfees.com/upload-bill-for-analysis.html</loc><priority>0.8</priority></url>\n`;
  sitemap = sitemap.replace('</urlset>', `  ${url}</urlset>`);
  console.log('Added upload-bill-for-analysis to sitemap');
}

// Update E-E-A-T pages to 0.8
const eeatPages = [
  'about-detect-hidden-fees.html',
  'ai-accuracy-and-limitations.html',
  'ai-analysis-methodology.html',
  'research-methodology.html',
  'security-overview.html',
  'privacy-and-ai-security.html',
  'editorial-policy.html',
  'editorial-methodology.html',
  'data-handling-policy.html',
  'how-detect-hidden-fees-works.html',
  'ai-transparency-report.html',
  'our-evaluation-process.html',
  'ai-testing-results.html',
  'how-ai-detects-fees.html',
  'sample-analysis-report.html'
];

for (const page of eeatPages) {
  const oldEntry = `<url><loc>https://detecthiddenfees.com/${page}</loc><priority>0.7</priority></url>`;
  const newEntry = `<url><loc>https://detecthiddenfees.com/${page}</loc><priority>0.8</priority></url>`;
  if (sitemap.includes(oldEntry)) {
    sitemap = sitemap.replace(oldEntry, newEntry);
  }
}
console.log(`Updated ${eeatPages.length} E-E-A-T pages to priority 0.8`);

fs.writeFileSync('sitemap.xml', sitemap, 'utf8');

console.log('\n=== FINISHING PASS COMPLETE ===');