import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SERVICES } from '../data/services.data';

@Component({
  selector: 'gloz-services',
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Services { readonly services = SERVICES; }
