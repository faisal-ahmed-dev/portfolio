import { PORTFOLIO } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/site-url";

export function PersonJsonLd() {
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PORTFOLIO.name,
    jobTitle: PORTFOLIO.title,
    url: siteUrl,
    image: `${siteUrl}/faisal-ahmed.png`,
    email: PORTFOLIO.email,
    sameAs: [PORTFOLIO.github, PORTFOLIO.linkedin],
    worksFor: {
      "@type": "Organization",
      name: PORTFOLIO.company,
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Full Stack Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
