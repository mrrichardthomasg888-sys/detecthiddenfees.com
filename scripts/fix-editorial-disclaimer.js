const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const broken = 'This resource was created by the . We provide analysis and educational information. Findings should be reviewed with qualified professionals when needed. Read our  for details.';
const fixed = 'This resource was created by the DetectHiddenFees Research Team. We provide analysis and educational information. Findings should be reviewed with qualified professionals when needed. Read our Editorial Policy for details.';

let changed = 0;
for (const name of fs.readdirSync(root)) {
  if (!name.endsWith('.html')) continue;
  const file = path.join(root, name);
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes(broken)) continue;
  fs.writeFileSync(file, source.replaceAll(broken, fixed), 'utf8');
  changed += 1;
}

console.log(`Repaired empty editorial disclaimer text on ${changed} pages.`);
