import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { Client } from '../data/models';
import { publishableClients, safeWebsite } from '../data/content-policy';

@Component({
  selector: 'gloz-client-logo-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visibleClients().length) {
      <div class="client-section" role="region" aria-label="Marcas con las que hemos trabajado">
        <div class="client-heading"><h3>Marcas con las que hemos trabajado.</h3>
          @if (overflow()) {
            <div class="controls" aria-label="Controles de marcas">
              <button type="button" aria-label="Marcas anteriores" [disabled]="atStart()" (click)="move(-1)">←</button>
              <button type="button" aria-label="Marcas siguientes" [disabled]="atEnd()" (click)="move(1)">→</button>
            </div>
          }
        </div>
        <ul #track class="logo-track" [attr.tabindex]="overflow() ? 0 : null" aria-label="Logotipos de clientes; usa las flechas para recorrerlos" (scroll)="measure()" (keydown)="onKeydown($event)">
          @for (client of visibleClients(); track client.id) {
            <li>
              @if (website(client.url); as href) {
                <a [href]="href" [attr.aria-label]="'Visitar ' + client.name"><img [src]="client.logo" [alt]="client.alt" width="180" height="80" loading="lazy" (load)="measure()" (error)="discard(client.id)"></a>
              } @else {
                <img [src]="client.logo" [alt]="client.alt" width="180" height="80" loading="lazy" (load)="measure()" (error)="discard(client.id)">
              }
            </li>
          }
        </ul>
      </div>
    }
  `,
  styles: `
    :host { display: block; min-width: 0; }
    .client-section { margin-top: 64px; padding-top: 30px; border-top: 1px solid var(--line); }
    .client-heading { display: flex; justify-content: space-between; gap: 24px; align-items: center; }
    h3 { font-size: clamp(20px, 2.4vw, 28px); line-height: 1.3; letter-spacing: -.035em; max-width: 650px; }
    .controls { display: flex; flex-shrink: 0; gap: 8px; }
    button { width: 44px; height: 44px; border: 1px solid var(--line); background: transparent; color: var(--navy); font-size: 20px; cursor: pointer; }
    button:disabled { opacity: .35; cursor: default; }
    .logo-track { display: flex; list-style: none; gap: 24px; margin: 24px 0 0; padding: 12px 6px 20px; overflow-x: auto; overscroll-behavior-inline: contain; scroll-snap-type: x mandatory; scroll-padding-inline: 6px; scrollbar-width: thin; }
    li { flex: 0 0 180px; scroll-snap-align: start; display: grid; place-items: center; }
    img { width: 180px; height: 80px; object-fit: contain; display: block; filter: grayscale(1); opacity: .75; transition: filter .2s, opacity .2s; }
    li:hover img, li:focus-within img { filter: none; opacity: 1; }
    a { display: block; }
  `
})
export class ClientLogoCarousel {
  readonly clients = input<readonly Client[]>([]);
  readonly failed = signal<readonly string[]>([]);
  readonly visibleClients = computed(() => publishableClients(this.clients()).filter(client => !this.failed().includes(client.id)));
  readonly overflow = signal(false);
  readonly atStart = signal(true);
  readonly atEnd = signal(true);
  readonly website = safeWebsite;
  private readonly track = viewChild<ElementRef<HTMLUListElement>>('track');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const element = this.track()?.nativeElement;
      if (!element) return;
      const observer = new ResizeObserver(() => this.measure());
      observer.observe(element);
      this.measure();
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  discard(id: string): void { this.failed.update(ids => [...ids, id]); }
  measure(): void {
    const element = this.track()?.nativeElement;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    this.overflow.set(max > 2);
    this.atStart.set(element.scrollLeft <= 2);
    this.atEnd.set(element.scrollLeft >= max - 2);
  }
  move(direction: number): void {
    const element = this.track()?.nativeElement;
    if (!element) return;
    element.scrollBy({ left: direction * Math.max(204, element.clientWidth * .8), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  onKeydown(event: KeyboardEvent): void {
    const element = this.track()?.nativeElement;
    // Preserve normal navigation and do not capture keys on child links.
    if (event.target !== element || !element) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); this.move(event.key === 'ArrowRight' ? 1 : -1); }
    if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); element.scrollTo({ left: event.key === 'Home' ? 0 : element.scrollWidth, behavior: 'instant' }); }
  }
}
