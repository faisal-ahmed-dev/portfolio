import type { Project } from "@/types/portfolio.types";

export const PROJECTS: Project[] = [
  {
    id: "orderly-pos",
    title: "Orderly POS",
    description:
      "Enterprise point-of-sale system deployed to 300+ restaurants. Real-time KOT management, multi-terminal sync, offline-first with background sync, role-based staff management.",
    tech: ["React 19", "TypeScript", "dnd-kit", "Jotai", "TanStack Query", "PWA"],
    type: "POS",
    highlight: "300+ restaurants",
    hasSimulator: true,
    simulatorKey: "pos",
  },
  {
    id: "feedback-saas",
    title: "Feedback SaaS Platform",
    description:
      "Multi-tenant feedback collection platform. Drag-and-drop form builder, conditional logic, analytics dashboard, embeddable widget with <2KB footprint.",
    tech: ["Next.js", "TypeScript", "dnd-kit", "Prisma", "PostgreSQL", "Radix UI"],
    type: "SaaS",
    highlight: "Multi-tenant",
    hasSimulator: true,
    simulatorKey: "form-builder",
  },
  {
    id: "3s-platform",
    title: "3S Internal Platform",
    description:
      "Unified operations dashboard for 3S. Module federation, micro-frontend architecture, shared design system, CI/CD automation.",
    tech: ["Next.js", "Module Federation", "TypeScript", "Turborepo", "Storybook"],
    type: "Platform",
    highlight: "Micro-frontends",
    hasSimulator: false,
  },
  {
    id: "component-toolkit",
    title: "Component Toolkit",
    description:
      "Internal design system & component library. 40+ accessible components, automated visual regression testing, comprehensive Storybook documentation.",
    tech: ["React", "TypeScript", "Tailwind", "Radix UI", "Storybook", "Playwright"],
    type: "Tool",
    highlight: "40+ components",
    hasSimulator: false,
  },
];
