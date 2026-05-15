import type { AtlasEntry } from "@/lib/atlas/types";

export type PlaceholderVariant = NonNullable<AtlasEntry["placeholderVariant"]>;

export const placeholderGradients: Record<PlaceholderVariant, { gradient: string; label: string }> = {
  "pattern-a": {
    gradient: "linear-gradient(135deg, #171C24 0%, #34425B 50%, #0B0E12 100%)",
    label: "A",
  },
  blines: {
    gradient: "linear-gradient(180deg, #1a2230 0%, #34425B55 50%, #0B0E12 100%)",
    label: "B",
  },
  consolidation: {
    gradient: "linear-gradient(160deg, #1E2632 0%, #171C24 60%, #0B0E12 100%)",
    label: "C",
  },
  effusion: {
    gradient: "linear-gradient(180deg, #0d1218 0%, #5D7396 30%, #0B0E12 100%)",
    label: "D",
  },
  "lung-point": {
    gradient: "linear-gradient(90deg, #0B0E12 48%, #5D7396 50%, #171C24 52%, #0B0E12 100%)",
    label: "LP",
  },
  plaps: {
    gradient: "linear-gradient(145deg, #1a2030 0%, #34425B 40%, #0B0E12 100%)",
    label: "PL",
  },
  sliding: {
    gradient: "linear-gradient(120deg, #171C24 0%, #5D739644 50%, #0B0E12 100%)",
    label: "S",
  },
};
