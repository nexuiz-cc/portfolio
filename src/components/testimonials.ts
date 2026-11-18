import { testimonials, type Testimonial } from '../data/site';
import { sectionTitle, t } from '../i18n';

/** 課題 → 打ち手 → 結果 の 3 段構成（小ラベル + 完成文） */
function renderQuote(item: Testimonial, i: number): string {
  const featured = i === 0;
  const row = (label: string, text: string): string => `
      <div class="grid grid-cols-[4.5rem_1fr] gap-3 border-t border-line py-4 md:grid-cols-[5rem_1fr]">
        <span class="pt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">${label}</span>
        <p class="text-[15px] font-medium leading-[1.7] text-ink ${featured ? 'md:text-lg' : ''}">${text}</p>
      </div>`;

  return `
  <figure class="flex flex-col justify-between ${featured ? 'md:col-span-7' : 'md:col-span-5'}"
          data-reveal style="--reveal-delay: ${i * 100}ms">
    <blockquote>
      ${row(t.voices.challenge, item.challenge)}
      ${row(t.voices.action, item.action)}
      ${row(t.voices.result, item.result)}
    </blockquote>
    <figcaption class="mt-8 flex items-center gap-4">
      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-paper">${item.name.slice(0, 1)}</span>
      <span>
        <span class="block text-sm font-semibold text-ink">${item.name}</span>
        <span class="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">${item.role}</span>
      </span>
    </figcaption>
  </figure>`;
}

/** @param num セクション番号（自動採番） */
export function renderVoicesSection(num: string): string {
  return `
  <section class="px-5 py-24 md:px-10 md:py-36">
    <div class="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16" data-reveal>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"><span class="font-bold text-accent">${num}</span> / ${t.voices.eyebrow}</p>
        <h2 class="mt-4 font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">${sectionTitle('voices')}</h2>
      </div>
      <p class="max-w-xs text-sm leading-relaxed text-ink-soft">${t.voices.desc}</p>
    </div>
    <div class="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-12">
      ${testimonials.map(renderQuote).join('')}
    </div>
  </section>`;
}
