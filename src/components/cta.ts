import { siteConfig } from '../site.config';
import { sectionTitle, t } from '../i18n';

/** トップ下部のお問い合わせ導線（ダークセクション、お問い合わせページへ遷移）
 *  @param num セクション番号（自動採番） */
export function renderCtaSection(num: string): string {
  const { email } = siteConfig.brand;
  return `
  <section class="bg-ink px-5 py-24 text-paper md:px-10 md:py-36">
    <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40" data-reveal><span class="font-bold text-accent">${num}</span> / ${t.cta.eyebrow}</p>
    <div class="mt-6 flex flex-wrap items-end justify-between gap-10">
      <h2 class="font-display text-[clamp(2.8rem,9vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]" data-reveal>
        ${sectionTitle('contact')}
      </h2>
      <div class="flex flex-col items-start gap-6 pb-3" data-reveal style="--reveal-delay: 120ms">
        <p class="max-w-xs text-[15px] leading-[1.8] text-paper/60">
          ${t.cta.sub}
        </p>
        <a href="contact.html" data-magnetic
           class="group inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-transform duration-300 ease-paper hover:scale-[1.03] active:scale-[0.98]">
          ${t.cta.button}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="mailto:${email}" class="u-sweep font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-paper">
          ${email}
        </a>
      </div>
    </div>
  </section>`;
}
