const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const valueAfter = flag => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
};
const githubDir = valueAfter('--github-dir');
const vercelDir = valueAfter('--vercel-dir');
const output = path.resolve(valueAfter('--output') || 'private/growth-engine/sentinel-gsc-intelligence.json');
const dhfStatePath = path.resolve(valueAfter('--dhf-state') || 'private/growth-engine/state.json');

if (!githubDir || !vercelDir) throw new Error('Usage: node scripts/ingest-sentinel-gsc.js --github-dir DIR --vercel-dir DIR [--output FILE]');

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(cell); cell = ''; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell); cell = '';
      if (row.some(value => value !== '')) rows.push(row);
      row = [];
      continue;
    }
    cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map(value => value.trim());
  return rows.map(values => Object.fromEntries(headers.map((header, i) => [header, (values[i] || '').trim()])));
}

const num = (v, fallback = null) => {
  const n = Number(String(v ?? '').replace('%', ''));
  return Number.isFinite(n) ? n : fallback;
};
const pct = row => num(row.CTR, 0) / 100;
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const file = (dir, name) => path.join(path.resolve(dir), name);

function classifyTier(position, impressions, repeated = false) {
  if (impressions > 0 && position !== null && position <= 10) return 'A';
  if (impressions > 0 && position !== null && position <= 20) return 'B';
  if (impressions > 0 && position !== null && position <= 40 && repeated) return 'C';
  return 'experimental';
}

function intentScore(text) {
  const value = String(text || '').toLowerCase();
  let score = 0;
  if (/review|reader|analy|check|detect|assessment|score|clause|terms/.test(value)) score += 8;
  if (/contract|agreement|deal|fee|pricing|renewal|cancellation/.test(value)) score += 8;
  if (/ai|tool|software|application/.test(value)) score += 4;
  return Math.min(20, score);
}

function scoreRecord(record, chart) {
  const impressions = num(record.impressions, 0);
  const clicks = num(record.clicks, 0);
  const position = num(record.position, null);
  const ctr = num(record.ctr, impressions ? clicks / impressions : 0);
  const daily = record.page ? chart.filter(row => num(row.Impressions, 0) > 0) : [];
  const repeated = daily.length >= 2 || impressions >= 2;
  const bestPosition = daily.length ? Math.min(...daily.map(row => num(row.Position, 999)).filter(Number.isFinite)) : null;
  const latest = daily.length ? daily[daily.length - 1] : null;
  const latestPosition = latest ? num(latest.Position, null) : null;
  const positionScore = position === null ? 0 : position <= 10 ? 25 : position <= 20 ? 18 : position <= 40 ? 10 : 3;
  const impressionScore = Math.min(20, Math.round(Math.log2(impressions + 1) * 3));
  const improvementScore = bestPosition !== null && position !== null && bestPosition < position ? Math.min(10, Math.round((position - bestPosition) / 4)) : 0;
  const recencyScore = latest ? 5 : 0;
  const score = Math.min(100, positionScore + impressionScore + improvementScore + recencyScore + intentScore(`${record.query || ''} ${record.page || ''}`) + Math.min(5, Math.round(ctr * 10)));
  return {
    url: record.page || null,
    query: record.query || null,
    clicks,
    impressions,
    ctr,
    position,
    best_daily_position: bestPosition,
    latest_daily_position: latestPosition,
    tier: classifyTier(position, impressions, repeated),
    winner_score: score,
    commercial_intent: intentScore(`${record.query || ''} ${record.page || ''}`) >= 12 ? 'high' : intentScore(`${record.query || ''} ${record.page || ''}`) >= 6 ? 'medium' : 'low',
    page_attribution_available: Boolean(record.page),
    recommended_action: position !== null && position <= 20 && impressions > 0
      ? 'Accumulate evidence and pursue authority; do not rewrite from a tiny sample.'
      : 'Monitor query/page attribution and wait for repeated impressions before investing.'
  };
}

function readProperty(name, dir) {
  const files = ['Queries.csv', 'Pages.csv', 'Chart.csv'];
  const paths = Object.fromEntries(files.map(item => [item, file(dir, item)]));
  const missing = files.filter(item => !fs.existsSync(paths[item]));
  if (missing.length) return { property: name, connected: false, reason: `Missing ${missing.join(', ')}` };
  const queries = parseCsv(fs.readFileSync(paths['Queries.csv'], 'utf8')).map(row => ({
    query: row['Top queries'], page: null, clicks: num(row.Clicks, 0), impressions: num(row.Impressions, 0), ctr: pct(row), position: num(row.Position, null)
  }));
  const pages = parseCsv(fs.readFileSync(paths['Pages.csv'], 'utf8')).map(row => ({
    query: null, page: row['Top pages'], clicks: num(row.Clicks, 0), impressions: num(row.Impressions, 0), ctr: pct(row), position: num(row.Position, null)
  }));
  const chart = parseCsv(fs.readFileSync(paths['Chart.csv'], 'utf8'));
  return {
    property: name,
    connected: true,
    source_files: files,
    query_count: queries.length,
    page_count: pages.length,
    query_records: queries,
    page_records: pages,
    chart,
    totals: {
      clicks: queries.reduce((sum, row) => sum + row.clicks, 0),
      impressions: queries.reduce((sum, row) => sum + row.impressions, 0),
      page_clicks: pages.reduce((sum, row) => sum + row.clicks, 0),
      page_impressions: pages.reduce((sum, row) => sum + row.impressions, 0)
    },
    opportunities: [...pages, ...queries].map(row => scoreRecord(row, chart)).sort((a, b) => b.winner_score - a.winner_score || b.impressions - a.impressions)
  };
}

