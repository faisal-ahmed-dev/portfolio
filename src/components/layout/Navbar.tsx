"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { NeonButton } from "@/components/ui/NeonButton";
import { PORTFOLIO } from "@/data/portfolio";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "glass-navbar" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
                className="text-sm text-[#888] hover:text-[#00F0FF] transition-colors duration-200"
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

          {/* Mobile menu */}
          <button
            className="md:hidden text-[#888] hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-navbar border-t border-white/5"
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#888] hover:text-[#00F0FF] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <NeonButton variant="secondary" size="sm" as="a" href="#contact" className="mt-2 w-full">
              Hire Me ↗
            </NeonButton>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
