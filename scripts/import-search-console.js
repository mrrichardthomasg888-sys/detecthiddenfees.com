const fs = require('fs');
const path = require('path');

function usage() {
  console.error('Usage: node scripts/import-search-console.js <input.csv> <private-output.json> [period]');
  process.exit(1);
}

const [, , inputArg, outputArg, period = null] = process.argv;
if (!inputArg || !outputArg) usage();

const input = path.resolve(process.cwd(), inputArg);
const output = path.resolve(process.cwd(), outputArg);
if (!fs.existsSync(input)) throw new Error(`Input file not found: ${input}`);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(cell); cell = ''; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell); cell = '';
      if (row.some(value => value.trim() !== '')) rows.push(row);
      row = [];
      continue;
    }
    cell += char;
  }
  row.push(cell);
  if (row.some(value => value.trim() !== '')) rows.push(row);
  return rows;
}

function number(value, field, rowNumber) {
  const parsed = Number(String(value).trim().replace(/%$/, ''));
  if (!Number.isFinite(parsed) || parsed < 0) throw new Error(`Invalid ${field} on CSV row ${rowNumber}`);
  return parsed;
}

const rows = parseCsv(fs.readFileSync(input, 'utf8'));
if (rows.length < 1) throw new Error('CSV is empty');
const header = rows[0].map(value => value.trim().toLowerCase());
const required = ['query', 'page', 'clicks', 'impressions', 'ctr', 'position'];
const missing = required.filter(field => !header.includes(field));
if (missing.length) throw new Error(`CSV is missing required columns: ${missing.join(', ')}`);
const index = Object.fromEntries(header.map((field, i) => [field, i]));
const optional = ['date', 'device', 'country'];
const records = rows.slice(1).map((row, offset) => {
  const rowNumber = offset + 2;
  const query = String(row[index.query] || '').trim();
  const page = String(row[index.page] || '').trim();
  if (!query) throw new Error(`Missing query on CSV row ${rowNumber}`);
  if (!/^https:\/\/detecthiddenfees\.com\//i.test(page)) throw new Error(`Page must be a DetectHiddenFees URL on CSV row ${rowNumber}`);
  const rawCtr = number(row[index.ctr], 'ctr', rowNumber);
  const ctr = rawCtr > 1 ? rawCtr / 100 : rawCtr;
  if (ctr > 1) throw new Error(`CTR must be between 0 and 1 or 0 and 100% on CSV row ${rowNumber}`);
  const date = index.date === undefined || !String(row[index.date] || '').trim() ? null : String(row[index.date]).trim();
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Date must use YYYY-MM-DD on CSV row ${rowNumber}`);
  return {
    query,
    page,
    clicks: number(row[index.clicks], 'clicks', rowNumber),
    impressions: number(row[index.impressions], 'impressions', rowNumber),
    ctr,
    position: number(row[index.position], 'position', rowNumber),
    date,
    device: index.device === undefined || !String(row[index.device] || '').trim() ? null : String(row[index.device]).trim(),
    country: index.country === undefined || !String(row[index.country] || '').trim() ? null : String(row[index.country]).trim().toUpperCase()
  };
});

const payload = {
  source_status: 'connected',
  imported_at: new Date().toISOString(),
  period,
  source_file: path.basename(input),
  source_provider: 'Google Search Console export',
  property: 'detecthiddenfees.com',
  records,
  privacy_note: 'Private Search Console data. Do not publish or commit this connected export without privacy review.'
};
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log(`Imported ${records.length} Search Console records to ${output}.`);
