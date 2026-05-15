/**
 * Genera SVG en public/media/cardiac/{category}/still.svg | clip.svg
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "media", "cardiac");

const noise = `
  <filter id="speckle" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" result="n"/>
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
  <text x="12" y="18" fill="rgba(180,190,205,0.7)" font-family="system-ui,sans-serif" font-size="11">ECO · SONOCRÍTICO</text>
  ${body}
</svg>`;
}

const categories = {
  "plax-normal": {
    still: base(`
    <ellipse cx="280" cy="260" rx="120" ry="90" fill="rgba(70,80,95,0.5)"/>
    <ellipse cx="420" cy="200" rx="50" ry="40" fill="rgba(55,65,80,0.45)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">PLAX · FEVI OK</text>`),
    clip: base(`
    <ellipse cx="280" cy="260" rx="118" ry="88" fill="rgba(70,80,95,0.5)">
      <animate attributeName="ry" values="88;82;88" dur="0.9s" repeatCount="indefinite"/>
    </ellipse>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">Excursión mitral · clip</text>`),
  },
  "a4c-fevi-reduced": {
    still: base(`
    <ellipse cx="320" cy="280" rx="140" ry="110" fill="rgba(65,75,90,0.55)"/>
    <ellipse cx="320" cy="200" rx="70" ry="55" fill="rgba(55,65,80,0.45)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">A4C · FE ↓</text>`),
  },
  "fevi-hyperdynamic": {
    still: base(`
    <ellipse cx="320" cy="270" rx="80" ry="60" fill="rgba(70,80,95,0.55)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.45)" font-size="10">FEVI hiperdinámica</text>`),
  },
  "psax-mitral": {
    still: base(`
    <circle cx="320" cy="250" r="95" fill="none" stroke="rgba(143,167,196,0.4)" stroke-width="3"/>
    <circle cx="320" cy="250" r="45" fill="rgba(55,65,80,0.5)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">PSAX mitral</text>`),
  },
  "subxiphoid-normal": {
    still: base(`
    <ellipse cx="320" cy="240" rx="95" ry="70" fill="rgba(80,90,105,0.35)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">Subxifoidea · OK</text>`),
  },
  "pericardial-effusion": {
    still: base(`
    <ellipse cx="300" cy="260" rx="110" ry="85" fill="rgba(70,80,95,0.5)"/>
    <ellipse cx="300" cy="260" rx="125" ry="95" fill="none" stroke="rgba(25,45,75,0.9)" stroke-width="10"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Derrame pericárdico</text>`),
    clip: base(`
    <ellipse cx="300" cy="260" rx="110" ry="85" fill="rgba(70,80,95,0.5)"/>
    <ellipse cx="300" cy="260" rx="125" ry="95" fill="none" stroke="rgba(25,45,75,0.8)" stroke-width="8">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite"/>
    </ellipse>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Derrame · clip</text>`),
  },
  tamponade: {
    still: base(`
    <ellipse cx="320" cy="250" rx="100" ry="75" fill="rgba(70,80,95,0.45)"/>
    <ellipse cx="380" cy="220" rx="35" ry="28" fill="rgba(25,45,75,0.7)"/>
    <ellipse cx="320" cy="250" rx="115" ry="88" fill="none" stroke="rgba(201,107,107,0.6)" stroke-width="6"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.55)" font-size="10">Taponamiento</text>`),
  },
  "rv-dilated": {
    still: base(`
    <ellipse cx="320" cy="290" rx="130" ry="95" fill="rgba(65,75,90,0.5)"/>
    <ellipse cx="320" cy="180" rx="100" ry="70" fill="rgba(55,65,80,0.55)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">VD dilatado</text>`),
  },
  "septum-d-shape": {
    still: base(`
    <circle cx="320" cy="250" r="90" fill="none" stroke="rgba(143,167,196,0.35)" stroke-width="2"/>
    <path d="M320 160 L320 340" stroke="rgba(201,107,107,0.5)" stroke-width="4"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">Septum D-shape</text>`),
  },
  "ivc-normal": {
    still: base(`
    <ellipse cx="320" cy="220" rx="25" ry="80" fill="rgba(55,70,95,0.6)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(143,167,196,0.5)" font-size="10">IVC · colapsable</text>`),
  },
  "ivc-plethoric": {
    still: base(`
    <ellipse cx="320" cy="220" rx="40" ry="95" fill="rgba(25,45,75,0.75)"/>
    <text x="320" y="440" text-anchor="middle" fill="rgba(201,107,107,0.5)" font-size="10">IVC plethórica</text>`),
  },
};

for (const [cat, files] of Object.entries(categories)) {
  const dir = path.join(ROOT, cat);
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, svg] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, `${name}.svg`), svg.trim());
  }
}

console.log("Cardiac media →", ROOT);
