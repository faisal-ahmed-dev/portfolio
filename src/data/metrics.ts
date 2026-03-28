import type { Metric } from "@/types/portfolio.types";

export const METRICS: Metric[] = [
  {
    id: "clients",
    label: "Live Clients Served",
    value: 1400,
    suffix: "+",
    description: "Restaurants across Orderly product suite",
  },
  {
    id: "products",
    label: "Products Shipped",
    value: 6,
    suffix: "",
    description: "POS · QR E-Menu · KDS · Feedback · Reports · Printer SDK",
  },
  {
    id: "customers",
    label: "End Customers",
    value: 300,
    suffix: "+",
    description: "dHealth pharma e-commerce in production",
  },
  {
    id: "experience",
    label: "Years of Experience",
    value: 2,
    suffix: "+",
    description: "Production engineering since Feb 2024",
  },
];
