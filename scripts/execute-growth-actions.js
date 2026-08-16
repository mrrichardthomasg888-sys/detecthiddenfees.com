const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const queue = require('./growth-action-queue');

const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'growth-loop.config.json'), 'utf8'));

function output(value) { console.log(JSON.stringify(value, null, 2)); }

function plan() {
  const state = queue.loadQueue();
  const ready = (state.actions || []).filter(item => item.STATUS === 'READY' && !item.OWNER_REQUIRED).slice(0, config.executor.max_actions_per_cycle);
  output({ status: 'PASS', mode: 'plan', ready_actions: ready.map(item => item.ACTION_ID), external_actions_executed: [] });
}

function sendOutreach() {
  if (process.env.OUTREACH_SEND_ENABLED !== '1' || process.env.GROWTH_LOOP_EXTERNAL_SEND !== '1' || !process.env.BREVO_API_KEY) {
    console.error('EXECUTOR BLOCKED: existing outreach safeguards did not authorize direct sending.');
    process.exitCode = 2;
    return;
  }
  const result = spawnSync(process.execPath, [path.join(root, 'scripts', 'outreach-automation.js'), 'send'], { cwd: root, encoding: 'utf8', stdio: 'pipe', timeout: 120000 });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) process.exitCode = result.status || 1;
}

const mode = process.argv[2];
if (mode === '--plan') plan();
else if (mode === '--outreach') sendOutreach();
else {
  console.error('Usage: node scripts/execute-growth-actions.js --plan|--outreach');
  process.exitCode = 1;
}
