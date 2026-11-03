import type { Client, Project, SiteConfig } from './models';
export function safeAsset(value: string | null | undefined): value is string {
  return !!value && (/^\/(?!\/)[^\s\\]+$/.test(value) || /^https:\/\/[^\s]+$/.test(value));
}
export function safeWebsite(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}
export function publishableClients(clients: readonly Client[]): readonly Client[] {
  const seen = new Set<string>();
  return clients.filter(client => {
    if (!client.authorized || !client.name.trim() || !client.alt.trim() || !safeAsset(client.logo) || seen.has(client.id)) return false;
    seen.add(client.id); return true;
  });
}
export function galleryProjects(projects: readonly Project[]): readonly Project[] {
  return projects.filter(project => project.approvedForPublication && !!project.verifiedRole.trim() && safeAsset(project.coverImage) && !!project.coverAlt?.trim());
}
export function contactChannels(config: SiteConfig): readonly { label: string; href: string }[] {
  const channels: { label: string; href: string }[] = [];
  if (config.email && /^[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]*[a-z\d])?)+$/i.test(config.email)) {
    channels.push({ label: 'Escríbenos por correo', href: `mailto:${config.email}?subject=${encodeURIComponent('Hablemos de mi proyecto — Gloz')}` });
  }
  if (config.whatsapp && /^\+[1-9]\d{7,14}$/.test(config.whatsapp)) channels.push({ label: 'Hablemos por WhatsApp', href: `https://wa.me/${config.whatsapp.slice(1)}` });
  for (const [key, label, host] of [['instagram', 'Instagram', 'instagram.com'], ['linkedin', 'LinkedIn', 'linkedin.com']] as const) {
    const href = safeWebsite(config[key]);
    if (href) {
      const url = new URL(href);
      if ((url.hostname === host || url.hostname === `www.${host}`) && url.pathname !== '/') channels.push({ label, href });
    }
  }
  return channels;
}
