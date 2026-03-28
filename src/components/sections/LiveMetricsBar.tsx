"use client";
import { motion } from "framer-motion";
import { METRICS } from "@/data/metrics";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionGlow } from "@/components/background/SectionGlow";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function LiveMetricsBar() {
  return (
    <section className="relative py-16 overflow-hidden">
      <SectionGlow intensity="medium" position="both" />
      {/* Gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {METRICS.map((metric) => (
          <motion.div key={metric.id} variants={staggerItem} className="text-center">
            <p className="text-4xl md:text-5xl font-black text-white">
              <AnimatedCounter
                value={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
                decimals={metric.value % 1 !== 0 ? 1 : 0}
              />
            </p>
            <p className="text-sm font-semibold text-white mt-1">{metric.label}</p>
            <p className="text-xs text-[#6B7280] mt-1">{metric.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
