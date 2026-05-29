const fs=require('fs');const path=require('path');const crypto=require('crypto');
const dp=path.join(__dirname,'data.json');
const gd=path.join(__dirname,'gallery');
if(!fs.existsSync(gd))fs.mkdirSync(gd,{recursive:true});
let r=fs.readFileSync(dp,'utf8');if(r.charCodeAt(0)===0xFEFF)r=r.substring(1);
const d=JSON.parse(r);let c=0;
function p(u){if(!u||!u.startsWith('data:image/'))return u;const m=u.match(/^data:image\/(\w+);base64,(.+)$/);if(!m)return u;const e=m[1]==='jpeg'?'jpg':m[1];const b=Buffer.from(m[2],'base64');const h=crypto.createHash('md5').update(b).digest('hex').substring(0,12);const fn='img_'+h+'.'+e;const fp=path.join(gd,fn);if(!fs.existsSync(fp)){fs.writeFileSync(fp,b);c++;}return'gallery/'+fn;}
d.forEach(it=>{it.imgUrl=p(it.imgUrl);if(it.gallery&&Array.isArray(it.gallery))it.gallery=it.gallery.map(p);});
fs.writeFileSync(dp,JSON.stringify(d),'utf8');console.log('Done: '+c+' images');
