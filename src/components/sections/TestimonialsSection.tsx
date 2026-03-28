"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { TESTIMONIALS } from "@/data/testimonials";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonials" className="py-32 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Social Proof"
          title="What People Say"
          centered
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 grid md:grid-cols-2 gap-5"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.id} variants={staggerItem}>
              <TonalCard glass shadow className="p-6 relative">
                <span className="absolute top-4 right-5 text-5xl font-black text-[#222228] select-none leading-none">
                  &ldquo;
                </span>

                <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  {t.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover border border-[rgba(255,255,255,0.06)]"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#1a1a1f] flex items-center justify-center text-sm font-bold gradient-text">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#f4f4f5]">{t.name}</p>
                    <p className="text-xs text-[#52525b]">{t.role} · {t.company}</p>
                  </div>
                </div>
              </TonalCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
