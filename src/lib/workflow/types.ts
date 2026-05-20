export type WorkflowComplaintId = "disnea" | "choque" | "hipoxemia" | "trauma" | "oliguria";

export type WorkflowAnswer = Record<string, string>;

export type WorkflowOutputKind = "protocol" | "atlas" | "calculator" | "case";

export type WorkflowOutput = {
  kind: WorkflowOutputKind;
  label: string;
  href: string;
};

export type WorkflowRoute = {
  id: string;
  summary: string;
  estimatedMinutes: number;
  outputs: WorkflowOutput[];
};

export type WorkflowOption = {
  id: string;
  label: string;
};

export type WorkflowQuestion = {
  id: string;
  prompt: string;
  options: WorkflowOption[];
};

export type WorkflowComplaint = {
  id: WorkflowComplaintId;
  label: string;
  questions: WorkflowQuestion[];
  routes: Record<string, WorkflowRoute>;
  defaultRouteId: string;
};

export type WorkflowLastFlow = {
  complaintId: WorkflowComplaintId;
  answers: WorkflowAnswer;
  routeId?: string;
  at: string;
};

export const WORKFLOW_OUTPUT_ORDER: WorkflowOutputKind[] = [
  "protocol",
  "atlas",
  "calculator",
  "case",
];

export const WORKFLOW_OUTPUT_LABELS: Record<WorkflowOutputKind, string> = {
  protocol: "Protocolo",
  atlas: "Atlas",
  calculator: "Calculadora",
  case: "Caso",
};
