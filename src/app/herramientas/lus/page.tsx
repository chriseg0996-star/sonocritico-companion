"use client";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { ToolShell } from "@/components/tools/ToolShell";
import { LusBlueTool } from "@/components/tools/LusBlueTool";

export default function LusToolPage() {
  const { user, loading } = useAuth("student");
  if (loading || !user) return <LoadingScreen />;

  return (
    <ToolShell
      user={user}
      title="Protocolo BLUE"
      subtitle="Disnea aguda — perfil A/B, PLAPS y manejo sugerido"
      moduleHref="/modulos/pulmonar-blue?tab=resumen"
    >
      <LusBlueTool />
    </ToolShell>
  );
}
