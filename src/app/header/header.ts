import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({ selector: 'gloz-header', imports: [RouterLink, RouterLinkActive], templateUrl: './header.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class Header {
  readonly open = signal(false);
  private readonly document = inject(DOCUMENT);
  private readonly toggle = viewChild<ElementRef<HTMLButtonElement>>('toggle');
  constructor() {
    inject(Router).events.pipe(takeUntilDestroyed()).subscribe(event => { if (event instanceof NavigationStart) this.closeMenu(); });
    inject(DestroyRef).onDestroy(() => this.closeMenu());
  }
  toggleMenu(): void { this.setMenu(!this.open()); }
  private setMenu(open: boolean): void {
    this.open.set(open);
    this.document.body.classList.toggle('menu-open', open);
    this.document.querySelectorAll<HTMLElement>('main, footer').forEach(element => element.inert = open);
  }
  closeMenu(restoreFocus = false): void { this.setMenu(false); if (restoreFocus) this.toggle()?.nativeElement.focus(); }
  @HostListener('window:resize') onResize(): void { if ((this.document.defaultView?.innerWidth ?? 0) > 800) this.closeMenu(); }
  @HostListener('document:keydown', ['$event']) onKeydown(event: KeyboardEvent): void {
    if (!this.open()) return;
    if (event.key === 'Escape') { event.preventDefault(); this.closeMenu(true); }
    if (event.key === 'Tab') {
      const first = this.toggle()?.nativeElement;
      const links = this.document.querySelectorAll<HTMLAnchorElement>('#primary-nav a');
      const last = links.item(links.length - 1);
      if (event.shiftKey && this.document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && this.document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }
}
