import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface TonalCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "container" | "elevated";
  hover?: boolean;
  ghostBorder?: boolean;
  glass?: boolean;
  shadow?: boolean;
}

export function TonalCard({
  className,
  variant = "container",
  hover = false,
  ghostBorder = false,
  glass = false,
  shadow = false,
  ...props
}: TonalCardProps) {
  return (
    <div
      className={cn(
        glass
          ? "glass-card"
          : [
              variant === "surface" && "tonal-card-surface",
              variant === "container" && (hover ? "tonal-card-hover" : "tonal-card"),
              variant === "elevated" && "tonal-card-elevated",
            ],
        ghostBorder && "ghost-border",
        shadow && "shadow-card",
        !glass && !hover && "rounded-2xl",
        className
      )}
      {...props}
    />
  );
}
