#!/usr/bin/env node
/**
 * DetectHiddenFees.com — Massive Site Authority Upgrade
 * Audits + upgrades ALL pages to match AI Financial Advisor standard
 * Usage: node upgrade_site.js          (audit + dry run)
 *        node upgrade_site.js --apply   (live upgrade)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const REPORT_FILE = path.join(ROOT, 'site_authority_upgrade_report.md');

const SKIP_PAGES = new Set([
    '_source_copy.html', '_test123.html', 'test_check.html', 'test_long.html',
    'test_mini.html', 'test_out.html', 'out0.html', 'out1.html', 'part1.html',
    'header.html', 'headpart.html', 'indexnow-submit.html', 'hdr.html',
    'final.html', 'term-items.html', 'alphabet-links.html'
]);

const ALREADY_DONE = new Set([
    'ai-financial-advisor.html',
    'ai-contract-review.html',
    'ai-construction-contract-review.html'
]);

function hasOrgSchema(html) {
    return html.includes('"Organization"') && html.includes('"DetectHiddenFees"');
}

function hasWebPageSchema(html) {
    return html.includes('"WebPage"');
}

function hasBreadcrumbSchema(html) {
    return html.includes('"BreadcrumbList"');
}

function hasFaqSchema(html) {
    return html.includes('"FAQPage"');
}

function hasArticleSchema(html) {
    return html.includes('"Article"') && html.includes('"headline"');
}

function hasSoftwareSchema(html) {
    return html.includes('"SoftwareApplication"');
}

function hasCanonical(html, page) {
    const urlPattern = new RegExp(`href="https://detecthiddenfees\\.com/${escapeRegex(page)}"`);
    return urlPattern.test(html);
}

function hasOgTags(html) {
    return html.includes('og:title') && html.includes('og:description') && html.includes('og:url');
}

function hasTwitterCard(html) {
    return html.includes('twitter:card') && html.includes('twitter:title');
}

function hasFaqContent(html) {
    return /<h[23][^>]*>.*FAQ|Frequently Asked|Common Questions/i.test(html);
}

function hasQuickAnswers(html) {
    const patterns = [
        /What\s+is\s+(an\s+)?/i,
        /How\s+(does|can|to)\s+/i,
        /Can\s+AI\s+/i,
        /Why\s+(does|would|should)/i
    ];
    let matches = 0;
    for (const p of patterns) {
        if (p.test(html)) matches++;
    }
    return matches >= 2;
}

function hasRealExamples(html) {
    return /\$\d[\d,]*/.test(html) && /(example|scenario|case\s+study|real-?world)/i.test(html);
}

function hasMethodology(html) {
    return /(methodology|how\s+we\s+analyz|our\s+process|detecthiddenfees\s+(framework|method))/i.test(html);
}

function hasInternalLinks(html) {
    const matches = html.match(/href="\/[\w-]+\.html"/g);
    return matches ? matches.length : 0;
}

function hasCtaUpload(html) {
    return /(Upload|Analyze|Review)\s+(My|Your)\s+(Document|Bill|Contract|Invoice|File)/i.test(html);
}

function hasStickyCta(html) {
    return html.includes('sticky-cta-bar');
}

function hasDisclaimer(html) {
    return /(Disclaimer|not\s+(a\s+)?(lawyer|attorney|legal|financial|professional))/i.test(html);
}

function hasPreloads(html) {
    return html.includes('rel="preload"') && html.includes('fonts.googleapis.com') && html.includes('Inter');
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function estimateWordCount(html) {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!bodyMatch) return 0;
    const text = bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.split(' ').filter(w => w.length > 0).length;
}

