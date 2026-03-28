import type { JobVariant } from "@/types/portfolio.types";

export const exampleCorp: JobVariant = {
  slug: "example-corp",
  company: "Example Corp",
  role: "Senior React Engineer",

  coverLetter: {
    greeting: "Dear Example Corp Engineering Team,",
    paragraphs: [
      "With 2+ years building production React and Next.js applications at scale — from offline-first POS systems serving 1400+ restaurant clients to real-time multi-tenant SaaS platforms — I'm excited about the opportunity to bring this depth to your team.",
      "At 3S Softech, I architected the frontend for an entire product suite: enterprise POS, QR E-Menu, kitchen display, analytics dashboards, and a hardware printer SDK. Each system demanded different trade-offs around performance, offline resilience, and real-time data — the kind of challenges I thrive on.",
      "I'd love to discuss how my experience with large-scale React applications, clean architecture patterns, and cross-functional delivery can contribute to Example Corp's engineering goals.",
    ],
    closingCta: "Let's Connect →",
  },

  hero: {
    tagline: "builds React apps that scale.",
    subTagline:
      "2 years shipping production POS, SaaS, and real-time systems at 3S. Ready to bring that intensity to Example Corp.",
  },

  highlightTech: ["React", "Next.js", "TypeScript", "TanStack Query", "Jotai"],

  featuredProjectIds: ["orderly-pos", "qr-ordering", "reporting-tool"],

  hideProjectIds: ["home-rental-system", "tourify"],
};
