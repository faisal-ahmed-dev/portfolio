"use client";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, ChevronRight, Download } from "lucide-react";
import { CyberGrid } from "@/components/background/CyberGrid";
import { NeonButton } from "@/components/ui/NeonButton";
import { PORTFOLIO } from "@/data/portfolio";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      <CyberGrid />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#7B2CBF]/8 rounded-full blur-[80px]" />
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
          className="text-xs font-bold tracking-[0.3em] uppercase gradient-text mb-6"
        >
          Frontend · Fullstack · 3S
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={staggerItem}
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4"
        >
          <span className="gradient-text">{PORTFOLIO.name.split(" ")[0]}</span>{" "}
          <span className="gradient-text">{PORTFOLIO.name.split(" ")[1]}</span>
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
          className="text-[#888] text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {PORTFOLIO.yearsExp} years @ {PORTFOLIO.company} · POS for 300+ restaurants ·{" "}
          <span className="text-[#00F0FF]">open to KSA opportunities</span>
        </motion.p>

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
          className="text-[#555] hover:text-[#00F0FF] transition-colors cursor-pointer"
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
