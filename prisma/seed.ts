import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

// ── Inline data (avoids @/ alias issues in ts-node) ──────────────────────────

const PORTFOLIO = {
  name: "Faisal Ahmed",
  title: "Software Engineer",
  company: "3S, Software Solution Service",
  tagline: "I architect systems that scale — from offline-first POS to real-time multi-tenant SaaS.",
  availability: "Remote",
  email: "faisalksabd999@gmail.com",
  phone: "+8801886576599",
  github: "https://github.com/faisal-ahmed-dev",
  linkedin: "https://www.linkedin.com/in/faisal-ahmed-dev",
  location: "Uttara, Dhaka, Bangladesh",
  yearsExp: 2,
  cvPath: "/faisal-ahmed-cv.pdf",
};

const PROJECTS = [
  { id: "orderly-pos", title: "Orderly POS", description: "Enterprise point-of-sale system built at 3S with 112+ components. Real-time KOT management, offline-first with IndexedDB background sync, dnd-kit drag-and-drop, multi-terminal Jotai state, and role-based staff management.", tech: ["Next.js 14", "TypeScript", "Jotai", "IndexedDB", "dnd-kit", "TanStack Query"], type: "POS", highlight: "112+ components", hasSimulator: true, simulatorKey: "pos", featured: true },
  { id: "feedback-saas", title: "3S Feedback Solution", description: "Multi-tenant feedback SaaS built with DDD architecture. NestJS backend, drag-and-drop form builder with dnd-kit, conditional logic, RBAC permissions, analytics dashboard, and Dockerised deployment.", tech: ["NestJS", "Next.js 15", "TypeScript", "DDD", "Docker", "PostgreSQL"], type: "SaaS", highlight: "Multi-tenant RBAC", hasSimulator: true, simulatorKey: "form-builder", featured: true },
  { id: "qr-ordering", title: "3S QR E-Menu", description: "Contactless QR E-Menu platform serving 30+ restaurants live. Scan QR, browse menu, and order from your phone — no paper menus, no delays. Real-time menu/price syncs, promo banners, customer feedback, quick checkout, and seamless Orderly POS integration. Drives ~20% faster table turns, 15–20% higher average spend, and significantly fewer order errors.", tech: ["Next.js 15", "React 19", "TypeScript", "QR Encryption", "WebSockets", "POS Integration"], type: "Platform", highlight: "30+ restaurants live", hasSimulator: false, featured: true },
  { id: "3s-printer", title: "3S Printer Middleware", description: "React Native Android hardware middleware for thermal printer integration. Implements 15+ ESC/POS commands, Skia-based Unicode and RTL text rendering for Arabic receipts, and BLE/USB device discovery.", tech: ["React Native", "Android", "ESC/POS", "Skia", "BLE", "TypeScript"], type: "Tool", highlight: "ESC/POS + RTL", hasSimulator: false, featured: false },
  { id: "express-pos", title: "Express POS", description: "Full-stack rebuild of a table-service POS used by 50+ waiters across 30+ restaurants.", tech: [".NET 8 Razor Pages", "C#", "SQL Stored Procedures", "jQuery", "Bootstrap"], type: "POS", highlight: "50+ waiters · 30+ restaurants", hasSimulator: false, featured: false },
  { id: "reporting-tool", title: "Reporting Tool — 3S Orderly", description: "Comprehensive analytics suite serving 1400+ clients with 70+ dynamic reports.", tech: ["React", "Chakra UI", "React Query", "Recharts"], type: "Analytics", highlight: "1400+ clients · 70+ reports", hasSimulator: false, featured: false },
  { id: "kitchen-display", title: "Kitchen Display — 3S Orderly", description: "Real-time restaurant Kitchen Display System serving 600+ clients.", tech: ["React", "Chakra UI", "React Query", "Web Audio API"], type: "Dashboard", highlight: "600+ clients · ~35% faster", hasSimulator: false, featured: false },
  { id: "dhealth-pharma", title: "dHealth Pharma E-Commerce", description: "Full-stack pharma e-commerce platform serving 300+ live customers.", tech: ["React", "Next.js", "Express", "MongoDB", "Redis", "NGINX"], type: "E-Commerce", highlight: "300+ customers", hasSimulator: false, featured: true },
  { id: "class-finder", title: "Class Finder App", description: "Mobile application for streamlining class schedules and announcements.", tech: ["React Native", "Node.js", "Express.js", "SQLite", "Figma"], type: "Mobile", highlight: "Push notifications", hasSimulator: false, featured: false },
  { id: "tourify", title: "Tourify", description: "Property rental platform allowing hosts to list properties, set prices, and share photos.", tech: ["React", "Node.js", "Express.js", "MongoDB"], type: "Platform", highlight: "Full rental platform", hasSimulator: false, featured: false },
  { id: "home-rental-system", title: "Home Rental System", description: "Desktop application for automating home rental management.", tech: ["C++", "HTML", "QSS", "Qt"], type: "Desktop", highlight: "Desktop app", hasSimulator: false, featured: false },
];

