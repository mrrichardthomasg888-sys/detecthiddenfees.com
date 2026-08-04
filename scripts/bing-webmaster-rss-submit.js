const fs = require('node:fs');
const path = require('node:path');

const SITE_ORIGIN = 'https://detecthiddenfees.com';
const RSS_URL = `${SITE_ORIGIN}/rss.xml`;
const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
const BING_ENDPOINT = 'https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch';
const BING_API_ROOT = 'https://ssl.bing.com/webmaster/api.svc/json';
const API_KEY = process.env.BING_WEBMASTER_API_KEY || '';
const STATE_FILE = process.env.BING_STATE_FILE || path.join('.cache', 'bing-rss-submission.json');
const BATCH_SIZE = 10;
const MAX_URLS = 50;
const DRY_RUN = process.env.BING_DRY_RUN === 'true';
const SUBMIT_DEPLOYMENT_URLS = process.env.BING_SUBMIT_DEPLOYMENT_URLS === 'true';
const DEPLOYMENT_UPDATED = '2026-08-04T00:00:00.000Z';

const deploymentUrls = [
  'calculator-authority-center',
  'contract-cost-calculator',
  'automatic-renewal-calculator',
  'price-escalation-calculator',
  'termination-fee-calculator',
  'late-fee-calculator',
  'subscription-cost-calculator',
  'service-fee-calculator',
  'processing-fee-calculator',
  'convenience-fee-calculator',
  'contract-risk-calculator',
  'hidden-fee-risk-calculator',
  'invoice-calculator',
  'negotiation-savings-calculator',
  'consumer-savings-calculator',
  'hidden-fee-transparency-index',
  'contract-clause-library',
].map(slug => `${SITE_ORIGIN}/${slug}`);

const excludedPath = /(^|\/)(admin|wp-admin|cgi-bin|tmp|logs)(\/|$)|indexnow|search|privacy|terms|security|contact|about|disclosure|editorial-policy|corrections/i;
const nonEditorialExtension = /\.(?:html|xml|txt|css|js|json|png|jpe?g|gif|svg|webp|pdf|woff2?)$/i;

function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").trim();
}

function tagValue(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? decodeXml(match[1]) : '';
}

function parseRss(xml) {
  const items = [];
  for (const block of xml.match(/<item\b[\s\S]*?<\/item>/gi) || []) {
    const link = tagValue(block, 'link');
    const guid = tagValue(block, 'guid');
    const updated = tagValue(block, 'updated') || tagValue(block, 'pubDate');
    const title = tagValue(block, 'title');
    if (link) items.push({ link, guid, updated, title });
  }
  return items;
}

function canonicalize(raw) {
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' || url.hostname !== 'detecthiddenfees.com' || url.port || url.search || url.hash) return null;
    if (url.pathname === '/' || excludedPath.test(url.pathname) || nonEditorialExtension.test(url.pathname)) return null;
    return `${SITE_ORIGIN}${url.pathname.replace(/\/$/, '')}`;
  } catch {
    return null;
  }
}

function findCanonical(html) {
  const patterns = [
    /<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i,
    /<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["']canonical["'][^>]*>/i,
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1].trim();
  }
  return '';
}

function hasNoindex(html) {
  const head = (html.match(/<head\b[\s\S]*?<\/head>/i) || [''])[0];
  return /<meta\b[^>]*(?:name|property)=["'](?:robots|googlebot|bingbot)["'][^>]*content=["'][^"']*noindex/i.test(head);
}

function fingerprint(item) {
  return `${item.updated}|${item.title}`;
}

function readState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); }
  catch { return { submitted: {} }; }
}

function writeState(state) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

async function getText(url) {
  const response = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'DetectHiddenFees-BingSubmission/1.0' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

async function bingRequest(method, params = {}, body = undefined) {
  const query = new URLSearchParams({ ...params, apikey: API_KEY }).toString();
  const response = await fetch(`${BING_API_ROOT}/${method}?${query}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'DetectHiddenFees-BingSubmission/1.0' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Bing ${method} returned HTTP ${response.status}`);
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text).d ?? JSON.parse(text); }
  catch { return null; }
}

