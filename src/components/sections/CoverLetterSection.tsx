"use client";
import { motion } from "framer-motion";
import { useVariant } from "@/components/providers/VariantProvider";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppButton } from "@/components/ui/AppButton";
import { fadeInUp } from "@/lib/animations";

export function CoverLetterSection() {
  const variant = useVariant();
  if (!variant) return null;

  const { coverLetter, company, role } = variant;

  return (
    <section className="py-16 px-6 lg:px-8">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <TonalCard glass shadow className="p-8 relative overflow-hidden">
          {/* Gradient left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3b82f6] via-[#a78bfa] to-[#10b981]" />

          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#52525b] mb-6">
            Specifically for {company} — {role}
          </p>

          <p className="text-[#a1a1aa] text-sm font-medium mb-4">
            {coverLetter.greeting}
          </p>

          <div className="space-y-4 mb-8">
            {coverLetter.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-[#71717a] text-sm leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <AppButton variant="gradient" size="md" as="a" href="#contact">
            {coverLetter.closingCta ?? "Let's Talk"}
          </AppButton>
        </TonalCard>
      </motion.div>
    </section>
  );
}
