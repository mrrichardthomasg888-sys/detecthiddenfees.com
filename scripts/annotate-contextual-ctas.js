const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const pages = {
  'arbitration-clauses-explained.html': {
    action: 'contract_review',
    replacements: [
      ['Upload & Analyze &mdash; $15', 'Review My Contract &mdash; $15'],
      ['Upload My Document &mdash; $15', 'Review My Contract &mdash; $15']
    ]
  },
  'indemnification-clauses-explained.html': {
    action: 'contract_review',
    replacements: [
      ['Upload & Analyze &mdash; $15', 'Review My Contract &mdash; $15'],
      ['Upload My Document &mdash; $15', 'Review My Contract &mdash; $15']
    ]
  },
  'hidden-streaming-fees.html': {
    action: 'subscription_fee_review',
    replacements: [
      ['Analyze My Bill →', 'Analyze Subscription Charges →'],
      ['Upload My Bill — $15', 'Upload Subscription Bill — $15']
    ]
  },
  'hidden-landscaping-fees.html': {
    action: 'estimate_review',
    replacements: [
      ['Analyze My Bill →', 'Review My Landscaping Estimate →'],
      ['Upload My Bill — $15', 'Upload Landscaping Estimate — $15']
    ]
  }
};

function addMetadataToLinks(source, action) {
  const mainStart = source.indexOf('<main');
  const mainEnd = source.indexOf('</main>', mainStart);
  if (mainStart < 0 || mainEnd < 0) throw new Error('Could not locate main content');

  let heroSeen = false;
  const annotate = (html, zone) => html.replace(/<a\b[^>]*href=["']https:\/\/hiddenfeeai\.com[^"']*["'][^>]*>/gi, tag => {
    if (/data-cta-action=/i.test(tag)) return tag;
    const classes = (tag.match(/class=["']([^"']*)["']/i) || [,''])[1];
    let position = zone === 'nav' ? 'nav' : 'mid';
    let variant = 'contextual';
    if (/sticky-btn/i.test(classes)) {
      position = 'sticky';
      variant = 'sticky';
    } else if (/cta-btn/i.test(classes)) {
      position = 'end';
      variant = 'end';
    } else if (/primary-btn/i.test(classes) && !heroSeen && zone === 'main') {
      position = 'hero';
      variant = 'hero-primary';
      heroSeen = true;
    } else if (/primary-btn/i.test(classes)) {
      variant = 'content-primary';
    }
    return tag.replace(/\s*\/?>$/, ` data-cta-action="${action}" data-cta-position="${position}" data-cta-variant="${variant}">`);
  });

  const before = annotate(source.slice(0, mainStart), 'nav');
  const main = annotate(source.slice(mainStart, mainEnd), 'main');
  const after = annotate(source.slice(mainEnd), 'after');
  return before + main + after;
}

for (const [filename, config] of Object.entries(pages)) {
  const file = path.join(root, filename);
  let source = fs.readFileSync(file, 'utf8');
  for (const [from, to] of config.replacements) source = source.split(from).join(to);
  source = addMetadataToLinks(source, config.action);
  fs.writeFileSync(file, source, 'utf8');
  console.log(`Annotated contextual CTAs in ${filename} as ${config.action}.`);
}
