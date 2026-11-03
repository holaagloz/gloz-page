# Validación del prompt maestro

Fecha: 2 de noviembre de 2026 (America/Costa_Rica).

## Inspección y alcance

La aplicación existente se había movido a la raíz. Se conservaron Angular 22.2.4, TypeScript 6.0.3, componentes standalone, SCSS, fuentes locales y la salida estática. Se comprobó Node 24.22.1; no se instalaron ni migraron dependencias. No había linter configurado y no se añadió uno.

Se leyó el prompt maestro adjunto, se inspeccionó la especificación de Fase 1 y se revisaron visualmente el mockup aprobado y las seis páginas renderizadas del manual. No estaban `GLOZ_MASTER_SPEC.md` ni los dos mockups conceptuales nuevos; se continuó con las instrucciones escritas del prompt, registrando esa limitación.

El nuevo prompt amplía el alcance anterior a la página completa. Se mantuvo la composición aprobada de Hero/Servicios y se añadieron Proyectos, Proceso, Nosotros, Contacto y Footer. Los datos se separaron del markup. Las anclas ahora tienen destinos construidos.

## Validación ejecutada

| Comando | Resultado |
| --- | --- |
| `npm run check` | TypeScript estricto sin errores |
| `npm run build` | Una ruta prerenderizada, sin errores; bundle inicial de 233.38 kB, transferencia estimada de 66.22 kB; dentro del presupuesto de 350 kB |
| `npm run test:unit` (incluido en `npm test`) | 4 pruebas: canales válidos/ausentes, URLs seguras, clientes autorizados sin duplicados y condiciones de publicación de trabajos |
| `npm test` | 12 E2E de Playwright en Chrome, además de las 4 unitarias |
| Lint | No existe script ni configuración de linter |

En esta máquina Node/npm no están en PATH. Se utilizaron el Node del runtime y npm temporal ya disponibles. El sandbox impide a esbuild resolver directorios antecesores; el build y Chrome se ejecutaron con la escalación de herramientas autorizada. Los comandos habituales del README sirven con Node/npm instalados normalmente.

## Cobertura y revisión visual

- Seis viewports: 375, 390, 768, 1024, 1280 y 1440 px. Capturas completas `master-375.png` a `master-1440.png`, más `master-menu.png`.
- Se revisaron visualmente las seis capturas: jerarquía tipográfica, geometría diagonal del Hero, franja, Servicios 7/5 en escritorio, caso destacado, timeline, composición de Nosotros y cierre en azul. No se afirma identidad píxel a píxel con una imagen conceptual.
- Sin overflow horizontal ni recorte de bloques de texto de Hero/Servicios; los gráficos de servicios tienen recortes compositivos deliberados dentro de sus límites.
- Un H1 y cinco H2 de sección. Servicios en orden 01/02/03; timeline de cinco etapas, horizontal en escritorio y vertical en móvil/tablet.
- Auditoría axe WCAG 2 A/AA y 2.1 AA en seis viewports y menú abierto: sin infracciones detectadas.
- Menú: Enter, Tab/Shift+Tab, Escape, restauración de foco, cierre al navegar, foco en destino, bloqueo de scroll y restablecimiento al pasar a escritorio.
- Navegación: cinco anclas reales, CTA a Contacto/Proyectos y destinos visibles bajo el header sticky.
- SEO: HTML prerenderizado con datos de hidratación, `lang="es-CR"`, title, description y OG textual, robots disponible y copyright dinámico en la zona horaria de Costa Rica.
- HTML público disponible sin JavaScript; movimiento reducido respetado. Sin errores de página, errores de consola ni avisos NG05xx de hidratación en las pruebas responsive.
- No hay galerías, logos ni canales de contacto ficticios en la página pública. Viejos solo se presenta como desarrollo de software y no incluye una interfaz simulada.

## Carrusel y galería

Los datos de clientes están vacíos y no hay portadas reales, por lo que sus subsecciones están ocultas en producción. Para comprobar la interacción se compiló una aplicación independiente que importa los componentes reales con fixtures claramente identificados, exclusivamente en `tests/harness/` y `dist/carousel-qa/`.

Se probaron controles anterior/siguiente, estados en ambos extremos, flechas de teclado, Home/End, salida normal de foco, ausencia de autoplay y controles ocultos cuando todo cabe. Se corrigió el estado inicial de scroll snap añadiendo scroll padding coherente con el margen interno. El desplazamiento táctil se apoya en overflow y scroll snap nativos; no se probó en un dispositivo físico.

Se probaron filtros derivados de categorías presentes, selección y restablecimiento, ausencia de categorías vacías, ocultación del carrusel cuando fallan sus imágenes y fallback de las imágenes de galería. Los fixtures no forman parte del build público.

## Límites y pendientes

Chrome de escritorio con viewports variables; no se comprobaron Safari, Firefox ni dispositivos físicos. Axe y las pruebas no constituyen una certificación de accesibilidad. No se midieron Core Web Vitals en producción porque no hubo despliegue.

Ver `../ACTIVOS_PENDIENTES.md`: logo original, logos/clientes autorizados, campañas y trabajos reales, capturas auténticas de Viejos y canales de contacto. Foto real del equipo opcional. Canonical y sitemap quedan pendientes del dominio verdadero. No se añadieron formulario, backend, analítica, cuentas, pagos, hosting ni DNS.
