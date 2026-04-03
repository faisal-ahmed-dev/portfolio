import { z } from "zod";

export const blogPostCreateSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  content: z.string().min(1),
  excerpt: z.string().min(1).max(500),
  tags: z.array(z.string()).default([]),
  publishedAt: z.string().datetime(),
  published: z.boolean().default(false),
  coverImage: z.string().url().optional().nullable(),
});

export const blogPostUpdateSchema = blogPostCreateSchema
  .partial()
  .omit({ slug: true });

export const linkedInPostCreateSchema = z.object({
  content: z.string().min(1),
  date: z.string().datetime(),
  url: z.string().url().optional().nullable(),
  likes: z.number().int().nonnegative().optional().nullable(),
  featured: z.boolean().default(false),
});

export const linkedInPostUpdateSchema = linkedInPostCreateSchema.partial();

export type BlogPostCreateInput = z.infer<typeof blogPostCreateSchema>;
export type BlogPostUpdateInput = z.infer<typeof blogPostUpdateSchema>;
export type LinkedInPostCreateInput = z.infer<typeof linkedInPostCreateSchema>;
export type LinkedInPostUpdateInput = z.infer<typeof linkedInPostUpdateSchema>;
