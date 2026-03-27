import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  neon?: "cyan" | "indigo" | "none";
  elevated?: boolean;
}

export function GlassCard({ className, neon = "none", elevated = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl",
        elevated && "bg-[#1E1E1E]/80",
        neon === "cyan" && "neon-border-cyan",
        neon === "indigo" && "neon-border-indigo",
        className
      )}
      {...props}
    />
  );
}
