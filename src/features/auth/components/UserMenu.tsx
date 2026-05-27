"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, LogOut, UserRound } from "lucide-react";
import { Chip } from "@/components/ui";
import { useAuthOptional } from "@/features/auth/AuthProvider";
import type { User } from "@/features/auth/types";
import { logout as legacyLogout } from "@/lib/auth";
import styles from "@/features/auth/auth.module.css";

type Props = {
  /** Fallback cuando la página pasa usuario legacy (p. ej. demo instructor). */
  displayName?: string;
  displayMeta?: string;
  initials?: string;
};

function rolLabel(rol: string): string {
  if (rol === "instructor") return "Instructor";
  if (rol === "admin") return "Admin";
  return "Estudiante";
}

function isGuestUser(user: User | null | undefined, displayName?: string): boolean {
  if (displayName?.trim().toLowerCase() === "invitado") return true;
  if (!user) return false;
  if (user.id === "saas-guest") return true;
  if (!user.email?.trim()) return true;
  return user.nombre.trim().toLowerCase() === "invitado";
}

function resolveDisplayName(user: User | null | undefined, displayName?: string): string {
  if (isGuestUser(user, displayName)) return "Invitado";
  const raw = (user?.nombre ?? displayName ?? "Usuario").trim();
  const rolSuffix = user ? ` ${rolLabel(user.rol)}` : "";
  if (rolSuffix && raw.endsWith(rolSuffix)) {
    return raw.slice(0, -rolSuffix.length).trim();
  }
  return raw;
}

function resolveDisplayMeta(
  user: User | null | undefined,
  displayMeta?: string,
  displayName?: string,
): string {
  if (isGuestUser(user, displayName)) {
    return `Plan ${(user?.plan ?? "free").toUpperCase()}`;
  }
  if (user) {
    return `${rolLabel(user.rol)} · Plan ${user.plan.toUpperCase()}`;
  }
  return displayMeta ?? "Companion";
}

export function UserMenu({ displayName, displayMeta, initials }: Props) {
  const router = useRouter();
  const auth = useAuthOptional();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const user = auth?.user;
  const guest = isGuestUser(user, displayName);
  const nombre = resolveDisplayName(user, displayName);
  const meta = resolveDisplayMeta(user, displayMeta, displayName);
  const avatar =
    initials ??
    (guest ? "IN" : nombre.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase());

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    auth?.logout();
    legacyLogout();
    router.push("/login");
  };

  return (
    <div className={styles.authUserMenu} ref={rootRef}>
      {open ? (
        <div className={styles.authDropdown} role="menu">
          <button
            type="button"
            className={styles.authDropdownItem}
            role="menuitem"
            onClick={() => {
              setOpen(false);
              router.push("/planes");
            }}
          >
            <UserRound size={16} aria-hidden />
            Ver perfil
          </button>
          <button
            type="button"
            className={`${styles.authDropdownItem} ${styles.authDropdownItemDanger}`}
            role="menuitem"
            onClick={handleLogout}
          >
            <LogOut size={16} aria-hidden />
            Cerrar sesión
          </button>
        </div>
      ) : null}
      <button
        type="button"
        className={styles.authUserTrigger}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.authAvatar} aria-hidden>
          {avatar}
        </span>
        <span className={styles.authUserText}>
          <span className={styles.authUserName}>{nombre}</span>
          <span className={styles.authUserMeta}>{meta}</span>
        </span>
        {user ? (
          <Chip variant={user.plan === "pro" ? "brand" : "gray"}>
            {user.plan}
          </Chip>
        ) : null}
        <ChevronUp
          size={16}
          aria-hidden
          style={{
            flexShrink: 0,
            color: "var(--text-muted)",
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform var(--motion-fast)",
          }}
        />
      </button>
    </div>
  );
}
