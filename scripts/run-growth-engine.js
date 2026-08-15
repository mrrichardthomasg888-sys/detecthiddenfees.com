const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'seo', 'growth-engine.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const statePath = path.join(root, config.state_path);
const privateDir = path.dirname(statePath);
const now = () => new Date().toISOString();
const number = (value, fallback = null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};
const normalize = value => String(value || '').trim().toLowerCase();
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJson = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', 'utf8');
};

function usage() {
  console.error('Usage: node scripts/run-growth-engine.js <run queries.csv pages.csv ga4.json|score|validate>');
  process.exit(1);
}

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
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, (values[index] || '').trim()])));
}

function metricRow(row, source, type) {
  const percent = String(row.CTR || '').replace('%', '');
  const ctr = percent ? number(percent, 0) / 100 : number(row.ctr, null);
  return {
    query: row['Top queries'] || row.query || null,
    page: row['Top pages'] || row.page || null,
    clicks: number(row.Clicks ?? row.clicks, 0),
    impressions: number(row.Impressions ?? row.impressions, 0),
    ctr,
    position: number(row.Position ?? row.position, null),
    source,
    granularity: type
  };
}

function loadCsv(file, source, type) {
  if (!fs.existsSync(file)) throw new Error(`Input file not found: ${file}`);
  return parseCsv(fs.readFileSync(file, 'utf8')).map(row => metricRow(row, source, type));
}

function pctChange(current, previous) {
  if (current === null || previous === null || previous === 0) return null;
  return Number(((current - previous) / Math.abs(previous)).toFixed(4));
}

function windowChanges(current, history, field) {
  const sorted = (history || []).filter(item => item && item[field] !== null && item[field] !== undefined).sort((a, b) => String(a.captured_at).localeCompare(String(b.captured_at)));
  const windows = { '24h': 1, '7d': 7, '28d': 28 };
  return Object.fromEntries(Object.entries(windows).map(([name, days]) => {
    const boundary = Date.now() - days * 86400000;
    const prior = [...sorted].reverse().find(item => Date.parse(item.captured_at) <= boundary);
    return [name, prior ? pctChange(number(current[field], null), number(prior[field], null)) : null];
  }));
}

function intentFor(record) {
  const text = normalize(`${record.query || ''} ${record.page || ''}`);
  if (/before signing|contract|invoice|bill|dealer|construction|fee|review|analyz|check|upload|calculator/.test(text)) return 5;
  if (/ai|document|tool|scan/.test(text)) return 3;
  return 1;
}

function scoreMetric(record, history) {
  const impressions = number(record.impressions, 0);
  const clicks = number(record.clicks, 0);
  const ctr = number(record.ctr, impressions ? clicks / impressions : null);
  const position = number(record.position, null);
  const traffic = Math.min(5, Math.max(1, Math.ceil(Math.log10(impressions + 1) * 2)));
  const purchase = intentFor(record);
  const currentPosition = position === null ? 1 : position <= 10 ? 5 : position <= 20 ? 4 : position <= 30 ? 2 : 1;
  const thresholds = config.scoring.thresholds;
  let ctrOpportunity = 2;
  if (impressions < thresholds.meaningful_impressions) ctrOpportunity = 1;
  else if (position !== null && position <= 10 && ctr !== null && ctr < thresholds.materially_weak_ctr) ctrOpportunity = 5;
  else if (position !== null && position <= 20 && ctr !== null && ctr < thresholds.materially_weak_ctr) ctrOpportunity = 4;
  const authorityGap = position !== null && position <= thresholds.near_page_one_max ? 4 : 2;
  const conversion = /ai-|contract|invoice|bill|fee|calculator|review|dealer|construction/i.test(`${record.query || ''} ${record.page || ''}`) ? 5 : 2;
  const difficulty = position !== null && position <= thresholds.near_page_one_max ? 2 : 3;
  const components = { traffic_potential: traffic, purchase_intent: purchase, current_position: currentPosition, ctr_opportunity: ctrOpportunity, authority_gap: authorityGap, conversion_potential: conversion, execution_difficulty: difficulty };
  const weights = config.scoring.weights;
  const raw = Object.entries(weights).reduce((sum, [key, weight]) => sum + components[key] * weight, 0);
  const priorityScore = Math.max(0, Math.min(100, Math.round(raw * 20 - (difficulty - 1) * 2)));
  const protectedUrl = config.protected_urls.includes(record.page);
  const frozenUrl = config.frozen_urls.includes(record.page);
  let decision = 'monitor';
  let action = 'Keep the existing page stable and wait for stronger evidence.';
  if (protectedUrl) {
    decision = 'authority_distribution_only';
    action = 'Earn relevant citations and referral placements; do not rewrite the protected page.';
  } else if (frozenUrl) {
    decision = 'frozen_monitor_only';
    action = 'Record the signal only; the page is frozen and must not be edited or used for experiments.';
  } else if (position !== null && position <= 10 && ctrOpportunity >= 4) {
    decision = 'propose_snippet_investigation';
    action = 'Investigate search-result intent and snippet mismatch; propose before changing metadata.';
  } else if (position !== null && position <= 10) {
    decision = 'authority_distribution';
    action = 'Strengthen relevant internal authority and pursue editorial/resource distribution; preserve the ranking page.';
  } else if (position !== null && position <= 20) {
    decision = 'authority_content_gap_review';
    action = 'Use safe authority and intent-gap review on the existing page; do not create a competing URL.';
  }
  return {
    id: `${record.granularity}:${normalize(record.query || record.page)}`,
    query: record.query,
    page: record.page,
    source: record.source,
    evidence: { clicks, impressions, ctr, position, granularity: record.granularity },
    changes: {
      clicks: windowChanges(record, history, 'clicks'),
      impressions: windowChanges(record, history, 'impressions'),
      ctr: windowChanges(record, history, 'ctr'),
      position: windowChanges(record, history, 'position')
    },
    score_components: components,
    growth_priority_score: priorityScore,
    decision,
    recommended_action: action,
    protected_asset: protectedUrl,
    frozen_asset: frozenUrl
  };
}

