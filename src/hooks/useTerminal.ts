import { useAtom } from "jotai";
import { terminalHistoryAtom } from "@/store/atoms";
import type { TerminalLine } from "@/types/terminal.types";
import {
  COMMANDS_HELP,
  WHOAMI_OUTPUT,
  LS_OUTPUT,
  EXPERIENCE_OUTPUT,
  SKILLS_OUTPUT,
  ORDERLY_DEMO_OUTPUT,
} from "@/data/terminal-commands";

let idCounter = 0;
const mkId = () => `tl-${++idCounter}-${Date.now()}`;

function mkLine(content: string, type: TerminalLine["type"]): TerminalLine {
  return { id: mkId(), type, content, timestamp: Date.now() };
}

export function useTerminal() {
  const [history, setHistory] = useAtom(terminalHistoryAtom);

  const pushLines = (lines: string[], type: TerminalLine["type"] = "output") => {
    setHistory((prev) => [
      ...prev,
      ...lines.map((l) => mkLine(l, type)),
    ]);
  };

  const execute = (raw: string) => {
    const cmd = raw.trim().toLowerCase();

    // Push input line
    setHistory((prev) => [...prev, mkLine(`$ ${raw}`, "input")]);

    switch (cmd) {
      case "help":
        pushLines(COMMANDS_HELP, "info");
        break;
      case "whoami":
        pushLines(WHOAMI_OUTPUT, "output");
        break;
      case "ls":
        pushLines(LS_OUTPUT, "output");
        break;
      case "show-experience":
        pushLines(EXPERIENCE_OUTPUT, "output");
        break;
      case "show-skills":
        pushLines(SKILLS_OUTPUT, "output");
        break;
      case "run-orderly-demo":
        pushLines(ORDERLY_DEMO_OUTPUT, "success");
        break;
      case "clear":
        setHistory([]);
        break;
      case "":
        break;
      default:
        pushLines([`command not found: ${cmd}`, 'Type "help" for available commands.'], "error");
    }
  };

  return { history, execute };
}
