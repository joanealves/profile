import { ImageResponse } from "next/og";
import { perfil } from "@/content/perfil";

export const runtime = "edge";
export const alt = `${perfil.nome} — ${perfil.cargo}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#070c1a",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.35), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              border: "1px solid #2b3c60",
              background: "#0e1728",
              color: "#60a5fa",
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            JA
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: "#9aa8c7" }}>
            {new URL(perfil.site).hostname}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: 600,
            color: "#eef2fb",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {perfil.nome}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "24px",
            fontSize: "36px",
            color: "#93c5fd",
          }}
        >
          {perfil.cargo}
        </div>
      </div>
    ),
    { ...size }
  );
}
