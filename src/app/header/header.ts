import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { BrandPlaceholder } from '../shared/brand-placeholder';
import { NAVIGATION } from '../data/site.config';

@Component({
  selector: 'gloz-header',
  imports: [BrandPlaceholder],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  readonly navigation = NAVIGATION;
  readonly open = signal(false);
  readonly scrolled = signal(false);
  private readonly document = inject(DOCUMENT);
  private readonly toggle = viewChild<ElementRef<HTMLButtonElement>>('toggle');

  constructor() {
    inject(DestroyRef).onDestroy(() => this.document.body.classList.remove('menu-open'));
  }

  toggleMenu(): void {
    this.open.set(!this.open());
    this.document.body.classList.toggle('menu-open', this.open());
  }

  closeMenu(restoreFocus = false): void {
    this.open.set(false);
    this.document.body.classList.remove('menu-open');
    if (restoreFocus) this.toggle()?.nativeElement.focus();
  }

  goToSection(id: string): void {
    this.closeMenu();
    this.document.getElementById(id)?.focus({ preventScroll: true });
  }

  @HostListener('window:scroll') onScroll(): void {
    this.scrolled.set((this.document.defaultView?.scrollY ?? 0) > 12);
  }

  @HostListener('window:resize') onResize(): void {
    if ((this.document.defaultView?.innerWidth ?? 0) >= 900) this.closeMenu();
  }

  @HostListener('document:keydown', ['$event']) onKeydown(event: KeyboardEvent): void {
    if (!this.open()) return;
    if (event.key === 'Escape') { event.preventDefault(); this.closeMenu(true); }
    if (event.key === 'Tab') {
      const first = this.toggle()?.nativeElement;
      const links = this.document.querySelectorAll<HTMLAnchorElement>('#navigation a');
      const last = links.item(links.length - 1);
      if (event.shiftKey && this.document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && this.document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }
}
