"use client";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { CERTIFICATIONS } from "@/data/certifications";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function CertificationsSection() {
  if (CERTIFICATIONS.length === 0) return null;

  return (
    <section id="certifications" className="py-32 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Credentials"
          title="Certifications"
          centered
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.div key={cert.id} variants={staggerItem}>
              <TonalCard glass shadow className="p-5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a1f] flex items-center justify-center shrink-0">
                    <Award size={14} className="text-[#a78bfa]" />
                  </div>
                  <span className="text-[10px] text-[#52525b] uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                </div>

                <h3 className="text-[#f4f4f5] font-semibold text-sm leading-snug mb-2 flex-1">
                  {cert.title}
                </h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] text-[#52525b] bg-[#1a1a1f] px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-[10px] text-[#3f3f46] mt-auto">
                  {cert.date}
                  {cert.credentialId && ` · ID: ${cert.credentialId}`}
                </p>
              </TonalCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
