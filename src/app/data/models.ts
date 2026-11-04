export interface SiteConfig {
  readonly email?: string;
  /** International number with + and country code, no spaces. */
  readonly whatsapp?: string;
  readonly instagram?: string;
  readonly linkedin?: string;
  readonly logo?: { readonly dark: string; readonly light: string };
}
