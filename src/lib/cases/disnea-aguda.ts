import type { InteractiveClinicalCase } from "@/lib/cases/types";
import { disneaAgudaGraph } from "@/lib/cases/disnea-aguda-graph";

/** Caso MVP — disnea aguda con flujo adaptativo por ramas. */
export const disneaAgudaCase: InteractiveClinicalCase = {
  id: "disnea-aguda",
  title: "Disnea aguda",
  tagline: "Urgencias · flujo adaptativo BLUE",
  difficulty: "basico",
  presentation:
    "Mujer de 72 años con HTA y diabetes. Disnea de inicio súbito hace 3 horas, sin fiebre. FR 28/min, SpO2 88% con mascarilla, TA 158/92 mmHg, FC 108 lpm. Crepitantes bilaterales. Sin dolor pleurítico.",
  vitals: { hr: 108, bp: "158/92", rr: 28, spo2: 88, temp: 36.7 },
  tags: ["disnea", "BLUE", "edema pulmonar", "adaptativo"],
  graph: disneaAgudaGraph,
  defaultResources: {
    protocolSlug: "blue",
    protocolStepId: "pattern",
    mediaId: "lung-b-lines",
    atlasModule: "lung",
  },
};