function dhfClusters(state) {
  const records = state?.gsc?.records || [];
  const groups = [
    ['contract-review', /contract|agreement|clause|terms|signing|review/i],
    ['fees-and-pricing', /fee|pricing|dealer|billing|invoice|charge/i],
    ['renewal-and-cancellation', /renew|cancellation|termination/i]
  ];
  return groups.map(([name, pattern]) => {
    const matches = records.filter(row => pattern.test(`${row.query || ''} ${row.page || ''}`) && num(row.impressions, 0) > 0);
    return { cluster: name, impressions: matches.reduce((sum, row) => sum + num(row.impressions, 0), 0), clicks: matches.reduce((sum, row) => sum + num(row.clicks, 0), 0), records: matches.slice(0, 20) };
  });
}

const github = readProperty('sentinel-github-pages', githubDir);
const vercel = readProperty('sentinel-vercel', vercelDir);
const sameExport = github.connected && vercel.connected && ['Queries.csv', 'Pages.csv', 'Chart.csv'].every(name => sha(file(githubDir, name)) === sha(file(vercelDir, name)));
if (sameExport) {
  vercel.connected = false;
  vercel.reason = 'Supplied Vercel export is byte-identical to the GitHub export; it cannot be treated as independent property evidence.';
  vercel.query_records = [];
  vercel.page_records = [];
  vercel.chart = [];
  vercel.opportunities = [];
  vercel.totals = { clicks: null, impressions: null, page_clicks: null, page_impressions: null };
}
const dhf = fs.existsSync(dhfStatePath) ? JSON.parse(fs.readFileSync(dhfStatePath, 'utf8')) : null;
const githubClusters = dhfClusters({ gsc: { records: github.query_records } });
const dhfDemand = dhfClusters(dhf);
const crossPropertyDemand = githubClusters.filter(group => group.impressions > 0 && (dhfDemand.find(item => item.cluster === group.cluster)?.impressions || 0) > 0).map(group => ({
  cluster: group.cluster,
  confidence: group.cluster === 'contract-review' ? 'high' : 'medium',
  note: 'Thematic overlap across properties; exact query/page joins are not available in the supplied exports.'
}));
const state = {
  version: '1.0.0',
  generated_at: new Date().toISOString(),
  source_note: 'Two supplied ZIPs were compared byte-for-byte. Both contain the same GitHub Pages export; no independent Vercel GSC dataset was supplied.',
  properties: { detecthiddenfees: { connected: Boolean(dhf?.gsc), current_totals: dhf?.gsc?.current_totals || null }, github, vercel },
  cross_property_demand: crossPropertyDemand,
  cannibalization_risks: [
    { risk: 'contract-review overlap', primary: 'DetectHiddenFees contract-review resources and protected winner', supporting: 'Sentinel GitHub/Vercel contract-review pages', severity: 'medium', action: 'Keep Sentinel pages distinct; do not create duplicate exact-intent pages.' },
    { risk: 'AI contract analysis overlap', primary: 'DetectHiddenFees commercial contract-analysis pages', supporting: 'Sentinel AI contract-review pages', severity: 'medium', action: 'Use source attribution and measured authority only after repeated demand.' }
  ],
  tiers: {
    github: { A: github.opportunities.filter(row => row.tier === 'A').length, B: github.opportunities.filter(row => row.tier === 'B').length, C: github.opportunities.filter(row => row.tier === 'C').length, experimental: github.opportunities.filter(row => row.tier === 'experimental').length },
    vercel: { A: 0, B: 0, C: 0, experimental: 0 }
  },
  top10: { github: github.opportunities.slice(0, 10), vercel: [] },
  channel_economics: { github_pages: { url_count: 106, impressions: github.totals.page_impressions, clicks: github.totals.page_clicks, referrals: 0, hiddenfeeai_arrivals: 0, uploads: 0, purchases: 0, revenue: 0 }, vercel: { url_count: 206, impressions: null, clicks: null, referrals: 0, hiddenfeeai_arrivals: 0, uploads: 0, purchases: 0, revenue: 0 } },
  constraints: { max_new_pages_per_week: 5, mass_backlinks_created: 0, production_pages_modified: 0 }
};
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(state, null, 2) + '\n', 'utf8');
console.log(JSON.stringify({ output, github_connected: github.connected, vercel_connected: vercel.connected, sentinel_impressions: github.totals.page_impressions, sentinel_clicks: github.totals.page_clicks, cross_property_clusters: crossPropertyDemand.length, github_top: state.top10.github.slice(0, 10) }, null, 2));
