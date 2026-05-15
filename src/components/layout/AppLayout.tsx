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
import { fonts } from "@/lib/typography";
import { theme } from "@/lib/theme";
import type { User as UserType } from "@/types";

type NavItem = { href: string; icon: React.ElementType; label: string };

const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "Consulta",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Inicio" },
      { href: "/modulos", icon: BookOpen, label: "Módulos" },
    ],
  },
  {
    label: "Entrenamiento",
    items: [
      { href: "/casos", icon: Activity, label: "Casos" },
      { href: "/repaso", icon: Brain, label: "Repaso" },
      { href: "/imagenes", icon: Image, label: "Biblioteca" },
    ],
  },
  {
    label: "Herramientas críticas",
    items: [{ href: "/herramientas", icon: Wrench, label: "Calculadoras" }],
  },
  {
    label: "Cuenta",
    items: [{ href: "/progreso", icon: User, label: "Progreso" }],
  },
];

const bottomNavItems: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Inicio" },
  { href: "/modulos", icon: BookOpen, label: "Módulos" },
  { href: "/casos", icon: Activity, label: "Casos" },
  { href: "/progreso", icon: User, label: "Progreso" },
];

function NavLink({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: NavItem & { active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`nav-link${active ? " nav-link--active" : ""}`} style={{ width: "100%", textAlign: "left" }}>
      <Icon size={16} strokeWidth={1.5} />
      {label}
    </button>
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
        <div style={{ padding: "24px 18px 20px" }}>
          <p className="brand-wordmark">SONOCRÍTICO</p>
          <p className="brand-tagline">Visualiza el problema. Actúa con certeza.</p>
        </div>

        <div
          style={{
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: theme.surface.glass,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: theme.accent.primary,
              fontWeight: 600,
              flexShrink: 0,
              fontFamily: fonts.sans,
            }}
          >
            {user.initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: theme.text.primary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: fonts.sans,
              }}
            >
              {user.name}
            </div>
            <div style={{ fontSize: 11, color: theme.text.muted, fontFamily: fonts.sans }}>{user.specialty}</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "8px 10px 12px", overflowY: "auto" }}>
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="nav-section-label">{section.label}</p>
              {section.items.map((item) => (
                <NavLink key={item.href} {...item} active={isActive(item.href)} onClick={() => router.push(item.href)} />
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: "12px 10px", borderTop: `1px solid ${theme.bg.border}` }}>
          <button type="button" onClick={handleLogout} className="nav-link" style={{ width: "100%", color: theme.text.muted }}>
            <LogOut size={16} strokeWidth={1.5} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="app-main">{children}</main>

      <nav className="app-bottom-nav">
        {bottomNavItems.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <button
              key={href}
              type="button"
              onClick={() => router.push(href)}
              style={{
                flex: 1,
                padding: "10px 6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: active ? theme.accent.primary : theme.text.muted,
                fontSize: 10,
                fontWeight: active ? 600 : 400,
                fontFamily: fonts.sans,
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
