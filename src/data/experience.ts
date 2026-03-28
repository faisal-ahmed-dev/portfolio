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

export const EXPERIENCE: Experience[] = [
  {
    id: "3s",
    company: "3S — Software Solution Service",
    role: "Software Engineer",
    period: "Feb 2024 — Present",
    duration: "2+ yrs",
    location: "Remote · Dhaka, Bangladesh",
    type: "full-time",
    current: true,
    description:
      "Building a multi-product SaaS suite for the hospitality industry — POS, QR ordering, feedback management, and printer middleware.",
    highlights: [
      "Architected Orderly POS with 112+ components, offline-first with IndexedDB + background sync",
      "Built 3S QR Ordering System: 60k+ lines of TypeScript, QR encryption with key rotation",
      "Delivered multi-tenant 3S Feedback Solution using Domain-Driven Design and NestJS backend",
      "Shipped React Native Android printer middleware with ESC/POS, BLE, and Arabic RTL via Skia",
      "Led frontend architecture decisions across the product suite using Clean Architecture principles",
    ],
    tech: ["Next.js", "NestJS", "TypeScript", "React Native", "PostgreSQL", "Redis", "Docker"],
  },
];
