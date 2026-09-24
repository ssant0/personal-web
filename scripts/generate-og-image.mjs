import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#daeee9"/>
      <stop offset="45%" stop-color="#f1f2f5"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1080" cy="80" r="190" fill="#2d5d54" opacity="0.06"/>
  <rect x="80" y="80" width="112" height="112" rx="26" fill="#2d5d54"/>
  <text x="136" y="160" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff" text-anchor="middle">MS</text>
  <text x="224" y="128" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="4" fill="#2d5d54">PORTAFOLIO</text>
  <text x="224" y="172" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" fill="#4b5563">manuelsamaniego.com.mx</text>
  <text x="80" y="338" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="82" font-weight="700" fill="#1f2937">Manuel Samaniego</text>
  <text x="80" y="404" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="38" font-weight="600" fill="#2d5d54">Ingeniero Full Stack · Java / Spring Boot</text>
  <text x="80" y="472" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" fill="#4b5563">Java · Spring Boot · PostgreSQL · Docker · Linux</text>
  <rect x="80" y="512" width="120" height="6" rx="3" fill="#2d5d54"/>
</svg>`;

await mkdir("public", { recursive: true });
await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
console.log("✓ public/og-image.png generado");
