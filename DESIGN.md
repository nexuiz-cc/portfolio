# DESIGN.md

## 气质与意象

**意象锚点：一位视觉设计师的工作室墙面 —— 编辑级杂志感与创作者频道的混合体。**

定位是**设计师个人作品集**（Designer Portfolio）：名字就是最大的品牌。超大衬线姓名占据首页第一屏，作品按 **YouTube 视频 / Instagram 社交内容 / TikTok 短视频 / Web Design 网页设计** 四类组织，像一张个人频道的节目单。不是产品目录，是"这个人做了什么、做得多好"的宣言。

- 关键词：Editorial 杂志感、超大排版、条目式列表、黑白高对比、克制的单一强调色
- 参考基准：shopify.com/editions —— 全站结构与视觉对齐 Editions：封面陈列（1 大 4 小的主次构图）、「编号/分类/名称/查看」条目索引、粗黑无衬线超大标题、白底黑字高对比、mono 眉题、hairline 网格、大胆留白

## 视觉策略

- **排版即版式**：大标题用粗黑无衬线（Manrope 800，tracking -0.03em）占满版宽；Fraunces 衬线斜体仅作引文/副标题点缀
- **Hero 主次陈列**：首屏为「1 大 + 4 小」错落作品陈列（主推作品跨 2 列、带成果数据行 metrics），移动端降级为单列大图，不横滑
- **条目式作品列表**：对齐 Editions 首页底部索引——每行「缩略图 + 编号 + 分类 · 年份（mono）/ 粗黑标题 / 查看胶囊按钮」，hairline 分隔；悬停浅灰底 + 胶囊反黑
- **档案标签系统**：区块以 mono 小标签开头（`01 / SELECTED WORKS`），章节序号使用 accent 色（强调色三处之一）；首页编号由 main.ts 按启用区块自动连番（01→02→03→04…）
- **图形语言**：1px hairline 分隔线、直角为主（圆角仅用于胶囊按钮/徽章）

## 配色方案（主题预设系统）

颜色全部走 CSS 变量（`--c-*` RGB 三元组供 Tailwind alpha，`--paper/--ink/--accent` hex 供内联样式），`site.config.ts` 的 `theme.preset` 一行切换，`[data-theme]` 变量块定义于 `src/index.css`：

| 预设 | 意象 | paper | ink | accent |
|---|---|---|---|---|
| `acid`（默认） | 黑 + 荧光绿 | `#FFFFFF` | `#0F0F0F` | `#CCFF33` |
| `editorial` | 米白纸感 + 砖红 | `#F4F1EA` | `#000000` | `#C8452F` |
| `mono` | 纯黑白无彩色 | `#FFFFFF` | `#000000` | `#525252` |

通用 token（各预设内取值不同）：`fog`（浅灰区块底）、`ink-soft`（次级文字）、`muted`（三级文字）、`line`（hairline）。

- **强调色纪律（收缩版）**：accent 只出现在两处——①导航/链接 hover 下划线 ②章节序号；外加选择色、marker 高亮、focus-visible 描边等功能态。**全站强调色可视面积 ≤ 5%**（实测 0.002%–0.06%）
- 底部 marquee 为黑底白字（不再是 accent 横条）；CTA 按钮为墨底纸字；页脚仅箭头等 hover 点缀
- 页面主体白色，首页 Hero 浅灰、页脚反转为深色，形成明暗节奏
- 子页面（详情/关于/联系）对齐 Edition 版本详情页（fall2026）：超大标题 Hero + sticky 目录锚点 + 编号章节（左栏编号+标题 / 右栏图文）+ Notes 编号脚注；联系页为浅色章节化，非深色反转

## 字体排版

- **Display 标题**：`Manrope` ExtraBold（800），日文回退 `Noto Sans JP`，`tracking: -0.03em`，`clamp()` 流式缩放、行高 0.95–1.08
- **衬线点缀**：`Fraunces` 斜体，仅用于引文、副标题、邮箱等编辑感点缀，日文回退 `Noto Serif JP`
- **正文无衬线**：`Manrope`，日文回退 `Noto Sans JP`
- **档案编号/标签/按钮**：`IBM Plex Mono`，小号大写 + `letter-spacing: 0.18em`

