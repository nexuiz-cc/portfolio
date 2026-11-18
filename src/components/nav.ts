import { siteConfig } from '../site.config';
import { getLang, t } from '../i18n';

/** 言語切替（JA / EN）。現在の言語を太字で示す */
function renderLangToggle(dark = false): string {
  const lang = getLang();
  const base = dark ? 'text-paper' : 'text-ink';
  const btn = (code: 'ja' | 'en', label: string): string => `
        <button type="button" data-lang="${code}" aria-pressed="${lang === code}"
                class="${base} ${lang === code ? 'font-bold opacity-100' : 'opacity-40 hover:opacity-80'} transition-opacity duration-300">${label}</button>`;
  return `
      <div class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em]" role="group" aria-label="${t.nav.langSwitch}">
        ${btn('ja', 'JA')}
        <span class="${base} opacity-25" aria-hidden="true">/</span>
        ${btn('en', 'EN')}
      </div>`;
}

export function renderNav(active = 'home'): string {
  const { brand, nav } = siteConfig;

  const labels: Record<string, { main: string; sub: string }> = {
    home: { main: t.nav.home, sub: t.nav.homeEn },
    works: { main: t.nav.works, sub: t.nav.worksEn },
    about: { main: t.nav.about, sub: t.nav.aboutEn },
    contact: { main: t.nav.contact, sub: t.nav.contactEn },
  };

  const links = nav
    .map((l) => {
      const isActive = l.page === active;
      return `
        <a href="${l.href}" data-magnetic ${isActive ? 'aria-current="page"' : ''}
           class="nav-link font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
             isActive ? 'is-active text-ink' : 'text-ink-soft hover:text-ink'
           }">${labels[l.page]?.main ?? l.page}</a>`;
    })
    .join('');

  const mobileLinks = nav
    .map(
      (l, i) => `
        <a href="${l.href}"
           class="mobile-menu-link flex items-baseline gap-4 border-b border-line-light py-5 font-display text-4xl font-extrabold tracking-[-0.03em] text-paper">
          <span class="font-mono text-xs tracking-[0.2em] text-accent">0${i + 1}</span>
          <span>${labels[l.page]?.main ?? l.page}</span>
          <span class="font-mono text-xs tracking-[0.2em] text-paper/40">${labels[l.page]?.sub ?? ''}</span>
        </a>`,
    )
    .join('');

  return `
  <header id="site-nav" class="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-paper">
    <div class="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
      <a href="index.html" data-magnetic class="font-display text-xl font-extrabold tracking-[-0.02em] text-ink md:text-2xl">
        ${brand.name}<span class="align-super text-[0.5em]">®</span>
      </a>
      <nav class="hidden items-center gap-7 lg:flex" aria-label="${t.nav.mainNav}">${links}</nav>
      <div class="flex items-center gap-3 md:gap-4">
        <span class="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft xl:flex">
          <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full ${brand.available ? 'bg-accent' : 'bg-muted'}"></span>
          ${brand.available ? t.nav.available : t.nav.unavailable}
        </span>
        <span class="hidden lg:block">${renderLangToggle()}</span>
        <a href="contact.html" data-magnetic
           class="rounded-full border border-ink bg-ink px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:bg-transparent hover:text-ink md:px-5 md:py-2 md:text-[11px] md:tracking-[0.18em]">
          ${t.nav.cta}
        </a>
        <button id="menu-btn" aria-label="${t.nav.openMenu}" aria-expanded="false" aria-controls="mobile-menu"
                class="flex h-11 w-11 items-center justify-center lg:hidden">
          <span class="menu-icon relative block h-px w-6 bg-ink transition-all duration-300"></span>
        </button>
      </div>
    </div>
  </header>

  <div id="mobile-menu" aria-hidden="true"
       class="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-5 pb-10 pt-24">
    <nav class="flex flex-col" aria-label="${t.nav.mobileNav}">${mobileLinks}</nav>
    <div class="mt-10 flex items-center justify-between gap-4">
      <div class="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
        <span class="block">${brand.location}</span>
        <span class="mt-1 block">${brand.email}</span>
      </div>
      ${renderLangToggle(true)}
    </div>
  </div>`;
}
