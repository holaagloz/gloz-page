# GLOZ — PROMPT MAESTRO PARA CODEX

> **Rol y objetivo.** Actúa como **Staff Frontend Engineer (Angular)**, **Lead UI/UX Designer**, **Art Director**, **Accessibility Engineer** y **QA Engineer**. Debes **construir**, probar y pulir la web institucional de **Gloz**, un estudio creativo y tecnológico que trabaja tanto con emprendimientos como con empresas. La marca ofrece **branding/diseño**, **marketing digital** y **desarrollo de software**. La web debe parecer una pieza de un estudio creativo premium: editorial, contemporánea, precisa, visual, sobria y distintiva. Debe funcionar igual de bien que se ve.

## 0. Lo primero: inspeccionar, no improvisar

Antes de editar código:

1. Inspecciona el repositorio, el árbol de archivos, scripts, Node, Angular y dependencias. **No sobrescribas avances ni reestructures innecesariamente un proyecto existente.**
2. Lee la documentación y **examina visualmente** estas referencias. No basta con leer sus nombres:
   - `docs/gloz/reference/brand-manual.pdf` — **fuente de verdad de identidad visual**: logotipo, colores, tipografías y texturas.
   - `docs/gloz/reference/approved-hero-services.png` — **mockup aprobado** de Hero + Servicios; referencia prioritaria para jerarquía, composición y dirección de arte.
   - `docs/gloz/reference/portfolio-direction-concept-only.png` — orientación visual para el portafolio. **Contiene marcas ficticias**, por lo que sus nombres, logotipos y supuestos trabajos **NO se pueden usar**.
   - `docs/gloz/reference/full-page-direction-concept-only.png` — guía preliminar de continuidad visual para la página completa. **No es una maqueta aprobada píxel por píxel**; incluye imágenes, equipo y contenido hipotéticos que no deben publicarse.
   - `docs/gloz/GLOZ_DESIGN_SPEC.md` — especificación aprobada de Hero + Servicios.
   - `docs/gloz/GLOZ_MASTER_SPEC.md` — alcance, copy, estructuras e interacciones del resto de secciones.
3. Si no puedes abrir/inspeccionar un recurso visual, dilo explícitamente y no afirmes haberlo revisado. En ese caso continúa con las reglas escritas y registra la limitación.
4. Describe en un máximo de 15 líneas un plan de componentes, activos, fases y pruebas. **Luego implementa; no te limites a entregar un plan.**

**Prioridad en caso de contradicción:** (1) marca oficial para identidad; (2) mockup aprobado para Hero/Servicios; (3) especificaciones escritas para contenido y comportamiento; (4) demás mockups solo como inspiración de composición. Nunca copies logotipos o clientes inventados desde un mockup.

## 1. Identidad y experiencia que buscamos

- Paleta oficial: principal `#024AA9`, gris claro `#EDF2F1`, azul oscuro `#172547`. Blanco como neutro auxiliar.
- Tipografía: **Montserrat** en encabezados, controles y texto; **Yeseva One** solo en acentos editoriales muy puntuales cuando tenga sentido y sea legible.
- Logo: usar **archivo original** SVG/PNG proporcionado por el negocio. No transformar la versión inventada por un generador de imágenes en logo oficial; no recrear el wordmark con tipografía aproximada. Si solo existe el PDF, prepara un espacio de integración para el logo auténtico, con fallback textual discreto marcado como temporal y un TODO documentado.
- Emplear texturas de marca extremadamente sutiles, retícula impecable, tipografía de alta calidad, amplios espacios negativos y un uso deliberado del contraste entre claro y azul oscuro.
- Evitar estética genérica: **no** gradientes neón, glassmorphism, tarjetas clonadas con sombras, iconos enormes, cohetes, estadísticas inventadas, frases vacías, renders falsos de clientes, testimonios imaginarios, fotos sintéticas del equipo o animaciones continuas.
- No recrees la captura aprobada como una sola imagen de fondo: implementa layout real, semántico, accesible y adaptable.
- Idioma de la interfaz: español natural, profesional y cercano (Costa Rica, sin localismos excesivos).

## 2. Arquitectura y stack

