const fs = require("fs");

const slugs = [
  "dealer-add-on-cost-breakdown", "hidden-auto-loan-fees", "hidden-car-dealer-fees-guide",
  "auto-loan-fine-print-explained", "vehicle-purchase-agreement-review-guide",
  "dealer-documentation-fees-explained", "dealer-markup-explained",
  "extended-warranty-hidden-costs", "gap-insurance-cost-analysis",
  "car-purchase-contract-red-flags", "spot-delivery-scam-guide",
  "auto-financing-hidden-charges", "car-buying-checklist-before-signing",
  "hidden-dealer-charges-by-state", "dealer-fee-negotiation-guide"
];

function clean(value) {
  return value.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ").trim().toLowerCase();
}

function fileText(slug) {
  return clean(fs.readFileSync(slug + ".html", "utf8"));
}

function vector(text) {
  const result = new Map();
  text.split(/[^a-z0-9]+/).filter(x => x.length > 3).forEach(word => result.set(word, (result.get(word) || 0) + 1));
  return result;
}

function cosine(a, b) {
  let dot = 0, aa = 0, bb = 0;
  for (const value of a.values()) aa += value * value;
  for (const value of b.values()) bb += value * value;
  for (const [key, value] of a) dot += value * (b.get(key) || 0);
  return dot / Math.sqrt(aa * bb);
}

const texts = Object.fromEntries(slugs.map(slug => [slug, fileText(slug)]));
const vectors = Object.fromEntries(slugs.map(slug => [slug, vector(texts[slug])]));
const paragraphs = new Map();
let paragraphCount = 0;
const repeatedHeadings = new Map();
const repeatedFaqs = new Map();
const ctaCopies = new Map();

for (const slug of slugs) {
  const html = fs.readFileSync(slug + ".html", "utf8");
  for (const match of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
    const value = clean(match[1]);
    if (value.length > 100) {
      paragraphCount++;
      if (!paragraphs.has(value)) paragraphs.set(value, []);
      paragraphs.get(value).push(slug);
    }
  }
  for (const match of html.matchAll(/<h[23][^>]*>([^<]+)<\/h[23]>/g)) {
    const value = clean(match[1]);
    if (!repeatedHeadings.has(value)) repeatedHeadings.set(value, []);
    repeatedHeadings.get(value).push(slug);
  }
  for (const match of html.matchAll(/<summary>([^<]+)<\/summary>/g)) {
    const value = clean(match[1]);
    if (!repeatedFaqs.has(value)) repeatedFaqs.set(value, []);
    repeatedFaqs.get(value).push(slug);
  }
  for (const match of html.matchAll(/data-cta-position="(?:top|middle|bottom|sticky-button)"[^>]*>([^<]+)/g)) {
    const value = clean(match[1]);
    if (!ctaCopies.has(value)) ctaCopies.set(value, []);
    ctaCopies.get(value).push(slug);
  }
}

const semanticPairs = [];
for (let i = 0; i < slugs.length; i++) {
  for (let j = i + 1; j < slugs.length; j++) {
    semanticPairs.push({ score: Number(cosine(vectors[slugs[i]], vectors[slugs[j]]).toFixed(4)), pages: [slugs[i], slugs[j]] });
  }
}
semanticPairs.sort((a, b) => b.score - a.score);
const duplicateInstances = [...paragraphs.values()].filter(value => value.length > 1).reduce((sum, value) => sum + value.length, 0);

const report = {
  generatedAt: new Date().toISOString(),
  guides: slugs.length,
  paragraphCount,
  exactDuplicateParagraphGroups: [...paragraphs.values()].filter(value => value.length > 1).length,
  exactDuplicateParagraphInstances: duplicateInstances,
  exactDuplicateParagraphPercentage: Number((duplicateInstances / paragraphCount * 100).toFixed(2)),
  repeatedHeadings: [...repeatedHeadings].filter(([, pages]) => pages.length > 1).map(([heading, pages]) => ({heading, pages})),
  repeatedFaqs: [...repeatedFaqs].filter(([, pages]) => pages.length > 1).map(([question, pages]) => ({question, pages})),
  repeatedCtaCopies: [...ctaCopies].filter(([, pages]) => pages.length > 1).map(([copy, pages]) => ({copy, pages})),
  semanticSimilarityPairs: semanticPairs.slice(0, 10),
  wordCounts: Object.fromEntries(slugs.map(slug => [slug, texts[slug].split(/\s+/).length]))
};

if (require.main === module) {
  const output = process.argv[2] || "automotive-uniqueness-report.json";
  fs.writeFileSync(output, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

module.exports = report;
