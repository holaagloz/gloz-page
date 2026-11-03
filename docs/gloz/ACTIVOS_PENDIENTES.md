# Activos y configuración pendientes

No se requiere completar datos ficticios para usar el diseño. Cada componente omite o identifica explícitamente los elementos que todavía no tienen un recurso auténtico.

| Recurso | Destino recomendado | Configuración y comportamiento |
| --- | --- | --- |
| Logo original Gloz, SVG o PNG transparente, versiones oscura y blanca | `public/brand/` | `SITE_CONFIG.logo.dark` y `.light` en `src/app/data/site.config.ts`. `dark` se usa sobre fondo claro; `light` sobre oscuro. Al configurarlo se retira automáticamente el fallback textual temporal. Si falla la carga reaparece ese fallback. |
| Capturas auténticas de Viejos Barbería | `public/projects/viejos/` | `coverImage` y `coverAlt` en `projects.data.ts`; `gallery` permite guardar más recursos para ampliaciones posteriores. Se sustituye la composición neutral del caso. No hay caso de estudio ni URL de producto inventados. |
| Nombres y logos de otras marcas, con permiso para publicarlos | `public/clients/` | Añadir entradas tipadas en `clients.data.ts`: id, nombre, logo, alt y `authorized: true`; url y servicios opcionales, reales. No crear entradas repetidas. El carrusel aparece cuando hay datos válidos. |
| Trabajos reales de branding, marketing, diseño o contenido | `public/projects/` | Añadir proyecto con categorías, resumen, rol confirmado, portada auténtica, alt y `approvedForPublication: true`. La galería aparece si hay trabajos con imagen y alt. Los filtros aparecen cuando existen varias categorías. |
| Correo, WhatsApp y redes reales | Sin archivos | Configurar email, WhatsApp internacional con `+`, Instagram y/o LinkedIn en `site.config.ts`. Solo se renderizan canales con formatos válidos; se deben confirmar con el negocio antes de configurarlos. |
| Fotografía auténtica del equipo, opcional | `public/team/` | La sección Nosotros ya utiliza una composición tipográfica. Si se decide sustituirla, añadir la foto con alt, dimensiones y permiso. No se añadieron nombres, retratos ni biografías ficticias. |
| Dominio público y URL de imagen social aprobada | Configuración futura de publicación | Entonces podrán añadirse canonical, sitemap y `og:url`/`og:image`. La configuración actual no presupone un dominio. |

Las imágenes de logos se contienen sin deformarse. Los trabajos usan proporciones reservadas para prevenir desplazamientos y `loading="lazy"`. Verificar encuadre, legibilidad y derechos de publicación al incorporar cada archivo.

Los mockups conceptuales mencionados en el prompt (`portfolio-direction-concept-only.png`, `full-page-direction-concept-only.png`) y `GLOZ_MASTER_SPEC.md` no estaban en el repositorio. No fueron inspeccionados ni usados como si hubieran estado disponibles. Se aplicó el contenido autorizado del prompt maestro adjunto, el manual y el mockup aprobado existente. Las especificaciones antiguas permanecen intactas como historial de Fase 1.

Mejoras posteriores sugeridas: incorporar los activos anteriores, diseñar un caso de estudio real con alcance confirmado, comprobar en Safari/Firefox y dispositivos físicos, y medir Core Web Vitals en el entorno final. No se ejecutó publicación, DNS, hosting ni integraciones de pago.
