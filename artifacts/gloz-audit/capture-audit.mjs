// Audit-only tooling. No application source is modified by this script.
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'artifacts/gloz-audit');
const workspace = (await readFile(path.join(root, 'tmp/audit-workspace-path.txt'), 'utf8')).trim();
const json = async (name, value) => writeFile(path.join(out, name), JSON.stringify(value, null, 2), 'utf8');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const children = [];
function start(args, filename) {
  const log = createWriteStream(path.join(out, 'results', filename));
  const child = spawn(process.execPath, args, { cwd: workspace, windowsHide: true, env: { ...process.env, PATH: path.dirname(process.execPath) + path.delimiter + process.env.PATH } });
  child.stdout.pipe(log); child.stderr.pipe(log); children.push(child);
  return child;
}
async function ready(url) {
  for (let i = 0; i < 120; i++) {
    try { if ((await fetch(url)).ok) return; } catch {}
    await sleep(500);
  }
  throw new Error('Server did not start: ' + url);
}
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = { browser: browser.version(), timestampUTC: new Date().toISOString(), viewports: [], interactions: [], limits: { lighthouseAvailable: false, realDevice: false, screenReader: false } };
async function stable(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = resolve; img.onerror = resolve; })));
  });
  await page.waitForTimeout(250);
}
async function clip(page, selectors, filename) {
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  const box = await page.evaluate(selectors => {
    const rects = selectors.map(selector => document.querySelector(selector).getBoundingClientRect());
    const top = Math.floor(Math.min(...rects.map(r => r.top)) + scrollY);
    const bottom = Math.ceil(Math.max(...rects.map(r => r.bottom)) + scrollY);
    return { x: 0, y: top, width: innerWidth, height: bottom - top };
  }, selectors);
  const session = await page.context().newCDPSession(page);
  const capture = await session.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: true, clip: { ...box, scale: 1 } });
  await writeFile(path.join(out, 'screenshots', filename), Buffer.from(capture.data, 'base64'));
  await session.detach();
}
async function typography(page) {
  return page.evaluate(() => {
    const selectors = ['h1', '.hero .intro', '#servicios h2', '.branding .service-copy > p:not(.number)', '.marketing .service-copy > p:not(.number)', '.marketing li', '.software .service-copy > p:not(.number)', '.concept-label', '.project-summary', '#proceso li p', '.placeholder-note', '.channel-pending', '.footer-bottom'];
    return Object.fromEntries(selectors.map(selector => {
      const element = document.querySelector(selector), style = getComputedStyle(element), r = element.getBoundingClientRect();
      return [selector, { font: style.fontFamily, size: style.fontSize, lineHeight: style.lineHeight, color: style.color, width: r.width, height: r.height }];
    }));
  });
}
try {
  start([path.join(workspace, 'node_modules/@angular/cli/bin/ng.js'), 'serve', 'gloz', '--host', '127.0.0.1', '--port', '4400'], 'dev-server.txt');
  await ready('http://127.0.0.1:4400');
  const sizes = [
    ['desktop-1440', 1440, 900], ['desktop-1280', 1280, 800],
    ['tablet-768', 768, 1024], ['mobile-390', 390, 844], ['mobile-375', 375, 812]
  ];
  for (const [label, width, height] of sizes) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const page = await context.newPage();
    const consoleMessages = [], failedRequests = [], failedResponses = [];
    page.on('console', message => consoleMessages.push({ type: message.type(), text: message.text() }));
    page.on('pageerror', error => consoleMessages.push({ type: 'pageerror', text: error.message }));
    page.on('requestfailed', request => failedRequests.push({ url: request.url(), error: request.failure() }));
    page.on('response', response => { if (response.status() >= 400) failedResponses.push({ url: response.url(), status: response.status() }); });
    await page.goto('http://127.0.0.1:4400', { waitUntil: 'networkidle' });
    await stable(page);
    await page.screenshot({ path: path.join(out, 'screenshots', `${label}-full.png`), fullPage: true, animations: 'disabled' });
    await clip(page, ['.hero'], `${label}-hero.png`);
    await clip(page, ['gloz-header', '.hero', 'gloz-capabilities-strip'], `${label}-header-hero-band.png`);
    await clip(page, ['#servicios'], `${label}-services.png`);
    await clip(page, ['#proyectos'], `${label}-projects.png`);
    await clip(page, ['#proceso', '#nosotros'], `${label}-process-about.png`);
    await clip(page, ['#contacto', 'footer'], `${label}-contact-footer.png`);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    await json(`results/axe-${label}.json`, { violations: audit.violations, incomplete: audit.incomplete, passes: audit.passes.map(pass => ({ id: pass.id, count: pass.nodes.length })) });
    const dimensions = await page.evaluate(() => ({ viewport: { width: innerWidth, height: innerHeight }, document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }, fonts: [...document.fonts].map(font => ({ family: font.family, status: font.status })), images: [...document.images].map(img => ({ src: img.getAttribute('src'), complete: img.complete, naturalWidth: img.naturalWidth, width: img.width, height: img.height })), headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(h => ({ level: h.tagName, text: h.textContent })), sections: [...document.querySelectorAll('main>*,footer')].map(el => ({ tag: el.tagName, height: el.getBoundingClientRect().height })), anchors: [...document.querySelectorAll('a')].map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href'), targetExists: a.hash ? !!document.getElementById(a.hash.slice(1)) : null })) }));
    const data = { label, dimensions, typography: await typography(page), violations: audit.violations.map(v => ({ id: v.id, impact: v.impact })), consoleMessages, failedRequests, failedResponses };
    if (width < 900) {
      await page.locator('.menu-toggle').click();
      await page.screenshot({ path: path.join(out, 'screenshots', `${label}-menu.png`), animations: 'disabled' });
      const y = await page.evaluate(() => scrollY);
      await page.mouse.wheel(0, 600); await sleep(150);
      data.menu = { expanded: await page.locator('.menu-toggle').getAttribute('aria-expanded'), bodyOverflow: await page.locator('body').evaluate(el => getComputedStyle(el).overflow), wheelScrollDelta: await page.evaluate(y => scrollY - y, y), backgroundInert: await page.locator('main').evaluate(el => el.inert), backgroundHidden: await page.locator('main').getAttribute('aria-hidden') };
      await writeFile(path.join(out, 'evidence', `${label}-menu-accessibility.txt`), await page.locator('body').ariaSnapshot(), 'utf8');
      const menuAudit = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      data.menu.violations = menuAudit.violations.map(v => ({ id: v.id, impact: v.impact }));
      await page.keyboard.press('Escape');
      data.menu.escapeClosed = await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'false';
      data.menu.focusRestored = await page.locator('.menu-toggle').evaluate(el => document.activeElement === el);
      await page.locator('.menu-toggle').click();
      await page.locator('#navigation a[href="#proyectos"]').click();
      data.menu.projectAnchor = { hash: new URL(page.url()).hash, focused: await page.locator('#proyectos').evaluate(el => document.activeElement === el) };
    }
    if (width >= 900) {
      const cta = page.locator('#navigation .button');
      const styles = () => cta.evaluate(el => ({ color: getComputedStyle(el).color, background: getComputedStyle(el).backgroundColor }));
      data.headerCta = { normal: await styles() };
      await cta.hover();
      data.headerCta.hover = await styles();
      await clip(page, ['gloz-header'], `${label}-header-hover.png`);
      await page.mouse.move(0, 500);
    }
    await page.locator('#navigation a[href="#contacto"]').first().evaluate(el => el.click());
    await page.waitForTimeout(200);
    data.sticky = await page.locator('gloz-header').evaluate(el => ({ top: el.getBoundingClientRect().top, position: getComputedStyle(el).position, scrolled: !!el.querySelector('header.scrolled') }));
    data.contact = { links: await page.locator('#contacto a').count(), forms: await page.locator('form').count(), text: await page.locator('.channel-pending').textContent() };
    results.viewports.push(data);
    await context.close();
    console.log('Captured and inspected', label);
  }
  // Adversarial resize near both major layout thresholds and reflow width.
  for (const width of [320, 899, 900, 1099, 1100]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4400', { waitUntil: 'networkidle' }); await stable(page);
    const data = await page.evaluate(() => {
      const clipping = [...document.querySelectorAll('h1,h2,h3,.service-copy p,.service-copy li')].filter(el => el.scrollWidth > el.clientWidth + 1).map(el => ({ tag: el.tagName, text: el.textContent, width: el.clientWidth, scrollWidth: el.scrollWidth }));
      return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, clipping };
    });
    results.interactions.push({ probe: 'breakpoint', ...data });
    await page.screenshot({ path: path.join(out, 'screenshots', `adversarial-${width}.png`), fullPage: true });
    await context.close();
  }
  // Prerendered production output, independent of dev-mode requests.
  start([path.join(workspace, 'tests/serve.mjs')], 'production-qa-server.txt');
  await ready('http://127.0.0.1:4300');
  const production = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await production.addInitScript(() => {
    window.__auditVitals = { cls: 0, lcp: null };
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__auditVitals.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__auditVitals.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  const prodPage = await production.newPage();
  const prodErrors = [], prodFailures = [];
  prodPage.on('pageerror', e => prodErrors.push(e.message));
  prodPage.on('console', m => { if (m.type() === 'error' || /NG05\d+/.test(m.text())) prodErrors.push(m.text()); });
  prodPage.on('response', r => { if (r.status() >= 400) prodFailures.push({ status: r.status(), url: r.url() }); });
  await prodPage.goto('http://127.0.0.1:4300', { waitUntil: 'networkidle' }); await stable(prodPage); await sleep(750);
  results.production = await prodPage.evaluate(() => ({ vitalsLocalUnthrottled: window.__auditVitals, resources: performance.getEntriesByType('resource').map(r => ({ name: r.name, transferSize: r.transferSize, encodedBodySize: r.encodedBodySize, decodedBodySize: r.decodedBodySize, duration: r.duration })), navigation: performance.getEntriesByType('navigation').map(r => ({ domContentLoaded: r.domContentLoadedEventEnd, load: r.loadEventEnd, transferSize: r.transferSize })), metadata: [...document.head.querySelectorAll('meta,link')].map(el => Object.fromEntries([...el.attributes].map(a => [a.name,a.value]))), htmlLang: document.documentElement.lang }));
  results.production.errors = prodErrors; results.production.failedResponses = prodFailures;
  // A real hover screenshot on the production build reproduces visual state.
  await prodPage.locator('#navigation .button').hover();
  await clip(prodPage, ['gloz-header'], 'production-header-hover.png');
  await production.close();
  const noJs = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false, reducedMotion: 'reduce' });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto('http://127.0.0.1:4300', { waitUntil: 'networkidle' });
  await noJsPage.locator('.menu-toggle').click();
  results.noJavaScript = { h1Visible: await noJsPage.locator('h1').isVisible(), menuExpanded: await noJsPage.locator('.menu-toggle').getAttribute('aria-expanded'), navigationVisible: await noJsPage.locator('#navigation').isVisible() };
  await noJsPage.screenshot({ path: path.join(out, 'screenshots', 'mobile-390-no-javascript-menu.png') });
  await noJs.close();
  await json('results/browser-audit.json', results);
  console.log('Audit browser evidence complete');
} finally {
  await browser.close();
  for (const child of children) {
    if (child.exitCode === null) {
      await new Promise(resolve => { const killer = spawn('taskkill', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true }); killer.on('exit', resolve); killer.on('error', resolve); });
    }
  }
}
