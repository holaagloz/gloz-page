import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { WorkSelection } from '../data/work-selection';
@Component({ selector: 'gloz-portfolio', templateUrl: './portfolio.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class Portfolio { readonly selection = inject(WorkSelection); readonly mainHeading = input(false); }
