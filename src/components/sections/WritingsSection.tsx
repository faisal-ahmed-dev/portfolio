"use client";
import { motion } from "framer-motion";
import { ExternalLink, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppBadge } from "@/components/ui/AppBadge";
import { WRITINGS } from "@/data/writings";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function WritingsSection() {
  return (
    <section id="writings" className="py-32 px-6 lg:px-8">
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
          className="mt-14 grid md:grid-cols-2 gap-5"
        >
          {WRITINGS.map((article) => (
            <motion.div key={article.id} variants={staggerItem}>
              <TonalCard hover shadow ghostBorder className="p-6 group h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <AppBadge variant="accent">{article.source}</AppBadge>
                  <span className="flex items-center gap-1 text-xs text-[#52525b]">
                    <Calendar size={10} />
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>

                <h3 className="text-[#f4f4f5] font-semibold text-sm leading-snug mb-2 group-hover:text-white transition-colors">
                  {article.title}
                </h3>

                <p className="text-[#52525b] text-xs leading-relaxed flex-1 mb-4">{article.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-[#52525b] bg-[#1a1a1f] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3f3f46] hover:text-[#60a5fa] transition-colors"
                    aria-label="Read article"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </TonalCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
