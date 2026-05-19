"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  loadProtocolContext,
  saveProtocolContext,
  type PersistedProtocolContext,
} from "@/lib/protocols/protocol-context-storage";
import type { ProtocolReturnContext } from "@/lib/protocols/protocol-navigation";

type ProtocolContextValue = {
  returnToProtocol: ProtocolReturnContext | null;
  saveBeforeAtlas: (ctx: ProtocolReturnContext) => void;
  saveLastVisit: (protocolSlug: string, stepId: string, mediaId?: string) => void;
  clearReturn: () => void;
};

const ProtocolContext = createContext<ProtocolContextValue | null>(null);

const EMPTY: PersistedProtocolContext = {
  returnToProtocol: null,
  lastVisit: null,
};

export function ProtocolProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedProtocolContext>(EMPTY);

  useEffect(() => {
    setState(loadProtocolContext());
  }, []);

  const persist = useCallback((updater: (prev: PersistedProtocolContext) => PersistedProtocolContext) => {
    setState((prev) => {
      const next = updater(prev);
      saveProtocolContext(next);
      return next;
    });
  }, []);

  const saveBeforeAtlas = useCallback(
    (ctx: ProtocolReturnContext) => {
      persist((prev) => ({ ...prev, returnToProtocol: ctx }));
    },
    [persist],
  );

  const saveLastVisit = useCallback(
    (protocolSlug: string, stepId: string, mediaId?: string) => {
      persist((prev) => ({
        ...prev,
        lastVisit: { protocolSlug, stepId, mediaId },
      }));
    },
    [persist],
  );

  const clearReturn = useCallback(() => {
    persist((prev) => ({ ...prev, returnToProtocol: null }));
  }, [persist]);

  const value = useMemo(
    () => ({
      returnToProtocol: state.returnToProtocol,
      saveBeforeAtlas,
      saveLastVisit,
      clearReturn,
    }),
    [state.returnToProtocol, saveBeforeAtlas, saveLastVisit, clearReturn],
  );

  return <ProtocolContext.Provider value={value}>{children}</ProtocolContext.Provider>;
}

export function useProtocolContext(): ProtocolContextValue {
  const ctx = useContext(ProtocolContext);
  if (!ctx) {
    throw new Error("useProtocolContext must be used within ProtocolProvider");
  }
  return ctx;
}

export function useProtocolContextOptional(): ProtocolContextValue | null {
  return useContext(ProtocolContext);
}
