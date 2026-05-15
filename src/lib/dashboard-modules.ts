import type { LucideIcon } from "lucide-react";
import { Brain, Heart, Scan, Syringe, Wind, Waves, Wrench, Zap } from "lucide-react";

export type ConsultChip = {
  label: "Protocolo" | "Imágenes" | "Videos" | "Bibliografía" | "Calculadora";
  href: string;
};

export type ConsultTile = {
  label: string;
  description: string;
  moduleHref: string;
  icon: LucideIcon;
  protocolRef?: string;
  chips: ConsultChip[];
};

function moduleLinks(slug: string, options?: { protocolRef?: string; calculadoraHref?: string }): ConsultChip[] {
  const base = `/modulos/${slug}`;
  const chips: ConsultChip[] = [
    { label: "Protocolo", href: `${base}?tab=protocolo` },
    { label: "Imágenes", href: "/biblioteca" },
    { label: "Videos", href: `${base}?tab=adquisicion` },
    { label: "Bibliografía", href: `${base}?tab=resumen` },
  ];
  if (options?.calculadoraHref) {
    chips.push({ label: "Calculadora", href: options.calculadoraHref });
  }
  return chips;
}

/** Consulta rápida — companion clínico-visual */
export const consultTiles: ConsultTile[] = [
  {
    label: "Pulmón / BLUE / LUS",
    description: "Perfil A/B, PLAPS y disnea aguda en UCI",
    moduleHref: "/modulos/pulmonar-blue?step=0",
    icon: Wind,
    protocolRef: "blue",
    chips: moduleLinks("pulmonar-blue", { protocolRef: "blue", calculadoraHref: "/herramientas/lus" }),
  },
  {
    label: "FAST / eFAST",
    description: "Líquido libre, tórax y trauma inestable",
    moduleHref: "/modulos/fast-efast?step=0",
    icon: Zap,
    protocolRef: "fast",
    chips: moduleLinks("fast-efast", { protocolRef: "fast" }),
  },
  {
    label: "Eco básica",
    description: "VI, VD, pericardio y taponamiento",
    moduleHref: "/modulos/eco-critico?step=0",
    icon: Heart,
    protocolRef: "eco-basica",
    chips: moduleLinks("eco-critico", { protocolRef: "eco-basica", calculadoraHref: "/herramientas/shock" }),
  },
  {
    label: "VExUS",
    description: "Congestión venosa: VCI, hepática, porta, renal",
    moduleHref: "/modulos/vexus?step=0",
    icon: Waves,
    protocolRef: "vexus",
    chips: moduleLinks("vexus", { protocolRef: "vexus", calculadoraHref: "/herramientas/vexus" }),
  },
  {
    label: "Accesos vasculares",
    description: "Vía central y periférica guiada por US",
    moduleHref: "/modulos/accesos-vasculares?step=0",
    icon: Syringe,
    protocolRef: "acceso-vascular",
    chips: moduleLinks("accesos-vasculares", { protocolRef: "acceso-vascular" }),
  },
  {
    label: "Diafragma / weaning",
    description: "Excursión diafragmática y destete",
    moduleHref: "/modulos/weaning-diafragma?step=0",
    icon: Scan,
    chips: moduleLinks("weaning-diafragma", { calculadoraHref: "/herramientas" }),
  },
  {
    label: "NeuroUSG",
    description: "ONS, TCD y presión intracraneal",
    moduleHref: "/modulos/neuro-pocus?step=0",
    icon: Brain,
    chips: moduleLinks("neuro-pocus"),
  },
  {
    label: "Calculadoras",
    description: "VExUS, BLUE, RUSH — cabecera del paciente",
    moduleHref: "/herramientas",
    icon: Wrench,
    chips: [
      { label: "Protocolo", href: "/herramientas/lus" },
      { label: "Imágenes", href: "/biblioteca" },
      { label: "Videos", href: "/modulos/fundamentos?tab=adquisicion" },
      { label: "Bibliografía", href: "/modulos/fundamentos?tab=resumen" },
    ],
  },
];
