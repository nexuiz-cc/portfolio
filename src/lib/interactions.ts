import Lenis from 'lenis';
import { t } from '../i18n';
import { siteConfig } from '../site.config';

const reducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- スムーズスクロール ---------------- */

export function initSmoothScroll(): Lenis | null {
  if (reducedMotion()) return null;
  const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  const raf = (time: number): void => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function initAnchorScroll(lenis: Lenis | null): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e: MouseEvent) => {
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        // ナビ（64px）+ スティッキー目次（約 49px）+ 余白。見出しが隠れないようにする
        lenis.scrollTo(target, { offset: -124, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---------------- カスタムカーソル ---------------- */

export function initCursor(): void {
  if (reducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const view = document.createElement('div');
  view.className = 'cursor-view';
  const label = document.createElement('span');
  label.className = 'cursor-label';
  label.textContent = 'VIEW';
  view.appendChild(label);
  document.body.append(dot, view);
  // 初期化に成功してから初めてシステムカーソルを隠す（JS 失敗時のフォールバック）
  document.body.classList.add('has-custom-cursor');

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let vx = x;
  let vy = y;
  // 点は mix-blend-mode: difference のため transform を使えない。left/top で直接動かす
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;

  window.addEventListener('mousemove', (e: MouseEvent) => {
    x = e.clientX;
    y = e.clientY;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
  });

  // VIEW バッジだけわずかに遅れて追従（重みのある動き）
  const follow = (): void => {
    vx += (x - vx) * 0.18;
    vy += (y - vy) * 0.18;
    view.style.transform = `translate(${vx}px, ${vy}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  };
  follow();

  // イベント委譲で hover 状態を管理（動的に挿入される要素にも有効）
  const HOVER_SELECTOR = 'a, button, [data-cursor]';
  const INPUT_SELECTOR = 'input, textarea, select, [contenteditable="true"]';
  document.addEventListener('pointerover', (e: PointerEvent) => {
    if (!(e.target instanceof Element)) return;
    // 入力領域では点を消し、テキストカーソルに任せる
    if (e.target.closest(INPUT_SELECTOR)) {
      view.classList.remove('is-visible');
      dot.classList.remove('is-active');
      dot.classList.add('is-hidden');
      return;
    }
    const el = e.target.closest(HOVER_SELECTOR);
    if (!el) return;
    if (el.closest('[data-cursor="view"]')) {
      view.classList.add('is-visible');
      dot.classList.add('is-hidden');
      dot.classList.remove('is-active');
    } else {
      dot.classList.add('is-active');
    }
  });
  document.addEventListener('pointerout', (e: PointerEvent) => {
    if (!(e.target instanceof Element)) return;
    const scope = e.target.closest(`${INPUT_SELECTOR}, ${HOVER_SELECTOR}`);
    if (!scope) return;
    // 同一要素内の子要素間を移動するだけなら解除しない
    if (e.relatedTarget instanceof Node && scope.contains(e.relatedTarget)) return;
    view.classList.remove('is-visible');
    dot.classList.remove('is-hidden', 'is-active');
  });
}

/* ---------------- スクロールリビール ---------------- */

export function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window) || reducedMotion()) {
    targets.forEach((t) => t.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: '0px' },
  );
  targets.forEach((t) => io.observe(t));
}

/* ---------------- Hero スクロールパララックス ---------------- */

/** 注目作品グリッドをわずかに下げ、上部コピーをフェードアウト。transform/opacity のみ、rAF でスロットル */
export function initHeroParallax(): void {
  if (reducedMotion()) return;
  const hero = document.getElementById('top');
  if (!hero) return;
  const grid = hero.querySelector<HTMLElement>('[data-hero-grid]');
  const tagline = hero.querySelector<HTMLElement>('h1');
  if (!grid) return;

  let ticking = false;
  const update = (): void => {
    ticking = false;
    const y = window.scrollY;
    if (y > window.innerHeight * 1.2) return;
    grid.style.transform = `translateY(${(y * 0.04).toFixed(1)}px)`;
    if (tagline) tagline.style.opacity = String(Math.max(0, 1 - y / 480));
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
}

/* ---------------- Hero 入場 ---------------- */

export function initHeroIntro(): void {
  const hero = document.getElementById('top');
  const sticker = document.getElementById('hero-sticker');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hero?.classList.add('hero-in');
      sticker?.classList.remove('opacity-0');
    });
  });
}

/* ---------------- 数字カウンター ---------------- */

export function initCounters(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!els.length) return;

  const run = (el: HTMLElement): void => {
    const target = Number(el.dataset.counter ?? '0');
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number): void => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    if (reducedMotion()) {
      el.textContent = String(target);
      return;
    }
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------------- スキルバー ---------------- */

export function initSkillBars(): void {
  const bars = document.querySelectorAll<HTMLElement>('[data-skill]');
  if (!bars.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.width = `${el.dataset.skill ?? '0'}%`;
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );
  bars.forEach((b) => io.observe(b));
}

/* ---------------- マグネティック要素 ---------------- */

export function initMagnetic(): void {
  if (reducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

/* ---------------- ナビゲーション ---------------- */

export function initNav(lenis: Lenis | null): void {
  const nav = document.getElementById('site-nav');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;
  let lastFocused: HTMLElement | null = null;

  const onScroll = (): void => {
    if (!nav) return;
    if (window.scrollY > 24) {
      nav.classList.add('bg-paper/85', 'backdrop-blur-md', 'border-b', 'border-line');
    } else {
      nav.classList.remove('bg-paper/85', 'backdrop-blur-md', 'border-b', 'border-line');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = (open: boolean): void => {
    menuOpen = open;
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.toggle('menu-open', open);
    nav?.classList.toggle('is-menu-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? t.nav.closeMenu : t.nav.openMenu);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      lenis?.stop();
      lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      mobileMenu.querySelector<HTMLElement>('a')?.focus();
    } else {
      lenis?.start();
      (lastFocused ?? menuBtn).focus();
    }
  };

  menuBtn?.addEventListener('click', () => setMenu(!menuOpen));
  mobileMenu?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setMenu(false));
  });

  // ESC で閉じる + Tab のフォーカストラップ
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!menuOpen || !mobileMenu) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setMenu(false);
      return;
    }
    if (e.key !== 'Tab') return;
    const items = Array.from(
      mobileMenu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* ---------------- お問い合わせフォーム ---------------- */

interface ContactResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export function initContactForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('contact-submit') as HTMLButtonElement | null;
  const label = submitBtn?.querySelector<HTMLElement>('[data-submit-label]');
  if (!form || !status || !submitBtn || !label) return;

  form.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !message) {
      status.textContent = t.form.required;
      status.style.color = '#FF8A5C';
      return;
    }

    submitBtn.disabled = true;
    label.textContent = t.form.sending;
    status.textContent = '';
    status.style.color = '';

    try {
      // GitHub Pages 等の静的ホスティングでは /api/contact が存在しないため、
      // ネットワーク失敗・404 を検知したらメール作成画面へフォールバックする
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      }).catch(() => null);

      if (!res || res.status === 404 || res.status === 405) {
        const subject = encodeURIComponent(`[Portfolio] ${name}`);
        const body = encodeURIComponent(`${message}\n\n—\n${name} <${email}>`);
        status.textContent = t.form.mailto;
        status.style.color = '';
        label.textContent = t.contactPage.fields.submit;
        window.location.href = `mailto:${siteConfig.brand.email}?subject=${subject}&body=${body}`;
        return;
      }

      const json = (await res.json()) as ContactResponse;
      if (res.ok && json.success) {
        label.textContent = t.form.sent;
        status.textContent = json.message ?? t.form.success;
        status.style.color = 'var(--accent)';
        form.reset();
        setTimeout(() => {
          label.textContent = t.contactPage.fields.submit;
        }, 4000);
      } else {
        throw new Error(json.error ?? t.form.error);
      }
    } catch (err) {
      label.textContent = t.contactPage.fields.submit;
      status.textContent = err instanceof Error ? err.message : t.form.network;
      status.style.color = '#FF8A5C';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ---------------- フッター ---------------- */

export function initFooter(lenis: Lenis | null): void {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const timeEl = document.getElementById('footer-time');
  const updateTime = (): void => {
    if (!timeEl) return;
    timeEl.textContent = new Date().toLocaleTimeString(t.meta.locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Tokyo',
    });
  };
  updateTime();
  window.setInterval(updateTime, 30000);

  document.getElementById('back-to-top')?.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------- 初期化エントリー ---------------- */

export function initInteractions(): void {
  const lenis = initSmoothScroll();
  initAnchorScroll(lenis);
  initCursor();
  initReveal();
  initHeroIntro();
  initHeroParallax();
  initCounters();
  initSkillBars();
  initMagnetic();
  initNav(lenis);
  initContactForm();
  initFooter(lenis);
}
