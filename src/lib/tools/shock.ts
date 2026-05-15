export type FeCategory = "reduced" | "normal" | "hyper";
export type IvcCategory = "collapsed" | "normal" | "dilated";
export type FastFinding = "negative" | "positive" | "not-done";
export type PericardialFinding = "none" | "effusion" | "tamponade";
export type RvFinding = "normal" | "dilated";
export type DvtFinding = "negative" | "positive" | "not-done";

export interface RushInputs {
  fe: FeCategory;
  pericardium: PericardialFinding;
  rv: RvFinding;
  ivc: IvcCategory;
  fast: FastFinding;
  dvt: DvtFinding;
  lungSliding: boolean;
}

export interface ShockResult {
  type: string;
  emoji: string;
  findings: string[];
  management: string;
}

export function calculateShockType(input: RushInputs): ShockResult {
  if (input.pericardium === "tamponade" || (input.pericardium === "effusion" && input.ivc === "dilated")) {
    return {
      type: "Shock obstructivo (taponamiento)",
      emoji: "⛔",
      findings: ["Derrame pericárdico con signos de taponamiento", "VCI dilatada"],
      management: "Pericardiocentesis urgente guiada por US. Volumen cauteloso hasta drenar.",
    };
  }

  if (input.fe === "reduced" && input.ivc !== "collapsed") {
    return {
      type: "Shock cardiogénico",
      emoji: "♥",
      findings: ["FE visual reducida", input.ivc === "dilated" ? "VCI dilatada" : "VCI no colapsada"],
      management: "Inotrópicos, diuréticos si congesto, evitar fluidos. Valorar dispositivo de asistencia.",
    };
  }

  if (input.fast === "positive" && (input.ivc === "collapsed" || input.fe === "hyper")) {
    return {
      type: "Shock hemorrágico / hipovolémico",
      emoji: "🩸",
      findings: ["FAST positivo (líquido libre)", "VCI colapsada o FE hiperdinámica"],
      management: "Transfusión 1:1:1, control quirúrgico del sangrado. Cristaloide limitado.",
    };
  }

  if (input.rv === "dilated" && input.lungSliding === false) {
    return {
      type: "Shock obstructivo (TEP / neumotórax)",
      emoji: "🫁",
      findings: ["VD dilatado", "Deslizamiento pleural ausente o DVT+"],
      management: "Si neumotórax: descompresión. Si TEP: anticoagulación / trombólisis según estabilidad.",
    };
  }

  if (input.dvt === "positive" && input.rv === "dilated") {
    return {
      type: "Shock obstructivo (TEP)",
      emoji: "🫀",
      findings: ["DVT documentado", "Sobrecarga de VD"],
      management: "Anticoagulación. Trombólisis si inestabilidad. Eco cardíaca seriada.",
    };
  }

  if (input.ivc === "collapsed" && input.fe !== "reduced") {
    return {
      type: "Shock hipovolémico / distributivo inicial",
      emoji: "💧",
      findings: ["VCI colapsada", "FE preservada o hiperdinámica"],
      management: "Cristaloide en bolo guiado; repetir VCI. Si sepsis: antibiótico + vasopresores precoz.",
    };
  }

  if (input.ivc === "dilated" && input.fe === "normal") {
    return {
      type: "Shock distributivo / obstructivo",
      emoji: "↔",
      findings: ["VCI dilatada sin disfunción sistólica severa"],
      management: "Descartar TEP, taponamiento, vasoplejia séptica. Vasopresores + causa.",
    };
  }

  return {
    type: "Shock no clasificado — repetir RUSH",
    emoji: "?",
    findings: ["Hallazgos no concluyentes"],
    management: "Repetir Pump-Tank-Pipes tras intervención. Correlacionar con lactato y respuesta a fluidos.",
  };
}
