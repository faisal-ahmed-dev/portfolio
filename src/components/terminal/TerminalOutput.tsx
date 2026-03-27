import { cn } from "@/lib/cn";
import type { TerminalLine } from "@/types/terminal.types";

interface TerminalOutputProps {
  lines: TerminalLine[];
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {lines.map((line) => (
        <p
          key={line.id}
          className={cn(
            "text-xs leading-5 font-mono whitespace-pre",
            line.type === "input" && "text-[#00F0FF]",
            line.type === "output" && "text-[#C0C0C0]",
            line.type === "error" && "text-[#FF6B6B]",
            line.type === "success" && "text-[#4ADE80]",
            line.type === "info" && "text-[#888]"
          )}
        >
          {line.content}
        </p>
      ))}
    </div>
  );
}
