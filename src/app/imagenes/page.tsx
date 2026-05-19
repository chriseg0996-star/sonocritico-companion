"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScanLineCard, Badge } from "@/components/ui/base";
import { EchoMedia } from "@/components/media/EchoMedia";
import { echoImages, protocols } from "@/lib/mock-data";
import { getModuleSlugForProtocol } from "@/lib/course-modules";
import { withBasePath } from "@/lib/paths";
import { theme } from "@/lib/theme";

function ImagenesContent() {
  const { user, loading } = useAuth("student");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterProto, setFilterProto] = useState("todos");
  const [filterPath, setFilterPath] = useState<"all" | "pathological" | "normal">("all");
  const [selected, setSelected] = useState<(typeof echoImages)[0] | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const img = echoImages.find((i) => i.id === id);
      if (img) setSelected(img);
    }
  }, [searchParams]);

  if (loading || !user) return <LoadingScreen />;

  const filtered = echoImages.filter((img) => {
    if (filterProto !== "todos" && img.protocolRef !== filterProto) return false;
    if (filterPath === "pathological" && !img.isPathological) return false;
    if (filterPath === "normal" && img.isPathological) return false;
    return true;
  });

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 10,
    fontFamily: "'IBM Plex Mono', monospace",
    cursor: "pointer",
    whiteSpace: "nowrap",
    background: active ? theme.accent.muted : "transparent",
    border: `1px solid ${active ? theme.accent.border : theme.bg.border}`,
    color: active ? theme.brand.primary : theme.text.muted,
  });

  return (
    <AppLayout user={user}>
      <PageShell>
        <PageHeader
          title="Biblioteca de imagenes"
          subtitle={`${echoImages.length} imagenes anotadas del curso`}
        />

        <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
          {["todos", ...protocols.map((p) => p.slug)].map((slug) => {
            const proto = protocols.find((p) => p.slug === slug);
            return (
              <button key={slug} type="button" onClick={() => setFilterProto(slug)} style={chipStyle(filterProto === slug)}>
                {slug === "todos" ? "Todos" : proto?.title || slug}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {(
            [
              ["all", "Todos"],
              ["pathological", "Patológico"],
              ["normal", "Normal"],
            ] as const
          ).map(([f, label]) => (
            <button key={f} type="button" onClick={() => setFilterPath(f)} style={chipStyle(filterPath === f)}>
              {label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <ScanLineCard style={{ padding: 32, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: theme.text.secondary }}>
              No hay imágenes con los filtros seleccionados.
            </p>
          </ScanLineCard>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {filtered.map((img) => (
              <ScanLineCard key={img.id} onClick={() => setSelected(img)} style={{ cursor: "pointer", overflow: "hidden" }}>
                <img
                  src={withBasePath(img.thumbnailSrc)}
                  alt={img.finding}
                  style={{ width: "100%", height: 120, objectFit: "cover", display: "block", background: theme.bg.elevated }}
                />
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 11, color: theme.text.primary, fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>
                    {img.finding}
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <Badge variant={img.isPathological ? "red" : "white"}>
                      {img.isPathological ? "Patol." : "Normal"}
                    </Badge>
                    <Badge variant="gray">{img.window}</Badge>
                  </div>
                </div>
              </ScanLineCard>
            ))}
          </div>
        )}

        {selected && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: theme.overlay.viewerFull,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setSelected(null)}
              style={{ position: "absolute", inset: 0, border: "none", background: "transparent", cursor: "pointer" }}
            />
            <div
              className="scan-line"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 520,
                background: theme.bg.card,
                border: `1px solid ${theme.bg.border}`,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderBottom: `1px solid ${theme.bg.border}`,
                }}
              >
                <div>
                  <div style={{ fontSize: 10, color: theme.brand.primary, fontFamily: "'IBM Plex Mono', monospace" }}>
                    {selected.window}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: theme.text.primary }}>{selected.finding}</div>
                </div>
                <button type="button" onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <X size={18} color={theme.text.muted} />
                </button>
              </div>

              <EchoMedia image={selected} showAnnotations maxHeight={280} />

              <div style={{ padding: 14 }}>
                <p style={{ fontSize: 12, color: theme.text.secondary, lineHeight: 1.6, marginBottom: 12 }}>{selected.description}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Badge variant={selected.isPathological ? "red" : "white"}>
                    {selected.isPathological ? "Patológico" : "Normal"}
                  </Badge>
                  <span
                    onClick={() => {
                      const mod = getModuleSlugForProtocol(selected.protocolRef);
                      setSelected(null);
                      router.push(mod ? `/modulos/${mod}?tab=hallazgos` : "/modulos");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Badge variant="brand">Ver en módulo →</Badge>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageShell>
    </AppLayout>
  );
}

export default function ImagenesPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ImagenesContent />
    </Suspense>
  );
}
