import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrandPlaceholder } from '../shared/brand-placeholder';

@Component({
  selector: 'gloz-hero',
  imports: [BrandPlaceholder],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Hero {}
