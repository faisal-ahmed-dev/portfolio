"use client";
import { useAtom } from "jotai";
import { simulatorTabAtom } from "@/store/atoms";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppBadge } from "@/components/ui/AppBadge";
import { useProjects, useFeaturedProjectIds } from "@/hooks/useVariantData";
import { POSSimulator } from "@/components/simulator/POSSimulator";
import { FormBuilderSimulator } from "@/components/simulator/FormBuilderSimulator";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/cn";

const TABS = [
  { key: "pos" as const, label: "Orderly POS", emoji: "🍽️" },
  { key: "form-builder" as const, label: "Form Builder", emoji: "📋" },
];

export function ProjectSimulator() {
  const [activeTab, setActiveTab] = useAtom(simulatorTabAtom);
  const projects = useProjects();
  const featuredIds = useFeaturedProjectIds();

  return (
    <section id="projects" className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Projects"
          title="Live Demos"
          description="Don't just read about what I built — interact with it. These simulators use the same patterns as production."
        />

        {/* Project cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <TonalCard
                hover
                shadow={project.hasSimulator}
                ghostBorder={project.hasSimulator}
                className={cn("p-5 h-full", project.hasSimulator && "cursor-pointer")}
                onClick={() => {
                  if (project.simulatorKey) setActiveTab(project.simulatorKey);
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AppBadge variant={project.hasSimulator ? "accent" : "default"}>{project.type}</AppBadge>
                    {featuredIds.has(project.id) && (
                      <AppBadge variant="status">Relevant</AppBadge>
                    )}
                  </div>
                  {project.hasSimulator && (
                    <span className="text-[10px] gradient-text font-mono font-bold">LIVE</span>
                  )}
                </div>
                <h3 className="text-[#f4f4f5] font-bold text-sm mb-2">{project.title}</h3>
                <p className="text-[#52525b] text-xs leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] text-[#52525b] bg-[#1a1a1f] px-1.5 py-0.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[10px] text-[#3f3f46]">+{project.tech.length - 3}</span>
                  )}
                </div>
              </TonalCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Simulator */}
        <TonalCard glass shadow className="overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-[rgba(255,255,255,0.05)] bg-[#0c0c0f]">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  activeTab === tab.key
                    ? "text-[#60a5fa] border-b-2 border-[#3b82f6] bg-[rgba(59,130,246,0.05)]"
                    : "text-[#52525b] hover:text-[#a1a1aa]"
                )}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "pos" ? <POSSimulator /> : <FormBuilderSimulator />}
            </motion.div>
          </div>
        </TonalCard>
      </div>
    </section>
  );
}
