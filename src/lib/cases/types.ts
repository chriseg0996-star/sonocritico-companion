import type { AtlasFilterModule } from "@/lib/media/atlas-filters";

export type CaseStepKind =
  | "presentation"
  | "protocol"
  | "window"
  | "finding"
  | "conduct"
  | "summary";

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
  presentation: string;
  vitals: CaseVitals;
  tags: string[];
  steps: CaseFlowStep[];
  outcome: {
    title: string;
    explanation: string;
    teachingPoint: string;
  };
  /** Recursos sugeridos al cerrar */
  resources: CaseResourceLink;
};
