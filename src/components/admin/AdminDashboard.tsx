"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { AppBadge } from "@/components/ui/AppBadge";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

interface SectionData {
  source: "override" | "default";
  data: unknown;
}

interface AdminDashboardProps {
  apiKey: string;
}

export function AdminDashboard({ apiKey }: AdminDashboardProps) {
  const [sections, setSections] = useState<Record<string, SectionData>>({});
  const [activeTab, setActiveTab] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio", {
        headers: { "x-api-key": apiKey },
      });
      if (res.status === 401) {
        toast.error("Invalid API key");
        return;
      }
      const json = await res.json();
      setSections(json.sections);
      if (!activeTab && json.sections) {
        setActiveTab(Object.keys(json.sections)[0]);
      }
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [apiKey, activeTab]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const sectionKeys = Object.keys(sections);
  const overrideCount = sectionKeys.filter((k) => sections[k].source === "override").length;

  return (
    <div className="min-h-screen bg-[#09090b]">
      <header className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-bold text-[#f4f4f5] font-mono">Portfolio Admin</h1>
            {overrideCount > 0 && (
              <AppBadge variant="accent">{overrideCount} override{overrideCount !== 1 ? "s" : ""}</AppBadge>
            )}
          </div>
          <AppButton variant="ghost" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </AppButton>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
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

        {/* Active editor */}
        {activeTab && sections[activeTab] && (
          <SectionEditor
            key={activeTab}
            sectionKey={activeTab}
            data={sections[activeTab].data}
            source={sections[activeTab].source}
            apiKey={apiKey}
            onUpdate={fetchData}
          />
        )}

        {loading && sectionKeys.length === 0 && (
          <div className="text-center py-20 text-[#3f3f46] text-sm">Loading...</div>
        )}
      </div>
    </div>
  );
}
