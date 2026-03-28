import { z } from "zod";
import type { ParseResult } from "@/lib/variant-schema";

const portfolioSchema = z.object({
  name: z.string(),
  title: z.string(),
  company: z.string(),
  tagline: z.string(),
  availability: z.string(),
  email: z.string(),
  phone: z.string(),
  github: z.string(),
  linkedin: z.string(),
  location: z.string(),
  yearsExp: z.number(),
  cvPath: z.string(),
});

const experienceSchema = z.array(z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  duration: z.string(),
  location: z.string(),
  type: z.enum(["full-time", "contract", "freelance"]),
  description: z.string(),
  highlights: z.array(z.string()),
  tech: z.array(z.string()),
  current: z.boolean(),
}));

const projectSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  type: z.enum(["POS", "SaaS", "Platform", "Tool", "E-Commerce", "Analytics", "Dashboard", "Mobile", "Desktop"]),
  highlight: z.string(),
  hasSimulator: z.boolean(),
  simulatorKey: z.enum(["pos", "form-builder"]).optional(),
  featured: z.boolean().optional(),
}));

const metricSchema = z.array(z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  suffix: z.string(),
  prefix: z.string().optional(),
  description: z.string(),
}));

const serviceSchema = z.array(z.object({
  id: z.string(),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  capabilities: z.array(z.string()),
}));

const testimonialSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  company: z.string(),
  avatar: z.string().optional(),
  quote: z.string(),
  relationship: z.string().optional(),
}));

const writingSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  date: z.string(),
  source: z.enum(["dev.to", "Hashnode", "Medium", "Personal"]),
  summary: z.string(),
  tags: z.array(z.string()),
}));

const certificationSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  credentialId: z.string().optional(),
  skills: z.array(z.string()),
}));

const openSourceSchema = z.object({
  githubStats: z.array(z.object({
    label: z.string(),
    value: z.string(),
    description: z.string(),
  })).optional(),
  pinnedRepos: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    stars: z.number(),
    forks: z.number(),
    language: z.string(),
    languageColor: z.string(),
    url: z.string(),
    topics: z.array(z.string()),
  })).optional(),
});

export const SECTION_SCHEMAS: Record<string, z.ZodType> = {
  portfolio: portfolioSchema,
  experience: experienceSchema,
  projects: projectSchema,
  metrics: metricSchema,
  services: serviceSchema,
  testimonials: testimonialSchema,
  writings: writingSchema,
  certifications: certificationSchema,
  openSource: openSourceSchema,
};

export const EDITABLE_SECTIONS = Object.keys(SECTION_SCHEMAS);

export function parseSection(key: string, data: unknown): ParseResult {
  const schema = SECTION_SCHEMAS[key];
  if (!schema) return { success: false, errors: [`Unknown section: ${key}`] };
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const errors = result.error.issues.map(
    (issue) => `${issue.path.join(".")}: ${issue.message}`
  );
  return { success: false, errors };
}
