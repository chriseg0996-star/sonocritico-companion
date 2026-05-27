"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        background: "#080808",
        color: "#F0F4F8",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        padding: "0",
        margin: "0",
      }}
    >
      {/* HERO */}
      <div
        style={{
          textAlign: "center",
          padding: "80px 24px 80px",
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🫁</div>
        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 80px)",
            fontWeight: "800",
            letterSpacing: "-2px",
            margin: "0 0 16px",
            color: "#F0F4F8",
            lineHeight: "1",
          }}
        >
          SONOCRÍTICO
        </h1>
        <p
          style={{
            fontSize: "20px",
            color: "#8FA7C4",
            margin: "0 0 32px",
            lineHeight: "1.5",
          }}
        >
          Visualiza el problema. Actúa con certeza.
        </p>
        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            background: "#4A9EFF",
            color: "white",
            padding: "14px 36px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Abrir app →
        </Link>
      </div>

      {/* EL PROBLEMA */}
      <div style={{ padding: "0 24px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <p
          style={{
            color: "#6B7A8D",
            fontSize: "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          El problema
        </p>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "40px",
            color: "#F0F4F8",
          }}
        >
          POCUS en guardia, sin sistema
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            [
              "4 pantallas, 0 segundos",
              "En guardia no hay tiempo para saltar entre PDFs, chats y galerías de imágenes sueltas.",
            ],
            [
              "Protocolos dispersos",
              "BLUE, FAST, VExUS y RUSH viven en lugares distintos — sin un hilo clínico común.",
            ],
            [
              "Sin guía en tiempo real",
              "Falta un companion que oriente hallazgos, diferencial y siguiente paso al pie del paciente.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                background: "#111111",
                border: "1px solid #242424",
                borderRadius: "16px",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                  color: "#F0F4F8",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6B7A8D", lineHeight: "1.6", margin: "0" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* LA SOLUCIÓN */}
      <div style={{ padding: "0 24px 80px", maxWidth: "960px", margin: "0 auto" }}>
        <p
          style={{
            color: "#4A9EFF",
            fontSize: "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          La solución
        </p>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "40px",
            color: "#F0F4F8",
          }}
        >
          Companion USG en una sola app
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            [
              "Atlas USG interactivo",
              "Hallazgos normales y patológicos con viewer POCUS, filmstrip y búsqueda clínica.",
            ],
            [
              "Protocolos BLUE / FAST / VExUS / RUSH",
              "Árboles de decisión y checklists alineados a la práctica en UCI y urgencias.",
            ],
            [
              "Companion de guardia",
              "Selecciona el síntoma y obtén protocolo, atlas y diagnóstico diferencial en segundos.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                background: "#111111",
                border: "1px solid #242424",
                borderRadius: "16px",
                padding: "28px",
                borderTop: "3px solid #4A9EFF",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                  color: "#F0F4F8",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6B7A8D", lineHeight: "1.6", margin: "0" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA FINAL */}
      <div
        style={{
          textAlign: "center",
          padding: "80px 24px",
          borderTop: "1px solid #1C1C1C",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "16px",
            color: "#F0F4F8",
          }}
        >
          Listo para usarlo en guardia
        </h2>
        <p style={{ color: "#6B7A8D", marginBottom: "32px", fontSize: "16px" }}>
          Gratis. Sin registro. Desde el móvil.
        </p>
        <Link
          href="/dashboard"
          style={{
            display: "inline-block",
            background: "#4A9EFF",
            color: "white",
            padding: "14px 36px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            textDecoration: "none",
            marginBottom: "16px",
          }}
        >
          Comenzar gratis →
        </Link>
        <br />
        <Link
          href="/login"
          style={{
            color: "#6B7A8D",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
