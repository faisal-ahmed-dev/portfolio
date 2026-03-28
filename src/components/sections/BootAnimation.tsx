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
          className="fixed inset-0 z-[100] bg-[#09090b] flex flex-col items-center justify-center p-8"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[80px] bg-[rgba(59,130,246,0.04)]" />
          </div>

          <div className="relative z-10 w-full max-w-xl font-mono">
            <div className="text-[#3f3f46] text-xs mb-6 leading-5 hidden sm:block">
              {`╔${"═".repeat(50)}╗`}
              <br />
              {`║   PORTFOLIO OS v2.0  ·  Faisal Ahmed${" ".repeat(13)}║`}
              <br />
              {`╚${"═".repeat(50)}╝`}
            </div>

            <div className="space-y-1 min-h-[220px]">
              {visibleLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    line.type === "title"
                      ? "text-[#f4f4f5] font-bold text-sm"
                      : line.type === "final"
                      ? "gradient-text font-bold text-sm mt-2"
                      : "text-[#52525b] text-xs"
                  }
                >
                  {line.text}
                </motion.p>
              ))}
            </div>

            {progress > 0 && (
              <div className="mt-6">
                <div className="h-px bg-[#131316] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{
                      background: "linear-gradient(to right, #3b82f6, #10b981)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
                <p className="text-[10px] text-[#3f3f46] mt-2 font-mono">{Math.round(progress)}% loaded</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
