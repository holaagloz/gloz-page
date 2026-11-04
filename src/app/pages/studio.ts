import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Disciplines } from '../disciplines/disciplines';
import { Editorial } from '../editorial/editorial';
@Component({ selector: 'gloz-studio-page', imports: [Disciplines, Editorial], changeDetection: ChangeDetectionStrategy.OnPush, template: '<h1 class="route-title section">Tres disciplinas. Una mirada.</h1><gloz-disciplines /><gloz-editorial />' })
export class StudioPage {}
