import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Project } from '../data/models';
import { galleryProjects, safeWebsite } from '../data/content-policy';

@Component({
  selector: 'gloz-work-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (available().length) {
      <div class="work-gallery" role="region" aria-label="Trabajos seleccionados">
        <div class="gallery-heading"><h3>Trabajos seleccionados.</h3>
          @if (categories().length > 1) {
            <div class="filters" role="group" aria-label="Filtrar trabajos">
              <button type="button" [attr.aria-pressed]="active() === 'Todos'" (click)="select('Todos')">Todos</button>
              @for (category of categories(); track category) {
                <button type="button" [attr.aria-pressed]="active() === category" (click)="select(category)">{{ category }}</button>
              }
            </div>
          }
        </div>
        <p class="result-count" role="status">{{ filtered().length }} {{ filtered().length === 1 ? 'trabajo' : 'trabajos' }}</p>
        <div class="work-grid">
          @for (project of filtered(); track project.id) {
            <article class="work" [class.wide]="project.featured">
              @if (!failed().includes(project.id)) {
                <img [src]="project.coverImage" [alt]="project.coverAlt || ''" width="1000" height="700" loading="lazy" (error)="discard(project.id)">
              } @else { <div class="image-fallback">Imagen no disponible</div> }
              <p class="role">{{ project.verifiedRole }}</p>
              <h4>{{ project.title }}</h4><p>{{ project.summary }}</p>
              @if (website(project.url); as href) { <a [href]="href">Visitar proyecto <span aria-hidden="true">↗</span></a> }
            </article>
          }
        </div>
      </div>
    }
  `,
  styles: `
    :host { display: block; }
    .work-gallery { margin-top: 64px; border-top: 1px solid var(--line); padding-top: 30px; }
    .gallery-heading { display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 24px; }
    h3 { font-size: clamp(24px, 2.5vw, 32px); letter-spacing: -.04em; line-height: 1.2; }
    .filters { display: flex; flex-wrap: wrap; gap: 8px; }
    button { min-height: 44px; padding: 8px 14px; border: 1px solid var(--line); color: var(--navy); background: transparent; cursor: pointer; font-size: 12px; }
    button[aria-pressed=true] { background: var(--navy); color: white; border-color: var(--navy); }
    .result-count { font-size: 11px; margin: 16px 0 24px; }
    .work-grid { display: grid; grid-template-columns: 1fr; gap: 40px 24px; }
    .work { min-width: 0; }
    img, .image-fallback { display: block; width: 100%; aspect-ratio: 10/7; height: auto; object-fit: cover; background: var(--gray); }
    .image-fallback { display: grid; place-items: center; font-size: 12px; }
    .role { margin: 18px 0 8px; color: var(--blue); font-size: 10px; text-transform: uppercase; letter-spacing: .12em; }
    h4 { font-size: 23px; letter-spacing: -.03em; margin: 0 0 12px; }
    p:not(.role):not(.result-count) { max-width: 620px; font-size: 13px; }
    a { display: inline-block; padding-block: 12px; font-size: 12px; text-underline-offset: 4px; }
    @media(min-width: 768px) { .work-grid { grid-template-columns: 1.15fr 1fr; } .wide { grid-column: 1/-1; } .wide img, .wide .image-fallback { aspect-ratio: 2/1; } }
  `
})
export class WorkGallery {
  readonly projects = input<readonly Project[]>([]);
  readonly available = computed(() => galleryProjects(this.projects()));
  readonly categories = computed(() => [...new Set(this.available().flatMap(project => project.categories))]);
  readonly active = signal('Todos');
  readonly failed = signal<readonly string[]>([]);
  readonly filtered = computed(() => this.available().filter(project => this.active() === 'Todos' || project.categories.some(category => category === this.active())));
  readonly website = safeWebsite;
  select(category: string): void { this.active.set(category); }
  discard(id: string): void { this.failed.update(ids => [...ids, id]); }
}
