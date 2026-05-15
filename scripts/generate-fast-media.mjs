/**
 * Genera SVG en public/media/fast/{category}/still.svg | clip.svg
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "media", "fast");

const noise = `
  <filter id="speckle" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="4" result="n"/>
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
  <text x="12" y="18" fill="rgba(180,190,205,0.7)" font-family="system-ui,sans-serif" font-size="11">FAST · SONOCRÍTICO</text>
  ${body}
</svg>`;
}

const categories = {
  "ruq-normal": {
    still: base(`
    <ellipse cx="380" cy="260" rx="200" ry="120" fill="rgba(70,80,95,0.45)"/>
    <ellipse cx="220" cy="300" rx="90" ry="55" fill="rgba(55,65,80,0.5)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">RUQ · sin líquido</text>`),
  },
  "ruq-fluid": {
    still: base(`
    <ellipse cx="380" cy="260" rx="200" ry="120" fill="rgba(70,80,95,0.45)"/>
    <ellipse cx="220" cy="300" rx="90" ry="55" fill="rgba(55,65,80,0.5)"/>
    <path d="M200 280 Q240 320 280 340" stroke="none" fill="rgba(25,45,75,0.85)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">RUQ · Morrison +</text>`),
    clip: base(`
    <ellipse cx="380" cy="260" rx="200" ry="120" fill="rgba(70,80,95,0.45)"/>
    <path d="M200 280 Q240 320 280 340" fill="rgba(25,45,75,0.75)">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.8s" repeatCount="indefinite"/>
    </path>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Líquido Morrison · clip</text>`),
  },
  "luq-normal": {
    still: base(`
    <ellipse cx="260" cy="270" rx="140" ry="100" fill="rgba(65,75,90,0.5)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">LUQ · sin líquido</text>`),
  },
  "luq-fluid": {
    still: base(`
    <ellipse cx="260" cy="270" rx="140" ry="100" fill="rgba(65,75,90,0.5)"/>
    <path d="M180 250 L220 310 L260 290 Z" fill="rgba(25,45,75,0.8)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">LUQ · líquido</text>`),
  },
  "pelvis-normal": {
    still: base(`
    <ellipse cx="320" cy="300" rx="160" ry="80" fill="rgba(60,70,85,0.4)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">Pelvis · negativo</text>`),
  },
  "pelvis-fluid": {
    still: base(`
    <ellipse cx="320" cy="300" rx="160" ry="80" fill="rgba(60,70,85,0.4)"/>
    <path d="M240 320 Q320 380 400 320 L400 420 L240 420 Z" fill="rgba(25,45,75,0.75)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Pelvis · líquido</text>`),
  },
  "subxiphoid-normal": {
    still: base(`
    <ellipse cx="320" cy="240" rx="100" ry="70" fill="rgba(80,90,105,0.35)" stroke="rgba(143,167,196,0.3)" stroke-width="2"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">Subxifoidea · 4 cámaras</text>`),
  },
  "pericardial-effusion": {
    still: base(`
    <ellipse cx="320" cy="240" rx="110" ry="80" fill="none" stroke="rgba(201,107,107,0.5)" stroke-width="8"/>
    <ellipse cx="320" cy="240" rx="70" ry="50" fill="rgba(80,90,105,0.4)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Derrame pericárdico</text>`),
  },
  "pleural-sliding": {
    still: base(`
    <line x1="0" y1="100" x2="640" y2="100" stroke="rgba(220,230,240,0.35)" stroke-width="1.2"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">Sliding pleural</text>`),
    clip: base(`
    <line x1="0" y1="100" x2="640" y2="100" stroke="rgba(220,230,240,0.4)" stroke-width="1.2">
      <animate attributeName="y1" values="98;104;98" dur="1s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="98;104;98" dur="1s" repeatCount="indefinite"/>
    </line>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">Sliding · clip</text>`),
  },
  pneumothorax: {
    still: base(`
    <line x1="0" y1="100" x2="640" y2="100" stroke="rgba(201,107,107,0.25)" stroke-width="1.2" stroke-dasharray="6 8"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Sin sliding · NTX</text>`),
  },
  hemothorax: {
    still: base(`
    <line x1="0" y1="90" x2="640" y2="90" stroke="rgba(220,230,240,0.3)" stroke-width="1"/>
    <path d="M0 90 L640 200 L640 480 L0 480 Z" fill="rgba(25,35,55,0.7)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Hemotórax</text>`),
  },
};

for (const [cat, files] of Object.entries(categories)) {
  const dir = path.join(ROOT, cat);
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, svg] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, `${name}.svg`), svg.trim());
  }
}

console.log("FAST media →", ROOT);
