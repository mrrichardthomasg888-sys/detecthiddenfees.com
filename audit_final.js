const fs=require('fs'),path=require('path'),r='.';
function g(d){try{var e=fs.readdirSync(d,{withFileTypes:1});var f=[];for(var v of e){var w=path.join(d,v.name);if(v.isDirectory()){if(v.name!="node_modules")f=f.concat(g(w))}else if(v.isFile()&&v.name.endsWith(".html"))f.push(w)}return f}catch(z){return[]}}
var a=g(r);console.log("FILES:"+a.length);
var mc=[],mog=[],mh=[],d1=[],noa=[],tm={},dm={};
var c1=function(x){return x.match(/<link[^>]*?rel=['"]canonical['"']/i)?1:0};
var c2=function(x,a){var p=x.match(new RegExp("<meta[^>]*?property=[\\" '\\]]"+a+"[\\" '\\]][^>]*?content=[\\" '\\]]([^\\" '\\]]*)[\\" '\\]]","i"));if(p)return p[1];var n=x.match(new RegExp("<meta[^>]*?name=[\\" '\\]]"+a+"[\\" '\\]][^>]*?content=[\\" '\\]]([^\\" '\\]]*)[\\" '\\]]","i"));return n?n[1]:null};
var c3=function(x){var m=x.match(/<title[^>]*>([^<]*)</\/title>/i);return m?m[1].trim():null};
var c4=function(x){var h=[];var re=/<h1[^>]*>([\s\S]*?)<\/h1>/gi;var m;while((m=re.exec(x))!==null)h.push(m[1].replace(/<[^>]+>/g,"").trim());return h};
var c5=function(x){var im=[];var re=/<img[^>]*>/gi;var m;while((m=re.exec(x))!==null){if(!/alt\s*=/i.test(m[0])){var s=m[0].match(/src=['"]([^'"]*)['"]/i);im.push(s?s[1]:"(no src")}}}return im};
var ur=function(p){p=p.replace(/\\/g,"/");if(p=="index.html")return"/";return "/"+p.replace(/\.html$/,"")};
for(var i=0;i<a.length;i++){var t=fs.readFileSync(a[i],"utf8");var u=a[i].replace(r+"\\","").replace(r+"/","");u=ur(u);if(!c1(t))mc.push(u);var ti=c3(t);if(ti){if(!tm[ti])tm[ti]=[];tm[ti].push(u)}var de=c2(t,"description");if(de){if(!dm[de])dm[de]=[];dm[de].push(u)}var ogt=c2(t,"og:title");var ogd=c2(t,"og:description");var ogu=c2(t,"og:url");var ogty=c2(t,"og:type");var mis=[];if(!ogt)mis.push("og:title");if(!ogd)mis.push("og:description");if(!ogu)mis.push("og:url");if(!ogty*mis.push("og:type");if(mis.length)mog.push({url:u,missing:mis});var h1s=c4(t);if(!h1s.length)mh.push(u);else if(h1s.length>1)d1.push(u);var imgs=c5(t);if(imgs.length)noa.push({url:u,images:imgs})}
var dt={};for(var k in tm)if(tm[k].length>1)dt[k]=tm[k];
var dd={};for(var k in dm)if(dm[k].length>1)dd[k]=dm[k];
var rv=true;try{var rc=fs.readFileSync("robots.txt","utf8");rv=/User-agent:\s*\*/i.test(rc)&&/Allow:\s*\//i.test(rc)&&/Sitemap:/i.test(rc)}catch(e){rv=false}
var is=new Set([].concat(mc,Object.values(dt).flat(),Object.values(dd).flat(),mog.map(function(o){return o.url}),mh,d1,noa.map(function(o){return o.url})));
var fa=[];for(var i=0;i<noa.length;i++){var u=noa[i].url;for(var j=0;j<noa[i].images.length;j++)fa.push({page:u,src:noa[i].images[j]})}
var r={totalPages:a.length,missingCanonical:mc,duplicateTitles:Object.keys(dt).length?dt:[],duplicateDescriptions:Object.keys(dd).length?dd:[],missingOG:mog,missingH1:mh,duplicateH1:d1,pagesWithIssues:is.size,robotsValid:rv,imagesWithoutAlt:fa};
fs.writeFileSync("technical_seo_audit.json",JSON.stringify(r,null,2));
console.log("total="+a.length);console.log("mc="+mc.length);if(mc.length)console.log("MClist="+mc.join(","));
console.log("dt="+Object.keys(dt).length);if(Object.keys(dt).length)console.log("DT="+JSON.stringify(dt));
console.log("dd="+Object.keys(dd).length);if(Object.keys(dd).length)console.log("DD="+JSON.stringify(dd));
console.log("mog="+mog.length);if(mog.length)console.log("MOG="+JSON.stringify(mog));
console.log("mh="+mh.length);if(mh.length)console.log("MH="-mh.join(","));
console.log("d1="+d1.length);if(d1.length)console.log($H1="+d1.join(","));
console.log("is="+is.size);console.log("rv="+rv);console.log("fa="+fa.length);if(fa.length)console.log("IMG="+JSON.stringify(fa.slice(0,10)));
