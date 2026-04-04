"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, ExternalLink } from "lucide-react";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppButton } from "@/components/ui/AppButton";
import { AppBadge } from "@/components/ui/AppBadge";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

interface VariantSummary {
  slug: string;
  company: string;
  role: string;
  url: string;
}

interface VariantPanelProps {
  apiKey: string;
}

const NEW_VARIANT_TEMPLATE = {
  slug: "company-name",
  company: "Company Name",
  role: "Software Engineer",
  coverLetter: {
    greeting: "Dear Hiring Team,",
    paragraphs: ["Your first paragraph here."],
    closingCta: "Let's Connect →",
  },
};

async function createVariant(data: unknown, apiKey: string) {
  const res = await fetch("/api/variants", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    const detail = json.details?.join(", ") ?? json.error;
    return { ok: false, error: detail };
  }
  return { ok: true };
}

function makeUpdateVariant(slug: string) {
  return async (data: unknown, apiKey: string) => {
    const res = await fetch(`/api/variants/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      const detail = json.details?.join(", ") ?? json.error;
      return { ok: false, error: detail };
    }
    return { ok: true };
  };
}

async function deleteVariant(slug: string, apiKey: string) {
  const res = await fetch(`/api/variants?slug=${slug}`, {
    method: "DELETE",
    headers: { "x-api-key": apiKey },
  });
  if (!res.ok) {
    const json = await res.json();
    return { ok: false, error: json.error };
  }
  return { ok: true };
}

async function fetchVariantData(slug: string): Promise<unknown | null> {
  try {
    // Fetch the rendered page won't work — we need to read the JSON directly
    // Use the list endpoint and then load individual variant data
    const res = await fetch(`/for/${slug}`, { method: "HEAD" });
    return null; // We'll load from the list
  } catch {
    return null;
  }
}

export function VariantPanel({ apiKey }: VariantPanelProps) {
  const [variants, setVariants] = useState<VariantSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<unknown>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/variants", { headers: { "x-api-key": apiKey } });
      if (!res.ok) { toast.error("Failed to load variants"); return; }
      const json = await res.json();
      setVariants(json.variants ?? []);
    } catch {
      toast.error("Failed to load variants");
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => { fetchList(); }, [fetchList]);

  async function loadVariant(slug: string) {
    setActiveSlug(slug);
    setCreating(false);
    setLoadingData(true);
    try {
      // Read the variant JSON file via a dedicated endpoint
      // We'll use GET on the variants API and find the one we need
      // Actually, the GET endpoint only returns summaries. Let's fetch the full JSON.
      const res = await fetch(`/api/variants/${slug}`, { headers: { "x-api-key": apiKey } });
      if (res.ok) {
        const json = await res.json();
        setActiveData(json);
      }
    } catch {
      // Fallback: we know the slug exists but can't load full data
      setActiveData(null);
      toast.error("Could not load variant data — use the summary to recreate");
    } finally {
      setLoadingData(false);
    }
  }

  function startCreate() {
    setCreating(true);
    setActiveSlug(null);
    setActiveData(NEW_VARIANT_TEMPLATE);
  }

  function handleUpdate() {
    fetchList();
    if (creating) {
      setCreating(false);
      setActiveData(null);
    }
  }

  return (
    <div>
      {/* Variant list + create */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-[#52525b]">
          {variants.length} variant{variants.length !== 1 ? "s" : ""}
        </p>
        <AppButton variant="secondary" size="sm" onClick={startCreate}>
          <Plus size={14} /> New Variant
        </AppButton>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {variants.map((v) => (
          <TonalCard
            key={v.slug}
            hover
            ghostBorder={activeSlug === v.slug}
            className={cn(
              "p-4 cursor-pointer transition-all",
              activeSlug === v.slug && "ring-1 ring-[#3b82f6]/30"
            )}
            onClick={() => loadVariant(v.slug)}
          >
            <div className="flex items-start justify-between mb-2">
              <AppBadge variant="accent">{v.slug}</AppBadge>
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3f3f46] hover:text-[#60a5fa] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-sm font-semibold text-[#f4f4f5]">{v.company}</p>
            <p className="text-xs text-[#52525b]">{v.role}</p>
          </TonalCard>
        ))}
      </div>

      {loading && variants.length === 0 && (
        <div className="text-center py-12 text-[#3f3f46] text-sm">Loading...</div>
      )}

      {/* Editor */}
      {creating && activeData != null && (
        <SectionEditor
          title="New Variant"
          badge={{ label: "new", variant: "status" }}
          data={activeData}
          apiKey={apiKey}
          onSave={createVariant}
          onUpdate={handleUpdate}
          minHeight="400px"
        />
      )}

      {activeSlug && !creating && activeData != null && (
        <SectionEditor
          key={activeSlug}
          title={activeSlug}
          badge={{ label: "variant", variant: "accent" }}
          data={activeData}
          apiKey={apiKey}
          onSave={makeUpdateVariant(activeSlug)}
          onDelete={(key) => deleteVariant(activeSlug, key)}
          onUpdate={handleUpdate}
          minHeight="400px"
        />
      )}

      {activeSlug && !creating && loadingData && (
        <div className="text-center py-12 text-[#3f3f46] text-sm">Loading variant data...</div>
      )}
    </div>
  );
}
