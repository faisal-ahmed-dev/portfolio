export type TechCategory = {
  label: string;
  techs: string[];
};

export const TECH_CATEGORIES: TechCategory[] = [
  {
    label: "Frontend",
    techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Query", "Jotai"],
  },
  {
    label: "Backend",
    techs: ["Node.js", "NestJS", "Express", "PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    label: "Mobile",
    techs: ["React Native", "Android", "ESC/POS", "BLE", "Skia"],
  },
  {
    label: "Infrastructure",
    techs: ["Docker", "NGINX", "AWS", "GitHub Actions", "PM2", "VPS"],
  },
];

// Top picks shown as badges inside the Hero
export const HERO_TECH_BADGES = [
  "Next.js", "NestJS", "Node.js", "TypeScript",
  "React Native", "PostgreSQL", "Redis", "Docker",
];
