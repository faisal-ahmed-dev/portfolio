import type { Metric } from "@/types/portfolio.types";

export const METRICS: Metric[] = [
  {
    id: "products",
    label: "Products Built & Shipped",
    value: 6,
    suffix: "",
    description: "POS · QR E-Menu · KDS · Feedback · Reports · Printer SDK",
  },
  {
    id: "components",
    label: "Components Engineered",
    value: 112,
    suffix: "+",
    description: "Across Orderly POS alone — offline-first, production-grade",
  },
  {
    id: "scale",
    label: "Clients in Production",
    value: 1400,
    suffix: "+",
    description: "Restaurants running on systems I built",
  },
  {
    id: "experience",
    label: "Years Building in Production",
    value: 2,
    suffix: "+",
    description: "Full-time engineering since Feb 2024",
  },
];
