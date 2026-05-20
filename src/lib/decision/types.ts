export type SymptomId = "disnea" | "choque" | "hipoxemia" | "trauma" | "oliguria";

export type FindingId =
  | "b-lines"
  | "consolidacion"
  | "a-lines"
  | "pleural-effusion"
  | "lung-point"
  | "ivc-plethoric"
  | "ivc-collapsed"
  | "free-fluid"
  | "pneumothorax"
  | "pericardial-effusion"
  | "portal-pulsatile";

export type ContextId = "agudo" | "cronico" | "ventilado" | "postop" | "trauma" | "septico";

export type DiagnosisId =
  | "eap"
  | "neumonia"
  | "ards"
  | "sobrecarga"
  | "tep"
  | "neumotorax"
  | "asma-epoc"
  | "derrame-pleural"
  | "shock-hipovolemico"
  | "shock-cardiogenico"
  | "shock-distributivo"
  | "tamponamiento"
  | "hemotorax"
  | "abdomen-agudo"
  | "congestion-venosa"
  | "aki-prerrenal"
  | "aki-cardiorenal";

export type DifferentialInput = {
  symptomId: SymptomId;
  findingId: FindingId;
  contextId: ContextId;
};

export type ScoredDiagnosis = {
  id: DiagnosisId;
  label: string;
  score: number;
  percent: number;
};

export type DifferentialCtas = {
  protocol: { label: string; href: string };
  atlas: { label: string; href: string };
  calculator: { label: string; href: string };
  case: { label: string; href: string };
};

export type DifferentialResult = {
  input: DifferentialInput;
  probable: ScoredDiagnosis[];
  dontMiss: ScoredDiagnosis[];
  nextStudy: string;
  ctas: DifferentialCtas;
  analyzedAt: string;
};

export type StoredDifferentialAnalysis = {
  id: string;
  input: DifferentialInput;
  topLabel: string;
  at: string;
  result: DifferentialResult;
};

export type CatalogOption<T extends string> = {
  id: T;
  label: string;
};
