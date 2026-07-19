const fs = require("fs");
const l = [];
l.push("line1");
l.push("line2");
fs.writeFileSync("audit_contract_pages.txt", l.join("\\r\\n"), "utf8");
console.log("OK");