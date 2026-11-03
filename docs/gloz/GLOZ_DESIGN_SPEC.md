# GLOZ — UI/UX Design Specification v2

Status: Approved visual direction for **Header + Hero + Services** only.

## Source files (priority)
1. `reference/brand-manual.pdf`: Gloz official identity (authoritative for logo, fonts and colors).
2. `reference/approved-hero-services.png`: approved visual composition, spacing, hierarchy and art direction. It is a **conceptual image**, not HTML and not a source of authentic client work or the official logo.
3. This specification: defines behaviors, copy, constraints, and the limited phase scope.

If the mockup has a wordmark that differs from the official brand book, use the **official** wordmark instead. Do not trace a newly invented Gloz logo from the mockup.

## Brand
- Main blue: `#024AA9`
- Dark blue: `#172547`
- Light gray: `#EDF2F1`
- White: `#FFFFFF` (neutral supporting color)
- Primary typography: **Montserrat** for headings and body.
- Accent typography: **Yeseva One**, sparingly; not for entire headings or the UI.
- The brand manual showcases low-opacity textures over the branded backgrounds; use subtly, not as busy noise.
- Official logo asset (SVG preferred; transparent PNG acceptable) should be sourced from user-provided original artwork. The PDF may be used for reference. Do not fake an official logo.

## Art direction
Editorial premium, intentional, clean, creative, technological; spacious compositions, careful type hierarchy, asymmetric layout, subtle textures and precise blue accents. Avoid generic agency UI: repetitive cards with shadows, glassmorphism, neon gradients, random icons, rotating banners, fake dashboards/metrics, AI stock portraits, excessive motion.

## Header
- Desktop: 76–80px approximate height, light background, official Gloz logo left, `Servicios`, `Proyectos`, `Nosotros`, `Contacto` right plus discrete `Hablemos` CTA where feasible.
- Sticky header, subtle separator/scrolled treatment.
- Mobile: approx. 64px, keyboard-accessible hamburger menu; proper open/close, Escape handling, focus state and no uncontrolled page scroll when open.
- During this phase, only `Servicios` will have a built destination. Links to future sections **must not be made to look functional by using fake anchors**; flag them as pending until those sections are designed.

## Hero v2
### Copy
Eyebrow: `ESTUDIO CREATIVO Y TECNOLÓGICO`
H1: `Diseñamos marcas, experiencias y soluciones digitales con intención.`
Paragraph: `Combinamos branding, marketing digital y desarrollo de software para crear proyectos que comunican mejor, se ven profesionales y están construidos para crecer.`
Primary CTA: `Hablemos de tu proyecto`
Secondary CTA: `Ver proyectos`
Capability band: `Branding` / `Marketing digital` / `Desarrollo de software`

### Composition
- Reference the image's premium editorial composition, not merely a conventional two-column card.
- Full-width hero background, off-white / pale light gray.
- Content bounded at max approx 1240px (allow art panel to extend farther visually); desktop asymmetric left copy (55%) + dark navy right panel (45%) featuring a strong diagonal/trapezoidal boundary and tasteful abstract structural textures.
- Large Montserrat heading (64–72px desktop, ~38–44px phone), with restrained contrast/accent on the closing words if this maintains brand consistency.
- Right panel: official white Gloz logo centered/featured, dark navy, subtle branded surfaces, small editorial metadata such as `CREATIVE & DIGITAL STUDIO`, `IDENTITY / STRATEGY / TECHNOLOGY`, `01`.
- Main buttons are visually clear but not overembellished.
- Capability strip below hero with understated dividers and optional tiny neutral line icons. **No moving marquee.**
- Mobile order: text, CTA group, then condensed visual artwork; capability strip wraps or stacks cleanly.
- Hero approximate desktop height 700–800px including its structure, flexible to viewport to prevent clipping.

## Services v2
### Copy
Eyebrow: `02 / QUÉ HACEMOS`
H2: `Tres disciplinas. Una misma visión.`
Intro: `Unimos creatividad, estrategia y tecnología para desarrollar soluciones que conectan con las personas y responden a las necesidades de cada negocio.`

### Layout
- Section background white/light gray with strong typographic editorial header on the left and concise explanatory copy on the right.
- 12-column asymmetric bento: left 7 columns = large Branding card spanning two rows; right 5 columns = Marketing and Software cards stacked.
- Each card must include its number `01/02/03`, title, text, short capabilities and a coherent graphic. The cards should be polished art-directed compositions, not three equal generic rectangles.
- Branding visual: stationery/brand manual/palette imagery as an illustrative Gloz concept; do NOT claim invented third-party client work.
- Marketing visual: designed digital-content composition; do NOT claim fabricated performance metrics or present conceptual mockups as proven work.
- Software visual: crafted interface/laptop imagery and dark navy background; do NOT pretend fake analytics are production results.
- Desktop layout 7/5 columns, ~20–24px gaps, balanced aspect ratios and typographic density.
- On phone all cards stack in semantic order 01,02,03; images reduce size and content remains legible.

### Service 01 — Branding y diseño
Description: `Construimos identidades visuales sólidas, coherentes y memorables para marcas que buscan comunicar su esencia con claridad y profesionalismo.`
Capabilities: Logotipos; Identidad visual; Manuales de marca; Diseño gráfico y piezas digitales.

### Service 02 — Marketing digital
Description: `Desarrollamos estrategias, campañas y contenido para fortalecer la presencia digital de los negocios y conectar con sus audiencias.`
Capabilities: Estrategia digital; Campañas publicitarias; Creación de contenido; Gestión de redes sociales.

### Service 03 — Desarrollo de software
Description: `Diseñamos y construimos sitios web, aplicaciones y sistemas personalizados que resuelven necesidades reales y mejoran la experiencia de cada negocio.`
Capabilities: Sitios web; Aplicaciones web; Sistemas a medida; Automatizaciones e integraciones.

## Technical scope
- Angular standalone components (prefer Angular stable compatible with environment, target Angular 22 if it is viable), TypeScript strict, SCSS.
- Public single-page home. Prefer prerender/SSG for SEO if supported by chosen setup, without a persistent backend.
- Component boundaries: `Header`, `Hero`, `CapabilitiesStrip`, `Services` and supporting presentation pieces only when warranted.
- CSS variables/tokens for brand colors/spacing/type; semantically structured HTML. Avoid broad UI component libraries unless needed.
- Responsive at 375,390,768,1024,1280,1440 px and respect `prefers-reduced-motion`.
- Optimize assets, preload critical font as appropriate, lazy-load off-screen visuals; prefer stable CLS.
- One H1, H2 services, H3 service headings, meaningful alt texts; keyboard-accessible navigation; visible focus indicators; WCAG AA contrast where possible.
- Do not invent testimonial quotes, clients, pricing, contact details, claims, analytics or unapproved sections.
- Phase 1: Header, Hero, Capability band, Services ONLY. Other sections will be designed and built in later phases. No backend, auth, booking, contact form or deployment.

## QA acceptance
- `npm install`, `npm run build`, lint/test if configured and no errors.
- Viewport testing at 375, 390, 768, 1024, 1280, 1440px; no horizontal overflow, text clipping, image distortion or overlaps.
- Visual review vs approved mockup: hero typography, diagonal Gloz brand panel, capability strip, asymmetric Services visual hierarchy and branded colors.
- Distinguish source artwork from optional designed placeholders; document precisely which assets still need user supply.
- Make no claim that visually aligned code is perfectly pixel-identical to a conceptual image.
- Provide concise implementation summary, commands to run locally, results and remaining TODOs.
