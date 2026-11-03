import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { SITE_CONFIG } from '../data/site.config';
import { safeAsset } from '../data/content-policy';

// TODO(brand): Replace this explicitly temporary typeset label with the supplied
// original SVG/transparent PNG. Never trace the conceptual mockup's wordmark.
@Component({
  selector: 'gloz-brand-placeholder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@if (source() && !failed()) {
    <img [src]="source()" alt="Gloz" width="240" height="100" (error)="failed.set(true)">
  } @else { <span class="name">Gloz</span><span class="status">LOGO TEMPORAL</span> }`,
  styles: `
    :host { display: inline-flex; flex-direction: column; align-items: center; color: inherit; }
    img { display: block; width: 2.4em; height: 1em; object-fit: contain; }
    .name { font-family: var(--font); font-size: inherit; font-weight: 650; line-height: 1; letter-spacing: -.06em; }
    .status { font: 500 7px/1.4 var(--font); letter-spacing: .16em; margin-top: 6px; white-space: nowrap; }
  `
})
export class BrandPlaceholder {
  readonly tone = input<'dark' | 'light'>('dark');
  readonly failed = signal(false);
  readonly source = computed(() => {
    const path = SITE_CONFIG.logo?.[this.tone()];
    return safeAsset(path) ? path : undefined;
  });
}
