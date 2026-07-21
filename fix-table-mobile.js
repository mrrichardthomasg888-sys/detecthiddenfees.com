var fs=require('fs');var c=fs.readFileSync('ai-financial-advisor.html','utf-8');
// Add data-label attributes to each td for mobile card display
c=c.replace(/<tr><td>Hidden fee detection<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g,'<tr class="comparison-row"><td data-label="Feature">Hidden fee detection</td><td data-label="AI Financial Advisor">$1</td><td data-label="Traditional Advisor">$2</td><td data-label="Robo-Advisor">$3</td></tr>');
c=c.replace(/<tr><td>Document analysis<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g,'<tr class="comparison-row"><td data-label="Feature">Document analysis</td><td data-label="AI Financial Advisor">$1</td><td data-label="Traditional Advisor">$2</td><td data-label="Robo-Advisor">$3</td></tr>');
c=c.replace(/<tr><td>Investment management<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g,'<tr class="comparison-row"><td data-label="Feature">Investment management</td><td data-label="AI Financial Advisor">$1</td><td data-label="Traditional Advisor">$2</td><td data-label="Robo-Advisor">$3</td></tr>');
c=c.replace(/<tr><td>Retirement planning<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g,'<tr class="comparison-row"><td data-label="Feature">Retirement planning</td><td data-label="AI Financial Advisor">$1</td><td data-label="Traditional Advisor">$2</td><td data-label="Robo-Advisor">$3</td></tr>');
c=c.replace(/<tr><td>Cost<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g,'<tr class="comparison-row"><td data-label="Feature">Cost</td><td data-label="AI Financial Advisor">$1</td><td data-label="Traditional Advisor">$2</td><td data-label="Robo-Advisor">$3</td></tr>');
// Add mobile card CSS inside the existing @media
var mobileCss='\n@media(max-width:768px){.research-table,.comparison-table-wrap{overflow:visible!important;display:block;width:100%}.research-table thead{display:none}.research-table tbody,.research-table tr{display:block;width:100%}.research-table tr{padding:16px;margin-bottom:12px;border-radius:12px;background:rgba(7,19,39,.8);border:1px solid rgba(255,255,255,.08)}.research-table td{display:flex;align-items:flex-start;padding:6px 0;border:none;font-size:.85rem;white-space:normal!important;word-wrap:break-word}.research-table td:before{content:attr(data-label);font-weight:700;color:#93c5fd;min-width:160px;flex-shrink:0;font-size:.8rem}.research-table tr:hover td{background:transparent}}';
// Insert mobile CSS before existing @media queries
var mediaIdx=c.indexOf('@media(min-width:901px)');
if(mediaIdx>-1){c=c.slice(0,mediaIdx)+mobileCss+c.slice(mediaIdx);}
fs.writeFileSync('ai-financial-advisor.html',c);
console.log('Mobile comparison cards added');
