"use client";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, ChevronRight, Download } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { PORTFOLIO } from "@/data/portfolio";
import { HERO_TECH_BADGES } from "@/data/techStack";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden px-4 py-20">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8B5CF6]/8 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#7C3AED]/4 rounded-full blur-[100px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Eyebrow */}
        <motion.p
          variants={staggerItem}
          className="text-xs font-bold tracking-[0.3em] uppercase accent-text mb-6"
        >
          Frontend · Fullstack · 3S
        </motion.p>

        {/* Role badges */}
        <motion.div variants={staggerItem} className="flex items-center justify-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#888]">
            Full-Stack Engineer
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A78BFA]">
            2 yrs exp
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-[#888]">
            @ 3S
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={staggerItem}
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4"
        >
          <span className="text-white">{PORTFOLIO.name.split(" ")[0]}</span>{" "}
          <span className="text-white">{PORTFOLIO.name.split(" ")[1]}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div variants={staggerItem} className="mb-8">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            builds systems
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            that scale.
          </p>
        </motion.div>

        {/* Sub-tagline */}
        <motion.p
          variants={staggerItem}
          className="text-[#888] text-lg mb-4 max-w-xl mx-auto leading-relaxed"
        >
          {PORTFOLIO.yearsExp} years @ {PORTFOLIO.company} · POS for 300+ restaurants ·{" "}
          <span className="text-[#A78BFA]">Remote · Open to KSA</span>
        </motion.p>

        {/* Tech badges */}
        <motion.div variants={staggerItem} className="flex flex-wrap gap-2 justify-center mb-10">
          {HERO_TECH_BADGES.map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-[#ccc] hover:border-[#8B5CF6]/40 hover:text-[#A78BFA] transition-colors">
              {tech}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={staggerItem} className="flex flex-wrap gap-4 justify-center">
          <NeonButton variant="primary" size="lg" as="a" href="#projects">
            View My Work <ExternalLink size={18} />
          </NeonButton>
          <NeonButton variant="secondary" size="lg" as="a" href="#architecture">
            Explore Architecture <ChevronRight size={18} />
          </NeonButton>
          <NeonButton variant="ghost" size="lg" as="a" href={PORTFOLIO.cvPath} download>
            <Download size={18} /> Download CV
          </NeonButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#555] hover:text-[#8B5CF6] transition-colors cursor-pointer"
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
