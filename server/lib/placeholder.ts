// ABOUTME: seed 付きの決定的プレースホルダー画像ジェネレーター
// ABOUTME: エディトリアル誌風の SVG を出力。同じ seed からは常に同じ画像が生成され、全站でトーンが統一される
// ABOUTME: ?v=video|social|short|web でカテゴリ別モチーフ（再生ボタン／SNS フレーム／縦型フォン／ブラウザ枠）を重畳可能

/** カテゴリ別モチーフ識別子（作品カバーとカテゴリの視覚的一貫性のため） */
export type PlaceholderVariant = 'youtube' | 'instagram' | 'tiktok' | 'web';

const ACCENT = '#C6F24E';

interface Palette {
  bg: string;
  fg: string;
  mid: string;
}

const PALETTES: Palette[] = [
  { bg: '#12110E', fg: '#F4F1EA', mid: '#4A473F' },
  { bg: '#F4F1EA', fg: '#12110E', mid: '#C9C5BA' },
  { bg: '#2A2925', fg: '#F4F1EA', mid: '#8A8578' },
  { bg: '#E5E1D6', fg: '#12110E', mid: '#A8A396' },
  { bg: '#1C1B18', fg: '#E5E1D6', mid: '#57534A' },
];

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r = (v: number): number => Math.round(v * 100) / 100;

function bars(rand: () => number, p: Palette, w: number, h: number): string {
  const n = 4 + Math.floor(rand() * 4);
  const bw = w / n;
  let out = '';
  for (let i = 0; i < n; i++) {
    const color = i % 2 === 0 ? p.fg : p.mid;
    const barH = h * (0.55 + rand() * 0.45);
    out += `<rect x="${r(i * bw)}" y="${r(h - barH)}" width="${r(bw * (0.55 + rand() * 0.35))}" height="${r(barH)}" fill="${color}" opacity="${rand() > 0.5 ? 1 : 0.55}"/>`;
  }
  return out;
}

function rings(rand: () => number, p: Palette, w: number, h: number): string {
  const cx = w * (0.3 + rand() * 0.4);
  const cy = h * (0.3 + rand() * 0.4);
  const maxR = Math.min(w, h) * 0.42;
  const n = 4 + Math.floor(rand() * 4);
  let out = '';
  for (let i = 1; i <= n; i++) {
    out += `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r((maxR / n) * i)}" fill="none" stroke="${p.fg}" stroke-width="${r(Math.min(w, h) * 0.008)}" opacity="${r(0.35 + (i / n) * 0.6)}"/>`;
  }
  out += `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(maxR * 0.1)}" fill="${ACCENT}"/>`;
  return out;
}

function grid(rand: () => number, p: Palette, w: number, h: number): string {
  const cols = 4 + Math.floor(rand() * 3);
  const rows = 4 + Math.floor(rand() * 3);
  const cw = w / cols;
  const ch = h / rows;
  let out = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = rand();
      if (v > 0.62) {
        out += `<rect x="${r(x * cw)}" y="${r(y * ch)}" width="${r(cw)}" height="${r(ch)}" fill="${v > 0.9 ? ACCENT : p.mid}"/>`;
      } else if (v > 0.42) {
        out += `<rect x="${r(x * cw)}" y="${r(y * ch)}" width="${r(cw)}" height="${r(ch)}" fill="none" stroke="${p.fg}" stroke-width="1" opacity="0.5"/>`;
      }
    }
  }
  return out;
}

function diagonal(rand: () => number, p: Palette, w: number, h: number, seed: string): string {
  const flip = rand() > 0.5;
  const poly = flip ? `0,0 ${w},0 0,${h}` : `${w},0 ${w},${h} 0,${h}`;
  const letter = (seed.replace(/[^a-z0-9]/gi, '').charAt(0) || 'P').toUpperCase();
  const fontSize = Math.min(w, h) * 0.52;
  return (
    `<polygon points="${poly}" fill="${p.mid}"/>` +
    `<text x="${r(w / 2)}" y="${r(h / 2 + fontSize * 0.36)}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${r(fontSize)}" fill="${p.fg}">${letter}</text>`
  );
}

