import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './header/header';
import { SiteFooter } from './site-footer/site-footer';

@Component({
  selector: 'gloz-root', imports: [Header, RouterOutlet, SiteFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<a class="skip" href="#contenido">Saltar al contenido</a><div class="world v4a cinematic-validation" id="inicio"><gloz-header /><main id="contenido" tabindex="-1"><router-outlet /></main><gloz-site-footer /></div>`
})
export class App {
  constructor() {
    const router = inject(Router);
    const meta = inject(Meta);
    const document = inject(DOCUMENT);
    let initial = true;
    router.events.pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed()).subscribe(() => {
      let route = router.routerState.snapshot.root;
      while (route.firstChild) route = route.firstChild;
      const description = route.data['description'] as string;
      meta.updateTag({ name: 'description', content: description });
      meta.updateTag({ property: 'og:description', content: description });
      meta.updateTag({ property: 'og:title', content: route.title ?? 'Gloz' });
      if (!initial) document.getElementById('contenido')?.focus({ preventScroll: true });
      initial = false;
    });
  }
}
