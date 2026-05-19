import type { MediaClinicalMetadata } from "@/lib/media/types";

export type ClinicalTeachingSection = {
  id: "what_you_see" | "meaning" | "diagnosis" | "pitfalls" | "clinical_use";
  label: string;
  kind: "text" | "list";
  text?: string;
  items?: string[];
};

const SECTION_DEFS: {
  id: ClinicalTeachingSection["id"];
  label: string;
  kind: "text" | "list";
  key: keyof MediaClinicalMetadata;
}[] = [
  { id: "what_you_see", label: "Qué ves", kind: "text", key: "what_you_see" },
  { id: "meaning", label: "Interpretación", kind: "text", key: "meaning" },
  { id: "diagnosis", label: "Diagnósticos", kind: "list", key: "diagnosis" },
  { id: "pitfalls", label: "Pitfalls", kind: "list", key: "pitfalls" },
  { id: "clinical_use", label: "Uso clínico", kind: "text", key: "clinical_use" },
];

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function nonEmptyStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.some((entry) => nonEmptyString(entry));
}

/** Secciones educativas presentes en metadata (orden clínico fijo). */
export function getClinicalTeachingSections(
  metadata?: MediaClinicalMetadata,
): ClinicalTeachingSection[] {
  if (!metadata) return [];

  const sections: ClinicalTeachingSection[] = [];

  for (const def of SECTION_DEFS) {
    const value = metadata[def.key];
    if (def.kind === "text" && nonEmptyString(value)) {
      sections.push({ id: def.id, label: def.label, kind: "text", text: value.trim() });
    }
    if (def.kind === "list" && nonEmptyStringArray(value)) {
      sections.push({
        id: def.id,
        label: def.label,
        kind: "list",
        items: value.map((s) => s.trim()).filter(Boolean),
      });
    }
  }

  return sections;
}

export function hasClinicalTeaching(metadata?: MediaClinicalMetadata): boolean {
  return getClinicalTeachingSections(metadata).length > 0;
}
