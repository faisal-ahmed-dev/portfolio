"use client";
import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppBadge } from "@/components/ui/AppBadge";
import { EXPERIENCE } from "@/data/experience";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-32 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Career"
          title="Work Experience"
          description="Building real products for real users, with full ownership of architecture and delivery."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 relative"
        >
          {/* Timeline connector — gradient line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, #3b82f6 30%, #10b981 70%, transparent)",
            }}
          />

          {EXPERIENCE.map((exp) => (
            <motion.div key={exp.id} variants={staggerItem} className="pl-14 relative mb-8 last:mb-0">
              {/* Timeline dot */}
              <div
                className={`absolute left-0 top-5 flex items-center justify-center w-8 h-8 rounded-full ${
                  exp.current
                    ? "bg-[rgba(52,211,153,0.12)] ring-2 ring-emerald-400/20"
                    : "bg-[#131316]"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    exp.current ? "bg-emerald-400" : "bg-[#52525b]"
                  }`}
                />
              </div>

              <TonalCard hover shadow ghostBorder className="p-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[#f4f4f5] font-bold text-lg tracking-tight">{exp.role}</h3>
                      {exp.current && <AppBadge variant="status">Now</AppBadge>}
                    </div>
                    <p className="gradient-text font-semibold text-sm">{exp.company}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs text-[#52525b]">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Calendar size={11} />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={11} />
                      {exp.type}
                    </span>
                  </div>
                </div>

                <p className="text-[#a1a1aa] text-sm leading-relaxed mb-5">{exp.description}</p>

                <ul className="space-y-2 mb-5">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#a1a1aa]">
                      <span className="text-[#3b82f6] mt-1 shrink-0">›</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((tech) => (
                    <AppBadge key={tech} variant="default" className="font-mono text-[10px]">
                      {tech}
                    </AppBadge>
                  ))}
                </div>
              </TonalCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
