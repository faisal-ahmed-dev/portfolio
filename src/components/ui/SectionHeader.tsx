"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({ eyebrow, title, description, centered = false }: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={centered ? "text-center" : ""}
    >
      <p className="text-xs font-bold tracking-[0.2em] uppercase gradient-text mb-3">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h2>
      {description && (
        <p className="text-[#888] text-lg max-w-2xl leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
