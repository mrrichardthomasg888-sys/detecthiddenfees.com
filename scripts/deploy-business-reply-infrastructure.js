const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const WORKER_NAME = 'detecthiddenfees-business-reply';
const KV_TITLE = 'detecthiddenfees-business-reply';
const REPLY_ADDRESS = 'research@detecthiddenfees.com';

if (!ACCOUNT_ID || !ZONE_ID || !TOKEN) {
  throw new Error('Missing Cloudflare connection values: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, or CLOUDFLARE_ZONE_ID');
}

const api = 'https://api.cloudflare.com/client/v4';
const headers = { authorization: `Bearer ${TOKEN}`, 'content-type': 'application/json' };

async function request(pathname, options = {}) {
  const response = await fetch(`${api}${pathname}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
  const text = await response.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = null; }
  if (!response.ok || body?.success === false) {
    const details = Array.isArray(body?.errors) ? body.errors.map(error => error.message).filter(Boolean).join('; ') : `HTTP ${response.status}`;
    throw new Error(`Cloudflare API request failed: ${details}`);
  }
  return body;
}

async function ensureNamespace() {
  const listed = await request(`/accounts/${encodeURIComponent(ACCOUNT_ID)}/storage/kv/namespaces`);
  const existing = (listed.result || []).find(item => item.title === KV_TITLE);
  if (existing?.id) return existing.id;
  const created = await request(`/accounts/${encodeURIComponent(ACCOUNT_ID)}/storage/kv/namespaces`, {
    method: 'POST',
    body: JSON.stringify({ title: KV_TITLE })
  });
  if (!created.result?.id) throw new Error('Cloudflare created the KV namespace without returning an ID');
  return created.result.id;
}

function researchRule(rules) {
  return (rules || []).find(rule => (rule.matchers || []).some(matcher =>
    matcher.type === 'literal' && matcher.field === 'to' && String(matcher.value || '').toLowerCase() === REPLY_ADDRESS
  ));
}

function workerAction(rule) {
  return (rule?.actions || []).some(action => action.type === 'worker' && (action.value || []).includes(WORKER_NAME));
}

async function ensureRoutingRule() {
  const listed = await request(`/zones/${encodeURIComponent(ZONE_ID)}/email/routing/rules`);
  const existing = researchRule(listed.result);
  if (existing) {
    if (!workerAction(existing)) {
      throw new Error(`A routing rule already exists for ${REPLY_ADDRESS} but does not target the approved Worker; no rule was changed`);
    }
    if (existing.enabled === false) throw new Error(`The approved ${REPLY_ADDRESS} Worker rule exists but is disabled; no rule was changed`);
    return existing.id;
  }

  const created = await request(`/zones/${encodeURIComponent(ZONE_ID)}/email/routing/rules`, {
    method: 'POST',
    body: JSON.stringify({
      actions: [{ type: 'worker', value: [WORKER_NAME] }],
      matchers: [{ type: 'literal', field: 'to', value: REPLY_ADDRESS }],
      enabled: true,
      name: 'DetectHiddenFees research reply Worker',
      priority: 0,
      source: 'api'
    })
  });
  if (!created.result?.id) throw new Error('Cloudflare created the routing rule without returning an ID');
  return created.result.id;
}

async function main() {
  const phase = process.argv[2] || 'prepare';
  const namespaceId = await ensureNamespace();
  let ruleId = null;
  if (phase === 'activate') ruleId = await ensureRoutingRule();
  else if (phase !== 'prepare') throw new Error(`Unknown phase: ${phase}`);

  const result = { namespace_id: namespaceId, rule_id: ruleId, worker: WORKER_NAME, support_route_changed: false };
  console.log(JSON.stringify(result));
  if (process.env.GITHUB_OUTPUT) {
    const fs = await import('node:fs');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `namespace_id=${namespaceId}\n`);
    if (ruleId) fs.appendFileSync(process.env.GITHUB_OUTPUT, `rule_id=${ruleId}\n`);
  }
}

main().catch(error => {
  console.error(`BUSINESS REPLY INFRASTRUCTURE ERROR: ${error.message}`);
  process.exit(1);
});
