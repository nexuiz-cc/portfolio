import { marqueeItems } from '../data/site';

/** 下部マーキー —— 黒地に白文字（アクセントカラーは使わない） */
export function renderMarquee(): string {
  const items = marqueeItems
    .map(
      (item) => `
      <span class="mx-6 flex items-center gap-6 font-mono text-sm uppercase tracking-[0.2em] text-paper">
        ${item}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="text-paper/50">
          <path d="M7 0L8.6 5.4L14 7L8.6 8.6L7 14L5.4 8.6L0 7L5.4 5.4L7 0Z" fill="currentColor"/>
        </svg>
      </span>`,
    )
    .join('');

  return `
  <div class="marquee border-y border-ink bg-ink py-4" aria-hidden="true">
    <div class="marquee-track">
      <div class="flex items-center">${items}</div>
      <div class="flex items-center">${items}</div>
    </div>
  </div>`;
}
