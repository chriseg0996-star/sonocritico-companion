"use client";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { CompanionLayoutShell } from "@/components/companion/CompanionLayoutShell";
import { QuickActionsProvider } from "@/components/navigation";
import { ClinicalSearchProvider, useClinicalSearch } from "@/components/search/ClinicalSearchProvider";
import {
  getBottomNavItems,
  getNavSections,
  isNavItemActive,
  type NavItem,
} from "@/config/navigation";
import { GlobalFooter } from "@/components/layout/GlobalFooter";
import { shouldShowGlobalFooter } from "@/lib/layout-footer";
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
  const showGlobalFooter = shouldShowGlobalFooter(pathname);

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <aside className="app-sidebar">
        <div className="app-sidebar__brand">
          <p className="brand-wordmark">SONOCRÍTICO</p>
          <p className="brand-tagline">Visualiza el problema. Actúa con certeza.</p>
        </div>

        <div className="app-sidebar__search">
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
        </div>

        <nav className="app-sidebar__nav">
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

        <div className="app-sidebar__profile">
          <UserMenu
            compact
            displayName={user.name}
            displayMeta={user.specialty}
            initials={user.initials}
          />
        </div>
      </aside>

      <main className="app-main">
        <CompanionLayoutShell>{children}</CompanionLayoutShell>
        {showGlobalFooter ? <GlobalFooter /> : null}
      </main>

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
      <QuickActionsProvider>
        <AppLayoutShell {...props} />
      </QuickActionsProvider>
    </ClinicalSearchProvider>
  );
}
