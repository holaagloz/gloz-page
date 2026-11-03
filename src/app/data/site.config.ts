import { SiteConfig } from './models';
// TODO(contact): Verified business channels. TODO(brand): Original dark/light
// SVG or transparent PNG. Do not ship invented example contact values.
export const SITE_CONFIG: SiteConfig = {};
export const NAVIGATION = [
  { id: 'servicios', label: 'Servicios' }, { id: 'proyectos', label: 'Proyectos' },
  { id: 'proceso', label: 'Proceso' }, { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' }
] as const;
