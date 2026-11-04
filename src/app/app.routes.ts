import { Routes, provideRouter, withInMemoryScrolling } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', title: 'Gloz — Hacemos que pase.', data: { description: 'Estudio creativo y tecnológico. Estrategia, contenido, branding y software para marcas que tienen algo que decir.' }, loadComponent: () => import('./pages/home').then(m => m.HomePage) },
  { path: 'proyectos', title: 'Proyectos — Gloz', data: { description: 'Una selección de contenido audiovisual, campañas y marcas con las que trabajamos en Gloz.' }, loadComponent: () => import('./pages/projects').then(m => m.ProjectsPage) },
  { path: 'estudio', title: 'El estudio — Gloz', data: { description: 'Conoce Gloz: un estudio que conecta estrategia, marketing, contenido, identidad y desarrollo de software.' }, loadComponent: () => import('./pages/studio').then(m => m.StudioPage) },
  { path: 'contacto', title: 'Hablemos de tu proyecto — Gloz', data: { description: 'Cuéntanos qué tienes en mente. Conversemos sobre tu próximo proyecto de marketing, branding o software.' }, loadComponent: () => import('./pages/contact').then(m => m.ContactPage) },
  { path: '**', redirectTo: '' }
];
export const appRouter = () => provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }));
