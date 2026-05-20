export type {
  GuardScenarioId,
  GuardScenario,
  CompanionLink,
  CompanionSuggestionGroup,
  CompanionLastUse,
} from "@/lib/companion/types";
export { GUARD_SCENARIOS, getGuardScenario, isGuardScenarioId } from "@/lib/companion/scenarios";
export { loadCompanionLastUse, saveCompanionLastUse } from "@/lib/companion/storage";
