"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { staggerContainer, staggerItem } from "@/lib/animations";

const LAYERS = [
  {
    id: "ui",
    label: "UI Layer",
    color: "#00F0FF",
    description: "React 19 components, Framer Motion animations, Radix UI primitives",
    items: ["React 19", "Next.js App Router", "Framer Motion", "Tailwind CSS v4", "Radix UI"],
    depth: 1,
  },
  {
    id: "state",
    label: "State Layer",
    color: "#00C8D0",
    description: "Jotai atoms for global state, TanStack Query for server state, local useState for UI",
    items: ["Jotai", "TanStack Query", "useState", "Context API"],
    depth: 2,
  },
  {
    id: "domain",
    label: "Domain Layer",
    color: "#A06FD0",
    description: "Business logic — entities, use cases, domain services. Zero framework dependencies.",
    items: ["Entities", "Use Cases", "Domain Services", "Repository Interfaces"],
    depth: 3,
  },
  {
    id: "infra",
    label: "Infrastructure Layer",
    color: "#7B2CBF",
    description: "Database access, external APIs, storage adapters, notification services",
    items: ["Prisma ORM", "IndexedDB", "REST / tRPC", "Notification Service"],
    depth: 4,
  },
];

export function ArchitectureHologram() {
  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8">
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
          className="mt-16 flex flex-col gap-3"
        >
          {LAYERS.map((layer) => (
            <motion.div key={layer.id} variants={staggerItem}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <GlassCard
                      className="p-4 cursor-pointer hover:scale-[1.01] transition-transform"
                      style={{
                        borderColor: `${layer.color}30`,
                        boxShadow: `0 0 20px ${layer.color}08`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: layer.color, boxShadow: `0 0 8px ${layer.color}` }}
                          />
                          <span className="text-sm font-semibold text-white">{layer.label}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {layer.items.map((item) => (
                            <NeonBadge key={item} variant="muted" className="text-[10px]">
                              {item}
                            </NeonBadge>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-xs leading-relaxed">{layer.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </motion.div>

        {/* Arrow indicating dependency direction */}
        <p className="text-center text-xs text-[#555] mt-6">
          ↑ Dependencies point inward — inner layers never import outer layers
        </p>
      </div>
    </section>
  );
}
