import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_CONFIG } from '../data/site.config';
import { contactChannels } from '../data/content-policy';

@Component({
  selector: 'gloz-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contacto" class="section-space" tabindex="-1" aria-labelledby="contact-title">
      <div class="container contact-layout">
        <div><p class="eyebrow">06 / Contacto</p><h2 id="contact-title">Hagamos algo<br>bueno juntos.</h2></div>
        <div class="contact-copy"><p>Cuéntanos tu idea, necesidad o proyecto. Estamos listos para ayudarte a convertirlo en algo real.</p>
          @if (channels.length) {
            <div class="contact-channels">
              @for (channel of channels; track channel.href) {
                <a [href]="channel.href">{{ channel.label }} <span aria-hidden="true">↗</span></a>
              }
            </div>
          } @else {
            <p class="channel-pending">Canal de contacto pendiente de publicación.</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    section { background: var(--blue); color: white; }
    .eyebrow::before { background: white; }
    h2 { margin-top: 20px; font-size: clamp(38px, 5.3vw, 72px); letter-spacing: -.055em; line-height: 1.04; }
    .contact-layout { display: grid; gap: 30px; }
    .contact-copy > p:first-child { font-size: 14px; line-height: 1.8; max-width: 450px; }
    .channel-pending { font-size: 10px; margin-top: 28px; padding-top: 20px; border-top: 1px solid #ffffff60; max-width: 450px; }
    .contact-channels { display: flex; flex-direction: column; align-items: start; gap: 4px; margin-top: 24px; }
    a { min-height: 44px; display: inline-flex; align-items: center; gap: 24px; text-underline-offset: 6px; font-size: 13px; }
    a:focus-visible { outline-color: white; }
    @media(min-width: 768px) { .contact-layout { grid-template-columns: 7fr 5fr; align-items: center; gap: 50px; } }
  `
})
export class Contact { readonly channels = contactChannels(SITE_CONFIG); }
