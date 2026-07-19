const fs = require('fs');
const path = require('path');
const https = require('https');

const INDEXNOW_KEY = '241f89e1cd603413c1ee2de939c63dbb';
const SITEMAP_URL = 'https://detecthiddenfees.com/sitemap.xml';
const INDEXNOW_URL = 'https://api.indexnow.org/indexnow';
const HOST = 'detecthiddenfees.com';

const KEY_FILE = path.join(__dirname, '..', 'indexnow-key.txt');
const LOG_FILE = path.join(__dirname, '..', 'indexnow-log.json');
const SITEMAP_FILE = path.join(__dirname, '..', 'sitemap.xml');

// Load or create submission log
function loadLog() {
  try {
    if (fs.existsSync(LOG_FILE)) {
      return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
    }
  } catch (e) {}
  return { submitted: {}, lastSync: null };
}

function saveLog(log) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

// Read sitemap and extract URLs
function getUrlsFromSitemap() {
  const sitemap = fs.readFileSync(SITEMAP_FILE, 'utf8');
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(sitemap)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

// Submit URLs to IndexNow
function submitToIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: 'https://' + HOST + '/indexnow-key.txt',
      urlList: urls
    });

    const req = https.request(INDEXNOW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        resolve({ status: res.statusCode, body: body });
      });
    });

    req.on('error', (e) => reject(e));
    req.write(payload);
    req.end();
  });
}

// Main execution
async function main() {
  console.log('=== IndexNow Submission Script ===');
  console.log('Host: ' + HOST);
  console.log('Key: ' + INDEXNOW_KEY);
  console.log('');

  const log = loadLog();
  const allUrls = getUrlsFromSitemap();
  console.log('Total URLs in sitemap: ' + allUrls.length);

  // Determine which URLs to submit
  let urlsToSubmit = [];
  
  if (process.argv.includes('--force') || process.argv.includes('--all')) {
    // Force submit all URLs
    urlsToSubmit = allUrls;
    console.log('Mode: FORCE - submitting all ' + allUrls.length + ' URLs');
  } else {
    // Only submit new or updated URLs
    for (const url of allUrls) {
      if (!log.submitted[url]) {
        urlsToSubmit.push(url);
      }
    }
    console.log('Mode: INCREMENTAL - ' + urlsToSubmit.length + ' new URLs to submit');
  }

  if (urlsToSubmit.length === 0) {
    console.log('No new URLs to submit. Everything is up to date.');
    return;
  }

  // IndexNow has a limit of 10,000 URLs per submission
  // Submit in batches if needed
  const batchSize = 10000;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < urlsToSubmit.length; i += batchSize) {
    const batch = urlsToSubmit.slice(i, i + batchSize);
    console.log('Submitting batch ' + (i/batchSize + 1) + ' (' + batch.length + ' URLs)...');
    
    try {
      const result = await submitToIndexNow(batch);
      console.log('  Response: HTTP ' + result.status);
      
      if (result.status === 200 || result.status === 202) {
        // Mark all as submitted (200 = OK, 202 = Accepted)
        for (const url of batch) {
          log.submitted[url] = new Date().toISOString();
        }
        successCount += batch.length;
        console.log('  Successfully submitted ' + batch.length + ' URLs');
      } else {
        console.log('  Error response: HTTP ' + result.status + ' - ' + result.body);
        failCount += batch.length;
      }
    } catch (e) {
      console.log('  Submission error: ' + e.message);
      failCount += batch.length;
    }
  }

  log.lastSync = new Date().toISOString();
  saveLog(log);

  console.log('');
  console.log('=== Results ===');
  console.log('Successful: ' + successCount);
  console.log('Failed: ' + failCount);
  console.log('Last sync: ' + log.lastSync);
  
  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch(e => {
  console.error('Fatal error:', e.message);
  process.exit(1);
});
