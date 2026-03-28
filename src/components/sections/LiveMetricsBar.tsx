"use client";
import { motion } from "framer-motion";
import { useMetrics } from "@/hooks/useVariantData";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GradientLine } from "@/components/decorative/GradientLine";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function LiveMetricsBar() {
  const METRICS = useMetrics();
  return (
    <section className="py-12 sm:py-28 px-4 sm:px-6">
      <GradientLine direction="horizontal" className="opacity-30 mb-8 sm:mb-16" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-10"
      >
        {METRICS.map((metric, i) => (
          <motion.div key={metric.id} variants={staggerItem} className="text-center relative">
            {i > 0 && (
              <div className="hidden md:block absolute left-0 top-1/4 h-1/2 w-px bg-[rgba(255,255,255,0.05)]" />
            )}
            <p className="text-3xl sm:text-6xl font-black tracking-[-0.04em] gradient-text">
              <AnimatedCounter
                value={metric.value}
                suffix={metric.suffix}
                prefix={metric.prefix}
                decimals={metric.value % 1 !== 0 ? 1 : 0}
              />
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#a1a1aa] mt-1 sm:mt-2">{metric.label}</p>
            <p className="text-[10px] sm:text-xs text-[#52525b] mt-0.5 sm:mt-1 hidden sm:block">{metric.description}</p>
          </motion.div>
        ))}
      </motion.div>
      <GradientLine direction="horizontal" className="opacity-30 mt-8 sm:mt-16" />
    </section>
  );
}
