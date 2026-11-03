import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrandPlaceholder } from '../shared/brand-placeholder';
import { NAVIGATION, SITE_CONFIG } from '../data/site.config';
import { contactChannels } from '../data/content-policy';

@Component({
  selector: 'gloz-site-footer', imports: [BrandPlaceholder],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand"><gloz-brand-placeholder tone="light" /><p>Creative &amp; Digital Studio</p></div>
          <nav aria-label="Navegación de pie de página">
            @for (item of navigation; track item.id) { <a [href]="'#' + item.id">{{ item.label }}</a> }
          </nav>
          @if (channels.length) { <div class="footer-channels">@for (channel of channels; track channel.href) { <a [href]="channel.href">{{ channel.label }} <span aria-hidden="true">↗</span></a> }</div> }
        </div>
        <div class="footer-bottom"><span>© {{ year }} Gloz</span><span>Creatividad / Estrategia / Tecnología</span></div>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }
    footer { background: var(--navy); color: white; padding: 48px 0 22px; }
    .footer-top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 32px 60px; }
    gloz-brand-placeholder { font-size: 40px; }
    .footer-brand p { margin-top: 18px; font-size: 10px; letter-spacing: .05em; color: #d1dcec; }
    nav { display: flex; flex-wrap: wrap; gap: 2px 24px; max-width: 400px; }
    a { min-height: 44px; display: inline-flex; align-items: center; font-size: 11px; text-decoration: none; }
    a:hover { text-decoration: underline; text-underline-offset: 5px; }
    a:focus-visible { outline-color: white; }
    .footer-channels { display: flex; flex-direction: column; }
    .footer-bottom { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid #ffffff30; margin-top: 38px; padding-top: 22px; color: #c4d1e4; font-size: 8px; }
    @media(min-width: 900px) { footer { padding-top: 60px; } nav { gap: 24px; max-width: none; } .footer-bottom { margin-top: 50px; } }
  `
})
export class SiteFooter {
  readonly navigation = NAVIGATION;
  readonly channels = contactChannels(SITE_CONFIG);
  readonly year = new Intl.DateTimeFormat('es-CR', { year: 'numeric', timeZone: 'America/Costa_Rica' }).format(new Date());
}
