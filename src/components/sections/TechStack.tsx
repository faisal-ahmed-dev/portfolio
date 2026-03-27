"use client";
import { motion } from "framer-motion";
import { TECH_CATEGORIES } from "@/data/techStack";

export function TechStack() {
  return (
    <section id="tech" className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {TECH_CATEGORIES.map((cat) => (
          <div key={cat.label} className="flex items-center gap-4">
            <span className="shrink-0 w-24 text-xs font-bold tracking-widest uppercase text-[#555]">
              {cat.label}
            </span>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {cat.techs.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="shrink-0 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-[#aaa] hover:border-[#00F0FF]/40 hover:text-[#00F0FF] transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
