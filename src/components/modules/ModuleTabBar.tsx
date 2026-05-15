"use client";
import { MODULE_TABS, type ModuleTabId } from "@/lib/module-tabs";
import { theme } from "@/lib/theme";

export function ModuleTabBar({
  active,
  onChange,
  hiddenTabs = [],
}: {
  active: ModuleTabId;
  onChange: (id: ModuleTabId) => void;
  hiddenTabs?: ModuleTabId[];
}) {
  const tabs = MODULE_TABS.filter((t) => !hiddenTabs.includes(t.id));

  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        marginBottom: 16,
        overflowX: "auto",
        paddingBottom: 4,
        WebkitOverflowScrolling: "touch",
      }}
    >
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 12px",
              borderRadius: 8,
              border: `1px solid ${isActive ? theme.brand.redBorder : theme.bg.border}`,
              background: isActive ? theme.brand.redMuted : theme.bg.card,
              color: isActive ? theme.brand.red : theme.text.secondary,
              fontSize: 11,
              fontFamily: "'IBM Plex Sans', sans-serif",
              whiteSpace: "nowrap",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Icon size={14} strokeWidth={1.5} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
