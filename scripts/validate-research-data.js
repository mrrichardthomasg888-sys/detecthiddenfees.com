const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'research-data.json'), 'utf8'));
const expectedDate = manifest.updated_at;
const expectedLabel = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${expectedDate}T00:00:00Z`));
const required = ['title', 'version', 'status', 'methodology_url', 'field_definitions', 'statistics', 'records', 'limitations', 'changelog'];
const missing = required.filter(key => !(key in manifest));
const issues = [];
if (missing.length) issues.push(`missing fields: ${missing.join(', ')}`);
if (!['collecting', 'published'].includes(manifest.status)) issues.push(`unexpected status: ${manifest.status}`);
if (!Array.isArray(manifest.records)) issues.push('records must be an array');
if (manifest.status === 'collecting' && manifest.records.length !== 0) issues.push('public collecting manifest must remain empty until verified records exist');
if (manifest.status === 'collecting' && manifest.statistics !== null) issues.push('collecting statistics must remain null until publication gates pass');
if (manifest.status === 'published') {
  if (!manifest.records.length) issues.push('published manifest must contain verified records');
  if (!manifest.statistics || manifest.statistics.verified_record_count !== manifest.records.length) issues.push('published statistics must match the verified record count');
  if (manifest.records.some(record => record.verification_status !== 'verified')) issues.push('published records must all be verified');
  if (!manifest.data_downloads || !manifest.data_downloads.csv || !manifest.data_downloads.json) issues.push('published manifest must expose JSON and CSV download links');
  if (!manifest.methodology || !manifest.methodology.sample_definition || !manifest.methodology.analysis_rule) issues.push('published manifest needs methodology and analysis rules');
}
if (!manifest.methodology_url.includes('/research-methodology')) issues.push('methodology URL is not linked to the public methodology page');
if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
for (const filename of ['research-center.html', 'research-methodology.html', 'hidden-fee-index.html', 'hidden-fee-statistics.html', 'hidden-fee-database.html']) {
  const source = fs.readFileSync(path.join(root, filename), 'utf8');
  if (!source.includes('research-data.json')) issues.push(`${filename} does not link to the public manifest`);
  if (!new RegExp(`"dateModified"\\s*:\\s*"${expectedDate}"`, 'i').test(source)) issues.push(`${filename} dateModified is not aligned with the manifest update date`);
  if (!source.includes(expectedLabel)) issues.push(`${filename} does not expose the manifest update date visibly`);
  if (!source.includes('Research record')) issues.push(`${filename} is missing the citation-engineering research record summary`);
  if (/based on analysis of thousands|\$218 billion|\$1,735|85% of consumers|8-10% annual growth/i.test(source)) {
    issues.push(`${filename} retains a previously unsupported research statistic`);
  }
}
if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
console.log('Research manifest and five public research pages pass the evidence-status checks.');
