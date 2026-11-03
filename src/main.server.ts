import { BootstrapContext, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideServerRendering, withRoutes, RenderMode } from '@angular/ssr';
import { App } from './app/app';

export default (context: BootstrapContext) => bootstrapApplication(App, {
  providers: [provideClientHydration(), provideServerRendering(withRoutes([{ path: '**', renderMode: RenderMode.Prerender }]))]
}, context);
