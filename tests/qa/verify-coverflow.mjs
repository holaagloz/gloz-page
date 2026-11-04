import {chromium,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('test-results/qa');
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const results={viewports:[],touch:[],accessibility:[],motion:[],failures:[]};
const titles=['Hamburguesería contenido','Idea creativa mundialista · HOT SALE','Contenido institucional','Inauguración hamburguesería'];
const categories=['Producción de contenido','Idea, producción y edición','Producción de contenido','Producción y edición'];
async function ready(page){await page.goto('http://127.0.0.1:4300');await page.locator('.coverflow[data-ready="true"]').waitFor();await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].filter(i=>i.loading!=='lazy').map(i=>i.decode()));});await page.waitForTimeout(800);}
async function selected(page,index){await expect(page.locator('.cf-title')).toHaveText(titles[index]);await expect(page.locator('.cf-category')).toHaveText(categories[index]);await expect(page.locator('.cf-card[data-slot="0"]')).toHaveAttribute('data-piece',String(index));await expect(page.locator('.cf-card[data-slot="0"]')).toHaveAttribute('aria-pressed','true');await expect(page.locator('.cf-dots button').nth(index)).toHaveAttribute('aria-current','true');await expect(page.locator('#detail-title')).toHaveText(titles[index]);await expect(page.locator('#detail-role')).toHaveText(categories[index]);await page.waitForTimeout(750);}
async function layout(page){return page.evaluate(()=>{
  const rect=element=>{const r=element.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom};};
  const active=rect(document.querySelector('.cf-card[data-slot="0"]'));
  const arrows=[...document.querySelectorAll('.cf-arrow')].map(rect);
  const visible=[...document.querySelectorAll('.cf-card')].filter(e=>Number(getComputedStyle(e).opacity)>.95).map(e=>{
    const r=rect(e);let hits=0;
    for(let x=Math.max(0,r.x)+5;x<Math.min(innerWidth,r.x+r.width);x+=8)for(let y=r.y+8;y<r.bottom;y+=24){const hit=document.elementFromPoint(x,y);if(hit&&e.contains(hit))hits++;}
    return {slot:Number(e.dataset.slot),...r,exposedSamples:hits};
  });
  const left=Math.min(...visible.map(r=>r.x)),right=Math.max(...visible.map(r=>r.x+r.width));
  return{visible,coverage:(right-left)/innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,centerError:Math.abs(active.x+active.width/2-innerWidth/2),active,arrows,arrowsVisible:arrows.every(r=>r.x>=0&&r.x+r.width<=innerWidth&&r.y>=0&&r.bottom<=innerHeight),dotsVisible:document.querySelector('.cf-dots').getBoundingClientRect().bottom<=innerHeight,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),perspective:getComputedStyle(document.querySelector('.cf-space')).perspective,transforms:[...document.querySelectorAll('.cf-card')].map(e=>({slot:e.dataset.slot,transform:getComputedStyle(e).transform,zIndex:getComputedStyle(e).zIndex})),heroEnd:document.querySelector('.hero').getBoundingClientRect().bottom};
});}
for(const [width,height] of [[360,800],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080]]){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
 context.setDefaultTimeout(7000);
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const record={width,height,errors};
 try{
  await ready(page);await selected(page,0);
  record.initial=await layout(page);
  expect(record.initial.overflow).toBe(false);expect(record.initial.centerError).toBeLessThan(1);expect(record.initial.arrowsVisible).toBe(true);expect(record.initial.dotsVisible).toBe(true);expect(record.initial.brokenImages).toEqual([]);
  expect(record.initial.visible.length).toBe(width>800?7:3);expect(record.initial.visible.every(c=>c.exposedSamples>0)).toBe(true);
  if(width>800){expect(record.initial.coverage).toBeGreaterThan(.85);expect(record.initial.coverage).toBeLessThan(.94);expect(record.initial.visible.every(c=>c.x>=0&&c.x+c.width<=width)).toBe(true);}
  await expect(page.locator('.cf-arrow')).toHaveCount(2);await expect(page.locator('.cf-dots button')).toHaveCount(4);
  await page.screenshot({path:path.join(out,`${width}-initial.png`)});
  if(width>=1024){
   const card=page.locator('.cf-card[data-slot="0"]');const before=await card.locator('.cf-surface').evaluate(e=>getComputedStyle(e).transform);
   const bounds=await card.boundingBox();
   // Native pointer coordinates avoid Playwright's injected 3D hit-test issue.
   await page.mouse.move(bounds.x+bounds.width/2,bounds.y+bounds.height/2);await page.waitForTimeout(350);
   expect(await card.evaluate(e=>e.matches(':hover'))).toBe(true);
   record.hover={before,after:await card.locator('.cf-surface').evaluate(e=>getComputedStyle(e).transform),highlight:await card.locator('.cf-highlight').evaluate(e=>getComputedStyle(e).opacity)};
   expect(record.hover.after).not.toBe(record.hover.before);expect(Number(record.hover.highlight)).toBeGreaterThan(.6);
   await page.screenshot({path:path.join(out,`${width}-hover.png`)});await page.mouse.move(4,4);await page.waitForTimeout(350);
  }
  await page.getByRole('button',{name:'Pieza siguiente',exact:true}).click();await selected(page,1);
  record.next=await layout(page);expect(record.next.dotsVisible).toBe(true);
  expect(record.next.visible.length).toBe(width>800?7:3);expect(record.next.visible.every(c=>c.exposedSamples>0)).toBe(true);
  await page.screenshot({path:path.join(out,`${width}-next.png`)});
  await page.getByRole('button',{name:'Pieza anterior',exact:true}).click();await selected(page,0);
  await page.screenshot({path:path.join(out,`${width}-previous.png`)});
  await page.locator('.coverflow').focus();await page.keyboard.press('ArrowLeft');await selected(page,3);
  await page.keyboard.press('ArrowRight');await selected(page,0);
  await page.keyboard.press('End');await selected(page,3);
  await page.keyboard.press('Home');await selected(page,0);
  // Click a genuinely exposed part of a lateral card, without forcing through overlays.
  const point=await page.locator('.cf-card[data-slot="1"]').evaluate(e=>{const r=e.getBoundingClientRect();for(let x=r.right-10;x>r.left;x-=8)for(let y=r.top+20;y<r.bottom-20;y+=20){const hit=document.elementFromPoint(x,y);if(hit&&e.contains(hit))return{x,y};}return null;});
  expect(point).not.toBeNull();await page.mouse.click(point.x,point.y);await selected(page,1);
  await page.locator('.cf-dots button').nth(2).click();await selected(page,2);
  // Rapid input is interruptible and never desynchronizes the selected piece.
  await page.evaluate(()=>{for(let i=0;i<7;i++)document.querySelector('.cf-next').click();});await selected(page,1);
  await page.locator('.cf-dots button').first().click();await selected(page,0);
  record.links=await page.locator('a').evaluateAll(links=>links.map(a=>({href:a.getAttribute('href'),valid:a.hash?!!document.querySelector(a.hash):/^(https:|mailto:)/.test(a.href)||a.origin===location.origin})));
  expect(record.links.every(link=>link.valid)).toBe(true);
  if(width<=800){await page.getByRole('button',{name:'Abrir menú',exact:true}).click();await expect(page.locator('#primary-nav')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Abrir menú',exact:true})).toBeFocused();await expect(page.locator('#primary-nav')).not.toBeVisible();}
  await page.locator('.portfolio-index button').nth(1).click();await selected(page,3);
  await page.locator('.portfolio-index button').nth(0).click();await selected(page,0);
  await page.evaluate(async()=>{document.querySelector('footer').scrollIntoView();await Promise.all([...document.images].map(i=>i.decode()));window.scrollTo(0,0);});await page.waitForTimeout(500);
  await page.screenshot({path:path.join(out,`${width}-full.png`),fullPage:true});
  expect(errors).toEqual([]);record.passed=true;
  if(width===390||width===1440){const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();results.accessibility.push({width,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))});expect(axe.violations).toEqual([]);}
 }catch(error){record.passed=false;record.failure=error.message;results.failures.push({width,message:error.message});}
 results.viewports.push(record);await context.close();
}
for(const width of [360,390,768]){
 const page=await browser.newPage({viewport:{width,height:width===768?1024:844},isMobile:true,hasTouch:true});
 try{
  await ready(page);const cdp=await page.context().newCDPSession(page);
  const r=await page.locator('.cf-card[data-slot="0"]').boundingBox();
  const y=r.y+r.height/2;const start=r.x+r.width*.8;const end=r.x+r.width*.2;
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:start,y}]});
  for(let i=1;i<=8;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start+(end-start)*i/8,y}]});await page.waitForTimeout(18);}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await selected(page,1);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:end,y}]});
  for(let i=1;i<=8;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:end+(start-end)*i/8,y}]});await page.waitForTimeout(18);}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await selected(page,0);
  await page.locator('.cf-next').click();await selected(page,1);
  await page.setViewportSize({width:1920,height:1080});await page.waitForTimeout(700);await selected(page,1);
  expect((await layout(page)).centerError).toBeLessThan(1);
  await page.setViewportSize({width:360,height:800});await page.waitForTimeout(700);await selected(page,1);expect((await layout(page)).overflow).toBe(false);
  results.touch.push({width,swipeBothDirections:true,resizePreservesSelection:true});
 }catch(error){results.failures.push({touch:width,message:error.message});}
 await page.close();
}
const motionPage=await browser.newPage({viewport:{width:1440,height:900}});await ready(motionPage);
results.motion=await motionPage.evaluate(async()=>{
 const current=document.querySelector('.cf-card[data-slot="0"]');const next=document.querySelector('.cf-card[data-slot="1"]');const samples=[];const start=performance.now();document.querySelector('.cf-next').click();
 await new Promise(resolve=>{function sample(){samples.push({time:Math.round(performance.now()-start),outgoing:getComputedStyle(current).transform,incoming:getComputedStyle(next).transform,zOutgoing:getComputedStyle(current).zIndex,zIncoming:getComputedStyle(next).zIndex});if(performance.now()-start<720)requestAnimationFrame(sample);else resolve();}requestAnimationFrame(sample);});return samples;
});
expect(new Set(results.motion.map(s=>s.outgoing)).size).toBeGreaterThan(5);expect(new Set(results.motion.map(s=>s.zOutgoing))).toEqual(new Set(['auto']));
// Pause actual CSS transitions at precise times for a reproducible movement sequence.
await ready(motionPage);
await motionPage.evaluate(()=>document.querySelector('.cf-next').click());await motionPage.waitForTimeout(25);
await motionPage.evaluate(()=>{window.__transitions=document.getAnimations().filter(a=>a.playState==='running');window.__transitions.forEach(a=>a.pause());});
for(const time of [0,130,260,390,520,650]){await motionPage.evaluate(t=>window.__transitions.forEach(a=>a.currentTime=t),time);await motionPage.screenshot({path:path.join(out,`motion-${time}.png`)});}
await motionPage.close();
const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await ready(reduced);await reduced.locator('.cf-next').click();await selected(reduced,1);
results.reducedMotion=await reduced.locator('.cf-card').evaluateAll(cards=>cards.every(c=>getComputedStyle(c).transitionDuration==='0s'));expect(results.reducedMotion).toBe(true);await reduced.close();
await fs.writeFile(path.join(out,'verification.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify({viewports:results.viewports.map(v=>({width:v.width,passed:v.passed,failure:v.failure})),touch:results.touch,accessibility:results.accessibility,reducedMotion:results.reducedMotion,failures:results.failures},null,2));
await browser.close();if(results.failures.length)process.exitCode=1;
