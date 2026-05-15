import { Suspense } from "react";
import { LoadingScreen } from "@/hooks/useAuth";
import { clinicalCases } from "@/lib/mock-data";

export function generateStaticParams() {
  return clinicalCases.map((c) => ({ id: c.id }));
}

export default function CasoIdLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}
