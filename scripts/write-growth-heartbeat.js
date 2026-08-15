const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'private', 'growth-engine', 'heartbeat.json');
const event = process.argv[2] || 'cycle';
const status = process.argv[3] || 'ok';
const payload = {
  event,
  status,
  at: new Date().toISOString(),
  run_id: process.env.GROWTH_LOOP_RUN_ID || null,
  process: 'dhf-growth-loop',
  protected_assets_modified: false
};
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log(JSON.stringify({ status: 'PASS', heartbeat: event }));
