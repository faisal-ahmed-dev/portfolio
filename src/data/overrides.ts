import type { DataOverrides } from "@/types/portfolio.types";
import { portfolioInfoService } from "@/services/PortfolioInfoService";
import { experienceService } from "@/services/ExperienceService";
import { projectService } from "@/services/ProjectService";
import { metricService } from "@/services/MetricService";
import { serviceService } from "@/services/ServiceService";
import { testimonialService } from "@/services/TestimonialService";
import { writingService } from "@/services/WritingService";
import { certificationService } from "@/services/CertificationService";
import { openSourceService } from "@/services/OpenSourceService";

export async function loadDataOverrides(): Promise<DataOverrides> {
  const [portfolio, experience, projects, metrics, services, testimonials, writings, certifications, githubStats, pinnedRepos] =
    await Promise.all([
      portfolioInfoService.get(),
      experienceService.findAll(),
      projectService.findAll(),
      metricService.findAll(),
      serviceService.findAll(),
      testimonialService.findAll(),
      writingService.findAll(),
      certificationService.findAll(),
      openSourceService.getStats(),
      openSourceService.getRepos(),
    ]);

  return {
    portfolio: {
      name: portfolio.name,
      title: portfolio.title,
      company: portfolio.company,
      tagline: portfolio.tagline,
      availability: portfolio.availability,
      email: portfolio.email,
      phone: portfolio.phone,
      github: portfolio.github,
      linkedin: portfolio.linkedin,
      location: portfolio.location,
      yearsExp: portfolio.yearsExp,
      cvPath: portfolio.cvPath,
    },
    experience: experience.map((e) => ({
      id: e.id,
      company: e.company,
      role: e.role,
      period: e.period,
      duration: e.duration,
      location: e.location,
      type: e.type as "full-time" | "contract" | "freelance",
      description: e.description,
      highlights: e.highlights,
      tech: e.tech,
      current: e.current,
    })),
    projects: projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      tech: p.tech,
      type: p.type as import("@/types/portfolio.types").Project["type"],
      highlight: p.highlight,
      hasSimulator: p.hasSimulator,
      simulatorKey: p.simulatorKey as "pos" | "form-builder" | undefined,
      featured: p.featured,
    })),
    metrics: metrics.map((m) => ({
      id: m.id,
      label: m.label,
      value: m.value,
      suffix: m.suffix,
      prefix: m.prefix ?? undefined,
      description: m.description,
    })),
    services: services.map((s) => ({
      id: s.id,
      icon: s.icon,
      title: s.title,
      description: s.description,
      capabilities: s.capabilities,
    })),
    testimonials: testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company,
      avatar: t.avatar ?? undefined,
      quote: t.quote,
      relationship: t.relationship ?? undefined,
    })),
    writings: writings.map((w) => ({
      id: w.id,
      title: w.title,
      url: w.url,
      date: w.date,
      source: w.source as import("@/types/portfolio.types").WritingArticle["source"],
      summary: w.summary,
      tags: w.tags,
    })),
    certifications: certifications.map((c) => ({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      credentialId: c.credentialId ?? undefined,
      skills: c.skills,
    })),
    openSource: {
      githubStats: githubStats.map((s) => ({
        label: s.label,
        value: s.value,
        description: s.description,
      })),
      pinnedRepos: pinnedRepos.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        stars: r.stars,
        forks: r.forks,
        language: r.language,
        languageColor: r.languageColor,
        url: r.url,
        topics: r.topics,
      })),
    },
  };
}
