"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppBadge } from "@/components/ui/AppBadge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";
import { staggerContainer, staggerItem } from "@/lib/animations";

const LAYERS = [
  {
    id: "ui",
    label: "UI Layer",
    color: "#60a5fa",
    description: "React 19 components, Framer Motion animations, Radix UI primitives",
    items: ["React 19", "Next.js App Router", "Framer Motion", "Tailwind CSS v4", "Radix UI"],
  },
  {
    id: "state",
    label: "State Layer",
    color: "#3b82f6",
    description: "Jotai atoms for global state, TanStack Query for server state, local useState for UI",
    items: ["Jotai", "TanStack Query", "useState", "Context API"],
  },
  {
    id: "domain",
    label: "Domain Layer",
    color: "#10b981",
    description: "Business logic — entities, use cases, domain services. Zero framework dependencies.",
    items: ["Entities", "Use Cases", "Domain Services", "Repository Interfaces"],
  },
  {
    id: "infra",
    label: "Infrastructure Layer",
    color: "#059669",
    description: "Database access, external APIs, storage adapters, notification services",
    items: ["Prisma ORM", "IndexedDB", "REST / tRPC", "Notification Service"],
  },
];

export function ArchitectureHologram() {
  return (
    <section id="architecture" className="py-32 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="System Design"
          title="Clean Architecture"
          description="Every system I build follows Clean Architecture principles — UI knows nothing about the database, and domain logic is framework-agnostic."
          centered
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-col gap-2"
        >
          {LAYERS.map((layer) => (
            <motion.div key={layer.id} variants={staggerItem}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TonalCard hover shadow ghostBorder className="p-4 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: layer.color }}
                          />
                          <span className="text-sm font-semibold text-[#f4f4f5]">{layer.label}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {layer.items.map((item) => (
                            <AppBadge key={item} variant="default" className="text-[10px]">
                              {item}
                            </AppBadge>
                          ))}
                        </div>
                      </div>
                    </TonalCard>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-xs leading-relaxed">{layer.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-xs text-[#52525b] mt-6 font-mono">
          ↑ Dependencies point inward — inner layers never import outer layers
        </p>
      </div>
    </section>
  );
}