const EXPERIENCE = [
  { id: "3s", company: "3S — Software Solution Service", role: "Software Engineer", period: "Feb 2024 — Present", duration: "2+ yrs", location: "Remote · Dhaka, Bangladesh", type: "full-time", current: true, description: "Building a multi-product SaaS suite for the hospitality industry — POS, QR ordering, feedback management, and printer middleware.", highlights: ["Architected Orderly POS with 112+ components, offline-first with IndexedDB + background sync", "Built 3S QR Ordering System: 60k+ lines of TypeScript, QR encryption with key rotation", "Delivered multi-tenant 3S Feedback Solution using Domain-Driven Design and NestJS backend", "Shipped React Native Android printer middleware with ESC/POS, BLE, and Arabic RTL via Skia", "Led frontend architecture decisions across the product suite using Clean Architecture principles"], tech: ["Next.js", "NestJS", "TypeScript", "React Native", "PostgreSQL", "Redis", "Docker"] },
  { id: "dhealth", company: "dHealth International", role: "Software Engineer", period: "Feb 2024 — Dec 2024", duration: "11 months", location: "Dhaka, Bangladesh", type: "full-time", current: false, description: "Designed and built a complete e-commerce pharmacy platform with customer profiles, prescription uploads, multi-variant products, and admin tools for SEO, campaigns, and POS integration.", highlights: ["Architected full-stack application with REST APIs serving multiple frontend clients", "Built customer-facing storefront with cart, checkout, order tracking, and prescription upload", "Created POS system for in-store sales with real-time inventory updates", "Integrated multi-vendor functionality with seller dashboards and commission tracking", "Implemented comprehensive security: JWT authentication, RBAC, XSS protection, rate-limiting", "Optimized performance with Redis caching, image compression (Sharp), and lazy loading"], tech: ["Next.js", "Node.js", "Express.js", "PostgreSQL", "Redis", "Socket.IO", "Docker"] },
];

const SERVICES = [
  { id: "frontend", icon: "Monitor", title: "Frontend Engineering", description: "Production-grade React and Next.js applications with a focus on performance, accessibility, and clean architecture.", capabilities: ["React / Next.js App Router", "TypeScript design systems", "Animation with Framer Motion", "Offline-first PWAs"] },
  { id: "backend", icon: "Server", title: "Backend & API", description: "Scalable Node.js services with NestJS, clean domain modeling, and battle-tested data access patterns.", capabilities: ["NestJS + Domain-Driven Design", "REST & WebSocket APIs", "PostgreSQL + Redis", "Docker & CI/CD pipelines"] },
  { id: "mobile", icon: "Smartphone", title: "Mobile Development", description: "React Native Android applications including hardware integrations, BLE device communication, and native rendering.", capabilities: ["React Native + Expo", "ESC/POS thermal printing", "BLE & USB device discovery", "Skia RTL text rendering"] },
  { id: "architecture", icon: "Layers", title: "System Architecture", description: "Clean Architecture, DDD, and SOLID applied to real production codebases — not just whiteboard diagrams.", capabilities: ["Clean Architecture setup", "Multi-tenant SaaS design", "RBAC & auth patterns", "Code review & mentorship"] },
];

