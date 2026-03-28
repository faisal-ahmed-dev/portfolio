"use client";
import { motion } from "framer-motion";
import { Monitor, Server, Smartphone, Layers } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { useServices } from "@/hooks/useVariantData";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Smartphone,
  Layers,
};

export function ServicesSection() {
  const services = useServices();
  return (
    <section id="services" className="py-32 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="What I Do"
          title="Services"
          description="End-to-end product engineering — from pixel-perfect UIs to scalable backend services and mobile apps."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 grid md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Monitor;
            return (
              <motion.div key={service.id} variants={staggerItem}>
                <TonalCard hover shadow ghostBorder className="p-6 h-full group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-[#1a1a1f] flex items-center justify-center group-hover:bg-[#222228] transition-colors">
                      <Icon size={18} className="text-[#a1a1aa] group-hover:text-[#60a5fa] transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-[#f4f4f5] font-bold text-base tracking-tight">{service.title}</h3>
                    </div>
                  </div>

                  <p className="text-[#a1a1aa] text-sm leading-relaxed mb-5">{service.description}</p>

                  <ul className="space-y-2">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2.5 text-sm text-[#52525b]">
                        <span className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </TonalCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
