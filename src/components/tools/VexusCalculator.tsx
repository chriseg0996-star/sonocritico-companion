"use client";
import { useMemo, useState } from "react";
import { ScanLineCard, StatCard } from "@/components/ui/base";
import { OptionGroup } from "@/components/tools/OptionGroup";
import { calculateVexus, type HepaticPattern, type PortalPattern, type RenalPattern } from "@/lib/tools/vexus";
import { theme } from "@/lib/theme";

export function VexusCalculator() {
  const [ivcCm, setIvcCm] = useState(2.4);
  const [hepatic, setHepatic] = useState<HepaticPattern>("normal");
  const [portal, setPortal] = useState<PortalPattern>("continuous");
  const [renal, setRenal] = useState<RenalPattern>("biphasic");

  const result = useMemo(
    () => calculateVexus({ ivcCm, hepatic, portal, renal }),
    [ivcCm, hepatic, portal, renal]
  );

  return (
  <>
      <ScanLineCard style={{ padding: 16, marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          <span
            style={{
              fontSize: 10,
              color: theme.brand.red,
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            DIÁMETRO VCI (cm)
          </span>
          <input
            type="range"
            min={0.5}
            max={3.5}
            step={0.1}
            value={ivcCm}
            onChange={(e) => setIvcCm(parseFloat(e.target.value))}
            style={{ width: "100%", marginTop: 8, accentColor: theme.brand.red }}
          />
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 22,
              color: ivcCm >= 2 ? theme.brand.red : theme.text.primary,
            }}
          >
            {ivcCm.toFixed(1)} cm
          </span>
          {ivcCm < 2 && (
            <p style={{ fontSize: 11, color: theme.text.muted, marginTop: 6 }}>
              VCI &lt; 2 cm → VExUS 0 (no evaluar venas hepática, porta ni renal).
            </p>
          )}
        </label>
      </ScanLineCard>

      {ivcCm >= 2 && (
        <>
          <OptionGroup
            label="VENA HEPÁTICA (DOPPLER)"
            value={hepatic}
            onChange={setHepatic}
            options={[
              { id: "normal", label: "Normal — onda S > D" },
              { id: "mild", label: "Leve — S ≤ D", hint: "Congestión leve" },
              { id: "severe", label: "Severa — S abolida o invertida" },
            ]}
          />
          <OptionGroup
            label="VENA PORTA"
            value={portal}
            onChange={setPortal}
            options={[
              { id: "continuous", label: "Flujo continuo — pulsátil &lt; 30%" },
              { id: "pulsatile-mild", label: "Pulsátil 30–50%" },
              { id: "pulsatile-severe", label: "Pulsátil &gt; 50%" },
            ]}
          />
          <OptionGroup
            label="VENA RENAL INTRARRENAL"
            value={renal}
            onChange={setRenal}
            options={[
              { id: "biphasic", label: "Bifásico — normal" },
              { id: "monophasic", label: "Monofásico — congestión renal" },
            ]}
          />
        </>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 12 }}>
        <StatCard value={result.grade} label="Grado VExUS" />
        <StatCard value={result.abnormalCount} label="Venias alteradas" sub="de 3" />
      </div>

      <ScanLineCard
        style={{
          padding: 16,
          border: `1px solid ${theme.brand.redBorder}`,
          background: theme.brand.redMuted,
        }}
      >
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: theme.brand.red }}>
          {result.title}
        </div>
        <p style={{ fontSize: 13, color: theme.text.primary, lineHeight: 1.6, marginTop: 8 }}>{result.summary}</p>
        <p style={{ fontSize: 12, color: theme.text.secondary, lineHeight: 1.6, marginTop: 10 }}>
          <strong style={{ color: theme.brand.red }}>Manejo: </strong>
          {result.recommendation}
        </p>
      </ScanLineCard>
    </>
  );
}
