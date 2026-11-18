/* Edition 詳細ページ式セクション骨組み：TOC アンカー + セクション + Notes 脚注 */
import { t } from '../i18n';

export interface TocItem {
  id: string;
  index: string;
  label: string;
}

/** 上部／スティッキー目次ナビ（モバイルは横スクロール可） */
export function renderToc(items: TocItem[]): string {
  const links = items
    .map(
      (item) => `
      <a href="#${item.id}"
         class="group flex shrink-0 items-baseline gap-2 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-ink">
        <span class="text-[9px] tracking-[0.2em] text-accent">${item.index}</span>
        <span class="u-sweep">${item.label}</span>
      </a>`,
    )
    .join('');

  return `
  <nav aria-label="${t.aria.toc}"
       class="sticky top-16 z-30 border-y border-line bg-paper/95 px-5 backdrop-blur md:top-20 md:px-10">
    <div class="flex gap-6 overflow-x-auto md:gap-10">${links}</div>
  </nav>`;
}

export interface ChapterOptions {
  id: string;
  index: string;
  title: string;
  body: string;
}

/** セクションブロック：左に番号＋見出し、右に内容、hairline で区切る（Edition 詳細ページの feature ブロックに準拠） */
export function renderChapter({ id, index, title, body }: ChapterOptions): string {
  return `
  <section id="${id}" class="grid scroll-mt-36 grid-cols-1 gap-8 border-t border-line px-5 py-14 md:grid-cols-12 md:gap-10 md:px-10 md:py-20" data-reveal>
    <div class="md:col-span-4 lg:col-span-3">
      <p class="font-mono text-[11px] font-bold tracking-[0.24em] text-accent">${index}</p>
      <h2 class="mt-3 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] md:text-[2rem]">${title}</h2>
    </div>
    <div class="md:col-span-8 lg:col-span-8">${body}</div>
  </section>`;
}

/** セクション画像 + 任意のキャプション */
export function renderChapterImage(src: string, alt: string, caption?: string): string {
  return `
  <figure class="mt-8">
    <img src="${src}" alt="${alt}" loading="lazy" decoding="async"
         width="1600" height="1000" class="aspect-[16/10] w-full object-cover" />
    ${caption ? `<figcaption class="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">${caption}</figcaption>` : ''}
  </figure>`;
}

/** Notes 番号付き脚注リスト（Edition 詳細ページの Notes スタイルに準拠） */
export function renderNotes(notes: string[]): string {
  return `
  <div class="border-t border-line pt-6">
    <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">Notes</p>
    <ol class="mt-5 space-y-3">
      ${notes
        .map(
          (n, i) => `
        <li class="flex items-baseline gap-4 text-[13px] leading-[1.7] text-ink-soft">
          <span class="shrink-0 font-mono text-[10px] tracking-[0.14em] text-muted">[${i + 1}]</span>
          <span>${n}</span>
        </li>`,
        )
        .join('')}
    </ol>
  </div>`;
}

/** 本文段落スタイル（セクション内の説明文） */
export function renderParagraphs(texts: string[]): string {
  return texts
    .map((p) => `<p class="max-w-[62ch] text-[15px] leading-[1.85] text-ink-soft [&:not(:first-child)]:mt-5">${p}</p>`)
    .join('');
}
