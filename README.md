# GLOZ Studio

Web de GLOZ Studio en Angular 22, TypeScript estricto y SCSS. Rutas: `/`, `/proyectos`, `/estudio` y `/contacto`.

El Cinematic 3D Coverflow muestra siete tarjetas en escritorio y tres en móvil, repitiendo cuatro fotogramas originales en un bucle continuo. Comparte la selección con el portfolio y permite flechas, teclado, swipe y selección directa, sin autoplay.

## Desarrollo

Requisitos: Node `^24.15.0 || >=26.0.0` y npm. Los E2E requieren Google Chrome instalado y el puerto 4300 libre. En PowerShell usar `npm.cmd` si la política local bloquea `npm.ps1`.

```sh
npm ci
npm start
```

Abrir http://127.0.0.1:4200.

## Compilación y pruebas

```sh
npm run check
npm run build
npm test
```

`npm test` comprueba TypeScript, ejecuta cuatro pruebas unitarias del coverflow, compila producción y ejecuta siete pruebas E2E. Playwright inicia y cierra su servidor local. Cubre las cuatro rutas en seis resoluciones, recursos, accesibilidad, navegación, menú móvil, coverflow, hover, swipe, transiciones y carga fría/retrasada. `npm run test:e2e` repite los E2E sobre un build existente.

Capturas, trazas e informes se generan en `test-results/` y `playwright-report/`, ignorados por Git. Para comparar visualmente las cuatro rutas con un build aprobado, iniciar `node tests/serve.mjs` y ejecutar en otra terminal:

```sh
node tests/qa/compare-approved.mjs C:/ruta/al/approved-browser
```

## Estructura

```text
src/
  main.ts, main.server.ts, index.html
  styles.scss
  app/
    app.ts, app.routes.ts
    pages/                     Inicio, proyectos, estudio y contacto
    header/, site-footer/      Navegación y contactos
    hero/, coverflow/          Portada y carrusel 3D
    portfolio/                 Portfolio sincronizado
    disciplines/, editorial/  Secciones de la web
    data/                      Piezas, selección y configuración
public/
  brand/                       Logotipos oficiales y textura
  fonts/                       Tipografías locales y licencias
  projects/                    Cuatro fotogramas originales
  robots.txt
tests/                        Unitarias, E2E y verificaciones visuales
```

`works.data.ts` define piezas y encuadres; `WorkSelection` sincroniza hero y portfolio. `site.config.ts` contiene los contactos oficiales. Las clases `.v4a` y `.cinematic-validation` son estilos activos del diseño aprobado.

El build genera el sitio estático en `dist/gloz/browser/`, con un `index.html` por ruta. El hosting debe servir índices de directorio. El `<base href="/">` presupone la raíz de un dominio; para publicar en un subdirectorio hay que configurar `base-href` y validar ese destino.
