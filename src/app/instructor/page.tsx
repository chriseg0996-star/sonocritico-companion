"use client";

import type { CSSProperties } from "react";

const heatmap = [
  { protocolo: "BLUE", r1: 30, r2: 83, r3: 93, r4: 100, r5: 100 },
  { protocolo: "FAST", r1: 73, r2: 95, r3: 98, r4: 100, r5: 100 },
  { protocolo: "VExUS", r1: 5, r2: 43, r3: 70, r4: 95, r5: 100 },
  { protocolo: "RUSH", r1: 0, r2: 58, r3: 85, r4: 100, r5: 100 },
] as const;

const residentes = [
  { i: "AG", nombre: "Dra. Ana García Mendoza", sub: "Urgencias · R1", pct: 20, score: "72%", tiempo: "Hace 15 h" },
  { i: "RM", nombre: "Dr. Roberto Méndez Luna", sub: "UCI · R2", pct: 50, score: "88%", tiempo: "Hace <1 h" },
  { i: "SR", nombre: "Dra. Sofía Reyes Castillo", sub: "Anestesia · R3", pct: 70, score: "91%", tiempo: "Hace <1 h" },
  { i: "ML", nombre: "Dra. María López Sánchez", sub: "Med. crítica · R2", pct: 40, score: "79%", tiempo: "Ayer" },
  { i: "AT", nombre: "Dr. Andrés Torres Gil", sub: "UCI · R4", pct: 90, score: "94%", tiempo: "Hace <1 h" },
  { i: "PN", nombre: "Dra. Patricia Núñez Ríos", sub: "Urgencias · R3", pct: 60, score: "84%", tiempo: "Hace 7 h" },
  { i: "DS", nombre: "Dr. Diego Salinas Morales", sub: "UCI · R5", pct: 100, score: "97%", tiempo: "Hace <1 h" },
  { i: "LC", nombre: "Dra. Laura Castillo Vega", sub: "Med. crítica · R4", pct: 80, score: "89%", tiempo: "Hace 2 h" },
] as const;

function cellStyle(val: number): CSSProperties {
  return {
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    fontWeight: 700,
    textAlign: "center",
    background: val >= 80 ? "#0A2318" : val >= 40 ? "#261A05" : "#200A0A",
    color: val >= 80 ? "#3ECF8E" : val >= 40 ? "#F5A623" : "#FF6B6B",
  };
}

export default function InstructorPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#F0F4F8",
        fontFamily: "system-ui, -apple-system, sans-serif",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #1A1A1A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>🫁</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#F0F4F8" }}>SONOCRÍTICO</span>
        </div>
        <div
          style={{
            background: "#1A1A1A",
            border: "1px solid #242424",
            borderRadius: "8px",
            padding: "4px 14px",
            fontSize: "13px",
            color: "#8FA7C4",
            fontWeight: 600,
          }}
        >
          Panel Instructor
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          padding: "24px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {[
          { num: "8", label: "Estudiantes activos" },
          { num: "72%", label: "Progreso promedio" },
          { num: "FAST", label: "Caso más completado" },
        ].map(({ num, label }) => (
          <div
            key={label}
            style={{
              background: "#111",
              border: "1px solid #1E1E1E",
              borderRadius: "16px",
              padding: "20px 24px",
            }}
          >
            <div style={{ fontSize: "40px", fontWeight: 800, color: "#4A9EFF", lineHeight: 1 }}>
              {num}
            </div>
            <div style={{ fontSize: "13px", color: "#6B7A8D", marginTop: "6px" }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* HEATMAP */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 32px" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#F0F4F8",
            marginBottom: "16px",
          }}
        >
          Mapa por protocolo y nivel
        </div>
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", minWidth: "420px", borderCollapse: "separate", borderSpacing: "4px" }}>
            <thead>
              <tr>
                {["Protocolo", "R1", "R2", "R3", "R4", "R5"].map((h) => (
                  <th
                    key={h}
                    style={{
                      color: "#6B7A8D",
                      fontSize: "13px",
                      padding: "8px 12px",
                      textAlign: "center",
                      fontWeight: 500,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmap.map((row) => (
                <tr key={row.protocolo}>
                  <td
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#F0F4F8",
                      padding: "10px 16px",
                    }}
                  >
                    {row.protocolo}
                  </td>
                  {[row.r1, row.r2, row.r3, row.r4, row.r5].map((val, i) => (
                    <td key={i} style={cellStyle(val)}>
                      {val}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RESIDENTES */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 48px" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#F0F4F8",
            marginBottom: "16px",
          }}
        >
          Residentes ({residentes.length})
        </div>

        {residentes.map((r) => (
          <div
            key={r.i}
            style={{
              background: "#111",
              border: "1px solid #1A1A1A",
              borderRadius: "14px",
              padding: "16px 20px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "22px",
                background: "#1A1A1A",
                border: "1px solid #242424",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                color: "#8FA7C4",
                flexShrink: 0,
              }}
            >
              {r.i}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "#F0F4F8" }}>{r.nombre}</div>
              <div style={{ fontSize: "13px", color: "#6B7A8D", marginTop: "2px" }}>
                {r.sub}
              </div>
              <div
                style={{
                  marginTop: "8px",
                  height: "3px",
                  background: "#1A1A1A",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "2px",
                    background: r.pct === 100 ? "#3ECF8E" : "#4A9EFF",
                    width: `${r.pct}%`,
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  background: "#1A1A1A",
                  border: "1px solid #242424",
                  borderRadius: "6px",
                  padding: "2px 8px",
                  fontSize: "12px",
                  color: "#8FA7C4",
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                {r.sub.split("· ")[1]}
              </div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#4A9EFF",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                {r.score}
              </div>
              <div style={{ fontSize: "12px", color: "#444", marginTop: "2px" }}>{r.tiempo}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          padding: "32px 24px",
          borderTop: "1px solid #111",
        }}
      >
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
