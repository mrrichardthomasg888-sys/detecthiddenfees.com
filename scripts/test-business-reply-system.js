import fs from 'node:fs';
import path from 'node:path';
import { classify, suppresses } from '../business-reply-worker/src/index.js';

const root = path.resolve(import.meta.dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-automation.json'), 'utf8'));
const headers = values => ({ get: name => values[String(name).toLowerCase()] || '' });

const cases = [
  ['positive', 'Thanks — this looks useful for our readers.', 'INTERESTED', false],
  ['question', 'Could you clarify how the evidence was collected?', 'QUESTION', false],
  ['declined', 'No thanks, this is not a fit for us.', 'DECLINED', true],
  ['unsubscribe', 'Please remove me and do not contact me again.', 'UNSUBSCRIBE', true],
  ['bounce', 'Mail delivery failed: returned mail', 'BOUNCE', true],
  ['out-of-office', 'Automatic reply: I am out of office.', 'OUT_OF_OFFICE', false],
  ['uncertain', 'I received your note.', 'UNCERTAIN', false]
];

for (const [name, text, expected, shouldSuppress] of cases) {
  const actual = classify({ subject: 'Evidence Review', text, headers: headers({}), sender: 'editor@example.org' });
  if (actual !== expected) throw new Error(`${name}: expected ${expected}, got ${actual}`);
  if (suppresses(actual) !== shouldSuppress) throw new Error(`${name}: suppression expectation failed`);
}

if (config.email.max_follow_ups !== 1) throw new Error('Follow-up maximum is not one');
if (config.email.follow_up_days !== 8) throw new Error('Follow-up interval is not eight days');
if (config.email.enabled !== false) throw new Error('External outreach must remain disabled during infrastructure testing');
if (config.reply_monitor.address !== 'research@detecthiddenfees.com') throw new Error('Business reply address changed');
if (config.reply_monitor.personal_gmail_access !== 'none') throw new Error('Personal Gmail access is not permanently disabled');

console.log(JSON.stringify({
  classification: 'PASS',
  suppression: 'PASS',
  follow_up_cancellation_policy: 'PASS',
  external_outreach_enabled: false,
  personal_gmail_access: 'none'
}));
