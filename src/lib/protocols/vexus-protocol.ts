import type { Protocol } from "@/lib/protocols/types";

const atlas = (mediaId: string) => `/biblioteca?media=${mediaId}`;

function vesselActions(
  prefix: string,
  mediaId: string,
  hasClip: boolean,
): NonNullable<Protocol["steps"][string]["actions"]> {
  const actions: NonNullable<Protocol["steps"][string]["actions"]> = [
    {
      id: `${prefix}-atlas`,
      kind: "atlas",
      label: "Abrir en atlas",
      href: atlas(mediaId),
    },
  ];
  if (hasClip) {
    actions.push({
      id: `${prefix}-clip`,
      kind: "clip",
      label: "Ver clip en visor",
      href: atlas(mediaId),
    });
  }
  return actions;
}

/** VExUS — congestión venosa → vasos → grado 0–3 → interpretación y conducta. */
export const vexusProtocol: Protocol = {
  id: "vexus-interactive",
  slug: "vexus",
  title: "VExUS",
  subtitle: "Congestión venosa sistémica — grado 0 a 3",
  tag: "Vascular / congestión",
  estimatedMinutes: 18,
  startStepId: "congestion",
  stepperSteps: [
    { id: "congestion", label: "Congestión" },
    { id: "ivc", label: "VCI" },
    { id: "hepatic", label: "Hepática" },
    { id: "portal", label: "Porta" },
    { id: "renal", label: "Renal" },
    { id: "grade", label: "Grado" },
  ],
  steps: {
    congestion: {
      id: "congestion",
      kind: "question",
      title: "Congestión venosa",
      question: "¿Evaluar congestión venosa sistémica (VExUS) en paciente crítico?",
      context:
        "Indicado con sospecha de congestión, antes de cargar volumen o al ajustar diuréticos. Requiere VCI ≥2 cm para aplicar el score de venas intraabdominales.",
      pitfalls: [
        "Iniciar sin ventana subcostal adecuada de VCI",
        "Confundir colapso inspiratorio con patrón venoso anormal",
      ],
      actions: [
        {
          id: "clinical-intro",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Correlacionar con PVC, BNP, lactato y respuesta a fluidos previos.",
        },
        {
          id: "calc-vexus",
          kind: "calculator",
          label: "Calculadora VExUS",
          href: "/herramientas/vexus",
        },
      ],
      decisions: [{ id: "start", label: "Iniciar evaluación VExUS", nextStepId: "ivc" }],
    },
    ivc: {
      id: "ivc",
      kind: "question",
      title: "Vena cava inferior (VCI)",
      question:
        "Mide el diámetro de la VCI en espiración (subcostal). ¿VCI ≥2 cm con colapso inspiratorio reducido?",
      context:
        "Si VCI <2 cm y colapsa: congestión venosa sistémica improbable → VExUS 0 sin evaluar el resto del score.",
      pitfalls: [
        "Medir en espiración profunda del paciente sedado",
        "No alinear el haz con el eje de la VCI",
        "Ignorar presión positiva elevada (PEEP alto)",
      ],
      actions: [
        ...vesselActions("ivc", "vexus-ivc-plethoric", false),
        {
          id: "atlas-ivc-n",
          kind: "atlas",
          label: "Atlas — VCI normal",
          href: atlas("vexus-ivc-normal"),
        },
        {
          id: "clinical-ivc",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Si VCI <2 cm: documentar y considerar grado 0; si ≥2 cm: continuar hepática/porta/renal.",
        },
      ],
      decisions: [
        { id: "small", label: "VCI <2 cm — probable grado 0", nextStepId: "result-0" },
        { id: "large", label: "VCI ≥2 cm — evaluar venas", nextStepId: "hepatic" },
      ],
    },
    hepatic: {
      id: "hepatic",
      kind: "question",
      title: "Vena hepática",
      question: "Doppler de vena hepática: ¿patrón S>D (normal) o S<D / onda S invertida (congestión)?",
      context: "La onda S refleja presión atrial retrógrada; inversión sugiere congestión derecha significativa.",
      pitfalls: [
        "Ángulo de incidencia >60° sin corrección",
        "Confundir flujo atrial con patrón venoso",
        "Ventana subcostal limitada en obesidad",
      ],
      actions: [
        ...vesselActions("hepatic", "vexus-hepatic-s-normal", true),
        {
          id: "atlas-hepatic-abn",
          kind: "atlas",
          label: "Atlas — S invertida",
          href: atlas("vexus-hepatic-s-inversion"),
        },
      ],
      decisions: [
        {
          id: "normal",
          label: "S>D — patrón normal",
          hint: "No cuenta como vena anormal",
          nextStepId: "portal",
        },
        {
          id: "abnormal",
          label: "S<D o S invertida — anormal",
          hint: "+1 vena anormal para VExUS",
          nextStepId: "portal",
        },
      ],
    },
    portal: {
      id: "portal",
      kind: "question",
      title: "Vena porta",
      question: "Doppler portal: ¿flujo continuo con pulsatilidad <30% (normal) o pulsatilidad ≥30%?",
      context: "Pulsatilidad aumentada transmite presión atrial al lecho esplácnico.",
      pitfalls: [
        "No medir en ayuno o con respiración agitada",
        "Ganancia excesiva que artefacta la onda",
        "Confundir flujo hepatopetal revertido con pulsatilidad",
      ],
      actions: [
        ...vesselActions("portal", "vexus-portal-normal", true),
        {
          id: "atlas-portal-p",
          kind: "atlas",
          label: "Atlas — porta pulsátil",
          href: atlas("vexus-portal-pulsatile"),
        },
      ],
      decisions: [
        { id: "normal", label: "Continuo / pulsatilidad baja", nextStepId: "renal" },
        { id: "abnormal", label: "Pulsatilidad ≥30% — anormal", nextStepId: "renal" },
      ],
    },
    renal: {
      id: "renal",
      kind: "question",
      title: "Vena renal intrarrenal",
      question: "Doppler intrarrenal: ¿flujo continuo (normal) o patrón discontinuous / bimodal?",
      context: "El patrón renal es sensible a congestión y función renal concurrente.",
      pitfalls: [
        "Mala ventana por obesidad o edema",
        "No tomar muestra en zona cortical representativa",
        "Diuréticos recientes que alteran el patrón",
      ],
      actions: [
        ...vesselActions("renal", "vexus-renal-continuous", false),
        {
          id: "atlas-renal-d",
          kind: "atlas",
          label: "Atlas — renal discontinuous",
          href: atlas("vexus-renal-discontinuous"),
        },
        {
          id: "clip-renal-d",
          kind: "clip",
          label: "Ver clip — renal discontinuous",
          href: atlas("vexus-renal-discontinuous"),
        },
      ],
      decisions: [{ id: "next", label: "Vasos evaluados → asignar grado", nextStepId: "grade" }],
    },
    grade: {
      id: "grade",
      kind: "question",
      title: "Grado VExUS",
      question:
        "Con VCI ≥2 cm: cuente venas anormales (hepática S<D, porta pulsátil ≥30%, renal discontinuous). ¿Grado final?",
      context: "0 = ninguna anormal · 1 = una · 2 = dos · 3 = tres venas anormales.",
      pitfalls: [
        "Asignar grado 3 sin VCI pleurítica",
        "No integrar contexto clínico (diuréticos, PEEP)",
        "Olvidar función renal basal",
      ],
      actions: [
        {
          id: "atlas-severe",
          kind: "atlas",
          label: "Atlas — VExUS severo (referencia)",
          href: atlas("vexus-vexus-severe"),
        },
        {
          id: "calc",
          kind: "calculator",
          label: "Calculadora VExUS",
          href: "/herramientas/vexus",
        },
      ],
      decisions: [
        { id: "g0", label: "Grado 0", hint: "VCI <2 cm o sin venas anormales", nextStepId: "result-0" },
        { id: "g1", label: "Grado 1", hint: "Una vena anormal", nextStepId: "result-1" },
        { id: "g2", label: "Grado 2", hint: "Dos venas anormales", nextStepId: "result-2" },
        { id: "g3", label: "Grado 3", hint: "Tres venas anormales", nextStepId: "result-3" },
      ],
    },
    "result-0": {
      id: "result-0",
      kind: "result",
      title: "Interpretación y conducta",
      vexusGrade: 0,
      interpretation:
        "VExUS 0: sin congestión venosa sistémica significativa por criterios ecográficos. La volemia puede tolerar prueba de fluidos si el contexto clínico lo indica.",
      actions: [
        {
          id: "conduct-0",
          kind: "clinical",
          label: "Conducta sugerida",
          detail: "Considerar fluidos guiados por respuesta dinámica; reevaluar si empeora la función renal o aparece B-lines.",
        },
        {
          id: "atlas-ivc0",
          kind: "atlas",
          label: "Atlas — VCI normal",
          href: atlas("vexus-ivc-normal"),
        },
        {
          id: "calc-0",
          kind: "calculator",
          label: "Calculadora VExUS",
          href: "/herramientas/vexus",
        },
      ],
    },
    "result-1": {
      id: "result-1",
      kind: "result",
      title: "Interpretación y conducta",
      vexusGrade: 1,
      interpretation:
        "VExUS 1: congestión leve. Una vena intraabdominal anormal con VCI pleurítica. Monitorizar respuesta a diuréticos o restricción hídrica.",
      actions: [
        {
          id: "conduct-1",
          kind: "clinical",
          label: "Conducta sugerida",
          detail: "Evitar cargas agresivas; diurético prudente si hipoperfusión no predominante; repetir en 24–48 h.",
        },
        {
          id: "atlas-p1",
          kind: "atlas",
          label: "Atlas — referencia portal",
          href: atlas("vexus-portal-pulsatile"),
        },
        {
          id: "calc-1",
          kind: "calculator",
          label: "Calculadora VExUS",
          href: "/herramientas/vexus",
        },
      ],
    },
    "result-2": {
      id: "result-2",
      kind: "result",
      title: "Interpretación y conducta",
      vexusGrade: 2,
      interpretation:
        "VExUS 2: congestión moderada. Dos venas anormales — alto riesgo de edema pulmonar/renal si se administra volumen.",
      actions: [
        {
          id: "conduct-2",
          kind: "clinical",
          label: "Conducta sugerida",
          detail: "Priorizar diuréticos / ultrafiltración; fluidos solo si shock obstructivo o hipovolemia demostrada por otro método.",
        },
        {
          id: "atlas-p2",
          kind: "atlas",
          label: "Atlas — VExUS severo",
          href: atlas("vexus-vexus-severe"),
        },
        {
          id: "clip-p2",
          kind: "clip",
          label: "Ver clip — porta pulsátil",
          href: atlas("vexus-portal-pulsatile"),
        },
        {
          id: "calc-2",
          kind: "calculator",
          label: "Calculadora VExUS",
          href: "/herramientas/vexus",
        },
      ],
    },
    "result-3": {
      id: "result-3",
      kind: "result",
      title: "Interpretación y conducta",
      vexusGrade: 3,
      interpretation:
        "VExUS 3: congestión severa. Tres venas anormales — muy probable sobrecarga hídrica; alto riesgo de congestión pulmonar y renal.",
      actions: [
        {
          id: "conduct-3",
          kind: "clinical",
          label: "Conducta sugerida",
          detail: "Restricción hídrica, diuréticos o depuración; evitar bolus salvo indicación absoluta; valorar diálisis.",
        },
        {
          id: "atlas-p3",
          kind: "atlas",
          label: "Atlas — VExUS severo",
          href: atlas("vexus-vexus-severe"),
        },
        {
          id: "clip-hepatic",
          kind: "clip",
          label: "Ver clip — hepática anormal",
          href: atlas("vexus-hepatic-s-normal"),
        },
        {
          id: "calc-3",
          kind: "calculator",
          label: "Calculadora VExUS",
          href: "/herramientas/vexus",
        },
      ],
    },
  },
};
