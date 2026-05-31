export type Curso = {
  id: string;
  slug: string;
  titulo: string;
  fecha: string;
  horario: string;
  sede: string;
  precio: number;
  precioResidente: number;
  descripcion: string;
  cupoMax: number;
  temario: string[];
  pagoUrl: string;
  pagoUrlResidente: string;
};

export const CURSOS: Curso[] = [
  {
    id: "curso-pocus-uci-2026",
    slug: "pocus-uci-2026",
    titulo: "POCUS en UCI — Fundamentos y protocolos",
    fecha: "14–15 junio 2026",
    horario: "08:00 – 18:00",
    sede: "Hospital Universitario · CDMX",
    precio: 4500,
    precioResidente: 3200,
    descripcion:
      "Curso presencial intensivo de ultrasonido crítico: BLUE, FAST, VExUS y RUSH con casos en vivo y práctica guiada.",
    cupoMax: 24,
    temario: [
      "Fundamentos de POCUS en paciente crítico",
      "Protocolo BLUE — ventana pulmonar y pleural",
      "FAST / eFAST en shock y trauma",
      "VExUS — congestión venosa y perfusión",
      "RUSH — integración hemodinámica",
      "Casos clínicos y toma de decisiones en guardia",
    ],
    pagoUrl: "https://pay.clip.mx/example-pocus-general",
    pagoUrlResidente: "https://pay.clip.mx/example-pocus-residente",
  },
  {
    id: "curso-companion-guardia-2026",
    slug: "companion-guardia-2026",
    titulo: "Companion USG en guardia — Workshop práctico",
    fecha: "28 septiembre 2026",
    horario: "09:00 – 17:00",
    sede: "Centro de simulación · Guadalajara",
    precio: 3800,
    precioResidente: 2600,
    descripcion:
      "Workshop orientado a flujo de guardia: queja → protocolo → atlas → diferencial. Ideal para residentes de urgencias y UCI.",
    cupoMax: 18,
    temario: [
      "Flujo clínico en guardia con POCUS",
      "Árboles de decisión BLUE y FAST",
      "Atlas de hallazgos normales vs patológicos",
      "Errores frecuentes y trucos de adquisición",
      "Simulación de casos con feedback inmediato",
    ],
    pagoUrl: "https://pay.clip.mx/example-companion-general",
    pagoUrlResidente: "https://pay.clip.mx/example-companion-residente",
  },
];

export function getCursoBySlug(slug: string): Curso | undefined {
  return CURSOS.find((c) => c.slug === slug);
}

export function getAllCursoSlugs(): string[] {
  return CURSOS.map((c) => c.slug);
}

export function formatPrecio(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(amount);
}
