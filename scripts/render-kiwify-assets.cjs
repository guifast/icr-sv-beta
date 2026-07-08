const fs = require("fs");
const os = require("os");
const path = require("path");

function loadSharp() {
  try {
    return require("sharp");
  } catch (_) {
    const bundledSharp = path.join(
      os.homedir(),
      ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp",
    );

    if (fs.existsSync(bundledSharp)) {
      return require(bundledSharp);
    }

    throw new Error("Sharp is required to render these assets. Install it with `npm install sharp`.");
  }
}

const sharp = loadSharp();

const root = path.resolve(__dirname, "..");
const markPath = path.join(root, "sentido-clinico-mark.png");
const markData = fs.readFileSync(markPath).toString("base64");
const markUri = `data:image/png;base64,${markData}`;

const palette = {
  ink: "#061e27",
  deep: "#082c36",
  teal: "#0b5960",
  teal2: "#0f7477",
  aqua: "#77dce0",
  gold: "#e8d8a4",
  white: "#fbfbf7",
  muted: "#c8d7d7",
};

function grid(width, height, step, opacity = 0.12) {
  const lines = [];
  for (let x = 0; x <= width; x += step) {
    lines.push(`<path d="M${x} 0V${height}" stroke="#8ee7ea" stroke-opacity="${opacity}" stroke-width="1"/>`);
  }
  for (let y = 0; y <= height; y += step) {
    lines.push(`<path d="M0 ${y}H${width}" stroke="#8ee7ea" stroke-opacity="${opacity}" stroke-width="1"/>`);
  }
  return lines.join("");
}

