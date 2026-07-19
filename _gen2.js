const fs=require("fs");const p=__dirname;function w(f,c){fs.writeFileSync(p+"/"+f,c,"utf8");console.log("WROTE "+f);}
console.log("GEN START");w("test.txt","HELLO WORLD");console.log("DONE");
