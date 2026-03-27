"use client";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { terminalHistoryAtom } from "@/store/atoms";
import { useTerminal } from "@/hooks/useTerminal";
import { TERMINAL_WELCOME } from "@/data/terminal-commands";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalInput } from "./TerminalInput";
import type { TerminalLine } from "@/types/terminal.types";

let idCounter = 1000;
function mkWelcomeLine(content: string): TerminalLine {
  return { id: `w-${++idCounter}`, type: "info", content, timestamp: Date.now() };
}

export function TerminalWindow() {
  const { history, execute } = useTerminal();
  const [, setHistory] = useAtom(terminalHistoryAtom);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    setHistory(TERMINAL_WELCOME.map(mkWelcomeLine));
  }, [setHistory]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed"
        style={{ maxHeight: "360px" }}
      >
        <TerminalOutput lines={history} />
      </div>
      <div className="px-4 pb-4">
        <TerminalInput onExecute={execute} />
      </div>
    </div>
  );
}
