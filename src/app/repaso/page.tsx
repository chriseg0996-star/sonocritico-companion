"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shuffle } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScanLineCard, Badge, Btn } from "@/components/ui/base";
import { EchoMedia } from "@/components/media/EchoMedia";
import { echoImages, protocols } from "@/lib/mock-data";
import { theme } from "@/lib/theme";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function RepasoContent() {
  const { user, loading } = useAuth("student");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deck, setDeck] = useState(echoImages);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filterProto, setFilterProto] = useState(searchParams.get("protocol") ?? "todos");

  useEffect(() => {
    const p = searchParams.get("protocol");
    if (p) setFilterProto(p);
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (filterProto === "todos") return echoImages;
    return echoImages.filter((i) => i.protocolRef === filterProto);
  }, [filterProto]);

  useEffect(() => {
    setDeck(filtered);
    setIndex(0);
    setFlipped(false);
  }, [filterProto, filtered]);

  if (loading || !user) return <LoadingScreen />;

  const card = deck[index];
  if (!card) {
    return (
      <AppLayout user={user}>
        <PageShell narrow>
          <PageHeader title="Repaso flashcards" subtitle="Sin tarjetas para este filtro" />
          <ScanLineCard style={{ padding: 24, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: theme.text.secondary }}>No hay tarjetas para este filtro.</p>
          </ScanLineCard>
        </PageShell>
      </AppLayout>
    );
  }

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
      <PageShell narrow>
        <PageHeader
          title="Repaso flashcards"
          subtitle={`Toca la tarjeta para ver el hallazgo · ${index + 1} / ${deck.length}`}
        />

        <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
          {["todos", ...protocols.map((p) => p.slug)].map((slug) => (
            <button key={slug} type="button" onClick={() => setFilterProto(slug)} style={chipStyle(filterProto === slug)}>
              {slug === "todos" ? "Todos" : protocols.find((p) => p.slug === slug)?.title ?? slug}
            </button>
          ))}
        </div>

        <ScanLineCard
          onClick={() => setFlipped((f) => !f)}
          style={{ padding: 0, overflow: "hidden", cursor: "pointer", marginBottom: 12 }}
        >
          {!flipped ? (
            <>
              <EchoMedia image={card} maxHeight={220} />
              <div style={{ padding: "10px 14px", fontSize: 11, color: theme.text.muted, textAlign: "center" }}>
                ¿Qué hallazgo ves? · Toca para voltear
              </div>
            </>
          ) : (
            <div style={{ padding: 16 }}>
              <Badge variant={card.isPathological ? "red" : "white"}>
                {card.isPathological ? "Patológico" : "Normal"}
              </Badge>
              <div style={{ fontSize: 16, fontWeight: 500, color: theme.text.primary, marginTop: 10 }}>
                {card.finding}
              </div>
              <p style={{ fontSize: 12, color: theme.text.secondary, lineHeight: 1.6, marginTop: 8 }}>
                {card.description}
              </p>
              <div style={{ fontSize: 10, color: theme.text.muted, marginTop: 8, fontFamily: "'IBM Plex Mono', monospace" }}>
                {card.window}
              </div>
            </div>
          )}
        </ScanLineCard>

        <div style={{ display: "flex", gap: 8 }}>
          <Btn
            variant="ghost"
            style={{ flex: 1 }}
            onClick={() => {
              setFlipped(false);
              setIndex((i) => Math.max(0, i - 1));
            }}
            disabled={index === 0}
          >
            ← Anterior
          </Btn>
          <Btn
            variant="primary"
            style={{ flex: 1 }}
            onClick={() => {
              setFlipped(false);
              setIndex((i) => (i + 1 < deck.length ? i + 1 : 0));
            }}
          >
            Siguiente →
          </Btn>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <Btn
            variant="ghost"
            fullWidth
            onClick={() => {
              setDeck(shuffle(filtered));
              setIndex(0);
              setFlipped(false);
            }}
          >
            <Shuffle size={14} /> Mezclar
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => router.push(`/imagenes?id=${card.id}`)}>
            Ver en biblioteca
          </Btn>
        </div>
      </PageShell>
    </AppLayout>
  );
}

export default function RepasoPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RepasoContent />
    </Suspense>
  );
}
