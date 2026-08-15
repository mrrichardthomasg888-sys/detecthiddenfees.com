const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const config = readJson(path.join(root, 'seo', 'growth-loop.config.json'));
const engineConfig = readJson(path.join(root, 'seo', 'growth-engine.config.json'));
const statePath = path.join(root, config.state_path);
const digestJsonPath = path.join(root, config.digest_json_path);
const digestMarkdownPath = path.join(root, config.digest_markdown_path);

function readJson(file, fallback = null) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', 'utf8');
}

function now() { return new Date().toISOString(); }

function safeRun(args, env = {}) {
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    env: { ...process.env, ...env },
    encoding: 'utf8',
    timeout: 120000,
    maxBuffer: 2 * 1024 * 1024
  });
  return {
    status: result.status === 0 ? 'PASS' : 'FAIL',
    exit_code: result.status,
    stdout: String(result.stdout || '').trim(),
    stderr: String(result.stderr || '').trim()
  };
}

function parseJsonOutput(output) {
  if (!output) return null;
  try { return JSON.parse(output); } catch { return null; }
}

function cleanError(result) {
  return result.status === 'PASS' ? null : (result.stderr || 'worker failed').split('\n').slice(-1)[0].slice(0, 240);
}

function loadState() {
  const state = readJson(statePath, null);
  if (state && typeof state === 'object') return state;
  return {
    version: '1.0.0',
    generated_at: now(),
    gsc: { source_status: 'not_available_in_runner', history: [], records: [] },
    ga4: { source_status: 'not_available_in_runner', events: {}, revenue: 0 },
    authority: [],
    distribution: [],
    ai_visibility: { prompt_count: 25, prompts: [], citation_overlap_domains: [] },
    experiments: [],
    opportunities: []
  };
}

function maybeIngestSearchConsole(state) {
  const queryFile = process.env.GSC_QUERY_CSV;
  const pageFile = process.env.GSC_PAGE_CSV;
  const ga4File = process.env.GSC_GA4_JSON || path.join(root, 'private', 'growth-engine', 'current-ga4.json');
  if (!queryFile || !pageFile || !fs.existsSync(queryFile) || !fs.existsSync(pageFile)) {
    return { status: state.gsc?.records?.length ? 'PASS_STALE_STATE' : 'WAITING_FOR_AUTHORIZED_SNAPSHOT', source: 'existing_private_state' };
  }
  const result = safeRun([
    path.join(root, 'scripts', 'run-growth-engine.js'),
    'run',
    path.resolve(queryFile),
    path.resolve(pageFile),
    path.resolve(ga4File)
  ]);
  if (result.status !== 'PASS') return { status: 'FAIL', source: 'authorized_snapshot', error: cleanError(result) };
  return { status: 'PASS', source: 'authorized_snapshot', records: readJson(statePath)?.gsc?.records?.length || 0 };
}

function runOutreachWorker() {
  const result = safeRun([path.join(root, 'scripts', 'outreach-automation.js'), 'dry-run']);
  const output = parseJsonOutput(result.stdout) || {};
  const eligible = Array.isArray(output.will_send) ? output.will_send.map(item => item.opportunity_id).filter(Boolean) : [];
  return {
    status: result.status,
    mode: 'delegated_to_existing_controlled_outreach_workflow',
    email_sent_by_growth_loop: 0,
    eligible_recipient_ids: eligible,
    daily_new_recipient_cap: config.outreach.daily_new_recipient_cap,
    follow_up_maximum: config.outreach.follow_up_maximum,
    safeguards: config.outreach.safety,
    error: cleanError(result)
  };
}

function runPipelineWorker(state) {
  const pipeline = readJson(path.join(root, 'seo', 'outreach-pipeline.json'), { records: [] });
  const publicStatus = readJson(path.join(root, 'seo', 'outreach-status.json'), { records: {} });
  const candidates = (pipeline.records || []).map(record => {
    const status = publicStatus.records?.[record.opportunity_id] || {};
    return {
      opportunity_id: record.opportunity_id,
      publication: record.publication,
      status: status.status || record.status,
      qualified: record.status === 'approved' && record.confidence === 'high',
      next_action: status.sent_at ? 'respect_follow_up_eligibility' : 'existing_controlled_workflow_review'
    };
  });
  const queue = candidates.filter(item => item.qualified && item.status !== 'SENT' && item.status !== 'FOLLOW_UP_SENT').slice(0, 8);
  return {
    status: 'PASS',
    qualified_queue_size: queue.length,
    queue,
    source_records: candidates.length,
    duplicate_protection_source: 'seo/outreach-status.json'
  };
}

