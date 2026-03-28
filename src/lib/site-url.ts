/**
 * Single source of truth for the site's public URL.
 * Set NEXT_PUBLIC_SITE_URL in .env (e.g. https://faisalahmed.me).
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
