"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ClinicalSearchOverlay } from "@/components/search/ClinicalSearchOverlay";
import { MediaViewerModal } from "@/components/atlas/MediaViewerModal";
import { getAtlasEntryById, pulmonAtlasEntries } from "@/lib/modules/pulmon-atlas";
import type { AtlasEntry } from "@/lib/atlas/types";
import type { ClinicalSearchResult } from "@/lib/search/types";

type ClinicalSearchContextValue = {
  open: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const ClinicalSearchContext = createContext<ClinicalSearchContextValue | null>(null);

export function useClinicalSearch(): ClinicalSearchContextValue {
  const ctx = useContext(ClinicalSearchContext);
  if (!ctx) throw new Error("useClinicalSearch must be used within ClinicalSearchProvider");
  return ctx;
}

export function ClinicalSearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [viewerEntry, setViewerEntry] = useState<AtlasEntry | null>(null);

  const openSearch = useCallback(() => setOpen(true), []);
  const closeSearch = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSelect = useCallback(
    (result: ClinicalSearchResult) => {
      setOpen(false);
      if (result.atlasEntryId) {
        const entry = getAtlasEntryById(result.atlasEntryId);
        if (entry) {
          setViewerEntry(entry);
          return;
        }
      }
      if (result.href) router.push(result.href);
    },
    [router]
  );

  const viewerNav = useMemo(() => pulmonAtlasEntries, []);

  const value = useMemo(
    () => ({ open, openSearch, closeSearch }),
    [open, openSearch, closeSearch]
  );

  return (
    <ClinicalSearchContext.Provider value={value}>
      {children}
      <ClinicalSearchOverlay open={open} onClose={closeSearch} onSelect={handleSelect} />
      {viewerEntry && (
        <MediaViewerModal
          entry={viewerEntry}
          entries={viewerNav}
          onClose={() => setViewerEntry(null)}
          onNavigate={setViewerEntry}
        />
      )}
    </ClinicalSearchContext.Provider>
  );
}
