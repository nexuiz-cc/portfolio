/**
 * 言語ランタイム —— ja / en 二言語切替。
 * 言語設定は localStorage('portfolio-lang') に保存し、切替時にページを再読み込みする。
 */
import { siteConfig } from '../site.config';
import { ja, type Dict } from './ja';
import { en } from './en';

export type Lang = 'ja' | 'en';

const STORAGE_KEY = 'portfolio-lang';

const DICTS: Record<Lang, Dict> = { ja, en };

/** 現在の言語を解決（既定: 日本語） */
export function getLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ja') return saved;
  } catch {
    /* localStorage が使えない環境では既定にフォールバック */
  }
  return 'ja';
}

/** 現在言語の辞書。コンポーネントは描画時にこれを読む */
export const t: Dict = DICTS[getLang()];

/** セクションタイトル（JA は site.config.ts、EN は辞書から） */
export function sectionTitle(key: 'works' | 'services' | 'clients' | 'voices' | 'contact'): string {
  if (getLang() === 'ja') return siteConfig.sections[key].title;
  const enTitles: Record<typeof key, string> = {
    works: en.works.title,
    services: en.services.title,
    clients: en.clients.title,
    voices: en.voices.title,
    contact: en.cta.title,
  };
  return enTitles[key];
}

/** 言語切替を反映（<html lang>）。page.ts のマウント時に一度呼ぶ */
export function applyLang(): void {
  document.documentElement.lang = t.meta.htmlLang;
}

/** ヘッダーの言語切替ボタンを配線 */
export function initLangToggle(): void {
  document.querySelectorAll<HTMLElement>('[data-lang]').forEach((el) => {
    el.addEventListener('click', () => {
      const lang = el.dataset.lang;
      if (lang !== 'ja' && lang !== 'en') return;
      if (lang === getLang()) return;
      try {
        window.localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* 保存できなくても切替は試みる */
      }
      window.location.reload();
    });
  });
}
