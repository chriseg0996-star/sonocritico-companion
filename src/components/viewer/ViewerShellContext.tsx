"use client";

import { createContext, useContext, type ReactNode } from "react";

type ViewerShellValue = {
  openErrors?: () => void;
};

const ViewerShellContext = createContext<ViewerShellValue | null>(null);

export function ViewerShellProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ViewerShellValue;
}) {
  return <ViewerShellContext.Provider value={value}>{children}</ViewerShellContext.Provider>;
}

export function useViewerShell() {
  return useContext(ViewerShellContext);
}
