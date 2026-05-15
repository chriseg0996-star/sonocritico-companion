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
  morrison: {
    gradient: "linear-gradient(135deg, #171C24 0%, #2a3548 50%, #0B0E12 100%)",
    label: "RUQ",
  },
  "ruq-fluid": {
    gradient: "linear-gradient(135deg, #0d1520 0%, #1e3a5c 45%, #0B0E12 100%)",
    label: "RUQ+",
  },
  "luq-fluid": {
    gradient: "linear-gradient(145deg, #171C24 0%, #1e3a5c 55%, #0B0E12 100%)",
    label: "LUQ+",
  },
  "pelvis-fluid": {
    gradient: "linear-gradient(180deg, #0d1218 0%, #1e3a5c 35%, #0B0E12 100%)",
    label: "Pel+",
  },
  pericardial: {
    gradient: "radial-gradient(circle at 50% 45%, #5D739655 0%, #0B0E12 70%)",
    label: "Peri",
  },
  "pleural-sliding": {
    gradient: "linear-gradient(120deg, #171C24 0%, #5D739644 50%, #0B0E12 100%)",
    label: "Sl",
  },
  pneumothorax: {
    gradient: "linear-gradient(90deg, #0B0E12 45%, #C96B6B33 50%, #0B0E12 55%)",
    label: "NTX",
  },
  hemothorax: {
    gradient: "linear-gradient(180deg, #0d1218 0%, #3a2830 40%, #0B0E12 100%)",
    label: "HTX",
  },
  "plax-normal": {
    gradient: "linear-gradient(135deg, #171C24 0%, #34425B 50%, #0B0E12 100%)",
    label: "PLAX",
  },
  "fevi-reduced": {
    gradient: "linear-gradient(160deg, #1a2230 0%, #3a2830 60%, #0B0E12 100%)",
    label: "FE↓",
  },
  "fevi-hyper": {
    gradient: "linear-gradient(145deg, #171C24 0%, #2a3548 40%, #0B0E12 100%)",
    label: "FE↑",
  },
  "psax-mitral": {
    gradient: "radial-gradient(circle at 50% 50%, #34425B44 0%, #0B0E12 70%)",
    label: "PSAX",
  },
  "a4c-normal": {
    gradient: "linear-gradient(135deg, #171C24 0%, #34425B 50%, #0B0E12 100%)",
    label: "A4C",
  },
  "pericardial-echo": {
    gradient: "radial-gradient(circle at 55% 50%, #1e3a5c88 0%, #0B0E12 65%)",
    label: "Derr",
  },
  tamponade: {
    gradient: "radial-gradient(circle at 50% 45%, #C96B6B44 0%, #0B0E12 70%)",
    label: "Tap",
  },
  "rv-dilated": {
    gradient: "linear-gradient(145deg, #1a2030 0%, #34425B 40%, #0B0E12 100%)",
    label: "VD",
  },
  "d-shape": {
    gradient: "linear-gradient(90deg, #0B0E12 48%, #C96B6B33 50%, #0B0E12 52%)",
    label: "D",
  },
  "ivc-normal": {
    gradient: "linear-gradient(180deg, #171C24 0%, #5D739644 50%, #0B0E12 100%)",
    label: "IVC",
  },
  "ivc-plethoric": {
    gradient: "linear-gradient(180deg, #0d1218 0%, #1e3a5c 40%, #0B0E12 100%)",
    label: "IVC+",
  },
  "portal-normal": {
    gradient: "linear-gradient(90deg, #171C24 0%, #5D739644 100%)",
    label: "Port",
  },
  "portal-pulsatile": {
    gradient: "linear-gradient(90deg, #C96B6B33 0%, #5D739622 50%, #C96B6B33 100%)",
    label: "PPV+",
  },
  "hepatic-s-wave": {
    gradient: "linear-gradient(135deg, #171C24 0%, #34425B 60%, #0B0E12 100%)",
    label: "Hep S",
  },
  "hepatic-s-inversion": {
    gradient: "linear-gradient(90deg, #0B0E12 40%, #C96B6B44 60%, #0B0E12 100%)",
    label: "S inv",
  },
  "renal-continuous": {
    gradient: "linear-gradient(90deg, #5D739633 0%, #5D739655 100%)",
    label: "Ren+",
  },
  "renal-discontinuous": {
    gradient: "repeating-linear-gradient(90deg, #0B0E12 0 12px, #C96B6B22 12px 24px)",
    label: "Ren-",
  },
  "vexus-severe": {
    gradient: "linear-gradient(160deg, #3a2830 0%, #1e3a5c 50%, #0B0E12 100%)",
    label: "VEx",
  },
};
