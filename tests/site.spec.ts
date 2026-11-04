import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile } from 'node:fs/promises';

const routes = [
  ['/', 'gloz-home-page', '.hero', 'Gloz — Hacemos que pase.'],
  ['/proyectos', 'gloz-projects-page', '#proyectos', 'Proyectos — Gloz'],
  ['/estudio', 'gloz-studio-page', '#estudio', 'El estudio — Gloz'],
  ['/contacto', 'gloz-contact-page', '#contacto', 'Hablemos de tu proyecto — Gloz']
] as const;

for (const [url, component, section, title] of routes) {
  test(`Ruta oficial ${url}: HTML estático, recarga, responsive, recursos y accesibilidad`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('requestfailed', req => errors.push(req.url()));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const width of [360, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1080 });
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toContain(`<${component}`);
      expect(html).toContain('ngh=');
      expect(html).not.toMatch(/Exploración V4|gloz-validation|prototype-picker/);
      await expect(page.locator(section)).toBeAttached();
      await expect(page).toHaveTitle(title);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('header')).toHaveCount(1);
      await expect(page.locator('footer')).toHaveCount(1);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map(img => img.decode()));
      });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.locator('a').evaluateAll(links => links.every(link => {
        if (link.hash && link.origin === location.origin && link.pathname === location.pathname) return !!document.getElementById(link.hash.slice(1));
        return /^(https?:|mailto:)/.test(link.href);
      }))).toBe(true);
      await page.reload();
      await expect(page.locator(section)).toBeAttached();
    }
    await page.setViewportSize({width: 1440, height: 1080});
    const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(axe.violations).toEqual([]);
    expect(errors).toEqual([]);
    for (const path of ['/robots.txt','/brand/gloz-original-light.png','/fonts/montserrat-latin-wght-normal.woff2','/projects/work-1.jpg']) expect((await request.get(path)).status()).toBe(200);
    for (const path of ['/concepts/','/src/','/__qa/does-not-exist.js','/projects/missing.jpg']) expect((await request.get(path)).status()).toBe(404);
  });
}

test('Navegación de rutas, historial, menú móvil, teclado y contactos aprobados', async ({ page }) => {
  await page.setViewportSize({width: 1440, height: 900});
  await page.goto('/');
  for (const [label, url] of [['Proyectos','/proyectos'],['Estudio','/estudio'],['Hablemos','/contacto']]) {
    await page.locator('#primary-nav').getByRole('link',{name:label,exact:true}).click();
    await expect(page).toHaveURL(new RegExp(url+'$'));
    await expect(page.locator('#contenido')).toBeFocused();
    await expect(page.locator(`#primary-nav a[href="${url}"]`)).toHaveAttribute('aria-current','page');
  }
  await page.goBack();
  await expect(page.locator('gloz-studio-page')).toBeAttached();
  await page.goForward();
  await expect(page.locator('gloz-contact-page')).toBeAttached();
  await expect(page.locator('footer a[href="mailto:holaagloz@gmail.com"]')).toBeVisible();
  await expect(page.locator('footer a[href="https://wa.me/5491153332748"]')).toBeVisible();
  await expect(page.locator('footer a[href="https://www.instagram.com/studiogloz/"]')).toBeVisible();
  expect(await page.locator('a[target="_blank"]').evaluateAll(links=>links.every(a=>a.rel.includes('noopener')))).toBe(true);
  await page.locator('header .logo').click();
  await expect(page).toHaveURL(/\/$/);
  await page.setViewportSize({width:390,height:844});
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded','true');
  await expect(page.locator('#contenido')).toHaveAttribute('inert','');
  await page.keyboard.press('Tab');
  await expect(page.locator('#primary-nav a').first()).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#primary-nav a').last()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded','false');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('#primary-nav a').first().click();
  await expect(page).toHaveURL(/\/proyectos$/);
  await expect(page.locator('#contenido')).not.toHaveAttribute('inert','');
  await expect(toggle).toHaveAttribute('aria-expanded','false');
});

for (const script of ['verify-coverflow', 'verify-loading']) {
  test(`Cinematic aprobado: ${script}`, async () => {
    test.setTimeout(240_000);
    const {stdout,stderr} = await promisify(execFile)(process.execPath,[`tests/qa/${script}.mjs`],{timeout:220_000,maxBuffer:4*1024*1024});
    await mkdir('test-results/qa',{recursive:true});
    await writeFile(`test-results/qa/${script}.log`,stdout+stderr);
  });
}
