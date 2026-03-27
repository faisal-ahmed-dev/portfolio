"use client";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { fadeInUp } from "@/lib/animations";

export function NeonTerminal() {
  return (
    <section id="terminal" className="py-24 px-4 sm:px-6 lg:px-8">
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
          <GlassCard neon="cyan" className="overflow-hidden scanline">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0D0D0D] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex items-center gap-2 text-xs text-[#555] font-mono">
                <Terminal size={12} />
                portfolio — bash
              </div>
            </div>
            <TerminalWindow />
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
