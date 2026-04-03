import { z } from "zod";

// ─── Project ──────────────────────────────────────────────────────────────────
export const createProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string()),
  type: z.enum(["POS", "SaaS", "Platform", "Tool", "E-Commerce", "Analytics", "Dashboard", "Mobile", "Desktop"]),
  highlight: z.string().min(1),
  hasSimulator: z.boolean(),
  simulatorKey: z.enum(["pos", "form-builder"]).optional(),
  featured: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
});
export const updateProjectSchema = createProjectSchema.partial().omit({ id: true });

// ─── Experience ───────────────────────────────────────────────────────────────
export const createExperienceSchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  duration: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(["full-time", "contract", "freelance"]),
  description: z.string().min(1),
  highlights: z.array(z.string()),
  tech: z.array(z.string()),
  current: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
});
export const updateExperienceSchema = createExperienceSchema.partial().omit({ id: true });

// ─── Service ──────────────────────────────────────────────────────────────────
export const createServiceSchema = z.object({
  id: z.string().min(1),
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  capabilities: z.array(z.string()),
  order: z.number().int().optional().default(0),
});
export const updateServiceSchema = createServiceSchema.partial().omit({ id: true });

// ─── Testimonial ──────────────────────────────────────────────────────────────
export const createTestimonialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  avatar: z.string().optional(),
  quote: z.string().min(1),
  relationship: z.string().optional(),
  order: z.number().int().optional().default(0),
});
export const updateTestimonialSchema = createTestimonialSchema.partial().omit({ id: true });

// ─── Certification ────────────────────────────────────────────────────────────
export const createCertificationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().min(1),
  credentialId: z.string().optional(),
  skills: z.array(z.string()),
  order: z.number().int().optional().default(0),
});
export const updateCertificationSchema = createCertificationSchema.partial().omit({ id: true });

// ─── Writing ──────────────────────────────────────────────────────────────────
export const createWritingSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().min(1),
  date: z.string().min(1),
  source: z.enum(["dev.to", "Hashnode", "Medium", "Personal"]),
  summary: z.string().min(1),
  tags: z.array(z.string()),
  order: z.number().int().optional().default(0),
});
export const updateWritingSchema = createWritingSchema.partial().omit({ id: true });

// ─── Principle ────────────────────────────────────────────────────────────────
export const createPrincipleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  acronym: z.string().min(1),
  description: z.string().min(1),
  codeSnippet: z.string().min(1),
  language: z.string().min(1),
  color: z.enum(["cyan", "indigo", "mixed"]),
  order: z.number().int().optional().default(0),
});
export const updatePrincipleSchema = createPrincipleSchema.partial().omit({ id: true });

// ─── Metric ───────────────────────────────────────────────────────────────────
export const createMetricSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  value: z.number().int(),
  suffix: z.string(),
  prefix: z.string().optional(),
  description: z.string().min(1),
  order: z.number().int().optional().default(0),
});
export const updateMetricSchema = createMetricSchema.partial().omit({ id: true });

// ─── OpenSourceStat ───────────────────────────────────────────────────────────
export const createOpenSourceStatSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  value: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().optional().default(0),
});
export const updateOpenSourceStatSchema = createOpenSourceStatSchema.partial().omit({ id: true });

// ─── PinnedRepo ───────────────────────────────────────────────────────────────
export const createPinnedRepoSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  stars: z.number().int().min(0),
  forks: z.number().int().min(0),
  language: z.string().min(1),
  languageColor: z.string().min(1),
  url: z.string().url(),
  topics: z.array(z.string()),
  order: z.number().int().optional().default(0),
});
export const updatePinnedRepoSchema = createPinnedRepoSchema.partial().omit({ id: true });

// ─── PortfolioInfo ────────────────────────────────────────────────────────────
export const upsertPortfolioInfoSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  company: z.string().min(1),
  tagline: z.string().min(1),
  availability: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  github: z.string().url(),
  linkedin: z.string().url(),
  location: z.string().min(1),
  yearsExp: z.number().int().min(0),
  cvPath: z.string().min(1),
});

// ─── JobVariant ───────────────────────────────────────────────────────────────
const coverLetterSchema = z.object({
  greeting: z.string().min(1),
  paragraphs: z.array(z.string()),
  closingCta: z.string().optional(),
});

export const createJobVariantSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  company: z.string().min(1),
  role: z.string().min(1),
  coverLetter: coverLetterSchema,
  hero: z.record(z.string(), z.unknown()).optional(),
  portfolio: z.record(z.string(), z.unknown()).optional(),
  highlightTech: z.array(z.string()).optional().default([]),
  featuredProjectIds: z.array(z.string()).optional().default([]),
  hideProjectIds: z.array(z.string()).optional().default([]),
  hideSections: z.array(z.string()).optional().default([]),
  sectionOrder: z.array(z.string()).optional().default([]),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
});
export const updateJobVariantSchema = createJobVariantSchema.partial().omit({ slug: true });

// ─── Visit ────────────────────────────────────────────────────────────────────
export const createVisitSchema = z.object({
  fingerprint: z.string().min(1),
  timestamp: z.string().datetime(),
  pathname: z.string().min(1),
  referrer: z.string(),
  userAgent: z.string(),
  country: z.string(),
});
