import { type IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiReactquery,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiNginx,
  SiGithubactions,
  SiAndroid,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export type TechItem = {
  name: string;
  icon?: IconType;
};

export type TechCategory = {
  label: string;
  techs: TechItem[];
};

export const TECH_CATEGORIES: TechCategory[] = [
  {
    label: "Frontend",
    techs: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
      { name: "TanStack Query", icon: SiReactquery },
      { name: "Jotai" },
    ],
  },
  {
    label: "Backend",
    techs: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "NestJS", icon: SiNestjs },
      { name: "Express", icon: SiExpress },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "Prisma", icon: SiPrisma },
    ],
  },
  {
    label: "Mobile",
    techs: [
      { name: "React Native", icon: SiReact },
      { name: "Android", icon: SiAndroid },
      { name: "ESC/POS" },
      { name: "BLE" },
      { name: "Skia" },
    ],
  },
  {
    label: "Infrastructure",
    techs: [
      { name: "Docker", icon: SiDocker },
      { name: "NGINX", icon: SiNginx },
      { name: "AWS", icon: FaAws },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "PM2" },
      { name: "VPS" },
    ],
  },
];

// Top picks shown as badges inside the Hero
export const HERO_TECH_BADGES: TechItem[] = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "NestJS", icon: SiNestjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React Native", icon: SiReact },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: SiDocker },
];
