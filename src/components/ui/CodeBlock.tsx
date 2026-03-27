"use client";
import { cn } from "@/lib/cn";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "typescript", className }: CodeBlockProps) {
  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0D0D0D] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-xs text-[#555] ml-2 font-mono">{language}</span>
      </div>
      <pre className="p-4 text-sm font-mono leading-relaxed overflow-x-auto bg-[#0D0D0D] text-[#E0E0E0]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
