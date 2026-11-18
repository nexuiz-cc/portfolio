// ABOUTME: Vite integration for Express server
// ABOUTME: Handles dev middleware and production static file serving

import type { Application, Request, Response } from 'express';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import viteConfig from '../vite.config';

const isDev = process.env.COZE_PROJECT_ENV !== 'PROD';

/**
 * Vite 開発サーバー統合（ミドルウェアモード）
 */
export async function setupViteMiddleware(app: Application) {
  const vite = await createViteServer({
    ...viteConfig,
    server: {
      ...viteConfig.server,
      middlewareMode: true,
    },
    appType: 'spa',
  });

  // Vite middleware を使用
  app.use(vite.middlewares);

  console.log('🚀 Vite dev server initialized');
}

/**
 * 本番環境の静的ファイル配信をセットアップ
 */
export function setupStaticServer(app: Application) {
  const distPath = path.resolve(process.cwd(), 'dist');

  if (!fs.existsSync(distPath)) {
    console.error('❌ dist folder not found. Please run "pnpm build" first.');
    process.exit(1);
  }

  // 1. 静的ファイルを配信（対応ファイルがあればそのまま返す）
  app.use(express.static(distPath));

  // 2. SPA フォールバック - 未処理のリクエストは index.html を返す
  // ここに到達したリクエストは：
  //   - API リクエストではない（前段のルートで処理済み）
  //   - 静的ファイルではない（express.static が未検出）
  //   - フロントのルーティングに任せるため index.html を返す
  app.use((_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  console.log('📦 Serving static files from dist/');
}

/**
 * 環境に応じて Vite をセットアップ
 */
export async function setupVite(app: Application) {
  if (isDev) {
    await setupViteMiddleware(app);
  } else {
    setupStaticServer(app);
  }
}
