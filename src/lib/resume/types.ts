export type ResumeKind = "module" | "clip" | "case" | "search";

export type ResumePointer = {
  kind: ResumeKind;
  label: string;
  sublabel?: string;
  href: string;
  at: string;
};

export type ModuleResume = {
  slug: string;
  stepIndex: number;
  stepTitle?: string;
  href: string;
  at: string;
};

export type ClipResume = {
  mediaId: string;
  module?: string;
  label: string;
  href: string;
  at: string;
};

export type CaseResume = {
  caseId: string;
  label: string;
  href: string;
  at: string;
};

export type SearchResume = {
  query: string;
  href: string;
  at: string;
};

export type SmartResumeState = {
  module?: ModuleResume;
  clip?: ClipResume;
  case?: CaseResume;
  search?: SearchResume;
};
