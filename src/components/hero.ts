import { categories, img, projects, type CategoryId, type Project } from '../data/site';
import { siteConfig } from '../site.config';
import { t } from '../i18n';
import { icon } from '../lib/icons';

/**
 * トップページ Hero：左上の 2 行コピー + 「1 大 4 小」の注目作品陈列。
 * 注目作品は projects 配列の先頭。成果数字（metrics）があれば作品データから表示する。
 * モバイルは横スワイプなしの単列レイアウト。
 */

function categoryOf(id: CategoryId) {
  return categories.find((c) => c.id === id) ?? categories[0];
}

/** カード下部のキャプション（年・カテゴリ / タイトル / 見る） */
function renderCaption(p: Project, showMetrics: boolean): string {
  const cat = categoryOf(p.cat);
  return `
    <div class="mt-3 flex items-start justify-between gap-4">
      <div class="min-w-0">
        <p class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          ${p.year} · ${icon(cat.id, 'h-3 w-3')} ${cat.label}
        </p>
        <p class="mt-1 text-sm font-medium leading-snug text-ink md:text-base">${p.title}</p>
        ${
          showMetrics && p.metrics
            ? `<p class="mt-1.5 font-mono text-[11px] font-medium tracking-[0.06em] text-ink">${p.metrics}</p>`
            : ''
        }
      </div>
      <span class="mt-0.5 inline-flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        ${t.hero.view} <span aria-hidden="true">→</span>
      </span>
    </div>`;
}

function renderCard(p: Project, delay: number, opts: { featured?: boolean; eager?: boolean } = {}): string {
  const cat = categoryOf(p.cat);
  const { featured = false, eager = false } = opts;
  const [w, h] = featured ? [1200, 900] : [640, 480];
  return `
    <figure class="hero-item ${featured ? 'md:col-span-7' : ''}" style="--hero-delay: ${delay}ms">
      <a href="project.html?id=${p.id}" class="hero-card group aspect-[4/3]" data-cursor="view" aria-label="${t.hero.viewWork}：${p.title}">
        ${
          featured
            ? `<span class="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper">${t.hero.featuredLabel}</span>`
            : ''
        }
        <img src="${img(p.coverSeed, w, h, p.cat)}" alt="${p.title} · ${cat.label}カバー" width="${w}" height="${h}" loading="${eager ? 'eager' : 'lazy'}" />
      </a>
      ${renderCaption(p, featured)}
    </figure>`;
}

export function renderHero(): string {
  const [featured, ...rest] = projects;
  const smalls = rest.slice(0, 4);

  return `
  <section id="top" class="relative overflow-hidden bg-fog">
    <!-- 標語：左上の 2 行コピー（site.config.ts の brand.tagline で編集可） -->
    <div class="px-5 pt-24 md:px-10 md:pt-32">
      <h1 class="hero-item max-w-[24ch] text-[19px] font-medium leading-[1.45] text-ink-soft md:max-w-md md:text-[22px]" style="--hero-delay: 0ms">
        ${siteConfig.brand.tagline[0]}<br />
        ${siteConfig.brand.tagline[1]}
      </h1>
    </div>

    <!-- 注目作品：モバイルは単列、md 以上は 1 大（7 列）+ 4 小（5 列の 2×2） -->
    <div class="px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14" data-hero-grid>
      <div class="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-12 md:gap-y-5">
        ${featured ? renderCard(featured, 90, { featured: true, eager: true }) : ''}
        <div class="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:col-span-5 md:gap-y-5">
          ${smalls.map((p, i) => renderCard(p, 160 + i * 70, { eager: i === 0 })).join('')}
        </div>
      </div>

      <div class="hero-item mt-12 flex justify-center md:mt-16" style="--hero-delay: 480ms">
        <a href="works.html" data-magnetic
           class="rounded-full border border-ink px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper">
          ${t.hero.seeAll} →
        </a>
      </div>
    </div>
  </section>`;
}
