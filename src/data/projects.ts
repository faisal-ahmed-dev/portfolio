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
    featured: true,
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
    featured: true,
  },
  {
    id: "qr-ordering",
    title: "3S QR E-Menu",
    description:
      "Contactless QR E-Menu platform serving 30+ restaurants live. Scan QR, browse menu, and order from your phone — no paper menus, no delays. Real-time menu/price syncs, promo banners, customer feedback, quick checkout, and seamless Orderly POS integration. Drives ~20% faster table turns, 15–20% higher average spend, and significantly fewer order errors.",
    tech: ["Next.js 15", "React 19", "TypeScript", "QR Encryption", "WebSockets", "POS Integration"],
    type: "Platform",
    highlight: "30+ restaurants live",
    hasSimulator: false,
    featured: true,
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
    id: "express-pos",
    title: "Express POS",
    description:
      "Full-stack rebuild of a table-service POS used by 50+ waiters across 30+ restaurants. Transformed rigid desktop UI into a mobile-first, touch-optimized interface with interactive table selector, visual product grid, smart order editing, on-screen numpad, and multiple payment options.",
    tech: [".NET 8 Razor Pages", "C#", "SQL Stored Procedures", "jQuery", "Bootstrap"],
    type: "POS",
    highlight: "50+ waiters · 30+ restaurants",
    hasSimulator: false,
  },
  {
    id: "reporting-tool",
    title: "Reporting Tool — 3S Orderly",
    description:
      "Comprehensive analytics suite serving 1400+ clients with 70+ dynamic reports spanning sales, inventory, SMS campaigns, KDS performance, and staff efficiency. Reduced load time by 40% via caching, lazy-loaded charts, and code splitting.",
    tech: ["React", "Chakra UI", "React Query", "Recharts"],
    type: "Analytics",
    highlight: "1400+ clients · 70+ reports",
    hasSimulator: false,
  },
  {
    id: "kitchen-display",
    title: "Kitchen Display — 3S Orderly",
    description:
      "Real-time restaurant Kitchen Display System serving 600+ clients. Color-coded status cards (Sent → Ready → Served), real-time timers, priority indicators, customizable prep stations, SMS integration, and persistent audio alerts using Web Audio API.",
    tech: ["React", "Chakra UI", "React Query", "Web Audio API"],
    type: "Dashboard",
    highlight: "600+ clients · ~35% faster",
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
    featured: true,
  },
  {
    id: "class-finder",
    title: "Class Finder App",
    description:
      "Mobile application for streamlining class schedules and announcements. Features push notifications, daily schedule management, routine organization, instructor notice board, and personalized profiles for students.",
    tech: ["React Native", "Node.js", "Express.js", "SQLite", "Figma"],
    type: "Mobile",
    highlight: "Push notifications",
    hasSimulator: false,
  },
  {
    id: "tourify",
    title: "Tourify",
    description:
      "Property rental platform allowing hosts to list properties, set prices, and share photos, while guests search and book accommodations. Includes admin management for all services.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    type: "Platform",
    highlight: "Full rental platform",
    hasSimulator: false,
  },
  {
    id: "home-rental-system",
    title: "Home Rental System",
    description:
      "Desktop application for automating home rental management. Includes secure login, tenant registration with NID search, rent collection tracking, maintenance logging, flat listings, and report generation.",
    tech: ["C++", "HTML", "QSS", "Qt"],
    type: "Desktop",
    highlight: "Desktop app",
    hasSimulator: false,
  },
];