function field(value, ...names) {
  if (!value || typeof value !== 'object') return undefined;
  for (const name of names) if (value[name] !== undefined) return value[name];
  return undefined;
}

async function verifyBingAccessAndSitemap() {
  const sites = await bingRequest('GetUserSites');
  const siteList = Array.isArray(sites) ? sites : (sites?.sites || sites?.Sites || []);
  const registered = siteList.find(site => {
    const url = field(site, 'Url', 'url', 'SiteUrl', 'siteUrl');
    return typeof url === 'string' && url.replace(/\/$/, '').toLowerCase() === SITE_ORIGIN;
  });
  if (!registered) throw new Error('Bing API authentication succeeded, but the production site is not registered to this account');
  console.log('Bing authentication: succeeded; production site is registered and owned by the API account.');

  const quota = await bingRequest('GetUrlSubmissionQuota', { siteUrl: SITE_ORIGIN });
  const daily = field(quota, 'DailyQuota', 'dailyQuota');
  const monthly = field(quota, 'MonthlyQuota', 'monthlyQuota');
  console.log(`Bing URL submission quota: daily ${daily ?? 'unreported'}; monthly ${monthly ?? 'unreported'}.`);

  const feeds = await bingRequest('GetFeeds', { siteUrl: SITE_ORIGIN });
  const feedList = Array.isArray(feeds) ? feeds : (feeds?.feeds || feeds?.Feeds || []);
  const sitemapFeed = feedList.find(feed => {
    const url = field(feed, 'Url', 'url', 'FeedUrl', 'feedUrl');
    return typeof url === 'string' && url.replace(/\/$/, '') === SITEMAP_URL;
  });
  if (sitemapFeed) {
    console.log('Bing sitemap registration: already registered.');
    try {
      const details = await bingRequest('GetFeedDetails', { siteUrl: SITE_ORIGIN, feedUrl: SITEMAP_URL });
      const status = field(details, 'Status', 'status', 'LastCrawlStatus', 'lastCrawlStatus');
      const lastCrawl = field(details, 'LastCrawlDate', 'lastCrawlDate', 'LastCrawl', 'lastCrawl');
      console.log(`Bing sitemap status: ${status ?? 'registered'}${lastCrawl ? `; latest crawl ${lastCrawl}` : ''}.`);
    } catch {
      console.log('Bing sitemap status: registered; crawl detail was not returned by the API.');
    }
  } else {
    await bingRequest('SubmitFeed', {}, { siteUrl: SITE_ORIGIN, feedUrl: SITEMAP_URL });
    console.log('Bing sitemap registration: submitted successfully.');
  }
  return quota;
}

