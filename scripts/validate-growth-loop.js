const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'growth-loop.config.json'), 'utf8'));
const workflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'dhf-growth-loop.yml'), 'utf8');
const statePath = path.join(root, config.state_path);
const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, 'utf8')) : null;
const errors = [];

if (!workflow.includes('workflow_dispatch:')) errors.push('workflow_dispatch missing');
if (!workflow.includes("cron: '17 2,8,14,20 * * *'")) errors.push('four-cycle UTC schedule missing');
if (!workflow.includes('actions/cache@v4')) errors.push('persistent state cache missing');
if (!workflow.includes('actions/upload-artifact@v4')) errors.push('digest artifact missing');
if (!workflow.includes('Add daily digest to the run summary')) errors.push('digest summary step missing');
if (!workflow.includes('GROWTH_LOOP_EXTERNAL_SEND: \'1\'')) errors.push('growth loop controlled-send gate missing');
const executor = fs.readFileSync(path.join(root, 'scripts', 'execute-growth-actions.js'), 'utf8');
if (!executor.includes("OUTREACH_SEND_ENABLED !== '1'") || !executor.includes("GROWTH_LOOP_EXTERNAL_SEND !== '1'") || !executor.includes('BREVO_API_KEY')) errors.push('executor safeguard gate missing');
if (!config.outreach || config.outreach.daily_new_recipient_cap !== 4) errors.push('daily new-recipient cap must remain 4');
if (!config.outreach || config.outreach.follow_up_maximum !== 1) errors.push('follow-up maximum must remain 1');
if (config.outreach.growth_loop_sends_email !== false) errors.push('growth loop must not send email');
if (!state) errors.push('private state is missing; run one safe cycle first');
if (state && state.growth_loop?.protected_assets_modified !== false) errors.push('protected asset guard not false');
if (state && state.execution?.no_email_sent_by_growth_loop !== true) errors.push('safe cycle email guard missing');
const actionQueuePath = path.join(root, config.action_queue_path || 'private/growth-engine/growth-action-queue.json');
if (!fs.existsSync(actionQueuePath)) errors.push('action queue is missing; run one cycle first');
if (fs.existsSync(actionQueuePath)) {
  const queue = JSON.parse(fs.readFileSync(actionQueuePath, 'utf8'));
  if (!Array.isArray(queue.actions)) errors.push('action queue actions missing');
  const allowed = new Set(['DISCOVERED','QUALIFIED','READY','EXECUTING','WAITING','SUCCEEDED','FAILED','REJECTED']);
  if ((queue.actions || []).some(item => !allowed.has(item.STATUS))) errors.push('invalid action queue status');
}
if (errors.length) {
  console.error(`Growth Loop validation failed: ${errors.join('; ')}`);
  process.exit(1);
}
console.log(`Growth Loop valid: schedule=4/day, manual_dispatch=true, cap=4, follow_up_max=1, private_state=${Boolean(state)}.`);
