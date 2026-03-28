"use client";
import { useAtom } from "jotai";
import { announcementDismissedAtom } from "@/store/atoms";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO } from "@/data/portfolio";

export function AnnouncementBar() {
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
          <div className="bg-gradient-to-r from-[#8B5CF6]/8 via-[#7C3AED]/5 to-[#8B5CF6]/8 border-b border-[#8B5CF6]/15">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              <p className="text-sm text-[#A0A0A0]">
                <span className="text-[#A78BFA] font-medium">{PORTFOLIO.availability}</span>
                {" — "}
                <a href="#contact" className="underline underline-offset-2 hover:text-[#A78BFA] transition-colors">
                  Let&apos;s talk ↗
                </a>
              </p>
              <button
                onClick={() => setDismissed(true)}
                className="absolute right-4 text-[#555] hover:text-white transition-colors"
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
