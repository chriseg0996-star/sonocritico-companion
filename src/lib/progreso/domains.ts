import type { MediaModuleId } from "@/lib/media/types";

export type KnowledgeDomainId =
  | "pulmon"
  | "fast"
  | "eco"
  | "vexus"
  | "neuro"
  | "procedimientos";

export type KnowledgeDomainConfig = {
  id: KnowledgeDomainId;
  label: string;
  shortLabel: string;
  color: string;
  moduleSlugs: string[];
  protocolSlugs: string[];
  mediaModule?: MediaModuleId;
  /** Clips de referencia si no hay manifest (neuro, procedimientos). */
  clipCapacity?: number;
};

export const KNOWLEDGE_DOMAINS: KnowledgeDomainConfig[] = [
  {
    id: "pulmon",
    label: "Pulmón",
    shortLabel: "Pulmón",
    color: "#5d8fd4",
    moduleSlugs: ["pulmonar-blue", "weaning-diafragma"],
    protocolSlugs: ["blue"],
    mediaModule: "lung",
  },
  {
    id: "fast",
    label: "FAST / eFAST",
    shortLabel: "FAST",
    color: "#6fae95",
    moduleSlugs: ["fast-efast"],
    protocolSlugs: ["fast"],
    mediaModule: "fast",
  },
  {
    id: "eco",
    label: "Eco",
    shortLabel: "Eco",
    color: "#9b8ec4",
    moduleSlugs: ["eco-critico", "respuesta-volumen"],
    protocolSlugs: ["eco-basica", "rush"],
    mediaModule: "cardiac",
  },
  {
    id: "vexus",
    label: "VExUS",
    shortLabel: "VExUS",
    color: "#c9b56a",
    moduleSlugs: ["vexus"],
    protocolSlugs: ["vexus"],
    mediaModule: "vexus",
  },
  {
    id: "neuro",
    label: "NeuroUSG",
    shortLabel: "Neuro",
    color: "#b86baf",
    moduleSlugs: ["neuro-pocus"],
    protocolSlugs: [],
    clipCapacity: 12,
  },
  {
    id: "procedimientos",
    label: "Procedimientos",
    shortLabel: "Proc.",
    color: "#5eb8c9",
    moduleSlugs: ["accesos-vasculares", "fundamentos"],
    protocolSlugs: ["acceso-vascular"],
    clipCapacity: 16,
  },
];

const BY_ID = new Map(KNOWLEDGE_DOMAINS.map((d) => [d.id, d]));

export function getKnowledgeDomain(id: KnowledgeDomainId): KnowledgeDomainConfig {
  return BY_ID.get(id)!;
}

/** Ángulo inicio (grados): vértice superior y sentido horario. */
export const DOMAIN_VERTEX_ANGLES: Record<KnowledgeDomainId, number> = {
  pulmon: -90,
  fast: -30,
  eco: 30,
  vexus: 90,
  neuro: 150,
  procedimientos: 210,
};
