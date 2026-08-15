const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo', 'growth-loop-browser.config.json'), 'utf8'));
const storageState = path.join(root, config.storage_state);

function safeState() {
  return fs.existsSync(storageState) ? storageState : undefined;
}

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: safeState() });
  const results = [];
  for (const target of config.targets) {
    const errors = [];
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(String(error.message || error).slice(0, 200)));
    try {
      const response = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const metrics = await page.evaluate(() => ({
        title: document.title,
        h1_count: document.querySelectorAll('h1').length,
        horizontal_overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        canonical: document.querySelector('link[rel="canonical"]')?.href || null
      }));
      results.push({ name: target.name, url: target.url, http: response?.status() || null, ...metrics, console_errors: errors });
    } catch (error) {
      results.push({ name: target.name, url: target.url, http: null, error: String(error.message || error).slice(0, 240), console_errors: errors });
    } finally {
      await page.close();
    }
  }
  await context.close();
  await browser.close();
  const failed = results.some(item => item.http !== 200 || item.error || item.horizontal_overflow || item.console_errors.length);
  console.log(JSON.stringify({
    status: failed ? 'FAIL' : 'PASS',
    mode: config.policy.default_mode,
    submissions_attempted: 0,
    auth_state_used: Boolean(safeState()),
    results
  }, null, 2));
  if (failed) process.exitCode = 1;
}

if (process.argv[2] !== 'verify') {
  console.error('Usage: node scripts/playwright-worker.js verify');
  process.exit(1);
}
verify().catch(error => { console.error(`PLAYWRIGHT WORKER ERROR: ${error.message}`); process.exit(1); });
