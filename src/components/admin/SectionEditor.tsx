"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Check, AlertCircle } from "lucide-react";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppButton } from "@/components/ui/AppButton";
import { AppBadge } from "@/components/ui/AppBadge";
import { toast } from "sonner";

interface SectionEditorProps {
  sectionKey: string;
  data: unknown;
  source: "override" | "default";
  apiKey: string;
  onUpdate: () => void;
}

export function SectionEditor({ sectionKey, data, source, apiKey, onUpdate }: SectionEditorProps) {
  const [value, setValue] = useState(() => JSON.stringify(data, null, 2));
  const [saving, setSaving] = useState(false);
  const [reverting, setReverting] = useState(false);
  const parseError = getParseError(value);

  async function handleSave() {
    if (parseError) return;
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify({ [sectionKey]: JSON.parse(value) }),
      });
      const json = await res.json();
      if (!res.ok) {
        const detail = json.details?.[sectionKey]?.join(", ") ?? json.error;
        toast.error(`Failed: ${detail}`);
      } else {
        toast.success(`${sectionKey} updated`);
        onUpdate();
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function handleRevert() {
    if (source !== "override") return;
    setReverting(true);
    try {
      const res = await fetch(`/api/portfolio?section=${sectionKey}`, {
        method: "DELETE",
        headers: { "x-api-key": apiKey },
      });
      if (res.ok) {
        toast.success(`${sectionKey} reverted to default`);
        onUpdate();
      } else {
        const json = await res.json();
        toast.error(json.error);
      }
    } catch {
      toast.error("Network error");
    } finally {
      setReverting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <TonalCard className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#f4f4f5] font-mono">{sectionKey}</h3>
            <AppBadge variant={source === "override" ? "accent" : "default"}>
              {source}
            </AppBadge>
          </div>
          <div className="flex items-center gap-2">
            {source === "override" && (
              <AppButton
                variant="ghost"
                size="sm"
                onClick={handleRevert}
                disabled={reverting}
              >
                <RotateCcw size={14} />
                {reverting ? "..." : "Revert"}
              </AppButton>
            )}
            <AppButton
              variant="gradient"
              size="sm"
              onClick={handleSave}
              disabled={saving || !!parseError}
            >
              {saving ? "..." : <><Save size={14} /> Save</>}
            </AppButton>
          </div>
        </div>

        {parseError && (
          <div className="flex items-center gap-2 text-[#f87171] text-xs mb-2 font-mono">
            <AlertCircle size={12} />
            {parseError}
          </div>
        )}

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          className="w-full min-h-[300px] rounded-lg bg-[#0c0c0f] border border-[rgba(255,255,255,0.05)] px-4 py-3 text-xs font-mono text-[#a1a1aa] leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/30"
        />

        {!parseError && (
          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-[#3f3f46]">
            <Check size={10} /> Valid JSON
          </div>
        )}
      </TonalCard>
    </motion.div>
  );
}

function getParseError(value: string): string | null {
  try {
    JSON.parse(value);
    return null;
  } catch (e) {
    return e instanceof Error ? e.message : "Invalid JSON";
  }
}