function auditPage(filePath, pageName) {
    try {
        const html = fs.readFileSync(filePath, 'utf8');
        
        const result = {
            page: pageName,
            sizeKb: Math.round(html.length / 1024 * 10) / 10,
            wordCount: estimateWordCount(html),
            issues: [],
            passed: [],
            schema: {},
            score: 0,
            maxScore: 20
        };
        
        const schemaChecks = [
            ['org_schema', 'Organization schema', hasOrgSchema(html)],
            ['webpage_schema', 'WebPage schema', hasWebPageSchema(html)],
            ['breadcrumb_schema', 'BreadcrumbList schema', hasBreadcrumbSchema(html)],
            ['faq_schema', 'FAQ schema', hasFaqSchema(html)],
            ['article_schema', 'Article schema', hasArticleSchema(html)],
            ['software_schema', 'SoftwareApplication schema', hasSoftwareSchema(html)]
        ];
        
        for (const [key, name, passed] of schemaChecks) {
            result.schema[key] = passed;
            if (passed) {
                result.passed.push(name);
                result.score++;
            } else {
                result.issues.push('Missing: ' + name);
            }
        }
        
        const contentChecks = [
            ['canonical', 'Canonical URL', hasCanonical(html, pageName)],
            ['og_tags', 'Open Graph tags', hasOgTags(html)],
            ['twitter_card', 'Twitter Card tags', hasTwitterCard(html)],
            ['faq_content', 'FAQ section', hasFaqContent(html)],
            ['quick_answers', 'Quick answer blocks (AI retrieval optimized)', hasQuickAnswers(html)],
            ['real_examples', 'Real-world examples with $ amounts', hasRealExamples(html)],
            ['methodology', 'Methodology/framework section', hasMethodology(html)],
            ['internal_links', `Internal links (${hasInternalLinks(html)})`, hasInternalLinks(html) >= 3],
            ['cta_upload', 'Upload/Analyze CTA', hasCtaUpload(html)],
            ['sticky_cta', 'Sticky CTA bar', hasStickyCta(html)],
            ['disclaimer', 'Legal/financial disclaimer', hasDisclaimer(html)],
            ['preloads', 'Font preloading', hasPreloads(html)]
        ];
        
        for (const [key, name, passed] of contentChecks) {
            if (passed) {
                result.passed.push(name);
                result.score++;
            } else {
                result.issues.push('Missing: ' + name);
            }
        }
        
        result.internalLinkCount = hasInternalLinks(html);
        result.hasNavigation = html.includes('<nav') || html.includes('nav-wrap') || html.includes('nav-links');
        result.hasFooter = html.includes('<footer') || html.includes('footer-links');
        
        return result;
    } catch (e) {
        return null;
    }
}

function getPriorityPages() {
    return [
        // Tier 1: Core topic cluster (7 pages)
        'ai-financial-analysis.html', 'ai-agreement-analyzer.html', 'ai-bill-analyzer.html',
        'ai-invoice-analyzer.html', 'hidden-fee-detector.html', 'ai-document-intelligence-center.html',
        'ai-analysis-hub.html',
        // Tier 2: Secondary authority (18 pages)
        'index.html', 'hidden-fees-guides.html', 'hidden-fees-resource-center.html',
        'ai-contract-review-tool.html', 'ai-contract-review-software.html',
        'ai-bill-checker.html', 'ai-invoice-checker.html', 'ai-document-checker.html',
        'ai-document-reviewer.html', 'ai-document-scanner.html', 'ai-fee-detector.html',
        'contract-analysis-ai.html', 'ai-contract-analysis.html',
        'bill-negotiation-service.html', 'bill-negotiation-resource-center.html',
        'consumer-financial-intelligence-center.html', 'ai-pricing-analysis.html', 'ai-financial-assistant.html',
        // Tier 3: Industry fee guides (20 pages)
        'hidden-bank-overdraft-fees.html', 'hidden-dealership-financing-fees.html',
        'duplicate-medical-billing-charges.html', 'hidden-home-renovation-fees.html',
        'hidden-hvac-contractor-fees.html', 'hidden-mortgage-fees.html', 'hidden-credit-card-fees.html',
        'hidden-subscription-fees.html', 'hidden-phone-bill-fees.html', 'hidden-streaming-fees.html',
        'hidden-loan-fees.html', 'hidden-investment-fees.html', 'hidden-internet-fees.html',
        'hidden-roofing-contractor-fees.html', 'hidden-plumbing-fees.html', 'hidden-electrician-fees.html',
        'hidden-landscaping-fees.html', 'hidden-moving-company-fees.html', 'hidden-billing-fees.html',
        'hidden-contract-fees.html'
    ];
}

