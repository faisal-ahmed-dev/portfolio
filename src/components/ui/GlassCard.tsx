import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  neon?: "violet" | "none";
  elevated?: boolean;
}

export function GlassCard({ className, neon = "none", elevated = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl",
        elevated && "bg-[#1C1C28]/80",
        neon === "violet" && "violet-border",
        className
      )}
      {...props}
    />
  );
}
