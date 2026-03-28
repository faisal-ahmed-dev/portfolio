import { cn } from "@/lib/cn";

interface GradientLineProps {
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function GradientLine({ direction = "horizontal", className }: GradientLineProps) {
  return (
    <div
      className={cn(
        direction === "horizontal" ? "gradient-line-h w-full" : "gradient-line-v h-full",
        className
      )}
    />
  );
}
