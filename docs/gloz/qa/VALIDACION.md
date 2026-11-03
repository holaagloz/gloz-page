# Validación - Fase 1

Fecha: 2 de noviembre de 2026, America/Costa_Rica.

## Revisión previa

Se leyó el prompt y la especificación completos antes de implementar. Se abrió visualmente `reference/approved-hero-services.png` y se renderizaron y revisaron las seis páginas de `reference/brand-manual.pdf` con Poppler. Se comprobó la diferencia entre el logotipo serif oficial y el logotipo del mockup. Al faltar un original SVG/PNG, se incluyó un marcador tipográfico temporal explícito, sin imitar un nuevo logo oficial.

Plan aplicado: cuatro componentes standalone (Header, Hero, CapabilitiesStrip, Services), un componente de marcador temporal, tokens compartidos SCSS, fuentes locales y salida estática. Se conservaron los textos solicitados y el alcance de Fase 1.

## Comandos y resultados

| Validación | Resultado |
| --- | --- |
| `npm install` | Dependencias instaladas y `package-lock.json` generado |
| `npm run check` | TypeScript estricto sin errores |
| `npm run build` | Build de producción; una ruta prerenderizada; dentro del presupuesto de 350 kB |
| `npm test` | 8 pruebas Playwright en Chrome |
| Linter | No existía configuración previa; no se incorporó un linter adicional |

El entorno no tenía Node/npm en PATH. Se usó Node 24.22.1 del runtime disponible y npm 11.6.2 descargado en la carpeta temporal ignorada de la raíz. La instalación y el build requirieron ejecución fuera del sandbox: esbuild no podía recorrer los directorios antecesores. Esto no cambia los comandos normales para desarrollo con Node/npm instalados.

## Navegador y revisión visual

Se comprobó el **build real de producción**, servido localmente, a 375, 390, 768, 1024, 1280 y 1440 px. Se guardaron y revisaron las capturas completas `viewport-*.png`, además de `mobile-menu.png`.

- Un H1, un H2 y tres H3; orden semántico 01/02/03.
- Sin desbordamiento horizontal ni recorte de los bloques de texto de contenido.
- Retícula de Servicios 7/5 a 1280 y 1440; tarjetas apiladas en los tamaños inferiores para preservar legibilidad.
- Revisión visual de jerarquía, panel diagonal, colores, tipografía, franja y composición diferenciada de servicios. Se ajustaron márgenes de la franja, encuadre de ilustraciones y el salto de línea del acento del Hero.
- Las ilustraciones se recortan deliberadamente dentro de sus composiciones; no se deforman ni se usan como resultados reales. Sus leyendas tienen una superficie de fondo para conservar contraste.
- Navegación móvil por teclado: abrir con Enter, Tab y Shift+Tab contenidos, Escape y devolución del foco, cierre al ir a Servicios y al cambiar a escritorio; bloqueo de scroll mientras está abierta.
- Auditoría axe con reglas WCAG 2 A/AA y 2.1 AA en seis tamaños y con menú abierto: sin infracciones detectadas.
- Sin errores de consola ni de página en las seis pruebas responsive; se verifican también advertencias de hidratación NG05xx.
- Contenido prerenderizado visible con JavaScript desactivado y `prefers-reduced-motion` respetado.
- Sin anchors simulados; todos los enlaces activos apuntan a destinos construidos.

Las pruebas automáticas y la inspección visual no equivalen a una certificación de accesibilidad ni a identidad píxel a píxel con un mockup conceptual. La validación se hizo en Chrome de escritorio con distintos viewports; Safari, Firefox y dispositivos físicos no fueron probados.

## Pendientes

Recurso original necesario: logotipo SVG o PNG transparente de Gloz, en versiones apropiadas para fondo claro y oscuro. El TODO está en `src/app/shared/brand-placeholder.ts`.

Proyectos, Nosotros, Contacto y sus CTA quedan pendientes, sin destinos inventados. No se añadieron secciones posteriores, formularios, APIs ni despliegue.
