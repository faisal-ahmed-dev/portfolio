"use client";
import { useState, useEffect, useCallback } from "react";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

interface SectionData {
  source: "override" | "default";
  data: unknown;
}

interface PortfolioPanelProps {
  apiKey: string;
}

async function saveSectionData(sectionKey: string, data: unknown, apiKey: string) {
  const res = await fetch("/api/portfolio", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: JSON.stringify({ [sectionKey]: data }),
  });
  const json = await res.json();
  if (!res.ok) {
    const detail = json.details?.[sectionKey]?.join(", ") ?? json.error;
    return { ok: false, error: detail };
  }
  return { ok: true };
}

async function revertSection(sectionKey: string, apiKey: string) {
  const res = await fetch(`/api/portfolio?section=${sectionKey}`, {
    method: "DELETE",
    headers: { "x-api-key": apiKey },
  });
  if (!res.ok) {
    const json = await res.json();
    return { ok: false, error: json.error };
  }
  return { ok: true };
}

export function PortfolioPanel({ apiKey }: PortfolioPanelProps) {
  const [sections, setSections] = useState<Record<string, SectionData>>({});
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio", { headers: { "x-api-key": apiKey } });
      if (!res.ok) { toast.error("Failed to load"); return; }
      const json = await res.json();
      setSections(json.sections);
      setActiveTab((prev) => prev || Object.keys(json.sections)[0]);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const sectionKeys = Object.keys(sections);

  if (loading && sectionKeys.length === 0) {
    return <div className="text-center py-20 text-[#3f3f46] text-sm">Loading...</div>;
  }

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto scrollbar-none pb-4 mb-4">
        {sectionKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150",
              activeTab === key
                ? "bg-[#1a1a1f] text-[#f4f4f5] ring-1 ring-[#3b82f6]/30"
                : "text-[#52525b] hover:text-[#a1a1aa] hover:bg-[#131316]"
            )}
          >
            <span className="flex items-center gap-1.5">
              {key}
              {sections[key]?.source === "override" && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
              )}
            </span>
          </button>
        ))}
      </div>

      {activeTab && sections[activeTab] && (
        <SectionEditor
          key={activeTab}
          title={activeTab}
          badge={{
            label: sections[activeTab].source,
            variant: sections[activeTab].source === "override" ? "accent" : "default",
          }}
          data={sections[activeTab].data}
          apiKey={apiKey}
          onSave={(data, key) => saveSectionData(activeTab, data, key)}
          onDelete={
            sections[activeTab].source === "override"
              ? (key) => revertSection(activeTab, key)
              : undefined
          }
          onUpdate={fetchData}
        />
      )}
    </div>
  );
}
