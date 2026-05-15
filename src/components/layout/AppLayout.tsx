"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  BookOpen,
  Brain,
  Image,
  LayoutDashboard,
  LogOut,
  Wrench,
  User,
} from "lucide-react";
import { logout } from "@/lib/auth";
import { theme } from "@/lib/theme";
import type { User as UserType } from "@/types";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Inicio" },
  { href: "/modulos", icon: BookOpen, label: "Módulos" },
  { href: "/casos", icon: Activity, label: "Casos" },
  { href: "/herramientas", icon: Wrench, label: "Herramientas" },
  { href: "/repaso", icon: Brain, label: "Repaso" },
  { href: "/imagenes", icon: Image, label: "Biblioteca" },
  { href: "/progreso", icon: User, label: "Progreso" },
];

function NavLink({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 10px",
        borderRadius: 8,
        marginBottom: 2,
        cursor: "pointer",
        background: active ? theme.brand.redMuted : "transparent",
        border: active ? `1px solid ${theme.brand.redBorder}` : "1px solid transparent",
        color: active ? theme.brand.red : theme.text.secondary,
        transition: "all 200ms ease-out",
        fontSize: 13,
      }}
    >
      <Icon size={16} strokeWidth={1.5} />
      {label}
    </div>
  );
}

export function AppLayout({ children, user }: { children: React.ReactNode; user: UserType }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <aside className="app-sidebar">
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${theme.bg.border}` }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22,
              letterSpacing: 2,
              color: theme.text.primary,
            }}
          >
            SONOCRÍTICO
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 11,
              letterSpacing: 3,
              color: theme.brand.red,
              marginTop: -4,
            }}
          >
            MX
          </div>
        </div>

        <div
          style={{
            padding: "12px 16px",
            borderBottom: `1px solid ${theme.bg.border}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: theme.brand.redMuted,
              border: `1px solid ${theme.brand.redBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: theme.brand.red,
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            {user.initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: theme.text.primary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.name}
            </div>
            <div style={{ fontSize: 10, color: theme.text.muted }}>{user.specialty}</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={isActive(item.href)}
              onClick={() => router.push(item.href)}
            />
          ))}
          <NavLink
            href="/imagenes"
            icon={Image}
            label="Biblioteca"
            active={pathname === "/imagenes"}
            onClick={() => router.push("/imagenes")}
          />
        </nav>

        <div style={{ padding: "12px 8px", borderTop: `1px solid ${theme.bg.border}` }}>
          <div
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 10px",
              borderRadius: 8,
              cursor: "pointer",
              color: theme.text.muted,
              fontSize: 13,
            }}
          >
            <LogOut size={16} strokeWidth={1.5} />
            Cerrar sesión
          </div>
        </div>
      </aside>

      <main className="app-main">{children}</main>

      <nav className="app-bottom-nav">
        {navItems.slice(0, 4).map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              style={{
                flex: 1,
                padding: "12px 6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: active ? theme.brand.red : theme.text.muted,
                fontSize: 11,
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
            >
              <Icon size={20} strokeWidth={1.5} />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
