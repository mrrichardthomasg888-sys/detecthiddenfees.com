const fs=require("fs");
const c=fs.readFileSync("ai-contract-review-vs-chatgpt.html","utf8");
const css=c.match(/<style>([\s\S]*?)<\/style>/)[1];
const nav=c.match(/<nav>[\s\S]*?<\/nav>/)[0];
const footer=c.match(/<footer>[\s\S]*?<\/footer>/)[0];
const sticky=c.match(/<div class="sticky-cta-bar">[\s\S]*?<\/div>/)[0];
const pdf=c.match(/<script>document\.addEventListener[\s\S]*?<\/script>/)[0];
fs.writeFileSync("_comps.json",JSON.stringify({css,nav,footer,sticky,pdf}));
console.log("Saved",css.length,nav.length);