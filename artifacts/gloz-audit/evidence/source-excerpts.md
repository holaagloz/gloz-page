# Fragmentos de código inspeccionados (sin cambios)

## src/app/header/header.scss

```text
1: :host { display: block; position: sticky; top: 0; z-index: 20; }
2: header { background: #fff; border-bottom: 1px solid #17254712; }
3: header.scrolled { box-shadow: 0 4px 16px #1725470c; }
4: .header-inner { height: var(--header-height); display: flex; align-items: center; justify-content: space-between; }
5: .brand { font-size: 34px; }
6: .menu-toggle { border: 0; background: none; display: flex; align-items: center; gap: 14px; padding: 12px 0 12px 12px; font-size: 12px; font-weight: 600; color: var(--navy); }
7: .menu-icon { width: 24px; display: grid; gap: 6px; }
8: .menu-icon i { height: 1.5px; background: currentColor; transition: transform .15s; }
9: .menu-icon.is-open i:first-child { transform: translateY(3.75px) rotate(45deg); }
10: .menu-icon.is-open i:last-child { transform: translateY(-3.75px) rotate(-45deg); }
11: nav { display: none; position: absolute; top: var(--header-height); inset-inline: 0; height: calc(100dvh - var(--header-height)); overflow-y: auto; background: var(--gray); padding: 32px var(--gutter); }
12: nav.is-open { display: flex; flex-direction: column; align-items: stretch; gap: 25px; }
13: nav a { text-decoration: none; font-weight: 650; min-height: 44px; display: flex; align-items: center; }
14: nav a:hover { color: var(--blue); }
15: .future { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; font-size: 14px; }
16: .future small { color: #566178; font-size: 9px; font-weight: 450; }
17: @media (min-width: 900px) {
18:   .menu-toggle { display: none; }
19:   nav, nav.is-open { display: flex; position: static; height: auto; overflow: visible; padding: 0; background: none; flex-direction: row; align-items: center; gap: clamp(20px, 2.8vw, 42px); }
20:   nav a, .future { font-size: 12px; }
21:   .future { flex-direction: column; gap: 0; position: relative; }
22:   .future small { position: absolute; top: 100%; font-size: 8px; }
23:   .button { min-height: 44px; }
24:   .pending-note { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
25: }
26: 
```

## src/app/header/header.ts

```text
1: import { DOCUMENT } from '@angular/common';
2: import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
3: import { BrandPlaceholder } from '../shared/brand-placeholder';
4: import { NAVIGATION } from '../data/site.config';
5: 
6: @Component({
7:   selector: 'gloz-header',
8:   imports: [BrandPlaceholder],
9:   templateUrl: './header.html',
10:   styleUrl: './header.scss',
11:   changeDetection: ChangeDetectionStrategy.OnPush
12: })
13: export class Header {
14:   readonly navigation = NAVIGATION;
15:   readonly open = signal(false);
16:   readonly scrolled = signal(false);
17:   private readonly document = inject(DOCUMENT);
18:   private readonly toggle = viewChild<ElementRef<HTMLButtonElement>>('toggle');
19: 
20:   constructor() {
21:     inject(DestroyRef).onDestroy(() => this.document.body.classList.remove('menu-open'));
22:   }
23: 
24:   toggleMenu(): void {
25:     this.open.set(!this.open());
26:     this.document.body.classList.toggle('menu-open', this.open());
27:   }
28: 
29:   closeMenu(restoreFocus = false): void {
30:     this.open.set(false);
31:     this.document.body.classList.remove('menu-open');
32:     if (restoreFocus) this.toggle()?.nativeElement.focus();
33:   }
34: 
35:   goToSection(id: string): void {
36:     this.closeMenu();
37:     this.document.getElementById(id)?.focus({ preventScroll: true });
38:   }
39: 
40:   @HostListener('window:scroll') onScroll(): void {
41:     this.scrolled.set((this.document.defaultView?.scrollY ?? 0) > 12);
42:   }
43: 
44:   @HostListener('window:resize') onResize(): void {
45:     if ((this.document.defaultView?.innerWidth ?? 0) >= 900) this.closeMenu();
46:   }
47: 
48:   @HostListener('document:keydown', ['$event']) onKeydown(event: KeyboardEvent): void {
49:     if (!this.open()) return;
50:     if (event.key === 'Escape') { event.preventDefault(); this.closeMenu(true); }
51:     if (event.key === 'Tab') {
52:       const first = this.toggle()?.nativeElement;
53:       const links = this.document.querySelectorAll<HTMLAnchorElement>('#navigation a');
54:       const last = links.item(links.length - 1);
55:       if (event.shiftKey && this.document.activeElement === first) { event.preventDefault(); last?.focus(); }
56:       else if (!event.shiftKey && this.document.activeElement === last) { event.preventDefault(); first?.focus(); }
57:     }
58:   }
59: }
60: 
```

