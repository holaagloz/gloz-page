import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PROJECTS } from '../data/projects.data';
import { CLIENTS } from '../data/clients.data';
import { safeAsset } from '../data/content-policy';
import { ClientLogoCarousel } from '../client-logo-carousel/client-logo-carousel';
import { WorkGallery } from '../work-gallery/work-gallery';

@Component({
  selector: 'gloz-portfolio',
  imports: [ClientLogoCarousel, WorkGallery],
  templateUrl: './portfolio.html', styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Portfolio {
  readonly projects = PROJECTS;
  readonly clients = CLIENTS;
  readonly featured = PROJECTS.find(project => project.featured && project.approvedForPublication);
  readonly asset = safeAsset;
  readonly imageFailed = signal(false);
}
