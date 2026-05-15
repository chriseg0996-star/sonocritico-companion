"use client";
import { useMemo, useState } from "react";
import { ScanLineCard } from "@/components/ui/base";
import { OptionGroup } from "@/components/tools/OptionGroup";
import {
  calculateShockType,
  type DvtFinding,
  type FastFinding,
  type FeCategory,
  type IvcCategory,
  type PericardialFinding,
  type RvFinding,
} from "@/lib/tools/shock";
import { theme } from "@/lib/theme";

export function ShockTableTool() {
  const [fe, setFe] = useState<FeCategory>("normal");
  const [pericardium, setPericardium] = useState<PericardialFinding>("none");
  const [rv, setRv] = useState<RvFinding>("normal");
  const [ivc, setIvc] = useState<IvcCategory>("collapsed");
  const [fast, setFast] = useState<FastFinding>("not-done");
  const [dvt, setDvt] = useState<DvtFinding>("not-done");
  const [lungSliding, setLungSliding] = useState(true);

  const result = useMemo(
    () => calculateShockType({ fe, pericardium, rv, ivc, fast, dvt, lungSliding }),
    [fe, pericardium, rv, ivc, fast, dvt, lungSliding]
  );

  return (
    <>
      <ScanLineCard style={{ padding: 12, marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: theme.text.secondary, lineHeight: 1.6, margin: 0 }}>
          RUSH: <strong style={{ color: theme.text.primary }}>Pump</strong> (corazón) +{" "}
          <strong style={{ color: theme.text.primary }}>Tank</strong> (VCI, FAST) +{" "}
          <strong style={{ color: theme.text.primary }}>Pipes</strong> (DVT, pleura). Selecciona hallazgos.
        </p>
      </ScanLineCard>

      <OptionGroup
        label="THE PUMP — FE VISUAL"
        value={fe}
        onChange={setFe}
        options={[
          { id: "hyper", label: "Hiperdinámica" },
          { id: "normal", label: "Normal / preservada" },
          { id: "reduced", label: "Reducida (&lt;40–45%)" },
        ]}
      />
      <OptionGroup
        label="PERICARDIO"
        value={pericardium}
        onChange={setPericardium}
        options={[
          { id: "none", label: "Sin derrame relevante" },
          { id: "effusion", label: "Derrame sin taponamiento" },
          { id: "tamponade", label: "Taponamiento cardíaco" },
        ]}
      />
      <OptionGroup
        label="VD / TEP"
        value={rv}
        onChange={setRv}
        options={[
          { id: "normal", label: "VD no dilatado" },
          { id: "dilated", label: "VD dilatado / septo hacia VI" },
        ]}
      />
      <OptionGroup
        label="THE TANK — VCI"
        value={ivc}
        onChange={setIvc}
        options={[
          { id: "collapsed", label: "Colapsada &lt; 1–1.5 cm" },
          { id: "normal", label: "Normal ~1.5–2 cm" },
          { id: "dilated", label: "Dilatada &gt; 2 cm, poco colapso" },
        ]}
      />
      <OptionGroup
        label="FAST (LÍQUIDO LIBRE)"
        value={fast}
        onChange={setFast}
        options={[
          { id: "not-done", label: "No realizado" },
          { id: "negative", label: "Negativo" },
          { id: "positive", label: "Positivo" },
        ]}
      />
      <OptionGroup
        label="PLEURA / NEUMOTÓRAX"
        value={lungSliding ? "yes" : "no"}
        onChange={(v) => setLungSliding(v === "yes")}
        options={[
          { id: "yes", label: "Deslizamiento pleural presente" },
          { id: "no", label: "Sin deslizamiento (eFAST)" },
        ]}
      />
      <OptionGroup
        label="THE PIPES — DVT"
        value={dvt}
        onChange={setDvt}
        options={[
          { id: "not-done", label: "No evaluado" },
          { id: "negative", label: "Compresión negativa" },
          { id: "positive", label: "DVT positivo" },
        ]}
      />

      <ScanLineCard
        style={{
          padding: 16,
          border: `1px solid ${theme.brand.redBorder}`,
          background: theme.brand.redMuted,
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 4 }}>{result.emoji}</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: theme.brand.red }}>
          {result.type}
        </div>
        <ul style={{ margin: "12px 0", paddingLeft: 18, fontSize: 12, color: theme.text.secondary }}>
          {result.findings.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p style={{ fontSize: 12, color: theme.text.primary, lineHeight: 1.6 }}>{result.management}</p>
      </ScanLineCard>
    </>
  );
}
