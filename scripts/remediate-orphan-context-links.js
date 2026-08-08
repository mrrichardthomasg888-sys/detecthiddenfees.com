const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const reportPath = path.join(root, 'reports', 'contextual-link-remediation-2026-08-08.json');
const plans = [
  {
    file: 'hidden-fee-industry-guide.html',
    source: '/hidden-fee-industry-guide',
    heading: 'More industry-specific fee guides',
    targets: [
      ['/hidden-auto-fees', 'Hidden auto financing and dealership fees'],
      ['/hidden-insurance-fees', 'Hidden insurance fees'],
      ['/hidden-utility-fees', 'Hidden utility and energy fees']
    ]
  },
  {
    file: 'ai-contract-review.html',
    source: '/ai-contract-review',
    heading: 'Find fees in a specific contract',
    targets: [
      ['/find-hidden-fees-in-contract', 'Find hidden fees in a contract']
    ]
  },
  {
    file: 'hidden-fee-detector.html',
    source: '/hidden-fee-detector',
    heading: 'Free review checklist',
    targets: [
      ['/free-hidden-fee-scanner', 'Free hidden-fee review checklist']
    ]
  },
  {
    file: 'hidden-fee-prevention-guide.html',
    source: '/hidden-fee-prevention-guide',
    heading: 'Plan around renewal terms',
    targets: [
      ['/automatic-renewal-date-calculator', 'Automatic renewal date calculator']
    ]
  }
];

const changes = [];
for (const plan of plans) {
  const file = path.join(root, plan.file);
  let source = fs.readFileSync(file, 'utf8');
  const eligible = plan.targets.filter(([href]) => !new RegExp(`href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:["'#?])`, 'i').test(source));
  if (!eligible.length) continue;
  const id = `orphan-context-${plan.source.replace(/[^a-z0-9]+/gi, '-')}`;
  const block = `<section class="phase2-context-links" aria-labelledby="${id}"><h2 id="${id}">${plan.heading}</h2><ul>${eligible.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul></section>`;
  const close = source.search(/<\/main>/i);
  if (close < 0) throw new Error(`${plan.file}: missing </main>`);
  source = source.slice(0, close) + block + source.slice(close);
  fs.writeFileSync(file, source);
  changes.push({ source: plan.source, targets: eligible.map(([href]) => href), reason: 'Restored or added a semantically matched parent link for a current orphan page.' });
}

fs.writeFileSync(reportPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), changes }, null, 2)}\n`);
console.log(JSON.stringify({ sourcePagesChanged: changes.length, linksAdded: changes.reduce((total, item) => total + item.targets.length, 0), changes }, null, 2));
