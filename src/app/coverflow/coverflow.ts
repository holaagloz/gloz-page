import { DOCUMENT } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, effect, ElementRef, inject, input, model, signal, untracked } from '@angular/core';
import { CoverflowPiece, physicalCount, relativeSlot, wrapIndex } from './coverflow.model';

@Component({
  selector: 'gloz-cinematic-coverflow',
  templateUrl: './coverflow.html',
  styleUrl: './coverflow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CinematicCoverflow {
  readonly pieces = input.required<readonly CoverflowPiece[]>();
  readonly selectedIndex = model(0);
  readonly label = input('Trabajos de Gloz');
  readonly activeIndex = computed(() => wrapIndex(this.selectedIndex(), this.pieces().length));
  readonly active = computed(() => this.pieces()[this.activeIndex()]);
  readonly ready = signal(false);
  private readonly cursor = signal(0);
  readonly copies = computed(() => Array.from({length: physicalCount(this.pieces().length)}, (_, copyIndex) => ({
    copyIndex, pieceIndex: copyIndex % this.pieces().length,
    piece: this.pieces()[copyIndex % this.pieces().length]
  })));
  private pointer: {id: number; x: number; y: number} | null = null;
  private suppressClickUntil = 0;

  constructor() {
    const document = inject(DOCUMENT);
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    const destroyRef = inject(DestroyRef);
    let destroyed = false;
    destroyRef.onDestroy(() => { destroyed = true; });
    // External selection (e.g. the original portfolio) follows the nearest route.
    effect(() => {
      const desired = this.activeIndex();
      const count = this.pieces().length;
      const current = untracked(this.cursor);
      if (wrapIndex(current, count) !== desired) {
        this.cursor.set(current + relativeSlot(desired, wrapIndex(current, count), count));
      }
    });
    afterNextRender(() => {
      const images = [...host.nativeElement.querySelectorAll<HTMLImageElement>('img')];
      const unique = [...new Map(images.map(image => [image.src, image])).values()];
      // Geometry already exists in the pre-rendered HTML. Only opacity is revealed
      // after fonts and the four source images decode; no fan-out from the centre.
      Promise.allSettled([document.fonts.ready, ...unique.map(image => image.decode())])
        .then(() => { if (!destroyed) this.ready.set(true); });
    });
  }

  slot(copyIndex: number): number {
    return relativeSlot(copyIndex, wrapIndex(this.cursor(), this.copies().length), this.copies().length);
  }

  select(index: number): void {
    const count = this.pieces().length;
    if (count) this.moveBy(relativeSlot(wrapIndex(index, count), this.activeIndex(), count));
  }

  private moveBy(distance: number): void {
    if (!this.pieces().length) return;
    this.cursor.update(cursor => cursor + distance);
    this.selectedIndex.set(wrapIndex(this.cursor(), this.pieces().length));
  }

  step(direction: number): void { this.moveBy(direction); }

  keydown(event: KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.key === 'Home') this.select(0);
    else if (event.key === 'End') this.select(this.pieces().length - 1);
    else this.step(event.key === 'ArrowLeft' ? -1 : 1);
  }

  pointerDown(event: PointerEvent): void {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    if ((event.target as HTMLElement).closest('.cf-arrow')) return;
    this.pointer = {id: event.pointerId, x: event.clientX, y: event.clientY};
  }

  pointerUp(event: PointerEvent): void {
    const start = this.pointer;
    this.pointer = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= 42 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      this.suppressClickUntil = performance.now() + 400;
      this.step(dx < 0 ? 1 : -1);
    }
  }

  pointerCancel(): void { this.pointer = null; }

  cardClick(copyIndex: number): void {
    if (performance.now() >= this.suppressClickUntil) this.moveBy(this.slot(copyIndex));
  }
}
