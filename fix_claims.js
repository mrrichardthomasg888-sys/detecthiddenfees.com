#!/usr/bin/env node
/**
 * DetectHiddenFees — Claims Accuracy + E-E-A-T Fix
 * Scans all bill/fee/negotiation pages and replaces unsupported claims
 * with accurate, evidence-based language.
 *
 * Usage: node fix_claims.js          (dry run)
 *        node fix_claims.js --apply  (live fix)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const SKIP_PAGES = new Set([
    '_source_copy.html', '_test123.html', 'test_check.html', 'test_long.html',
    'test_mini.html', 'test_out.html', 'out0.html', 'out1.html', 'part1.html',
    'header.html', 'headpart.html', 'indexnow-submit.html', 'hdr.html',
    'final.html', 'term-items.html', 'alphabet-links.html'
]);

const AUTHORITY_PAGES = new Set([
    'ai-financial-advisor.html',
    'ai-contract-review.html',
    'ai-construction-contract-review.html',
    'medical-debt-negotiation.html'
]);

const REPLACEMENTS = [
    // 1. "millions of Americans overpay"
    [
        /[Ee]very\s+month[,.]*\s+millions\s+of\s+Americans\s+(overpay|pay\s+too\s+much|are\s+overcharged)/g,
        "Many consumers pay bills containing complex charges, recurring fees, and pricing structures they may not fully understand",
        "millions of Americans overpay -> Many consumers"
    ],
    [
        /[Mm]illions\s+of\s+Americans\s+(are\s+)?(overpaying|getting\s+overcharged|losing\s+money)/g,
        "Many consumers",
        "millions of Americans -> Many consumers"
    ],

    // 2. "$X per year" unsourced cost claims
    [
        /cost\s+(the\s+)?average\s+(household|family|consumer|American)\s+(over\s+)?\$[\d,]+(\s*\+)?\s*per\s+(year|month|annum)/gi,
        "can contribute to significant unnecessary expenses depending on the services, providers, and charges involved",
        "cost average household $X per year -> softened"
    ],
    [
        /cost\s+(Americans|consumers|households|families)\s+(over\s+)?\$[\d,]+\s*(billion|million|thousand)?\s*(a\s+)?(year|annually)/gi,
        "represents a significant category of consumer spending where review may identify potential savings",
        "cost Americans $X billion -> softened"
    ],

    // 3. "80% of bills contain errors"
    [
        /80%\s*of\s+(medical\s+)?bills\s+(contain|have|include)\s+(errors|mistakes|overcharges)/gi,
        "Medical billing reviews frequently identify potential issues such as duplicate charges, coding questions, unclear fees, and billing discrepancies that may warrant further review",
        "80% of bills contain errors -> evidence-based"
    ],
    [
        /[Uu]p\s+to\s+\d+%\s+of\s+(medical\s+)?bills\s+(contain|have|include)\s+(errors|mistakes|overcharges)/gi,
        "Medical billing reviews frequently identify potential issues that may warrant further review",
        "up to X% of bills contain errors -> evidence-based"
    ],

    // 4. "leading cause of bankruptcy"
    [
        /([Tt]he\s+)?(single\s+)?(largest|leading|biggest|number\s+one|#1)\s+(cause|reason|source)\s+of\s+(personal\s+)?(bankruptcy|debt|financial\s+distress)/gi,
        "a major source of personal financial strain, with hospital expenses representing a significant portion of consumer debt",
        "leading cause of bankruptcy -> major source of financial strain"
    ],

    // 5. "HiddenFeeAI identifies these errors"
    [
        /HiddenFeeAI\s+(identifies|finds|detects|catches)\s+these\s+(errors|overcharges|mistakes|fees)/gi,
        "HiddenFeeAI analyzes medical bills to identify potential billing issues and charges that may require further review",
        "HiddenFeeAI identifies these errors -> analyzes for potential issues"
    ],
    [
        /The\s+AI\s+(identifies|finds|detects)\s+(these\s+)?(errors|overcharges|mistakes|fees)\s+in\s+minutes/gi,
        "The AI scans the document and highlights charges that may warrant additional investigation",
        "AI identifies errors in minutes -> highlights charges for investigation"
    ],

    // 6. "save hundreds/thousands" -> "potential savings"
    [
        /[Ss]ave\s+(hundreds|thousands)\s+(of\s+)?(dollars\s+)?(a\s+)?(year|month|annually|starting\s+today)/gi,
        "identify potential savings opportunities depending on the specific charges and providers involved",
        "save hundreds -> identify potential savings"
    ],

    // 7. "cut bills in half / by X%"
    [
        /[Cc]ut\s+(your\s+)?(monthly\s+)?bills?\s+(in\s+half|by\s+\d+%|dramatically|significantly)/gi,
        "work toward reducing your bills through informed negotiation",
        "cut bills in half -> work toward reducing"
    ],

    // 8. "guaranteed" language
    [
        /[Gg]uarantee[d]?\s+(to\s+)?(save|reduce|cut|lower|find)/gi,
        "may help identify opportunities to",
        "guaranteed to save -> may help identify"
    ],

    // 9. "every bill" absolutes
    [
        /[Ee]very\s+(bill|invoice|statement|charge)\s+(has|contains|includes|is\s+full\s+of)\s+(hidden|unfair|excessive|fraudulent)/gi,
        "many bills may contain charges that merit closer examination",
        "every bill has hidden fees -> many bills may contain charges"
    ],

    // 10. "most people don't know"
    [
        /[Mm]ost\s+(people|consumers|Americans|households|families)\s+(do\s+not|dont|don\s*'*t*)\s+(know|understand|realize|check)/gi,
        "many consumers may not be aware",
        "most people do not know -> many consumers may not be aware"
    ],

    // 11. "at alarming rates"
    [
        /(errors|mistakes|overcharges)\s+at\s+(alarming|shocking|staggering|incredible)\s+rates/gi,
        "potential issues that warrant review",
        "at alarming rates -> that warrant review"
    ],

    // 12. "proven strategies"
    [
        /[Pp]roven\s+(strategies|tactics|methods|techniques)/gi,
        "research-backed approaches",
        "proven strategies -> research-backed approaches"
    ],
];

function fixPage(pageName, dryRun) {
    const filePath = path.join(ROOT, pageName);
    let html = fs.readFileSync(filePath, "utf8");
    const changes = [];

    if (AUTHORITY_PAGES.has(pageName)) {
        return "ALREADY_AUTHORITY";
    }

    for (const [regex, replacement, desc] of REPLACEMENTS) {
        const newHtml = html.replace(regex, replacement);
        if (newHtml !== html) {
            changes.push(desc);
            html = newHtml;
        }
    }

    if (!dryRun && changes.length > 0) {
        fs.writeFileSync(filePath, html, "utf8");
    }

    if (changes.length > 0) {
        return changes.slice(0, 6).join(", ") + (changes.length > 6 ? ` (+${changes.length - 6} more)` : "");
    }
    return null;
}

function findBillPages() {
    const files = fs.readdirSync(ROOT).filter(f => f.endsWith(".html") && !SKIP_PAGES.has(f));
    const keywords = ["bill", "fee", "negotiat", "overcharge", "overpay", "medical", "hospital",
                      "telecom", "utility", "subscription", "save", "saving", "cost", "error",
                      "debt", "settle", "reduce", "check", "analyze", "scan", "detect", "find",
                      "hidden", "charge", "pricing", "estimate", "quote", "invoice"];
    return files.filter(f => {
        const lower = f.toLowerCase();
        return keywords.some(k => lower.includes(k));
    });
}

function main() {
    const isApply = process.argv.includes("--apply");
    const pages = findBillPages();

    console.log("=".repeat(70));
    console.log(isApply ? "LIVE FIX MODE" : "DRY RUN - Scanning bill/fee/negotiation pages");
    console.log("Found " + pages.length + " pages to check");
    console.log("=".repeat(70));

    let totalFixes = 0;
    let pagesWithFixes = 0;
    const results = {};

    for (const page of pages) {
        const result = fixPage(page, !isApply);
        if (result) {
            results[page] = result;
            totalFixes += result.split(", ").length;
            pagesWithFixes++;
            const action = isApply ? "FIXED" : "WOULD FIX";
            console.log("  " + action + ": " + page + " - " + result);
        }
    }

    console.log("\n" + "=".repeat(70));
    console.log("Pages with fixes needed: " + pagesWithFixes);
    console.log("Total claim replacements: " + totalFixes);

    if (!isApply) {
        console.log("\nRun: node fix_claims.js --apply  to apply fixes");
    } else {
        console.log("\nFixes applied. Run again to verify no remaining issues.");
    }

    // Generate report
    const now = new Date().toISOString().split("T")[0];
    let report = "# Bill/Fee Claims Accuracy Fix Report\n\n";
    report += "**Generated:** " + now + "\n";
    report += "**Mode:** " + (isApply ? "LIVE FIX" : "DRY RUN") + "\n";
    report += "**Pages Scanned:** " + pages.length + "\n";
    report += "**Pages Fixed:** " + pagesWithFixes + "\n";
    report += "**Total Replacements:** " + totalFixes + "\n\n";
    report += "---\n\n## Claim Types Fixed\n\n";
    report += "1. millions of Americans -> Many consumers (unsourced population claim)\n";
    report += "2. $X per year average household -> softened (unsourced cost claim)\n";
    report += "3. 80% of bills contain errors -> reviews identify potential issues (unsourced error rate)\n";
    report += "4. leading cause of bankruptcy -> major source of financial strain (unsourced causation)\n";
    report += "5. HiddenFeeAI identifies these errors -> analyzes for potential issues (overpromise)\n";
    report += "6. save hundreds/thousands -> identify potential savings opportunities (guaranteed savings)\n";
    report += "7. cut bills in half -> work toward reducing (guaranteed reduction)\n";
    report += "8. guaranteed to save -> may help identify (absolute language)\n";
    report += "9. every bill has hidden fees -> many bills may contain charges (absolute language)\n";
    report += "10. most people dont know -> many consumers may not be aware (generalization)\n";
    report += "11. at alarming rates -> that warrant review (sensationalism)\n";
    report += "12. proven strategies -> research-backed approaches (unsubstantiated)\n\n";
    report += "---\n\n## Pages Fixed\n\n| Page | Changes |\n|------|---------|\n";

    const sorted = Object.entries(results).sort((a, b) => b[1].split(", ").length - a[1].split(", ").length);
    for (const [page, changes] of sorted) {
        report += "| " + page + " | " + changes.substring(0, 60) + " |\n";
    }

    fs.writeFileSync(path.join(ROOT, "claims_accuracy_report.md"), report, "utf8");
    console.log("\nReport saved to: claims_accuracy_report.md");
}

main();