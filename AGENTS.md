# 项目上下文

设计师个人作品集模板产品（多页面 MPA）。**内容文案为日文占位成品，界面文案（chrome）日英双语**（默认日文，页头 JA/EN 切换，localStorage 记忆）。作品分四类：YouTube / Instagram / TikTok / Web Design；归档页支持分类筛选（URL 同步 `?cat=`），详情页带平台外链占位。

**配置三分法（模板产品化核心）**：
- `src/site.config.ts` —— 唯一配置文件：brand（名称/标语/邮箱/接单状态）/ theme（3 套预设 acid・editorial・mono，改 `preset` 一行切换）/ nav（导航顺序）/ sections（区块 enabled 开关）
- `src/data/site.ts` —— 全部内容（作品/服务/经历/评价/SNS），含新作品示例注释
- `src/i18n/ja.ts`・`en.ts` —— 界面文案双字典；`t()` 读取当前语言，`sectionTitle()` 在 ja 时读 config.sections 标题

首页区块编号由 `src/main.ts` 按启用区块顺序自动连番（01→02→…），关闭区块不断号。设计语言详见 `DESIGN.md`，使用者向文档见 `README.md`。

## 技术栈

- **核心**: Vite 7, TypeScript (strict), Express
- **UI**: Tailwind CSS 3 + 原生 TS 组件（返回 HTML 字符串的纯函数组件）；颜色全部走 CSS 变量（`rgb(var(--c-*) / <alpha-value>)`），主题由 `<html data-theme>` 驱动
- **动效**: Lenis 平滑滚动、IntersectionObserver、CSS transitions
- **占位图**: 静态 SVG 预生成于 `public/placeholder/`（`pnpm gen:placeholders` 重新生成，生成器在 `server/lib/placeholder.ts`，按分类叠加母题）；内容变更后需重新生成。开发时仍可用 `/api/placeholder/<seed>/<w>/<h>?v=<分类>` 动态生成；在 `site.ts` 的 `img()` 中可一键切换本地图片

## 页面结构（MPA）

| 路由 | HTML | 入口 | 说明 |
|---|---|---|---|
| `/` | index.html | src/index.ts → main.ts | 首页：Hero（1 大 4 小）+ Marquee + 作品索引 + 服务 + logo 墙 + 评价 + CTA |
| `/works` | works.html | src/pages/works.ts | 作品归档列表（缩略图行 + 分类筛选） |
| `/project?id=` | project.html | src/pages/project.ts | 项目详情（章节化 + Notes + 上一个/下一个） |
| `/about` | about.html | src/pages/about.ts | 关于：简介 + 技能 + 数字 + 经历 + 联系 |
| `/contact` | contact.html | src/pages/contact.ts | 接单状态条 + 表单 + 流程 3 步 + SNS |

干净路径 `/works` 等由 Express 302 到对应 `.html`；新增页面需在 `vite.config.ts` 的 `rollupOptions.input` 与 `server/routes/index.ts` 的 pageRedirects 中同步登记。

## 目录结构

```
├── scripts/            # 构建与启动脚本（dev.sh 重启开发服务）
├── server/             # Express 服务端
│   ├── lib/placeholder.ts  # seed 占位图 SVG 生成器
│   ├── routes/index.ts     # API（/api/health、/api/contact、/api/placeholder）+ 页面重定向
│   └── server.ts           # 服务入口
├── src/
│   ├── site.config.ts # 唯一配置文件（brand / theme / nav / sections）
│   ├── i18n/         # 界面文案双字典（ja.ts / en.ts / index.ts 的 t()・sectionTitle()・言語切替）
│   ├── data/site.ts  # 全部站点内容（作品/服务/经历/评价/SNS）
│   ├── lib/page.ts   # 页面装配器 mountPage(active, sections)：注入 data-theme + 语言 + 交互
│   ├── lib/interactions.ts # 交互基建（光标/滚动/计数/表单）
│   ├── pages/          # 子页面入口
│   ├── components/     # 区块组件（nav/hero/marquee/works/services/clients/testimonials/cta/footer/projectDetail/about/contact/chapter）
│   └── index.css       # 设计令牌（3 套主题变量块）与全局样式
├── *.html              # 各页面 HTML 壳（SEO/OG/favicon 已配置）
├── public/favicon.svg  # 站点图标（占位，可替换）
├── README.md           # 使用者向配置文档（五节）
├── DESIGN.md           # 设计规范（主题系统/强调色纪律/动效）
└── tailwind.config.js  # Tailwind token 映射（CSS 变量驱动）
```

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

- 使用 Tailwind CSS 进行样式开发；设计 token 以 `DESIGN.md` 与 `tailwind.config.js` 为准
- 服务端路由变更后需执行 `bash scripts/dev.sh` 重启开发服务（tsx watch 对存量进程可能不生效）

- 使用 Tailwind CSS 进行样式开发

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、Express `req`/`res`、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。
