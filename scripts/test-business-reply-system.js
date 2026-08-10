import fs from 'node:fs';
import path from 'node:path';
import worker, { classify, suppresses } from '../business-reply-worker/src/index.js';

const root = path.resolve(import.meta.dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-automation.json'), 'utf8'));
const headers = values => ({ get: name => values[String(name).toLowerCase()] || '' });

async function invokeWorker({ subject, text, expected, expectedSuppress }) {
  const stored = [];
  const messageId = `<${expected.toLowerCase()}-${Date.now()}@example.org>`;
  const raw = [
    'From: editor@example.org',
    'To: research@detecthiddenfees.com',
    `Subject: ${subject}`,
    `Message-ID: ${messageId}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    text
  ].join('\r\n');
  await worker.email({
    from: 'editor@example.org',
    to: 'research@detecthiddenfees.com',
    headers: new Headers({ subject, 'message-id': messageId }),
    raw: new Blob([raw]).stream(),
    setReject: reason => { throw new Error(`Worker rejected valid test input: ${reason}`); }
  }, { REPLY_EVENT_QUEUE: { put: async (key, value) => stored.push({ key, value }) } });
  if (stored.length !== 1) throw new Error(`Worker did not write one ${expected} event`);
  const event = JSON.parse(stored[0].value);
  if (event.classification !== expected) throw new Error(`Worker expected ${expected}, got ${event.classification}`);
  if (Boolean(event.suppress) !== expectedSuppress) throw new Error(`Worker suppression flag failed for ${expected}`);
  if (Object.prototype.hasOwnProperty.call(event, 'body')) throw new Error('Worker event must not store a body');
}

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

await invokeWorker({ subject: 'Evidence Review', text: 'Thanks, this is useful for our readers.', expected: 'INTERESTED', expectedSuppress: false });
await invokeWorker({ subject: 'Evidence Review', text: 'Please remove me and do not contact me again.', expected: 'UNSUBSCRIBE', expectedSuppress: true });
await invokeWorker({ subject: 'Delivery failure', text: 'Mail delivery failed: returned mail', expected: 'BOUNCE', expectedSuppress: true });

if (config.email.max_follow_ups !== 1) throw new Error('Follow-up maximum is not one');
if (config.email.follow_up_days !== 8) throw new Error('Follow-up interval is not eight days');
const authorizedCampaign = ['authorized_initial_campaign', 'authorized_batch2_campaign'].includes(config.email.activation_state);
if (config.email.enabled !== false && !authorizedCampaign) throw new Error('External outreach may be enabled only for an explicitly authorized campaign');
if (config.reply_monitor.address !== 'research@detecthiddenfees.com') throw new Error('Business reply address changed');
if (config.reply_monitor.personal_gmail_access !== 'none') throw new Error('Personal Gmail access is not permanently disabled');

console.log(JSON.stringify({
  classification: 'PASS',
  suppression: 'PASS',
  follow_up_cancellation_policy: 'PASS',
  external_outreach_enabled: config.email.enabled === true,
  authorized_campaign: authorizedCampaign,
  personal_gmail_access: 'none'
}));
