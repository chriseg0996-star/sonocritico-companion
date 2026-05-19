/** Enlace hallazgo atlas → protocolo interactivo y paso. */
export type MediaProtocolLink = {
  protocolSlug: string;
  protocolTitle: string;
  stepId: string;
  stepTitle: string;
  interpretation: string;
};

export const MEDIA_PROTOCOL_LINKS: Record<string, MediaProtocolLink> = {
  "lung-b-lines": {
    protocolSlug: "blue",
    protocolTitle: "BLUE básico",
    stepId: "pattern",
    stepTitle: "Patrón A / B",
    interpretation: "Líneas B ≥3 por campo: edema intersticial — diferenciar EAP vs neumonía.",
  },
  "lung-a-lines": {
    protocolSlug: "blue",
    protocolTitle: "BLUE básico",
    stepId: "pattern",
    stepTitle: "Patrón A / B",
    interpretation: "Patrón A: aire alveolar predominante; comparar con zonas homólogas.",
  },
  "lung-consolidation": {
    protocolSlug: "blue",
    protocolTitle: "BLUE básico",
    stepId: "plaps",
    stepTitle: "PLAPS",
    interpretation: "Consolidación con broncograma — neumonía o atelectasia.",
  },
  "lung-plaps": {
    protocolSlug: "blue",
    protocolTitle: "BLUE básico",
    stepId: "plaps",
    stepTitle: "PLAPS",
    interpretation: "PLAPS+: consolidación en puntos laterales/posteriores.",
  },
  "lung-lung-point": {
    protocolSlug: "blue",
    protocolTitle: "BLUE básico",
    stepId: "result-pnx",
    stepTitle: "Interpretación",
    interpretation: "Lung point — neumotórax parcial; correlacionar con sliding ausente.",
  },
  "lung-pleural-effusion": {
    protocolSlug: "blue",
    protocolTitle: "BLUE básico",
    stepId: "sliding",
    stepTitle: "Sliding pleural",
    interpretation: "Evaluar deslizamiento pleural antes de descartar neumotórax.",
  },
  "fast-ruq-fluid": {
    protocolSlug: "fast",
    protocolTitle: "FAST / eFAST",
    stepId: "ruq",
    stepTitle: "RUQ",
    interpretation: "Líquido en Morrison — FAST positivo.",
  },
  "fast-ruq-normal": {
    protocolSlug: "fast",
    protocolTitle: "FAST / eFAST",
    stepId: "ruq",
    stepTitle: "RUQ",
    interpretation: "Sin líquido en hepatorrenal.",
  },
  "fast-pneumothorax": {
    protocolSlug: "fast",
    protocolTitle: "FAST / eFAST",
    stepId: "efast-right",
    stepTitle: "Pleura D",
    interpretation: "Sin sliding — priorizar neumotórax.",
  },
  "fast-pleural-sliding": {
    protocolSlug: "fast",
    protocolTitle: "FAST / eFAST",
    stepId: "efast-right",
    stepTitle: "Pleura D",
    interpretation: "Sliding presente — neumotórax menos probable en ese lado.",
  },
  "vexus-ivc-plethoric": {
    protocolSlug: "vexus",
    protocolTitle: "VExUS",
    stepId: "ivc",
    stepTitle: "VCI",
    interpretation: "VCI ≥2 cm — requisito para score VExUS ≥1.",
  },
  "vexus-ivc-normal": {
    protocolSlug: "vexus",
    protocolTitle: "VExUS",
    stepId: "ivc",
    stepTitle: "VCI",
    interpretation: "VCI <2 cm — probable VExUS 0.",
  },
  "vexus-portal-pulsatile": {
    protocolSlug: "vexus",
    protocolTitle: "VExUS",
    stepId: "portal",
    stepTitle: "Vena porta",
    interpretation: "Pulsatilidad portal ≥30% — vena anormal en VExUS.",
  },
  "vexus-hepatic-s-inversion": {
    protocolSlug: "vexus",
    protocolTitle: "VExUS",
    stepId: "hepatic",
    stepTitle: "Vena hepática",
    interpretation: "S<D o S invertida — congestión derecha.",
  },
  "cardiac-a4c-fevi-reduced": {
    protocolSlug: "rush",
    protocolTitle: "RUSH / Shock",
    stepId: "pump-ef",
    stepTitle: "Pump — FEVI",
    interpretation: "FEVI reducida — componente cardiogénico.",
  },
  "cardiac-fevi-hyperdynamic": {
    protocolSlug: "rush",
    protocolTitle: "RUSH / Shock",
    stepId: "pump-ef",
    stepTitle: "Pump — FEVI",
    interpretation: "Hiperdinamia — hipovolemia o distributivo.",
  },
  "cardiac-pericardial-effusion": {
    protocolSlug: "rush",
    protocolTitle: "RUSH / Shock",
    stepId: "pump-effusion",
    stepTitle: "Pump — derrame",
    interpretation: "Derrame pericárdico — valorar taponamiento.",
  },
  "cardiac-tamponade": {
    protocolSlug: "rush",
    protocolTitle: "RUSH / Shock",
    stepId: "pump-effusion",
    stepTitle: "Pump — derrame",
    interpretation: "Taponamiento — choque obstructivo.",
  },
  "cardiac-ivc-plethoric": {
    protocolSlug: "rush",
    protocolTitle: "RUSH / Shock",
    stepId: "tank-ivc",
    stepTitle: "Tank — VCI",
    interpretation: "VCI pleurítica — congestión / cardiogénico.",
  },
};

export function getMediaProtocolLink(mediaId: string): MediaProtocolLink | undefined {
  return MEDIA_PROTOCOL_LINKS[mediaId];
}
