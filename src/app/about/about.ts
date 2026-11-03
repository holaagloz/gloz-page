import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gloz-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="nosotros" class="section-space" tabindex="-1" aria-labelledby="about-title">
      <div class="container about-grid">
        <div class="about-copy">
          <p class="eyebrow">05 / Nosotros</p>
          <h2 id="about-title">El equipo<br>detrás de Gloz.</h2>
          <p class="lead">Somos un estudio que une creatividad, estrategia y tecnología para construir marcas, experiencias y soluciones digitales con propósito.</p>
          <p class="body-copy">Nuestra fortaleza está en integrar diseño, marketing digital y desarrollo de software dentro de una misma visión de trabajo, cuidando tanto la estética como la funcionalidad de cada proyecto.</p>
          <ul>@for (principle of principles; track principle; let index = $index) { <li><span aria-hidden="true">0{{ index + 1 }}</span>{{ principle }}</li> }</ul>
        </div>
        <div class="about-art" role="img" aria-label="Composición tipográfica del estudio: creatividad, estrategia y tecnología, una misma visión.">
          <span class="art-label">Estudio creativo y tecnológico</span>
          <div class="art-lines"><span>Creatividad.</span><span>Estrategia.</span><span>Tecnología.</span></div>
          <div class="vision"><span class="vision-line"></span><em>Una misma<br>visión.</em></div>
          <span class="art-end">GLOZ / CREATIVE &amp; DIGITAL STUDIO</span>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    section { background: white; }
    .about-grid { display: grid; gap: 38px; }
    h2 { margin-top: 18px; }
    .lead { font-size: 16px; line-height: 1.75; margin-top: 28px; max-width: 530px; }
    .body-copy { font-size: 12px; line-height: 1.85; margin-top: 20px; max-width: 530px; }
    ul { list-style: none; padding: 0; margin: 28px 0 0; }
    li { font-size: 12px; font-weight: 600; padding: 15px 0; border-top: 1px solid #17254720; display: flex; gap: 20px; }
    li span { color: var(--blue); font-size: 10px; font-weight: 500; }
    .about-art { position: relative; padding: 28px; min-height: 380px; background: var(--gray); display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
    .about-art::after { content: ''; position: absolute; height: 100%; width: 1px; background: #024aa914; top: 0; right: 20%; transform: skew(-15deg); }
    .art-label, .art-end { font-size: 7px; text-transform: uppercase; letter-spacing: .13em; z-index: 1; }
    .art-lines { display: flex; flex-direction: column; font-size: clamp(27px, 3.4vw, 48px); font-weight: 650; line-height: 1.15; letter-spacing: -.055em; margin-top: 32px; z-index: 1; }
    .art-lines span:nth-child(2) { color: var(--blue); }
    .vision { display: flex; align-items: start; gap: 18px; margin: 30px 0; z-index: 1; }
    .vision-line { height: 2px; width: 36px; background: var(--blue); margin-top: 15px; }
    .vision em { font-family: var(--accent); font-size: 29px; line-height: 1.15; font-weight: 400; font-style: normal; color: var(--blue); }
    @media(min-width: 768px) { .about-grid { grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; } .about-art { min-height: 520px; padding: 36px; } }
    @media(min-width: 1100px) { .about-grid { gap: 90px; } .about-art { min-height: 570px; padding: 44px; } .art-lines { font-size: 48px; } }
  `
})
export class About {
  readonly principles = ['Visión integral', 'Enfoque en el negocio', 'Acompañamiento real'];
}
