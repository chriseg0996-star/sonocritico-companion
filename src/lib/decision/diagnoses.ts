import type { DiagnosisId } from "@/lib/decision/types";

export type DiagnosisDef = {
  id: DiagnosisId;
  label: string;
  /** Siempre considerar en «No perder» cuando entra en el diferencial. */
  critical?: boolean;
};

export const DIAGNOSIS_CATALOG: DiagnosisDef[] = [
  { id: "eap", label: "EAP" },
  { id: "neumonia", label: "Neumonía" },
  { id: "ards", label: "ARDS" },
  { id: "sobrecarga", label: "Sobrecarga" },
  { id: "tep", label: "TEP", critical: true },
  { id: "neumotorax", label: "Neumotórax", critical: true },
  { id: "asma-epoc", label: "Asma / EPOC" },
  { id: "derrame-pleural", label: "Derrame pleural" },
  { id: "shock-hipovolemico", label: "Shock hipovolémico", critical: true },
  { id: "shock-cardiogenico", label: "Shock cardiogénico", critical: true },
  { id: "shock-distributivo", label: "Shock distributivo" },
  { id: "tamponamiento", label: "Taponamiento", critical: true },
  { id: "hemotorax", label: "Hemotórax", critical: true },
  { id: "abdomen-agudo", label: "Abdomen agudo", critical: true },
  { id: "congestion-venosa", label: "Congestión venosa" },
  { id: "aki-prerrenal", label: "AKI prerrenal" },
  { id: "aki-cardiorenal", label: "AKI cardiorenal" },
];

const BY_ID = new Map(DIAGNOSIS_CATALOG.map((d) => [d.id, d]));

export function getDiagnosisLabel(id: DiagnosisId): string {
  return BY_ID.get(id)?.label ?? id;
}

export function isCriticalDiagnosis(id: DiagnosisId): boolean {
  return BY_ID.get(id)?.critical === true;
}
