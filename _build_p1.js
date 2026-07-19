var f=require("fs"),p=require("path"),d=process.cwd();
var V=JSON.parse(f.readFileSync(p.join(d,"_fulldata2.json"),"utf8"));
var a1=f.readFileSync(p.join(d,"_p1_full_article.txt"),"utf8");
var a2=f.readFileSync(p.join(d,"_p2_full_article.txt"),"utf8");
var a3=f.readFileSync(p.join(d,"_p3_full_article.txt"),"utf8");
