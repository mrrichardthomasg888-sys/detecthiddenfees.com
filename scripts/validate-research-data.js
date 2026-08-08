const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'research-data.json'), 'utf8'));
const required = ['title', 'version', 'status', 'methodology_url', 'field_definitions', 'statistics', 'records', 'limitations', 'changelog'];
const missing = required.filter(key => !(key in manifest));
const issues = [];
if (missing.length) issues.push(`missing fields: ${missing.join(', ')}`);
if (manifest.status !== 'collecting') issues.push(`unexpected status: ${manifest.status}`);
if (manifest.statistics !== null) issues.push('statistics must remain null until publication gates pass');
if (!Array.isArray(manifest.records)) issues.push('records must be an array');
if (manifest.records.length !== 0) issues.push('public collecting manifest must remain empty until verified records exist');
if (!manifest.methodology_url.includes('/research-methodology')) issues.push('methodology URL is not linked to the public methodology page');
if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
for (const filename of ['research-center.html', 'research-methodology.html', 'hidden-fee-index.html', 'hidden-fee-statistics.html', 'hidden-fee-database.html']) {
  const source = fs.readFileSync(path.join(root, filename), 'utf8');
  if (!source.includes('research-data.json')) issues.push(`${filename} does not link to the public manifest`);
  if (/based on analysis of thousands|\$218 billion|\$1,735|85% of consumers|8-10% annual growth/i.test(source)) {
    issues.push(`${filename} retains a previously unsupported research statistic`);
  }
}
if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
console.log('Research manifest and five public research pages pass the evidence-status checks.');
