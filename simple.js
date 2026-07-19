const fs=require("fs");const D=JSON.parse(fs.readFileSync("_fulldata2.json","utf8"));const{fc}=D;console.log("OK:"+fc.length);
