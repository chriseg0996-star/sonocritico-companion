"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  listQuickActionsForContext,
  loadRecentQuickActions,
  runQuickAction,
  type QuickActionId,
  type RecentQuickAction,
} from "@/lib/actions";
import {
  resolveNavigationContext,
  type NavigationContext,
} from "@/lib/navigation";
import styles from "@/components/actions/quick-actions.module.css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  openSearch: () => void;
  contextHints?: Partial<Pick<NavigationContext, "mediaId" | "caseId" | "fromProtocol" | "fromStep">>;
};

export default function QuickActionsLayer({
  open,
  onOpenChange,
  openSearch,
  contextHints,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [recent, setRecent] = useState<RecentQuickAction[]>([]);
  const [error, setError] = useState<string | null>(null);

  const ctx = resolveNavigationContext(pathname, contextHints);
  const actions = listQuickActionsForContext(ctx);

  useEffect(() => {
    if (open) setRecent(loadRecentQuickActions());
  }, [open]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const invoke = useCallback(
    (id: QuickActionId) => {
      setError(null);
      const result = runQuickAction(id, ctx, {
        router,
        openSearch,
        onClosePanel: close,
      });
      if (!result.ok) setError(result.reason);
      else setRecent(loadRecentQuickActions());
    },
    [ctx, router, openSearch, close],
  );

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Cerrar acciones"
        onClick={close}
      />
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="quick-actions-title">
        <div className={styles.sheetHandle} aria-hidden />
        <h2 className={styles.sheetTitle} id="quick-actions-title">
          Acciones rápidas
        </h2>
        <p className={styles.sheetHint}>K buscar · G guardia · C casos · A atlas · Esc cerrar</p>

        {recent.length > 0 ? (
          <>
            <p className={styles.sectionLabel}>Recientes</p>
            <ul className={styles.actionList}>
              {recent.map((entry) => {
                const def = actions.find((a) => a.id === entry.id);
                if (!def) return null;
                const Icon = def.icon;
                return (
                  <li key={`${entry.id}-${entry.at}`}>
                    <button type="button" className={styles.actionBtn} onClick={() => invoke(entry.id)}>
                      <Icon size={16} strokeWidth={1.5} aria-hidden />
                      {entry.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}

        <p className={styles.sectionLabel}>Todas</p>
        <ul className={styles.actionList}>
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <li key={action.id}>
                <button type="button" className={styles.actionBtn} onClick={() => invoke(action.id)}>
                  <Icon size={16} strokeWidth={1.5} aria-hidden />
                  {action.label}
                  {action.shortcutKey ? <kbd>{action.shortcutKey}</kbd> : null}
                </button>
              </li>
            );
          })}
        </ul>

        {error ? <p className={styles.toast} role="status">{error}</p> : null}
      </div>
    </>
  );
}
