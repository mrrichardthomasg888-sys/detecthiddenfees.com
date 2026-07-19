const fs=require(`fs`),path=require(`path`),r=`.`;
var h=[];
function w(d){try{var e=fs.readdirSync(d,{withFileTypes:1});for(var v of e){var n=path.join(d,v.name);if(v.isDirectory()){if(v.name!=node_modules)w(n)}else if(v.isFile()&&v.name.endsWith(`.html`))h.push(n)}}catch(z){}}
w(r);
var mc=[],mog=[],mh=[],d1=[],tm={},dm={};
for(var i=0;i<h.length;i++){
var t=fs.readFileSync(h[i],`utf8`);
var u=h[i].replace(r+`\\`,``).replace(r+`/`,``).replace(/\\\\/g,`/`);
if(u==`index.html`)u=`/`;else u=`/`+u.replace(/\\.html$/,`);
if(t.indexOf(`canonical`)<0)mc.push(u);
var ti=t.match(/<title[^>]*>([^<]*)<\\/title>/i);if(ti){var tv=ti[1].trim();if(!tm[tv])tm[tv]=[];tm[tv].push(u)}


