import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Portfolio } from '../portfolio/portfolio';
import { Disciplines } from '../disciplines/disciplines';
import { Editorial } from '../editorial/editorial';
@Component({ selector: 'gloz-home-page', imports: [Hero, Portfolio, Disciplines, Editorial], changeDetection: ChangeDetectionStrategy.OnPush, template: '<gloz-hero /><gloz-portfolio /><gloz-disciplines /><gloz-editorial />' })
export class HomePage {}
