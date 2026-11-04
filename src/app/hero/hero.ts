import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CinematicCoverflow } from '../coverflow/coverflow';
import { WorkSelection } from '../data/work-selection';
@Component({ selector: 'gloz-hero', imports: [CinematicCoverflow], templateUrl: './hero.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class Hero { readonly selection = inject(WorkSelection); }