function stripes(rand: () => number, p: Palette, w: number, h: number): string {
  const n = 6 + Math.floor(rand() * 5);
  const sh = h / n;
  let out = '';
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      out += `<rect x="0" y="${r(i * sh)}" width="${w}" height="${r(sh)}" fill="${p.mid}" opacity="${r(0.4 + rand() * 0.5)}"/>`;
    }
  }
  const cx = w * (0.25 + rand() * 0.5);
  const cy = h * (0.3 + rand() * 0.4);
  out += `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(Math.min(w, h) * 0.22)}" fill="none" stroke="${p.fg}" stroke-width="${r(Math.min(w, h) * 0.012)}"/>`;
  if (rand() > 0.6) {
    out += `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(Math.min(w, h) * 0.05)}" fill="${ACCENT}"/>`;
  }
  return out;
}

/** YouTube 動画モチーフ：中央の再生ボタン + 下部のタイムライン */
function motifVideo(p: Palette, w: number, h: number): string {
  const cx = w / 2;
  const cy = h * 0.44;
  const radius = Math.min(w, h) * 0.13;
  const tri = radius * 0.52;
  const barH = Math.max(6, h * 0.018);
  const barY = h * 0.86;
  const barW = w * 0.62;
  return (
    `<circle cx="${r(cx)}" cy="${r(cy)}" r="${r(radius)}" fill="none" stroke="${p.fg}" stroke-width="${r(radius * 0.09)}"/>` +
    `<polygon points="${r(cx - tri * 0.42)},${r(cy - tri * 0.62)} ${r(cx - tri * 0.42)},${r(cy + tri * 0.62)} ${r(cx + tri * 0.72)},${r(cy)}" fill="${p.fg}"/>` +
    `<rect x="${r((w - barW) / 2)}" y="${r(barY)}" width="${r(barW)}" height="${r(barH)}" fill="${p.fg}" opacity="0.25" rx="${r(barH / 2)}"/>` +
    `<rect x="${r((w - barW) / 2)}" y="${r(barY)}" width="${r(barW * 0.38)}" height="${r(barH)}" fill="${ACCENT}" rx="${r(barH / 2)}"/>` +
    `<circle cx="${r((w - barW) / 2 + barW * 0.38)}" cy="${r(barY + barH / 2)}" r="${r(barH * 1.6)}" fill="${ACCENT}"/>`
  );
}

/** Instagram 投稿モチーフ：アバター + テキスト行 + 角丸フレーム */
function motifSocial(p: Palette, w: number, h: number): string {
  const pad = w * 0.08;
  const avatar = Math.min(w, h) * 0.075;
  const lineH = Math.max(5, h * 0.014);
  return (
    `<rect x="${r(pad)}" y="${r(pad)}" width="${r(w - pad * 2)}" height="${r(h - pad * 2)}" fill="none" stroke="${p.fg}" stroke-width="${r(Math.min(w, h) * 0.008)}" rx="${r(Math.min(w, h) * 0.03)}" opacity="0.8"/>` +
    `<circle cx="${r(pad * 2)}" cy="${r(pad * 2.1)}" r="${r(avatar)}" fill="${ACCENT}"/>` +
    `<rect x="${r(pad * 2 + avatar * 1.8)}" y="${r(pad * 2.1 - lineH * 1.2)}" width="${r(w * 0.3)}" height="${r(lineH)}" fill="${p.fg}" rx="${r(lineH / 2)}"/>` +
    `<rect x="${r(pad * 2 + avatar * 1.8)}" y="${r(pad * 2.1 + lineH * 0.8)}" width="${r(w * 0.2)}" height="${r(lineH)}" fill="${p.fg}" opacity="0.5" rx="${r(lineH / 2)}"/>` +
    `<rect x="${r(pad * 2)}" y="${r(h - pad * 1.9)}" width="${r(w * 0.24)}" height="${r(lineH)}" fill="${p.fg}" opacity="0.6" rx="${r(lineH / 2)}"/>`
  );
}

/** TikTok ショート動画モチーフ：縦型フォン枠 + 右サイドのアクションレール */
function motifShort(p: Palette, w: number, h: number): string {
  const ph = h * 0.78;
  const pw = ph * (9 / 16);
  const px = (w - pw) / 2 - pw * 0.1;
  const py = (h - ph) / 2;
  const dot = Math.min(w, h) * 0.028;
  let rail = '';
  for (let i = 0; i < 3; i++) {
    rail += `<circle cx="${r(px + pw + dot * 2.4)}" cy="${r(py + ph * 0.62 + i * dot * 3.4)}" r="${r(dot)}" fill="${i === 0 ? ACCENT : p.fg}" opacity="${i === 0 ? 1 : 0.55}"/>`;
  }
  return (
    `<rect x="${r(px)}" y="${r(py)}" width="${r(pw)}" height="${r(ph)}" fill="none" stroke="${p.fg}" stroke-width="${r(Math.min(w, h) * 0.009)}" rx="${r(pw * 0.09)}"/>` +
    `<rect x="${r(px + pw * 0.14)}" y="${r(py + ph * 0.72)}" width="${r(pw * 0.55)}" height="${r(ph * 0.022)}" fill="${p.fg}" rx="${r(ph * 0.011)}"/>` +
    `<rect x="${r(px + pw * 0.14)}" y="${r(py + ph * 0.78)}" width="${r(pw * 0.38)}" height="${r(ph * 0.022)}" fill="${p.fg}" opacity="0.5" rx="${r(ph * 0.011)}"/>` +
    rail
  );
}

