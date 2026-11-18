import { img, profile, skills, stats, timeline } from '../data/site';
import { siteConfig } from '../site.config';
import { t } from '../i18n';
import { renderChapter, renderChapterImage, renderParagraphs, renderToc } from './chapter';

/**
 * プロフィールページ —— Editions バージョン詳細ページに準拠：
 * 大見出し Hero + sticky 目次アンカー + 番号付きセクション（紹介/スキル/数字/経歴/連絡）。
 */
export function renderAboutPage(): string {
  const a = t.aboutPage;
  const { brand } = siteConfig;
  const availability = brand.available ? t.nav.availability : t.nav.availabilityClosed;

  const skillBars = skills
    .map(
      (s, i) => `
      <div data-reveal style="--reveal-delay: ${i * 80}ms">
        <div class="mb-2 flex items-baseline justify-between">
          <span class="text-sm font-medium text-ink">${s.name}</span>
          <span class="font-mono text-[11px] tracking-[0.14em] text-muted">${s.level}%</span>
        </div>
        <div class="h-px w-full bg-line">
          <div class="skill-bar-fill h-[3px] -translate-y-px bg-ink" data-skill="${s.level}"></div>
        </div>
      </div>`,
    )
    .join('');

  const statCards = stats
    .map(
      (s, i) => `
      <div class="border-t border-line pt-4" data-reveal style="--reveal-delay: ${i * 90}ms">
        <p class="font-display text-5xl font-extrabold tracking-[-0.03em] text-ink md:text-6xl">
          <span data-counter="${s.value}">0</span><span class="text-accent">${s.suffix}</span>
        </p>
        <p class="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">${s.label}</p>
      </div>`,
    )
    .join('');

  const timelineRows = timeline
    .map(
      (item, i) => `
      <div class="group grid grid-cols-1 gap-2 border-b border-line py-7 transition-colors duration-500 ease-paper hover:bg-fog md:grid-cols-12 md:items-baseline md:gap-6"
           data-reveal style="--reveal-delay: ${i * 60}ms">
        <span class="font-mono text-[11px] tracking-[0.18em] text-muted md:col-span-3">${item.period}</span>
        <h3 class="font-display text-2xl font-extrabold tracking-[-0.03em] md:col-span-4 md:text-3xl">${item.title}</h3>
        <p class="text-sm leading-relaxed text-ink-soft md:col-span-5">${item.desc}</p>
      </div>`,
    )
    .join('');

  return `
  <!-- Hero：大見出し -->
  <header class="px-5 pb-10 pt-14 md:px-10 md:pb-16 md:pt-24">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted" data-reveal>${a.eyebrow}</p>
    <h1 class="mt-5 font-display text-[clamp(2.9rem,9vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal style="--reveal-delay: 80ms">
      ${profile.name}<span class="text-accent">.</span>
    </h1>
    <p class="mt-5 max-w-2xl font-serif text-[clamp(1.15rem,2.4vw,1.75rem)] font-light italic leading-[1.45] text-ink-soft" data-reveal style="--reveal-delay: 160ms">
      ${profile.role} —— ${a.lede}
    </p>
    <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal style="--reveal-delay: 240ms">
      <span class="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
        <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full ${brand.available ? 'bg-accent' : 'bg-muted'}"></span>${availability}
      </span>
      <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">${profile.location} / ${siteConfig.brand.role}</span>
    </div>
  </header>

  ${renderToc([
    { id: 'intro', index: '01', label: a.toc.intro },
    { id: 'skills', index: '02', label: a.toc.skills },
    { id: 'numbers', index: '03', label: a.toc.numbers },
    { id: 'journey', index: '04', label: a.toc.journey },
    { id: 'reach', index: '05', label: a.toc.reach },
  ])}

  ${renderChapter({
    id: 'intro',
    index: '01',
    title: a.chapters.intro,
    body: `
      ${renderParagraphs([profile.bio[0], profile.bio[1]])}
      ${renderChapterImage(img('portrait', 1200, 900), `${profile.name} — ${a.figs.portrait}`, `Fig.01 — ${a.figs.portrait}`)}
    `,
  })}

  ${renderChapter({
    id: 'skills',
    index: '02',
    title: a.chapters.skills,
    body: `<div class="grid max-w-2xl grid-cols-1 gap-7">${skillBars}</div>`,
  })}

  ${renderChapter({
    id: 'numbers',
    index: '03',
    title: a.chapters.numbers,
    body: `<div class="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">${statCards}</div>`,
  })}

  ${renderChapter({
    id: 'journey',
    index: '04',
    title: a.chapters.journey,
    body: `<div class="border-t border-line">${timelineRows}</div>`,
  })}

  ${renderChapter({
    id: 'reach',
    index: '05',
    title: a.chapters.reach,
    body: `
      <p class="max-w-xl text-[15px] leading-[1.85] text-ink-soft" data-reveal>
        ${a.reachText} ${t.nav.replyNote}
      </p>
      <a href="mailto:${brand.email}" data-magnetic data-reveal
         class="mt-6 inline-block font-serif text-[clamp(1.5rem,4vw,2.75rem)] font-light italic tracking-tight text-ink underline decoration-line decoration-2 underline-offset-8 transition-colors duration-300 hover:decoration-accent">
        ${brand.email}
      </a>
      <div class="mt-10" data-reveal>
        <a href="contact.html" data-magnetic
           class="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-paper transition-transform duration-300 ease-paper hover:scale-[1.03] active:scale-[0.98]">
          ${t.cta.button}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    `,
  })}`;
}
