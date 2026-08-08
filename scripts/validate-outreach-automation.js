const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-automation.json'), 'utf8'));
const messages = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-messages.json'), 'utf8'));
const pipeline = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'outreach-pipeline.json'), 'utf8'));
const errors = [];
if (config.email.enabled !== false) errors.push('Email automation must default to disabled');
if (config.email.initial_batch_max !== 4) errors.push('Initial batch maximum must remain 4');
if (config.email.bcc_allowed !== false) errors.push('BCC must remain disabled');
if (config.email.max_follow_ups !== 1) errors.push('Maximum follow-ups must remain 1');
if (config.email.required_sender_address !== 'support@detecthiddenfees.com') errors.push('Sender must remain support@detecthiddenfees.com');
if (config.email.required_reply_to_address !== 'support@detecthiddenfees.com') errors.push('Reply-To must remain support@detecthiddenfees.com');
if (config.safety.never_send_to_contact_form_automatically !== true) errors.push('Contact-form automation must remain disabled');
const ids = new Set();
if (!messages.source_asset || !/^https:\/\//.test(messages.source_asset)) errors.push('Missing public source asset URL');
for (const message of messages.messages) {
  if (ids.has(message.opportunity_id)) errors.push(`Duplicate message ${message.opportunity_id}`);
  ids.add(message.opportunity_id);
  const record = pipeline.records.find(item => item.opportunity_id === message.opportunity_id);
  if (!record) errors.push(`Message has no pipeline record: ${message.opportunity_id}`);
  if (!message.subject || !message.body) errors.push(`Incomplete message: ${message.opportunity_id}`);
  if (/bit\.ly|tinyurl|t\.co|ow\.ly|goo\.gl|shorturl/i.test(message.body)) errors.push(`URL shortener found: ${message.opportunity_id}`);
  if (message.sendable_by_automation && !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(record?.public_contact_method || '')) errors.push(`Sendable message lacks public email: ${message.opportunity_id}`);
  if (message.body.includes('password') || message.body.includes('document contents')) errors.push(`Sensitive-content marker in message: ${message.opportunity_id}`);
}
const serialized = JSON.stringify({ config, messages });
if (/api[_-]?key\s*[:=]\s*[A-Za-z0-9_-]{20,}/i.test(serialized)) errors.push('Possible API key in public automation files');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Outreach automation valid: messages=${messages.messages.length}, default_send_enabled=${config.email.enabled}, no_secrets_detected=true.`);
