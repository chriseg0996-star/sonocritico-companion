import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookOpen,
  Brain,
  Image,
  LayoutDashboard,
  User,
  Wrench,
} from "lucide-react";

/** Secciones del shell principal (sidebar). */
export type NavSection = "consulta" | "entrenamiento";

/** Badge opcional — reservado para sprints futuros (sin UI hasta entonces). */
export type NavBadge = {
  label: string;
  variant?: "new" | "beta" | "count";
  count?: number;
};

export type NavItemId =
  | "inicio"
  | "modulos"
  | "biblioteca"
  | "calculadoras"
  | "casos"
  | "repaso"
  | "progreso";

export type NavItem = {
  id: NavItemId;
  title: string;
  route: string;
  icon: LucideIcon;
  section: NavSection;
  /** Rutas adicionales que marcan el ítem como activo (alias / redirects). */
  matchRoutes?: readonly string[];
  badge?: NavBadge;
};

export const NAV_SECTION_LABELS: Record<NavSection, string> = {
  consulta: "Consulta",
  entrenamiento: "Entrenamiento",
};

/** Orden canónico — única definición de navegación principal. */
export const NAV_ITEMS: readonly NavItem[] = [
  {
    id: "inicio",
    title: "Inicio",
    route: "/dashboard",
    icon: LayoutDashboard,
    section: "consulta",
  },
  {
    id: "modulos",
    title: "Módulos",
    route: "/modulos",
    icon: BookOpen,
    section: "consulta",
  },
  {
    id: "biblioteca",
    title: "Biblioteca",
    route: "/biblioteca",
    icon: Image,
    section: "consulta",
    matchRoutes: ["/imagenes"],
  },
  {
    id: "calculadoras",
    title: "Calculadoras",
    route: "/calculadoras",
    icon: Wrench,
    section: "consulta",
    matchRoutes: ["/herramientas"],
  },
  {
    id: "casos",
    title: "Casos",
    route: "/casos",
    icon: Activity,
    section: "entrenamiento",
  },
  {
    id: "repaso",
    title: "Repaso",
    route: "/repaso",
    icon: Brain,
    section: "entrenamiento",
  },
  {
    id: "progreso",
    title: "Progreso",
    route: "/progreso",
    icon: User,
    section: "entrenamiento",
  },
] as const;

/** Ítems del bottom nav móvil (orden fijo, sin cambiar HUD). */
export const BOTTOM_NAV_ITEM_IDS: readonly NavItemId[] = [
  "inicio",
  "modulos",
  "casos",
  "progreso",
] as const;

const NAV_SECTION_ORDER: readonly NavSection[] = ["consulta", "entrenamiento"];

const navById = new Map(NAV_ITEMS.map((item) => [item.id, item]));

export function getNavItem(id: NavItemId): NavItem {
  const item = navById.get(id);
  if (!item) throw new Error(`Unknown nav item: ${id}`);
  return item;
}

export function getNavRoute(id: NavItemId): string {
  return getNavItem(id).route;
}

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  const bases = [item.route, ...(item.matchRoutes ?? [])];
  return bases.some((base) => pathname === base || pathname.startsWith(`${base}/`));
}

export function getNavSections(): { section: NavSection; label: string; items: NavItem[] }[] {
  return NAV_SECTION_ORDER.map((section) => ({
    section,
    label: NAV_SECTION_LABELS[section],
    items: NAV_ITEMS.filter((item) => item.section === section),
  }));
}

export function getBottomNavItems(): NavItem[] {
  return BOTTOM_NAV_ITEM_IDS.map(getNavItem);
}
