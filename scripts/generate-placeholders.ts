/**
 * プレースホルダー画像の静的生成スクリプト
 *
 * 使い方: pnpm gen:placeholders
 *
 * src/data/site.ts の内容データから必要な画像サイズを列挙し、
 * server/lib/placeholder.ts のジェネレーターで SVG を
 * public/placeholder/ 配下に書き出す（GitHub Pages など
 * サーバーレスの静的ホスティングでも画像が表示されるようにするため）。
 *
 * 作品を追加・削除したら再実行すること。
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { projects } from '../src/data/site';
import { buildPlaceholderSvg } from '../server/lib/placeholder';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'placeholder');

interface Job {
  seed: string;
  w: number;
  h: number;
  v?: string;
}

const jobs: Job[] = [
  // プロフィール写真（About）と OG 画像
  { seed: 'portrait', w: 1200, h: 900 },
  { seed: 'og-cover', w: 1200, h: 630 },
];

for (const p of projects) {
  // ヒーロー（大・小）・作品索引サムネ・詳細カバー
  jobs.push(
    { seed: p.coverSeed, w: 1200, h: 900, v: p.cat },
    { seed: p.coverSeed, w: 640, h: 480, v: p.cat },
    { seed: p.coverSeed, w: 192, h: 144, v: p.cat },
    { seed: p.coverSeed, w: 1600, h: 900, v: p.cat },
  );
  // 詳細ページのギャラリー
  for (const seed of p.gallerySeeds) {
    jobs.push({ seed, w: 1600, h: 1000, v: p.cat });
  }
}

// 同名ファイルの重複ジョブを除去
const seen = new Set<string>();
const unique = jobs.filter((j) => {
  const key = `${j.seed}_${j.w}x${j.h}${j.v ? `_${j.v}` : ''}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const j of unique) {
  const name = `${j.seed}_${j.w}x${j.h}${j.v ? `_${j.v}` : ''}.svg`;
  const svg = buildPlaceholderSvg(j.seed, j.w, j.h, j.v);
  writeFileSync(join(outDir, name), svg, 'utf8');
}

console.log(`✔ ${unique.length} 枚のプレースホルダーを public/placeholder/ に生成しました`);
