"use client";
import { motion } from "framer-motion";
import { TECH_CATEGORIES } from "@/data/techStack";

export function TechStack() {
  return (
    <section id="tech" className="py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-4">
        {TECH_CATEGORIES.map((cat) => (
          <div key={cat.label} className="flex items-center gap-5">
            <span className="shrink-0 w-24 text-[10px] font-mono tracking-widest uppercase text-[#3f3f46]">
              {cat.label}
            </span>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {cat.techs.map((tech) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ scale: 1.04 }}
                  className="shrink-0 px-3 py-1 rounded-full text-xs font-mono bg-[#131316] text-[#a1a1aa] ghost-border hover:bg-[#1a1a1f] hover:text-[#f4f4f5] transition-all duration-200 cursor-default inline-flex items-center gap-1.5"
                >
                  {tech.icon && <tech.icon className="w-3.5 h-3.5" />}
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
