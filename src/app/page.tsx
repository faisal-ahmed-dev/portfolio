import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { loadDataOverrides } from "@/data/overrides";

export const revalidate = 60;

export default function Home() {
  const overrides = loadDataOverrides();
  return <PortfolioPage variant={null} dataOverrides={overrides} />;
}
