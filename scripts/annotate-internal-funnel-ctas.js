const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const files = [...sitemap.matchAll(/<loc>https:\/\/detecthiddenfees\.com\/([^<]*)<\/loc>/g)]
  .map(match => match[1] === '' ? 'index.html' : `${match[1]}.html`);

function actionFor(pathname) {
  if (pathname === '/analyze-my-bill') return 'bill_analysis';
  if (pathname === '/analyze-my-document') return 'document_analysis';
  return 'document_upload';
}

function annotate(source) {
  const mainStart = source.indexOf('<main');
  const mainEnd = source.indexOf('</main>', mainStart);
  if (mainStart < 0 || mainEnd < 0) return { source, count: 0 };

  let heroSeen = false;
  let count = 0;
  const main = source.slice(mainStart, mainEnd).replace(
    /<a\b[^>]*href=["'](\/analyze-my-(?:bill|document)|\/upload-[^?#"']+)(?:[?#][^"']*)?["'][^>]*>/gi,
    tag => {
      if (/data-cta-action=/i.test(tag)) return tag;
      const classes = (tag.match(/class=["']([^"']*)["']/i) || ['', ''])[1];
      let position = 'content';
      let variant = 'contextual';
      if (/primary-btn/i.test(classes) && !heroSeen) {
        position = 'hero';
        variant = 'hero-primary';
        heroSeen = true;
      }
      count += 1;
      const match = tag.match(/href=["'](\/[^?#"']+)/i);
      const action = actionFor(match ? match[1] : '');
      return tag.replace(/\s*\/?>$/, ` data-cta-action="${action}" data-cta-position="${position}" data-cta-variant="${variant}">`);
    }
  );
  return { source: source.slice(0, mainStart) + main + source.slice(mainEnd), count };
}

let annotated = 0;
for (const file of files) {
  const fullPath = path.join(root, file);
  const result = annotate(fs.readFileSync(fullPath, 'utf8'));
  if (result.count) {
    fs.writeFileSync(fullPath, result.source, 'utf8');
    annotated += result.count;
    console.log(`Annotated ${result.count} internal funnel CTA(s) in ${file}.`);
  }
}
console.log(`Annotated ${annotated} internal funnel CTA(s) across the sitemap.`);