## src/app/services/services.scss

```text
1: :host { display: block; }
2: section { padding: 42px 0 54px; background: var(--gray); }
3: .section-heading { margin-bottom: 28px; }
4: h2 { margin-top: 14px; font-size: clamp(30px, 3.2vw, 45px); line-height: 1.05; letter-spacing: -.055em; font-weight: 750; }
5: .section-intro { margin-top: 24px; font-size: 13px; line-height: 1.7; max-width: 570px; }
6: .services-grid { display: grid; gap: 20px; }
7: .service { position: relative; overflow: hidden; border-radius: 6px; padding: 28px 24px 34px; background: #fff; isolation: isolate; }
8: .number { color: var(--blue); display: flex; align-items: center; gap: 18px; font-size: 21px; font-weight: 650; line-height: 1; margin-bottom: 12px; }
9: .number span { width: 40px; height: 1px; background: currentColor; }
10: h3 { font-size: 24px; font-weight: 700; line-height: 1.15; letter-spacing: -.045em; margin-bottom: 14px; }
11: .service-copy > p:not(.number) { font-size: 12px; line-height: 1.6; }
12: ul { list-style: none; margin: 20px 0 0; padding: 0; font-size: 11px; line-height: 1.55; display: grid; gap: 9px; }
13: li { position: relative; padding-left: 22px; }
14: li::before { content: '✓'; position: absolute; left: 0; color: var(--blue); font-weight: 750; }
15: .concept-label { position: absolute; bottom: 0; left: 0; width: 100%; padding: 12px 24px; font-size: 7px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #526079; background: #ffffffed; z-index: 3; }
16: .branding { background: linear-gradient(115deg, #fff 25%, #e1e4e2 85%); }
17: .brand-art { position: relative; height: 270px; margin-top: 24px; perspective: 900px; }
18: .book { position: absolute; right: 2%; top: 5%; width: 65%; height: 78%; transform: rotate(-18deg) rotateY(-12deg); background: var(--navy); color: white; border-left: 5px solid #283957; box-shadow: 6px 16px 18px #17254740, 3px 3px #c6c9ca; padding: 24px 18px; overflow: hidden; }
19: .book::before { content: ''; position: absolute; inset: 0; opacity: .12; background: repeating-linear-gradient(0deg, transparent 0 2px, #fff5 3px); }
20: .book-surface { position: absolute; width: 45%; height: 120%; background: var(--blue); transform: skew(-23deg); right: -15%; top: -15%; }
21: .book-name { position: relative; font-family: var(--accent); font-size: 24px; line-height: 1.1; }
22: .book-meta { position: absolute; left: 18px; bottom: 24px; font-size: 7px; letter-spacing: .08em; line-height: 1.7; max-width: 70%; }
23: .book-index { position: absolute; right: 12px; bottom: 60px; font-size: 20px; font-weight: 250; }
24: .paper { width: 65%; height: 80%; background: #fbfbf7; position: absolute; top: 18%; right: -1%; transform: rotate(8deg); box-shadow: 0 5px 12px #17254720; padding: 28px; }
25: .paper span { font-size: 7px; font-weight: 650; }
26: .paper i { display: block; width: 100%; height: 1px; margin-top: 20px; background: #17254720; }
27: .palette { width: 55%; background: #fff; padding: 9px; height: 69px; display: flex; gap: 4px; position: absolute; bottom: 4%; left: 1%; transform: rotate(18deg); box-shadow: 0 3px 10px #17254718; }
28: .palette i { flex: 1; height: 35px; background: var(--blue); }
29: .palette i:nth-child(2) { background: var(--navy); }.palette i:nth-child(3) { background: #a9bdd8; }.palette i:nth-child(4) { background: var(--gray); }
30: .palette span { position: absolute; bottom: 6px; font-size: 5px; letter-spacing: .1em; }
31: .pen { position: absolute; width: 7px; height: 130px; border-radius: 10px; background: linear-gradient(90deg, #172547, #556074, #172547); transform: rotate(-35deg); top: 36%; left: 17%; box-shadow: 4px 6px 6px #17254730; }
32: .marketing-art { position: relative; height: 245px; margin-top: 25px; }
33: .blue-plane { position: absolute; inset: 15px -24px -34px 30%; background: var(--blue); clip-path: polygon(80% 0, 100% 0, 100% 100%, 0 100%); }
34: .phone { position: absolute; width: 165px; height: 268px; top: 0; left: 50%; transform: translateX(-42%) rotate(13deg); border: 6px solid #202736; border-radius: 25px; background: white; box-shadow: 7px 12px 14px #17254730; padding: 14px 8px; }
35: .phone-top { display: flex; justify-content: space-between; font-size: 6px; font-weight: 700; }
36: .phone-top i { height: 5px; width: 26px; background: #202736; border-radius: 8px; }
37: .phone-title { font-size: 22px; font-weight: 650; line-height: 1.1; letter-spacing: -.06em; margin: 18px 0 12px; }
38: .phone-title em { font-family: var(--accent); font-weight: 400; color: var(--blue); }
39: .post-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
40: .post-grid > span { aspect-ratio: 1; display: flex; align-items: center; padding: 7px; font-size: 7px; line-height: 1.4; }
41: .post-blue { background: var(--blue); color: #fff; font-family: var(--accent); }
42: .post-lines { background: repeating-linear-gradient(115deg, #e4e9ec 0 8px, #fff 8px 10px); }
43: .post-light { background: var(--gray); font-weight: 600; }
44: .post-circle { background: radial-gradient(circle at 80% 80%, var(--blue) 0 40%, transparent 41%), var(--navy); }
45: .phone-bottom { display: block; font-size: 5px; margin-top: 9px; letter-spacing: .08em; }
46: .software { background: var(--navy); color: white; }
47: .software .number, .software li::before { color: #fff; }
48: .software .concept-label { color: #d3dce9; background: #172547ed; }
49: .software-art { position: relative; height: 210px; margin-top: 30px; }
50: .laptop { position: absolute; top: 8%; left: 3%; width: 95%; transform: rotate(-7deg); }
51: .screen { border: 7px solid #10182a; border-radius: 9px 9px 2px 2px; aspect-ratio: 1.6; background: #edf2f7; display: flex; box-shadow: 0 14px 28px #0005; overflow: hidden; }
52: .screen-sidebar { width: 25%; background: #233657; color: #fff; padding: 13px 8px; }
53: .screen-sidebar span { display: block; font-size: 5px; margin-bottom: 16px; white-space: nowrap; }
54: .screen-sidebar i { display: block; width: 80%; height: 3px; background: #abb9cf; margin: 10px 0; opacity: .5; }
55: .screen-main { flex: 1; padding: 16px 12px; color: var(--navy); }
56: .screen-main > span { display: block; font-size: 9px; font-weight: 700; }
57: .screen-main > small { display: block; font-size: 4px; margin: 4px 0 12px; letter-spacing: .1em; }
58: .interface-banner { position: relative; padding: 10px; background: #d5e2f3; font-size: 14px; line-height: 1.2; font-weight: 650; letter-spacing: -.03em; }
59: .interface-banner b { position: absolute; right: 10px; top: 12px; color: var(--blue); font-size: 24px; font-weight: 400; }
60: .interface-grid { display: flex; gap: 5px; margin-top: 9px; }
61: .interface-grid i { flex: 1; height: 18px; border-top: 2px solid #024aa977; background: white; }
62: .laptop-base { height: 7px; margin-inline: -15px; background: linear-gradient(#e1e4e7, #64738a); border-radius: 0 0 50% 50%; }
63: @media (min-width: 650px) and (max-width: 1099px) {
64:   .service { padding: 32px 30px 40px; min-height: 360px; }
65:   .service-copy { width: 53%; position: relative; z-index: 2; }
66:   .brand-art, .marketing-art, .software-art { position: absolute; right: 0; top: 30px; width: 45%; height: 300px; margin: 0; }
67:   .brand-art { top: 20px; height: 320px; }
68:   .software-art { top: 80px; }
69:   .concept-label { padding-left: 30px; }
70: }
71: @media (min-width: 900px) {
72:   section { padding-block: 48px 60px; }
73:   .section-heading { display: grid; grid-template-columns: 1fr 1fr; gap: 55px; align-items: center; margin-bottom: 32px; }
74:   .section-intro { border-left: 1px solid var(--line); padding: 6px 0 6px 34px; margin: 0; font-size: 13px; }
75: }
76: @media (min-width: 1100px) {
77:   .services-grid { grid-template-columns: 7fr 5fr; gap: 22px; }
78:   .service { padding: 28px 28px 34px; }
79:   .branding { grid-row: span 2; min-height: 614px; }
80:   .branding .service-copy { width: 58%; position: relative; z-index: 2; }
81:   .branding h3 { font-size: 29px; }
82:   .branding ul { margin-top: 26px; gap: 13px; }
83:   .brand-art { position: absolute; right: -12%; bottom: 20px; width: 80%; height: 320px; margin: 0; }
84:   .book { width: 64%; height: 86%; top: 0; right: 10%; }
85:   .book-name { font-size: 30px; }
86:   .book-meta { font-size: 9px; }
87:   .paper { right: 3%; top: 14%; }
88:   .palette { left: 10%; bottom: 2%; width: 48%; }
89:   .pen { left: 20%; top: 30%; }
90:   .marketing, .software { min-height: 296px; }
91:   .marketing .service-copy, .software .service-copy { width: 68%; position: relative; z-index: 2; }
92:   .marketing h3, .software h3 { font-size: 24px; }
93:   .marketing .service-copy > p:not(.number), .software .service-copy > p:not(.number) { font-size: 11px; }
94:   .marketing ul, .software ul { gap: 5px; font-size: 10px; margin-top: 16px; }
95:   .marketing-art { position: absolute; right: -12px; top: 20px; width: 30%; height: 100%; margin: 0; }
96:   .phone { width: 130px; top: 12px; left: auto; right: -8px; transform: rotate(14deg); }
97:   .blue-plane { inset: 0; clip-path: polygon(80% 0, 100% 0, 100% 100%, 0 100%); }
98:   .software-art { position: absolute; right: -20px; bottom: 28px; width: 30%; height: 160px; margin: 0; }
99:   .laptop { top: 10%; left: 0; width: 100%; }
100:   .screen { aspect-ratio: 1.3; border-width: 5px; }
101:   .screen-sidebar { padding: 13px 4px; }
102:   .screen-main { padding: 13px 8px; }
103:   .screen-main > span { font-size: 7px; }
104:   .interface-banner { font-size: 11px; }
105:   .interface-banner b { font-size: 17px; right: 6px; }
106: }
107: 
```

