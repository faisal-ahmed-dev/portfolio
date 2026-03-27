"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { NeonButton } from "@/components/ui/NeonButton";
import { PORTFOLIO } from "@/data/portfolio";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 px-4 py-3"
    >
      <div className="glass-float-nav max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="text-white font-bold text-lg tracking-tight">
          <span className="gradient-text">{PORTFOLIO.name}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#888] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <NeonButton
            variant="secondary"
            size="sm"
            as="a"
            href="#contact"
          >
            Hire Me ↗
          </NeonButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#888] hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-float-nav max-w-6xl mx-auto mt-2 px-4 py-4 flex flex-col gap-3 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#888] hover:text-white transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <NeonButton variant="secondary" size="sm" as="a" href="#contact" className="mt-2 w-full">
            Hire Me ↗
          </NeonButton>
        </motion.div>
      )}
    </motion.nav>
  );
}
