"use client";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { ToolShell } from "@/components/tools/ToolShell";
import { ShockTableTool } from "@/components/tools/ShockTableTool";

export default function ShockToolPage() {
  const { user, loading } = useAuth("student");
  if (loading || !user) return <LoadingScreen />;

  return (
    <ToolShell
      user={user}
      title="RUSH — Tipos de shock"
      subtitle="Pump · Tank · Pipes — clasificación guiada"
      moduleHref="/modulos/respuesta-volumen?tab=resumen"
    >
      <ShockTableTool />
    </ToolShell>
  );
}
