"use client";

import { useEffect, useState } from "react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import {
  ContinueCourse,
  CourseProgress,
  CompanionModePanel,
  DailyTrainingCard,
  DashboardHero,
  QuickAccess,
  QuickConsult,
} from "@/components/dashboard";
import { getProgress } from "@/lib/auth";
import type { LocalProgress } from "@/lib/auth";

export default function DashboardPage() {
  const { user, loading } = useAuth("student");
  const [progress, setProgress] = useState<LocalProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (loading || !user || !progress) return <LoadingScreen />;

  return (
    <AppLayout user={user}>
      <PageShell>
        <DashboardHero />
        <CompanionModePanel showFullPageLink />
        <DailyTrainingCard />
        <QuickAccess />
        <QuickConsult />
        <ContinueCourse progress={progress} />
        <CourseProgress progress={progress} />
      </PageShell>
    </AppLayout>
  );
}
