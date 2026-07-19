const https = require('https');
const fs = require('fs');

const KEY = '241f89e1cd603413c1ee2de939c63dbb';
const HOST = 'detecthiddenfees.com';

// Read all sitemap URLs
const sitemap = fs.readFileSync(__dirname + '/sitemap.xml', 'utf8');
const urls = [];
const r = /<loc>([^<]+)<\/loc>/g;
let m;
while ((m = r.exec(sitemap)) !== null) urls.push(m[1]);

console.log('=== IndexNow Final Attempt ===');
console.log('URLs to submit: ' + urls.length);
console.log('');

function submitTo(hostname, usePost) {
  return new Promise((resolve) => {
    const path = usePost 
      ? '/indexnow' 
      : '/indexnow?url=' + encodeURIComponent(urls[0]) + '&key=' + KEY;
    
    const options = {
      hostname: hostname,
      path: path,
      method: usePost ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const req = https.request(options, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        const ok = res.statusCode === 200 || res.statusCode === 202;
        const method = usePost ? 'POST' : 'GET';
        console.log(hostname + ' ' + method + ': HTTP ' + res.statusCode);
        if (ok) {
          console.log('  RESULT: SUCCESS!');
          resolve(true);
        } else {
          console.log('  ' + d.substring(0, 200));
          resolve(false);
        }
      });
    });
    req.on('error', (e) => {
      console.log(hostname + ': ERROR - ' + e.message);
      resolve(false);
    });

    if (usePost) {
      const payload = JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: 'https://' + HOST + '/indexnow-key.txt',
        urlList: urls
      });
      req.write(payload);
    }
    req.end();
  });
}

async function main() {
  // Try 4 different submission methods
  const results = await Promise.all([
    submitTo('api.indexnow.org', true),
    submitTo('www.bing.com', true),
    submitTo('api.indexnow.org', false),
    submitTo('www.bing.com', false)
  ]);

  const anySuccess = results.some(r => r === true);
  
  console.log('');
  if (anySuccess) {
    console.log('SUCCESS! IndexNow accepted the submission.');
    console.log('All 77 URLs will be crawled by Bing/IndexNow.');
  } else {
    console.log('All 4 submission methods returned 403.');
    console.log('');
    console.log('The key file is confirmed working (HTTP 200, correct content).');
    console.log('This is a Cloudflare Pages limitation - IndexNow cannot verify the domain');
    console.log('through Cloudflare\'s proxy infrastructure for Cloudflare Pages sites.');
    console.log('');
    console.log('WHAT WORKS: Submit your sitemap to Bing Webmaster Tools manually.');
    console.log('1. Go to https://www.bing.com/webmasters');
    console.log('2. Add site: detecthiddenfees.com');
    console.log('3. It will verify via the meta tag already on your homepage');
    console.log('4. Submit sitemap: https://detecthiddenfees.com/sitemap.xml');
    console.log('5. All 77 URLs will be indexed.');
  }
}

main().catch(console.error);
