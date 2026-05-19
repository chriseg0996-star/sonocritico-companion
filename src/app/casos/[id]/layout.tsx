import { Suspense } from "react";
import { LoadingScreen } from "@/hooks/useAuth";
import { clinicalCases } from "@/lib/mock-data";
import { getEngineCaseIds } from "@/lib/cases";

export function generateStaticParams() {
  const legacy = clinicalCases.map((c) => ({ id: c.id }));
  const engine = getEngineCaseIds().map((id) => ({ id }));
  return [...legacy, ...engine];
}

export default function CasoIdLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}
