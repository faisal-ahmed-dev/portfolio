import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Variant Docs — Faisal Ahmed Portfolio",
  description: "How to create job-specific portfolio variants",
  robots: "noindex, nofollow",
};

const TEMPLATE = `{
  "slug": "company-name",
  "company": "Company Name",
  "role": "Software Engineer",

  "coverLetter": {
    "greeting": "Dear Hiring Team,",
    "paragraphs": [
      "First paragraph — your hook.",
      "Second paragraph — relevant experience.",
      "Third paragraph — closing interest."
    ],
    "closingCta": "Let's Connect →"
  },

  "hero": {
    "tagline": "builds systems that scale.",
    "subTagline": "2 years shipping production systems. Ready to bring that to Company Name.",
    "eyebrow": "Software Engineer · 2 yrs · Dhaka, BD"
  },

  "portfolio": {
    "title": "Faisal Ahmed",
    "tagline": "Software Engineer",
    "availability": "Remote"
  },

  "highlightTech": ["React", "Next.js", "TypeScript"],
  "featuredProjectIds": ["orderly-pos", "feedback-saas"],
  "hideProjectIds": ["home-rental-system"],
  "hideSections": ["certifications"],
  "sectionOrder": ["hero", "cover-letter", "experience", "projects"],

  "ogTitle": "Faisal Ahmed — Role for Company",
  "ogDescription": "Portfolio tailored for Company"
}`;

const CURL_LIST = `curl https://your-domain.com/api/variants \\
  -H "x-api-key: YOUR_SECRET_KEY"`;

const CURL_EXAMPLE = `curl -X POST https://your-domain.com/api/variants \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_SECRET_KEY" \\
  -d @content/variants/company-name.json`;

const CURL_DELETE = `curl -X DELETE "https://your-domain.com/api/variants?slug=company-name" \\
  -H "x-api-key: YOUR_SECRET_KEY"`;

const DATA_SECTIONS = [
  "portfolio", "experience", "projects", "metrics", "services",
  "testimonials", "writings", "certifications", "openSource",
];

const CURL_DATA_GET = `curl https://your-domain.com/api/portfolio \\
  -H "x-api-key: YOUR_SECRET_KEY"`;

const CURL_DATA_POST = `curl -X POST https://your-domain.com/api/portfolio \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_SECRET_KEY" \\
  -d '{
    "metrics": [
      { "id": "products", "label": "Products Built", "value": 6, "suffix": "", "description": "Shipped to production" }
    ]
  }'`;

const CURL_DATA_DELETE = `curl -X DELETE "https://your-domain.com/api/portfolio?section=metrics" \\
  -H "x-api-key: YOUR_SECRET_KEY"`;

const FIELDS: { name: string; type: string; required: boolean; desc: string }[] = [
  { name: "slug", type: "string", required: true, desc: "URL slug — becomes /for/{slug}. Lowercase, hyphens, no spaces." },
  { name: "company", type: "string", required: true, desc: "Company name displayed in metadata and cover letter." },
  { name: "role", type: "string", required: true, desc: "Role title — used in page metadata." },
  { name: "coverLetter", type: "object", required: true, desc: "Cover letter content shown at the top of variant pages." },
  { name: "coverLetter.greeting", type: "string", required: true, desc: "Opening line — e.g., \"Dear Hiring Team,\"" },
  { name: "coverLetter.paragraphs", type: "string[]", required: true, desc: "Array of paragraph strings for the cover letter body." },
  { name: "coverLetter.closingCta", type: "string", required: false, desc: "Call-to-action button text at the end of the cover letter." },
  { name: "hero", type: "object", required: false, desc: "Override hero section text." },
  { name: "hero.tagline", type: "string", required: false, desc: "Main tagline — e.g., \"builds React apps that scale.\"" },
  { name: "hero.subTagline", type: "string", required: false, desc: "Subtitle below the tagline." },
  { name: "hero.eyebrow", type: "string", required: false, desc: "Small text above the name." },
  { name: "portfolio", type: "object", required: false, desc: "Override base portfolio metadata." },
  { name: "portfolio.title", type: "string", required: false, desc: "Override portfolio title." },
  { name: "portfolio.tagline", type: "string", required: false, desc: "Override portfolio tagline." },
  { name: "portfolio.availability", type: "string", required: false, desc: "Override availability status." },
  { name: "highlightTech", type: "string[]", required: false, desc: "Tech names to visually highlight in the hero and tech stack sections." },
  { name: "featuredProjectIds", type: "string[]", required: false, desc: "Project IDs to pin at the top of the projects grid." },
  { name: "hideProjectIds", type: "string[]", required: false, desc: "Project IDs to hide from the projects grid." },
  { name: "hideSections", type: "string[]", required: false, desc: "Section IDs to completely hide from the page." },
  { name: "sectionOrder", type: "string[]", required: false, desc: "Custom section order — unlisted sections appear after listed ones." },
  { name: "ogTitle", type: "string", required: false, desc: "Custom Open Graph title for link previews." },
  { name: "ogDescription", type: "string", required: false, desc: "Custom Open Graph description for link previews." },
];

