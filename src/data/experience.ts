import type { Experience } from "@/types/portfolio.types";

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
  {
    id: "dhealth",
    company: "dHealth International",
    role: "Software Engineer",
    period: "Feb 2024 — Dec 2024",
    duration: "11 months",
    location: "Dhaka, Bangladesh",
    type: "full-time",
    current: false,
    description:
      "Designed and built a complete e-commerce pharmacy platform with customer profiles, prescription uploads, multi-variant products, and admin tools for SEO, campaigns, and POS integration.",
    highlights: [
      "Architected full-stack application with REST APIs serving multiple frontend clients",
      "Built customer-facing storefront with cart, checkout, order tracking, and prescription upload",
      "Created POS system for in-store sales with real-time inventory updates",
      "Integrated multi-vendor functionality with seller dashboards and commission tracking",
      "Implemented comprehensive security: JWT authentication, RBAC, XSS protection, rate-limiting",
      "Optimized performance with Redis caching, image compression (Sharp), and lazy loading",
    ],
    tech: ["Next.js", "Node.js", "Express.js", "PostgreSQL", "Redis", "Socket.IO", "Docker"],
  },
];
