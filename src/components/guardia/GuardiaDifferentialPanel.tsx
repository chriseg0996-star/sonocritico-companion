"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  CONTEXT_OPTIONS,
  FINDING_OPTIONS,
  SYMPTOM_OPTIONS,
  getContextLabel,
  getFindingLabel,
  getSymptomLabel,
  type ContextId,
  type DifferentialInput,
  type DifferentialResult,
  type FindingId,
  type StoredDifferentialAnalysis,
  type SymptomId,
} from "@/lib/decision";
import {
  analyzeDifferential,
  appendDifferentialAnalysis,
  loadDifferentialHistory,
} from "@/lib/engine";
import styles from "@/components/guardia/guardia-differential.module.css";

function makeAnalysisId(): string {
  return `dx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Diferencial dinámico — síntoma + hallazgo US + contexto → score por reglas. */
export function GuardiaDifferentialPanel() {
  const router = useRouter();
  const [symptomId, setSymptomId] = useState<SymptomId | null>(null);
  const [findingId, setFindingId] = useState<FindingId | null>(null);
  const [contextId, setContextId] = useState<ContextId | null>(null);
  const [result, setResult] = useState<DifferentialResult | null>(null);
  const [history, setHistory] = useState<StoredDifferentialAnalysis[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const refreshHistory = useCallback(() => {
    setHistory(loadDifferentialHistory());
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const inputComplete = symptomId !== null && findingId !== null && contextId !== null;

  const runAnalysis = useCallback(
    (input: DifferentialInput) => {
      const analysis = analyzeDifferential(input);
      setResult(analysis);
      const top = analysis.probable[0]?.label ?? "Sin score";
      const entry: StoredDifferentialAnalysis = {
        id: makeAnalysisId(),
        input,
        topLabel: top,
        at: analysis.analyzedAt,
        result: analysis,
      };
      appendDifferentialAnalysis(entry);
      refreshHistory();
    },
    [refreshHistory],
  );

  useEffect(() => {
    if (!inputComplete || !symptomId || !findingId || !contextId) {
      setResult(null);
      return;
    }
    runAnalysis({ symptomId, findingId, contextId });
  }, [symptomId, findingId, contextId, inputComplete, runAnalysis]);

  const restoreFromHistory = (entry: StoredDifferentialAnalysis) => {
    setSymptomId(entry.input.symptomId);
    setFindingId(entry.input.findingId);
    setContextId(entry.input.contextId);
    setResult(entry.result);
    setHistoryOpen(false);
  };

  const summaryLine = useMemo(() => {
    if (!symptomId || !findingId) return null;
    return `${getSymptomLabel(symptomId)} + ${getFindingLabel(findingId)}`;
  }, [symptomId, findingId]);

  const openHref = (href: string) => router.push(href);

  return (
    <section className={styles.panel} aria-labelledby="guardia-differential-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Modo guardia</p>
          <h2 className={styles.title} id="guardia-differential-title">
            Diferencial dinámico
          </h2>
        </div>
        <span className={styles.badge}>reglas</span>
      </div>

      <SelectorField
        label="Síntoma"
        options={SYMPTOM_OPTIONS}
        value={symptomId}
        onChange={setSymptomId}
      />
      <SelectorField
        label="Hallazgo US"
        options={FINDING_OPTIONS}
        value={findingId}
        onChange={setFindingId}
      />
      <SelectorField
        label="Contexto"
        options={CONTEXT_OPTIONS}
        value={contextId}
        onChange={setContextId}
      />

      {!inputComplete ? (
        <p className={styles.hint}>Selecciona síntoma, hallazgo y contexto para generar el diferencial.</p>
      ) : null}

      {result && inputComplete ? (
        <>
          {summaryLine ? <p className={styles.hint}>{summaryLine}</p> : null}

          <ResultSection title="Probables">
            <DiagnosisList items={result.probable} />
          </ResultSection>

          <ResultSection title="No perder">
            <DiagnosisList items={result.dontMiss} critical />
          </ResultSection>

          <ResultSection title="Siguiente estudio">
            <p className={styles.nextStudy}>{result.nextStudy}</p>
          </ResultSection>

          <ResultSection title="Acciones">
            <div className={styles.ctas}>
              <button
                type="button"
                className={styles.ctaBtn}
                onClick={() => openHref(result.ctas.protocol.href)}
              >
                <span>{result.ctas.protocol.label}</span>
                <ChevronRight size={14} aria-hidden />
              </button>
              <button
                type="button"
                className={styles.ctaBtn}
                onClick={() => openHref(result.ctas.atlas.href)}
              >
                <span>{result.ctas.atlas.label}</span>
                <ChevronRight size={14} aria-hidden />
              </button>
              <button
                type="button"
                className={styles.ctaBtn}
                onClick={() => openHref(result.ctas.calculator.href)}
              >
                <span>{result.ctas.calculator.label}</span>
                <ChevronRight size={14} aria-hidden />
              </button>
              <button
                type="button"
                className={styles.ctaBtn}
                onClick={() => openHref(result.ctas.case.href)}
              >
                <span>{result.ctas.case.label}</span>
                <ChevronRight size={14} aria-hidden />
              </button>
            </div>
          </ResultSection>
        </>
      ) : null}

      <div className={styles.history}>
        <button
          type="button"
          className={styles.historyToggle}
          onClick={() => setHistoryOpen((o) => !o)}
          aria-expanded={historyOpen}
        >
          Últimos análisis ({history.length}/10)
        </button>
        {historyOpen && history.length > 0 ? (
          <div className={styles.historyList}>
            {history.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={styles.historyItem}
                onClick={() => restoreFromHistory(entry)}
              >
                <span>
                  {getSymptomLabel(entry.input.symptomId)} · {getFindingLabel(entry.input.findingId)} ·{" "}
                  {getContextLabel(entry.input.contextId)}
                </span>
                <span className={styles.historyMeta}>
                  {entry.topLabel} · {new Date(entry.at).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" })}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function SelectorField<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T | null;
  onChange: (id: T) => void;
}) {
  return (
    <div className={styles.fieldBlock}>
      <p className={styles.fieldLabel}>{label}</p>
      <div className={styles.chips} role="listbox" aria-label={label}>
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="option"
            aria-selected={value === opt.id}
            className={`${styles.chip}${value === opt.id ? ` ${styles.chipActive}` : ""}`}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {children}
    </div>
  );
}

function DiagnosisList({
  items,
  critical = false,
}: {
  items: DifferentialResult["probable"];
  critical?: boolean;
}) {
  if (items.length === 0) {
    return <p className={styles.hint}>Sin entradas con score suficiente.</p>;
  }
  return (
    <ul className={styles.dxList}>
      {items.map((dx) => (
        <li
          key={dx.id}
          className={`${styles.dxItem}${critical ? ` ${styles.dxItemCritical}` : ""}`}
        >
          <span className={styles.dxLabel}>{dx.label}</span>
          <span className={styles.dxScore}>{dx.percent}%</span>
        </li>
      ))}
    </ul>
  );
}
