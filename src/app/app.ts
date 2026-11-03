import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './header/header';
import { Hero } from './hero/hero';
import { CapabilitiesStrip } from './capabilities-strip/capabilities-strip';
import { Services } from './services/services';
import { Portfolio } from './portfolio/portfolio';
import { Process } from './process/process';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { SiteFooter } from './site-footer/site-footer';

@Component({
  selector: 'gloz-root',
  imports: [Header, Hero, CapabilitiesStrip, Services, Portfolio, Process, About, Contact, SiteFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <gloz-header />
    <main id="contenido" tabindex="-1">
      <gloz-hero />
      <gloz-capabilities-strip />
      <gloz-services />
      <gloz-portfolio />
      <gloz-process />
      <gloz-about />
      <gloz-contact />
    </main>
    <gloz-site-footer />
  `
})
export class App {}
