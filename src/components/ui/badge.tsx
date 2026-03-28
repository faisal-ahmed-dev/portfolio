import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#8B5CF6] text-white",
        secondary: "border-transparent bg-[#1C1C28] text-[#C0C0C0] hover:bg-[#252535]",
        destructive: "border-transparent bg-[#FF4444] text-white",
        outline: "border-[#8B5CF6]/30 text-[#A78BFA] bg-[#8B5CF6]/10",
        muted: "border-white/10 text-[#888] bg-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
