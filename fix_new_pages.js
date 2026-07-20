const fs = require('fs');

const template = fs.readFileSync('hidden-fees-guides.html', 'utf8');

// Extract head through </head>
const headEnd = template.indexOf('</head>');
const headSection = template.substring(0, headEnd + 7); // includes </head>

// Extract nav (starts at <body> and ends at </nav>)
const bodyStart = template.indexOf('<body');
const bodyOpenClose = template.indexOf('>', bodyStart);
const navEnd = template.indexOf('<!-- ===== HERO ===== -->');
const navSection = template.substring(bodyOpenClose + 1, navEnd).trim();

// Extract footer (from <footer> to end of footer)
const footerStart = template.indexOf('<footer');
const stickyCtaStart = template.indexOf('class="sticky-cta-bar"');
const footerEnd = template.indexOf('</footer>') + 9;
const footerSection = template.substring(footerStart, stickyCtaStart > -1 ? stickyCtaStart : footerEnd);

// Extract sticky CTA bar
let stickySection = '';
const stickyBarDiv = template.indexOf('<div class="sticky-cta-bar"');
if (stickyBarDiv > -1) {
  const scriptStart = template.indexOf('<script', stickyBarDiv);
  const scriptEnd = template.indexOf('</script>', stickyBarDiv);
  // Get sticky bar + script
  stickySection = template.substring(stickyBarDiv, scriptEnd + 9);
} else {
  // Fallback: get everything after footer
  stickySection = '';
}

const pagesToFix = [
  'ai-fee-detector.html',
  'free-hidden-fee-scanner.html', 
  'scan-my-invoice.html',
  'analyze-my-document.html',
  'hidden-fee-analysis-tool.html'
];

for (const page of pagesToFix) {
  if (!fs.existsSync(page)) {
    console.log(`${page} not found, skipping`);
    continue;
  }
  
  let content = fs.readFileSync(page, 'utf8');
  
  // Extract page-specific body content (between old <body> and old <footer)
  let pageContent = '';
  const bs = content.indexOf('<body');
  const fe = content.indexOf('<footer');
  if (bs > -1 && fe > -1) {
    const boc = content.indexOf('>', bs);
    pageContent = content.substring(boc + 1, fe).trim();
  }
  
  // Build the page using same template structure
  const newContent = headSection + '\n<body>\n\n<!-- ===== NAVIGATION ===== -->\n<nav>\n    <div class="container nav-wrap">\n        <div class="logo">\n            DetectHiddenFees<span>.</span>\n        </div>\n        <div class="nav-links">\n                <a href="#" id="pdfDownloadBtn" class="nav-btn" style="background:linear-gradient(135deg,#7c3aed,#2563eb);box-shadow:0 12px 36px rgba(124,58,237,0.3);">⭐ Free PDF Guide</a>\n                <a href="https://hiddenfeeai.com" class="nav-btn">Analyze My Documents</a>\n            </div>\n    </div>\n</nav>\n\n' + 
    pageContent + '\n\n' + 
    footerSection + '\n\n' + 
    stickySection + '\n\n' + 
    '</body>\n</html>';
  
  fs.writeFileSync(page, newContent, 'utf8');
  console.log(`Fixed: ${page}`);
}

console.log('Done.');