"use client";

import { consultTiles } from "@/lib/dashboard-modules";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ConsultQuickCard } from "@/components/dashboard/ConsultQuickCard";

/** Bloque C — consulta rápida por módulo (tiles + chips). */
export function QuickConsult() {
  return (
    <>
      <SectionTitle>Consulta rápida</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {consultTiles.map((tile) => (
          <ConsultQuickCard key={tile.label} tile={tile} />
        ))}
      </div>
    </>
  );
}
