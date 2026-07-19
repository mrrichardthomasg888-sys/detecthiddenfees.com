const https = require('https');
const fs = require('fs');

const KEY = '241f89e1cd603413c1ee2de939c63dbb';
const HOST = 'detecthiddenfees.com';

// Check key file
https.get('https://' + HOST + '/indexnow-key.txt', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const content = d.trim();
    const isHtml = content.startsWith('<!');
    console.log('Key File: HTTP ' + res.statusCode + ' (' + content.length + ' bytes)');
    console.log('Content: "' + (isHtml ? 'HTML PAGE - Cloudflare challenge!' : content) + '"');
    console.log('Key Match: ' + (content === KEY ? 'YES' : isHtml ? 'CLOUDFLARE BLOCKING' : 'NO'));
    console.log('');
    
    if (isHtml) {
      console.log('=== INDEXNOW IS BLOCKED BY CLOUDFLARE ===');
      console.log('');
      console.log('Cloudflare is returning a challenge page for the key file.');
      console.log('IndexNow cannot verify your domain ownership.');
      console.log('');
      console.log('To fix, log into cloudflare.com and do ONE of:');
      console.log('');
      console.log('1. DNS > toggle cloud icon to GRAY (DNS only)');
      console.log('2. Security > Bots > turn off Bot Fight Mode');
      console.log('3. Security > WAF > create rule to skip for indexnow-key.txt');
      console.log('');
      console.log('Then run: node submit_indexnow.js');
      return;
    }
    
    if (content !== KEY) {
      console.log('ERROR: Key file content does not match!');
      return;
    }
    
    // Key file is correct. Submit to IndexNow
    console.log('Key file verified. Submitting to IndexNow...');
    
    // Read sitemap
    const sitemap = fs.readFileSync(__dirname + '/sitemap.xml', 'utf8');
    const urls = [];
    const regex = /<loc>([^<]+)<\/loc>/g;
    let m;
    while ((m = regex.exec(sitemap)) !== null) urls.push(m[1]);
    console.log('URLs to submit: ' + urls.length);
    
    // Submit single URL via GET to Bing
    const testUrl = '/indexnow?url=' + encodeURIComponent(urls[0]) + '&key=' + KEY + '&keyLocation=https://' + HOST + '/indexnow-key.txt';
    https.get({ hostname: 'www.bing.com', path: testUrl }, (res2) => {
      let d2 = '';
      res2.on('data', c => d2 += c);
      res2.on('end', () => {
        if (res2.statusCode === 200) {
          console.log('BING INDEXNOW: ACCEPTED (HTTP 200)');
          console.log('');
          // Submit all URLs via POST
          const payload = JSON.stringify({ host: HOST, key: KEY, keyLocation: 'https://' + HOST + '/indexnow-key.txt', urlList: urls });
          const req = https.request({ hostname: 'api.indexnow.org', path: '/indexnow', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } }, (res3) => {
            let d3 = '';
            res3.on('data', c => d3 += c);
            res3.on('end', () => {
              console.log('INDEXNOW API: HTTP ' + res3.statusCode);
              if (res3.statusCode === 200 || res3.statusCode === 202) {
                console.log('SUCCESS! All ' + urls.length + ' URLs accepted.');
              } else {
                console.log('POST failed: ' + d3.substring(0, 200));
              }
            });
          });
          req.write(payload);
          req.end();
        } else {
          console.log('BING INDEXNOW: REJECTED (HTTP ' + res2.statusCode + ')');
          console.log('Response: ' + d2.substring(0, 150));
          console.log('');
          console.log('=== CLOUDFLARE IS BLOCKING INDEXNOW ===');
          console.log('Your key file is valid and accessible.');
          console.log('But Cloudflare proxy is preventing IndexNow from verifying.');
          console.log('');
          console.log('Fix: Log into cloudflare.com > DNS > toggle cloud to GRAY');
        }
      });
    });
  });
});
