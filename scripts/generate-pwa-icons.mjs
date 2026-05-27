/**
 * Genera icon-192.png e icon-512.png (fondo #080808 + 🫁).
 * Uso: node scripts/generate-pwa-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public");
const BG = "#080808";

function lungIconSvg(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="${Math.round(size * 0.42)}">🫁</text>
</svg>`;
}

/** PNG mínimo 1×1 #080808 — fallback si sharp no está disponible. */
function minimalPngBuffer() {
  return Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64",
  );
}

async function writeWithSharp(size, outPath) {
  const sharp = (await import("sharp")).default;
  const svg = Buffer.from(lungIconSvg(size));
  await sharp(svg).resize(size, size).png().toFile(outPath);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let usedSharp = false;
  try {
    for (const size of [192, 512]) {
      await writeWithSharp(size, path.join(OUT_DIR, `icon-${size}.png`));
    }
    usedSharp = true;
  } catch (err) {
    console.warn("[generate-pwa-icons] sharp no disponible, usando PNG placeholder:", err?.message ?? err);
    const buf = minimalPngBuffer();
    for (const size of [192, 512]) {
      fs.writeFileSync(path.join(OUT_DIR, `icon-${size}.png`), buf);
    }
    const svgPath = path.join(OUT_DIR, "icon.svg");
    fs.writeFileSync(svgPath, lungIconSvg(512), "utf8");
    console.warn("[generate-pwa-icons] SVG de respaldo:", svgPath);
  }

  console.log(
    `[generate-pwa-icons] icon-192.png, icon-512.png${usedSharp ? " (🫁 + sharp)" : " (placeholder)"}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
