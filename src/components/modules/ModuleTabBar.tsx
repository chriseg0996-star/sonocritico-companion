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
        gap: 5,
        marginBottom: 20,
        overflowX: "auto",
        paddingBottom: 2,
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
              padding: "7px 11px",
              borderRadius: 6,
              border: "none",
              background: isActive ? theme.accent.muted : theme.surface.glass,
              color: isActive ? theme.accent.soft : theme.text.muted,
              fontSize: 11,
              fontWeight: 500,
              fontFamily: "'IBM Plex Sans', sans-serif",
              whiteSpace: "nowrap",
              cursor: "pointer",
              flexShrink: 0,
              transition: `background ${theme.motion.fast}, color ${theme.motion.fast}`,
            }}
          >
            <Icon size={13} strokeWidth={1.5} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
