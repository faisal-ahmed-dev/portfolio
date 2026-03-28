"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { PRINCIPLES } from "@/data/principles";
import { staggerContainer, staggerItem } from "@/lib/animations";

const SOLID_IDS = ["srp", "ocp", "lsp", "isp", "dip"];

const solidPrinciples = PRINCIPLES.filter((p) => SOLID_IDS.includes(p.id));
const otherPrinciples = PRINCIPLES.filter((p) => !SOLID_IDS.includes(p.id));

function PrincipleCard({ principle }: { principle: (typeof PRINCIPLES)[0] }) {
  return (
    <motion.div variants={staggerItem}>
      <TonalCard hover shadow className="p-5 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-4">
          <div className="shrink-0 w-9 h-9 rounded-xl bg-[#1a1a1f] flex items-center justify-center">
            <span className="text-[10px] font-black gradient-text">
              {principle.acronym}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-[#f4f4f5] font-bold text-sm">
              {principle.title}
            </h3>
            <p className="text-[#52525b] text-[11px] mt-1 leading-relaxed line-clamp-2">
              {principle.description}
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <CodeBlock code={principle.codeSnippet} language={principle.language} />
        </div>
      </TonalCard>
    </motion.div>
  );
}

export function PrinciplesShowcase() {
  return (
    <section id="principles" className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Engineering Principles"
          title="Code I'm Proud Of"
          description="SOLID, DRY, and Clean Architecture aren't buzzwords — they're patterns I apply daily in production."
        />

        {/* SOLID Principles */}
        <div className="mt-14">
          <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#3f3f46] mb-6">
            SOLID Principles
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          >
            {solidPrinciples.map((principle) => (
              <PrincipleCard key={principle.id} principle={principle} />
            ))}
          </motion.div>
        </div>

        {/* Architecture & Patterns */}
        <div className="mt-16">
          <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#3f3f46] mb-6">
            Architecture &amp; Patterns
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {otherPrinciples.map((principle) => (
              <PrincipleCard key={principle.id} principle={principle} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
