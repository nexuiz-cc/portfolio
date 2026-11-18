/**
 * 日本語辞書 —— 画面の UI 文言（ボタン・ラベル・aria・フォーム状態）をすべてここに集約。
 * 作品タイトル等の「コンテンツ」は src/data/site.ts、セクション名は src/site.config.ts で管理。
 */
export const ja = {
  meta: { htmlLang: 'ja', locale: 'ja-JP' },

  nav: {
    home: 'ホーム',
    works: '作品',
    about: 'プロフィール',
    contact: 'お問い合わせ',
    homeEn: 'HOME',
    worksEn: 'WORKS',
    aboutEn: 'ABOUT',
    contactEn: 'CONTACT',
    cta: 'お問い合わせ',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    mainNav: 'メインナビ',
    mobileNav: 'モバイルナビ',
    available: 'Open for work',
    unavailable: '受付停止中',
    availability: '新規案件 受付中',
    availabilityClosed: '新規案件の受付を停止しています',
    replyNote: '返信まで 24 時間以内',
    langSwitch: '言語を切り替える',
  },

  hero: {
    view: '見る',
    viewWork: '作品を見る',
    featuredLabel: '注目の作品',
    seeAll: 'すべての作品を見る',
  },

  works: {
    eyebrow: 'Works by Category',
    title: '作品インデックス',
    desc: '4 つのジャンル：YouTube 動画、Instagram ビジュアル、TikTok ショート動画、Web デザイン——各項目をクリックして詳細へ。',
    filterAll: 'すべて',
    viewAll: 'すべて見る',
  },

  worksPage: {
    eyebrow: 'Works / Archive',
    title: '作品アーカイブ',
    sub: '動画・SNS・Web デザインの 4 ジャンルの作品をカテゴリ別に展示。タグで絞り込み、項目をクリックして詳細へ。',
  },

  services: {
    eyebrow: 'Services',
    title: 'できること',
    desc: '短距離走のような LP 一本から、ブランドのデジタル基盤全体まで——4 つの協働のかたち、基準はひとつ。',
  },

  clients: {
    eyebrow: 'Clients',
    title: '一緒に仕事をしたブランド',
  },

  voices: {
    eyebrow: 'Voices',
    title: 'お客様の声',
    desc: 'クライアントとパートナーの言葉、そのまま。検証できる信頼は、自画自賛より雄弁です。',
    challenge: '課題',
    action: '打ち手',
    result: '結果',
  },

  cta: {
    eyebrow: 'Contact',
    title: '話しましょう。',
    sub: '新規案件を受け付けています。いちばん早いのはメール——2〜3 行の概要で十分です。',
    button: 'お問い合わせへ',
  },

  contactPage: {
    eyebrow: 'Contact — お問い合わせ',
    titleA: '話しま',
    titleB: 'しょう',
    lede: '芽生えたばかりのアイデアがある？語り直したいブランドがある？数行のメッセージをどうぞ。',
    toc: { message: 'メッセージを送る', flow: '進め方', elsewhere: 'その他の方法' },
    chapters: { message: 'メッセージを送る', flow: '進め方', elsewhere: 'その他の方法' },
    steps: [
      { name: 'ヒアリング', desc: '目的・予算・スケジュールを 30 分のオンライン会議で整理します。' },
      { name: '企画・初稿', desc: '方向性と初稿を 1〜2 週間で提示。ラフな段階で認識を合わせます。' },
      { name: '制作・納品', desc: '修正を重ねて仕上げ、納品物と運用の手引きをお渡しします。' },
    ],
    fields: {
      name: 'お名前',
      email: 'メールアドレス',
      message: 'ご相談内容',
      namePh: 'お名前をどうぞ',
      emailPh: 'name@example.com',
      messagePh: 'プロジェクトの背景、予算、希望時期……具体的なほど助かります',
      submit: '送信する',
    },
    orMail: 'または直接メールで',
  },

  aboutPage: {
    eyebrow: 'About — プロフィール',
    lede: '作品と同じくらい、人となりを知ってもらうためのページ。',
    toc: { intro: '紹介', skills: 'スキル', numbers: '数字', journey: '経歴', reach: '連絡' },
    chapters: { intro: '紹介', skills: 'スキル', numbers: '数字', journey: '経歴', reach: '連絡' },
    figs: { portrait: 'ポートレート' },
    reachText: '形になりかけのアイデアがある、あるいはただ挨拶をしたいだけ——メールをください。',
  },

  projectPage: {
    backToIndex: 'インデックスへ戻る',
    visitWeb: 'サイトを見る',
    visitOn: '{label} で見る',
    chapters: { overview: '概要', process: 'プロセス', outcome: '成果', next: '次のプロジェクト' },
    figs: { cover: 'カバービジュアル', process: 'プロセスと探索', final: '最終形' },
    notes: {
      client: 'クライアント',
      role: '担当',
      year: '年',
      platform: 'プラットフォーム',
      yearPlatform: '年・プラットフォーム',
      category: 'カテゴリ',
      categoryNote: '全作品は 4 ジャンル構成',
    },
    nextProject: '次のプロジェクト',
  },

  form: {
    required: 'すべての項目を入力してください',
    sending: '送信中…',
    sent: '送信完了 ✓',
    success: 'ありがとうございます。24 時間以内に返信します。',
    error: '送信に失敗しました',
    network: 'ネットワークエラーです。しばらくしてから再度お試しください',
    mailto: 'メール作成画面を開きました。そのまま送信してください。',
  },

  footer: {
    backTop: 'トップへ戻る',
    localTime: '現地時刻',
    navAria: 'フッターナビ',
    socialHeading: 'SNS —',
    note: 'Designed & built with restraint. One accent color is enough.',
  },

  aria: {
    toc: '章の目次',
    filter: 'カテゴリで絞り込む',
  },
};

/** 辞書の型（en.ts はこの形に完全に合わせる） */
export type Dict = typeof ja;
