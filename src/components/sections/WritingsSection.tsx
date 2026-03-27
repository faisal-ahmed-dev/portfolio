"use client";
import { motion } from "framer-motion";
import { ExternalLink, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { WRITINGS } from "@/data/writings";
import { staggerContainer, staggerItem } from "@/lib/animations";

const SOURCE_COLORS: Record<string, "cyan" | "indigo" | "muted"> = {
  "dev.to": "cyan",
  Hashnode: "indigo",
  Medium: "muted",
  Personal: "muted",
};

export function WritingsSection() {
  return (
    <section id="writings" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Writing"
          title="Thoughts on Engineering"
          description="Deep dives into architecture patterns, React internals, and hard-won production lessons."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          {WRITINGS.map((article) => (
            <motion.div key={article.id} variants={staggerItem}>
              <GlassCard className="p-6 group hover:neon-border-cyan transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <NeonBadge variant={SOURCE_COLORS[article.source] ?? "muted"}>
                    {article.source}
                  </NeonBadge>
                  <span className="flex items-center gap-1 text-xs text-[#555]">
                    <Calendar size={10} />
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-[#00F0FF] transition-colors">
                  {article.title}
                </h3>

                <p className="text-[#666] text-xs leading-relaxed flex-1 mb-4">{article.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-[#555] bg-white/5 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#555] hover:text-[#00F0FF] transition-colors"
                    aria-label="Read article"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
