/**
 * ─────────────────────────────────────────────────────────────
 * テンプレート設定ファイル（編集は原則このファイルだけで OK）
 *
 * 4 つのブロック:
 *   brand    サイト名 / ロゴ文言 / ヒーロー標語 / favicon / OG 画像 / 連絡先
 *   theme    配色プリセットの切替（acid / editorial / mono）
 *   nav      ナビゲーション項目と順序
 *   sections 各セクションの表示オン・オフとタイトル
 *
 * 作品・サービス・経歴などの「内容データ」は src/data/site.ts を編集。
 * 画面の文言（ボタン・ラベル類）は src/i18n/ja.ts / en.ts を編集。
 * ─────────────────────────────────────────────────────────────
 */

/** 配色プリセット名。CSS 変数の実体は src/index.css の [data-theme="..."] ブロック */
export type ThemePreset = 'acid' | 'editorial' | 'mono';

export interface SiteConfig {
  brand: {
    /** サイト名（® マークはテンプレート側で自動付与） */
    name: string;
    /** ヒーロー左上の 2 行コピー */
    tagline: [string, string];
    /** ブランドを一言で表す肩書き（OG / meta の補助文にも使用） */
    role: string;
    /** favicon パス（public/ 配下） */
    favicon: string;
    /** OG 画像。1200×630 推奨。公開時は絶対 URL に差し替えると確実 */
    ogImage: string;
    /** 連絡先メールアドレス */
    email: string;
    /** 拠点（フッター・モバイルメニューに表示） */
    location: string;
    /** 新規案件の受付状態。false にすると全站の表示が「停止中」に切り替わる */
    available: boolean;
  };
  theme: {
    /** 'acid'（黒 + 蛍光グリーン） | 'editorial'（オフ白 + 煉瓦色） | 'mono'（純粋な白黒） */
    preset: ThemePreset;
  };
  /** ナビゲーション。page はページ識別子（現在地ハイライトに使用）、並び順 = 表示順 */
  nav: Array<{ page: 'home' | 'works' | 'about' | 'contact'; href: string }>;
  /**
   * トップページのセクション構成。
   * enabled:false でセクションごと非表示に。番号（01 / 02 ...）は有効なセクションから自動採番される。
   * title は JA 版の表示名（EN 版は src/i18n/en.ts 側で管理）。
   */
  sections: {
    works: { enabled: boolean; title: string };
    services: { enabled: boolean; title: string };
    clients: { enabled: boolean; title: string };
    voices: { enabled: boolean; title: string };
    contact: { enabled: boolean; title: string };
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: 'YOUR NAME',
    tagline: ['動画、SNS コンテンツ、Web デザイン——', 'ひとりのデザイナーの全作品。'],
    role: 'ビジュアルデザイナー / Visual Designer',
    favicon: 'favicon.svg',
    // TODO: 本番公開時は自ドメインの絶対 URL（例: https://example.com/og.png）に差し替え
    ogImage: 'placeholder/og-cover_1200x630.svg',
    // TODO: 実際のメールアドレスに差し替え
    email: 'hello@example.com',
    // TODO: 実際の拠点に差し替え（例: 東京, 日本）
    location: '都市名, 国名',
    available: true,
  },
  theme: {
    preset: 'acid',
  },
  nav: [
    { page: 'home', href: 'index.html' },
    { page: 'works', href: 'works.html' },
    { page: 'about', href: 'about.html' },
    { page: 'contact', href: 'contact.html' },
  ],
  sections: {
    works: { enabled: true, title: '作品インデックス' },
    services: { enabled: true, title: 'できること' },
    clients: { enabled: true, title: '一緒に仕事をしたブランド' },
    voices: { enabled: true, title: 'お客様の声' },
    contact: { enabled: true, title: '話しましょう。' },
  },
};
