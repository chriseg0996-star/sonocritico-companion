export type {
  GuardScenarioId,
  GuardScenario,
  CompanionLink,
  CompanionSuggestionGroup,
  CompanionLastUse,
} from "@/lib/companion/types";
export { GUARD_SCENARIOS, getGuardScenario, isGuardScenarioId } from "@/lib/companion/scenarios";
export { loadCompanionLastUse, saveCompanionLastUse } from "@/lib/companion/storage";
export type { CompanionPanelModel } from "@/lib/companion/panel-types";
export { buildCompanionPanelModel } from "@/lib/companion/panel-model";
