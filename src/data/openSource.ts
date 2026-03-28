import type { GitHubStat, PinnedRepo } from "@/types/portfolio.types";

export const GITHUB_STATS: GitHubStat[] = [
  { label: "Public Repos", value: "20+", description: "Open source projects" },
  { label: "Contributions", value: "500+", description: "Commits in 2024–2025" },
  { label: "Languages", value: "8+", description: "TypeScript, Go, Python & more" },
];

export const PINNED_REPOS: PinnedRepo[] = [
  {
    id: "orderly-pos",
    name: "orderly-pos",
    description: "Enterprise POS system built with Next.js 14, offline-first with IndexedDB.",
    stars: 12,
    forks: 3,
    language: "TypeScript",
    languageColor: "#3178c6",
    url: "https://github.com/faisal-ahmed-dev",
    topics: ["nextjs", "typescript", "pos", "offline-first"],
  },
  {
    id: "feedback-solution",
    name: "feedback-solution",
    description: "Multi-tenant SaaS feedback platform with drag-and-drop form builder and analytics.",
    stars: 8,
    forks: 2,
    language: "TypeScript",
    languageColor: "#3178c6",
    url: "https://github.com/faisal-ahmed-dev",
    topics: ["nestjs", "ddd", "saas", "multi-tenant"],
  },
];
