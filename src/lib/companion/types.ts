export type GuardScenarioId = "disnea" | "choque" | "hipoxemia" | "oliguria" | "trauma";

export type CompanionLink = {
  label: string;
  href: string;
};

export type CompanionSuggestionGroup = {
  id: "protocols" | "atlas" | "calculators" | "cases";
  title: string;
  links: CompanionLink[];
};

export type GuardScenario = {
  id: GuardScenarioId;
  label: string;
  hint: string;
  suggestions: CompanionSuggestionGroup[];
};

export type CompanionLastUse = {
  scenarioId: GuardScenarioId;
  at: string;
};
