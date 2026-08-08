const fs = require('fs');

const files = fs.readdirSync('.').filter((file) => file.endsWith('.html'));
const tagPattern = /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi;
const hrefPattern = /\bhref=["']([^"']+)/i;
const changed = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const tags = original.match(tagPattern) || [];
  if (tags.length < 2) continue;
  const hrefs = tags.map((tag) => (tag.match(hrefPattern) || [])[1]).filter(Boolean);
  if (new Set(hrefs).size !== 1) {
    throw new Error(`Conflicting canonical values require review: ${file}`);
  }
  let kept = false;
  const next = original.replace(tagPattern, (tag) => {
    if (kept) return '';
    kept = true;
    return tag;
  });
  if (next !== original) {
    fs.writeFileSync(file, next, 'utf8');
    changed.push(file);
  }
}

console.log(`Deduplicated canonical tags in ${changed.length} files: ${changed.join(', ') || 'none'}`);
