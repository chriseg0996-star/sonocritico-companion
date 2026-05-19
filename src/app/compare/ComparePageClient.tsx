"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { getComparisonPairById, loadCompareSession } from "@/lib/compare";
import { CompareView } from "@/components/compare/CompareView";

function CompareContent() {
  const searchParams = useSearchParams();
  const pairId = searchParams.get("pair");
  const fromMedia = searchParams.get("from");
  const session = loadCompareSession();
  const pair = getComparisonPairById(pairId ?? session.lastPairId ?? "");

  if (!pair) {
    return (
      <div style={{ padding: 24, color: "#7e8897" }}>
        Selecciona una comparación desde el visor o la biblioteca.
      </div>
    );
  }

  return <CompareView pair={pair} fromMedia={fromMedia} />;
}

export function ComparePageClient() {
  const { user, loading } = useAuth("student");

  if (loading || !user) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <CompareContent />
    </Suspense>
  );
}
