"use client";

import { useCallback, useState } from "react";

export type CompanionPanelMode = "atlas" | "calculator" | "protocol";

export function usePanelState() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CompanionPanelMode>("atlas");
  const [query, setQuery] = useState<string | undefined>(undefined);

  const openPanel = useCallback((nextMode: CompanionPanelMode, nextQuery?: string) => {
    setMode(nextMode);
    setQuery(nextQuery);
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    mode,
    query,
    openPanel,
    closePanel,
  };
}

export type CompanionPanelState = ReturnType<typeof usePanelState>;
