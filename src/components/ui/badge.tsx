import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gradient-to-r from-[#00F0FF] to-[#7B2CBF] text-black",
        secondary: "border-transparent bg-[#1E1E1E] text-[#C0C0C0] hover:bg-[#2A2A2A]",
        destructive: "border-transparent bg-[#FF4444] text-white",
        outline: "border-[#00F0FF]/30 text-[#00F0FF] bg-[#00F0FF]/10",
        indigo: "border-[#7B2CBF]/40 text-[#B97FE0] bg-[#7B2CBF]/15",
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
