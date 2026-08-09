const fs = require('node:fs');
const path = require('node:path');

const namespaceId = process.env.NAMESPACE_ID;
if (!namespaceId || !/^[a-f0-9]{32}$/i.test(namespaceId)) {
  throw new Error('NAMESPACE_ID must be a Cloudflare KV namespace ID');
}

const root = path.resolve(__dirname, '..');
const target = path.join(root, 'business-reply-worker', 'wrangler.ci.toml');
const content = [
  'name = "detecthiddenfees-business-reply"',
  'main = "src/index.js"',
  'compatibility_date = "2026-08-08"',
  'compatibility_flags = ["nodejs_compat"]',
  '',
  '[[kv_namespaces]]',
  'binding = "REPLY_EVENT_QUEUE"',
  `id = "${namespaceId}"`,
  ''
].join('\n');

fs.writeFileSync(target, content);
console.log(JSON.stringify({ generated: path.relative(root, target), namespace_id_present: true }));
