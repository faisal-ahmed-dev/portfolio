"use client";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { fadeInUp } from "@/lib/animations";

export function NeonTerminal() {
  return (
    <section id="terminal" className="py-32 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="Interactive"
          title="Terminal"
          description="Explore my background through a real CLI. Type commands to learn about my experience, skills, and projects."
          centered
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <TonalCard glass shadow className="overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#131316] border-b border-[rgba(255,255,255,0.05)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex items-center gap-2 text-xs text-[#52525b] font-mono">
                <Terminal size={12} />
                portfolio — bash
              </div>
            </div>
            <TerminalWindow />
          </TonalCard>
        </motion.div>
      </div>
    </section>
  );
}
