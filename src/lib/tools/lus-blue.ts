export type LungProfile = "A" | "B" | "mixed";
export type PlapsFinding = "none" | "consolidation";
export interface BlueInputs {
  profileLeft: LungProfile;
  profileRight: LungProfile;
  plaps: PlapsFinding;
  slidingPresent: boolean;
  fePreserved: boolean | null;
  dvtPresent: boolean | null;
}

export interface BlueResult {
  diagnosis: string;
  confidence: "alta" | "moderada" | "baja";
  rationale: string[];
  management: string;
}

export function calculateBlue(input: BlueInputs): BlueResult {
  const bilateralA = input.profileLeft === "A" && input.profileRight === "A";
  const bilateralB = input.profileLeft === "B" && input.profileRight === "B";
  const rationale: string[] = [];

  if (!input.slidingPresent) {
    return {
      diagnosis: "Neumotórax (hasta demostrar lo contrario)",
      confidence: "alta",
      rationale: ["Ausencia de deslizamiento pleural bilateral o focal."],
      management: "Descompresión urgente si inestable. No retrasar por estudios.",
    };
  }

  if (input.plaps === "consolidation") {
    rationale.push("Consolidación posterolateral (PLAPS) — neumonía probable.");
    return {
      diagnosis: "Neumonía / consolidación",
      confidence: "moderada",
      rationale,
      management: "Antibiótico según contexto, soporte respiratorio, repetir LUS tras tratamiento.",
    };
  }

  if (bilateralB) {
    rationale.push("Perfil B bilateral — líneas B difusas.");
    if (input.fePreserved === true) {
      rationale.push("FE visual conservada — favorece EAP / disfunción diastólica.");
      return {
        diagnosis: "Edema pulmonar cardiogénico (EAP)",
        confidence: "moderada",
        rationale,
        management: "VMNI, diuréticos, control de TA. Repetir eco cardíaca.",
      };
    }
    if (input.fePreserved === false) {
      rationale.push("FE reducida — cardiogénico con disfunción sistólica.");
      return {
        diagnosis: "EAP / disfunción sistólica",
        confidence: "moderada",
        rationale,
        management: "VMNI + diuréticos + optimizar precarga. Valorar inotrópicos.",
      };
    }
    return {
      diagnosis: "Edema intersticial/alveolar (EAP vs SDRA)",
      confidence: "baja",
      rationale: [...rationale, "Completar evaluación cardíaca (FE visual)."],
      management: "VMNI según gasometría; diuréticos si congestión. Descartar SDRA/sepsis.",
    };
  }

  if (bilateralA) {
    rationale.push("Perfil A bilateral — pulmón aireado.");
    if (input.dvtPresent === true) {
      rationale.push("DVT presente — alta probabilidad de TEP.");
      return {
        diagnosis: "Tromboembolismo pulmonar (TEP)",
        confidence: "alta",
        rationale,
        management: "Anticoagulación. Eco cardíaca urgente (dilatación VD). Considerar trombólisis si inestable.",
      };
    }
    return {
      diagnosis: "Asma / EPOC exacerbado o TEP (sin DVT documentado)",
      confidence: "baja",
      rationale: [...rationale, "Descartar TEP con DVT o angioTC si clínica compatible."],
      management: "Broncodilatadores, esteroides, VMNI si trabajo respiratorio. Buscar DVT.",
    };
  }

  return {
    diagnosis: "Patrón mixto — reevaluar zonas y función cardíaca",
    confidence: "baja",
    rationale: ["Perfil A/B asimétrico: neumonía focal, contusión o edema unilateral."],
    management: "Completar BLUE en todos los puntos + PLAPS + eco básica.",
  };
}
