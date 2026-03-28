"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { PRINCIPLES } from "@/data/principles";
import { fadeInUp } from "@/lib/animations";

interface Tab {
  key: string;
  label: string;
  principleIds: string[];
}

const TABS: Tab[] = [
  { key: "solid", label: "SOLID", principleIds: ["srp", "ocp", "lsp", "isp", "dip"] },
  { key: "dry", label: "DRY", principleIds: ["dry"] },
  { key: "clean", label: "Clean Architecture", principleIds: ["clean"] },
  { key: "ddd", label: "DDD", principleIds: ["ddd"] },
  { key: "rbac", label: "RBAC", principleIds: ["rbac"] },
  { key: "offline", label: "Offline-First", principleIds: ["offline-first"] },
  { key: "soc", label: "SoC", principleIds: ["soc"] },
];

export function PrinciplesShowcase() {
  const [activeTab, setActiveTab] = useState("solid");

  const currentTab = TABS.find((t) => t.key === activeTab)!;
  const activePrinciples = PRINCIPLES.filter((p) =>
    currentTab.principleIds.includes(p.id)
  );

  return (
    <section id="principles" className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Engineering Principles"
          title="Code I'm Proud Of"
          description="SOLID, DRY, and Clean Architecture aren't buzzwords — they're patterns I apply daily in production."
        />

        {/* Tabs */}
        <div className="mt-14 flex flex-wrap gap-2 justify-center">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                relative px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300
                ${
                  activeTab === tab.key
                    ? "text-white bg-[#1a1a2e]"
                    : "text-[#52525b] hover:text-[#a1a1aa] bg-transparent"
                }
              `}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="active-principle-tab"
                  className="absolute inset-0 rounded-lg bg-[#1a1a2e] border border-[rgba(255,255,255,0.06)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-8 grid gap-6 ${
              activePrinciples.length > 1
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "max-w-3xl mx-auto"
            }`}
          >
            {activePrinciples.map((principle, i) => (
              <motion.div
                key={principle.id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.08 }}
              >
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
                      <p className="text-[#52525b] text-[11px] mt-1 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0">
                    <CodeBlock
                      code={principle.codeSnippet}
                      language={principle.language}
                    />
                  </div>
                </TonalCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
