import { cn } from "@/lib/cn";

interface AnimatedGradientOverlayProps {
  className?: string;
}

export function AnimatedGradientOverlay({ className }: AnimatedGradientOverlayProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none animated-gradient-bg", className)}
    />
  );
}
