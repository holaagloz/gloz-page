// Compare all public routes against a supplied approved production build.
// node tests/qa/compare-approved.mjs <approved-browser-directory>
import {chromium, expect} from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createServer} from 'node:http';
if (!process.argv[2]) throw new Error('Usage: node tests/qa/compare-approved.mjs <approved-browser-directory>');
const root=path.resolve(process.argv[2]);
const out=path.resolve('test-results/qa');
await fs.mkdir(out,{recursive:true});
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(pathname==='/favicon.ico'){res.writeHead(204).end();return;}
  const file=path.resolve(root,'.'+(path.extname(pathname)?pathname:pathname.replace(/\/$/,'')+'/index.html'));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  try{res.writeHead(200,{'Content-Type':mime[path.extname(file)]??'application/octet-stream'}).end(await fs.readFile(file));}catch{res.writeHead(404).end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({channel:'chrome'});
const results=[];
try {
 for(const [width,height] of [[360,800],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080]]) {
  for(const route of ['/', '/proyectos', '/estudio', '/contacto']) {
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
  const baseline=await context.newPage(), current=await context.newPage();
  await baseline.goto(`http://127.0.0.1:${server.address().port}${route}`);
  await current.goto(`http://127.0.0.1:4300${route}`);
  for(const page of [baseline,current]) {
   if(route==='/') await page.locator('.coverflow[data-ready="true"]').waitFor();
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
   await page.mouse.move(0,0);
  }
  const comparisons=[];
  for(const selector of ['body']) {
   // Let each foreground page commit decoded images and 3D layers before capture.
   await baseline.bringToFront();
   await baseline.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   const a=await baseline.screenshot({animations:'disabled',fullPage:true});
   await current.bringToFront();
   await current.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   const b=await current.screenshot({animations:'disabled',fullPage:true});
   // Compare decoded RGBA pixels rather than PNG file metadata.
   const pixels=await current.evaluate(async({a,b})=>{
    const load=src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});
    const [x,y]=await Promise.all([load(a),load(b)]);
    if(x.width!==y.width||x.height!==y.height)return{sameSize:false,before:[x.width,x.height],after:[y.width,y.height]};
    const canvas=document.createElement('canvas');canvas.width=x.width;canvas.height=x.height;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(x,0,0);const first=ctx.getImageData(0,0,x.width,x.height).data;
    ctx.clearRect(0,0,x.width,x.height);ctx.drawImage(y,0,0);const second=ctx.getImageData(0,0,y.width,y.height).data;
    let changed=0;for(let i=0;i<first.length;i+=4)if(first[i]!==second[i]||first[i+1]!==second[i+1]||first[i+2]!==second[i+2]||first[i+3]!==second[i+3])changed++;
    return{sameSize:true,changed,total:x.width*x.height};
   },{a:'data:image/png;base64,'+a.toString('base64'),b:'data:image/png;base64,'+b.toString('base64')});
   comparisons.push({selector,...pixels});
   if(pixels.changed||!pixels.sameSize){const name=route.replace(/[^a-z]/g,'')||'home';await fs.writeFile(`${out}/${width}-${name}-before.png`,a);await fs.writeFile(`${out}/${width}-${name}-after.png`,b);}
  }
  results.push({route,width,height,comparisons});
  await context.close();
  }
 }
 await fs.writeFile(path.join(out,'approved-comparison.json'),JSON.stringify({results},null,2));
 console.log(JSON.stringify(results.map(r=>({route:r.route,width:r.width,differences:r.comparisons.filter(c=>c.changed||!c.sameSize)})),null,2));
 expect(results.flatMap(r=>r.comparisons).every(c=>c.sameSize&&c.changed===0)).toBe(true);
} finally {await browser.close();server.close();}
