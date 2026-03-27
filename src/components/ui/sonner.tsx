"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:glass group-[.toaster]:neon-border-cyan group-[.toaster]:text-[#E0E0E0] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#888]",
          actionButton:
            "group-[.toast]:bg-gradient-to-r group-[.toast]:from-[#00F0FF] group-[.toast]:to-[#7B2CBF] group-[.toast]:text-black",
          cancelButton:
            "group-[.toast]:bg-[#1E1E1E] group-[.toast]:text-[#888]",
          success: "group-[.toast]:text-[#4ADE80]",
          error: "group-[.toast]:text-[#FF6B6B]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