## 动效与交互

运动性格：**纸张翻页感**——有阻尼、有重量、零弹跳。

- 平滑滚动：Lenis（lerp 0.09），锚点跳转走 `lenis.scrollTo`
- 缓动：`cubic-bezier(0.22, 1, 0.36, 1)`，时长 0.5–1.0s
- Hero：标题逐行 mask reveal（translateY 110% → 0，错峰 90ms），贴纸徽章旋转入场
- 滚动：IntersectionObserver 触发 fade-up（位移 ≤ 24px，仅一次）
- 作品条目：悬停整行浅灰底、标题平移、箭头胶囊反黑
- Marquee：黑底白字无限匀速滚动，hover 暂停
- 数字统计：进入视口计数动画；技能条从 0 生长
- 磁性按钮：hover 向光标位移 ≤ 6px
- 自定义光标：8px 纯白圆点 + `mix-blend-mode: difference`（白底反转为黑 21:1、深底反转为白 16.8:1，任意背景可读；hover 可点元素时膨胀至 14px，无圆环；点自身禁 transform/filter/opacity/will-change，JS 以 left/top 驱动）+ 60px 白底墨字「VIEW」徽章（box-shadow 描边，作品封面与作品行悬停时跟随略迟滞）；输入区（input/textarea/select/contenteditable）恢复系统文本光标并收起圆点；JS 初始化成功后才给 body 加 `has-custom-cursor` 隐藏系统光标（失败兜底）；事件委托（pointerover/out），触屏与 reduced-motion 时禁用
- 导航：滚动后加 hairline 底边 + 纸张色毛玻璃；移动端全屏墨色抽屉菜单（ESC 关闭 + Tab 焦点圈定）
- 页头语言切换（JA/EN）：界面文案双字典（src/i18n/），localStorage 记忆 + 页面刷新生效
- `:focus-visible`：2px accent 描边 + 3px offset
- `prefers-reduced-motion`：关闭全部动效

## 响应式

- 移动端优先；断点 640 / 768 / 1024 / 1280
- Hero「1 大 + 4 小」移动端降级为单列大图，无横滑
- 作品条目移动端保留缩略图 + 编号 + 标题 + 箭头（年份列收起）
- <768px 导航折叠为全屏抽屉；触控目标 ≥ 44px
- 联系页流程 3 步：桌面横向带序号，移动端竖向

## 设计禁忌

- 禁止蓝紫渐变、玻璃拟态堆砌、弹跳 spring 动效
- 禁止第二强调色；accent 不做正文文字色、不做大面积底色（面积 ≤ 5%）
- 圆角只允许 0 / 999px（胶囊）两档
- 禁止卡片阴影堆叠，用 hairline 和留白分区

## 内容说明

- 模板人物设定：「YOUR NAME® — ビジュアルデザイナー」（全站文案为日文占位成品；界面文案日英双语，内容数据日文单语）
- 配置三分法：`src/site.config.ts`（品牌/主题/导航/区块开关）＋ `src/data/site.ts`（作品/服务等全部内容）＋ `src/i18n/ja.ts`・`en.ts`（界面文案字典）
- 品牌占位规范：邮箱 `hello@example.com`、所在地 `都市名, 国名`、SNS 链接 `#`（site.ts 内 `// TODO:` 标注，使用者替换）
- 图片：seed 占位图为预生成静态 SVG（`public/placeholder/`，`pnpm gen:placeholders` 生成；开发时也可走 `/api/placeholder/<seed>/<w>/<h>?v=<分类>` 动态生成），按分类叠加母题（youtube=播放键 / instagram=头像+文字行 / tiktok=竖屏手机框 / web=浏览器框），可整体替换为本地图片
