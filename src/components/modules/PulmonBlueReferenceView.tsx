"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Badge, Btn, ScanLineCard } from "@/components/ui/base";
import { CONTENT_NARROW_MAX_WIDTH } from "@/lib/layout-config";
import { ModuleClinicalBlock, ModuleSection } from "@/components/modules/reference/ModuleSection";
import { ModuleSectionNav } from "@/components/modules/reference/ModuleSectionNav";
import { FindingCard } from "@/components/modules/reference/FindingCard";
import { AlgorithmCard } from "@/components/modules/reference/AlgorithmCard";
import { BibliographyBlock } from "@/components/modules/reference/BibliographyBlock";
import { ErrorsCompactCard } from "@/components/modules/reference/ErrorsCompactCard";
import { PulmonAtlasPanel, PulmonCompareSection } from "@/components/atlas/PulmonAtlasPanel";
import { MediaViewerModal } from "@/components/atlas/MediaViewerModal";
import { pulmonAtlasEntries } from "@/lib/modules/pulmon-atlas";
import type { AtlasComparisonPair, AtlasEntry } from "@/lib/atlas/types";
import {
  pulmonHeader,
  operationalSummary,
  techniqueCards,
  normalFindings,
  pathologyFindings,
  blueAlgorithm,
  frequentErrors,
  bibliography,
  calculatorLinks,
  pulmonSectionNav,
} from "@/lib/modules/pulmonar-blue-reference";
import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";
import type { ModuleTabId } from "@/lib/module-tabs";

type Props = {
  onOpenSecondary?: (tab: ModuleTabId) => void;
};

const gridCalc = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: 8,
} as const;

