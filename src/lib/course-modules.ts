import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  Heart,
  Layers,
  Scan,
  Stethoscope,
  Syringe,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import type { CourseModule } from "@/types";

export const COURSE_TAGLINE = "Ultrasonografía en el paciente crítico";

export const courseModules: CourseModule[] = [
  {
    slug: "fundamentos",
    order: 1,
    title: "Fundamentos de ultrasonido",
    subtitle: "Modo B, M, Doppler color y pulsado",
    summary:
      "Domina los modos básicos del equipo, la orientación en pantalla y los fundamentos del Doppler antes de aplicar protocolos en el paciente crítico.",
    icon: "Layers",
    protocolSlugs: [],
    estimatedMinutes: 30,
  },
  {
    slug: "fast-efast",
    order: 2,
    title: "FAST y eFAST",
    subtitle: "Trauma, líquido libre y tórax",
    summary:
      "Evalúa rápidamente hemoperitoneo, hemotórax y neumotórax en el paciente inestable con el protocolo FAST y su extensión pleural.",
    icon: "Zap",
    protocolSlugs: ["fast"],
    estimatedMinutes: 15,
  },
  {
    slug: "pulmonar-blue",
    order: 3,
    title: "Ultrasonido pulmonar",
    subtitle: "BLUE, LUS y disnea aguda",
    summary:
      "Diferencia patrones pulmonares, aplica el protocolo BLUE y utiliza el LUS en la disnea aguda del paciente crítico.",
    icon: "Wind",
    protocolSlugs: ["blue"],
    estimatedMinutes: 20,
  },
  {
    slug: "eco-critico",
    order: 4,
    title: "Ecocardiografía en críticos",
    subtitle: "Función sistólica, derrame y taponamiento",
    summary:
      "Estima la función ventricular, detecta derrame pericárdico y descarta taponamiento en la cabecera del enfermo grave.",
    icon: "Heart",
    protocolSlugs: ["eco-basica"],
    estimatedMinutes: 20,
  },
  {
    slug: "accesos-vasculares",
    order: 5,
    title: "Accesos vasculares guiados",
    subtitle: "Vía central y periférica con US",
    summary:
      "Mejora la seguridad del acceso vascular con guía ecográfica en tiempo real para vías centrales y periféricas.",
    icon: "Syringe",
    protocolSlugs: ["acceso-vascular"],
    estimatedMinutes: 25,
  },
  {
    slug: "respuesta-volumen",
    order: 6,
    title: "Respuesta a volumen",
    subtitle: "IVC, tipos de shock y reanimación",
    summary:
      "Integra el tamaño y la variabilidad de la VCI con la función cardíaca para orientar fluidos y vasopresores en el shock.",
    icon: "Activity",
    protocolSlugs: ["rush"],
    estimatedMinutes: 25,
  },
  {
    slug: "weaning-diafragma",
    order: 7,
    title: "Weaning y diafragma",
    subtitle: "Excursión y fracaso de destete",
    summary:
      "Valora la función diafragmática y los predictores ecográficos de éxito o fracaso del destete ventilatorio.",
    icon: "Scan",
    protocolSlugs: [],
    estimatedMinutes: 20,
  },
  {
    slug: "neuro-pocus",
    order: 8,
    title: "POCUS neurocrítico",
    subtitle: "Doppler transcraneal y vaina óptica",
    summary:
      "Aproxima la presión intracraneal y la perfusión cerebral con TCD y medición de la vaina del nervio óptico.",
    icon: "Brain",
    protocolSlugs: [],
    estimatedMinutes: 20,
  },
  {
    slug: "vexus",
    order: 9,
    title: "VExUS",
    subtitle: "Congestión venosa sistémica",
    summary:
      "Cuantifica la congestión más allá de la VCI con el score VExUS en hígado, intestino y riñón.",
    icon: "Waves",
    protocolSlugs: ["vexus"],
    estimatedMinutes: 20,
  },
  {
    slug: "integracion-casos",
    order: 10,
    title: "Integración clínica",
    subtitle: "Casos y síntesis del curso",
    summary:
      "Integra hallazgos de múltiples ventanas en escenarios clínicos reales de la UCI para cerrar el curso.",
    icon: "Stethoscope",
    protocolSlugs: [],
    estimatedMinutes: 45,
    isCapstone: true,
  },
];

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Zap,
  Wind,
  Heart,
  Syringe,
  Activity,
  Scan,
  Brain,
  Waves,
  Stethoscope,
};

export function getModuleIcon(name: string): LucideIcon {
  return iconMap[name] ?? Activity;
}

export function getModule(slug: string): CourseModule | undefined {
  return courseModules.find((m) => m.slug === slug);
}

export function getNextIncompleteModule(
  completedModules: string[]
): CourseModule | undefined {
  return courseModules.find((m) => !completedModules.includes(m.slug));
}

/** Map legacy protocol completion → module slugs */
export const PROTOCOL_TO_MODULES: Record<string, string[]> = {
  fast: ["fast-efast"],
  blue: ["pulmonar-blue"],
  "eco-basica": ["eco-critico"],
  "acceso-vascular": ["accesos-vasculares"],
  rush: ["respuesta-volumen"],
  vexus: ["vexus"],
  dvt: [],
};

export const MODULE_IDS = courseModules.map((m) => m.slug);

/** Primer módulo del curso asociado a un protocolo legacy */
export function getModuleSlugForProtocol(protocolSlug: string): string | undefined {
  return PROTOCOL_TO_MODULES[protocolSlug]?.[0];
}
