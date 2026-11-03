// Isolated test application. This entry and fixtures are NEVER included in the
// public build. It exercises the actual production components.
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ClientLogoCarousel } from '../../src/app/client-logo-carousel/client-logo-carousel';
import { WorkGallery } from '../../src/app/work-gallery/work-gallery';
import { Client, Project } from '../../src/app/data/models';
@Component({
  selector: 'gloz-qa', imports: [ClientLogoCarousel, WorkGallery],
  template: `<main class="container"><h1>Isolated QA fixtures</h1><p>Test data, not Gloz clients or projects.</p><gloz-client-logo-carousel [clients]="clients" /><gloz-work-gallery [projects]="projects" /><a href="#end">After carousel</a><p id="end">End of test fixture</p></main>`
})
class Harness {
  readonly clients: readonly Client[] = Array.from({ length: 6 }, (_, index) => ({ id: `qa-${index}`, name: `QA fixture ${index}`, alt: `QA logo ${index}`, logo: '/__qa/fixture.svg', authorized: true }));
  readonly projects: readonly Project[] = [
    { id: 'qa-a', title: 'QA software fixture', summary: 'Test-only data', categories: ['Software'], coverImage: '/__qa/fixture.svg', coverAlt: 'Test image A', verifiedRole: 'Software', featured: false, approvedForPublication: true },
    { id: 'qa-b', title: 'QA branding fixture', summary: 'Test-only data', categories: ['Branding'], coverImage: '/__qa/fixture.svg', coverAlt: 'Test image B', verifiedRole: 'Branding', featured: false, approvedForPublication: true }
  ];
}
bootstrapApplication(Harness).catch(console.error);
