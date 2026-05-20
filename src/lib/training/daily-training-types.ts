export type DailyTrainingKind = "case" | "finding" | "clip";

export type DailyTrainingItem = {
  kind: DailyTrainingKind;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  minutes: number;
};

export type DailyTrainingPack = {
  dateKey: string;
  case: DailyTrainingItem;
  finding: DailyTrainingItem;
  clip: DailyTrainingItem;
};

export type LastDailyTraining = {
  dateKey: string;
  completedKinds: DailyTrainingKind[];
  lastKind?: DailyTrainingKind;
  lastAt?: string;
};
