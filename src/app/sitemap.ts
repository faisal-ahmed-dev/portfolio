import type { MetadataRoute } from "next";
import { getAllVariantSlugs } from "@/data/variants";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const variantSlugs = await getAllVariantSlugs();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...variantSlugs.map((slug) => ({
      url: `${siteUrl}/for/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
