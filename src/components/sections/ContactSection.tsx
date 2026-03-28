"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Download } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { PORTFOLIO } from "@/data/portfolio";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { SectionGlow } from "@/components/background/SectionGlow";
import { toast } from "sonner";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <SectionGlow intensity="strong" position="both" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Build Something"
          description="Open to KSA full-time roles, contract projects, and consulting. Iqama sponsorship welcome. If you have a complex problem, let's talk."
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
            { icon: GithubIcon, label: "GitHub", value: "faisal-ahmed-dev", href: PORTFOLIO.github, isEmail: false },
            { icon: LinkedinIcon, label: "LinkedIn", value: "in/faisal-ahmed-dev", href: PORTFOLIO.linkedin, isEmail: false },
          ].map(({ icon: Icon, label, value, href, isEmail }) => (
            <motion.div key={label} variants={staggerItem}>
              <GlassCard neon="violet" className="p-5 group hover:scale-105 transition-transform cursor-pointer">
                {isEmail ? (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(PORTFOLIO.email);
                      toast.success("Email copied to clipboard!");
                    }}
                    className="flex flex-col items-center gap-2 w-full"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
                      <Icon size={18} className="text-[#A78BFA]" />
                    </div>
                    <p className="text-xs text-[#888]">{label}</p>
                    <p className="text-xs text-white font-medium text-center break-all">{value}</p>
                  </button>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#A78BFA]">
                      <Icon size={18} />
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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <NeonButton variant="primary" size="lg" as="a" href={`mailto:${PORTFOLIO.email}`}>
            Send Me an Email <ArrowRight size={18} />
          </NeonButton>
          <NeonButton variant="secondary" size="lg" as="a" href={PORTFOLIO.cvPath} download>
            <Download size={18} /> Download CV
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
}
