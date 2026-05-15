"use client";
import { useMemo, useState } from "react";
import { ScanLineCard, Badge } from "@/components/ui/base";
import { OptionGroup } from "@/components/tools/OptionGroup";
import { calculateBlue, type LungProfile, type PlapsFinding } from "@/lib/tools/lus-blue";
import { theme } from "@/lib/theme";

export function LusBlueTool() {
  const [profileLeft, setProfileLeft] = useState<LungProfile>("B");
  const [profileRight, setProfileRight] = useState<LungProfile>("B");
  const [plaps, setPlaps] = useState<PlapsFinding>("none");
  const [slidingPresent, setSlidingPresent] = useState(true);
  const [fePreserved, setFePreserved] = useState<boolean | null>(true);
  const [dvtPresent, setDvtPresent] = useState<boolean | null>(null);

  const result = useMemo(
    () =>
      calculateBlue({
        profileLeft,
        profileRight,
        plaps,
        slidingPresent,
        fePreserved,
        dvtPresent,
      }),
    [profileLeft, profileRight, plaps, slidingPresent, fePreserved, dvtPresent]
  );

  return (
    <>
      <OptionGroup
        label="PERFIL IZQUIERDO (PUNTOS BLUE)"
        value={profileLeft}
        onChange={setProfileLeft}
        options={[
          { id: "A", label: "Perfil A — líneas A dominantes" },
          { id: "B", label: "Perfil B — líneas B / cohetes" },
          { id: "mixed", label: "Mixto / no concluyente" },
        ]}
      />
      <OptionGroup
        label="PERFIL DERECHO"
        value={profileRight}
        onChange={setProfileRight}
        options={[
          { id: "A", label: "Perfil A" },
          { id: "B", label: "Perfil B" },
          { id: "mixed", label: "Mixto" },
        ]}
      />
      <OptionGroup
        label="DESLIZAMIENTO PLEURAL"
        value={slidingPresent ? "yes" : "no"}
        onChange={(v) => setSlidingPresent(v === "yes")}
        options={[
          { id: "yes", label: "Presente bilateral" },
          { id: "no", label: "Ausente — sospecha neumotórax" },
        ]}
      />
      <OptionGroup
        label="PLAPS (POSTEROLATERAL)"
        value={plaps}
        onChange={setPlaps}
        options={[
          { id: "none", label: "Sin consolidación" },
          { id: "consolidation", label: "Consolidación / broncograma" },
        ]}
      />
      <OptionGroup
        label="FUNCIÓN SISTÓLICA (ECO RÁPIDA)"
        value={fePreserved === null ? "unknown" : fePreserved ? "yes" : "no"}
        onChange={(v) => setFePreserved(v === "unknown" ? null : v === "yes")}
        options={[
          { id: "yes", label: "FE conservada (~≥50%)" },
          { id: "no", label: "FE reducida" },
          { id: "unknown", label: "No evaluada" },
        ]}
      />
      <OptionGroup
        label="DVT (PIERNAS)"
        value={dvtPresent === null ? "unknown" : dvtPresent ? "yes" : "no"}
        onChange={(v) => setDvtPresent(v === "unknown" ? null : v === "yes")}
        options={[
          { id: "unknown", label: "No evaluado" },
          { id: "yes", label: "DVT positivo" },
          { id: "no", label: "DVT negativo" },
        ]}
      />

      <ScanLineCard style={{ padding: 16, marginTop: 4 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <Badge variant="brand">BLUE</Badge>
          <Badge variant="gray">Confianza {result.confidence}</Badge>
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            color: theme.text.primary,
            lineHeight: 1.2,
          }}
        >
          {result.diagnosis}
        </div>
        <ul style={{ margin: "12px 0", paddingLeft: 18, fontSize: 12, color: theme.text.secondary, lineHeight: 1.6 }}>
          {result.rationale.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p style={{ fontSize: 12, color: theme.text.primary, lineHeight: 1.6 }}>
          <span style={{ color: theme.brand.primary, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            MANEJO ·{" "}
          </span>
          {result.management}
        </p>
      </ScanLineCard>
    </>
  );
}