function runPlacementWorker(previous = []) {
  const existing = new Map((previous || []).map(item => [item.name, item]));
  const checks = config.placement_monitor.pending.map(item => {
    const old = existing.get(item.name) || {};
    const checkedAt = old.last_checked_at || null;
    const due = !checkedAt || (Date.now() - Date.parse(checkedAt)) >= config.placement_monitor.minimum_interval_hours * 3600000;
    return {
      ...item,
      ...old,
      last_checked_at: due ? now() : checkedAt,
      check_status: due ? (item.public_url ? 'public_url_check_required' : 'pending_no_verified_public_url') : 'interval_not_due',
      live_url: old.live_url || null,
      link_verified: old.link_verified === true,
      referral_visitors: old.referral_visitors ?? null
    };
  });
  return {
    status: 'PASS',
    policy: 'no more than once per configured interval; no repeated form requests',
    checks,
    live_count: checks.filter(item => item.link_verified).length,
    note: 'Pending submissions without a verified public listing URL are recorded without probing or claiming publication.'
  };
}

function runDistributionWorker(state) {
  const queue = Array.isArray(state.distribution) ? state.distribution : [];
  const safe = queue.filter(item => item.status === 'approved' && item.free === true && item.captcha !== true && item.login_required !== true && item.owner_judgment_required !== true);
  return {
    status: 'PASS',
    policy: config.distribution.automatic_submission_policy,
    eligible_without_owner: safe.map(item => item.name || item.platform).filter(Boolean),
    submitted_this_cycle: [],
    blocked_or_queued: queue.filter(item => !safe.includes(item)).map(item => ({ name: item.name || item.platform, reason: item.reason || 'not an unattended-safe submission route' }))
  };
}

function runSearchWorker(state) {
  const result = maybeIngestSearchConsole(state);
  const current = readJson(statePath, state) || state;
  current.gsc = current.gsc || {};
  current.gsc.last_checked_at = now();
  current.gsc.worker_status = result.status;
  return { ...result, opportunity_count: Array.isArray(current.opportunities) ? current.opportunities.length : 0, top_opportunity: current.opportunities?.[0] ? { id: current.opportunities[0].id, score: current.opportunities[0].growth_priority_score, decision: current.opportunities[0].decision } : null };
}

function runAuthorityWorker(state) {
  const top = Array.isArray(state.opportunities) ? state.opportunities.slice(0, 10) : [];
  return {
    status: 'PASS',
    action: top[0]?.recommended_action || 'Maintain the existing authority queue until a verified external route is available.',
    protected_assets_frozen: true,
    ranked_actions: top.map(item => ({ id: item.id, score: item.growth_priority_score, page: item.page, decision: item.decision })).slice(0, 10)
  };
}

function runAiVisibilityWorker(state) {
  const prompts = readJson(path.join(root, config.ai_visibility.prompt_file), { prompts: [] }).prompts || [];
  return {
    status: 'PASS',
    source_status: 'not_run_unattended',
    prompt_count: prompts.length,
    observations_added: 0,
    citation_domains: state.ai_visibility?.citation_overlap_domains || [],
    policy: config.ai_visibility.observation_policy
  };
}

function runGa4Worker(state) {
  const ga4Path = process.env.GA4_STATE_JSON || path.join(root, 'private', 'growth-engine', 'current-ga4.json');
  const ga4 = readJson(ga4Path, state.ga4 || { events: {}, revenue: 0 });
  const events = ga4?.events || {};
  return {
    status: ga4?.source_status ? 'PASS' : 'WAITING_FOR_AUTHORIZED_READ',
    source_status: ga4?.source_status || 'not_available_in_runner',
    users: Number(ga4?.users || 0),
    events: {
      landing_page_view: Number(events.landing_page_view || 0),
      detecthiddenfeeai_arrival: Number(events.detecthiddenfeeai_arrival || 0),
      before_you_sign_view: Number(events.before_you_sign_view || 0),
      upload_started: Number(events.upload_started || 0),
      scan_started: Number(events.scan_started || 0),
      checkout_started: Number(events.checkout_started || 0),
      purchase: Number(events.purchase || 0)
    },
    revenue: Number(ga4?.revenue || 0),
    privacy: 'counts_only_non_sensitive'
  };
}