function loadAuthority() {
  const pipeline = readJson(path.join(root, 'seo', 'outreach-pipeline.json'));
  const status = readJson(path.join(root, 'seo', 'outreach-status.json'));
  const mentions = readJson(path.join(root, 'seo', 'earned-mention-log.json'));
  return pipeline.records.map(record => {
    const sent = status.records[record.opportunity_id] || {};
    const mention = mentions.records.find(item => item.opportunity_id === record.opportunity_id) || {};
    const eligibility = sent.sent_at ? new Date(Date.parse(sent.sent_at) + 8 * 86400000).toISOString() : null;
    return {
      prospect: record.publication,
      target_page: record.relevant_url,
      our_resource: record.detecthiddenfees_asset,
      contact: record.public_contact_method,
      outreach_status: sent.status || record.status,
      sent_date: sent.sent_at || null,
      reply: null,
      follow_up_eligibility: eligibility,
      backlink_status: mention.backlink === true ? 'verified' : 'not_verified',
      live_url: mention.link_url || null,
      referral_visitors: mention.referral_traffic ?? null,
      conversions: null,
      serp_presence: null,
      ai_citation_presence: null,
      citation_overlap: false,
      cross_surface_priority: 'standard'
    };
  });
}

function buildState(queryFile, pageFile, ga4File, previous) {
  const queryRows = loadCsv(queryFile, path.basename(queryFile), 'query');
  const pageRows = loadCsv(pageFile, path.basename(pageFile), 'page');
  const mappings = config.known_query_page_mappings;
  const exactRows = queryRows.filter(row => mappings[normalize(row.query)]).map(row => ({ ...row, page: mappings[normalize(row.query)], granularity: 'query_page_joined' }));
  const mappedPages = new Set(exactRows.map(row => row.page));
  const allRows = [...exactRows, ...queryRows.filter(row => !mappings[normalize(row.query)]), ...pageRows.filter(row => !mappedPages.has(row.page))];
  const history = previous?.gsc?.history || [];
  const currentTotals = {
    query_clicks: queryRows.reduce((sum, row) => sum + row.clicks, 0),
    query_impressions: queryRows.reduce((sum, row) => sum + row.impressions, 0),
    page_clicks: pageRows.reduce((sum, row) => sum + row.clicks, 0),
    page_impressions: pageRows.reduce((sum, row) => sum + row.impressions, 0)
  };
  const ga4 = readJson(ga4File);
  const prompts = readJson(path.join(root, config.ai_prompt_file)).prompts.map(prompt => ({ ...prompt, detecthiddenfees_mentioned: null, hiddenfeeai_mentioned: null, competitor_mentioned: null, citation_domains: [], cited_urls: [], observation_status: 'not_run' }));
  const state = {
    version: '1.0.0',
    generated_at: now(),
    privacy: config.privacy,
    gsc: {
      source_status: 'connected_export',
      source_files: [path.basename(queryFile), path.basename(pageFile)],
      source_note: 'Query and page exports are separate dimensions; only the owner-confirmed winner mapping is joined.',
      current_totals: currentTotals,
      changes: { '24h': null, '7d': null, '28d': null },
      history: [...history, { captured_at: now(), ...currentTotals }].slice(-29),
      records: allRows
    },
    ga4: { ...ga4, privacy_note: 'No document contents, filenames, findings, payment data, or PII.' },
    authority: loadAuthority(),
    distribution: config.distribution_queue,
    ai_visibility: { source_status: 'not_run', prompt_count: prompts.length, prompts, citation_overlap_domains: [] },
    experiments: previous?.experiments || [],
    opportunities: allRows.map(row => scoreMetric(row, history)).sort((a, b) => b.growth_priority_score - a.growth_priority_score || b.evidence.impressions - a.evidence.impressions)
  };
  const top = state.opportunities[0] || null;
  state.experiments.push({
    date: new Date().toISOString().slice(0, 10),
    hypothesis: 'Evidence-ranked authority and distribution actions will produce more qualified funnel entries than speculative page changes.',
    action: 'Ingested the current GSC export, scored existing query/page signals, validated the guarded outreach queue, and froze protected assets.',
    channel: 'growth-operations',
    cost: 0,
    visitors: ga4.users ?? null,
    hiddenfeeai_arrivals: ga4.events?.detecthiddenfeeai_arrival ?? null,
    uploads: ga4.events?.upload_started ?? null,
    checkouts: ga4.events?.checkout_started ?? null,
    purchases: ga4.events?.purchase ?? null,
    revenue: ga4.revenue ?? null,
    backlinks: state.authority.filter(item => item.backlink_status === 'verified').length,
    result: top ? `Top scored action: ${top.decision} for ${top.page || top.query}` : 'No scored opportunity.',
    next_decision: top?.recommended_action || 'Collect another reviewed data snapshot.'
  });
  return state;
}

