import { test, expect } from '@playwright/test';

test('Datos honestos, SEO y recursos pendientes', async ({ page, request }) => {
  const response = await page.goto('/');
  const html = await response!.text();
  expect(html).toContain('ngh=');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-CR');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Gloz/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('#proyectos h3')).toHaveText('Viejos Barbería');
  await expect(page.locator('.project-role')).toHaveText('Desarrollo de software');
  await expect(page.locator('.placeholder-note')).toContainText('Capturas auténticas pendientes');
  await expect(page.getByRole('region', { name: 'Marcas con las que hemos trabajado', exact: true })).toHaveCount(0);
  await expect(page.getByRole('region', { name: 'Trabajos seleccionados' })).toHaveCount(0);
  await expect(page.locator('#contacto a')).toHaveCount(0);
  await expect(page.locator('.channel-pending')).toBeVisible();
  await expect(page.locator('form, iframe')).toHaveCount(0);
  expect(html).not.toMatch(/El Jardín Café|Pulso Fitness|La Esquina Burger|Vértice Bienes Raíces|QA fixture|example\.test/);
  const year = new Intl.DateTimeFormat('es-CR', { year: 'numeric', timeZone: 'America/Costa_Rica' }).format(new Date());
  await expect(page.locator('.footer-bottom')).toContainText(`© ${year} Gloz`);
  expect((await request.get('/robots.txt')).status()).toBe(200);
});

test('Anclas reales, destinos visibles bajo header y CTA', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  for (const id of ['servicios', 'proyectos', 'proceso', 'nosotros', 'contacto']) {
    await page.locator(`#navigation a[href="#${id}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator('#' + id)).toBeFocused();
    const bounds = await page.locator('#' + id).boundingBox();
    expect(bounds!.y).toBeGreaterThanOrEqual(80);
  }
  await page.getByRole('link', { name: 'Ver proyectos', exact: true }).click();
  await expect(page).toHaveURL(/#proyectos$/);
  await page.getByRole('link', { name: 'Hablemos de tu proyecto' }).click();
  await expect(page).toHaveURL(/#contacto$/);
});

test('Carrusel real: controles, teclado, extremos y sin autoplay (datos aislados)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/__qa/');
  const track = page.locator('.logo-track');
  await expect(track.locator('li')).toHaveCount(6);
  const previous = page.getByRole('button', { name: 'Marcas anteriores' });
  const next = page.getByRole('button', { name: 'Marcas siguientes' });
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();
  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  await page.keyboard.press('End');
  await expect(next).toBeDisabled();
  await page.keyboard.press('Home');
  await expect(previous).toBeDisabled();
  await next.click();
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  await previous.click();
  await expect(previous).toBeDisabled();
  await track.focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('[role="group"][aria-label="Filtrar trabajos"] button').first()).toBeFocused();
  // Native scroll + snap is the touch path; no timer, clone or marquee exists.
  expect(await track.evaluate(el => getComputedStyle(el).scrollSnapType)).toBe('x mandatory');
  const start = await track.evaluate(el => el.scrollLeft);
  await page.waitForTimeout(400);
  expect(await track.evaluate(el => el.scrollLeft)).toBe(start);
  await page.setViewportSize({ width: 2200, height: 1000 });
  await expect(next).toHaveCount(0);
  await expect(previous).toHaveCount(0);
});

test('Galería real: filtros derivados y fallback de imágenes (datos aislados)', async ({ page }) => {
  await page.goto('/__qa/');
  const gallery = page.getByRole('region', { name: 'Trabajos seleccionados' });
  await expect(gallery.locator('article')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Marketing digital', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Software', exact: true }).click();
  await expect(gallery.locator('article')).toHaveCount(1);
  await expect(gallery.locator('h4')).toHaveText('QA software fixture');
  await expect(page.getByRole('button', { name: 'Software', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Branding', exact: true }).click();
  await expect(gallery.locator('h4')).toHaveText('QA branding fixture');
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  await expect(gallery.locator('article')).toHaveCount(2);
  await page.route('**/fixture.svg', route => route.abort());
  await page.reload();
  await expect(page.locator('.image-fallback')).toHaveCount(2);
  await expect(page.locator('.client-section')).toHaveCount(0);
});
