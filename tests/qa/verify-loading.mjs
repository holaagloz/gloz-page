import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('test-results/qa');
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
for(const [name,width,height,delay]of [['cold-desktop',1440,900,0],['delayed-desktop',1440,900,800],['cold-mobile',390,844,0]]){
 const context=await browser.newContext({viewport:{width,height}});const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Network.clearBrowserCache');
 await page.addInitScript(()=>{
  window.__shifts=[];window.__paint=[];
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__shifts.push({value:e.value,time:e.startTime,sources:e.sources?.map(s=>s.node?.className)});}).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(list=>window.__paint.push(...list.getEntries().map(e=>({name:e.name,time:e.startTime})))).observe({type:'paint',buffered:true});
 });
 if(delay){await page.route('**/main*.js',async route=>{await new Promise(r=>setTimeout(r,500));await route.continue();});await page.route('**/projects/work-4.jpg',async route=>{await new Promise(r=>setTimeout(r,delay));await route.continue();});}
 const start=Date.now();await page.goto('http://127.0.0.1:4300',{waitUntil:'commit'});const frames=[];
 for(const target of [0,100,250,500,800,1100,1600,2200]){
  const wait=target-(Date.now()-start);if(wait>0)await new Promise(r=>setTimeout(r,wait));
  let screenshot;
  // The compositor may not have its first surface immediately after navigation commits.
  for(let attempt=0;attempt<12;attempt++){
    try{screenshot=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});break;}
    catch(error){if(attempt===11)throw error;await new Promise(r=>setTimeout(r,25));}
  }
  await fs.writeFile(path.join(out,`${name}-${target}.png`),Buffer.from(screenshot.data,'base64'));
  frames.push(await page.evaluate(()=>({time:performance.now(),ready:document.querySelector('.coverflow')?.getAttribute('data-ready'),entranceOpacity:document.querySelector('.cf-entrance')?getComputedStyle(document.querySelector('.cf-entrance')).opacity:null,images:[...document.querySelectorAll('.cf-card img')].every(i=>i.complete&&i.naturalWidth>0),slots:[...document.querySelectorAll('.cf-card')].map(e=>({slot:e.dataset.slot,transform:getComputedStyle(e).transform})),stageHeight:document.querySelector('.cf-stage')?.getBoundingClientRect().height})));
 }
 await page.locator('.coverflow[data-ready="true"]').waitFor();await page.waitForTimeout(800);
 const performanceData=await page.evaluate(()=>({cls:window.__shifts.reduce((n,s)=>n+s.value,0),shifts:window.__shifts,paint:window.__paint,images:performance.getEntriesByType('resource').filter(e=>/work-\d\.jpg/.test(e.name)).map(e=>({name:e.name,bytes:e.transferSize}))}));
 expect(performanceData.cls).toBeLessThan(.01);expect(errors).toEqual([]);
 for(const frame of frames){if(frame.ready==='false')expect(Number(frame.entranceOpacity)).toBe(0);if(Number(frame.entranceOpacity)>.01)expect(frame.images).toBe(true);}
 const heights=frames.map(f=>f.stageHeight).filter(Boolean);expect(Math.max(...heights)-Math.min(...heights)).toBeLessThan(.1);
 results.push({name,width,height,delay,frames,performanceData,errors});await context.close();
}
await fs.writeFile(path.join(out,'loading-verification.json'),JSON.stringify(results,null,2));
console.log(results.map(r=>({name:r.name,cls:r.performanceData.cls,errors:r.errors,frames:r.frames.length})));
await browser.close();
