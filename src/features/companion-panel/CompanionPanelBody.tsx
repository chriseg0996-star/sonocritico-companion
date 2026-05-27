"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PulmonAtlasPanel } from "@/components/atlas/PulmonAtlasPanel";
import { MediaViewerModal } from "@/components/atlas/MediaViewerModal";
import { LusBlueTool } from "@/components/tools/LusBlueTool";
import { VexusCalculator } from "@/components/tools/VexusCalculator";
import { Btn } from "@/components/ui";
import { buildAtlasSearchHref } from "@/features/companion-workflow/data/differentials";
import type { CompanionPanelMode } from "@/features/companion-panel/usePanelState";
import type { AtlasEntry } from "@/lib/atlas/types";
import { buildAtlasNavList, pulmonAtlasEntries } from "@/lib/modules/pulmon-atlas";
import styles from "@/features/companion-panel/companion-panel.module.css";

type Props = {
  mode: CompanionPanelMode;
  query?: string;
  onClose: () => void;
};

function resolveCalculator(query?: string): "lus" | "vexus" | null {
  const q = (query ?? "").toLowerCase();
  if (q.includes("vexus")) return "vexus";
  if (q.includes("lus") || q.includes("blue")) return "lus";
  return null;
}

function resolveProtocolHref(query?: string): string {
  const slug = (query ?? "blue").replace(/^\/protocolos\//, "").trim() || "blue";
  return `/protocolos/${slug}`;
}

export function CompanionPanelBody({ mode, query, onClose }: Props) {
  const router = useRouter();
  const [viewerEntry, setViewerEntry] = useState<AtlasEntry | null>(null);
  const [navList, setNavList] = useState<AtlasEntry[]>(() =>
    buildAtlasNavList(pulmonAtlasEntries, "all"),
  );

  const calculatorKind = useMemo(() => resolveCalculator(query), [query]);

  const openFull = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  if (mode === "atlas") {
    const fullHref = buildAtlasSearchHref(query ?? "", "lung");
    return (
      <>
        <div className={styles.companionPanelAtlasWrap}>
          <PulmonAtlasPanel
            initialQuery={query}
            onOpenEntry={setViewerEntry}
            onNavListChange={setNavList}
          />
        </div>
        <div className={styles.companionPanelFooter}>
          <Btn variant="secondary" fullWidth onClick={() => openFull(fullHref)}>
            Abrir completo →
          </Btn>
        </div>
        {viewerEntry ? (
          <MediaViewerModal
            entry={viewerEntry}
            entries={navList.length > 0 ? navList : pulmonAtlasEntries}
            onClose={() => setViewerEntry(null)}
            onNavigate={setViewerEntry}
          />
        ) : null}
      </>
    );
  }

  if (mode === "calculator") {
    if (calculatorKind === "lus") {
      return (
        <>
          <div className={styles.companionPanelToolWrap}>
            <LusBlueTool />
          </div>
          <div className={styles.companionPanelFooter}>
            <Btn variant="secondary" fullWidth onClick={() => openFull("/herramientas/lus")}>
              Abrir completo →
            </Btn>
          </div>
        </>
      );
    }
    if (calculatorKind === "vexus") {
      return (
        <>
          <div className={styles.companionPanelToolWrap}>
            <VexusCalculator />
          </div>
          <div className={styles.companionPanelFooter}>
            <Btn variant="secondary" fullWidth onClick={() => openFull("/herramientas/vexus")}>
              Abrir completo →
            </Btn>
          </div>
        </>
      );
    }
    return (
      <Placeholder
        text="Calculadora no disponible en panel. Ábrela en pantalla completa."
        href="/herramientas"
        onOpen={openFull}
      />
    );
  }

  const protocolHref = resolveProtocolHref(query);
  return (
    <Placeholder
      text="El protocolo paso a paso se abre mejor en pantalla completa. El flujo guardia sigue activo detrás."
      href={protocolHref}
      onOpen={openFull}
    />
  );
}

function Placeholder({
  text,
  href,
  onOpen,
}: {
  text: string;
  href: string;
  onOpen: (href: string) => void;
}) {
  return (
    <div className={styles.companionPanelPlaceholder}>
      <p className={styles.companionPanelPlaceholderText}>{text}</p>
      <Btn variant="primary" fullWidth onClick={() => onOpen(href)}>
        Abrir completo →
      </Btn>
    </div>
  );
}
