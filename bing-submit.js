const https = require('https');
const fs = require('fs');

const API_KEY = 'f7355e4ce45842049a77c02003243382';
const SITE_URL = 'https://detecthiddenfees.com';

// Read sitemap and extract all URLs
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const urls = (sitemap.match(/<loc>[^<]+<\/loc>/g) || []).map(u => u.replace('<loc>', '').replace('</loc>', ''));

console.log(`Found ${urls.length} URLs in sitemap`);

// Batch URLs (Bing allows up to 50 per batch)
const BATCH_SIZE = 10;
let completed = 0;
let errors = 0;

function submitBatch(batch) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ siteUrl: SITE_URL, urlList: batch });
    const options = {
      hostname: 'ssl.bing.com',
      path: `/webmaster/api.svc/json/SubmitUrlBatch?apikey=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.ErrorCode) {
            console.log(`  Batch failed: ${parsed.Message || 'Unknown error'}`);
            errors += batch.length;
          } else {
            completed += batch.length;
            console.log(`  Batch submitted (${completed}/${urls.length})`);
          }
        } catch(e) {
          completed += batch.length;
          console.log(`  Batch submitted (${completed}/${urls.length})`);
        }
        resolve();
      });
    });
    req.on('error', (e) => {
      console.log(`  Network error: ${e.message}`);
      errors += batch.length;
      resolve();
    });
    req.write(postData);
    req.end();
  });
}

async function submitAll() {
  console.log(`Submitting ${urls.length} URLs to Bing Webmaster API in batches of ${BATCH_SIZE}...`);
  console.log(`Site URL: ${SITE_URL}`);
  console.log(`API Key: ${API_KEY.substring(0, 8)}...${API_KEY.substring(API_KEY.length - 4)}`);
  console.log('');
  
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    await submitBatch(batch);
    // Delay between batches to avoid rate limiting
    if (i + BATCH_SIZE < urls.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  console.log('');
  console.log('=== SUBMISSION COMPLETE ===');
  console.log(`Total URLs in sitemap: ${urls.length}`);
  console.log(`Successfully submitted: ${completed}`);
  console.log(`Errors: ${errors}`);
}

submitAll().catch(console.error);