## src/app/hero/hero.scss

```text
1: :host { display: block; }
2: .hero { position: relative; background: linear-gradient(115deg, #fff 0%, var(--gray) 70%); overflow: hidden; }
3: .hero-copy { padding: 40px 0 30px; }
4: .eyebrow { font-size: 9px; letter-spacing: .16em; }
5: .eyebrow::before { width: 2px; height: 18px; margin-right: 12px; }
6: h1 { margin-top: 22px; font-size: clamp(38px, 6vw, 58px); line-height: 1.08; font-weight: 750; letter-spacing: -.055em; }
7: h1 em { color: var(--blue); font-family: var(--accent); font-weight: 400; letter-spacing: -.045em; font-style: normal; white-space: nowrap; }
8: .intro { max-width: 560px; font-size: 13px; line-height: 1.65; margin-top: 24px; }
9: .actions { display: flex; flex-wrap: wrap; gap: 12px; margin: 26px 0 10px; }
10: .actions .primary { flex-grow: 1; }
11: .hero-art { position: relative; min-height: 280px; overflow: hidden; color: #fff; background: var(--navy); clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%); }
12: .hero-art::after { content: ''; position: absolute; inset: 0; opacity: .15; pointer-events: none; background: repeating-linear-gradient(93deg, transparent 0 2px, #fff2 3px, transparent 4px), repeating-linear-gradient(0deg, transparent 0 3px, #0008 4px); }
13: .surface { position: absolute; border: 1px solid #5584b64d; background: linear-gradient(135deg, #024aa944, #172547 65%); box-shadow: -16px -20px 50px #0a162b66; }
14: .surface-one { width: 80%; aspect-ratio: 1; border-radius: 50%; top: -85%; right: -20%; }
15: .surface-two { width: 110%; height: 130%; border-radius: 50% 50% 0 0; transform: rotate(-38deg); right: -70%; bottom: -70%; background: linear-gradient(130deg, #024aa9a6, var(--navy) 60%); }
16: .surface-three { height: 120%; width: 36%; top: -10%; right: 5%; transform: skew(-37deg); background: linear-gradient(100deg, #0c1830, #17254700); border: 0; }
17: .art-content { position: relative; z-index: 1; padding: 55px 24px 50px 50px; text-align: center; }
18: gloz-brand-placeholder { font-size: 76px; }
19: .studio { font-size: 8px; text-transform: uppercase; letter-spacing: .35em; margin-top: 18px; }
20: .art-rule { display: block; width: 44px; height: 3px; background: #5795ec; margin: 28px 0 16px; }
21: .art-disciplines { text-align: left; font-size: 7px; letter-spacing: .22em; text-transform: uppercase; }
22: .edition { position: absolute; right: 20px; bottom: 15px; font-size: 25px; font-weight: 200; font-style: italic; }
23: @media (min-width: 600px) and (max-width: 1099px) {
24:   .hero-copy { max-width: 730px; padding-block: 50px 40px; }
25:   .actions .primary { flex-grow: 0; }
26:   .hero-art { min-height: 320px; }
27:   .art-content { max-width: 620px; margin: auto; }
28:   gloz-brand-placeholder { font-size: 100px; }
29:   .surface-one { top: -190%; }
30: }
31: @media (min-width: 1100px) {
32:   .hero { min-height: 610px; display: flex; align-items: center; }
33:   .hero-copy { position: relative; z-index: 2; width: 56%; padding-block: 54px; }
34:   .eyebrow { font-size: 10px; }
35:   h1 { font-size: clamp(54px, 4.55vw, 68px); margin-top: 22px; }
36:   .intro { width: 92%; font-size: 14px; line-height: 1.6; }
37:   .actions { gap: 16px; }
38:   .actions .primary { flex-grow: 0; }
39:   .hero-art { position: absolute; inset: 0 0 0 auto; width: 48%; clip-path: polygon(19% 0, 100% 0, 100% 100%, 0 100%); }
40:   .hero-art::before { content: ''; position: absolute; height: 34%; width: 20px; bottom: 0; left: 4%; transform: skew(-12deg); background: var(--blue); z-index: 3; }
41:   .art-content { padding: 0 8% 0 23%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; }
42:   gloz-brand-placeholder { font-size: clamp(90px, 10vw, 148px); }
43:   .studio { font-size: 9px; letter-spacing: .32em; white-space: nowrap; }
44:   .art-rule { align-self: flex-start; margin-top: 50px; margin-bottom: 24px; }
45:   .art-disciplines { align-self: flex-start; font-size: 8px; letter-spacing: .2em; }
46:   .edition { bottom: 34px; right: 9%; font-size: 38px; }
47:   .surface-one { width: 100%; top: -73%; right: -45%; }
48: }
49: 
```