function productCover({ x, y, width, height, rotate = 0, scale = 1 }) {
  const w = width;
  const h = height;
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">
      <path d="M26 12h${w - 18}a14 14 0 0 1 14 14v${h - 52}a14 14 0 0 1-14 14H38a12 12 0 0 1-12-12z" fill="#e8eeee" opacity=".92"/>
      <path d="M10 0h${w - 16}a14 14 0 0 1 14 14v${h - 28}a14 14 0 0 1-14 14H24a14 14 0 0 1-14-14z" fill="url(#coverGrad)" stroke="#83e2e2" stroke-opacity=".7" stroke-width="2"/>
      <path d="M10 0h${w - 16}a14 14 0 0 1 14 14v${h - 28}a14 14 0 0 1-14 14H24a14 14 0 0 1-14-14z" fill="url(#fineGrid)" opacity=".42"/>
      <text x="34" y="54" fill="${palette.white}" opacity=".84" font-family="Arial, sans-serif" font-size="20" font-weight="800" letter-spacing=".3">KIT DIGITAL</text>
      <text x="34" y="${h * 0.45}" fill="${palette.white}" font-family="Georgia, serif" font-size="${Math.round(w * 0.19)}" font-weight="800">ICR-SV</text>
      <text x="34" y="${h * 0.45 + Math.round(w * 0.15)}" fill="${palette.white}" font-family="Georgia, serif" font-size="${Math.round(w * 0.16)}" font-weight="800">Beta</text>
      <text x="34" y="${h * 0.69}" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="${Math.round(w * 0.072)}" font-weight="700">Guia Clínico-Reflexivo</text>
      <text x="34" y="${h * 0.76}" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="${Math.round(w * 0.072)}" font-weight="700">de Sentido de Vida</text>
      <path d="M34 ${h - 54}h74" stroke="${palette.gold}" stroke-width="4"/>
    </g>`;
}

function coverSvg() {
  return `
  <svg width="300" height="250" viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#061e27"/>
        <stop offset=".55" stop-color="#07323c"/>
        <stop offset="1" stop-color="#0c6468"/>
      </linearGradient>
      <linearGradient id="coverGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#07313b"/>
        <stop offset="1" stop-color="#0d7779"/>
      </linearGradient>
      <pattern id="fineGrid" width="26" height="26" patternUnits="userSpaceOnUse">
        <path d="M26 0H0v26" fill="none" stroke="#90eef0" stroke-opacity=".28" stroke-width="1"/>
      </pattern>
      <filter id="softShadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#000" flood-opacity=".32"/>
      </filter>
      <clipPath id="logoClipCover">
        <circle cx="42" cy="42" r="23"/>
      </clipPath>
    </defs>
    <rect width="300" height="250" fill="url(#bg)"/>
    <g opacity=".35">${grid(300, 250, 42, 0.13)}</g>
    <path d="M230-20h90v290H254z" fill="${palette.aqua}" opacity=".62"/>
    <path d="M26 74h248a18 18 0 0 1 18 18v126a18 18 0 0 1-18 18H26a18 18 0 0 1-18-18V92a18 18 0 0 1 18-18z" fill="#061e27" opacity=".44" stroke="#83e2e2" stroke-opacity=".28"/>
    <circle cx="45" cy="42" r="31" fill="#103944" opacity=".96"/>
    <circle cx="45" cy="42" r="23" fill="${palette.white}"/>
    <image href="${markUri}" x="22" y="19" width="46" height="46" preserveAspectRatio="xMidYMid meet" clip-path="url(#logoClipCover)"/>
    <text x="80" y="39" fill="${palette.white}" font-family="Arial, sans-serif" font-size="16" font-weight="900">Sentido Clínico</text>
    <text x="81" y="58" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="11" font-weight="800">recurso clínico-reflexivo</text>
    <rect x="78" y="82" width="144" height="24" rx="12" fill="none" stroke="${palette.aqua}" stroke-opacity=".85"/>
    <text x="99" y="99" fill="${palette.aqua}" font-family="Arial, sans-serif" font-size="11" font-weight="950" letter-spacing=".5">KIT DIGITAL</text>
    <text x="28" y="148" fill="${palette.white}" font-family="Georgia, serif" font-size="43" font-weight="800">ICR-SV Beta</text>
    <text x="44" y="182" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="18" font-weight="900">Guia de Sentido de Vida</text>
    <path d="M96 198h108" stroke="${palette.gold}" stroke-width="3"/>
    <rect x="104" y="211" width="92" height="28" rx="14" fill="${palette.aqua}"/>
    <text x="124" y="231" fill="${palette.ink}" font-family="Arial, sans-serif" font-size="16" font-weight="950">R$37</text>
  </svg>`;
}

function heroSvg() {
  return `
  <svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#061e27"/>
        <stop offset=".62" stop-color="#082c36"/>
        <stop offset="1" stop-color="#0b5359"/>
      </linearGradient>
      <linearGradient id="coverGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#07313b"/>
        <stop offset="1" stop-color="#0d7779"/>
      </linearGradient>
      <pattern id="fineGrid" width="52" height="52" patternUnits="userSpaceOnUse">
        <path d="M52 0H0v52" fill="none" stroke="#90eef0" stroke-opacity=".22" stroke-width="1"/>
      </pattern>
      <filter id="largeShadow" x="-40%" y="-40%" width="190%" height="210%">
        <feDropShadow dx="0" dy="34" stdDeviation="28" flood-color="#000" flood-opacity=".36"/>
      </filter>
      <filter id="panelShadow" x="-20%" y="-20%" width="150%" height="160%">
        <feDropShadow dx="0" dy="22" stdDeviation="20" flood-color="#000" flood-opacity=".24"/>
      </filter>
      <clipPath id="logoClipHero">
        <circle cx="130" cy="110" r="40"/>
      </clipPath>
    </defs>
    <rect width="1600" height="900" fill="url(#heroBg)"/>
    <g opacity=".48">${grid(1600, 900, 120, 0.16)}</g>
    <path d="M1238-40h385v1000h-300z" fill="${palette.aqua}" opacity=".8"/>
    <path d="M1116 136l352-58 68 600-392 72z" fill="${palette.white}" opacity=".08"/>
    <circle cx="130" cy="110" r="58" fill="#103944"/>
    <circle cx="130" cy="110" r="40" fill="${palette.white}"/>
    <image href="${markUri}" x="90" y="70" width="80" height="80" preserveAspectRatio="xMidYMid meet" clip-path="url(#logoClipHero)"/>
    <text x="205" y="104" fill="${palette.white}" font-family="Arial, sans-serif" font-size="38" font-weight="900">Sentido Clínico</text>
    <text x="207" y="142" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="24" font-weight="700">Recursos clínico-reflexivos para psicólogos</text>
    <rect x="95" y="190" width="460" height="50" rx="25" fill="none" stroke="${palette.aqua}" stroke-opacity=".84" stroke-width="2"/>
    <text x="126" y="225" fill="${palette.aqua}" font-family="Arial, sans-serif" font-size="20" font-weight="900" letter-spacing=".5">PRIMEIRO RECURSO DISPONÍVEL</text>
    <text x="96" y="374" fill="${palette.white}" font-family="Georgia, serif" font-size="102" font-weight="800">ICR-SV Beta</text>
    <text x="100" y="458" fill="${palette.white}" font-family="Georgia, serif" font-size="56" font-weight="700">Guia Clínico-Reflexivo</text>
    <text x="100" y="520" fill="${palette.white}" font-family="Georgia, serif" font-size="56" font-weight="700">de Sentido de Vida</text>
    <text x="102" y="610" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="30" font-weight="700">Um recurso breve, ético e complementar para apoiar</text>
    <text x="102" y="650" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="30" font-weight="700">a escuta, a formulação e o planejamento terapêutico.</text>
    <rect x="100" y="715" width="160" height="60" rx="30" fill="none" stroke="${palette.white}" stroke-opacity=".32"/>
    <text x="128" y="754" fill="${palette.white}" font-family="Arial, sans-serif" font-size="24" font-weight="900">Kit digital</text>
    <rect x="284" y="715" width="265" height="60" rx="30" fill="none" stroke="${palette.white}" stroke-opacity=".32"/>
    <text x="315" y="754" fill="${palette.white}" font-family="Arial, sans-serif" font-size="24" font-weight="900">6 dimensões clínicas</text>
    <rect x="576" y="715" width="210" height="60" rx="30" fill="${palette.aqua}"/>
    <text x="609" y="754" fill="${palette.ink}" font-family="Arial, sans-serif" font-size="26" font-weight="950">Acesso R$37</text>
    <text x="102" y="835" fill="${palette.muted}" opacity=".92" font-family="Arial, sans-serif" font-size="21" font-weight="700">Uso destinado a profissionais da Psicologia. Não se trata de teste psicológico ou instrumento diagnóstico.</text>
    <g filter="url(#panelShadow)">
      <rect x="1010" y="118" width="455" height="640" rx="34" fill="#173b45" opacity=".92" stroke="#ffffff" stroke-opacity=".18" stroke-width="2"/>
      <rect x="1034" y="142" width="407" height="592" rx="26" fill="none" stroke="#ffffff" stroke-opacity=".12"/>
      <path d="M1098 235h284a26 26 0 0 1 26 26v358a26 26 0 0 1-26 26h-284a26 26 0 0 1-26-26V261a26 26 0 0 1 26-26z" fill="#e9eeee" opacity=".94"/>
      <path d="M1138 214h284a26 26 0 0 1 26 26v400a26 26 0 0 1-26 26h-284a26 26 0 0 1-26-26V240a26 26 0 0 1 26-26z" fill="#f5f6f3" opacity=".98"/>
      <g filter="url(#largeShadow)">
        ${productCover({ x: 1060, y: 176, width: 292, height: 430, rotate: -5, scale: 1.02 })}
      </g>
    </g>
    <g filter="url(#panelShadow)">
      <rect x="985" y="622" width="455" height="215" rx="20" fill="#052531" stroke="#ffffff" stroke-opacity=".18"/>
      <text x="1024" y="675" fill="${palette.aqua}" font-family="Arial, sans-serif" font-size="28" font-weight="950">Inclui no kit</text>
      <circle cx="1034" cy="718" r="6" fill="${palette.aqua}"/>
      <text x="1054" y="727" fill="${palette.white}" font-family="Arial, sans-serif" font-size="22" font-weight="800">Inventário breve</text>
      <circle cx="1034" cy="760" r="6" fill="${palette.aqua}"/>
      <text x="1054" y="769" fill="${palette.white}" font-family="Arial, sans-serif" font-size="22" font-weight="800">Folha de síntese clínica</text>
      <circle cx="1034" cy="802" r="6" fill="${palette.aqua}"/>
      <text x="1054" y="811" fill="${palette.white}" font-family="Arial, sans-serif" font-size="22" font-weight="800">Guia de perguntas e manejo</text>
    </g>
  </svg>`;
}

async function render(svg, output) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(path.join(root, output));
}

async function main() {
  await render(coverSvg(), "kiwify-product-cover-300x250.png");
  await render(heroSvg(), "checkout-hero-1600x900.png");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
