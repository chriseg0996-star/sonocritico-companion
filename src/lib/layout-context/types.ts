export type CompanionScreenKind = "viewer" | "protocol" | "guardia" | "case";

export type CompanionLayoutHints = {
  mediaId?: string;
  fromProtocol?: string | null;
  fromStep?: string | null;
  caseId?: string;
  protocolSlug?: string;
  protocolStepId?: string | null;
};

export type SidePanelState = {
  open: boolean;
  width: number;
};
