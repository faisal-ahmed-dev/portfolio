import { cn } from "@/lib/cn";

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "indigo" | "muted";
  className?: string;
}

export function NeonBadge({ children, variant = "muted", className }: NeonBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
        variant === "cyan" && "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30",
        variant === "indigo" && "bg-[#7B2CBF]/15 text-[#B97FE0] border border-[#7B2CBF]/40",
        variant === "muted" && "bg-white/5 text-[#888] border border-white/10",
        className
      )}
    >
      {children}
    </span>
  );
}
