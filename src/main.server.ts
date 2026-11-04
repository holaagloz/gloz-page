import { BootstrapContext, bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServerRendering, withRoutes, RenderMode } from '@angular/ssr';
import { App } from './app/app';
import { appRouter } from './app/app.routes';
export default (context: BootstrapContext) => bootstrapApplication(App, {
  providers: [provideClientHydration(withEventReplay()), appRouter(), provideServerRendering(withRoutes([{ path: '**', renderMode: RenderMode.Prerender }]))]
}, context);
