"use client";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useInView } from "@/hooks/useInView";
import { useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useAnimatedCounter(inView ? value : 0, { decimals });

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