- **Angular 22 estable** si el entorno es compatible; si hay otro Angular estable ya instalado en el repo, evalúa compatibilidad y evita migraciones innecesarias. Verifica la versión compatible de Node/TypeScript en la documentación oficial de Angular antes de instalar.
- Single-page de presentación pública, componentes **standalone**, TypeScript estricto y SCSS con design tokens reutilizables.
- Solo una ruta pública principal; navegación por anclas reales entre secciones.
- Preferir prerender/SSG para página pública y SEO, sin dependencia de backend permanente. Si es incompatible con el contexto existente, explica la decisión y usa la alternativa estática adecuada.
- Componentes sugeridos: `SiteHeader`, `Hero`, `CapabilitiesStrip`, `Services`, `Portfolio`, `ClientLogoCarousel`, `WorkGallery`, `Process`, `About`, `Contact`, `SiteFooter`. Evita componentes innecesarios.
- Datos tipados separados del markup (`projects`, `clients`, `services`, `siteConfig`); **no duplicar contenido en HTML**.
- No NgRx, no Angular Material, no librerías visuales pesadas, no backend, no autenticación, no analítica no solicitada, no dependencia de API externa para renderizar el contenido principal.
- Integrar assets de manera optimizada: tamaños apropiados, lazy loading bajo el primer viewport, cargas sin CLS, manejo de fallbacks y `alt` semántico.
- El diseño debe funcionar sin JavaScript innecesario y no introducir errores de hidratación.

## 3. Estructura de la página y copy autorizado

### 3.1 Header
- Logo de Gloz a la izquierda.
- Navegación a `#servicios`, `#proyectos`, `#proceso`, `#nosotros`, `#contacto`.
- CTA discreto: **Hablemos** → `#contacto`.
- Sticky con fondo claro y separación/sombra sutil al hacer scroll.
- Móvil: navegación accesible y desplegable; cerrar por Escape, clic en enlace y botón; bloquear scroll cuando esté abierto y controlar el foco correctamente.

### 3.2 Hero — dirección VISUAL APROBADA
- Eyebrow: **ESTUDIO CREATIVO Y TECNOLÓGICO**.
- H1: **Diseñamos marcas, experiencias y soluciones digitales con intención.**
- Intro: **Combinamos branding, marketing digital y desarrollo de software para crear proyectos que comunican mejor, se ven profesionales y están construidos para crecer.**
- CTA principal: **Hablemos de tu proyecto** → `#contacto`.
- CTA secundario: **Ver proyectos** → `#proyectos`.
- Composición editorial asimétrica: texto protagonista en lado izquierdo y **panel escultórico azul oscuro** a la derecha, delimitado con geometría diagonal y textura mínima. En el panel: logo original blanco, pequeñas etiquetas **CREATIVE & DIGITAL STUDIO** / **IDENTITY / STRATEGY / TECHNOLOGY** y numeración editorial si no se vuelve recargado.
- Respetar la referencia `approved-hero-services.png`, especialmente proporciones, tipografía, textura, diagonales y tratamiento de CTAs.
- En móvil: texto y CTA antes del panel, sin que una pieza decorativa domine la pantalla.

### 3.3 Franja de capacidades — APROBADA
- Banda fina y editorial debajo del Hero con: **Branding** · **Marketing digital** · **Desarrollo de software**.
- Separadores discretos; sin carrusel automático ni marquee.

### 3.4 Servicios — dirección VISUAL APROBADA
- Eyebrow: **02 / QUÉ HACEMOS**.
- H2: **Tres disciplinas. Una misma visión.**
- Intro: **Unimos creatividad, estrategia y tecnología para desarrollar soluciones que conectan con las personas y responden a las necesidades de cada negocio.**
- Bento asimétrico escritorio con retícula conceptual 7/5: bloque grande izquierdo de branding y dos bloques derechos apilados de marketing y software. Tratamientos gráficos distintos, no tres tarjetas clonadas. Seguir la referencia aprobada.
- **Branding y diseño**: “Construimos identidades visuales sólidas, coherentes y memorables para marcas que buscan comunicar su esencia con claridad y profesionalismo.” Capacidades: Logotipos; Identidad visual; Manuales de marca; Diseño gráfico y piezas digitales.
- **Marketing digital**: “Desarrollamos estrategias, campañas y contenido para fortalecer la presencia digital de los negocios y conectar con sus audiencias.” Capacidades: Estrategia digital; Campañas publicitarias; Creación de contenido; Gestión de redes sociales.
- **Desarrollo de software**: “Diseñamos y construimos sitios web, aplicaciones y sistemas personalizados que resuelven necesidades reales y mejoran la experiencia de cada negocio.” Capacidades: Sitios web; Aplicaciones web; Sistemas a medida; Automatizaciones e integraciones.
- Branding: arte editorial/papelería Gloz; Marketing: tratamiento visual de contenido; Software: visual técnico oscuro. **Los mockups de servicios son ilustración de capacidades, no casos de éxito verificados.**

