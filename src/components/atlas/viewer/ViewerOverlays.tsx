import type { AtlasEntry } from "@/lib/atlas/types";
import { theme } from "@/lib/theme";

type Props = {
  entry: AtlasEntry;
  compact?: boolean;
};

export function ViewerOverlays({ entry, compact }: Props) {
  const label = entry.overlayLabel ?? entry.title;
  const orientation = entry.orientation ?? entry.window;

  return (
    <div className={`us-viewer-overlays${compact ? " us-viewer-overlays--compact" : ""}`} aria-hidden>
      <div className="us-viewer-overlay us-viewer-overlay--tl">
        <span className="us-viewer-overlay-protocol">{entry.protocol}</span>
        <span className="us-viewer-overlay-window">{orientation}</span>
      </div>
      <div className="us-viewer-overlay us-viewer-overlay--tr">
        <span
          className="us-viewer-overlay-status"
          style={{
            background: entry.isPathological ? theme.state.errorMuted : theme.accent.muted,
            color: entry.isPathological ? theme.state.danger : theme.accent.soft,
          }}
        >
          {entry.isPathological ? "Patológico" : "Normal"}
        </span>
      </div>
      <div className="us-viewer-overlay us-viewer-overlay--bl">
        <span className="us-viewer-overlay-finding">{label}</span>
      </div>
      {entry.kind === "clip" && (
        <div className="us-viewer-overlay us-viewer-overlay--br">
          <span className="us-viewer-overlay-clip">CLIP {entry.duration ?? ""}</span>
        </div>
      )}
    </div>
  );
}
