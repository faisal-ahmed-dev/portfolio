interface SectionGlowProps {
  intensity?: "subtle" | "medium" | "strong";
  position?: "top" | "bottom" | "both";
}

export function SectionGlow({ intensity = "medium", position = "both" }: SectionGlowProps) {
  const opacityMap = {
    subtle: { glow: "0.12", edge: "0.06" },
    medium: { glow: "0.20", edge: "0.10" },
    strong: { glow: "0.35", edge: "0.18" },
  };
  const { glow, edge } = opacityMap[intensity];

  return (
    <div className="absolute inset-x-0 pointer-events-none overflow-hidden" style={{ insetBlock: 0 }}>
      {(position === "top" || position === "both") && (
        <div
          className="absolute inset-x-0 top-0 h-64"
          style={{
            background: `linear-gradient(to bottom, rgba(109,40,217,${edge}) 0%, rgba(124,58,237,${glow}) 40%, transparent 100%)`,
          }}
        />
      )}
      {(position === "bottom" || position === "both") && (
        <div
          className="absolute inset-x-0 bottom-0 h-64"
          style={{
            background: `linear-gradient(to top, rgba(109,40,217,${edge}) 0%, rgba(124,58,237,${glow}) 40%, transparent 100%)`,
          }}
        />
      )}
      {/* Center ambient orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full blur-[80px]"
        style={{ background: `rgba(109,40,217,${intensity === "strong" ? 0.15 : 0.08})` }}
      />
    </div>
  );
}