### 3.5 Proyectos y marcas — NUEVA estructura prioritaria
Esta sección **NO** debe mostrar al estudio como si solo hubiera trabajado con Viejos Barbería. Existen experiencias reales en branding, creación de contenido y marketing con múltiples marcas, pero **sus nombres y archivos no están aún suministrados**.

**Encabezado**:
- Eyebrow: **03 / PROYECTOS**.
- H2: **Ideas que toman forma.**
- Intro: **Cada proyecto nace de una necesidad diferente. Combinamos estrategia, creatividad y tecnología para convertir esas ideas en soluciones reales.**

**Subsección A — Caso destacado:**
- **Viejos Barbería**. Categoría verificada: **Desarrollo de software**.
- Descripción breve permitida: “Aplicación web para reservar citas y gestionar la agenda, los clientes y las operaciones de la barbería.”
- Composición protagonista en fondo azul oscuro, con espacio para capturas auténticas de la app en escritorio/móvil. **No afirmar que Gloz hizo branding, identidad, campañas ni resultados de este cliente si no se proporciona confirmación.**
- Si no hay capturas auténticas, usar una composición de marca neutra que identifique el proyecto, con placeholder claramente técnico; NO simular interfaces reales ni publicarlas como capturas del producto.
- “Ver caso de estudio” solo será enlace si existe caso de estudio real implementado. Si no, usar etiqueta no interactiva o dirigir a contacto con CTA honesto.

**Subsección B — Marcas con las que hemos trabajado:**
- Titular: **Marcas con las que hemos trabajado.**
- Carrusel horizontal refinado de **logotipos reales y autorizados**, preferiblemente monotono/gris suave por defecto y color en hover/focus solo si es fiel a la marca del cliente.
- **No autoplay**. Flechas de navegación discretas, soporte táctil/scroll snap y teclado, foco visible; ocultar flechas si no hay desplazamiento; no duplicar logos para aparentar más clientes.
- Poblar desde `clients.data.ts` o archivo equivalente, con `name`, `logo`, `alt`, `url?`, `services?` (todas las afirmaciones deben ser reales). Si no hay clientes confirmados/assets, **NO mostrar logotipos inventados, ni placeholders públicos como si fueran marcas reales**. Mantener el componente listo y ocultar el carrusel en producción hasta que haya datos; registrar claramente la tarea pendiente.

**Subsección C — Trabajos seleccionados:**
- Rejilla o carrusel visual de trabajos reales con imagen, nombre de marca, tipo de trabajo y un resumen de la aportación de Gloz. Diseño editorial con variedad de proporciones, sin mosaico de cards repetitivas.
- Filtros, solo cuando haya datos: **Todos**, **Branding**, **Marketing digital**, **Diseño**, **Contenido**, **Software**. Los filtros deben calcularse a partir de categorías existentes, no mostrarse vacíos ni inoperantes.
- Modelo de datos fácil de ampliar: `id`, `clientId?`, `title`, `categories[]`, `summary`, `coverImage`, `gallery?`, `url?`, `verifiedRole`, `featured`.
- **Prohibido** copiar los nombres o logos ficticios del mockup conceptual (El Jardín Café, Pulso Fitness, La Esquina Burger, Vértice Bienes Raíces); existen solo como referencias compositivas.
- Si solo está confirmado Viejos, mostrar únicamente Viejos, sin rellenar trabajos con ficción; dejar infraestructura de carrusel/galería lista para incorporar activos reales posteriormente.

