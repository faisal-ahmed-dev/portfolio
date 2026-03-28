"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { PRINCIPLES } from "@/data/principles";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { SectionGlow } from "@/components/background/SectionGlow";

export function PrinciplesShowcase() {
  return (
    <section id="principles" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <SectionGlow intensity="subtle" position="top" />
      <div className="relative z-10 max-w-7xl mx-auto">
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
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {PRINCIPLES.map((principle) => (
            <motion.div key={principle.id} variants={staggerItem}>
              <GlassCard
                neon="violet"
                className="p-5 flex flex-col h-full"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/10 flex items-center justify-center border border-[#8B5CF6]/20">
                    <span className="text-[10px] font-black text-[#A78BFA]">{principle.acronym}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-sm">{principle.title}</h3>
                    <p className="text-[#666] text-[11px] mt-1 leading-relaxed line-clamp-2">{principle.description}</p>
                  </div>
                </div>

                {/* Code */}
                <div className="flex-1 min-h-0">
                  <CodeBlock code={principle.codeSnippet} language={principle.language} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
