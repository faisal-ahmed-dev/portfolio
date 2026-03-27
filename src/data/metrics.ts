import type { Metric } from "@/types/portfolio.types";

export const METRICS: Metric[] = [
  {
    id: "customers",
    label: "Production Customers",
    value: 300,
    suffix: "+",
    description: "dHealth pharma e-commerce in production",
  },
  {
    id: "components",
    label: "Components Built",
    value: 112,
    suffix: "+",
    description: "Components in Orderly POS alone",
  },
  {
    id: "lines",
    label: "Lines of Type-Safe Code",
    value: 60,
    suffix: "k+",
    description: "QR Ordering System codebase",
  },
  {
    id: "experience",
    label: "Years of Experience",
    value: 2,
    suffix: "+",
    description: "Production engineering since Feb 2024",
  },
];