### 3.6 Proceso — dirección preliminar, preservar estética
- Eyebrow: **04 / NUESTRO PROCESO**.
- H2: **De la idea a la realidad.**
- Intro: **Cada proyecto sigue un proceso claro que nos permite entender el negocio, diseñar con intención y construir soluciones sólidas.**
- Timeline editorial de 5 etapas, sin cinco tarjetas genéricas: **01 Descubrimos** — “Entendemos tu negocio, tus objetivos y lo que realmente necesitas.”; **02 Estrategiamos** — “Definimos la dirección, sus prioridades y la mejor forma de ejecutarlo.”; **03 Diseñamos** — “Convertimos la estrategia en una experiencia visual clara, atractiva y coherente.”; **04 Desarrollamos** — “Construimos la solución con atención al detalle y a su funcionamiento.”; **05 Lanzamos** — “Ponemos el proyecto en marcha y te acompañamos en sus siguientes pasos.”
- Horizontal en escritorio y vertical en móvil, con conectores discretos, numeración y aire editorial.
- Este proceso es **un esquema comercial general**, no prometas que todas las fases aplican idénticamente a cada servicio.

### 3.7 Nosotros — dirección preliminar
- Eyebrow: **05 / NOSOTROS**.
- H2: **El equipo detrás de Gloz.**
- Texto: **Somos un estudio que une creatividad, estrategia y tecnología para construir marcas, experiencias y soluciones digitales con propósito.**
- Texto complementario: **Nuestra fortaleza está en integrar diseño, marketing digital y desarrollo de software dentro de una misma visión de trabajo, cuidando tanto la estética como la funcionalidad de cada proyecto.**
- Tres puntos editoriales breves: **Visión integral**; **Enfoque en el negocio**; **Acompañamiento real**.
- Reservar lugar para una **fotografía auténtica** del equipo fundador, si es proporcionada. No introducir fotos de personas generadas por IA ni retratos stock de supuestos fundadores. Sin foto real, resolver con una composición tipográfica/de marca igualmente sofisticada.
- No inventar nombre de integrantes, títulos, trayectoria o premios.

### 3.8 Contacto — CTA real, sin acciones falsas
- Eyebrow: **06 / CONTACTO**.
- H2: **Hagamos algo bueno juntos.**
- Texto: **Cuéntanos tu idea, necesidad o proyecto. Estamos listos para ayudarte a convertirlo en algo real.**
- Bloque de alto contraste azul `#024AA9` o azul oscuro; amplio espacio, título y CTA.
- Contactos y redes se configuran en `site.config.ts` o equivalente: `email?`, `whatsapp?`, `instagram?`, `linkedin?`. **No inventar valores**. Renderizar enlaces solo cuando los datos existan y sean válidos.
- CTA de contacto debe conducir a un canal real configurado. Sin datos, mostrar el bloque de contacto con indicación discreta de canal pendiente y TODO claro para activarlo; **no poner un botón engañoso ni un formulario que simule enviar información**.
- No implementar backend de formulario en esta fase. Si hay email real disponible, `mailto:` puede ser una primera integración aceptable, con asunto claro.

### 3.9 Footer
- Azul oscuro `#172547`; logo oficial en versión correspondiente; descripción corta **Creative & Digital Studio**; navegación interna; redes sociales reales si configuradas; año actual generado dinámicamente. Nada de © 2025 fijo ni enlaces rotos.
- Espaciado generoso, buen contraste, accesibilidad y disposición responsive.

## 4. Interacciones, responsive y accesibilidad

- Breakpoints de QA obligatorios: **375, 390, 768, 1024, 1280, 1440 px**. Diseño mobile-first, sin overflow horizontal, texto cortado o superposiciones.
- Una única H1, H2 por sección y H3 en elementos de servicio/trabajo pertinentes.
- Navegación anclada con `scroll-margin-top` para compensar header sticky; respetar `prefers-reduced-motion`.
- Contraste WCAG AA, controles de tamaño táctil adecuado, `:focus-visible`, teclado, roles/labels adecuados.
- Carrusel de clientes **controlado y sin movimiento automático**, sin atrapamiento de foco y con estados de controles coherentes.
- Animaciones menores a ~300 ms por defecto, sin transiciones molestas. Imágenes optativas solo si mejoran realmente el diseño.
- Tipografía fluid con `clamp()`, ancho legible de párrafos, proporciones adaptativas de imágenes, prevención de CLS.
- Preferir Angular template + CSS nativo antes que plugins de carrusel/animación pesados.

