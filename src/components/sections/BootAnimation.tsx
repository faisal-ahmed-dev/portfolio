"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useBootSequence } from "@/hooks/useBootSequence";

export function BootAnimation() {
  const { visibleLines, progress, isExiting } = useBootSequence();

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0A0A0F] flex flex-col items-center justify-center p-8"
        >
          <div className="relative z-10 w-full max-w-xl font-mono">
            {/* ASCII border */}
            <div className="text-[#8B5CF6]/40 text-xs mb-6 leading-5 hidden sm:block">
              {`╔${"═".repeat(50)}╗`}
              <br />
              {`║   PORTFOLIO OS v2.0  ·  Faisal Ahmed${" ".repeat(13)}║`}
              <br />
              {`╚${"═".repeat(50)}╝`}
            </div>

            {/* Lines */}
            <div className="space-y-1 min-h-[220px]">
              {visibleLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    line.type === "title"
                      ? "text-white font-bold text-sm"
                      : line.type === "final"
                      ? "text-[#A78BFA] font-bold text-sm violet-text-glow mt-2"
                      : "text-[#7C6FA0] text-xs"
                  }
                >
                  {line.text}
                </motion.p>
              ))}
            </div>

            {/* Progress bar */}
            {progress > 0 && (
              <div className="mt-6">
                <div className="h-1 bg-[#1C1C28] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
                <p className="text-xs text-[#555] mt-2 font-mono">{Math.round(progress)}% loaded</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
