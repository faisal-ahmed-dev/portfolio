"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { PRINCIPLES } from "@/data/principles";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function PrinciplesShowcase() {
  return (
    <section id="principles" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Engineering Principles"
          title="Code I'm Proud Of"
          description="SOLID, DRY, and Clean Architecture aren't buzzwords — they're patterns I apply daily in production."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex gap-4 overflow-x-auto scrollbar-none pb-4"
        >
          {PRINCIPLES.map((principle) => (
            <motion.div key={principle.id} variants={staggerItem} className="shrink-0 w-80">
              <GlassCard
                neon={principle.color === "cyan" ? "cyan" : principle.color === "indigo" ? "indigo" : "cyan"}
                className="p-6 h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F0FF]/20 to-[#7B2CBF]/20 flex items-center justify-center border border-white/10">
                    <span className="text-xs font-black gradient-text">{principle.acronym}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{principle.title}</h3>
                    <p className="text-[#888] text-xs mt-1 leading-relaxed">{principle.description}</p>
                  </div>
                </div>
                <CodeBlock code={principle.codeSnippet} language={principle.language} />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
