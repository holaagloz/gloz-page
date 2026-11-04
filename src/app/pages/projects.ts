import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Portfolio } from '../portfolio/portfolio';
@Component({ selector: 'gloz-projects-page', imports: [Portfolio], changeDetection: ChangeDetectionStrategy.OnPush, template: '<gloz-portfolio [mainHeading]="true" />' })
export class ProjectsPage {}
