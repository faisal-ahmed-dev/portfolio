interface AmbientPoolProps {
  size?: number;
  opacity?: number;
  className?: string;
  x?: string;
  y?: string;
  color?: "blue" | "emerald";
}

const COLOR_MAP = {
  blue: "59,130,246",
  emerald: "16,185,129",
};

export function AmbientPool({
  size = 600,
  opacity = 0.12,
  className = "",
  x = "50%",
  y = "50%",
  color = "blue",
}: AmbientPoolProps) {
  const rgb = COLOR_MAP[color];
  return (
    <div
      className={`absolute pointer-events-none rounded-full blur-[80px] ${className}`}
      style={{
        width: size,
        height: size * 0.6,
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(ellipse at center, rgba(${rgb},${opacity}) 0%, transparent 70%)`,
      }}
    />
  );
}
