import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";
import { bootCompletedAtom } from "@/store/atoms";

export interface BootLine {
  text: string;
  type: "info" | "success" | "title" | "final";
  delay: number;
}

const BOOT_LINES: BootLine[] = [
  { text: "INITIALIZING PORTFOLIO OS v2.0...", type: "title", delay: 200 },
  { text: "> Loading modules... [OK]", type: "success", delay: 400 },
  { text: "> React 19 Compiler mounted... [OK]", type: "success", delay: 600 },
  { text: "> Jotai state engine online... [OK]", type: "success", delay: 800 },
  { text: "> Building Orderly POS demo... [OK]", type: "success", delay: 1000 },
  { text: "> Feedback SaaS simulator ready... [OK]", type: "success", delay: 1200 },
  { text: "> Injecting neon aesthetics... [OK]", type: "success", delay: 1400 },
  { text: 'SYSTEM READY. Welcome, Faisal.', type: "final", delay: 1800 },
];

export function useBootSequence() {
  const [visibleLines, setVisibleLines] = useState<BootLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const setBootCompleted = useSetAtom(bootCompletedAtom);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
        }, line.delay)
      );
    });

    // Progress bar fills 0→100% from 2200ms
    timers.push(setTimeout(() => {
      let p = 0;
      const interval = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 100) clearInterval(interval);
      }, 10);
      timers.push(interval as unknown as ReturnType<typeof setTimeout>);
    }, 2200));

    // Exit at 2700ms
    timers.push(setTimeout(() => {
      setIsExiting(true);
    }, 2700));

    // Set boot completed after exit animation
    timers.push(setTimeout(() => {
      setBootCompleted(true);
    }, 3300));

    return () => timers.forEach(clearTimeout);
  }, [setBootCompleted]);

  return { visibleLines, progress, isExiting };
}
