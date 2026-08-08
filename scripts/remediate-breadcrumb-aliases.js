const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const retiredUrl = 'https://detecthiddenfees.com/ai-document-intelligence-center';
const canonicalUrl = 'https://detecthiddenfees.com/ai-analysis-hub';
const retiredLabel = 'AI Document Intelligence Center';
const canonicalLabel = 'AI Analysis Hub';
const excludedFiles = new Set(['ai-document-intelligence-center.html']);
const files = fs.readdirSync(root)
  .filter((file) => file.endsWith('.html') && !excludedFiles.has(file));

let changed = 0;
for (const file of files) {
  const filePath = path.join(root, file);
  const source = fs.readFileSync(filePath, 'utf8');
  const next = source.replace(
    /(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (block, open, json, close) => {
      if (!/"@type"\s*:\s*"BreadcrumbList"/.test(json)) return block;
      const updated = json
        .replaceAll(retiredUrl, canonicalUrl)
        .replaceAll(retiredLabel, canonicalLabel);
      return updated === json ? block : `${open}${updated}${close}`;
    }
  );
  if (next !== source) {
    fs.writeFileSync(filePath, next, 'utf8');
    changed += 1;
  }
}

console.log(`Normalized retired BreadcrumbList references on ${changed} pages; skipped redirect source ${[...excludedFiles].join(', ')}.`);
