export type { KnowledgeDomainId, KnowledgeDomainConfig } from "@/lib/progreso/domains";
export { KNOWLEDGE_DOMAINS, getKnowledgeDomain, DOMAIN_VERTEX_ANGLES } from "@/lib/progreso/domains";
export { loadSelectedDomain, saveSelectedDomain } from "@/lib/progreso/storage";
export type { DomainStats, KnowledgeHexSnapshot, KnowledgeRecommendation } from "@/lib/progreso/compute";
export {
  computeKnowledgeHex,
  getKnowledgeRecommendations,
  growthFactor,
} from "@/lib/progreso/compute";
export { GROWTH_LEGEND, getGrowthStageLabel } from "@/lib/progreso/growth-stages";
export {
  getNextObjective,
  getRecentActivity,
  getEvolutionMilestones,
  getActivityTypeLabel,
} from "@/lib/progreso/page-helpers";
export type { RecentActivityItem, EvolutionMilestone } from "@/lib/progreso/page-helpers";
export { DOMINIO_LEGEND, getDominioBandColor } from "@/lib/progreso/dominio-legend";
export {
  recordEvolutionSnapshot,
  getEvolutionNodes,
  type EvolutionNode,
} from "@/lib/progreso/evolution";