async function validateItem(item) {
  const url = canonicalize(item.link);
  if (!url) return { accepted: false, reason: 'noncanonical-or-noneditorial' };
  try {
    const response = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'DetectHiddenFees-BingSubmission/1.0' } });
    if (response.status !== 200) return { accepted: false, reason: 'not-http-200' };
    const html = await response.text();
    if (hasNoindex(html)) return { accepted: false, reason: 'noindex' };
    const pageCanonical = canonicalize(findCanonical(html));
    if (pageCanonical !== url) return { accepted: false, reason: 'self-canonical-mismatch' };
    return { accepted: true, url, item };
  } catch {
    return { accepted: false, reason: 'validation-request-failed' };
  }
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function submitBatch(urlList) {
  let lastStatus = 0;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(`${BING_ENDPOINT}?apikey=${encodeURIComponent(API_KEY)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'DetectHiddenFees-BingSubmission/1.0' },
      body: JSON.stringify({ siteUrl: SITE_ORIGIN, urlList }),
    });
    lastStatus = response.status;
    if (response.ok) return { ok: true, status: response.status };
    if (![408, 425, 429, 500, 502, 503, 504].includes(response.status)) break;
    await sleep(1000 * (2 ** (attempt - 1)));
  }
  return { ok: false, status: lastStatus };
}

async function main() {
  if (!DRY_RUN && !API_KEY) {
    console.error('BING_WEBMASTER_API_KEY is not configured. Add it to GitHub repository secrets before running this workflow.');
    process.exitCode = 2;
    return;
  }

  let rss;
  try { rss = await getText(RSS_URL); }
  catch { console.error('The live RSS feed was unavailable or could not be downloaded. No URLs were submitted.'); process.exitCode = 1; return; }
  if (!/<rss\b/i.test(rss) || !/<channel\b/i.test(rss)) { console.error('The live RSS feed was invalid. No URLs were submitted.'); process.exitCode = 1; return; }

  if (!DRY_RUN) await verifyBingAccessAndSitemap();

  const rawItems = parseRss(rss);
  const seen = new Set();
  const items = rawItems.filter(item => {
    const url = canonicalize(item.link);
    if (!url || seen.has(url)) return false;
    seen.add(url); item.link = url; return true;
  }).sort((a, b) => new Date(b.updated || 0) - new Date(a.updated || 0));

  const state = readState();
  const deploymentItems = SUBMIT_DEPLOYMENT_URLS
    ? deploymentUrls.map(link => ({ link, guid: link, updated: DEPLOYMENT_UPDATED, title: 'Calculator authority deployment' }))
    : [];
  const allItems = [...items, ...deploymentItems];
  const candidates = allItems.filter(item => state.submitted[item.link] !== fingerprint(item));
  const validation = { selected: [], rejected: {} };
  for (const item of candidates) {
    const result = await validateItem(item);
    if (result.accepted) validation.selected.push(result);
    else validation.rejected[result.reason] = (validation.rejected[result.reason] || 0) + 1;
    if (validation.selected.length >= MAX_URLS) break;
  }

  const selected = validation.selected.slice(0, MAX_URLS);
  console.log(`RSS items: ${rawItems.length}; canonical editorial candidates: ${items.length}; deployment candidates: ${deploymentItems.length}; selected: ${selected.length}; rejected: ${Object.values(validation.rejected).reduce((a, b) => a + b, 0)}.`);
  console.log(`Rejection reasons: ${JSON.stringify(validation.rejected)}.`);
  if (DRY_RUN || selected.length === 0) { if (DRY_RUN) console.log('Dry run only; no Bing request was made.'); return; }

  let batches = 0;
  for (let index = 0; index < selected.length; index += BATCH_SIZE) {
    const batch = selected.slice(index, index + BATCH_SIZE);
    const result = await submitBatch(batch.map(entry => entry.url));
    if (!result.ok) {
      console.error(`Bing submission stopped after an unsuccessful batch response (HTTP ${result.status}). No request URL or response body was logged.`);
      process.exitCode = 1;
      break;
    }
    batches += 1;
    for (const entry of batch) state.submitted[entry.url] = fingerprint(entry.item);
    writeState(state);
    console.log(`Accepted batch ${batches} (HTTP ${result.status}); ${batch.length} URLs.`);
  }
  if (process.exitCode) return;
  console.log(`Bing accepted ${selected.length} URLs in ${batches} batch(es). Indexing is not guaranteed.`);
  if (!DRY_RUN) {
    const remaining = await bingRequest('GetUrlSubmissionQuota', { siteUrl: SITE_ORIGIN });
    const daily = field(remaining, 'DailyQuota', 'dailyQuota');
    const monthly = field(remaining, 'MonthlyQuota', 'monthlyQuota');
    console.log(`Bing remaining quota report: daily ${daily ?? 'unreported'}; monthly ${monthly ?? 'unreported'}.`);
  }
}

main().catch(() => { console.error('Bing submission failed safely; no request URL or secret was logged.'); process.exitCode = 1; });
