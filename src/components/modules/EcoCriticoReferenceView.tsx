"use client";

import { useCallback, useState } from "react";
import { ModuleClinicalBlock, ModuleSection } from "@/components/modules/reference/ModuleSection";
import { ModuleSectionNav } from "@/components/modules/reference/ModuleSectionNav";
import { FindingCard } from "@/components/modules/reference/FindingCard";
import { AlgorithmCard } from "@/components/modules/reference/AlgorithmCard";
import { BibliographyBlock } from "@/components/modules/reference/BibliographyBlock";
import { ErrorsCompactCard } from "@/components/modules/reference/ErrorsCompactCard";
import { CardiacAtlasPanel, CardiacCompareSection } from "@/components/atlas/CardiacAtlasPanel";
import { MediaViewerModal } from "@/components/atlas/MediaViewerModal";
import { cardiacAtlasEntries } from "@/lib/modules/cardiac-atlas";
import type { AtlasComparisonPair, AtlasEntry } from "@/lib/atlas/types";
import {
  ecoHeader,
  operationalSummary,
  techniqueCards,
  normalFindings,
  pathologyFindings,
  ecoAlgorithm,
  frequentErrors,
  bibliography,
  ecoSectionNav,
} from "@/lib/modules/eco-critico-reference";
import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";
import { Badge, Btn, ScanLineCard } from "@/components/ui/base";
import type { ModuleTabId } from "@/lib/module-tabs";

type Props = {
  onOpenSecondary?: (tab: ModuleTabId) => void;
};

export function EcoCriticoReferenceView({ onOpenSecondary }: Props) {
  const [viewerEntry, setViewerEntry] = useState<AtlasEntry | null>(null);
  const [viewerCompare, setViewerCompare] = useState<AtlasComparisonPair | null>(null);
  const [viewerNav, setViewerNav] = useState<AtlasEntry[]>(cardiacAtlasEntries);

  const handleNavListChange = useCallback((entries: AtlasEntry[]) => {
    setViewerNav(entries.length > 0 ? entries : cardiacAtlasEntries);
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
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <header style={{ marginBottom: 20, paddingBottom: 4 }}>
        <h1 style={{ ...type.title, color: theme.text.primary, margin: "0 0 4px", lineHeight: 1.15, fontSize: "1.25rem" }}>
          {ecoHeader.title}
        </h1>
        <p style={{ ...type.bodySm, color: theme.text.secondary, margin: "0 0 10px", fontSize: 12 }}>
          {ecoHeader.subtitle}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
          {ecoHeader.topicChips.map((chip) => (
            <Badge key={chip} variant="brand">
              {chip}
            </Badge>
          ))}
        </div>
      </header>

      <ModuleSectionNav links={[...ecoSectionNav]} />

      <div className="ws-section-flow">
        <ModuleSection
          id="resumen"
          eyebrow="Referencia rápida"
          title="Resumen operativo"
          subtitle="Cabecera del enfermo grave"
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
              <div key={card.title} className="ws-surface" style={{ padding: "12px 14px" }}>
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

        <ModuleSection id="algoritmo" eyebrow="Algoritmo" title="Algoritmo clínico" subtitle="Shock y congestión" surface="panel">
          <AlgorithmCard steps={ecoAlgorithm} />
        </ModuleSection>

        <ModuleClinicalBlock variant="plain">
          <ModuleSection
            id="atlas"
            inset
            eyebrow="Galería clínica"
            title="Galería cardíaca"
            subtitle="Viewer tipo PACS — clic en ventana"
          >
            <CardiacAtlasPanel onOpenEntry={openEntry} onNavListChange={handleNavListChange} />
          </ModuleSection>

          <ModuleSection
            id="comparar"
            inset
            continued
            title="Comparar patrones"
            subtitle="Normal vs patológico"
          >
            <CardiacCompareSection onOpen={openEntry} onCompare={openCompare} />
          </ModuleSection>
        </ModuleClinicalBlock>

        <ModuleSection id="errores" eyebrow="Seguridad clínica" title="Errores frecuentes" surface="panel">
          <ErrorsCompactCard items={frequentErrors} />
        </ModuleSection>

        <ModuleSection id="bibliografia" eyebrow="Evidencia" title="Bibliografía">
          <BibliographyBlock items={bibliography} />
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
