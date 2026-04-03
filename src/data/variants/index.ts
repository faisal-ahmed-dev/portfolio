import { jobVariantService } from "@/services/JobVariantService";
import type { JobVariant } from "@/types/portfolio.types";

export async function getAllVariantSlugs(): Promise<string[]> {
  const variants = await jobVariantService.findAll();
  return variants.map((v) => v.slug);
}

export async function getVariant(slug: string): Promise<JobVariant | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const v = await jobVariantService.findBySlug(slug);
    // Map DB entity to JobVariant type
    return {
      slug: v.slug,
      company: v.company,
      role: v.role,
      coverLetter: v.coverLetter as JobVariant["coverLetter"],
      hero: (v.hero as JobVariant["hero"]) ?? undefined,
      portfolio: (v.portfolio as JobVariant["portfolio"]) ?? undefined,
      highlightTech: v.highlightTech,
      featuredProjectIds: v.featuredProjectIds,
      hideProjectIds: v.hideProjectIds,
      hideSections: v.hideSections,
      sectionOrder: v.sectionOrder,
      ogTitle: v.ogTitle ?? undefined,
      ogDescription: v.ogDescription ?? undefined,
    };
  } catch {
    return null;
  }
}
