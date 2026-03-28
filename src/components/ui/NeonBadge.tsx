import { cn } from "@/lib/cn";

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: "violet" | "muted";
  className?: string;
}

export function NeonBadge({ children, variant = "muted", className }: NeonBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
        variant === "violet" && "bg-[#8B5CF6]/10 text-[#A78BFA] border border-[#8B5CF6]/25",
        variant === "muted" && "bg-white/5 text-[#888] border border-white/10",
        className
      )}
    >
      {children}
    </span>
  );
}
