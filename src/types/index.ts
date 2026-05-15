export type UserRole = "student" | "instructor";
export type Specialty = "urgencias" | "uci" | "anestesia" | "medicina-critica" | "otro";
export type ProtocolStatus = "not-started" | "in-progress" | "complete";
export type NodeType = "question" | "finding" | "action" | "endpoint";
export type EchoWindow =
  | "PLAX" | "PSAX" | "A4C" | "A2C" | "SC" | "IVC"
  | "BLUE-anterior" | "BLUE-lateral"
  | "FAST-RUQ" | "FAST-LUQ" | "FAST-pelvis" | "FAST-cardiac"
  | "vascular" | "otro";

export interface User {
  id: string;
  email: string;
  name: string;
  specialty: Specialty;
  role: UserRole;
  courseCode: string;
  initials: string;
}

export interface Course {
  id: string;
  name: string;
  tagline: string;
  date: string;
  instructorId: string;
  accessCode: string;
  moduleIds: string[];
  activeModuleId: string | null;
  activeCaseId: string | null;
  /** @deprecated use activeModuleId */
  activeProtocolSlug?: string | null;
  isLive: boolean;
}

export interface CourseModule {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  summary: string;
  icon: string;
  protocolSlugs: string[];
  estimatedMinutes: number;
  isCapstone?: boolean;
}

export interface Annotation {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  type: "arrow" | "circle" | "text";
}

export type EchoMediaType = "image" | "video" | "gif";

export interface EchoImage {
  id: string;
  src: string;
  thumbnailSrc: string;
  mediaType?: EchoMediaType;
  posterSrc?: string;
  protocolRef: string;
  window: EchoWindow;
  finding: string;
  isPathological: boolean;
  annotations: Annotation[];
  description: string;
  difficulty: 1 | 2 | 3;
}

export interface FlowNode {
  id: string;
  label: string;
  type: NodeType;
  description?: string;
  clinicalAction?: string;
  imageId?: string;
  children: string[];
  x?: number; // layout hint
  y?: number;
}

export interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "true-false" | "image-select";
  imageId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  protocolRef: string;
}

export interface Protocol {
  slug: string;
  title: string;
  indication: string;
  icon: string;
  flowNodes: FlowNode[];
  checklistItems: ChecklistItem[];
  quizIds: string[];
  imageIds: string[];
  estimatedMinutes: number;
  difficulty: 1 | 2 | 3;
  category: "cardiac" | "pulmonar" | "vascular" | "abdomen" | "procedimiento";
  color: string;
}

export interface Vitals {
  hr: number;
  bp: string;
  rr: number;
  spo2: number;
  temp: number;
  map?: number;
  lactate?: number;
}

export interface ClinicalCase {
  id: string;
  title: string;
  scenario: string;
  patientAge: number;
  patientSex: "M" | "F";
  vitals: Vitals;
  imageIds: string[];
  questions: QuizQuestion[];
  protocolRefs: string[];
  difficulty: 1 | 2 | 3;
  tags: string[];
  teachingPoint: string;
}

export interface ChecklistStatus {
  [protocolSlug: string]: { [itemId: string]: boolean };
}

export interface QuizResult {
  id: string;
  quizId: string;
  protocolRef: string;
  score: number;
  answers: number[];
  completedAt: string;
  timeSpentSeconds: number;
}

export interface StudentProgress {
  userId: string;
  courseId: string;
  completedProtocols: string[];
  completedCases: string[];
  checklistStatus: ChecklistStatus;
  quizResults: QuizResult[];
  lastActivity: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  specialty: Specialty;
  initials: string;
  progress: StudentProgress;
}
