import { cn } from "@/lib/cn";

interface AppBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "status";
  className?: string;
}

export function AppBadge({ children, variant = "default", className }: AppBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "default" && "bg-[#1a1a1f] text-[#a1a1aa]",
        variant === "accent" && "bg-[rgba(59,130,246,0.12)] text-[#60a5fa] border border-[rgba(59,130,246,0.2)]",
        variant === "status" && "bg-[rgba(52,211,153,0.12)] text-emerald-400",
        className
      )}
    >
      {variant === "status" && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      )}
      {children}
    </span>
  );
}
