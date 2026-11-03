import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gloz-capabilities-strip',
  template: `<div class="strip"><ul class="container" aria-label="Disciplinas del estudio">
    <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h9l9 9-9 9-9-9Z"/><circle cx="7.5" cy="7.5" r="1"/></svg>Branding</li>
    <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 9 16-5v16L4 15Z M4 9v6 M8 16l1 5h4l-2-4 M23 9v6"/></svg>Marketing digital</li>
    <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 5-6 7 6 7 M17 5l6 7-6 7 M14 2l-4 20"/></svg>Desarrollo de software</li>
  </ul></div>`,
  styles: `
    :host { display: block; }
    .strip { background: #fff; border-bottom: 1px solid #1725470b; }
    ul { list-style: none; margin-block: 0; padding: 18px 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px 24px; }
    li { display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 11px; font-weight: 650; }
    svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.5; }
    @media(min-width: 700px) {
      ul { flex-wrap: nowrap; min-height: 86px; align-items: center; gap: 0; }
      ul::before, ul::after { content: ''; flex: 1; height: 1px; background: var(--line); }
      li { flex-shrink: 0; padding-inline: clamp(20px, 3vw, 48px); font-size: 12px; }
      li + li { border-left: 1px solid var(--line); }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapabilitiesStrip {}