/** Web デザインモチーフ：ブラウザのトップバー + カラムブロック */
function motifWeb(p: Palette, w: number, h: number): string {
  const pad = w * 0.07;
  const barH = h * 0.09;
  const dot = barH * 0.18;
  let dots = '';
  for (let i = 0; i < 3; i++) {
    dots += `<circle cx="${r(pad + barH * 0.5 + i * dot * 2.6)}" cy="${r(pad + barH / 2)}" r="${r(dot)}" fill="${i === 0 ? ACCENT : p.fg}" opacity="${i === 0 ? 1 : 0.55}"/>`;
  }
  const colY = pad + barH + h * 0.08;
  const colH = h - colY - pad * 0.9;
  const colW = (w - pad * 2 - w * 0.05) / 2;
  return (
    `<rect x="${r(pad)}" y="${r(pad)}" width="${r(w - pad * 2)}" height="${r(barH)}" fill="none" stroke="${p.fg}" stroke-width="${r(Math.min(w, h) * 0.007)}" rx="${r(barH / 2)}" opacity="0.8"/>` +
    dots +
    `<rect x="${r(pad + w * 0.24)}" y="${r(pad + barH * 0.32)}" width="${r(w * 0.34)}" height="${r(barH * 0.36)}" fill="${p.fg}" opacity="0.3" rx="${r(barH * 0.18)}"/>` +
    `<rect x="${r(pad)}" y="${r(colY)}" width="${r(colW)}" height="${r(colH)}" fill="${p.mid}" opacity="0.75"/>` +
    `<rect x="${r(pad + colW + w * 0.05)}" y="${r(colY)}" width="${r(colW)}" height="${r(colH * 0.62)}" fill="none" stroke="${p.fg}" stroke-width="${r(Math.min(w, h) * 0.006)}" opacity="0.6"/>`
  );
}

const MOTIFS: Record<PlaceholderVariant, (p: Palette, w: number, h: number) => string> = {
  youtube: motifVideo,
  instagram: motifSocial,
  tiktok: motifShort,
  web: motifWeb,
};

export function buildPlaceholderSvg(seed: string, width: number, height: number, variant?: string): string {
  const w = Math.min(Math.max(Math.floor(width) || 1200, 16), 2000);
  const h = Math.min(Math.max(Math.floor(height) || 900, 16), 2000);
  const rand = mulberry32(hashSeed(seed));
  const palette = PALETTES[Math.floor(rand() * PALETTES.length)];
  const variants = [bars, rings, grid, stripes];
  const base = variants[Math.floor(rand() * variants.length)];

  let body = base(rand, palette, w, h);
  if (rand() > 0.55) {
    body += diagonal(rand, palette, w, h, seed);
  }
  // カテゴリモチーフを重畳（ベースの抽象パターンの上に、控えめなオーバーレイを敷いてから描く）
  const motif = variant && variant in MOTIFS ? MOTIFS[variant as PlaceholderVariant] : undefined;
  if (motif) {
    body += `<rect width="${w}" height="${h}" fill="${palette.bg}" opacity="0.55"/>` + motif(palette, w, h);
  }

  const labelSize = Math.max(11, Math.round(Math.min(w, h) * 0.022));
  const label = `FIG. ${seed.toUpperCase().slice(0, 12)} — ${w}×${h}`;
  const footer =
    `<rect x="0" y="${r(h - labelSize * 2.6)}" width="${w}" height="${r(labelSize * 2.6)}" fill="${palette.bg}" opacity="0.85"/>` +
    `<text x="${r(labelSize)}" y="${r(h - labelSize)}" font-family="ui-monospace, Menlo, monospace" font-size="${labelSize}" letter-spacing="${r(labelSize * 0.18)}" fill="${palette.fg}" opacity="0.7">${label}</text>`;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="${palette.bg}"/>` +
    body +
    footer +
    `</svg>`
  );
}
