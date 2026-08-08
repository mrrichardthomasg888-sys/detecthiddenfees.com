const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const pages = {
  'research-center.html': {
    title: 'DetectHiddenFees Research Center: Methods, Sources, and Data Status',
    description: 'Explore the DetectHiddenFees Research Center, its evidence standards, source requirements, and current Hidden Fee Index data-collection status.',
    breadcrumbName: 'Research Center'
  },
  'research-methodology.html': {
    title: 'Research Methodology: How DetectHiddenFees Collects and Verifies Evidence',
    description: 'Read the DetectHiddenFees research methodology for source collection, fee classification, verification, limitations, and publication gates.',
    breadcrumbName: 'Research Methodology'
  },
  'hidden-fee-index.html': {
    title: 'Hidden Fee Index 2026: Collection and Verification Status',
    description: 'See the current collection and verification status of the DetectHiddenFees Hidden Fee Index 2026. No unsupported statistics are presented as findings.',
    breadcrumbName: 'Hidden Fee Index'
  },
  'hidden-fee-statistics.html': {
    title: 'Hidden Fee Statistics: Data Collection Status | DetectHiddenFees',
    description: 'Transparent status page for DetectHiddenFees hidden-fee statistics. Statistics remain unpublished until source data, denominators, and verification are documented.',
    breadcrumbName: 'Hidden Fee Statistics'
  },
  'hidden-fee-database.html': {
    title: 'Hidden Fee Database: Collection Framework and Public Status | DetectHiddenFees',
    description: 'Review the DetectHiddenFees hidden-fee database framework, field definitions, source requirements, and current public collection status.',
    breadcrumbName: 'Hidden Fee Database'
  }
};

const entityDescription = 'DetectHiddenFees publishes research and educational resources about hidden fees, contracts, invoices, and document-related financial risks. HiddenFeeAI is a separate AI-powered document-analysis product.';

function replaceMeta(source, selector, value) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(<meta\\s+${escaped}\\s+content=")[^"]*("\\s*/?>)`, 'i');
  return source.replace(pattern, `$1${value}$2`);
}

function removeRenderedSticky(source) {
  const stickyPattern = /<div\s+class=["']sticky-cta-bar["'][^>]*>\s*<div\s+class=["']sticky-text["'][\s\S]*?<\/div>\s*<a\b[\s\S]*?<\/a>\s*<\/div>/gi;
  return source.replace(stickyPattern, '');
}

function removeFaqSchema(source) {
  const faqPattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>\s*\{\s*"@context"\s*:\s*"https:\/\/schema\.org"\s*,\s*"@type"\s*:\s*"FAQPage"[\s\S]*?<\/script>/gi;
  return source.replace(faqPattern, '');
}

function rewriteResearchSchema(source, filename, page) {
  const pattern = /(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi;
  return source.replace(pattern, (full, open, payload, close) => {
    let data;
    try {
      data = JSON.parse(payload);
    } catch {
      return full;
    }
    const type = data['@type'];
    if (type === 'Organization' || type === 'WebSite') data.description = entityDescription;
    if (type === 'CollectionPage' || type === 'Article' || type === 'WebPage') {
      if (type === 'Article') data.headline = page.title;
      data.name = page.title;
      data.description = page.description;
    }
    if (type === 'Dataset' && filename === 'hidden-fee-statistics.html') {
      data.name = 'Hidden Fee Statistics: Collection Status';
      data.description = page.description;
    }
    if (type === 'BreadcrumbList' && Array.isArray(data.itemListElement)) {
      const last = data.itemListElement[data.itemListElement.length - 1];
      if (last) last.name = page.breadcrumbName;
    }
    return `${open}${JSON.stringify(data)}${close}`;
  });
}

for (const [filename, page] of Object.entries(pages)) {
  const file = path.join(root, filename);
  const source = fs.readFileSync(file, 'utf8');
  let updated = source
    .replace(/<title>[^<]*<\/title>/i, `<title>${page.title}</title>`);
  updated = replaceMeta(updated, 'name="description"', page.description);
  updated = replaceMeta(updated, 'property="og:title"', page.title);
  updated = replaceMeta(updated, 'property="og:description"', page.description);
  updated = replaceMeta(updated, 'name="twitter:title"', page.title);
  updated = replaceMeta(updated, 'name="twitter:description"', page.description);
  updated = rewriteResearchSchema(updated, filename, page);
  updated = removeRenderedSticky(updated);
  if (filename === 'hidden-fee-statistics.html') updated = removeFaqSchema(updated);

  if (updated.includes('<div class="sticky-cta-bar"') || updated.includes("<div class='sticky-cta-bar'")) {
    throw new Error(`${filename} still contains a rendered sticky product bar`);
  }
  if (filename === 'hidden-fee-statistics.html' && /"@type"\s*:\s*"FAQPage"/i.test(updated)) {
    throw new Error(`${filename} still contains FAQ schema after the stale FAQ removal`);
  }
  if (!updated.includes(`twitter:title" content="${page.title}`)) {
    throw new Error(`${filename} twitter title was not updated`);
  }

  if (updated !== source) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Remediated ${filename}`);
  } else {
    console.log(`Already clean: ${filename}`);
  }
}

console.log(`Public research-page remediation passed for ${Object.keys(pages).length} pages.`);
