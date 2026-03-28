import { z } from "zod";

export const jobVariantSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens only"),
  company: z.string(),
  role: z.string(),

  coverLetter: z.object({
    greeting: z.string(),
    paragraphs: z.array(z.string()),
    closingCta: z.string().optional(),
  }),

  hero: z.object({
    tagline: z.string().optional(),
    subTagline: z.string().optional(),
    eyebrow: z.string().optional(),
  }).optional(),

  portfolio: z.object({
    title: z.string().optional(),
    tagline: z.string().optional(),
    availability: z.string().optional(),
  }).optional(),

  highlightTech: z.array(z.string()).optional(),
  featuredProjectIds: z.array(z.string()).optional(),
  hideProjectIds: z.array(z.string()).optional(),
  hideSections: z.array(z.string()).optional(),
  sectionOrder: z.array(z.string()).optional(),

  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
});

export type ParseResult =
  | { success: true; data: z.infer<typeof jobVariantSchema> }
  | { success: false; errors: string[] };

export function parseVariant(raw: unknown): ParseResult {
  const result = jobVariantSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.issues.map(
    (issue) => `${issue.path.join(".")}: ${issue.message}`
  );
  return { success: false, errors };
}
