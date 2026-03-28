"use client";
import { createContext, useContext } from "react";
import type { DataOverrides } from "@/types/portfolio.types";

const DataOverrideContext = createContext<DataOverrides>({});

export const useDataOverrides = () => useContext(DataOverrideContext);

export function DataOverrideProvider({
  overrides,
  children,
}: {
  overrides: DataOverrides;
  children: React.ReactNode;
}) {
  return <DataOverrideContext value={overrides}>{children}</DataOverrideContext>;
}
