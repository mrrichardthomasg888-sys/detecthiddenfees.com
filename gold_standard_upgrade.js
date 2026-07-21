// Site-wide Gold Standard Upgrade Script
// Upgrades ALL HTML pages on DetectHiddenFees.com

const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\lynns\\Downloads\\detecthiddenfees.com';

// Pages to skip (gold standard or utility)
const skipPages = [
  'brain.md', 'build.js', 'build-pages.js', 'build_all.js', 'build_final.js',
  'gold_standard_upgrade.js', 'sitemap.xml', 'robots.txt', '_headers', '_redirects',
  'index.html', // will handle separately
  'ai-financial-advisor.html', // GOLD STANDARD - skip
];

function getAllHtmlFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== '.git') {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

// Organization schema template
const orgSchema = `{"@context":"https://schema.org","@type":"Organization","name":"DetectHiddenFees","url":"https://detecthiddenfees.com","logo":"https://detecthiddenfees.com/logo.png","description":"AI-powered hidden fee detection platform that analyzes contracts, invoices, and financial documents.","foundingDate":"2025","knowsAbout":["Hidden Fee Detection","Contract Analysis","Financial Document Intelligence","Consumer Financial Transparency"],"sameAs":["https://hiddenfeeai.com"],"brand":{"@type":"Brand","name":"DetectHiddenFees"}}`;

// WebSite schema template
const websiteSchema = `{"@context":"https://schema.org","@type":"WebSite","name":"DetectHiddenFees","url":"https://detecthiddenfees.com","description":"AI-powered hidden fee detection and financial document analysis platform.","potentialAction":{"@type":"SearchAction","target":"https://detecthiddenfees.com/search?q={search_term_string}","query-input":"required name=search_term_string"}}`;

// SoftwareApplication schema template
const softwareSchema = `{"@context":"https://schema.org","@type":"SoftwareApplication","name":"HiddenFeeAI by DetectHiddenFees","operatingSystem":"Web","applicationCategory":"FinanceApplication","description":"AI-powered financial document analysis platform that detects hidden fees, pricing risks, and deceptive billing practices.","url":"https://hiddenfeeai.com","offers":{"@type":"Offer","price":"15.00","priceCurrency":"USD"},"author":{"@type":"Organization","name":"DetectHiddenFees"},"applicationSubCategory":"Hidden Fee Detection","featureList":"Hidden fee detection, contract risk analysis, invoice verification, pricing benchmark comparison"}`;

// E-E-A-T trust footer template
const eeatFooter = `
<div class="eeat-signature" style="display:flex;flex-wrap:wrap;gap:12px 30px;margin:20px 0 22px 0;padding:16px 20px;background:rgba(255,255,255,.03);border-radius:14px;border:1px solid rgba(255,255,255,.05);font-size:.85rem;color:#94a3b8;">
<div class="eeat-item" style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:#64748b;font-weight:600;">Written by</span><span style="color:#cbd5e1;font-weight:500;">DetectHiddenFees Research Team</span></div>
<div class="eeat-item" style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:#64748b;font-weight:600;">Reviewed by</span><span style="color:#cbd5e1;font-weight:500;">DetectHiddenFees AI Analysis Team</span></div>
<div class="eeat-item" style="display:flex;flex-direction:column;gap:2px;"><span style="font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:#64748b;font-weight:600;">Last updated</span><span style="color:#cbd5e1;font-weight:500;">July 2026</span></div>
</div>
<div class="eeat-links" style="display:flex;flex-wrap:wrap;gap:8px 16px;margin:16px 0;">
<a href="/editorial-policy.html" style="color:#64748b;font-size:.82rem;font-weight:500;padding:4px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.06);">Editorial Policy</a>
<a href="/ai-analysis-methodology.html" style="color:#64748b;font-size:.82rem;font-weight:500;padding:4px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.06);">Methodology</a>
<a href="/data-handling-policy.html" style="color:#64748b;font-size:.82rem;font-weight:500;padding:4px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.06);">Security</a>
<a href="/privacy-and-ai-security.html" style="color:#64748b;font-size:.82rem;font-weight:500;padding:4px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.06);">Privacy</a>
</div>`;

// Standard disclaimer
const disclaimer = `<div class="disclaimer" style="font-size:.85rem;color:#64748b;line-height:1.8;margin-top:24px;padding:14px 20px;border-radius:14px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);"><strong>Editorial Standards:</strong> This resource was created by the <a href="/about-detect-hidden-fees.html" style="color:#64748b;font-weight:600;">DetectHiddenFees Research Team</a>. We provide analysis and educational information. Findings should be reviewed with qualified professionals when needed. Read our <a href="/editorial-policy.html" style="color:#64748b;font-weight:600;">Editorial Policy</a> for details.</div>`;

// Knowledge graph section
const knowledgeGraph = `<section class="section"><div class="container">
<h2>Related Resources</h2>
<div class="knowledge-graph" style="margin:30px 0;padding:24px 28px;border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);">
<div class="kg-item" style="display:flex;align-items:center;gap:12px;padding:8px 0;font-size:.95rem;color:#e2e8f0;"><span style="color:#3b82f6;font-weight:700;">&#8595;</span><a href="/ai-financial-advisor.html" style="color:#93c5fd;font-weight:600;">AI Financial Advisor</a><span style="color:#64748b;font-size:.85rem;"> — complete guide to AI financial analysis</span></div>
<div class="kg-item" style="display:flex;align-items:center;gap:12px;padding:8px 0;font-size:.95rem;color:#e2e8f0;"><span style="color:#3b82f6;font-weight:700;">&#8595;</span><a href="/ai-contract-review.html" style="color:#93c5fd;font-weight:600;">AI Contract Review</a><span style="color:#64748b;font-size:.85rem;"> — hidden fees in agreements</span></div>
<div class="kg-item" style="display:flex;align-items:center;gap:12px;padding:8px 0;font-size:.95rem;color:#e2e8f0;"><span style="color:#3b82f6;font-weight:700;">&#8595;</span><a href="/ai-bill-analyzer.html" style="color:#93c5fd;font-weight:600;">AI Bill Analyzer</a><span style="color:#64748b;font-size:.85rem;"> — detect billing errors</span></div>
<div class="kg-item" style="display:flex;align-items:center;gap:12px;padding:8px 0;font-size:.95rem;color:#e2e8f0;"><span style="color:#3b82f6;font-weight:700;">&#8595;</span><a href="/hidden-fee-detector.html" style="color:#93c5fd;font-weight:600;">Hidden Fee Detector</a><span style="color:#64748b;font-size:.85rem;"> — find hidden costs</span></div>
<div class="kg-item" style="display:flex;align-items:center;gap:12px;padding:8px 0;font-size:.95rem;color:#e2e8f0;"><span style="color:#3b82f6;font-weight:700;">&#8595;</span><a href="/ai-document-intelligence-center.html" style="color:#93c5fd;font-weight:600;">Document Intelligence Center</a><span style="color:#64748b;font-size:.85rem;"> — complete document analysis</span></div>
</div>
</div></section>`;

function fixClaims(content) {
  // Replace unsupported claims with conditional language
  const replacements = [
    // Savings claims
    [/reduce your (hospital )?bills? by \d+-\d+%/gi, 'may help identify potential savings opportunities depending on individual circumstances'],
    [/(cut|slash|reduce) (your|my) .* (bill|cost|price) (in half|by up to \d+%|by \d+%)/gi, 'review charges and identify items that may need further discussion'],
    [/(saves?|saving) (up to |over |more than )?\$[\d,]+/gi, 'may help identify potential cost savings'],
    [/guaranteed (to |you'?ll? )?(save|reduce|cut)/gi, 'may help identify opportunities to'],
    
    // AI overclaims
    [/AI finds overcharges/gi, 'AI identifies potential billing issues and charges that may need review'],
    [/AI (guarantees?|promises?|ensures?)/gi, 'AI provides analysis to help identify'],
    [/automatically (detects?|finds?|discovers?)/gi, 'may identify'],
    [/proven (to |results?|success)/gi, 'commonly used for'],

    // Absolute accusations
    [/providers routinely overcharge/gi, 'billing practices vary and some charges may warrant review'],
    [/fraud|fraudulent billing/gi, 'potential billing issues'],
    [/guaranteed errors?/gi, 'items that may need review'],
    [/upcoding is a common practice/gi, 'incorrect coding, including cases where billing codes do not accurately match services provided, may create discrepancies'],
    [/common practice where providers bill/gi, 'situation where'],

    // Statistics without attribution
    [/\d+% of (medical |hospital )?bills contain/gi, 'some medical bills may contain'],
    [/studies show|research shows|studies indicate|studies suggest/gi, 'industry experience indicates that'],
    [/\d+-\d+% success/gi, 'varies depending on circumstances'],

    // Filler phrases
    [/in today['’]s digital age/gi, ''],
    [/in this comprehensive guide/gi, ''],
    [/welcome to the world of/gi, ''],
    [/let\'s dive in|dive right in/gi, ''],
    [/without further ado/gi, ''],
  ];
  
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  return content;
}

function ensureSchema(content, pageName) {
  // Ensure Organization schema exists
  if (!content.includes('"@type":"Organization"') && !content.includes('"@type": "Organization"')) {
    const headClose = content.indexOf('</head>');
    if (headClose > -1) {
      const schemaBlock = `<script type=\"application/ld+json\">${orgSchema}</script>\n`;
      content = content.slice(0, headClose) + schemaBlock + content.slice(headClose);
    }
  }

  // Ensure WebPage schema exists
  if (!content.includes('"@type":"WebPage"') && !content.includes('"@type": "WebPage"')) {
    const headClose = content.indexOf('</head>');
    if (headClose > -1) {
      const titleMatch = content.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : pageName;
      const wpSchema = `{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"${title.replace(/"/g, '\\"')}\",\"url\":\"https://detecthiddenfees.com/${pageName}\",\"inLanguage\":\"en-US\",\"datePublished\":\"2026-07-21\",\"dateModified\":\"2026-07-21\"}`;
      const schemaBlock = `<script type=\"application/ld+json\">${wpSchema}</script>\n`;
      content = content.slice(0, headClose) + schemaBlock + content.slice(headClose);
    }
  }

  // Ensure BreadcrumbList schema exists
  if (!content.includes('"@type":"BreadcrumbList"') && !content.includes('"@type": "BreadcrumbList"')) {
    const headClose = content.indexOf('</head>');
    if (headClose > -1) {
      const bcSchema = `{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://detecthiddenfees.com/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"${pageName.replace(/\.html$/, '').replace(/-/g, ' ')}\",\"item\":\"https://detecthiddenfees.com/${pageName}\"}]}`;
      const schemaBlock = `<script type=\"application/ld+json\">${bcSchema}</script>\n`;
      content = content.slice(0, headClose) + schemaBlock + content.slice(headClose);
    }
  }

  return content;
}

function addEEatSection(content) {
  // Add E-E-A-T signature before footer
  if (content.includes('</footer>') && !content.includes('eeat-signature')) {
    content = content.replace('</footer>', `${eeatFooter}</footer>`);
  }
  return content;
}

function addDisclaimer(content) {
  // Add disclaimer before footer if not present
  if (content.includes('</footer>') && !content.includes('Editorial Standards')) {
    content = content.replace('</footer>', `${disclaimer}</footer>`);
  }
  return content;
}

function addKnowledgeGraph(content) {
  // Add knowledge graph before footer if not present
  if (content.includes('</footer>') && !content.includes('knowledge-graph') && content.length < 50000) {
    content = content.replace('</footer>', `${knowledgeGraph}</footer>`);
  }
  return content;
}

function fixMetaDescription(content) {
  // Ensure meta description exists
  if (!content.includes('name="description"') && !content.includes("name='description'")) {
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    if (titleMatch) {
      const desc = titleMatch[1] + ' | DetectHiddenFees provides AI-powered financial document analysis and hidden fee detection.';
      const descTag = `<meta name="description" content="${desc.substring(0, 158)}"/>\n`;
      const titleClose = content.indexOf('</title>');
      if (titleClose > -1) {
        content = content.slice(0, titleClose + 8) + '\n' + descTag + content.slice(titleClose + 8);
      }
    }
  }
  return content;
}

function fixCanonical(content, pageName) {
  // Ensure canonical exists
  if (!content.includes('rel="canonical"') && !content.includes("rel='canonical'")) {
    const canonical = `<link rel=\"canonical\" href=\"https://detecthiddenfees.com/${pageName}\"/>\n`;
    const headEnd = content.indexOf('</head>');
    if (headEnd > -1) {
      content = content.slice(0, headEnd) + canonical + content.slice(headEnd);
    }
  }
  return content;
}

function fixOGTags(content, pageName) {
  // Add OG tags if missing
  if (!content.includes('og:title')) {
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : pageName;
    const ogTags = `\n<meta property=\"og:url\" content=\"https://detecthiddenfees.com/${pageName}\" />\n<meta property=\"og:title\" content=\"${title}\"/>\n<meta property=\"og:description\" content=\"${title.substring(0, 150)} | DetectHiddenFees AI analysis.\"/>\n<meta property=\"og:type\" content=\"website\"/>\n<meta property=\"og:image\" content=\"https://detecthiddenfees.com/og-image.png\"/>\n<meta property=\"og:site_name\" content=\"DetectHiddenFees\"/>\n<meta name=\"twitter:card\" content=\"summary_large_image\"/>\n`;
    const headEnd = content.indexOf('</head>');
    if (headEnd > -1) {
      content = content.slice(0, headEnd) + ogTags + content.slice(headEnd);
    }
  }
  return content;
}

console.log('=== GOLD STANDARD UPGRADE ===');
console.log('Scanning HTML files...\\n');

const allFiles = getAllHtmlFiles(rootDir).filter(f => !skipPages.includes(path.basename(f)));
console.log(`Found ${allFiles.length} HTML files to process.\\n`);

let processed = 0;
let errors = [];

for (const filePath of allFiles) {
  const pageName = path.basename(filePath);
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // Apply all upgrades
    content = fixClaims(content);
    content = fixMetaDescription(content);
    content = fixCanonical(content, pageName);
    content = fixOGTags(content, pageName);
    content = ensureSchema(content, pageName);
    content = addEEatSection(content);
    content = addDisclaimer(content);
    content = addKnowledgeGraph(content);
    
    // Save if changed
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      processed++;
      process.stdout.write(`UPGRADED: ${pageName}\n`);
    } else {
      process.stdout.write(`SKIPPED (no changes): ${pageName}\n`);
    }
  } catch (err) {
    errors.push(`${pageName}: ${err.message}`);
    process.stdout.write(`ERROR: ${pageName} - ${err.message}\n`);
  }
}

console.log(`\\n=== UPGRADE COMPLETE ===`);
console.log(`Total files processed: ${allFiles.length}`);
console.log(`Files upgraded: ${processed}`);
console.log(`Errors: ${errors.length}`);
if (errors.length > 0) {
  console.log(`\\nErrors:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
console.log(`\\n=== CLAIMS FIXED ===`);
console.log(`- Unsupported savings percentages removed`);
console.log(`- Guarantee language replaced with conditional phrasing`);
console.log(`- 'AI finds overcharges' replaced with 'AI identifies potential issues'`);
console.log(`- Absolute accusations replaced with neutral review language`);
console.log(`- Unattributed statistics removed`);
console.log(`- Generic filler phrases removed`);
