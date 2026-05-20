/**
 * Genera SVG en public/media/lung/{category}/still.svg | clip.svg
 * Sustituir por still.webp, clip.webm, etc. sin cambiar rutas.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "media", "lung");

const noise = `
  <filter id="speckle" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="2" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.12  0 0 0 0 0.14  0 0 0 0 0.16  0 0 0 0.35 0"/>
  </filter>
`;

function base(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
  <defs>${noise}</defs>
  <rect width="640" height="480" fill="#050608"/>
  <rect width="640" height="480" filter="url(#speckle)" opacity="0.55"/>
  <rect x="0" y="0" width="640" height="28" fill="rgba(0,0,0,0.45)"/>
  <text x="12" y="18" fill="rgba(180,190,205,0.7)" font-family="system-ui,sans-serif" font-size="11">SONOCRÍTICO</text>
  ${body}
</svg>`;
}

const categories = {
  "a-lines": {
    still: base(`
    <line x1="0" y1="72" x2="640" y2="72" stroke="rgba(220,230,240,0.35)" stroke-width="1.2"/>
    <g opacity="0.55">${Array.from({ length: 12 }, (_, i) =>
      `<line x1="0" y1="${88 + i * 24}" x2="640" y2="${88 + i * 24}" stroke="rgba(200,210,225,0.12)" stroke-width="0.8"/>`
    ).join("")}</g>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">Patrón A</text>`),
    clip: base(`
    <line x1="0" y1="70" x2="640" y2="70" stroke="rgba(220,230,240,0.4)" stroke-width="1.2">
      <animate attributeName="y1" values="68;74;68" dur="1.2s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="68;74;68" dur="1.2s" repeatCount="indefinite"/>
    </line>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">Sliding pleural</text>`),
  },
  "b-lines": {
    still: base(`
    <line x1="0" y1="68" x2="640" y2="68" stroke="rgba(220,230,240,0.4)" stroke-width="1.2"/>
    ${[120, 220, 320, 420, 520].map((x) =>
      `<line x1="${x}" y1="68" x2="${x - 18}" y2="200" stroke="rgba(201,107,107,0.35)" stroke-width="1.5"/>`
    ).join("")}
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.45)" font-size="10">Líneas B</text>`),
    clip: base(`
    <line x1="0" y1="68" x2="640" y2="68" stroke="rgba(220,230,240,0.35)" stroke-width="1"/>
    ${[140, 280, 420].map((x, i) =>
      `<line x1="${x}" y1="68" x2="${x - 20}" y2="220" stroke="rgba(201,107,107,0.3)" stroke-width="1.2">
        <animate attributeName="opacity" values="0.2;0.55;0.2" dur="1.5s" begin="${i * 0.2}s" repeatCount="indefinite"/>
      </line>`
    ).join("")}
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.45)" font-size="10">Líneas B · clip</text>`),
  },
  consolidation: {
    still: base(`
    <ellipse cx="320" cy="280" rx="180" ry="140" fill="rgba(90,100,115,0.55)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.45)" font-size="10">Consolidación</text>`),
    clip: base(`
    <ellipse cx="320" cy="290" rx="160" ry="120" fill="rgba(90,100,115,0.5)">
      <animate attributeName="opacity" values="0.4;0.65;0.4" dur="2s" repeatCount="indefinite"/>
    </ellipse>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.45)" font-size="10">Consolidación · clip</text>`),
  },
  "pleural-effusion": {
    still: base(`
    <line x1="0" y1="120" x2="640" y2="120" stroke="rgba(220,230,240,0.3)" stroke-width="1"/>
    <path d="M0 120 Q160 200 320 340 T640 420 L640 480 L0 480 Z" fill="rgba(25,35,55,0.75)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.45)" font-size="10">Derrame pleural</text>`),
  },
  "lung-point": {
    still: base(`
    <line x1="0" y1="70" x2="320" y2="70" stroke="rgba(220,230,240,0.35)" stroke-width="1.2"/>
    <line x1="320" y1="70" x2="640" y2="70" stroke="rgba(201,107,107,0.25)" stroke-width="1.2" stroke-dasharray="4 6"/>
    <circle cx="320" cy="70" r="6" fill="none" stroke="rgba(201,107,107,0.7)" stroke-width="1.5"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Lung point</text>`),
    clip: base(`
    <line x1="0" y1="70" x2="300" y2="70" stroke="rgba(220,230,240,0.35)" stroke-width="1.2"/>
    <line x1="340" y1="70" x2="640" y2="70" stroke="rgba(201,107,107,0.3)" stroke-width="1.2"/>
    <circle cx="320" cy="70" r="5" fill="rgba(201,107,107,0.6)">
      <animate attributeName="cx" values="310;330;310" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Lung point · clip</text>`),
  },
  plaps: {
    still: base(`
    <ellipse cx="400" cy="300" rx="150" ry="110" fill="rgba(85,95,110,0.5)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.45)" font-size="10">PLAPS</text>`),
  },
};

for (const [cat, slots] of Object.entries(categories)) {
  const dir = path.join(ROOT, cat);
  fs.mkdirSync(dir, { recursive: true });
  for (const [slot, svg] of Object.entries(slots)) {
    const outPath = path.join(dir, `${slot}.svg`);
    if (slot === "still") {
      const hasRealStill = ["still.webp", "still.png", "still.jpg", "still.jpeg"].some((name) =>
        fs.existsSync(path.join(dir, name)),
      );
      if (hasRealStill) {
        console.log("skip", `${cat}/${slot}.svg`, "(real still present)");
        continue;
      }
    }
    fs.writeFileSync(outPath, svg.trim());
    console.log("wrote", `${cat}/${slot}.svg`);
  }
}
console.log("Done →", ROOT);
