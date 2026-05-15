/**
 * Genera SVG en public/media/vexus/{category}/still.svg | clip.svg
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "media", "vexus");

const noise = `
  <filter id="speckle" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="9" result="n"/>
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
  <text x="12" y="18" fill="rgba(180,190,205,0.7)" font-family="system-ui,sans-serif" font-size="11">VExUS · SONOCRÍTICO</text>
  ${body}
</svg>`;
}

function waveform(y, color, label) {
  return base(`
  <rect x="40" y="60" width="560" height="320" fill="rgba(12,16,22,0.9)" rx="4"/>
  <path d="M40 ${y} ${Array.from({ length: 24 }, (_, i) => {
    const x = 40 + i * 24;
    const dy = Math.sin(i * 0.7) * 18 + (i % 3 === 0 ? -12 : 8);
    return `L${x} ${y + dy}`;
  }).join(" ")}" fill="none" stroke="${color}" stroke-width="2"/>
  <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.55)" font-size="10">${label}</text>`);
}

function waveformClip(y, color, label) {
  return base(`
  <rect x="40" y="60" width="560" height="320" fill="rgba(12,16,22,0.9)" rx="4"/>
  <path d="M40 ${y}" fill="none" stroke="${color}" stroke-width="2">
    <animate attributeName="d" dur="2s" repeatCount="indefinite"
      values="M40 ${y} L80 ${y - 10} L120 ${y + 14} L160 ${y - 6} L200 ${y + 18} L240 ${y} L280 ${y - 12} L320 ${y + 8} L360 ${y - 4} L400 ${y + 16} L440 ${y} L480 ${y - 8} L520 ${y + 12} L560 ${y};
              M40 ${y} L80 ${y + 12} L120 ${y - 8} L160 ${y + 16} L200 ${y - 4} L240 ${y + 10} L280 ${y - 14} L320 ${y + 6} L360 ${y - 10} L400 ${y + 12} L440 ${y - 2} L480 ${y + 14} L520 ${y - 6} L560 ${y}"/>
  </path>
  <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.55)" font-size="10">${label}</text>`);
}

const categories = {
  "ivc-normal": {
    still: base(`
    <ellipse cx="320" cy="220" rx="22" ry="75" fill="rgba(55,70,95,0.55)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">IVC · colapsable</text>`),
  },
  "ivc-plethoric": {
    still: base(`
    <ellipse cx="320" cy="220" rx="38" ry="95" fill="rgba(25,45,75,0.75)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">IVC plethórica</text>`),
  },
  "portal-normal": {
    still: waveform(200, "rgba(143,167,196,0.6)", "Portal · PPV baja"),
    clip: waveformClip(200, "rgba(143,167,196,0.6)", "Portal · clip"),
  },
  "portal-pulsatile": {
    still: waveform(200, "rgba(201,107,107,0.55)", "Portal · PPV alta"),
    clip: waveformClip(200, "rgba(201,107,107,0.55)", "Portal pulsátil · clip"),
  },
  "hepatic-s-normal": {
    still: waveform(190, "rgba(143,167,196,0.55)", "Hepático · S > D"),
    clip: waveformClip(190, "rgba(143,167,196,0.55)", "Hepático · clip"),
  },
  "hepatic-s-inversion": {
    still: waveform(200, "rgba(201,107,107,0.55)", "Hepático · S invertida"),
  },
  "renal-continuous": {
    still: waveform(210, "rgba(143,167,196,0.5)", "Renal · continuo"),
  },
  "renal-discontinuous": {
    still: waveform(200, "rgba(201,107,107,0.5)", "Renal · discontinuo"),
    clip: waveformClip(200, "rgba(201,107,107,0.5)", "Renal · clip"),
  },
  "vexus-severe": {
    still: base(`
    <rect x="80" y="100" width="120" height="60" fill="rgba(201,107,107,0.25)" rx="4"/>
    <rect x="260" y="100" width="120" height="60" fill="rgba(201,107,107,0.35)" rx="4"/>
    <rect x="440" y="100" width="120" height="60" fill="rgba(201,107,107,0.45)" rx="4"/>
    <text x="140" y="135" fill="rgba(201,107,107,0.7)" font-size="9" text-anchor="middle">Portal</text>
    <text x="320" y="135" fill="rgba(201,107,107,0.7)" font-size="9" text-anchor="middle">Hepático</text>
    <text x="500" y="135" fill="rgba(201,107,107,0.7)" font-size="9" text-anchor="middle">Renal</text>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.55)" font-size="10">VExUS severo</text>`),
  },
};

for (const [cat, files] of Object.entries(categories)) {
  const dir = path.join(ROOT, cat);
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, svg] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, `${name}.svg`), svg.trim());
  }
}

console.log("VExUS media →", ROOT);
