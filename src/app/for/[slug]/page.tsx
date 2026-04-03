import { notFound } from "next/navigation";
import { getVariant, getAllVariantSlugs } from "@/data/variants";
import { loadDataOverrides } from "@/data/overrides";
import { PortfolioPage } from "@/components/pages/PortfolioPage";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllVariantSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const variant = await getVariant(slug);
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
  const [variant, overrides] = await Promise.all([getVariant(slug), loadDataOverrides()]);
  if (!variant) notFound();
  return <PortfolioPage variant={variant} dataOverrides={overrides} />;
}
