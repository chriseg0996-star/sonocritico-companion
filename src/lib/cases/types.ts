import type { AtlasFilterModule } from "@/lib/media/atlas-filters";

export type CaseStepKind =
  | "presentation"
  | "protocol"
  | "window"
  | "finding"
  | "conduct"
  | "summary";

export type CaseDifficulty = "basico" | "intermedio";

export type CaseResourceLink = {
  protocolSlug?: string;
  protocolStepId?: string;
  mediaId?: string;
  atlasModule?: AtlasFilterModule;
};

export type CaseChoice = {
  id: string;
  label: string;
  hint?: string;
  isOptimal: boolean;
  feedback: string;
  resource?: CaseResourceLink;
};

/** Nodo de decisión en flujo adaptativo. */
export type DecisionNode = {
  id: string;
  kind: CaseStepKind;
  title: string;
  prompt: string;
  difficulty: CaseDifficulty;
  choices: CaseChoice[];
};

/** Rama: decisión → siguiente nodo u outcome. */
export type CaseBranch = {
  fromNodeId: string;
  choiceId: string;
  nextNodeId?: string;
  outcomeId?: string;
};

/** Resultado según ruta tomada. */
export type CaseOutcome = {
  id: string;
  title: string;
  explanation: string;
  teachingPoint: string;
  pathType: "optimal" | "partial" | "incorrect";
  resources?: CaseResourceLink;
};

export type CaseRouteEntry = {
  nodeId: string;
  choiceId: string;
  isOptimal: boolean;
  points: number;
  at: string;
};

export type AdaptiveCaseGraph = {
  startNodeId: string;
  nodes: Record<string, DecisionNode>;
  outcomes: Record<string, CaseOutcome>;
  branches: CaseBranch[];
};

/** @deprecated Flujo lineal — usar adaptive cuando exista graph */
export type CaseFlowStep = {
  id: string;
  kind: CaseStepKind;
  title: string;
  prompt: string;
  choices: CaseChoice[];
};

export type CaseVitals = {
  hr: number;
  bp: string;
  rr: number;
  spo2: number;
  temp?: number;
};

export type InteractiveClinicalCase = {
  id: string;
  title: string;
  tagline: string;
  difficulty: CaseDifficulty;
  presentation: string;
  vitals: CaseVitals;
  tags: string[];
  /** Flujo adaptativo por ramas */
  graph?: AdaptiveCaseGraph;
  defaultResources: CaseResourceLink;
  /** Flujo lineal legacy */
  steps?: CaseFlowStep[];
  outcome?: {
    title: string;
    explanation: string;
    teachingPoint: string;
  };
};

export function isAdaptiveCase(
  caseDef: InteractiveClinicalCase,
): caseDef is InteractiveClinicalCase & { graph: AdaptiveCaseGraph } {
  return Boolean(caseDef.graph?.startNodeId && caseDef.graph.nodes);
}
