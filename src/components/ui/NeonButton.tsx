"use client";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export function NeonButton({
  className,
  variant = "primary",
  size = "md",
  children,
  as: Component = "button",
  href,
  target,
  rel,
  download,
  ...props
}: NeonButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none",
    size === "sm" && "px-4 py-2 text-sm rounded-lg",
    size === "md" && "px-6 py-3 text-base rounded-full",
    size === "lg" && "px-8 py-4 text-lg rounded-full",
    variant === "primary" &&
      "bg-white text-black hover:bg-white/90 hover:scale-105",
    variant === "secondary" &&
      "glass violet-border text-[#A78BFA] hover:bg-[#8B5CF6]/10 hover:scale-105",
    variant === "ghost" &&
      "text-[#6B7280] hover:text-[#A78BFA] hover:bg-[#8B5CF6]/5 rounded-lg",
    className
  );

  if (Component === "a" || href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(props as Parameters<typeof motion.button>[0])}
    >
      {children}
    </motion.button>
  );
}
