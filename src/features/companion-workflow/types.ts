export type WorkflowOption = {
  label: string;
  value: string;
  /** Id del siguiente paso o clave de resultado (`result-*`). */
  next: string;
};

export type WorkflowStep = {
  id: string;
  pregunta: string;
  opciones: WorkflowOption[];
};

export type WorkflowResult = {
  diagnostico: string;
  certeza: "alta" | "media" | "baja";
  acciones: string[];
};

export type WorkflowState = {
  pasosCompletados: string[];
  respuestas: Record<string, string>;
  resultado: WorkflowResult | null;
};

export type WorkflowPhase = "intro" | "steps" | "result";

export type WorkflowProtocol = {
  id: string;
  title: string;
  intro: string;
  firstStepId: string;
  steps: Record<string, WorkflowStep>;
  results: Record<string, WorkflowResult>;
};
