import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd(), out = path.join(root, 'artifacts/gloz-audit');
const workspace = (await readFile('tmp/audit-workspace-path.txt','utf8')).trim();
const server = spawn(process.execPath,[path.join(workspace,'tests/serve.mjs')], {cwd:workspace,windowsHide:true});
const browser = await chromium.launch({channel:'chrome'});
try {
  for(let i=0;i<60;i++) { try { if((await fetch('http://127.0.0.1:4300')).ok) break; }catch{} await new Promise(r=>setTimeout(r,250)); }
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4300',{waitUntil:'networkidle'});
  await page.locator('#navigation .button').hover();
  const hover = await new AxeBuilder({page}).include('#navigation').withRules(['color-contrast']).analyze();
  await writeFile(path.join(out,'results/axe-header-hover.json'),JSON.stringify({violations:hover.violations,incomplete:hover.incomplete},null,2));
  await page.mouse.move(0,600);
  await page.locator('#navigation .button').focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  const focus = await page.locator('#navigation .button').evaluate(el=>({focused:document.activeElement===el,focusVisible:el.matches(':focus-visible'),outline:getComputedStyle(el).outline,color:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor}));
  await page.screenshot({path:path.join(out,'screenshots/desktop-1440-header-keyboard-focus.png')});
  await page.setViewportSize({width:390,height:320});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.menu-toggle').click();
  await page.waitForFunction(()=>document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true');
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.locator('.menu-toggle').focus();
  const shortMenuFocusTrace=[];
  for(let i=0;i<6;i++) { await page.keyboard.press('Tab'); shortMenuFocusTrace.push(await page.evaluate(()=>document.activeElement?.textContent)); }
  const shortMenu = await page.locator('#navigation').evaluate(el=>({viewportHeight:innerHeight,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight,scrollTop:el.scrollTop,activeText:document.activeElement?.textContent}));
  await page.screenshot({path:path.join(out,'screenshots/mobile-390-short-menu.png')});
  await writeFile(path.join(out,'results/adversarial-probes.json'),JSON.stringify({hoverViolationIds:hover.violations.map(v=>v.id),focus,shortMenu,shortMenuFocusTrace},null,2));
  console.log(JSON.stringify({hoverViolations:hover.violations.map(v=>v.id),shortMenu}));
}finally{
  await browser.close();
  await new Promise(resolve=>{const killer=spawn('taskkill',['/PID',String(server.pid),'/T','/F'],{windowsHide:true});killer.on('exit',resolve);killer.on('error',resolve);});
}
