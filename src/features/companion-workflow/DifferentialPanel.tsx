"use client";

import { useCallback, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  Droplets,
  Heart,
  Stethoscope,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Btn } from "@/components/ui";
import { useCompanionPanelOptional } from "@/features/companion-panel";
import {
  getDifferentialAtlasContext,
  getDifferentialRedFlags,
  getDifferentials,
} from "@/features/companion-workflow/data/differentials";
import type { WorkflowResult } from "@/features/companion-workflow/types";
import styles from "@/features/companion-workflow/differential-panel.module.css";

const WORKFLOW_NOTES_KEY = "sonocritico-workflow-notes";

type Props = {
  resultado: WorkflowResult;
  /** Clave de resultado del workflow (`result-eap`, etc.) para mapeo fiable. */
  resultKey?: string | null;
  onNavigate?: () => void;
};

const CERTEZA_CLASS: Record<WorkflowResult["certeza"], string> = {
  alta: styles.certezaAlta,
  media: styles.certezaMedia,
  baja: styles.certezaBaja,
};

function iconForAlternative(id: string): LucideIcon {
  if (id.includes("eap")) return Wind;
  if (id.includes("neumonia")) return Stethoscope;
  if (id.includes("tep")) return Wind;
  if (id.includes("epoc")) return Wind;
  if (id.includes("derrame")) return Droplets;
  if (id.includes("tapon")) return Heart;
  return Stethoscope;
}

function lookupKey(resultado: WorkflowResult, resultKey?: string | null): string {
  return resultKey ?? resultado.diagnostico;
}

function clinicalAcciones(acciones: string[]): string[] {
  return acciones.filter((a) => !a.startsWith("Abrir:"));
}

export function DifferentialPanel({ resultado, resultKey, onNavigate }: Props) {
  const companionPanel = useCompanionPanelOptional();
  const [noteSaved, setNoteSaved] = useState(false);

  const lookup = lookupKey(resultado, resultKey);
  const alternativas = getDifferentials(lookup);
  const redFlags = getDifferentialRedFlags(lookup);
  const atlasCtx = getDifferentialAtlasContext(lookup);
  const pasos = clinicalAcciones(resultado.acciones);

  const openAtlas = useCallback(
    (term?: string) => {
      const q = term ?? atlasCtx.query ?? "";
      if (companionPanel) {
        companionPanel.openPanel("atlas", q);
        return;
      }
      onNavigate?.();
    },
    [atlasCtx.query, companionPanel, onNavigate],
  );

  const openCalculator = useCallback(() => {
    if (companionPanel) {
      companionPanel.openPanel("calculator", "vexus");
      return;
    }
    onNavigate?.();
  }, [companionPanel, onNavigate]);

  const saveNote = useCallback(() => {
    const entry = {
      diagnostico: resultado.diagnostico,
      certeza: resultado.certeza,
      at: new Date().toISOString(),
      pasos,
      alternativas: alternativas.map((a) => a.nombre),
    };
    try {
      const raw = localStorage.getItem(WORKFLOW_NOTES_KEY);
      const list = raw ? (JSON.parse(raw) as unknown[]) : [];
      const next = Array.isArray(list) ? [entry, ...list].slice(0, 20) : [entry];
      localStorage.setItem(WORKFLOW_NOTES_KEY, JSON.stringify(next));
      setNoteSaved(true);
    } catch {
      setNoteSaved(false);
    }
  }, [alternativas, pasos, resultado.certeza, resultado.diagnostico]);

  return (
    <div className={styles.panel}>
      <div className={styles.diagnosisBlock}>
        <h3 className={styles.diagnostico}>{resultado.diagnostico}</h3>
        <span
          className={`${styles.certezaChip} ${CERTEZA_CLASS[resultado.certeza] ?? styles.certezaBaja}`}
        >
          Certeza {resultado.certeza}
        </span>
      </div>

      {alternativas.length > 0 ? (
        <section aria-labelledby="workflow-alt-title">
          <h4 className={styles.sectionTitle} id="workflow-alt-title">
            Diagnósticos alternativos
          </h4>
          <ul className={styles.alternatives}>
            {alternativas.map((alt) => {
              const Icon = iconForAlternative(alt.id);
              return (
                <li key={alt.id}>
                  <button
                    type="button"
                    className={styles.altBtn}
                    onClick={() => openAtlas(alt.searchTerm)}
                  >
                    <span className={styles.altIcon} aria-hidden>
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <span className={styles.altBody}>
                      <span className={styles.altName}>
                        {alt.nombre}
                        <ArrowRight size={14} aria-hidden />
                      </span>
                      <p className={styles.altHint}>{alt.hint}</p>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {redFlags.length > 0 ? (
        <section aria-labelledby="workflow-flags-title">
          <h4 className={styles.sectionTitle} id="workflow-flags-title">
            Red flags
          </h4>
          <ul className={styles.redFlags}>
            {redFlags.map((flag) => (
              <li key={flag} className={styles.redFlagItem}>
                <AlertTriangle size={16} className={styles.redFlagIcon} aria-hidden />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {pasos.length > 0 ? (
        <section aria-labelledby="workflow-steps-title">
          <h4 className={styles.sectionTitle} id="workflow-steps-title">
            Próximos pasos
          </h4>
          <ul className={styles.accionesList}>
            {pasos.map((paso) => (
              <li key={paso}>{paso}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-label="Acciones rápidas">
        <div className={styles.quickActions}>
          <Btn variant="secondary" onClick={() => openAtlas()}>
            Ver en Atlas
          </Btn>
          <Btn variant="secondary" onClick={openCalculator}>
            <Calculator size={14} aria-hidden />
            Calculadora VExUS
          </Btn>
          <Btn variant="ghost" onClick={saveNote}>
            Guardar nota
          </Btn>
        </div>
        {noteSaved ? (
          <p className={styles.noteSaved} role="status">
            Nota guardada en este dispositivo
          </p>
        ) : null}
      </section>
    </div>
  );
}
