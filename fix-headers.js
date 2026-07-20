const fs = require('fs');

const HEADER = '<header style="position:sticky;top:0;z-index:999;background:rgba(2,6,23,.85);backdrop-filter:blur(24px);border-bottom:1px solid rgba(59,130,246,0.15);padding:14px 20px"><a href="/" style="text-decoration:none;color:inherit"><span style="font-size:1.7rem;font-weight:900;color:white">DetectHiddenFees<span style="color:#3b82f6">.</span></span></a></header>';

const FIX = ['ai-contract-review-tool.html','hidden-fee-dictionary.html','hidden-fee-industry-guide.html','how-to-reduce-medical-bills.html','negotiate-hospital-bill.html'];

FIX.forEach(fn => {
  if (!fs.existsSync(fn)) return;
  let c = fs.readFileSync(fn, 'utf8');
  if (c.includes('<header')) return;
  c = c.replace('<body>', '<body>\n' + HEADER);
  fs.writeFileSync(fn, c, 'utf8');
  console.log('Fixed:', fn);
});

console.log('DONE');
