"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList } from "lucide-react";
import { ScanLineCard, Btn } from "@/components/ui/base";
import {
  ProtocolChecklistPanel,
  ProtocolFlowPanel,
  ProtocolQuizPanel,
} from "@/components/protocol/ProtocolPanels";
import { getModuleContent, getModuleImageIds } from "@/lib/module-content";
import { getModulePracticeProtocol } from "@/lib/module-practice";
import type { ModuleTabId } from "@/lib/module-tabs";
import { getProtocol, getImage } from "@/lib/mock-data";
import type { CourseModule } from "@/types";
import type { FlowNode } from "@/types";
import type { LocalProgress } from "@/lib/auth";
import { theme } from "@/lib/theme";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        color: theme.brand.red,
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: 1,
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

export function ModuleTabContent({
  mod,
  tab,
  progress,
  onProgressChange,
  onMarkComplete,
  isComplete,
}: {
  mod: CourseModule;
  tab: ModuleTabId;
  progress: LocalProgress;
  onProgressChange: (p: LocalProgress) => void;
  onMarkComplete: () => void;
  isComplete: boolean;
}) {
  const router = useRouter();
  const content = getModuleContent(mod.slug);
  const primaryProtocol = mod.protocolSlugs[0];
  const proto = primaryProtocol ? getProtocol(primaryProtocol) : getModulePracticeProtocol(mod.slug);
  const quizRef = primaryProtocol ? primaryProtocol : `mod-${mod.slug}`;
  const [activeNode, setActiveNode] = useState<FlowNode | null>(null);

  if (tab === "resumen") {
    return (
      <ScanLineCard style={{ padding: 16 }}>
        <SectionLabel>POR QUÉ ESTE MÓDULO</SectionLabel>
        <p style={{ fontSize: 14, color: theme.text.primary, lineHeight: 1.6, marginBottom: 16 }}>{mod.summary}</p>

        <SectionLabel>CUÁNDO USARLO</SectionLabel>
        <ul style={{ margin: "0 0 16px", paddingLeft: 18, fontSize: 13, color: theme.text.secondary, lineHeight: 1.7 }}>
          {content.cuandoUsar.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <SectionLabel>LIMITACIONES</SectionLabel>
        <ul style={{ margin: "0 0 16px", paddingLeft: 18, fontSize: 13, color: theme.text.secondary, lineHeight: 1.7 }}>
          {content.limitaciones.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {mod.isCapstone && (
          <Btn variant="primary" fullWidth onClick={() => router.push("/casos")} style={{ marginBottom: 10 }}>
            Abrir casos clínicos del curso
          </Btn>
        )}

        {!isComplete && (
          <Btn variant="ghost" fullWidth onClick={onMarkComplete}>
            <ClipboardList size={14} /> Marcar módulo como completado
          </Btn>
        )}
      </ScanLineCard>
    );
  }

  if (tab === "adquisicion") {
    const { adquisicion: a } = content;
    return (
      <ScanLineCard style={{ padding: 16 }}>
        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <SectionLabel>SONDA</SectionLabel>
            <p style={{ fontSize: 13, color: theme.text.primary, margin: 0 }}>{a.sonda}</p>
          </div>
          <div>
            <SectionLabel>PRESET</SectionLabel>
            <p style={{ fontSize: 13, color: theme.text.primary, margin: 0 }}>{a.preset}</p>
          </div>
          <div>
            <SectionLabel>VENTANAS / CORTES</SectionLabel>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.text.secondary, lineHeight: 1.7 }}>
              {a.ventanas.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>TIPS</SectionLabel>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.text.secondary, lineHeight: 1.7 }}>
              {a.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          {a.errores.length > 0 && (
            <div>
              <SectionLabel>ERRORES FRECUENTES</SectionLabel>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: theme.text.muted, lineHeight: 1.7 }}>
                {a.errores.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ScanLineCard>
    );
  }

  if (tab === "hallazgos") {
    const imageIds = getModuleImageIds(mod.slug);
    return (
      <>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <ScanLineCard style={{ padding: 14 }}>
            <SectionLabel>NORMAL</SectionLabel>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: theme.text.secondary, lineHeight: 1.6 }}>
              {content.hallazgos.normal.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </ScanLineCard>
          <ScanLineCard style={{ padding: 14 }}>
            <SectionLabel>PATOLÓGICO</SectionLabel>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: theme.text.secondary, lineHeight: 1.6 }}>
              {content.hallazgos.patologico.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </ScanLineCard>
        </div>
        {imageIds.length > 0 && (
          <ScanLineCard style={{ padding: 14 }}>
            <SectionLabel>IMÁGENES DE REFERENCIA</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
              {imageIds.map((id) => {
                const img = getImage(id);
                if (!img) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => router.push(`/imagenes?id=${id}`)}
                    style={{
                      border: `1px solid ${theme.bg.border}`,
                      borderRadius: 8,
                      overflow: "hidden",
                      padding: 0,
                      background: theme.bg.elevated,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <img src={img.thumbnailSrc} alt={img.finding} style={{ width: "100%", height: 80, objectFit: "cover" }} />
                    <div style={{ padding: "6px 8px", fontSize: 10, color: theme.text.secondary }}>{img.finding}</div>
                  </button>
                );
              })}
            </div>
            <Btn variant="ghost" onClick={() => router.push("/imagenes")} style={{ marginTop: 10, fontSize: 11 }}>
              Ver biblioteca completa
            </Btn>
          </ScanLineCard>
        )}
        {mod.isCapstone && (
          <ScanLineCard style={{ padding: 14, marginTop: 10 }}>
            <Btn variant="primary" fullWidth onClick={() => router.push("/casos")}>
              Practicar con casos clínicos
            </Btn>
          </ScanLineCard>
        )}
      </>
    );
  }

  if (tab === "protocolo") {
    if (!proto) {
      return (
        <ScanLineCard style={{ padding: 16 }}>
          <p style={{ fontSize: 13, color: theme.text.secondary, lineHeight: 1.6 }}>
            No hay árbol de decisión para este módulo. Revisa el resumen y la biblioteca de imágenes.
          </p>
        </ScanLineCard>
      );
    }
    return (
      <ProtocolFlowPanel
        proto={proto}
        activeNode={activeNode}
        onNodeClick={setActiveNode}
        onCloseNode={() => setActiveNode(null)}
      />
    );
  }

  if (tab === "checklist") {
    if (!proto) {
      return (
        <ScanLineCard style={{ padding: 16 }}>
          <p style={{ fontSize: 13, color: theme.text.secondary }}>Checklist en desarrollo para este módulo.</p>
        </ScanLineCard>
      );
    }
    return <ProtocolChecklistPanel proto={proto} progress={progress} onProgressChange={onProgressChange} />;
  }

  if (tab === "quiz") {
    return <ProtocolQuizPanel protocolSlug={quizRef} />;
  }

  if (tab === "pocket") {
    return (
      <ScanLineCard style={{ padding: 16 }}>
        <SectionLabel>RESUMEN RÁPIDO</SectionLabel>
        <ul
          style={{
            margin: 0,
            paddingLeft: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {content.pocketCard.map((line, i) => (
            <li
              key={line}
              style={{
                display: "flex",
                gap: 10,
                fontSize: 13,
                color: theme.text.primary,
                lineHeight: 1.5,
                padding: "10px 12px",
                borderRadius: 8,
                border: `1px solid ${theme.bg.border}`,
                background: theme.bg.elevated,
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  color: theme.brand.red,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              {line}
            </li>
          ))}
        </ul>
      </ScanLineCard>
    );
  }

  return null;
}
