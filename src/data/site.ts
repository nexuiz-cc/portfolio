/**
 * サイトコンテンツ —— 作品・サービス・経歴などの「中身」はすべてこのファイル。
 * 文言の雛形は完成品トーンで書かれているので、名詞と数字を自分のものに差し替えるだけで使えます。
 *
 * 使い方の目安:
 *   - 作品を追加 → projects 配列にエントリを 1 つコピペして書き換える（末尾の例を参照）
 *   - ブランド名・連絡先・配色などの「設定」 → src/site.config.ts
 *   - ボタンやラベルの文言（日英） → src/i18n/ja.ts / en.ts
 */

// ── 型 ──────────────────────────────────────────────────────

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  bio: string[];
  portraitSeed: string;
}

export type CategoryId = 'youtube' | 'instagram' | 'tiktok' | 'web';

export interface Category {
  id: CategoryId;
  label: string;
  en: string;
  count: string;
}

export interface Project {
  /** URL 用の一意なスラッグ（/project?id=ここの値） */
  id: string;
  cat: CategoryId;
  year: string;
  title: string;
  /** 一覧行の右側に出る短い説明（20〜40 字程度） */
  desc: string;
  client: string;
  role: string;
  platform: string;
  platformUrl: string;
  coverSeed: string;
  gallerySeeds: [string, string];
  paragraphs: string[];
  /** 成果数字。ヒーローの注目作品にだけ表示（例: '120万回再生 / 3か月'） */
  metrics?: string;
}

