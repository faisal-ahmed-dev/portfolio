"use client";
import { useAtom } from "jotai";
import { announcementDismissedAtom } from "@/store/atoms";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "@/hooks/useVariantData";

export function AnnouncementBar() {
  const PORTFOLIO = usePortfolioData();
  const [dismissed, setDismissed] = useAtom(announcementDismissedAtom);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative z-50 overflow-hidden"
        >
          <div className="bg-[#0c0c0f] border-b border-[rgba(255,255,255,0.05)]">
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm text-[#a1a1aa]">
                <span className="text-[#60a5fa] font-medium">{PORTFOLIO.availability}</span>
                {" — "}
                <a
                  href="#contact"
                  className="underline underline-offset-2 hover:text-[#f4f4f5] transition-colors"
                >
                  Let&apos;s talk ↗
                </a>
              </p>
              <button
                onClick={() => setDismissed(true)}
                className="absolute right-6 text-[#3f3f46] hover:text-[#f4f4f5] transition-colors"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
