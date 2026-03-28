import { notFound } from "next/navigation";
import { getVariant, getAllVariantSlugs } from "@/data/variants";
import { loadDataOverrides } from "@/data/overrides";
import { PortfolioPage } from "@/components/pages/PortfolioPage";

export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  return getAllVariantSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const variant = getVariant(slug);
  if (!variant) return {};
  return {
    title:
      variant.ogTitle ??
      `Faisal Ahmed — ${variant.role} for ${variant.company}`,
    description:
      variant.ogDescription ??
      `Portfolio tailored for ${variant.company}`,
    alternates: { canonical: `/for/${slug}` },
  };
}

export default async function ForCompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const variant = getVariant(slug);
  if (!variant) notFound();
  const overrides = loadDataOverrides();
  return <PortfolioPage variant={variant} dataOverrides={overrides} />;
}
