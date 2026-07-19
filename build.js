// Build script  
const fs = require("fs");  
const orig = fs.readFileSync("hidden-contract-fees.html","utf8");  
const hEnd = orig.indexOf("</head>");  
