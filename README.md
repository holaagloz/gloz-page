# Gloz - Estudio creativo y tecnológico

Sitio institucional Angular 22 standalone, TypeScript estricto y SCSS. Una página pública prerenderizada con hidratación. Implementa el prompt maestro sobre el trabajo previo de Fase 1, sin despliegue ni backend.

## Ejecutar desde la raíz

Requisitos: Node 24.15+ en la rama 24 (validado con 24.22.1), npm y Google Chrome instalado para E2E.

```powershell
npm ci
npm start
```

Abrir http://127.0.0.1:4200. La aplicación ahora está en la raíz; no hay que entrar a `GLOZ_CODEX_FASE1`.

```powershell
npm run check
npm run build
npm test
```

`npm run build` genera únicamente el sitio público en `dist/gloz/browser/` con una ruta prerenderizada. `npm test` ejecuta 4 pruebas unitarias, compila una aplicación aislada de fixtures y ejecuta 12 E2E en Chrome. Requiere el build público previo y el puerto 4300 libre; inicia y cierra su propio servidor de QA. No se instala otro navegador ni hay servidor de producción persistente.

Los fixtures de QA están en `tests/harness/` y su salida independiente en `dist/carousel-qa/`. **No forman parte de `dist/gloz/browser/`**. No publicar esa aplicación de pruebas.

## Componentes y datos

- `src/app/header/`, `hero/`, `capabilities-strip/`, `services/`: dirección aprobada conservada, CTA reales y servicios renderizados desde datos.
- `src/app/portfolio/`: caso verificado de Viejos Barbería exclusivamente como desarrollo de software; composición neutral hasta recibir capturas auténticas.
- `src/app/client-logo-carousel/`: carrusel nativo, sin autoplay ni clones, con teclado, scroll snap, extremos y controles condicionales. Oculto sin logos autorizados.
- `src/app/work-gallery/`: galería con filtros derivados de las categorías que tienen trabajos publicables. Oculta sin imágenes reales y textos alternativos.
- `src/app/process/`, `about/`, `contact/`, `site-footer/`: cierre editorial, sin fotos de personas ficticias, formulario ni datos de contacto inventados.
- `src/app/data/`: modelos, servicios, proyectos, clientes, proceso, configuración y reglas de publicación.
- `src/app/shared/brand-placeholder.ts`: punto de integración del logo original, con fallback textual temporal y manejo de error.
- `src/styles.scss`: tokens, fuentes locales, foco visible y movimiento reducido.
- `public/fonts/`: Montserrat y Yeseva One con sus licencias SIL OFL.

## Incorporar activos reales

Ver [guía de activos](docs/gloz/ACTIVOS_PENDIENTES.md). La configuración está en `src/app/data/site.config.ts`; proyectos y clientes en sus archivos `.data.ts`. Los archivos públicos se pueden guardar bajo `public/brand/`, `public/clients/` y `public/projects/` y referenciar como `/brand/...`, `/clients/...` y `/projects/...`.

Sin datos de contacto no se renderiza un botón de envío ni un enlace externo: el bloque comunica que el canal está pendiente. Los CTA de Hero y Header sí navegan a las secciones reales.

## Validación y límites

Ver [informe del sitio completo](docs/gloz/qa/VALIDACION_MAESTRO.md) y las capturas `docs/gloz/qa/master-*.png`. El informe anterior `VALIDACION.md` y las capturas `viewport-*.png` conservan el historial de Fase 1.

No se añadieron canonical, dominio, Open Graph image ni sitemap con URLs inventadas. Se incluyeron `lang="es-CR"`, metadatos OG textuales y `robots.txt`. Faltan el logo original, logos de clientes, trabajos y campañas reales, capturas de Viejos y canales de contacto. La fotografía auténtica del equipo es opcional.