const TESTIMONIALS = [
  { id: "mohammad-abul-parvez", name: "Mohammad Abul Parvez", role: ".NET & JavaScript Developer", company: "Mentor at dHealth", avatar: null, quote: "Faisal is an exceptional engineer and a pleasure to work with. He transformed an outdated and frustrating POS system into a smooth, intuitive experience optimized for tablets and mobile devices. He has a strong understanding of real-world user behavior, writes clean and maintainable code, and delivers results with minimal friction. He's calm, thoughtful, and highly reliable.", relationship: null },
  { id: "sohan-reza", name: "Sohan Reza", role: "Engineering Manager", company: "dHealth", avatar: null, quote: "Faisal is an excellent frontend developer with a strong eye for UI and solid Node.js skills. He delivered high-quality, user-friendly interfaces and was reliable throughout the project. I'd gladly recommend him for any frontend or UI-focused development work.", relationship: null },
  { id: "jahin-hasan-chowdhury", name: "Jahin Hasan Chowdhury", role: "Software Engineer", company: "3S Softech Ltd.", avatar: null, quote: "Very reliable and attentive person. Can face new challenges with confidence. He brings enormous strength to any team he works in.", relationship: null },
  { id: "rakib-mahmood-razeen", name: "Rakib Mahmood Razeen", role: "SQA Engineer", company: "MetLife & Brain Station 23", avatar: null, quote: "Faisal Ahmed is a skilled and reliable Software Engineer with strong expertise in Node.js, Nest.js, and Next.js. He is proactive, quick to learn, and consistently delivers quality work. A great professional to work with.", relationship: null },
  { id: "rakibul-islam", name: "Rakibul Islam", role: "Full Stack Web Developer", company: "Colleague", avatar: null, quote: "Faisal is an excellent full-stack developer. We collaborated on a feedback platform, e-commerce site, and company portfolio — all delivered on time, with clean code and great attention to user needs. Professional, reliable, and highly recommended!", relationship: null },
  { id: "md-ariful-islam-rifat", name: "Md Ariful Islam Rifat", role: "Cybersecurity Analyst", company: "VAPT & Endpoint Security", avatar: null, quote: "I had the pleasure of working with Faisal Ahmed, a talented Full-Stack Developer. He's professional, reliable, and always delivers high-quality work. Faisal is a great problem solver and team player, any team would be lucky to have him!", relationship: null },
];

const CERTIFICATIONS = [
  { id: "ibm-backend", title: "IBM Back-end JavaScript Developer Professional Certificate", issuer: "IBM", date: "Dec 2024", credentialId: "POF64BS43W9B", skills: ["JavaScript", "Node.js", "Express.js"] },
  { id: "ibm-frontend", title: "IBM Front-End Developer Professional Certificate", issuer: "IBM", date: "Dec 2024", credentialId: "51JHU9RJL36K", skills: ["React.js", "GitHub", "HTML/CSS"] },
  { id: "mern-ostad", title: "Full Stack Web Development with MERN", issuer: "Ostad", date: "Jun 2024", credentialId: "C13862", skills: ["React.js", "Express.js", "MongoDB", "Node.js"] },
  { id: "reactive-accelerator", title: "Reactive Accelerator", issuer: "Learn with Sumit — LWS", date: "Dec 2024", credentialId: null, skills: ["React.js", "Next.js"] },
  { id: "js-essentials", title: "JavaScript Programming Essentials", issuer: "Coursera", date: "Feb 2024", credentialId: "D6TYMXEAC86S", skills: ["JavaScript"] },
  { id: "node-express", title: "Developing Back-End Apps with Node.js and Express", issuer: "Coursera", date: "Mar 2024", credentialId: "6FW85BJ92L6J", skills: ["Node.js", "Express.js"] },
  { id: "problem-solving", title: "Crash Course on Coding Problem Solving", issuer: "Ostad", date: "Apr 2024", credentialId: "c18980", skills: ["Problem Solving"] },
];

