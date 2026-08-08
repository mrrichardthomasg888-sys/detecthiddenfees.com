const fs = require('fs');
const path = require('path');

function usage() {
  console.error('Usage: node scripts/score-search-console-opportunities.js <private-connected.json> <private-output.json> [config.json]');
  process.exit(1);
}

const [, , inputArg, outputArg, configArg = 'seo/search-console-scoring-config.json'] = process.argv;
if (!inputArg || !outputArg) usage();

const resolve = value => path.resolve(process.cwd(), value);
const inputPath = resolve(inputArg);
const outputPath = resolve(outputArg);
const configPath = resolve(configArg);
if (!fs.existsSync(inputPath)) throw new Error(`Input file not found: ${inputPath}`);
if (!fs.existsSync(configPath)) throw new Error(`Scoring config not found: ${configPath}`);

const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
if (input.source_status !== 'connected') throw new Error('Search Console scoring requires source_status=connected; no score was generated.');
if (!Array.isArray(input.records) || input.records.length === 0) throw new Error('Search Console scoring requires at least one imported record.');

const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const normalize = value => String(value || '').trim().toLowerCase();
const pagePath = page => new URL(page).pathname;
const thresholds = config.thresholds || {};
const weights = config.scoring || {};
const commercialTerms = (config.commercial_intent_terms || []).map(normalize).filter(Boolean);

function trendFor(rows) {
  const dated = rows.filter(row => /^\d{4}-\d{2}-\d{2}$/.test(String(row.date || ''))).sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const minimumRows = Math.max(2, number(thresholds.minimum_trend_rows, 4));
  if (dated.length < minimumRows) return { trend: null, evidence: { dated_rows: dated.length, reason: 'insufficient dated rows' } };
  const midpoint = Math.floor(dated.length / 2);
  const first = dated.slice(0, midpoint);
  const second = dated.slice(midpoint);
  const average = values => values.reduce((sum, value) => sum + value, 0) / values.length;
  const firstImpressions = average(first.map(row => number(row.impressions)));
  const secondImpressions = average(second.map(row => number(row.impressions)));
  const firstPosition = average(first.map(row => number(row.position)));
  const secondPosition = average(second.map(row => number(row.position)));
  const change = secondImpressions - firstImpressions;
  return {
    trend: change > 0 ? 'growing' : change < 0 ? 'declining' : 'flat',
    evidence: {
      dated_rows: dated.length,
      first_period: [first[0].date, first[first.length - 1].date],
      second_period: [second[0].date, second[second.length - 1].date],
      first_average_impressions: firstImpressions,
      second_average_impressions: secondImpressions,
      first_average_position: firstPosition,
      second_average_position: secondPosition
    }
  };
}

const groups = new Map();
for (const row of input.records) {
  const key = `${normalize(row.query)}\n${normalize(row.page)}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(row);
}

const pagesByQuery = new Map();
for (const row of input.records) {
  const key = normalize(row.query);
  if (!pagesByQuery.has(key)) pagesByQuery.set(key, new Set());
  pagesByQuery.get(key).add(normalize(row.page));
}

let commercialPages = new Set();
const opportunityPath = resolve('seo/opportunity-engine.json');
if (fs.existsSync(opportunityPath)) {
  const opportunityData = JSON.parse(fs.readFileSync(opportunityPath, 'utf8'));
  for (const item of opportunityData.opportunities || []) {
    if (item.commercial_relevance === 'high' && item.recommended_url) commercialPages.add(normalize(`https://detecthiddenfees.com${item.recommended_url}`));
  }
}

const opportunities = [];
for (const [key, rows] of groups.entries()) {
  const representative = rows.reduce((best, row) => number(row.impressions) > number(best.impressions) ? row : best, rows[0]);
  const position = number(representative.position);
  const impressions = rows.reduce((sum, row) => sum + number(row.impressions), 0);
  const clicks = rows.reduce((sum, row) => sum + number(row.clicks), 0);
  const ctr = impressions > 0 ? clicks / impressions : number(representative.ctr);
  const query = representative.query;
  const page = representative.page;
  const codes = [];
  let score = 0;
  if (position >= 4 && position <= 10) { codes.push('position_4_10'); score += number(weights.position_4_10); }
  if (position > 10 && position <= 20) { codes.push('position_11_20'); score += number(weights.position_11_20); }
  const hasHighThreshold = thresholds.high_impressions_min !== null && thresholds.high_impressions_min !== undefined && Number.isFinite(Number(thresholds.high_impressions_min));
  const hasLowThreshold = thresholds.low_ctr_max !== null && thresholds.low_ctr_max !== undefined && Number.isFinite(Number(thresholds.low_ctr_max));
  if (hasHighThreshold && hasLowThreshold && impressions >= Number(thresholds.high_impressions_min) && ctr <= Number(thresholds.low_ctr_max)) {
    codes.push('high_impressions_low_ctr'); score += number(weights.high_impressions_low_ctr);
  }
  const trend = trendFor(rows);
  if (trend.trend === 'growing') { codes.push('growing_query'); score += number(weights.growing_query); }
  if (trend.trend === 'declining') { codes.push('declining_query'); score += number(weights.declining_query); }
  const queryPages = pagesByQuery.get(normalize(query));
  if (queryPages && queryPages.size > 1) { codes.push('query_multiple_pages'); score += number(weights.query_multiple_pages); }
  const matchedCommercialTerm = commercialTerms.find(term => normalize(query).includes(term));
  if (matchedCommercialTerm) { codes.push('commercial_intent'); score += number(weights.commercial_intent); }
  const commercialPage = commercialPages.has(normalize(page));
  if (commercialPage) { codes.push('hiddenfeeai_relevance'); score += number(weights.hiddenfeeai_relevance); }
  if (!codes.length) continue;
  opportunities.push({
    query,
    page,
    page_path: pagePath(page),
    score,
    reason_codes: codes,
    trend: trend.trend,
    intent_source: matchedCommercialTerm ? 'controlled_term_match' : null,
    matched_commercial_term: matchedCommercialTerm || null,
    hiddenfeeai_relevance: commercialPage,
    evidence: {
      rows: rows.length,
      pages_for_query: queryPages ? Array.from(queryPages) : [normalize(page)],
      clicks,
      impressions,
      ctr,
      representative_position: position,
      trend: trend.evidence,
      high_impressions_low_ctr_thresholds: {
        high_impressions_min: thresholds.high_impressions_min,
        low_ctr_max: thresholds.low_ctr_max,
        applied: hasHighThreshold && hasLowThreshold
      }
    }
  });
}

opportunities.sort((a, b) => b.score - a.score || b.evidence.impressions - a.evidence.impressions || a.query.localeCompare(b.query));
const output = {
  source_status: 'connected',
  generated_at: new Date().toISOString(),
  input_file: path.basename(inputPath),
  records: input.records.length,
  opportunities,
  privacy_note: 'Private Search Console opportunity scores. Do not publish or commit without an explicit privacy review.',
  scoring_note: 'Scores are triage heuristics derived only from imported Search Console rows and the checked-in threshold/configuration file; they are not search-volume or ranking forecasts.'
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log(`Scored ${opportunities.length} opportunities from ${input.records.length} Search Console records to ${outputPath}.`);
