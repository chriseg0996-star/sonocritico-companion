import type { Protocol } from "@/lib/protocols/types";

const atlas = (mediaId: string) => `/biblioteca?media=${mediaId}`;

/** RUSH — Pump · Tank · Pipes → clasificación de choque. */
export const rushProtocol: Protocol = {
  id: "rush-interactive",
  slug: "rush",
  title: "RUSH / Shock",
  subtitle: "Pump — Tank — Pipes · clasificación hemodinámica",
  tag: "Cardio / shock",
  estimatedMinutes: 20,
  startStepId: "shock",
  stepperSteps: [
    { id: "shock", label: "Choque" },
    { id: "pump", label: "Pump" },
    { id: "tank", label: "Tank" },
    { id: "pipes", label: "Pipes" },
    { id: "classify", label: "Clasificar" },
  ],
  steps: {
    shock: {
      id: "shock",
      kind: "question",
      title: "Choque",
      question: "Paciente con choque no diferenciado o hipoperfusión. ¿Iniciar protocolo RUSH?",
      context: "Orden sugerido: Pump (corazón) → Tank (VCI, pulmón, FAST) → Pipes (aorta, TVP).",
      pitfalls: [
        "Corregir vía aérea y oxígeno antes del eco",
        "No retrasar tratamiento por el estudio completo",
      ],
      actions: [
        {
          id: "clinical-shock",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Acceso IV/IO, monitor, lactato, noradrenalina si MAP crítica.",
        },
        {
          id: "calc-rush",
          kind: "calculator",
          label: "Calculadora RUSH / shock",
          href: "/herramientas/shock",
        },
      ],
      decisions: [{ id: "start", label: "Iniciar RUSH", nextStepId: "pump-ef" }],
    },
    "pump-ef": {
      id: "pump-ef",
      stepperId: "pump",
      kind: "question",
      title: "Pump — función (FEVI)",
      question: "Estimación visual de FEVI en A4C o PLAX: ¿hiperdinámica, normal o reducida?",
      context: "FEVI reducida sugiere componente cardiogénico; hiperdinámica orienta a hipovolemia o distributivo.",
      pitfalls: [
        "Confundir hipovolemia severa con hiperdinamia",
        "Un solo corte sin múltiples ventanas",
      ],
      actions: [
        {
          id: "atlas-fevi-red",
          kind: "atlas",
          label: "Atlas — FEVI reducida",
          href: atlas("cardiac-a4c-fevi-reduced"),
        },
        {
          id: "atlas-fevi-hyper",
          kind: "atlas",
          label: "Atlas — hiperdinámico",
          href: atlas("cardiac-fevi-hyperdynamic"),
        },
        {
          id: "atlas-plax",
          kind: "atlas",
          label: "Atlas — PLAX",
          href: atlas("cardiac-plax-normal"),
        },
        {
          id: "clip-plax",
          kind: "clip",
          label: "Ver clip — PLAX",
          href: atlas("cardiac-plax-normal"),
        },
      ],
      decisions: [{ id: "next", label: "FEVI evaluada → derrame", nextStepId: "pump-effusion" }],
    },
    "pump-effusion": {
      id: "pump-effusion",
      stepperId: "pump",
      kind: "question",
      title: "Pump — derrame pericárdico",
      question: "¿Derrame pericárdico? ¿Signos ecográficos de taponamiento (colapso AD, variación respiratoria)?",
      pitfalls: [
        "Derrame loculado no detectado en subxifoidea",
        "Confundir derrame pleural con pericárdico",
      ],
      actions: [
        {
          id: "atlas-effusion",
          kind: "atlas",
          label: "Atlas — derrame pericárdico",
          href: atlas("cardiac-pericardial-effusion"),
        },
        {
          id: "atlas-tamponade",
          kind: "atlas",
          label: "Atlas — taponamiento",
          href: atlas("cardiac-tamponade"),
        },
        {
          id: "clip-effusion",
          kind: "clip",
          label: "Ver clip — derrame",
          href: atlas("cardiac-pericardial-effusion"),
        },
        {
          id: "clinical-tamponade",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Taponamiento = pericardiocentesis o cirugía urgente; no fluidos a ciegas.",
        },
      ],
      decisions: [
        {
          id: "tamponade",
          label: "Taponamiento probable",
          hint: "Considerar obstructivo",
          nextStepId: "pump-tapse",
        },
        {
          id: "no-tamponade",
          label: "Sin taponamiento",
          nextStepId: "pump-tapse",
        },
      ],
    },
    "pump-tapse": {
      id: "pump-tapse",
      stepperId: "pump",
      kind: "question",
      title: "Pump — TAPSE / VD",
      question:
        "TAPSE en A4C (o estimación de función RV): ¿VD dilatado o septo en D (sobrecarga de presión pulmonar)?",
      context: "TAPSE <17 mm sugiere disfunción RV; septo D-shape orienta a obstructivo (TEP/PH).",
      pitfalls: [
        "No medir TAPSE en eje longitudinal del VD",
        "Ignorar TEP masivo con FEVI aparentemente conservada",
      ],
      actions: [
        {
          id: "atlas-rv",
          kind: "atlas",
          label: "Atlas — VD dilatado",
          href: atlas("cardiac-rv-dilated"),
        },
        {
          id: "atlas-septum",
          kind: "atlas",
          label: "Atlas — septo en D",
          href: atlas("cardiac-septum-d-shape"),
        },
        {
          id: "atlas-psax",
          kind: "atlas",
          label: "Atlas — PSAX mitral",
          href: atlas("cardiac-psax-mitral"),
        },
      ],
      decisions: [{ id: "next", label: "Pump completo → Tank", nextStepId: "tank-ivc" }],
    },
    "tank-ivc": {
      id: "tank-ivc",
      stepperId: "tank",
      kind: "question",
      title: "Tank — VCI",
      question: "VCI: ¿colapsada (<2 cm, >50% colapso) o pleurítica (≥2 cm, poco colapso)?",
      context: "VCI colapsada + hiperdinamia → hipovolemia; pleurítica + B-lines → cardiogénico/congestivo.",
      pitfalls: [
        "Ventana subcostal pobre en obesidad",
        "PEEP alto que falsea diámetro",
      ],
      actions: [
        {
          id: "atlas-ivc-n",
          kind: "atlas",
          label: "Atlas — VCI normal/colapsada",
          href: atlas("cardiac-ivc-normal"),
        },
        {
          id: "atlas-ivc-p",
          kind: "atlas",
          label: "Atlas — VCI pleurítica",
          href: atlas("cardiac-ivc-plethoric"),
        },
      ],
      decisions: [{ id: "next", label: "VCI evaluada → pulmón", nextStepId: "tank-lung" }],
    },
    "tank-lung": {
      id: "tank-lung",
      stepperId: "tank",
      kind: "question",
      title: "Tank — pulmón",
      question: "LUS: ¿líneas B difusas (edema) o patrón A sin congestión?",
      pitfalls: [
        "No explorar campos anteriores y laterales",
        "Confundir consolidación focal con edema",
      ],
      actions: [
        {
          id: "atlas-b",
          kind: "atlas",
          label: "Atlas — líneas B",
          href: atlas("lung-b-lines"),
        },
        {
          id: "atlas-a",
          kind: "atlas",
          label: "Atlas — líneas A",
          href: atlas("lung-a-lines"),
        },
        {
          id: "clip-b",
          kind: "clip",
          label: "Ver clip — líneas B",
          href: atlas("lung-b-lines"),
        },
      ],
      decisions: [{ id: "next", label: "Pulmón evaluado → FAST", nextStepId: "tank-fast" }],
    },
    "tank-fast": {
      id: "tank-fast",
      stepperId: "tank",
      kind: "question",
      title: "Tank — FAST (líquido libre)",
      question: "FAST: ¿líquido libre intraperitoneal o en pelvis (hemoperitoneo)?",
      pitfalls: [
        "FAST negativo no excluye sangrado retroperitoneal",
        "No completar las cuatro ventanas",
      ],
      actions: [
        {
          id: "atlas-fast-fluid",
          kind: "atlas",
          label: "Atlas — líquido RUQ",
          href: atlas("fast-ruq-fluid"),
        },
        {
          id: "atlas-fast-pelvis",
          kind: "atlas",
          label: "Atlas — líquido pelvis",
          href: atlas("fast-pelvis-fluid"),
        },
        {
          id: "protocol-fast",
          kind: "atlas",
          label: "Protocolo FAST completo",
          href: "/protocolos/fast",
        },
      ],
      decisions: [{ id: "next", label: "Tank completo → Pipes", nextStepId: "pipes" }],
    },
    pipes: {
      id: "pipes",
      stepperId: "pipes",
      kind: "question",
      title: "Pipes — aorta y TVP",
      question:
        "¿Aorta abdominal patológica (aneurisma/dissecación sospechada)? ¿TVP femoral/ilíaca en el contexto clínico?",
      context: "Aorta: ventana epigástrica. TVP: compresibilidad venosa femoral — atlas vascular en expansión.",
      pitfalls: [
        "No comprimir vena completa en dos planos",
        "Confundir arteria con vena",
      ],
      actions: [
        {
          id: "clinical-aorta",
          kind: "clinical",
          label: "Acción clínica — aorta",
          detail: "Dolor desgarrante + aorta dilatada: control PA, TC urgente, cirugía vascular.",
        },
        {
          id: "clinical-tvp",
          kind: "clinical",
          label: "Acción clínica — TVP/TEP",
          detail: "VD dilatado + TVP: anticoagulación; trombolisis si shock obstructivo por TEP.",
        },
        {
          id: "atlas-subxi",
          kind: "atlas",
          label: "Atlas — ventana subxifoidea",
          href: atlas("cardiac-subxiphoid-normal"),
        },
      ],
      decisions: [{ id: "next", label: "Pipes revisados → clasificar", nextStepId: "classify" }],
    },
    classify: {
      id: "classify",
      stepperId: "classify",
      kind: "question",
      title: "Clasificación del choque",
      question: "Según RUSH: ¿cuál es el tipo predominante de choque?",
      context: "Integra Pump + Tank + Pipes. Puede haber componentes mixtos.",
      pitfalls: [
        "Forzar una sola categoría si hay datos contradictorios",
        "Olvidar obstructivo por taponamiento o TEP",
      ],
      actions: [
        {
          id: "calc-final",
          kind: "calculator",
          label: "Calculadora RUSH",
          href: "/herramientas/shock",
        },
      ],
      decisions: [
        {
          id: "hypo",
          label: "Hipovolémico",
          hint: "VCI colapsada, hiperdinamia, FAST+",
          nextStepId: "result-hypovolemic",
        },
        {
          id: "dist",
          label: "Distributivo",
          hint: "Hiperdinamia, VCI normal, sin taponamiento",
          nextStepId: "result-distributive",
        },
        {
          id: "obst",
          label: "Obstructivo",
          hint: "Taponamiento, TEP, neumotórax",
          nextStepId: "result-obstructive",
        },
        {
          id: "cardio",
          label: "Cardiogénico",
          hint: "FEVI reducida, congestión pulmonar",
          nextStepId: "result-cardiogenic",
        },
      ],
    },
    "result-hypovolemic": {
      id: "result-hypovolemic",
      kind: "result",
      title: "Conducta sugerida",
      shockClass: "hipovolemico",
      interpretation:
        "Choque hipovolémico (hemorrágico o no): reanimación con cristaloides/colloides y sangre según protocolo; control de foco hemorrágico.",
      actions: [
        {
          id: "conduct-hypo",
          kind: "clinical",
          label: "Conducta",
          detail: "Volumen guiado por respuesta; FAST+ inestable → cirugía; repetir RUSH tras reposición.",
        },
        {
          id: "atlas-ivc-hypo",
          kind: "atlas",
          label: "Atlas — VCI colapsada",
          href: atlas("cardiac-ivc-normal"),
        },
        {
          id: "atlas-fast-hypo",
          kind: "atlas",
          label: "Atlas — líquido libre",
          href: atlas("fast-ruq-fluid"),
        },
        {
          id: "calc-hypo",
          kind: "calculator",
          label: "Calculadora shock",
          href: "/herramientas/shock",
        },
      ],
    },
    "result-distributive": {
      id: "result-distributive",
      kind: "result",
      title: "Conducta sugerida",
      shockClass: "distributivo",
      interpretation:
        "Choque distributivo (séptico, anafiláctico, espinal): vasopresores tempranos, antibiótico si sépsis, tratar causa.",
      actions: [
        {
          id: "conduct-dist",
          kind: "clinical",
          label: "Conducta",
          detail: "Noradrenalina; evitar sobrecarga si VCI no está colapsada; cultivos y foco.",
        },
        {
          id: "atlas-hyper",
          kind: "atlas",
          label: "Atlas — hiperdinámico",
          href: atlas("cardiac-fevi-hyperdynamic"),
        },
        {
          id: "calc-dist",
          kind: "calculator",
          label: "Calculadora shock",
          href: "/herramientas/shock",
        },
      ],
    },
    "result-obstructive": {
      id: "result-obstructive",
      kind: "result",
      title: "Conducta sugerida",
      shockClass: "obstructivo",
      interpretation:
        "Choque obstructivo: taponamiento (pericardiocentesis), TEP (anticoagulación/trombolisis), neumotórax (descompresión).",
      actions: [
        {
          id: "conduct-obst",
          kind: "clinical",
          label: "Conducta",
          detail: "No fluidos en taponamiento; descompresión pleural si PNX; eco cardíaca urgente.",
        },
        {
          id: "atlas-tamp",
          kind: "atlas",
          label: "Atlas — taponamiento",
          href: atlas("cardiac-tamponade"),
        },
        {
          id: "atlas-rv-obst",
          kind: "atlas",
          label: "Atlas — VD / septo D",
          href: atlas("cardiac-septum-d-shape"),
        },
        {
          id: "atlas-pnx",
          kind: "atlas",
          label: "Atlas — neumotórax (eFAST)",
          href: atlas("fast-pneumothorax"),
        },
        {
          id: "calc-obst",
          kind: "calculator",
          label: "Calculadora shock",
          href: "/herramientas/shock",
        },
      ],
    },
    "result-cardiogenic": {
      id: "result-cardiogenic",
      kind: "result",
      title: "Conducta sugerida",
      shockClass: "cardiogenico",
      interpretation:
        "Choque cardiogénico: inotrópicos, diuréticos si congestión, evitar sobrecarga; valorar dispositivo de asistencia.",
      actions: [
        {
          id: "conduct-cardio",
          kind: "clinical",
          label: "Conducta",
          detail: "Noradrenalina + inotrópico según perfil; VExUS si duda de congestión; cardiólogo/UCI.",
        },
        {
          id: "atlas-fevi",
          kind: "atlas",
          label: "Atlas — FEVI reducida",
          href: atlas("cardiac-a4c-fevi-reduced"),
        },
        {
          id: "atlas-b-cardio",
          kind: "atlas",
          label: "Atlas — líneas B",
          href: atlas("lung-b-lines"),
        },
        {
          id: "calc-cardio",
          kind: "calculator",
          label: "Calculadora shock",
          href: "/herramientas/shock",
        },
      ],
    },
  },
};
