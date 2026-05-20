export type CompanionPanelLink = {
  label: string;
  href: string;
  meta?: string;
};

export type CompanionPanelSection = {
  title: string;
  items: CompanionPanelLink[];
};

export type CompanionPanelModel = {
  title: string;
  subtitle?: string;
  sections: CompanionPanelSection[];
  footnote?: string;
};
