"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { AppButton } from "@/components/ui/AppButton";
import { PORTFOLIO } from "@/data/portfolio";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 glass-float"
    >
      {/* Gradient bottom border on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(to right, transparent, #3b82f6 40%, #10b981 60%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-mono text-sm gradient-text hover:opacity-80 transition-opacity tracking-tight font-bold"
        >
          {PORTFOLIO.name}
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#52525b] hover:text-[#f4f4f5] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <AppButton variant="primary" size="sm" as="a" href="#contact">
            Hire Me ↗
          </AppButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#52525b] hover:text-[#f4f4f5] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-float border-t border-[rgba(255,255,255,0.05)] px-6 py-4 flex flex-col gap-3 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors py-1 text-sm"
            >
              {link.label}
            </a>
          ))}
          <AppButton variant="primary" size="sm" as="a" href="#contact" className="mt-2 w-full">
            Hire Me ↗
          </AppButton>
        </motion.div>
      )}
    </motion.nav>
  );
}
