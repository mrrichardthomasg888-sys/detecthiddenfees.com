const https = require('https');
const fs = require('fs');

const API_KEY = 'f7355e4ce45842049a77c02003243382';
const SITE_URL = 'https://detecthiddenfees.com';

// Read sitemap
const sitemap = fs.readFileSync(__dirname + '/sitemap.xml', 'utf8');
const urls = [];
const r = /<loc>([^<]+)<\/loc>/g;
let m;
while ((m = r.exec(sitemap)) !== null) urls.push(m[1]);

console.log('=== Bing Webmaster API Submission ===');
console.log('URLs to index: ' + urls.length);
console.log('');

async function submitBatch(batch) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      siteUrl: SITE_URL,
      urlList: batch
    });
    
    const req = https.request({
      hostname: 'ssl.bing.com',
      path: '/webmaster/api.svc/json/SubmitUrlBatch?apikey=' + API_KEY,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        console.log('HTTP ' + res.statusCode + ': ' + d.substring(0, 300));
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('  SUCCESS - ' + batch.length + ' URLs submitted');
          batch.forEach(u => console.log('    ' + u));
          resolve(true);
        } else {
          console.log('  FAILED');
          resolve(false);
        }
      });
    });
    req.on('error', (e) => {
      console.log('  ERROR: ' + e.message);
      resolve(false);
    });
    req.write(payload);
    req.end();
  });
}

async function main() {
  // Try batch submission (up to 500 URLs per batch)
  const batchSize = 500;
  let total = 0;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log('Submitting batch ' + (i/batchSize + 1) + ' (' + batch.length + ' URLs)...');
    const ok = await submitBatch(batch);
    if (ok) total += batch.length;
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log('');
  console.log('=== COMPLETE ===');
  console.log('Submitted: ' + total + '/' + urls.length + ' URLs to Bing Webmaster API');
  console.log('Bing will crawl these URLs within hours.');
}

main().catch(console.error);