const WRITINGS = [
  { id: "offline-first-pos", title: "Building Offline-First POS Systems with IndexedDB and Background Sync", url: "#", date: "2025-01-15", source: "dev.to", summary: "How we built Orderly POS to keep working during network outages — queueing orders, syncing on reconnect, resolving conflicts.", tags: ["PWA", "IndexedDB", "Architecture"] },
  { id: "dnd-kit-deep-dive", title: "dnd-kit Deep Dive: Building Production-Grade Drag and Drop", url: "#", date: "2024-11-20", source: "Hashnode", summary: "Beyond the docs — accessibility, keyboard navigation, collision detection strategies, and custom sensors for a form builder.", tags: ["dnd-kit", "React", "UX"] },
  { id: "jotai-architecture", title: "Jotai at Scale: Structuring Atoms for Multi-Team Frontends", url: "#", date: "2024-09-08", source: "dev.to", summary: "Atom families, derived atoms, and persistence patterns that keep state predictable across 10+ feature modules.", tags: ["Jotai", "State Management", "Architecture"] },
  { id: "react-compiler", title: "React 19 Compiler in Production: Dropping 80% of useMemo calls", url: "#", date: "2025-02-01", source: "Medium", summary: "Real-world numbers from migrating a 40-component design system to React Compiler. What it catches, what it misses.", tags: ["React 19", "Performance", "Compiler"] },
  { id: "clean-arch-frontend", title: "Clean Architecture on the Frontend: A Practical Guide", url: "#", date: "2024-07-12", source: "Hashnode", summary: "Entities, use cases, and adapters applied to Next.js — with a working payment flow example you can run locally.", tags: ["Clean Architecture", "Next.js", "TypeScript"] },
  { id: "micro-frontend-federation", title: "Module Federation Without the Pain: Lessons from a Platform Migration", url: "#", date: "2024-05-30", source: "dev.to", summary: "Moving from a monolith to micro-frontends at 3S. Shared state, versioned contracts, and the rollback strategy that saved us.", tags: ["Module Federation", "Micro-frontends", "Webpack"] },
];

const METRICS = [
  { id: "products", label: "Products Built & Shipped", value: 6, suffix: "", prefix: null, description: "POS · QR E-Menu · KDS · Feedback · Reports · Printer SDK" },
  { id: "components", label: "Components Engineered", value: 112, suffix: "+", prefix: null, description: "Across Orderly POS alone — offline-first, production-grade" },
  { id: "scale", label: "Clients in Production", value: 1400, suffix: "+", prefix: null, description: "Restaurants running on systems I built" },
  { id: "experience", label: "Years Building in Production", value: 2, suffix: "+", prefix: null, description: "Full-time engineering since Feb 2024" },
];

const GITHUB_STATS = [
  { id: "public-repos", label: "Public Repos", value: "20+", description: "Open source projects" },
  { id: "contributions", label: "Contributions", value: "500+", description: "Commits in 2024–2025" },
  { id: "languages", label: "Languages", value: "8+", description: "TypeScript, Go, Python & more" },
];

const PINNED_REPOS = [
  { id: "orderly-pos", name: "orderly-pos", description: "Enterprise POS system built with Next.js 14, offline-first with IndexedDB.", stars: 12, forks: 3, language: "TypeScript", languageColor: "#3178c6", url: "https://github.com/faisal-ahmed-dev", topics: ["nextjs", "typescript", "pos", "offline-first"] },
  { id: "feedback-solution", name: "feedback-solution", description: "Multi-tenant SaaS feedback platform with drag-and-drop form builder and analytics.", stars: 8, forks: 2, language: "TypeScript", languageColor: "#3178c6", url: "https://github.com/faisal-ahmed-dev", topics: ["nestjs", "ddd", "saas", "multi-tenant"] },
];

// ── Variant JSON files ────────────────────────────────────────────────────────
function loadVariantFiles() {
  const dir = path.join(__dirname, "../content/variants");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")));
}

