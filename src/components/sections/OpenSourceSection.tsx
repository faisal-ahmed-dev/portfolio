"use client";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppBadge } from "@/components/ui/AppBadge";
import { AppButton } from "@/components/ui/AppButton";
import { usePortfolioData, useOpenSource } from "@/hooks/useVariantData";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function OpenSourceSection() {
  const PORTFOLIO = usePortfolioData();
  const { githubStats: GITHUB_STATS, pinnedRepos: PINNED_REPOS } = useOpenSource();
  return (
    <section id="open-source" className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Open Source"
          title="GitHub Activity"
          description="Code I write publicly — experiments, tools, and portfolio projects."
        />

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10"
        >
          {GITHUB_STATS.map((stat, i) => (
            <motion.div key={i} variants={staggerItem}>
              <TonalCard glass shadow className="p-3 sm:p-5 text-center">
                <p className="text-2xl sm:text-3xl font-black tracking-[-0.04em] gradient-text">{stat.value}</p>
                <p className="text-sm font-medium text-[#a1a1aa] mt-1">{stat.label}</p>
                <p className="text-xs text-[#52525b] mt-0.5">{stat.description}</p>
              </TonalCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 overflow-hidden rounded-2xl bg-[#131316] p-4"
        >
          <p className="text-xs font-mono text-[#52525b] mb-3">Contribution activity</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/3b82f6/faisal-ahmed-dev`}
            alt="GitHub contribution chart"
            className="w-full h-auto opacity-70"
          />
        </motion.div>

        {/* Pinned repos */}
        {PINNED_REPOS.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4 mb-8"
          >
            {PINNED_REPOS.map((repo) => (
              <motion.div key={repo.id} variants={staggerItem}>
                <TonalCard hover shadow ghostBorder className="p-4 sm:p-5 group">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-mono text-sm text-[#60a5fa] font-medium">{repo.name}</p>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3f3f46] hover:text-[#60a5fa] transition-colors"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">{repo.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[#52525b]">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: repo.languageColor }}
                        />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={11} />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={11} />
                        {repo.forks}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {repo.topics.slice(0, 2).map((topic) => (
                        <AppBadge key={topic} variant="default" className="text-[9px]">
                          {topic}
                        </AppBadge>
                      ))}
                    </div>
                  </div>
                </TonalCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex justify-center">
          <AppButton variant="secondary" as="a" href={PORTFOLIO.github} target="_blank" rel="noopener noreferrer">
            View GitHub Profile <ExternalLink size={15} />
          </AppButton>
        </div>
      </div>
    </section>
  );
}
