"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { courseModules, getModuleIcon } from "@/lib/course-modules";
import { getProgress } from "@/lib/auth";
import { getModulePercent, getModuleStatus } from "@/lib/module-progress";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import type { LocalProgress } from "@/lib/auth";

export default function ModulosPage() {
  const { user, loading } = useAuth("student");
  const router = useRouter();
  const [progress, setProgress] = useState<LocalProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (loading || !user || !progress) return <LoadingScreen />;

  return (
    <AppLayout user={user}>
      <PageShell>
        <PageHeader
          title="Modulos del curso"
          subtitle={`SonoCritico MX · ${courseModules.length} temas en orden`}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {courseModules.map((mod) => {
            const pct = getModulePercent(mod.slug, progress);
            const status = getModuleStatus(mod.slug, progress);
            const Icon = getModuleIcon(mod.icon);

            return (
              <ModuleCard
                key={mod.slug}
                order={mod.order}
                title={mod.title}
                subtitle={mod.subtitle}
                estimatedMinutes={mod.estimatedMinutes}
                percent={pct}
                status={status}
                icon={Icon}
                onClick={() => router.push(`/modulos/${mod.slug}?step=0`)}
              />
            );
          })}
        </div>
      </PageShell>
    </AppLayout>
  );
}
