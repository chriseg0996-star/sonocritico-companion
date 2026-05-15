import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";

type Item = { citation: string; note?: string };

type Props = { items: Item[] };

export function BibliographyBlock({ items }: Props) {
  return (
    <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((item, i) => (
        <li
          key={item.citation}
          style={{
            padding: "10px 12px",
            background: theme.bg.card,
            borderRadius: theme.radius.sm,
            boxShadow: theme.shadow.inset,
          }}
        >
          <p
            style={{
              ...type.bodySm,
              color: theme.text.secondary,
              margin: 0,
              fontSize: 12,
              lineHeight: 1.48,
              fontWeight: 400,
            }}
          >
            <span style={{ color: theme.text.faint, marginRight: 6 }}>{i + 1}.</span>
            {item.citation}
          </p>
          {item.note && (
            <p style={{ ...type.caption, color: theme.text.faint, margin: "5px 0 0 14px", fontSize: 10 }}>
              {item.note}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
