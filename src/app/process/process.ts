import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROCESS_STEPS } from '../data/process.data';

@Component({
  selector: 'gloz-process',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="proceso" class="section-space" tabindex="-1" aria-labelledby="process-title">
      <div class="container">
        <div class="editorial-heading">
          <div><p class="eyebrow">04 / Nuestro proceso</p><h2 id="process-title">De la idea<br>a la realidad.</h2></div>
          <p class="section-intro">Cada proyecto sigue un proceso claro que nos permite entender el negocio, diseñar con intención y construir soluciones sólidas.</p>
        </div>
        <ol class="timeline">
          @for (step of steps; track step.number) {
            <li><span class="step-number" aria-hidden="true">{{ step.number }}</span><div><h3>{{ step.title }}</h3><p>{{ step.description }}</p></div></li>
          }
        </ol>
        <p class="process-note">Una guía de trabajo que adaptamos al alcance y las necesidades de cada proyecto.</p>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    section { background: var(--gray); }
    .timeline { list-style: none; margin: 0; padding: 0; }
    li { display: grid; grid-template-columns: 50px 1fr; position: relative; gap: 18px; padding-bottom: 32px; }
    li:last-child { padding-bottom: 0; }
    li:not(:last-child)::after { content: ''; position: absolute; left: 21px; top: 48px; bottom: 6px; width: 1px; background: var(--line); }
    .step-number { color: var(--blue); font-size: 32px; font-weight: 350; line-height: 1; letter-spacing: -.055em; padding-top: 5px; }
    h3 { font-size: 19px; font-weight: 650; letter-spacing: -.04em; margin-bottom: 10px; }
    li p { font-size: 12px; line-height: 1.8; max-width: 340px; }
    .process-note { font-size: 10px; line-height: 1.7; margin-top: 32px; color: #4d5b70; }
    @media(min-width: 1000px) {
      .timeline { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 26px; }
      li { display: block; padding: 0; }
      .step-number { display: block; margin-bottom: 34px; font-size: 42px; }
      li:not(:last-child)::after { left: 60px; right: -8px; width: auto; height: 1px; top: 26px; bottom: auto; }
      h3 { font-size: 18px; }
      li p { font-size: 11px; }
      .process-note { margin-top: 42px; }
    }
  `
})
export class Process { readonly steps = PROCESS_STEPS; }
