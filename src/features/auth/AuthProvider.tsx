"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { buildGuestUser, buildUserFromEmail } from "@/features/auth/buildUser";
import {
  AUTH_CHANGED_EVENT,
  AUTH_STORAGE_KEY,
  readStoredUser,
  writeStoredUser,
} from "@/features/auth/storage";
import type { AuthState, User, UserPlan } from "@/features/auth/types";

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  loginAsGuest: () => void;
  logout: () => void;
  setPlan: (plan: UserPlan) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const refresh = () => {
      setUser(readStoredUser());
      setIsLoading(false);
    };
    refresh();

    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === AUTH_STORAGE_KEY) refresh();
    };
    const onAuthChanged = () => refresh();

    window.addEventListener("storage", onStorage);
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    };
  }, []);

  const login = useCallback((email: string, password: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || trimmedEmail.length < 3) {
      return { ok: false as const, error: "Ingresa un email válido." };
    }
    if (!password || password.length < 1) {
      return { ok: false as const, error: "Ingresa tu contraseña." };
    }
    const next = buildUserFromEmail(trimmedEmail);
    writeStoredUser(next);
    setUser(next);
    return { ok: true as const };
  }, []);

  const loginAsGuest = useCallback(() => {
    const guest = buildGuestUser();
    writeStoredUser(guest);
    setUser(guest);
  }, []);

  const logout = useCallback(() => {
    writeStoredUser(null);
    setUser(null);
  }, []);

  const setPlan = useCallback((plan: UserPlan) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, plan };
      writeStoredUser(next);
      return next;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      loginAsGuest,
      logout,
      setPlan,
    }),
    [user, isLoading, login, loginAsGuest, logout, setPlan],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

/** Para componentes que pueden renderizarse fuera del provider. */
export function useAuthOptional(): AuthContextValue | null {
  return useContext(AuthContext);
}
