export type { KnowledgeDomainId, KnowledgeDomainConfig } from "@/lib/progreso/domains";
export { KNOWLEDGE_DOMAINS, getKnowledgeDomain, DOMAIN_VERTEX_ANGLES } from "@/lib/progreso/domains";
export { loadSelectedDomain, saveSelectedDomain } from "@/lib/progreso/storage";
export type { DomainStats, KnowledgeHexSnapshot, KnowledgeRecommendation } from "@/lib/progreso/compute";
export {
  computeKnowledgeHex,
  getKnowledgeRecommendations,
  growthFactor,
} from "@/lib/progreso/compute";
