"use client";
import { useAtom } from "jotai";
import { simulatorTabAtom } from "@/store/atoms";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { PROJECTS } from "@/data/projects";
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

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
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
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <GlassCard
                neon={project.hasSimulator ? "cyan" : "none"}
                className={cn("p-5 h-full", project.hasSimulator && "cursor-pointer hover:scale-[1.02] transition-transform")}
                onClick={() => {
                  if (project.simulatorKey) setActiveTab(project.simulatorKey);
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <NeonBadge variant={project.hasSimulator ? "cyan" : "muted"}>{project.type}</NeonBadge>
                  {project.hasSimulator && (
                    <span className="text-[10px] text-[#00F0FF] font-mono">LIVE</span>
                  )}
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{project.title}</h3>
                <p className="text-[#666] text-xs leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] text-[#555] bg-white/5 px-1.5 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[10px] text-[#555]">+{project.tech.length - 3}</span>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Simulator */}
        <GlassCard neon="cyan" className="p-0 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-white/5">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  activeTab === tab.key
                    ? "text-[#00F0FF] border-b-2 border-[#00F0FF] bg-[#00F0FF]/5"
                    : "text-[#555] hover:text-[#888]"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "pos" ? <POSSimulator /> : <FormBuilderSimulator />}
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
