"use client";
import { useState, type KeyboardEvent } from "react";

interface TerminalInputProps {
  onExecute: (cmd: string) => void;
}

export function TerminalInput({ onExecute }: TerminalInputProps) {
  const [value, setValue] = useState("");

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onExecute(value);
      setValue("");
    }
  };

  return (
    <div className="flex items-center gap-2 mt-3 border-t border-white/5 pt-3">
      <span className="text-[#00F0FF] text-xs font-mono shrink-0">visitor@portfolio:~$</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        className="flex-1 bg-transparent text-[#E0E0E0] text-xs font-mono outline-none placeholder-[#444]"
        placeholder='type "help"...'
        autoComplete="off"
        spellCheck={false}
        aria-label="Terminal input"
      />
    </div>
  );
}
