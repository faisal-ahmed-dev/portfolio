"use client";
import { Provider as JotaiProvider } from "jotai";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
