import type { InteractiveClinicalCase } from "@/lib/cases/types";

/** Caso MVP — disnea aguda (EAP vs diagnósticos alternos). */
export const disneaAgudaCase: InteractiveClinicalCase = {
  id: "disnea-aguda",
  title: "Disnea aguda",
  tagline: "Urgencias · integración BLUE + atlas",
  presentation:
    "Mujer de 72 años con HTA y diabetes. Disnea de inicio súbito hace 3 horas, sin fiebre. FR 28/min, SpO2 88% con mascarilla, TA 158/92 mmHg, FC 108 lpm. Crepitantes bilaterales. Sin dolor pleurítico.",
  vitals: { hr: 108, bp: "158/92", rr: 28, spo2: 88, temp: 36.7 },
  tags: ["disnea", "BLUE", "edema pulmonar"],
  steps: [
    {
      id: "presentation",
      kind: "presentation",
      title: "Paciente",
      prompt: "Revisa el escenario y avanza cuando estés listo para decidir el abordaje POCUS.",
      choices: [
        {
          id: "ready",
          label: "Continuar al protocolo",
          isOptimal: true,
          feedback: "Prioriza estabilización y un protocolo pulmonar dirigido.",
        },
      ],
    },
    {
      id: "protocol",
      kind: "protocol",
      title: "Elegir protocolo",
      prompt: "¿Qué protocolo POCUS inicias primero en esta disnea aguda?",
      choices: [
        {
          id: "blue",
          label: "BLUE básico",
          hint: "Perfil A/B, sliding, PLAPS",
          isOptimal: true,
          feedback: "Disnea aguda con crepitantes: BLUE orienta EAP, neumonía o TEP según perfil y sliding.",
          resource: { protocolSlug: "blue", protocolStepId: "pattern" },
        },
        {
          id: "fast",
          label: "FAST / eFAST",
          isOptimal: false,
          feedback: "Útil en trauma o sospecha de líquido libre; no es el primer paso en disnea médica sin trauma.",
          resource: { protocolSlug: "fast", protocolStepId: "ruq" },
        },
        {
          id: "rush",
          label: "RUSH",
          isOptimal: false,
          feedback: "RUSH es para shock/inestabilidad hemodinámica; aquí el problema principal es la ventilación.",
          resource: { protocolSlug: "rush", protocolStepId: "heart" },
        },
        {
          id: "vexus",
          label: "VExUS",
          isOptimal: false,
          feedback: "VExUS valora congestión venosa; puede complementar tras BLUE si hay sospecha cardiogénica.",
          resource: { protocolSlug: "vexus", protocolStepId: "ivc" },
        },
      ],
    },
    {
      id: "window",
      kind: "window",
      title: "Elegir ventana",
      prompt: "¿Qué ventana exploras primero con BLUE?",
      choices: [
        {
          id: "blue-anterior",
          label: "BLUE anterior bilateral",
          isOptimal: true,
          feedback: "Perfil A/B y sliding en puntos anteriores — núcleo del protocolo BLUE.",
          resource: { protocolSlug: "blue", protocolStepId: "sliding", atlasModule: "lung" },
        },
        {
          id: "plaps-only",
          label: "Solo PLAPS posterolateral",
          isOptimal: false,
          feedback: "PLAPS complementa, pero no sustituye la exploración anterior en disnea aguda.",
          resource: { protocolSlug: "blue", protocolStepId: "plaps" },
        },
        {
          id: "costophrenic",
          label: "Solo costofrénico",
          isOptimal: false,
          feedback: "Útil si sospechas derrame; aquí faltan datos de intersticio y sliding.",
          resource: { atlasModule: "lung", mediaId: "lung-pleural-effusion" },
        },
        {
          id: "subxiphoid",
          label: "Subxifoideo cardíaco",
          isOptimal: false,
          feedback: "Eco cardíaca es complementaria; primero caracteriza el pulmón con BLUE.",
          resource: { protocolSlug: "blue", protocolStepId: "pattern" },
        },
      ],
    },
    {
      id: "finding",
      kind: "finding",
      title: "Elegir hallazgo",
      prompt: "En puntos anteriores bilaterales predominan cometas verticales hasta la pleura. ¿Qué hallazgo reportas?",
      choices: [
        {
          id: "b-lines",
          label: "Líneas B bilaterales (perfil B)",
          isOptimal: true,
          feedback: "Perfil B bilateral sugiere edema intersticial/alveolar — coherente con EAP en este contexto.",
          resource: { mediaId: "lung-b-lines", atlasModule: "lung" },
        },
        {
          id: "a-lines",
          label: "Patrón A dominante",
          isOptimal: false,
          feedback: "Patrón A orienta a TEP/EPOC según clínica; no explica crepitantes ni hipoxemia severa aquí.",
          resource: { mediaId: "lung-a-lines", atlasModule: "lung" },
        },
        {
          id: "consolidation",
          label: "Consolidación subpleural",
          isOptimal: false,
          feedback: "Consolidación sugiere neumonía; completar PLAPS y correlacionar con fiebre/PCR.",
          resource: { mediaId: "lung-consolidation", atlasModule: "lung" },
        },
        {
          id: "lung-point",
          label: "Lung point",
          isOptimal: false,
          feedback: "Lung point es específico de neumotórax; requiere sliding ausente en la zona.",
          resource: { mediaId: "lung-lung-point", atlasModule: "lung" },
        },
      ],
    },
    {
      id: "conduct",
      kind: "conduct",
      title: "Elegir conducta",
      prompt: "Con perfil B bilateral e hipoxemia, ¿cuál es la conducta inicial más adecuada?",
      choices: [
        {
          id: "vmni-diuretic",
          label: "VMNI + furosemida IV + monitorización",
          isOptimal: true,
          feedback: "EAP cardiogénico: VMNI mejora intercambio; diurético reduce congestión. Intubar si falla VMNI.",
        },
        {
          id: "intubate",
          label: "Intubación orotraqueal inmediata",
          isOptimal: false,
          feedback: "Reservar intubación para falla de VMNI, alteración neurológica o paro inminente.",
        },
        {
          id: "antibiotics",
          label: "Antibióticos IV de amplio espectro",
          isOptimal: false,
          feedback: "Sin fiebre ni foco infeccioso claro; antibióticos no son la prioridad inicial.",
        },
        {
          id: "fluids",
          label: "Bolo 500 mL cristaloide",
          isOptimal: false,
          feedback: "El volumen empeora edema pulmonar; evitar salvo shock hipovolémico demostrado.",
        },
      ],
    },
  ],
  outcome: {
    title: "Edema pulmonar agudo cardiogénico",
    explanation:
      "Disnea súbita + hipoxemia + líneas B bilaterales en paciente hipertenso orienta a EAP. VMNI y diuréticos son primera línea; eco cardíaca y VExUS pueden refinir la causa.",
    teachingPoint:
      "No asumir neumonía solo por infiltrados. Integrar BLUE, función cardíaca y respuesta a VMNI.",
  },
  resources: {
    protocolSlug: "blue",
    protocolStepId: "pattern",
    mediaId: "lung-b-lines",
    atlasModule: "lung",
  },
};