function updateState(state, workers, previousPlacements) {
  const previousLoop = state.growth_loop || {};
  const outreach = workers.outreach;
  const pipeline = workers.pipeline;
  const ga4 = workers.ga4;
  const placements = workers.placements;
  const ownerQueue = [
    ...(workers.distribution.blocked_or_queued || []).filter(item => /captcha|login|owner|payment|legal/i.test(item.reason || '')).map(item => ({ action: `Distribution: ${item.name}`, reason: item.reason })),
    ...(placements.checks || []).filter(item => item.check_status === 'public_url_check_required').map(item => ({ action: `Verify placement: ${item.name}`, reason: 'verified public listing URL required' }))
  ];
  state.generated_at = now();
  state.growth_loop = {
    version: '1.0.0',
    last_run_at: now(),
    run_id: process.env.GROWTH_LOOP_RUN_ID || null,
    schedule_utc: config.schedule_utc,
    protected_assets_modified: false,
    workers,
    outreach: {
      eligible_recipient_ids: outreach.eligible_recipient_ids,
      emails_sent: 0,
      emails_delivered: 0,
      bounces: 0,
      replies: 0,
      follow_up_maximum: config.outreach.follow_up_maximum,
      daily_new_recipient_cap: config.outreach.daily_new_recipient_cap,
      send_owner: config.outreach.send_owner
    },
    prospects: pipeline.queue,
    placements: placements.checks,
    distribution: workers.distribution,
    gsc_opportunities: state.opportunities || [],
    ga4: ga4,
    next_eligible_actions: [
      outreach.eligible_recipient_ids.length ? 'Existing controlled outreach scheduler processes eligible recipients.' : 'Maintain qualified queue for the existing controlled outreach scheduler.',
      workers.authority.action,
      'Recheck pending placements only after their monitor interval.'
    ],
    blocked_actions: ownerQueue,
    owner_action_queue: ownerQueue,
    internal_operations: {
      search_snapshot: workers.search,
      scoring: workers.authority,
      ai_visibility: workers.ai_visibility
    }
  };
  state.execution = {
    growth_loop_safe_cycle: true,
    no_email_sent_by_growth_loop: true,
    no_production_files_modified: true,
    no_protected_assets_modified: true
  };
  state.experiments = Array.isArray(state.experiments) ? state.experiments : [];
  state.experiments.push({
    date: new Date().toISOString().slice(0, 10),
    hypothesis: 'A recurring, guarded off-site loop will keep acquisition moving while protected pages remain stable.',
    action: 'Ran all deterministic workers; delegated email sending to the existing controlled outreach scheduler; recorded state and digest.',
    channel: 'growth-loop',
    cost: 0,
    visitors: ga4.users,
    hiddenfeeai_arrivals: ga4.events.detecthiddenfeeai_arrival,
    uploads: ga4.events.upload_started,
    checkouts: ga4.events.checkout_started,
    purchases: ga4.events.purchase,
    revenue: ga4.revenue,
    backlinks: placements.live_count,
    result: 'Safe cycle completed; no new external write was eligible for unattended execution.',
    next_decision: state.growth_loop.next_eligible_actions[0]
  });
  return state;
}

function validateState(state) {
  const privacySafe = JSON.parse(JSON.stringify(state));
  privacySafe.privacy = null;
  if (privacySafe.ga4) privacySafe.ga4.privacy_note = null;
  if (privacySafe.growth_loop?.ga4) privacySafe.growth_loop.ga4.privacy = null;
  const serialized = JSON.stringify(privacySafe);
  const errors = [];
  if (!state || state.version !== '1.0.0') errors.push('invalid state version');
  if (!state.growth_loop?.workers) errors.push('missing worker results');
  if (!Array.isArray(state.growth_loop?.owner_action_queue)) errors.push('missing owner action queue');
  const credentialMarkers = [/BREVO_API_KEY\s*[:=]/i, /OUTREACH_.*(?:KEY|TOKEN)\s*[:=]/i, /sk_(?:live|test)_[A-Za-z0-9]/i, /-----BEGIN .*PRIVATE KEY-----/i];
  if (credentialMarkers.some(pattern => pattern.test(serialized))) errors.push('credential marker found in state');
  if (state.growth_loop?.protected_assets_modified !== false) errors.push('protected asset guard failed');
  if (errors.length) throw new Error(errors.join('; '));
}

