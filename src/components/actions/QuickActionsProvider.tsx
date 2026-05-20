"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useClinicalSearch } from "@/components/search/ClinicalSearchProvider";
import { QUICK_NAV, resolveNavigationContext, shouldShowQuickActions } from "@/lib/navigation";
import type { NavigationContext } from "@/lib/navigation";
import styles from "@/components/actions/quick-actions.module.css";

const QuickActionsLayer = dynamic(() => import("@/components/actions/QuickActionsLayer"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  children: React.ReactNode;
  contextHints?: Partial<Pick<NavigationContext, "mediaId" | "caseId" | "fromProtocol" | "fromStep">>;
  /** Visor fullscreen — FAB más bajo (sin bottom nav). */
  variant?: "default" | "viewer";
};

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export function QuickActionsProvider({ children, contextHints, variant = "default" }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { openSearch } = useClinicalSearch();
  const [open, setOpen] = useState(false);
  const [layerMounted, setLayerMounted] = useState(false);

  const visible = shouldShowQuickActions(pathname);

  const openPanel = useCallback(() => {
    setLayerMounted(true);
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!visible) return;

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      if (e.key === "Escape") {
        if (open) {
          e.preventDefault();
          closePanel();
        }
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();
      if (key === "k") {
        e.preventDefault();
        openSearch();
        return;
      }
      if (key === "g") {
        e.preventDefault();
        router.push(QUICK_NAV.guardia);
        return;
      }
      if (key === "c") {
        e.preventDefault();
        router.push(QUICK_NAV.casos);
        return;
      }
      if (key === "a") {
        e.preventDefault();
        router.push(QUICK_NAV.atlas);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, open, closePanel, openSearch, router]);

  const hints = useMemo(() => contextHints, [contextHints]);

  if (!visible) return <>{children}</>;

  return (
    <>
      {children}
      <button
        type="button"
        className={`${styles.fab}${variant === "viewer" ? ` ${styles.fabViewer}` : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => (open ? closePanel() : openPanel())}
      >
        ⌘ Acciones
      </button>
      {layerMounted ? (
        <QuickActionsLayer
          open={open}
          onOpenChange={setOpen}
          openSearch={openSearch}
          contextHints={hints}
        />
      ) : null}
    </>
  );
}
