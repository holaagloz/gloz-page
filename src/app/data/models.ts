export interface Service {
  readonly id: 'branding' | 'marketing' | 'software';
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly string[];
}
export type WorkCategory = 'Branding' | 'Marketing digital' | 'Diseño' | 'Contenido' | 'Software';
export interface Project {
  readonly id: string;
  readonly clientId?: string;
  readonly title: string;
  readonly categories: readonly WorkCategory[];
  readonly summary: string;
  readonly coverImage: string | null;
  readonly coverAlt?: string;
  readonly gallery?: readonly { src: string; alt: string }[];
  readonly url?: string;
  readonly verifiedRole: string;
  readonly featured: boolean;
  readonly approvedForPublication: boolean;
}
export interface Client {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  readonly alt: string;
  readonly url?: string;
  readonly services?: readonly string[];
  readonly authorized: boolean;
}
export interface SiteConfig {
  readonly email?: string;
  /** International number with + and country code, no spaces. */
  readonly whatsapp?: string;
  readonly instagram?: string;
  readonly linkedin?: string;
  readonly logo?: { readonly dark: string; readonly light: string };
}