export function PulmonBlueReferenceView({ onOpenSecondary }: Props) {
  const router = useRouter();
  const [viewerEntry, setViewerEntry] = useState<AtlasEntry | null>(null);
  const [viewerCompare, setViewerCompare] = useState<AtlasComparisonPair | null>(null);
  const [viewerNav, setViewerNav] = useState<AtlasEntry[]>(pulmonAtlasEntries);
  const handleNavListChange = useCallback((entries: AtlasEntry[]) => {
    setViewerNav(entries.length > 0 ? entries : pulmonAtlasEntries);
  }, []);
  const openEntry = useCallback((entry: AtlasEntry) => {
    setViewerCompare(null);
    setViewerEntry(entry);
  }, []);
  const openCompare = useCallback((pair: AtlasComparisonPair) => {
    setViewerEntry(null);
    setViewerCompare(pair);
  }, []);
  const closeViewer = useCallback(() => {
    setViewerEntry(null);
    setViewerCompare(null);
  }, []);

  return (
    <div style={{ maxWidth: CONTENT_NARROW_MAX_WIDTH, margin: "0 auto" }}>
      <header style={{ marginBottom: 20, paddingBottom: 4 }}>
        <h1 style={{ ...type.title, color: theme.text.primary, margin: "0 0 4px", lineHeight: 1.15, fontSize: "1.25rem" }}>
          {pulmonHeader.title}
        </h1>
        <p style={{ ...type.bodySm, color: theme.text.secondary, margin: "0 0 10px", fontSize: 12 }}>
          {pulmonHeader.subtitle}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
          {pulmonHeader.topicChips.map((chip) => (
            <Badge key={chip} variant="brand">
              {chip}
            </Badge>
          ))}
        </div>
      </header>

      <ModuleSectionNav links={[...pulmonSectionNav]} />

      <div className="ws-section-flow">
      <ModuleSection
        id="resumen"
        eyebrow="Referencia rápida"
        title="Resumen operativo"
        subtitle="Consulta en 30 s"
        surface="panel"
      >
        <ScanLineCard glow style={{ padding: "14px 18px" }}>
          <ul style={{ margin: 0, padding: "0 0 0 16px", color: theme.text.muted }}>
            {operationalSummary.map((point) => (
              <li key={point} style={{ ...type.bodySm, marginBottom: 6, fontSize: 12, lineHeight: 1.5 }}>
                {point}
              </li>
            ))}
          </ul>
        </ScanLineCard>
      </ModuleSection>

      <ModuleSection id="tecnica" eyebrow="Técnica" title="Técnica y ventanas">
        <div className="ws-technique-grid">
          {techniqueCards.map((card) => (
            <div
              key={card.title}
              className="ws-surface"
              style={{
                padding: "12px 14px",
                transition: `transform ${theme.motion.base}, background ${theme.motion.base}, box-shadow ${theme.motion.base}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.background = theme.bg.elevated;
                e.currentTarget.style.boxShadow = theme.shadow.card;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = theme.bg.card;
                e.currentTarget.style.boxShadow = theme.shadow.inset;
              }}
            >
              <h3 style={{ ...type.titleSm, fontSize: 12, color: theme.text.primary, margin: "0 0 4px" }}>
                {card.title}
              </h3>
              <p style={{ ...type.caption, color: theme.text.muted, margin: 0, lineHeight: 1.4, fontSize: 11 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </ModuleSection>

      <ModuleClinicalBlock>
        <ModuleSection id="normal" inset eyebrow="Hallazgos" title="Hallazgos normales">
          <div className="ws-finding-grid">
            {normalFindings.map((f) => (
              <FindingCard
                key={f.title}
                variant="normal"
                title={f.title}
                appearance={f.appearance}
                meaning={f.meaning}
                pitfall={f.pitfall}
              />
            ))}
          </div>
      </ModuleSection>

        <ModuleSection id="patologico" inset continued title="Hallazgos patológicos">
          <div className="ws-finding-grid">
            {pathologyFindings.map((f) => (
              <FindingCard
                key={f.title}
                variant="pathology"
                title={f.title}
                appearance={f.appearance}
                clinical={f.clinical}
                action={f.action}
              />
            ))}
          </div>
        </ModuleSection>
      </ModuleClinicalBlock>

      <ModuleSection id="blue" eyebrow="Algoritmo" title="Algoritmo BLUE" subtitle="Disnea aguda" surface="panel">
        <AlgorithmCard steps={blueAlgorithm} />
      </ModuleSection>

      <ModuleClinicalBlock variant="plain">
        <ModuleSection
          id="atlas"
          inset
          eyebrow="Galería clínica"
          title="Atlas visual"
          subtitle="Viewer tipo PACS — clic en hallazgo"
        >
          <PulmonAtlasPanel onOpenEntry={openEntry} onNavListChange={handleNavListChange} />
        </ModuleSection>

        <ModuleSection
          id="comparar"
          inset
          continued
          title="Comparar patrones"
          subtitle="Normal vs patológico lado a lado"
        >
          <PulmonCompareSection onOpen={openEntry} onCompare={openCompare} />
        </ModuleSection>
      </ModuleClinicalBlock>

      <ModuleSection id="errores" eyebrow="Seguridad clínica" title="Errores frecuentes" surface="panel">
        <ErrorsCompactCard items={frequentErrors} />
      </ModuleSection>

      <ModuleSection id="bibliografia" eyebrow="Evidencia" title="Bibliografía">
        <BibliographyBlock items={bibliography} />
      </ModuleSection>

      <ModuleSection id="calculadoras" eyebrow="Herramientas" title="Calculadoras relacionadas" surface="panel">
        <div style={gridCalc}>
          {calculatorLinks.map((calc) => {
            const canNavigate = Boolean(calc.href);
            return (
              <button
                key={calc.title}
                type="button"
                disabled={!canNavigate}
                onClick={() => calc.href && router.push(calc.href)}
                className="ws-surface"
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  cursor: canNavigate ? "pointer" : "not-allowed",
                  opacity: canNavigate ? 1 : 0.5,
                  width: "100%",
                  transition: `transform ${theme.motion.base}, background ${theme.motion.base}, box-shadow ${theme.motion.base}`,
                }}
                onMouseEnter={(e) => {
                  if (!canNavigate) return;
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.background = theme.bg.elevated;
                  e.currentTarget.style.boxShadow = theme.shadow.card;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = theme.bg.card;
                  e.currentTarget.style.boxShadow = theme.shadow.inset;
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <div>
                    <p style={{ ...type.titleSm, fontSize: 12, color: theme.text.primary, margin: "0 0 2px" }}>
                      {calc.title}
                    </p>
                    <p style={{ ...type.caption, color: theme.text.muted, margin: 0, fontSize: 10 }}>
                      {calc.description}
                    </p>
                    {calc.comingSoon && (
                      <p style={{ ...type.caption, color: theme.text.muted, margin: "4px 0 0", fontSize: 9 }}>
                        Próximamente
                      </p>
                    )}
                  </div>
                  {canNavigate && <ChevronRight size={14} color={theme.brand.primary} />}
                </div>
              </button>
            );
          })}
        </div>
      </ModuleSection>
      </div>

      {onOpenSecondary && (
        <ModuleSection eyebrow="Entrenamiento" title="Modo práctica" subtitle="Opcional">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <Btn variant="ghost" onClick={() => onOpenSecondary("quiz")} style={{ fontSize: 11 }}>
              Quiz
            </Btn>
            <Btn variant="ghost" onClick={() => onOpenSecondary("checklist")} style={{ fontSize: 11 }}>
              Checklist
            </Btn>
            <Btn variant="ghost" onClick={() => onOpenSecondary("protocolo")} style={{ fontSize: 11 }}>
              Protocolo
            </Btn>
          </div>
        </ModuleSection>
      )}

      <MediaViewerModal
        entry={viewerEntry}
        comparePair={viewerCompare}
        entries={viewerNav}
        onClose={closeViewer}
        onNavigate={openEntry}
      />
    </div>
  );
}