## src/app/data/site.config.ts

```text
1: import { SiteConfig } from './models';
2: // TODO(contact): Verified business channels. TODO(brand): Original dark/light
3: // SVG or transparent PNG. Do not ship invented example contact values.
4: export const SITE_CONFIG: SiteConfig = {};
5: export const NAVIGATION = [
6:   { id: 'servicios', label: 'Servicios' }, { id: 'proyectos', label: 'Proyectos' },
7:   { id: 'proceso', label: 'Proceso' }, { id: 'nosotros', label: 'Nosotros' },
8:   { id: 'contacto', label: 'Contacto' }
9: ] as const;
10: 
```

## src/app/data/clients.data.ts

```text
1: import { Client } from './models';
2: // TODO(clients): Business-confirmed names, original logos, alt texts and
3: // publication permission. An empty array hides the entire public subsection.
4: export const CLIENTS: readonly Client[] = [];
5: 
```

## src/app/data/projects.data.ts

```text
1: import { Project } from './models';
2: // Source: business-confirmed description in GLOZ_PROMPT_MAESTRO_CODEX.md.
3: // TODO(assets): Authentic screenshots, alt text and publication permission.
4: // No product UI, results, branding or marketing role is inferred.
5: export const PROJECTS: readonly Project[] = [{
6:   id: 'viejos-barberia', title: 'Viejos Barbería', categories: ['Software'],
7:   summary: 'Aplicación web para reservar citas y gestionar la agenda, los clientes y las operaciones de la barbería.',
8:   coverImage: null, verifiedRole: 'Desarrollo de software', featured: true, approvedForPublication: true
9: }];
10: 
```