function validateState(state) {
  const errors = [];
  if (!state || state.version !== '1.0.0') errors.push('invalid version');
  if (!state.gsc || !Array.isArray(state.gsc.records)) errors.push('missing gsc records');
  if (!state.ga4 || !state.ga4.events) errors.push('missing ga4 events');
  if (!Array.isArray(state.authority)) errors.push('missing authority');
  if (!Array.isArray(state.distribution)) errors.push('missing distribution');
  if (!Array.isArray(state.ai_visibility?.prompts) || state.ai_visibility.prompts.length !== 25) errors.push('AI prompt set must contain 25 prompts');
  if (!Array.isArray(state.opportunities)) errors.push('missing opportunities');
  const dataOnly = JSON.stringify({ ...state, privacy: null, ga4: { ...state.ga4, privacy_note: null, note: null } });
  if (dataOnly.match(/document contents|contract text|uploaded files|payment card/i)) errors.push('sensitive document marker found');
  if (errors.length) throw new Error(errors.join('; '));
  return true;
}

function runDryRun() {
  const result = spawnSync(process.execPath, [path.join(root, 'scripts', 'outreach-automation.js'), 'dry-run'], { cwd: root, encoding: 'utf8' });
  return { status: result.status === 0 ? 'PASS' : 'FAIL', output: (result.stdout || '').trim(), error: (result.stderr || '').trim() };
}

function main() {
  const [, , command, ...args] = process.argv;
  if (!command) usage();
  if (command === 'run') {
    if (args.length < 3) usage();
    const previous = fs.existsSync(statePath) ? readJson(statePath) : null;
    const state = buildState(path.resolve(args[0]), path.resolve(args[1]), path.resolve(args[2]), previous);
    state.execution = { outreach_queue_safety_dry_run: runDryRun(), no_email_sent: true, protected_assets_modified: false };
    validateState(state);
    writeJson(statePath, state);
    console.log(JSON.stringify({ state_path: config.state_path, top_10: state.opportunities.slice(0, 10), execution: state.execution }, null, 2));
    return;
  }
  if (command === 'score' || command === 'validate') {
    if (!fs.existsSync(statePath)) throw new Error(`Private state not found: ${statePath}`);
    const state = readJson(statePath);
    validateState(state);
    if (command === 'score') console.log(JSON.stringify(state.opportunities.slice(0, 10), null, 2));
    else console.log(`Growth Engine state valid: opportunities=${state.opportunities.length}, prompts=${state.ai_visibility.prompts.length}, private_state=true.`);
    return;
  }
  usage();
}

main();
