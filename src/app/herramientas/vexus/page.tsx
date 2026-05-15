"use client";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { ToolShell } from "@/components/tools/ToolShell";
import { VexusCalculator } from "@/components/tools/VexusCalculator";

export default function VexusToolPage() {
  const { user, loading } = useAuth("student");
  if (loading || !user) return <LoadingScreen />;

  return (
    <ToolShell
      user={user}
      title="Calculadora VExUS"
      subtitle="Congestión venosa sistémica — grado 0 a 3"
      moduleHref="/modulos/vexus?tab=resumen"
    >
      <VexusCalculator />
    </ToolShell>
  );
}
