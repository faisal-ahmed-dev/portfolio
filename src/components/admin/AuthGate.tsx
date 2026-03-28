"use client";
import { useState, type ReactNode } from "react";
import { TonalCard } from "@/components/ui/TonalCard";
import { AppButton } from "@/components/ui/AppButton";

interface AuthGateProps {
  children: (apiKey: string) => ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [storedKey, setStoredKey] = useState("");

  if (authed) return <>{children(storedKey)}</>;

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <TonalCard glass shadow className="p-8 max-w-sm w-full">
        <h1 className="text-xl font-bold text-[#f4f4f5] mb-2">Admin Access</h1>
        <p className="text-xs text-[#52525b] mb-6">Enter your API key to continue.</p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && key.trim()) {
              setStoredKey(key.trim());
              setAuthed(true);
            }
          }}
          placeholder="VARIANT_SECRET_KEY"
          className="w-full rounded-lg bg-[#1a1a1f] border border-[rgba(255,255,255,0.07)] px-3 py-2.5 text-sm text-[#f4f4f5] placeholder:text-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40 mb-4"
        />
        <AppButton
          variant="gradient"
          className="w-full"
          onClick={() => {
            if (key.trim()) {
              setStoredKey(key.trim());
              setAuthed(true);
            }
          }}
        >
          Enter
        </AppButton>
      </TonalCard>
    </div>
  );
}
