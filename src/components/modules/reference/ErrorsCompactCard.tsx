import { theme } from "@/lib/theme";

type Props = { items: string[] };

export function ErrorsCompactCard({ items }: Props) {
  return (
    <div
      style={{
        maxWidth: 520,
        background: theme.bg.card,
        border: "none",
        borderRadius: theme.radius.sm,
        padding: "12px 16px",
        boxShadow: theme.shadow.inset,
      }}
    >
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {items.map((item, i) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: i < items.length - 1 ? 8 : 0,
              fontSize: 12,
              lineHeight: 1.5,
              color: theme.text.secondary,
            }}
          >
            <span style={{ color: theme.state.danger, flexShrink: 0, fontSize: 8, lineHeight: 1.7, opacity: 0.9 }}>
              ●
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
