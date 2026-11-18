import { mountPage } from '../lib/page';
import { renderCategoryGroups, renderWorkFilters } from '../components/works';
import { categories, projects } from '../data/site';
import { t } from '../i18n';

const w = t.worksPage;

const header = `
  <section class="px-5 pt-28 md:px-10 md:pt-40">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted" data-reveal>${w.eyebrow}</p>
    <div class="mt-4 flex flex-wrap items-end justify-between gap-6 pb-10 md:pb-14">
      <h1 class="font-display text-[clamp(2.8rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal style="--reveal-delay: 80ms">
        ${w.title}
        <sup id="works-count" class="ml-2 align-super font-mono text-[0.2em] font-normal tracking-[0.2em] text-muted">(${String(projects.length).padStart(2, '0')})</sup>
      </h1>
      <p class="max-w-xs text-sm leading-relaxed text-ink-soft" data-reveal style="--reveal-delay: 160ms">
        ${w.sub}
      </p>
    </div>
    ${renderWorkFilters()}
  </section>`;

mountPage('works', [header, `<section class="px-5 pb-24 pt-4 md:px-10 md:pb-36" data-work-list>${renderCategoryGroups()}</section>`]);

/** アーカイブのカテゴリ絞り込み：グループの表示切替＋URL クエリ同期 */
function initWorkFilter(): void {
  const pills = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-cat-group]'));
  const countEl = document.getElementById('works-count');
  if (pills.length === 0 || groups.length === 0) return;

  const valid = ['all', ...categories.map((c) => c.id)];
  const animateIn = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const apply = (cat: string, animate: boolean): void => {
    let visible = 0;
    groups.forEach((group) => {
      const show = cat === 'all' || group.dataset.catGroup === cat;
      group.classList.toggle('row-hide', !show);
      if (!show) return;
      const rows = Array.from(group.querySelectorAll<HTMLElement>('.work-row'));
      visible += rows.length;
      if (animate) {
        // フィルター切替時、表示アイテムの入場アニメを一括再生
        rows.forEach((row) => {
          row.classList.remove('row-enter');
          void row.offsetWidth;
          row.classList.add('row-enter');
        });
      }
    });
    pills.forEach((pill) => {
      const active = pill.dataset.filter === cat;
      pill.classList.toggle('is-active', active);
      pill.setAttribute('aria-pressed', String(active));
    });
    if (countEl) countEl.textContent = `(${String(visible).padStart(2, '0')})`;
  };

  pills.forEach((pill) =>
    pill.addEventListener('click', () => {
      const cat = pill.dataset.filter ?? 'all';
      apply(cat, animateIn);
      history.replaceState(null, '', cat === 'all' ? 'works.html' : `works.html?cat=${cat}`);
    }),
  );

  const initial = new URLSearchParams(location.search).get('cat') ?? 'all';
  apply(valid.includes(initial) ? initial : 'all', false);
}

initWorkFilter();