const PROJECT_IDS = [
  "orderly-pos", "feedback-saas", "qr-ordering", "3s-printer", "express-pos",
  "reporting-tool", "kitchen-display", "dhealth-pharma", "class-finder", "tourify", "home-rental-system",
];

const SECTION_IDS = [
  "hero", "cover-letter", "tech", "metrics", "services", "experience",
  "projects", "architecture", "terminal", "principles", "opensource",
  "writings", "testimonials", "certifications", "contact",
];

const TECH_NAMES = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Query", "Jotai",
  "Node.js", "NestJS", "Express", "PostgreSQL", "MongoDB", "Redis", "Prisma",
  "React Native", "Android", "ESC/POS", "BLE", "Skia",
  "Docker", "NGINX", "AWS", "GitHub Actions", "PM2", "VPS",
];

export default function VariantDocsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-black tracking-tight mb-2">Variant Docs</h1>
        <p className="text-[#a1a1aa] mb-12">
          Create job-specific portfolio pages by uploading a JSON file via API.
        </p>

        {/* API Endpoints */}
        <Section title="API Endpoints">
          <p className="text-[#a1a1aa] text-sm mb-4">
            All endpoints require the <Code>x-api-key</Code> header matching your <Code>VARIANT_SECRET_KEY</Code> env var.
          </p>
          <div className="space-y-4">
            <div>
              <Badge color="blue">GET</Badge> <Code>/api/variants</Code>
              <p className="text-[#52525b] text-xs mt-1">List all variants. Returns slug, company, role, and URL for each.</p>
            </div>
            <div>
              <Badge>POST</Badge> <Code>/api/variants</Code>
              <p className="text-[#52525b] text-xs mt-1">Create or update a variant. Send the full JSON as the request body.</p>
            </div>
            <div>
              <Badge color="red">DELETE</Badge> <Code>/api/variants?slug=company-name</Code>
              <p className="text-[#52525b] text-xs mt-1">Delete a variant by slug.</p>
            </div>
          </div>
        </Section>

        {/* Template */}
        <Section title="JSON Template">
          <p className="text-[#a1a1aa] text-sm mb-4">
            Full template with all available fields. Only <Code>slug</Code>, <Code>company</Code>, <Code>role</Code>, and <Code>coverLetter</Code> are required.
          </p>
          <CodeBlock>{TEMPLATE}</CodeBlock>
        </Section>

        {/* Field Reference */}
        <Section title="Field Reference">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <th className="text-left py-2 pr-4 text-[#52525b] font-mono">Field</th>
                  <th className="text-left py-2 pr-4 text-[#52525b] font-mono">Type</th>
                  <th className="text-left py-2 pr-4 text-[#52525b]">Req</th>
                  <th className="text-left py-2 text-[#52525b]">Description</th>
                </tr>
              </thead>
              <tbody>
                {FIELDS.map((f) => (
                  <tr key={f.name} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="py-2 pr-4 font-mono text-[#60a5fa]">{f.name}</td>
                    <td className="py-2 pr-4 font-mono text-[#52525b]">{f.type}</td>
                    <td className="py-2 pr-4">{f.required ? <span className="text-[#f87171]">*</span> : ""}</td>
                    <td className="py-2 text-[#a1a1aa]">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Valid IDs */}
        <Section title="Valid Project IDs">
          <div className="flex flex-wrap gap-1.5">
            {PROJECT_IDS.map((id) => (
              <span key={id} className="text-[10px] font-mono text-[#a1a1aa] bg-[#131316] px-2 py-1 rounded">{id}</span>
            ))}
          </div>
        </Section>

        <Section title="Valid Section IDs">
          <div className="flex flex-wrap gap-1.5">
            {SECTION_IDS.map((id) => (
              <span key={id} className="text-[10px] font-mono text-[#a1a1aa] bg-[#131316] px-2 py-1 rounded">{id}</span>
            ))}
          </div>
          <p className="text-[#52525b] text-xs mt-3">
            Variant-only sections (shown only on variant pages): <Code>cover-letter</Code>, <Code>architecture</Code>, <Code>terminal</Code>, <Code>principles</Code>
          </p>
        </Section>

        <Section title="Valid Tech Names">
          <div className="flex flex-wrap gap-1.5">
            {TECH_NAMES.map((name) => (
              <span key={name} className="text-[10px] font-mono text-[#a1a1aa] bg-[#131316] px-2 py-1 rounded">{name}</span>
            ))}
          </div>
        </Section>

        {/* cURL Examples */}
        <Section title="List All Variants">
          <CodeBlock>{CURL_LIST}</CodeBlock>
        </Section>

        <Section title="Create a Variant">
          <CodeBlock>{CURL_EXAMPLE}</CodeBlock>
        </Section>

        <Section title="Delete a Variant">
          <CodeBlock>{CURL_DELETE}</CodeBlock>
        </Section>

        {/* ─── Portfolio Data API ─── */}
        <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.05)]">
          <h1 className="text-4xl font-black tracking-tight mb-2">Portfolio Data API</h1>
          <p className="text-[#a1a1aa] mb-12">
            Update the default portfolio page (<Code>/</Code>) content via API. Same secret key.
          </p>
        </div>

        <Section title="Endpoints">
          <p className="text-[#a1a1aa] text-sm mb-4">
            All endpoints require the <Code>x-api-key</Code> header.
          </p>
          <div className="space-y-4">
            <div>
              <Badge color="blue">GET</Badge> <Code>/api/portfolio</Code>
              <p className="text-[#52525b] text-xs mt-1">Returns all section data with source metadata (override vs default).</p>
            </div>
            <div>
              <Badge>POST</Badge> <Code>/api/portfolio</Code>
              <p className="text-[#52525b] text-xs mt-1">Partial update — only send sections you want to change.</p>
            </div>
            <div>
              <Badge color="red">DELETE</Badge> <Code>/api/portfolio?section=metrics</Code>
              <p className="text-[#52525b] text-xs mt-1">Remove override, revert section to hardcoded default.</p>
            </div>
          </div>
        </Section>

        <Section title="Editable Sections">
          <div className="flex flex-wrap gap-1.5">
            {DATA_SECTIONS.map((s) => (
              <span key={s} className="text-[10px] font-mono text-[#a1a1aa] bg-[#131316] px-2 py-1 rounded">{s}</span>
            ))}
          </div>
          <p className="text-[#52525b] text-xs mt-3">
            <Code>techStack</Code> is excluded (contains React component references that can&apos;t be serialized).
          </p>
        </Section>

        <Section title="Get Current Data">
          <CodeBlock>{CURL_DATA_GET}</CodeBlock>
        </Section>

        <Section title="Update a Section">
          <CodeBlock>{CURL_DATA_POST}</CodeBlock>
        </Section>

        <Section title="Revert to Default">
          <CodeBlock>{CURL_DATA_DELETE}</CodeBlock>
        </Section>

        <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.05)]">
          <p className="text-[#3f3f46] text-xs text-center">
            Changes take effect within 60 seconds (ISR revalidation).
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-bold text-[#f4f4f5] mb-4">{title}</h2>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-[#0c0c0f] border border-[rgba(255,255,255,0.05)] rounded-lg p-4 overflow-x-auto">
      <code className="text-xs font-mono text-[#a1a1aa] leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[#60a5fa] bg-[#131316] px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
  );
}

function Badge({ children, color = "green" }: { children: React.ReactNode; color?: "green" | "red" | "blue" }) {
  const colors = color === "red"
    ? "text-[#f87171] bg-[rgba(248,113,113,0.1)]"
    : color === "blue"
    ? "text-[#60a5fa] bg-[rgba(59,130,246,0.1)]"
    : "text-[#34d399] bg-[rgba(16,185,129,0.1)]";
  return (
    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${colors}`}>{children}</span>
  );
}
