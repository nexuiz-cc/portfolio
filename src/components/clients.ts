import { sectionTitle, t } from '../i18n';

/**
 * クライアントロゴウォール —— プレースホルダーのテキストロゴを灰度で並べ、hover で墨色に戻る。
 * 実際のロゴ画像（SVG/PNG）に差し替える場合は marks を img タグに置き換える。
 * セクションの表示・非表示は site.config.ts の sections.clients.enabled。
 */
const marks: Array<{ name: string; className: string }> = [
  { name: 'KITASANDO', className: 'font-display text-xl font-extrabold tracking-[-0.02em]' },
  { name: 'あおぞら工業', className: 'font-serif text-xl italic' },
  { name: 'HIKARI TECH', className: 'font-mono text-base font-bold tracking-[0.22em]' },
  { name: 'みのりフーズ', className: 'font-display text-xl font-medium tracking-[0.08em]' },
  { name: 'MIDORI FES', className: 'font-display text-xl font-extrabold uppercase tracking-[0.12em]' },
  { name: 'くらし日和', className: 'font-serif text-xl' },
];

/** @param num セクション番号（自動採番） */
export function renderClientsSection(num: string): string {
  return `
  <section class="px-5 py-16 md:px-10 md:py-24">
    <div class="mb-10 flex flex-wrap items-end justify-between gap-4" data-reveal>
      <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"><span class="font-bold text-accent">${num}</span> / ${t.clients.eyebrow}</p>
      <h2 class="font-display text-xl font-extrabold tracking-[-0.02em] text-ink md:text-2xl">${sectionTitle('clients')}</h2>
    </div>
    <div class="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6" data-reveal>
      ${marks
        .map(
          (m) => `
        <div class="flex h-24 items-center justify-center border-b border-r border-line px-4 md:h-28">
          <span class="${m.className} text-ink/30 transition-colors duration-500 ease-paper hover:text-ink">${m.name}</span>
        </div>`,
        )
        .join('')}
    </div>
  </section>`;
}
