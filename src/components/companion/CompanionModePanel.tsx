"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  GUARD_SCENARIOS,
  getGuardScenario,
  isGuardScenarioId,
  loadCompanionLastUse,
  saveCompanionLastUse,
} from "@/lib/companion";
import type { GuardScenarioId } from "@/lib/companion";
import {
  dispatchCompanionOpenWorkflow,
  type CompanionProtocolId,
} from "@/features/companion-workflow/events";
import styles from "@/components/companion/companion-mode.module.css";

type Props = {
  /** Escenario inicial (p. ej. desde /guardia?escenario=disnea). */
  initialScenarioId?: string | null;
  showFullPageLink?: boolean;
  /** Callback opcional al elegir protocolo con flujo companion. */
  onProtocolSelect?: (protocolId: CompanionProtocolId) => void;
};

function protocolIdFromHref(href: string): CompanionProtocolId | null {
  if (href === "/protocolos/blue") return "blue";
  if (href === "/protocolos/fast") return "fast";
  if (href === "/protocolos/vexus") return "vexus";
  if (href === "/protocolos/rush") return "rush";
  return null;
}

/** Modo guardia — queja → protocolo / atlas / calculadora / caso en 1–2 toques. */
export function CompanionModePanel({
  initialScenarioId = null,
  showFullPageLink = false,
  onProtocolSelect,
}: Props) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<GuardScenarioId | null>(null);

  useEffect(() => {
    const fromUrl =
      initialScenarioId && isGuardScenarioId(initialScenarioId) ? initialScenarioId : null;
    const fromStore = loadCompanionLastUse()?.scenarioId ?? null;
    setActiveId(fromUrl ?? fromStore);
  }, [initialScenarioId]);

  const selectScenario = useCallback((id: GuardScenarioId) => {
    setActiveId(id);
    saveCompanionLastUse(id);
  }, []);

  const scenario = activeId ? getGuardScenario(activeId) : null;

  const openLink = (href: string) => {
    const protocolId = protocolIdFromHref(href);
    if (protocolId) {
      onProtocolSelect?.(protocolId);
      dispatchCompanionOpenWorkflow(protocolId);
      return;
    }
    router.push(href);
  };

  return (
    <section className={styles.panel} aria-labelledby="companion-mode-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Modo guardia</p>
          <h2 className={styles.title} id="companion-mode-title">
            Companion
          </h2>
        </div>
        <span className={styles.badge}>&lt;10 s</span>
      </div>

      <p className={styles.prompt}>Tengo…</p>

      <div className={styles.chips} role="tablist" aria-label="Presentación clínica">
        {GUARD_SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={activeId === s.id}
            className={`${styles.chip}${activeId === s.id ? ` ${styles.chipActive}` : ""}`}
            onClick={() => selectScenario(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {scenario ? (
        <>
          <p className={styles.hint}>{scenario.hint}</p>
          <div className={styles.suggestions}>
            {scenario.suggestions.map((group) => {
              const link = group.links[0];
              if (!link) return null;
              return (
                <div key={group.id} className={styles.row}>
                  <span className={styles.rowLabel}>{group.title}</span>
                  <button
                    type="button"
                    className={styles.rowLink}
                    onClick={() => openLink(link.href)}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={14} aria-hidden />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className={styles.hint}>Elige una queja para ver accesos directos.</p>
      )}

      {showFullPageLink && (
        <Link href="/guardia" className={styles.fullLink}>
          Abrir pantalla guardia
        </Link>
      )}
    </section>
  );
}
