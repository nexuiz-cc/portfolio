import { categories, img, projects, type Category, type Project } from '../data/site';
import { t } from '../i18n';
import { icon } from '../lib/icons';
import { renderChapter, renderChapterImage, renderNotes, renderParagraphs, renderToc } from './chapter';

function categoryOf(id: Project['cat']): Category {
  return categories.find((c) => c.id === id) ?? categories[0];
}

function metaRow(label: string, value: string): string {
  return `
    <div class="border-t border-line pt-3">
      <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">${label}</dt>
      <dd class="mt-1.5 text-sm text-ink">${value}</dd>
    </div>`;
}

export function renderProjectDetail(id: string | null): string {
  const project: Project = projects.find((p) => p.id === id) ?? projects[0];
  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const cat = categoryOf(project.cat);
  const pd = t.projectPage;
  const gallery = project.gallerySeeds.map((seed) => img(seed, 1600, 1000, cat.id));
  const actionLabel = project.cat === 'web' ? pd.visitWeb : pd.visitOn.replace('{label}', cat.label);

  return `
  <!-- 頂部大標題区（Editions 詳細ページの Hero に準拠） -->
  <header class="px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-40">
    <p class="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted" data-reveal>
      <span class="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-paper">${icon(cat.id, 'h-3 w-3')}</span>
      ${cat.label} · ${cat.en} · ${project.year}
    </p>
    <h1 class="mt-6 font-display text-[clamp(2.6rem,9.5vw,8.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]" data-reveal>
      ${project.title}
    </h1>
    <p class="mt-6 max-w-2xl font-serif text-xl font-light italic leading-snug text-ink-soft md:text-2xl" data-reveal>
      ${project.desc}
    </p>
    ${
      project.metrics
        ? `<p class="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink" data-reveal><span class="text-accent">■</span> ${project.metrics}</p>`
        : ''
    }
    <div class="mt-8 flex flex-wrap items-center gap-4" data-reveal>
      <a href="${project.platformUrl}" target="_blank" rel="noopener noreferrer" data-magnetic
         class="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-black">
        ${icon(cat.id, 'h-3.5 w-3.5')}
        ${actionLabel}
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <a href="works.html" class="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink">
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M11 3L3 11M3 11H10M3 11V4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${pd.backToIndex}
      </a>
    </div>
  </header>

  ${renderToc([
    { id: 'overview', index: '01', label: pd.chapters.overview },
    { id: 'process', index: '02', label: pd.chapters.process },
    { id: 'outcome', index: '03', label: pd.chapters.outcome },
    { id: 'notes', index: '04', label: 'Notes' },
    { id: 'next', index: '05', label: pd.chapters.next },
  ])}

  ${renderChapter({
    id: 'overview',
    index: '01',
    title: pd.chapters.overview,
    body: `
      ${renderParagraphs([project.paragraphs[0]])}
      ${renderChapterImage(gallery[0], `${project.title} — ${pd.figs.cover}`, `${cat.label} / Fig.01 — ${pd.figs.cover}`)}
    `,
  })}

  ${renderChapter({
    id: 'process',
    index: '02',
    title: pd.chapters.process,
    body: `
      ${renderParagraphs([project.paragraphs[1]])}
      ${renderChapterImage(gallery[1], `${project.title} — ${pd.figs.process}`, `${cat.label} / Fig.02 — ${pd.figs.process}`)}
    `,
  })}

  ${renderChapter({
    id: 'outcome',
    index: '03',
    title: pd.chapters.outcome,
    body: `
      ${renderParagraphs(project.paragraphs.slice(2))}
      ${renderChapterImage(img(project.coverSeed, 1600, 900, cat.id), `${project.title} — ${pd.figs.final}`, `${cat.label} / Fig.03 — ${pd.figs.final}`)}
    `,
  })}

  ${renderChapter({
    id: 'notes',
    index: '04',
    title: 'Notes',
    body: `
      ${renderNotes([
        `${pd.notes.client}：${project.client}`,
        `${pd.notes.role}：${project.role}`,
        `${pd.notes.yearPlatform}：${project.year} · ${project.platform}`,
        `${pd.notes.category}：${cat.label} / ${cat.en} —— ${pd.notes.categoryNote}：${categories.map((c) => c.label).join(' / ')}`,
      ])}
      <dl class="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
        ${metaRow(pd.notes.client, project.client)}
        ${metaRow(pd.notes.role, project.role)}
        ${metaRow(pd.notes.year, project.year)}
        ${metaRow(pd.notes.platform, project.platform)}
      </dl>
    `,
  })}

  <!-- 下一项目（Editions 底部导航に準拠） -->
  <a id="next" href="project.html?id=${next.id}" data-cursor="view"
     class="group block border-t border-line px-5 py-14 transition-colors duration-500 hover:bg-ink hover:text-paper md:px-10 md:py-20">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-paper/60">05 / ${pd.nextProject}</p>
    <div class="mt-4 flex items-end justify-between gap-6">
      <span class="font-display text-[clamp(1.9rem,5.5vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em] transition-transform duration-500 ease-paper group-hover:translate-x-2 md:group-hover:translate-x-4">
        ${next.title}
      </span>
      <span class="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-paper/40 md:h-14 md:w-14">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
  </a>`;
}
