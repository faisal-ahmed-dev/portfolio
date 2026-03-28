"use client";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Download } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { AmbientPool } from "@/components/background/AmbientPool";
import { AnimatedGradientOverlay } from "@/components/decorative/AnimatedGradientOverlay";
import { GradientLine } from "@/components/decorative/GradientLine";
import { PORTFOLIO } from "@/data/portfolio";
import { HERO_TECH_BADGES } from "@/data/techStack";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden px-6 py-32">

      {/* Animated gradient overlay */}
      <AnimatedGradientOverlay />

      {/* Ambient pools — blue + emerald */}
      <AmbientPool size={900} opacity={0.08} x="40%" y="35%" color="blue" />
      <AmbientPool size={500} opacity={0.06} x="65%" y="65%" color="emerald" />

      {/* Decorative vertical gradient lines */}
      <div className="absolute top-[10%] bottom-[10%] left-[20%] hidden lg:block">
        <GradientLine direction="vertical" className="h-full opacity-30" />
      </div>
      <div className="absolute top-[15%] bottom-[15%] right-[20%] hidden lg:block">
        <GradientLine direction="vertical" className="h-full opacity-20" />
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
          className="font-mono text-xs text-[#52525b] tracking-[0.2em] uppercase mb-6"
        >
          Software Engineer · 2 yrs @ 3S · Dhaka, BD
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={staggerItem}
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-[-0.04em] mb-5"
        >
          <span className="text-[#f4f4f5]">{PORTFOLIO.name.split(" ")[0]}</span>{" "}
          <span className="gradient-text">{PORTFOLIO.name.split(" ")[1]}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div variants={staggerItem} className="mb-6 relative inline-block">
          <p className="text-3xl sm:text-4xl font-bold text-[#f4f4f5] leading-tight tracking-[-0.03em]">
            builds systems that scale.
          </p>
          {/* SVG wave underline */}
          <svg className="absolute -bottom-2 left-0 w-full h-2 opacity-50" viewBox="0 0 300 8" preserveAspectRatio="none">
            <path
              d="M0 4 Q 37.5 0, 75 4 T 150 4 T 225 4 T 300 4"
              fill="none"
              stroke="url(#gradient-underline)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradient-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Sub-tagline */}
        <motion.p
          variants={staggerItem}
          className="text-[#a1a1aa] text-lg mb-8 max-w-xl mx-auto leading-relaxed"
        >
          {PORTFOLIO.yearsExp} years building POS systems, multi-tenant SaaS, and React Native apps at{" "}
          <span className="text-[#60a5fa]">{PORTFOLIO.company}</span>.{" "}
          Open to KSA full-time roles.
        </motion.p>

        {/* Tech badges */}
        <motion.div variants={staggerItem} className="flex flex-wrap gap-2 justify-center mb-10">
          {HERO_TECH_BADGES.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1 rounded-full text-xs font-mono bg-[#131316] text-[#a1a1aa] ghost-border hover:bg-[#1a1a1f] hover:text-[#f4f4f5] transition-all duration-200 inline-flex items-center gap-1.5"
            >
              {tech.icon && <tech.icon className="w-3.5 h-3.5" />}
              {tech.name}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={staggerItem} className="flex flex-wrap gap-3 justify-center">
          <AppButton variant="gradient" size="lg" as="a" href="#projects">
            View My Work <ExternalLink size={16} />
          </AppButton>
          <AppButton variant="secondary" size="lg" as="a" href="#architecture">
            Architecture
          </AppButton>
          <AppButton variant="ghost" size="lg" as="a" href={PORTFOLIO.cvPath} download>
            <Download size={16} /> Download CV
          </AppButton>
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
          className="text-[#3f3f46] hover:text-[#60a5fa] transition-colors cursor-pointer"
        >
          <ArrowDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
