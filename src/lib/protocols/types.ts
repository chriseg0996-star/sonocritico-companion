/** Motor interactivo F3.1 — tipos de protocolo clínico paso a paso. */

export type ProtocolActionKind = "clinical" | "atlas" | "calculator" | "clip";

export type ProtocolAction = {
  id: string;
  kind: ProtocolActionKind;
  label: string;
  /** Texto de acción clínica (kind clinical o complemento). */
  detail?: string;
  /** Ruta interna — atlas o calculadora. */
  href?: string;
};

export type ProtocolDecision = {
  id: string;
  label: string;
  /** Breve ayuda bajo la opción. */
  hint?: string;
  nextStepId: string;
};

export type ProtocolStepKind = "question" | "result";

export type ShockClass = "hipovolemico" | "distributivo" | "obstructivo" | "cardiogenico";

export type ProtocolTrailEntry = {
  stepId: string;
  stepTitle: string;
  decisionLabel?: string;
};

export type ProtocolStep = {
  id: string;
  kind: ProtocolStepKind;
  /** Id del ítem en `stepperSteps` si difiere del `id` del paso. */
  stepperId?: string;
  title: string;
  question?: string;
  context?: string;
  /** Errores frecuentes del paso. */
  pitfalls?: string[];
  decisions?: ProtocolDecision[];
  /** Interpretación en pasos terminales. */
  interpretation?: string;
  /** Grado VExUS en resultado (0–3). */
  vexusGrade?: 0 | 1 | 2 | 3;
  /** Clasificación RUSH en resultado. */
  shockClass?: ShockClass;
  actions?: ProtocolAction[];
};

export type ProtocolStepperItem = {
  id: string;
  label: string;
};

export type Protocol = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  estimatedMinutes?: number;
  startStepId: string;
  /** Orden del stepper vertical (ids de pasos, sin resultados). */
  stepperSteps: ProtocolStepperItem[];
  steps: Record<string, ProtocolStep>;
};
