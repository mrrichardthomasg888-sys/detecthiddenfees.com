const fs = require('fs');

console.log('=== FINAL AUTO-FIX SCAN ===\n');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('simple_test') && !f.includes('_source') && f !== 'headpart.html' && f !== 'header.html' && f !== 'hdr.html' && f !== 'test_long.html');

let fixes = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Fix OG title that matches "Negotiate Bills"
  const ogTitleMatch = content.match(/property="og:title" content="([^"]+)"/);
  if (ogTitleMatch && ogTitleMatch[1].includes('Negotiate Bills')) {
    // Get the actual <title> to use
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    if (titleMatch) {
      const properTitle = titleMatch[1].replace(' | DetectHiddenFees', '').trim();
      content = content.replace(
        ogTitleMatch[0],
        `property="og:title" content="${properTitle}"/>`
      );
      modified = true;
      console.log(`  OG title fixed: ${file}`);
    }
  }

  // 2. Fix OG description that matches "HiddenFeeAI gives you the data"
  const ogDescMatch = content.match(/property="og:description" content="([^"]+)"/);
  if (ogDescMatch && ogDescMatch[1].includes('HiddenFeeAI gives you the data')) {
    // Get the actual <meta name="description"> to use
    const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
    if (descMatch) {
      content = content.replace(
        ogDescMatch[0],
        `property="og:description" content="${descMatch[1]}"/>`
      );
      modified = true;
      console.log(`  OG description fixed: ${file}`);
    }
  }

  // 3. Fix duplicate title tags
  const titleTags = content.match(/<title>/g);
  if (titleTags && titleTags.length > 1) {
    // Keep only the second one (usually the correct one)
    const firstTitleEnd = content.indexOf('</title>') + 8;
    content = content.substring(0, firstTitleEnd) + '\n' + content.substring(firstTitleEnd);
    // Now remove the second one
    const secondTitleStart = content.indexOf('<title>', firstTitleEnd);
    const secondTitleEnd = content.indexOf('</title>', secondTitleStart) + 8;
    content = content.substring(0, secondTitleStart) + content.substring(secondTitleEnd).replace(/^\n/, '');
    modified = true;
    console.log(`  Duplicate title fixed: ${file}`);
  }

  // 4. Fix canonical pointing to wrong page
  const canMatch = content.match(/<link rel="canonical" href="https:\/\/detecthiddenfees\.com\/([^"]+)"/);
  if (canMatch && canMatch[1] !== file && !canMatch[1].includes('hidden-fees-guides') && !canMatch[1].includes('ai-bill-analyzer') && !canMatch[1].includes('ai-contract-review') && !canMatch[1].includes('bill-negotiation-resource-center')) {
    content = content.replace(canMatch[0], `<link rel="canonical" href="https://detecthiddenfees.com/${file}"/>`);
    modified = true;
    console.log(`  Canonical fixed: ${file} (was pointing to ${canMatch[1]})`);
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    fixes++;
  }
}

console.log(`\n=== COMPLETE: ${fixes} files fixed ===`);