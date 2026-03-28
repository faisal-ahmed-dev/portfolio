"use client";
import { useMemo } from "react";
import { useVariant } from "@/components/providers/VariantProvider";
import { useDataOverrides } from "@/components/providers/DataOverrideProvider";
import { PORTFOLIO } from "@/data/portfolio";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import { SERVICES } from "@/data/services";
import { METRICS } from "@/data/metrics";
import { TESTIMONIALS } from "@/data/testimonials";
import { WRITINGS } from "@/data/writings";
import { CERTIFICATIONS } from "@/data/certifications";
import { GITHUB_STATS, PINNED_REPOS } from "@/data/openSource";
import { TECH_CATEGORIES, HERO_TECH_BADGES } from "@/data/techStack";
import type { Project } from "@/types/portfolio.types";

export function usePortfolioData() {
  const overrides = useDataOverrides();
  const variant = useVariant();
  return useMemo(() => {
    const base = overrides.portfolio ?? PORTFOLIO;
    if (!variant?.portfolio) return base;
    return { ...base, ...variant.portfolio };
  }, [overrides, variant]);
}

export function useProjects(): Project[] {
  const overrides = useDataOverrides();
  const variant = useVariant();
  return useMemo(() => {
    const base = overrides.projects ?? PROJECTS;
    const hidden = new Set(variant?.hideProjectIds ?? []);
    const filtered = base.filter((p) => !hidden.has(p.id));

    if (!variant?.featuredProjectIds) return filtered;

    const featured = variant.featuredProjectIds
      .map((id) => filtered.find((p) => p.id === id))
      .filter(Boolean) as Project[];
    const rest = filtered.filter(
      (p) => !variant.featuredProjectIds!.includes(p.id)
    );
    return [...featured, ...rest];
  }, [overrides, variant]);
}

export function useExperience() {
  const overrides = useDataOverrides();
  const variant = useVariant();
  if (variant?.hideSections?.includes("experience")) return [];
  return overrides.experience ?? EXPERIENCE;
}

export function useServices() {
  const overrides = useDataOverrides();
  const variant = useVariant();
  if (variant?.hideSections?.includes("services")) return [];
  return overrides.services ?? SERVICES;
}

export function useMetrics() {
  const overrides = useDataOverrides();
  return overrides.metrics ?? METRICS;
}

export function useTestimonials() {
  const overrides = useDataOverrides();
  return overrides.testimonials ?? TESTIMONIALS;
}

export function useWritings() {
  const overrides = useDataOverrides();
  return overrides.writings ?? WRITINGS;
}

export function useCertifications() {
  const overrides = useDataOverrides();
  return overrides.certifications ?? CERTIFICATIONS;
}

export function useOpenSource() {
  const overrides = useDataOverrides();
  return {
    githubStats: overrides.openSource?.githubStats ?? GITHUB_STATS,
    pinnedRepos: overrides.openSource?.pinnedRepos ?? PINNED_REPOS,
  };
}

export function useTechCategories() {
  return TECH_CATEGORIES;
}

export function useHeroBadges() {
  const variant = useVariant();
  return useMemo(() => {
    if (!variant?.highlightTech?.length) return HERO_TECH_BADGES;
    const highlighted = new Set(variant.highlightTech);
    const sorted = [...HERO_TECH_BADGES].sort((a, b) => {
      const aH = highlighted.has(a.name) ? 0 : 1;
      const bH = highlighted.has(b.name) ? 0 : 1;
      return aH - bH;
    });
    return sorted;
  }, [variant]);
}

export function useIsHighlightedTech(techName: string): boolean {
  const variant = useVariant();
  if (!variant?.highlightTech?.length) return false;
  return variant.highlightTech.includes(techName);
}

export function useFeaturedProjectIds(): Set<string> {
  const variant = useVariant();
  return useMemo(
    () => new Set(variant?.featuredProjectIds ?? []),
    [variant]
  );
}
