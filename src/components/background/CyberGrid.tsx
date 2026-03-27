export function CyberGrid({ className }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 cyber-grid pointer-events-none ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
