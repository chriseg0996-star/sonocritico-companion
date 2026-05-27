"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth as useSaasAuth } from "@/features/auth/useAuth";
import { toLegacyUser } from "@/features/auth/legacy";
import { theme } from "@/lib/theme";
import type { User } from "@/types";

export function useAuth(requiredRole?: "student" | "instructor") {
  const router = useRouter();
  const { user: saasUser, isLoading, isAuthenticated } = useSaasAuth();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !saasUser) {
      router.push("/login");
      return;
    }
    const legacy = toLegacyUser(saasUser);
    if (requiredRole && legacy.role !== requiredRole) {
      router.push(legacy.role === "instructor" ? "/instructor" : "/dashboard");
      return;
    }
    setUser(legacy);
    setReady(true);
  }, [isAuthenticated, isLoading, requiredRole, router, saasUser]);

  return { user, loading: isLoading || !ready };
}

export function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <p
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.14em",
          color: theme.accent.primary,
          margin: 0,
        }}
      >
        SONOCRÍTICO
      </p>
      <div style={{ width: 40, height: 2, background: theme.bg.elevated, borderRadius: 1, overflow: "hidden" }}>
        <div
          style={{
            width: "60%",
            height: "100%",
            background: theme.accent.primary,
            animation: "slide 1s ease-in-out infinite",
          }}
        />
      </div>
      <style>{`@keyframes slide { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }`}</style>
    </div>
  );
}
