const fs = require('fs');
const socialBlock = '<div class="footer-column"><strong>SOCIAL</strong><a href="https://facebook.com/1276218502236982" target="_blank" rel="noopener noreferrer" aria-label="Follow DetectHiddenFees on Facebook"><span style="display:inline-flex;align-items:center;gap:8px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.0733C24 5.40541 18.6274 0 12 0C5.37258 0 0 5.40541 0 12.0733C0 18.0995 4.38823 23.0943 10.125 24V15.5633H7.07812V12.0733H10.125V9.41343C10.125 6.38755 11.9165 4.71615 14.6576 4.71615C15.9705 4.71615 17.3438 4.95195 17.3438 4.95195V7.92313H15.8306C14.34 7.92313 13.875 8.85366 13.875 9.80899V12.0733H17.2031L16.6711 15.5633H13.875V24C19.6118 23.0943 24 18.0995 24 12.0733Z" fill="#3b82f6"/></svg>Facebook</span></a></div>';

const excludePatterns = [/^test/i,/^temp/i,/^draft/i,/^header/i,/^footer/i,/^partial/i,/^include/i,/^out/i,/^final/i,/^hdr/i,/^headpart/i,/^_/i,/^0/i,/^1/i,/^2/i,/^3/i,/^4/i,/^5/i,/^6/i,/^7/i,/^8/i,/^9/i];
const excludeExact = ['final.html','hdr.html','header.html','headpart.html','out0.html','out1.html','part1.html','test_check.html','test_long.html','test_mini.html','test_out.html','_source_copy.html','_test123.html'];

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !excludeExact.includes(f) && !excludePatterns.some(p => p.test(f)));
console.log('Files: '+files.length);
let added=0,skipped=0;
for(const file of files){
  let c = fs.readFileSync(file,'utf-8');
  if(c.includes('SOCIAL</strong>')){skipped++;continue;}
  const idx = c.indexOf('COMPANY');
  if(idx>-1){c=c.slice(0,idx)+socialBlock+c.slice(idx);fs.writeFileSync(file,c);added++;console.log('ADDED: '+file);}
  else{skipped++;console.log('NO COMPANY: '+file);}
}
console.log('Added: '+added+' Skipped: '+skipped);
