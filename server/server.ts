// ABOUTME: Express server with Vite integration
// ABOUTME: Handles API routes and serves frontend in dev/prod modes

import { createServer, type Server } from 'http';
import express from 'express';
import router from './routes/index';
import { setupVite } from './vite';

const isDev = process.env.COZE_PROJECT_ENV !== 'PROD';
const port = parseInt(process.env.PORT || '5000', 10);
const hostname = process.env.HOSTNAME || 'localhost';
const app = express();
// Express アプリを http.createServer でラップし、WebSocket 等のプロトコルアップグレードに対応
const server = createServer(app);

async function startServer(): Promise<Server> {
  // リクエストログ（開発環境のみ）
  if (isDev) {
    app.use((req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const ms = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${ms}ms`);
      });
      next();
    });
  }

  // リクエストボディのパースを追加
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API ルートを登録
  app.use(router);

  // Vite（開発モード）または静的ファイル配信（本番モード）を統合
  await setupVite(app);

  // グローバルエラーハンドリング
  app.use((err: Error, req: express.Request, res: express.Response) => {
    console.error('Server error:', err);
    const status = 'status' in err ? (err as { status?: number }).status ?? 500 : 500;
    res.status(status).json({
      error: err.message || 'Internal server error',
    });
  });

  server.once('error', err => {
    console.error('Server error:', err);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`\n✨ Server running at http://${hostname}:${port}`);
    console.log(`📝 Environment: ${isDev ? 'development' : 'production'}\n`);
  });

  return server;
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
