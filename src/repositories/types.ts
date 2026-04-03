export interface BlogPostEntity {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  published: boolean;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostSummary = Omit<BlogPostEntity, "content">;

export interface LinkedInPostEntity {
  id: string;
  content: string;
  date: string;
  url: string | null;
  likes: number | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPostInput {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  published: boolean;
  coverImage?: string | null;
}

export type UpdateBlogPostInput = Partial<Omit<CreateBlogPostInput, "slug">>;

export interface CreateLinkedInPostInput {
  content: string;
  date: string;
  url?: string | null;
  likes?: number | null;
  featured: boolean;
}

export type UpdateLinkedInPostInput = Partial<CreateLinkedInPostInput>;

// ─── New entities ────────────────────────────────────────────────────────────

export interface ProjectEntity {
  id: string;
  title: string;
  description: string;
  tech: string[];
  type: string;
  highlight: string;
  hasSimulator: boolean;
  simulatorKey: string | null;
  featured: boolean;
  order: number;
  updatedAt: string;
}

export interface ExperienceEntity {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  tech: string[];
  current: boolean;
  order: number;
  updatedAt: string;
}

export interface ServiceEntity {
  id: string;
  icon: string;
  title: string;
  description: string;
  capabilities: string[];
  order: number;
  updatedAt: string;
}

export interface TestimonialEntity {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string | null;
  quote: string;
  relationship: string | null;
  order: number;
  updatedAt: string;
}

export interface CertificationEntity {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string | null;
  skills: string[];
  order: number;
  updatedAt: string;
}

export interface WritingEntity {
  id: string;
  title: string;
  url: string;
  date: string;
  source: string;
  summary: string;
  tags: string[];
  order: number;
  updatedAt: string;
}

export interface PrincipleEntity {
  id: string;
  title: string;
  acronym: string;
  description: string;
  codeSnippet: string;
  language: string;
  color: string;
  order: number;
  updatedAt: string;
}

export interface MetricEntity {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix: string | null;
  description: string;
  order: number;
  updatedAt: string;
}

export interface OpenSourceStatEntity {
  id: string;
  label: string;
  value: string;
  description: string;
  order: number;
}

export interface PinnedRepoEntity {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  url: string;
  topics: string[];
  order: number;
}

export interface PortfolioInfoEntity {
  id: string;
  name: string;
  title: string;
  company: string;
  tagline: string;
  availability: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
  yearsExp: number;
  cvPath: string;
  updatedAt: string;
}

export interface JobVariantEntity {
  id: string;
  slug: string;
  company: string;
  role: string;
  coverLetter: unknown;
  hero: unknown | null;
  portfolio: unknown | null;
  highlightTech: string[];
  featuredProjectIds: string[];
  hideProjectIds: string[];
  hideSections: string[];
  sectionOrder: string[];
  ogTitle: string | null;
  ogDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VisitRecordEntity {
  id: string;
  fingerprint: string;
  timestamp: string;
  pathname: string;
  referrer: string;
  userAgent: string;
  country: string;
  createdAt: string;
}

export interface CreateVisitInput {
  fingerprint: string;
  timestamp: string;
  pathname: string;
  referrer: string;
  userAgent: string;
  country: string;
}

export interface AnalyticsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  visitsToday: number;
  visitsByDay: Record<string, number>;
  topPages: { pathname: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  visitsByCountry: Record<string, number>;
}
