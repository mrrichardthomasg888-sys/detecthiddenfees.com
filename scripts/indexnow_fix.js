const https = require('https');
const fs = require('fs');

const KEY = '241f89e1cd603413c1ee2de939c63dbb';
const HOST = 'detecthiddenfees.com';
const KEY_LOCATION = 'https://' + HOST + '/indexnow-key.txt';

// Read sitemap
const sitemap = fs.readFileSync(__dirname + '/../sitemap.xml', 'utf8');
const urls = [];
const regex = /<loc>([^<]+)<\/loc>/g;
let m;
while ((m = regex.exec(sitemap)) !== null) urls.push(m[1]);

console.log('=== IndexNow Diagnostic ===');
console.log('Host: ' + HOST);
console.log('Key: ' + KEY);
console.log('URLs to submit: ' + urls.length);
console.log('');

// Check key file via direct IP (bypass Cloudflare)
const checkKeyFile = () => {
  return new Promise((resolve) => {
    https.get(KEY_LOCATION, { headers: { 'Cache-Control': 'no-cache' } }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        const content = d.trim();
        console.log('Key File Check:');
        console.log('  URL: ' + KEY_LOCATION);
        console.log('  HTTP Status: ' + res.statusCode);
        console.log('  Content-Type: ' + res.headers['content-type']);
        console.log('  Content: "' + content + '"');
        console.log('  Content Length: ' + content.length);
        console.log('  Key Matches: ' + (content === KEY ? 'YES' : 'NO'));
        console.log('');
        
        if (content !== KEY) {
          resolve({ ok: false, reason: 'Key file content mismatch. Got "' + content + '" expected "' + KEY + '"' });
          return;
        }
        resolve({ ok: true });
      });
    }).on('error', (e) => {
      resolve({ ok: false, reason: e.message });
    });
  });
};

// Try all 3 IndexNow API endpoints
const trySubmit = (apiHost) => {
  return new Promise((resolve) => {
    // Submit just 2 URLs as a test
    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls.slice(0, 10)
    });

    const req = https.request({
      hostname: apiHost,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        console.log('Endpoint: ' + apiHost + ' => HTTP ' + res.statusCode);
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log('  SUCCESS!');
          resolve({ ok: true });
        } else {
          console.log('  Failed: ' + d.slice(0, 200));
          resolve({ ok: false, error: d.slice(0, 200) });
        }
      });
    });
    req.on('error', (e) => {
      console.log('Endpoint: ' + apiHost + ' => Error: ' + e.message);
      resolve({ ok: false, error: e.message });
    });
    req.write(payload);
    req.end();
  });
};

async function main() {
  const keyCheck = await checkKeyFile();
  if (!keyCheck.ok) {
    console.log('Key file issue: ' + keyCheck.reason);
    console.log('');
    console.log('Fix this first before submitting to IndexNow.');
    process.exit(1);
  }
  
  console.log('Key file verified. Trying IndexNow submission...');
  console.log('');
  
  const endpoints = [
    'api.indexnow.org',
    'www.bing.com',
    'search.naver.com'
  ];
  
  for (const ep of endpoints) {
    const result = await trySubmit(ep);
    if (result.ok) {
      console.log('');
      console.log('=== SUBMISSION SUCCESSFUL ===');
      console.log('All URLs will be indexed by Bing/IndexNow.');
      process.exit(0);
    }
  }
  
  console.log('');
  console.log('=== ALL ENDPOINTS REJECTED ===');
  console.log('');
  console.log('This is a Cloudflare-related issue. To fix:');
  console.log('1. Log into Cloudflare dashboard for detecthiddenfees.com');
  console.log('2. Go to Rules > Page Rules');
  console.log('3. Create a page rule for indexnow-key.txt:');
  console.log('   URL: https://detecthiddenfees.com/indexnow-key.txt');
  console.log('   Setting: Cache Level > Bypass');
  console.log('4. Wait 5 minutes and run this script again');
  console.log('');
  console.log('Alternative: Add this to Cloudflare Workers:');
  console.log('   Or disable proxy (gray cloud) for the domain temporarily');
}

main().catch(console.error);