export interface Service {
  title: string;
  en: string;
  desc: string;
  tags: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  /** 課題 → 打ち手 → 結果 の 3 段構成（そのまま差し替えて使う） */
  challenge: string;
  action: string;
  result: string;
  name: string;
  role: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Social {
  label: string;
  url: string;
}

export interface Stat {
  /** 数字部分（カウントアップ対象） */
  value: number;
  /** 単位・記号（例: 年 / + / 拠点） */
  suffix: string;
  label: string;
}

// ── 画像ヘルパー ─────────────────────────────────────────────
/**
 * プレースホルダー画像（public/placeholder/ 配下の静的 SVG を参照）。
 * 内容データ（作品の追加・削除など）を変えたら `pnpm gen:placeholders` で再生成する。
 * 実際の写真・サムネイルに差し替える場合は、ここで public/ 配下の任意パスを返すよう書き換える。
 */
export function img(seed: string, w: number, h: number, v?: CategoryId): string {
  return `placeholder/${seed}_${w}x${h}${v ? `_${v}` : ''}.svg`;
}

// ── プロフィール ─────────────────────────────────────────────
export const profile: Profile = {
  name: 'YOUR NAME',
  role: 'ビジュアルデザイナー',
  location: '都市名, 国名',
  email: 'hello@example.com',
  bio: [
    '動画・SNS・Web を横断してビジュアルを設計するデザイナー。チャンネル運用からブランドサイトの構築まで、企画と制作を一貫して担当する。',
    '強みは「編集」の視点——散らかった素材や情報を整理し、一本の筋の通った表現に仕立てること。派手さより、伝わることを優先する。',
  ],
  portraitSeed: 'portrait-main',
};

// ── カテゴリ ─────────────────────────────────────────────────
export const categories: Category[] = [
  { id: 'youtube', label: 'YouTube 動画', en: 'YouTube', count: '02' },
  { id: 'instagram', label: 'Instagram', en: 'Instagram', count: '02' },
  { id: 'tiktok', label: 'TikTok ショート', en: 'TikTok', count: '02' },
  { id: 'web', label: 'Web デザイン', en: 'Web Design', count: '02' },
];

// ── 作品 ─────────────────────────────────────────────────────
/**
 * 新しい作品の追加方法 —— 下のブロックをコピーして配列の先頭に貼り、値を書き換えるだけ。
 * 並び順がそのまま表示順（先頭がヒーローの注目作品）。件数の番号 (08) は自動で数え直される。
 *
 * {
 *   id: 'p9',                                  // URL 用スラッグ（他と重複しない半角英数）
 *   cat: 'youtube',                            // youtube | instagram | tiktok | web
 *   year: '2026',
 *   title: '作品タイトル',
 *   desc: '一覧に出る短い説明文。',
 *   client: 'クライアント名',
 *   role: '企画・撮影・編集',
 *   platform: 'YouTube',
 *   platformUrl: '#',                          // TODO: 実際の URL に差し替え
 *   coverSeed: 'my-cover',                     // 画像の素となる任意の文字列（変えると絵が変わる）
 *   gallerySeeds: ['my-gallery-1', 'my-gallery-2'],
 *   paragraphs: ['概要の段落。', 'プロセスの段落。', '成果の段落。'],
 *   metrics: '120万回再生 / 3か月',            // 任意：ヒーローの注目作品に出す成果数字
 * },
 */
export const projects: Project[] = [
  {
    id: 'p1',
    cat: 'youtube',
    year: '2025',
    title: 'ブランドドキュメンタリー「原点」',
    desc: '創業 10 年のものづくり企業に密着した 20 分のブランドフィルム。',
    client: '株式会社あおぞら工業',
    role: '企画・撮影・編集',
    platform: 'YouTube',
    platformUrl: '#', // TODO: 実際の URL に差し替え
    coverSeed: 'cover-p1',
    gallerySeeds: ['gallery-p1-a', 'gallery-p1-b'],
    paragraphs: [
      '創業から 10 年を迎えるものづくり企業の「原点」を描くブランドドキュメンタリー。社史をたどる構成ではなく、現場で働く人々の日常にカメラを向け、企業の芯にある姿勢を浮かび上がらせる構成を採った。',
      '撮影は 3 日間の密着取材。インタビューはあえて台本を用意せず、雑談の中から言葉を引き出す手法を選んだ。編集では 20 分という尺の中に「静かな感動」を設計し、BGM は環境音と最小限のピアノに絞った。',
      '公開から 3 か月で 120 万回再生を記録し、チャンネル登録者は 1.8 倍に増加。採用ページ経由のエントリー数も前年比 140% に伸び、経営層から「会社を語る上での共通言語になった」と評価された。',
    ],
    metrics: '120万回再生 / 3か月',
  },
  {
    id: 'p2',
    cat: 'web',
    year: '2025',
    title: 'コーポレートサイト リニューアル',
    desc: '老舗食品メーカーのサイトを情報設計から作り直し。',
    client: '株式会社ひだまり食品',
    role: 'アートディレクション・デザイン',
    platform: 'Web',
    platformUrl: '#', // TODO: 実際の URL に差し替え
    coverSeed: 'cover-p2',
    gallerySeeds: ['gallery-p2-a', 'gallery-p2-b'],
    paragraphs: [
      '創業 70 年の食品メーカーのコーポレートサイトリニューアル。「会社案内」としての役割を脱却し、ブランドの世界観を伝えるメディアとして再設計した。',
      '情報アーキテクチャをゼロから整理し直し、商品・歴史・採用の 3 軸で構成。タイポグラフィを主役に据え、余白を大胆に取ることで、老舗らしい落ち着きと現代的な軽やかさを両立させた。',
      'リニューアル後、平均滞在時間は 2.1 倍、直帰率は 35% 改善。採用エントリーの質も向上し「サイトを見て応募した」という声が面接で定番になった。',
    ],
    metrics: '平均滞在時間 2.1倍',
  },
  {
    id: 'p3',
    cat: 'instagram',
    year: '2024',
    title: 'カフェブランド ビジュアル統一',
    desc: '投稿テンプレートを 3 型に整理し、世界観を一本化。',
    client: 'KITASANDO COFFEE',
    role: 'アートディレクション',
    platform: 'Instagram',
    platformUrl: '#', // TODO: 実際の URL に差し替え
    coverSeed: 'cover-p3',
    gallerySeeds: ['gallery-p3-a', 'gallery-p3-b'],
    paragraphs: [
      '都内 3 店舗のカフェブランドの Instagram アカウント。投稿ごとにトーンがバラバラで、ブランドの認知が伸び悩んでいた。',
      '投稿テンプレートを「商品」「空気」「人」の 3 型に整理し、撮影の光源と色温度をマニュアル化。運用フローも再設計し、店舗スタッフが撮影しても統一感が保てる仕組みを作った。',
      '3 か月で保存数が 2.4 倍、フォロワーは 1.6 倍に増加。「Instagram を見て来店した」という客が週末の新規客の約 4 割を占めるようになった。',
    ],
    metrics: '保存数 2.4倍 / 3か月',
  },
  {
    id: 'p4',
    cat: 'tiktok',
    year: '2024',
    title: 'ショート動画シリーズ「1分レシピ」',
    desc: '縦型 60 秒の料理動画を 30 本シリーズで制作。',
    client: '株式会社みのりフーズ',
    role: '企画・撮影・編集',
    platform: 'TikTok',
    platformUrl: '#', // TODO: 実際の URL に差し替え
    coverSeed: 'cover-p4',
    gallerySeeds: ['gallery-p4-a', 'gallery-p4-b'],
    paragraphs: [
      '食品メーカーの商品認知を目的とした縦型ショート動画シリーズ。「1 分で作れるアレンジレシピ」をコンセプトに 30 本を制作した。',
      '冒頭 3 秒で完成形を見せる構成、テロップは調理手順と分量のみに絞り、音は調理音を活かした ASMR 寄りの設計に。撮影は 1 日 10 本ペースで回し、編集テンプレートを先に作り込むことで量産を可能にした。',
      'シリーズ累計 800 万再生を突破し、うち 2 本が 100 万再生超え。EC サイトの該当商品ページへの流入が 3 倍になり、季節限定の追加シリーズの制作が決まった。',
    ],
    metrics: '累計 800万回再生',
  },
  {
    id: 'p5',
    cat: 'youtube',
    year: '2024',
    title: 'プロダクトローンチ動画',
    desc: '新製品発表のキービジュアル動画を制作。',
    client: 'HIKARI TECH 株式会社',
    role: 'モーションデザイン・編集',
    platform: 'YouTube',
    platformUrl: '#', // TODO: 実際の URL に差し替え
    coverSeed: 'cover-p5',
    gallerySeeds: ['gallery-p5-a', 'gallery-p5-b'],
    paragraphs: [
      'スタートアップの新製品発表に合わせた 90 秒のローンチ動画。実写撮影の予算が限られていたため、CG とモーショングラフィックスを主軸に据えた。',
      '製品の 3D データを基に、光と影だけで質感を伝える演出を設計。音楽はエレクトロニックで統一し、テキストアニメーションは製品の UI フォントと揃えて「画面の中の製品」と「映像」の一体感を作った。',
      '発表イベントでの放映後、YouTube 公開版は 2 週間で 30 万回再生。プレスリリースと合わせてメディア掲載 12 件を獲得し、予約販売の初日目標を 160% で達成した。',
    ],
  },
  {
    id: 'p6',
    cat: 'web',
    year: '2024',
    title: 'イベント特設サイト',
    desc: '音楽イベントの告知サイトを 2 週間で制作。',
    client: 'MIDORI FES 実行委員会',
    role: 'デザイン・実装',
    platform: 'Web',
    platformUrl: '#', // TODO: 実際の URL に差し替え
    coverSeed: 'cover-p6',
    gallerySeeds: ['gallery-p6-a', 'gallery-p6-b'],
    paragraphs: [
      '初開催の音楽イベントの告知サイト。発表から開催まで 2 か月しかなく、サイト制作に割ける期間は実質 2 週間だった。',
      '1 ページ完結の構成とし、タイムテーブルと出演者情報を最優先に。ビジュアルはポスターのキービジュアルをそのまま引き継ぎ、アニメーションは最低限に抑えて表示速度を優先した。',
      '公開から 1 か月で 12 万 PV を記録し、チケットは開催 2 週間前に完売。「サイトがかっこよかったから行くことにした」という SNS の投稿が多数見られた。',
    ],
  },
  {
    id: 'p7',
    cat: 'instagram',
    year: '2023',
    title: 'プロダクトキャンペーン「季節の手帖」',
    desc: '季節ごとの投稿キャンペーンを年間で設計。',
    client: '株式会社くらし日和',
    role: '企画・アートディレクション',
    platform: 'Instagram',
    platformUrl: '#', // TODO: 実際の URL に差し替え
    coverSeed: 'cover-p7',
    gallerySeeds: ['gallery-p7-a', 'gallery-p7-b'],
    paragraphs: [
      '生活雑貨ブランドの年間キャンペーン「季節の手帖」。春夏秋冬それぞれの季節に合わせたビジュアル企画と投稿設計を担当した。',
      '季節ごとにキーカラーと撮影シチュエーションを設定し、ブランドの既存資産（商品写真）を再編集して使い回す効率的な運用設計も同時に構築した。',
      '年間を通じてアカウントのエンゲージメント率は平均 4.2% を維持し、キャンペーン期間中の EC 売上は前年比 118%。翌年度の継続契約につながった。',
    ],
  },
  {
    id: 'p8',
    cat: 'tiktok',
    year: '2023',
    title: 'チャンネル開設・運用設計',
    desc: 'BtoB 企業の TikTok チャンネルを立ち上げ。',
    client: '株式会社たてもの製作所',
    role: 'チャンネル設計・運用ディレクション',
    platform: 'TikTok',
    platformUrl: '#', // TODO: 実際の URL に差し替え
    coverSeed: 'cover-p8',
    gallerySeeds: ['gallery-p8-a', 'gallery-p8-b'],
    paragraphs: [
      '製造業の BtoB 企業が採用強化を目的に TikTok チャンネルを開設するプロジェクト。「堅い業界ほど縦型動画が刺さる」という仮説を検証した。',
      '工場の日常、製造の裏側、社員の素顔という 3 つの柱で企画を設計。社員が自ら撮影・投稿できるよう、撮影マニュアルと投稿ガイドラインを整備した。',
      '開設から半年でフォロワー 2 万人を突破。「会社の雰囲気が伝わった」という応募動機が増え、採用単価は従来の求人媒体比で 60% 削減された。',
    ],
  },
];

// ── サービス ─────────────────────────────────────────────────
export const services: Service[] = [
  {
    title: '動画制作',
    en: 'Video Production',
    desc: 'ブランドフィルム、プロダクト動画、チャンネルコンテンツ——企画・脚本から編集・カラーグレーディングまで一貫して制作します。',
    tags: ['企画・脚本', '撮影', '編集・カラグレ'],
  },
  {
    title: 'SNS ビジュアル',
    en: 'Social Visual',
    desc: 'Instagram・TikTok の投稿テンプレートと運用設計。アカウントの世界観を定義し、誰が投稿しても統一感が保てる仕組みを作ります。',
    tags: ['テンプレート設計', '撮影ディレクション', '運用ガイド'],
  },
  {
    title: 'Web デザイン',
    en: 'Web Design',
    desc: 'コーポレートサイト、LP、キャンペーンサイト。情報設計からデザイン・実装まで、表示速度と使いやすさを両立したサイトを作ります。',
    tags: ['情報設計', 'UI デザイン', '実装'],
  },
  {
    title: 'ブランド基盤',
    en: 'Brand Foundation',
    desc: 'ロゴ、タイポグラフィ、カラーの基本設計。動画・SNS・Web すべてに一貫して使えるビジュアルの土台を整えます。',
    tags: ['VI 設計', 'ガイドライン', '展開設計'],
  },
];

// ── 経歴 ─────────────────────────────────────────────────────
export const timeline: TimelineItem[] = [
  {
    period: '2023 — 現在',
    title: '独立 / フリーランス',
    desc: '動画・SNS・Web を横断するビジュアル制作を一本化して請け負う。企画から実装まで一人で完結する体制を確立。',
  },
  {
    period: '2020 — 2023',
    title: '制作会社 アートディレクター',
    desc: 'ブランドサイトと映像制作の両方を横断するチームで AD を担当。大規模リニューアルから小規模 LP まで 30 件以上を手がける。',
  },
  {
    period: '2017 — 2020',
    title: 'デザイン事務所 デザイナー',
    desc: 'グラフィックデザインを軸に、Web ・映像へと領域を広げる。タイポグラフィとレイアウトの基礎を叩き込まれた 3 年間。',
  },
];

// ── お客様の声 ────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    challenge: '投稿のトーンが統一されず、ブランドの認知が伸び悩んでいた',
    action: 'テンプレートを 3 型に整理し、撮影から運用までのフローを再設計',
    result: '3 か月で保存数が 2.4 倍、来店動機の 4 割が Instagram に',
    name: 'クライアント A',
    role: 'カフェブランド オーナー',
  },
  {
    challenge: '製品の良さが伝わる動画が作れず、広告頼みの集客が続いていた',
    action: 'ドキュメンタリー手法で現場に密着し、20 分のブランドフィルムを制作',
    result: '120 万回再生を記録し、採用エントリーが前年比 140% に',
    name: 'クライアント B',
    role: '製造業 広報責任者',
  },
  {
    challenge: 'サイトが古く、情報にたどり着けないという問い合わせが絶えなかった',
    action: '情報設計から作り直し、タイポグラフィ主導の設計で全面リニューアル',
    result: '平均滞在時間が 2.1 倍に伸び、直帰率が 35% 改善',
    name: 'クライアント C',
    role: '食品メーカー マーケティング担当',
  },
];

