"use client";
import { motion } from "framer-motion";
import { Mail, GitFork, Link, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { PORTFOLIO } from "@/data/portfolio";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { toast } from "sonner";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Build Something"
          description="Open to remote full-time roles, contract projects, and consulting. If you have a complex problem, let's talk."
          centered
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Mail, label: "Email", value: PORTFOLIO.email, href: `mailto:${PORTFOLIO.email}`, isEmail: true },
            { icon: GitFork, label: "GitHub", value: "github.com/faisalahmed", href: PORTFOLIO.github, isEmail: false },
            { icon: Link, label: "LinkedIn", value: "in/faisalahmed", href: PORTFOLIO.linkedin, isEmail: false },
          ].map(({ icon: Icon, label, value, href, isEmail }) => (
            <motion.div key={label} variants={staggerItem}>
              <GlassCard neon="cyan" className="p-5 group hover:scale-105 transition-transform cursor-pointer">
                {isEmail ? (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(PORTFOLIO.email);
                      toast.success("Email copied to clipboard!");
                    }}
                    className="flex flex-col items-center gap-2 w-full"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00F0FF]/10 flex items-center justify-center">
                      <Icon size={18} className="text-[#00F0FF]" />
                    </div>
                    <p className="text-xs text-[#888]">{label}</p>
                    <p className="text-xs text-white font-medium text-center break-all">{value}</p>
                  </button>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#00F0FF]/10 flex items-center justify-center">
                      <Icon size={18} className="text-[#00F0FF]" />
                    </div>
                    <p className="text-xs text-[#888]">{label}</p>
                    <p className="text-xs text-white font-medium text-center break-all">{value}</p>
                  </a>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10"
        >
          <NeonButton variant="primary" size="lg" as="a" href={`mailto:${PORTFOLIO.email}`}>
            Send Me an Email <ArrowRight size={18} />
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
}
