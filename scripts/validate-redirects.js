const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const lines = fs.readFileSync(path.join(root, '_redirects'), 'utf8').split(/\r?\n/);
const rules = lines
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'))
  .map(line => line.split(/\s+/))
  .filter(parts => parts.length >= 3)
  .map(([source, target, status]) => ({ source, target, status }));

const bySource = new Map(rules.map(rule => [rule.source, rule]));
const issues = [];

for (const rule of rules.filter(rule => rule.source.endsWith('.html'))) {
  const cleanSource = rule.source.slice(0, -'.html'.length);
  const cleanRule = bySource.get(cleanSource);
  if (!cleanRule) {
    issues.push(`${rule.source} is missing its extensionless redirect counterpart`);
    continue;
  }
  if (cleanRule.target !== rule.target || cleanRule.status !== rule.status) {
    issues.push(`${cleanSource} does not match ${rule.source}`);
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}

console.log(`Redirect rules valid: ${rules.length} rules; every .html alias has a matching extensionless rule.`);
