"use client";
import { useState } from "react";
import { Database, Users } from "lucide-react";
import { PortfolioPanel } from "@/components/admin/PortfolioPanel";
import { VariantPanel } from "@/components/admin/VariantPanel";
import { cn } from "@/lib/cn";

interface AdminDashboardProps {
  apiKey: string;
}

const TABS = [
  { key: "portfolio", label: "Portfolio Data", icon: Database },
  { key: "variants", label: "Variants", icon: Users },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function AdminDashboard({ apiKey }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("portfolio");

  return (
    <div className="min-h-screen bg-[#09090b]">
      <header className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <h1 className="text-sm font-bold text-[#f4f4f5] font-mono">Portfolio Admin</h1>
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150",
                  activeTab === tab.key
                    ? "bg-[#1a1a1f] text-[#f4f4f5] ring-1 ring-[#3b82f6]/30"
                    : "text-[#52525b] hover:text-[#a1a1aa] hover:bg-[#131316]"
                )}
              >
                <tab.icon size={12} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === "portfolio" && <PortfolioPanel apiKey={apiKey} />}
        {activeTab === "variants" && <VariantPanel apiKey={apiKey} />}
      </div>
    </div>
  );
}
