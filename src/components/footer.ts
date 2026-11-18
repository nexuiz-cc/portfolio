import { siteConfig } from '../site.config';
import { socials } from '../data/site';
import { t } from '../i18n';

export function renderFooter(): string {
  const { brand, nav } = siteConfig;

  const links = nav
    .map(
      (l) => `
      <a href="${l.href}" data-nav-link class="u-sweep font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60 transition-colors duration-300 hover:text-paper">${t.nav[l.page]}</a>`,
    )
    .join(' ');

  // SNS 直リンク（テキストリンク。URL は site.ts の socials で管理）
  const socialLinks = socials
    .map(
      (s) => `
        <a href="${s.url}" target="_blank" rel="noopener"
           class="u-sweep font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60 transition-colors duration-300 hover:text-paper">${s.label} ↗</a>`,
    )
    .join('');

  return `
  <footer class="border-t border-line-light bg-ink px-5 pb-8 pt-16 text-paper md:px-10 md:pt-24">
    <div class="flex flex-wrap items-end justify-between gap-8">
      <p class="font-display text-[clamp(3rem,11vw,10rem)] font-extrabold leading-[0.9] tracking-[-0.03em] text-paper/95" data-reveal>
        ${brand.name}<span class="align-super text-[0.18em] text-paper/50">®</span>
      </p>
      <button id="back-to-top" data-magnetic aria-label="${t.footer.backTop}"
              class="group flex h-16 w-16 items-center justify-center rounded-full border border-line-light text-paper transition-colors duration-300 hover:border-accent hover:text-accent md:h-20 md:w-20">
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="transition-transform duration-500 ease-paper group-hover:-translate-y-1">
          <path d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="mt-14 flex flex-col gap-6 border-t border-line-light pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40 md:flex-row md:items-center md:justify-between">
      <span>© <span id="footer-year">2025</span> ${brand.name} — ${brand.role}</span>
      <nav class="flex flex-wrap gap-x-6 gap-y-3" aria-label="${t.footer.navAria}">${links}</nav>
      <span>${t.footer.localTime} <span id="footer-time" class="text-paper/70">--:--</span></span>
    </div>
    <div class="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-3 border-t border-line-light pt-6">
      <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">${t.footer.socialHeading}</span>
      ${socialLinks}
    </div>
    <p class="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/25">${t.footer.note}</p>
  </footer>`;
}
