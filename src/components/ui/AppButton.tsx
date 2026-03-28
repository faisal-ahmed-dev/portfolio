"use client";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export function AppButton({
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
}: AppButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none",
    size === "sm" && "px-4 py-2 text-sm rounded-lg",
    size === "md" && "px-6 py-3 text-base rounded-lg",
    size === "lg" && "px-7 py-3.5 text-base rounded-lg",
    variant === "primary" &&
      "bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-lg shadow-blue-500/20",
    variant === "secondary" &&
      "bg-transparent text-[#60a5fa] ghost-border hover:bg-[rgba(59,130,246,0.08)]",
    variant === "ghost" &&
      "text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[rgba(255,255,255,0.04)]",
    variant === "gradient" &&
      "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-emerald-500/20",
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
