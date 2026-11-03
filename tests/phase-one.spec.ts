import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [375, 390, 768, 1024, 1280, 1440]) {
  test(`Sitio completo a ${width}px: estructura, layout y accesibilidad`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', msg => {
      if (msg.type() === 'error' || /NG05\d+/.test(msg.text())) errors.push(msg.text());
    });
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#servicios h2')).toHaveText('Tres disciplinas.Una misma visión.');
    await expect(page.locator('h2')).toHaveCount(5);
    await expect(page.locator('#servicios h3')).toHaveCount(3);
    await expect(page.locator('#proceso li')).toHaveCount(5);
    expect(await page.locator('a').evaluateAll(links => links.every(link => {
      const href = link.getAttribute('href');
      return !!href && href !== '#' && !!document.querySelector(href);
    }))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    // Check real text rectangles rather than only the document width: service
    // artwork intentionally crops, while readable content must stay in its card.
    expect(await page.locator('.service-copy, .hero-copy').evaluateAll(elements => elements.every(element => {
      const outer = element.getBoundingClientRect();
      return Array.from(element.querySelectorAll('h1,h3,p,li')).every(text => {
        const box = text.getBoundingClientRect();
        return box.left >= outer.left - 1 && box.right <= outer.right + 1 && text.scrollWidth <= text.clientWidth + 1;
      });
    }))).toBe(true);
    const cards = await page.locator('.service').evaluateAll(elements => elements.map(el => {
      const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height };
    }));
    if (width >= 1100) {
      expect(cards[0].x).toBeLessThan(cards[1].x);
      expect(cards[1].x).toBe(cards[2].x);
      expect(cards[0].width / cards[1].width).toBeCloseTo(7 / 5, 1);
    } else {
      expect(cards[0].y).toBeLessThan(cards[1].y);
      expect(cards[1].y).toBeLessThan(cards[2].y);
    }
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations).toEqual([]);
    await page.screenshot({ path: `docs/gloz/qa/master-${width}.png`, fullPage: true });
    await testInfo.attach(`viewport-${width}`, { path: `docs/gloz/qa/master-${width}.png`, contentType: 'image/png' });
    expect(errors).toEqual([]);
  });
}

test('Menú móvil: teclado, Escape, foco, scroll y navegación', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('body')).toHaveClass('menu-open');
  await page.keyboard.press('Tab');
  await expect(page.locator('#navigation').getByRole('link', { name: 'Servicios' })).toBeFocused();
  for (let index = 0; index < 6; index++) await page.keyboard.press('Tab');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#navigation').getByRole('link', { name: 'Hablemos' })).toBeFocused();
  for (let index = 0; index < 6; index++) await page.keyboard.press('Shift+Tab');
  await expect(toggle).toBeFocused();
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations).toEqual([]);
  await page.screenshot({ path: 'docs/gloz/qa/master-menu.png', fullPage: false });
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass('menu-open');
  await toggle.click();
  await page.locator('#navigation').getByRole('link', { name: 'Servicios' }).click();
  await expect(page.locator('#servicios')).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator('body')).not.toHaveClass('menu-open');
});

test('HTML prerenderizado y preferencia de movimiento reducido', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 375, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('#servicios h3')).toHaveCount(3);
  for (const id of ['proyectos', 'proceso', 'nosotros', 'contacto']) await expect(page.locator('#' + id)).toBeAttached();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await context.close();
});
