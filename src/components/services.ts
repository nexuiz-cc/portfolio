import { services, type Service } from '../data/site';
import { sectionTitle, t } from '../i18n';

function renderService(s: Service, i: number): string {
  const items = s.tags
    .map(
      (d) =>
        `<li class="flex items-center gap-3 border-t border-line py-3 text-sm transition-colors duration-500 group-hover:border-line-light">
          <span class="h-1 w-1 rounded-full bg-current"></span>${d}
        </li>`,
    )
    .join('');

  return `
  <div class="group relative flex flex-col border-t border-line px-1 py-10 transition-colors duration-500 ease-paper hover:bg-ink hover:text-paper md:px-6 md:py-12"
       data-reveal style="--reveal-delay: ${(i % 2) * 100}ms">
    <div class="flex items-start justify-between">
      <span class="font-mono text-xs tracking-[0.2em] text-muted transition-colors duration-500 group-hover:text-accent">(${String(i + 1).padStart(2, '0')})</span>
      <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true"
           class="text-ink transition-all duration-500 ease-paper group-hover:rotate-45 group-hover:text-accent">
        <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h3 class="mt-8 font-display text-3xl font-extrabold tracking-[-0.03em] md:mt-12 md:text-4xl">${s.title}</h3>
    <p class="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">${s.en}</p>
    <p class="mt-4 max-w-md text-[15px] leading-[1.8] text-ink-soft transition-colors duration-500 group-hover:text-paper/70">${s.desc}</p>
    <ul class="mt-8">${items}</ul>
  </div>`;
}

/** @param num セクション番号（自動採番） */
export function renderServicesSection(num: string): string {
  return `
  <section id="services" class="px-5 py-24 md:px-10 md:py-36">
    <div class="mb-12 md:mb-16" data-reveal>
      <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"><span class="font-bold text-accent">${num}</span> / ${t.services.eyebrow}</p>
      <div class="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 class="font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">${sectionTitle('services')}</h2>
        <p class="max-w-xs text-sm leading-relaxed text-ink-soft">${t.services.desc}</p>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-x-10 md:grid-cols-2">
      ${services.map(renderService).join('')}
    </div>
    <div class="border-t border-line" data-reveal></div>
  </section>`;
}
