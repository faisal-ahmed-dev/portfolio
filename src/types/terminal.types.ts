export type TerminalOutputType = "input" | "output" | "error" | "success" | "info";

export interface TerminalLine {
  id: string;
  type: TerminalOutputType;
  content: string;
  timestamp: number;
}

export interface TerminalCommand {
  name: string;
  description: string;
  handler: () => string | string[];
}
