import type { Metric } from "@/types/portfolio.types";

export const METRICS: Metric[] = [
  {
    id: "restaurants",
    label: "Restaurants Live",
    value: 300,
    suffix: "+",
    description: "Restaurants running Orderly POS in production",
  },
  {
    id: "uptime",
    label: "System Uptime",
    value: 99.9,
    suffix: "%",
    description: "Average uptime across production deployments",
  },
  {
    id: "components",
    label: "Components Shipped",
    value: 40,
    suffix: "+",
    description: "Reusable components in the design system",
  },
  {
    id: "experience",
    label: "Years at 3S",
    value: 2,
    suffix: " yrs",
    description: "Building production systems at 3S",
  },
];
