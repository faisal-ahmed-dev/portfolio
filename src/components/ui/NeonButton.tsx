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
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-6 py-3 text-base",
    size === "lg" && "px-8 py-4 text-lg",
    variant === "primary" &&
      "bg-gradient-to-r from-[#00F0FF] to-[#7B2CBF] text-black hover:opacity-90 hover:scale-105 neon-glow-cyan",
    variant === "secondary" &&
      "glass neon-border-cyan text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:scale-105",
    variant === "ghost" &&
      "text-[#888] hover:text-[#00F0FF] hover:bg-[#00F0FF]/5",
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
