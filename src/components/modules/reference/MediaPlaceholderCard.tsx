"use client";

import { useState } from "react";
import { Play, ImageIcon } from "lucide-react";
import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";
import { withBasePath } from "@/lib/paths";
import { getImage } from "@/lib/mock-data";

type PlaceholderVariant = "pattern-a" | "blines" | "consolidation" | "effusion" | "lung-point";

const variantStyles: Record<PlaceholderVariant, { gradient: string; label: string }> = {
  "pattern-a": {
    gradient: "linear-gradient(135deg, #171C24 0%, #34425B 50%, #0B0E12 100%)",
    label: "A",
  },
  blines: {
    gradient: "linear-gradient(180deg, #1a2230 0%, #34425B55 50%, #0B0E12 100%)",
    label: "B",
  },
  consolidation: {
    gradient: "linear-gradient(160deg, #1E2632 0%, #171C24 60%, #0B0E12 100%)",
    label: "C",
  },
  effusion: {
    gradient: "linear-gradient(180deg, #0d1218 0%, #5D7396 30%, #0B0E12 100%)",
    label: "D",
  },
  "lung-point": {
    gradient: "linear-gradient(90deg, #0B0E12 48%, #5D7396 50%, #171C24 52%, #0B0E12 100%)",
    label: "LP",
  },
};

type GalleryProps = {
  mode: "gallery";
  title: string;
  isPathological: boolean;
  window: string;
  description: string;
  imageId?: string;
  placeholderVariant?: PlaceholderVariant;
  compact?: boolean;
};

type VideoProps = {
  mode: "video";
  title: string;
  duration?: string;
  compact?: boolean;
};

type Props = GalleryProps | VideoProps;

export function MediaPlaceholderCard(props: Props) {
  const compact = props.compact ?? false;

  if (props.mode === "video") {
    return (
      <article
        style={{
          background: theme.bg.card,
          border: "none",
          borderRadius: theme.radius.sm,
          overflow: "hidden",
          boxShadow: theme.shadow.inset,
        }}
      >
        <div
          style={{
            aspectRatio: compact ? "2/1" : "16/10",
            maxHeight: compact ? 68 : undefined,
            background: `linear-gradient(145deg, ${theme.navy.primary} 0%, ${theme.bg.primary} 70%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: compact ? 30 : 44,
              height: compact ? 30 : 44,
              borderRadius: "50%",
              background: theme.surface.glass,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={compact ? 14 : 20} color={theme.brand.primary} fill={theme.brand.primary} />
          </div>
          {compact && (
            <span
              style={{
                position: "absolute",
                bottom: 4,
                right: 6,
                fontSize: 9,
                color: theme.text.muted,
              }}
            >
              {props.duration ?? "Próximamente"}
            </span>
          )}
        </div>
        <p
          style={{
            ...type.caption,
            color: theme.text.primary,
            margin: compact ? "6px 8px 8px" : "8px 10px 10px",
            fontSize: 11,
            lineHeight: 1.35,
          }}
        >
          {props.title}
        </p>
      </article>
    );
  }

  const img = props.imageId ? getImage(props.imageId) : undefined;
  const variant = props.placeholderVariant ?? "pattern-a";
  const v = variantStyles[variant];
  const [imgFailed, setImgFailed] = useState(false);
  const showPlaceholder = !img || imgFailed;

  return (
    <article
      style={{
        background: theme.bg.card,
        border: "none",
        borderRadius: theme.radius.sm,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: theme.shadow.inset,
        transition: `transform ${theme.motion.base}, box-shadow ${theme.motion.base}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = theme.shadow.card;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = theme.shadow.inset;
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: compact ? "5/3" : "4/3",
          maxHeight: compact ? 72 : undefined,
          background: theme.bg.primary,
          flexShrink: 0,
        }}
      >
        {showPlaceholder ? (
          <div
            style={{
              height: "100%",
              minHeight: compact ? 56 : 100,
              background: v.gradient,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: compact ? 2 : 6,
            }}
          >
            <ImageIcon size={compact ? 16 : 22} color={theme.text.muted} strokeWidth={1.2} />
            {!compact && (
              <span style={{ ...type.eyebrow, color: theme.text.muted, fontSize: 9 }}>Placeholder · {v.label}</span>
            )}
          </div>
        ) : (
          <img
            src={withBasePath(img!.src)}
            alt={img!.finding}
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
        <span
          style={{
            position: "absolute",
            top: compact ? 4 : 6,
            left: compact ? 4 : 6,
            fontSize: 8,
            fontWeight: 600,
            padding: "1px 6px",
            borderRadius: 20,
            background: props.isPathological ? theme.state.errorMuted : theme.accent.muted,
            border: `1px solid ${props.isPathological ? theme.state.errorBorder : theme.accent.border}`,
            color: props.isPathological ? theme.state.danger : theme.accent.soft,
          }}
        >
          {props.isPathological ? "Patol." : "Normal"}
        </span>
      </div>
      <div style={{ padding: compact ? "6px 8px 8px" : "8px 10px 10px", flex: 1 }}>
        <p style={{ ...type.titleSm, fontSize: 11, color: theme.text.primary, margin: "0 0 2px" }}>{props.title}</p>
        <p style={{ ...type.caption, color: theme.navy.light, margin: "0 0 2px", fontSize: 9 }}>{props.window}</p>
        <p
          style={{
            ...type.caption,
            color: theme.text.muted,
            margin: 0,
            fontSize: 10,
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {props.description}
        </p>
      </div>
    </article>
  );
}
