import { categories, img, projects, type Category, type Project } from '../data/site';
import { sectionTitle, t } from '../i18n';
import { icon } from '../lib/icons';

function countByCategory(id: string): number {
  return projects.filter((p) => p.cat === id).length;
}

/** 作品行 —— サムネイル + 番号 + カテゴリ + タイトル + 矢印（モバイルも同構成で省略なし） */
function renderProjectRow(p: Project): string {
  const cat = categories.find((c) => c.id === p.cat) ?? categories[0];
  const num = String(projects.indexOf(p) + 1).padStart(2, '0');
  return `
  <a href="project.html?id=${p.id}" data-cursor="view" data-category="${p.cat}"
     class="work-row group flex w-full items-center gap-3 border-b border-line px-1 py-4 transition-colors duration-300 ease-paper md:gap-5 md:py-5">
    <img src="${img(p.coverSeed, 192, 144, p.cat)}" alt="" width="192" height="144" loading="lazy"
         class="aspect-[4/3] w-16 flex-shrink-0 bg-fog object-cover md:w-24" />
    <span class="min-w-0 flex-1">
      <span class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:text-[11px]">
        <span class="text-ink">${num}</span>
        ${icon(cat.id, 'h-3.5 w-3.5')} ${cat.label}
        <span class="hidden md:inline">· ${p.year}</span>
      </span>
      <span class="mt-1 block font-display text-xl font-extrabold leading-tight tracking-[-0.02em] transition-transform duration-500 ease-paper group-hover:translate-x-2 md:text-3xl">${p.title}</span>
    </span>
    <span class="work-arrow inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:px-4">
      <span class="hidden md:inline">${t.hero.view}</span>${icon('arrow', 'h-3 w-3')}
    </span>
  </a>`;
}

/** カテゴリフィルター（アーカイブページ用） */
export function renderWorkFilters(): string {
  const pill = (id: string, label: string, count: number, withIcon: boolean): string => `
    <button type="button" data-filter="${id}" aria-pressed="false"
      class="filter-pill inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300">
      ${withIcon ? icon(id as Category['id'], 'h-3.5 w-3.5') : ''}${label}
      <span class="text-muted">(${String(count).padStart(2, '0')})</span>
    </button>`;

  return `
  <div class="flex flex-wrap gap-2 pb-1" data-filterbar data-reveal role="group" aria-label="${t.aria.filter}">
    ${pill('all', t.works.filterAll, projects.length, false)}
    ${categories.map((c) => pill(c.id, c.label, countByCategory(c.id), true)).join('')}
  </div>`;
}

/** カテゴリグループ見出し（mono ラベル + 件数 + すべて見る） */
function renderCategoryHeader(c: Category, gi: number): string {
  return `
    <div class="flex flex-wrap items-end justify-between gap-4 border-t border-line px-1 pb-6 pt-8 md:pb-8 md:pt-10" data-reveal>
      <div class="flex items-center gap-4">
        <span class="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">${icon(c.id, 'h-5 w-5')}</span>
        <div>
          <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">${String(gi + 1).padStart(2, '0')} / ${c.en}</p>
          <h3 class="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em] md:text-3xl">${c.label}</h3>
        </div>
      </div>
      <a href="works.html?cat=${c.id}" class="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
        <span class="text-muted">(${String(countByCategory(c.id)).padStart(2, '0')})</span>
        <span class="u-sweep">${t.works.viewAll}</span>
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-45">${icon('arrow', 'h-3 w-3')}</span>
      </a>
    </div>`;
}

/** カテゴリ別にグループ化した作品インデックス（トップとアーカイブで共用） */
export function renderCategoryGroups(): string {
  return categories
    .map((c, gi) => {
      const list = projects.filter((p) => p.cat === c.id);
      return `
    <section data-cat-group="${c.id}">
      ${renderCategoryHeader(c, gi)}
      <div class="border-t border-line">
        ${list.map(renderProjectRow).join('')}
      </div>
    </section>`;
    })
    .join('');
}

/**
 * トップページ「作品インデックス」セクション。
 * @param num セクション番号（site.config.ts で有効なセクションから自動採番された値）
 */
export function renderWorksSection(num: string): string {
  return `
  <section class="px-5 py-24 md:px-10 md:py-36">
    <div class="mb-12 md:mb-16" data-reveal>
      <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"><span class="font-bold text-accent">${num}</span> / ${t.works.eyebrow}</p>
      <div class="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 class="font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          ${sectionTitle('works')}
          <sup class="ml-2 align-super font-mono text-[0.22em] font-normal tracking-[0.2em] text-muted">(${String(projects.length).padStart(2, '0')})</sup>
        </h2>
        <p class="max-w-xs text-[13px] leading-relaxed text-ink-soft">${t.works.desc}</p>
      </div>
    </div>
    ${renderCategoryGroups()}
  </section>`;
}
