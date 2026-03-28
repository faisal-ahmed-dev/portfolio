"use client";
import { useMemo } from "react";
import { useVariant } from "@/components/providers/VariantProvider";
import { PORTFOLIO } from "@/data/portfolio";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import { SERVICES } from "@/data/services";
import { METRICS } from "@/data/metrics";
import { TESTIMONIALS } from "@/data/testimonials";
import { TECH_CATEGORIES, HERO_TECH_BADGES } from "@/data/techStack";
import type { Project } from "@/types/portfolio.types";

export function usePortfolioData() {
  const variant = useVariant();
  return useMemo(() => {
    if (!variant?.portfolio) return PORTFOLIO;
    return { ...PORTFOLIO, ...variant.portfolio };
  }, [variant]);
}

export function useProjects(): Project[] {
  const variant = useVariant();
  return useMemo(() => {
    const hidden = new Set(variant?.hideProjectIds ?? []);
    const filtered = PROJECTS.filter((p) => !hidden.has(p.id));

    if (!variant?.featuredProjectIds) return filtered;

    const featured = variant.featuredProjectIds
      .map((id) => filtered.find((p) => p.id === id))
      .filter(Boolean) as Project[];
    const rest = filtered.filter(
      (p) => !variant.featuredProjectIds!.includes(p.id)
    );
    return [...featured, ...rest];
  }, [variant]);
}

export function useExperience() {
  const variant = useVariant();
  return variant?.hideSections?.includes("experience") ? [] : EXPERIENCE;
}

export function useServices() {
  const variant = useVariant();
  return variant?.hideSections?.includes("services") ? [] : SERVICES;
}

export function useMetrics() {
  return METRICS;
}

export function useTestimonials() {
  return TESTIMONIALS;
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
