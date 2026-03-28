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
      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#52525b] mb-3 font-mono">
        {eyebrow}
      </p>
      <h2 className="text-5xl md:text-6xl font-bold text-[#f4f4f5] mb-4 tracking-[-0.04em]">
        {title}
      </h2>
      {description && (
        <p className="text-[#a1a1aa] text-lg max-w-3xl leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
