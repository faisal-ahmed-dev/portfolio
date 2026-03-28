import type { Service } from "@/types/portfolio.types";

export const SERVICES: Service[] = [
  {
    id: "frontend",
    icon: "Monitor",
    title: "Frontend Engineering",
    description:
      "Production-grade React and Next.js applications with a focus on performance, accessibility, and clean architecture.",
    capabilities: [
      "React / Next.js App Router",
      "TypeScript design systems",
      "Animation with Framer Motion",
      "Offline-first PWAs",
    ],
  },
  {
    id: "backend",
    icon: "Server",
    title: "Backend & API",
    description:
      "Scalable Node.js services with NestJS, clean domain modeling, and battle-tested data access patterns.",
    capabilities: [
      "NestJS + Domain-Driven Design",
      "REST & WebSocket APIs",
      "PostgreSQL + Redis",
      "Docker & CI/CD pipelines",
    ],
  },
  {
    id: "mobile",
    icon: "Smartphone",
    title: "Mobile Development",
    description:
      "React Native Android applications including hardware integrations, BLE device communication, and native rendering.",
    capabilities: [
      "React Native + Expo",
      "ESC/POS thermal printing",
      "BLE & USB device discovery",
      "Skia RTL text rendering",
    ],
  },
  {
    id: "architecture",
    icon: "Layers",
    title: "System Architecture",
    description:
      "Clean Architecture, DDD, and SOLID applied to real production codebases — not just whiteboard diagrams.",
    capabilities: [
      "Clean Architecture setup",
      "Multi-tenant SaaS design",
      "RBAC & auth patterns",
      "Code review & mentorship",
    ],
  },
];