## 5. SEO y rendimiento

- Prerenderizar HTML público de ser posible, metadata y Open Graph con datos reales; `lang="es-CR"`, favicon solo si existe logo/ícono auténtico, robots y sitemap según disponibilidad.
- No poner canonical/domain inventado, ni URL falsa de redes, ni Schema.org con hechos no comprobados.
- Optimizar LCP (Hero), CLS, accesibilidad y peso de las imágenes; defer/lazy para recursos posteriores y fuentes con `font-display` apropiado.
- Configurar títulos/description naturales, sin keyword stuffing.

## 6. Método de implementación y entregables por fases

**Regla de seguridad:** antes de modificar, comprueba si ya hay trabajo previo. Haz cambios incrementales, sin borrar código o archivos que no pertenezcan a este alcance. No tocar proyectos ajenos ni configuración sensible.

1. **Fase 0 — Fundamentos:** diagnóstico, Angular y tooling, tokens, tipografía, assets, datos/configuración, estructura semántica y scripts.
2. **Fase 1 — Identidad aprobada:** Header, Hero, franja de capacidades y Servicios, con refinamiento visual comparado con la referencia aprobada.
3. **Fase 2 — Portafolio real:** caso Viejos, carrusel de logos y galería configurables. Sin fabricar trabajo o marcas. Si faltan recursos, que el diseño degrade con elegancia.
4. **Fase 3 — Cierre del sitio:** Proceso, Nosotros, Contacto y Footer, tomando el mockup de página completa solo como guía preliminar.
5. **Fase 4 — QA/Polish:** pruebas unitarias necesarias, E2E de navegación y carrusel, comprobación responsive, audit de accesibilidad y SEO, comparativa visual y correcciones.

**No te detengas solo tras escribir la planificación.** Ejecuta las fases con la información disponible. Si un asset crítico está ausente, resuélvelo sin fabricar contenido y deja el TODO; no bloquees toda la construcción por la falta de logotipos de clientes o fotos.

**No publicar/desplegar ni cambiar DNS/hosting**, ni ejecutar acciones que impliquen gastos, sin autorización expresa.

## 7. Criterios de aceptación (Definition of Done)

- La implementación refleja la dirección de arte premium y el branding correcto, especialmente el Hero y Servicios aprobados.
- Hero no es un banner plano; Servicios no son tres tarjetas repetitivas; Proyectos muestra jerarquía y contemplación de trabajos reales, sin ficciones.
- Datos de clientes, roles y proyectos son verificables; sin logotipos inventados, supuestas fotos del equipo ni métricas ficticias.
- Todos los enlaces visibles conducen a destino funcional. No placeholders engañosos ni acciones falsas.
- Menú móvil accesible y carrusel usable con teclado/táctil; `prefers-reduced-motion` respetado.
- Sin desbordamiento a los seis viewports; sin textos cortados, superposición, fallas de foco o fondos pesados.
- `npm run build` en verde; correr lint y tests disponibles; crear o ejecutar pruebas relevantes y explicar lo que no se pudo ejecutar.
- Si tienes un navegador/Playwright, captura escritorio y móvil, compara visualmente contra el mockup aprobado y corrige divergencias. Si no tienes navegador, **NO afirmes** que hiciste QA visual.
- Al terminar entregar: resumen de cambios, estructura, rutas de assets/configuración, cómo ejecutar, pruebas con resultados exactos, lista honesta de pendientes de recursos (logo original, clientes, campañas, capturas reales y canales de contacto), y mejoras sugeridas sin ejecutarlas fuera de alcance.

## 8. Restricciones finales

Nunca inventes información para que la interfaz parezca terminada. No uses imágenes generadas de clientes/marcas como si fueran casos reales. No sustituyas el logo oficial por el del mockup. No cambies la identidad visual por una tendencia genérica. Y **no sacrifiques accesibilidad ni rendimiento a cambio de un screenshot bonito**.

**Empieza ahora por inspeccionar la carpeta y las referencias, escribe el plan breve y procede con la implementación por fases.**
