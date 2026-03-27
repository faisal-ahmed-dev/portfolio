import type { Project } from "@/types/portfolio.types";

export const PROJECTS: Project[] = [
  {
    id: "orderly-pos",
    title: "Orderly POS",
    description:
      "Enterprise point-of-sale system built at 3S with 112+ components. Real-time KOT management, offline-first with IndexedDB background sync, dnd-kit drag-and-drop, multi-terminal Jotai state, and role-based staff management.",
    tech: ["Next.js 14", "TypeScript", "Jotai", "IndexedDB", "dnd-kit", "TanStack Query"],
    type: "POS",
    highlight: "112+ components",
    hasSimulator: true,
    simulatorKey: "pos",
  },
  {
    id: "feedback-saas",
    title: "3S Feedback Solution",
    description:
      "Multi-tenant feedback SaaS built with DDD architecture. NestJS backend, drag-and-drop form builder with dnd-kit, conditional logic, RBAC permissions, analytics dashboard, and Dockerised deployment.",
    tech: ["NestJS", "Next.js 15", "TypeScript", "DDD", "Docker", "PostgreSQL"],
    type: "SaaS",
    highlight: "Multi-tenant RBAC",
    hasSimulator: true,
    simulatorKey: "form-builder",
  },
  {
    id: "qr-ordering",
    title: "3S QR Ordering System",
    description:
      "Full QR-based table ordering system with 60k+ lines of type-safe code. QR encryption with key rotation, real-time POS sync, React 19 with concurrent features, and comprehensive RBAC for staff roles.",
    tech: ["Next.js 15", "React 19", "TypeScript", "QR Encryption", "RBAC", "WebSockets"],
    type: "Platform",
    highlight: "60k+ lines",
    hasSimulator: false,
  },
  {
    id: "3s-printer",
    title: "3S Printer Middleware",
    description:
      "React Native Android hardware middleware for thermal printer integration. Implements 15+ ESC/POS commands, Skia-based Unicode and RTL text rendering for Arabic receipts, and BLE/USB device discovery.",
    tech: ["React Native", "Android", "ESC/POS", "Skia", "BLE", "TypeScript"],
    type: "Tool",
    highlight: "ESC/POS + RTL",
    hasSimulator: false,
  },
  {
    id: "dhealth-pharma",
    title: "dHealth Pharma E-Commerce",
    description:
      "Full-stack pharma e-commerce platform serving 300+ live customers. Built from scratch with MERN stack, Redis caching, JWT authentication, and deployed on VPS with NGINX + PM2 for production reliability.",
    tech: ["React", "Next.js", "Express", "MongoDB", "Redis", "NGINX"],
    type: "E-Commerce",
    highlight: "300+ customers",
    hasSimulator: false,
  },
];