function upgradePage(pageName, dryRun) {
    const filePath = path.join(ROOT, pageName);
    let html = fs.readFileSync(filePath, 'utf8');
    const changes = [];
    
    if (ALREADY_DONE.has(pageName)) return 'ALREADY_DONE';
    
    // 1. Fix canonical URL
    const canonicalRegex = /<link\s+rel="canonical"\s+href="https:\/\/detecthiddenfees\.com\/[^"]*\.html\/?"/;
    const canonicalMatch = html.match(canonicalRegex);
    if (canonicalMatch) {
        if (canonicalMatch[0].endsWith('/"')) {
            html = html.replace(canonicalMatch[0], canonicalMatch[0].slice(0, -2) + '"');
            changes.push('Fixed canonical URL - removed trailing slash');
        }
    } else {
        const newLink = `<link rel="canonical" href="https://detecthiddenfees.com/${pageName}"/>`;
        if (html.includes('<meta name="robots"')) {
            html = html.replace(/(<meta name="robots".*?\/>)/, '$1\n' + newLink);
        } else {
            html = html.replace('</head>', '  ' + newLink + '\n</head>');
        }
        changes.push('Added canonical URL');
    }
    
    // 2. Organization schema
    if (!hasOrgSchema(html)) {
        const orgSchema = `<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DetectHiddenFees",
    "url": "https://detecthiddenfees.com",
    "logo": "https://detecthiddenfees.com/logo.png",
    "description": "AI-powered hidden fee detection platform that analyzes contracts, invoices, and financial documents for hidden costs and deceptive billing practices.",
    "foundingDate": "2025",
    "knowsAbout": ["AI Financial Advisor","Hidden Fee Detection","Financial Document Intelligence","AI Contract Analysis","AI Bill Analysis","Consumer Financial Transparency"],
    "sameAs": ["https://hiddenfeeai.com"],
    "brand": { "@type": "Brand", "name": "DetectHiddenFees" }
}
</script>`;
        html = html.replace('</head>', orgSchema + '\n</head>');
        changes.push('Added Organization schema');
    }
    
    // 3. WebPage schema
    if (!hasWebPageSchema(html)) {
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : pageName;
        const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
        const desc = descMatch ? descMatch[1] : title;
        const now = new Date().toISOString().split('T')[0];
        const safeTitle = title.replace(/"/g, '\\"');
        const safeDesc = desc.replace(/"/g, '\\"');
        const webPageSchema = `<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${safeTitle}",
    "description": "${safeDesc}",
    "url": "https://detecthiddenfees.com/${pageName}",
    "inLanguage": "en-US",
    "datePublished": "2026-07-21",
    "dateModified": "${now}",
    "about": { "@type": "Thing", "name": "${safeTitle}" },
    "isPartOf": { "@type": "WebSite", "name": "DetectHiddenFees", "url": "https://detecthiddenfees.com" }
}
</script>`;
        html = html.replace('</head>', webPageSchema + '\n</head>');
        changes.push('Added WebPage schema');
    }
    
    // 4. BreadcrumbList schema
    if (!hasBreadcrumbSchema(html)) {
        const bcName = pageName.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        const bcSchema = `<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://detecthiddenfees.com/" },
        { "@type": "ListItem", "position": 2, "name": "${bcName}", "item": "https://detecthiddenfees.com/${pageName}" }
    ]
}
</script>`;
        html = html.replace('</head>', bcSchema + '\n</head>');
        changes.push('Added BreadcrumbList schema');
    }
    
    // 5. Open Graph
    if (!hasOgTags(html)) {
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : pageName;
        const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
        const desc = descMatch ? descMatch[1] : title;
        const safeTitle = title.replace(/"/g, '"');
        const safeDesc = desc.replace(/"/g, '"');
        const ogTags = `
<meta property="og:title" content="${safeTitle}">
<meta property="og:description" content="${safeDesc}">
<meta property="og:url" content="https://detecthiddenfees.com/${pageName}">
<meta property="og:type" content="website">
<meta property="og:image" content="https://detecthiddenfees.com/og-image.png">
<meta property="og:site_name" content="DetectHiddenFees">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:description" content="${safeDesc}">
<meta name="twitter:image" content="https://detecthiddenfees.com/og-image.png">`;
        html = html.replace('</head>', ogTags + '\n</head>');
        changes.push('Added OG + Twitter Card tags');
    }
    
    // 6. Font preloads
    if (!html.includes('rel="preload"')) {
        const preloads = `<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" />
<link rel="preload" href="/favicon.svg" as="image" />`;
        html = html.replace('<title>', preloads + '\n<title>');
        changes.push('Added font preloads');
    }
    
    // 7. Favicon
    if (!html.includes('favicon.svg')) {
        const favicon = '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n<link rel="alternate icon" href="/favicon.svg" />\n<link rel="apple-touch-icon" href="/favicon.svg" />';
        html = html.replace('</head>', favicon + '\n</head>');
        changes.push('Added favicon');
    }
    
    // 8. Preconnect fonts - check specifically for gstatic preconnect
    if (!html.includes('fonts.gstatic.com" crossorigin') && !html.includes("fonts.gstatic.com' crossorigin")) {
        const preconnect = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;
        html = html.replace('</head>', preconnect + '\n</head>');
        changes.push('Added font preconnect');
    }
    
    // 9. dns-prefetch
    if (!html.includes('dns-prefetch') && !html.includes('hiddenfeeai.com')) {
        html = html.replace('</head>', '<link rel="dns-prefetch" href="https://hiddenfeeai.com" />\n</head>');
        changes.push('Added dns-prefetch for hiddenfeeai.com');
    }
    
    // 10. theme-color
    if (!html.includes('theme-color')) {
        html = html.replace('</head>', '<meta name="theme-color" content="#2563eb" />\n</head>');
        changes.push('Added theme-color');
    }
    
    // 11. Sticky CTA
    if (!html.includes('sticky-cta-bar') && html.includes('<body')) {
        let item = 'Document';
        if (pageName.includes('bill')) item = 'Bill';
        else if (pageName.includes('invoice')) item = 'Invoice';
        else if (pageName.includes('contract')) item = 'Contract';
        else if (pageName.includes('fee')) item = 'Document';
        
        const stickyCta = `
<div class="sticky-cta-bar">
    <div class="sticky-text"><span>🔍 Analyze Your ${item}</span><span class="price">$15</span></div>
    <a href="https://hiddenfeeai.com" class="sticky-btn">Analyze Now</a>
</div>

<style>
.sticky-cta-bar { display:none; position:fixed; bottom:0; left:0; right:0; z-index:1000; background:rgba(2,8,23,.95); backdrop-filter:blur(24px) saturate(1.4); padding:12px 20px; border-top:1px solid rgba(59,130,246,0.15); align-items:center; justify-content:space-between; gap:16px; box-shadow:0 -10px 40px rgba(0,0,0,0.6); }
.sticky-cta-bar .sticky-text { font-weight:700; font-size:.95rem; color:#e2e8f0; white-space:nowrap; display:flex; align-items:center; gap:12px; }
.sticky-cta-bar .sticky-text .price { color:#3b82f6; background:rgba(59,130,246,.15); padding:2px 12px; border-radius:100px; font-size:.85rem; }
.sticky-cta-bar .sticky-btn { display:inline-block; padding:12px 28px; border-radius:14px; background:linear-gradient(135deg,#2563eb,#9333ea); color:white; font-weight:800; font-size:.95rem; box-shadow:0 8px 30px rgba(59,130,246,.35); text-align:center; border:none; cursor:pointer; transition:transform 0.2s; }
.sticky-cta-bar .sticky-btn:hover { transform:scale(1.03); }
@media(min-width:901px){ .sticky-cta-bar { display:flex; } body { padding-bottom:80px; } }
@media(max-width:900px){ .sticky-cta-bar { display:flex; padding:6px 10px; gap:6px; } .sticky-cta-bar .sticky-btn { padding:6px 12px; font-size:.75rem; min-height:34px; border-radius:10px; } .sticky-cta-bar .sticky-text { font-size:.7rem; gap:4px; } body { padding-bottom:52px; } }
</style>`;
        html = html.replace('</body>', stickyCta + '\n</body>');
        changes.push('Added sticky CTA bar');
    }
    
    if (!dryRun && changes.length > 0) {
        fs.writeFileSync(filePath, html, 'utf8');
        const changeStr = changes.slice(0, 5).join(', ');
        return `UPGRADED: ${changes.length} changes — ${changeStr}${changes.length > 5 ? '...' : ''}`;
    } else if (changes.length > 0) {
        const changeStr = changes.slice(0, 3).join(', ');
        return `DRY_RUN: ${changes.length} changes — ${changeStr}${changes.length > 3 ? '...' : ''}`;
    } else {
        return 'ALREADY_GOOD';
    }
}

function main() {
    const startTime = Date.now();
    const isApply = process.argv.includes('--apply');
    
    console.log('='.repeat(70));
    console.log(isApply ? 'LIVE MODE: Applying upgrades...' : 'DRY RUN MODE: Auditing...');
    console.log('='.repeat(70));
    
    const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !SKIP_PAGES.has(f));
    const allResults = [];
    const priorityResults = [];
    const priorityPages = getPriorityPages();
    
    console.log(`\nScanning ${files.length} HTML pages...`);
    
    for (const fname of files) {
        const fpath = path.join(ROOT, fname);
        const audit = auditPage(fpath, fname);
        if (!audit) continue;
        allResults.push(audit);
        if (priorityPages.includes(fname)) {
            priorityResults.push(audit);
        }
    }
    
    const total = allResults.length;
    const totalScore = allResults.reduce((s, r) => s + r.score, 0);
    const avgScore = total > 0 ? (totalScore / total) : 0;
    const totalWords = allResults.reduce((s, r) => s + r.wordCount, 0);
    const avgWords = total > 0 ? Math.round(totalWords / total) : 0;
    
    const needsUpgradeAll = allResults.filter(r => r.score < 14);
    
    console.log(`\nAudited: ${total} pages`);
    console.log(`Avg authority score: ${avgScore.toFixed(1)}/20`);
    console.log(`Avg word count: ${avgWords}`);
    console.log(`Pages needing upgrade: ${needsUpgradeAll.length}`);
    
    // Phase 2: Upgrade
    console.log('\n' + '='.repeat(70));
    console.log(isApply ? 'APPLYING UPGRADES:' : 'DRY RUN UPGRADE:');
    console.log('='.repeat(70));
    
    const upgradeResults = {};
    const upgradeTargets = isApply
        ? priorityPages
        : priorityPages;
    
    for (const page of upgradeTargets) {
        if (ALREADY_DONE.has(page)) continue;
        const fpath = path.join(ROOT, page);
        if (!fs.existsSync(fpath)) continue;
        const result = upgradePage(page, !isApply);
        upgradeResults[page] = result;
        console.log(`  ${page}: ${result}`);
    }
    
    // Also do remaining needing upgrade
    if (isApply) {
        const remaining = needsUpgradeAll.filter(r => !priorityPages.includes(r.page) && !ALREADY_DONE.has(r.page));
        for (const r of remaining) {
            const result = upgradePage(r.page, false);
            upgradeResults[r.page] = result;
            if (result.startsWith('UPGRADED')) {
                console.log(`  ${r.page}: ${result}`);
            }
        }
    }
    
    // Generate report
    console.log('\n' + '='.repeat(70));
    console.log('GENERATING REPORT');
    console.log('='.repeat(70));
    
    const pagesUpgraded = Object.values(upgradeResults).filter(v => v && (v.startsWith('DRY_RUN') || v.startsWith('UPGRADED'))).length;
    const pagesAlreadyGood = Object.values(upgradeResults).filter(v => v === 'ALREADY_GOOD').length;
    const pagesAlreadyDone = Object.values(upgradeResults).filter(v => v === 'ALREADY_DONE').length;
    
    const pagesWithOrg = allResults.filter(r => r.schema.org_schema).length;
    const pagesWithBreadcrumb = allResults.filter(r => r.schema.breadcrumb_schema).length;
    const pagesWithFaq = allResults.filter(r => r.schema.faq_schema).length;
    const pagesWithArticle = allResults.filter(r => r.schema.article_schema).length;
    const pagesWithSoftware = allResults.filter(r => r.schema.software_schema).length;
    
    const issueCounts = {};
    for (const r of allResults) {
        for (const issue of r.issues) {
            const key = issue.replace('Missing: ', '');
            issueCounts[key] = (issueCounts[key] || 0) + 1;
        }
    }
    const sortedIssues = Object.entries(issueCounts).sort((a, b) => b[1] - a[1]);
    
    const sortedPriority = priorityResults
        .filter(r => !ALREADY_DONE.has(r.page))
        .sort((a, b) => a.score - b.score);
    
    const now = new Date().toISOString().split('T')[0];
    
    let report = `# DetectHiddenFees.com — Site Authority Upgrade Report

**Generated:** ${now}
**Pages Audited:** ${total}
**Average Authority Score:** ${avgScore.toFixed(1)}/20
**Average Word Count:** ${avgWords} words

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total HTML Pages | ${total} |
| Priority Pages | ${priorityPages.length} |
| Pages Already Authority-Grade | ${ALREADY_DONE.size} |
| Pages Needing Upgrade | ${pagesUpgraded} |
| Pages Already Compliant | ${pagesAlreadyGood} |
| Average Authority Score | ${avgScore.toFixed(1)}/20 |

### Schema Coverage

| Schema Type | Pages With | Coverage |
|-------------|-----------|----------|
| Organization | ${pagesWithOrg}/${total} | ${Math.round(pagesWithOrg/total*100)}% |
| WebPage | ${pagesWithOrg}/${total} | ${Math.round(pagesWithOrg/total*100)}% |
| BreadcrumbList | ${pagesWithBreadcrumb}/${total} | ${Math.round(pagesWithBreadcrumb/total*100)}% |
| FAQPage | ${pagesWithFaq}/${total} | ${Math.round(pagesWithFaq/total*100)}% |
| Article | ${pagesWithArticle}/${total} | ${Math.round(pagesWithArticle/total*100)}% |
| SoftwareApplication | ${pagesWithSoftware}/${total} | ${Math.round(pagesWithSoftware/total*100)}% |

---

## Upgrade Summary by Priority

### Tier 1: Core Topic Cluster Pages

| Page | Status |
|------|--------|
`;
    
    for (const page of priorityPages.slice(0, 7)) {
        const status = upgradeResults[page] || 'UNKNOWN';
        report += `| ${page} | ${status.substring(0, 50)} |\n`;
    }
    
    report += `\n### Tier 2: Secondary Authority Pages\n\n| Page | Status |\n|------|--------|\n`;
    for (const page of priorityPages.slice(7, 25)) {
        const status = upgradeResults[page] || 'UNKNOWN';
        report += `| ${page} | ${status.substring(0, 50)} |\n`;
    }
    
    report += `\n### Tier 3: Industry Fee Guides\n\n| Page | Status |\n|------|--------|\n`;
    for (const page of priorityPages.slice(25, 45)) {
        if (upgradeResults[page] !== undefined) {
            const status = upgradeResults[page];
            report += `| ${page} | ${status.substring(0, 50)} |\n`;
        }
    }
    
    report += `\n---\n\n## Authority Gaps Identified\n\n### Most Common Missing Elements\n`;
    for (const [issue, count] of sortedIssues.slice(0, 15)) {
        const pct = Math.round(count / total * 100);
        report += `- **${issue}**: ${count} pages (${pct}%)\n`;
    }
    
    report += `\n---\n\n## Priority Pages Needing Most Work (Lowest Scores)\n\n`;
    for (const r of sortedPriority.slice(0, 20)) {
        report += `- **${r.page}**: Score ${r.score}/20, ${r.wordCount} words, ${r.sizeKb}KB\n`;
    }
    
    report += `\n---\n\n## Recommended Next Steps\n\n`;
    report += `1. Run \`node upgrade_site.js --apply\` to apply upgrades\n`;
    report += `2. Verify upgraded pages pass quality gates (brain/quality-gates.md)\n`;
    report += `3. Update sitemap.xml\n`;
    report += `4. Push to GitHub\n\n`;
    report += `---\n\n## Upgrades Applied Per Page\n\n`;
    report += `Each page received where missing:\n\n`;
    report += `- Organization schema\n`;
    report += `- WebPage schema with dates + metadata\n`;
    report += `- BreadcrumbList schema\n`;
    report += `- Canonical URL\n`;
    report += `- Open Graph + Twitter Card tags\n`;
    report += `- Font preloading (Inter)\n`;
    report += `- Favicon as SVG\n`;
    report += `- Preconnect for fonts\n`;
    report += `- dns-prefetch for hiddenfeeai.com API\n`;
    report += `- theme-color meta tag\n`;
    report += `- Sticky CTA bar with $15 pricing\n\n`;
    report += `*Content upgrades (FAQ, quick answer blocks, methodology, real-world examples) require manual editorial work per page.*\n`;
    
    fs.writeFileSync(REPORT_FILE, report, 'utf8');
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n✅ Report saved to: site_authority_upgrade_report.md`);
    console.log(`⏱️  Completed in ${elapsed}s`);
    if (!isApply) {
        console.log(`\nRun: node upgrade_site.js --apply  (to apply upgrades)`);
    }
}

main();