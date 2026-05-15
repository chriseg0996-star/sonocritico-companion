import { Suspense } from "react";
import { LoadingScreen } from "@/hooks/useAuth";

export default function ModuloSlugLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}
