"use client";

import type { EchoImage } from "@/types";
import { withBasePath } from "@/lib/paths";
import { theme } from "@/lib/theme";
import { EchoAnnotations } from "./EchoAnnotations";

type EchoMediaProps = {
  image: Pick<
    EchoImage,
    "src" | "thumbnailSrc" | "finding" | "annotations" | "mediaType" | "posterSrc"
  >;
  showAnnotations?: boolean;
  maxHeight?: number;
};

export function EchoMedia({ image, showAnnotations = false, maxHeight = 280 }: EchoMediaProps) {
  const mediaType = image.mediaType ?? "image";
  const src = withBasePath(image.src);
  const poster = withBasePath(image.posterSrc ?? image.thumbnailSrc);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {mediaType === "video" ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            maxHeight,
            objectFit: "contain",
            display: "block",
            background: theme.bg.primary,
          }}
        />
      ) : (
        <img
          src={src}
          alt={image.finding}
          style={{
            width: "100%",
            maxHeight,
            objectFit: "contain",
            display: "block",
            background: theme.bg.primary,
          }}
        />
      )}
      {showAnnotations && image.annotations.length > 0 && (
        <EchoAnnotations annotations={image.annotations} />
      )}
    </div>
  );
}
