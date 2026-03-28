"use client";
import { useState, useEffect, useCallback } from "react";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppBadge } from "@/components/ui/AppBadge";
import { toast } from "sonner";

interface AnalyticsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  visitsToday: number;
  visitsByDay: Record<string, number>;
  topPages: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  visitsByCountry: Record<string, number>;
}

interface AnalyticsPanelProps {
  apiKey: string;
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <TonalCard className="p-4">
      <p className="text-[10px] uppercase tracking-wider text-[#52525b] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#f4f4f5] font-mono">{value.toLocaleString()}</p>
    </TonalCard>
  );
}

function BarChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-30);

  if (entries.length === 0) {
    return <p className="text-xs text-[#3f3f46] text-center py-8">No data yet</p>;
  }

  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="flex items-end gap-[2px] h-32">
      {entries.map(([day, count]) => (
        <div key={day} className="flex-1 flex flex-col items-center gap-1 group relative">
          <div
            className="w-full bg-[#3b82f6]/60 rounded-t transition-all hover:bg-[#3b82f6]"
            style={{ height: `${(count / max) * 100}%`, minHeight: count > 0 ? 2 : 0 }}
          />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#1a1a1f] border border-[rgba(255,255,255,0.08)] px-2 py-1 rounded text-[10px] text-[#f4f4f5] whitespace-nowrap z-10">
            {day.slice(5)}: {count}
          </div>
        </div>
      ))}
    </div>
  );
}

function DataTable({
  title,
  rows,
  keyLabel,
  valueLabel,
}: {
  title: string;
  rows: { key: string; value: number }[];
  keyLabel: string;
  valueLabel: string;
}) {
  if (rows.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-bold text-[#f4f4f5] font-mono mb-2">{title}</h3>
      <TonalCard className="overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.05)]">
              <th className="text-left text-[#52525b] font-mono px-3 py-2">{keyLabel}</th>
              <th className="text-right text-[#52525b] font-mono px-3 py-2">{valueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-[rgba(255,255,255,0.03)]">
                <td className="px-3 py-2 text-[#a1a1aa] truncate max-w-[200px]">{row.key}</td>
                <td className="px-3 py-2 text-right text-[#f4f4f5] font-mono">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TonalCard>
    </div>
  );
}

export function AnalyticsPanel({ apiKey }: AnalyticsPanelProps) {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analytics", { headers: { "x-api-key": apiKey } });
      if (!res.ok) { toast.error("Failed to load analytics"); return; }
      setData(await res.json());
    } catch {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading && !data) {
    return <div className="text-center py-20 text-[#3f3f46] text-sm">Loading...</div>;
  }

  if (!data) return null;

  const countryRows = Object.entries(data.visitsByCountry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([key, value]) => ({ key, value }));

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total Visits" value={data.totalVisits} />
        <StatCard label="Unique Visitors" value={data.uniqueVisitors} />
        <StatCard label="Today" value={data.visitsToday} />
      </div>

      {/* Visits chart */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-[#f4f4f5] font-mono">Last 30 Days</h3>
          <AppBadge variant="default">{Object.keys(data.visitsByDay).length} days</AppBadge>
        </div>
        <TonalCard className="p-4">
          <BarChart data={data.visitsByDay} />
        </TonalCard>
      </div>

      {/* Tables */}
      <div className="grid sm:grid-cols-2 gap-4">
        <DataTable
          title="Top Pages"
          rows={data.topPages.map((p) => ({ key: p.path, value: p.count }))}
          keyLabel="Page"
          valueLabel="Visits"
        />
        <DataTable
          title="Top Referrers"
          rows={data.topReferrers.map((r) => ({ key: r.referrer, value: r.count }))}
          keyLabel="Referrer"
          valueLabel="Visits"
        />
      </div>

      <DataTable title="Countries" rows={countryRows} keyLabel="Country" valueLabel="Visits" />
    </div>
  );
}
