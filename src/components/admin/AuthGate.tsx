"use client";
import { useState, type ReactNode } from "react";
import { Lock } from "lucide-react";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppButton } from "@/components/ui/AppButton";
import { toast } from "sonner";

interface AuthGateProps {
  children: (apiKey: string) => ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const [password, setPassword] = useState("");
  const [storedKey, setStoredKey] = useState("");
  const [loading, setLoading] = useState(false);

  if (storedKey) return <>{children(storedKey)}</>;

  async function handleLogin() {
    const key = password.trim();
    if (!key) return;
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio", { headers: { "x-api-key": key } });
      if (res.ok) {
        setStoredKey(key);
      } else {
        toast.error("Invalid password");
      }
    } catch {
      toast.error("Connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <TonalCard glass shadow className="p-8 max-w-sm w-full">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#1a1a1f] flex items-center justify-center">
            <Lock size={14} className="text-[#60a5fa]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#f4f4f5]">Admin</h1>
            <p className="text-[10px] text-[#3f3f46]">Portfolio Management</p>
          </div>
        </div>
        <label className="block text-xs text-[#52525b] mb-1.5 font-mono">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Enter password"
          autoFocus
          className="w-full rounded-lg bg-[#1a1a1f] border border-[rgba(255,255,255,0.07)] px-3 py-2.5 text-sm text-[#f4f4f5] placeholder:text-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40 mb-4"
        />
        <AppButton
          variant="gradient"
          className="w-full"
          onClick={handleLogin}
          disabled={loading || !password.trim()}
        >
          {loading ? "Verifying..." : "Sign In"}
        </AppButton>
      </TonalCard>
    </div>
  );
}
