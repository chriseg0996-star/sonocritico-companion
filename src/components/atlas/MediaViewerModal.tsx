"use client";

import type { AtlasComparisonPair, AtlasEntry } from "@/lib/atlas/types";
import { UltrasoundViewer, type ViewerMode } from "@/components/atlas/viewer/UltrasoundViewer";

type Props = {
  entry: AtlasEntry | null;
  entries: AtlasEntry[];
  comparePair?: AtlasComparisonPair | null;
  onClose: () => void;
  onNavigate: (entry: AtlasEntry) => void;
};

/** Wrapper compatible — usa UltrasoundViewer inmersivo */
export function MediaViewerModal({ entry, entries, comparePair, onClose, onNavigate }: Props) {
  let mode: ViewerMode | null = null;
  if (comparePair) mode = { type: "compare", pair: comparePair };
  else if (entry) mode = { type: "single", entry };

  return <UltrasoundViewer mode={mode} entries={entries} onClose={onClose} onNavigate={onNavigate} />;
}
