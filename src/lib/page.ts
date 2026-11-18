import '../index.css';
import { siteConfig } from '../site.config';
import { applyLang, initLangToggle } from '../i18n';
import { renderNav } from '../components/nav';
import { renderFooter } from '../components/footer';
import { initInteractions } from './interactions';

/**
 * サブページ共通アセンブラ：ナビ + ページ内容 + フッター + インタラクション初期化
 * マウント時にテーマ（data-theme）と言語（<html lang>）を適用する。
 * @param active 現在ページ識別子（ナビのハイライト用）：home / works / about / contact
 * @param sections ページ本文 HTML（順に連結）
 */
export function mountPage(active: string, sections: string[]): void {
  const app = document.getElementById('app');
  if (!app) {
    console.error('App element not found');
    return;
  }
  document.documentElement.dataset.theme = siteConfig.theme.preset;
  applyLang();
  app.innerHTML = [
    renderNav(active),
    '<main>',
    ...sections,
    '</main>',
    renderFooter(),
    '<div class="grain" aria-hidden="true"></div>',
  ].join('');
  initInteractions();
  initLangToggle();
}