// ── Main seed ─────────────────────────────────────────────────────────────────
async function main() {
  console.log("🌱 Seeding database...");

  // PortfolioInfo — singleton upsert
  const existingInfo = await prisma.portfolioInfo.findFirst();
  if (!existingInfo) {
    await prisma.portfolioInfo.create({ data: PORTFOLIO });
    console.log("  ✓ PortfolioInfo");
  } else {
    console.log("  ~ PortfolioInfo (already exists, skipped)");
  }

  // Projects
  for (const [i, p] of PROJECTS.entries()) {
    const { id: pid, ...pRest } = p;
    await prisma.project.upsert({
      where: { id: pid },
      create: { id: pid, ...pRest, simulatorKey: pRest.simulatorKey ?? null, featured: pRest.featured ?? false, order: i },
      update: { ...pRest, simulatorKey: pRest.simulatorKey ?? null, featured: pRest.featured ?? false, order: i },
    });
  }
  console.log(`  ✓ Projects (${PROJECTS.length})`);

  // Experience
  for (const [i, e] of EXPERIENCE.entries()) {
    const { id: eid, ...eRest } = e;
    await prisma.experience.upsert({
      where: { id: eid },
      create: { id: eid, ...eRest, order: i },
      update: { ...eRest, order: i },
    });
  }
  console.log(`  ✓ Experience (${EXPERIENCE.length})`);

  // Services
  for (const [i, s] of SERVICES.entries()) {
    const { id: sid, ...sRest } = s;
    await prisma.service.upsert({
      where: { id: sid },
      create: { id: sid, ...sRest, order: i },
      update: { ...sRest, order: i },
    });
  }
  console.log(`  ✓ Services (${SERVICES.length})`);

  // Testimonials
  for (const [i, t] of TESTIMONIALS.entries()) {
    const { id: tid, ...tRest } = t;
    await prisma.testimonial.upsert({
      where: { id: tid },
      create: { id: tid, ...tRest, order: i },
      update: { ...tRest, order: i },
    });
  }
  console.log(`  ✓ Testimonials (${TESTIMONIALS.length})`);

  // Certifications
  for (const [i, c] of CERTIFICATIONS.entries()) {
    const { id: cid, ...cRest } = c;
    await prisma.certification.upsert({
      where: { id: cid },
      create: { id: cid, ...cRest, order: i },
      update: { ...cRest, order: i },
    });
  }
  console.log(`  ✓ Certifications (${CERTIFICATIONS.length})`);

  // Writings
  for (const [i, w] of WRITINGS.entries()) {
    const { id: wid, ...wRest } = w;
    await prisma.writing.upsert({
      where: { id: wid },
      create: { id: wid, ...wRest, order: i },
      update: { ...wRest, order: i },
    });
  }
  console.log(`  ✓ Writings (${WRITINGS.length})`);

  // Metrics
  for (const [i, m] of METRICS.entries()) {
    const { id: mid, ...mRest } = m;
    await prisma.metric.upsert({
      where: { id: mid },
      create: { id: mid, ...mRest, order: i },
      update: { ...mRest, order: i },
    });
  }
  console.log(`  ✓ Metrics (${METRICS.length})`);

  // GitHub Stats
  for (const [i, s] of GITHUB_STATS.entries()) {
    const { id: gsid, ...gsRest } = s;
    await prisma.openSourceStat.upsert({
      where: { id: gsid },
      create: { id: gsid, ...gsRest, order: i },
      update: { ...gsRest, order: i },
    });
  }
  console.log(`  ✓ OpenSourceStats (${GITHUB_STATS.length})`);

  // Pinned Repos
  for (const [i, r] of PINNED_REPOS.entries()) {
    const { id: rid, ...rRest } = r;
    await prisma.pinnedRepo.upsert({
      where: { id: rid },
      create: { id: rid, ...rRest, order: i },
      update: { ...rRest, order: i },
    });
  }
  console.log(`  ✓ PinnedRepos (${PINNED_REPOS.length})`);

  // Job Variants from JSON files
  const variants = loadVariantFiles();
  for (const v of variants) {
    const { slug, ...rest } = v;
    await prisma.jobVariant.upsert({
      where: { slug },
      create: {
        slug,
        company: rest.company ?? "",
        role: rest.role ?? "",
        coverLetter: rest.coverLetter ?? {},
        hero: rest.hero ?? null,
        portfolio: rest.portfolio ?? null,
        highlightTech: rest.highlightTech ?? [],
        featuredProjectIds: rest.featuredProjectIds ?? [],
        hideProjectIds: rest.hideProjectIds ?? [],
        hideSections: rest.hideSections ?? [],
        sectionOrder: rest.sectionOrder ?? [],
        ogTitle: rest.ogTitle ?? null,
        ogDescription: rest.ogDescription ?? null,
      },
      update: {
        company: rest.company ?? "",
        role: rest.role ?? "",
        coverLetter: rest.coverLetter ?? {},
        hero: rest.hero ?? null,
        portfolio: rest.portfolio ?? null,
        highlightTech: rest.highlightTech ?? [],
        featuredProjectIds: rest.featuredProjectIds ?? [],
        hideProjectIds: rest.hideProjectIds ?? [],
        hideSections: rest.hideSections ?? [],
        sectionOrder: rest.sectionOrder ?? [],
        ogTitle: rest.ogTitle ?? null,
        ogDescription: rest.ogDescription ?? null,
      },
    });
  }
  console.log(`  ✓ JobVariants (${variants.length})`);

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
