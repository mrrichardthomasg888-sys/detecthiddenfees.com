const fs=require('fs'),path=require('path'),root='.';
function g(d){const e=fs.readdirSync(d,{withFileTypes:!0});let f=[];for(const n of e){const p=path.join(d,n.name);if(n.isDirectory()){if(n.name!=='node_modules')f=f.concat(g(p))}else if(n.isFile()&&n.name.endsWith('.html'))f.push(p)}return f}
const hf=g(root);console.log('Files:',hf.length);
function can(ct){return ct.indexOf("canonical")>0?"found":null}
function met(c,a){var i=c.indexOf(a);if(i<0)return null;var s=c.substring(i);var qx=Buffer.from("L2NvbnRlbnQ9W1wiJ10oW15cIiddKilbXCInXS8=","base64").toString();var q=s.match(eval(qx));return q?q[1]:null}


function tit(c){const m=c.match(/<title[^>]*>([^<]*)<\/title>/i);return m?m[1].trim():null}
function h1s(c){const h=[];const re=/<h1[^>]*>([\s\S]*?)<\/h1>/gi;let m;while((m=re.exec(c))!==null)h.push(m[1].replace(/<[^>]+>/g,'').trim());return h}

function na(c){const im=[];const re=/<img[^>]*>/gi;let m;while((m=re.exec(c))!==null){if(!/alt\s*=/i.test(m[0])){const s=m[0].match(/src=["']([^"']*)["']/i);im.push(s?s[1]:('no src'))}}return im}
function ur(r){return r.replace(/\\/g,'/')=='index.html'?'/':'/'+r.replace(/\\/g,'/').replace(/\.html$/,'')}

const mc=[],mog=[],mh1=[],dh1=[],noAlt=[],tm={},dm={};
const cn=can(c);if(!cn)mc.push(url);
const de=met(c,'description');if(de){if(!dm[de])dm[de]=[];dm[de].push(url)}
const ogT=met(c,'og:title'),ogD=met(c,'og:description'),ogU=met(c,'og:url'),ogTy=met(c,'og:type');const miss=[];if(!ogT)miss.push('og:title');if(!ogD)miss.push('og:description');if(!ogU)miss.push('og:url');if(!ogTy)miss.push('og:type');if(miss.length)mog.push({url,missing:miss});
const h=h1s(c);if(!h.length)mh1.push(url);else if(h.length>1)dh1.push(url);
const imgs=na(c);if(imgs.length)noAlt.push({url,images:imgs});
}

const dt={};for(const[t,us]of Object.entries(tm))if(us.length>1)dt[t]=us;
const dd={};for(const[d,us]of Object.entries(dm))if(us.length>1)dd[d]=us;
let rv=true;try{const rc=fs.readFileSync('robots.txt','utf8');rv=/User-agent:\s*\*/i.test(rc)&&/Allow:\s*\//i.test(rc)&&/Sitemap:/i.test(rc)}catch(e){rv=false}
const is=new Set([].concat(mc,Object.values(dt).flat(),Object.values(dd).flat(),mog.map(o=>o.url),mh1,dh1,noAlt.map(i=>i.url)));
const fna=[];for(const i of noAlt)for(const s of i.images)fna.push({page:i.url,src:s});
const r={totalPages:hf.length,missingCanonical:mc,duplicateTitles:Object.keys(dt).length?dt:[],duplicateDescriptions:Object.keys(dd).length?dd:[],missingOG:mog,missingH1:mh1,duplicateH1:dh1,pagesWithIssues:is.size,robotsValid:rv,imagesWithoutAlt:fna};
fs.writeFileSync('technical_seo_audit.json',JSON.stringify(r,null,2));
console.log("totalPages="+hf.length);
console.log('totalPages='+hf.length);
console.log('missingCanonical='+mc.length);
if(mc.length)console.log('MC_list='+mc.join('|'));
console.log('duplicateTitleGroups='+Object.keys(dt).length);
if(Object.keys(dt).length)console.log('DT_detail='+JSON.stringify(dt));
console.log('duplicateDescGroups='+Object.keys(dd).length);
if(Object.keys(dd).length)console.log('DD_detail='+JSON.stringify(dd));
console.log('missingOG='+mog.length);
if(mog.length){console.log("OG_list:");console.log(JSON.stringify(mog))}
console.log('missingH1='+mh1.length);
if(mh1.length)console.log('MH1_list='+mh1.join('|'));
console.log('duplicateH1='+dh1.length);
if(dh1.length)console.log('DH1_list='+dh1.join('|'));
console.log('pagesWithIssues='+is.size);
console.log('robotsValid='+rv);
console.log('imagesWithoutAlt='+fna.length);
if(fna.length){console.log('IMG_samples:');console.log(JSON.stringify(fna.slice(0,10)))}
