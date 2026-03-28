export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  type: "POS" | "SaaS" | "Platform" | "Tool" | "E-Commerce" | "Analytics" | "Dashboard" | "Mobile" | "Desktop";
  highlight: string;
  hasSimulator: boolean;
  simulatorKey?: "pos" | "form-builder";
  featured?: boolean;
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export interface Principle {
  id: string;
  title: string;
  acronym: string;
  description: string;
  codeSnippet: string;
  language: string;
  color: "cyan" | "indigo" | "mixed";
}

export interface Portfolio {
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
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  type: "full-time" | "contract" | "freelance";
  description: string;
  highlights: string[];
  tech: string[];
  current: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  capabilities: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  relationship?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
}

export interface GitHubStat {
  label: string;
  value: string;
  description: string;
}

export interface PinnedRepo {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  url: string;
  topics: string[];
}

export interface DataOverrides {
  portfolio?: Portfolio;
  experience?: Experience[];
  projects?: Project[];
  metrics?: Metric[];
  services?: Service[];
  testimonials?: Testimonial[];
  writings?: WritingArticle[];
  certifications?: Certification[];
  openSource?: {
    githubStats?: GitHubStat[];
    pinnedRepos?: PinnedRepo[];
  };
}

export interface WritingArticle {
  id: string;
  title: string;
  url: string;
  date: string;
  source: "dev.to" | "Hashnode" | "Medium" | "Personal";
  summary: string;
  tags: string[];
}

export interface JobVariant {
  slug: string;
  company: string;
  role: string;

  coverLetter: {
    greeting: string;
    paragraphs: string[];
    closingCta?: string;
  };

  hero?: {
    tagline?: string;
    subTagline?: string;
    eyebrow?: string;
  };

  portfolio?: Partial<{
    title: string;
    tagline: string;
    availability: string;
  }>;

  highlightTech?: string[];
  featuredProjectIds?: string[];
  hideProjectIds?: string[];
  hideSections?: string[];
  sectionOrder?: string[];

  ogTitle?: string;
  ogDescription?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ArchLayer {
  id: string;
  label: string;
  description: string;
  color: string;
  items: string[];
  depth: number;
}