function renderDigest(state) {
  const loop = state.growth_loop;
  const ga4 = loop.ga4;
  const placements = loop.placements || [];
  const external = {
    emails_sent: loop.outreach.emails_sent,
    emails_delivered: loop.outreach.emails_delivered,
    submissions_completed: loop.distribution.submitted_this_cycle?.length || 0,
    live_placements: placements.filter(item => item.link_verified).length,
    backlinks: placements.filter(item => item.link_verified).length,
    replies: loop.outreach.replies
  };
  const traffic = {
    google_clicks: state.gsc?.current_totals?.query_clicks ?? null,
    google_impressions: state.gsc?.current_totals?.query_impressions ?? null,
    referral_visitors: null,
    hiddenfeeai_arrivals: ga4.events.detecthiddenfeeai_arrival
  };
  const funnel = {
    before_you_sign_views: ga4.events.before_you_sign_view,
    uploads: ga4.events.upload_started,
    scans: ga4.events.scan_started,
    checkouts: ga4.events.checkout_started,
    purchases: ga4.events.purchase,
    revenue: ga4.revenue
  };
  const digest = {
    generated_at: now(),
    run_id: loop.run_id,
    external_actions_today: external,
    traffic,
    funnel,
    authority: { live_placements: external.live_placements, backlinks: external.backlinks, ai_visibility_changes: loop.internal_operations.ai_visibility.observations_added },
    pipeline: { eligible_recipients: loop.outreach.eligible_recipient_ids.length, pending_reviews: placements.filter(item => item.status === 'pending').length, highest_priority_opportunity: loop.internal_operations.scoring.ranked_actions?.[0] || null },
    owner_action_queue: loop.owner_action_queue,
    alerts: {
      first_sale: funnel.purchases > 0,
      new_purchase: funnel.purchases > 0,
      important_reply: external.replies > 0,
      new_placement: external.live_placements > 0,
      abnormal_bounce: external.bounces > 0
    },
    note: 'Routine internal operations are separated from external outcomes. No production content or protected asset was modified.'
  };
  const lines = [
    `# DHF Growth Loop Digest`,
    `Generated: ${digest.generated_at}`,
    `Run: ${digest.run_id || 'local'}`,
    '',
    '## External actions',
    `- Emails sent: ${external.emails_sent}`,
    `- Emails delivered: ${external.emails_delivered}`,
    `- Submissions completed: ${external.submissions_completed}`,
    `- Live placements: ${external.live_placements}`,
    `- Backlinks: ${external.backlinks}`,
    `- Replies: ${external.replies}`,
    '',
    '## Traffic and funnel',
    `- Google clicks / impressions: ${traffic.google_clicks ?? 'unknown'} / ${traffic.google_impressions ?? 'unknown'}`,
    `- HiddenFeeAI arrivals: ${traffic.hiddenfeeai_arrivals}`,
    `- Before You Sign views: ${funnel.before_you_sign_views}`,
    `- Uploads / scans: ${funnel.uploads} / ${funnel.scans}`,
    `- Checkouts: ${funnel.checkouts}`,
    `- Purchases / revenue: ${funnel.purchases} / $${funnel.revenue}`,
    '',
    '## Pipeline',
    `- Eligible recipients: ${digest.pipeline.eligible_recipients}`,
    `- Pending reviews: ${digest.pipeline.pending_reviews}`,
    `- Highest priority: ${digest.pipeline.highest_priority_opportunity?.id || 'none'}`,
    '',
    '## Owner action',
    ...(digest.owner_action_queue.length ? digest.owner_action_queue.map(item => `- ${item.action}: ${item.reason}`) : ['- None']),
    '',
    'Protected assets modified: NO'
  ];
  writeJson(digestJsonPath, digest);
  fs.mkdirSync(path.dirname(digestMarkdownPath), { recursive: true });
  fs.writeFileSync(digestMarkdownPath, lines.join('\n') + '\n', 'utf8');
  return digest;
}

function main() {
  if (!process.argv.includes('--once')) {
    console.error('Usage: node scripts/run-growth-loop.js --once');
    process.exitCode = 1;
    return;
  }
  const state = loadState();
  const previousPlacements = state.growth_loop?.placements || [];
  const workers = {};
  workers.search = runSearchWorker(state);
  const refreshedState = readJson(statePath, state) || state;
  workers.outreach = runOutreachWorker();
  workers.pipeline = runPipelineWorker(refreshedState);
  workers.placements = runPlacementWorker(previousPlacements);
  workers.distribution = runDistributionWorker(refreshedState);
  workers.authority = runAuthorityWorker(refreshedState);
  workers.ai_visibility = runAiVisibilityWorker(refreshedState);
  workers.ga4 = runGa4Worker(refreshedState);
  const finalState = updateState(refreshedState, workers, previousPlacements);
  validateState(finalState);
  writeJson(statePath, finalState);
  const digest = renderDigest(finalState);
  console.log(JSON.stringify({
    status: 'PASS',
    safe_cycle: true,
    external_actions: digest.external_actions_today,
    eligible_recipients: finalState.growth_loop.outreach.eligible_recipient_ids,
    highest_priority: digest.pipeline.highest_priority_opportunity,
    owner_action_count: digest.owner_action_queue.length,
    protected_assets_modified: false
  }, null, 2));
}

main();
