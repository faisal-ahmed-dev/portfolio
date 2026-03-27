import { atom } from "jotai";
import type { TerminalLine } from "@/types/terminal.types";

// ── Boot ──────────────────────────────────────────────────────────
export const bootCompletedAtom = atom(false);

// ── UI ────────────────────────────────────────────────────────────
export const announcementDismissedAtom = atom(false);
export const simulatorTabAtom = atom<"pos" | "form-builder">("pos");

// ── Terminal ──────────────────────────────────────────────────────
export const terminalHistoryAtom = atom<TerminalLine[]>([]);

// ── POS Simulator ─────────────────────────────────────────────────
export interface POSItem {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
}

export interface POSOrderItem {
  item: POSItem;
  qty: number;
}

export const posOrderAtom = atom<POSOrderItem[]>([]);

export const posTotalAtom = atom((get) => {
  const order = get(posOrderAtom);
  return order.reduce((sum, { item, qty }) => sum + item.price * qty, 0);
});

// ── Form Builder ──────────────────────────────────────────────────
export type FieldType = "text" | "email" | "number" | "select" | "checkbox" | "textarea";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
}

export const formFieldsAtom = atom<FormField[]>([
  { id: "f1", type: "text", label: "Full Name", placeholder: "John Doe", required: true },
  { id: "f2", type: "email", label: "Email Address", placeholder: "you@example.com", required: true },
  { id: "f3", type: "textarea", label: "Feedback", placeholder: "Tell us what you think...", required: false },
]);
