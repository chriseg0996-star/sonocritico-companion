import type {
  CourseStats,
  HeatmapRow,
  InstructorProtocol,
  ResidentLevel,
  StudentProgress,
} from "@/features/instructor/types";

const MODULOS_TOTAL = 10;
const CASOS_TOTAL = 6;
const LEVELS: ResidentLevel[] = ["R1", "R2", "R3", "R4", "R5"];
const PROTOCOLS: InstructorProtocol[] = ["BLUE", "FAST", "VExUS", "RUSH"];

/** Mock listo para sustituir por API. */
export const MOCK_STUDENTS: StudentProgress[] = [
  {
    id: "st-01",
    nombre: "Dra. Ana García Mendoza",
    nivel: "R1",
    modulosCompletados: 2,
    modulosTotal: MODULOS_TOTAL,
    casos: 1,
    casosTotal: CASOS_TOTAL,
    scorePromedio: 72,
    ultimaActividad: "2026-05-26T14:20:00.000Z",
    protocolos: { BLUE: 40, FAST: 85, VExUS: 10, RUSH: 0 },
    email: "agarcia@hospital.mx",
    especialidad: "Urgencias",
  },
  {
    id: "st-02",
    nombre: "Dr. Roberto Méndez Luna",
    nivel: "R2",
    modulosCompletados: 5,
    modulosTotal: MODULOS_TOTAL,
    casos: 3,
    casosTotal: CASOS_TOTAL,
    scorePromedio: 88,
    ultimaActividad: "2026-05-27T08:45:00.000Z",
    protocolos: { BLUE: 90, FAST: 100, VExUS: 55, RUSH: 70 },
    email: "rmendez@uci.mx",
    especialidad: "UCI",
  },
  {
    id: "st-03",
    nombre: "Dra. Sofía Reyes Castillo",
    nivel: "R1",
    modulosCompletados: 1,
    modulosTotal: MODULOS_TOTAL,
    casos: 0,
    casosTotal: CASOS_TOTAL,
    scorePromedio: 58,
    ultimaActividad: "2026-05-24T19:10:00.000Z",
    protocolos: { BLUE: 20, FAST: 60, VExUS: 0, RUSH: 0 },
    email: "sreyes@anestesia.mx",
    especialidad: "Anestesia",
  },
  {
    id: "st-04",
    nombre: "Dr. Carlos Vega Herrera",
    nivel: "R3",
    modulosCompletados: 7,
    modulosTotal: MODULOS_TOTAL,
    casos: 4,
    casosTotal: CASOS_TOTAL,
    scorePromedio: 91,
    ultimaActividad: "2026-05-27T06:30:00.000Z",
    protocolos: { BLUE: 100, FAST: 100, VExUS: 80, RUSH: 95 },
    email: "cvega@urgencias.mx",
    especialidad: "Urgencias",
  },
  {
    id: "st-05",
    nombre: "Dra. María López Sánchez",
    nivel: "R2",
    modulosCompletados: 4,
    modulosTotal: MODULOS_TOTAL,
    casos: 2,
    casosTotal: CASOS_TOTAL,
    scorePromedio: 79,
    ultimaActividad: "2026-05-25T11:00:00.000Z",
    protocolos: { BLUE: 75, FAST: 90, VExUS: 30, RUSH: 45 },
    email: "mlopez@medicina.mx",
    especialidad: "Medicina crítica",
  },
  {
    id: "st-06",
    nombre: "Dr. Andrés Torres Gil",
    nivel: "R4",
    modulosCompletados: 9,
    modulosTotal: MODULOS_TOTAL,
    casos: 5,
    casosTotal: CASOS_TOTAL,
    scorePromedio: 94,
    ultimaActividad: "2026-05-27T09:15:00.000Z",
    protocolos: { BLUE: 100, FAST: 100, VExUS: 95, RUSH: 100 },
    email: "atorres@uci.mx",
    especialidad: "UCI",
  },
  {
    id: "st-07",
    nombre: "Dra. Patricia Núñez Ríos",
    nivel: "R3",
    modulosCompletados: 6,
    modulosTotal: MODULOS_TOTAL,
    casos: 3,
    casosTotal: CASOS_TOTAL,
    scorePromedio: 84,
    ultimaActividad: "2026-05-26T22:40:00.000Z",
    protocolos: { BLUE: 85, FAST: 95, VExUS: 60, RUSH: 75 },
    email: "pnunez@hospital.mx",
    especialidad: "Urgencias",
  },
  {
    id: "st-08",
    nombre: "Dr. Diego Salinas Morales",
    nivel: "R5",
    modulosCompletados: 10,
    modulosTotal: MODULOS_TOTAL,
    casos: 6,
    casosTotal: CASOS_TOTAL,
    scorePromedio: 97,
    ultimaActividad: "2026-05-27T10:05:00.000Z",
    protocolos: { BLUE: 100, FAST: 100, VExUS: 100, RUSH: 100 },
    email: "dsalinas@uci.mx",
    especialidad: "UCI",
  },
];

export function getModuleProgressPct(student: StudentProgress): number {
  if (student.modulosTotal <= 0) return 0;
  return Math.round((student.modulosCompletados / student.modulosTotal) * 100);
}

export function formatUltimaActividad(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return "Hace <1 h";
  if (diffH < 24) return `Hace ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "Ayer";
  if (diffD < 7) return `Hace ${diffD} d`;
  return date.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
}

export function getCourseStats(students: StudentProgress[] = MOCK_STUDENTS): CourseStats {
  const total = students.length;
  const completadoPromedio =
    total === 0
      ? 0
      : Math.round(
          students.reduce((sum, s) => sum + getModuleProgressPct(s), 0) / total,
        );

  const casosPorProtocolo = Object.fromEntries(
    PROTOCOLS.map((protocolo) => {
      const count = students.filter((s) => s.protocolos[protocolo] >= 80).length;
      return [protocolo, count];
    }),
  ) as Record<InstructorProtocol, number>;

  return {
    totalEstudiantes: total,
    completadoPromedio,
    casosPorProtocolo,
  };
}

export function getProtocolHeatmap(students: StudentProgress[] = MOCK_STUDENTS): HeatmapRow[] {
  return PROTOCOLS.map((protocolo) => {
    const celdas = Object.fromEntries(
      LEVELS.map((nivel) => {
        const group = students.filter((s) => s.nivel === nivel);
        const pct =
          group.length === 0
            ? 0
            : Math.round(
                group.reduce((sum, s) => sum + s.protocolos[protocolo], 0) / group.length,
              );
        return [nivel, pct];
      }),
    ) as Record<ResidentLevel, number>;
    return { protocolo, celdas };
  });
}
