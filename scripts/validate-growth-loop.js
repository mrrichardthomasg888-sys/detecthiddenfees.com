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
if (!workflow.includes('GROWTH_LOOP_EXTERNAL_SEND: \'0\'')) errors.push('growth loop email-send guard missing');
if (!config.outreach || config.outreach.daily_new_recipient_cap !== 4) errors.push('daily new-recipient cap must remain 4');
if (!config.outreach || config.outreach.follow_up_maximum !== 1) errors.push('follow-up maximum must remain 1');
if (config.outreach.growth_loop_sends_email !== false) errors.push('growth loop must not send email');
if (!state) errors.push('private state is missing; run one safe cycle first');
if (state && state.growth_loop?.protected_assets_modified !== false) errors.push('protected asset guard not false');
if (state && state.execution?.no_email_sent_by_growth_loop !== true) errors.push('safe cycle email guard missing');
if (errors.length) {
  console.error(`Growth Loop validation failed: ${errors.join('; ')}`);
  process.exit(1);
}
console.log(`Growth Loop valid: schedule=4/day, manual_dispatch=true, cap=4, follow_up_max=1, private_state=${Boolean(state)}.`);
