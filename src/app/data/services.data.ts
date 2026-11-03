import { Service } from './models';
export const SERVICES: readonly Service[] = [
  { id: 'branding', number: '01', title: 'Branding y diseño',
    description: 'Construimos identidades visuales sólidas, coherentes y memorables para marcas que buscan comunicar su esencia con claridad y profesionalismo.',
    capabilities: ['Logotipos', 'Identidad visual', 'Manuales de marca', 'Diseño gráfico y piezas digitales'] },
  { id: 'marketing', number: '02', title: 'Marketing digital',
    description: 'Desarrollamos estrategias, campañas y contenido para fortalecer la presencia digital de los negocios y conectar con sus audiencias.',
    capabilities: ['Estrategia digital', 'Campañas publicitarias', 'Creación de contenido', 'Gestión de redes sociales'] },
  { id: 'software', number: '03', title: 'Desarrollo de software',
    description: 'Diseñamos y construimos sitios web, aplicaciones y sistemas personalizados que resuelven necesidades reales y mejoran la experiencia de cada negocio.',
    capabilities: ['Sitios web', 'Aplicaciones web', 'Sistemas a medida', 'Automatizaciones e integraciones'] }
];
