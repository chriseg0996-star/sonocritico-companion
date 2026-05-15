"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth";
import { theme } from "@/lib/theme";
import type { User } from "@/types";

export function useAuth(requiredRole?: "student" | "instructor") {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    if (!stored) {
      router.push("/login");
      return;
    }
    if (requiredRole && stored.role !== requiredRole) {
      router.push(stored.role === "instructor" ? "/instructor" : "/dashboard");
      return;
    }
    setUser(stored);
    setLoading(false);
  }, [router, requiredRole]);

  return { user, loading };
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
