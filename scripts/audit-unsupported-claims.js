const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const files = [...sitemap.matchAll(/<loc>https:\/\/detecthiddenfees\.com\/([^<]*)<\/loc>/g)]
  .map(match => match[1] === '' ? 'index.html' : `${match[1]}.html`);

const patterns = [
  { key: 'quantitative_amount', severity: 'review', regex: /\$\s?[0-9][0-9,]*(?:\.[0-9]+)?\s*(?:billion|million|thousand|[BMK])?/gi },
  { key: 'quantitative_percent', severity: 'review', regex: /\b[0-9]+(?:\.[0-9]+)?\s*%/g },
  { key: 'absolute_or_superlative', severity: 'high', regex: /\b(?:guarantee(?:d)?|always|never|every|all|most comprehensive|proven to|100% accurate|never miss)\b/gi },
  { key: 'population_or_scale', severity: 'high', regex: /\b(?:thousands of|millions of|hundreds of thousands|millions)\b/gi },
  { key: 'performance_or_outcome', severity: 'high', regex: /\b(?:accuracy|precision|recall|OCR|saves? (?:hundreds|thousands)|save thousands|cut (?:your|the) bill|success rate)\b/gi }
];

function visibleText(source) {
  return source
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const records = [];
for (const filename of [...new Set(files)]) {
  const source = fs.readFileSync(path.join(root, filename), 'utf8');
  const text = visibleText(source);
  const matches = [];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern.regex)) {
      const start = Math.max(0, match.index - 100);
      const end = Math.min(text.length, match.index + match[0].length + 160);
      matches.push({
        key: pattern.key,
        severity: pattern.severity,
        value: match[0],
        snippet: text.slice(start, end)
      });
    }
  }
  if (matches.length) records.push({ file: filename, matches });
}

const summary = {};
for (const record of records) {
  for (const match of record.matches) summary[match.key] = (summary[match.key] || 0) + 1;
}

const report = {
  generated_at: '2026-08-08',
  scope: 'Canonical HTML files listed in sitemap.xml',
  status: 'candidate_inventory',
  interpretation: 'Matches require source review; this inventory does not label every match as false or unsupported.',
  page_count: files.length,
  pages_with_candidates: records.length,
  candidate_counts: summary,
  records
};
const output = path.join(root, 'reports', 'unsupported-claims-audit-2026-08-08.json');
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n', 'utf8');
console.log(`Audited ${files.length} canonical pages; ${records.length} contain claim-review candidates.`);
console.log(JSON.stringify(summary));
