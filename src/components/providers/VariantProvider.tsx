"use client";
import { createContext, useContext } from "react";
import type { JobVariant } from "@/types/portfolio.types";

const VariantContext = createContext<JobVariant | null>(null);

export const useVariant = () => useContext(VariantContext);

export function VariantProvider({
  variant,
  children,
}: {
  variant: JobVariant | null;
  children: React.ReactNode;
}) {
  return <VariantContext value={variant}>{children}</VariantContext>;
}
