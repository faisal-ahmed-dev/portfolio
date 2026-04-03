import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { loadDataOverrides } from "@/data/overrides";

export const revalidate = 60;

export default async function Home() {
  const overrides = await loadDataOverrides();
  return <PortfolioPage variant={null} dataOverrides={overrides} />;
}
