/**
 * インライン SVG アイコン集 —— カテゴリアイコンと汎用アイコン。
 * stroke スタイルで統一し、currentColor で文字色を継承。
 */
import type { CategoryId } from '../data/site';

export type IconName = CategoryId | 'arrow' | 'play';

const paths: Record<IconName, string> = {
  youtube:
    '<rect x="1.5" y="4" width="17" height="12" rx="3.5"/><path d="M8.5 7.8v4.4L12.8 10 8.5 7.8z" fill="currentColor" stroke="none"/>',
  instagram:
    '<rect x="2.5" y="2.5" width="15" height="15" rx="4.2"/><circle cx="10" cy="10" r="3.6"/><circle cx="15.2" cy="4.8" r="1.05" fill="currentColor" stroke="none"/>',
  tiktok:
    '<path d="M9 16.8a3.2 3.2 0 1 0 3.2 3.2V5.5c.7 2.1 2.3 3.6 4.8 3.9"/><path d="M12.2 5.5V3.8"/>',
  web:
    '<rect x="1.5" y="3.5" width="17" height="13.5" rx="2"/><path d="M1.5 7.5h17"/><circle cx="4.6" cy="5.5" r=".7" fill="currentColor" stroke="none"/><circle cx="7.2" cy="5.5" r=".7" fill="currentColor" stroke="none"/><path d="M8 21h4"/>',
  arrow:
    '<path d="M3 11L11 3M11 3H4M11 3V10"/>',
  play:
    '<path d="M5.5 3.2v13.6L18.8 10 5.5 3.2z" fill="currentColor" stroke="none"/>',
};

export function icon(name: IconName, className = 'h-4 w-4'): string {
  return `<svg class="${className}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}