// ── スキル ────────────────────────────────────────────────────
export const skills: Skill[] = [
  { name: '動画編集・モーション', level: 92 },
  { name: 'アートディレクション', level: 88 },
  { name: 'Web デザイン・実装', level: 84 },
  { name: 'SNS 運用設計', level: 80 },
];

// ── 数字（プロフィールページのカウンター） ──────────────────────
export const stats: Stat[] = [
  { value: 8, suffix: '年', label: '制作経験' },
  { value: 120, suffix: '+', label: 'プロジェクト' },
  { value: 40, suffix: '+', label: 'クライアント' },
  { value: 3, suffix: '拠点', label: '活動範囲' },
];

// ── SNS リンク ────────────────────────────────────────────────
// TODO: 各 url を実際のアカウント URL に差し替え（例: https://instagram.com/yourname）
export const socials: Social[] = [
  { label: 'Instagram', url: '#' }, // TODO: 実際の URL に差し替え
  { label: 'TikTok', url: '#' }, // TODO: 実際の URL に差し替え
  { label: 'YouTube', url: '#' }, // TODO: 実際の URL に差し替え
];

// ── マーキー（トップページ下部の流れるテキスト） ──────────────────
export const marqueeItems: string[] = [
  'Available for freelance',
  'Video × Social × Web',
  'Working worldwide',
  'Editorial motion & design systems',
];
