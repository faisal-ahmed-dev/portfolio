import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#f4f4f5",
              letterSpacing: "-0.02em",
            }}
          >
            Faisal Ahmed
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "#a1a1aa",
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
            }}
          >
            Software Engineer
          </div>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 12,
            }}
          >
            {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: 14,
                  color: "#71717a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 9999,
                  padding: "6px 16px",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