## src/app/shared/brand-placeholder.ts

```text
1: import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
2: import { SITE_CONFIG } from '../data/site.config';
3: import { safeAsset } from '../data/content-policy';
4: 
5: // TODO(brand): Replace this explicitly temporary typeset label with the supplied
6: // original SVG/transparent PNG. Never trace the conceptual mockup's wordmark.
7: @Component({
8:   selector: 'gloz-brand-placeholder',
9:   changeDetection: ChangeDetectionStrategy.OnPush,
10:   template: `@if (source() && !failed()) {
11:     <img [src]="source()" alt="Gloz" width="240" height="100" (error)="failed.set(true)">
12:   } @else { <span class="name">Gloz</span><span class="status">LOGO TEMPORAL</span> }`,
13:   styles: `
14:     :host { display: inline-flex; flex-direction: column; align-items: center; color: inherit; }
15:     img { display: block; width: 2.4em; height: 1em; object-fit: contain; }
16:     .name { font-family: var(--font); font-size: inherit; font-weight: 650; line-height: 1; letter-spacing: -.06em; }
17:     .status { font: 500 7px/1.4 var(--font); letter-spacing: .16em; margin-top: 6px; white-space: nowrap; }
18:   `
19: })
20: export class BrandPlaceholder {
21:   readonly tone = input<'dark' | 'light'>('dark');
22:   readonly failed = signal(false);
23:   readonly source = computed(() => {
24:     const path = SITE_CONFIG.logo?.[this.tone()];
25:     return safeAsset(path) ? path : undefined;
26:   });
27: }
28: 
```

## src/index.html

```text
1: <!doctype html>
2: <html lang="es-CR">
3: <head>
4:   <meta charset="utf-8">
5:   <title>Gloz — Estudio creativo y tecnológico</title>
6:   <base href="/">
7:   <meta name="viewport" content="width=device-width, initial-scale=1">
8:   <meta name="description" content="Branding, marketing digital y desarrollo de software. Unimos creatividad, estrategia y tecnología para construir proyectos con intención.">
9:   <meta name="theme-color" content="#172547">
10:   <meta property="og:type" content="website">
11:   <meta property="og:locale" content="es_CR">
12:   <meta property="og:title" content="Gloz — Estudio creativo y tecnológico">
13:   <meta property="og:description" content="Branding, marketing digital y desarrollo de software. Proyectos construidos con intención.">
14:   <link rel="preload" href="fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
15: </head>
16: <body><gloz-root></gloz-root></body>
17: </html>
18: 
```

