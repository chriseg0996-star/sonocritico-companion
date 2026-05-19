"use client";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Search } from "lucide-react";
import { ClinicalSearchProvider, useClinicalSearch } from "@/components/search/ClinicalSearchProvider";
import {
  getBottomNavItems,
  getNavSections,
  isNavItemActive,
  type NavItem,
} from "@/config/navigation";
import { logout } from "@/lib/auth";
import { fonts } from "@/lib/typography";
import { theme } from "@/lib/theme";
import type { User as UserType } from "@/types";

function NavLink({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`nav-link${active ? " nav-link--active" : ""}`}
      style={{ width: "100%", textAlign: "left" }}
      aria-current={active ? "page" : undefined}
    >
      <Icon size={16} strokeWidth={1.5} />
      {item.title}
    </button>
  );
}

function AppLayoutShell({ children, user }: { children: React.ReactNode; user: UserType }) {
  const pathname = usePathname();
  const router = useRouter();
  const { openSearch } = useClinicalSearch();
  const navSections = getNavSections();
  const bottomNavItems = getBottomNavItems();

  function handleLogout() {
    logout();
    router.push("/login");
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

        <button
          type="button"
          className="clinical-search-trigger clinical-search-trigger--sidebar"
          onClick={openSearch}
          aria-label="Búsqueda clínica (Ctrl+K)"
        >
          <Search size={16} strokeWidth={1.5} />
          <span>Buscar clínico</span>
          <kbd className="clinical-search-kbd">{typeof navigator !== "undefined" && /Mac/i.test(navigator.platform) ? "⌘K" : "Ctrl+K"}</kbd>
        </button>

        <nav style={{ flex: 1, padding: "8px 10px 12px", overflowY: "auto" }}>
          {navSections.map((section) => (
            <div key={section.section}>
              <p className="nav-section-label">{section.label}</p>
              {section.items.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  active={isNavItemActive(pathname, item)}
                  onClick={() => router.push(item.route)}
                />
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
        {bottomNavItems.slice(0, 2).map((item) => {
          const active = isNavItemActive(pathname, item);
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(item.route)}
              className="app-bottom-nav-item"
              data-active={active}
              style={{ color: active ? theme.accent.primary : theme.text.muted, fontWeight: active ? 600 : 400 }}
            >
              <Icon size={20} strokeWidth={1.5} />
              {item.title}
            </button>
          );
        })}
        <button
          type="button"
          className="app-bottom-nav-search"
          onClick={openSearch}
          aria-label="Búsqueda clínica"
        >
          <Search size={22} strokeWidth={1.5} />
        </button>
        {bottomNavItems.slice(2).map((item) => {
          const active = isNavItemActive(pathname, item);
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(item.route)}
              className="app-bottom-nav-item"
              data-active={active}
              style={{ color: active ? theme.accent.primary : theme.text.muted, fontWeight: active ? 600 : 400 }}
            >
              <Icon size={20} strokeWidth={1.5} />
              {item.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function AppLayout(props: { children: React.ReactNode; user: UserType }) {
  return (
    <ClinicalSearchProvider>
      <AppLayoutShell {...props} />
    </ClinicalSearchProvider>
  );
}
