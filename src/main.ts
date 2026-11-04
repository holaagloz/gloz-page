import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { App } from './app/app';
import { appRouter } from './app/app.routes';
bootstrapApplication(App, { providers: [provideClientHydration(withEventReplay()), appRouter()] }).catch(console.error);
