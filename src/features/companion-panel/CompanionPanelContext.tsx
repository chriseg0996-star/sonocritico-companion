"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { CompanionPanel } from "@/features/companion-panel/CompanionPanel";
import { usePanelState, type CompanionPanelState } from "@/features/companion-panel/usePanelState";

const CompanionPanelContext = createContext<CompanionPanelState | null>(null);

type ProviderProps = {
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
  /** Estado elevado (p. ej. WorkflowController). */
  panelState?: CompanionPanelState;
};

export function CompanionPanelProvider({ children, onOpenChange, panelState }: ProviderProps) {
  const internalPanel = usePanelState();
  const panel = panelState ?? internalPanel;

  useEffect(() => {
    onOpenChange?.(panel.isOpen);
  }, [onOpenChange, panel.isOpen]);

  return (
    <CompanionPanelContext.Provider value={panel}>
      {children}
      <CompanionPanel
        isOpen={panel.isOpen}
        mode={panel.mode}
        query={panel.query}
        onClose={panel.closePanel}
      />
    </CompanionPanelContext.Provider>
  );
}

export function useCompanionPanel(): CompanionPanelState {
  const ctx = useContext(CompanionPanelContext);
  if (!ctx) {
    throw new Error("useCompanionPanel must be used within CompanionPanelProvider");
  }
  return ctx;
}

/** Opcional: no lanza si el provider no está montado (p. ej. /guardia sin panel). */
export function useCompanionPanelOptional(): CompanionPanelState | null {
  return useContext(CompanionPanelContext);
}
