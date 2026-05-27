"use client";

import { useRouter } from "next/navigation";

export default function PlanesPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#F0F4F8",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px 24px 0",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "24px" }}>🫁</span>
        <span
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#F0F4F8",
            letterSpacing: "0.5px",
          }}
        >
          SONOCRÍTICO
        </span>
      </div>

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 24px 48px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "800",
            margin: "0 0 12px",
            color: "#F0F4F8",
            letterSpacing: "-1px",
          }}
        >
          Elige tu plan
        </h1>
        <p style={{ fontSize: "16px", color: "#6B7A8D", margin: "0" }}>
          Gratis para siempre · Sin tarjeta de crédito
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {/* FREE */}
        <div
          style={{
            background: "#111111",
            border: "1px solid #242424",
            borderRadius: "24px",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#1A1A1A",
              border: "1px solid #2E2E2E",
              borderRadius: "8px",
              padding: "4px 12px",
              fontSize: "12px",
              color: "#8FA7C4",
              fontWeight: "600",
              letterSpacing: "1px",
              marginBottom: "20px",
              width: "fit-content",
            }}
          >
            GRATIS
          </div>

          <div style={{ marginBottom: "24px" }}>
            <span
              style={{
                fontSize: "52px",
                fontWeight: "800",
                color: "#F0F4F8",
                lineHeight: "1",
              }}
            >
              $0
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#6B7A8D",
                marginLeft: "8px",
              }}
            >
              /mes
            </span>
          </div>

          <div
            style={{
              height: "1px",
              background: "#1E1E1E",
              margin: "0 0 24px",
            }}
          />

          <div style={{ flex: 1, marginBottom: "32px" }}>
            {(
              [
                [true, "Acceso al dashboard"],
                [true, "3 protocolos básicos"],
                [true, "Atlas con 5 vistas"],
                [true, "3 casos clínicos"],
                [true, "Progreso guardado"],
                [false, "Companion de guardia"],
                [false, "Todos los protocolos"],
                [false, "Dashboard instructor"],
              ] as const
            ).map(([included, text]) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 0",
                  borderBottom: "1px solid #141414",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: included ? "#3ECF8E" : "#333333",
                    fontWeight: "600",
                    minWidth: "16px",
                  }}
                >
                  {included ? "✓" : "✗"}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: included ? "#C0CDD8" : "#444444",
                    textDecoration: included ? "none" : "line-through",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            style={{
              width: "100%",
              background: "transparent",
              border: "1px solid #2E2E2E",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#F0F4F8",
              cursor: "pointer",
              minHeight: "48px",
            }}
          >
            Comenzar gratis
          </button>
        </div>

        {/* PRO */}
        <div
          style={{
            background: "#0D1B2E",
            border: "2px solid #4A9EFF",
            borderRadius: "24px",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            marginTop: "20px",
          }}
        >
          {/* Badge recomendado */}
          <div
            style={{
              position: "absolute",
              top: "-14px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#4A9EFF",
              color: "white",
              fontSize: "12px",
              fontWeight: "700",
              padding: "4px 16px",
              borderRadius: "20px",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
            }}
          >
            ⭐ RECOMENDADO
          </div>

          <div
            style={{
              display: "inline-block",
              background: "#0A2040",
              border: "1px solid #4A9EFF",
              borderRadius: "8px",
              padding: "4px 12px",
              fontSize: "12px",
              color: "#4A9EFF",
              fontWeight: "600",
              letterSpacing: "1px",
              marginBottom: "20px",
              width: "fit-content",
            }}
          >
            PRO
          </div>

          <div style={{ marginBottom: "24px" }}>
            <span
              style={{
                fontSize: "52px",
                fontWeight: "800",
                color: "#4A9EFF",
                lineHeight: "1",
              }}
            >
              $199
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#6B7A8D",
                marginLeft: "8px",
              }}
            >
              /mes MXN
            </span>
          </div>

          <div
            style={{
              height: "1px",
              background: "#1A2840",
              margin: "0 0 24px",
            }}
          />

          <div style={{ flex: 1, marginBottom: "32px" }}>
            {[
              "Todos los protocolos",
              "Atlas completo 14 vistas",
              "Casos clínicos ilimitados",
              "Companion de guardia",
              "Dashboard instructor",
              "Heatmap por residente",
              "Modo multi-window",
              "Soporte prioritario",
            ].map((text) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 0",
                  borderBottom: "1px solid #0F1E30",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: "#3ECF8E",
                    fontWeight: "600",
                    minWidth: "16px",
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: "14px", color: "#C0CDD8" }}>{text}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => alert("Próximamente — lista de espera")}
            style={{
              width: "100%",
              background: "#4A9EFF",
              border: "none",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: "600",
              color: "white",
              cursor: "pointer",
              minHeight: "48px",
            }}
          >
            Upgrade a Pro →
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#4466AA",
              margin: "12px 0 0",
            }}
          >
            Próximamente · Lista de espera abierta
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "32px 24px 48px",
          borderTop: "1px solid #111",
        }}
      >
        <p style={{ fontSize: "13px", color: "#444", margin: "0 0 8px" }}>
          Los pagos se conectarán con Stripe en una fase posterior.
        </p>
        <a
          href="/dashboard"
          style={{
            color: "#6B7A8D",
            fontSize: "13px",
            textDecoration: "none",
          }}
        >
          ← Volver al dashboard
        </a>
      </div>
    </div>
  );
}
