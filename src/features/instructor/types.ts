export type ResidentLevel = "R1" | "R2" | "R3" | "R4" | "R5";

export type InstructorProtocol = "BLUE" | "FAST" | "VExUS" | "RUSH";

export type StudentProgress = {
  id: string;
  nombre: string;
  nivel: ResidentLevel;
  modulosCompletados: number;
  modulosTotal: number;
  casos: number;
  casosTotal: number;
  scorePromedio: number;
  ultimaActividad: string;
  /** % por protocolo (0–100) para heatmap y detalle. */
  protocolos: Record<InstructorProtocol, number>;
  email?: string;
  especialidad?: string;
};

export type CourseStats = {
  totalEstudiantes: number;
  completadoPromedio: number;
  casosPorProtocolo: Record<InstructorProtocol, number>;
};

export type HeatmapRow = {
  protocolo: InstructorProtocol;
  celdas: Record<ResidentLevel, number>;
};
