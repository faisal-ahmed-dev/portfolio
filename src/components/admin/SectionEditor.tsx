"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Check, AlertCircle, Trash2 } from "lucide-react";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppButton } from "@/components/ui/AppButton";
import { AppBadge } from "@/components/ui/AppBadge";
import { toast } from "sonner";

export interface EditorAction {
  label: string;
  variant: "gradient" | "ghost" | "secondary";
  icon: typeof Save;
  onClick: (value: string) => Promise<void>;
  disabled?: (parseError: string | null) => boolean;
  confirm?: string;
}

interface SectionEditorProps {
  title: string;
  badge?: { label: string; variant: "accent" | "default" | "status" };
  data: unknown;
  apiKey: string;
  onSave: (data: unknown, apiKey: string) => Promise<{ ok: boolean; error?: string }>;
  onDelete?: (apiKey: string) => Promise<{ ok: boolean; error?: string }>;
  onUpdate: () => void;
  minHeight?: string;
}

export function SectionEditor({
  title,
  badge,
  data,
  apiKey,
  onSave,
  onDelete,
  onUpdate,
  minHeight = "300px",
}: SectionEditorProps) {
  const [value, setValue] = useState(() => JSON.stringify(data, null, 2));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const parseError = getParseError(value);

  async function handleSave() {
    if (parseError) return;
    setSaving(true);
    try {
      const result = await onSave(JSON.parse(value), apiKey);
      if (result.ok) {
        toast.success(`${title} saved`);
        onUpdate();
      } else {
        toast.error(result.error ?? "Save failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!onDelete) return;
    setDeleting(true);
    try {
      const result = await onDelete(apiKey);
      if (result.ok) {
        toast.success(`${title} deleted`);
        onUpdate();
      } else {
        toast.error(result.error ?? "Delete failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setDeleting(false);
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
            <h3 className="text-sm font-bold text-[#f4f4f5] font-mono">{title}</h3>
            {badge && <AppBadge variant={badge.variant}>{badge.label}</AppBadge>}
          </div>
          <div className="flex items-center gap-2">
            {onDelete && (
              <AppButton variant="ghost" size="sm" onClick={handleDelete} disabled={deleting}>
                {deleting ? <RotateCcw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {deleting ? "..." : "Delete"}
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
          style={{ minHeight }}
          className="w-full rounded-lg bg-[#0c0c0f] border border-[rgba(255,255,255,0.05)] px-4 py-3 text-xs font-mono text-[#a1a1aa] leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/30"
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
