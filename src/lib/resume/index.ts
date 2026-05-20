export type {
  ResumeKind,
  ResumePointer,
  SmartResumeState,
  ModuleResume,
  ClipResume,
  CaseResume,
  SearchResume,
} from "@/lib/resume/types";
export { loadSmartResumeState, saveSmartResumeState, patchSmartResumeState } from "@/lib/resume/storage";
export {
  recordLastModule,
  recordLastClip,
  recordLastCase,
  recordLastSearch,
} from "@/lib/resume/record";
export { getSmartResumeTarget } from "@/lib/resume/target";
