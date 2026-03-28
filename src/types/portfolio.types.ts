export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  type: "POS" | "SaaS" | "Platform" | "Tool" | "E-Commerce" | "Analytics" | "Dashboard" | "Mobile" | "Desktop";
  highlight: string;
  hasSimulator: boolean;
  simulatorKey?: "pos" | "form-builder";
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
