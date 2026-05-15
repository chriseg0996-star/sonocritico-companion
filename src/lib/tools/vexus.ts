export type HepaticPattern = "normal" | "mild" | "severe";
export type PortalPattern = "continuous" | "pulsatile-mild" | "pulsatile-severe";
export type RenalPattern = "biphasic" | "monophasic";

export interface VexusInputs {
  ivcCm: number;
  hepatic: HepaticPattern;
  portal: PortalPattern;
  renal: RenalPattern;
}

export interface VexusResult {
  grade: 0 | 1 | 2 | 3;
  title: string;
  summary: string;
  recommendation: string;
  abnormalCount: number;
}

export function calculateVexus(input: VexusInputs): VexusResult {
  if (input.ivcCm < 2) {
    return {
      grade: 0,
      title: "VExUS 0",
      summary: "VCI < 2 cm — congestión venosa sistémica improbable por VExUS.",
      recommendation: "No restringir fluidos solo por VExUS. Valorar contexto clínico y otros parámetros.",
      abnormalCount: 0,
    };
  }

  let score = 0;
  if (input.hepatic === "mild") score += 1;
  if (input.hepatic === "severe") score += 2;
  if (input.portal === "pulsatile-mild") score += 1;
  if (input.portal === "pulsatile-severe") score += 2;
  if (input.renal === "monophasic") score += 2;
  else if (input.renal === "biphasic") score += 0;

  const abnormalCount =
    (input.hepatic !== "normal" ? 1 : 0) +
    (input.portal !== "continuous" ? 1 : 0) +
    (input.renal === "monophasic" ? 1 : 0);

  let grade: 0 | 1 | 2 | 3;
  if (score <= 1) grade = 1;
  else if (score <= 3) grade = 2;
  else grade = 3;

  const byGrade: Record<1 | 2 | 3, Omit<VexusResult, "grade" | "abnormalCount">> = {
    1: {
      title: "VExUS 1",
      summary: "VCI ≥ 2 cm con alteración leve (típicamente hepática leve).",
      recommendation: "Vigilar balance hídrico. Fluidos con cautela según perfusión y función renal.",
    },
    2: {
      title: "VExUS 2",
      summary: "Congestión moderada: ≥2 patrones venosos alterados o alteración portal marcada.",
      recommendation: "Restricción cuidadosa de fluidos. Considerar diuréticos si hipoperfusión no es predominante.",
    },
    3: {
      title: "VExUS 3",
      summary: "Congestión severa: patrones hepático, portal y/o renal claramente anormales.",
      recommendation: "Evitar carga de volumen. Diuresis agresiva si tolera. Alto riesgo de AKI por congestión.",
    },
  };

  const g = byGrade[grade];
  return { grade, abnormalCount, ...g };
}
