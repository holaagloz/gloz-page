import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_CONFIG } from '../data/site.config';
@Component({ selector: 'gloz-site-footer', templateUrl: './site-footer.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class SiteFooter {
  readonly emailHref = `mailto:${SITE_CONFIG.email}`;
  readonly whatsappHref = `https://wa.me/${SITE_CONFIG.whatsapp?.replace(/\D/g, '')}`;
  readonly instagramHref = SITE_CONFIG.instagram;
}
